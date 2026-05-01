import { ReactNode } from "react";

export function Snowflake({ className = "", style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="0" x2="12" y2="24" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="3.5" y1="3.5" x2="20.5" y2="20.5" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <line x1="20.5" y1="3.5" x2="3.5" y2="20.5" stroke="white" strokeWidth="1.5" opacity="0.6" />
      {/* Branch tips */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 12 + Math.cos(rad) * 7;
        const y1 = 12 + Math.sin(rad) * 7;
        const x2a = 12 + Math.cos(rad + 0.4) * 9;
        const y2a = 12 + Math.sin(rad + 0.4) * 9;
        const x2b = 12 + Math.cos(rad - 0.4) * 9;
        const y2b = 12 + Math.sin(rad - 0.4) * 9;
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2a} y2={y2a} stroke="white" strokeWidth="1" opacity="0.5" />
            <line x1={x1} y1={y1} x2={x2b} y2={y2b} stroke="white" strokeWidth="1" opacity="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

export function HollyDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <svg viewBox="0 0 200 24" className="w-48 h-6" fill="none">
        <line x1="0" y1="12" x2="70" y2="12" stroke="#2E7D32" strokeWidth="1" opacity="0.4" />
        {/* Holly leaves */}
        <ellipse cx="90" cy="10" rx="8" ry="5" fill="#2E7D32" opacity="0.7" transform="rotate(-20 90 10)" />
        <ellipse cx="110" cy="10" rx="8" ry="5" fill="#1B5E20" opacity="0.7" transform="rotate(20 110 10)" />
        {/* Berries */}
        <circle cx="98" cy="8" r="3" fill="#C62828" />
        <circle cx="102" cy="6" r="2.5" fill="#D32F2F" />
        <circle cx="100" cy="11" r="2.5" fill="#B71C1C" />
        <line x1="130" y1="12" x2="200" y2="12" stroke="#2E7D32" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

export function SnowBorder() {
  return (
    <div className="w-full h-3 overflow-hidden">
      <svg viewBox="0 0 1200 12" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 12 Q15 0, 30 12 Q45 0, 60 12 Q75 0, 90 12 Q105 0, 120 12 Q135 0, 150 12 Q165 0, 180 12 Q195 0, 210 12 Q225 0, 240 12 Q255 0, 270 12 Q285 0, 300 12 Q315 0, 330 12 Q345 0, 360 12 Q375 0, 390 12 Q405 0, 420 12 Q435 0, 450 12 Q465 0, 480 12 Q495 0, 510 12 Q525 0, 540 12 Q555 0, 570 12 Q585 0, 600 12 Q615 0, 630 12 Q645 0, 660 12 Q675 0, 690 12 Q705 0, 720 12 Q735 0, 750 12 Q765 0, 780 12 Q795 0, 810 12 Q825 0, 840 12 Q855 0, 870 12 Q885 0, 900 12 Q915 0, 930 12 Q945 0, 960 12 Q975 0, 990 12 Q1005 0, 1020 12 Q1035 0, 1050 12 Q1065 0, 1080 12 Q1095 0, 1110 12 Q1125 0, 1140 12 Q1155 0, 1170 12 Q1185 0, 1200 12"
          fill="white"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

export function ChristmasTreeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 48" fill="none">
      <polygon points="20,4 30,18 10,18" fill="#2E7D32" />
      <polygon points="20,12 33,28 7,28" fill="#1B5E20" />
      <polygon points="20,20 36,38 4,38" fill="#145214" />
      <rect x="16" y="38" width="8" height="6" fill="#5D4037" />
      <circle cx="20" cy="8" r="2" fill="#FDD835" />
      <circle cx="15" cy="22" r="1.5" fill="#C62828" />
      <circle cx="25" cy="18" r="1.5" fill="#FDD835" />
      <circle cx="18" cy="32" r="1.5" fill="#C62828" />
      <circle cx="27" cy="30" r="1.5" fill="#1565C0" />
      <circle cx="12" cy="30" r="1.5" fill="#FDD835" />
    </svg>
  );
}

export function WinterSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#E3F2FD]/90 to-white/90 rounded-xl" />
      <div className="absolute inset-2 border border-[#1565C0]/15 rounded-lg pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  );
}
