import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

const SECTIONS = [
  { id: "hero", label: "Intro" },
  { id: "pillars", label: "Product" },
  { id: "walkthrough", label: "Comment→DM" },
  { id: "plan", label: "Plan & Publish" },
  { id: "teams", label: "Teams" },
  { id: "security", label: "Security" },
  { id: "faq", label: "FAQ" },
  { id: "cta", label: "Demo" },
];

/**
 * Thin scroll-progress bar (under the navbar) + a section indicator
 * pinned to the right edge of the viewport (desktop only).
 * Uses passive scroll events with RAF debouncing to eliminate forced reflows.
 */
export function ScrollChrome() {
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window === "undefined" || window.innerWidth < 1024) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const innerHeight = window.innerHeight;
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? scrollY / max : 0;

        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
        }
        setVisible(scrollY > innerHeight * 0.6);

        // active section = last section whose top passed the midpoint
        const mid = scrollY + innerHeight * 0.4;
        let current = SECTIONS[0].id;
        for (const s of SECTIONS) {
          const el = document.getElementById(s.id);
          if (el && el.offsetTop <= mid) current = s.id;
        }
        setActive((prev) => (prev === current ? prev : current));
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* progress bar under navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent"
      >
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
        />
      </div>

      {/* right-edge section indicator */}
      <nav
        aria-label="Section indicator"
        className={`fixed right-4 top-1/2 z-[55] hidden -translate-y-1/2 flex-col items-end gap-2.5 transition-opacity duration-500 xl:flex ${
          visible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(s.id)}
              className="group flex items-center gap-2.5"
              aria-current={isActive ? "true" : undefined}
            >
              <span
                className={`font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 text-brand-400 opacity-100"
                    : "translate-x-1 text-stone-600 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-stone-400"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`h-px transition-all duration-300 ${
                  isActive
                    ? "w-7 bg-brand-400 shadow-[0_0_8px_rgba(139,92,246,0.9)]"
                    : "w-3.5 bg-stone-400/60 group-hover:w-5 group-hover:bg-brand-400/70 dark:bg-stone-500"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
