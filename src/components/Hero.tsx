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
    <section className="relative overflow-hidden bg-white border-b border-slate-200 min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* High-Impact Panoramic Twilight Engineering Visual */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/hero_architecture_evening.png"
          alt="Digital Minds High-Quality Engineering & Architecture"
          className="w-full h-full object-cover object-center lg:object-[center_right] opacity-75 lg:opacity-90"
        />
        {/* Cinematic dusk-navy gradients for contrast and text clarity */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#071325] via-[#071325]/90 to-transparent lg:w-[65%]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#071325] via-transparent to-[#071325]/40"
          aria-hidden="true"
        />
        {/* Warm ambient golden glow mimicking building interior lighting */}
        <div
          className="absolute top-1/3 right-1/4 w-[450px] h-[350px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Smart Headline & Actions matching the reference design */}
          <div className="lg:col-span-8 flex flex-col items-start">
            {/* Category Subtitle */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d223f]/90 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Enterprise ICT & Intelligent Engineering</span>
            </div>

            {/* Main Headline - Bold, clean modern sans with signature amber dot */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-heading [text-wrap:balance]">
              We Deliver High-Quality Software Engineering projects & Computer Systems<span className="text-amber-400">.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-8 max-w-2xl font-normal">
              At Digital Minds Ltd, we combine engineering excellence, smart technology architectures and reliable
              ICT solutions to help businesses and institutions solve complex real-world challenges.
            </p>

            {/* Actions matching reference layout: Request a Quote (Amber) + Learn More (White Outline) */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onStartProject}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md shadow-lg shadow-amber-400/25 transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:text-white bg-[#071325]/40 hover:bg-white/10 border border-white/60 hover:border-white rounded-md backdrop-blur-sm transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>

            {/* Architectural practice markers */}
            <div className="mt-12 pt-8 border-t border-[#142845]/90 w-full grid grid-cols-3 gap-4 text-slate-300 text-xs">
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm font-heading">Enterprise Core</span>
                <span className="text-slate-400 mt-0.5">Software & Web Platforms</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm font-heading">Applied AI</span>
                <span className="text-slate-400 mt-0.5">Automated Workflows</span>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white text-sm font-heading">Zero Trust</span>
                <span className="text-slate-400 mt-0.5">Security & Infrastructure</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Metrics Strip */}
        <div className="mt-14 pt-8 border-t border-[#142845] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-[#091b35]/70 border border-[#142845] backdrop-blur-md hover:border-amber-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight tabular-nums font-heading">
              99.98%
            </div>
            <div className="text-xs font-medium text-slate-300 mt-1">
              Production System Availability
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091b35]/70 border border-[#142845] backdrop-blur-md hover:border-amber-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums font-heading">
              8 Core
            </div>
            <div className="text-xs font-medium text-slate-300 mt-1">
              ICT & Engineering Divisions
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091b35]/70 border border-[#142845] backdrop-blur-md hover:border-amber-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums font-heading">
              40+
            </div>
            <div className="text-xs font-medium text-slate-300 mt-1">
              Engineered Blueprints & Solutions
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#091b35]/70 border border-[#142845] backdrop-blur-md hover:border-amber-500/40 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight tabular-nums font-heading">
              24/7 SLA
            </div>
            <div className="text-xs font-medium text-slate-300 mt-1">
              Continuous Infrastructure Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
