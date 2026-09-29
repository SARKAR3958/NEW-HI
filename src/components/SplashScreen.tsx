import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const SplashScreen: React.FC = () => {
  const [show, setShow] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // Exits exactly after 3 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    // Dynamic numeric progress count matching 3 seconds
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 25); // 25ms * 100 ~ 2.5 seconds to reach 100% smoothly

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const hammerLetters = ["H", "A", "M", "M", "E", "R"];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, scale: 1.03, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] bg-[#02060D] flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient Tech Grid Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
            {/* Grid structure */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,184,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,184,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            {/* Centered Golden Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.12)_0%,transparent_60%)]"></div>
          </div>

          {/* Core Branding Container */}
          <div className="relative z-10 flex flex-col items-center space-y-8 text-center px-6">
            {/* Logo box with drawing border glow & cinematic entrance */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -15, filter: 'blur(10px)' }}
                animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-[#FFB800] rounded-[2px] p-0.5 bg-black overflow-hidden relative z-10 shadow-[0_0_40px_rgba(255,184,0,0.15)]"
              >
                <img
                  src="/FAVIVON.png"
                  alt="Hammer Logo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Outer Pulsing Aura */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-2 border border-[#FFB800]/40 rounded-[4px] -z-0 pointer-events-none"
              ></motion.div>
            </div>

            {/* Title & Slogan Text */}
            <div className="space-y-3">
              {/* Staggered Letter Slide-Up */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-hidden py-1">
                {hammerLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.08 + 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Dynamic Line Draw */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] w-20 bg-[#FFB800] mx-auto rounded-full"
              ></motion.div>

              {/* Tagline entry */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.45em] text-slate-400"
              >
                INDUSTRIAL CANADA
              </motion.p>
            </div>
          </div>

          {/* Premium Bottom Counter & Status Indicator */}
          <div className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center space-y-3 px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-slate-500"
            >
              INITIALIZING SYSTEMS • {percent}%
            </motion.div>
          </div>

          {/* Bottom Gold Loading Progress Track */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-transparent via-[#FFB800] to-transparent opacity-90 shadow-[0_0_15px_rgba(255,184,0,0.5)]"
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
