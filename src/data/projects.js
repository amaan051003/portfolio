import currencyLight from "../assets/currency/currency.webp";
import currencyDark from "../assets/currency/image.webp";
import k72Hero from "../assets/k72/k72.webp";
import k72Projects from "../assets/k72/imagecopy.webp";
import k72Navigation from "../assets/k72/image.webp";
import loginDark from "../assets/login/login.webp";
import loginLight from "../assets/login/image.webp";
import sundownHero from "../assets/sundown/sundown.webp";
import sundownProjects from "../assets/sundown/image.webp";
import sundownAbout from "../assets/sundown/image copy.webp";
import todoHero from "../assets/todo/todo.webp";

export const projects = [
  {
    id: "01",
    slug: "k72",
    title: "K72",
    category: "Creative Website",
    year: "2026",
    featured: true,
    projectNote: "K72-inspired recreation",
    liveUrl: "https://k72-clone-x8gl.vercel.app/",
    previewColor: "#2a2a2a",
    previewImage: k72Hero,
    shortDescription: "K72-inspired creative website recreation",
    overview:
      "A creative website recreation focused on expressive typography, immersive visuals, and playful interaction. The project explores visual-first web experiences.",
    role: "Development",
    services: ["Creative Development"],
    technologies: ["React", "GSAP", "Tailwind CSS"],
    heroImage: k72Hero,
    gallery: [k72Projects, k72Navigation],
    approach:
      "Designed to emphasize visual storytelling, large typography, editorial composition, interaction, and movement. The layout prioritizes large imagery and bold text statements to guide the user.",
    build:
      "Developed as a faithful recreation using modern frontend tooling to handle complex scroll animations and responsive layouts without sacrificing performance.",
  },
  {
    id: "02",
    slug: "sundown",
    title: "Sundown",
    category: "Studio Website",
    year: "2026",
    featured: true,
    projectNote: "Sundown-inspired studio website recreation",
    liveUrl: "https://sundown-ivory.vercel.app/",
    previewColor: "#3a3a3a",
    previewImage: sundownHero,
    shortDescription: "Studio portfolio recreation",
    overview:
      "A studio website recreation built around editorial typography, bold composition, and smooth interactive transitions. It serves as an exploration of digital studio aesthetics.",
    role: "Development",
    services: ["Creative Development"],
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    heroImage: sundownHero,
    gallery: [sundownProjects, sundownAbout],
    approach:
      "Focuses heavily on strong layout hierarchy, restrained color palettes, smooth movement, and fluid responsive composition to emulate a high-end agency presence.",
    build:
      "Implemented custom scroll-triggered section reveals and interactive cursor elements using GSAP, ensuring all transitions feel deliberate and polished.",
  },
  {
    id: "03",
    slug: "currency-converter",
    title: "Currency Converter",
    category: "Web Application",
    year: "2026",
    featured: false,
    liveUrl: "https://currency-converter-nu-cyan.vercel.app/",
    previewColor: "#4a4a4a",
    previewImage: currencyLight,
    shortDescription:
      "A focused utility web application for converting currencies through a clear and simple interface.",
    overview:
      "A focused utility web application for converting currencies through a clear and simple interface. Prioritizes speed and usability.",
    role: "Development",
    services: ["Frontend Development"],
    technologies: ["React", "TailwindCSS", "Frankfurter Currency API"],
    heroImage: currencyLight,
    gallery: [currencyDark],
  },
  {
    id: "04",
    slug: "login",
    title: "Login",
    category: "Authentication UI",
    year: "2026",
    featured: false,
    liveUrl: "https://login-tau-taupe.vercel.app/",
    previewColor: "#5a5a5a",
    previewImage: loginDark,
    shortDescription:
      "A focused authentication interface exploring form hierarchy, spacing, and interaction.",
    overview:
      "A focused authentication interface exploring form hierarchy, spacing, and interaction. The project isolates the login flow to refine micro-interactions.",
    role: "Design + Development",
    services: ["UI/UX Design", "Frontend Development"],
    technologies: ["React", "Tailwind CSS"],
    heroImage: loginDark,
    gallery: [loginLight],
  },
  {
    id: "05",
    slug: "todo",
    title: "Todo",
    category: "Productivity Web App",
    year: "2026",
    featured: false,
    liveUrl: "https://bas-hai-todo.vercel.app/",
    previewColor: "#6a6a6a",
    previewImage: todoHero,
    shortDescription:
      "A lightweight productivity interface for creating and managing tasks.",
    overview:
      "A lightweight productivity interface for creating and managing tasks. Designed to reduce friction in personal task organization.",
    role: "Development",
    services: ["Frontend Development"],
    technologies: ["React", "Tailwind CSS"],
    heroImage: todoHero,
    gallery: [],
  },
];
