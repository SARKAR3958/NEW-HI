import React from 'react';
import { AboutUs } from '../components/AboutUs';
import { OurAdvantages } from '../components/OurAdvantages';
import { motion } from 'motion/react';

interface CompanyPageProps {
  onPlayVideo: () => void;
  onOpenRFQ: () => void;
}

export const CompanyPage: React.FC<CompanyPageProps> = ({ onPlayVideo, onOpenRFQ }) => {
  return (
    <div className="bg-[#02060D] min-h-screen">
      <div className="bg-[#02060D] py-20 px-4 text-center mt-[50px] pl-[17px] overflow-hidden">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter"
        >
          Our <span className="text-[#FFB800]">Company</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs"
        >
          Committed to Industrial Excellence Since 2006
        </motion.p>
      </div>
      <AboutUs onPlayVideo={onPlayVideo} onOpenRFQ={onOpenRFQ} />
      <OurAdvantages />
    </div>
  );
};
