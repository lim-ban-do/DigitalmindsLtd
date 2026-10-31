import React from 'react';
import { Search, Compass, Palette, Terminal, Rocket } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      tagline: 'Understand the client’s operational reality',
      desc: 'We conduct structured technical interviews and workflow audits to uncover the exact challenges, integration points, and objectives of your organization.',
      icon: Search
    },
    {
      number: '02',
      title: 'Plan',
      tagline: 'Define requirements and architecture',
      desc: 'We draft the technical roadmap, database schema blueprints, security invariants, API contracts, and milestone timelines before writing code.',
      icon: Compass
    },
    {
      number: '03',
      title: 'Design',
      tagline: 'Create intuitive user interfaces',
      desc: 'We prototype streamlined interfaces and user journeys that reduce training time for your staff and make complex enterprise systems easy to use.',
      icon: Palette
    },
    {
      number: '04',
      title: 'Develop',
      tagline: 'Build and test the solution',
      desc: 'Our engineers write clean, typed code backed by automated testing, database migrations, and continuous security vulnerability scans.',
      icon: Terminal
    },
    {
      number: '05',
      title: 'Deploy & Support',
      tagline: 'Launch, maintain and improve',
      desc: 'We execute zero-downtime production deployment, conduct staff training, and provide proactive SLA monitoring and system maintenance.',
      icon: Rocket
    }
  ];

  return (
    <section className="py-20 bg-slate-900/40 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Engineering Methodology
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
            Our Disciplined Five-Step Development Process
          </h2>
          <p className="mt-3 text-base text-slate-300 font-normal">
            Predictable outcomes require structured execution. Every Digital Minds project follows our proven
            lifecycle from initial discovery to long-term operational excellence.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-blue-400">
                      Step {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                  <div className="text-xs font-medium text-slate-400 mb-3 italic">
                    {step.tagline}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-900 text-[10px] text-slate-500 font-mono">
                  Phase Verification Signoff
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
