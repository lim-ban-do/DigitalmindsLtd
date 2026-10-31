import React from 'react';
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Zap } from 'lucide-react';

interface CompanyIntroProps {
  onLearnMore: () => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({ onLearnMore }) => {
  return (
    <section className="py-20 bg-[#061224] border-b border-[#142845] relative overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Company Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-heading [text-wrap:balance]">
            Technology That Moves Your Business Forward<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Digital Minds Ltd is a full-service ICT and technology solutions firm dedicated to engineering
            dependable digital systems. We empower businesses, public institutions, and visionary enterprises
            to eliminate administrative friction, elevate operational speed, and achieve resilient digital transformation.
          </p>
        </div>

        {/* 3 Pillars: Who We Are, What We Do, Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Who We Are */}
          <div className="p-7 rounded-xl bg-[#091b35]/70 border border-[#142845] hover:border-amber-500/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">Who We Are</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                A dedicated team of senior software engineers, network architects, cybersecurity specialists,
                and digital consultants who believe technology should be robust, practical, and engineered
                to solve concrete business challenges.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-[#142845] text-xs text-slate-400">
              Corporate Headquarters: Lusaka, Zambia
            </div>
          </div>

          {/* Pillar 2: What We Do */}
          <div className="p-7 rounded-xl bg-[#091b35]/70 border border-[#142845] hover:border-amber-500/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">What We Do</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We engineer end-to-end ICT solutions: custom enterprise software, intuitive web and mobile
                applications, intelligent process automation, Zero-Trust network infrastructure, secure cloud
                deployments, and executive technology advisory.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-[#142845] text-xs text-slate-400">
              8 Dedicated Engineering Practices
            </div>
          </div>

          {/* Pillar 3: Why Choose Us */}
          <div className="p-7 rounded-xl bg-[#091b35]/70 border border-[#142845] hover:border-amber-500/40 backdrop-blur-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-11 h-11 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">Why Choose Us</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We reject generic templates and vendor lock-in. Every solution is purpose-built with clean code,
                stringent security standards, dependable SLAs, and transparent engineering methodologies that
                guarantee long-term client success.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-[#142845] text-xs text-slate-400">
              Production-Grade Reliability Guaranteed
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-start">
          <button
            onClick={onLearnMore}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#0d223f] hover:bg-[#122b50] border border-[#1e3b66] hover:border-amber-500/40 rounded-lg transition-all cursor-pointer group"
          >
            <span>Learn More About Digital Minds Ltd</span>
            <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
