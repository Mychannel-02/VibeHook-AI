import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Loader2, AlertCircle, Mic, MicOff, Upload, X, FileVideo, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSpeech } from "@/hooks/use-speech";

const formSchema = z.object({
  topic: z.string().max(150, "Keep it under 150 characters."),
  vibe: z.string().min(1, "Please select a vibe"),
  platform: z.string().min(1, "Please select a platform"),
});

type FormValues = z.infer<typeof formSchema>;

const VIBES = [
  "Funny",
  "Shocking",
  "Educational",
  "Storytime",
  "Controversial",
  "Inspirational",
  "Relatable",
  "Curiosity-Driven",
  "Fear of Missing Out (FOMO)",
  "Before & After",
  "POV",
  "Challenge",
  "Motivational",
  "Sarcastic",
  "Tutorial / How-To",
];

const PLATFORMS = [
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
  "LinkedIn",
  "Snapchat",
  "Facebook Reels",
  "Twitter / X",
  "Pinterest",
  "Threads",
];

const ACCEPTED_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "video/mp4", "video/mov", "video/mpeg", "video/quicktime",
  "video/x-msvideo", "video/webm",
];
const MAX_SIZE_MB = 50;

interface GeneratorFormProps {
  onGenerate: (params: FormValues) => void;
  onGenerateFromFile: (file: File, vibe: string, platform: string, context?: string) => void;
  isLoading: boolean;
  uploadProgress: number;
  error: string | null;
}

export function GeneratorForm({
  onGenerate,
  onGenerateFromFile,
  isLoading,
  uploadProgress,
  error,
}: GeneratorFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { topic: "", vibe: "Shocking", platform: "TikTok" },
  });

  const topicValue = watch("topic");

  const { listening, supported: speechSupported, toggle: toggleMic } = useSpeech({
    onTranscript: (text) => {
      setValue("topic", topicValue ? `${topicValue} ${text}` : text, { shouldValidate: true });
    },
    onError: (msg) => setSpeechError(msg),
  });

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return "Unsupported file type. Please upload an image or video.";
    if (file.size > MAX_SIZE_MB * 1024 * 1024) return `File too large. Max size is ${MAX_SIZE_MB}MB.`;
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const err = validateFile(file);
    if (err) { setFileError(err); return; }
    setFileError(null);
    setSelectedFile(file);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = (data: FormValues) => {
    if (selectedFile) {
      onGenerateFromFile(selectedFile, data.vibe, data.platform, data.topic || undefined);
    } else {
      if (!data.topic || data.topic.trim().length < 5) return;
      onGenerate(data);
    }
  };

  const isFileMode = !!selectedFile;
  const isUploading = isLoading && uploadProgress > 0 && uploadProgress < 100;

  const fileSizeMB = selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(1) : null;
  const isVideo = selectedFile?.type.startsWith("video/");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 relative z-20"
    >
      <div className="glass-panel p-6 md:p-8 rounded-3xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">

          {/* ── Media Upload Zone ── */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90 ml-1">
              Upload Video / Image
              <span className="ml-2 text-white/40 font-normal">optional — AI will analyze it</span>
            </label>

            <AnimatePresence mode="wait">
              {!selectedFile ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-2 px-4 py-5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? "border-primary/70 bg-primary/10"
                      : "border-white/15 bg-black/20 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleFileInputChange}
                    disabled={isLoading}
                  />
                  <Upload className="w-6 h-6 text-white/40" />
                  <div className="text-center">
                    <p className="text-sm text-white/60">
                      <span className="text-primary font-medium">Click to upload</span> or drag &amp; drop
                    </p>
                    <p className="text-xs text-white/30 mt-0.5">Images &amp; videos up to 50MB</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-primary/10 border border-primary/25"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    {isVideo ? (
                      <FileVideo className="w-5 h-5 text-primary" />
                    ) : (
                      <Image className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-white/40">{fileSizeMB} MB · {isVideo ? "Video" : "Image"}</p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    disabled={isLoading}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/50 hover:text-white transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {fileError && (
              <p className="text-red-400 text-xs ml-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {fileError}
              </p>
            )}
          </div>

          {/* ── Upload Progress Bar ── */}
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1.5"
              >
                <div className="flex justify-between text-xs text-white/50">
                  <span>
                    {uploadProgress < 75 ? "Uploading to AI..." :
                     uploadProgress < 95 ? "Processing media..." :
                     "Generating hooks..."}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Topic Input with Mic ── */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-white/90 ml-1">
              {isFileMode ? "Extra context (optional)" : "What is your video about?"}
            </label>
            <div className="relative">
              <input
                {...register("topic")}
                placeholder={
                  isFileMode
                    ? "Add context for AI, or leave blank..."
                    : "e.g. Waterproof dog bed that survived a flood test"
                }
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                disabled={isLoading}
              />

              {/* Mic Button */}
              {speechSupported && (
                <button
                  type="button"
                  onClick={() => { setSpeechError(null); toggleMic(); }}
                  disabled={isLoading}
                  title={listening ? "Stop recording" : "Speak your description"}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all duration-200 ${
                    listening
                      ? "bg-red-500/20 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                      : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/70"
                  }`}
                >
                  {listening ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      <MicOff className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {listening && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-red-400 ml-1 flex items-center gap-1.5"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
                Listening… speak now
              </motion.p>
            )}
            {speechError && (
              <p className="text-yellow-400 text-xs ml-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {speechError}
              </p>
            )}
            {!isFileMode && errors.topic && (
              <p className="text-red-400 text-xs mt-1 ml-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.topic.message}
              </p>
            )}
          </div>

          {/* ── Vibe + Platform ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 ml-1">Select Vibe</label>
              <div className="relative">
                <select
                  {...register("vibe")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  {VIBES.map((v) => (
                    <option key={v} value={v} className="bg-[#0a0a0f] text-white">{v}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-white/90 ml-1">Platform</label>
              <div className="relative">
                <select
                  {...register("platform")}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary/50 transition-all duration-300 appearance-none cursor-pointer"
                  disabled={isLoading}
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p} className="bg-[#0a0a0f] text-white">{p}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* ── Error ── */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* ── Submit Button ── */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  {isFileMode && uploadProgress < 75 ? "Uploading..." :
                   isFileMode && uploadProgress < 95 ? "Analyzing Media..." :
                   "Generating Magic..."}
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6 fill-white/20 group-hover:fill-white transition-colors" />
                  {isFileMode ? "Analyze & Generate Hooks" : "Generate Viral Hooks"}
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </motion.div>
  );
}
