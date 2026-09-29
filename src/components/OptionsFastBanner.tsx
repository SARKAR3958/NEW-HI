import React from 'react';
import { Search, Phone, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface OptionsFastBannerProps {
  onOpenPartsSearch: () => void;
  onCallSpecialist: () => void;
  onOpenQuoteModal: () => void;
}

export const OptionsFastBanner: React.FC<OptionsFastBannerProps> = ({
  onOpenPartsSearch,
  onCallSpecialist,
  onOpenQuoteModal
}) => {
  return (
    <section className="relative w-full py-16 px-6 sm:px-12 bg-gray-950 overflow-hidden flex flex-col justify-center">
      {/* Mining Hauler Background Image with Smooth In-View Scale */}
      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/40"></div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto w-full z-10 space-y-6">
        {/* Main Banner Heading */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase drop-shadow-md">
            We&apos;ll Provide You Part <span className="text-[#F5A623]">Options Fast !</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Our dedicated team of part specialists are here to move your fleet forward! We are proud to have warehouses full of parts across Canada.
          </p>
        </motion.div>

        {/* 3 Action Buttons with Staggered Entrance and Hover Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center gap-3 pt-2"
        >
          {/* PARTS SEARCH */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPartsSearch}
            className="bg-[#F5A623] hover:bg-[#d98f18] text-black font-extrabold px-6 py-3.5 rounded-xs flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 stroke-[3]" />
            <span>PARTS SEARCH</span>
          </motion.button>

          {/* CALL SPECIALIST */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCallSpecialist}
            className="bg-[#F5A623] hover:bg-[#d98f18] text-black font-extrabold px-6 py-3.5 rounded-xs flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-current stroke-none" />
            <span>CALL SPECIALIST</span>
          </motion.button>

          {/* GET A QUOTE */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenQuoteModal}
            className="bg-[#F5A623] hover:bg-[#d98f18] text-black font-extrabold px-6 py-3.5 rounded-xs flex items-center gap-2 text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 stroke-[2.5]" />
            <span>GET A QUOTE</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
