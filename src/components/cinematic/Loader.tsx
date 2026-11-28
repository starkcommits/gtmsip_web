import { useEffect, useState } from "react";
import { prefersReducedMotion } from "../../lib/motion";

const SESSION_KEY = "gtmsip_loader_shown";

export function Loader() {
  const [done, setDone] = useState(() => {
    if (typeof window !== "undefined") {
      // Skip on mobile for instant LCP performance
      if (window.innerWidth < 768) return true;
      // Skip if already shown in the current browsing session
      if (sessionStorage.getItem(SESSION_KEY)) return true;
    }
    return prefersReducedMotion();
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (done) return;
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}

    // Streamlined timings: keeps premium entrance without artificially penalizing FCP/LCP
    const t1 = window.setTimeout(() => setLeaving(true), 140);
    const t2 = window.setTimeout(() => setDone(true), 320);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [done]);

  if (done) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#07060F] transition-opacity duration-200 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[20px] border border-white/20 bg-[#121024] p-3 shadow-[0_0_40px_rgba(139,92,246,0.35)] ring-1 ring-white/10">
          <img
            src="/images/symbol-dark-2x.png"
            alt=""
            width={52}
            height={52}
            className="h-full w-full object-contain"
          />
        </div>
        <img
          src="/images/logo-dark.svg"
          alt="GTMSip"
          width={120}
          height={24}
          className="h-6 w-auto"
        />
      </div>
    </div>
  );
}
