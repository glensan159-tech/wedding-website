import React from 'react';

interface GraphicProps {
  primaryColor: string;
  accentColor?: string;
  className?: string;
  size?: number;
}

/**
 * Female Modest Floor-length Gown with Sleeves (Church Approved: Sleeved & Closed Back)
 */
export const FemaleModestGownGraphic: React.FC<GraphicProps> = ({
  primaryColor,
  accentColor = '#FFFFFF',
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`gownGrad-${primaryColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
          <stop offset="70%" stopColor={primaryColor} stopOpacity="0.88" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`drapeGrad-${primaryColor}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="35%" stopColor={primaryColor} stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
        </linearGradient>
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Head / Mannequin neck silhouette */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Modest High Round Neckline Collar */}
      <path
        d="M86 64 C86 64, 100 70, 114 64 C116 66, 115 72, 100 75 C85 72, 84 66, 86 64 Z"
        fill="#FFFFFF"
        opacity="0.7"
      />

      {/* Modest 3/4 to Full Lace Sleeves (Church compliant - No sleeveless) */}
      {/* Left Sleeve */}
      <path
        d="M78 68 C68 76, 52 108, 48 142 C54 144, 60 142, 64 138 C67 114, 76 92, 82 78 Z"
        fill={`url(#gownGrad-${primaryColor})`}
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
      {/* Right Sleeve */}
      <path
        d="M122 68 C132 76, 148 108, 152 142 C146 144, 140 142, 136 138 C133 114, 124 92, 118 78 Z"
        fill={`url(#gownGrad-${primaryColor})`}
        stroke="#FFFFFF"
        strokeWidth="1"
        strokeOpacity="0.4"
      />

      {/* Sleeve Lace Trim Details */}
      <circle cx="56" cy="140" r="4" fill={accentColor} opacity="0.5" />
      <circle cx="144" cy="140" r="4" fill={accentColor} opacity="0.5" />

      {/* Bodice (Modest, closed front & closed back) */}
      <path
        d="M80 68 C80 68, 100 74, 120 68 C124 88, 122 118, 118 132 C108 135, 92 135, 82 132 C78 118, 76 88, 80 68 Z"
        fill={`url(#gownGrad-${primaryColor})`}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />

      {/* Elegant Waistband / Belt with Satin Sheen */}
      <path
        d="M81 130 C93 133, 107 133, 119 130 L121 140 C107 143, 93 143, 79 140 Z"
        fill="#C2A379"
      />
      <circle cx="100" cy="135" r="3" fill="#FFF" />

      {/* Flowing Floor-Length Skirt */}
      <path
        d="M79 140 C93 143, 107 143, 121 140 C136 185, 158 280, 168 335 C146 342, 100 344, 32 335 C42 280, 64 185, 79 140 Z"
        fill={`url(#gownGrad-${primaryColor})`}
        filter="url(#softGlow)"
      />

      {/* Overlay Drapes & Pleats */}
      <path
        d="M94 141 C90 200, 80 270, 70 338 C76 340, 84 340, 88 339 C98 270, 103 200, 100 141 Z"
        fill={`url(#drapeGrad-${primaryColor})`}
      />
      <path
        d="M106 141 C110 200, 120 270, 130 338 C124 340, 116 340, 112 339 C102 270, 97 200, 100 141 Z"
        fill={`url(#drapeGrad-${primaryColor})`}
      />

      {/* Hemline delicate lace finish */}
      <path
        d="M32 335 Q66 345 100 344 Q134 345 168 335"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeDasharray="4 3"
        opacity="0.6"
      />
    </svg>
  );
};

/**
 * Female Modern Filipiniana Terno with Iconic Butterfly Sleeves (Church Approved: Sleeved & Modest)
 */
export const FemaleTernoGraphic: React.FC<GraphicProps> = ({
  primaryColor,
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`ternoGrad-${primaryColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
          <stop offset="70%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor="#22052C" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Head / Neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Modest High Church Neckline */}
      <path d="M88 64 C94 67, 106 67, 112 64 L110 70 C104 72, 96 72, 90 70 Z" fill="#C2A379" />

      {/* Modern Terno Butterfly Sleeves (Structured architectural wings) */}
      {/* Left Butterfly Sleeve */}
      <path
        d="M84 66 C70 48, 44 48, 38 68 C34 84, 46 104, 76 100 C78 86, 81 74, 84 66 Z"
        fill={`url(#ternoGrad-${primaryColor})`}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      {/* Left Sleeve Pleat ridges */}
      <path d="M48 64 C56 75, 68 84, 76 92" stroke="#FFF" strokeWidth="1" opacity="0.4" />
      <path d="M58 56 C64 68, 72 78, 79 84" stroke="#FFF" strokeWidth="1" opacity="0.4" />

      {/* Right Butterfly Sleeve */}
      <path
        d="M116 66 C130 48, 156 48, 162 68 C166 84, 154 104, 124 100 C122 86, 119 74, 116 66 Z"
        fill={`url(#ternoGrad-${primaryColor})`}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.5"
      />
      {/* Right Sleeve Pleat ridges */}
      <path d="M152 64 C144 75, 132 84, 124 92" stroke="#FFF" strokeWidth="1" opacity="0.4" />
      <path d="M142 56 C136 68, 128 78, 121 84" stroke="#FFF" strokeWidth="1" opacity="0.4" />

      {/* Tailored Bodice with princess seams */}
      <path
        d="M82 68 C92 72, 108 72, 118 68 C122 90, 120 120, 116 132 C106 135, 94 135, 84 132 C80 120, 78 90, 82 68 Z"
        fill={`url(#ternoGrad-${primaryColor})`}
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="1"
      />
      {/* Golden Embroidery on bodice */}
      <path d="M100 74 V128" stroke="#C2A379" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Waistband */}
      <path d="M83 130 H117 V137 H83 Z" fill="#C2A379" />

      {/* Mermaid / Trumpet Floor-Length Skirt */}
      <path
        d="M83 137 C94 139, 106 139, 117 137 C122 170, 124 220, 116 260 C126 285, 150 320, 164 338 C144 344, 100 345, 36 338 C50 320, 74 285, 84 260 C76 220, 78 170, 83 137 Z"
        fill={`url(#ternoGrad-${primaryColor})`}
      />

      {/* Flounce / Flare highlight */}
      <path
        d="M84 260 Q100 270 116 260 Q145 315 164 338 Q100 346 36 338 Q55 315 84 260 Z"
        fill="#000000"
        opacity="0.12"
      />
      <path
        d="M100 137 V342"
        stroke="#FFFFFF"
        strokeWidth="1.2"
        opacity="0.25"
      />
    </svg>
  );
};

/**
 * Male Guest Button-Down Dress Shirt / Polo & Slacks
 */
export const MalePoloShirtGraphic: React.FC<GraphicProps> = ({
  primaryColor,
  accentColor = '#2B2725', // slacks color
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`shirtGrad-${primaryColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="30%" stopColor={primaryColor} stopOpacity="0.88" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Head / Mannequin neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Shirt Collar (Classic Turn-down collar) */}
      <path d="M84 64 L100 78 L94 62 Z" fill="#FFFFFF" stroke="#D1C4B7" strokeWidth="1" />
      <path d="M116 64 L100 78 L106 62 Z" fill="#FFFFFF" stroke="#D1C4B7" strokeWidth="1" />
      <path d="M94 62 H106 L100 68 Z" fill="#C2A379" />

      {/* Left Long Sleeve */}
      <path
        d="M74 68 C64 80, 52 110, 48 152 C54 154, 62 153, 66 148 C70 118, 76 94, 82 72 Z"
        fill={`url(#shirtGrad-${primaryColor})`}
        stroke="#E0D5C7"
        strokeWidth="1"
      />
      {/* Cuff */}
      <rect x="47" y="148" width="18" height="7" rx="2" fill="#FFFFFF" stroke="#C2A379" strokeWidth="1" />

      {/* Right Long Sleeve */}
      <path
        d="M126 68 C136 80, 148 110, 152 152 C146 154, 138 153, 134 148 C130 118, 124 94, 118 72 Z"
        fill={`url(#shirtGrad-${primaryColor})`}
        stroke="#E0D5C7"
        strokeWidth="1"
      />
      {/* Cuff */}
      <rect x="135" y="148" width="18" height="7" rx="2" fill="#FFFFFF" stroke="#C2A379" strokeWidth="1" />

      {/* Shirt Torso (Neat tailored fit, button placket) */}
      <path
        d="M78 68 C88 72, 112 72, 122 68 L124 165 C110 167, 90 167, 76 165 Z"
        fill={`url(#shirtGrad-${primaryColor})`}
        stroke="#E0D5C7"
        strokeWidth="1"
      />

      {/* Center Placket & Buttons */}
      <rect x="97" y="78" width="6" height="87" fill="#FFFFFF" opacity="0.6" />
      <circle cx="100" cy="88" r="1.8" fill="#555" />
      <circle cx="100" cy="104" r="1.8" fill="#555" />
      <circle cx="100" cy="120" r="1.8" fill="#555" />
      <circle cx="100" cy="136" r="1.8" fill="#555" />
      <circle cx="100" cy="152" r="1.8" fill="#555" />

      {/* Chest Pocket */}
      <path d="M82 92 H93 V105 L87.5 109 L82 105 Z" fill="#FFFFFF" opacity="0.4" stroke="#D1C4B7" strokeWidth="0.8" />

      {/* Formal Belt with Gold Buckle */}
      <rect x="76" y="165" width="48" height="8" fill="#1C1816" rx="1" />
      <rect x="96" y="164" width="8" height="10" rx="1" fill="#C2A379" />

      {/* Formal Dark Slacks / Trousers */}
      <path d="M77 173 L98 173 L96 328 H72 L77 173 Z" fill={accentColor} />
      <line x1="85" y1="180" x2="84" y2="328" stroke="#4A4440" strokeWidth="1" />

      <path d="M102 173 L123 173 L128 328 H104 L102 173 Z" fill={accentColor} />
      <line x1="115" y1="180" x2="116" y2="328" stroke="#4A4440" strokeWidth="1" />

      {/* Formal Dress Shoes */}
      <path d="M68 328 H96 L98 340 H64 L68 328 Z" fill="#151210" rx="2" />
      <path d="M104 328 H132 L136 340 H102 L104 328 Z" fill="#151210" rx="2" />
      <ellipse cx="78" cy="334" rx="6" ry="2" fill="#FFFFFF" opacity="0.2" />
      <ellipse cx="122" cy="334" rx="6" ry="2" fill="#FFFFFF" opacity="0.2" />
    </svg>
  );
};

/**
 * Male Traditional Barong Tagalog (Piña / Jusi with Embroidery)
 */
export const MaleBarongGraphic: React.FC<GraphicProps> = ({
  primaryColor = '#FAF5EB',
  accentColor = '#25211E',
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Head / Neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Mandarin Stand-up Collar */}
      <path d="M88 62 H112 V67 H88 Z" fill="#FAF3E6" stroke="#C2A379" strokeWidth="1.2" />

      {/* Inner Camisa de Chino */}
      <path d="M84 67 H116 L118 168 H82 Z" fill="#FFFFFF" opacity="0.85" />

      {/* Barong Outer Sheer Body */}
      <path
        d="M76 66 C86 70, 114 70, 124 66 L128 175 C112 178, 88 178, 72 175 Z"
        fill="#FAF5EC"
        stroke="#D9CBB7"
        strokeWidth="1"
      />

      {/* Left Embroidered Long Sleeve */}
      <path
        d="M74 66 C64 80, 52 110, 46 156 C52 158, 60 157, 64 152 C68 120, 74 96, 80 70 Z"
        fill="#FAF5EC"
        stroke="#D9CBB7"
        strokeWidth="1"
      />
      <rect x="47" y="148" width="16" height="7" fill="#FAF5EC" stroke="#C2A379" strokeWidth="1" />
      <line x1="49" y1="151.5" x2="61" y2="151.5" stroke="#C2A379" strokeWidth="1" strokeDasharray="1 1" />

      {/* Right Embroidered Long Sleeve */}
      <path
        d="M126 66 C136 80, 148 110, 154 156 C148 158, 140 157, 136 152 C132 120, 126 96, 120 70 Z"
        fill="#FAF5EC"
        stroke="#D9CBB7"
        strokeWidth="1"
      />
      <rect x="137" y="148" width="16" height="7" fill="#FAF5EC" stroke="#C2A379" strokeWidth="1" />
      <line x1="139" y1="151.5" x2="151" y2="151.5" stroke="#C2A379" strokeWidth="1" strokeDasharray="1 1" />

      {/* Pechera Embroidery */}
      <rect x="88" y="68" width="24" height="65" rx="3" fill="#FFFDF8" stroke="#C2A379" strokeWidth="1.2" />
      <path d="M92 74 H108 M92 84 H108 M92 94 H108 M92 104 H108 M92 114 H108 M92 124 H108" stroke="#C2A379" strokeWidth="0.8" strokeDasharray="2 1.5" />
      <line x1="100" y1="68" x2="100" y2="133" stroke="#8E4585" strokeWidth="1" opacity="0.6" />
      <circle cx="100" cy="78" r="1.5" fill="#A88B64" />
      <circle cx="100" cy="92" r="1.5" fill="#A88B64" />
      <circle cx="100" cy="106" r="1.5" fill="#A88B64" />
      <circle cx="100" cy="120" r="1.5" fill="#A88B64" />

      {/* Side Slits */}
      <line x1="72" y1="160" x2="72" y2="175" stroke="#C2A379" strokeWidth="1.5" />
      <line x1="128" y1="160" x2="128" y2="175" stroke="#C2A379" strokeWidth="1.5" />

      {/* Formal Dark Slacks */}
      <path d="M74 175 L98 175 L96 328 H72 L74 175 Z" fill={accentColor} />
      <line x1="85" y1="180" x2="84" y2="328" stroke="#4A4440" strokeWidth="1" />

      <path d="M102 175 L126 175 L128 328 H104 L102 175 Z" fill={accentColor} />
      <line x1="115" y1="180" x2="116" y2="328" stroke="#4A4440" strokeWidth="1" />

      {/* Formal Shoes */}
      <path d="M68 328 H96 L98 340 H64 L68 328 Z" fill="#151210" rx="2" />
      <path d="M104 328 H132 L136 340 H102 L104 328 Z" fill="#151210" rx="2" />
    </svg>
  );
};

/**
 * Male Tailored Formal Suit & Tie (Guest)
 */
export const MaleSuitGraphic: React.FC<GraphicProps> = ({
  primaryColor,
  accentColor = '#221E2A',
  className = 'w-full h-full',
}) => {
  const safeColorId = primaryColor.replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Suit fabric gradient with natural lighting and depth */}
        <linearGradient id={`suitGrad-${safeColorId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="1" />
          <stop offset="60%" stopColor={primaryColor} stopOpacity="0.94" />
          <stop offset="100%" stopColor="#120A1A" stopOpacity="0.32" />
        </linearGradient>

        {/* Lapel gradient with subtle sheen */}
        <linearGradient id={`lapelGrad-${safeColorId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="30%" stopColor={primaryColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#0B0612" stopOpacity="0.28" />
        </linearGradient>

        {/* Silk Tie gradient matching motif */}
        <linearGradient id={`tieGrad-${safeColorId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
          <stop offset="35%" stopColor={primaryColor} stopOpacity="1" />
          <stop offset="100%" stopColor="#12051E" stopOpacity="0.45" />
        </linearGradient>

        {/* Suit soft shadow */}
        <filter id={`suitShadow-${safeColorId}`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Head / Neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* White Dress Shirt V-opening */}
      <path d="M87 64 L100 118 L113 64 Z" fill="#FFFFFF" />
      {/* Shirt collar wings */}
      <polygon points="86,64 96,73 93,64" fill="#F4EFEB" />
      <polygon points="114,64 104,73 107,64" fill="#F4EFEB" />

      {/* Silk Tie in Matching Selected Motif Color */}
      <path
        d="M97 68 L103 68 L105 114 L100 128 L95 114 Z"
        fill={`url(#tieGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="0.8"
      />
      {/* Tie knot in Matching Motif Color */}
      <polygon
        points="96,66 104,66 103,74 97,74"
        fill={primaryColor}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="0.8"
      />
      {/* Tie center crease */}
      <line x1="100" y1="74" x2="100" y2="124" stroke="rgba(255,255,255,0.3)" strokeWidth="0.75" />

      {/* Left Suit Jacket Sleeve in Motif Color */}
      <path
        d="M72 66 C62 78, 48 112, 44 156 C50 158, 60 157, 64 151 C68 120, 74 96, 78 70 Z"
        fill={`url(#suitGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />
      {/* White shirt cuff peek */}
      <rect x="43" y="154" width="18" height="4" fill="#FFFFFF" rx="1" />
      {/* Cuff buttons */}
      <circle cx="58" cy="148" r="1.2" fill="#D4AF37" />
      <circle cx="55" cy="149" r="1.2" fill="#D4AF37" />

      {/* Right Suit Jacket Sleeve in Motif Color */}
      <path
        d="M128 66 C138 78, 152 112, 156 156 C150 158, 140 157, 136 151 C132 120, 126 96, 122 70 Z"
        fill={`url(#suitGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />
      {/* White shirt cuff peek */}
      <rect x="139" y="154" width="18" height="4" fill="#FFFFFF" rx="1" />
      {/* Cuff buttons */}
      <circle cx="142" cy="148" r="1.2" fill="#D4AF37" />
      <circle cx="145" cy="149" r="1.2" fill="#D4AF37" />

      {/* Left Jacket Body in Motif Color */}
      <path
        d="M76 66 L86 112 L98 152 L98 180 L70 176 Z"
        fill={`url(#suitGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
        filter={`url(#suitShadow-${safeColorId})`}
      />

      {/* Right Jacket Body in Motif Color */}
      <path
        d="M124 66 L114 112 L102 152 L102 180 L130 176 Z"
        fill={`url(#suitGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />

      {/* Left Notch Lapel in Motif Color */}
      <polygon
        points="76,66 89,102 78,110 100,148 88,104"
        fill={`url(#lapelGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1"
      />
      {/* Lapel edge highlight */}
      <polyline points="76,66 89,102 78,110 100,148" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {/* Right Notch Lapel in Motif Color */}
      <polygon
        points="124,66 111,102 122,110 100,148 112,104"
        fill={`url(#lapelGrad-${safeColorId})`}
        stroke="rgba(0,0,0,0.25)"
        strokeWidth="1"
      />
      {/* Lapel edge highlight */}
      <polyline points="124,66 111,102 122,110 100,148" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />

      {/* Breast Welt Pocket with Pocket Square */}
      <polygon points="78,106 87,101 89,107 80,109" fill="#FFFFFF" />
      <line x1="77" y1="108" x2="89" y2="108" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />

      {/* Jacket Front Closure & Gold Buttons */}
      <circle cx="100" cy="148" r="2.5" fill="#D4AF37" stroke="#6B521E" strokeWidth="0.6" />
      <circle cx="100" cy="162" r="2.5" fill="#D4AF37" stroke="#6B521E" strokeWidth="0.6" />

      {/* Formal Trousers (Dark Slacks) */}
      <path d="M76 178 L98 178 L96 328 H72 L76 178 Z" fill={accentColor} />
      <line x1="85" y1="184" x2="84" y2="328" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      <path d="M102 178 L124 178 L128 328 H104 L102 178 Z" fill={accentColor} />
      <line x1="115" y1="184" x2="116" y2="328" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Formal Leather Shoes */}
      <path d="M68 328 H96 L98 340 H64 L68 328 Z" fill="#151210" rx="2" />
      <path d="M104 328 H132 L136 340 H102 L104 328 Z" fill="#151210" rx="2" />
      <line x1="72" y1="334" x2="90" y2="334" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
      <line x1="110" y1="334" x2="128" y2="334" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
    </svg>
  );
};

/**
 * Ninang (Female Principal Sponsor) Elegant Champagne/Cream Gown
 */
export const NinangSponsorGownGraphic: React.FC<GraphicProps> = ({
  primaryColor = '#F7E7CE',
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`sponsorGown-${primaryColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#D8BE9B" />
        </linearGradient>
      </defs>

      {/* Head / Neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Pearl Necklace Accent */}
      <path d="M90 64 C94 69, 106 69, 110 64" stroke="#FAF5EE" strokeWidth="2.5" strokeDasharray="3 1" />

      {/* Elegant Draped Capelet / Sleeves (Modest & Regal for Principal Sponsor) */}
      <path
        d="M80 66 C65 74, 46 95, 42 128 C56 136, 76 132, 82 120 C82 95, 80 80, 80 66 Z"
        fill={`url(#sponsorGown-${primaryColor})`}
        stroke="#C2A379"
        strokeWidth="0.8"
      />
      <path
        d="M120 66 C135 74, 154 95, 158 128 C144 136, 124 132, 118 120 C118 95, 120 80, 120 66 Z"
        fill={`url(#sponsorGown-${primaryColor})`}
        stroke="#C2A379"
        strokeWidth="0.8"
      />

      {/* Bodice with delicate gold filigree */}
      <path
        d="M82 66 C92 70, 108 70, 118 66 L120 134 C108 136, 92 136, 80 134 Z"
        fill={`url(#sponsorGown-${primaryColor})`}
        stroke="#C2A379"
        strokeWidth="1"
      />
      <path d="M92 80 Q100 88 108 80 Q100 96 92 80" fill="none" stroke="#C2A379" strokeWidth="1" />
      <path d="M92 100 Q100 108 108 100 Q100 116 92 100" fill="none" stroke="#C2A379" strokeWidth="1" />

      {/* Waistband in Champagne Gold */}
      <rect x="80" y="132" width="40" height="7" rx="2" fill="#C2A379" />

      {/* Flowing Regal Floor-length Skirt */}
      <path
        d="M80 139 C94 141, 106 141, 120 139 C138 185, 160 280, 170 336 C148 344, 100 346, 30 336 C40 280, 62 185, 80 139 Z"
        fill={`url(#sponsorGown-${primaryColor})`}
        stroke="#D9C3A5"
        strokeWidth="1"
      />

      {/* Silk Drape / Cascade */}
      <path
        d="M100 139 C98 210, 88 280, 75 340 C85 342, 95 342, 100 341 C115 280, 118 210, 100 139 Z"
        fill="#FFFFFF"
        opacity="0.3"
      />
    </svg>
  );
};

/**
 * Ninong (Male Principal Sponsor) Formal Tailored Suit & Tie in Champagne / Cream / Soft Beige
 */
export const NinongSuitGraphic: React.FC<GraphicProps> = ({
  primaryColor = '#F7E7CE',
  accentColor = '#3A332B',
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ninongSuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="40%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#CBB595" />
        </linearGradient>
      </defs>

      {/* Head / Neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Crisp White Shirt V-cut */}
      <path d="M88 64 L100 115 L112 64 Z" fill="#FFFFFF" />

      {/* Silk Tie in Champagne Gold */}
      <path
        d="M97 68 L103 68 L104 112 L100 126 L96 112 Z"
        fill="#C2A379"
        stroke="#FFFFFF"
        strokeWidth="0.5"
      />
      <polygon points="96,66 104,66 102,73 98,73" fill="#A88B64" />

      {/* Suit Sleeves in Champagne / Neutral */}
      <path
        d="M72 66 C62 78, 48 112, 44 156 C50 158, 60 157, 64 151 C68 120, 74 96, 78 70 Z"
        fill="url(#ninongSuitGrad)"
        stroke="#D1BEA4"
        strokeWidth="1"
      />
      <rect x="43" y="154" width="18" height="4" fill="#FFFFFF" rx="1" />

      <path
        d="M128 66 C138 78, 152 112, 156 156 C150 158, 140 157, 136 151 C132 120, 126 96, 122 70 Z"
        fill="url(#ninongSuitGrad)"
        stroke="#D1BEA4"
        strokeWidth="1"
      />
      <rect x="139" y="154" width="18" height="4" fill="#FFFFFF" rx="1" />

      {/* Jacket Torso with Satin Peak Lapels */}
      <path
        d="M76 66 L86 112 L98 152 L98 180 L70 176 Z"
        fill="url(#ninongSuitGrad)"
        stroke="#D1BEA4"
        strokeWidth="1"
      />
      <path
        d="M124 66 L114 112 L102 152 L102 180 L130 176 Z"
        fill="url(#ninongSuitGrad)"
        stroke="#D1BEA4"
        strokeWidth="1"
      />

      {/* Lapels with subtle gold piping */}
      <polygon points="76,66 88,102 78,110 99,146 88,104" fill="#E8D7C0" stroke="#C2A379" strokeWidth="0.8" />
      <polygon points="124,66 112,102 122,110 101,146 112,104" fill="#E8D7C0" stroke="#C2A379" strokeWidth="0.8" />

      {/* Gold Silk Pocket Square */}
      <polygon points="80,105 87,100 89,106 82,108" fill="#C2A379" />

      {/* Gold Buttons */}
      <circle cx="100" cy="148" r="2.2" fill="#C2A379" />

      {/* Formal Dark Slacks */}
      <path d="M76 178 L98 178 L96 328 H72 L76 178 Z" fill={accentColor} />
      <line x1="85" y1="184" x2="84" y2="328" stroke="#4A4440" strokeWidth="1" />

      <path d="M102 178 L124 178 L128 328 H104 L102 178 Z" fill={accentColor} />
      <line x1="115" y1="184" x2="116" y2="328" stroke="#4A4440" strokeWidth="1" />

      {/* Formal Dress Shoes */}
      <path d="M68 328 H96 L98 340 H64 L68 328 Z" fill="#151210" rx="2" />
      <path d="M104 328 H132 L136 340 H102 L104 328 Z" fill="#151210" rx="2" />
      <ellipse cx="78" cy="334" rx="6" ry="2" fill="#FFFFFF" opacity="0.25" />
      <ellipse cx="122" cy="334" rx="6" ry="2" fill="#FFFFFF" opacity="0.25" />
    </svg>
  );
};

/**
 * Ninong (Male Principal Sponsor) Formal Button-Down Dress Shirt / Silk Polo & Slacks
 */
export const NinongDressShirtGraphic: React.FC<GraphicProps> = ({
  primaryColor = '#FFFDD0',
  accentColor = '#24201C',
  className = 'w-full h-full',
}) => {
  return (
    <svg
      viewBox="0 0 200 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="ninongShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#EDE1CE" />
        </linearGradient>
      </defs>

      {/* Head / Neck */}
      <circle cx="100" cy="36" r="14" fill="#E8DCD1" />
      <path d="M96 50 H104 V62 H96 Z" fill="#D9C7B8" />

      {/* Formal Turn-down Collar in Cream/Champagne */}
      <path d="M84 64 L100 78 L94 62 Z" fill="#FFFDF7" stroke="#C2A379" strokeWidth="1" />
      <path d="M116 64 L100 78 L106 62 Z" fill="#FFFDF7" stroke="#C2A379" strokeWidth="1" />
      <path d="M94 62 H106 L100 68 Z" fill="#C2A379" />

      {/* Left Long Sleeve */}
      <path
        d="M74 68 C64 80, 52 110, 48 152 C54 154, 62 153, 66 148 C70 118, 76 94, 82 72 Z"
        fill="url(#ninongShirtGrad)"
        stroke="#D9CBBB"
        strokeWidth="1"
      />
      <rect x="47" y="148" width="18" height="7" rx="2" fill="#FFFDF7" stroke="#C2A379" strokeWidth="1" />

      {/* Right Long Sleeve */}
      <path
        d="M126 68 C136 80, 148 110, 152 152 C146 154, 138 153, 134 148 C130 118, 124 94, 118 72 Z"
        fill="url(#ninongShirtGrad)"
        stroke="#D9CBBB"
        strokeWidth="1"
      />
      <rect x="135" y="148" width="18" height="7" rx="2" fill="#FFFDF7" stroke="#C2A379" strokeWidth="1" />

      {/* Shirt Torso in Luxury Champagne/Cream Silk */}
      <path
        d="M78 68 C88 72, 112 72, 122 68 L124 165 C110 167, 90 167, 76 165 Z"
        fill="url(#ninongShirtGrad)"
        stroke="#D9CBBB"
        strokeWidth="1"
      />

      {/* Gold Button Placket */}
      <rect x="97" y="78" width="6" height="87" fill="#FFFFFF" opacity="0.7" />
      <circle cx="100" cy="88" r="1.8" fill="#C2A379" />
      <circle cx="100" cy="104" r="1.8" fill="#C2A379" />
      <circle cx="100" cy="120" r="1.8" fill="#C2A379" />
      <circle cx="100" cy="136" r="1.8" fill="#C2A379" />
      <circle cx="100" cy="152" r="1.8" fill="#C2A379" />

      {/* Pocket with subtle embroidery stitch */}
      <path d="M82 92 H93 V105 L87.5 109 L82 105 Z" fill="#FFFDF7" stroke="#C2A379" strokeWidth="0.8" />
      <line x1="84" y1="96" x2="91" y2="96" stroke="#C2A379" strokeWidth="0.8" strokeDasharray="1 1" />

      {/* Belt with Gold Buckle */}
      <rect x="76" y="165" width="48" height="8" fill="#1C1816" rx="1" />
      <rect x="96" y="164" width="8" height="10" rx="1" fill="#C2A379" />

      {/* Formal Dark Slacks */}
      <path d="M77 173 L98 173 L96 328 H72 L77 173 Z" fill={accentColor} />
      <line x1="85" y1="180" x2="84" y2="328" stroke="#4A4440" strokeWidth="1" />

      <path d="M102 173 L123 173 L128 328 H104 L102 173 Z" fill={accentColor} />
      <line x1="115" y1="180" x2="116" y2="328" stroke="#4A4440" strokeWidth="1" />

      {/* Formal Dress Shoes */}
      <path d="M68 328 H96 L98 340 H64 L68 328 Z" fill="#151210" rx="2" />
      <path d="M104 328 H132 L136 340 H102 L104 328 Z" fill="#151210" rx="2" />
      <ellipse cx="78" cy="334" rx="6" ry="2" fill="#FFFFFF" opacity="0.2" />
      <ellipse cx="122" cy="334" rx="6" ry="2" fill="#FFFFFF" opacity="0.2" />
    </svg>
  );
};
