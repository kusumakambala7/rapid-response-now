const API_URL = import.meta.env.VITE_API_URL || "";

export interface AccidentPayload {
  description: string;
  severity: "low" | "medium" | "critical";
  lat?: number | null;
  lng?: number | null;
  address?: string;
  imageUrl?: string;
}

export interface VolunteerPayload {
  name: string;
  email: string;
  phone: string;
  city?: string;
  skills?: string;
}

export async function reportAccident(data: AccidentPayload) {
  const res = await fetch(`${API_URL}/report-accident`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to report accident");
  return res.json();
}

export async function fetchAccidents() {
  const res = await fetch(`${API_URL}/accidents`);
  if (!res.ok) throw new Error("Failed to fetch accidents");
  return res.json();
}

export async function registerVolunteer(data: VolunteerPayload) {
  const res = await fetch(`${API_URL}/register-volunteer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to register volunteer");
  return res.json();
}

export async function fetchVolunteers() {
  const res = await fetch(`${API_URL}/volunteers`);
  if (!res.ok) throw new Error("Failed to fetch volunteers");
  return res.json();
}
