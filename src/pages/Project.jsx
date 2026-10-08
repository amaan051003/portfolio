import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectHero from "../component/work/ProjectHero";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRightLong } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const { project: slug } = useParams();
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[currentIndex];

  useEffect(() => {
    const title = project ? `${project.title} — Amaan Khan` : "Project not found — Amaan Khan";
    const description = project?.shortDescription || "Explore selected projects by Amaan Khan, a digital studio building websites and web applications.";
    document.title = title;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    descriptionMeta?.setAttribute("content", description);
    return () => {
      document.title = "Amaan Khan — Digital Studio";
      descriptionMeta?.setAttribute("content", "A digital studio building websites and web applications that create real impact.");
    };
  }, [project]);

  useEffect(() => {
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  useEffect(() => {
    if (!project) return undefined;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: true },
        });
      }

      gsap.utils.toArray(".project-reveal").forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 22 }, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray(".project-image-reveal").forEach((element) => {
        gsap.fromTo(element, { opacity: 0, y: 24, scale: 0.985 }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center text-text-primary"><span className="section-label">404 / PROJECT</span><h1 className="mt-5 font-heading text-4xl md:text-6xl">Project not found</h1><Link to="/#work" className="mt-8 font-mono text-xs uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-accent">← Back to work</Link></main>;
  }

  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main ref={containerRef} className="relative min-h-dvh w-full bg-background text-text-primary selection:bg-accent selection:text-white">
      <div className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-accent" ref={progressRef} />
      <div className="mx-auto w-full max-w-[1600px] px-5 pt-24 md:px-10 lg:px-12">
        <Link to="/#work" className="group inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><span className="transition-transform group-hover:-translate-x-1">←</span> All projects</Link>
      </div>

      <ProjectHero project={project} />

      <section className="mx-auto w-full max-w-[1600px] px-5 py-10 md:px-10 md:py-16 lg:px-12 lg:py-20">
        <div className="project-reveal rounded-[22px] border border-border bg-surface p-5 shadow-[0_16px_50px_rgba(26,25,24,0.04)] md:rounded-[28px] md:p-8 lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-text-muted">01 / Overview</span>
              <h2 className="mt-4 font-heading text-3xl font-medium leading-tight tracking-[-0.04em] text-text-primary md:text-5xl">About the project</h2>
              <p className="mt-4 max-w-[620px] font-hoves text-sm leading-[1.65] text-text-secondary md:mt-5 md:text-base">{project.overview || project.shortDescription}</p>
            </div>
            <div className="project-image-reveal relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[16px] bg-surface-muted p-4 md:min-h-[300px] md:p-6 lg:col-span-7 lg:min-h-[320px]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_75%,rgba(254,83,29,0.13),transparent_50%)]" />
              <img src={project.heroImage || project.previewImage} alt={project.title + " project overview"} className="relative z-10 max-h-[380px] w-full object-contain" loading="lazy" />
              <span className="absolute bottom-3 left-4 z-20 font-mono text-[8px] uppercase tracking-[0.13em] text-text-secondary/70 md:bottom-4 md:left-5">{project.id} / Overview visual</span>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 border-t border-border pt-5 md:mt-9 md:grid-cols-3 md:pt-6">
            <div className="border-r border-border pr-4 md:pr-8"><span className="font-mono text-[8px] uppercase tracking-[0.13em] text-text-muted">Category</span><p className="mt-2 font-hoves text-xs text-text-primary md:text-sm">{project.category}</p></div>
            <div className="px-4 md:px-8"><span className="font-mono text-[8px] uppercase tracking-[0.13em] text-text-muted">Role</span><p className="mt-2 font-hoves text-xs text-text-primary md:text-sm">{project.role || "Development"}</p></div>
            <div className="col-span-2 mt-5 border-t border-border pt-4 md:col-span-1 md:mt-0 md:border-0 md:border-l md:pt-0 md:pl-8"><span className="font-mono text-[8px] uppercase tracking-[0.13em] text-text-muted">Year</span><p className="mt-2 font-hoves text-xs text-text-primary md:text-sm">{project.year}</p></div>
          </div>
        </div>
      </section>

      {(project.approach || project.build || (project.technologies?.length > 0)) && <section className="mx-auto w-full max-w-[1600px] px-5 py-8 md:px-10 md:py-14 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-8 lg:space-y-16">
            {project.approach && <article className="project-reveal grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-12 md:gap-8 md:pt-8"><h2 className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted md:col-span-3">02 / Approach</h2><p className="font-hoves text-base leading-[1.7] text-text-primary md:col-span-9 md:text-lg">{project.approach}</p></article>}
            {project.build && <article className="project-reveal grid grid-cols-1 gap-4 border-t border-border pt-6 md:grid-cols-12 md:gap-8 md:pt-8"><h2 className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted md:col-span-3">03 / Build</h2><p className="font-hoves text-base leading-[1.7] text-text-primary md:col-span-9 md:text-lg">{project.build}</p></article>}
          </div>
          {project.technologies?.length > 0 && <aside className="project-reveal h-fit rounded-[18px] bg-inverse p-6 text-inverse-text md:p-7 lg:col-span-4"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-inverse-text/50">Technology / Stack</span><ul className="mt-5 divide-y divide-inverse-text/10">{project.technologies.map((technology) => <li key={technology} className="py-3 font-hoves text-sm text-inverse-text/85">{technology}</li>)}</ul>{project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.12em] text-inverse-text">Open live project <FaArrowRightLong className="text-accent transition-transform group-hover:translate-x-1" /></a>}</aside>}
        </div>
      </section>}

      {project.gallery?.length > 0 && <section className="mx-auto w-full max-w-[1600px] px-5 py-12 md:px-10 md:py-20 lg:px-12">
        <div className="project-reveal mb-7 flex items-end justify-between border-b border-border pb-5 md:mb-9 md:pb-6"><div><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted">04 / Gallery</span><h2 className="mt-3 font-heading text-3xl font-medium tracking-[-0.04em] md:text-5xl">Project visuals</h2></div><span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted sm:block">{String(project.gallery.length).padStart(2, "0")} frames</span></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">{project.gallery.map((image, index) => <figure key={image} className={(index === 0 && project.gallery.length > 1 ? "md:col-span-7" : "md:col-span-5") + " project-image-reveal overflow-hidden rounded-[18px] border border-border bg-surface-muted p-3 md:rounded-[22px] md:p-5"}><img src={image} alt={project.title + " project screen " + (index + 1)} className="h-auto w-full object-contain" loading="lazy" /><figcaption className="flex justify-between pt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted"><span>{project.title} / Screen</span><span>{String(index + 1).padStart(2, "0")}</span></figcaption></figure>)}</div>
      </section>}

      <section className="px-4 pb-12 pt-12 md:px-[4vw] md:pb-16 md:pt-16">
        <Link to={"/work/" + nextProject.slug} className="group project-reveal relative mx-auto grid min-h-[300px] w-full max-w-[1600px] grid-cols-1 overflow-hidden rounded-[22px] bg-inverse text-inverse-text md:min-h-[350px] md:grid-cols-12 md:rounded-[28px]">
          <div className="relative z-10 flex flex-col justify-center p-6 md:col-span-7 md:p-10 lg:p-14"><span className="font-mono text-[9px] uppercase tracking-[0.15em] text-inverse-text/50">05 / Next project</span><h2 className="mt-5 font-heading text-[clamp(2.8rem,7vw,6.5rem)] font-medium uppercase leading-[0.86] tracking-[-0.055em]">{nextProject.title}</h2><p className="mt-4 max-w-md font-hoves text-sm leading-relaxed text-inverse-text/65">{nextProject.shortDescription}</p><span className="mt-7 inline-flex h-11 w-11 items-center justify-center rounded-full border border-inverse-text/25 text-accent transition-transform duration-300 group-hover:translate-x-1"><FaArrowRightLong /></span></div>
          <div className="relative min-h-[190px] overflow-hidden bg-inverse md:col-span-5 md:min-h-full"><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_70%,rgba(254,83,29,0.22),transparent_55%)]" /><img src={nextProject.previewImage || nextProject.heroImage} alt={nextProject.title + " project preview"} className="relative z-10 h-full max-h-[360px] w-full object-contain p-4 transition-transform duration-700 group-hover:scale-[1.025] md:p-6" loading="lazy" /><span className="absolute bottom-3 right-4 z-20 font-mono text-[8px] uppercase tracking-[0.12em] text-inverse-text/45">{nextProject.category}</span></div>
        </Link>
      </section>
    </main>
  );
}
