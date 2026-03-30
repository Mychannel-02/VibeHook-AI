import { useMutation } from "@tanstack/react-query";

export interface GenerateHooksParams {
  topic: string;
  vibe: string;
  platform: string;
}

export interface GenerateFromFileParams {
  file: File;
  vibe: string;
  platform: string;
  context?: string;
  onUploadProgress: (progress: number) => void;
}

export interface GenerateHooksResult {
  hooks: string[];
  hashtags: string[];
}

function getApiKey(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key) throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY.");
  return key;
}

async function callGemini(
  parts: Array<Record<string, unknown>>,
  model = "gemini-2.5-flash"
): Promise<string> {
  const apiKey = getApiKey();
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 1500 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.error?.message || "Failed to generate content. Please try again.");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Received empty response from AI.");
  return text;
}

function parseResult(text: string, hookCount = 6, hashtagCount = 15): GenerateHooksResult {
  const hooksMatch = text.match(/HOOKS:\s*([\s\S]*?)(?=HASHTAGS:|$)/i);
  const hooksRaw = hooksMatch?.[1] ?? text;
  const hooks = hooksRaw
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map((l) => l.replace(/^\*?\*?\d+[\.\)]\s*\*?\*?/, "").replace(/\*\*/g, "").trim())
    .filter((l) => l.length > 3)
    .slice(0, hookCount);

  while (hooks.length < hookCount) hooks.push("Stop scrolling — you need to see this!");

  const hashtagsMatch = text.match(/HASHTAGS:\s*([\s\S]*?)$/i);
  const hashtagsRaw = hashtagsMatch?.[1] ?? "";
  const hashtags = hashtagsRaw
    .split(/[\s,]+/)
    .map((h) => h.trim())
    .filter((h) => h.startsWith("#") && h.length > 1)
    .slice(0, hashtagCount);

  return { hooks, hashtags };
}

// ──────────────────────────────────────────────────────────────
// 1. Upload file to Gemini File API with progress tracking
// ──────────────────────────────────────────────────────────────
async function uploadToGeminiFileAPI(
  file: File,
  apiKey: string,
  onProgress: (p: number) => void
): Promise<{ uri: string; mimeType: string }> {
  const fileBytes = new Uint8Array(await file.arrayBuffer());
  const mimeType = file.type || "application/octet-stream";
  const metadata = JSON.stringify({ file: { display_name: file.name } });

  const boundary = "GeminiBoundary" + Date.now();
  const enc = new TextEncoder();

  const metaPart = enc.encode(
    `--${boundary}\r\nContent-Type: application/json; charset=utf-8\r\n\r\n${metadata}\r\n`
  );
  const filePart = enc.encode(`--${boundary}\r\nContent-Type: ${mimeType}\r\n\r\n`);
  const endPart = enc.encode(`\r\n--${boundary}--`);

  const body = new Uint8Array(
    metaPart.length + filePart.length + fileBytes.length + endPart.length
  );
  let offset = 0;
  body.set(metaPart, offset); offset += metaPart.length;
  body.set(filePart, offset); offset += filePart.length;
  body.set(fileBytes, offset); offset += fileBytes.length;
  body.set(endPart, offset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://generativelanguage.googleapis.com/upload/v1beta/files?uploadType=multipart&key=${apiKey}`
    );
    xhr.setRequestHeader("Content-Type", `multipart/related; boundary=${boundary}`);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 70));
    };

    xhr.onload = async () => {
      if (xhr.status === 200) {
        const result = JSON.parse(xhr.responseText);
        const fileObj = result.file;

        // Poll until ACTIVE (needed for video processing)
        onProgress(75);
        if (fileObj.state !== "ACTIVE") {
          let attempts = 0;
          while (attempts < 30) {
            await new Promise((r) => setTimeout(r, 2000));
            const poll = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/${fileObj.name}?key=${apiKey}`
            );
            const pollData = await poll.json();
            onProgress(75 + Math.min(attempts * 2, 20));
            if (pollData.state === "ACTIVE") {
              resolve({ uri: pollData.uri, mimeType: pollData.mimeType || mimeType });
              return;
            }
            if (pollData.state === "FAILED") {
              reject(new Error("File processing failed on Google's servers."));
              return;
            }
            attempts++;
          }
          reject(new Error("Timed out waiting for file to process."));
        } else {
          resolve({ uri: fileObj.uri, mimeType: fileObj.mimeType || mimeType });
        }
      } else {
        reject(new Error(`Upload failed (${xhr.status}): ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during file upload."));
    xhr.send(body);
  });
}

// ──────────────────────────────────────────────────────────────
// 2. Text-based hook generation (existing)
// ──────────────────────────────────────────────────────────────
export function useGenerateHooks() {
  return useMutation({
    mutationFn: async ({ topic, vibe, platform }: GenerateHooksParams): Promise<GenerateHooksResult> => {
      const prompt = `You are a viral content expert. For a ${platform} video about "${topic}" with a ${vibe} vibe, generate:

HOOKS:
6 punchy, attention-grabbing hooks under 15 words each. Numbered list:
1. ...
2. ...
3. ...
4. ...
5. ...
6. ...

HASHTAGS:
15 highly relevant viral hashtags (mix niche + broad). Space-separated starting with #.

Output ONLY in this exact format, no extra text:

HOOKS:
1. ...
(through 6)

HASHTAGS:
#tag1 #tag2 ...`;

      const text = await callGemini([{ text: prompt }]);
      return parseResult(text, 6, 15);
    },
  });
}

// ──────────────────────────────────────────────────────────────
// 3. Media file analysis
// ──────────────────────────────────────────────────────────────
export function useAnalyzeMedia() {
  return useMutation({
    mutationFn: async ({
      file,
      vibe,
      platform,
      context,
      onUploadProgress,
    }: GenerateFromFileParams): Promise<GenerateHooksResult> => {
      const apiKey = getApiKey();

      // Upload file to Gemini
      const { uri, mimeType } = await uploadToGeminiFileAPI(file, apiKey, onUploadProgress);
      onUploadProgress(95);

      const contextNote = context ? ` Additional context from creator: "${context}".` : "";
      const prompt = `Analyze this ${mimeType.startsWith("video") ? "video" : "image"} carefully.${contextNote}

Based on the mood, visual style, content, and subject matter, generate viral ${platform} content with a ${vibe} vibe:

HOOKS:
5 scroll-stopping hooks under 15 words each. Numbered list:
1. ...
2. ...
3. ...
4. ...
5. ...

HASHTAGS:
10 highly relevant trending hashtags for this content. Mix niche + broad. Space-separated starting with #.

Output ONLY in this exact format, no extra text:

HOOKS:
1. ...
(through 5)

HASHTAGS:
#tag1 #tag2 ...`;

      const text = await callGemini(
        [
          { fileData: { mimeType, fileUri: uri } },
          { text: prompt },
        ],
        "gemini-1.5-flash"
      );

      onUploadProgress(100);
      return parseResult(text, 5, 10);
    },
  });
}
