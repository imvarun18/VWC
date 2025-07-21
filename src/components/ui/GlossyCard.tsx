import React from 'react';

interface GlossyCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const GlossyCard: React.FC<GlossyCardProps> = ({ 
  children, 
  className = '', 
  hover = true, 
  glow = false 
}) => {
  return (
    <div className={`
      relative group
      bg-gradient-card dark:bg-gradient-card-dark 
      backdrop-blur-md 
      border border-white/30 dark:border-gray-600/30
      rounded-2xl 
      shadow-xl 
      overflow-hidden
      ${hover ? 'transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1' : ''}
      ${glow ? 'hover:shadow-emerald-500/20 dark:hover:shadow-emerald-400/20' : ''}
      ${className}
    `}>
      {/* Enhanced glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/5 dark:from-white/20 dark:via-white/5 dark:to-transparent"></div>
      
      {/* Shimmer effect on hover */}
      {hover && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-800 ease-out"></div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Enhanced border glow effect */}
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/40 via-secondary-500/40 to-accent-500/40 dark:from-primary-600/30 dark:via-secondary-600/30 dark:to-accent-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm -z-10"></div>
      )}
    </div>
  );
};

export default GlossyCard;
