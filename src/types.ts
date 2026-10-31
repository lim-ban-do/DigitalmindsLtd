export interface CompanySettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  workingHours: string;
  mission: string;
  vision: string;
  values: string[];
  stats: {
    uptime: string;
    specialists: string;
    solutionsEngineered: string;
    clientRetention: string;
  };
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  serviceRequired: string;
  projectBudget?: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  internalNotes?: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  referenceNo: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  serviceRequired: string;
  projectScope: string;
  estimatedBudget: string;
  timeline: string;
  notes?: string;
  status: 'pending' | 'reviewing' | 'quoted' | 'approved' | 'rejected';
  internalNotes?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  isDemo: boolean;
  description: string;
  detailedOverview: string;
  technologies: string[];
  features: string[];
  imageUrl?: string;
  impactMetric: string;
  createdAt: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: string;
  author: string;
  authorRole: string;
  published: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  quote: string;
  service: string;
  verified: boolean;
  createdAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  subservices: string[];
  businessBenefits: string[];
  technologies: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface SolutionItem {
  id: string;
  title: string;
  industry: string;
  tagline: string;
  description: string;
  keyModules: string[];
  operationalBenefits: string[];
  technologies: string[];
}
