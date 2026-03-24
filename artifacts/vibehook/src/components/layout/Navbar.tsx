export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl tracking-tight text-white">
            VibeHook
          </span>
          <span className="hidden md:inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground ml-2">
            AI Hook Generator
          </span>
        </div>
      </div>
    </nav>
  );
}
