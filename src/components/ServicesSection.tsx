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
    const props = { className: 'w-5 h-5 text-amber-400' };
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
    <section id="services" className="py-20 bg-[#071325] border-b border-[#142845] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Our Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-heading [text-wrap:balance]">
              Comprehensive ICT & Enterprise Solutions<span className="text-amber-400">.</span>
            </h2>
            <p className="mt-3 text-base text-slate-300 font-normal">
              From bespoke business software and cloud infrastructure to applied artificial intelligence and Zero-Trust
              cybersecurity, we engineer reliable digital foundations for modern enterprises.
            </p>
          </div>

          <button
            onClick={() => onRequestQuote()}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-md shadow-sm shadow-amber-400/25 transition-all whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Request Full Rate Card & SLA</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const indexNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={service.id}
                className="group p-6 rounded-xl bg-[#091b35]/70 border border-[#142845] hover:border-amber-500/40 hover:bg-[#0c2242] transition-all duration-300 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  {/* Top Bar inside card: Editorial Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-semibold text-amber-400/70">
                      {indexNumber}.
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2.5 font-heading">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {service.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 pt-3 border-t border-[#142845] mb-6">
                    {service.subservices.slice(0, 3).map((sub, sIdx) => (
                      <div key={sIdx} className="text-[11px] text-slate-300 flex items-center gap-2 truncate">
                        <span className="text-amber-400 text-xs shrink-0 font-bold">·</span>
                        <span className="truncate">{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[#142845]">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    Learn More
                  </button>

                  <button
                    onClick={() => onRequestQuote(service.title)}
                    className="text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 group/btn"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 group-hover/btn:translate-x-0.5 transition-transform" />
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
