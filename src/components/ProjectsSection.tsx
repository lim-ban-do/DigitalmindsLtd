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
    <section id="projects" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
              Portfolio & Engineering Blueprints
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Featured Systems & Architecture Blueprints
            </h2>
            <p className="mt-3 text-base text-slate-300 font-normal">
              Explore demonstration architectures and enterprise systems engineered by Digital Minds Ltd.
              Every system is clearly marked to ensure total transparency.
            </p>
          </div>

          {/* Quick Notice */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-xs">
            <span className="font-semibold text-white block mb-0.5">Integrity Policy:</span>
            Demonstration architectures are explicitly labelled and distinct from deployed client systems.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by system title, keywords, or technology (e.g. React, PostgreSQL)..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Type Filter Buttons (Demo vs Live) */}
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-lg">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Systems ({projects.length})
              </button>
              <button
                onClick={() => setFilterType('demo')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'demo'
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Demonstration
              </button>
              <button
                onClick={() => setFilterType('live')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  filterType === 'live'
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
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
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Industries' : c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-xl bg-slate-900/40 border border-slate-800">
            <Layers className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <div className="text-sm font-semibold text-white">No projects found</div>
            <div className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or industry filter.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-48 bg-slate-950 overflow-hidden">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

                    {/* Badge on image */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-md ${
                          project.isDemo
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {project.isDemo ? 'Demonstration Architecture' : 'Client System'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-[11px] text-slate-300 font-mono truncate">
                      {project.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2 line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Metric */}
                    {project.impactMetric && (
                      <div className="mb-4 text-[11px] text-slate-300 font-medium bg-slate-950 p-2 rounded border border-slate-850">
                        <span className="text-blue-400 font-semibold">Impact:</span> {project.impactMetric}
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[10px]">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-1.5 py-0.5 text-slate-500">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-850/60 mt-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer inline-flex items-center gap-1.5 pt-3"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Specifications</span>
                  </button>

                  <button
                    onClick={() => onRequestQuote(`System inquiry: ${project.title}`)}
                    className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1 pt-3"
                  >
                    <span>Request Quote</span>
                    <ArrowRight className="w-3 h-3 text-slate-500" />
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
