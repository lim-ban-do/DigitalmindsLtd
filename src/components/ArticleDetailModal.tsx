import React, { useState } from 'react';
import { X, Calendar, Clock, User, Share2, Check, ArrowRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectCategory?: (category: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  onSelectCategory
}) => {
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const paragraphs = article.content.split('\n\n');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-[#091b35] border border-[#142845] rounded-2xl shadow-2xl p-6 sm:p-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#142845] transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-4">
          <span className="font-semibold text-amber-400 uppercase tracking-wider">
            {article.category}
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{article.readTime}</span>
          </span>
          <span>·</span>
          <span>
            {new Date(article.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-4 [text-wrap:balance]">
          {article.title}<span className="text-amber-400">.</span>
        </h2>

        {/* Author byline */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#142845]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-xs font-heading">
              DM
            </div>
            <div>
              <div className="text-xs font-bold text-white">{article.author}</div>
              <div className="text-[11px] text-slate-400">{article.authorRole}</div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#061224] border border-[#142845] hover:border-amber-400/40 text-xs text-slate-300 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>

        {/* Body content */}
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-h-[50vh] overflow-y-auto pr-2">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="font-normal">
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-[#142845] flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Published by Digital Minds Technology Research & Engineering Practice
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/20"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  );
};
