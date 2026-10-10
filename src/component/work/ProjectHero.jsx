import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaArrowRightLong } from "react-icons/fa6";

const ProjectHero = ({ project }) => {
  const containerRef = useRef(null);
  const metadataRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const actionRef = useRef(null);

  useEffect(() => {
    const refs = [
      metadataRef.current,
      titleRef.current,
      descriptionRef.current,
      imageRef.current,
      actionRef.current,
    ];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(refs, { clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(metadataRef.current, { opacity: 0, y: 12 });
      gsap.set(titleRef.current, { yPercent: 105 });
      gsap.set([descriptionRef.current, actionRef.current], {
        opacity: 0,
        y: 16,
      });
      gsap.set(imageRef.current, {
        clipPath: "inset(0 0 100% 0)",
        scale: 1.025,
      });
      const timeline = gsap.timeline();
      timeline
        .to(metadataRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.1,
        })
        .to(
          titleRef.current,
          { yPercent: 0, duration: 0.75, ease: "power3.out" },
          "-=0.2",
        )
        .to(
          descriptionRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.35",
        )
        .to(
          actionRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          imageRef.current,
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 0.95,
            ease: "power3.inOut",
          },
          "-=0.55",
        );
    }, containerRef);

    return () => ctx.revert();
  }, [project.slug]);

  return (
    <section
      ref={containerRef}
      className="mx-auto w-full max-w-[1600px] px-5 pb-12 pt-28 text-text-primary md:px-10 md:pb-16 md:pt-36 lg:px-12 lg:pb-20"
    >
      <div className="grid grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div
            ref={metadataRef}
            className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.15em] text-text-secondary md:text-[10px]"
          >
            <span>{project.id} / Case study</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-border-strong" />
            <span>{project.year}</span>
          </div>
          <div className="overflow-hidden pb-2">
            <h1
              ref={titleRef}
              className="font-heading text-[clamp(3.8rem,8vw,8.8rem)] font-medium uppercase leading-[0.84] tracking-[-0.065em] text-text-primary"
            >
              {project.title}
            </h1>
          </div>
          <p
            ref={descriptionRef}
            className="mt-6 max-w-[520px] font-hoves text-base leading-[1.6] text-text-secondary md:mt-8 md:text-lg"
          >
            {project.shortDescription}
          </p>
          {project.technologies?.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-full border border-border px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-text-secondary md:text-[9px]"
                >
                  {technology}
                </li>
              ))}
            </ul>
          )}
          <div
            ref={actionRef}
            className="mt-8 flex flex-wrap items-center gap-5"
          >
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 rounded-full bg-inverse px-5 py-3.5 font-mono text-[9px] uppercase tracking-[0.12em] text-inverse-text transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Live project{" "}
                <FaArrowRightLong className="text-accent transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            )}
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted">
              {project.role || "Development"}
            </span>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-[20px] border border-border bg-surface-muted p-4 md:min-h-[400px] md:rounded-[28px] md:p-7 lg:col-span-7 lg:min-h-[520px] lg:p-8"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_70%,rgba(254,83,29,0.12),transparent_52%)]" />
          {project.heroImage ? (
            <img
              src={project.heroImage}
              alt={project.title + " project interface"}
              className="rounded-[20px] relative z-10 max-h-[520px] w-full object-cover md:rounded-[28px] lg:rounded-[20px]"
              fetchPriority="high"
            />
          ) : (
            <div className="relative z-10 flex min-h-[280px] items-center justify-center font-mono text-xs uppercase text-text-muted">
              {project.title}
            </div>
          )}
          <span className="absolute bottom-4 left-5 z-20 font-mono text-[8px] uppercase tracking-[0.14em] text-text-secondary/70 md:bottom-6 md:left-7">
            Project visual · {project.id}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
