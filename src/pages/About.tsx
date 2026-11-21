import { usePageMeta } from "../lib/seo";
import { CtaBand, PageHeader } from "../components/ui";
import { WaitlistOnboardingForm } from "../components/forms/WaitlistOnboardingForm";
import {
  AlertIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  UsersIcon,
} from "../components/icons";

export default function About() {
  usePageMeta({
    title: "About & Contact — GTMSip",
    description:
      "Why GTMSip exists, how to reach the team, and an interactive form to book a demo of the WhatsApp and Instagram CRM, inbox and automation workspace.",
  });

  return (
    <>
      <PageHeader
        eyebrow="About GTMSip"
        title={
          <>
            The inbox your team{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              stops fighting.
            </span>
          </>
        }
        description="GTMSip exists because customer conversations got scattered — across personal phones, comment sections and DMs — while the tools meant to fix that became another tab to manage."
      />

      {/* Story */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="story-title">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="prose-legal text-[15px]">
            <h2 id="story-title" className="!mt-0">What GTMSip is</h2>
            <p>
              GTMSip is an all-in-one workspace for WhatsApp and Instagram
              customer conversations: a shared team inbox with contact CRM,
              automation for broadcasts, drip flows and comment-to-DM, deal
              pipelines with Razorpay payment links, and reporting that connects
              to Meta's own APIs.
            </p>
            <p>
              It's designed for two kinds of teams: businesses that run sales
              and support inside WhatsApp and Instagram every day, and agencies
              that need to do that for several brands without the data ever
              bleeding together.
            </p>
            <h2>How we work</h2>
            <ul>
              <li>
                <strong>Official APIs only.</strong> GTMSip connects through
                Meta's official business APIs — no unofficial automation that
                puts accounts at risk.
              </li>
              <li>
                <strong>No invented claims.</strong> You won't find fake
                customer counts, fake logos or fake certifications on this site.
                If a number matters, we'll show it from your own workspace.
              </li>
              <li>
                <strong>Platform rules, surfaced honestly.</strong> The
                24-hour window, one-private-reply-per-comment and opt-out rules
                are constraints of the platforms — we explain them instead of
                hiding them.
              </li>
              <li>
                <strong>Placeholders stay placeholders.</strong> Pricing is
                marked [Price TBD] until it's real.
              </li>
            </ul>
          </div>

          <aside className="card h-fit p-6">
            <h2 className="flex items-center gap-2 text-base font-extrabold">
              <UsersIcon size={18} className="text-brand-500" />
              Who it's for
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-600 dark:text-stone-400">
              {[
                "D2C & e-commerce teams answering comments and DMs at volume",
                "Agencies running multiple brand inboxes with strict separation",
                "Education & webinar operators turning keywords into registrants",
                "Service businesses that can't afford a missed warm lead",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckIcon size={15} className="mt-0.5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-stone-200 pt-4 dark:border-white/10">
              <p className="flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-200">
                <MailIcon size={15} className="text-brand-500" />
                Email
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                support@gtmsip.com
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-stone-700 dark:text-stone-200">
                <MapPinIcon size={15} className="text-brand-500" />
                Registered address
              </p>
              <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
                Noida Sector 16, Uttar Pradesh, India, 201301
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Waitlist Onboarding */}
      <section
        id="waitlist"
        className="section scroll-mt-20 border-b border-stone-200 dark:border-white/10"
        aria-labelledby="waitlist-title"
      >
        <div id="book-demo" className="scroll-mt-20" />
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <span className="eyebrow">Early Access Waitlist</span>
            <h2 id="waitlist-title" className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Lock in your launch access &amp; 50% lifetime offer
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              The first 100 teams to join receive a 50% lifetime discount across all tiers, prioritized API access, and white-glove setup for WhatsApp, Instagram, Firecrawl, and Claude MCP workflows.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Guaranteed 50% lifetime discount locked to your organization",
                "Direct API access with prioritized Firecrawl & Claude MCP rate limits",
                "White-glove onboarding for WhatsApp Business & Instagram DM automation",
                "Early access to private beta drops and roadmap feature requests",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-stone-700 dark:text-stone-200">
                  <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div
              role="note"
              className="mt-6 flex items-start gap-2.5 rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs leading-relaxed text-stone-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400"
            >
              <AlertIcon size={15} className="mt-0.5 shrink-0 text-stone-500 dark:text-stone-400" />
              Limited to the first 100 organizations. Spots are assigned on a first-come, first-served basis.
            </div>
          </div>

          <WaitlistOnboardingForm />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="section scroll-mt-20"
        aria-labelledby="contact-title"
      >
        <div className="container-x">
          <div className="card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 id="contact-title" className="text-xl font-extrabold">
                Prefer to write instead?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Send your question to <strong className="font-bold text-stone-800 dark:text-white">support@gtmsip.com</strong>{" "}
                or use the demo form above — either reaches the same team.
                Grievance contact: <strong className="font-bold text-stone-800 dark:text-white">Grievance Officer (support@gtmsip.com)</strong>.
              </p>
            </div>
            <a href="mailto:%5BContact%20Email%5D" className="btn-primary shrink-0">
              <MailIcon size={16} />
              Email the team
            </a>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer a quick tour first?"
        body="See the three-step onboarding and daily workflow before booking anything."
        primaryLabel="See how it works"
        primaryTo="/how-it-works"
        secondaryLabel="View pricing"
        secondaryTo="/pricing"
      />
      <div className="section" />
    </>
  );
}
