import { useMutation } from "@tanstack/react-query";

export interface GenerateHooksParams {
  topic: string;
  vibe: string;
  platform: string;
}

export function useGenerateHooks() {
  return useMutation({
    mutationFn: async ({ topic, vibe, platform }: GenerateHooksParams) => {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your environment variables.");
      }

      const prompt = `Generate 6 viral ${platform} hooks for a video about "${topic}". The vibe should be ${vibe}. Each hook should be punchy, attention-grabbing, and under 15 words. Format as a numbered list (1. 2. 3. etc.). Only output the hooks, no explanation.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 1024,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Gemini API Error:", errorData);
        throw new Error(errorData?.error?.message || "Failed to generate hooks. Please try again.");
      }

      const data = await response.json();
      
      // Extract text from Gemini response
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error("Received empty response from AI.");
      }

      // Parse the numbered list into an array of strings
      const parsedHooks = text
        .split("\n")
        .map((line: string) => line.trim())
        .filter((line: string) => line.length > 0)
        // Remove the "1. ", "2. ", etc. from the start of each line
        .map((line: string) => line.replace(/^\d+[\.\)]\s*/, "").trim())
        // Keep only the first 6 in case it generated more
        .slice(0, 6);

      if (parsedHooks.length === 0) {
        throw new Error("Could not parse hooks from AI response.");
      }

      // Ensure we always return exactly 6 hooks (pad with fallbacks if needed, though rare)
      while (parsedHooks.length < 6) {
        parsedHooks.push(`Stop scrolling! You need to hear about ${topic}.`);
      }

      return parsedHooks;
    },
  });
}
