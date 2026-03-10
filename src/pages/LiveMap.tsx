import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { mockAccidents, type AccidentReport } from "@/lib/mockData";
import SeverityBadge from "@/components/SeverityBadge";
import { MapPin } from "lucide-react";
import { fetchAccidents } from "@/lib/api";

export default function LiveMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [accidents, setAccidents] = useState<AccidentReport[]>(mockAccidents);

  useEffect(() => {
    fetchAccidents()
      .then((data) => {
        if (data && data.length > 0) {
          const parsed: AccidentReport[] = data.map((a: any) => ({
            ...a,
            reportedAt: new Date(a.reportedAt),
          }));
          setAccidents(parsed);
        }
      })
      .catch(() => {
        // API unavailable — use mock data
      });
  }, []);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    import("leaflet").then((L) => {
      // Fix default marker icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, { scrollWheelZoom: true }).setView([28.6139, 77.209], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const severityColors: Record<string, string> = {
        low: "#22c55e",
        medium: "#f59e0b",
        critical: "#dc2626",
      };

      accidents.forEach((a) => {
        const color = severityColors[a.severity];
        const marker = L.circleMarker([a.lat, a.lng], {
          radius: a.severity === "critical" ? 12 : a.severity === "medium" ? 9 : 7,
          color,
          fillColor: color,
          fillOpacity: 0.6,
          weight: 2,
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: Inter, sans-serif">
            <strong>${a.description}</strong><br/>
            <span style="color: ${color}; font-weight: 600; text-transform: uppercase; font-size: 12px">${a.severity}</span><br/>
            <span style="font-size: 12px; color: #666">${a.address}</span>
          </div>
        `);
      });

      // Heatmap overlay using circles
      accidents.forEach((a) => {
        L.circle([a.lat, a.lng], {
          radius: 800,
          color: "transparent",
          fillColor: severityColors[a.severity],
          fillOpacity: 0.1,
        }).addTo(map);
      });

      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [accidents]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Map */}
      <div className="relative flex-1">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" />
        <div ref={mapRef} className="h-[60vh] w-full lg:h-full" />
        <div className="absolute left-4 top-4 z-[1000] rounded-lg bg-card/90 p-3 shadow-lg backdrop-blur">
          <h2 className="mb-1 text-sm font-bold text-foreground">Live Accident Map</h2>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-success" /> Low</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-warning" /> Medium</span>
            <span className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full bg-destructive" /> Critical</span>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full border-t border-border bg-card p-4 lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0">
        <h3 className="mb-4 text-lg font-bold text-foreground">Recent Accidents</h3>
        <div className="space-y-3">
          {accidents.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="rounded-lg border border-border bg-background p-3"
            >
              <div className="mb-1 flex items-center justify-between">
                <SeverityBadge severity={a.severity} />
                <span className="text-xs text-muted-foreground">
                  {Math.round((Date.now() - a.reportedAt.getTime()) / 60000)}m ago
                </span>
              </div>
              <p className="text-sm font-medium text-foreground">{a.description}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {a.address}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
