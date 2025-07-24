import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Trophy, 
  Calendar, 
  BarChart3, 
  Bell, 
  Moon, 
  Sun, 
  Menu,
  X,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/scorecard', icon: Trophy, label: 'Scorecard' },
    { path: '/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/points-table', icon: BarChart3, label: 'Points Table' },
    { path: '/stats', icon: TrendingUp, label: 'Stats' },
    { path: '/updates', icon: Bell, label: 'Updates' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-header dark:bg-gradient-header-dark shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/10 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent"></div>
      
      {/* Glass morphism effect */}
      <div className="absolute inset-0 backdrop-blur-md bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-black/10 dark:via-black/5 dark:to-black/10"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 group transform-gpu will-change-transform transition-all duration-300 ease-out active:scale-[0.96] hover:scale-[1.02] md:hover:scale-[1.01] mobile-touch">
            <div className="relative">
              {/* Header Logo - PNG Image */}
              <div className="h-12 w-12 flex items-center justify-center rounded-full overflow-hidden">
                <img 
                  src="/tourni_logo.png" 
                  alt="RC24 Virtual Willow Championship" 
                  className="h-full w-full object-cover text-white drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-2xl"
                  onError={(e) => {
                    // Fallback to SVG if PNG fails to load
                    const svg = `<svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="45" fill="url(#gradient1)" stroke="currentColor" stroke-width="2"/>
                      <path d="M30 25 Q50 40 70 25 M30 75 Q50 60 70 75" stroke="currentColor" stroke-width="2" fill="none"/>
                      <rect x="40" y="35" width="20" height="30" rx="2" fill="currentColor" opacity="0.8"/>
                      <defs><linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#10b981"/><stop offset="100%" stop-color="#0891b2"/></linearGradient></defs>
                    </svg>`;
                    e.currentTarget.outerHTML = svg;
                  }}
                />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display font-bold text-white drop-shadow-lg transition-all duration-300 group-hover:text-yellow-100 tracking-tight">
                RC24 Virtual Willow Championship
              </h1>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-display font-bold text-white drop-shadow-lg transition-all duration-300 group-hover:text-yellow-100 tracking-tight">
                RC24 VWC
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium font-body transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.02] md:hover:scale-[1.01] mobile-touch ${
                    isActive(item.path)
                      ? 'bg-gradient-to-r from-white/30 to-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                      : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:border hover:border-white/20'
                  }`}
                >
                  {/* Glossy overlay for active state */}
                  {isActive(item.path) && (
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl"></div>
                  )}
                  
                  {/* Icon with glow effect */}
                  <div className="relative">
                    <Icon className="w-4 h-4 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg" />
                    {/* Icon glow */}
                    <div className="absolute inset-0 bg-white/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-sm">{item.label}</span>
                  
                  {/* Hover shimmer effect - FIXED */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="group relative p-3 rounded-xl bg-gradient-to-r from-white/20 to-white/10 text-white hover:from-white/30 hover:to-white/20 transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.05] md:hover:scale-[1.03] backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl mobile-touch"
              aria-label="Toggle theme"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl"></div>
              
              {/* Icon container with rotation animation */}
              <div className="relative transition-transform duration-500 group-hover:rotate-180">
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 drop-shadow-lg" />
                ) : (
                  <Sun className="w-5 h-5 drop-shadow-lg" />
                )}
              </div>
              
              {/* Shimmer effect - FIXED */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group md:hidden relative p-3 rounded-xl bg-gradient-to-r from-white/20 to-white/10 text-white hover:from-white/30 hover:to-white/20 transition-all duration-300 ease-out transform-gpu will-change-transform active:scale-[0.96] hover:scale-[1.05] md:hover:scale-[1.03] backdrop-blur-sm border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl mobile-touch"
              aria-label="Toggle mobile menu"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl"></div>
              
              {/* Icon with rotation animation */}
              <div className="relative transition-transform duration-300 group-hover:rotate-90">
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 drop-shadow-lg" />
                ) : (
                  <Menu className="w-6 h-6 drop-shadow-lg" />
                )}
              </div>
              
              {/* Shimmer effect - FIXED */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 backdrop-blur-md bg-gradient-to-b from-white/10 to-white/5 dark:from-black/10 dark:to-black/5 animate-slideDown">
            <nav className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group relative flex items-center space-x-3 px-4 py-3 mx-2 rounded-xl text-base font-medium font-body transition-all duration-300 transform hover:scale-105 animate-slideInLeft ${
                      isActive(item.path)
                        ? 'bg-gradient-to-r from-white/30 to-white/20 text-white shadow-lg backdrop-blur-sm border border-white/30'
                        : 'text-white/90 hover:text-white hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:backdrop-blur-sm hover:shadow-lg hover:border hover:border-white/20'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Glossy overlay for active state */}
                    {isActive(item.path) && (
                      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-xl"></div>
                    )}
                    
                    {/* Icon with glow effect */}
                    <div className="relative">
                      <Icon className="w-5 h-5 relative z-10 transition-all duration-300 group-hover:drop-shadow-lg" />
                      {/* Icon glow */}
                      <div className="absolute inset-0 bg-white/30 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <span className="relative z-10 transition-all duration-300 group-hover:drop-shadow-sm">{item.label}</span>
                    
                    {/* Hover shimmer effect - FIXED */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-out"></div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
