import React from 'react';
import { CustomManufacturing } from '../components/CustomManufacturing';

export const MachineryPage: React.FC = () => {
  return (
    <div className="bg-[#02060D] min-h-screen">
      <div className="bg-[#02060D] py-20 px-4 text-center mt-[50px] pl-[17px]">
        <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter">
          Heavy <span className="text-[#FFB800]">Machinery</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
          Advanced Solutions for Earthmoving and Industrial Fleets
        </p>
      </div>
      <CustomManufacturing onSelectMachinery={() => {}} />

      {/* Heavy Sectors Grid migrated from Markets Page */}
      <section className="py-24 px-6 lg:px-16 xl:px-20 bg-[#02060D] border-t border-white/5">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter">
              Heavy Equipment <span className="text-[#FFB800]">Sectors</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Engineered Components Sourced For High-Stress Environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Mining & Quarrying', desc: 'Heavy-duty undercarriage and ground engaging tools for extreme environments.' },
              { title: 'Construction', desc: 'Comprehensive parts solutions for excavators, bulldozers, and loaders.' },
              { title: 'Agriculture', desc: 'Durable components for harvesters, tractors, and specialized farm machinery.' }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/5 border border-white/5 rounded-[40px] p-10 sm:p-12 transition-all duration-500 hover:-translate-y-2 hover:border-[#FFB800]/30 hover:bg-white/[0.07] shadow-xl hover:shadow-2xl hover:shadow-[#FFB800]/5 overflow-hidden"
              >
                {/* Premium Subtle Gradient Hover Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-[#FFB800] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-base text-slate-400 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
