interface SeverityBadgeProps {
  severity: "low" | "medium" | "critical";
}

const config = {
  low: { label: "Low Risk", className: "severity-low" },
  medium: { label: "Medium Risk", className: "severity-medium" },
  critical: { label: "Critical Emergency", className: "severity-critical" },
};

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  const { label, className } = config[severity];
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${className}`}>
      {label}
    </span>
  );
}
