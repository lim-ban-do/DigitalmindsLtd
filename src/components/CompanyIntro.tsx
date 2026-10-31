import React from 'react';
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Zap } from 'lucide-react';

interface CompanyIntroProps {
  onLearnMore: () => void;
}

export const CompanyIntro: React.FC<CompanyIntroProps> = ({ onLearnMore }) => {
  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Company Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
            Technology That Moves Your Business Forward.
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
          <div className="p-7 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Who We Are</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A dedicated team of senior software engineers, network architects, cybersecurity specialists,
                and digital consultants who believe technology should be robust, practical, and engineered
                to solve concrete business challenges.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-900 text-xs text-slate-500">
              Corporate Headquarters: Lusaka, Zambia
            </div>
          </div>

          {/* Pillar 2: What We Do */}
          <div className="p-7 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">What We Do</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We engineer end-to-end ICT solutions: custom enterprise software, intuitive web and mobile
                applications, intelligent process automation, Zero-Trust network infrastructure, secure cloud
                deployments, and executive technology advisory.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-900 text-xs text-slate-500">
              8 Dedicated Engineering Practices
            </div>
          </div>

          {/* Pillar 3: Why Choose Us */}
          <div className="p-7 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Why Choose Us</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We reject generic templates and vendor lock-in. Every solution is purpose-built with clean code,
                stringent security standards, dependable SLAs, and transparent engineering methodologies that
                guarantee long-term client success.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-slate-900 text-xs text-slate-500">
              Production-Grade Reliability Guaranteed
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12 flex justify-start">
          <button
            onClick={onLearnMore}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <span>Learn More About Digital Minds Ltd</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
