import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Heart, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { registerVolunteer } from "@/lib/api";

export default function VolunteerRegistration() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", skills: "", city: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for volunteering!");
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">You're Registered!</h2>
          <p className="text-muted-foreground">You'll be notified when accidents occur near your area. Thank you for being a lifesaver.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-lg px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Users className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Join the Rescue Network</h1>
          <p className="text-muted-foreground">Register as a volunteer to help during road emergencies in your area.</p>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3 text-center">
          {[
            { icon: Heart, label: "Save Lives" },
            { icon: MapPin, label: "Local Alerts" },
            { icon: Users, label: "Community" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="rounded-xl border border-border bg-card p-4">
              <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name *</label>
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Email *</label>
            <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Phone *</label>
            <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 9876543210" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">City</label>
            <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="New Delhi" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Skills (First Aid, CPR, etc.)</label>
            <Input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} placeholder="First Aid, CPR certified" />
          </div>
          <Button type="submit" size="lg" className="w-full emergency-gradient text-lg font-bold text-primary-foreground">
            Register as Volunteer
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
