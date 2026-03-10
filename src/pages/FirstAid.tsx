import { motion } from "framer-motion";
import { Heart, Wind, Hand, AlertTriangle, Phone, Eye, Droplets, ShieldCheck } from "lucide-react";

const guides = [
  {
    icon: Phone,
    title: "1. Call Emergency Services",
    color: "text-primary",
    steps: ["Call 112 or local emergency number immediately", "Provide exact location and accident details", "Stay on the line for instructions"],
  },
  {
    icon: Eye,
    title: "2. Assess the Scene",
    color: "text-warning",
    steps: ["Ensure your own safety first", "Turn on hazard lights and set up warning triangle", "Check for fires, fuel leaks, or other hazards"],
  },
  {
    icon: Wind,
    title: "3. Check Breathing",
    color: "text-info",
    steps: ["Tilt head back gently to open airway", "Look, listen, and feel for breathing for 10 seconds", "If not breathing, begin CPR if trained"],
  },
  {
    icon: Droplets,
    title: "4. Control Bleeding",
    color: "text-destructive",
    steps: ["Apply firm pressure with a clean cloth", "Elevate the injured limb if possible", "Do NOT remove objects embedded in wounds"],
  },
  {
    icon: Hand,
    title: "5. Do NOT Move the Victim",
    color: "text-warning",
    steps: ["Moving may worsen spinal injuries", "Keep the victim still and calm", "Only move if immediate danger (fire, explosion)"],
  },
  {
    icon: Heart,
    title: "6. Provide Comfort",
    color: "text-success",
    steps: ["Cover with a blanket to prevent shock", "Talk calmly and reassure the victim", "Monitor breathing until help arrives"],
  },
  {
    icon: AlertTriangle,
    title: "7. What NOT to Do",
    color: "text-destructive",
    steps: ["Don't give food or water to injured person", "Don't attempt to set broken bones", "Don't remove a motorcycle helmet"],
  },
  {
    icon: ShieldCheck,
    title: "8. After Help Arrives",
    color: "text-info",
    steps: ["Provide information to paramedics", "Share any details about the accident", "Give your contact info to authorities"],
  },
];

export default function FirstAid() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Heart className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">First Aid Guide</h1>
          <p className="text-muted-foreground">Essential steps to help accident victims before emergency services arrive.</p>
        </div>

        <div className="mb-8 rounded-xl border-2 border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-lg font-bold text-primary">⚠️ In case of emergency, always call 112 first!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-xl border border-border bg-card p-6 card-hover"
            >
              <div className="mb-3 flex items-center gap-3">
                <g.icon className={`h-6 w-6 ${g.color}`} />
                <h3 className="text-lg font-bold text-foreground">{g.title}</h3>
              </div>
              <ul className="space-y-2">
                {g.steps.map((step) => (
                  <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                    {step}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
