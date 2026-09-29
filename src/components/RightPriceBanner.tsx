import React from 'react';
import { Search } from 'lucide-react';
import { motion } from 'motion/react';

interface RightPriceBannerProps {
  onOpenPartsSearch: () => void;
}

export const RightPriceBanner: React.FC<RightPriceBannerProps> = ({ onOpenPartsSearch }) => {
  return (
    <section className="relative w-full h-[320px] sm:h-[400px] overflow-hidden bg-gray-950 flex items-center">
      {/* Background Heavy Machinery Image with Depth Effect */}
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center opacity-85"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30"></div>
      </motion.div>

      {/* Content Overlay */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full flex flex-col justify-center items-start space-y-6 z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex flex-col items-start leading-none font-black tracking-tighter"
        >
          <span className="text-white text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight drop-shadow-md">
            RIGHT
          </span>
          <div className="flex items-center text-[#F5A623] text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight drop-shadow-md">
            <span>PRICE</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="ml-1 text-[#F5A623] font-light"
            >
              |
            </motion.span>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPartsSearch}
            className="bg-[#F5A623] hover:bg-[#d98f18] text-black font-extrabold px-7 py-3.5 rounded-xs flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-2xl transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[3]" />
            <span>PARTS SEARCH</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
