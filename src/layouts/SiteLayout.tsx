import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NetworkCanvas } from "../components/cinematic/NetworkCanvas";
import { Loader } from "../components/cinematic/Loader";
import { Cursor } from "../components/cinematic/Cursor";
import { ScrollChrome } from "../components/cinematic/ScrollChrome";
import { MicroInteractions } from "../components/cinematic/MicroInteractions";
import { scrollToY, useSmoothScroll } from "../lib/lenis";
import { ScrollTrigger } from "../lib/motion";
import { trackPageView } from "../lib/analytics";

// Lazy-load modal to avoid downloading modal dialogs & form schemas on initial load
const WaitlistModal = lazy(() =>
  import("../components/WaitlistModal").then((m) => ({ default: m.WaitlistModal })),
);

/** Scrolls to top on route change; honours #hash targets; tracks SPA pageviews. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    trackPageView(pathname);

    if (hash) {
      const id = hash.slice(1);
      const timer = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          scrollToY(top, false);
        } else {
          scrollToY(0, true);
        }
        ScrollTrigger.refresh();
      }, 100);
      return () => window.clearTimeout(timer);
    }
    scrollToY(0, true);
    window.scrollTo(0, 0);
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export function SiteLayout() {
  useSmoothScroll();

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip w-full">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Loader />
      <NetworkCanvas />
      <Cursor />
      <MicroInteractions />
      <Navbar />
      <Suspense fallback={null}>
        <WaitlistModal />
      </Suspense>
      <ScrollChrome />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
