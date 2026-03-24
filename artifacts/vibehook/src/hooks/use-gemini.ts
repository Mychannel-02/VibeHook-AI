import { useMutation } from "@tanstack/react-query";

export interface GenerateHooksParams {
  topic: string;
  vibe: string;
  platform: string;
}

export interface GenerateHooksResult {
  hooks: string[];
  hashtags: string[];
}

async function callGemini(prompt: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your environment variables.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, maxOutputTokens: 1024 },
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error?.message || "Failed to generate content. Please try again.");
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) throw new Error("Received empty response from AI.");
  return text;
}

export function useGenerateHooks() {
  return useMutation({
    mutationFn: async ({ topic, vibe, platform }: GenerateHooksParams): Promise<GenerateHooksResult> => {
      const prompt = `You are a viral content expert. For a ${platform} video about "${topic}" with a ${vibe} vibe, generate:

HOOKS:
6 punchy, attention-grabbing hooks under 15 words each. Format as a numbered list:
1. hook one
2. hook two
... etc.

HASHTAGS:
15 highly relevant viral hashtags for this video. Include a mix of niche and broad hashtags. Format as a space-separated list starting with #.

Output exactly in this format — no extra text, no explanations:

HOOKS:
1. ...
2. ...
3. ...
4. ...
5. ...
6. ...

HASHTAGS:
#tag1 #tag2 #tag3 ...`;

      const text = await callGemini(prompt);

      // Parse HOOKS section
      const hooksMatch = text.match(/HOOKS:\s*([\s\S]*?)(?=HASHTAGS:|$)/i);
      const hooksRaw = hooksMatch?.[1] ?? "";
      const hooks = hooksRaw
        .split("\n")
        .map((l: string) => l.trim())
        .filter((l: string) => l.length > 0)
        .map((l: string) => l.replace(/^\d+[\.\)]\s*/, "").trim())
        .filter((l: string) => l.length > 0)
        .slice(0, 6);

      // Pad hooks if needed
      while (hooks.length < 6) {
        hooks.push(`Stop scrolling — you need to see this ${topic} hack.`);
      }

      // Parse HASHTAGS section
      const hashtagsMatch = text.match(/HASHTAGS:\s*([\s\S]*?)$/i);
      const hashtagsRaw = hashtagsMatch?.[1] ?? "";
      const hashtags = hashtagsRaw
        .split(/\s+/)
        .map((h: string) => h.trim())
        .filter((h: string) => h.startsWith("#") && h.length > 1)
        .slice(0, 15);

      return { hooks, hashtags };
    },
  });
}
