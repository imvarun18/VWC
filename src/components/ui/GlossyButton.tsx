import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface GlossyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  className?: string;
  disabled?: boolean;
  href?: string;
}

const GlossyButton: React.FC<GlossyButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  href
}) => {
  const baseClasses = `
    group relative 
    inline-flex items-center justify-center
    font-medium rounded-xl
    transition-all duration-300 
    transform hover:scale-105 active:scale-95
    backdrop-blur-md
    overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary-500 to-secondary-500 
      hover:from-primary-600 hover:to-secondary-600
      text-white shadow-lg hover:shadow-xl
      border border-emerald-400/50
    `,
    secondary: `
      bg-gradient-to-r from-white/20 to-white/10 
      hover:from-white/30 hover:to-white/20
      text-white shadow-lg hover:shadow-xl
      border border-white/30 hover:border-white/40
      backdrop-blur-sm
    `,
    ghost: `
      bg-transparent hover:bg-white/10 dark:hover:bg-gray-800/50
      text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white
      border border-transparent hover:border-gray-200 dark:hover:border-gray-700
    `
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm space-x-1',
    md: 'px-4 py-3 text-base space-x-2',
    lg: 'px-6 py-4 text-lg space-x-3'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/5 to-transparent"></div>
      
      {/* Shimmer effect - FIXED */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center">
        {Icon && <Icon className={`${iconSizes[size]} transition-transform duration-300 group-hover:scale-110`} />}
        <span className="transition-all duration-300 group-hover:drop-shadow-sm">{children}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
};

export default GlossyButton;
