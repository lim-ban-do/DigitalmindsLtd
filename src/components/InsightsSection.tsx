import React, { useState } from 'react';
import { Article } from '../types';
import { ArticleDetailModal } from './ArticleDetailModal';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface InsightsSectionProps {
  articles: Article[];
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Artificial Intelligence',
    'Software Development',
    'Cybersecurity',
    'Digital Transformation',
    'Technology News',
    'Business Technology',
    'ICT Education'
  ];

  const publishedArticles = articles.filter((a) => a.published);

  const filteredArticles = publishedArticles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      art.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="insights" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
              Insights & Thought Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
              Technology Perspectives & Engineering Briefings
            </h2>
            <p className="mt-3 text-base text-slate-300 font-normal">
              Practical analysis on software architecture, enterprise cybersecurity, applied artificial intelligence,
              and digital transformation strategies for forward-thinking organizations.
            </p>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, keyword, or category..."
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category count */}
            <div className="text-xs text-slate-400">
              Showing {filteredArticles.length} of {publishedArticles.length} published articles
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-xl bg-slate-900/40 border border-slate-800">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-3" />
            <div className="text-sm font-semibold text-white">No articles matched your criteria</div>
            <div className="text-xs text-slate-400 mt-1">Try selecting All Categories or clearing your search.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className="group p-6 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Category and Read time */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-blue-400 uppercase tracking-wider text-[11px]">
                      {art.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{art.readTime}</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-3 leading-snug line-clamp-2">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6 line-clamp-3 font-normal">
                    {art.excerpt}
                  </p>
                </div>

                {/* Card footer */}
                <div className="pt-4 border-t border-slate-850 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-300 font-medium">{art.author}</span>
                  </div>

                  <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Article Detail Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
