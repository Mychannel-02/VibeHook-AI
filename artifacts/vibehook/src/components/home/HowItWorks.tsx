import { MessageSquare, Sparkles, CopyCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: "Describe Your Video",
      description: "Tell us briefly what your content is about. The more specific, the better the AI can tailor the hooks."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-secondary" />,
      title: "Choose Your Vibe",
      description: "Select the tone and platform. We optimize the phrasing whether it's a funny TikTok or an educational Reel."
    },
    {
      icon: <CopyCheck className="w-6 h-6 text-green-400" />,
      title: "Copy & Go Viral",
      description: "Get 6 unique, scroll-stopping hooks. Click to copy, paste into your draft, and watch the views roll in."
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 relative z-10">
      <div className="text-center mb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
          How It Works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting line on desktop */}
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10" />
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-2xl glass-panel flex items-center justify-center mb-6 relative group-hover:-translate-y-2 transition-transform duration-300">
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                {index + 1}
              </div>
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
