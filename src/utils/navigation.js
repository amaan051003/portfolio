const getScrollOptions = () => ({
  immediate: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

export const scrollToSection = (id, navigate, pathname) => {
  if (pathname !== "/") {
    window.lenis?.scrollTo(0, { immediate: true, force: true });
    navigate("/", { state: { scrollTo: id } });
    return;
  }

  const element = document.getElementById(id);
  if (!element) return;

  if (window.lenis) {
    window.lenis.scrollTo(element, getScrollOptions());
  } else {
    element.scrollIntoView({
      behavior: getScrollOptions().immediate ? "instant" : "smooth",
      block: "start",
    });
  }
};
