import { usePageMeta } from "../lib/seo";
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
    title: "GTMSip — AI-Driven Sales & Social Platform",
    description:
      "GTMSip is the AI-driven sales and social platform: Firecrawl lead scraping, Google plugins for scraping and storing data, Claude MCP and AI workflows — plus a shared WhatsApp & Instagram inbox, CRM pipelines and Razorpay payment links.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "GTMSip",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description:
          "AI-driven sales and social platform with Firecrawl lead scraping, Google plugins for data scraping and storage, Claude MCP integration, AI workflows, and a shared WhatsApp and Instagram inbox built on official Meta business APIs.",
        offers: {
          "@type": "Offer",
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "INR",
            description: "Pricing pending — [Price TBD]",
          },
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
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: HOME_FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
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
