import { Link } from "react-router-dom";
import { usePageMeta, buildBreadcrumbsSchema } from "../lib/seo";
import { FEATURES } from "../data/features";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ComingSoon, CtaBand, PageHeader } from "../components/ui";
import { ArrowRightIcon } from "../components/icons";
import { openWaitlistModal } from "../lib/waitlist";

export default function FeaturesHub() {
  const breadcrumbs = [{ name: "Features", path: "/features" }];

  usePageMeta({
    title: "Features Hub — All 10 Modules | GTMSip AI Sales & Social Platform",
    description:
    "Explore every GTMSip module: Firecrawl lead scraping, Google plugins, AI workflows and Claude MCP, shared WhatsApp & Instagram inbox, broadcasts, comment-to-DM, pipelines with Razorpay, and workspaces.",
    canonicalUrl: "/features",
    jsonLd: [buildBreadcrumbsSchema(breadcrumbs)],
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Features hub"
        title={
          <>
            Everything in GTMSip,{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              module by module.
            </span>
          </>
        }
        description="Each module works on its own and gets better together. Open any detail page for capabilities, honest platform limits and synthetic product previews."
      >
        <button type="button" onClick={openWaitlistModal} className="btn-primary">
          Join the waitlist
        </button>
        <Link to="/how-it-works" className="btn-secondary">
          See how it works
        </Link>
      </PageHeader>

      <section className="section" aria-label="Feature modules">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li key={feature.slug}>
                <Link
                  to={`/features/${feature.slug}`}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition group-hover:scale-105 dark:bg-brand-400/15 dark:text-brand-400">
                      <feature.icon size={20} />
                    </span>
                    {feature.status === "soon" && <ComingSoon />}
                  </span>
                  <h2 className="mt-4 text-base font-extrabold leading-snug">
                    {feature.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {feature.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-600 transition group-hover:gap-2.5 dark:text-brand-400">
                    View module
                    <ArrowRightIcon size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Platform Comparison Matrix */}
      <section className="section border-t border-stone-200 dark:border-white/10" aria-labelledby="comparison-title">
        <div className="container-x">
          <div className="max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Architecture Comparison
            </span>
            <h2 id="comparison-title" className="mt-2 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
              Why fast-growing sales teams switch to GTMSip
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
              See how GTMSip’s unified AI sales platform replaces brittle scripts, unverified browser bots, and chaotic shared phone numbers.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-white/10 dark:bg-white/[0.02]">
            <table className="w-full min-w-[700px] text-left">
              <caption className="sr-only">
                Comparison between traditional disconnected sales tools and GTMSip unified AI platform
              </caption>
              <thead className="border-b border-stone-200 bg-stone-50 dark:border-white/10 dark:bg-white/[0.04]">
                <tr>
                  <th scope="col" className="w-1/4 px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Dimension
                  </th>
                  <th scope="col" className="w-[37.5%] px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Traditional / Disconnected Tools
                  </th>
                  <th scope="col" className="w-[37.5%] px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    GTMSip Unified Platform
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm dark:divide-white/10">
                {[
                  {
                    capability: "WhatsApp Compliance & Stability",
                    legacy: "Unofficial QR code web scrapers; high risk of permanent Meta number bans and message delays",
                    gtmsip: "Direct Meta Cloud API integration; 100% compliant with approved marketing templates and zero ban risk",
                  },
                  {
                    capability: "Team Collaboration & Routing",
                    legacy: "Single mobile phone passed between reps or disorganized WhatsApp Web logins with collision",
                    gtmsip: "Centralized multi-agent shared inbox with round-robin auto-assignment and real-time collision detection",
                  },
                  {
                    capability: "AI Workflows & Lead Context",
                    legacy: "Isolated ChatGPT copy-pasting or rigid rule-based bots that lack customer conversation history",
                    gtmsip: "Claude Model Context Protocol (MCP) server with real-time deal stage, contact note, and order context",
                  },
                  {
                    capability: "Lead Ingestion & Storage",
                    legacy: "Manual CSV exports and brittle scraping scripts that require hours of cleaning before outreach",
                    gtmsip: "Automated Firecrawl web scraping synced bi-directionally to Google Sheets, Drive, and CRM pipelines",
                  },
                  {
                    capability: "In-Conversation Payment Settlement",
                    legacy: "External payment links texted manually; sales reps must ask customer for screenshots to confirm receipt",
                    gtmsip: "One-click in-chat Razorpay payment links with instant automatic status reconciliation on deals",
                  },
                  {
                    capability: "Multi-Brand & Agency Tenancy",
                    legacy: "Shared browser profiles and passwords with accidental message leakage across client accounts",
                    gtmsip: "Strict row-level workspace isolation with Owner, Admin, and Agent role-based permissions",
                  },
                ].map((row, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-stone-50/50 dark:hover:bg-white/[0.01]">
                    <th scope="row" className="px-6 py-4 font-bold text-stone-900 dark:text-white">
                      {row.capability}
                    </th>
                    <td className="px-6 py-4 text-stone-600 dark:text-stone-400">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-stone-400 dark:text-stone-500 shrink-0">✕</span>
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-stone-900 dark:text-stone-200 bg-brand-50/30 dark:bg-brand-950/10">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">✓</span>
                        <span>{row.gtmsip}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
      <div className="section" />
    </>
  );
}
