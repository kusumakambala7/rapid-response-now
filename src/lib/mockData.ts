export interface AccidentReport {
  id: string;
  description: string;
  severity: "low" | "medium" | "critical";
  lat: number;
  lng: number;
  address: string;
  reportedAt: Date;
  imageUrl?: string;
}

export const mockAccidents: AccidentReport[] = [
  { id: "1", description: "Two-car collision at intersection", severity: "critical", lat: 28.6139, lng: 77.209, address: "Connaught Place, New Delhi", reportedAt: new Date(Date.now() - 600000) },
  { id: "2", description: "Minor fender bender, no injuries", severity: "low", lat: 28.6304, lng: 77.2177, address: "Rajiv Chowk, New Delhi", reportedAt: new Date(Date.now() - 1800000) },
  { id: "3", description: "Motorcycle skid on wet road", severity: "medium", lat: 28.5921, lng: 77.2307, address: "Lajpat Nagar, New Delhi", reportedAt: new Date(Date.now() - 3600000) },
  { id: "4", description: "Truck overturned blocking highway", severity: "critical", lat: 28.6448, lng: 77.1695, address: "Karol Bagh, New Delhi", reportedAt: new Date(Date.now() - 7200000) },
  { id: "5", description: "Pedestrian hit near crosswalk", severity: "medium", lat: 28.5672, lng: 77.2100, address: "Saket, New Delhi", reportedAt: new Date(Date.now() - 5400000) },
  { id: "6", description: "Chain collision on flyover", severity: "critical", lat: 28.6280, lng: 77.1900, address: "Patel Nagar, New Delhi", reportedAt: new Date(Date.now() - 900000) },
];

export const stats = {
  totalReports: 1247,
  criticalToday: 12,
  avgResponseTime: "8 min",
  livesAssisted: 834,
};
