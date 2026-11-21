import { useEffect } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * Global micro-interactions:
 *  - magnetic CTAs (data-magnetic)
 *  - pointer-tracking spotlight glow on .card elements
 *  - subtle 3D tilt on .card-tilt elements (desktop only)
 *  - count-up on [data-countup] numbers entering the viewport
 * All transform/opacity only. Disabled under reduced motion.
 */
export function MicroInteractions() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const cleanups: (() => void)[] = [];

    /* ---- magnetic buttons ---- */
    if (fine) {
      const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
      const onMove = (e: PointerEvent) => {
        for (const el of magnets) {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const radius = Math.max(rect.width, rect.height) * 0.9 + 40;
          if (dist < radius) {
            const strength = 1 - dist / radius;
            el.style.transform = `translate3d(${dx * 0.22 * strength}px, ${dy * 0.3 * strength}px, 0)`;
          } else if (el.style.transform) {
            el.style.transform = "";
          }
        }
      };
      const onLeave = () => {
        for (const el of magnets) el.style.transform = "";
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerleave", onLeave);
      });
    }

    /* ---- spotlight + tilt on cards ---- */
    if (fine && desktop) {
      const onMove = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest?.(".card") as HTMLElement | null;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--spot-x", `${px}%`);
        card.style.setProperty("--spot-y", `${py}%`);
        card.classList.add("card-spot");
        if (card.classList.contains("card-tilt")) {
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
          card.style.setProperty("--tilt-x", `${rx}deg`);
          card.style.setProperty("--tilt-y", `${ry}deg`);
        }
      };
      const onOut = (e: PointerEvent) => {
        const card = (e.target as Element | null)?.closest?.(".card") as HTMLElement | null;
        if (card) {
          card.classList.remove("card-spot");
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
        }
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerout", onOut, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerout", onOut);
      });
    }

    /* ---- count-up ---- */
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-countup]"));
    if (counters.length) {
      const animate = (el: HTMLElement) => {
        const target = Number(el.dataset.countup);
        if (!Number.isFinite(target)) return;
        const decimals = Number(el.dataset.countupDecimals ?? 0);
        const prefix = el.dataset.countupPrefix ?? "";
        const suffix = el.dataset.countupSuffix ?? "";
        const duration = 1100;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const value = (target * eased).toFixed(decimals);
          el.textContent = `${prefix}${value}${suffix}`;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              animate(entry.target as HTMLElement);
              observer.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.5 },
      );
      counters.forEach((el) => observer.observe(el));
      cleanups.push(() => observer.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
