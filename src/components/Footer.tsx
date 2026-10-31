import React, { useState } from 'react';
import { Phone, Mail, MapPin, Shield, ArrowUp, X, CheckCircle2 } from 'lucide-react';
import { CompanySettings } from '../types';

interface FooterProps {
  onNavClick: (tabId: string) => void;
  openAdminModal: () => void;
  settings?: CompanySettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, openAdminModal, settings }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  const phone = settings?.phone || '0967717777';
  const email = settings?.email || 'digitalmindsltd@gmail.com';
  const address = settings?.address || 'Lusaka Corporate ICT Center, Great East Road, Lusaka, Zambia';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-[#050e1b] text-slate-400 border-t border-[#142845] pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Col 1 & 2: Brand & Description */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/DigitalMinds_Logo_Showcase__2__50057530.png"
                  alt="Digital Minds Ltd"
                  className="h-10 w-auto object-contain rounded"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-lg font-bold text-white tracking-tight block leading-none font-heading">
                    Digital Minds<span className="text-amber-400 text-sm font-semibold ml-1">Ltd</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                    ICT & Technology Solutions
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-sm">
                A full-service ICT company engineering custom software, enterprise platforms,
                applied artificial intelligence, and Zero-Trust cloud infrastructure.
              </p>

              <div className="text-xs text-amber-400 font-medium italic">
                "Think Digital. Build Intelligent Solutions."
              </div>

              {/* Direct Contacts */}
              <div className="pt-2 space-y-2.5 text-xs">
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-heading tracking-wide">{phone}</span>
                </a>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{email}</span>
                </a>
                <div className="flex items-start gap-2 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{address}</span>
                </div>
              </div>
            </div>

            {/* Col 3: Navigation */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                {['home', 'about', 'services', 'solutions', 'projects', 'insights', 'contact'].map(
                  (id) => (
                    <li key={id}>
                      <button
                        onClick={() => onNavClick(id)}
                        className="hover:text-amber-400 transition-colors capitalize cursor-pointer text-slate-300"
                      >
                        {id === 'about'
                          ? 'About Us'
                          : id === 'contact'
                          ? 'Contact Us'
                          : id}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Col 4: Core Services */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
                Core Services
              </h4>
              <ul className="space-y-2.5 text-xs">
                {[
                  'Software Development',
                  'Web Development',
                  'Mobile Application Dev',
                  'Artificial Intelligence',
                  'Cybersecurity Solutions',
                  'Networking Infrastructure',
                  'Cloud Integration',
                  'ICT Consultancy'
                ].map((s, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onNavClick('services')}
                      className="hover:text-amber-400 transition-colors cursor-pointer text-left text-slate-300"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Governance & Admin */}
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-heading">
                Compliance & Portal
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    onClick={() => setLegalModal('privacy')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModal('terms')}
                    className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li className="pt-3">
                  <button
                    onClick={openAdminModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#091b35] border border-[#142845] text-slate-300 hover:text-white hover:border-amber-500/40 transition-colors text-xs cursor-pointer font-heading"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Administrator Console</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#142845] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} Digital Minds Ltd. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <span>Lusaka, Zambia</span>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors cursor-pointer"
                title="Scroll to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {legalModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-4">
              {legalModal === 'privacy'
                ? 'Digital Minds Ltd — Privacy Policy'
                : 'Digital Minds Ltd — Terms and Conditions'}
            </h3>

            <div className="space-y-4 text-xs text-slate-300 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed font-normal">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Digital Minds Ltd is committed to maintaining the utmost confidentiality, integrity, and security
                    of personal and organizational information submitted through this website and our client platforms.
                  </p>
                  <p>
                    <strong>Information Collection:</strong> We collect contact details, organization identifiers, and
                    project specifications provided voluntarily in inquiries and quotation requests. We do not sell,
                    rent, or monetize client data under any circumstances.
                  </p>
                  <p>
                    <strong>Data Security:</strong> All client communications are transmitted via TLS 1.3 encryption
                    and stored within access-controlled databases following international cybersecurity standards.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    These terms govern the use of the Digital Minds Ltd website and digital service engagement
                    frameworks.
                  </p>
                  <p>
                    <strong>Intellectual Property:</strong> Custom software, code repositories, and proprietary
                    deliverables engineered under formal contracts are transferred to client ownership upon milestone
                    settlement according to agreed Statements of Work (SOW).
                  </p>
                  <p>
                    <strong>Service Level Agreements:</strong> Maintenance and uptime standards are governed by
                    specific contractual SLAs executed directly between Digital Minds Ltd and the respective client entity.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
