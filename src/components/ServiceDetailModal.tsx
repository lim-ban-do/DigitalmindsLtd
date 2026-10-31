import React from 'react';
import { X, CheckCircle2, ArrowRight, HelpCircle, Code, Globe, Smartphone, Cpu, ShieldCheck, Server, Cloud, Compass } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onRequestQuote
}) => {
  if (!service) return null;

  const renderIcon = (name: string) => {
    const props = { className: 'w-6 h-6 text-blue-400' };
    switch (name) {
      case 'Code2':
        return <Code {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'Smartphone':
        return <Smartphone {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'ShieldCheck':
        return <ShieldCheck {...props} />;
      case 'Server':
        return <Server {...props} />;
      case 'Cloud':
        return <Cloud {...props} />;
      case 'Compass':
      default:
        return <Compass {...props} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
            {renderIcon(service.iconName)}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Digital Minds Service Practice
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">{service.title}</h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Practice Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {service.fullDesc}
            </p>
          </div>

          {/* Subservices & Capabilities */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Core Capabilities & Deliverables
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.subservices.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Business Benefits */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Strategic Business Value
            </h4>
            <div className="space-y-2">
              {service.businessBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-blue-400 font-bold shrink-0">·</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies Used */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Architectural Stack & Protocols
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700/60 text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Frequently Asked Questions</span>
              </h4>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800">
                    <div className="text-xs font-semibold text-white mb-1.5">{faq.question}</div>
                    <div className="text-xs text-slate-400 leading-relaxed">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestQuote(service.title);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
          >
            <span>Request Consultation for this Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
