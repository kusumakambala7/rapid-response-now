import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Activity, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { mockAccidents, stats } from "@/lib/mockData";
import SeverityBadge from "@/components/SeverityBadge";
import GoldenHourTimer from "@/components/GoldenHourTimer";

const weeklyData = [
  { day: "Mon", reports: 12 },
  { day: "Tue", reports: 8 },
  { day: "Wed", reports: 15 },
  { day: "Thu", reports: 10 },
  { day: "Fri", reports: 18 },
  { day: "Sat", reports: 22 },
  { day: "Sun", reports: 14 },
];

const severityData = [
  { name: "Low", value: 35, color: "hsl(142, 70%, 40%)" },
  { name: "Medium", value: 45, color: "hsl(30, 95%, 55%)" },
  { name: "Critical", value: 20, color: "hsl(0, 85%, 45%)" },
];

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  accidents: Math.floor(Math.random() * 10 + (i > 7 && i < 20 ? 5 : 1)),
}));

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-8 text-3xl font-bold text-foreground">Accident Dashboard</h1>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { label: "Total Reports", value: stats.totalReports, icon: Activity, color: "text-primary" },
            { label: "Critical Today", value: stats.criticalToday, icon: AlertTriangle, color: "text-destructive" },
            { label: "Avg Response", value: stats.avgResponseTime, icon: Clock, color: "text-warning" },
            { label: "Trend", value: "+12%", icon: TrendingUp, color: "text-success" },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <s.icon className={`mb-2 h-5 w-5 ${s.color}`} />
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-bold text-foreground">Weekly Reports</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="reports" fill="hsl(0, 85%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-bold text-foreground">Severity Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {severityData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly trend */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-bold text-foreground">Accidents by Hour (Heatmap Trend)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={3} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="accidents" stroke="hsl(0, 85%, 45%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent reports table */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h3 className="font-bold text-foreground">All Recent Reports</h3>
          </div>
          <div className="divide-y divide-border">
            {mockAccidents.map((a) => (
              <div key={a.id} className="flex items-center justify-between px-4 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{a.description}</p>
                  <p className="text-xs text-muted-foreground">{a.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={a.severity} />
                  <span className="text-xs text-muted-foreground">
                    {Math.round((Date.now() - a.reportedAt.getTime()) / 60000)}m ago
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Golden hour demo */}
        <div className="mt-8 max-w-sm">
          <GoldenHourTimer reportedAt={new Date(Date.now() - 300000)} />
        </div>
      </motion.div>
    </div>
  );
}
