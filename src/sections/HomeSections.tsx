import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CalendarMockup } from "../components/mockups/flows";
import { WaitlistForm } from "../components/forms/WaitlistForm";
import { ComingSoon } from "../components/ui";
import { Accordion } from "../components/Accordion";
import { HOME_FAQ } from "../data/faq";
import { ScrambleLabel } from "../components/cinematic/ScrambleLabel";
import { gsap, prefersReducedMotion } from "../lib/motion";
import {
  ArrowRightIcon,
  BuildingIcon,
  CheckIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  ShieldIcon,
  UsersIcon,
  WorkflowIcon,
} from "../components/icons";

/** Reveal helper: children rise + fade in with a stagger when entering view. */
function useReveal(selector: string, rootRef: React.RefObject<HTMLElement>, options: { stagger?: number; y?: number; flip?: boolean } = {}) {
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(selector);
      if (!els.length) return;
      gsap.fromTo(
        els,
        options.flip
          ? { opacity: 0, y: options.y ?? 40, rotateY: -38, transformPerspective: 900 }
          : { opacity: 0, y: options.y ?? 30 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: options.stagger ?? 0.1,
          scrollTrigger: {
            trigger: els[0],
            start: "top 86%",
            once: true,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, [selector, rootRef, options.stagger, options.y, options.flip]);
}

/* ------------------------------------------------------------------ */
/* Plan & Publish teaser with waitlist                                 */
/* ------------------------------------------------------------------ */
export function PlanTeaser() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // blurred calendar mockup sharpens slightly on scroll
      gsap.fromTo(
        ".plan-mockup",
        { filter: "blur(14px)", scale: 1.05, opacity: 0.75 },
        {
          filter: "blur(3px)",
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 80%",
            end: "center 55%",
            scrub: 0.6,
          },
        },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="plan"
      ref={rootRef}
      className="section overflow-hidden border-b border-stone-200 dark:border-white/10"
      aria-labelledby="plan-teaser-title"
    >
      <div className="container-x">
        <div className="grid items-center gap-10 rounded-3xl border border-stone-200 bg-gradient-to-br from-white via-white to-brand-50/60 p-6 sm:p-9 dark:border-white/10 dark:from-[#151228] dark:to-brand-950/30 lg:grid-cols-[0.95fr_1.15fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <ScrambleLabel text="Roadmap" />
              <ComingSoon className="badge-shimmer" />
            </div>
            <h2 id="plan-teaser-title" className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Plan &amp; Publish — your content calendar is coming.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              A multi-channel calendar for Instagram and WhatsApp posts with an
              approval queue for drafts. It's currently in development — join
              the waitlist and we'll email you once, when early access opens.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "One calendar for Instagram posts & WhatsApp broadcasts",
                "Approval queue with client sign-off before publishing",
                "Draft collaboration with comments on the post itself",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-stone-700 dark:text-stone-200">
                  <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-500" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <p className="mb-2.5 text-sm font-extrabold text-stone-800 dark:text-white">
                Get notified at launch
              </p>
              <WaitlistForm />
            </div>
          </div>
          <div className="plan-mockup">
            <CalendarMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Bento grid — teams & agencies                                       */
/* ------------------------------------------------------------------ */
export function TeamsBento() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(".bento-card", rootRef, { flip: true, stagger: 0.12 });

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // role rows highlight in sequence
      const rows = gsap.utils.toArray<HTMLElement>(".role-row");
      if (rows.length) {
        gsap.fromTo(
          rows,
          { backgroundColor: "rgba(139,92,246,0)" },
          {
            backgroundColor: "rgba(139,92,246,0.16)",
            duration: 0.45,
            stagger: 0.35,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".role-row", start: "top 85%", once: true },
          },
        );
      }
      // brand chips float
      gsap.to(".brand-chip", {
        y: -7,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="teams" ref={rootRef} className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="teams-title">
      <div className="container-x">
        <div className="max-w-2xl">
          <ScrambleLabel text="Built for teams & agencies">
            <UsersIcon size={13} />
          </ScrambleLabel>
          <h2 id="teams-title" className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            One login per teammate.{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              Clean lines per brand.
            </span>
          </h2>
        </div>

        <div className="mt-9 grid gap-4 lg:grid-cols-3" style={{ perspective: 1200 }}>
          {/* Large: multi-tenant orgs */}
          <article className="bento-card card card-hover card-tilt p-6 lg:col-span-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-400">
              <LayersIcon size={19} />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Multi-tenant organizations</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Each brand lives in its own workspace with separate channels,
              contacts, pipelines and automations — isolated at the database
              row level, so client data never blends together.
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Bloom Studio", "Northwind Agency", "EduWebinar"].map((brand) => (
                <li key={brand} className="chip brand-chip">
                  <BuildingIcon size={13} className="text-brand-500" />
                  {brand}
                </li>
              ))}
            </ul>
          </article>

          {/* Roles */}
          <article className="bento-card card card-hover card-tilt p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400">
              <UsersIcon size={19} />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Role-based access</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Three clear roles — no permission matrix to decode.
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {[
                { role: "Owner", desc: "billing & members" },
                { role: "Admin", desc: "channels & automations" },
                { role: "Agent", desc: "works conversations" },
              ].map((item) => (
                <div
                  key={item.role}
                  className="role-row flex items-center justify-between gap-2 rounded-lg bg-stone-50 px-3 py-2 dark:bg-white/[0.04]"
                >
                  <dt className="text-xs font-extrabold text-stone-800 dark:text-white">
                    {item.role}
                  </dt>
                  <dd className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                    {item.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </article>

          {/* Assignment */}
          <article className="bento-card card card-hover card-tilt p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-400/15 dark:text-violet-400">
              <WorkflowIcon size={19} />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Conversation assignment</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Assign manually, @mention a teammate, or route by tag with
              round-robin. Collision detection stops double replies.
            </p>
          </article>

          {/* Reporting */}
          <article className="bento-card card card-hover card-tilt p-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400">
              <ShieldIcon size={19} />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Per-brand reporting</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Response times, volume and pipeline metrics stay scoped to their
              workspace — client reports never mix.
            </p>
          </article>

          {/* Planned */}
          <article className="bento-card card border-dashed p-6 dark:border-white/20">
            <span className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-500 dark:bg-white/10 dark:text-stone-300">
                <CheckIcon size={19} />
              </span>
              <span className="badge-soon">Planned</span>
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Brand approval workflows</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Draft replies and scheduled posts routed to a client approver
              before anything goes out. In development alongside Plan &amp;
              Publish.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Security summary card                                               */
/* ------------------------------------------------------------------ */
export function SecuritySummary() {
  const rootRef = useRef<HTMLElement>(null);
  useReveal(".security-tile", rootRef, { stagger: 0.12, y: 26 });

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const shield = rootRef.current?.querySelector<SVGPathElement>(".shield-draw");
      if (shield) {
        const len = shield.getTotalLength();
        gsap.fromTo(
          shield,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.inOut",
            scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
          },
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const points = [
    {
      icon: LockIcon,
      title: "Row-level tenant isolation",
      body: "Every query is scoped to its workspace.",
    },
    {
      icon: ShieldIcon,
      title: "Encrypted connection & token storage",
      body: "Channel tokens are encrypted at rest.",
    },
    {
      icon: CheckIcon,
      title: "Signed webhooks",
      body: "HMAC verification on every delivery.",
    },
    {
      icon: MailIcon,
      title: "Window & opt-out enforcement",
      body: "24-hour rules and STOP handled automatically.",
    },
  ];

  return (
    <section id="security" ref={rootRef} className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="security-title">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 p-6 text-white sm:p-10 dark:bg-[#120f24]">
          {/* radar / grid backdrop */}
          <div aria-hidden="true" className="security-radar pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                {/* self-drawing shield */}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    className="shield-draw"
                    d="M12 3 5 6v5.5c0 4.3 2.9 7.6 7 9.5 4.1-1.9 7-5.2 7-9.5V6l-7-3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                Security &amp; compliance
              </span>
              <h2 id="security-title" className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
                Built with guardrails, not just promises.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-300">
                GTMSip is built with row-level isolation, encrypted tokens,
                webhook signature verification, and automatic enforcement of
                Meta's messaging-window and opt-out rules.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/security"
                  data-magnetic
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-400"
                >
                  Security &amp; Trust
                  <ArrowRightIcon size={15} />
                </Link>
                <Link
                  to="/legal/meta-data-use"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Meta Data Use Statement
                </Link>
              </div>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {points.map((point) => (
                <li
                  key={point.title}
                  className="security-tile scan-tile relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                >
                  <point.icon size={18} className="text-cyan-400" />
                  <p className="mt-2.5 text-sm font-extrabold text-white">
                    {point.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                    {point.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
export function HomeFaq() {
  return (
    <section id="faq" className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="faq-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ScrambleLabel text="FAQ" />
            <h2 id="faq-title" className="mt-5 text-3xl font-extrabold sm:text-4xl">
              Practical answers,
              <br />
              <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
                no hand-waving.
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
              Including the platform rules we follow and the ones we can't
              change. Need more detail?{" "}
              <Link to="/about#contact" className="font-bold text-brand-600 underline underline-offset-2 dark:text-brand-400">
                Ask us directly
              </Link>
              .
            </p>
          </div>
          <Accordion
            items={HOME_FAQ.map((item) => ({
              id: item.id,
              question: item.question,
              answer: item.answer,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
