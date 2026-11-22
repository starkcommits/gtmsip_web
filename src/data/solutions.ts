import type { PreviewKey } from "./features";
import type { FaqItem } from "../lib/seo";

export interface SolutionCapability {
  title: string;
  description: string;
  benefit: string;
}

export interface SolutionUseCase {
  title: string;
  target: string;
  workflow: string;
  result: string;
}

export interface SolutionDetail {
  slug: string;
  title: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  heroHeadline: string;
  heroTagline: string;
  preview: PreviewKey;
  overview: string[];
  capabilities: SolutionCapability[];
  useCases: SolutionUseCase[];
  faqs: FaqItem[];
  relatedFeatureSlug: string;
}

export const SOLUTIONS: SolutionDetail[] = [
  {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing Software & Business Automation",
    eyebrow: "WhatsApp Marketing Solution",
    metaTitle: "WhatsApp Marketing Software & Business Automation | GTMSip",
    metaDescription:
      "Scale WhatsApp marketing with official Meta Business APIs. Send template broadcasts, run automated drip sequences, route conversations to a shared inbox, and close sales.",
    primaryKeyword: "WhatsApp marketing software",
    secondaryKeywords: [
      "WhatsApp automation",
      "WhatsApp business automation",
      "WhatsApp broadcast software",
      "WhatsApp CRM",
      "automated WhatsApp follow up",
    ],
    heroHeadline: "Convert More Customers with Compliant WhatsApp Marketing",
    heroTagline:
      "Run targeted broadcasts, automated drip campaigns, and responsive sales conversations from a single collaborative shared inbox — fully compliant with official Meta Business APIs.",
    preview: "inbox",
    overview: [
      "WhatsApp delivers up to 98% open rates and 45% click-through rates, making it the most immediate channel to engage modern buyers. However, managing customer chats across multiple personal phones leads to dropped leads, slow responses, and compliance risks.",
      "GTMSip provides an enterprise-ready WhatsApp marketing and sales workspace built directly on Meta's official Cloud API. You can broadcast approved marketing templates to opted-in audiences, trigger intelligent multi-step drip flows, and empower your entire team with a unified shared inbox equipped with collision detection, CRM deal pipelines, and in-chat Razorpay payment links.",
    ],
    capabilities: [
      {
        title: "Official Meta Business Cloud API",
        description:
          "Connect your verified WhatsApp Business phone number directly through official Meta channels. No third-party scrapers, unofficial QR connections, or risk of account bans.",
        benefit: "100% compliant, reliable delivery at enterprise scale.",
      },
      {
        title: "Template Broadcasts & Smart Segmentation",
        description:
          "Compose and schedule pre-approved template messages to targeted customer segments. Automatically filter out past opt-outs and track delivery, read, and reply rates.",
        benefit: "Personalized outreach without manual broadcast lists.",
      },
      {
        title: "Multi-Step Automated Drip Flows",
        description:
          "Build visual nurturing sequences that react to user engagement. If a lead clicks or replies, route them dynamically to human agents or send timely reminders.",
        benefit: "Nurture warm leads 24/7 without losing the human touch.",
      },
      {
        title: "Collaborative Shared Team Inbox",
        description:
          "Assign incoming WhatsApp chats to team members with round-robin or skill-based routing. See who is typing with collision detection and leave private internal notes.",
        benefit: "Zero duplicate replies and zero dropped sales conversations.",
      },
      {
        title: "In-Chat Razorpay Payment Links",
        description:
          "Generate and send secure payment links directly inside the WhatsApp conversation. Track transaction status live on your deal pipeline without tab switching.",
        benefit: "Shorten your sales cycle from inquiry to paid customer.",
      },
    ],
    useCases: [
      {
        title: "D2C Brands & E-commerce",
        target: "Direct-to-consumer online stores",
        workflow:
          "Send promotional broadcasts for new product launches, answer sizing questions in the shared inbox, and send payment links directly in chat.",
        result: "3.2x faster checkout turnaround and reduced cart abandonment.",
      },
      {
        title: "Education & Coaching Programs",
        target: "EdTech institutes, coaches, and webinar organizers",
        workflow:
          "Send automated webinar reminders, broadcast curriculum PDFs, and follow up with non-attendees via automated drip flows.",
        result: "Over 60% webinar show-up rate and seamless course enrollments.",
      },
      {
        title: "B2B Sales & Service Consultancies",
        target: "Agencies, clinics, and professional services",
        workflow:
          "Capture warm inquiries from ads, assign them instantly to available sales reps, and record notes on the contact's CRM card.",
        result: "Instant first-response time within the critical 5-minute window.",
      },
    ],
    faqs: [
      {
        question: "Does GTMSip use official WhatsApp APIs?",
        answer:
          "Yes. GTMSip connects strictly through the official Meta WhatsApp Business Cloud API. Your account credentials and phone numbers remain under your verified Meta Business Manager.",
      },
      {
        question: "How does GTMSip handle Meta's 24-hour customer service window?",
        answer:
          "Inside the 24-hour customer care window, agents can send free-form messages to assist the buyer. Outside the window, GTMSip restricts outbound messages to Meta-approved template messages to ensure full policy compliance.",
      },
      {
        question: "Can multiple team members manage the same WhatsApp number?",
        answer:
          "Yes. GTMSip's shared inbox allows multiple agents, managers, and administrators to view, claim, tag, and answer conversations on the same WhatsApp Business number simultaneously.",
      },
      {
        question: "Can I accept payments inside WhatsApp?",
        answer:
          "Yes. With GTMSip's Razorpay integration, agents can generate payment links with customized amounts and share them in chat. The deal status updates to 'Paid' in real time once completed.",
      },
    ],
    relatedFeatureSlug: "whatsapp-crm-inbox",
  },
  {
    slug: "ai-sales-automation",
    title: "AI Sales Automation Platform & Claude MCP Workflows",
    eyebrow: "AI Sales Automation",
    metaTitle: "AI Sales Automation Platform & Claude MCP Workflows | GTMSip",
    metaDescription:
      "Automate sales workflows with AI. Scrape leads, enrich contacts, score intent, connect Claude via MCP, and route deals to a human-in-the-loop pipeline.",
    primaryKeyword: "AI sales automation",
    secondaryKeywords: [
      "automated sales follow up",
      "Claude MCP sales tools",
      "AI lead generation and routing",
      "sales workflow automation",
      "AI sales assistant software",
    ],
    heroHeadline: "Automate Your Sales Pipeline from Scrape to Closed Deal",
    heroTagline:
      "Supercharge your team with Claude MCP integration, automated workflow chains, and AI lead enrichment — while keeping human approval in the loop for customer communication.",
    preview: "integrations",
    overview: [
      "Modern sales teams spend up to 70% of their working hours on administrative busywork: copying contacts between tools, researching prospects on LinkedIn, drafting repetitive emails, and manually advancing pipeline stages.",
      "GTMSip's AI sales automation platform automates these operational bottlenecks. With our native Claude Model Context Protocol (MCP) endpoint, your approved AI assistants can securely inspect deals, enrich contacts, and draft contextual responses. Every workflow runs with strict human-in-the-loop controls so your brand voice and messaging compliance stay protected.",
    ],
    capabilities: [
      {
        title: "Claude Model Context Protocol (MCP) Endpoint",
        description:
          "Give your AI assistants scoped, revocable access to leads, conversations, deals, and payment triggers via Claude MCP — without exposing unmonitored blanket API keys.",
        benefit: "Direct AI reasoning over your live sales data in real time.",
      },
      {
        title: "Automated Scrape → Enrich → Route Chains",
        description:
          "Connect triggers from web scrapers, inbound WhatsApp inquiries, or Instagram comments. The AI automatically enriches missing firmographics, calculates a lead score, and assigns an owner.",
        benefit: "Leads are qualified and prioritized before reps open their inbox.",
      },
      {
        title: "Human-in-the-Loop Safeguards",
        description:
          "AI drafts smart contextual replies and stages pipeline updates, but human sales reps approve outbound messages before they reach the customer.",
        benefit: "Combine AI speed with human discretion and brand safety.",
      },
      {
        title: "Signed Webhooks & Scoped REST APIs",
        description:
          "Trigger external automations, update your data warehouse, or push events to Slack and internal databases using HMAC-signed webhooks and scoped API keys.",
        benefit: "Integrates effortlessly into your existing enterprise stack.",
      },
    ],
    useCases: [
      {
        title: "B2B Outbound & Inbound Sales",
        target: "SaaS companies and commercial sales organizations",
        workflow:
          "Scraped target accounts are enriched with company size and tech stack, scored by AI, and handed over to account executives with pre-drafted personalized pitches.",
        result: "40% reduction in lead response time and double pipeline velocity.",
      },
      {
        title: "High-Volume Lead Qualification",
        target: "Recruitment, real estate, and finance agencies",
        workflow:
          "Inbound inquiries across WhatsApp and Instagram are parsed by AI workflows to assess budget and timeline before assigning to senior advisors.",
        result: "Zero time wasted by senior closers on unqualified prospects.",
      },
    ],
    faqs: [
      {
        question: "What is the Claude MCP endpoint in GTMSip?",
        answer:
          "The Model Context Protocol (MCP) is an open standard that enables AI models like Anthropic's Claude to read and execute actions in external software. GTMSip provides a pre-configured MCP endpoint so Claude can inspect your CRM pipeline, look up conversation history, and propose workflow actions safely.",
      },
      {
        question: "Will the AI send unapproved messages to customers?",
        answer:
          "No. GTMSip enforces human-in-the-loop approval by default for all customer-facing communications across WhatsApp and Instagram. AI drafts responses, which your teammates review and send with one click.",
      },
      {
        question: "Can I connect my own custom webhooks?",
        answer:
          "Yes. GTMSip supports outbound webhooks with HMAC-SHA256 signature verification and automatic retry with exponential backoff for high reliability.",
      },
    ],
    relatedFeatureSlug: "ai-workflows-mcp",
  },
  {
    slug: "lead-generation-software",
    title: "AI Lead Generation Software & Web Scraping Pipeline",
    eyebrow: "Lead Generation Solution",
    metaTitle: "AI Lead Generation Software & Web Scraping Pipeline | GTMSip",
    metaDescription:
      "Find and extract B2B leads from the web with Firecrawl, enrich data with AI, and sync directly to Google Sheets and your CRM pipeline.",
    primaryKeyword: "lead generation software",
    secondaryKeywords: [
      "AI lead generation",
      "B2B lead scraping",
      "automated lead enrichment",
      "Google Sheets lead database",
      "business lead finder",
    ],
    heroHeadline: "High-Intent B2B Lead Generation on Autopilot",
    heroTagline:
      "Extract structured company and contact data with Firecrawl, enrich and score leads with AI, and sync records into Google Sheets and your deal pipeline automatically.",
    preview: "pipeline",
    overview: [
      "Finding verified sales leads usually requires juggling multiple disconnected scrapers, costly enrichment databases, and brittle copy-paste spreadsheets.",
      "GTMSip unites high-performance web extraction, AI enrichment, and pipeline synchronization. With integrated Firecrawl capabilities, you can define your ideal customer profile (ICP) or input target domains. The engine extracts verified contacts, enriches them with AI research notes, and automatically syncs rows to Google Sheets, Drive, and your GTMSip deal stages.",
    ],
    capabilities: [
      {
        title: "Firecrawl Web Lead Scraping",
        description:
          "Transform public website directories, company pages, and search queries into clean, deduplicated prospect lists with names, roles, and verified contact channels.",
        benefit: "Eliminate manual data entry and fragile browser scraping extensions.",
      },
      {
        title: "Bi-Directional Google Sheets & Drive Sync",
        description:
          "Store your scraped lead lists automatically in Google Sheets. Update columns in Sheets or in GTMSip — data synchronizes across both platforms continuously.",
        benefit: "Keep data accessible where your sales team already collaborates.",
      },
      {
        title: "AI Lead Scoring & Research Briefs",
        description:
          "Before outreach begins, GTMSip analyzes the prospect's website and writes an executive research summary highlighting pain points and fit score.",
        benefit: "Reps start conversations armed with actionable background context.",
      },
      {
        title: "Direct-to-Pipeline Deal Ingestion",
        description:
          "Newly scraped leads immediately appear in your designated deal stages with source tags, contact ownership, and conversation-ready channels.",
        benefit: "Bridge the gap between raw data extraction and active sales outreach.",
      },
    ],
    useCases: [
      {
        title: "Agency Client Prospecting",
        target: "Marketing, branding, and development agencies",
        workflow:
          "Crawl local service directories or niche e-commerce categories, extract business owners, and push enriched lists to Google Sheets for cold outreach.",
        result: "Hundreds of verified industry leads generated in under 15 minutes.",
      },
      {
        title: "SaaS Account-Based Marketing",
        target: "B2B software founders and sales teams",
        workflow:
          "Target company websites using specific tech stacks, extract decision-maker contact details, and trigger AI personalized intro templates.",
        result: "Higher response rates through context-rich outreach notes.",
      },
    ],
    faqs: [
      {
        question: "How does Firecrawl scraping work in GTMSip?",
        answer:
          "Firecrawl extracts clean, structured data from public web pages without getting blocked by common scraping hurdles. You define the target criteria or URLs, and GTMSip organizes the output into structured contact records.",
      },
      {
        question: "Does GTMSip comply with data privacy regulations?",
        answer:
          "Yes. GTMSip is designed to scrape only publicly accessible business data and provides built-in audit trails, contact deduplication, and opt-out suppression.",
      },
      {
        question: "Can I export my leads into existing CRM software?",
        answer:
          "Yes. Leads can be exported to Google Sheets, downloaded as CSV, or synchronized via webhooks and REST APIs to HubSpot, Salesforce, or custom databases.",
      },
    ],
    relatedFeatureSlug: "lead-scraping-firecrawl",
  },
  {
    slug: "instagram-automation",
    title: "Instagram Comment-to-DM & Social Sales Automation",
    eyebrow: "Instagram Automation Solution",
    metaTitle: "Instagram Comment-to-DM & Social Sales Automation | GTMSip",
    metaDescription:
      "Turn Instagram comments into paying customers. Automate keyword replies on Reels, send instant private DMs, capture leads, and close deals in one shared inbox.",
    primaryKeyword: "Instagram comment to DM automation",
    secondaryKeywords: [
      "Instagram marketing automation",
      "social selling software",
      "Instagram lead generation",
      "Instagram DM inbox",
      "Instagram sales automation",
    ],
    heroHeadline: "Turn Post & Reel Comments into Direct Sales Conversations",
    heroTagline:
      "Automatically reply to keyword comments on your Instagram Reels and posts, trigger personalized private DMs, capture contact info, and manage conversations in a shared inbox.",
    preview: "commentDm",
    overview: [
      "Social media attention has a very short half-life. When an interested buyer comments 'PRICE', 'INFO', or 'LINK' on your Reel, delaying your reply by even an hour can destroy their buying intent.",
      "GTMSip's Instagram automation turns viral engagement into measurable pipeline. Set up keyword rules per post or across your entire feed: when a follower leaves a keyword comment, GTMSip posts an instant public reply and delivers a private direct message containing your link or discount. The follower is captured as a CRM contact, ready for immediate follow-up.",
    ],
    capabilities: [
      {
        title: "Keyword Comment-to-DM Triggers",
        description:
          "Define specific triggers like 'WORKBOOK', 'DISCOUNT', or 'JOIN'. GTMSip listens to comments on specific Reels or all live posts and triggers immediate action.",
        benefit: "Capture buyer intent at the exact second they interact with your content.",
      },
      {
        title: "Public Reply + Private Direct Message",
        description:
          "Rotate public replies under the post for social proof ('Sent you a DM! Check your inbox ✨'), while delivering the actual resource link privately.",
        benefit: "Boosts algorithmic post engagement while guiding followers to private sales.",
      },
      {
        title: "Official Meta Graph API Compliance",
        description:
          "Adheres strictly to Meta's rule: exactly one automated private reply per comment within a 24-hour interaction window. Never risks account shadowbans.",
        benefit: "Safeguard your Instagram business account and brand reputation.",
      },
      {
        title: "Unified Instagram DM & Deal Management",
        description:
          "Direct message conversations flow directly into your shared team inbox. View open orders, assign leads to reps, and share payment links right in chat.",
        benefit: "Transform social media from a vanity metric into a revenue engine.",
      },
    ],
    useCases: [
      {
        title: "Creator & Influencer Product Launches",
        target: "Content creators, coaches, and digital product sellers",
        workflow:
          "Followers comment 'COURSE' on an educational Reel → GTMSip sends the registration link via DM → registrant is tagged in the CRM pipeline.",
        result: "Over 5x increase in link click-throughs compared to bio link navigation.",
      },
      {
        title: "E-Commerce Flash Sales & Restocks",
        target: "Apparel, beauty, and lifestyle brands",
        workflow:
          "Announce new inventory with 'Comment BUY for the VIP checkout link' → automated DM sends personalized payment link with live inventory confirmation.",
        result: "Faster inventory sell-outs with reduced checkout friction.",
      },
    ],
    faqs: [
      {
        question: "Is automated Comment-to-DM allowed by Instagram?",
        answer:
          "Yes. Meta officially supports the Instagram Messaging API for Business accounts. GTMSip implements the official API and enforces Meta's guideline of one automated private message per comment.",
      },
      {
        question: "Do I need an Instagram Business account?",
        answer:
          "Yes. Meta requires an Instagram Professional (Business or Creator) account connected to a Facebook Page to access the official Messaging APIs.",
      },
      {
        question: "Can I customize different replies for different posts?",
        answer:
          "Yes. You can create post-specific keyword automations or configure account-wide fallback keywords that run across all existing and upcoming posts.",
      },
    ],
    relatedFeatureSlug: "instagram-comment-to-dm",
  },
];

export function getSolution(slug: string): SolutionDetail | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
