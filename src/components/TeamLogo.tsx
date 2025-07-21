import React from 'react';
import type { Team } from '../types/cricket';

interface TeamLogoProps {
  team: Team;
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ 
  team, 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  // Map team IDs to logo file names
  const getLogoPath = (team: Team): string => {
    const logoMap: Record<string, string> = {
      '1': 'rcb.png',     // Royal Challengers Bengaluru
      '2': 'csk.png',     // Chennai Super Kings
      '3': 'mi.png',      // Mumbai Indians
      '4': 'srh.png',     // Sunrisers Hyderabad
      '5': 'dc.png',      // Deccan Chargers
      '6': 'rs.png',      // Rising Stars
      '7': 'smc.png',     // SM Champions
    };

    return `/team-logos/${logoMap[team.id] || 'default.png'}`;
  };

  // Fallback component if logo fails to load - completely hidden/empty
  const LogoFallback: React.FC = () => (
    <div 
      className={`${sizeClasses[size]} ${className} 
        flex items-center justify-center rounded 
        bg-transparent`}
      style={{ display: 'none' }}
    >
      {/* No fallback content - completely hidden */}
    </div>
  );

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <img
        src={getLogoPath(team)}
        alt={`${team.name} logo`}
        className="h-full w-full object-contain rounded shadow-sm"
        onError={(e) => {
          // Hide the image completely when it fails to load
          e.currentTarget.style.display = 'none';
          // Don't show any fallback - keep it hidden
          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'none';
        }}
      />
      
      {/* Fallback - hidden by default, shown if image fails */}
      <LogoFallback />
    </div>
  );
};

export default TeamLogo;
