import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { projects } from "../../data/projects";
import { FaArrowDownLong } from "react-icons/fa6";

const heroProjects = [
  projects.find((project) => project.slug === "sundown"),
  projects.find((project) => project.slug === "k72"),
];

const Hero = () => {
  const [projectIndex, setProjectIndex] = useState(0);
  const currentProject = heroProjects[projectIndex];
  const previousProjectIndexRef = useRef(0);
  const transitionTimelineRef = useRef(null);
  const previewContentRef = useRef(null);
  const heroRef = useRef(null);
  const metaRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(metaRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
      })
        .from([line1Ref.current, line2Ref.current], {
          yPercent: 110,
          opacity: 0,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.15,
        }, "-=0.4")
        .from(textRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.7")
        .from(imageRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.96,
          duration: 1.2,
          ease: "expo.out",
        }, "-=0.9")
        .from(scrollRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.6");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const delay = 4500 + Math.random() * 3000;
    const timer = window.setTimeout(() => {
      const nextIndex = (projectIndex + 1) % heroProjects.length;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduceMotion) {
        setProjectIndex(nextIndex);
        return;
      }

      transitionTimelineRef.current = gsap.timeline({
        onComplete: () => {
          transitionTimelineRef.current = null;
          setProjectIndex(nextIndex);
        },
      }).to(previewContentRef.current, {
        opacity: 0.45,
        scale: 0.99,
        y: -6,
        duration: 0.32,
        ease: "power2.inOut",
      });
    }, delay);

    return () => {
      window.clearTimeout(timer);
      transitionTimelineRef.current?.kill();
      transitionTimelineRef.current = null;
    };
  }, [projectIndex]);

  useEffect(() => {
    if (previousProjectIndexRef.current === projectIndex) return undefined;
    previousProjectIndexRef.current = projectIndex;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(previewContentRef.current, { clearProps: "all" });
      return undefined;
    }

    const timeline = gsap.fromTo(
      previewContentRef.current,
      { opacity: 0.45, scale: 0.99, y: 6, clipPath: "inset(0 0 7% 0)" },
      { opacity: 1, scale: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power2.out" },
    );

    return () => timeline.kill();
  }, [projectIndex]);

  return (
    <section ref={heroRef} className="relative w-full min-h-[100dvh] flex flex-col justify-end pb-12 pt-32 overflow-hidden mx-auto max-w-[1680px] px-5 md:px-10 lg:px-12">

      <div className="w-full flex flex-col h-full mt-auto relative z-10">

        <div ref={metaRef} className="mb-8 md:mb-16">
          <span className="section-label">01 / DIGITAL STUDIO</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">

          <div className="lg:col-span-8 flex flex-col justify-between h-full">
            <div className="font-heading text-[clamp(4.5rem,14vw,10.5rem)] leading-[0.82] tracking-[-0.04em] text-text-primary">
              <div className="overflow-hidden pb-2 md:pb-4">
                <h1 ref={line1Ref} className="origin-bottom">You Think,</h1>
              </div>
              <div className="overflow-hidden pb-2 md:pb-4">
                <h1 ref={line2Ref} className="origin-bottom text-accent">We Build.</h1>
              </div>
            </div>

            <div className="mt-12 md:mt-16 flex items-center gap-4" ref={scrollRef}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-subtle text-text-primary">
                <FaArrowDownLong />
              </div>
              <span className="section-label hidden md:block opacity-60">Scroll<br />to explore</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end gap-10 md:gap-16 pb-[1vh]">
            <div className="max-w-[280px]">
              <p ref={textRef} className="font-body text-base text-text-secondary leading-relaxed">
                A digital studio building websites and web applications that create real impact.
              </p>
            </div>

            <div ref={imageRef} className="w-full overflow-hidden rounded-[18px] border border-border-strong bg-surface shadow-[0_20px_56px_rgba(26,25,24,0.12)]">
              <div ref={previewContentRef} aria-live="off">
                <div className="flex h-12 items-center gap-3 border-b border-border px-3 md:h-14 md:px-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-text-secondary md:text-[10px]">0{projectIndex + 1} / 02</span>
                  <div className="flex w-14 items-center gap-1.5 md:w-20" aria-hidden="true">
                    {heroProjects.map((project, index) => (
                      <span key={project.slug} className={"h-[2px] flex-1 rounded-full " + (index === projectIndex ? "bg-accent" : "bg-border-strong")} />
                    ))}
                  </div>
                  <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted md:text-[9px]">Selected work</span>
                </div>

                <div className="relative aspect-[2.05/1] w-full overflow-hidden bg-surface-muted">
                  <img
                    src={currentProject.previewImage}
                    alt={currentProject.title + " project preview"}
                    width="1917"
                    height={currentProject.slug === "sundown" ? "862" : "855"}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>

                <div className="flex min-h-14 items-center justify-between gap-4 border-t border-border px-3 py-2.5 md:px-4">
                  <span className="font-heading text-sm text-text-primary md:text-base">{currentProject.title}</span>
                  <span className="text-right font-mono text-[8px] uppercase tracking-[0.1em] text-text-muted md:text-[9px]">{currentProject.category}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
