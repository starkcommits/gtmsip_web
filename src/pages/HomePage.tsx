import { lazy, Suspense } from "react";
import {
  usePageMeta,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildFaqSchema,
} from "../lib/seo";
import { Hero, TrustStrip } from "../sections/Hero";
import { CtaBand } from "../components/ui";
import { HOME_FAQ } from "../data/faq";

// Synchronous above-the-fold critical content (Hero + TrustStrip) guarantees instant LCP
// Lazy load below-the-fold sections to slice ~105 KB of JavaScript from initial main-thread execution
const FeaturePillars = lazy(() =>
  import("../sections/FeaturePillars").then((m) => ({ default: m.FeaturePillars })),
);
const CommentToDmWalkthrough = lazy(() =>
  import("../sections/Walkthrough").then((m) => ({ default: m.CommentToDmWalkthrough })),
);
const PlanTeaser = lazy(() =>
  import("../sections/HomeSections").then((m) => ({ default: m.PlanTeaser })),
);
const TeamsBento = lazy(() =>
  import("../sections/HomeSections").then((m) => ({ default: m.TeamsBento })),
);
const SecuritySummary = lazy(() =>
  import("../sections/HomeSections").then((m) => ({ default: m.SecuritySummary })),
);
const HomeFaq = lazy(() =>
  import("../sections/HomeSections").then((m) => ({ default: m.HomeFaq })),
);

export default function HomePage() {
  usePageMeta({
    title: "AI Sales & Marketing Automation Platform | GTMSip",
    description:
      "Automate sales, marketing, lead generation and customer engagement with GTMSip. AI sales automation software, B2B lead generation software, and WhatsApp marketing automation with Claude MCP and official Meta business APIs.",
    canonicalUrl: "/",
    jsonLd: [
      ORGANIZATION_SCHEMA,
      WEBSITE_SCHEMA,
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "GTMSip",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "AI sales automation software and marketing automation platform with Firecrawl lead scraping, Google plugins for data scraping and storage, Claude MCP integration, AI workflows, and a shared WhatsApp and Instagram inbox built on official Meta business APIs.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Early access waitlist",
        },
        featureList: [
          "AI sales automation software with Claude MCP workflows",
          "B2B lead generation software powered by Firecrawl",
          "WhatsApp marketing automation software with official Meta APIs",
          "Google plugins for scraping and storing data in Sheets and Drive",
          "Shared WhatsApp and Instagram team inbox with CRM tags",
          "Instagram comment-to-DM lead automation",
          "Broadcasts and automated multi-step drip flows",
          "Deal pipelines with in-chat Razorpay payment links",
          "Multi-brand workspaces and role-based access",
          "Signed webhooks, REST API and Claude MCP endpoint",
        ],
      },
      buildFaqSchema(HOME_FAQ),
    ],
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <FeaturePillars />
        <CommentToDmWalkthrough />
        <PlanTeaser />
        <TeamsBento />
        <SecuritySummary />
        <HomeFaq />
        <div className="section">
          <CtaBand />
        </div>
      </Suspense>
    </>
  );
}
