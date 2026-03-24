import { Zap, Sparkles } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              VibeHook
            </span>
          </Link>
          <span className="hidden md:inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground ml-2">
            AI Hook Generator
          </span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Powered by Gemini
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
