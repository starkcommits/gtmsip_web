import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "./icons";
import { openWaitlistModal } from "../lib/waitlist";

/** Section wrapper with consistent vertical rhythm and container */
export function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={`section ${className}`}>
      <div className="container-x">{children}</div>
    </Tag>
  );
}

/** Brand mark — GTMSip network logo */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="GTMSip home"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-stone-200/80 bg-white/90 p-1 shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_20px_-8px_rgba(46,16,101,0.8)] dark:ring-white/10">
        <img
          src="/images/symbol-light.png"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="h-full w-full object-contain dark:hidden"
        />
        <img
          src="/images/symbol-dark.png"
          alt=""
          aria-hidden="true"
          width={32}
          height={32}
          className="hidden h-full w-full object-contain dark:block"
        />
      </span>
      <img
        src="/images/logo-light.svg"
        alt="GTMSip"
        className="h-7 w-auto dark:hidden"
      />
      <img
        src="/images/logo-dark.svg"
        alt="GTMSip"
        className="h-7 w-auto hidden dark:block"
      />
    </Link>
  );
}

export function ComingSoon({ className = "" }: { className?: string }) {
  return <span className={`badge-soon ${className}`}>Coming soon</span>;
}

/** Page hero header shared by all inner pages */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  comingSoon = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
  comingSoon?: boolean;
}) {
  return (
    <header className="relative overflow-hidden border-b border-stone-200 bg-gradient-to-b from-brand-50/70 to-white dark:border-white/10 dark:from-brand-950/30 dark:to-[#0b0a14]">
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
      <div className="container-x relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-3xl animate-fadeUp">
          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{eyebrow}</span>
            {comingSoon && <ComingSoon />}
          </div>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg dark:text-stone-400">
            {description}
          </p>
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </header>
  );
}

/** High-contrast closing CTA band */
export function CtaBand({
  title = "Lock in your early-bird access to GTMSip",
  body = "Join the first 100 users to get 50% lifetime discount, free custom AI workflow setup, and direct priority access to our AI sales and social platform.",
  primaryLabel = "Join the waitlist",
  primaryTo = "/about#waitlist",
  secondaryLabel = "View pricing",
  secondaryTo = "/pricing",
}: {
  title?: string;
  body?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section id="cta" className="relative overflow-hidden">
      <div className="container-x">
        <div className="noise relative overflow-hidden rounded-3xl bg-brand-700 px-6 py-14 text-center shadow-[0_30px_80px_-40px_rgba(109,40,217,0.9)] sm:px-12 sm:py-16 dark:bg-brand-800">
          {/* animated mesh gradient + aurora shimmer */}
          <div aria-hidden="true" className="cta-mesh pointer-events-none absolute inset-0 opacity-90" />
          <div aria-hidden="true" className="cta-aurora" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-400/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full bg-cyan-200/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-violet-50/90 sm:text-base">
              {body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openWaitlistModal}
                data-magnetic
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-extrabold text-brand-800 shadow-lg transition hover:bg-violet-50 active:translate-y-px sm:w-auto"
              >
                <span className="btn-shimmer" aria-hidden="true" />
                {primaryLabel}
                <ArrowRightIcon size={16} />
              </button>
              <Link
                to={secondaryTo}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
