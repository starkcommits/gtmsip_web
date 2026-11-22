import { Link } from "react-router-dom";
import { usePageMeta, buildBreadcrumbsSchema } from "../lib/seo";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CtaBand, PageHeader } from "../components/ui";
import { openWaitlistModal } from "../lib/waitlist";
import {
  ArrowRightIcon,
  CheckIcon,
  InboxIcon,
  PlugIcon,
  UsersIcon,
  ZapIcon,
} from "../components/icons";

const STEPS = [
  {
    icon: PlugIcon,
    title: "Connect your channels",
    body: "Link WhatsApp and Instagram through Meta's official business API flows. Your number, messaging settings and permissions stay under your own Meta accounts.",
    points: [
      "Official onboarding — no unofficial automation",
      "Choose which workspace each channel belongs to",
      "Permissions are scoped to what the product needs",
    ],
  },
  {
    icon: ZapIcon,
    title: "Automate with AI & rules",
    body: "Set up Firecrawl lead scraping, Google plugins for storing data and AI workflows — then define pipeline stages, drip flows and comment-to-DM keywords, with platform limits surfaced while you build.",
    points: [
      "Scrape → enrich → route workflows in a few clicks",
      "Keyword rules per post or Reel",
      "Approved-template broadcasts only",
    ],
  },
  {
    icon: InboxIcon,
    title: "Work as one team",
    body: "Conversations land in the shared inbox, assigned by rule or by hand, with CRM context, internal notes and payment status on every thread.",
    points: [
      "Owner / Admin / Agent roles",
      "Collision detection before double replies",
      "Window countdown on every conversation",
    ],
  },
];

export default function HowItWorks() {
  const breadcrumbs = [{ name: "How it works", path: "/how-it-works" }];

  usePageMeta({
    title: "How It Works — AI Sales & Social Platform in 3 Steps | GTMSip",
    description:
    "Learn how GTMSip works: connect your official Meta channels, automate workflows with Firecrawl and Google plugins, and manage sales in a unified team inbox.",
    canonicalUrl: "/how-it-works",
    jsonLd: [
      buildBreadcrumbsSchema(breadcrumbs),
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to set up GTMSip for AI sales and social automation",
        description:
          "Three steps to connect official channels, automate workflows with AI, and work from a shared inbox.",
        step: STEPS.map((s, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: s.title,
          text: s.body,
        })),
      },
    ],
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow="How it works"
        title={
          <>
            Live in three steps,{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              not three months.
            </span>
          </>
        }
        description="GTMSip follows the way modern sales actually happens: a lead is scraped or messages you, AI enriches the context, and the right teammate replies — with the follow-up running automatically."
      >
        <button type="button" onClick={openWaitlistModal} className="btn-primary">
          Join the waitlist
          <ArrowRightIcon size={16} />
        </button>
        <Link to="/features" className="btn-secondary">
          Browse features
        </Link>
      </PageHeader>

      {/* Steps */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-label="Onboarding steps">
        <div className="container-x space-y-6">
          {STEPS.map((step, index) => (
            <article
              key={step.title}
              className="card grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr_1fr]"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_14px_30px_-14px_rgba(124,58,237,0.9)]">
                  <step.icon size={24} />
                </span>
                <span className="text-4xl font-extrabold text-stone-200 dark:text-white/10 lg:hidden">
                  {index + 1}
                </span>
              </div>
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
                  Step {index + 1}
                </p>
                <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {step.body}
                </p>
              </div>
              <ul className="space-y-2.5">
                {step.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 rounded-xl bg-stone-50 px-3.5 py-2.5 text-[13px] font-semibold text-stone-700 dark:bg-white/[0.04] dark:text-stone-200"
                  >
                    <CheckIcon size={15} className="mt-0.5 shrink-0 text-brand-500" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Ongoing workflow */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="daily-title">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="eyebrow">A day in the workspace</span>
            <h2 id="daily-title" className="mt-5 text-3xl font-extrabold sm:text-4xl">
              The loop your team runs every day
            </h2>
          </div>
          <ol className="mt-9 grid gap-4 md:grid-cols-4">
            {[
              {
                title: "Message lands",
                body: "A WhatsApp chat, an Instagram DM or a keyword comment enters the shared queue.",
              },
              {
                title: "Context appears",
                body: "Tags, owner, open deals and payment status render beside the thread.",
              },
              {
                title: "Team resolves",
                body: "The right agent replies inside the 24-hour window with notes and canned replies.",
              },
              {
                title: "Automation follows up",
                body: "Drip steps, payment links and stage changes keep things moving after the reply.",
              },
            ].map((item, index) => (
              <li key={item.title} className="relative card p-5">
                <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">
                  0{index + 1}
                </span>
                <h3 className="mt-2 text-sm font-extrabold">{item.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600 dark:text-stone-400">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-white/10 dark:bg-white/[0.03]">
            <UsersIcon size={18} className="text-brand-500" />
            <p className="flex-1 text-sm font-semibold text-stone-600 dark:text-stone-300">
              Running an agency? Workspaces keep each brand's channels, contacts
              and reporting fully separated.
            </p>
            <Link
              to="/use-cases"
              className="text-sm font-extrabold text-brand-600 underline underline-offset-2 dark:text-brand-400"
            >
              See use cases
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
      <div className="section" />
    </>
  );
}
