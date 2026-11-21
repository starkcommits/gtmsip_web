import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { CtaBand, PageHeader } from "../components/ui";
import { openWaitlistModal } from "../lib/waitlist";
import {
  ArrowRightIcon,
  BuildingIcon,
  CardIcon,
  ChartIcon,
  ChatIcon,
  UsersIcon,
} from "../components/icons";

const USE_CASES = [
  {
    id: "lead-gen",
    icon: ChartIcon,
    title: "Sales & Lead Gen",
    subtitle: "From scrape to closed deal",
    body: "Firecrawl scrapes targeted lead lists, AI enriches and scores them, and Google plugins store the results in Sheets — then outreach and every reply happen in the same workspace.",
    points: [
      "Firecrawl scraping into a structured lead pipeline",
      "AI enrichment, scoring and research notes per lead",
      "Google Sheets & Drive sync for the list itself",
      "Claude MCP so your AI assistant can act on the data",
    ],
    example:
      "A scraped list lands in Sheets and the pipeline, an AI workflow scores it, and the first replies go out from the shared inbox.",
  },
  {
    id: "agencies",
    icon: UsersIcon,
    title: "Agencies",
    subtitle: "Many clients, one login",
    body: "Run every client's WhatsApp and Instagram presence from one GTMSip login, with a workspace per brand so contacts, conversations and reporting never cross over.",
    points: [
      "Workspace-per-brand isolation for clean client boundaries",
      "Owner / Admin / Agent roles per workspace",
      "Per-brand response and pipeline reporting",
      "Brand approval workflows (Planned) for client sign-off",
    ],
    example:
      "Northwind Agency manages Bloom Studio and EduWebinar — separate inboxes, separate metrics, one agency team.",
  },
  {
    id: "d2c",
    icon: CardIcon,
    title: "D2C & E-commerce",
    subtitle: "From comment to cash",
    body: "Turn product Reels into conversations, answer order questions from a shared inbox, and collect payments with Razorpay Payment Links shared right inside the chat.",
    points: [
      "Comment-to-DM for product launches and restocks",
      "Order questions handled by any available agent",
      "Payment links attached to deals with live status",
      "Win-back broadcasts to lapsed segments",
    ],
    example:
      "Order #4821 — Aarav asks for an invoice, the agent replies in-thread, the payment link shows Paid on the deal.",
  },
  {
    id: "education",
    icon: ChatIcon,
    title: "Education & Webinars",
    subtitle: "Fill seats on autopilot",
    body: "Keyword comments like INFO or JOIN trigger instant replies and DMs, then a drip flow reminds registrants until they show up — with opt-outs respected throughout.",
    points: [
      "Per-post keywords for each cohort or webinar",
      "Drip reminders with wait and branch steps",
      "Leads tagged by course, source post and interest",
      "Approved templates for schedule-change notices",
    ],
    example:
      "A student comments “JOIN” on the masterclass Reel → auto-DM with the registration link → day-1 and day-1 reminders.",
  },
  {
    id: "services",
    icon: BuildingIcon,
    title: "Service Businesses",
    subtitle: "Never lose a warm lead",
    body: "Consultants, clinics and local services get every enquiry into one queue with assignment rules, so nothing sits unanswered while someone is on a call.",
    points: [
      "Round-robin assignment by tag or availability",
      "Pipeline stages from enquiry to confirmed booking",
      "Internal notes for handovers between teammates",
      "Window countdown so replies go out in time",
    ],
    example:
      "Three enquiries arrive during a consultation — each is assigned, tagged and answered inside the 24-hour window.",
  },
];

export default function UseCases() {
  usePageMeta({
    title: "Use cases — GTMSip for lead gen, agencies, D2C, education & services",
    description:
      "See how sales teams, agencies, D2C brands, education businesses and service teams use Firecrawl lead scraping, AI workflows and WhatsApp & Instagram conversations in GTMSip.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Use cases"
        title={
          <>
            Built for teams that live{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              in the inbox.
            </span>
          </>
        }
        description="Five ways teams use GTMSip day to day — from AI lead scraping to daily conversations, with realistic synthetic examples, never invented customer claims."
      >
        <button type="button" onClick={openWaitlistModal} className="btn-primary">
          Join the waitlist
        </button>
        <Link to="/pricing" className="btn-secondary">
          View pricing
        </Link>
      </PageHeader>

      <section className="section space-y-6" aria-label="Use case details">
        <div className="container-x">
          {USE_CASES.map((useCase, index) => (
            <article
              key={useCase.id}
              id={useCase.id}
              className="card grid items-start gap-7 p-6 sm:p-8 lg:grid-cols-2"
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-400">
                  <useCase.icon size={20} />
                </span>
                <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
                  {useCase.subtitle}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold">{useCase.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {useCase.body}
                </p>
                <p className="mt-5 rounded-xl border border-stone-200 bg-stone-50 p-4 text-[13px] leading-relaxed text-stone-600 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-300">
                  <strong className="font-extrabold text-stone-800 dark:text-white">
                    Example scenario:
                  </strong>{" "}
                  {useCase.example}
                </p>
              </div>

              <ul className="space-y-3 lg:order-1">
                {useCase.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-4 text-sm font-semibold text-stone-700 transition hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.03] dark:text-stone-200 dark:hover:border-brand-400/40"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[11px] font-extrabold text-brand-700 dark:bg-brand-400/20 dark:text-brand-300">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          <p className="mt-8 flex items-center gap-2 text-xs font-semibold text-stone-500 dark:text-stone-400">
            <ArrowRightIcon size={14} />
            Scenarios use fictional demo data (Bloom Studio, Order #4821) and
            describe product behaviour, not customer results.
          </p>
        </div>
      </section>

      <CtaBand />
      <div className="section" />
    </>
  );
}
