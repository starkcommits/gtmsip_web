import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** One consistent easing language for the whole site. */
export const EASE = {
  out: "power3.out",
  inOut: "expo.inOut",
  soft: "power2.out",
} as const;

export { gsap, ScrollTrigger };

/** True when the user prefers reduced motion (SSR-safe). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on coarse-pointer / small screens — used to simplify the cinematic scenes. */
export function isMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 767px)").matches;
}

/**
 * Scramble-decode a label into place (terminal-style).
 * Calls `onDone` when the real text is settled.
 */
export function scrambleText(
  el: HTMLElement,
  finalText: string,
  options: { duration?: number; fps?: number } = {},
): () => void {
  const { duration = 0.7, fps = 30 } = options;
  const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&<>/";
  const totalFrames = Math.max(1, Math.round(duration * fps));
  let frame = 0;
  let raf = 0;
  let last = 0;

  const tick = (now: number) => {
    if (now - last < 1000 / fps) {
      raf = requestAnimationFrame(tick);
      return;
    }
    last = now;
    frame += 1;
    const progress = Math.min(1, frame / totalFrames);
    const reveal = Math.floor(progress * finalText.length);
    let out = "";
    for (let i = 0; i < finalText.length; i += 1) {
      const ch = finalText[i];
      if (i < reveal || ch === " ") out += ch;
      else out += glyphs[(Math.random() * glyphs.length) | 0];
    }
    el.textContent = out;
    if (progress < 1) raf = requestAnimationFrame(tick);
    else el.textContent = finalText;
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
