import { SolutionItem } from '../types';

export const solutionsData: SolutionItem[] = [
  {
    id: 'education',
    title: 'School & University Management Systems',
    industry: 'Education & Academic Institutions',
    tagline: 'Streamlining admissions, grade calculation, automated fees, and parent engagement.',
    description: 'A modular, high-capacity student information and campus administration system designed for primary schools, secondary colleges, and universities. Centralizes registrar records, timetable scheduling, continuous assessment marks, and automated fee invoicing via mobile money and bank cards.',
    keyModules: [
      'Digital Student Admissions & Enrolment',
      'Automated Gradebook, Transcript & GPA Engine',
      'Integrated Fee Invoicing & SMS Payment Alerts',
      'Teacher Timetable & Attendance Telemetry',
      'Parent Portal & Mobile Communication Feed'
    ],
    operationalBenefits: [
      'Eliminates paper-based fee reconciliation errors with instant automated receipts',
      'Empowers educators to record grades in minutes rather than days',
      'Maintains permanent, tamper-proof academic records across decades',
      'Increases on-time tuition payment compliance through proactive reminders'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'SMS Gateway APIs', 'PDF Generation Engine']
  },
  {
    id: 'healthcare',
    title: 'Hospital & Clinic Management Systems',
    industry: 'Healthcare & Clinical Centers',
    tagline: 'Zero-latency patient triage, electronic health records, lab workflows, and dispensary control.',
    description: 'An integrated clinical operations solution engineered for hospitals, specialty clinics, and medical laboratories. Delivers sub-second patient lookup, doctor consultations, electronic prescriptions, pharmacy inventory with automated batch tracking, and insurance claim auditing.',
    keyModules: [
      'Patient Registration & Biometric Identification',
      'Electronic Health Records (EHR) & Consultation Notes',
      'Laboratory Diagnostics & Result Dispatch',
      'Pharmacy Dispensary & Low-Stock / Expiry Warnings',
      'Ward Bed Allocation & Discharge Invoicing'
    ],
    operationalBenefits: [
      'Cuts outpatient registration wait times by over 60%',
      'Eliminates dispensing errors with barcode-verified medication routing',
      'Complies with clinical confidentiality and role-based doctor-nurse access',
      'Accurate pharmaceutical inventory tracking preventing expired drug losses'
    ],
    technologies: ['TypeScript', 'Express', 'Redis', 'FHIR Medical Standards', 'Secure WAF']
  },
  {
    id: 'agriculture',
    title: 'Smart Farm & Agribusiness Systems',
    industry: 'Agriculture, Commercial Farming & Agribusiness',
    tagline: 'IoT soil analytics, automated irrigation control, livestock telemetry, and harvest logistics.',
    description: 'A precision agriculture platform unifying remote IoT sensor networks, weather forecasts, crop health telemetry, machinery maintenance tracking, and agricultural produce inventory management for commercial growers and estates.',
    keyModules: [
      'LoRaWAN & Cellular Soil Moisture Telemetry',
      'Pivot & Drip Irrigation Remote Actuation',
      'Field Block Crop Yield & Fertilizer Tracking',
      'Livestock Herd Tagging & Vaccination Schedules',
      'Agribusiness Harvest Storage & Dispatch Logs'
    ],
    operationalBenefits: [
      'Reduces irrigation pumping fuel and water consumption by 30%+',
      'Provides predictive early warnings for frost, drought, and pest vulnerabilities',
      'Tracks input costs per hectare for accurate profitability calculations',
      'Enables agronomists to manage expansive acreages remotely via mobile'
    ],
    technologies: ['MQTT Protocol', 'Python Data Processing', 'React Native', 'Time-Series DB']
  },
  {
    id: 'finance',
    title: 'Financial & Microfinance Management Systems',
    industry: 'Financial Services & Micro-Lending',
    tagline: 'Automated credit scoring, multi-tier loan schedules, mobile money disbursement, and statutory compliance.',
    description: 'A resilient core financial ledger and loan administration platform engineered for microfinance institutions, savings cooperatives (SACCOs), and fintech lenders. Enforces double-entry bookkeeping, automated daily interest accruals, risk scoring, and mobile payment gateway integrations.',
    keyModules: [
      'Double-Entry Multi-Currency General Ledger',
      'Automated Borrower Creditworthiness Scoring',
      'Instant Mobile Money Disbursement & Automated Repayments',
      'Penalty Calculation & Delinquency Escalation Workflows',
      'Central Bank & Tax Authority Regulatory Audit Reports'
    ],
    operationalBenefits: [
      'Disburses qualified micro-loans within minutes via mobile money rails',
      'Completely eliminates manual reconciliation discrepancies in the ledger',
      'Automates arrears notices and debt recovery schedules',
      'Provides bank-grade cryptographic security for sensitive customer financials'
    ],
    technologies: ['Node.js', 'PostgreSQL', 'KYC APIs', 'Mobile Money USSD Gateways']
  },
  {
    id: 'government',
    title: 'Government & Institutional Portals',
    industry: 'Government Agencies & Public Institutions',
    tagline: 'Secure citizen self-service, digital license applications, civil registries, and inter-departmental workflows.',
    description: 'High-availability public sector platforms built to digitize administrative interactions between citizens, businesses, and government departments. Enforces stringent data sovereignty, audit trails, digital document verification, and multi-tier approval chains.',
    keyModules: [
      'Citizen Identity Verification & Digital Passports/IDs',
      'Permit, License & Certificate Application Workflows',
      'Multi-Tier Inter-Departmental Approvals & Signoffs',
      'Public Grievance & Service Request Tracking',
      'Tamper-Proof QR Document Authenticity Verification'
    ],
    operationalBenefits: [
      'Replaces physical queues and paper paperwork with 24/7 web applications',
      'Guarantees full accountability with non-repudiable audit logs',
      'Significantly curtails administrative processing times and corruption risks',
      'Ensures continuous uptime with redundant, geo-distributed server hosting'
    ],
    technologies: ['React', 'TypeScript', 'Docker', 'PostgreSQL', 'Digital Signature Cryptography']
  },
  {
    id: 'retail',
    title: 'Inventory & Multi-Outlet Retail Systems',
    industry: 'Retail, Wholesale & Distribution',
    tagline: 'Unified multi-branch point of sale, central warehouse stock, and automated supplier reordering.',
    description: 'An enterprise retail operations platform connecting physical brick-and-mortar storefronts, central warehouses, and digital sales channels. Delivers real-time barcode scanning, automated purchase orders, cashier shift balancing, and loss prevention reporting.',
    keyModules: [
      'Rapid Cloud Point of Sale (POS) with Offline Continuity',
      'Multi-Warehouse Inventory & Real-Time Inter-Branch Transfers',
      'Automated Low-Stock Alerts & Supplier Purchase Orders',
      'Customer Loyalty Programs & Digital Invoicing',
      'Cashier Float & Shift Reconciliation Audits'
    ],
    operationalBenefits: [
      'Eliminates stock discrepancies between warehouse records and physical shelves',
      'Ensures cashiers can continue processing sales even during internet outages',
      'Accelerates product lookups with rapid barcode scanner support',
      'Provides executive sales dashboards comparing profitability across branches'
    ],
    technologies: ['TypeScript', 'Express', 'IndexedDB Offline Cache', 'Tailwind CSS']
  },
  {
    id: 'real-estate',
    title: 'Property & Facility Management Systems',
    industry: 'Real Estate & Commercial Properties',
    tagline: 'Digital tenancy contracts, automated utility split-billing, rent collection, and maintenance dispatch.',
    description: 'A comprehensive property administration suite created for residential complexes, commercial office towers, and industrial estates. Automates lease agreements, monthly rent invoicing, utility sub-metering calculations, tenant complaints, and contractor dispatch.',
    keyModules: [
      'Digital Tenancy Agreements & Automatic Expiry Reminders',
      'Automated Water & Electricity Sub-Meter Utility Billing',
      'Tenant Self-Service Portal & In-App Rent Payments',
      'Maintenance Work Order Ticketing & Contractor Dispatch',
      'Landlord Financial Disclosures & Yield Performance'
    ],
    operationalBenefits: [
      'Boosts on-time rent collections to over 95% with automated reminders',
      'Eliminates utility calculation errors for multi-tenant properties',
      'Gives tenants clear status updates on maintenance repairs',
      'Generates automated monthly owner distribution statements'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'PDF Generator', 'Payment Gateway']
  },
  {
    id: 'business-automation',
    title: 'Business Automation & SMB ERP Systems',
    industry: 'Small & Medium Enterprises (SMBs)',
    tagline: 'Integrated quotations, sales orders, accounts payable/receivable, and payroll management.',
    description: 'A lightweight yet deeply capable enterprise resource planning (ERP) platform designed specifically for growing mid-sized businesses. Combines client quotations, procurement tracking, staff payroll calculation, and tax filing preparation into one single source of truth.',
    keyModules: [
      'Quotation-to-Invoice Automated Workflow',
      'Accounts Receivable & Overdue Payment Chase Workflows',
      'Staff Time-Tracking & Automated Payroll Slips',
      'Supplier Purchase Requisitions & Approval Limits',
      'Executive P&L Statements & Cash Flow Runways'
    ],
    operationalBenefits: [
      'Replaces disconnected third-party accounting and HR subscriptions',
      'Saves hours every week previously spent generating manual invoices',
      'Ensures full tax compliance with accurate deduction reporting',
      'Gives business owners live financial visibility on their smartphones'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'enterprise-platforms',
    title: 'Custom Enterprise Platforms & Institutional Portals',
    industry: 'Corporations, Conglomerates & Multinationals',
    tagline: 'Bespoke high-concurrency architectures engineered for mission-critical corporate operations.',
    description: 'When off-the-shelf software cannot satisfy unique organizational workflows or compliance requirements, Digital Minds Ltd builds bespoke enterprise platforms from the ground up. Architected for resilience, security, and seamless integration with legacy corporate systems.',
    keyModules: [
      'Custom Domain Workflow & Approval State Machines',
      'High-Concurrency Database Optimization & Sharding',
      'Enterprise Single Sign-On (SAML / OAuth2 / LDAP)',
      'Legacy Mainframe & ERP Bidirectional API Middleware',
      'Dedicated 24/7 SLA Engineering & Incident Response'
    ],
    operationalBenefits: [
      '100% customized to your exact operational protocol and hierarchy',
      'Zero recurring per-user licensing fees common in vendor lock-in products',
      'Complete data sovereignty hosted on your private cloud or dedicated servers',
      'Backed by dedicated engineering retainers and priority on-site support'
    ],
    technologies: ['Docker', 'Kubernetes', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis']
  }
];
