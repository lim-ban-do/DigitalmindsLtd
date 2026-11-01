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
      <div className="bg-[#050e1b] border-b border-[#142845] text-xs text-slate-400 py-1.5 px-4 md:px-8 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{phoneDisplay}</span>
            </a>
            <a
              href={`mailto:${emailDisplay}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{emailDisplay}</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">Think Digital. Build Intelligent Solutions.</span>
            <span className="text-slate-700">|</span>
            <button
              onClick={openAdminModal}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors text-slate-400 text-xs cursor-pointer"
              title="Administrator Portal"
            >
              <Shield className="w-3 h-3 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${scrolled
            ? 'bg-[#071325]/95 backdrop-blur-md border-b border-[#142845] shadow-lg shadow-black/30'
            : 'bg-[#071325]/85 backdrop-blur-sm border-b border-[#10223b]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 h-18">
            {/* Zone 1: Single Brand element with supplied official logo and wordmark */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 cursor-pointer"
            >
              <img
                src="/assets/aistudio/DigitalMinds_Logo_Showcase__2__50057530.png"
                alt="Digital Minds Ltd Official Logo"
                className="h-10 w-auto object-contain rounded transition-transform group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block">
                <span className="text-lg font-bold tracking-tight text-white block leading-none font-heading">
                  Digital Minds<span className="text-amber-400 text-sm font-semibold ml-1">Ltd</span>
                </span>
                <span className="text-[11px] tracking-wide text-slate-400 font-medium block mt-0.5">
                  ICT & Technology Solutions
                </span>
              </div>
            </button>

            {/* Zone 2: Clean single-line text navigation links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`px-3.5 py-2 rounded-md transition-all whitespace-nowrap shrink-0 text-sm font-medium font-heading cursor-pointer ${isActive
                        ? 'text-amber-400 bg-[#0d223f] border border-amber-500/25 shadow-sm'
                        : 'text-slate-200 hover:text-white hover:bg-[#0c1f38]'
                      }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Phone badge + Primary action matching reference header */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
                className="hidden xl:flex items-center gap-2 text-white font-medium text-xs hover:text-amber-400 transition-colors py-1.5 px-3 rounded-full bg-[#0d223f] border border-[#1e3b66]"
                title="Direct Phone Line"
              >
                <span className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                  <Phone className="w-3 h-3 text-slate-950" />
                </span>
                <span className="font-heading tracking-wide text-amber-300 font-semibold">{phoneDisplay}</span>
              </a>



              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-[#0c1f38] rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#071325] border-b border-[#142845] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors font-heading ${isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        : 'text-slate-300 hover:bg-[#0d223f] hover:text-white'
                      }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[#142845] flex flex-col gap-3">
              <div className="flex flex-col gap-2 text-xs text-slate-400 px-2">
                <a
                  href={`tel:${phoneDisplay.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${emailDisplay}`}
                  className="flex items-center gap-2 hover:text-amber-400"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{emailDisplay}</span>
                </a>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openQuoteModal();
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-md hover:bg-amber-300 transition-colors"
                >
                  Request a Quote
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAdminModal();
                  }}
                  className="px-3 py-2.5 text-xs text-slate-300 hover:text-white bg-[#0d223f] border border-[#1e3b66] rounded-md"
                  title="Admin Dashboard"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
