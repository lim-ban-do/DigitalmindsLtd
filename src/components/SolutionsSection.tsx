import React, { useState } from 'react';
import { solutionsData } from '../data/solutionsData';
import { SolutionItem } from '../types';
import { CheckCircle2, ArrowRight, Layers, Building2, Landmark, Stethoscope, Sprout, ShoppingBag, Home, Briefcase, GraduationCap } from 'lucide-react';

interface SolutionsSectionProps {
  onRequestQuote: (solutionTitle?: string) => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onRequestQuote }) => {
  const [selectedId, setSelectedId] = useState<string>(solutionsData[0].id);

  const activeSolution = solutionsData.find((s) => s.id === selectedId) || solutionsData[0];

  const getIndustryIcon = (id: string) => {
    switch (id) {
      case 'education':
        return <GraduationCap className="w-4 h-4" />;
      case 'healthcare':
        return <Stethoscope className="w-4 h-4" />;
      case 'agriculture':
        return <Sprout className="w-4 h-4" />;
      case 'finance':
        return <Landmark className="w-4 h-4" />;
      case 'government':
        return <Building2 className="w-4 h-4" />;
      case 'retail':
        return <ShoppingBag className="w-4 h-4" />;
      case 'real-estate':
        return <Home className="w-4 h-4" />;
      case 'business-automation':
      case 'enterprise-platforms':
      default:
        return <Briefcase className="w-4 h-4" />;
    }
  };

  return (
    <section id="solutions" className="py-20 bg-[#071325] border-b border-[#142845] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Industry Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-heading [text-wrap:balance]">
            Tailored Industry Architecture Blueprints<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-3 text-base text-slate-300 font-normal">
            We architect and customize industry-specific systems. Explore our solution categories below to see
            how Digital Minds Ltd configures specialized workflows for education, healthcare, agriculture, finance, and institutions.
          </p>
          <div className="mt-2 text-xs text-slate-400 italic">
            * Note: These represent solution architectures and customizable platforms engineered by Digital Minds Ltd.
          </div>
        </div>

        {/* Industry Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {solutionsData.map((sol) => {
            const isActive = sol.id === selectedId;
            return (
              <button
                key={sol.id}
                onClick={() => setSelectedId(sol.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-all font-heading cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                    : 'bg-[#091b35] text-slate-300 hover:bg-[#0c2242] hover:text-white border border-[#142845]'
                }`}
              >
                {getIndustryIcon(sol.id)}
                <span>{sol.industry.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Blueprint Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-[#091b35]/75 border border-[#142845] backdrop-blur-md shadow-xl shadow-black/20">
          {/* Left Column: Solution Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5 font-heading">
                {activeSolution.industry}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-heading">
                {activeSolution.title}
              </h3>
              <p className="text-sm text-amber-300/90 font-medium italic mb-4">
                "{activeSolution.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                {activeSolution.description}
              </p>

              {/* Key Modules */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-heading">
                  Core Functional Modules Included
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSolution.keyModules.map((module, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-[#071325]/90 border border-[#142845] text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA inside active blueprint */}
            <div className="pt-6 border-t border-[#142845] flex flex-wrap items-center gap-4">
              <button
                onClick={() => onRequestQuote(activeSolution.title)}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md shadow-sm shadow-amber-400/25 transition-all cursor-pointer"
              >
                <span>Request Architecture Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
              <span className="text-xs text-slate-400">
                Customizable to your organization's exact hierarchy
              </span>
            </div>
          </div>

          {/* Right Column: Operational Outcomes & Tech Blueprint */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Operational Impact Box */}
            <div className="p-5 rounded-xl bg-[#071325]/90 border border-[#142845]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-heading">
                Measurable Operational Outcomes
              </div>
              <div className="space-y-2.5">
                {activeSolution.operationalBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="text-amber-400 font-bold shrink-0">·</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Stack Box */}
            <div className="p-5 rounded-xl bg-[#071325]/90 border border-[#142845]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2 font-heading">
                Underlying Architectural Standards
              </div>
              <p className="text-xs text-slate-400 mb-3 font-normal">
                Engineered with production technologies adhering to ACID consistency and zero-trust security.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {activeSolution.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded bg-[#091b35] border border-[#1e3b66] text-amber-300/90 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
