import React from 'react';
import { Settings2, Cpu, Wrench, Factory } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ScrollReveal';

interface CustomManufacturingProps {
  onSelectMachinery?: (type: string) => void;
}

export const CustomManufacturing: React.FC<CustomManufacturingProps> = ({ onSelectMachinery }) => {
  const capabilities = [
    { title: "Forged Track Chains", desc: "High-tensile strength chains for extreme excavator environments.", icon: <Settings2 className="w-6 h-6" /> },
    { title: "Precision Sprockets", desc: "Heat-treated drive sprockets built for maximum load durability.", icon: <Cpu className="w-6 h-6" /> },
    { title: "Custom Hydraulics", desc: "Specialized pump and motor solutions for industrial machinery.", icon: <Wrench className="w-6 h-6" /> },
    { title: "OEM Fabrication", desc: "Direct manufacturing partnerships for non-standard component needs.", icon: <Factory className="w-6 h-6" /> }
  ];

  return (
    <section id="custom-services" className="pt-32 pb-24 px-6 lg:px-16 xl:px-20 bg-[#02060D] text-white">
      <div className="max-w-[1440px] mx-auto space-y-16">
        
        {/* Title Block with ScrollReveal */}
        <ScrollReveal y={30}>
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#FFB800]">
              <span className="w-6 h-px bg-[#FFB800]"></span>
              Technical Capabilities
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter leading-tight">
              Custom Engineering <br />
              <span className="text-slate-500">& Manufacturing.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Staggered Content Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Main Feature (Large Bento Card) */}
          <StaggerItem className="md:col-span-8">
            <motion.div 
              whileHover={{ y: -6, borderColor: "rgba(255, 184, 0, 0.2)" }}
              className="bg-white/5 border border-white/5 rounded-[40px] p-10 sm:p-14 relative overflow-hidden group h-full flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 group-hover:opacity-10 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFB800_0%,_transparent_70%)]"></div>
              </div>
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: -45 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="relative z-10 space-y-8 max-w-lg md:w-1/2 flex-1"
              >
                <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight leading-tight">Specialized Heavy <br /> Equipment Forging.</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-lg">
                  Our Canadian-led manufacturing strategies leverage state-of-the-art forging techniques to produce components that outperform standard OEM specifications.
                </p>
                <div className="pt-4">
                  <button className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFB800] border-b-2 border-[#FFB800] pb-2 hover:text-white hover:border-white transition-all cursor-pointer">
                    Review Technical Specs
                  </button>
                </div>
              </motion.div>
              {/* Elegant Image on the right side of the bento card */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0, x: 45 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="relative md:w-1/2 w-full h-[250px] md:h-full min-h-[220px] rounded-3xl overflow-hidden border border-white/10 group-hover:border-[#FFB800]/30 transition-all duration-500 shadow-2xl"
              >
                <img 
                  src="/RCB.jfif" 
                  alt="Forging technology" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02060D]/80 via-transparent to-transparent"></div>
              </motion.div>
            </motion.div>
          </StaggerItem>

          {/* Secondary Bento Grid */}
          <div className="md:col-span-4 grid grid-cols-1 gap-8">
            {capabilities.slice(0, 2).map((cap, idx) => (
              <StaggerItem key={idx}>
                <motion.div 
                  whileHover={{ y: -6, borderColor: "rgba(255, 184, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.07)" }}
                  className="relative group bg-white/5 border border-white/5 rounded-[40px] p-10 overflow-hidden h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] mb-6 group-hover:bg-[#FFB800] group-hover:text-[#02060D] group-hover:scale-110 transition-all duration-500">
                      {cap.icon}
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight mb-2 text-white group-hover:text-[#FFB800] transition-colors duration-300">{cap.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{cap.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>

        </StaggerContainer>

        {/* Bottom Capabilities Row with Stagger */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.slice(2).map((cap, idx) => (
             <StaggerItem key={idx}>
               <motion.div 
                 whileHover={{ y: -6, borderColor: "rgba(255, 184, 0, 0.2)", backgroundColor: "rgba(255, 255, 255, 0.07)" }}
                 className="relative group bg-white/5 border border-white/5 rounded-[40px] p-10 overflow-hidden h-full"
               >
                 <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                 <div className="relative z-10">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#FFB800] mb-6 group-hover:bg-[#FFB800] group-hover:text-[#02060D] group-hover:scale-110 transition-all duration-500">
                     {cap.icon}
                   </div>
                   <h4 className="text-xl font-black uppercase tracking-tight mb-2 text-white group-hover:text-[#FFB800] transition-colors duration-300">{cap.title}</h4>
                   <p className="text-sm text-slate-400 font-medium leading-relaxed">{cap.desc}</p>
                 </div>
               </motion.div>
             </StaggerItem>
          ))}
          
          <StaggerItem>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-[#FFB800] rounded-[40px] p-10 flex flex-col justify-center items-center text-center space-y-4 shadow-2xl shadow-[#FFB800]/10 h-full"
            >
              <h4 className="text-2xl font-black uppercase tracking-tight text-[#02060D]">Ready to Start?</h4>
              <button 
                onClick={() => onSelectMachinery && onSelectMachinery('All')}
                className="bg-[#02060D] text-white font-black px-8 py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-white hover:text-[#02060D] transition-all btn-glass-hover cursor-pointer"
              >
                Consult an Engineer
              </button>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>

      </div>
    </section>
  );
};
