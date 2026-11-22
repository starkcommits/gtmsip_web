import {
  usePageMeta,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildFaqSchema,
} from "../lib/seo";
import { Hero, TrustStrip } from "../sections/Hero";
import { FeaturePillars } from "../sections/FeaturePillars";
import { CommentToDmWalkthrough } from "../sections/Walkthrough";
import {
  HomeFaq,
  PlanTeaser,
  SecuritySummary,
  TeamsBento,
} from "../sections/HomeSections";
import { CtaBand } from "../components/ui";
import { HOME_FAQ } from "../data/faq";

export default function HomePage() {
  usePageMeta({
    title: "AI Sales & Marketing Automation Platform | GTMSip",
    description:
    "Automate sales, marketing, lead generation and customer engagement with GTMSip. AI workflows, Firecrawl lead scraping, Claude MCP, and shared WhatsApp & Instagram inbox.",
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
        "AI sales and marketing automation platform with Firecrawl lead scraping, Google plugins for data scraping and storage, Claude MCP integration, AI workflows, and a shared WhatsApp and Instagram inbox built on official Meta business APIs.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Early access waitlist",
        },
        featureList: [
          "Firecrawl-powered lead scraping",
          "Google plugins for scraping and storing data",
          "Claude MCP endpoint and AI workflows",
          "Shared WhatsApp and Instagram inbox",
          "Instagram comment-to-DM automation",
          "Broadcasts and drip flows",
          "Deal pipelines with Razorpay payment links",
          "Multi-brand workspaces and role-based access",
          "Webhooks, REST API and MCP endpoint",
        ],
      },
      buildFaqSchema(HOME_FAQ),
    ],
  });

  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturePillars />
      <CommentToDmWalkthrough />
      <PlanTeaser />
      <TeamsBento />
      <SecuritySummary />
      <HomeFaq />
      <div className="section">
        <CtaBand />
      </div>
    </>
  );
}
