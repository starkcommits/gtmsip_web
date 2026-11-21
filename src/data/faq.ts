export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const HOME_FAQ: FaqItem[] = [
  {
    id: "window",
    question: "What is the 24-hour messaging window?",
    answer:
      "When a customer sends you a message on WhatsApp or Instagram, a 24-hour messaging window opens during which your team can reply freely. After it closes, only pre-approved message templates can be sent. GTMSip shows the remaining window time on every conversation so agents always know what is allowed.",
  },
  {
    id: "templates",
    question: "What are approved message templates?",
    answer:
      "Messages that a business starts outside the 24-hour window must use templates that Meta has pre-approved for your account. GTMSip only lets you send templates that are approved and active in your WhatsApp Business account, and broadcasts are sent through them.",
  },
  {
    id: "comment-to-dm",
    question: "How does Instagram comment-to-DM work, and what are its limits?",
    answer:
      "When someone comments a keyword on your post or Reel, GTMSip replies to that comment publicly and continues the conversation with a private message — capturing the lead in your CRM. Instagram allows one private reply per comment, so GTMSip automates exactly that single reply. The 24-hour window and the recipient's opt-out choices are always respected.",
  },
  {
    id: "data-ownership",
    question: "Who owns the conversation and contact data?",
    answer:
      "Your organisation retains ownership of the customer data it brings into GTMSip. Conversations, contacts, tags and deals live in your workspace and can be exported through the app or the API at any time.",
  },
  {
    id: "deletion",
    question: "How do I delete my data or revoke GTMSip's access?",
    answer:
      "You can remove GTMSip's access from your Facebook and Instagram settings at any time, and request full account or data erasure in-app or by email. We've published step-by-step Data Deletion Instructions covering both paths.",
  },
  {
    id: "ai-data",
    question: "How do Firecrawl, Google plugins and Claude MCP fit together?",
    answer:
      "Firecrawl scrapes targeted lead lists from the web, Google plugins store the results in Sheets and Drive (or pull your existing sheets in as a lead source), and Claude MCP lets approved AI assistants read and act on that data inside GTMSip. AI workflows then chain it together — scrape, enrich, score, route — with a human approving anything customer-facing.",
  },
  {
    id: "mcp-safety",
    question: "Is it safe to connect Claude or another AI assistant?",
    answer:
      "The MCP endpoint uses scoped, revocable access — an assistant only sees the lead, conversation and payment events you grant it, and you can revoke that access at any time. AI-drafted WhatsApp and Instagram messages still go through the official Meta business APIs, approved templates and opt-out handling before they reach a customer.",
  },
  {
    id: "integrations",
    question: "Does GTMSip work with the tools we already use?",
    answer:
      "Yes — GTMSip exposes signed webhooks, a scoped REST API and a Claude MCP endpoint so your systems and approved AI assistants can read and react to lead, conversation and payment events in real time. Google plugins cover scraping and storing data in Sheets and Drive, and Firecrawl handles web scraping for lead generation. See Integrations, Webhooks & API for details.",
  },
];

export const PRICING_FAQ: FaqItem[] = [
  {
    id: "why-placeholder",
    question: "Why are the prices shown as [Price TBD]?",
    answer:
      "Final packaging for GTMSip is still being finalised, so we don't publish invented numbers. Every tier below shows an honest placeholder — talk to us and we'll share confirmed pricing during your demo.",
  },
  {
    id: "included",
    question: "What exactly is included in each tier?",
    answer:
      "The comparison table on this page lists what each tier is designed to cover. Exact limits (seats, workspaces, message volume) are confirmed with you during the demo, before any agreement.",
  },
  {
    id: "trial",
    question: "Do you offer a trial?",
    answer:
      "Ask us during the demo — we'll arrange evaluation access appropriate to your team so you can test GTMSip on real (synthetic or sandbox) workflows before deciding.",
  },
  {
    id: "billing",
    question: "How does billing work?",
    answer:
      "Billing details will be finalised together with pricing. Nothing is charged until terms are agreed in writing — this site never presents invented prices as final.",
  },
  {
    id: "upgrade",
    question: "Can we start small and move up a tier later?",
    answer:
      "Yes. Starter, Growth and Agency are designed to grow with you; migration between tiers and any proration will be confirmed when pricing is finalised.",
  },
  {
    id: "razorpay-fees",
    question: "Do you charge extra for Razorpay payments?",
    answer:
      "GTMSip creates Razorpay Payment Links and reads their status — it does not process payments itself. Razorpay's own transaction fees apply according to their pricing, separately from GTMSip.",
  },
];
