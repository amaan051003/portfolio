import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const STORAGE_KEY = "introPlayed";
const FALLBACK_SECONDS = 6;
const COMPACT_QUERY = "(max-width: 767px), (max-height: 500px)";
const WIDE_QUERY = "(min-width: 768px) and (min-height: 501px)";

const BRAND_LETTERS = ["A", "m", "a", "a", "n"];

const STAGE_TAGS = {
  1: "Digital Studio",
  2: "Crafting Digital Experiences",
  3: "Ideas to Reality",
};

const WIDE_WORD_START_X = ["12vw", "-10vw", "14vw"];
const WIDE_WORD_END_X = ["-3vw", "2vw", "0vw"];
const WIDE_WORD_END_Y = ["-5vh", "0vh", "5vh"];

const COMPACT_WORD_START_X = ["8vw", "-8vw", "8vw"];
const COMPACT_WORD_END_X = ["-2vw", "2vw", "0vw"];
const COMPACT_WORD_END_Y = ["-2vh", "0vh", "2vh"];

const PANELS = {
  left: {
    from: "polygon(0% 0%, 38.2% 0%, 28.2% 100%, 0% 100%)",
    to: "polygon(0% 0%, 38.2% 0%, 38.2% 0%, 0% 0%)",
  },
  center: {
    from: "polygon(37.8% 0%, 66.2% 0%, 56.2% 100%, 27.8% 100%)",
    to: "polygon(27.8% 100%, 56.2% 100%, 56.2% 100%, 27.8% 100%)",
  },
  right: {
    from: "polygon(65.8% 0%, 100% 0%, 100% 100%, 55.8% 100%)",
    to: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
  },
};

const readStorage = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

const writeStorage = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {
    return;
  }
};

const shouldPlayIntro = () => {
  if (typeof window === "undefined") return false;
  if (window.location.pathname !== "/") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const navigationEntry = performance.getEntriesByType("navigation")[0];
  const isReload = navigationEntry?.type === "reload";
  return isReload || !readStorage();
};

const createStageSetter = (q) => {
  const counter = q(".intro-counter")[0];
  const tag = q(".intro-tag")[0];
  return (stage) => {
    counter.textContent = `0${stage} — 05`;
    tag.textContent = STAGE_TAGS[stage];
  };
};

const announceReveal = () => {
  window.dispatchEvent(new CustomEvent("intro:reveal"));
};

const buildWideTimeline = (q, finish) => {
  const setStage = createStageSetter(q);

  const tl = gsap.timeline({
    defaults: { ease: "power3.out" },
    onComplete: finish,
  });

  tl.fromTo(
    q(".intro-meta"),
    { opacity: 0 },
    { opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
    0
  )
    .fromTo(
      q(".intro-line"),
      { scaleY: 0 },
      { scaleY: 1, duration: 0.6, stagger: 0.1, ease: "expo.out" },
      0
    )
    
    .fromTo(
      q(".intro-brand"),
      { scale: 0.92 },
      { scale: 1, duration: 1.2, ease: "expo.out" },
      0.2
    )
    .fromTo(
      q(".intro-letter"),
      { yPercent: (i) => (i % 2 === 0 ? 115 : -115), opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "expo.out" },
      0.3
    )
    .fromTo(
      q(".intro-dot"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" },
      0.6
    )
    .call(setStage, [2], 0.6)
    .to(q(".intro-foot-a"), { opacity: 0, duration: 0.3, ease: "power2.out" }, 0.6)
    .fromTo(
      q(".intro-foot-b"),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      0.7
    )
    .fromTo(
      q(".intro-progress"),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: "none" },
      0.6
    )

    .call(setStage, [3], 1.2)
    .to(
      q(".intro-brand"),
      { yPercent: -55, scale: 1.06, opacity: 0, duration: 0.6, ease: "power2.inOut" },
      1.1
    )
    .to(q(".intro-foot-b"), { opacity: 0, duration: 0.3, ease: "power2.out" }, 1.2)
    .fromTo(
      q(".intro-word"),
      { y: "75vh", x: (i) => WIDE_WORD_START_X[i], opacity: 0 },
      {
        y: (i) => WIDE_WORD_END_Y[i],
        x: (i) => WIDE_WORD_END_X[i],
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.inOut",
      },
      1.2
    )
    
    .set(q(".intro-base"), { autoAlpha: 0 }, 1.9)
    .to(
      q(".intro-content"),
      { opacity: 0, scale: 1.04, duration: 0.4, ease: "power2.in" },
      1.9
    )
    .call(announceReveal, null, 1.95)
    .to(
      q(".intro-panel-left"),
      { clipPath: PANELS.left.to, yPercent: -6, duration: 0.8, ease: "expo.inOut" },
      1.9
    )
    .to(
      q(".intro-panel-center"),
      { clipPath: PANELS.center.to, yPercent: 6, duration: 0.8, ease: "expo.inOut" },
      1.95
    )
    .to(
      q(".intro-panel-right"),
      { clipPath: PANELS.right.to, xPercent: 6, duration: 0.8, ease: "expo.inOut" },
      2.0
    );

  return tl;
};

const buildCompactTimeline = (q, finish) => {
  const setStage = createStageSetter(q);

  const tl = gsap.timeline({
    defaults: { ease: "power2.out" },
    onComplete: finish,
  });

  tl.fromTo(
    q(".intro-meta"),
    { opacity: 0 },
    { opacity: 1, duration: 0.5, stagger: 0.06, ease: "sine.out" },
    0
  )
    .fromTo(
      q(".intro-line"),
      { scaleY: 0 },
      { scaleY: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" },
      0
    )
    
    .fromTo(
      q(".intro-brand"),
      { scale: 0.94 },
      { scale: 1, duration: 1.4, ease: "power3.out" },
      0.2
    )
    .fromTo(
      q(".intro-letter"),
      { yPercent: (i) => (i % 2 === 0 ? 100 : -100), opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.1, ease: "power3.out" },
      0.3
    )
    .fromTo(
      q(".intro-dot"),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" },
      0.9
    )
    .call(setStage, [2], 0.7)
    .to(q(".intro-foot-a"), { opacity: 0, duration: 0.3, ease: "sine.out" }, 0.7)
    .fromTo(
      q(".intro-foot-b"),
      { opacity: 0, y: 6 },
      { opacity: 1, y: 0, duration: 0.5, ease: "sine.out" },
      0.85
    )
    .fromTo(
      q(".intro-progress"),
      { scaleX: 0 },
      { scaleX: 1, duration: 2.55, ease: "none" },
      0.7
    )

    .to(
      q(".intro-brand"),
      { yPercent: -30, opacity: 0, duration: 0.7, ease: "sine.inOut" },
      1.8
    )
    .to(q(".intro-foot-b"), { opacity: 0, duration: 0.3, ease: "sine.out" }, 1.8)
    .call(setStage, [3], 1.9)
    .fromTo(
      q(".intro-word"),
      { y: "26vh", x: (i) => COMPACT_WORD_START_X[i], opacity: 0 },
      {
        y: (i) => COMPACT_WORD_END_Y[i],
        x: (i) => COMPACT_WORD_END_X[i],
        opacity: 1,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.inOut",
      },
      2.0
    )
    .fromTo(
      q(".intro-words"),
      { scale: 1 },
      { scale: 1.03, duration: 1.6, ease: "sine.inOut" },
      2.0
    )
    
    .to(
      q(".intro-content"),
      { opacity: 0, duration: 0.6, ease: "sine.inOut" },
      3.2
    )
    .set(q(".intro-base"), { autoAlpha: 0 }, 3.3)
    .call(announceReveal, null, 3.4)
    .to(
      q(".intro-panel-left"),
      { yPercent: -102, duration: 1.0, ease: "power3.inOut" },
      3.3
    )
    .to(
      q(".intro-panel-center"),
      { yPercent: 102, duration: 1.0, ease: "power3.inOut" },
      3.45
    )
    .to(
      q(".intro-panel-right"),
      { xPercent: 102, duration: 1.0, ease: "power3.inOut" },
      3.6
    );

  return tl;
};

const metaClass =
  "font-mono text-[10px] md:text-xs uppercase tracking-[0.14em] md:tracking-[0.18em] text-[#f9f9f9]/70 leading-relaxed";

const wordSizeClass =
  "[font-size:min(19vw,15vh)] md:[font-size:min(16vw,26vh)] leading-[0.9] md:leading-[0.82]";

const Intro = () => {
  const rootRef = useRef(null);
  const [isActive, setIsActive] = useState(shouldPlayIntro);

  useLayoutEffect(() => {
    if (!isActive) return undefined;

    writeStorage();

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setIsActive(false);
    };

    const q = gsap.utils.selector(rootRef.current);
    const mm = gsap.matchMedia();

    mm.add(WIDE_QUERY, () => {
      buildWideTimeline(q, finish);
    });

    mm.add(COMPACT_QUERY, () => {
      buildCompactTimeline(q, finish);
    });

    const fallback = gsap.delayedCall(FALLBACK_SECONDS, finish);

    return () => {
      fallback.kill();
      mm.revert();
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ height: "100dvh" }}
    >
      <div className="intro-base absolute inset-0 bg-[#1a1918]" />

      <div
        className="intro-panel-left absolute inset-0 bg-[#1a1918] will-change-transform"
        style={{ clipPath: PANELS.left.from }}
      />
      <div
        className="intro-panel-center absolute inset-0 bg-[#1a1918] will-change-transform"
        style={{ clipPath: PANELS.center.from }}
      />
      <div
        className="intro-panel-right absolute inset-0 bg-[#1a1918] will-change-transform"
        style={{ clipPath: PANELS.right.from }}
      />

      <div className="intro-content absolute inset-0 text-[#f9f9f9]">
        <span className="intro-line absolute left-[30%] top-0 h-full w-px origin-top bg-[#f9f9f9]/15" />
        <span className="intro-line absolute left-[70%] top-0 h-full w-px origin-top bg-[#f9f9f9]/10" />

        <div className="intro-meta absolute left-5 top-5 md:left-8 md:top-8">
          <span className={`intro-counter ${metaClass}`}>01 — 05</span>
        </div>

        <div className="intro-meta absolute right-5 top-5 flex items-center gap-2 md:right-8 md:top-8">
          <span className={`intro-tag ${metaClass}`}>{STAGE_TAGS[1]}</span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#fe531d]" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="intro-brand flex items-start font-heading font-semibold leading-none tracking-tight"
            style={{ fontSize: "clamp(4rem, 22vw, 16rem)" }}
          >
            {BRAND_LETTERS.map((letter, index) => (
              <span
                key={index}
                className="inline-block overflow-hidden pb-[0.06em] leading-[0.95]"
              >
                <span className="intro-letter inline-block">{letter}</span>
              </span>
            ))}
            <span className="intro-dot ml-[0.06em] mt-[0.12em] inline-block h-[0.14em] w-[0.14em] rounded-full bg-[#fe531d]" />
          </h1>
        </div>

        <div className="intro-words absolute inset-0 flex flex-col items-center justify-center gap-[1.5vh] md:gap-0">
          <span
            className={`intro-word block font-heading font-semibold uppercase tracking-tight text-transparent ${wordSizeClass}`}
            style={{ WebkitTextStroke: "1.5px #f9f9f9" }}
          >
            Design
          </span>
          <span
            className={`intro-word block font-heading font-bold uppercase tracking-tight text-[#f9f9f9] ${wordSizeClass}`}
          >
            Devel<span className="text-[#fe531d]">op</span>
          </span>
          <span
            className={`intro-word block font-heading font-semibold uppercase tracking-tight text-transparent ${wordSizeClass}`}
            style={{ WebkitTextStroke: "1.5px #f9f9f9" }}
          >
            Launch
          </span>
        </div>

        <div className="intro-meta intro-foot-a absolute bottom-5 left-5 md:bottom-8 md:left-8">
          <p className={metaClass}>Design</p>
          <p className={metaClass}>Development</p>
          <p className={metaClass}>Digital Products</p>
        </div>

        <div className="intro-foot-b absolute bottom-5 left-5 opacity-0 md:bottom-8 md:left-8">
          <p className={metaClass}>You Think,</p>
          <p className={metaClass}>We Build</p>
        </div>

        <div className="intro-meta absolute bottom-5 right-5 md:bottom-8 md:right-8">
          <span className={metaClass}>2026</span>
        </div>

        <div className="absolute bottom-6 left-1/2 h-px w-16 -translate-x-1/2 bg-[#f9f9f9]/15 md:bottom-9 md:w-40">
          <span className="intro-progress block h-full w-full origin-left bg-[#fe531d]" />
        </div>
      </div>
    </div>
  );
};

export default Intro;