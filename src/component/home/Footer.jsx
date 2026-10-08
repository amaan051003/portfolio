import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = {
  email: "amaankhan@06043@gmail.com",
  instagram: "amaankhan__05",
  linkedin: "Amaan Khan",
};

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const navRef = useRef(null);
  const contactRef = useRef(null);
  const dividerRef = useRef(null);
  const bottomRef = useRef(null);

  const handleNavigation = (event, id) => {
    event.preventDefault();
    scrollToSection(id, navigate, location.pathname);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      gsap.set([brandRef.current, navRef.current, contactRef.current], { opacity: 0, y: 12 });
      gsap.set(bottomRef.current, { opacity: 0 });
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: "left center" });
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: footerRef.current, start: "top 90%", once: true },
      });
      timeline
        .to(brandRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" })
        .to([navRef.current, contactRef.current], { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, ease: "power2.out" }, "-=0.25")
        .to(dividerRef.current, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.15")
        .to(bottomRef.current, { opacity: 1, duration: 0.4 }, "-=0.25");
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = (event) => {
    event.preventDefault();
    if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="w-full bg-inverse px-6 pb-8 pt-16 text-inverse-text md:px-12 md:pt-20 lg:pt-24">
      <div className="mx-auto flex min-h-[40vh] w-full max-w-[1600px] flex-col justify-between md:min-h-[42vh]">
        <div className="grid grid-cols-1 gap-12 border-b border-inverse-text/10 pb-12 md:grid-cols-12 md:gap-8 md:pb-16">
          <div ref={brandRef} className="md:col-span-4 lg:col-span-5">
            <a href="#top" onClick={scrollToTop} className="inline-flex items-center gap-3 text-inverse-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-heading text-lg text-accent-foreground">✳</span>
              <span className="font-heading text-2xl font-medium tracking-tight">Studio</span>
            </a>
            <p className="mt-4 max-w-[260px] font-hoves text-sm leading-relaxed text-inverse-text/60 md:text-base">Websites + Web Applications</p>
          </div>

          <nav ref={navRef} aria-label="Footer navigation" className="md:col-span-3 lg:col-span-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-inverse-text/45">Navigation</span>
            <ul className="mt-5 flex flex-col gap-3">
              <li><a href="#work" onClick={(event) => handleNavigation(event, "work")} className="inline-block font-hoves text-base text-inverse-text/80 transition-transform hover:translate-x-1 hover:text-inverse-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Work</a></li>
              <li><a href="#about" onClick={(event) => handleNavigation(event, "about")} className="inline-block font-hoves text-base text-inverse-text/80 transition-transform hover:translate-x-1 hover:text-inverse-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">About</a></li>
              <li><a href="#contact" onClick={(event) => handleNavigation(event, "contact")} className="inline-block font-hoves text-base text-inverse-text/80 transition-transform hover:translate-x-1 hover:text-inverse-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Contact</a></li>
            </ul>
          </nav>

          <div ref={contactRef} className="md:col-span-5 lg:col-span-5">
            <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-inverse-text/45">Connect</span>
            <ul className="mt-5 flex flex-col gap-3">
              <li><a href={"mailto:" + contactLinks.email} className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span className="w-[78px] font-mono text-[9px] uppercase tracking-[0.12em] text-inverse-text/45">Email</span><span className="break-all font-hoves text-sm text-inverse-text/80 transition-colors group-hover:text-inverse-text">{contactLinks.email}</span><span className="text-accent transition-transform group-hover:translate-x-1">→</span></a></li>
              <li><a href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span className="w-[78px] font-mono text-[9px] uppercase tracking-[0.12em] text-inverse-text/45">Instagram</span><span className="font-hoves text-sm text-inverse-text/80 transition-colors group-hover:text-inverse-text">@{contactLinks.instagram}</span><span className="text-accent transition-transform group-hover:translate-x-1">→</span></a></li>
              <li><a href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span className="w-[78px] font-mono text-[9px] uppercase tracking-[0.12em] text-inverse-text/45">LinkedIn</span><span className="font-hoves text-sm text-inverse-text/80 transition-colors group-hover:text-inverse-text">{contactLinks.linkedin}</span><span className="text-accent transition-transform group-hover:translate-x-1">→</span></a></li>
            </ul>
          </div>
        </div>

        <div ref={bottomRef} className="flex flex-col gap-5 pt-6 text-[9px] font-mono uppercase tracking-[0.12em] text-inverse-text/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Amaan Khan. All rights reserved.</span>
          <a href="#top" onClick={scrollToTop} className="inline-flex w-fit items-center gap-3 py-1 transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" aria-label="Back to top">Back to top <span className="text-accent">↑</span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
