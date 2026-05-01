export function VineLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 120 800"
      fill="none"
      preserveAspectRatio="xMinYMin slice"
    >
      {/* Main vine stem */}
      <path
        d="M60 0 C55 80, 20 120, 30 200 C40 280, 70 300, 50 400 C30 500, 15 520, 25 600 C35 680, 60 720, 45 800"
        stroke="#558B2F"
        strokeWidth="4"
        fill="none"
        opacity="0.7"
      />
      {/* Secondary vine */}
      <path
        d="M60 50 C80 100, 90 140, 70 200 C50 260, 85 320, 65 380"
        stroke="#6D9B3A"
        strokeWidth="2.5"
        fill="none"
        opacity="0.5"
      />
      {/* Leaves */}
      <ellipse cx="25" cy="150" rx="15" ry="8" fill="#558B2F" opacity="0.6" transform="rotate(-30 25 150)" />
      <ellipse cx="45" cy="250" rx="12" ry="7" fill="#6D9B3A" opacity="0.5" transform="rotate(20 45 250)" />
      <ellipse cx="20" cy="350" rx="14" ry="8" fill="#558B2F" opacity="0.55" transform="rotate(-15 20 350)" />
      <ellipse cx="55" cy="450" rx="11" ry="6" fill="#6D9B3A" opacity="0.5" transform="rotate(25 55 450)" />
      <ellipse cx="30" cy="550" rx="13" ry="7" fill="#558B2F" opacity="0.6" transform="rotate(-20 30 550)" />
      <ellipse cx="50" cy="650" rx="12" ry="7" fill="#6D9B3A" opacity="0.5" transform="rotate(15 50 650)" />
      {/* Bougainvillea flower clusters */}
      <g opacity="0.85">
        {/* Cluster 1 */}
        <circle cx="35" cy="120" r="6" fill="#C2185B" />
        <circle cx="28" cy="115" r="5" fill="#D4869C" />
        <circle cx="42" cy="118" r="5.5" fill="#E91E63" />
        <circle cx="33" cy="110" r="4" fill="#C2185B" opacity="0.7" />
        <circle cx="40" cy="125" r="4.5" fill="#D4869C" />
        {/* Cluster 2 */}
        <circle cx="55" cy="280" r="7" fill="#C2185B" />
        <circle cx="48" cy="275" r="5.5" fill="#E91E63" />
        <circle cx="62" cy="278" r="6" fill="#D4869C" />
        <circle cx="52" cy="270" r="4.5" fill="#C2185B" opacity="0.7" />
        <circle cx="60" cy="288" r="5" fill="#E91E63" />
        <circle cx="45" cy="285" r="4" fill="#D4869C" opacity="0.8" />
        {/* Cluster 3 */}
        <circle cx="20" cy="420" r="6.5" fill="#E91E63" />
        <circle cx="13" cy="415" r="5" fill="#C2185B" />
        <circle cx="27" cy="418" r="5.5" fill="#D4869C" />
        <circle cx="18" cy="410" r="4" fill="#E91E63" opacity="0.7" />
        {/* Cluster 4 */}
        <circle cx="40" cy="580" r="7" fill="#C2185B" />
        <circle cx="33" cy="575" r="5.5" fill="#D4869C" />
        <circle cx="47" cy="578" r="6" fill="#E91E63" />
        <circle cx="38" cy="570" r="4.5" fill="#C2185B" opacity="0.7" />
        <circle cx="45" cy="588" r="5" fill="#D4869C" />
        {/* Cluster 5 */}
        <circle cx="25" cy="720" r="6" fill="#E91E63" />
        <circle cx="18" cy="715" r="5" fill="#C2185B" />
        <circle cx="32" cy="718" r="5.5" fill="#D4869C" />
      </g>
    </svg>
  );
}

export function VineRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox="0 0 120 800"
      fill="none"
      preserveAspectRatio="xMaxYMin slice"
      style={{ transform: "scaleX(-1)" }}
    >
      <path
        d="M60 0 C65 100, 90 150, 80 250 C70 350, 40 370, 60 470 C80 570, 95 600, 85 700 C75 760, 55 780, 65 800"
        stroke="#558B2F"
        strokeWidth="4"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M50 80 C30 130, 20 180, 40 250 C60 320, 25 380, 45 440"
        stroke="#6D9B3A"
        strokeWidth="2.5"
        fill="none"
        opacity="0.5"
      />
      <ellipse cx="85" cy="180" rx="14" ry="8" fill="#558B2F" opacity="0.6" transform="rotate(25 85 180)" />
      <ellipse cx="65" cy="300" rx="12" ry="7" fill="#6D9B3A" opacity="0.5" transform="rotate(-20 65 300)" />
      <ellipse cx="90" cy="420" rx="13" ry="7" fill="#558B2F" opacity="0.55" transform="rotate(15 90 420)" />
      <ellipse cx="70" cy="530" rx="11" ry="6" fill="#6D9B3A" opacity="0.5" transform="rotate(-25 70 530)" />
      <ellipse cx="80" cy="650" rx="14" ry="8" fill="#558B2F" opacity="0.6" transform="rotate(20 80 650)" />
      <g opacity="0.85">
        <circle cx="75" cy="150" r="6.5" fill="#C2185B" />
        <circle cx="68" cy="145" r="5" fill="#E91E63" />
        <circle cx="82" cy="148" r="5.5" fill="#D4869C" />
        <circle cx="73" cy="140" r="4" fill="#C2185B" opacity="0.7" />
        <circle cx="80" cy="158" r="4.5" fill="#E91E63" />

        <circle cx="60" cy="350" r="7" fill="#E91E63" />
        <circle cx="53" cy="345" r="5.5" fill="#C2185B" />
        <circle cx="67" cy="348" r="6" fill="#D4869C" />
        <circle cx="58" cy="340" r="4.5" fill="#E91E63" opacity="0.7" />
        <circle cx="65" cy="358" r="5" fill="#C2185B" />

        <circle cx="85" cy="500" r="6" fill="#C2185B" />
        <circle cx="78" cy="495" r="5" fill="#D4869C" />
        <circle cx="92" cy="498" r="5.5" fill="#E91E63" />

        <circle cx="70" cy="680" r="7" fill="#E91E63" />
        <circle cx="63" cy="675" r="5.5" fill="#C2185B" />
        <circle cx="77" cy="678" r="6" fill="#D4869C" />
        <circle cx="68" cy="670" r="4.5" fill="#E91E63" opacity="0.7" />
      </g>
    </svg>
  );
}

export function FlowerCorner({ className = "" }: { className?: string }) {
  return (
    <svg className={`pointer-events-none ${className}`} viewBox="0 0 80 80" fill="none">
      <circle cx="25" cy="25" r="8" fill="#C2185B" opacity="0.7" />
      <circle cx="18" cy="18" r="6" fill="#D4869C" opacity="0.6" />
      <circle cx="32" cy="20" r="5" fill="#E91E63" opacity="0.65" />
      <circle cx="20" cy="32" r="5.5" fill="#D4869C" opacity="0.55" />
      <circle cx="30" cy="30" r="4" fill="#C2185B" opacity="0.5" />
      <ellipse cx="15" cy="28" rx="8" ry="4" fill="#558B2F" opacity="0.4" transform="rotate(-40 15 28)" />
      <ellipse cx="33" cy="14" rx="7" ry="3.5" fill="#6D9B3A" opacity="0.35" transform="rotate(20 33 14)" />
      <path d="M25 35 C22 45, 10 55, 5 70" stroke="#558B2F" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M35 25 C45 22, 55 15, 70 10" stroke="#6D9B3A" strokeWidth="1.5" fill="none" opacity="0.35" />
    </svg>
  );
}

export function VineHeader() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 1200 32" fill="none" className="w-full h-full" preserveAspectRatio="none">
        <path
          d="M0 28 C100 20, 150 10, 250 18 C350 26, 400 8, 500 16 C600 24, 650 6, 750 14 C850 22, 900 10, 1000 18 C1100 26, 1150 12, 1200 20"
          stroke="#558B2F"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <circle cx="120" cy="18" r="4" fill="#C2185B" opacity="0.6" />
        <circle cx="125" cy="14" r="3" fill="#D4869C" opacity="0.5" />
        <circle cx="115" cy="15" r="3.5" fill="#E91E63" opacity="0.55" />
        <circle cx="380" cy="12" r="4.5" fill="#C2185B" opacity="0.6" />
        <circle cx="375" cy="8" r="3.5" fill="#D4869C" opacity="0.5" />
        <circle cx="386" cy="9" r="3" fill="#E91E63" opacity="0.55" />
        <circle cx="680" cy="10" r="4" fill="#E91E63" opacity="0.6" />
        <circle cx="675" cy="6" r="3" fill="#C2185B" opacity="0.5" />
        <circle cx="960" cy="14" r="4.5" fill="#C2185B" opacity="0.6" />
        <circle cx="955" cy="10" r="3.5" fill="#D4869C" opacity="0.5" />
        <circle cx="966" cy="11" r="3" fill="#E91E63" opacity="0.55" />
      </svg>
    </div>
  );
}

export function FlowerDivider() {
  return (
    <div className="flex items-center justify-center py-4">
      <svg viewBox="0 0 200 20" fill="none" className="w-48 h-5">
        <line x1="0" y1="10" x2="70" y2="10" stroke="#558B2F" strokeWidth="1" opacity="0.3" />
        <circle cx="85" cy="10" r="4" fill="#C2185B" opacity="0.5" />
        <circle cx="95" cy="8" r="3" fill="#D4869C" opacity="0.5" />
        <circle cx="100" cy="12" r="3.5" fill="#E91E63" opacity="0.5" />
        <circle cx="108" cy="9" r="3" fill="#C2185B" opacity="0.4" />
        <circle cx="115" cy="11" r="3.5" fill="#D4869C" opacity="0.45" />
        <line x1="130" y1="10" x2="200" y2="10" stroke="#558B2F" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
  );
}
