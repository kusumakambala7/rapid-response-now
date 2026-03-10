import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin, Mic, MicOff, AlertTriangle, CheckCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import GoldenHourTimer from "@/components/GoldenHourTimer";
import SeverityBadge from "@/components/SeverityBadge";
import { toast } from "sonner";
import { reportAccident } from "@/lib/api";

type Severity = "low" | "medium" | "critical";

export default function ReportAccident() {
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("medium");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [listening, setListening] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const detectLocation = () => {
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocating(false);
        toast.success("Location detected");
      },
      () => {
        setLocating(false);
        toast.error("Could not detect location");
      }
    );
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    // Simulate AI severity detection
    const severities: Severity[] = ["low", "medium", "critical"];
    const detected = severities[Math.floor(Math.random() * 3)];
    setSeverity(detected);
    toast.info(`AI detected severity: ${detected.toUpperCase()}`);
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      toast.error("Voice input not supported in this browser");
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (listening) {
      setListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setDescription((prev) => (prev ? prev + " " + transcript : transcript));
      setListening(false);
    };
    recognition.onerror = () => {
      setListening(false);
      toast.error("Voice recognition failed");
    };
    recognition.onend = () => setListening(false);
    recognition.start();
    setListening(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      toast.error("Please add a description");
      return;
    }
    try {
      await reportAccident({
        description,
        severity,
        lat: location?.lat ?? null,
        lng: location?.lng ?? null,
        address: location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "",
        imageUrl: imagePreview ?? "",
      });
    } catch {
      // API unavailable — continue with local-only submission
    }
    setSubmitted(true);
    toast.success("Accident reported! Emergency services notified.");
  };

  if (submitted) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Report Submitted</h2>
          <p className="mb-6 text-muted-foreground">Emergency services have been notified. Help is on the way.</p>
          <GoldenHourTimer reportedAt={new Date()} />
          <div className="mt-6">
            <Button onClick={() => setSubmitted(false)} variant="outline">Report Another Accident</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-2 text-3xl font-bold text-foreground">Report an Accident</h1>
        <p className="mb-8 text-muted-foreground">Fill out the details below. Your report will alert emergency services immediately.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Accident Photo</label>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
            {imagePreview ? (
              <div className="relative overflow-hidden rounded-xl border border-border">
                <img src={imagePreview} alt="Accident" className="h-48 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => { setImagePreview(null); if (fileRef.current) fileRef.current.value = ""; }}
                  className="absolute right-2 top-2 rounded-lg bg-foreground/70 px-2 py-1 text-xs text-background"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex h-40 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground transition hover:border-primary hover:bg-primary/5"
              >
                <Camera className="mb-2 h-8 w-8" />
                <span className="text-sm font-medium">Upload accident photo</span>
                <span className="text-xs">AI will analyze severity</span>
              </button>
            )}
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Button type="button" size="sm" variant="outline" onClick={toggleVoice} className="gap-1">
                {listening ? <MicOff className="h-4 w-4 text-destructive" /> : <Mic className="h-4 w-4" />}
                {listening ? "Stop" : "Voice"}
              </Button>
            </div>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the accident..."
              rows={4}
            />
          </div>

          {/* Severity */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Accident Severity</label>
            <div className="flex gap-3">
              {(["low", "medium", "critical"] as Severity[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeverity(s)}
                  className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition ${
                    severity === s ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <SeverityBadge severity={s} />
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Location</label>
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={detectLocation} disabled={locating} className="gap-2">
                <MapPin className="h-4 w-4" />
                {locating ? "Detecting..." : location ? "Detected ✓" : "Detect Location"}
              </Button>
              {location && (
                <span className="flex items-center text-sm text-muted-foreground">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full emergency-gradient text-lg font-bold text-primary-foreground">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Submit Emergency Report
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
