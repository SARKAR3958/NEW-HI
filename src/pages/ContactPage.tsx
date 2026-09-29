import React from 'react';
import { motion } from 'motion/react';
import { LeaveUsMessage } from '../components/LeaveUsMessage';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#02060D] min-h-screen overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#02060D] py-20 px-4 text-center mt-[50px] pl-[17px]"
      >
        <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter">
          Contact <span className="text-[#FFB800]">Us</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
          Connect with our Trade Specialists 24/7
        </p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="py-12"
      >
        <LeaveUsMessage />
      </motion.div>
    </div>
  );
};
