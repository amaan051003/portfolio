import { lazy, Suspense, useEffect, useState } from "react";
import Nav from "./component/nav/nav";
import Home from "./pages/home";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Project = lazy(() => import("./pages/Project"));

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#1a1918" : "#f9f9f9");
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      return;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = new Lenis({
      lerp: prefersReducedMotion ? 1 : 0.1,
      smoothWheel: !prefersReducedMotion,
    });
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen w-full bg-background relative selection:bg-accent selection:text-white">
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:project" element={<Suspense fallback={<main className="min-h-dvh bg-background" aria-busy="true" />}><Project /></Suspense>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
