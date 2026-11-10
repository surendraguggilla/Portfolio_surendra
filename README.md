# Surendra Guggilla — Personal Developer Portfolio

An original, motion-driven, editorial-meets-technical personal developer portfolio built from scratch with **React 19**, **Vite**, **TypeScript**, and modern CSS styling.

Designed for an editorial, modern visual identity featuring interactive CLI terminal drawers, physics-based custom cursor interactions, responsive case study modals, and real-world project showcases.

---

## ⚡ Tech Stack

- **Framework**: React 19 (TypeScript)
- **Bundler & Build Tool**: Vite 6+
- **Styling**: Scoped Component CSS + Design Tokens (Vanilla CSS variables)
- **Typography**: 
  - Display: *Playfair Display*
  - Body: *Space Grotesk*
  - Technical / Metadata: *JetBrains Mono*
- **Icons**: Lucide React + Custom SVG Brand Icons
- **Animation & Interactions**: 
  - RAF (RequestAnimationFrame) Custom Cursor
  - Canvas Particle Motion & Interactive Grid
  - Keyboard-driven interactive Terminal Drawer (`~` shortcut)

---

## ✨ Features & Highlights

1. **Editorial & Brutalist Identity**:
   - Warm cream canvas combined with crisp near-black typography and electric orange accents.
   - Clean spacing, distinctive editorial headings, and subtle technical metadata badges.
2. **Interactive Developer CLI Drawer**:
   - Press the " ~ " (tilde) key or click `>_ CLI` in the navigation to open an interactive command line.
   - Supports 12+ commands (`help`, `about`, `projects`, `skills`, `resume`, `contact`, `clear`, etc.).
3. **Projects & Explorations**:
   - Comprehensive breakdowns of real technical projects (e.g., Student Management System, Road Accident ML Analysis).
   - Case study modals detailing architecture, problem statements, and implementation contributions.
4. **Skills & Learning Journey**:
   - Categorized toolkit spanning Programming, Data & ML, Databases, Tools & Platforms, and Soft Skills.
   - Education milestone timeline and verified certification links.
5. **Resume Download**:
   - One-click direct PDF download with clean tab preview fallback.
6. **Centralized Configuration**:
   - All profile data, projects, skills, certifications, and links are organized cleanly inside `src/data/portfolioData.ts`.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/surendraguggilla/surendra-portfolio.git
   cd surendra-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

---

## 🛠️ Build & Deployment

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📂 Project Structure

```text
surendra-portfolio/
├── public/
│   ├── favicon.svg             # SG Brand Favicon
│   └── resume/
│       └── Surendra_Guggilla_Resume.pdf  # Downloadable PDF Resume
├── src/
│   ├── assets/
│   │   └── hero.png            # Profile portrait image
│   ├── components/
│   │   ├── icons/              # Custom SVG icons (GitHub, LinkedIn)
│   │   ├── interactions/       # Cursor & Terminal Drawer
│   │   ├── layout/             # Navigation & Footer
│   │   └── sections/           # Hero, About, Projects, Skills, Learning, Contact
│   ├── data/
│   │   └── portfolioData.ts    # Centralized portfolio content & metadata
│   ├── styles/
│   │   └── globals.css         # CSS design tokens & base resets
│   ├── App.tsx                 # Main application layout
│   └── main.tsx                # React root entry
├── index.html                  # HTML template with fonts and metadata
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 👤 Author

**Surendra Guggilla**  
- **Degree**: B.Tech in Computer Science and Engineering (2024–2028)  
- **University**: Lovely Professional University  
- **GitHub**: [@surendraguggilla](https://github.com/surendraguggilla)  
- **LinkedIn**: [Surendra Guggilla](https://www.linkedin.com/in/surendra-guggilla)  
- **Email**: [surendragugilla143@gmail.com](mailto:surendragugilla143@gmail.com)

---
