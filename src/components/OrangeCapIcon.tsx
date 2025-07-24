import React from 'react';

interface OrangeCapIconProps {
  className?: string;
  size?: number;
}

const OrangeCapIcon: React.FC<OrangeCapIconProps> = ({ className = "", size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cricket Bat Icon for Orange Cap */}
      <defs>
        <linearGradient id="orangeBatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB74D" />
          <stop offset="30%" stopColor="#FF8C42" />
          <stop offset="70%" stopColor="#FF6B1A" />
          <stop offset="100%" stopColor="#E55100" />
        </linearGradient>
        <linearGradient id="orangeBatHandle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D6E63" />
          <stop offset="50%" stopColor="#6D4C41" />
          <stop offset="100%" stopColor="#5D4037" />
        </linearGradient>
        <linearGradient id="orangeBatHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFCC80" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF8C42" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="52" cy="88" rx="25" ry="6" fill="#E55100" opacity="0.2" />
      
      {/* Bat Handle */}
      <rect x="46" y="65" width="8" height="25" rx="4" fill="url(#orangeBatHandle)" />
      <rect x="47" y="66" width="6" height="23" rx="3" fill="#A1887F" opacity="0.6" />
      
      {/* Bat Blade */}
      <ellipse cx="50" cy="40" rx="12" ry="28" fill="url(#orangeBatGradient)" />
      
      {/* Bat blade highlight */}
      <ellipse cx="47" cy="38" rx="6" ry="22" fill="url(#orangeBatHighlight)" />
      
      {/* Sweet spot marking */}
      <rect x="46" y="35" width="8" height="3" rx="1" fill="#FFE0B2" opacity="0.8" />
      <rect x="46" y="40" width="8" height="3" rx="1" fill="#FFE0B2" opacity="0.8" />
      <rect x="46" y="45" width="8" height="3" rx="1" fill="#FFE0B2" opacity="0.8" />
      
      {/* Handle grip lines */}
      <line x1="46" y1="70" x2="54" y2="70" stroke="#4E342E" strokeWidth="0.5" opacity="0.6" />
      <line x1="46" y1="74" x2="54" y2="74" stroke="#4E342E" strokeWidth="0.5" opacity="0.6" />
      <line x1="46" y1="78" x2="54" y2="78" stroke="#4E342E" strokeWidth="0.5" opacity="0.6" />
      <line x1="46" y1="82" x2="54" y2="82" stroke="#4E342E" strokeWidth="0.5" opacity="0.6" />
      
      {/* Ball impact effect */}
      <circle cx="50" cy="42" r="3" fill="#FFE0B2" opacity="0.4" />
      <circle cx="50" cy="42" r="5" fill="none" stroke="#FFB74D" strokeWidth="1" opacity="0.3" />
    </svg>
  );
};

export default OrangeCapIcon;
