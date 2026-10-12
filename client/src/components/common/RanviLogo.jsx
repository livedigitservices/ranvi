import React from 'react';

export const RanviLogo = ({ size = 'default', showTagline = true, variant = 'dark', className = '' }) => {
  const isLight = variant === 'light';

  // Responsive height classes for the official logo
  const heightClasses = {
    small: 'h-9 sm:h-11',
    default: 'h-12 sm:h-14 lg:h-16',
    large: 'h-16 sm:h-20',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Ranvi Institutions Crest Logo Image */}
      <img
        src="/logo.png"
        alt="RANVI INSTITUTIONS — Your Next Career Milestones"
        className={`${heightClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-102 ${
          isLight ? 'brightness-110 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] bg-white/95 px-3 py-1.5 rounded-xl' : 'drop-shadow-xs'
        }`}
      />
    </div>
  );
};
