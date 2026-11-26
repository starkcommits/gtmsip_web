declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const GTM_ID = "GTM-PSDQTD5B";
export const GA_MEASUREMENT_ID = "G-DB39Z0E2EF";

/**
 * Tracks a pageview in Google Analytics (GA4) and Google Tag Manager (GTM).
 * Automatically invoked on React Router route changes for complete Single Page Application (SPA) tracking.
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  if (typeof window === "undefined") return;

  const title = pageTitle || document.title;
  const location = window.location.href;

  // 1. GA4 gtag page_view event
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: location,
      page_path: pagePath,
      send_to: GA_MEASUREMENT_ID,
    });
  }

  // 2. GTM dataLayer virtual page_view event
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: "page_view",
      page_path: pagePath,
      page_title: title,
      page_location: location,
    });
  }
}

/**
 * Tracks custom interaction & conversion events (e.g. generate_lead, click_cta)
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }
}
