import React from 'react';

interface MachineryPartGraphicProps {
  partId: string;
  className?: string;
}

export const MachineryPartGraphic: React.FC<MachineryPartGraphicProps> = ({ partId, className = 'w-full h-full' }) => {
  switch (partId) {
    // Komatsu Heavy Duty Track Chain Assembly
    case 'p-101':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2A2E35" />
              <stop offset="50%" stopColor="#1E2228" />
              <stop offset="100%" stopColor="#121519" />
            </linearGradient>
            <linearGradient id="goldSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" />
              <stop offset="50%" stopColor="#D98205" />
              <stop offset="100%" stopColor="#8C4E00" />
            </linearGradient>
            <linearGradient id="silverPin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0B132B" />
          {/* Track chain links */}
          <g transform="translate(20, 40)">
            {/* Top link track */}
            <path d="M20 30 C20 15, 70 15, 70 30 L110 30 C110 15, 160 15, 160 30 L200 30 C200 15, 250 15, 250 30 L250 50 C250 65, 200 65, 200 50 L160 50 C160 65, 110 65, 110 50 L70 50 C70 65, 20 65, 20 50 Z" fill="url(#goldSteel)" stroke="#332000" strokeWidth="2" />
            {/* Bottom link track */}
            <path d="M20 70 C20 55, 70 55, 70 70 L110 70 C110 55, 160 55, 160 70 L200 70 C200 55, 250 55, 250 70 L250 90 C250 105, 200 105, 200 90 L160 90 C160 105, 110 105, 110 90 L70 90 C70 105, 20 105, 20 90 Z" fill="url(#metalDark)" stroke="#475569" strokeWidth="2" />
            {/* Steel Pins & Bushings */}
            <circle cx="45" cy="40" r="14" fill="url(#silverPin)" stroke="#0F172A" strokeWidth="3" />
            <circle cx="45" cy="40" r="6" fill="#1E293B" />
            <circle cx="135" cy="40" r="14" fill="url(#silverPin)" stroke="#0F172A" strokeWidth="3" />
            <circle cx="135" cy="40" r="6" fill="#1E293B" />
            <circle cx="225" cy="40" r="14" fill="url(#silverPin)" stroke="#0F172A" strokeWidth="3" />
            <circle cx="225" cy="40" r="6" fill="#1E293B" />

            <circle cx="45" cy="80" r="14" fill="url(#silverPin)" stroke="#0F172A" strokeWidth="3" />
            <circle cx="45" cy="80" r="6" fill="#1E293B" />
            <circle cx="135" cy="80" r="14" fill="url(#silverPin)" stroke="#0F172A" strokeWidth="3" />
            <circle cx="135" cy="80" r="6" fill="#1E293B" />
            <circle cx="225" cy="80" r="14" fill="url(#silverPin)" stroke="#0F172A" strokeWidth="3" />
            <circle cx="225" cy="80" r="6" fill="#1E293B" />
          </g>
          {/* Technical blueprint overlay grid */}
          <line x1="10" y1="175" x2="290" y2="175" stroke="#38BDF8" strokeWidth="0.8" strokeDasharray="4 4" />
          <text x="15" y="190" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">HEAVY FORGED ALLOY STEEL • PITCH 203MM</text>
        </svg>
      );

    // Hyundai Main Hydraulic Pump Assembly (K3V112DT)
    case 'p-102':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pumpSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <linearGradient id="brassPort" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0C1427" />
          {/* Main Hydraulic Tandem Housing */}
          <g transform="translate(35, 30)">
            {/* Front Flange */}
            <rect x="15" y="45" width="22" height="70" rx="3" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
            {/* Drive Spline Shaft */}
            <rect x="0" y="65" width="18" height="30" rx="2" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" />
            {/* Primary Pump Casing */}
            <rect x="37" y="30" width="85" height="100" rx="6" fill="url(#pumpSteel)" stroke="#64748B" strokeWidth="2" />
            {/* Secondary Tandem Pump Casing */}
            <rect x="122" y="35" width="75" height="90" rx="6" fill="url(#pumpSteel)" stroke="#64748B" strokeWidth="2" />
            {/* Rear Regulator Block */}
            <rect x="197" y="45" width="35" height="70" rx="4" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />

            {/* High Pressure Valve Ports */}
            <circle cx="80" cy="55" r="16" fill="url(#brassPort)" stroke="#78350F" strokeWidth="2" />
            <circle cx="80" cy="55" r="7" fill="#451A03" />
            <circle cx="160" cy="55" r="14" fill="url(#brassPort)" stroke="#78350F" strokeWidth="2" />
            <circle cx="160" cy="55" r="6" fill="#451A03" />

            {/* Flange Bolt Holes */}
            <circle cx="26" cy="55" r="3.5" fill="#0F172A" />
            <circle cx="26" cy="105" r="3.5" fill="#0F172A" />

            {/* Casing Cooling Ribs */}
            <line x1="55" y1="85" x2="105" y2="85" stroke="#94A3B8" strokeWidth="2" />
            <line x1="55" y1="95" x2="105" y2="95" stroke="#94A3B8" strokeWidth="2" />
            <line x1="55" y1="105" x2="105" y2="105" stroke="#94A3B8" strokeWidth="2" />
          </g>
          <text x="15" y="190" fill="#F5A623" fontSize="9" fontFamily="monospace" fontWeight="bold">AXIAL PISTON TANDEM PUMP • MAX 350 BAR</text>
        </svg>
      );

    // Cummins Fuel Injector Common Rail
    case 'p-103':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="injectorBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="solenoidGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5A623" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0B132B" />
          <g transform="translate(130, 15) rotate(35)">
            {/* Solenoid Top */}
            <rect x="0" y="0" width="30" height="35" rx="3" fill="url(#solenoidGold)" stroke="#7C2D12" strokeWidth="1.5" />
            <rect x="8" y="-12" width="14" height="12" rx="2" fill="#0F172A" />
            {/* Main Injector Body */}
            <rect x="4" y="35" width="22" height="75" fill="url(#injectorBody)" stroke="#1E293B" strokeWidth="1.5" />
            {/* O-Ring Seal */}
            <rect x="2" y="70" width="26" height="6" rx="3" fill="#10B981" />
            {/* Nozzle Cone */}
            <polygon points="4,110 26,110 18,155 12,155" fill="url(#injectorBody)" stroke="#1E293B" strokeWidth="1.5" />
            {/* Spray Tip */}
            <rect x="13" y="155" width="4" height="8" fill="#F8FAFC" />
            {/* High Pressure Fuel Inlet Fitting */}
            <rect x="-18" y="48" width="24" height="12" rx="2" fill="#CBD5E1" stroke="#334155" strokeWidth="1.5" transform="rotate(-30)" />
          </g>
          <text x="15" y="190" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">COMMON RAIL INJECTION • 1800 BAR TESTED</text>
        </svg>
      );

    // JCB Track Tensioner Recoil Spring Group
    case 'p-104':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heavySpring" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="40%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#78350F" />
            </linearGradient>
            <linearGradient id="greaseCylinder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0C1427" />
          <g transform="translate(30, 45)">
            {/* Tensioner Piston Rod */}
            <rect x="10" y="38" width="220" height="24" rx="2" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
            {/* Recoil Spring Coils */}
            <path d="M40 20 Q55 0, 70 20 Q85 40, 70 60 Q55 80, 40 60 Z" fill="url(#heavySpring)" />
            <path d="M75 20 Q90 0, 105 20 Q120 40, 105 60 Q90 80, 75 60 Z" fill="url(#heavySpring)" />
            <path d="M110 20 Q125 0, 140 20 Q155 40, 140 60 Q125 80, 110 60 Z" fill="url(#heavySpring)" />
            <path d="M145 20 Q160 0, 175 20 Q190 40, 175 60 Q160 80, 145 60 Z" fill="url(#heavySpring)" />
            <path d="M180 20 Q195 0, 210 20 Q225 40, 210 60 Q195 80, 180 60 Z" fill="url(#heavySpring)" />
            {/* Grease Cylinder Housing */}
            <rect x="195" y="25" width="45" height="50" rx="4" fill="url(#greaseCylinder)" stroke="#94A3B8" strokeWidth="2" />
            {/* Grease Valve Nipple */}
            <rect x="235" y="44" width="12" height="12" rx="2" fill="#FBBF24" />
          </g>
          <text x="15" y="190" fill="#F5A623" fontSize="9" fontFamily="monospace" fontWeight="bold">HEAVY DUTY RECOIL SPRING • SHOCK ABSORBING</text>
        </svg>
      );

    // Volvo Final Drive Travel Motor Gearbox
    case 'p-105':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="planetarySteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0B132B" />
          <g transform="translate(150, 95)">
            {/* Planetary Gear Outer Hub */}
            <circle cx="0" cy="0" r="68" fill="url(#planetarySteel)" stroke="#F5A623" strokeWidth="3" />
            {/* Bolt Circle */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <circle
                key={i}
                cx={Math.cos((deg * Math.PI) / 180) * 55}
                cy={Math.sin((deg * Math.PI) / 180) * 55}
                r="3.5"
                fill="#CBD5E1"
                stroke="#0F172A"
                strokeWidth="1"
              />
            ))}
            {/* Center Hydraulic Motor Drive */}
            <circle cx="0" cy="0" r="40" fill="#1E293B" stroke="#64748B" strokeWidth="2" />
            <circle cx="0" cy="0" r="22" fill="#0F172A" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Center Spline Gear */}
            <circle cx="0" cy="0" r="10" fill="#F5A623" />
          </g>
          <text x="15" y="190" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">PLANETARY 2-SPEED TRAVEL REDUCTION GEARBOX</text>
        </svg>
      );

    // Caterpillar CAT J450 Rock Chisel Bucket Tooth & Adapter
    case 'p-106':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="catYellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFCD00" />
              <stop offset="50%" stopColor="#E5A900" />
              <stop offset="100%" stopColor="#9E6E00" />
            </linearGradient>
            <linearGradient id="wearSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0C1427" />
          <g transform="translate(40, 40)">
            {/* Bucket Adapter Shank */}
            <polygon points="10,35 90,35 120,50 120,70 90,85 10,85 25,60" fill="url(#wearSteel)" stroke="#64748B" strokeWidth="2" />
            {/* Forged Rock Tooth */}
            <polygon points="100,20 180,45 220,60 180,75 100,100 115,60" fill="url(#catYellow)" stroke="#3D2900" strokeWidth="2" />
            {/* Hardened Chisel Point */}
            <polygon points="200,55 225,60 200,65" fill="#F8FAFC" />
            {/* Pin Lock Hole */}
            <ellipse cx="125" cy="60" rx="6" ry="12" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />
            <line x1="125" y1="45" x2="125" y2="75" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
          </g>
          <text x="15" y="190" fill="#FFCD00" fontSize="9" fontFamily="monospace" fontWeight="bold">FORGED AUSTEMPERED DUCTILE ROCK CHISEL GET</text>
        </svg>
      );

    // Liebherr Swing Bearing Slewing Ring Gear
    case 'p-107':
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bearingSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0B132B" />
          <g transform="translate(150, 95)">
            {/* Outer Bearing Ring */}
            <circle cx="0" cy="0" r="72" fill="none" stroke="url(#bearingSteel)" strokeWidth="16" />
            {/* Inner Ring Teeth */}
            <circle cx="0" cy="0" r="54" fill="none" stroke="#F5A623" strokeWidth="6" strokeDasharray="3 3" />
            {/* Mounting Bolt Circle */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((deg, i) => (
              <circle
                key={i}
                cx={Math.cos((deg * Math.PI) / 180) * 72}
                cy={Math.sin((deg * Math.PI) / 180) * 72}
                r="2.5"
                fill="#0F172A"
              />
            ))}
            {/* Internal Precision Balls */}
            {[10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350].map((deg, i) => (
              <circle
                key={i}
                cx={Math.cos((deg * Math.PI) / 180) * 63}
                cy={Math.sin((deg * Math.PI) / 180) * 63}
                r="3"
                fill="#E2E8F0"
                stroke="#334155"
                strokeWidth="1"
              />
            ))}
          </g>
          <text x="15" y="190" fill="#94A3B8" fontSize="9" fontFamily="monospace" fontWeight="bold">INDUCTION HARDENED 42CrMo SLEWING RING GEAR</text>
        </svg>
      );

    // Rexroth Proportional Hydraulic Control Valve Block
    case 'p-108':
    default:
      return (
        <svg className={className} viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="manifoldBlock" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
          </defs>
          <rect width="300" height="200" fill="#0C1427" />
          <g transform="translate(50, 30)">
            {/* Solid CNC Machined Aluminum/Steel Manifold */}
            <rect x="0" y="30" width="200" height="85" rx="6" fill="url(#manifoldBlock)" stroke="#64748B" strokeWidth="2" />
            {/* Solenoid Coils (Top) */}
            <rect x="25" y="5" width="30" height="25" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="85" y="5" width="30" height="25" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
            <rect x="145" y="5" width="30" height="25" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />

            {/* Hydraulic Working Ports (A & B) */}
            <circle cx="40" cy="55" r="10" fill="#F5A623" stroke="#78350F" strokeWidth="2" />
            <circle cx="40" cy="55" r="4" fill="#0F172A" />
            <circle cx="100" cy="55" r="10" fill="#F5A623" stroke="#78350F" strokeWidth="2" />
            <circle cx="100" cy="55" r="4" fill="#0F172A" />
            <circle cx="160" cy="55" r="10" fill="#F5A623" stroke="#78350F" strokeWidth="2" />
            <circle cx="160" cy="55" r="4" fill="#0F172A" />

            <circle cx="40" cy="90" r="10" fill="#F5A623" stroke="#78350F" strokeWidth="2" />
            <circle cx="40" cy="90" r="4" fill="#0F172A" />
            <circle cx="100" cy="90" r="10" fill="#F5A623" stroke="#78350F" strokeWidth="2" />
            <circle cx="100" cy="90" r="4" fill="#0F172A" />
            <circle cx="160" cy="90" r="10" fill="#F5A623" stroke="#78350F" strokeWidth="2" />
            <circle cx="160" cy="90" r="4" fill="#0F172A" />
          </g>
          <text x="15" y="190" fill="#38BDF8" fontSize="9" fontFamily="monospace" fontWeight="bold">LOAD SENSING PROPORTIONAL VALVE MANIFOLD</text>
        </svg>
      );
  }
};
