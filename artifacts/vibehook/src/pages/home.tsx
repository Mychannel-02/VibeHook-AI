import { useState, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { GeneratorForm } from "@/components/home/GeneratorForm";
import { ResultsGrid } from "@/components/home/ResultsGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { useGenerateHooks, GenerateHooksParams, GenerateHooksResult } from "@/hooks/use-gemini";

export default function Home() {
  const [result, setResult] = useState<GenerateHooksResult | null>(null);
  const [lastParams, setLastParams] = useState<GenerateHooksParams | null>(null);

  const generateMutation = useGenerateHooks();
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (params: GenerateHooksParams) => {
    setLastParams(params);
    setResult(null);

    generateMutation.mutate(params, {
      onSuccess: (data) => {
        setResult(data);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      },
    });
  };

  const handleRegenerate = () => {
    if (lastParams) handleGenerate(lastParams);
  };

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30">
      <Navbar />

      <main className="flex-grow flex flex-col items-center w-full">
        <Hero />

        <div className="w-full -mt-8 relative z-20">
          <GeneratorForm
            onGenerate={handleGenerate}
            isLoading={generateMutation.isPending}
            error={generateMutation.error?.message || null}
          />
        </div>

        <div ref={resultsRef} className="w-full">
          {result && result.hooks.length > 0 && (
            <ResultsGrid
              hooks={result.hooks}
              hashtags={result.hashtags}
              onRegenerate={handleRegenerate}
              isRegenerating={generateMutation.isPending}
            />
          )}
        </div>

        {!result && !generateMutation.isPending && <HowItWorks />}
      </main>

      <Footer />
    </div>
  );
}
