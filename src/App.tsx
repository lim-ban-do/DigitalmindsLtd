/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CompanyIntro } from './components/CompanyIntro';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { SolutionsSection } from './components/SolutionsSection';
import { ProcessSection } from './components/ProcessSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { QuoteSection } from './components/QuoteSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { CompanySettings, Project, Article, Testimonial, QuoteRequest, Inquiry } from './types';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [adminOpen, setAdminOpen] = useState(false);
  const [quoteServicePreselected, setQuoteServicePreselected] = useState<string | undefined>(undefined);

  // Dynamic Data
  const [settings, setSettings] = useState<CompanySettings | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Global toast notification
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const fetchAppData = async () => {
    try {
      const [resSet, resProj, resArt, resTest] = await Promise.all([
        fetch('/api/settings'),
        fetch('/api/projects'),
        fetch('/api/articles'),
        fetch('/api/testimonials')
      ]);

      const [dataSet, dataProj, dataArt, dataTest] = await Promise.all([
        resSet.json(),
        resProj.json(),
        resArt.json(),
        resTest.json()
      ]);

      if (dataSet.success) setSettings(dataSet.data);
      if (dataProj.success) setProjects(dataProj.data);
      if (dataArt.success) setArticles(dataArt.data);
      if (dataTest.success) setTestimonials(dataTest.data);
    } catch (err) {
      console.error('Error loading app data from backend:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppData();
  }, []);

  const triggerToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 4000);
  };

  const openQuoteModalWithService = (serviceName?: string) => {
    setQuoteServicePreselected(serviceName);
    setCurrentTab('quote');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInquirySuccess = (inquiry: Inquiry) => {
    triggerToast(`Thank you, ${inquiry.fullName}. Your inquiry has been submitted to Digital Minds Ltd.`);
  };

  const handleQuoteSuccess = (quote: QuoteRequest) => {
    triggerToast(`Quotation ${quote.referenceNo} generated. Our architecture team will review your scope.`);
  };

  return (
    <div className="min-h-screen bg-[#071325] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Toast Notification */}
      {toastNotification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#091b35] border border-amber-500/50 shadow-2xl shadow-black/50 flex items-center gap-3 text-xs text-white animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span>{toastNotification}</span>
        </div>
      )}

      {/* Primary 3-Zone Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openQuoteModal={openQuoteModalWithService}
        openAdminModal={() => setAdminOpen(true)}
        settings={settings}
      />

      {/* Main Page Routing & Views */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onExploreServices={() => {
                setCurrentTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartProject={() => openQuoteModalWithService()}
              onSelectSolution={() => {
                setCurrentTab('solutions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Company Intro (Who We Are, What We Do, Why Choose Us) */}
            <CompanyIntro
              onLearnMore={() => {
                setCurrentTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Core Services Section */}
            <ServicesSection onRequestQuote={openQuoteModalWithService} />

            {/* Why Choose Digital Minds */}
            <WhyChooseUs />

            {/* Solutions Section (Industry Architectures) */}
            <SolutionsSection onRequestQuote={openQuoteModalWithService} />

            {/* Five-Step Development Process */}
            <ProcessSection />

            {/* Featured Projects Portfolio */}
            <ProjectsSection
              projects={projects}
              onRequestQuote={openQuoteModalWithService}
              onRefresh={fetchAppData}
            />

            {/* Testimonials and Client Invitation */}
            <TestimonialsSection
              testimonials={testimonials}
              onRequestQuote={() => openQuoteModalWithService()}
            />

            {/* Technology Insights & Briefings */}
            <InsightsSection articles={articles} />

            {/* Get a Quote Call to Action / Interactive Scoping Form */}
            <QuoteSection
              initialService={quoteServicePreselected}
              onSuccess={handleQuoteSuccess}
            />

            {/* Contact Section */}
            <ContactSection settings={settings} onSuccess={handleInquirySuccess} />
          </>
        )}

        {currentTab === 'about' && (
          <>
            <AboutSection
              settings={settings}
              onRequestQuote={() => openQuoteModalWithService()}
            />
            <WhyChooseUs />
            <ProcessSection />
            <ContactSection settings={settings} onSuccess={handleInquirySuccess} />
          </>
        )}

        {currentTab === 'services' && (
          <>
            <div className="bg-[#091b35] py-14 border-b border-[#142845] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Engineering Capabilities
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-heading">
                  Full-Lifecycle ICT & Technology Services<span className="text-amber-400">.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
                  Explore our eight dedicated technology practices, complete with specifications,
                  business benefits, and service level assurances.
                </p>
              </div>
            </div>
            <ServicesSection onRequestQuote={openQuoteModalWithService} />
            <WhyChooseUs />
            <QuoteSection
              initialService={quoteServicePreselected}
              onSuccess={handleQuoteSuccess}
            />
          </>
        )}

        {currentTab === 'solutions' && (
          <>
            <div className="bg-[#091b35] py-14 border-b border-[#142845] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Sector Specializations
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-heading">
                  Industry Management Systems & Portals<span className="text-amber-400">.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
                  Customizable architecture blueprints for education, healthcare, agriculture,
                  finance, real estate, government, and multi-branch retail.
                </p>
              </div>
            </div>
            <SolutionsSection onRequestQuote={openQuoteModalWithService} />
            <QuoteSection
              initialService="Industry Management System (Custom)"
              onSuccess={handleQuoteSuccess}
            />
          </>
        )}

        {currentTab === 'projects' && (
          <>
            <div className="bg-[#091b35] py-14 border-b border-[#142845] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Work & Architecture
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-heading">
                  Systems Portfolio & Architecture Blueprints<span className="text-amber-400">.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
                  Explore demonstration architectures and production systems engineered by Digital Minds Ltd.
                </p>
              </div>
            </div>
            <ProjectsSection
              projects={projects}
              onRequestQuote={openQuoteModalWithService}
              onRefresh={fetchAppData}
            />
            <TestimonialsSection
              testimonials={testimonials}
              onRequestQuote={() => openQuoteModalWithService()}
            />
          </>
        )}

        {currentTab === 'insights' && (
          <>
            <div className="bg-[#091b35] py-14 border-b border-[#142845] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                  Technology Briefings
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-heading">
                  Digital Minds Technology Insights<span className="text-amber-400">.</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-normal">
                  Deep-dive research on software architecture, enterprise cybersecurity, practical AI,
                  and corporate digital transformation.
                </p>
              </div>
            </div>
            <InsightsSection articles={articles} />
          </>
        )}

        {currentTab === 'contact' && (
          <>
            <ContactSection settings={settings} onSuccess={handleInquirySuccess} />
          </>
        )}

        {currentTab === 'quote' && (
          <>
            <QuoteSection
              initialService={quoteServicePreselected}
              onSuccess={handleQuoteSuccess}
            />
          </>
        )}
      </main>

      {/* Corporate Footer with Supplied Logo & Direct Verified Details */}
      <Footer
        onNavClick={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        openAdminModal={() => setAdminOpen(true)}
        settings={settings}
      />

      {/* Administrator Console Dialog */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onDataChanged={fetchAppData}
      />
    </div>
  );
}
