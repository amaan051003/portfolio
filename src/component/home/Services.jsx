import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRight } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const FULL_STACK_SCALES = [1, 1.07, 1, 0.95, 1];
const WEBSITE_SCALES = [0.93, 0.95, 1, 1.07, 1];
const MIN_SCALE = 0.93;
const SCALE_RANGE = 0.07;

const getScaleStrength = () =>
  window.matchMedia("(max-width: 767px)").matches ? 0.5 : 1;

const applyFocus = (element, rawScale, strength) => {
  const dimming = gsap.utils.clamp(0, 1, (rawScale - MIN_SCALE) / SCALE_RANGE);
  gsap.set(element, {
    scale: 1 + (rawScale - 1) * strength,
    opacity: 0.7 + dimming * 0.3,
  });
};

const markerBase = "absolute bg-text-primary";

const ArchitectureVisual = () => (
  <div
    aria-hidden="true"
    className="relative aspect-square w-full [container-type:inline-size] transition-transform duration-700 ease-out group-hover:-translate-y-2"
  >
    <div className="absolute left-[20%] top-[80%] h-[10%] w-[64%] rounded-full bg-text-primary/10 blur-xl" />

    <div className="absolute left-[24%] top-[4%] aspect-square w-[64%] rounded-full border border-accent/40" />

    <div className="absolute left-[77%] top-[8%] h-[78%] w-px bg-text-primary/15" />
    <div className="absolute left-[12%] top-[30%] h-[60%] w-px bg-text-primary/10" />
    <div className="absolute left-[8%] top-[78%] h-px w-[80%] bg-text-primary/10" />

    <div
      className="absolute left-[30%] top-[16%] h-[54%] w-[42%] border border-text-primary/15 bg-gradient-to-br from-surface to-surface-muted"
      style={{ transform: "skewY(-14deg)" }}
    />
    <div
      className={`${markerBase} left-[47%] top-[12%] h-[22%] w-[15%]`}
      style={{ transform: "skewY(-14deg)" }}
    />
    <div
      className="absolute left-[10%] top-[42%] h-[30%] w-[26%] bg-gradient-to-br from-accent to-accent/60"
      style={{ transform: "skewY(14deg)" }}
    />
    <div
      className={`${markerBase} left-[38%] top-[48%] h-[38%] w-[16%]`}
      style={{ transform: "skewY(-14deg)" }}
    />
    <div
      className={`${markerBase} left-[55%] top-[60%] h-[12%] w-[12%] opacity-90`}
      style={{ transform: "skewY(-14deg)" }}
    />

    <div className={`${markerBase} left-[60%] top-[5%] h-2 w-2`} />
    <div className={`${markerBase} left-[8%] top-[74%] h-2 w-2`} />
    <div className="absolute left-[84%] top-[20%] h-1.5 w-1.5 rounded-full bg-accent" />

    <span className="absolute right-[3%] top-[46%] font-mono text-[9px] tracking-wider text-text-secondary sm:text-[10px]">
      / 01
    </span>

    <div className="absolute left-[54%] top-[70%] h-[26%] w-px bg-accent" />
    <div className="absolute left-[54%] top-[96%] h-1.5 w-1.5 -translate-x-[2px] rounded-full bg-accent" />
    <ul className="absolute bottom-[4%] left-[57%] flex flex-col font-mono text-[9px] uppercase leading-[1.9] tracking-[0.18em] text-text-secondary sm:text-[10px]">
      <li>Idea</li>
      <li>Architecture</li>
      <li>Development</li>
      <li>Deployment</li>
    </ul>
  </div>
);

const InterfaceVisual = () => (
  <div
    aria-hidden="true"
    className="relative aspect-square w-full [container-type:inline-size] transition-transform duration-700 ease-out group-hover:-translate-y-2"
  >
    <div className="absolute left-[62%] top-[30%] grid h-[46%] w-[32%] grid-cols-3 gap-[3%] border border-text-primary/15 bg-surface-muted p-[3%]">
      {[1, 0.9, 0.8, 0.9, 1, 0.7, 0.8, 0.7, 1].map((fade, index) => (
        <span
          key={index}
          className="bg-text-primary"
          style={{ opacity: fade }}
        />
      ))}
    </div>

    <div
      className={`${markerBase} left-[50%] top-[10%] h-[56%] w-[30%]`}
      style={{ transform: "skewY(-8deg)" }}
    />

    <div className="absolute left-[56%] top-[54%] aspect-square w-[44%] rotate-[20deg] rounded-full border-r border-t border-accent" />

    <div
      className="absolute left-[8%] top-[18%] h-[62%] w-[56%] border border-text-primary/15 bg-surface p-[5%] shadow-sm"
      style={{ transform: "rotate(-7deg) skewY(-5deg)" }}
    >
      <div className="flex items-center gap-[3%]">
        <span className="h-px w-[10%] bg-text-primary/40" />
        <span className="h-px w-[8%] bg-text-primary/40" />
        <span className="h-px w-[12%] bg-text-primary/40" />
      </div>
      <p className="mt-[14%] max-w-[55%] font-heading text-[7.5cqw] font-medium leading-[0.95] tracking-tight text-text-primary">
        Designing Digital Experiences
      </p>
      <div className="mt-[6%] flex max-w-[48%] flex-col gap-[4%]">
        <span className="mb-1 h-px w-full bg-text-primary/20" />
        <span className="mb-1 h-px w-[85%] bg-text-primary/20" />
        <span className="h-px w-[60%] bg-text-primary/20" />
      </div>
      <span className="absolute right-[8%] top-[10%] font-heading text-[6cqw] text-text-primary">
        01
      </span>
      <div
        className="absolute right-[8%] top-[22%] h-[40%] w-[34%] bg-text-primary/25"
        style={{
          clipPath: "polygon(0 100%, 35% 35%, 55% 60%, 78% 8%, 100% 100%)",
        }}
      />
      <div className="absolute bottom-[8%] left-[8%] h-[26%] w-[38%] bg-gradient-to-br from-accent to-accent/40" />
    </div>

    <div className={`${markerBase} left-[92%] top-[40%] h-2 w-2`} />
    <div className="absolute left-[10%] top-[10%] h-1.5 w-1.5 rounded-full bg-accent" />

    <div className="absolute left-[66%] top-[78%] h-[18%] w-px bg-accent" />
    <div className="absolute left-[66%] top-[96%] h-1.5 w-1.5 -translate-x-[2px] rounded-full bg-accent" />
    <ul className="absolute bottom-[3%] left-[70%] flex flex-col font-mono text-[9px] uppercase leading-[1.9] tracking-[0.18em] text-text-secondary sm:text-[10px]">
      <li>Design</li>
      <li>Development</li>
      <li>Interaction</li>
      <li>Optimization</li>
    </ul>
  </div>
);

const services = [
  {
    id: "full-stack",
    number: "01",
    meta: "Develop / Scale / Maintain",
    titleLines: ["Full-Stack", "Web Applications"],
    description:
      "Thoughtful web products combining polished interfaces with reliable application architecture.",
    tags: ["React", "Node", "Express", "APIs", "MongoDB"],
    actionLabel: ["Discuss", "your project"],
    Visual: ArchitectureVisual,
  },
  {
    id: "websites",
    number: "02",
    meta: "Design / Develop / Launch",
    titleLines: ["Websites &", "Landing Pages"],
    description:
      "Distinctive, responsive websites built to communicate clearly and leave an impression.",
    tags: ["React", "GSAP", "Tailwind CSS", "Responsive UI"],
    actionLabel: ["Start a", "new project"],
    Visual: InterfaceVisual,
  },
];

const ServiceCard = ({ service, cardRef }) => {
  const { number, meta, titleLines, description, tags, actionLabel, Visual } =
    service;

  return (
    <article
      ref={cardRef}
      className="group relative flex origin-center flex-col overflow-hidden rounded-xl border border-subtle bg-surface-muted p-6 will-change-transform sm:p-8 xl:min-h-[700px] xl:p-12 2xl:min-h-[760px]"
    >
      <div className="relative z-10 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="font-heading text-3xl leading-none text-accent md:text-4xl">
            {number}
          </span>
          <span className="h-px w-12 bg-accent/60 md:w-20" />
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary sm:block">
          {meta}
        </span>
      </div>

      <div className="relative z-10 mt-10 flex flex-col gap-6 xl:mt-16 xl:max-w-[46%]">
        <h3 className="font-heading text-[clamp(1.875rem,2.8vw,3.75rem)] font-medium leading-[1.02] tracking-tight text-text-primary">
          {titleLines[0]}
          <br />
          {titleLines[1]}
        </h3>

        <p className="max-w-[22rem] font-hoves text-sm leading-[1.55] text-text-secondary md:text-base">
          {description}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-subtle bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none relative z-0 mx-auto mt-8 w-full max-w-[420px] xl:absolute xl:right-[-4%] xl:top-1/2 xl:mt-0 xl:w-[64%] xl:max-w-none xl:-translate-y-1/2">
        <Visual />
      </div>

      <a
        href="#contact"
        className="group/action relative z-10 mt-8 inline-flex w-fit items-center gap-5 xl:mt-auto xl:pt-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-text-primary/25 text-accent transition-colors duration-300 group-hover/action:border-accent">
          <FaArrowRight className="transition-transform duration-300 group-hover/action:translate-x-1" />
        </span>
        <span className="flex flex-col font-mono text-[10px] uppercase leading-[1.8] tracking-[0.2em] text-text-secondary">
          <span>{actionLabel[0]}</span>
          <span>{actionLabel[1]}</span>
        </span>
      </a>
    </article>
  );
};

const Services = () => {
  const containerRef = useRef(null);
  const service1ContentRef = useRef(null);
  const service2ContentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const updateFromProgress = (progress) => {
        const strength = getScaleStrength();
        applyFocus(
          service1ContentRef.current,
          gsap.utils.interpolate(FULL_STACK_SCALES, progress),
          strength,
        );
        applyFocus(
          service2ContentRef.current,
          gsap.utils.interpolate(WEBSITE_SCALES, progress),
          strength,
        );
      };

      gsap.set([service1ContentRef.current, service2ContentRef.current], {
        transformOrigin: "center center",
      });

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.6,
        onUpdate: (self) => updateFromProgress(self.progress),
        onRefresh: (self) => updateFromProgress(self.progress),
      });

      updateFromProgress(trigger.progress);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="services-heading"
      className="w-full overflow-x-clip bg-background py-24"
    >
      <div className="mx-auto flex w-[calc(100%-2.5rem)] max-w-[1680px] flex-col md:w-[92vw]">
        <div className="mb-12 grid grid-cols-1 gap-8 md:mb-20 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-6">
              <h3 className="section-label text-text-primary">03 / SERVICES</h3>
              <span className="hidden h-px w-40 bg-text-primary/30 sm:block" />
            </div>
            <h2
              id="services-heading"
              className="font-heading text-[clamp(4rem,10.5vw,11rem)] font-medium leading-[0.9] tracking-[-0.04em] text-text-primary"
            >
              What WE Do
            </h2>
          </div>

          <p className="max-w-md font-hoves text-base leading-[1.55] text-text-secondary lg:col-span-4 lg:pb-3 xl:text-lg">
            I build digital products that are thoughtful, functional and
            visually exceptional — from complex web applications to high-impact
            websites.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:col-span-2 lg:flex-col lg:items-end lg:gap-y-2 lg:pb-3">
            <span className="hidden h-2 w-2 bg-accent lg:mb-4 lg:block" />
            {["Ideas", "Code", "Design", "Impact"].map((word) => (
              <span
                key={word}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6 xl:gap-8">
          <ServiceCard service={services[0]} cardRef={service1ContentRef} />
          <ServiceCard service={services[1]} cardRef={service2ContentRef} />
        </div>
      </div>
    </section>
  );
};

export default Services;
