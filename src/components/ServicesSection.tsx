import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { ServiceItem } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ArrowRight, Code, Globe, Smartphone, Cpu, ShieldCheck, Server, Cloud, Compass } from 'lucide-react';

interface ServicesSectionProps {
  onRequestQuote: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onRequestQuote }) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (name: string) => {
    const props = { className: 'w-5 h-5 text-blue-400' };
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
    <section id="services" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
              Our Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Comprehensive ICT & Enterprise Solutions
            </h2>
            <p className="mt-3 text-base text-slate-400 font-normal">
              From bespoke business software and cloud infrastructure to applied artificial intelligence and Zero-Trust
              cybersecurity, we engineer reliable digital foundations for modern enterprises.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote()}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Request Full Rate Card & SLA</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const indexNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="group p-6 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar inside card: Editorial Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {indexNumber}.
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2.5">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-850/80 mb-6">
                    {service.subservices.slice(0, 3).map((sub, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-2 truncate">
                        <span className="text-blue-500 text-xs shrink-0">·</span>
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-850">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => onRequestQuote(service.title)}
                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onRequestQuote={onRequestQuote}
      />
    </section>
  );
};
