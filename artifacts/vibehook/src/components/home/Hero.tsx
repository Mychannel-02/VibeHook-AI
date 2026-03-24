import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-secondary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="block text-white">Stop the Scroll.</span>
            <span className="block text-gradient mt-2 pb-2">Go Viral.</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Generate 6 high-converting, AI-powered hooks in seconds. 
            Built for TikTok creators and dropshippers who want to dominate the algorithm.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-gray-200">10,000+ Hooks Generated</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-gray-200">Powered by Gemini AI</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-gray-200">100% Free to Use</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
