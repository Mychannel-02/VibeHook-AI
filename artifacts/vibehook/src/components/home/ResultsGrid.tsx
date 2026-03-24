import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsGridProps {
  hooks: string[];
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function ResultsGrid({ hooks, onRegenerate, isRegenerating }: ResultsGridProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { toast } = useToast();

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast({
        title: "Copied to clipboard!",
        description: "Go paste it in your video draft.",
        duration: 2000,
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try selecting the text manually.",
        variant: "destructive",
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  if (!hooks || hooks.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 relative z-20">
      
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
          <Sparkles className="text-primary w-8 h-8" />
          Your Viral Hooks
        </h2>
        <p className="text-muted-foreground mt-3 flex items-center justify-center gap-2">
          Click any card to copy to clipboard
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
      >
        {hooks.map((hook, idx) => (
          <motion.div key={idx} variants={item} className="h-full">
            <button
              onClick={() => handleCopy(hook, idx)}
              className="w-full h-full text-left p-6 rounded-2xl glass-panel glass-panel-hover group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Hover gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <p className="text-lg md:text-xl text-white/90 font-medium leading-snug relative z-10">
                "{hook}"
              </p>
              
              <div className="mt-6 flex items-center justify-between relative z-10">
                <span className="text-xs font-bold text-white/40 tracking-wider uppercase group-hover:text-primary/70 transition-colors">
                  Hook 0{idx + 1}
                </span>
                
                <div className={`p-2 rounded-full transition-all duration-300 ${
                  copiedIndex === idx 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-white/5 text-white/50 group-hover:bg-primary/20 group-hover:text-primary-foreground'
                }`}>
                  {copiedIndex === idx ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 flex justify-center"
      >
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all hover:border-white/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCcw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          {isRegenerating ? "Generating more..." : "Regenerate Hooks"}
        </button>
      </motion.div>
    </div>
  );
}
