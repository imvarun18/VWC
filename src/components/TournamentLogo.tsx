import React from 'react';

interface TournamentLogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const TournamentLogo: React.FC<TournamentLogoProps> = ({ 
  className = '', 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-24 w-24',
    xlarge: 'h-32 w-32'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center justify-center rounded-full overflow-hidden`}>
      {/* Option 1: Video Logo (using tournament_logo.mp4 from public folder) */}
      <video 
        src="/tournament_logo.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="h-full w-full object-cover"
        onError={(e) => {
          console.log('Video failed to load, falling back to placeholder');
          // If video fails to load, hide it and show fallback
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'block';
        }}
      />
      
      {/* Fallback SVG (hidden by default, shown if video fails) */}
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full hidden"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cricket ball design */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#gradient1)"
          stroke="currentColor"
          strokeWidth="2"
        />
        
        {/* Cricket ball seam */}
        <path
          d="M30 25 Q50 40 70 25 M30 75 Q50 60 70 75"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Cricket bat */}
        <rect
          x="40"
          y="35"
          width="20"
          height="30"
          rx="2"
          fill="currentColor"
          opacity="0.8"
        />
        
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Option 2: If you have a static image backup, uncomment this */}
      {/* <img 
        src="/src/assets/tournament-logo.png" 
        alt="RC24 Virtual Willow Championship" 
        className="h-full w-full object-contain"
      /> */}
      
      {/* Option 3: Text-based logo */}
      {/* <div className="text-center">
        <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xs">RC24</div>
        <div className="text-cyan-600 dark:text-cyan-400 font-bold text-xs">VWC</div>
      </div> */}
    </div>
  );
};

export default TournamentLogo;
