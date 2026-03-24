import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  topic: z.string().min(5, "Please describe your video in a bit more detail (min 5 chars).").max(100, "Keep it under 100 characters."),
  vibe: z.string().min(1, "Please select a vibe"),
  platform: z.string().min(1, "Please select a platform"),
});

type FormValues = z.infer<typeof formSchema>;

const VIBES = [
  "Funny", "Shocking", "Educational", "Storytime", "Controversial", "Inspirational"
];

const PLATFORMS = [
  "TikTok", "Instagram Reels", "YouTube Shorts"
];

interface GeneratorFormProps {
  onGenerate: (params: FormValues) => void;
  isLoading: boolean;
  error: string | null;
}

export function GeneratorForm({ onGenerate, isLoading, error }: GeneratorFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      vibe: "Shocking",
      platform: "TikTok",
    }
  });

  const onSubmit = (data: FormValues) => {
    onGenerate(data);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 relative z-20"
    >
      <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group">
        {/* Subtle glow behind the form */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          
          {/* Topic Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90 ml-1">
              What is your video about?
            </label>
            <div className="relative">
              <input
                {...register("topic")}
                placeholder="e.g. Waterproof dog bed that survived a flood test"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                disabled={isLoading}
              />
            </div>
            {errors.topic && (
              <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.topic.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vibe Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 ml-1">
                Select Vibe
              </label>
              <div className="relative">
                <select
                  {...register("vibe")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  {VIBES.map(v => (
                    <option key={v} value={v} className="bg-background text-white">{v}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Platform Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 ml-1">
                Platform
              </label>
              <div className="relative">
                <select
                  {...register("platform")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-300 appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  {PLATFORMS.map(p => (
                    <option key={p} value={p} className="bg-background text-white">{p}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all duration-300"
            >
              {/* Button inner glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 fill-white/20 group-hover:fill-white transition-colors" />
                  Generate Viral Hooks
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}
