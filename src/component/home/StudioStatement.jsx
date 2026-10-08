import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StudioStatement = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(textRef.current.querySelectorAll(".statement-line"), { opacity: 1 });
      return;
    }

    let ctx = gsap.context(() => {
      const lines = textRef.current.querySelectorAll('.statement-line');

      lines.forEach((line) => {
        gsap.to(line, {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="w-full min-h-[60vh] md:min-h-[80vh] flex flex-col justify-center py-24 mx-auto max-w-[1680px] px-5 md:px-10 lg:px-12 bg-background"
    >
      <div className="w-full max-w-[1360px] flex flex-col items-start">
        <div className="mb-8 md:mb-16">
          <span className="section-label text-accent">01 / STUDIO</span>
        </div>
        
        <h2 
          ref={textRef} 
          className="font-heading font-medium text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.05] tracking-tight text-text-primary"
        >
          <span className="statement-line block opacity-30">We turn ideas into</span>
          <span className="statement-line block opacity-30">thoughtful</span>
          <span className="statement-line block opacity-30">digital experiences — from</span>
          <span className="statement-line block opacity-30">standout</span>
          <span className="statement-line block opacity-30 text-text-secondary">websites to powerful web</span>
          <span className="statement-line block opacity-30 text-text-secondary">applications.</span>
        </h2>
      </div>
    </section>
  );
};

export default StudioStatement;
