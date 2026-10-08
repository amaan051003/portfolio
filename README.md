Amaan — Digital Studio Portfolio
A modern digital studio portfolio built to showcase websites, full-stack applications, and selected creative web experiments.
The site combines an editorial visual style with a practical engineering-focused implementation, using smooth scrolling, scroll-driven interactions, responsive layouts, and light/dark themes.
✦ Live Projects
Featured Work

- K72 — Creative website recreation
  - https://k72-clone-x8gl.vercel.app/
- Sundown — Studio website recreation
  - https://sundown-ivory.vercel.app/
    Additional Work
- Currency Converter
  - https://currency-converter-nu-cyan.vercel.app/
- Login Interface
  - https://login-tau-taupe.vercel.app/
- Todo App
  - https://bas-hai-todo.vercel.app/
    K72 and Sundown are presented as recreated/inspired frontend projects, not as claimed client work.

✦ About the Studio
You Think, We Build.
A small digital studio focused on turning ambitious ideas into thoughtful digital products.
The portfolio is centered around two public-facing services:

- Websites & Landing Pages
- Full-Stack Web Applications
  The wider technical capabilities include modern frontend development, backend APIs, databases, Python, AI/ML, and data-driven product work.
  ✦ Features
- Editorial, studio-first portfolio design
- Light and dark themes
- Persistent theme preference
- Responsive layouts for desktop, tablet, and mobile
- GSAP-powered entrance and scroll animations
- ScrollTrigger interactions
- Lenis smooth scrolling
- Automatic Hero project preview switching
- Hero preview rotates between Sundown and K72 with randomized timing
- Editorial selected-work section
- Scroll-driven Services focus transition
- Five-stage Process section:
  - THINK
  - SHAPE
  - DESIGN
  - BUILD
  - LAUNCH
- Studio-style About section
- Large CTA composition
- Project detail routes using /work/:project
- Reduced-motion support
- Keyboard-accessible navigation and theme controls
- Lazy-loaded project images
- WebP project assets for smaller payloads
- Project-detail code splitting
- Deployment-oriented production build
  ✦ Tech Stack
  Frontend
- React 19
- Vite
- Tailwind CSS v4
  Animation & Interaction
- GSAP
- GSAP ScrollTrigger
- Lenis
  UI
- React Icons
- Lucide React
  Routing
- React Router
  ✦ Design System
  Light
- Background: #f9f9f9
- Primary text: #1a1918
- Accent: #fe531d
  Dark
- Background: #1a1918
- Secondary surface: #22211f
- Elevated surface: #272623
- Primary text: warm off-white
- Accent: #fe531d
  Typography uses the existing project font system, including:
- Ease Semi Display
- TT Hoves
- JetBrains Mono
- Barlow Condensed
  ✦ Project Structure
  Portfolio/
  ├── public/
  │ └── Fonts/
  │
  ├── src/
  │ ├── assets/
  │ │ ├── currency/
  │ │ ├── k72/
  │ │ ├── login/
  │ │ ├── sundown/
  │ │ └── todo/
  │ │
  │ ├── component/
  │ │ ├── home/
  │ │ ├── nav/
  │ │ └── work/
  │ │
  │ ├── pages/
  │ │ └── Project.jsx
  │ │
  │ ├── App.jsx
  │ ├── index.css
  │ └── main.jsx
  │
  ├── index.html
  ├── package.json
  └── vite.config.\*
  ✦ Getting Started

1. Clone the repository
   git clone <your-repository-url>
   cd Portfolio
2. Install dependencies
   npm install
3. Start the development server
   npm run dev
   Open the local Vite URL shown in the terminal.
4. Create a production build
   npm run build
5. Preview the production build
   npm run preview
   ✦ Performance
   The project has been optimized for production with:

- WebP project imagery
- Lazy loading for below-the-fold work previews
- High-priority loading for the primary Hero visual
- Separate project-detail chunks
- Removal of unused dependencies
- Removal of dead code and obsolete CSS
- Reduced duplicate animation work
- Stable image aspect ratios to reduce layout shift
- Responsive motion simplification
- Theme initialization designed to reduce flash during load
  A previous production build cleanup reduced the dist output from approximately 11.2 MB to 4.1 MB, while the primary JavaScript bundle is approximately 443 KB raw / 142 KB gzip.
  Final Lighthouse scores depend on the deployment environment and should be measured against the deployed production build.

✦ Accessibility
The portfolio includes:

- Keyboard-accessible navigation
- Accessible theme controls
- Visible focus states
- Reduced-motion support
- Responsive touch interactions
- Meaningful image alt text where appropriate
- Contrast-aware light and dark themes
  ✦ Routing
  Project pages use:
  /work/:project
  The application keeps project navigation and scroll behavior integrated with the existing Lenis + React Router setup.
  ✦ Animation Philosophy
  The animation system is intentionally restrained.
  The project uses motion for:
- page entrances
- editorial text reveals
- subtle project-preview transitions
- scroll-driven focus
- navigation interactions
- small image movement
  The goal is to make the interface feel smooth and expressive without relying on excessive effects, heavy 3D, or unnecessary animation libraries.
  ✦ Deployment
  This is a standard Vite React application and can be deployed to services such as:
- Vercel
- Netlify
- Cloudflare Pages
- Any static hosting provider capable of serving a Vite production build
  Build command:
  npm run build
  Output directory:
  dist/
  For SPA hosting, configure the host so direct navigation to client-side routes such as /work/k72 resolves to the application entry point.
  ✦ Credits & References
  The visual direction was influenced by modern digital-studio and creative-development portfolios, with references including:
- https://www.brilean.com/
- https://loehx.com/
  These references were used for design principles and inspiration only. The implementation, content structure, animation system, and project work are independently built.
  ✦ Author
  Amaan Khan
  Digital Studio / Frontend & Full-Stack Development
- Email: amaankhan@06043@gmail.com
- Instagram: @amaankhan\_\_05
- LinkedIn: Amaan Khan
  ✦ License
  This portfolio is a personal project.
  The source code and visual assets are not intended for redistribution or commercial reuse without permission.
