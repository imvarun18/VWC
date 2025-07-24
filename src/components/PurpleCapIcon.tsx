import React from 'react';

interface PurpleCapIconProps {
  className?: string;
  size?: number;
}

const PurpleCapIcon: React.FC<PurpleCapIconProps> = ({ className = "", size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cricket Ball Icon for Purple Cap */}
      <defs>
        <radialGradient id="purpleBallGradient" cx="0.3" cy="0.3" r="0.8">
          <stop offset="0%" stopColor="#E1BEE7" />
          <stop offset="30%" stopColor="#CE93D8" />
          <stop offset="70%" stopColor="#9C27B0" />
          <stop offset="100%" stopColor="#6A1B9A" />
        </radialGradient>
        <linearGradient id="purpleBallSeam" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#E8EAF6" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#C5CAE9" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="purpleBallShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6A1B9A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4A148C" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      {/* Shadow */}
      <ellipse cx="52" cy="85" rx="30" ry="8" fill="url(#purpleBallShadow)" />
      
      {/* Main cricket ball */}
      <circle cx="50" cy="50" r="32" fill="url(#purpleBallGradient)" />
      
      {/* Ball seam - curved stitching lines */}
      <path 
        d="M 25 35 Q 50 25 75 35 Q 65 50 50 55 Q 35 50 25 35" 
        stroke="url(#purpleBallSeam)" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.8"
      />
      <path 
        d="M 25 65 Q 50 75 75 65 Q 65 50 50 45 Q 35 50 25 65" 
        stroke="url(#purpleBallSeam)" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.8"
      />
      
      {/* Detailed stitching dots */}
      <circle cx="30" cy="40" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="38" cy="35" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="46" cy="32" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="54" cy="32" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="62" cy="35" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="70" cy="40" r="1" fill="#FFFFFF" opacity="0.7" />
      
      <circle cx="30" cy="60" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="38" cy="65" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="46" cy="68" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="54" cy="68" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="62" cy="65" r="1" fill="#FFFFFF" opacity="0.7" />
      <circle cx="70" cy="60" r="1" fill="#FFFFFF" opacity="0.7" />
      
      {/* Ball highlight */}
      <ellipse cx="42" cy="42" rx="8" ry="12" fill="#F3E5F5" opacity="0.4" />
      <ellipse cx="40" cy="40" rx="4" ry="6" fill="#FFFFFF" opacity="0.3" />
    </svg>
  );
};

export default PurpleCapIcon;
