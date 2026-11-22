import { Link } from "react-router-dom";
import { usePageMeta, buildBreadcrumbsSchema } from "../lib/seo";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CtaBand, PageHeader } from "../components/ui";
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  LockIcon,
  ShieldIcon,
  UsersIcon,
  ZapIcon,
} from "../components/icons";

const PILLARS = [
  {
    icon: ShieldIcon,
    title: "Row-level tenant isolation",
    body: "Every record — conversation, contact, deal, event — carries its workspace ID and queries are scoped to it. One tenant's data is never reachable from another's context.",
  },
  {
    icon: LockIcon,
    title: "Encrypted tokens & connections",
    body: "Channel credentials and API tokens are encrypted at rest, shown only at creation, and rotatable from workspace settings.",
  },
  {
    icon: ZapIcon,
    title: "Webhook signature verification",
    body: "Every outbound webhook carries an HMAC signature so your endpoint can verify authenticity and reject tampered or replayed payloads.",
  },
  {
    icon: CheckIcon,
    title: "Messaging-window & opt-out enforcement",
    body: "The 24-hour window state is tracked per conversation, template rules are enforced before sends, and opt-outs are recorded and honoured automatically.",
  },
  {
    icon: UsersIcon,
    title: "Role-based access",
    body: "Owner, Admin and Agent roles keep permissions legible, and removing a member revokes their access immediately.",
  },
  {
    icon: AlertIcon,
    title: "Least-privilege integrations",
    body: "API keys are workspace-scoped with explicit scopes, and Meta permissions are requested only for the features you switch on.",
  },
];

export default function Security() {
  const breadcrumbs = [{ name: "Security & Trust", path: "/security" }];

  usePageMeta({
    title: "Security & Trust — Platform Architecture & Compliance | GTMSip",
    description:
    "Inspect GTMSip's security architecture: row-level tenant isolation, encrypted tokens, HMAC webhook verification, and official Meta messaging-window compliance.",
    canonicalUrl: "/security",
    jsonLd: [buildBreadcrumbsSchema(breadcrumbs)],
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <PageHeader
        eyebrow="Security & Trust"
        title={
          <>
            Guardrails you can{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              actually inspect.
            </span>
          </>
        }
        description="This page describes how GTMSip is built and how platform rules are enforced in the product. It describes our design and engineering approach — not legal or contractual guarantees."
      >
        <Link to="/legal/meta-data-use" className="btn-primary">
          Meta Data Use Statement
          <ArrowRightIcon size={15} />
        </Link>
        <Link to="/legal/data-deletion" className="btn-secondary">
          Data deletion instructions
        </Link>
      </PageHeader>

      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="pillars-title">
        <div className="container-x">
          <h2 id="pillars-title" className="text-2xl font-extrabold sm:text-3xl">
            Built with these controls
          </h2>
          <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((pillar) => (
              <li key={pillar.title} className="card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-400">
                  <pillar.icon size={19} />
                </span>
                <h3 className="mt-4 text-sm font-extrabold">{pillar.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-stone-600 dark:text-stone-400">
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="meta-rules-title">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Platform enforcement</span>
            <h2 id="meta-rules-title" className="mt-5 text-2xl font-extrabold sm:text-3xl">
              How Meta's messaging rules show up in the product
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              GTMSip operates on official WhatsApp and Instagram business APIs,
              which come with rules we can't — and don't — work around. The
              product surfaces and enforces them where it can.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                {
                  title: "24-hour window tracking",
                  body: "Each thread shows the remaining window; template requirements appear before any out-of-window send.",
                },
                {
                  title: "Approved templates only",
                  body: "Only templates approved and active in your Meta account are available for broadcasts and out-of-window messages.",
                },
                {
                  title: "One private reply per comment",
                  body: "Comment-to-DM automation sends exactly the single private reply Instagram permits per comment.",
                },
                {
                  title: "Automatic opt-out handling",
                  body: "Opt-out signals are recorded on the contact and block further automated sends to them.",
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-400">
                    <CheckIcon size={13} />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-stone-800 dark:text-white">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                      {item.body}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card h-fit p-6">
            <h3 className="text-base font-extrabold">Read the source documents</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Our legal drafts cover exactly what data is processed, why, and
              how to remove it.
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { to: "/legal/meta-data-use", label: "Meta Data Use Statement" },
                { to: "/legal/privacy", label: "Privacy Policy (draft)" },
                { to: "/legal/data-deletion", label: "Data Deletion Instructions" },
                { to: "/legal/cookies", label: "Cookie Notice (draft)" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 px-4 py-3 text-sm font-bold text-stone-700 transition hover:border-brand-400 hover:text-brand-700 dark:border-white/10 dark:text-stone-200 dark:hover:border-brand-400/50 dark:hover:text-brand-300"
                  >
                    {link.label}
                    <ArrowRightIcon size={15} className="text-brand-500" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-xl bg-stone-50 p-3.5 text-xs leading-relaxed text-stone-500 dark:bg-white/[0.04] dark:text-stone-400">
              <strong className="font-extrabold text-stone-700 dark:text-stone-200">
                Honest note:
              </strong>{" "}
              This page describes how the product is built. It is not a legal
              guarantee, certification or uptime commitment — those would only
              ever come from a signed agreement.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
      <div className="section" />
    </>
  );
}
