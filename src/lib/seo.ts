import { useEffect } from "react";

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

interface PageMeta {
  title: string;
  description: string;
  /** Structured data object(s) injected as JSON-LD for this route */
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Sets document title, meta description, Open Graph tags and optional
 * JSON-LD structured data for the current route.
 */
export function usePageMeta({ title, description, jsonLd }: PageMeta) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);

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
  }, [title, description, ld]);
}
