import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "../component/home/Hero";
import StudioStatement from "../component/home/StudioStatement";
import SelectedWork from "../component/home/SelectedWork";
import Services from "../component/home/Services";
import Process from "../component/home/Process";
import About from "../component/home/About";
import CTA from "../component/home/CTA";
import Footer from "../component/home/Footer";
import Intro from "../component/home/Intro";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return undefined;

    let secondFrame;
    const firstFrame = requestAnimationFrame(() => {
      window.lenis?.scrollTo(0, { immediate: true, force: true });

      secondFrame = requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (!target) return;

        ScrollTrigger.refresh();
        if (window.lenis) {
          window.lenis.scrollTo(target, {
            immediate: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          });
        } else {
          target.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
            block: "start",
          });
        }
        navigate(".", { replace: true, state: {} });
      });
    });

    return () => {
      cancelAnimationFrame(firstFrame);
      if (secondFrame) cancelAnimationFrame(secondFrame);
    };
  }, [location.key, location.state, navigate]);

  return (
    <>
      <Intro />
      <Hero />
      <StudioStatement />
      <SelectedWork />
      <Services />
      <Process />
      <About />
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
