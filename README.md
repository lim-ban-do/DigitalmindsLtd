# Digital Minds Ltd — Corporate ICT & Technology Solutions

> **Enterprise Software, Intelligent Systems & Digital Transformation Platform**  
> Built with React 19, TypeScript, Tailwind CSS v4, Express, and Vite.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Design System & Aesthetics](#design-system--aesthetics)
  - [Color Palette Tokens](#color-palette-tokens)
  - [Typography Hierarchy](#typography-hierarchy)
- [System Architecture](#system-architecture)
- [Environment Configuration](#environment-configuration)
- [Installation & Setup](#installation--setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Administrative Authentication](#administrative-authentication)
- [Project Structure](#project-structure)
- [Git & Deployment Workflow](#git--deployment-workflow)

---

## 🌟 Overview

**Digital Minds Ltd** is a corporate web application and administrative management system engineered for delivering enterprise ICT solutions, custom software development, applied AI automation, and network infrastructure services.

The application features:
- **Panoramic Architectural Hero** with dusk twilight aesthetic and warm golden interior illumination.
- **Interactive Scoping & Quote Engine** with multi-step practice specification.
- **Dynamic Portfolio & Architecture Blueprints** distinguishing live client systems from demonstration architectures.
- **Full Administrative Console** for lead management, quote processing, articles publishing, and company settings.
- **Lightweight Embedded JSON Database** (`data/db.json`) requiring zero external database configuration.

---

## 🎨 Design System & Aesthetics

### Color Palette Tokens

The interface follows a modern dusk-navy and warm golden amber aesthetic inspired by illuminated evening landmark architecture:

| Token | Hex / Value | Tailwind / CSS Class | Description |
|---|---|---|---|
| **Dusk Navy (Background)** | `#071325` | `bg-[#071325]` | Core page background, twilight night ambiance |
| **Deep Slate Navy (Cards)** | `#091b35` / `#061224` | `bg-[#091b35]`, `bg-[#061224]` | Component cards, modal surfaces, and panels |
| **Dusk Border Accent** | `#142845` | `border-[#142845]` | Subtle architectural border dividing lines |
| **Warm Golden Amber (Primary)** | `#f59e0b` / `amber-400` | `bg-amber-400`, `text-amber-400` | Primary CTAs (`REQUEST A QUOTE`), phone badges, icons |
| **Title Period Accent** | `#f59e0b` | `text-amber-400` | Signature title punctuation dot (`.`) |
| **Secondary CTA** | `rgba(255,255,255,0.6)` | `border-white/60 text-white` | Translucent glass outline button (`LEARN MORE ↗`) |
| **Success / SLA Badge** | `#10b981` / `emerald-400` | `text-emerald-400`, `bg-emerald-950` | Production verified indicators |

### Typography Hierarchy

Loaded via Google Fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```

- **Headings & Key Metrics**: **Outfit** (`font-heading`, `font-extrabold`) — Sharp geometric sans-serif delivering authority and smart structure.
- **Body & Subtitles**: **Plus Jakarta Sans** / **Inter** (`font-normal`, `font-medium`) — Crisp readability across viewports.
- **Code & SLA Metrics**: **Monospace** (`font-mono`) — Technical parameters, emails, and credentials.

---

## 🏗️ System Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Lucide React icons, Motion animations.
- **Backend / Dev Server**: Express 4 running via `tsx` with integrated Vite SPA middleware.
- **Data Persistence**: Flat-file JSON database stored in `./data/db.json` with synchronous read/write locks.
- **Build Tool**: Vite 8 with native Rolldown bundler.

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory (referencing `.env.example`):

```bash
# Server Port (Defaults to 3000 if omitted)
PORT=3000

# Node Environment
NODE_ENV=development

# Gemini AI API Key (Optional: for AI analytics or chat features)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Public App Hosting URL
APP_URL="http://localhost:3000"
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/lim-ban-do/DigitalmindsLtd.git
cd DigitalmindsLtd
```

### 2. Install Dependencies
> **Note**: Tailwind CSS v4 and Vite utilize peer-dependencies with React 19. Always use `--legacy-peer-deps` during installation:

```bash
npm install --legacy-peer-deps
```

### 3. Launch Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000` with hot module replacement (HMR).

### 4. Production Build & Execution
```bash
# Build optimized static bundle in ./dist
npm run build

# Start production Express server serving ./dist
npm run start
```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `tsx server.ts` | Runs Express server with live Vite development middleware on port 3000 |
| `npm run build` | `vite build` | Compiles production assets into `dist/` |
| `npm run start` | `tsx server.ts` | Runs production server (serves static `dist/` bundle) |
| `npm run preview` | `vite preview` | Previews the production build locally |
| `npm run lint` | `tsc --noEmit` | Runs TypeScript type checking with zero code emit |
| `npm run clean` | `rm -rf dist server.js` | Cleans build artifacts |

---

## 🔌 API Endpoints

The Express server exposes the following RESTful endpoints:

### Public Endpoints
- `GET  /api/projects` — Fetch all portfolio projects and demonstration architectures.
- `GET  /api/articles` — Fetch published blog and thought leadership insights.
- `GET  /api/testimonials` — Fetch client reviews and feedback.
- `GET  /api/settings` — Fetch corporate contact info, mission, vision, and stats.
- `POST /api/inquiries` — Submit contact inquiry form.
- `POST /api/quotes` — Submit tailored project quotation scoping request.

### Protected Admin Endpoints
- `POST /api/admin/login` — Authenticate admin credentials and retrieve session token.
- `GET  /api/admin/verify` — Validate active admin session.
- `GET  /api/stats` — Retrieve system analytics, lead counts, and pending quotes.
- `PUT  /api/settings` — Update company operational details and SLA targets.
- `PATCH /api/inquiries/:id` — Update lead review status (`new`, `contacted`, `resolved`).
- `PATCH /api/quotes/:id` — Update quote scoping status (`pending`, `reviewing`, `approved`).

---

## 🔐 Administrative Authentication

An administrative console is accessible via the top-right **Admin Portal** button on the navbar or by pressing the admin trigger.

### Default Credentials (Configured in `data/db.json`):
- **Email**: `admin@digitalminds.com`
- **Password**: `admin123`

The dashboard allows managing:
1. **Overview & KPIs**: Inquiries count, pending proposals, active blueprints.
2. **Inquiries**: Review messages sent from the Contact form.
3. **Quote Requests**: Scoped requirements, selected practice areas, and budget ranges.
4. **Projects & Portfolio**: Add, modify, or label demonstration vs production systems.
5. **Blog & Insights**: Publish and edit articles.
6. **Company Settings**: Update official phone numbers, addresses, mission statements, and SLAs.

---

## 📂 Project Structure

```
DigitalmindsLtd/
├── data/
│   └── db.json               # Flat-file database storing quotes, inquiries, and settings
├── public/
│   ├── assets/
│   │   ├── hero_architecture_evening.png  # High-resolution hero landmark visual
│   │   └── logo.png                        # Brand logo
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── images/           # Bundled design assets
│   ├── components/
│   │   ├── AboutSection.tsx        # Company history & engineering philosophy
│   │   ├── AdminDashboard.tsx      # Authenticated management console
│   │   ├── ArticleDetailModal.tsx  # Full-screen article modal
│   │   ├── CompanyIntro.tsx        # Practice overview & capabilities
│   │   ├── ContactSection.tsx      # Contact cards, maps & submission form
│   │   ├── Footer.tsx              # Corporate footer with direct contacts
│   │   ├── Hero.tsx                # Architectural dusk hero with dual CTAs
│   │   ├── InsightsSection.tsx     # Tech articles & insights
│   │   ├── Navbar.tsx              # Responsive header with phone badge & quote CTA
│   │   ├── ProcessSection.tsx      # 5-step delivery methodology
│   │   ├── ProjectDetailModal.tsx  # Project specification modal
│   │   ├── ProjectsSection.tsx     # Portfolio & architecture blueprints
│   │   ├── QuoteSection.tsx        # Scoping & price quotation engine
│   │   ├── ServiceDetailModal.tsx  # Practice capability breakdown
│   │   ├── ServicesSection.tsx     # Core engineering divisions
│   │   ├── SolutionsSection.tsx    # Sector-specific architectures
│   │   ├── TestimonialsSection.tsx # Client reviews & onboarding banner
│   │   └── WhyChooseUs.tsx         # SLA reliability & enterprise standards
│   ├── types/
│   │   └── index.ts          # TypeScript domain interfaces
│   ├── App.tsx               # Main application controller & state
│   ├── index.css             # Tailwind v4 directives, custom font & scrollbar tokens
│   └── main.tsx              # React DOM bootstrap
├── .env.example              # Template environment variables
├── .gitignore                # Git ignore rules
├── index.html                # HTML5 entry with Google Fonts
├── package.json              # Dependencies and npm run scripts
├── server.ts                 # Full-stack Express API and Vite middleware server
├── tsconfig.json             # TypeScript compiler settings
└── vite.config.ts            # Vite & Tailwind CSS v4 configuration
```

---

## 🔄 Git & Deployment Workflow

### Pushing Changes to Remote
```bash
# Check working tree
git status

# Stage all updates
git add -A

# Commit changes
git commit -m "feat: your descriptive commit message"

# Push to GitHub
git push origin main
```

### Production Deployment Notes
- When deploying to platforms like **Render**, **Railway**, **DigitalOcean**, or **Google Cloud Run**:
  - Set Build Command to: `npm install --legacy-peer-deps && npm run build`
  - Set Start Command to: `npm run start`
  - Ensure persistent storage is mounted for the `./data` directory if user-submitted inquiries in `data/db.json` must persist across container redeploys.

---

### © Digital Minds Ltd. All Rights Reserved.
*Think Digital. Build Intelligent Solutions.*
