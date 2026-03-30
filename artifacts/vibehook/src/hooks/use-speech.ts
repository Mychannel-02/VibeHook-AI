import { useState, useRef, useCallback, useEffect } from "react";

interface UseSpeechOptions {
  onTranscript: (text: string) => void;
  onError?: (msg: string) => void;
}

export function useSpeech({ onTranscript, onError }: UseSpeechOptions) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const supported =
    typeof window !== "undefined" &&
    !!(window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const start = useCallback(() => {
    if (!supported) {
      onError?.("Voice input is not supported in this browser. Try Chrome.");
      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
    };

    recognition.onerror = (event) => {
      setListening(false);
      if (event.error !== "no-speech") {
        onError?.(
          event.error === "not-allowed"
            ? "Microphone access was denied. Please allow microphone permissions."
            : `Voice error: ${event.error}`
        );
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [supported, onTranscript, onError]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  return { listening, supported, toggle, stop };
}
