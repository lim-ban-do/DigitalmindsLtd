import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { CompanySettings, Inquiry } from '../types';

interface ContactSectionProps {
  settings?: CompanySettings;
  onSuccess?: (inquiry: Inquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    serviceRequired: 'Software Development',
    projectBudget: '$10,000 - $25,000',
    message: '',
    honeypot: '' // Spam protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const phone = settings?.phone || '0967717777';
  const email = settings?.email || 'digitalmindsltd@gmail.com';
  const address = settings?.address || 'Lusaka Corporate ICT Center, Great East Road, Lusaka, Zambia';
  const hours = settings?.workingHours || 'Monday - Friday: 08:00 - 17:30';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Spam honeypot
    if (formData.honeypot) {
      return;
    }

    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg('Please enter your message or project requirements.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          organization: formData.organization,
          serviceRequired: formData.serviceRequired,
          projectBudget: formData.projectBudget,
          message: formData.message
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Error submitting inquiry.');
      }

      setSuccessMsg(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        serviceRequired: 'Software Development',
        projectBudget: '$10,000 - $25,000',
        message: '',
        honeypot: ''
      });

      if (onSuccess) {
        onSuccess(data.data);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Unable to submit your inquiry at this moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/50 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-2">
            Direct Communication
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight [text-wrap:balance]">
            Contact Our Technology Practice
          </h2>
          <p className="mt-3 text-base text-slate-300 font-normal">
            Whether you have a specific software brief, require an infrastructure assessment, or wish to explore a
            long-term digital partnership, our team is ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Official Contact Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Digital Minds Ltd</h3>
              <p className="text-xs text-slate-400 mb-8 italic">
                "Think Digital. Build Intelligent Solutions."
              </p>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Telephone Inquiries</div>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-sm font-semibold text-white hover:text-blue-400 transition-colors block mt-0.5"
                    >
                      {phone}
                    </a>
                    <span className="text-[11px] text-slate-500">Direct engineering & sales desk</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Official Email</div>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-semibold text-white hover:text-blue-400 transition-colors block mt-0.5"
                    >
                      {email}
                    </a>
                    <span className="text-[11px] text-slate-500">24h SLA response guarantee</span>
                  </div>
                </div>

                {/* Physical Location */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Corporate Office</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5 leading-relaxed">
                      {address}
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Operating Schedule</div>
                    <div className="text-xs font-semibold text-slate-200 mt-0.5">
                      {hours}
                    </div>
                    <span className="text-[11px] text-slate-500">Engineering emergency on-call 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-900 text-[11px] text-slate-500">
              Registered ICT Company in the Republic of Zambia.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800">
            <h3 className="text-xl font-bold text-white mb-1">Send an Inquiry</h3>
            <p className="text-xs text-slate-400 mb-6">
              Complete the fields below and our team will get in touch directly.
            </p>

            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-semibold">Inquiry Dispatched Successfully</div>
                  <div className="text-emerald-300/80 text-[11px] mt-0.5">
                    Your message has been stored in our communications database. Our team will contact you shortly.
                  </div>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3 mb-6">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam honeypot hidden */}
              <input
                type="text"
                name="website_source"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Kondwani Phiri"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. k.phiri@enterprise.zm"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0967717777"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Organisation / Business
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. Zambezi Logistics"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile Application Development">Mobile Application Development</option>
                    <option value="Artificial Intelligence & Automation">Artificial Intelligence & Automation</option>
                    <option value="Cybersecurity Solutions">Cybersecurity Solutions</option>
                    <option value="Networking & IT Infrastructure">Networking & IT Infrastructure</option>
                    <option value="Cloud Solutions & Integration">Cloud Solutions & Integration</option>
                    <option value="ICT Consultancy & Training">ICT Consultancy & Training</option>
                    <option value="General ICT Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Project Budget (Optional)
                  </label>
                  <select
                    value={formData.projectBudget}
                    onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Under $5,000">Under $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                    <option value="Undetermined">To Be Determined</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Message / Project Brief *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail what you are looking to build, any deadlines, specific problems to solve..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 rounded-lg shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting Message...</span>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
