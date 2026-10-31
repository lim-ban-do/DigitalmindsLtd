import React, { useState } from 'react';
import { QuoteRequest } from '../types';
import { ArrowRight, CheckCircle2, AlertCircle, FileText, Send, Clock, DollarSign, Building, Phone, Mail, User } from 'lucide-react';

interface QuoteSectionProps {
  initialService?: string;
  onSuccess?: (quote: QuoteRequest) => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({ initialService, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    serviceRequired: initialService || 'Software Development',
    projectScope: '',
    estimatedBudget: '$10,000 - $25,000',
    timeline: '2 - 3 Months',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState<QuoteRequest | null>(null);

  const serviceOptions = [
    'Software Development',
    'Web Development',
    'Mobile Application Development',
    'Artificial Intelligence & Automation',
    'Cybersecurity Solutions',
    'Networking & IT Infrastructure',
    'Cloud Solutions & Integration',
    'ICT Consultancy & Training',
    'Industry Management System (Custom)'
  ];

  const budgetOptions = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Flexible / Seeking Architecture Advisory'
  ];

  const timelineOptions = [
    'Urgent (Under 1 Month)',
    '1 - 2 Months',
    '2 - 3 Months',
    '3 - 6 Months',
    'Flexible / Milestone-Driven'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!formData.projectScope.trim()) {
      setErrorMsg('Please provide a brief description of your project scope or requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Unable to submit quotation request.');
      }

      setSubmittedQuote(data.data);
      if (onSuccess) {
        onSuccess(data.data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error while submitting quotation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedQuote(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      organization: '',
      serviceRequired: 'Software Development',
      projectScope: '',
      estimatedBudget: '$10,000 - $25,000',
      timeline: '2 - 3 Months',
      notes: ''
    });
  };

  return (
    <section id="quote" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Project Quotation & Scoping
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            Request an Intelligent Project Quotation
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 font-normal">
            Detail your specifications and technology requirements. Our solution architects will analyze
            your requirements, formulate a system roadmap, and respond with a formal quotation.
          </p>
        </div>

        {/* Confirmation State */}
        {submittedQuote ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-slate-900 border border-emerald-500/40 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">
              Quotation Request Received
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Thank You, {submittedQuote.fullName}
            </h3>

            <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6">
              Your quotation request has been securely logged in our system. A senior solutions architect from Digital Minds Ltd
              is reviewing your specifications and will follow up within 24 business hours.
            </p>

            {/* Reference Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto mb-8 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-400">Reference Number:</span>
                <span className="font-mono font-bold text-blue-400">{submittedQuote.referenceNo}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-400">Service:</span>
                <span className="text-white font-medium">{submittedQuote.serviceRequired}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-2">
                <span className="text-slate-400">Estimated Budget:</span>
                <span className="text-white font-medium">{submittedQuote.estimatedBudget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-amber-400 font-semibold uppercase tracking-wide">
                  {submittedQuote.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-8"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Select Service */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-blue-400">01.</span>
                <label className="text-sm font-bold text-white">Select Required ICT Practice</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {serviceOptions.map((serv) => (
                  <button
                    type="button"
                    key={serv}
                    onClick={() => setFormData({ ...formData, serviceRequired: serv })}
                    className={`p-3 text-left rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      formData.serviceRequired === serv
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {serv}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Project Scope */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-blue-400">02.</span>
                <label className="text-sm font-bold text-white">Project Scope & Core Deliverables</label>
              </div>
              <textarea
                rows={4}
                value={formData.projectScope}
                onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                placeholder="Describe your operational goals, existing systems, target users, specific workflows or integration requirements..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
            </div>

            {/* Step 3: Budget & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Target Budget Bracket
                </label>
                <select
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Expected Completion Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                >
                  {timelineOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-blue-400">03.</span>
                <label className="text-sm font-bold text-white">Your Contact Information</label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Mulenga Mwape"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. m.mwape@company.co"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +260 97 1234567"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-400 block mb-1">
                    Organization / Institution
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Apex Holdings Ltd"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 block mb-1">
                Additional Notes or Special Considerations (Optional)
              </label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="e.g. Requires on-premises data center deployment or legacy ERP bridge..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 text-center sm:text-left">
                All inquiries are protected by strict corporate confidentiality.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-lg shadow-lg shadow-blue-600/25 transition-all cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <span>Submit Quotation Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
