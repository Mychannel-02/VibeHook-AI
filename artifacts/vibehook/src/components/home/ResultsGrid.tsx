import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Sparkles, RefreshCcw, Hash, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsGridProps {
  hooks: string[];
  hashtags: string[];
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function ResultsGrid({ hooks, hashtags, onRegenerate, isRegenerating }: ResultsGridProps) {
  const [copiedHook, setCopiedHook] = useState<number | null>(null);
  const [sharedHook, setSharedHook] = useState<number | null>(null);
  const [copiedHashtag, setCopiedHashtag] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const { toast } = useToast();

  const handleCopyHook = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHook(index);
      toast({ title: "Hook copied!", description: "Go paste it in your video draft.", duration: 2000 });
      setTimeout(() => setCopiedHook(null), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleShareHook = async (text: string, index: number) => {
    const shareText = `${text}\n\n🔥 Generate your own viral hooks free at vibehook.online`;
    try {
      await navigator.clipboard.writeText(shareText);
      setSharedHook(index);
      toast({
        title: "Copied for sharing!",
        description: "Hook + vibehook.online link copied. Paste anywhere to promote!",
        duration: 3000,
      });
      setTimeout(() => setSharedHook(null), 2500);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleCopyHashtag = async (tag: string, index: number) => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopiedHashtag(index);
      setTimeout(() => setCopiedHashtag(null), 1500);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleCopyAllHashtags = async () => {
    try {
      await navigator.clipboard.writeText(hashtags.join(" "));
      setCopiedAll(true);
      toast({ title: "All hashtags copied!", description: "Paste them into your caption.", duration: 2000 });
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  if (!hooks || hooks.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-16 relative z-20 space-y-16">

      {/* ── HOOKS SECTION ── */}
      <div>
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
            <Sparkles className="text-primary w-8 h-8" />
            Your Viral Hooks
          </h2>
          <p className="text-muted-foreground mt-3">Click any card to copy to clipboard</p>
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
                onClick={() => handleCopyHook(hook, idx)}
                className="w-full h-full text-left p-6 rounded-2xl glass-panel glass-panel-hover group relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <p className="text-lg md:text-xl text-white/90 font-medium leading-snug relative z-10">
                  "{hook}"
                </p>
                <div className="mt-6 flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold text-white/40 tracking-wider uppercase group-hover:text-primary/70 transition-colors">
                    Hook 0{idx + 1}
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Share to Social */}
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); handleShareHook(hook, idx); }}
                      title="Copy hook + vibehook.online link for sharing"
                      className={`p-2 rounded-full transition-all duration-300 ${
                        sharedHook === idx
                          ? "bg-secondary/30 text-secondary"
                          : "bg-white/5 text-white/40 hover:bg-secondary/20 hover:text-secondary"
                      }`}
                    >
                      {sharedHook === idx ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    {/* Copy hook */}
                    <div className={`p-2 rounded-full transition-all duration-300 ${
                      copiedHook === idx
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/5 text-white/50 group-hover:bg-primary/20 group-hover:text-primary-foreground"
                    }`}>
                      {copiedHook === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── HASHTAGS SECTION ── */}
      {hashtags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <Hash className="text-secondary w-8 h-8" />
              Viral Hashtags
            </h2>
            <p className="text-muted-foreground mt-3">Click a hashtag to copy it, or copy them all at once</p>
          </div>

          <div className="glass-panel rounded-2xl p-6 md:p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              {hashtags.map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyHashtag(tag, idx)}
                  className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium transition-all duration-200 ${
                    copiedHashtag === idx
                      ? "bg-green-500/20 border-green-500/40 text-green-400"
                      : "bg-white/5 border-white/10 text-white/70 hover:bg-primary/20 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {copiedHashtag === idx ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                  {tag}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopyAllHashtags}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border ${
                copiedAll
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30 text-white hover:from-secondary/30 hover:to-primary/30 hover:border-secondary/50"
              }`}
            >
              {copiedAll ? (
                <><Check className="w-4 h-4" /> All Hashtags Copied!</>
              ) : (
                <><Copy className="w-4 h-4" /> Copy All Hashtags</>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {/* ── REGENERATE ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <button
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all hover:border-white/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCcw className={`w-4 h-4 ${isRegenerating ? "animate-spin" : ""}`} />
          {isRegenerating ? "Generating more..." : "Regenerate Everything"}
        </button>
      </motion.div>
    </div>
  );
}
