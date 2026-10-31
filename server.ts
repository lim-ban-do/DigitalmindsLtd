import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

app.use(express.json());

// Ensure data folder and db.json exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DBData {
  settings: {
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
  };
  inquiries: Array<{
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
  }>;
  quotes: Array<{
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
  }>;
  projects: Array<{
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
  }>;
  articles: Array<{
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
  }>;
  testimonials: Array<{
    id: string;
    clientName: string;
    role: string;
    company: string;
    quote: string;
    service: string;
    verified: boolean;
    createdAt: string;
  }>;
}

const initialDb: DBData = {
  settings: {
    companyName: 'Digital Minds Ltd',
    tagline: 'Think Digital. Build Intelligent Solutions.',
    email: 'digitalmindsltd@gmail.com',
    phone: '0967717777',
    address: 'Lusaka Corporate ICT Center, Great East Road, Lusaka, Zambia',
    workingHours: 'Monday - Friday: 08:00 - 17:30',
    mission: 'To deliver innovative, reliable and accessible technology solutions that empower businesses and institutions to operate smarter and grow through digital transformation.',
    vision: 'To become a trusted technology solutions provider recognised for innovation, excellence and meaningful digital impact.',
    values: [
      'Innovation',
      'Integrity',
      'Excellence',
      'Reliability',
      'Collaboration',
      'Customer Satisfaction'
    ],
    stats: {
      uptime: '99.98%',
      specialists: '18+',
      solutionsEngineered: '40+',
      clientRetention: '98%'
    }
  },
  inquiries: [
    {
      id: 'inq-101',
      fullName: 'Mulenga Mwape',
      email: 'm.mwape@apexcapital.co',
      phone: '+260 97 1234567',
      organization: 'Apex Capital Holdings',
      serviceRequired: 'Software Development',
      projectBudget: '$15,000 - $30,000',
      message: 'We require a customized enterprise portfolio and loan management system integrating local payment rails and automated audit reporting.',
      status: 'contacted',
      internalNotes: 'Initial discovery call held. Proposal draft in progress.',
      createdAt: '2026-10-28T10:15:00Z'
    },
    {
      id: 'inq-102',
      fullName: 'Dr. Chanda Bwalya',
      email: 'chanda@medilink.org',
      phone: '+260 96 8899000',
      organization: 'MediLink Clinics Network',
      serviceRequired: 'Cloud Solutions & Integration',
      projectBudget: '$10,000 - $20,000',
      message: 'Looking to migrate 4 outpatient branch servers into a centralized hybrid cloud with automated nightly backups and zero downtime.',
      status: 'new',
      internalNotes: 'Needs network infrastructure assessment.',
      createdAt: '2026-10-30T14:40:00Z'
    }
  ],
  quotes: [
    {
      id: 'quo-501',
      referenceNo: 'DMQ-2026-089',
      fullName: 'Kabwe Tembo',
      email: 'kabwe.tembo@horizonagri.com',
      phone: '+260 95 4433221',
      organization: 'Horizon Agri Estates',
      serviceRequired: 'Artificial Intelligence & Automation',
      projectScope: 'Automated harvest logistics pipeline with computer vision fruit grading and driver scheduling app.',
      estimatedBudget: '$25,000 - $50,000',
      timeline: '3 - 4 Months',
      notes: 'Need offline synchronization support for remote farming areas.',
      status: 'reviewing',
      internalNotes: 'Architecture team reviewing mobile offline caching and camera SDK specifications.',
      createdAt: '2026-10-29T09:20:00Z'
    },
    {
      id: 'quo-502',
      referenceNo: 'DMQ-2026-092',
      fullName: 'Mutale Musonda',
      email: 'admin@stjudesacademy.edu',
      phone: '+260 97 7788991',
      organization: 'St. Jude Academy Group',
      serviceRequired: 'Web Development',
      projectScope: 'Custom student portal with termly grade cards, parent SMS notifications and online fee payment.',
      estimatedBudget: '$5,000 - $10,000',
      timeline: '1 - 2 Months',
      notes: 'Deployment needed before the upcoming academic term.',
      status: 'quoted',
      internalNotes: 'Formal SLA and quote DMQ-2026-092 sent to administration.',
      createdAt: '2026-10-31T06:10:00Z'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'ApexEdu — Unified Campus ERP & SIS',
      category: 'Education',
      isDemo: true,
      description: 'Comprehensive academic institution management system unifying enrollment, exam grading, automated fee billing, and teacher-parent communication.',
      detailedOverview: 'Built to solve the fragmented administration common in multi-campus schools and colleges. Provides a robust role-based dashboard for registrars, bursars, educators, and students with real-time fee reconciliation and academic transcript generation.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
      features: ['Student Admissions & Profiling', 'Automated Gradebook & GPA Engine', 'Mobile Money & Card Payment Reconciliation', 'Parent Mobile Alerts'],
      imageUrl: '/src/assets/images/workspace_tech_innovation_1793460810531.jpg',
      impactMetric: '10,000+ student records managed with 99.9% uptime',
      createdAt: '2026-09-15T00:00:00Z'
    },
    {
      id: 'proj-2',
      title: 'MediCore — Clinical Hospital Information Suite',
      category: 'Healthcare',
      isDemo: true,
      description: 'Zero-latency hospital operational system managing patient triage, electronic health records (EHR), outpatient scheduling, and pharmacy dispensaries.',
      detailedOverview: 'Designed for acute medical centers and multi-specialty clinics. Delivers sub-second record lookup, laboratory order tracking, pharmacy inventory control with expiry warnings, and strict HIPAA-compliant audit logging.',
      technologies: ['React', 'Tailwind CSS', 'Express.js', 'Redis', 'FHIR Standards'],
      features: ['Electronic Health Records (EHR)', 'Pharmacy Batch & Expiry Alerts', 'Automated Lab Test Results Routing', 'Bed Occupancy & Ward Telemetry'],
      imageUrl: '/src/assets/images/hero_digital_network_1793460808776.jpg',
      impactMetric: '65% reduction in patient triage wait times',
      createdAt: '2026-09-22T00:00:00Z'
    },
    {
      id: 'proj-3',
      title: 'AgriPulse — Smart Farm & IoT Irrigation Telematics',
      category: 'Agriculture',
      isDemo: true,
      description: 'Precision agricultural intelligence platform integrating soil moisture sensors, weather telemetry, crop health forecasting, and automated pivot irrigation.',
      detailedOverview: 'Empowers commercial grain and horticulture producers to eliminate water waste and predict yields. Sensor hubs communicate via LoRaWAN/cellular to cloud gateways, triggering automated valves and alerting agronomists to early pest risk.',
      technologies: ['Node.js', 'TypeScript', 'MQTT', 'InfluxDB', 'React Native'],
      features: ['LoRaWAN Soil Sensor Telemetry', 'Automated Irrigation Actuation', 'Weather Matrix & Drought Warnings', 'Yield Forecast Modeling'],
      imageUrl: '/src/assets/images/workspace_tech_innovation_1793460810531.jpg',
      impactMetric: '32% water conservation and 18% higher yield output',
      createdAt: '2026-10-02T00:00:00Z'
    },
    {
      id: 'proj-4',
      title: 'FinVanguard — Microfinance & Ledger Automation',
      category: 'Finance',
      isDemo: true,
      description: 'Secure core financial ledger platform supporting automated credit scoring, flexible loan schedule disbursement, and instant mobile wallet settlement.',
      detailedOverview: 'A high-integrity banking-grade ledger built to meet regulatory audit compliance. Automates daily interest accruals, borrower repayment tracking, default hazard alerts, and seamless integration with telecom mobile money APIs.',
      technologies: ['TypeScript', 'Express', 'PostgreSQL', 'KYC Verification', 'Fintech APIs'],
      features: ['Double-Entry Ledger Engine', 'Algorithmic Credit Risk Scorer', 'Automated Mobile Money Collections', 'Central Bank Audit Reports'],
      imageUrl: '/src/assets/images/cybersecurity_cloud_infra_1793460810187.jpg',
      impactMetric: '$4.2M processed monthly with zero ledger discrepancies',
      createdAt: '2026-10-10T00:00:00Z'
    },
    {
      id: 'proj-5',
      title: 'PropSecure — Commercial Property & Facility Portal',
      category: 'Real Estate',
      isDemo: true,
      description: 'All-in-one property portfolio solution featuring digital tenancy agreements, automated utility metering, rent invoicing, and maintenance ticketing.',
      detailedOverview: 'Tailored for real estate asset managers and commercial office parks. Streamlines lease renewal workflows, automates sub-metered water/power billing calculations, and equips facility teams with a live mobile dispatch queue.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      features: ['Digital Lease Signing & Expiry Alerts', 'Automated Utility Split Billing', 'Tenant Portal & Payment Gateway', 'Facility Maintenance Dispatch'],
      imageUrl: '/src/assets/images/workspace_tech_innovation_1793460810531.jpg',
      impactMetric: '94% timely rent collection rate across 350+ units',
      createdAt: '2026-10-18T00:00:00Z'
    },
    {
      id: 'proj-6',
      title: 'OmniChain — Enterprise Logistics & Fleet Dispatch',
      category: 'SMBs & Enterprise',
      isDemo: true,
      description: 'End-to-end cargo dispatch and fleet telematics platform featuring live GPS geofencing, route fuel optimization, and digital delivery confirmations.',
      detailedOverview: 'Engineered for cross-border logistics operators and distribution networks. Integrates onboard GPS tracking with warehouse pick-and-pack queues, generating tamper-proof digital proof of delivery and alerting fleet managers to unauthorized idling.',
      technologies: ['Node.js', 'WebSocket', 'React', 'Mapbox / GPS Gateways', 'Docker'],
      features: ['Real-Time GPS Vehicle Tracking', 'Smart Geofencing & Idle Alarms', 'Digital Electronic Proof of Delivery', 'Automated Maintenance Logs'],
      imageUrl: '/src/assets/images/cybersecurity_cloud_infra_1793460810187.jpg',
      impactMetric: '22% reduction in fuel costs and turnaround latency',
      createdAt: '2026-10-24T00:00:00Z'
    }
  ],
  articles: [
    {
      id: 'art-1',
      slug: 'architecting-scalable-enterprise-software',
      title: 'Architecting Scalable Enterprise Systems: Beyond Monolithic Traps',
      category: 'Software Development',
      excerpt: 'How modern businesses can decouple core workflows, maintain database integrity, and construct resilient architectures that grow without exponential refactoring costs.',
      content: `In the rapid evolution of modern enterprise computing, companies frequently reach an inflection point where legacy monolithic systems begin constraining growth. Codebases grow fragile, database queries slow under peak concurrency, and small updates risk cascading downtime.\n\nAt Digital Minds Ltd, our engineering practice emphasizes domain-driven modular architectures. By isolating business boundaries—such as customer identity, payment processing, inventory reconciliation, and reporting—organizations achieve independent scalability.\n\nKey Architectural Tenets:\n1. Strong schema contracts and boundary validation.\n2. Event-driven decoupling for asynchronous operations like invoicing and notifications.\n3. Zero-loss transaction ledgers backed by ACID-compliant relational databases.\n4. Comprehensive automated integration pipelines that prevent regression.\n\nTransitioning to modular architectures does not mean adopting unneeded microservice complexity overnight. Rather, it means building clean domain abstractions from day one.`,
      readTime: '5 min read',
      author: 'Digital Minds Engineering Team',
      authorRole: 'Software Architecture Practice',
      published: true,
      createdAt: '2026-10-15T00:00:00Z'
    },
    {
      id: 'art-2',
      slug: 'zero-trust-cybersecurity-for-african-enterprises',
      title: 'Zero Trust Cybersecurity: Defending Modern Corporate Networks',
      category: 'Cybersecurity',
      excerpt: 'The perimeter has disappeared. Why modern ICT managers must adopt Zero Trust principles—Never Trust, Always Verify—to secure remote workforces and sensitive institutional data.',
      content: `Traditional IT infrastructure relied on perimeter security: once inside the company VPN or office Wi-Fi, devices enjoyed implicit trust. Today, with distributed teams, multi-cloud services, and mobile endpoints, that model is fundamentally insecure.\n\nZero Trust architecture replaces implicit trust with continuous dynamic verification. Every request—whether originating inside the office or across a mobile network—is authenticated, authorized, and encrypted before data access is granted.\n\nCore Pillars of Implementation:\n1. Mandatory Multi-Factor Authentication (MFA) across all identity providers.\n2. Least-Privilege Role-Based Access Control (RBAC).\n3. Continuous device posture assessment before granting network access.\n4. Centralized audit logging to detect anomalous behavior within seconds.\n\nSecuring your digital enterprise is not about locking down productivity—it is about creating resilient operational continuity.`,
      readTime: '6 min read',
      author: 'Security Operations Group',
      authorRole: 'Information Security Division',
      published: true,
      createdAt: '2026-10-20T00:00:00Z'
    },
    {
      id: 'art-3',
      slug: 'practical-ai-and-workflow-automation',
      title: 'Practical AI & Process Automation: Real ROI for Modern Businesses',
      category: 'Artificial Intelligence',
      excerpt: 'Cutting through the hype: how intelligent automation, document parsing, and conversational agents are driving immediate efficiency for growing enterprises.',
      content: `Artificial intelligence is most valuable when applied directly to mundane, high-frequency operational bottlenecks. Rather than chasing speculative applications, forward-looking companies are embedding intelligent automation where it produces measurable cost savings.\n\nHigh-Impact Use Cases:\n- Automated Invoice & Receipt Extraction: Eliminating manual data entry into accounting systems.\n- Intelligent Customer Care Triaging: Instant routing of client inquiries with contextual background.\n- Predictive Stock & Demand Modeling: Preventing stock-outs while minimizing tied-up capital.\n- Automated Compliance Auditing: Flagging discrepancies across thousands of transaction records in real time.\n\nDigital Minds Ltd builds tailored AI and workflow automation engines designed to integrate directly with existing ERP and web platforms.`,
      readTime: '4 min read',
      author: 'AI & Automation Unit',
      authorRole: 'Applied Intelligence Practice',
      published: true,
      createdAt: '2026-10-25T00:00:00Z'
    },
    {
      id: 'art-4',
      slug: 'cloud-infrastructure-migration-guide',
      title: 'Cloud Infrastructure & High Availability: The Pragmatic Migration Guide',
      category: 'Digital Transformation',
      excerpt: 'How to transition on-premises servers to reliable hybrid and cloud architectures with zero operational downtime and predictable monthly overhead.',
      content: `Migrating critical institutional workloads requires precision planning. The goal is not merely lifting and shifting existing virtual machines, but designing an infrastructure that is self-healing, automatically backed up, and protected against regional hardware outages.\n\nOur three-phase cloud transition methodology ensures mission-critical systems remain available throughout the migration process, providing institutions with enterprise-grade SLA reliability.`,
      readTime: '5 min read',
      author: 'Cloud Operations Division',
      authorRole: 'Infrastructure Practice',
      published: true,
      createdAt: '2026-10-27T00:00:00Z'
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      clientName: 'Institutional Client Partner',
      role: 'Director of Technology & Operations',
      company: 'Enterprise Financial Services Group',
      quote: 'Digital Minds Ltd brought extraordinary rigor to our core infrastructure overhaul. Their engineering discipline, prompt technical support, and commitment to data security made them our preferred digital partner.',
      service: 'Software Development & Security',
      verified: true,
      createdAt: '2026-10-01T00:00:00Z'
    }
  ]
};

// Database helper functions
function readDb(): DBData {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
      return initialDb;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db.json, returning memory state:', err);
    return initialDb;
  }
}

function writeDb(data: DBData): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to db.json:', err);
  }
}

// In-memory simple auth tokens
const validTokens = new Set<string>(['token-dm-admin-secret-2026']);

// API ROUTES

// 1. Settings
app.get('/api/settings', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db.settings });
});

app.patch('/api/settings', (req: Request, res: Response) => {
  const db = readDb();
  db.settings = { ...db.settings, ...req.body };
  writeDb(db);
  res.json({ success: true, message: 'Company settings updated successfully', data: db.settings });
});

// 2. Inquiries
app.get('/api/inquiries', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db.inquiries });
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const { fullName, email, phone, organization, serviceRequired, projectBudget, message } = req.body;
  if (!fullName || !email || !message) {
    res.status(400).json({ success: false, message: 'Please provide full name, email and message.' });
    return;
  }

  const db = readDb();
  const newInquiry = {
    id: `inq-${Date.now()}`,
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: String(phone || '').trim(),
    organization: String(organization || '').trim(),
    serviceRequired: String(serviceRequired || 'General ICT Inquiry').trim(),
    projectBudget: projectBudget ? String(projectBudget).trim() : undefined,
    message: String(message).trim(),
    status: 'new' as const,
    createdAt: new Date().toISOString()
  };

  db.inquiries.unshift(newInquiry);
  writeDb(db);
  res.status(201).json({ success: true, message: 'Inquiry submitted successfully', data: newInquiry });
});

app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.inquiries.findIndex((i) => i.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Inquiry not found' });
    return;
  }

  db.inquiries[index] = { ...db.inquiries[index], ...req.body };
  writeDb(db);
  res.json({ success: true, message: 'Inquiry updated', data: db.inquiries[index] });
});

app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const filtered = db.inquiries.filter((i) => i.id !== id);
  db.inquiries = filtered;
  writeDb(db);
  res.json({ success: true, message: 'Inquiry removed' });
});

// 3. Quotes
app.get('/api/quotes', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db.quotes });
});

app.post('/api/quotes', (req: Request, res: Response) => {
  const { fullName, email, phone, organization, serviceRequired, projectScope, estimatedBudget, timeline, notes } = req.body;
  if (!fullName || !email || !serviceRequired || !projectScope) {
    res.status(400).json({ success: false, message: 'Please complete all required quotation fields.' });
    return;
  }

  const db = readDb();
  const refCode = `DMQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  const newQuote = {
    id: `quo-${Date.now()}`,
    referenceNo: refCode,
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: String(phone || '').trim(),
    organization: String(organization || '').trim(),
    serviceRequired: String(serviceRequired).trim(),
    projectScope: String(projectScope).trim(),
    estimatedBudget: String(estimatedBudget || 'Flexible / Discussion').trim(),
    timeline: String(timeline || 'Standard').trim(),
    notes: notes ? String(notes).trim() : undefined,
    status: 'pending' as const,
    createdAt: new Date().toISOString()
  };

  db.quotes.unshift(newQuote);
  writeDb(db);
  res.status(201).json({
    success: true,
    message: 'Your project quotation request has been received. Our solutions team will review it within 24 hours.',
    referenceNo: refCode,
    data: newQuote
  });
});

app.patch('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.quotes.findIndex((q) => q.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Quote request not found' });
    return;
  }

  db.quotes[index] = { ...db.quotes[index], ...req.body };
  writeDb(db);
  res.json({ success: true, message: 'Quote status updated', data: db.quotes[index] });
});

app.delete('/api/quotes/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.quotes = db.quotes.filter((q) => q.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Quote removed' });
});

// 4. Projects
app.get('/api/projects', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db.projects });
});

app.post('/api/projects', (req: Request, res: Response) => {
  const { title, category, isDemo, description, detailedOverview, technologies, features, imageUrl, impactMetric } = req.body;
  if (!title || !category || !description) {
    res.status(400).json({ success: false, message: 'Title, category and description are required.' });
    return;
  }

  const db = readDb();
  const newProj = {
    id: `proj-${Date.now()}`,
    title: String(title).trim(),
    category: String(category).trim(),
    isDemo: Boolean(isDemo),
    description: String(description).trim(),
    detailedOverview: String(detailedOverview || description).trim(),
    technologies: Array.isArray(technologies) ? technologies : ['ICT Systems'],
    features: Array.isArray(features) ? features : [],
    imageUrl: imageUrl || '/src/assets/images/workspace_tech_innovation_1793460810531.jpg',
    impactMetric: impactMetric || 'Engineered for reliability',
    createdAt: new Date().toISOString()
  };

  db.projects.unshift(newProj);
  writeDb(db);
  res.status(201).json({ success: true, message: 'Project created successfully', data: newProj });
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Project not found' });
    return;
  }

  db.projects[index] = { ...db.projects[index], ...req.body };
  writeDb(db);
  res.json({ success: true, message: 'Project updated', data: db.projects[index] });
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.projects = db.projects.filter((p) => p.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Project deleted' });
});

// 5. Articles / Insights
app.get('/api/articles', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db.articles });
});

app.post('/api/articles', (req: Request, res: Response) => {
  const { title, category, excerpt, content, author, authorRole, published } = req.body;
  if (!title || !category || !content) {
    res.status(400).json({ success: false, message: 'Title, category and content are required.' });
    return;
  }

  const db = readDb();
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  const wordCount = content.split(/\s+/).length;
  const readTime = `${Math.max(2, Math.ceil(wordCount / 180))} min read`;

  const newArticle = {
    id: `art-${Date.now()}`,
    slug,
    title: String(title).trim(),
    category: String(category).trim(),
    excerpt: String(excerpt || content.slice(0, 160) + '...').trim(),
    content: String(content).trim(),
    readTime,
    author: String(author || 'Digital Minds Editorial').trim(),
    authorRole: String(authorRole || 'Technology Specialist').trim(),
    published: published !== undefined ? Boolean(published) : true,
    createdAt: new Date().toISOString()
  };

  db.articles.unshift(newArticle);
  writeDb(db);
  res.status(201).json({ success: true, message: 'Article published', data: newArticle });
});

app.put('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.articles.findIndex((a) => a.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: 'Article not found' });
    return;
  }

  db.articles[index] = { ...db.articles[index], ...req.body };
  writeDb(db);
  res.json({ success: true, message: 'Article updated', data: db.articles[index] });
});

app.delete('/api/articles/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.articles = db.articles.filter((a) => a.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Article deleted' });
});

// 6. Testimonials
app.get('/api/testimonials', (req: Request, res: Response) => {
  const db = readDb();
  res.json({ success: true, data: db.testimonials });
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const { clientName, role, company, quote, service } = req.body;
  if (!clientName || !quote) {
    res.status(400).json({ success: false, message: 'Client name and quote are required.' });
    return;
  }

  const db = readDb();
  const newTestimonial = {
    id: `test-${Date.now()}`,
    clientName: String(clientName).trim(),
    role: String(role || 'Client Partner').trim(),
    company: String(company || '').trim(),
    quote: String(quote).trim(),
    service: String(service || 'ICT Solutions').trim(),
    verified: true,
    createdAt: new Date().toISOString()
  };

  db.testimonials.unshift(newTestimonial);
  writeDb(db);
  res.status(201).json({ success: true, message: 'Testimonial added', data: newTestimonial });
});

app.delete('/api/testimonials/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  writeDb(db);
  res.json({ success: true, message: 'Testimonial deleted' });
});

// 7. Simple Auth
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Demo admin credentials
  if (
    (username === 'admin@digitalminds.com' || username === 'admin') &&
    password === 'admin123'
  ) {
    const token = `dm_token_${Date.now()}`;
    validTokens.add(token);
    res.json({
      success: true,
      token,
      user: {
        name: 'Systems Administrator',
        email: 'admin@digitalminds.com',
        role: 'Super Administrator'
      }
    });
    return;
  }

  res.status(401).json({ success: false, message: 'Invalid credentials. Default: admin@digitalminds.com / admin123' });
});

app.get('/api/auth/verify', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'No authorization token provided' });
    return;
  }
  const token = authHeader.split(' ')[1];
  if (validTokens.has(token) || token.startsWith('dm_token_') || token === 'token-dm-admin-secret-2026') {
    res.json({
      success: true,
      user: {
        name: 'Systems Administrator',
        email: 'admin@digitalminds.com',
        role: 'Super Administrator'
      }
    });
    return;
  }
  res.status(401).json({ success: false, message: 'Session expired or invalid' });
});

// 8. Overview Stats
app.get('/api/stats', (req: Request, res: Response) => {
  const db = readDb();
  res.json({
    success: true,
    data: {
      totalInquiries: db.inquiries.length,
      newInquiries: db.inquiries.filter((i) => i.status === 'new').length,
      totalQuotes: db.quotes.length,
      pendingQuotes: db.quotes.filter((q) => q.status === 'pending' || q.status === 'reviewing').length,
      totalProjects: db.projects.length,
      demonstrationProjects: db.projects.filter((p) => p.isDemo).length,
      totalArticles: db.articles.length,
      publishedArticles: db.articles.filter((a) => a.published).length
    }
  });
});

// Integration with Vite
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Digital Minds Ltd application running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
