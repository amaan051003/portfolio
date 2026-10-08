import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const contactLinks = {
  email: "amaankhan@06043@gmail.com",
  instagram: "amaankhan__05",
  linkedin: "Amaan Khan",
};

const CTA = () => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const labelRef = useRef(null);
  const headingRef = useRef(null);
  const subheadRef = useRef(null);
  const contactRowsRef = useRef([]);
  const objectRef = useRef(null);
  const geometryRef = useRef(null);

  useEffect(() => {
    const elements = [labelRef.current, headingRef.current, subheadRef.current, ...contactRowsRef.current, objectRef.current];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(elements, { clearProps: "all" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(panelRef.current, { opacity: 0, scale: 0.985 });
      gsap.set(labelRef.current, { opacity: 0, y: 12 });
      gsap.set(headingRef.current, { yPercent: 105 });
      gsap.set(subheadRef.current, { opacity: 0, y: 16 });
      gsap.set(contactRowsRef.current, { opacity: 0, y: 15 });
      gsap.set(objectRef.current, { opacity: 0, y: 36, scale: 0.96 });
      gsap.set(geometryRef.current, { opacity: 0, scale: 0.96 });

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
      });
      timeline
        .to(panelRef.current, { opacity: 1, scale: 1, duration: 0.65, ease: "power2.out" })
        .to(labelRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.25")
        .to(headingRef.current, { yPercent: 0, duration: 0.8, ease: "power3.out" }, "-=0.2")
        .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.35")
        .to(contactRowsRef.current, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.25")
        .to(objectRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: "power3.out" }, "-=0.2")
        .to(geometryRef.current, { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const addContactRowRef = (element) => {
    if (element && !contactRowsRef.current.includes(element)) contactRowsRef.current.push(element);
  };

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-heading" className="relative w-full overflow-hidden bg-background px-4 py-14 md:px-[4vw] md:py-20 lg:py-24">
      <div ref={panelRef} className="relative mx-auto min-h-[660px] w-full max-w-[1680px] overflow-hidden rounded-[24px] bg-accent px-6 py-8 text-inverse shadow-[0_28px_80px_rgba(26,25,24,0.12)] md:min-h-[580px] md:rounded-[32px] md:px-10 md:py-10 lg:min-h-[600px] lg:px-[4vw] lg:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_74%_35%,rgba(255,255,255,0.24),transparent_36%),linear-gradient(130deg,rgba(255,255,255,0.14),transparent_54%)]" />
        <div ref={geometryRef} aria-hidden="true" className="pointer-events-none absolute -right-20 -top-32 h-[460px] w-[460px] rounded-full border border-white/30 md:-right-12 md:top-[-180px] md:h-[680px] md:w-[680px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 right-[5%] h-[360px] w-[360px] rounded-full border border-white/35 md:-bottom-60 md:right-[18%] md:h-[560px] md:w-[560px]" />

        <div className="relative z-10 grid min-h-[580px] grid-cols-1 content-between gap-12 md:min-h-[500px] lg:min-h-[500px] lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div ref={labelRef} className="mb-8 flex items-center gap-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-inverse/80 md:text-xs">06 / Get in touch</span>
              <span className="h-px w-12 bg-inverse/40 md:w-20" />
            </div>
            <div className="overflow-hidden pb-2">
              <h2 ref={headingRef} id="contact-heading" className="font-heading text-[clamp(4.6rem,13vw,12rem)] font-medium uppercase leading-[0.79] tracking-[-0.07em] text-inverse">Let’s talk.</h2>
            </div>
            <p ref={subheadRef} className="mt-7 max-w-[460px] font-hoves text-base leading-[1.45] text-inverse/90 md:mt-9 md:text-xl lg:text-2xl">Let’s build something worth building.</p>
            <a ref={objectRef} href={"mailto:" + contactLinks.email} className="group mt-8 inline-flex min-h-[58px] items-center justify-between gap-12 rounded-[14px] bg-inverse px-6 py-4 font-mono text-[10px] uppercase tracking-[0.14em] text-inverse-text shadow-[0_16px_32px_rgba(26,25,24,0.18)] transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-inverse md:mt-10 md:min-w-[250px] md:px-7">
              Start a project <span className="text-accent transition-transform duration-300 group-hover:translate-x-1"><FaArrowRightLong /></span>
            </a>
          </div>

          <div className="flex flex-col justify-end lg:col-span-4 lg:col-start-9 lg:pb-2">
            <div className="flex flex-col">
              <a ref={addContactRowRef} href={"mailto:" + contactLinks.email} className="group flex items-center justify-between gap-3 border-b border-inverse/25 py-4 text-inverse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverse">
                <span><span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-inverse/60">Email</span><span className="mt-1 block break-all font-hoves text-base md:text-lg">{contactLinks.email}</span></span>
                <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a ref={addContactRowRef} href={contactLinks.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 border-b border-inverse/25 py-4 text-inverse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverse">
                <span><span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-inverse/60">Instagram</span><span className="mt-1 block font-hoves text-base md:text-lg">@{contactLinks.instagram}</span></span>
                <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a ref={addContactRowRef} href={contactLinks.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 border-b border-inverse/25 py-4 text-inverse focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverse">
                <span><span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-inverse/60">LinkedIn</span><span className="mt-1 block font-hoves text-base md:text-lg">{contactLinks.linkedin}</span></span>
                <FiArrowUpRight className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
