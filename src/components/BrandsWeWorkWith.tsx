import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollReveal';

interface BrandsWeWorkWithProps {
  onBrandClick?: (brandName: string) => void;
}

export const BrandsWeWorkWith: React.FC<BrandsWeWorkWithProps> = ({ onBrandClick }) => {
  const brands = [
    { name: 'Caterpillar', img: '/HAMMER/Cat_logo_PNG1.png' },
    { name: 'Komatsu', img: '/HAMMER/Komatsu_logo_PNG1.png' },
    { name: 'Liebherr', img: '/HAMMER/Liebherr_logo_PNG4.png' },
    { name: 'Epiroc', img: '/HAMMER/Epiroc-Blue.png' },
    { name: 'Hyundai', img: '/HAMMER/pngwing.com-1.png' },
    { name: 'Hitachi', img: '/HAMMER/pngwing.com-3.png' },
    { name: 'Volvo', img: '/HAMMER/pngwing.com-4.png' },
    { name: 'Doosan', img: '/HAMMER/pngwing.com-5.png' },
    { name: 'Sany', img: '/HAMMER/pngwing.com-6.png' }
  ];

  // Double the brands array for a seamless loop
  const marqueeBrands = [...brands, ...brands];

  return (
    <section id="brands-section" className="pt-32 pb-24 px-6 bg-[#02060D] text-white overflow-hidden">
      <div className="max-w-[1600px] mx-auto space-y-16">
        
        {/* Title Block with ScrollReveal */}
        <ScrollReveal y={30}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
                <span className="w-6 h-px bg-[#FFB800]"></span>
                OEM Infrastructure
              </div>
              <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-tight text-white">
                Strategic Partners <br />
                <span className="text-slate-400">& Global Brands.</span>
              </h2>
            </div>
            
            <button 
              onClick={() => onBrandClick && onBrandClick('All')}
              className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white border-b-2 border-[#FFB800] pb-2 hover:text-[#FFB800] transition-colors cursor-pointer"
            >
              View Full Brand Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </ScrollReveal>

        {/* Marquee Slider with ScrollReveal */}
        <ScrollReveal y={40} delay={0.25}>
          <div className="relative bg-white/5 border border-white/5 rounded-[40px] shadow-sm overflow-hidden group">
            <div className="flex overflow-hidden">
              <motion.div 
                className="flex items-center min-w-full"
                animate={{
                  x: [0, -1000] 
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ x: 0 }}
              >
                {marqueeBrands.map((brand, idx) => (
                  <div
                    key={idx}
                    onClick={() => onBrandClick && onBrandClick(brand.name)}
                    className="flex flex-col items-center justify-center shrink-0 w-[250px] h-[180px] border-r border-white/5 last:border-0 hover:bg-white/5 transition-all cursor-pointer group/brand"
                  >
                    <div className="h-16 w-32 flex items-center justify-center mb-4">
                      <img
                        src={brand.img}
                        alt={brand.name}
                        className="max-h-full max-w-full object-contain group-hover/brand:scale-110 transition-all duration-500"
                      />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/brand:text-white transition-colors">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Fading Overlays */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#02060D] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#02060D] to-transparent z-10 pointer-events-none"></div>
          </div>
        </ScrollReveal>
        
      </div>
    </section>
  );
};
