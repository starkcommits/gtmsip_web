import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { PageHeader } from "../components/ui";
import { AlertIcon, CheckIcon } from "../components/icons";

function LegalLayout({
  title,
  description,
  updated = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
  children,
}: {
  title: string;
  description: string;
  updated?: string;
  children: ReactNode;
}) {
  usePageMeta({
    title: `${title} — GTMSip`,
    description,
  });

  return (
    <>
      <PageHeader eyebrow="Legal & Compliance" title={title} description={description}>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-400/10 dark:text-emerald-300">
          <CheckIcon size={14} />
          Official Policy
        </span>
      </PageHeader>

      <article className="section prose-legal mx-auto max-w-3xl">
        <div className="container-x">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Last updated: {updated}
          </p>
          {children}

        </div>
      </article>
    </>
  );
}

/* ------------------------------------------------------------------ */

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="Draft GTMSip Privacy Policy: what data we process, why, who we share it with, retention, your rights and how to contact us."
    >
      <p>
        This Privacy Policy describes how <strong>GTMSip Technologies Private Limited</strong>{" "}
        (“GTMSip”, “we”, “us”) processes personal data when you use the GTMSip
        website and application. Registered address:{" "}
        <strong>Noida Sector 16, Uttar Pradesh, India, 201301</strong>. Privacy contact:{" "}
        <strong>support@gtmsip.com</strong>. Grievance officer:{" "}
        <strong>Grievance Officer (support@gtmsip.com)</strong>.
      </p>

      <h2>1. Data we process</h2>
      <ul>
        <li>
          <strong>Account data:</strong> name, work email, workspace name and
          role when you create an account or request a demo.
        </li>
        <li>
          <strong>Channel data from Meta's APIs:</strong> contact identifiers
          and profile information, message content, comments, delivery status
          and template information — only for the channels you connect, as
          described in our{" "}
          <Link to="/legal/meta-data-use">Meta Data Use Statement</Link>.
        </li>
        <li>
          <strong>Payment link status:</strong> status of Razorpay Payment
          Links you create (created / viewed / paid / expired). Card and bank
          details are collected by Razorpay directly and are not processed by
          GTMSip.
        </li>
        <li>
          <strong>Usage data:</strong> log and device information needed to run
          and secure the service. See our{" "}
          <Link to="/legal/cookies">Cookie Notice</Link> for cookies and similar
          technologies.
        </li>
      </ul>

      <h2>2. Why we process it</h2>
      <ul>
        <li>To provide the inbox, CRM, automation and reporting you request.</li>
        <li>To send service messages about your account and this site.</li>
        <li>To respond to demo and contact requests.</li>
        <li>To secure the service, prevent abuse and diagnose problems.</li>
      </ul>

      <h2>3. Sharing</h2>
      <p>
        We share data only with the processors needed to run GTMSip: Meta's
        business APIs (for the channels you connect), Razorpay (for payment
        links), hosting and infrastructure providers, and your own configured
        integrations (webhooks, API clients). We do not sell personal data.
      </p>

      <h2>4. Retention</h2>
      <p>
        Workspace data is retained while your workspace is active and deleted
        or anonymised after a valid deletion request, subject to any retention
        periods we are legally required to keep (for example billing records).
        Specific retention periods: <strong>30 days following account closure, unless statutory retention applies</strong>.
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on your location, you may request access, correction,
        export or deletion of your personal data, and object to or restrict
        certain processing. Step-by-step instructions are in our{" "}
        <Link to="/legal/data-deletion">Data Deletion Instructions</Link>, or
        email <strong>support@gtmsip.com</strong>.
      </p>

      <h2>6. Children</h2>
      <p>
        GTMSip is a business product and is not directed at children under
        <strong> 18 years of age</strong>.
      </p>

      <h2>7. Changes</h2>
      <p>
        We will update this policy when the product or law changes and will
        revise the “Last updated” date above.
      </p>

      <h2>8. Contact</h2>
      <p>
        <strong>GTMSip Technologies Private Limited</strong>, <strong>Noida Sector 16, Uttar Pradesh, India, 201301</strong>{" "}
        — <strong>support@gtmsip.com</strong>. Grievance officer:{" "}
        <strong>Grievance Officer (support@gtmsip.com)</strong>.
      </p>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      description="Draft GTMSip Terms of Service covering accounts, acceptable use, Meta platform rules, payments, disclaimers and termination."
    >
      <p>
        These Terms govern your use of GTMSip, provided by{" "}
        <strong>GTMSip Technologies Private Limited</strong> (“we”, “us”), registered at{" "}
        <strong>Noida Sector 16, Uttar Pradesh, India, 201301</strong>, contact{" "}
        <strong>support@gtmsip.com</strong>.
      </p>

      <h2>1. The service</h2>
      <p>
        GTMSip provides a shared inbox, contact CRM, automation, pipeline and
        reporting workspace for WhatsApp and Instagram business conversations,
        together with integrations such as Razorpay Payment Links, webhooks and
        an API.
      </p>

      <h2>2. Accounts & workspaces</h2>
      <ul>
        <li>You are responsible for the activity of members you invite.</li>
        <li>Roles (Owner, Admin, Agent) control access within each workspace.</li>
        <li>You must keep credentials and API keys confidential.</li>
      </ul>

      <h2>3. Platform rules</h2>
      <p>
        Channels connect through official Meta business APIs. You must comply
        with Meta's platform terms and policies, including the 24-hour messaging
        window, approved-template requirements, the single private reply per
        Instagram comment, and lawful opt-out handling. GTMSip enforces what it
        can technically; you remain responsible for how you use the channels.
      </p>

      <h2>4. Acceptable use</h2>
      <ul>
        <li>No spam, unlawful content or messages without proper consent.</li>
        <li>No reverse engineering, scraping or reselling of the service.</li>
        <li>No use that violates Meta's or other providers' terms.</li>
      </ul>

      <h2>5. Fees & payment</h2>
      <p>
        Pricing is currently shown as <strong>specified on our active pricing plans</strong> across this
        site. If and when fees apply, they will be agreed in writing before any
        charge. Payments for services enabled through Razorpay are subject to
        Razorpay's own terms.
      </p>

      <h2>6. Intellectual property</h2>
      <p>
        We own the GTMSip software and site. You own your workspace data. We
        receive only the rights needed to operate the service for you.
      </p>

      <h2>7. Disclaimers & liability</h2>
      <p>
        The service is provided “as is” to the extent permitted by law. Any
        service commitments (including uptime or support) would only apply if
        set out in a signed agreement with <strong>GTMSip Technologies Private Limited</strong>.
        Nothing here excludes liability that cannot be excluded by law.
      </p>

      <h2>8. Termination</h2>
      <p>
        You can stop using GTMSip and request data deletion at any time. We may
        suspend or terminate access for material breach of these Terms, with
        notice where practical.
      </p>

      <h2>9. Governing law</h2>
      <p>
        These Terms are governed by the laws of <strong>the Republic of India</strong>,
        with courts at <strong>Noida, Uttar Pradesh, India</strong>.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions: <strong>support@gtmsip.com</strong>. These Terms were last
        updated on <strong>{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</strong> and remain a draft
        pending legal review.
      </p>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function CookiesPage() {
  return (
    <LegalLayout
      title="Cookie Notice"
      description="Draft GTMSip Cookie Notice: essential cookies, preference storage, optional analytics placeholders and how to manage your choices."
    >
      <p>
        This notice explains the cookies and similar technologies used on the
        GTMSip website, operated by <strong>GTMSip Technologies Private Limited</strong>.
      </p>

      <h2>1. Essential storage</h2>
      <ul>
        <li>
          <strong>Theme preference:</strong> remembers light/dark mode
          (“gtmsip-theme”) so the site looks right on your next visit.
        </li>
        <li>
          <strong>Session identifiers:</strong> keep you signed in and protect
          forms against cross-site request forgery once you use the app.
        </li>
      </ul>

      <h2>2. Analytics (optional)</h2>
      <p>
        First-party or privacy-friendly analytics may be used to understand
        page performance. Provider and status:{" "}
        <strong>Privacy-first, cookieless telemetry</strong>. Analytics are only loaded
        once a compliant choice is in place — this preview site sets none.
      </p>

      <h2>3. What we don't do</h2>
      <ul>
        <li>No third-party advertising cookies.</li>
        <li>No selling or sharing of cookie data for cross-site tracking.</li>
      </ul>

      <h2>4. Managing your choices</h2>
      <p>
        You can clear or block cookies in your browser settings at any time.
        Blocking essential storage may prevent sign-in or theme persistence
        from working.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions about this notice: <strong>support@gtmsip.com</strong>,{" "}
        <strong>Noida Sector 16, Uttar Pradesh, India, 201301</strong>.
      </p>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

export function DataDeletionPage() {
  return (
    <LegalLayout
      title="Data Deletion Instructions"
      description="How to revoke GTMSip's Facebook and Instagram app permissions and request full account or data erasure, step by step."
    >
      <p>
        You can revoke GTMSip's access and request deletion of your data at any
        time. Choose whichever path fits your situation — both are covered
        below.
      </p>

      <h2>Option A — Remove the app from Facebook</h2>
      <ol>
        <li>Open Facebook and go to Settings &amp; privacy → Settings.</li>
        <li>
          Open <strong>Apps and Websites</strong> (direct link:{" "}
          <a href="https://www.facebook.com/settings/apps" rel="noreferrer noopener" target="_blank">
            facebook.com/settings/apps
          </a>
          ).
        </li>
        <li>Select <strong>GTMSip</strong> from the list of connected apps.</li>
        <li>
          Click <strong>Remove</strong> and confirm. This revokes GTMSip's
          Facebook permissions immediately and stops new data from arriving.
        </li>
      </ol>

      <h2>Option B — Remove the app from Instagram</h2>
      <ol>
        <li>
          Open Instagram → Settings → <strong>Apps and Websites</strong>{" "}
          (web:{" "}
          <a href="https://www.instagram.com/accounts/manage_access/" rel="noreferrer noopener" target="_blank">
            instagram.com/accounts/manage_access/
          </a>
          ).
        </li>
        <li>Find <strong>GTMSip</strong> under authorised apps.</li>
        <li>
          Tap <strong>Remove</strong> and confirm the removal.
        </li>
      </ol>

      <h2>Option C — Request full account &amp; data erasure from us</h2>
      <ol>
        <li>
          In the GTMSip app: <strong>Settings → Account → Delete account &amp;
          data</strong>, then confirm.
        </li>
        <li>
          Or email <strong>support@gtmsip.com</strong> from the address registered
          to your workspace, with the subject{" "}
          <strong>“GTMSip data deletion request”</strong> and your workspace
          name.
        </li>
        <li>
          We will confirm receipt and complete the erasure within{" "}
          <strong>30 calendar days</strong>, except records we must retain
          by law (for example billing records), which are then kept only as
          long as required.
        </li>
      </ol>

      <h2>What deletion covers</h2>
      <ul>
        <li>Conversations, contacts, tags and notes in your workspaces.</li>
        <li>Deals, pipelines, automations and broadcast records.</li>
        <li>API keys, webhook secrets and stored channel tokens.</li>
        <li>Member accounts and roles in the workspace.</li>
      </ul>

      <p>
        <strong>Important:</strong> removing the app in Facebook or Instagram
        stops data collection but does not by itself delete data already
        stored in GTMSip — use Option C for full erasure.
      </p>

      <h2>Contact</h2>
      <p>
        <strong>support@gtmsip.com</strong> · <strong>Noida Sector 16, Uttar Pradesh, India, 201301</strong>{" "}
        · Grievance officer: <strong>Grievance Officer (support@gtmsip.com)</strong>.
      </p>
    </LegalLayout>
  );
}

/* ------------------------------------------------------------------ */

interface DataRow {
  platform: string;
  data: string;
  purpose: string;
  notes: string;
}

const WHATSAPP_ROWS: DataRow[] = [
  {
    platform: "WhatsApp",
    data: "Contact phone number and profile name",
    purpose: "Display and route conversations in the shared inbox",
    notes: "Received via the official WhatsApp Business Platform",
  },
  {
    platform: "WhatsApp",
    data: "Inbound and outbound message content",
    purpose: "Deliver replies, store workspace history, show internal notes",
    notes: "Only within your workspace; never used to train ads",
  },
  {
    platform: "WhatsApp",
    data: "Message templates (content and status)",
    purpose: "Send approved templates for broadcasts and out-of-window follow-ups",
    notes: "Only templates approved and active in your account",
  },
  {
    platform: "WhatsApp",
    data: "Delivery and read statuses",
    purpose: "Show per-message state and conversation health metrics",
    notes: "As returned by the Meta APIs",
  },
  {
    platform: "WhatsApp",
    data: "Opt-out signals (e.g. STOP)",
    purpose: "Record opt-outs and block further automated messages",
    notes: "Enforced automatically across broadcasts and flows",
  },
  {
    platform: "WhatsApp",
    data: "24-hour window state per conversation",
    purpose: "Show countdown and enforce template rules for replies",
    notes: "Computed from message timestamps",
  },
];

const INSTAGRAM_ROWS: DataRow[] = [
  {
    platform: "Instagram",
    data: "Basic profile (username, profile picture)",
    purpose: "Identify commenters and DM senders in the inbox",
    notes: "Via the Instagram Graph API",
  },
  {
    platform: "Instagram",
    data: "Comments on media you own",
    purpose: "Detect trigger keywords and post the single permitted public reply",
    notes: "One private reply per comment, per platform rule",
  },
  {
    platform: "Instagram",
    data: "Direct messages",
    purpose: "Route DMs to the shared inbox and send permitted replies",
    notes: "Free-form replies only inside the 24-hour window",
  },
  {
    platform: "Instagram",
    data: "Story mentions and replies",
    purpose: "Surface them in the shared inbox alongside DMs",
    notes: "When the corresponding permission is enabled",
  },
  {
    platform: "Instagram",
    data: "Ad account performance (optional)",
    purpose: "Analytics and attribution reporting next to conversations",
    notes: "Only for accounts you connect and authorize",
  },
];

const OTHER_ROWS: DataRow[] = [
  {
    platform: "Razorpay",
    data: "Payment link identifiers and status",
    purpose: "Show paid / viewed / expired state on deals and threads",
    notes: "Card and bank details stay on Razorpay's checkout — never in GTMSip",
  },
];

function DataTable({ caption, rows }: { caption: string; rows: DataRow[] }) {
  return (
    <div className="mb-8 overflow-x-auto rounded-2xl border border-stone-200 dark:border-white/10">
      <table className="w-full min-w-[640px] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-stone-50 text-xs font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 dark:bg-white/[0.04] dark:text-stone-500">
          <tr>
            <th scope="col" className="px-4 py-3">Platform</th>
            <th scope="col" className="px-4 py-3">Permission / data processed</th>
            <th scope="col" className="px-4 py-3">Purpose</th>
            <th scope="col" className="px-4 py-3">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 text-stone-600 dark:divide-white/5 dark:text-stone-300">
          {rows.map((row) => (
            <tr key={row.data}>
              <td className="px-4 py-3 font-extrabold text-stone-800 dark:text-white">
                {row.platform}
              </td>
              <td className="px-4 py-3 font-semibold">{row.data}</td>
              <td className="px-4 py-3">{row.purpose}</td>
              <td className="px-4 py-3 text-xs">{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MetaDataUsePage() {
  return (
    <LegalLayout
      title="Meta Data Use Statement"
      description="Transparent table of the Instagram and WhatsApp permissions and data GTMSip processes, and the exact purpose of each."
    >
      <p>
        GTMSip is an independent product and is not affiliated with, endorsed,
        or sponsored by Meta Platforms, Inc. It connects to WhatsApp and
        Instagram only through their official business APIs, and processes the
        data below strictly to provide the features you switch on.
      </p>

      <h2>WhatsApp data & permissions</h2>
      <DataTable caption="WhatsApp data processed by GTMSip" rows={WHATSAPP_ROWS} />

      <h2>Instagram data & permissions</h2>
      <DataTable caption="Instagram data processed by GTMSip" rows={INSTAGRAM_ROWS} />

      <h2>Payments (third party)</h2>
      <DataTable caption="Razorpay data processed by GTMSip" rows={OTHER_ROWS} />

      <h2>What we do not do with this data</h2>
      <ul>
        <li>We do not sell personal data or share it for cross-site advertising.</li>
        <li>
          We do not use message content to build advertising profiles on Meta's
          platforms.
        </li>
        <li>
          We do not read channels you have not connected or permissions you have
          not granted.
        </li>
      </ul>

      <h2>Retention & removal</h2>
      <p>
        Data is retained while your workspace is active. Revoking app access
        stops collection immediately; full erasure follows the steps in our{" "}
        <Link to="/legal/data-deletion">Data Deletion Instructions</Link>.
        Retention details: <strong>30 days following account closure, unless statutory retention applies</strong>.
      </p>

      <h2>Your controls</h2>
      <ul>
        <li>
          Review connected apps any time:{" "}
          <a href="https://www.facebook.com/settings/apps" rel="noreferrer noopener" target="_blank">
            facebook.com/settings/apps
          </a>{" "}
          and Instagram's Apps and Websites settings.
        </li>
        <li>
          Disable individual modules (comment-to-DM, broadcasts, ads reporting)
          from workspace settings.
        </li>
      </ul>

      <h2>Contact</h2>
      <p>
        Questions about data use: <strong>support@gtmsip.com</strong> ·{" "}
        <strong>GTMSip Technologies Private Limited</strong>, <strong>Noida Sector 16, Uttar Pradesh, India, 201301</strong>.
        Grievance officer: <strong>Grievance Officer (support@gtmsip.com)</strong>.
      </p>
    </LegalLayout>
  );
}
