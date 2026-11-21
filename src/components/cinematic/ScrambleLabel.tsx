import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion, scrambleText } from "../../lib/motion";

/**
 * Section label that scramble-decodes into place when it enters the view
 * (terminal-style). Falls back to plain text under reduced motion.
 */
export function ScrambleLabel({
  text,
  className = "",
  children,
}: {
  text: string;
  className?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !played.current) {
            played.current = true;
            scrambleText(el, text, { duration: 0.65 });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span className={`eyebrow ${className}`}>
      {children}
      <span ref={ref} className="font-mono tracking-[0.14em]">
        {text}
      </span>
    </span>
  );
}
