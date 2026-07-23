import { useState } from 'react';

export default function Logo({ imgClassName = 'h-12 w-12 sm:h-14 sm:w-14', className = '', variant = 'stacked' }) {
  const isHorizontal = variant === 'horizontal';

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {/* Logo Graphic */}
      <div className={`${imgClassName} shrink-0 flex items-center justify-center`}>
        <img
          src="/copy.png"
          alt="Wellness Clinic Logo"
          className="w-full h-full object-contain scale-[1.5] sm:scale-[1.8]"
          loading="eager"
          decoding="async"
        />
      </div>
      
      {/* Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
          <span className={`font-display font-extrabold tracking-tight text-teal-800 dark:text-white leading-none mb-1 ${isHorizontal ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[28px]'}`}>
            HEALTH CARE
          </span>
          <span className={`font-display font-bold uppercase text-teal-600 dark:text-primary-400 leading-none ${isHorizontal ? 'text-[9px] sm:text-[10px] tracking-[0.15em]' : 'text-[11px] sm:text-[12px] tracking-[0.2em]'}`}>
            & Wellness Clinic
          </span>
        </div>
        
        {/* Subtitle - only shown in stacked variant */}
        {!isHorizontal && (
          <div className="mt-1.5 sm:mt-2">
            <span className="text-[8.5px] sm:text-[10px] font-bold tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5 uppercase">
              Bach Flower Method <span className="text-teal-500 dark:text-primary-500 text-[5px]">●</span> Natural Care
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
