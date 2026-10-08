import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  { number: "01", title: "Design + Frontend", description: "Modern interfaces with clean, intentional design.", detail: "Interfaces · React · GSAP" },
  { number: "02", title: "Full-Stack", description: "End-to-end development for real-world products.", detail: "Node · APIs · MongoDB" },
  { number: "03", title: "AI + Data", description: "Thoughtful applications shaped by modern technology.", detail: "Python · AI · Workflows" },
];

const About = () => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const objectRef = useRef(null);
  const statementRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      gsap.set(panelRef.current, { opacity: 0, scale: 0.98 });
      gsap.set(objectRef.current, { opacity: 0, scale: 0.94, y: 18 });
      gsap.set(statementRef.current, { opacity: 0, y: 28 });
      gsap.set(descriptionRef.current, { opacity: 0, y: 18 });
      gsap.set(cards, { opacity: 0, y: 48 });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });

      timeline
        .to(panelRef.current, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" })
        .to(objectRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.5")
        .to(statementRef.current, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.55")
        .to(cards, { opacity: 1, y: 0, duration: 0.75, stagger: 0.12, ease: "power3.out" }, "-=0.3")
        .to(descriptionRef.current, { opacity: 1, y: 0, duration: 0.65, ease: "power2.out" }, "-=0.35");

      gsap.to(objectRef.current, {
        y: -14,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" aria-labelledby="about-heading" className="relative w-full overflow-hidden bg-background px-4 py-16 md:px-[4vw] md:py-24 lg:py-28">
      <div ref={panelRef} className="relative mx-auto min-h-[680px] w-full max-w-[1680px] overflow-hidden rounded-[24px] border border-border bg-surface px-6 py-10 shadow-[0_24px_80px_rgba(26,25,24,0.06)] md:min-h-[620px] md:rounded-[32px] md:px-10 md:py-12 lg:min-h-[660px] lg:px-[5vw] lg:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_52%,rgba(254,83,29,0.12),transparent_34%),linear-gradient(120deg,rgba(255,255,255,0.45),transparent_55%)]" />
        <div className="relative z-10 grid min-h-[600px] grid-cols-1 content-between gap-12 md:min-h-[540px] lg:min-h-[550px] lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="mb-7 flex items-center gap-4">
              <span className="section-label text-text-primary">05 / ABOUT</span>
              <span className="h-px w-12 bg-accent/70 md:w-20" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">Independent digital studio</span>
            </div>
            <h2 ref={statementRef} id="about-heading" className="max-w-[780px] font-heading text-[clamp(3.2rem,7.4vw,7.6rem)] font-medium leading-[0.91] tracking-[-0.06em] text-text-primary">A Design-Driven Developer.</h2>
            <p ref={descriptionRef} className="mt-7 max-w-[510px] font-hoves text-base leading-[1.65] text-text-secondary md:ml-[6vw] md:mt-9 md:text-lg lg:ml-[8vw]">We are a small digital studio turning ambitious ideas into thoughtful digital products. From distinctive websites to full-stack applications, we bring design, engineering and modern technology together.</p>
            <a href="#contact" className="group mt-7 inline-flex items-center gap-4 rounded-full bg-inverse px-6 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-inverse-text transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:ml-[6vw] lg:ml-[8vw]">More about me <span className="text-accent transition-transform duration-300 group-hover:translate-x-1">→</span></a>
          </div>

          <div className="relative min-h-[460px] lg:col-span-5 lg:min-h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center lg:translate-x-4">
              <div ref={objectRef} className="absolute h-[330px] w-[260px] rotate-[-13deg] rounded-[42%_58%_52%_48%] bg-inverse shadow-[0_35px_70px_rgba(26,25,24,0.22)] md:h-[390px] md:w-[310px] lg:h-[420px] lg:w-[340px]" />
              <div className="absolute h-[280px] w-[220px] rotate-[21deg] rounded-[48%_52%_43%_57%] bg-[radial-gradient(ellipse_at_75%_65%,rgba(254,83,29,0.95),rgba(254,83,29,0.34)_27%,transparent_61%)] blur-[10px] md:h-[340px] md:w-[270px] lg:h-[370px] lg:w-[300px]" />
              <div className="absolute h-[420px] w-[290px] rotate-[-24deg] rounded-[50%] border border-accent/60 md:h-[490px] md:w-[360px] lg:h-[520px] lg:w-[390px]" />
              <div className="absolute right-[10%] top-[16%] h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_rgba(254,83,29,0.8)]" />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col justify-center gap-4 py-8 md:gap-5 lg:py-6">
              {capabilities.map((capability, index) => (
                <article key={capability.number} ref={(element) => { cardsRef.current[index] = element; }} className={"group relative w-[min(88%,390px)] rounded-[18px] border border-border bg-surface/95 p-5 shadow-[0_16px_38px_rgba(26,25,24,0.14)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_46px_rgba(26,25,24,0.18)] md:p-6 " + (index === 1 ? "self-end" : index === 2 ? "self-center lg:ml-8" : "self-start")}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className={index === 0 ? "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground" : "mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-muted text-text-primary"}>{index === 0 ? "✳" : index === 1 ? "◇" : "◉"}</span>
                      <div><h3 className="font-hoves text-base font-medium text-text-primary md:text-lg">{capability.title}</h3><p className="mt-1 max-w-[260px] font-hoves text-xs leading-relaxed text-text-secondary md:text-sm">{capability.description}</p></div>
                    </div>
                    <span className="font-mono text-[9px] text-text-muted">{capability.number}</span>
                  </div>
                  <div className="mt-4 border-t border-border pt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-text-muted md:text-[9px]">{capability.detail}</div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
