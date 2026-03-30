import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { GeneratorForm } from "@/components/home/GeneratorForm";
import { ResultsGrid } from "@/components/home/ResultsGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import {
  useGenerateHooks,
  useAnalyzeMedia,
  GenerateHooksParams,
  GenerateHooksResult,
} from "@/hooks/use-gemini";

export default function Home() {
  const [result, setResult] = useState<GenerateHooksResult | null>(null);
  const [lastParams, setLastParams] = useState<GenerateHooksParams | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const generateMutation = useGenerateHooks();
  const analyzeMutation = useAnalyzeMedia();
  const resultsRef = useRef<HTMLDivElement>(null);

  const scrollToResults = () =>
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 150);

  // ── Text-based generation ──
  const handleGenerate = (params: GenerateHooksParams) => {
    setLastParams(params);
    setResult(null);
    setUploadProgress(0);
    generateMutation.mutate(params, {
      onSuccess: (data) => { setResult(data); scrollToResults(); },
    });
  };

  // ── File-based generation ──
  const handleGenerateFromFile = (
    file: File,
    vibe: string,
    platform: string,
    context?: string
  ) => {
    setResult(null);
    setUploadProgress(0);
    setLastParams(null);
    analyzeMutation.mutate(
      { file, vibe, platform, context, onUploadProgress: setUploadProgress },
      {
        onSuccess: (data) => { setResult(data); scrollToResults(); },
      }
    );
  };

  const handleRegenerate = () => {
    if (lastParams) handleGenerate(lastParams);
  };

  const isLoading = generateMutation.isPending || analyzeMutation.isPending;
  const error = generateMutation.error?.message || analyzeMutation.error?.message || null;

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30">
      <Navbar />

      <main className="flex-grow flex flex-col items-center w-full">
        <Hero />

        <div className="w-full -mt-8 relative z-20">
          <GeneratorForm
            onGenerate={handleGenerate}
            onGenerateFromFile={handleGenerateFromFile}
            isLoading={isLoading}
            uploadProgress={uploadProgress}
            error={error}
          />
        </div>

        <div ref={resultsRef} className="w-full">
          {result && result.hooks.length > 0 && (
            <ResultsGrid
              hooks={result.hooks}
              hashtags={result.hashtags}
              onRegenerate={handleRegenerate}
              isRegenerating={isLoading}
            />
          )}
        </div>

        {!result && !isLoading && <HowItWorks />}
      </main>

      <Footer />
    </div>
  );
}
