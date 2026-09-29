import React from 'react';
import { OurAdvantages } from '../components/OurAdvantages';

export const IndustryPage: React.FC = () => {
  return (
    <div className="bg-[#02060D] min-h-screen">
      <div className="bg-[#02060D] py-20 px-4 text-center mt-[50px] pl-[17px]">
        <h1 className="text-4xl sm:text-7xl font-black text-white uppercase tracking-tighter">
          Industrial <span className="text-[#FFB800]">Sectors</span>
        </h1>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto font-bold uppercase tracking-widest text-xs">
          Comprehensive Support for Global Infrastructure
        </p>
      </div>
      <OurAdvantages />
    </div>
  );
};
