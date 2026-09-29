import React from 'react';
import { ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface AboutUsProps {
  onPlayVideo: () => void;
  onOpenRFQ: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onPlayVideo, onOpenRFQ }) => {
  return (
    <section id="about-us" className="pt-32 pb-24 px-6 lg:px-16 xl:px-20 bg-[#02060D] text-white">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-16 items-center">
        
        {/* Left: Content (7 columns) wrapped in ScrollReveal with Stagger */}
        <ScrollReveal y={40} className="lg:col-span-7">
          <StaggerContainer className="space-y-12">
            
            <StaggerItem className="space-y-6">
              <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
                <span className="w-6 h-px bg-[#FFB800]"></span>
                Strategic Partnership
              </div>
              <h2 className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-[0.95] text-white">
                Canadian Infrastructure <br />
                <span className="text-slate-500">Global Reach.</span>
              </h2>
              <p className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-xl">
                Hammer Industrial is a premier Canadian supplier of high-performance heavy equipment components. We bridge the gap between Tier-1 manufacturers and global operators, ensuring mission-critical reliability across mining, energy, and infrastructure sectors.
              </p>
            </StaggerItem>

            <StaggerItem className="grid sm:grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ y: -5 }}
                className="space-y-4 group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#FFB800]/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#02060D] transition-colors duration-500">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors">Verified Supply Chain</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Every component is sourced through rigorous cross-border quality protocols.
                </p>
              </motion.div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className="space-y-4 group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#FFB800]/20 hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#FFB800] group-hover:bg-[#FFB800] group-hover:text-[#02060D] transition-colors duration-500">
                  <Play className="w-6 h-6 fill-current" />
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors">Technical Mastery</h4>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Over two decades of engineering expertise applied to every part we trade.
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <button 
                onClick={onOpenRFQ}
                className="group inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-white border-b-2 border-[#FFB800] pb-2 hover:text-[#FFB800] transition-colors cursor-pointer"
              >
                Our Strategy & Capability <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </StaggerItem>

          </StaggerContainer>
        </ScrollReveal>

        {/* Right: Media (5 columns) */}
        <ScrollReveal y={50} delay={0.2} className="lg:col-span-5 relative">
          <motion.div 
            onClick={onPlayVideo}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-[60px] overflow-hidden aspect-[4/5] cursor-pointer group shadow-2xl shadow-black/50 border-8 border-white/5 bg-white/5"
          >
            <img 
              src="/src/assets/images/industrial_facility_canada_1790541581884.jpg" 
              alt="Hammer Industrial Canadian Facility" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="w-24 h-24 bg-[#FFB800] rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500"
              >
                <Play className="w-10 h-10 fill-[#02060D] text-[#02060D] ml-1" />
              </motion.div>
            </div>
          </motion.div>
          
          {/* Floating Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-10 -left-10 bg-[#FFB800] p-10 rounded-[40px] hidden md:block shadow-2xl"
          >
            <div className="text-6xl font-black text-[#02060D] tabular-nums tracking-tighter">100%</div>
            <div className="text-[12px] font-black text-[#02060D] uppercase tracking-widest mt-2">Quality Verified</div>
          </motion.div>
        </ScrollReveal>
        
      </div>
    </section>
  );
};
