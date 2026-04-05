import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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

          <h1 className="font-display text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-white/40 text-sm mb-8">Last updated: {updated}</p>

          <div className="space-y-8 text-white/70 leading-relaxed">

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using VibeHook at vibehook.online (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">2. Description of Service</h2>
              <p>
                VibeHook is a free, AI-powered tool that generates viral hooks and hashtags for social media content. Users provide a topic description or upload media, and the Service uses the Google Gemini API to generate suggested content. The Service is provided "as is" with no guarantees of virality, reach, or engagement.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">3. Use of the Service</h2>
              <p className="mb-3">You agree to use VibeHook only for lawful purposes. You must not use the Service to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Generate content that is illegal, hateful, defamatory, or harmful to others</li>
                <li>Violate any intellectual property rights</li>
                <li>Spam, mislead, or deceive audiences</li>
                <li>Attempt to reverse-engineer, scrape, or overload the Service</li>
                <li>Upload files containing malware, illegal content, or content that violates third-party rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">4. Intellectual Property</h2>
              <p>
                The AI-generated hooks and hashtags produced by VibeHook are provided for your personal and commercial use. You own the output you generate. However, VibeHook's brand, interface, code, and underlying technology remain the intellectual property of VibeHook.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">5. Disclaimer of Warranties</h2>
              <p>
                The Service is provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that any generated content will achieve particular results. AI-generated text may occasionally be inaccurate, inappropriate, or require editing before use.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">6. Limitation of Liability</h2>
              <p>
                To the fullest extent permitted by law, VibeHook shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service, including but not limited to loss of profits, data, or goodwill.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">7. Third-Party Services</h2>
              <p>
                VibeHook relies on Google Gemini AI. Use of this Service is also subject to Google's Terms of Service. We are not responsible for the availability, accuracy, or conduct of third-party services.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">8. Advertising</h2>
              <p>
                VibeHook may display advertisements through Google AdSense. These advertisements are served by Google and are subject to Google's advertising policies. We are not responsible for the content of third-party advertisements.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will post the updated Terms on this page with a revised date. Your continued use of the Service after changes are posted constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">10. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-white font-semibold text-lg mb-2">11. Contact</h2>
              <p>
                For questions regarding these Terms, contact us at{" "}
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
