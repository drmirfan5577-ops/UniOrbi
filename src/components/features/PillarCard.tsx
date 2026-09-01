import type { ReactNode } from "react";

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  color: "blue" | "cyan" | "purple" | "green";
  index: number;
}

const colorMap = {
  blue: {
    gradient: "from-blue-500 to-blue-700",
    light: "from-blue-50 to-blue-100/50",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    spec: "bg-blue-50 text-blue-800 border-blue-100",
    border: "border-blue-100 hover:border-blue-200",
  },
  cyan: {
    gradient: "from-cyan-500 to-teal-600",
    light: "from-cyan-50 to-teal-50/50",
    badge: "bg-cyan-100 text-cyan-700 border-cyan-200",
    spec: "bg-cyan-50 text-cyan-800 border-cyan-100",
    border: "border-cyan-100 hover:border-cyan-200",
  },
  purple: {
    gradient: "from-purple-500 to-indigo-600",
    light: "from-purple-50 to-indigo-50/50",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    spec: "bg-purple-50 text-purple-800 border-purple-100",
    border: "border-purple-100 hover:border-purple-200",
  },
  green: {
    gradient: "from-emerald-500 to-green-600",
    light: "from-emerald-50 to-green-50/50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    spec: "bg-emerald-50 text-emerald-800 border-emerald-100",
    border: "border-emerald-100 hover:border-emerald-200",
  },
};

export function PillarCard({ icon, title, subtitle, description, specs, color, index }: PillarCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={`
        glass-card rounded-2xl p-6 border ${c.border}
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        relative overflow-hidden
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top gradient bg */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${c.light} rounded-full -translate-y-8 translate-x-8 opacity-60`} />

      <div className="relative">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} flex items-center justify-center shadow-lg mb-4 text-white`}>
          {icon}
        </div>

        {/* Badge */}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide border ${c.badge} mb-2`}>
          Pillar {index + 1}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-0.5">{title}</h3>
        <p className="text-xs font-medium text-muted-foreground mb-3">{subtitle}</p>
        <p className="text-sm text-foreground/70 leading-relaxed mb-4">{description}</p>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5">
          {specs.map((spec, i) => (
            <span key={i} className={`text-[11px] px-2 py-0.5 rounded-md border font-mono ${c.spec}`}>
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
