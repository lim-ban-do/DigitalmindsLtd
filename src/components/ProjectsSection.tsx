import React, { useState } from 'react';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { Search, Filter, ArrowRight, Eye, Layers } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onRequestQuote: (projectTitle?: string) => void;
  onRefresh?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onRequestQuote
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'demo' | 'live'>('all');

  const categories = ['all', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesType =
      filterType === 'all' ||
      (filterType === 'demo' && project.isDemo) ||
      (filterType === 'live' && !project.isDemo);

    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <section id="projects" className="py-20 bg-[#071325] border-b border-[#142845] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[400px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              Portfolio & Engineering Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight font-heading [text-wrap:balance]">
              Featured Systems & Architecture Blueprints<span className="text-amber-400">.</span>
            </h2>
            <p className="mt-3 text-base text-slate-300 font-normal">
              Explore demonstration architectures and enterprise systems engineered by Digital Minds Ltd.
              Every system is clearly marked to ensure total transparency.
            </p>
          </div>

          {/* Quick Notice */}
          <div className="p-3.5 rounded-lg bg-[#091b35] border border-[#142845] text-xs text-slate-300 max-w-xs shadow-sm">
            <span className="font-semibold text-amber-400 block mb-0.5 font-heading">Integrity Policy:</span>
            Demonstration architectures are explicitly labelled and distinct from deployed client systems.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 p-4 rounded-xl bg-[#091b35]/80 border border-[#142845] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 backdrop-blur-md">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by system title, keywords, or technology (e.g. React, PostgreSQL)..."
              className="w-full bg-[#071325] border border-[#142845] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type Filter Buttons (Demo vs Live) */}
            <div className="flex items-center p-1 bg-[#071325] border border-[#142845] rounded-lg">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer font-heading ${
                  filterType === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                All Systems ({projects.length})
              </button>
              <button
                onClick={() => setFilterType('demo')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer font-heading ${
                  filterType === 'demo'
                    ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Demonstration
              </button>
              <button
                onClick={() => setFilterType('live')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer font-heading ${
                  filterType === 'live'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Client Systems
              </button>
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#071325] border border-[#142845] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-400 font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-[#071325] text-slate-200">
                    {c === 'all' ? 'All Industries' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-xl bg-[#091b35]/40 border border-[#142845]">
            <Layers className="w-8 h-8 text-slate-500 mx-auto mb-3" />
            <div className="text-sm font-semibold text-white font-heading">No projects found</div>
            <div className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or industry filter.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl bg-[#091b35]/70 border border-[#142845] hover:border-amber-500/40 hover:bg-[#0c2242] transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-md shadow-lg shadow-black/20"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-48 bg-[#071325] overflow-hidden">
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        <Layers className="w-10 h-10" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091b35] via-transparent to-transparent" />

                    {/* Badge on image */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md ${
                          project.isDemo
                            ? 'bg-amber-950/90 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-950/90 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {project.isDemo ? 'Demonstration Architecture' : 'Client System'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-[11px] text-amber-300/90 font-mono truncate">
                      {project.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mb-2 line-clamp-1 font-heading">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Metric */}
                    {project.impactMetric && (
                      <div className="mb-4 text-[11px] text-slate-200 font-medium bg-[#071325] p-2.5 rounded-lg border border-[#142845]">
                        <span className="text-amber-400 font-semibold font-heading">Impact:</span> {project.impactMetric}
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[10px]">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-[#071325] border border-[#142845] text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-amber-400/80">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-[#142845] mt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 pt-3"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </button>

                  <button
                    onClick={() => onRequestQuote(`System inquiry: ${project.title}`)}
                    className="text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 pt-3 group/btn"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3 h-3 text-amber-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestQuote={onRequestQuote}
      />
    </section>
  );
};
