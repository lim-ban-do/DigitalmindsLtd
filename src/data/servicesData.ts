import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    shortDesc: 'Custom business management systems, enterprise platforms, database-driven workflows, and scalable automation engines.',
    fullDesc: 'We architect and build tailored enterprise software that maps precisely to your operational requirements. From complex multi-branch business management platforms to zero-loss financial ledgers and automated workflow pipelines, our systems eliminate manual bottlenecks and scale seamlessly as your institution expands.',
    iconName: 'Code2',
    subservices: [
      'Custom Business Management Systems (ERP/CRM)',
      'Enterprise Applications & Workflow Engines',
      'Database-Driven Transaction Systems',
      'End-to-End Business Automation Pipelines'
    ],
    businessBenefits: [
      'Replaces disjointed spreadsheets with centralized, real-time intelligence',
      'Guarantees data integrity with ACID-compliant relational databases',
      'Scales smoothly under growing transaction and user volumes',
      'Automates repetitive staff processes to lower operational cost'
    ],
    technologies: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Python', 'React'],
    faqs: [
      {
        question: 'How do you handle custom requirements for our unique workflows?',
        answer: 'We begin with an exhaustive Discovery and Requirement Gathering sprint, mapping each stakeholder workflow and data entity before writing code.'
      },
      {
        question: 'Do we own the intellectual property and source code?',
        answer: 'Yes. Upon final delivery and project completion, all proprietary source code, database schemas, and documentation belong fully to your organization.'
      }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    shortDesc: 'High-performance corporate web platforms, secure e-commerce portals, custom web applications, and institutional dashboards.',
    fullDesc: 'Our web engineering practice creates robust, fast-loading, and secure digital portals. Whether you need a corporate flagship presence that commands international credibility, an institutional customer portal, or an e-commerce platform with automated payments, we deliver responsive, accessible solutions optimized for modern devices.',
    iconName: 'Globe',
    subservices: [
      'Corporate & Institutional Flagship Websites',
      'E-Commerce & Digital Billing Platforms',
      'Client & Stakeholder Self-Service Portals',
      'Custom Web Application Dashboards'
    ],
    businessBenefits: [
      'Elevates your corporate brand reputation to an international tier',
      'Sub-second page load speeds optimized for desktop and mobile networks',
      'Integrated payment gateways supporting card and local mobile money',
      'Comprehensive content management allowing team updates without developers'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Node.js', 'REST APIs'],
    faqs: [
      {
        question: 'Is the website optimized for mobile phones and varying internet speeds?',
        answer: 'Every web solution is built with responsive architecture, modern asset compression, and mobile-first caching to ensure instant delivery even on constrained networks.'
      },
      {
        question: 'Can we manage updates and blog articles ourselves?',
        answer: 'Yes, we provide an intuitive, secure administration dashboard that lets your team publish announcements, projects, and content easily.'
      }
    ]
  },
  {
    id: 'mobile-development',
    title: 'Mobile Application Development',
    shortDesc: 'Native Android and cross-platform mobile solutions, offline-ready business apps, and API-integrated workforce tools.',
    fullDesc: 'We develop intuitive mobile applications that put your services and operational tools directly into the hands of customers, field agents, and executive teams. Our mobile apps feature robust offline data synchronization, biometric authentication, push notifications, and frictionless API connectivity.',
    iconName: 'Smartphone',
    subservices: [
      'Native Android Business Applications',
      'Cross-Platform iOS & Android Deployments',
      'Field-Force & Sales Agent Mobile Solutions',
      'API-Integrated Customer Service Applications'
    ],
    businessBenefits: [
      'Empowers field staff with offline-capable tools in remote locations',
      'Increases customer engagement through targeted push notifications',
      'Streamlines on-site inspections, data collection, and signature capture',
      'Secure biometric authentication protecting sensitive user records'
    ],
    technologies: ['React Native', 'Kotlin', 'Flutter', 'SQLite Mobile Cache', 'REST/GraphQL'],
    faqs: [
      {
        question: 'Can field workers use the mobile app without continuous internet?',
        answer: 'Yes. We build resilient local caching that stores submissions on the device and automatically syncs with the central server once connectivity is restored.'
      },
      {
        question: 'Do you manage app store publishing on Google Play and Apple App Store?',
        answer: 'We manage the entire submission lifecycle, compliance checks, signing keys, and ongoing version updates.'
      }
    ]
  },
  {
    id: 'ai-automation',
    title: 'Artificial Intelligence & Automation',
    shortDesc: 'Intelligent process automation, conversational AI assistants, document parsing, and data-driven predictive models.',
    fullDesc: 'Unlock operational velocity by embedding machine intelligence into everyday business tasks. We build practical AI applications that automate document extraction, triage support inquiries, detect operational anomalies, and generate predictive forecasts from historical organizational data.',
    iconName: 'Cpu',
    subservices: [
      'AI-Powered Business Applications',
      'Intelligent Organizational Chatbots & Triaging',
      'Business Process Automation (RPA)',
      'Data-Driven Predictive Analytics & Scoring'
    ],
    businessBenefits: [
      'Cuts manual document verification and data entry hours by up to 70%',
      'Provides 24/7 intelligent inquiry triage for customers and staff',
      'Detects irregular transaction spikes and audit variances automatically',
      'Transforms raw historical records into actionable executive forecasts'
    ],
    technologies: ['Gemini API', 'Python', 'Vector Embeddings', 'Node.js', 'FastAPI'],
    faqs: [
      {
        question: 'Is our corporate data kept private and confidential?',
        answer: 'Strictly. We implement private enterprise endpoints and local model execution where required, ensuring zero data leakage or unauthorized training usage.'
      },
      {
        question: 'How quickly can an intelligent chatbot be deployed?',
        answer: 'Custom triaging assistants trained on your internal documentation and FAQs can be prototyped and validated within 2 to 3 weeks.'
      }
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Solutions',
    shortDesc: 'Vulnerability assessments, network penetration testing, Identity & Access Management (IAM), and continuous security monitoring.',
    fullDesc: 'Protect your critical digital assets, intellectual property, and client data against emerging cyber threats. We deliver end-to-end security postures encompassing vulnerability audits, firewall configurations, Zero Trust access controls, employee security awareness, and incident response readiness.',
    iconName: 'ShieldCheck',
    subservices: [
      'Infrastructure & Application Security Assessments',
      'Firewall & Corporate Network Hardening',
      'Identity & Access Management (IAM / MFA)',
      'Continuous Threat Monitoring & Incident Response'
    ],
    businessBenefits: [
      'Prevents costly ransomware incidents and data breaches',
      'Ensures compliance with statutory data privacy regulations',
      'Provides verifiable proof of security for corporate and institutional tenders',
      'Guarantees rapid containment and recovery protocols in emergency scenarios'
    ],
    technologies: ['Zero Trust Architecture', 'OpenSSL / TLS 1.3', 'WAF Hardening', 'SIEM Logs', 'WireGuard'],
    faqs: [
      {
        question: 'How often should a company conduct security assessments?',
        answer: 'We recommend comprehensive penetration testing and vulnerability scans at least biannually, or immediately after major software releases.'
      },
      {
        question: 'Do you help configure Multi-Factor Authentication across company emails and apps?',
        answer: 'Yes, we implement unified Single Sign-On (SSO) and enforced MFA across all enterprise accounts.'
      }
    ]
  },
  {
    id: 'networking-infrastructure',
    title: 'Networking & IT Infrastructure',
    shortDesc: 'LAN/WAN architectural setup, enterprise Wi-Fi deployments, server room administration, and ongoing technical infrastructure support.',
    fullDesc: 'A resilient business requires dependable physical and logical connectivity. We design, deploy, and maintain robust enterprise local area networks (LAN), wide area networks (WAN), secure multi-floor Wi-Fi coverage, structured cabling, rack management, and server administration.',
    iconName: 'Server',
    subservices: [
      'Enterprise LAN & WAN Architecture',
      'High-Density Secure Wi-Fi Deployments',
      'Server Room Setup & Rack Administration',
      'IT Infrastructure Monitoring & SLA Support'
    ],
    businessBenefits: [
      'Eliminates office connectivity dead zones and bandwidth bottlenecks',
      'Isolates guest networks from sensitive internal corporate databases',
      'Provides centralized network monitoring and rapid remote diagnostics',
      'Ensures redundant failover connections so internet drops never halt business'
    ],
    technologies: ['Cisco / Ubiquiti UniFi', 'MikroTik Routing', 'Structured Cat6A Cabling', 'VLAN Segmentation'],
    faqs: [
      {
        question: 'Can you assist with setting up our new branch office infrastructure?',
        answer: 'Yes, we handle site surveys, structured cabling, hardware procurement, router provisioning, and inter-branch VPN bridging.'
      },
      {
        question: 'Do you offer monthly maintenance SLAs for network hardware?',
        answer: 'We offer tailored maintenance agreements with guaranteed on-site response times and proactive monitoring.'
      }
    ]
  },
  {
    id: 'cloud-solutions',
    title: 'Cloud Solutions & Integration',
    shortDesc: 'Cloud deployment, seamless on-premise migration, secure API integrations, and resilient multi-system interoperability.',
    fullDesc: 'Modernize legacy on-premises servers by transitioning workloads to secure, scalable cloud infrastructure. We engineer cloud architectures that provide automated nightly backups, elastic scaling during high traffic, and seamless interoperability between disparate enterprise software systems via RESTful APIs.',
    iconName: 'Cloud',
    subservices: [
      'Cloud Architecture & Workload Deployment',
      'Legacy-to-Cloud Zero-Downtime Migration',
      'Enterprise API Integration & Middleware',
      'Automated Disaster Recovery & Geo-Redundancy'
    ],
    businessBenefits: [
      'Eliminates expensive on-site server hardware refresh cycles',
      'Guarantees 99.98% system availability with automated failover',
      'Enables seamless data flow between accounting, CRM, and inventory systems',
      'Disaster-proof backups secured offsite with encryption'
    ],
    technologies: ['Docker', 'AWS / Google Cloud / Azure', 'Linux Server', 'PostgreSQL', 'Nginx Reverse Proxy'],
    faqs: [
      {
        question: 'Will our business experience downtime during cloud migration?',
        answer: 'We employ parallel staging and incremental data synchronization to ensure your live operations experience zero interruption.'
      },
      {
        question: 'Can you integrate our existing accounting system with our web portal?',
        answer: 'Yes, our team specializes in building custom middleware and secure API webhooks to link disparate enterprise systems.'
      }
    ]
  },
  {
    id: 'ict-consultancy',
    title: 'ICT Consultancy & Training',
    shortDesc: 'Strategic technology advisory, corporate digital transformation roadmaps, executive ICT training, and proactive technical support.',
    fullDesc: 'Navigating technology investments requires experienced, objective guidance. We advise boards, executives, and department heads on ICT strategy, vendor selection, infrastructure roadmaps, and software procurement. We also conduct specialized staff training programs to accelerate digital adoption.',
    iconName: 'Compass',
    subservices: [
      'Strategic Technology & Digital Roadmaps',
      'Corporate ICT Skills Training & Upskilling',
      'Software & Hardware Procurement Advisory',
      'Executive Digital Transformation Guidance'
    ],
    businessBenefits: [
      'Prevents capital wastage on ill-fitting software or substandard hardware',
      'Aligns technology investments directly with quarterly revenue objectives',
      'Builds internal technical confidence across your workforce',
      'Provides an independent, vendor-agnostic technical voice on your side'
    ],
    technologies: ['ITIL Frameworks', 'Agile Delivery', 'TOGAF Enterprise Arch', 'Change Management'],
    faqs: [
      {
        question: 'Do you conduct on-site staff training sessions?',
        answer: 'Yes, we offer both on-site interactive workshops and remote training modules tailored to your team’s role levels.'
      },
      {
        question: 'Can you audit our current ICT vendor agreements?',
        answer: 'We review existing service contracts, licensing structures, and hardware pricing to ensure you receive optimal value.'
      }
    ]
  }
];
