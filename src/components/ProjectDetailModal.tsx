import React from 'react';
import { X, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestQuote: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestQuote
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#091b35] border border-[#142845] rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#142845] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Badges */}
        <div className="mb-4">
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="text-amber-400 font-semibold">{project.category}</span>
            <span className="text-slate-600">·</span>
            <span
              className={`font-medium ${
                project.isDemo ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {project.isDemo ? 'Demonstration Architecture' : 'Client Production System'}
            </span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
            {project.title}<span className="text-amber-400">.</span>
          </h3>
        </div>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="mb-6 rounded-xl overflow-hidden border border-[#142845] bg-[#061224]">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-56 sm:h-72 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Content */}
        <div className="space-y-5 max-h-[45vh] overflow-y-auto pr-2">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              System Architecture & Scope
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {project.detailedOverview || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Key Deliverables & Functional Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-[#061224] border border-[#142845] text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Impact Metric */}
          {project.impactMetric && (
            <div className="p-4 rounded-xl bg-[#061224] border border-[#142845] flex items-center justify-between">
              <div>
                <div className="text-[11px] text-amber-400/90 font-semibold uppercase">Verified Target Metric</div>
                <div className="text-sm font-bold text-white mt-0.5">{project.impactMetric}</div>
              </div>
              <span className="text-xs font-mono text-slate-400">SLA Standard</span>
            </div>
          )}

          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded bg-[#061224] border border-[#142845] text-amber-200/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#142845] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onRequestQuote(`Similar system to: ${project.title}`);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/20"
          >
            <span>Discuss Building a Similar System</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
