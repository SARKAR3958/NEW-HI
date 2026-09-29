import React from 'react';

interface LogoProps {
  className?: string;
  white?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", white = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Box */}
      <div className="w-10 h-10 border border-[#FFB800] rounded-[2px] p-0 flex items-center justify-center bg-black overflow-hidden">
        <img 
          src="/FAVIVON.png" 
          alt="Hammer Logo" 
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/HAMMER.webp';
          }}
        />
      </div>

      {/* Text Branding */}
      <div className="flex flex-col justify-center leading-none">
        <span className={`font-black text-2xl tracking-tighter uppercase italic ${white ? 'text-white' : 'text-[#02060D]'}`}>
          Hammer
        </span>
        <span className="font-black text-[10px] text-[#FFB800] uppercase tracking-[0.3em] mt-0.5">
          Industrial
        </span>
      </div>
    </div>
  );
};
