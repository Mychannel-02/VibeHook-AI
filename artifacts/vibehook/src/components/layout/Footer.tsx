import { useState } from "react";
import { X } from "lucide-react";

type ModalType = "about" | "privacy" | null;

function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (!type) return null;

  const isAbout = type === "about";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg glass-panel rounded-2xl p-8 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {isAbout ? (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">About VibeHook</h2>
            <div className="space-y-3 text-white/70 text-sm leading-relaxed">
              <p>
                VibeHook is an AI-powered viral hook generator built for TikTok creators,
                dropshippers, and social media marketers who want to stop the scroll and
                dominate their niche.
              </p>
              <p>
                Powered by Google Gemini, VibeHook crafts 6 high-converting hooks
                in seconds — tailored to your topic, vibe, and platform. No more
                staring at a blank screen wondering what to say first.
              </p>
              <p>
                Whether you're selling a product, growing a personal brand, or just
                trying to go viral — VibeHook gives you the words that make people stop
                and watch.
              </p>
              <p className="pt-2 text-white/40 text-xs">
                Built for creators who refuse to blend in. &copy; {new Date().getFullYear()} VibeHook.
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-4">Privacy Policy</h2>
            <div className="space-y-4 text-white/70 text-sm leading-relaxed max-h-72 overflow-y-auto pr-2">
              <div>
                <h3 className="text-white font-semibold mb-1">1. Information We Collect</h3>
                <p>
                  VibeHook does not collect, store, or sell any personal data. The text
                  you enter into the generator is sent directly to the Google Gemini API
                  and is not retained by us.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">2. API Keys</h3>
                <p>
                  Your Gemini API key is stored securely as an environment variable and
                  is never exposed to other users or third parties.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">3. Third-Party Services</h3>
                <p>
                  This app uses the Google Gemini API to generate content. Please review
                  Google's privacy policy at <span className="text-primary">ai.google.dev</span> for
                  details on how your prompts may be processed.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">4. Cookies</h3>
                <p>
                  VibeHook does not use cookies or any tracking technologies.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">5. Changes to This Policy</h3>
                <p>
                  We may update this policy from time to time. Continued use of the app
                  constitutes acceptance of any changes.
                </p>
              </div>
              <p className="pt-2 text-white/40 text-xs">
                Last updated: {new Date().getFullYear()}. &copy; VibeHook.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function Footer() {
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <Modal type={modal} onClose={() => setModal(null)} />
      <footer className="border-t border-white/10 mt-24 bg-background/50 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-lg text-white">VibeHook</span>
            <span className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setModal("about")}
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => setModal("privacy")}
              className="text-muted-foreground text-sm hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
          </div>

          <p className="text-muted-foreground text-sm text-center md:text-right">
            Built for creators who refuse to blend in.
          </p>
        </div>
      </footer>
    </>
  );
}
