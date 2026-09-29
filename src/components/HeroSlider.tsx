import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSliderProps {
  onInitiateRFQ: () => void;
  onOpenPartsSearch: () => void;
  onExploreInventory?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onInitiateRFQ, onOpenPartsSearch, onExploreInventory }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#02060D]">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/HAMMER/banner-background.png" 
          alt="Precision Industrial Engineering"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 xl:px-20 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.4em] text-[#FFB800]">
                <span className="w-8 h-px bg-[#FFB800]"></span>
                Global Industrial Logistics
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                Precision <br />
                <span className="text-[#FFB800]">Engineering</span> <br />
                Redefined.
              </h1>
              <p className="text-sm sm:text-base text-slate-400 font-medium max-w-xl leading-relaxed">
                Hammer Industrial connects global buyers with verified Canadian supply chains. Delivering high-performance heavy equipment parts and seamless cross-border logistics.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onInitiateRFQ}
                className="bg-[#FFB800] hover:bg-white text-[#02060D] font-black px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] shadow-2xl shadow-[#FFB800]/20 flex items-center gap-3 hover:-translate-y-0.5 hover:scale-104 active:scale-95 transition-all duration-300"
              >
                REQUEST QUOTA <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onExploreInventory || onOpenPartsSearch}
                className="bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-full text-xs uppercase tracking-[0.2em] backdrop-blur-md flex items-center gap-3 btn-glass-hover hover:-translate-y-0.5 hover:scale-104 active:scale-95 transition-all duration-300"
              >
                Explore Parts Inventory <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Stats Bar */}
            <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 gap-12 border-t border-white/10">
              <div>
                <div className="text-3xl font-black text-white tabular-nums">20+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Years Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-black text-white tabular-nums">30k+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Verified Parts</div>
              </div>
              <div className="hidden sm:block">
                <div className="text-3xl font-black text-white tabular-nums">150+</div>
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Global Partners</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Image */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative group"
          >
            <div className="absolute -inset-4 bg-[#FFB800]/10 rounded-[60px] blur-2xl group-hover:bg-[#FFB800]/20 transition-colors duration-700"></div>
            <div className="relative rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/JCB.jfif" 
                alt="Heavy Machinery Showcase" 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
