import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Clock, Users, Activity, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats, mockAccidents } from "@/lib/mockData";
import SeverityBadge from "@/components/SeverityBadge";

const statCards = [
  { label: "Total Reports", value: stats.totalReports.toLocaleString(), icon: Activity, color: "text-primary" },
  { label: "Critical Today", value: stats.criticalToday, icon: AlertTriangle, color: "text-destructive" },
  { label: "Avg Response", value: stats.avgResponseTime, icon: Clock, color: "text-warning" },
  { label: "Lives Assisted", value: stats.livesAssisted.toLocaleString(), icon: Users, color: "text-success" },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden px-4 py-24 text-center md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto max-w-3xl"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary pulse-emergency">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="mb-4 text-4xl font-black tracking-tight text-hero-foreground md:text-6xl">
            Every Second <span className="text-primary">Saves Lives</span>
          </h1>
          <p className="mb-8 text-lg text-hero-foreground/70">
            Smart Road Accident Reporting & Emergency Response System. Report accidents instantly, alert emergency services, and help save lives during the golden hour.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/report">
              <Button size="lg" className="emergency-gradient emergency-glow px-8 text-lg font-bold text-primary-foreground">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Emergency
              </Button>
            </Link>
            <Link to="/map">
              <Button size="lg" variant="outline" className="border-hero-foreground/20 bg-hero/50 text-hero-foreground hover:bg-hero-foreground/10">
                <MapPin className="mr-2 h-5 w-5" />
                View Live Map
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="container mx-auto -mt-12 px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="stat-card text-center"
            >
              <s.icon className={`mx-auto mb-2 h-6 w-6 ${s.color}`} />
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Accidents */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Recent Reports</h2>
          <Link to="/dashboard" className="flex items-center text-sm font-medium text-primary hover:underline">
            View all <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockAccidents.slice(0, 3).map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="rounded-xl border border-border bg-card p-5 card-hover"
            >
              <div className="mb-3 flex items-start justify-between">
                <SeverityBadge severity={a.severity} />
                <span className="text-xs text-muted-foreground">
                  {Math.round((Date.now() - a.reportedAt.getTime()) / 60000)} min ago
                </span>
              </div>
              <p className="mb-2 font-medium text-foreground">{a.description}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                {a.address}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-16">
        <div className="emergency-gradient rounded-2xl p-8 text-center md:p-12">
          <h2 className="mb-3 text-2xl font-bold text-primary-foreground md:text-3xl">Be a Lifesaver</h2>
          <p className="mb-6 text-primary-foreground/80">Join our volunteer rescue network and help save lives in your community.</p>
          <Link to="/volunteer">
            <Button size="lg" className="bg-primary-foreground font-bold text-primary hover:bg-primary-foreground/90">
              Register as Volunteer
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
