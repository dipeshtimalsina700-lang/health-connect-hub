import * as React from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface VoiceInputProps {
  id?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  className?: string;
}

export const VoiceInput: React.FC<VoiceInputProps> = ({
  className,
  value,
  onValueChange,
  multiline,
  ...props
}) => {
  const [isListening, setIsListening] = React.useState(false);
  const [recognition, setRecognition] = React.useState<any>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const { toast } = useToast();

  React.useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (onValueChange) {
          onValueChange(transcript);
        }
        setIsListening(false);
        setRetryCount(0);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        
        // Silently ignore network errors and let user retry manually
        if (event.error === "network") {
          setIsListening(false);
          setRetryCount(0);
          return;
        }
        
        let errorMessage = "Could not recognize speech. Please try again.";
        
        switch (event.error) {
          case "network":
            errorMessage = "Network error. Please check your internet connection. Make sure you're online and try again.";
            break;
          case "not-allowed":
            errorMessage = "Microphone access denied. Please allow microphone permissions in your browser settings.";
            break;
          case "no-speech":
            errorMessage = "No speech detected. Please speak clearly and try again.";
            break;
          case "aborted":
            errorMessage = "Voice input cancelled.";
            break;
          case "audio-capture":
            errorMessage = "No microphone found. Please connect a microphone and try again.";
            break;
          case "service-not-allowed":
            errorMessage = "Speech service is not available. Please try using manual text input.";
            break;
        }
        
        toast({
          title: "Voice Input Error",
          description: errorMessage,
          variant: "destructive",
        });
        setIsListening(false);
        setRetryCount(0);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onstart = () => {
        console.log("Speech recognition started");
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const toggleListening = async () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Voice input is not supported in your browser. Please use text input instead.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setRetryCount(0);
    } else {
      try {
        // Check microphone permissions first
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Start recognition
        recognition.start();
        setIsListening(true);
        setRetryCount(0);
        
        toast({
          title: "Listening...",
          description: "Speak clearly into your microphone.",
        });
      } catch (err: any) {
        console.error("Microphone permission error:", err);
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access in your browser to use voice input.",
          variant: "destructive",
        });
        setIsListening(false);
      }
    }
  };

  return (
    <div className="relative">
      {multiline ? (
        <Textarea
          className={cn("pr-12 min-h-[150px]", className)}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...props}
        />
      ) : (
        <Input
          className={cn("pr-12", className)}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          {...props}
        />
      )}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className={cn(
          "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8",
          isListening && "text-destructive animate-pulse"
        )}
        onClick={toggleListening}
      >
        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
    </div>
  );
};
