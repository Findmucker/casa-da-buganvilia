import { ReactNode } from "react";

export function TorchLeft({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 80 600" fill="none">
      <rect x="30" y="40" width="8" height="60" rx="2" fill="#5C4033" />
      <rect x="25" y="35" width="18" height="8" rx="2" fill="#6B4E3D" />
      <ellipse cx="34" cy="28" rx="10" ry="14" fill="#C9A96E" opacity="0.4" />
      <ellipse cx="34" cy="24" rx="7" ry="10" fill="#DAA520" opacity="0.6" />
      <ellipse cx="34" cy="20" rx="4" ry="7" fill="#FFD700" opacity="0.5" />
      <defs>
        <radialGradient id="torchGlowL">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="34" cy="25" r="40" fill="url(#torchGlowL)" />
      {[120, 180, 240, 300, 360, 420, 480].map((y, i) => (
        <ellipse key={i} cx="34" cy={y} rx="5" ry="8" stroke="#6B6B6B" strokeWidth="2" fill="none" opacity="0.3" />
      ))}
    </svg>
  );
}

export function TorchRight({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 80 600" fill="none" style={{ transform: "scaleX(-1)" }}>
      <rect x="30" y="40" width="8" height="60" rx="2" fill="#5C4033" />
      <rect x="25" y="35" width="18" height="8" rx="2" fill="#6B4E3D" />
      <ellipse cx="34" cy="28" rx="10" ry="14" fill="#C9A96E" opacity="0.4" />
      <ellipse cx="34" cy="24" rx="7" ry="10" fill="#DAA520" opacity="0.6" />
      <ellipse cx="34" cy="20" rx="4" ry="7" fill="#FFD700" opacity="0.5" />
      <defs>
        <radialGradient id="torchGlowR">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="34" cy="25" r="40" fill="url(#torchGlowR)" />
      {[120, 180, 240, 300, 360, 420, 480].map((y, i) => (
        <ellipse key={i} cx="34" cy={y} rx="5" ry="8" stroke="#6B6B6B" strokeWidth="2" fill="none" opacity="0.3" />
      ))}
    </svg>
  );
}

export function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 48" fill="none">
      <path d="M20 2 L36 10 L36 26 C36 36 28 44 20 46 C12 44 4 36 4 26 L4 10 Z" fill="#6B1D1D" stroke="#C9A96E" strokeWidth="2" />
      <path d="M20 8 L30 14 L30 26 C30 32 25 38 20 40 C15 38 10 32 10 26 L10 14 Z" fill="none" stroke="#C9A96E" strokeWidth="1" opacity="0.5" />
      <text x="20" y="30" textAnchor="middle" fill="#C9A96E" fontSize="14" fontFamily="serif" fontWeight="bold">B</text>
    </svg>
  );
}

export function StoneBorder() {
  return (
    <div className="w-full h-4 overflow-hidden opacity-30">
      <svg viewBox="0 0 1200 16" className="w-full h-full" preserveAspectRatio="none">
        {Array.from({ length: 40 }).map((_, i) => (
          <rect
            key={i}
            x={i * 30 + (i % 2) * 5}
            y={i % 2 === 0 ? 0 : 4}
            width={28}
            height={12}
            rx={1}
            fill={i % 3 === 0 ? "#8C8C8C" : i % 3 === 1 ? "#7A7A7A" : "#999"}
            opacity={0.6 + (i % 3) * 0.15}
          />
        ))}
      </svg>
    </div>
  );
}

export function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <svg viewBox="0 0 200 20" className="w-48 h-5" fill="none">
        <line x1="0" y1="10" x2="75" y2="10" stroke="#C9A96E" strokeWidth="1" opacity="0.4" />
        <path d="M90 5 L100 0 L110 5 L100 10 Z" fill="#C9A96E" opacity="0.5" />
        <line x1="125" y1="10" x2="200" y2="10" stroke="#C9A96E" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

export function ParchmentSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5E6C8] via-[#EDD9B3] to-[#F5E6C8] rounded-lg opacity-90" />
      <div className="absolute inset-2 border border-[#C9A96E]/30 rounded pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  );
}
