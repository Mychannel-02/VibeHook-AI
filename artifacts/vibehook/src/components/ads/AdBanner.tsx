import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet — safe to ignore in development
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-YOUR_ID_HERE"
        data-ad-slot="YOUR_AD_SLOT_HERE"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
