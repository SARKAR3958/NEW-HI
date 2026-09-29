import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Youtube, Globe, User, LogIn } from 'lucide-react';

export const TopHeaderBar: React.FC = () => {
  return (
    <div className="bg-[#02060D] text-white text-[10px] sm:text-xs py-2 px-4 sm:px-8 border-b border-slate-800/80 font-sans relative z-40">
      <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Language & Slogan */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#FFB800] transition-colors">
            <Globe className="w-3 h-3 text-[#FFB800]" />
            <span className="font-bold flex items-center gap-1">
              English
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </span>
          </div>
          <div className="hidden md:block font-bold text-[#FFB800] tracking-wide uppercase italic">
            Guaranteed Industrial Solutions, Built On Quality & Commitment.
          </div>
        </div>

        {/* Right: Contact, Socials & Auth Icons */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto">
          {/* Email */}
          <a
            href="mailto:info@hammerindustrial.co"
            className="flex items-center gap-1.5 hover:text-[#FFB800] transition-colors font-bold"
          >
            <Mail className="w-3.5 h-3.5 text-[#FFB800]" />
            <span className="hidden sm:inline">info@hammerindustrial.co</span>
          </a>

          {/* Social Icons */}
          <div className="flex items-center gap-3 text-slate-300">
            <a href="#" className="hover:text-white transition-colors"><Facebook className="w-3 h-3" /></a>
            <a href="#" className="hover:text-white transition-colors"><Twitter className="w-3 h-3" /></a>
            <a href="#" className="hover:text-white transition-colors"><Instagram className="w-3 h-3" /></a>
            <a href="#" className="hover:text-white transition-colors"><Youtube className="w-3 h-3" /></a>
          </div>

          <div className="flex items-center gap-3 border-l border-slate-700 pl-4">
            <button className="hover:text-[#FFB800] transition-colors"><User className="w-3.5 h-3.5" /></button>
            <button className="hover:text-[#FFB800] transition-colors"><LogIn className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};
