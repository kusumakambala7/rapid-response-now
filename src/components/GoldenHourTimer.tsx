import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface GoldenHourTimerProps {
  reportedAt: Date;
}

export default function GoldenHourTimer({ reportedAt }: GoldenHourTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ minutes: 60, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - reportedAt.getTime();
      const totalSeconds = Math.max(0, 3600 - Math.floor(elapsed / 1000));
      if (totalSeconds <= 0) {
        setExpired(true);
        clearInterval(interval);
        return;
      }
      setTimeLeft({ minutes: Math.floor(totalSeconds / 60), seconds: totalSeconds % 60 });
    }, 1000);
    return () => clearInterval(interval);
  }, [reportedAt]);

  const progress = ((timeLeft.minutes * 60 + timeLeft.seconds) / 3600) * 100;

  return (
    <div className={`rounded-xl border p-4 ${expired ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"}`}>
      <div className="mb-2 flex items-center gap-2">
        <Clock className={`h-5 w-5 ${expired ? "text-destructive" : "text-warning"}`} />
        <span className="text-sm font-semibold text-foreground">Golden Hour Timer</span>
      </div>
      {expired ? (
        <p className="text-sm font-bold text-destructive">Golden hour has passed!</p>
      ) : (
        <>
          <p className="text-2xl font-bold tabular-nums text-foreground">
            {String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-warning transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}
