import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-[#02060D] text-white py-20 px-6 lg:px-16 xl:px-20 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-6">
            <button 
              onClick={() => onNavClick('HOME')}
              className="hover:opacity-80 transition-opacity"
            >
              <Logo />
            </button>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-sm">
              Canada&apos;s leading partner for high-performance industrial components and strategic global supply chain solutions. Delivering excellence across the heavy equipment industry.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Capabilities</h4>
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
              <button onClick={() => onNavClick('PRODUCTS')} className="text-left hover:text-[#FFB800] transition-colors">Inventory</button>
              <button onClick={() => onNavClick('MACHINERY')} className="text-left hover:text-[#FFB800] transition-colors">Machinery</button>
              <button onClick={() => onNavClick('BRANDS')} className="text-left hover:text-[#FFB800] transition-colors">OEM Brands</button>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Company</h4>
            <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest">
              <button onClick={() => onNavClick('COMPANY')} className="text-left hover:text-[#FFB800] transition-colors">About Us</button>
              <button onClick={() => onNavClick('MARKETS')} className="text-left hover:text-[#FFB800] transition-colors">Markets</button>
              <button onClick={() => onNavClick('CONTACT')} className="text-left hover:text-[#FFB800] transition-colors">Contact</button>
            </div>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-4 space-y-6 md:text-right">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 md:justify-end flex">Global Presence</h4>
            <div className="flex items-center gap-4 md:justify-end">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFB800]/10 hover:border-[#FFB800] hover:text-[#FFB800] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFB800]/10 hover:border-[#FFB800] hover:text-[#FFB800] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFB800]/10 hover:border-[#FFB800] hover:text-[#FFB800] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#FFB800]/10 hover:border-[#FFB800] hover:text-[#FFB800] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"><Youtube className="w-4 h-4" /></a>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 pt-4">
              Toronto • Vancouver • Dubai • Singapore
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
            © 2026 Hammer Industrial Canada. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Strategy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
