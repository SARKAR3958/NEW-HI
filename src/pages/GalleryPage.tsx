import React from 'react';
import { motion } from 'motion/react';
import { Play, Youtube, Clock, Eye, ShieldCheck, ArrowRight } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const youtubeVideos = [
    {
      id: '1',
      title: 'Excavator Undercarriage Maintenance Guide',
      duration: '12:45',
      views: '45.2k Views',
      desc: 'Expert technical walkthrough on diagnosing sprocket wear, chain tension calibration, and roller alignment on heavy CAT and Komatsu fleets.',
      url: 'https://www.youtube.com/watch?v=kYor7D6L63g',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '2',
      title: 'Forging Heavy Duty Excavator Track Chains',
      duration: '08:30',
      views: '28.1k Views',
      desc: 'Inside the premium foundry forge where high-tensile borated alloy steel is induction heat-treated to withstand extreme rock quarry environments.',
      url: 'https://www.youtube.com/watch?v=kYor7D6L63g',
      image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '3',
      title: 'Inside Hydraulic Pump OEM Testing Lab',
      duration: '15:10',
      views: '19.4k Views',
      desc: 'Testing pressure flow-rates, volumetric efficiency, and piston friction parameters under intense continuous hydraulic load simulator benches.',
      url: 'https://www.youtube.com/watch?v=kYor7D6L63g',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: '4',
      title: 'Precision Final Drive Torque Testing',
      duration: '10:15',
      views: '32.8k Views',
      desc: 'Calibrating double-reduction planetaries, travel motor speed valves, and checking mechanical lifetime seal integrity against fluid leaks.',
      url: 'https://www.youtube.com/watch?v=kYor7D6L63g',
      image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className="bg-[#02060D] min-h-screen pb-24 text-white">
      {/* Premium cinematic banner section */}
      <div className="relative pt-32 pb-16 px-6 lg:px-16 xl:px-20 overflow-hidden bg-black/40">
        <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-transparent"></div>
        <div className="max-w-[1440px] mx-auto space-y-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-[#FFB800]/10 border border-[#FFB800]/20 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#FFB800]"
          >
            <Youtube className="w-4 h-4 text-red-500" />
            <span>Technical Video Gallery</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-7xl font-black uppercase tracking-tighter leading-none"
          >
            Watch Machinery <br className="hidden sm:block" />
            <span className="text-slate-500">Demos & Guides.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-[0.25em] max-w-2xl mx-auto"
          >
            Experience our rigorous OEM specification testing and maintenance walkthroughs
          </motion.p>
        </div>
      </div>

      {/* Videos Grid - Styled with premium cards & Watch Now redirect buttons */}
      <div className="px-6 lg:px-16 xl:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {youtubeVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-[36px] overflow-hidden flex flex-col justify-between hover:border-[#FFB800]/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                <img
                  src={video.image}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
                />
                
                {/* Black scrim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono font-bold text-white flex items-center gap-1.5 border border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#FFB800]" />
                  <span>{video.duration}</span>
                </div>

                {/* Watch count / Spec Verified indicator */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-slate-300 tracking-wider flex items-center gap-1 border border-white/5">
                    <Eye className="w-3 h-3 text-slate-400" /> {video.views}
                  </span>
                  <span className="bg-[#FFB800] text-[#02060D] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Technical Spec
                  </span>
                </div>

                {/* Animated Play button overlay */}
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="w-16 h-16 bg-[#FFB800] text-[#02060D] rounded-full flex items-center justify-center shadow-xl shadow-[#FFB800]/25 group-hover:scale-115 active:scale-90 transition-all duration-500 relative overflow-hidden">
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    <Play className="w-7 h-7 fill-current stroke-[2.5] relative z-10 translate-x-0.5" />
                  </span>
                </a>
              </div>

              {/* Text Info and Action Button */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors line-clamp-1 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">
                    {video.desc}
                  </p>
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#FFB800] hover:bg-white text-[#02060D] font-black py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#FFB800]/5 hover:-translate-y-0.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Demo Video Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
