import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

/**
 * Lightweight intro loader: an SVG logo stroke-draw + wordmark.
 * Automatically bypassed on mobile viewports (< 768px) and for users with
 * prefers-reduced-motion to guarantee instantaneous First Contentful Paint (FCP)
 * and Largest Contentful Paint (LCP) under Google's 2.5s bar.
 */
export function Loader() {
  const [done, setDone] = useState(() => {
    if (typeof window !== "undefined") {
      // Skip on mobile for instant LCP performance
      if (window.innerWidth < 768) return true;
    }
    return prefersReducedMotion();
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (done) return;
    const t1 = window.setTimeout(() => setLeaving(true), 400);
    const t2 = window.setTimeout(() => setDone(true), 650);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#07060F] transition-opacity duration-300 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Brand logo squircle with glowing aura */}
        <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[20px] border border-white/20 bg-[#121024] p-3 shadow-[0_0_40px_rgba(139,92,246,0.35)] ring-1 ring-white/10">
          <img
            src="/images/symbol-dark-2x.png"
            alt="GTMSip"
            width={52}
            height={52}
            className="h-full w-full object-contain"
          />
        </div>
        <img
          src="/images/logo-dark.svg"
          alt="GTMSip"
          className="h-6 w-auto"
        />
      </div>
    </div>
  );
}
