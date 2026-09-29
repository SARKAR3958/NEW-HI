import React from 'react';
import { Shield, BarChart3, Package, Globe2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

export const OurAdvantages: React.FC = () => {
  const advantages = [
    {
      title: "Quality Benchmarking",
      desc: "All components are subjected to rigorous testing exceeding OEM durability standards.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Extensive Part Inventory",
      desc: "Access to over 30,000 verified SKUs across mining, construction, and agriculture sectors.",
      icon: <Package className="w-6 h-6" />
    },
    {
      title: "Optimized Pricing Model",
      desc: "Leveraging global supply chain networks to provide high-performance parts at competitive rates.",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "Canadian Export Hub",
      desc: "Seamless cross-border logistics strategy connecting North American supply to global markets.",
      icon: <Globe2 className="w-6 h-6" />
    }
  ];

  return (
    <section className="pt-32 pb-24 px-6 lg:px-16 xl:px-20 bg-[#02060D] text-white">
      <div className="max-w-[1440px] mx-auto space-y-16">
        
        {/* Header Block with ScrollReveal */}
        <ScrollReveal y={30}>
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
              <span className="w-6 h-px bg-[#FFB800]"></span>
              Strategic Advantages
            </div>
            <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-tight text-white">
              Why Industry Leaders <br />
              <span className="text-slate-400">Choose Hammer Industrial.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Staggered Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((item, index) => (
            <StaggerItem key={index}>
              <motion.div 
                whileHover={{ 
                  y: -8,
                  borderColor: "rgba(255, 184, 0, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.07)",
                  boxShadow: "0 25px 35px -5px rgba(255, 184, 0, 0.05)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative group bg-white/5 border border-white/5 rounded-[40px] p-8 sm:p-10 overflow-hidden h-full flex flex-col justify-between"
              >
                {/* Premium Subtle Gradient Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                  {/* Number & Icon Container */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#02060D] group-hover:scale-110 transition-all duration-500">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-white/5 group-hover:text-[#FFB800]/10 tabular-nums transition-colors duration-500">
                      0{index + 1}.
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
      </div>
    </section>
  );
};
