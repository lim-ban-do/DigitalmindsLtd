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
    <section id="solutions" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Industry Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
            Tailored Industry Architecture Blueprints
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
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {solutionsData.map((sol) => {
            const isActive = sol.id === selectedId;
            return (
              <button
                key={sol.id}
                onClick={() => setSelectedId(sol.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                {getIndustryIcon(sol.id)}
                <span>{sol.industry.split('&')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Solution Blueprint Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-slate-800">
          {/* Left Column: Solution Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1.5">
                {activeSolution.industry}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {activeSolution.title}
              </h3>
              <p className="text-sm text-slate-300 font-medium italic mb-4">
                "{activeSolution.tagline}"
              </p>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 font-normal">
                {activeSolution.description}
              </p>

              {/* Key Modules */}
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Core Functional Modules Included
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSolution.keyModules.map((module, mIdx) => (
                    <div
                      key={mIdx}
                      className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA inside active blueprint */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onRequestQuote(activeSolution.title)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
              >
                <span>Request Architecture Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-slate-400">
                Customizable to your organization's exact hierarchy
              </span>
            </div>
          </div>

          {/* Right Column: Operational Outcomes & Tech Blueprint */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Operational Impact Box */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                Measurable Operational Outcomes
              </div>
              <div className="space-y-2.5">
                {activeSolution.operationalBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-blue-500 font-bold shrink-0">·</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Stack Box */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Underlying Architectural Standards
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Engineered with production technologies adhering to ACID consistency and zero-trust security.
              </p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {activeSolution.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
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
