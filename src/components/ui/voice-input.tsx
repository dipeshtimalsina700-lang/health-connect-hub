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
  const { toast } = useToast();

  React.useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (onValueChange) {
          onValueChange(transcript);
        }
        setIsListening(false);
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        toast({
          title: "Voice Input Error",
          description: "Could not recognize speech. Please try again.",
          variant: "destructive",
        });
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onValueChange, toast]);

  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast({
        title: "Listening...",
        description: "Speak now to input your text.",
      });
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
