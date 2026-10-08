import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: "01",
    label: "Discover",
    title: "THINK",
    description:
      "Understand the idea, the problem, and the people it needs to serve.",
    metadata: ["Research", "User needs", "Problem space"],
  },
  {
    number: "02",
    label: "Define",
    title: "SHAPE",
    description:
      "Turn the idea into a clear direction and product structure.",
    metadata: ["Strategy", "Information", "Structure"],
  },
  {
    number: "03",
    label: "Visualize",
    title: "DESIGN",
    description:
      "Create the visual language, interface, and experience.",
    metadata: ["UI / UX", "Visual identity", "Interaction"],
  },
  {
    number: "04",
    label: "Develop",
    title: "BUILD",
    description:
      "Develop the product with a reliable technical foundation.",
    metadata: ["Clean code", "Performance", "Scalability"],
  },
  {
    number: "05",
    label: "Deliver",
    title: "LAUNCH",
    description:
      "Refine, test, and bring the finished product into the world.",
    metadata: ["Testing", "Deployment", "Growth"],
  },
];

const ThinkThumb = () => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-inverse">
    <div className="absolute inset-0">
      <div className="absolute left-[8%] top-[18%] h-[64%] w-[64%] rounded-full border border-inverse-text/20" />
      <div className="absolute left-[18%] top-[28%] h-[44%] w-[44%] rounded-full border border-inverse-text/35" />
      <div className="absolute left-[29%] top-[39%] h-[22%] w-[22%] rounded-full bg-accent" />
      <div className="absolute left-[50%] top-[11%] h-px w-[40%] bg-inverse-text/20" />
      <div className="absolute bottom-[17%] right-[10%] h-px w-[27%] bg-inverse-text/20" />
      <div className="absolute right-[10%] top-[14%] font-mono text-[8px] uppercase tracking-[0.2em] text-inverse-text/50">
        Research
      </div>
      <div className="absolute bottom-[14%] left-[10%] flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-inverse-text/50">
          01
        </span>
      </div>
    </div>
  </div>
);

const ShapeThumb = () => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-inverse">
    <div className="absolute inset-0">
      <div className="absolute left-[12%] top-[18%] h-[60%] w-[34%] border border-inverse-text/30" />
      <div className="absolute left-[27%] top-[28%] h-[58%] w-[38%] bg-inverse-text/10" />
      <div className="absolute left-[46%] top-[16%] h-[68%] w-[23%] border border-inverse-text/35" />
      <div className="absolute left-[61%] top-[25%] h-[48%] w-[13%] bg-accent" />
      <div className="absolute right-[11%] bottom-[17%] h-px w-[28%] bg-inverse-text/20" />
      <div className="absolute left-[12%] bottom-[13%] font-mono text-[8px] uppercase tracking-[0.2em] text-inverse-text/50">
        Structure
      </div>
    </div>
  </div>
);

const DesignThumb = () => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-inverse">
    <div className="absolute inset-0">
      {[0, 1, 2, 3, 4].map((line) => (
        <div
          key={line}
          className={`absolute -left-[12%] w-[124%] rounded-[50%] border ${line === 2 ? "border-accent/90" : "border-inverse-text/25"
            }`}
          style={{
            top: `${line * 15 - 10}%`,
            height: "58%",
            transform: `rotate(${line % 2 === 0 ? -7 : 7}deg)`,
          }}
        />
      ))}
      <div className="absolute right-[10%] top-[12%] h-[7px] w-[7px] rounded-full bg-accent" />
      <div className="absolute left-[10%] bottom-[14%] font-mono text-[8px] uppercase tracking-[0.2em] text-inverse-text/50">
        Interaction
      </div>
    </div>
  </div>
);

const BuildThumb = () => {
  const lines = [
    { width: 34, indent: 0 },
    { width: 62, indent: 1 },
    { width: 43, indent: 2 },
    { width: 70, indent: 2, accent: true },
    { width: 28, indent: 1 },
    { width: 52, indent: 0 },
    { width: 38, indent: 1 },
  ];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-inverse">
      <div className="absolute inset-0">
        <div className="absolute left-[9%] top-[14%] bottom-[14%] w-px bg-inverse-text/20" />
        <div className="absolute inset-x-[16%] inset-y-[18%] flex flex-col justify-between">
          {lines.map((line, index) => (
            <span
              key={index}
              className={`block h-[3px] rounded-full ${line.accent ? "bg-accent" : "bg-inverse-text/50"
                }`}
              style={{
                width: `${line.width}%`,
                marginLeft: `${line.indent * 7}%`,
              }}
            />
          ))}
        </div>
        <div className="absolute right-[10%] bottom-[14%] font-mono text-[8px] uppercase tracking-[0.2em] text-inverse-text/50">
          Performance
        </div>
      </div>
    </div>
  );
};

const LaunchThumb = () => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-inverse">
    <div className="absolute inset-0">
      <div className="absolute right-[18%] top-[13%] h-[36%] aspect-square rounded-full bg-accent" />
      <div
        className="absolute inset-x-0 bottom-0 h-[70%] bg-inverse-text/20"
        style={{
          clipPath:
            "polygon(0 100%, 0 58%, 18% 52%, 34% 67%, 48% 36%, 65% 52%, 82% 31%, 100% 44%, 100% 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[56%] bg-inverse-text/65"
        style={{
          clipPath:
            "polygon(0 100%, 0 72%, 17% 42%, 31% 60%, 44% 28%, 58% 49%, 73% 23%, 100% 58%, 100% 100%)",
        }}
      />
      <div className="absolute left-[10%] bottom-[14%] font-mono text-[8px] uppercase tracking-[0.2em] text-inverse-text/50">
        Deployment
      </div>
    </div>
  </div>
);

const thumbnails = [
  ThinkThumb,
  ShapeThumb,
  DesignThumb,
  BuildThumb,
  LaunchThumb,
];

const ProcessRow = ({ stage, index, isLast, rowRef }) => {
  const Thumb = thumbnails[index];

  return (
    <article
      ref={rowRef}
      style={{
        "--focus": index === 0 ? 1 : 0,
        "--title-opacity": index === 0 ? 1 : 0.45,
        "--description-opacity": index === 0 ? 1 : 0.5,
        "--description-y": index === 0 ? "0px" : "8px",
        "--thumb-opacity": index === 0 ? 1 : 0.6,
        "--thumb-scale": index === 0 ? 1.05 : 1,
        "--meta-opacity": index === 0 ? 1 : 0.4,
        "--meta-x": index === 0 ? "0px" : "-5px",
        "--marker-opacity": index === 0 ? 1 : 0,
        "--marker-scale": index === 0 ? 1 : 0,
        "--up": index === 0 ? 1 : 0,
        "--down": index === 0 && !isLast ? 1 : 0,
        "--row-opacity": index === 0 ? 1 : 0,
      }}
      className="group relative border-t border-border py-8 md:py-10 lg:py-11"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent"
        style={{ opacity: "var(--row-opacity)" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top bg-accent"
        style={{
          opacity: "var(--row-opacity)",
          transform: "scaleY(0.7)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[1.2rem] top-0 bottom-0 hidden w-px bg-border md:block lg:left-[2.3rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[1.2rem] top-0 hidden h-full w-px origin-top bg-accent md:block lg:left-[2.3rem]"
        style={{ transform: "scaleY(var(--down))" }}
      />

      <div className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[4.5rem_minmax(0,1fr)_15rem] md:gap-x-8 lg:grid-cols-[5rem_minmax(13rem,0.75fr)_minmax(16rem,1.15fr)_17rem_10rem] lg:gap-x-8">
        <div className="relative flex items-start justify-start md:items-center md:justify-center">
          <span className="relative inline-flex items-center font-heading text-4xl leading-none tabular-nums md:text-5xl lg:text-6xl">
            <span className="text-text-secondary">{stage.number}</span>
            <span
              aria-hidden="true"
              className="absolute inset-0 text-accent"
              style={{ opacity: "var(--focus)" }}
            >
              {stage.number}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="absolute left-[-0.35rem] top-[0.15rem] h-3 w-3 rounded-full border border-accent bg-background md:left-1/2 md:top-1/2 md:h-4 md:w-4 md:-translate-x-1/2 md:-translate-y-1/2"
            style={{
              opacity: "var(--marker-opacity)",
              transform:
                "scale(var(--marker-scale)) translateZ(0)",
            }}
          >
            <span className="absolute inset-1 rounded-full bg-accent" />
          </span>
        </div>

        <div
          className="flex flex-col justify-center md:col-span-1 lg:col-span-1"
          style={{
            opacity: "var(--title-opacity)",
            transform: "translate3d(var(--meta-x), 0, 0)",
          }}
        >
          <span className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary">
            {stage.label}
          </span>

          <h3 className="font-heading text-[clamp(2.6rem,4.5vw,4.7rem)] font-medium leading-[0.88] tracking-[-0.045em] text-text-primary">
            {stage.title}
          </h3>
        </div>

        <p
          className="mt-5 max-w-md font-hoves text-sm leading-[1.55] text-text-primary md:mt-0 md:self-center md:text-base lg:text-lg"
          style={{
            opacity: "var(--description-opacity)",
            transform: "translate3d(0, var(--description-y), 0)",
          }}
        >
          {stage.description}
        </p>

        <div
          className="mt-6 md:mt-0 md:self-center"
          style={{
            opacity: "var(--thumb-opacity)",
            transform: "scale(var(--thumb-scale))",
            transformOrigin: "left center",
          }}
        >
          <Thumb />
        </div>

        <ul
          className="mt-6 flex flex-wrap gap-x-4 gap-y-1 md:mt-0 md:flex-col md:justify-center lg:gap-y-2"
          style={{
            opacity: "var(--meta-opacity)",
            transform: "translate3d(var(--meta-x), 0, 0)",
          }}
        >
          {stage.metadata.map((item) => (
            <li
              key={item}
              className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-secondary"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const Process = () => {
  const containerRef = useRef(null);
  const listRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);

    if (!rows.length) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setStaticState = () => {
      rows.forEach((row, index) => {
        const active = index === 0;

        gsap.set(row, {
          "--focus": active ? 1 : 0,
          "--title-opacity": active ? 1 : 0.45,
          "--description-opacity": active ? 1 : 0.5,
          "--description-y": active ? "0px" : "8px",
          "--thumb-opacity": active ? 1 : 0.6,
          "--thumb-scale": active ? 1.05 : 1,
          "--meta-opacity": active ? 1 : 0.4,
          "--meta-x": active ? "0px" : "-5px",
          "--marker-opacity": active ? 1 : 0,
          "--marker-scale": active ? 1 : 0,
          "--row-opacity": active ? 1 : 0,
          "--up": active ? 1 : 0,
          "--down": index < rows.length - 1 && active ? 1 : 0,
        });
      });
    };

    if (prefersReducedMotion) {
      setStaticState();
      return undefined;
    }

    const ctx = gsap.context(() => {
      const updateProgress = (progress) => {
        const position = progress * (rows.length - 1);

        rows.forEach((row, index) => {
          const distance = Math.abs(position - index);
          const proximity = gsap.utils.clamp(0, 1, 1 - distance);
          const focus = proximity * proximity * (3 - 2 * proximity);

          const up = gsap.utils.clamp(
            0,
            1,
            (position - index + 1) * 2 - 1
          );

          const down = gsap.utils.clamp(
            0,
            1,
            (position - index) * 2
          );

          gsap.set(row, {
            "--focus": focus,
            "--title-opacity": 0.42 + focus * 0.58,
            "--description-opacity": 0.42 + focus * 0.58,
            "--description-y": `${(1 - focus) * 8}px`,
            "--thumb-opacity": 0.52 + focus * 0.48,
            "--thumb-scale": 1 + focus * 0.05,
            "--meta-opacity": 0.32 + focus * 0.68,
            "--meta-x": `${(1 - focus) * -5}px`,
            "--marker-opacity": focus,
            "--marker-scale": 0.65 + focus * 0.35,
            "--row-opacity": focus,
            "--up": up,
            "--down": down,
          });
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: listRef.current,
        start: () =>
          window.innerWidth < 768 ? "top 76%" : "top 64%",
        end: () =>
          window.innerWidth < 768 ? "bottom 22%" : "bottom 12%",
        onUpdate: (self) => updateProgress(self.progress),
        onRefresh: (self) => updateProgress(self.progress),
      });

      updateProgress(trigger.progress);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      aria-labelledby="process-heading"
      className="relative w-full overflow-x-clip bg-background py-24 md:py-32 lg:py-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12%] top-[14%] hidden h-[26rem] w-[26rem] rounded-full bg-accent/8 blur-[90px] lg:block"
      />

      <div className="mx-auto flex w-[calc(100%-2rem)] max-w-[1680px] flex-col md:w-[92vw]">
        <header className="mb-14 grid grid-cols-1 gap-10 md:mb-20 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <div className="mb-7 flex items-center gap-5">
              <span className="section-label text-text-primary">
                04 / PROCESS
              </span>

              <span className="hidden h-px w-20 bg-border sm:block lg:w-36" />
            </div>

            <h2
              id="process-heading"
              className="max-w-[1050px] font-heading text-[clamp(3.5rem,10vw,10rem)] font-medium leading-[0.86] tracking-[-0.055em] text-text-primary"
            >
              How We Build
            </h2>
          </div>

          <div className="lg:col-span-3 lg:pb-2">
            <p className="max-w-sm font-hoves text-sm leading-[1.55] text-text-secondary md:text-base lg:text-lg">
              A clear and thoughtful process to turn ambitious ideas into
              meaningful digital experiences.
            </p>
          </div>

          <div className="hidden lg:col-span-2 lg:flex lg:flex-col lg:items-end lg:gap-2 lg:pb-2">
            <span className="mb-3 h-2 w-2 bg-accent" />
            {["Idea", "Strategy", "Design", "Development", "Launch"].map(
              (word) => (
                <span
                  key={word}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-secondary"
                >
                  {word}
                </span>
              )
            )}
          </div>
        </header>

        <div
          ref={listRef}
          className="relative border-b border-border"
        >
          {stages.map((stage, index) => (
            <ProcessRow
              key={stage.number}
              stage={stage}
              index={index}
              isLast={index === stages.length - 1}
              rowRef={(element) => {
                rowRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;