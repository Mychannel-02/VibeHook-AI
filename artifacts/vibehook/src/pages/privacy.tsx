import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const updated = "April 5, 2026";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to VibeHook
            </a>
          </Link>

          <h1 className="font-display text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/40 text-sm mb-8">Last updated: {updated}</p>

          <div className="space-y-8 text-white/70 leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">1. Introduction</h2>
              <p>
                Welcome to VibeHook ("we," "us," or "our"). This Privacy Policy explains how we handle information when you use our website at vibehook.online (the "Service"). By using VibeHook, you agree to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">2. Information We Collect</h2>
              <p className="mb-3">
                VibeHook is designed with privacy as a default. We do <strong className="text-white">not</strong> create accounts, collect names, email addresses, or any personally identifiable information.
              </p>
              <p>
                When you use the generator, the topic description or uploaded media file you provide is sent directly to the Google Gemini API to generate content. We do not store, log, or retain this input on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">3. How We Use Your Information</h2>
              <p>
                We do not collect personal information, so we have nothing to use, sell, or share. The sole purpose of any data transfer (your prompt text or uploaded file) is to call the Gemini AI API and return generated hooks and hashtags to you in real time.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">4. Third-Party Services</h2>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>
                  <strong className="text-white">Google Gemini API</strong> — Powers AI content generation. Your prompts and uploaded files are processed by Google. Review Google's AI data usage policy at{" "}
                  <a href="https://ai.google.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ai.google.dev</a>.
                </li>
                <li>
                  <strong className="text-white">Vercel Analytics & Speed Insights</strong> — We use Vercel's analytics tools to understand aggregate, anonymized page performance. No personally identifiable data is collected.
                </li>
                <li>
                  <strong className="text-white">Google AdSense</strong> — We may display advertisements served by Google AdSense. Google uses cookies to serve ads based on prior visits to our site or other sites. You can opt out of personalized advertising by visiting{" "}
                  <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ad Settings</a>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">5. Cookies</h2>
              <p>
                VibeHook itself does not use first-party cookies. However, third-party services (Google AdSense, Google Analytics) may place cookies on your device. You can control cookie preferences through your browser settings or opt-out tools provided by Google.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">6. Children's Privacy</h2>
              <p>
                VibeHook is not directed at children under the age of 13. We do not knowingly collect any information from children. If you believe a child has submitted information through our Service, please contact us and we will take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">7. Data Security</h2>
              <p>
                Since we do not collect or store personal data, there is minimal risk of a data breach affecting you. All communications between your browser and the Gemini API are made over HTTPS.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">8. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the Service after changes constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">9. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:hello@vibehook.online" className="text-primary hover:underline">
                  hello@vibehook.online
                </a>
                .
              </p>
            </section>

            <p className="text-white/30 text-xs pt-4">
              &copy; {new Date().getFullYear()} VibeHook. All rights reserved.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
