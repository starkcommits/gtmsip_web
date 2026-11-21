import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * Custom cursor: a small violet dot + a trailing ring that expands
 * over interactive elements. Disabled for touch pointers and
 * reduced-motion users.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let expanded = false;

    const INTERACTIVE =
      'a, button, [role="button"], summary, .magnetic, .card';
    const FORM_OR_MODAL =
      'input, textarea, select, [contenteditable="true"], [role="dialog"], .modal';

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      const target = e.target as Element | null;
      const inFormOrModal = Boolean(target?.closest?.(FORM_OR_MODAL));
      if (inFormOrModal) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
        return;
      }
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      const hit = target?.closest?.(INTERACTIVE);
      const next = Boolean(hit);
      if (next !== expanded) {
        expanded = next;
        ring.classList.toggle("cursor-ring-expanded", next);
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (prefersReducedMotion()) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150] hidden motion-safe:block">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
