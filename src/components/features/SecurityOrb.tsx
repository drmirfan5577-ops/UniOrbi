interface SecurityOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "blue" | "cyan" | "purple" | "green";
  animated?: boolean;
}

const colorMap = {
  blue: { bg: "from-blue-400/20 to-blue-600/30", border: "border-blue-400/30", glow: "shadow-blue-400/20" },
  cyan: { bg: "from-cyan-400/20 to-cyan-600/30", border: "border-cyan-400/30", glow: "shadow-cyan-400/20" },
  purple: { bg: "from-purple-400/20 to-purple-600/30", border: "border-purple-400/30", glow: "shadow-purple-400/20" },
  green: { bg: "from-green-400/20 to-green-600/30", border: "border-green-400/30", glow: "shadow-green-400/20" },
};

const sizeMap = {
  sm: "w-20 h-20",
  md: "w-32 h-32",
  lg: "w-48 h-48",
};

export function SecurityOrb({ className = "", size = "md", color = "blue", animated = true }: SecurityOrbProps) {
  const colors = colorMap[color];
  return (
    <div
      className={`
        rounded-full bg-gradient-to-br ${colors.bg} border ${colors.border}
        backdrop-blur-sm shadow-2xl ${colors.glow}
        ${sizeMap[size]}
        ${animated ? "orb-float" : ""}
        ${className}
      `}
    />
  );
}
