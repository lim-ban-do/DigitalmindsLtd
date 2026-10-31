import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  Layers,
  Inbox,
  FileSpreadsheet,
  BookOpen,
  Settings,
  MessageSquare,
  LogOut,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Edit,
  Save,
  Search,
  ExternalLink,
  Lock,
  RefreshCw
} from 'lucide-react';
import { Inquiry, QuoteRequest, Project, Article, Testimonial, CompanySettings } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onDataChanged
}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('dm_admin_token'));
  const [activeModule, setActiveModule] = useState<'overview' | 'inquiries' | 'quotes' | 'projects' | 'articles' | 'testimonials' | 'settings'>('overview');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@digitalminds.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Loaded data state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Form states for adding items
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Enterprise Software',
    isDemo: true,
    description: '',
    detailedOverview: '',
    technologies: 'React, TypeScript, Node.js, PostgreSQL',
    features: 'Role-Based Dashboard, Real-Time Sync, Automated Invoicing',
    imageUrl: '/src/assets/images/workspace_tech_innovation_1793460810531.jpg',
    impactMetric: '99.9% Uptime Guaranteed'
  });

  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'Software Development',
    excerpt: '',
    content: '',
    author: 'Digital Minds Engineering',
    authorRole: 'Software Architecture Practice',
    published: true
  });

  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    role: 'Managing Director',
    company: '',
    quote: '',
    service: 'Enterprise Software Development'
  });

  useEffect(() => {
    if (token && isOpen) {
      fetchAllData();
    }
  }, [token, isOpen]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resInq, resQuo, resProj, resArt, resTest, resSet] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/quotes'),
        fetch('/api/projects'),
        fetch('/api/articles'),
        fetch('/api/testimonials'),
        fetch('/api/settings')
      ]);

      const [dataInq, dataQuo, dataProj, dataArt, dataTest, dataSet] = await Promise.all([
        resInq.json(),
        resQuo.json(),
        resProj.json(),
        resArt.json(),
        resTest.json(),
        resSet.json()
      ]);

      if (dataInq.success) setInquiries(dataInq.data);
      if (dataQuo.success) setQuotes(dataQuo.data);
      if (dataProj.success) setProjects(dataProj.data);
      if (dataArt.success) setArticles(dataArt.data);
      if (dataTest.success) setTestimonials(dataTest.data);
      if (dataSet.success) setSettings(dataSet.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginEmail, password: loginPassword })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Invalid administrator credentials.');
      }

      setToken(data.token);
      localStorage.setItem('dm_admin_token', data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('dm_admin_token');
  };

  // Inquiry actions
  const updateInquiryStatus = async (id: string, status: 'new' | 'contacted' | 'resolved') => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setInquiries(inquiries.map((i) => (i.id === id ? { ...i, status } : i)));
        showToast(`Inquiry status updated to ${status}`);
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error updating inquiry status', 'error');
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter((i) => i.id !== id));
        showToast('Inquiry deleted');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error deleting inquiry', 'error');
    }
  };

  // Quote actions
  const updateQuoteStatus = async (id: string, status: QuoteRequest['status'], internalNotes?: string) => {
    try {
      const res = await fetch(`/api/quotes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, internalNotes })
      });
      if (res.ok) {
        setQuotes(quotes.map((q) => (q.id === id ? { ...q, status, internalNotes } : q)));
        showToast(`Quote updated to ${status}`);
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error updating quote', 'error');
    }
  };

  const deleteQuote = async (id: string) => {
    if (!window.confirm('Delete this quotation request?')) return;
    try {
      const res = await fetch(`/api/quotes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setQuotes(quotes.filter((q) => q.id !== id));
        showToast('Quote record deleted');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error deleting quote', 'error');
    }
  };

  // Project actions
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProject.title,
          category: newProject.category,
          isDemo: newProject.isDemo,
          description: newProject.description,
          detailedOverview: newProject.detailedOverview,
          technologies: newProject.technologies.split(',').map((t) => t.trim()),
          features: newProject.features.split(',').map((f) => f.trim()),
          imageUrl: newProject.imageUrl,
          impactMetric: newProject.impactMetric
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setProjects([data.data, ...projects]);
        setIsAddingProject(false);
        setNewProject({
          title: '',
          category: 'Enterprise Software',
          isDemo: true,
          description: '',
          detailedOverview: '',
          technologies: 'React, TypeScript, Node.js, PostgreSQL',
          features: 'Role-Based Dashboard, Real-Time Sync, Automated Invoicing',
          imageUrl: '/src/assets/images/workspace_tech_innovation_1793460810531.jpg',
          impactMetric: '99.9% Uptime Guaranteed'
        });
        showToast('Project created successfully');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error creating project', 'error');
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Delete this project portfolio entry?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== id));
        showToast('Project removed');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error deleting project', 'error');
    }
  };

  // Article actions
  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setArticles([data.data, ...articles]);
        setIsAddingArticle(false);
        setNewArticle({
          title: '',
          category: 'Software Development',
          excerpt: '',
          content: '',
          author: 'Digital Minds Engineering',
          authorRole: 'Software Architecture Practice',
          published: true
        });
        showToast('Article published to insights section');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error creating article', 'error');
    }
  };

  const toggleArticlePublish = async (art: Article) => {
    try {
      const res = await fetch(`/api/articles/${art.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !art.published })
      });
      if (res.ok) {
        setArticles(articles.map((a) => (a.id === art.id ? { ...a, published: !art.published } : a)));
        showToast(`Article ${!art.published ? 'published' : 'unpublished'}`);
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error updating article status', 'error');
    }
  };

  const deleteArticle = async (id: string) => {
    if (!window.confirm('Delete this insight article?')) return;
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter((a) => a.id !== id));
        showToast('Article deleted');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error deleting article', 'error');
    }
  };

  // Testimonial actions
  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonials([data.data, ...testimonials]);
        setIsAddingTestimonial(false);
        setNewTestimonial({
          clientName: '',
          role: 'Managing Director',
          company: '',
          quote: '',
          service: 'Enterprise Software Development'
        });
        showToast('Verified testimonial saved');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error creating testimonial', 'error');
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        showToast('Testimonial removed');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error deleting testimonial', 'error');
    }
  };

  // Settings update
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Company contact details and settings saved successfully');
        onDataChanged?.();
      }
    } catch (err) {
      showToast('Error updating settings', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="relative w-full max-w-6xl h-[92vh] bg-[#071325] border border-[#142845] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="h-16 px-6 bg-[#091b35] border-b border-[#142845] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span className="font-heading">Digital Minds Ltd · Administration Console</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#061224] text-amber-400 border border-[#142845]">
                  v2.6 Production
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Secure content management & client communications database
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-[#061224] border border-[#142845] hover:border-amber-400/30 transition-colors cursor-pointer"
                title="Log out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#142845] transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {feedback && (
          <div
            className={`px-4 py-2 text-xs flex items-center justify-between shrink-0 ${
              feedback.type === 'success'
                ? 'bg-emerald-950 text-emerald-300 border-b border-emerald-800'
                : 'bg-red-950 text-red-300 border-b border-red-800'
            }`}
          >
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Content Area */}
        {!token ? (
          /* Login Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-[#061224]">
            <div className="w-full max-w-md p-8 rounded-2xl bg-[#091b35] border border-[#142845] shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white text-center mb-1">
                Administrator Authentication<span className="text-amber-400">.</span>
              </h3>
              <p className="text-xs text-slate-400 text-center mb-6">
                Enter your administrative credentials to manage communications, quotations, and content.
              </p>

              {loginError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Admin Email / Username
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-[#061224] border border-[#142845] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-[#061224] border border-[#142845] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="p-3 rounded-lg bg-[#061224] border border-[#142845] text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300 block">Default Credentials:</span>
                  Username: <code className="text-amber-400 font-mono">admin@digitalminds.com</code>
                  <br />
                  Password: <code className="text-amber-400 font-mono">admin123</code>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer shadow-md shadow-amber-400/20"
                >
                  {loginLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Dashboard Layout */
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-56 bg-[#091b35] border-r border-[#142845] p-4 flex flex-col justify-between shrink-0">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveModule('overview')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'overview'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Overview & KPIs</span>
                </button>

                <button
                  onClick={() => setActiveModule('inquiries')}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'inquiries'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Inbox className="w-4 h-4" />
                    <span>Inquiries</span>
                  </div>
                  {inquiries.filter((i) => i.status === 'new').length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                      {inquiries.filter((i) => i.status === 'new').length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveModule('quotes')}
                  className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'quotes'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Quote Requests</span>
                  </div>
                  {quotes.filter((q) => q.status === 'pending').length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-slate-950 font-bold">
                      {quotes.filter((q) => q.status === 'pending').length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveModule('projects')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'projects'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Projects & Portfolio</span>
                </button>

                <button
                  onClick={() => setActiveModule('articles')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'articles'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Blog & Insights</span>
                </button>

                <button
                  onClick={() => setActiveModule('testimonials')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'testimonials'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Testimonials</span>
                </button>

                <button
                  onClick={() => setActiveModule('settings')}
                  className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeModule === 'settings'
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'text-slate-400 hover:text-white hover:bg-[#142845]'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Company Settings</span>
                </button>
              </div>

              <div className="pt-4 border-t border-[#142845] text-[11px] text-slate-400">
                Logged in as Super Admin
                <br />
                <span className="text-amber-400 font-mono">admin@digitalminds.com</span>
              </div>
            </div>

            {/* Main Panel */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-950">
              {/* Module: Overview */}
              {activeModule === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">System Executive Overview</h3>
                    <p className="text-xs text-slate-400">
                      Live communications telemetry, quote request queues, and portfolio status.
                    </p>
                  </div>

                  {/* KPI Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400 font-medium">Total Inquiries</div>
                      <div className="text-3xl font-extrabold text-white mt-2 tabular-nums">
                        {inquiries.length}
                      </div>
                      <div className="text-[11px] text-blue-400 mt-1">
                        {inquiries.filter((i) => i.status === 'new').length} require response
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400 font-medium">Quote Requests</div>
                      <div className="text-3xl font-extrabold text-white mt-2 tabular-nums">
                        {quotes.length}
                      </div>
                      <div className="text-[11px] text-amber-400 mt-1">
                        {quotes.filter((q) => q.status === 'pending').length} pending review
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400 font-medium">Portfolio Systems</div>
                      <div className="text-3xl font-extrabold text-white mt-2 tabular-nums">
                        {projects.length}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {projects.filter((p) => p.isDemo).length} demo blueprints
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-xs text-slate-400 font-medium">Published Articles</div>
                      <div className="text-3xl font-extrabold text-white mt-2 tabular-nums">
                        {articles.filter((a) => a.published).length}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        Live on Insights Section
                      </div>
                    </div>
                  </div>

                  {/* Recent Inquiries Quick Preview */}
                  <div className="p-6 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-bold text-white">Recent Website Inquiries</h4>
                      <button
                        onClick={() => setActiveModule('inquiries')}
                        className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
                      >
                        View All
                      </button>
                    </div>
                    {inquiries.length === 0 ? (
                      <div className="text-xs text-slate-500 py-4">No inquiries logged yet.</div>
                    ) : (
                      <div className="space-y-3">
                        {inquiries.slice(0, 3).map((inq) => (
                          <div
                            key={inq.id}
                            className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                          >
                            <div>
                              <div className="font-semibold text-white">{inq.fullName}</div>
                              <div className="text-slate-400 text-[11px]">
                                {inq.email} · {inq.serviceRequired}
                              </div>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                                inq.status === 'new'
                                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Module: Inquiries */}
              {activeModule === 'inquiries' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Client & Visitor Inquiries</h3>
                      <p className="text-xs text-slate-400">
                        Inquiries submitted via the Contact form and direct consultation triggers.
                      </p>
                    </div>
                    <button
                      onClick={fetchAllData}
                      className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                      title="Refresh"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
                          <div>
                            <div className="text-sm font-bold text-white flex items-center gap-2">
                              <span>{inq.fullName}</span>
                              {inq.organization && (
                                <span className="text-xs text-slate-400 font-normal">
                                  ({inq.organization})
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-0.5">
                              <span>Email: {inq.email}</span>
                              {inq.phone && <span>· Phone: {inq.phone}</span>}
                              <span>· Practice: {inq.serviceRequired}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={inq.status}
                              onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="resolved">Resolved</option>
                            </select>

                            <button
                              onClick={() => deleteInquiry(inq.id)}
                              className="p-1.5 rounded text-slate-500 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-850 leading-relaxed font-normal">
                          {inq.message}
                        </div>

                        {inq.projectBudget && (
                          <div className="text-[11px] text-slate-400">
                            Budget Range: <span className="text-blue-400 font-medium">{inq.projectBudget}</span>
                          </div>
                        )}

                        <div className="text-[10px] text-slate-500 font-mono">
                          Received: {new Date(inq.createdAt).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module: Quotes */}
              {activeModule === 'quotes' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Project Quotation Requests</h3>
                      <p className="text-xs text-slate-400">
                        Formal scoping submissions received through the Get a Quote portal.
                      </p>
                    </div>
                    <button
                      onClick={fetchAllData}
                      className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 cursor-pointer"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div
                        key={quote.id}
                        className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-850 pb-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-blue-400">
                                {quote.referenceNo}
                              </span>
                              <span className="text-sm font-bold text-white">{quote.fullName}</span>
                              {quote.organization && (
                                <span className="text-xs text-slate-400">({quote.organization})</span>
                              )}
                            </div>
                            <div className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1">
                              <span>Email: {quote.email}</span>
                              {quote.phone && <span>· Phone: {quote.phone}</span>}
                              <span>· Practice: {quote.serviceRequired}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <select
                              value={quote.status}
                              onChange={(e) => updateQuoteStatus(quote.id, e.target.value as any, quote.internalNotes)}
                              className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1 text-xs text-white"
                            >
                              <option value="pending">Pending</option>
                              <option value="reviewing">Under Review</option>
                              <option value="quoted">Quoted</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>

                            <button
                              onClick={() => deleteQuote(quote.id)}
                              className="p-1.5 rounded text-slate-500 hover:text-red-400 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Scope details */}
                        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-850 text-xs text-slate-200">
                          <span className="font-semibold text-slate-400 block mb-1">
                            Project Scope & Requirements:
                          </span>
                          <p className="leading-relaxed font-normal">{quote.projectScope}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Budget</span>
                            <span className="font-semibold text-white">{quote.estimatedBudget}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Timeline</span>
                            <span className="font-semibold text-white">{quote.timeline}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Special Notes</span>
                            <span className="text-slate-300 truncate block">{quote.notes || 'None'}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block text-[10px]">Submitted</span>
                            <span className="text-slate-400">{new Date(quote.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Internal Notes input */}
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            defaultValue={quote.internalNotes || ''}
                            onBlur={(e) => updateQuoteStatus(quote.id, quote.status, e.target.value)}
                            placeholder="Add private internal administrator notes (auto-saves on blur)..."
                            className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module: Projects */}
              {activeModule === 'projects' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Portfolio & Architecture Blueprints</h3>
                      <p className="text-xs text-slate-400">
                        Create, edit, and toggle demonstration vs client production systems.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProject(!isAddingProject)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add System Blueprint</span>
                    </button>
                  </div>

                  {/* Add Project Form */}
                  {isAddingProject && (
                    <form
                      onSubmit={handleCreateProject}
                      className="p-6 rounded-xl bg-slate-900 border border-blue-500/40 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-white">Create New Portfolio System</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Project Title</label>
                          <input
                            type="text"
                            required
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            placeholder="e.g. ApexEdu — Campus ERP Suite"
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Industry / Category</label>
                          <input
                            type="text"
                            required
                            value={newProject.category}
                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                            placeholder="e.g. Education, Healthcare, Finance..."
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="text-xs text-slate-300">System Classification:</label>
                        <button
                          type="button"
                          onClick={() => setNewProject({ ...newProject, isDemo: !newProject.isDemo })}
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            newProject.isDemo
                              ? 'bg-amber-950 text-amber-300 border border-amber-600'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                          }`}
                        >
                          {newProject.isDemo ? 'Demonstration Architecture' : 'Client Production System'}
                        </button>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Short Description</label>
                        <input
                          type="text"
                          required
                          value={newProject.description}
                          onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Detailed Technical Overview</label>
                        <textarea
                          rows={3}
                          value={newProject.detailedOverview}
                          onChange={(e) => setNewProject({ ...newProject, detailedOverview: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Technologies (comma separated)</label>
                          <input
                            type="text"
                            value={newProject.technologies}
                            onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Impact Metric</label>
                          <input
                            type="text"
                            value={newProject.impactMetric}
                            onChange={(e) => setNewProject({ ...newProject, impactMetric: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingProject(false)}
                          className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded"
                        >
                          Save Project
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Existing Projects List */}
                  <div className="space-y-3">
                    {projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-white text-sm flex items-center gap-2">
                            <span>{proj.title}</span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                proj.isDemo
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              }`}
                            >
                              {proj.isDemo ? 'Demonstration' : 'Client System'}
                            </span>
                          </div>
                          <div className="text-slate-400">
                            Category: {proj.category} · Tech: {proj.technologies.join(', ')}
                          </div>
                        </div>

                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-2 rounded text-slate-500 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module: Articles */}
              {activeModule === 'articles' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Blog & Insights Articles</h3>
                      <p className="text-xs text-slate-400">
                        Author, edit, publish, and unpublish technology briefing articles.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingArticle(!isAddingArticle)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {isAddingArticle && (
                    <form
                      onSubmit={handleCreateArticle}
                      className="p-6 rounded-xl bg-slate-900 border border-blue-500/40 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-white">Publish New Insight</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Article Title</label>
                          <input
                            type="text"
                            required
                            value={newArticle.title}
                            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Category</label>
                          <select
                            value={newArticle.category}
                            onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          >
                            <option value="Software Development">Software Development</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Cybersecurity">Cybersecurity</option>
                            <option value="Digital Transformation">Digital Transformation</option>
                            <option value="Technology News">Technology News</option>
                            <option value="Business Technology">Business Technology</option>
                            <option value="ICT Education">ICT Education</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Short Excerpt</label>
                        <input
                          type="text"
                          required
                          value={newArticle.excerpt}
                          onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Article Body Content</label>
                        <textarea
                          rows={6}
                          required
                          value={newArticle.content}
                          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingArticle(false)}
                          className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded"
                        >
                          Publish Article
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {articles.map((art) => (
                      <div
                        key={art.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-white text-sm flex items-center gap-2">
                            <span>{art.title}</span>
                            <span
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                                art.published
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {art.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <div className="text-slate-400">
                            Category: {art.category} · {art.readTime}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleArticlePublish(art)}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 hover:text-white"
                          >
                            {art.published ? 'Unpublish' : 'Publish'}
                          </button>
                          <button
                            onClick={() => deleteArticle(art.id)}
                            className="p-2 rounded text-slate-500 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module: Testimonials */}
              {activeModule === 'testimonials' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Client Testimonials</h3>
                      <p className="text-xs text-slate-400">
                        Manage verified client reviews. (No fake feedback is generated).
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Verified Testimonial</span>
                    </button>
                  </div>

                  {isAddingTestimonial && (
                    <form
                      onSubmit={handleCreateTestimonial}
                      className="p-6 rounded-xl bg-slate-900 border border-blue-500/40 space-y-4"
                    >
                      <h4 className="text-sm font-bold text-white">Record Verified Client Review</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Client Full Name</label>
                          <input
                            type="text"
                            required
                            value={newTestimonial.clientName}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Company / Organization</label>
                          <input
                            type="text"
                            value={newTestimonial.company}
                            onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 block mb-1">Client Statement / Quote</label>
                        <textarea
                          rows={3}
                          required
                          value={newTestimonial.quote}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, quote: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingTestimonial(false)}
                          className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded"
                        >
                          Save Testimonial
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {testimonials.map((test) => (
                      <div
                        key={test.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-white text-sm">
                            {test.clientName} · {test.company}
                          </div>
                          <p className="text-slate-300 italic max-w-2xl">"{test.quote}"</p>
                        </div>
                        <button
                          onClick={() => deleteTestimonial(test.id)}
                          className="p-2 rounded text-slate-500 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Module: Settings */}
              {activeModule === 'settings' && settings && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">Company Identity & Contact Configuration</h3>
                    <p className="text-xs text-slate-400">
                      Edit officially verified telephone numbers, emails, physical location, and corporate mission.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSaveSettings}
                    className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">
                          Official Phone Number
                        </label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 font-semibold block mb-1">
                          Official Email
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">
                        Corporate Tagline
                      </label>
                      <input
                        type="text"
                        value={settings.tagline}
                        onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">
                        Physical Office Address
                      </label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">
                        Mission Statement
                      </label>
                      <textarea
                        rows={2}
                        value={settings.mission}
                        onChange={(e) => setSettings({ ...settings, mission: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-1">
                        Vision Statement
                      </label>
                      <textarea
                        rows={2}
                        value={settings.vision}
                        onChange={(e) => setSettings({ ...settings, vision: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Configuration Changes</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
