import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-page dark:bg-gradient-page-dark flex flex-col relative overflow-hidden">
      {/* Background decorative elements with vibrant saturated gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs - much more saturated */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary-500/40 via-yellow-500/30 to-accent-500/40 dark:from-primary-600/30 dark:via-yellow-600/20 dark:to-accent-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-accent-500/40 via-secondary-500/30 to-primary-500/40 dark:from-accent-600/30 dark:via-secondary-600/20 dark:to-primary-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-500/35 via-primary-500/25 to-secondary-500/35 dark:from-yellow-600/25 dark:via-primary-700/15 dark:to-secondary-700/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-l from-secondary-500/40 via-yellow-500/25 to-accent-500/40 dark:from-secondary-700/30 dark:via-yellow-600/15 dark:to-accent-700/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-black/5 opacity-50"></div>
      </div>
      
      <Header 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
