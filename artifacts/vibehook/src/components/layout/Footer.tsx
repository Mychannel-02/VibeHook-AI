export function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 bg-background/50 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-lg text-white">VibeHook</span>
          <span className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()}</span>
        </div>
        <p className="text-muted-foreground text-sm text-center md:text-right">
          Built for creators who refuse to blend in.
        </p>
      </div>
    </footer>
  );
}
