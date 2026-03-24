import { useState, useRef, useEffect } from "react";
import { Share2, Twitter, Link2, MessageCircle, Facebook, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function Navbar() {
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const appUrl = typeof window !== "undefined" ? window.location.origin + window.location.pathname : "https://vibehook.app";
  const shareText = "🔥 Just discovered VibeHook — an AI-powered viral hook generator for TikTok, Reels & more. Generate 6 scroll-stopping hooks in seconds. Check it out!";

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopied(true);
      toast({ title: "Link copied!", description: "Share it with your creator friends.", duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const shareOptions = [
    {
      label: "Twitter / X",
      icon: <Twitter className="w-4 h-4" />,
      color: "hover:text-sky-400",
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`, "_blank");
        setShareOpen(false);
      },
    },
    {
      label: "WhatsApp",
      icon: <MessageCircle className="w-4 h-4" />,
      color: "hover:text-green-400",
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + " " + appUrl)}`, "_blank");
        setShareOpen(false);
      },
    },
    {
      label: "Facebook",
      icon: <Facebook className="w-4 h-4" />,
      color: "hover:text-blue-400",
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appUrl)}`, "_blank");
        setShareOpen(false);
      },
    },
    {
      label: copied ? "Copied!" : "Copy Link",
      icon: copied ? <Check className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />,
      color: copied ? "text-green-400" : "hover:text-primary",
      action: handleCopyLink,
    },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="VibeHook Logo"
            className="w-9 h-9 rounded-full object-cover shadow-lg shadow-primary/30 ring-2 ring-primary/40"
          />
          <span className="font-display font-bold text-xl tracking-tight text-white">
            VibeHook
          </span>
          <span className="hidden md:inline-block px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground ml-2">
            AI Hook Generator
          </span>
        </div>

        {/* Share button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShareOpen((o) => !o)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/50 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300 group"
          >
            <Share2 className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Share
            </span>
          </button>

          {shareOpen && (
            <div className="absolute right-0 top-full mt-3 w-52 glass-panel rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">Share VibeHook</span>
                <button onClick={() => setShareOpen(false)} className="text-white/30 hover:text-white/60 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-2">
                {shareOptions.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={opt.action}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/70 ${opt.color} hover:bg-white/5 transition-all duration-200`}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
