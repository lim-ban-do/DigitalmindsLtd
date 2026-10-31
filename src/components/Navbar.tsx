import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Phone, Mail, ArrowRight } from 'lucide-react';
import { CompanySettings } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openQuoteModal: (serviceName?: string) => void;
  openAdminModal: () => void;
  settings?: CompanySettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openQuoteModal,
  openAdminModal,
  settings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'projects', label: 'Projects' },
    { id: 'insights', label: 'Insights' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneDisplay = settings?.phone || '0967717777';
  const emailDisplay = settings?.email || 'digitalmindsltd@gmail.com';

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs text-slate-400 py-1.5 px-4 md:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>{phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${emailDisplay}`}
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>{emailDisplay}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Think Digital. Build Intelligent Solutions.</span>
            <span className="text-slate-700">|</span>
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1 hover:text-slate-200 transition-colors text-slate-400 text-xs cursor-pointer"
              title="Administrator Portal"
            >
              <Shield className="w-3 h-3 text-blue-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Strictly conforms to 3-zone Top Bar Contract */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
            : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Single Brand element with supplied official logo and wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
            >
              <img
                src="/assets/aistudio/DigitalMinds_Logo_Showcase__2__50057530.png"
                alt="Digital Minds Ltd Official Logo"
                className="h-10 w-auto object-contain rounded transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-tight text-white block leading-none">
                  Digital Minds<span className="text-blue-500 text-sm font-semibold ml-1">Ltd</span>
                </span>
                <span className="text-[11px] tracking-wide text-slate-400 font-medium block mt-0.5">
                  ICT & Technology Solutions
                </span>
              </div>
            </button>

            {/* Zone 2: 4-7 clean single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3.5 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 text-sm font-medium ${
                      isActive
                        ? 'text-white bg-slate-800/80 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 primary action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => openQuoteModal()}
                className="inline-flex items-center justify-center gap-2 px-4.5 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-xs text-slate-400 px-2">
                <a
                  href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-500" />
                  <span>{phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${emailDisplay}`}
                  className="flex items-center gap-2 hover:text-blue-400"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-500" />
                  <span>{emailDisplay}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Request a Quotation
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdminModal();
                  }}
                  className="px-3 py-2.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
                  title="Admin Dashboard"
                >
                  <Shield className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
