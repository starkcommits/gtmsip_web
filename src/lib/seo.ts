import { useEffect } from "react";

const SITE_URL = "https://gtmsip.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;
const SITE_NAME = "GTMSip";

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string,
) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageMetaOptions {
  title: string;
  description: string;
  /** Relative path (e.g. '/features') or absolute canonical URL */
  canonicalUrl?: string;
  /** OG type: website (default) or article */
  ogType?: "website" | "article";
  /** Custom OG image URL */
  ogImage?: string;
  /** Set to true for private, error, or unindexable routes */
  noindex?: boolean;
  /** Structured data object(s) injected as JSON-LD for this route */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Builds standard Schema.org BreadcrumbList JSON-LD
 */
  export function buildBreadcrumbsSchema(items: BreadcrumbItem[]) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
      })),
    };
  }

  /**
   * Builds standard Schema.org FAQPage JSON-LD
   */
  export function buildFaqSchema(faqs: FaqItem[]) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  }

  /**
   * Global Organization schema for GTMSip
   */
  export const ORGANIZATION_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "GTMSip",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-256.png`,
    description:
      "AI-driven sales and social automation platform connecting Firecrawl lead scraping, Claude MCP workflows, and shared WhatsApp & Instagram inboxes.",
    sameAs: [
      "https://twitter.com/gtmsip",
      "https://www.linkedin.com/company/gtmsip",
    ],
  };

  /**
   * Global WebSite schema for GTMSip
   */
  export const WEBSITE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "GTMSip",
    description:
      "AI sales & marketing automation platform for lead scraping, WhatsApp CRM, and Instagram social selling.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  /**
   * Sets document title, canonical link, meta description, robots directive,
   * Open Graph, Twitter cards, and JSON-LD structured data for the current route.
   */
  export function usePageMeta({
    title,
    description,
    canonicalUrl,
    ogType = "website",
    ogImage = DEFAULT_OG_IMAGE,
    noindex = false,
    jsonLd,
  }: PageMetaOptions) {
    const currentPath =
      typeof window !== "undefined" ? window.location.pathname : "";
    const absoluteCanonical = canonicalUrl
      ? canonicalUrl.startsWith("http")
        ? canonicalUrl
        : `${SITE_URL}${canonicalUrl}`
      : `${SITE_URL}${currentPath === "/" ? "" : currentPath}`;

    const absoluteOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

    const ld = jsonLd ? JSON.stringify(jsonLd) : null;

    useEffect(() => {
      // 1. Primary Title & Description
      document.title = title;
      upsertMeta("name", "description", description);

      // 2. Canonical URL
      upsertLink("canonical", absoluteCanonical);

      // 3. Robots
      upsertMeta(
        "name",
        "robots",
        noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      );

      // 4. Open Graph
      upsertMeta("property", "og:title", title);
      upsertMeta("property", "og:description", description);
      upsertMeta("property", "og:url", absoluteCanonical);
      upsertMeta("property", "og:type", ogType);
      upsertMeta("property", "og:image", absoluteOgImage);
      upsertMeta("property", "og:image:alt", title);
      upsertMeta("property", "og:site_name", SITE_NAME);
      upsertMeta("property", "og:locale", "en_US");

      // 5. Twitter / X Cards
      upsertMeta("name", "twitter:card", "summary_large_image");
      upsertMeta("name", "twitter:title", title);
      upsertMeta("name", "twitter:description", description);
      upsertMeta("name", "twitter:image", absoluteOgImage);
      upsertMeta("name", "twitter:image:alt", title);

      // 6. JSON-LD structured data
      const existing = document.getElementById("route-jsonld");
      if (existing) existing.remove();

      if (ld) {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "route-jsonld";
        script.textContent = ld;
        document.head.appendChild(script);
      }

      return () => {
        const node = document.getElementById("route-jsonld");
        if (node) node.remove();
      };
  }, [
    title,
    description,
    absoluteCanonical,
    ogType,
    absoluteOgImage,
    noindex,
    ld,
  ]);
}
