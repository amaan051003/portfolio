import { useState, useRef, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/navigation";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const HoverLink = ({ href, onClick, children }) => {
  const bgRef = useRef(null);
  const textRef = useRef(null);

  const play = (active) => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const d = reduce ? 0 : undefined;
    gsap.to(bgRef.current, {
      scaleX: active ? 1 : 0,
      duration: d ?? 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(textRef.current, {
      color: active ? "var(--color-accent)" : "var(--color-text-primary)",
      duration: d ?? 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => play(true)}
      onMouseLeave={() => play(false)}
      onFocus={() => play(true)}
      onBlur={() => play(false)}
      className="relative overflow-hidden px-5 py-2 rounded-2xl focus-visible:outline-accent"
    >
      <span
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 bg-text-primary rounded-2xl"
        style={{ transformOrigin: "right center", transform: "scaleX(0)" }}
      ></span>
      <span ref={textRef} className="relative z-10">
        {children}
      </span>
    </a>
  );
};

const Nav = ({ theme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const frameRef = useRef(null); // the container that shrinks
  const logoRef = useRef(null);
  const themeControlRef = useRef(null); // Desktop theme control
  const menuGroupRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const firstMenuLinkRef = useRef(null);
  const contactBgRef = useRef(null);
  const contactTextRef = useRef(null);
  const contactIconRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let ctx = gsap.context(() => {
      gsap.from(frameRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
        clearProps: "transform,opacity",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, reduce } = context.conditions;
        if (reduce) return;

        const vw = () => document.documentElement.clientWidth;
        const compactW = () => Math.min(640, vw() - 100);

        const stages = isDesktop
          ? [
              {
                at: 0,
                w: () => Math.min(1920, vw() - 48),
                h: 84,
                px: 48,
                r: 32,
                top: 12,
              },
              {
                at: 80,
                w: () => Math.max(compactW(), vw() - 160),
                h: 78,
                px: 32,
                r: 38,
                top: 14,
              },
              {
                at: 140,
                w: () => Math.max(compactW(), vw() - 320),
                h: 75,
                px: 28,
                r: 42,
                top: 16,
              },
              { at: 220, w: compactW, h: 72, px: 24, r: 42, top: 16 },
            ]
          : [
              { at: 0, w: () => vw() - 32, h: 64, px: 24, r: 32, top: 12 },
              { at: 120, w: () => vw() - 48, h: 58, px: 20, r: 32, top: 12 },
            ];

        const total = stages[stages.length - 1].at;
        const frame = frameRef.current;
        const state = (s) => ({
          width: s.w,
          height: s.h,
          paddingLeft: s.px,
          paddingRight: s.px,
          marginTop: s.top,
          borderRadius: s.r,
        });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: document.documentElement,
            start: 0,
            end: total,
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        });

        for (let i = 1; i < stages.length; i++) {
          const prev = stages[i - 1];
          const cur = stages[i];
          tl.fromTo(
            frame,
            state(prev),
            {
              ...state(cur),
              duration: cur.at - prev.at,
              immediateRender: i === 1,
            },
            prev.at,
          );
        }

        tl.fromTo(
          logoRef.current,
          { fontSize: isDesktop ? 34 : 28 },
          { fontSize: isDesktop ? 28 : 24, duration: total },
          0,
        );

        if (isDesktop && menuGroupRef.current) {
          tl.to(menuGroupRef.current, { columnGap: 8, duration: total }, 0);
        }

      },
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(menuRef.current, { autoAlpha: isOpen ? 1 : 0 });
        return;
      }
      if (isOpen) {
        gsap.to(menuRef.current, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(menuRef.current, {
          autoAlpha: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }, navRef);
    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      if (menuRef.current?.contains(document.activeElement)) menuButtonRef.current?.focus();
      return undefined;
    }
    const focusFrame = requestAnimationFrame(() => firstMenuLinkRef.current?.focus());
    return () => cancelAnimationFrame(focusFrame);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavigation = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = "";
    scrollToSection(id, navigate, location.pathname);
  };

  const prefersReducedMotion = useRef(null);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const handleContactEnter = () => {
    if (prefersReducedMotion.current) return;

    gsap.to(contactBgRef.current, {
      width: "100%",
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(contactTextRef.current, {
      color: "var(--color-accent)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(contactIconRef.current, {
      x: 3,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleContactLeave = () => {
    if (prefersReducedMotion.current) return;

    gsap.to(contactBgRef.current, {
      width: "48px",
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    gsap.to(contactTextRef.current, {
      color: "var(--color-text-primary)",
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(contactIconRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: true,
    });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 mix-blend-normal pointer-events-none"
    >
      <div
        ref={frameRef}
        className="pointer-events-auto flex justify-between items-center mx-auto mt-3 h-16 md:h-[84px] px-6 md:px-12 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] max-w-[1920px] rounded-[32px] shadow-[0_8px_28px_rgba(26,25,24,0.10)] bg-background/85"
      >
        <div className="flex items-center gap-6">
          <a
            ref={logoRef}
            href="/"
            className="relative z-50 inline-flex items-start font-heading font-bold tracking-tight leading-none text-text-primary text-[28px] md:text-[34px] focus-visible:outline-accent"
            aria-label="Home"
          >
            Amaan
            <span
              aria-hidden="true"
              className="ml-[0.06em] mt-[0.04em] block w-[0.2em] h-[0.2em] rounded-full bg-accent"
            ></span>
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border bg-surface-muted text-text-primary transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <FaRegSun size={15} aria-hidden="true" /> : <FaRegMoon size={15} aria-hidden="true" />}
          </button>
        </div>

        <div
          ref={menuGroupRef}
          className="hidden md:flex items-center gap-2 lg:gap-4 text-text-primary font-hoves-medium"
        >
          <HoverLink href="#work" onClick={(e) => handleNavigation(e, "work")}>
            Work
          </HoverLink>
          <HoverLink
            href="#about"
            onClick={(e) => handleNavigation(e, "about")}
          >
            Who We Are
          </HoverLink>

          <button
            onClick={(e) => handleNavigation(e, "contact")}
            className="relative flex justify-center items-center h-12 w-44 rounded-[30px] ml-4 cursor-pointer focus-visible:outline-accent overflow-hidden"
            onMouseEnter={handleContactEnter}
            onMouseLeave={handleContactLeave}
            onFocus={handleContactEnter}
            onBlur={handleContactLeave}
            aria-label="Contact Us"
          >
            <span
              ref={contactTextRef}
              className="relative z-10 mr-6 font-medium text-text-primary"
            >
              Contact us
            </span>
            <div
              ref={contactBgRef}
              className="absolute right-0 h-12 w-12 rounded-[30px] bg-text-primary"
              style={{ transformOrigin: "right center" }}
            ></div>
            <div className="absolute right-0 flex justify-center items-center h-12 w-12 z-10 pointer-events-none">
              <div
                ref={contactIconRef}
                className="flex justify-center items-center"
              >
                <FaArrowRightLong color="var(--color-accent)" />
              </div>
            </div>
          </button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-1.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
        >
          <span
            className={`block h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-2" : "w-8"}`}
          ></span>
          <span
            className={`block h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? "w-6 opacity-0" : "w-6"}`}
          ></span>
          <span
            className={`block h-0.5 bg-text-primary transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-2" : "w-4"}`}
          ></span>
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className="pointer-events-auto fixed inset-0 bg-background z-40 flex flex-col justify-center items-center invisible opacity-0"
        aria-hidden={!isOpen}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const items = menuRef.current?.querySelectorAll("a[href], button:not([disabled])");
          if (!items?.length) return;
          const first = items[0];
          const last = items[items.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="flex flex-col items-center gap-8 text-3xl font-heading text-text-primary">
          <a
            ref={firstMenuLinkRef}
            href="#work"
            onClick={(e) => handleNavigation(e, "work")}
            className="hover:text-accent transition-colors focus-visible:outline-accent"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavigation(e, "about")}
            className="hover:text-accent transition-colors focus-visible:outline-accent"
          >
            Who We Are
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavigation(e, "contact")}
            className="text-accent hover:text-text-primary transition-colors focus-visible:outline-accent"
          >
            Contact us
          </a>

          <div className="mt-8">
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex min-h-12 items-center justify-center gap-3 rounded-full border border-border bg-surface-muted px-6 py-3 text-text-primary transition-colors hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <FaRegSun size={17} aria-hidden="true" /> : <FaRegMoon size={17} aria-hidden="true" />}
              <span className="font-hoves text-sm">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
