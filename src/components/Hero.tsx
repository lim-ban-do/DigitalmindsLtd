import React from 'react';
import { ArrowRight, Code, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onStartProject: () => void;
  onSelectSolution: (solId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onStartProject,
  onSelectSolution
}) => {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-8 pb-16 md:py-20 border-b border-slate-850">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Clean unboxed category label - No pill boxes */}
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              Enterprise ICT & Intelligent Engineering
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6 [text-wrap:balance]">
              Transforming Ideas Into Intelligent Digital Solutions.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
              At Digital Minds Ltd, we combine technology, innovation and expertise to help businesses,
              institutions and individuals solve real-world problems through intelligent digital solutions.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/25 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Explore Our Services</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick architectural capability anchors */}
            <div className="mt-10 pt-8 border-t border-slate-850/80 w-full grid grid-cols-3 gap-4 text-slate-300 text-xs">
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm">Enterprise Core</span>
                <span className="text-slate-400 mt-0.5">Software & Web Platforms</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm">Applied AI</span>
                <span className="text-slate-400 mt-0.5">Automated Workflows</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm">Zero Trust</span>
                <span className="text-slate-400 mt-0.5">Security & Infrastructure</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Technology Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-blue-950/40">
              <img
                src="/src/assets/images/hero_digital_network_1793460808776.jpg"
                alt="Digital Minds enterprise ICT digital network infrastructure"
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* In-frame value statement */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-left">
                <div className="text-xs text-blue-400 font-semibold mb-1">Digital Minds Practice</div>
                <div className="text-sm font-medium text-white">
                  "Think Digital. Build Intelligent Solutions."
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Custom Engineering · High-Availability ICT</span>
                  <span className="text-slate-500">Lusaka, Zambia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Metrics Strip below hero split */}
        <div className="mt-16 pt-10 border-t border-slate-850 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              99.98%
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              Production System Availability
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              8 Core
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              ICT & Engineering Divisions
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              40+
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              Engineered Blueprints & Solutions
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums">
              24/7 SLA
            </div>
            <div className="text-xs font-medium text-slate-400 mt-1">
              Continuous Infrastructure Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
