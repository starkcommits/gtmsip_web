import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { FEATURES } from "../data/features";
import { ComingSoon, Logo } from "./ui";
import { openWaitlistModal } from "../lib/waitlist";
import { gsap, prefersReducedMotion } from "../lib/motion";

/* at least 44 px tall wherever a finger taps it (phones only) */
const tap =
  "max-md:inline-flex max-md:min-h-11 max-md:items-center";

type FooterLink = { to: string; label: string; soon?: boolean };
type FooterColumn = { title: string; links: FooterLink[] };

const SOLUTION_LINKS: FooterLink[] = [
  { to: "/solutions/whatsapp-marketing", label: "WhatsApp Marketing" },
  { to: "/solutions/ai-sales-automation", label: "AI Sales Automation" },
  { to: "/solutions/lead-generation-software", label: "Lead Generation" },
  { to: "/solutions/instagram-automation", label: "Instagram Automation" },
  { to: "/features", label: "All 10 Feature Modules" },
];

const PRODUCT_LINKS: FooterLink[] = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/pricing", label: "Pricing" },
  { to: "/security", label: "Security & Trust" },
  { to: "/features/ai-workflows-mcp", label: "Claude MCP Endpoint" },
  { to: "/features/whatsapp-crm-inbox", label: "WhatsApp Shared Inbox" },
];

const RESOURCE_LINKS: FooterLink[] = [
  { to: "/blog", label: "Blog & Playbooks" },
  { to: "/about", label: "About & Contact" },
  { to: "/about#waitlist", label: "Join the waitlist" },
];

const LEGAL_LINKS: FooterLink[] = [
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/terms", label: "Terms of Service" },
  { to: "/legal/cookies", label: "Cookie Notice" },
  { to: "/legal/data-deletion", label: "Data Deletion Instructions" },
  { to: "/legal/meta-data-use", label: "Meta Data Use Statement" },
];

const COLUMNS: FooterColumn[] = [
  { title: "Solutions", links: SOLUTION_LINKS },
  { title: "Product", links: PRODUCT_LINKS },
  { title: "Resources", links: RESOURCE_LINKS },
  { title: "Legal", links: LEGAL_LINKS },
];

function ColumnLink({ link }: { link: FooterLink }) {
  const isWaitlist = link.to.includes("waitlist");

  if (isWaitlist) {
    return (
      <button
        type="button"
        onClick={openWaitlistModal}
        className={`text-left text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white ${tap}`}
      >
        {link.label}
        {link.soon && <ComingSoon />}
      </button>
    );
  }

  return (
    <Link
      to={link.to}
      className={`text-sm text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-white ${tap}`}
    >
      {link.label}
      {link.soon && <ComingSoon />}
    </Link>
  );
}

/**
 * A footer with a short description, link columns that fold on phones, and
 * the product name set large, fading into the background.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const wordmarkRef = useRef<HTMLParagraphElement>(null);

  // wordmark parallaxes up as the footer enters view
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 26 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative overflow-hidden border-t border-stone-200 bg-stone-50 text-stone-900 dark:border-white/10 dark:bg-[#0a0912] dark:text-white">
      <div className="mx-auto grid w-full max-w-[1200px] gap-12 px-6 pt-16 pb-10 max-md:gap-6 max-md:pt-12 max-md:pb-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-4 max-w-[300px] text-sm leading-[22px] text-stone-500 dark:text-stone-400">
            The AI-driven sales and social platform — Firecrawl lead scraping,
            Google plugins, Claude MCP and AI workflows — plus a shared
            WhatsApp &amp; Instagram inbox, built on official Meta business
            APIs.
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 max-md:hidden md:col-span-8 md:col-start-5 lg:grid-cols-4"
        >
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">
                {col.title}
              </p>
              <ul className="mt-4 grid gap-2.5 max-md:mt-2 max-md:gap-0">
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <ColumnLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* phones: each column folds away; tap a heading to open it */}
        <nav aria-label="Footer" className="-mx-4 grid gap-1 md:hidden">
          {COLUMNS.map((col) => (
            <details
              key={col.title}
              className="group rounded-2xl open:bg-stone-900/[0.04] dark:open:bg-white/[0.04]"
            >
              <summary className="flex h-14 cursor-pointer list-none items-center justify-between px-4 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-stone-500 dark:text-stone-400">
                  {col.title}
                </span>
                <Plus
                  className="size-4 text-stone-400 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none dark:text-stone-500"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </summary>
              <ul className="px-4 pb-3">
                {col.links.map((link) => (
                  <li key={link.to + link.label}>
                    <Link
                      to={link.to}
                      className="flex min-h-11 items-center gap-2 py-3 text-[15px] text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
                    >
                      {link.label}
                      {link.soon && <ComingSoon />}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </nav>
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <p className="max-w-4xl border-t border-stone-200 pt-8 text-xs leading-relaxed text-stone-600 dark:border-white/10 dark:text-stone-400">
          GTMSip is an independent product and is not affiliated with,
          endorsed, or sponsored by Meta Platforms, Inc. WhatsApp and
          Instagram are trademarks of Meta Platforms, Inc. Prices shown on
          this site are placeholders pending final packaging.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-6 pt-6 pb-6 text-[13px] text-stone-600 dark:text-stone-400 sm:flex-row sm:items-center sm:gap-6 md:px-10">
        <p className="font-mono tabular-nums">
          © {year} GTMSip. All rights reserved.
        </p>
        <button
          type="button"
          onClick={openWaitlistModal}
          className={`transition-colors hover:text-stone-900 dark:hover:text-white ${tap}`}
        >
          Join the waitlist
        </button>
        <Link
          to="/legal/privacy"
          className={`transition-colors hover:text-stone-900 dark:hover:text-white sm:ml-auto ${tap}`}
        >
          Privacy &amp; terms
        </Link>
      </div>

      {/* the name, set large and fading into the background */}
      <p
        aria-hidden="true"
        ref={wordmarkRef}
        className="footer-wordmark pointer-events-none -mb-[0.2em] select-none bg-clip-text text-center text-[clamp(96px,24vw,360px)] leading-[0.9] tracking-[-0.04em] text-transparent [background-image:linear-gradient(to_bottom,rgba(124,58,237,0.4),transparent_85%)] dark:[background-image:linear-gradient(to_bottom,rgba(167,139,250,0.3),transparent_85%)] max-md:text-[30vw]"
        style={{ fontFamily: "var(--font-serif, ui-serif, Georgia, serif)" }}
      >
        GTMSip
      </p>
    </footer>
  );
}

export default Footer;
