import React from 'react';
import { Target, Eye, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { CompanySettings } from '../types';

interface AboutSectionProps {
  settings?: CompanySettings;
  onRequestQuote: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings, onRequestQuote }) => {
  const mission =
    settings?.mission ||
    'To deliver innovative, reliable and accessible technology solutions that empower businesses and institutions to operate smarter and grow through digital transformation.';

  const vision =
    settings?.vision ||
    'To become a trusted technology solutions provider recognised for innovation, excellence and meaningful digital impact.';

  const coreValues = [
    {
      name: 'Innovation',
      desc: 'Constantly challenging legacy constraints to deliver progressive, forward-engineered digital solutions.'
    },
    {
      name: 'Integrity',
      desc: 'Transparent engineering standards, uncompromised honesty in feasibility assessments, and unwavering data ethics.'
    },
    {
      name: 'Excellence',
      desc: 'Commitment to high-performance, fault-tolerant architectures and clean, maintainable code.'
    },
    {
      name: 'Reliability',
      desc: 'Building systems that endure heavy production loads and continuous uptime requirements.'
    },
    {
      name: 'Collaboration',
      desc: 'Working as an embedded technical partner with your internal stakeholders and leadership.'
    },
    {
      name: 'Customer Satisfaction',
      desc: 'Measuring our success strictly by the operational velocity and tangible ROI delivered to your business.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#071325] border-b border-[#142845] relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
            Corporate Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-heading [text-wrap:balance]">
            Engineering the Intelligent Digital Enterprise<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-4 text-base text-slate-300 leading-relaxed font-normal">
            Digital Minds Ltd was established with a singular focus: to elevate corporate and institutional technology
            standards. We combine deep computer science discipline with practical business understanding, transforming
            complex operational challenges into streamlined, intelligent software systems.
          </p>
        </div>

        {/* Workspace Visual & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-[#142845] bg-[#091b35] shadow-2xl">
              <img
                src="/src/assets/images/workspace_tech_innovation_1793460810531.jpg"
                alt="Digital Minds engineering studio and technology team"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071325]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#091b35]/90 backdrop-blur-md border border-[#142845] text-xs text-slate-300">
                <span className="text-amber-400 font-semibold block mb-0.5 font-heading">Digital Minds Innovation Center</span>
                Architecting high-availability systems for African and international enterprises.
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading">Our Strategic Approach</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Unlike traditional agencies that deploy superficial templates, Digital Minds Ltd approaches every engagement
              as an enterprise software engineering endeavor. We map data relationships, evaluate edge-case exceptions, and
              build resilient systems that continue performing flawlessly years into the future.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#091b35]/70 border border-[#142845] text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Zero vendor lock-in with clean, open, and documented source architectures.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#091b35]/70 border border-[#142845] text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Zero-Trust security frameworks embedded across network and application layers.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#091b35]/70 border border-[#142845] text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Direct senior engineering accessibility throughout design and deployment.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-[#091b35]/75 border border-[#142845] hover:border-amber-500/40 backdrop-blur-md transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Target className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-heading">
                Our Mission
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">Empowering Smarter Operations</h3>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{mission}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#142845] text-xs text-slate-400">
              Guiding every system architecture since inception.
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#091b35]/75 border border-[#142845] hover:border-amber-500/40 backdrop-blur-md transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Eye className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2 font-heading">
                Our Vision
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">Meaningful Digital Impact</h3>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{vision}"
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#142845] text-xs text-slate-400">
              Transforming businesses across Africa and global markets.
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Foundational Principles
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-heading">
              Our Core Values<span className="text-amber-400">.</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2">
              These six core tenets dictate our team culture, our engineering choices, and our client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-[#091b35]/70 border border-[#142845] hover:border-amber-500/40 hover:bg-[#0c2242] transition-all backdrop-blur-md"
              >
                <div className="text-xs font-mono font-bold text-amber-400 mb-2">
                  0{idx + 1}.
                </div>
                <h4 className="text-base font-bold text-white mb-2 font-heading">{val.name}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0d2342] via-[#091b35] to-[#071325] border border-amber-500/35 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-2 font-heading">
              Our Commitment to Clients
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              We pledge uncompromising technical rigor, transparent communications, on-time delivery, and continuous
              post-launch engineering support for every project entrusted to our care.
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md shadow-lg shadow-amber-400/25 transition-all cursor-pointer shrink-0"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
};
