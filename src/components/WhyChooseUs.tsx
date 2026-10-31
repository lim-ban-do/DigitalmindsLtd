import React from 'react';
import { Lightbulb, Shield, Users, Layers, TrendingUp, Lock, Headphones } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const advantages = [
    {
      title: 'Innovative Thinking',
      description: 'We do not default to rigid legacy patterns. We explore modern, intelligent approaches that provide competitive differentiation.',
      icon: Lightbulb
    },
    {
      title: 'Reliable Technology',
      description: 'Engineered for resilience, high concurrency, and data integrity. We build production systems you can depend on 24 hours a day.',
      icon: Shield
    },
    {
      title: 'Client-Focused Solutions',
      description: 'Every architecture begins with your strategic operational outcomes, not pre-packaged software forced onto your business.',
      icon: Users
    },
    {
      title: 'Professional Engineering Approach',
      description: 'Rigorous requirement specifications, domain-driven codebases, comprehensive testing, and clear deployment pipelines.',
      icon: Layers
    },
    {
      title: 'Scalable Systems',
      description: 'Designed from day one to handle multiplying user counts, multi-branch expansions, and heavy database loads without degradation.',
      icon: TrendingUp
    },
    {
      title: 'Security-Focused Development',
      description: 'Zero Trust principles, encrypted communication channels, role-based access control, and defensible audit trails.',
      icon: Lock
    },
    {
      title: 'Ongoing Technical Support',
      description: 'Our engagement does not end at deployment. We deliver proactive SLA monitoring, system maintenance, and responsive technical care.',
      icon: Headphones
    }
  ];

  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Competitive Edge
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
            Why Forward-Thinking Enterprises Choose Digital Minds
          </h2>
          <p className="mt-3 text-base text-slate-300 font-normal">
            We bridge the gap between ambitious corporate strategy and disciplined technical execution.
            Here is what sets our technology practice apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{adv.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {adv.description}
                </p>
              </div>
            );
          })}

          {/* 8th Card: Partnership Commitments */}
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-950/40 via-slate-950 to-slate-950 border border-blue-500/30 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
                Our Guarantee
              </div>
              <h3 className="text-base font-bold text-white mb-2">Direct Technical Accountability</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                When you partner with Digital Minds Ltd, you work directly with senior architects and developers.
                Zero bureaucratic red tape, total transparency, and rapid delivery cycles.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-[11px] text-blue-400 font-medium">
              Enterprise SLA Guarantee Included
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
