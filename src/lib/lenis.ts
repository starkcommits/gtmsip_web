import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

let lenisInstance: Lenis | null = null;

/** Smooth inertial scrolling (Lenis) wired into the GSAP ticker. */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisInstance = lenis;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}

/** Programmatic scroll that respects Lenis when active. */
export function scrollToY(target: number, immediate = false) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { immediate, duration: immediate ? 0 : 1.1 });
  } else {
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  }
}
