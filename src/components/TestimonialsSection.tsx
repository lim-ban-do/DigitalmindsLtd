import React from 'react';
import { Testimonial } from '../types';
import { Quote, ArrowRight, CheckCircle2 } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onRequestQuote: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onRequestQuote
}) => {
  const verifiedTestimonials = testimonials.filter((t) => t.verified);

  return (
    <section className="py-20 bg-slate-900/60 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Client Partnerships & Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
            Trusted Engineering Partnerships
          </h2>
          <p className="mt-3 text-base text-slate-300 font-normal">
            We hold ourselves to strict engineering transparency. All feedback reflects verified client engagements.
          </p>
        </div>

        {verifiedTestimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {verifiedTestimonials.map((t) => (
              <div
                key={t.id}
                className="p-8 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-blue-500/40 mb-4" />
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{t.clientName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-xs text-slate-400">
                      {t.role} · {t.company}
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">{t.service}</span>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Neutral Client Invitation Banner as instructed */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-slate-900 border border-blue-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-1">
              Client Onboarding Open
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Ready to Upgrade Your Corporate Technology Infrastructure?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Whether you require an institutional management portal, enterprise database refactoring, or a complete digital transformation roadmap, Digital Minds Ltd is prepared to engineer your solution.
            </p>
          </div>

          <button
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-600/20 transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Become a Client Partner</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
