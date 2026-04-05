import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft } from "lucide-react";

export default function AboutUs() {
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

          <h1 className="font-display text-4xl font-bold text-white mb-8">About Us</h1>

          <div className="space-y-6 text-white/70 leading-relaxed">
            <p>
              <strong className="text-white">VibeHook</strong> is a free, AI-powered viral hook and hashtag generator built for TikTok creators, Instagram Reels makers, YouTube Shorts producers, and e-commerce dropshippers who want to stop the scroll and grow their audience fast.
            </p>
            <p>
              We believe that the right first line is the difference between a video that gets 200 views and one that gets 2 million. Our tool uses Google's Gemini AI to generate high-converting, scroll-stopping hooks in seconds — tailored to your specific topic, content vibe, and platform.
            </p>
            <p>
              Whether you're launching a product, building a personal brand, sharing a hot take, or trying to go viral with a day-in-the-life video, VibeHook hands you the exact opening words that trigger curiosity and compel viewers to keep watching.
            </p>
            <p>
              VibeHook also supports media analysis. Upload your video or image directly and let the AI analyze the visual content to generate hooks and hashtags matched to what's actually in your footage — no description required.
            </p>

            <hr className="border-white/10 my-8" />

            <h2 className="text-white font-semibold text-xl">Our Mission</h2>
            <p>
              To democratize viral content creation. Every creator — regardless of budget or following — deserves access to the kind of strategic, data-informed hook writing that top influencers and marketing agencies pay thousands for. VibeHook makes that free, instant, and accessible to anyone.
            </p>

            <h2 className="text-white font-semibold text-xl">What We Generate</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>6 viral hooks from a text description (text mode)</li>
              <li>5 AI-analyzed hooks from an uploaded video or image (media mode)</li>
              <li>Up to 15 platform-specific trending hashtags per generation</li>
              <li>Voice-to-text input for hands-free content ideation</li>
            </ul>

            <h2 className="text-white font-semibold text-xl">Technology</h2>
            <p>
              VibeHook is built on React and Vite, and powered entirely by Google Gemini AI (gemini-2.5-flash). All AI calls are made directly from the browser — we do not store your inputs, outputs, or any session data on our servers.
            </p>

            <h2 className="text-white font-semibold text-xl">Contact</h2>
            <p>
              Have feedback, a feature request, or a partnership inquiry? Reach out at{" "}
              <a href="mailto:hello@vibehook.online" className="text-primary hover:underline">
                hello@vibehook.online
              </a>
              .
            </p>

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
