import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { CtaBand, PageHeader } from "../components/ui";
import { Accordion } from "../components/Accordion";
import { PRICING_FAQ } from "../data/faq";
import { AlertIcon, CheckIcon, CloseIcon } from "../components/icons";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    blurb: "For small teams running one brand on WhatsApp and Instagram.",
    best: "1 brand workspace",
    features: [
      "Shared WhatsApp & Instagram inbox",
      "Contact CRM tags and notes",
      "Comment-to-DM keyword automation",
      "Razorpay payment links on deals",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    blurb: "For growing teams that need broadcasts, drips and deeper automation.",
    best: "Growing teams",
    highlight: true,
    features: [
      "Everything in Starter",
      "Broadcasts with approved templates",
      "Multi-step drip flows",
      "Deal pipelines & payment status sync",
      "Analytics: response & resolution metrics",
      "Webhooks & REST API access",
    ],
  },
  {
    id: "agency",
    name: "Agency",
    blurb: "For agencies managing several brands with strict separation.",
    best: "Multiple brand workspaces",
    features: [
      "Everything in Growth",
      "Multiple brand workspaces",
      "Owner / Admin / Agent roles",
      "Per-brand reporting",
      "MCP endpoint for AI tooling",
      "Brand approval workflows (Planned)",
    ],
  },
];

const COMPARISON: Array<{ label: string; values: [boolean | string, boolean | string, boolean | string] }> = [
  { label: "Brand workspaces", values: ["1", "1", "Multiple"] },
  { label: "Shared team inbox", values: [true, true, true] },
  { label: "Contact CRM & tags", values: [true, true, true] },
  { label: "Comment-to-DM automation", values: [true, true, true] },
  { label: "Razorpay payment links", values: [true, true, true] },
  { label: "Broadcasts (approved templates)", values: [false, true, true] },
  { label: "Automated drip flows", values: [false, true, true] },
  { label: "Analytics dashboards", values: [false, true, true] },
  { label: "Webhooks & REST API", values: [false, true, true] },
  { label: "MCP endpoint", values: [false, false, true] },
  { label: "Role-based access control", values: [false, false, true] },
  { label: "Brand approval workflows (Planned)", values: [false, false, true] },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-bold text-stone-700 dark:text-stone-200">{value}</span>;
  }
  return value ? (
    <CheckIcon size={17} className="mx-auto text-brand-500" />
  ) : (
    <CloseIcon size={15} className="mx-auto text-stone-300 dark:text-stone-600" />
  );
}

export default function Pricing() {
  usePageMeta({
    title: "Pricing — GTMSip (placeholder pricing)",
    description:
      "Three GTMSip tiers — Starter, Growth and Agency — with honest placeholder pricing ([Price TBD]) and a full feature comparison. Talk to us for confirmed pricing.",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PRICING_FAQ.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  });

  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Simple tiers.{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              Honest placeholders.
            </span>
          </>
        }
        description="Final packaging for GTMSip is still being finalised — so we show [Price TBD] instead of inventing numbers. Every plan below starts with a conversation."
      >
        <Link to="/about#book-demo" className="btn-primary">
          Talk to us
        </Link>
        <a href="#compare" className="btn-secondary">
          Compare features
        </a>
      </PageHeader>

      {/* Placeholder honesty banner */}
      <div className="container-x pt-8">
        <div
          role="note"
          className="flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-4.5 p-4 dark:border-amber-400/30 dark:bg-amber-400/[0.08]"
        >
          <AlertIcon size={18} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-[13px] font-semibold leading-relaxed text-amber-800 dark:text-amber-200">
            All prices on this page are marked <strong>[Price TBD]</strong> on
            purpose. We don't publish invented rates — confirmed pricing is
            shared during your demo, before any agreement.
          </p>
        </div>
      </div>

      {/* Tiers */}
      <section className="section" aria-label="Pricing tiers">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <article
                key={tier.id}
                className={`card relative flex flex-col p-7 ${
                  tier.highlight
                    ? "border-brand-500 shadow-[0_24px_60px_-30px_rgba(124,58,237,0.55)] dark:border-brand-400/60"
                    : ""
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-7 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    Most popular
                  </span>
                )}
                <h2 className="text-lg font-extrabold">{tier.name}</h2>
                <p className="mt-1.5 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                  {tier.blurb}
                </p>

                <p className="mt-6">
                  <span className="block text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white">
                    [Price TBD]
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-stone-500 dark:text-stone-400">
                    per month · billing confirmed at launch
                  </span>
                </p>

                <Link
                  to="/about#book-demo"
                  className={`mt-6 ${tier.highlight ? "btn-primary" : "btn-secondary"}`}
                >
                  Talk to us
                </Link>

                <p className="mt-6 text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Best for · {tier.best}
                </p>
                <ul className="mt-3 flex-1 space-y-2.5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-[13px] font-semibold text-stone-700 dark:text-stone-200"
                    >
                      <CheckIcon size={15} className="mt-0.5 shrink-0 text-brand-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section
        id="compare"
        className="section scroll-mt-24 border-t border-stone-200 dark:border-white/10"
        aria-labelledby="compare-title"
      >
        <div className="container-x">
          <h2 id="compare-title" className="text-2xl font-extrabold sm:text-3xl">
            Tier comparison
          </h2>
          <div className="mt-7 overflow-x-auto rounded-2xl border border-stone-200 dark:border-white/10">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">
                Feature comparison between Starter, Growth and Agency tiers
              </caption>
              <thead className="bg-stone-50 dark:bg-white/[0.04]">
                <tr>
                  <th scope="col" className="px-5 py-4 text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    Feature
                  </th>
                  {TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="px-5 py-4 text-center text-sm font-extrabold text-stone-800 dark:text-white"
                    >
                      {tier.name}
                      <span className="mt-1 block text-[10px] font-bold text-stone-500 dark:text-stone-400">
                        [Price TBD]
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-white/5">
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="hover:bg-stone-50/70 dark:hover:bg-white/[0.03]">
                    <th
                      scope="row"
                      className="px-5 py-3.5 text-[13px] font-semibold text-stone-600 dark:text-stone-300"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${index}`} className="px-5 py-3.5 text-center">
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs font-semibold text-stone-500 dark:text-stone-400">
            Planned features are labelled as such. Exact limits (seats, volume)
            are confirmed with you during the demo.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-stone-200 dark:border-white/10" aria-labelledby="pricing-faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="eyebrow">Pricing FAQ</span>
            <h2 id="pricing-faq-title" className="mt-5 text-3xl font-extrabold">
              Before you ask
            </h2>
          </div>
          <Accordion
            items={PRICING_FAQ.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </section>

      <CtaBand
        title="Lock in 50% lifetime discount on any tier"
        body="Join the first 100 early adopters to get 50% off every GTMSip tier for life, plus free priority onboarding."
        primaryLabel="Join the waitlist"
      />
      <div className="section" />
    </>
  );
}
