import { useLayoutEffect, useRef, useState } from "react";
import { AlertIcon } from "../components/icons";
import { Avatar, Pill } from "../components/mockups/common";
import { ScrambleLabel } from "../components/cinematic/ScrambleLabel";
import { scrollToY } from "../lib/lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "../lib/motion";

const STEPS = [
  {
    id: "comment",
    n: 1,
    label: "Comment arrives",
    title: "Someone comments a keyword",
    body: "A follower comments “INFO” on your Reel or post. GTMSip detects the keyword against that post's automation rule.",
    visual: (
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <p className="text-xs font-extrabold text-stone-700 dark:text-stone-200">
          📹 Summer lookbook · Reel · <span data-countup="12.4" data-countup-decimals="1" data-countup-suffix="k views">12.4k views</span>
        </p>
        <p className="type-in mt-3 rounded-lg rounded-bl-sm bg-white px-3 py-2 text-sm font-bold text-stone-700 shadow-sm dark:bg-[#272247] dark:text-stone-200">
          bloomstudio: INFO
        </p>
        <p className="mt-2 text-[11px] font-bold text-stone-500 dark:text-stone-400">
          Trigger matched · rule: “lookbook keyword”
        </p>
      </div>
    ),
  },
  {
    id: "reply",
    n: 2,
    label: "Public reply",
    title: "Instant public comment reply",
    body: "GTMSip posts your configured reply under their comment — visible to everyone, which keeps engagement on the post itself.",
    visual: (
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <p className="text-xs font-extrabold text-stone-700 dark:text-stone-200">
          📹 Summer lookbook · Reel
        </p>
        <p className="mt-3 rounded-lg rounded-bl-sm bg-white px-3 py-2 text-sm font-bold text-stone-700 shadow-sm dark:bg-[#272247] dark:text-stone-200">
          bloomstudio: INFO
        </p>
        <p className="bubble-pop mt-2 rounded-lg rounded-br-sm bg-brand-600 px-3 py-2 text-sm font-semibold text-white">
          Sent you the details in your DMs! ✉️
        </p>
        <p className="mt-2 text-[11px] font-bold text-brand-600 dark:text-brand-400">
          ✓ Public reply posted · <span data-countup="0.8" data-countup-decimals="1" data-countup-suffix="s">0.8s</span>
        </p>
      </div>
    ),
  },
  {
    id: "dm",
    n: 3,
    label: "Private DM",
    title: "Automated private message",
    body: "The conversation continues with the single private reply Instagram allows per comment — carrying your link or message, inside the 24-hour window.",
    visual: (
      <div className="rounded-xl border border-stone-200 bg-[#16132e] p-4 dark:border-white/10 dark:bg-black/40">
        <p className="text-[11px] font-extrabold uppercase tracking-wide text-stone-500">
          Direct message · private
        </p>
        <p className="slide-left mt-3 rounded-lg rounded-bl-sm bg-white/10 px-3 py-2 text-sm text-stone-200">
          Hey! Here's the lookbook and pricing you asked for 👇
        </p>
        <p className="slide-left mt-2 inline-block rounded-lg rounded-br-sm bg-brand-600 px-3 py-2 text-sm font-semibold text-white" style={{ animationDelay: "0.15s" }}>
          gtsip.com/bloom-lookbook
        </p>
        <p className="mt-2.5 flex flex-wrap gap-2">
          <Pill tone="green">✓ Delivered</Pill>
          <Pill tone="blue">24h window open</Pill>
        </p>
      </div>
    ),
  },
  {
    id: "lead",
    n: 4,
    label: "Lead in CRM",
    title: "Lead captured in your CRM",
    body: "The contact, the keyword and the source post are saved as a lead with an owner — ready for your team to pick up from the shared inbox.",
    visual: (
      <div className="rounded-xl border border-stone-200 bg-white p-4 dark:border-white/10 dark:bg-[#1e1a3a]">
        <p className="flex items-center gap-3">
          <Avatar initials="BS" tone="violet" />
          <span>
            <span className="block text-sm font-extrabold text-stone-800 dark:text-white">
              Bloom Studio
            </span>
            <span className="block text-[11px] font-bold text-stone-500 dark:text-stone-400">
              Lead · created 12:04:11
            </span>
          </span>
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill tone="blue">keyword: INFO</Pill>
          <Pill tone="green">Owner: Arjun M.</Pill>
          <Pill>Stage: New lead</Pill>
        </div>
        <p className="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-[11.5px] font-semibold text-stone-500 dark:bg-white/[0.05] dark:text-stone-400">
          Source: Instagram comment on “Summer lookbook”
        </p>
      </div>
    ),
  },
];

export function CommentToDmWalkthrough() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const path = pathRef.current;
        const len = path?.getTotalLength() ?? 0;
        if (path && len) {
          path.style.strokeDasharray = `${len}`;
          path.style.strokeDashoffset = `${len}`;
        }
        if (calloutRef.current) {
          calloutRef.current.style.opacity = "0";
        }

        const stRefTarget = stRef;
        const instance = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 4}`,
          pin: ".walkthrough-stage",
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
            setActive((prev) => (prev === idx ? prev : idx));
            if (path && len) {
              path.style.strokeDashoffset = `${len * (1 - Math.min(1, p * 1.05))}`;
            }
            if (calloutRef.current) {
              const reveal = Math.max(0, Math.min(1, (p - 0.82) / 0.14));
              calloutRef.current.style.opacity = `${reveal}`;
              calloutRef.current.style.transform = `translateY(${(1 - reveal) * 24}px)`;
            }
          },
        });
        stRef.current = instance;
        void stRefTarget;
      }, rootRef);
      return () => {
        ctx.revert();
        stRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const goToStep = (idx: number) => {
    const st = stRef.current;
    if (!st) {
      setActive(idx);
      return;
    }
    const target = st.start + (st.end - st.start) * ((idx + 0.5) / STEPS.length);
    scrollToY(target);
  };

  const current = STEPS[active];

  return (
    <section
      id="walkthrough"
      ref={rootRef}
      className="relative border-b border-stone-200 bg-stone-50/60 dark:border-white/10 dark:bg-white/[0.02]"
      aria-labelledby="walkthrough-title"
    >
      <div className="walkthrough-stage relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-16 sm:py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <ScrambleLabel text="Comment-to-DM · live walkthrough" />
            <h2 id="walkthrough-title" className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              From “INFO” comment to{" "}
              <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
                booked lead
              </span>{" "}
              in four steps.
            </h2>
          </div>

          <div className="mt-9 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            {/* Step selector with animated SVG connector */}
            <div className="relative">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-2 sm:block"
                viewBox="0 0 2 100"
                preserveAspectRatio="none"
              >
                <path
                  ref={pathRef}
                  d="M1 0 L1 100"
                  stroke="url(#walk-grad)"
                  strokeWidth="2"
                  fill="none"
                />
                <defs>
                  <linearGradient id="walk-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#22D3EE" />
                  </linearGradient>
                </defs>
              </svg>

              <ol className="relative space-y-2.5" aria-label="Comment-to-DM steps">
                {STEPS.map((step, idx) => {
                  const isActive = idx === active;
                  const isDone = idx < active;
                  return (
                    <li key={step.id}>
                      <button
                        type="button"
                        aria-current={isActive ? "step" : undefined}
                        onClick={() => goToStep(idx)}
                        className={`flex w-full items-start gap-3.5 rounded-2xl border p-4 text-left transition duration-300 ${
                          isActive
                            ? "step-active border-brand-500 bg-white shadow-[0_16px_40px_-24px_rgba(124,58,237,0.7)] dark:border-brand-400/50 dark:bg-[#151228]"
                            : "border-stone-200 bg-white/60 hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/30"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                            isActive
                              ? "bg-brand-600 text-white"
                              : isDone
                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                                : "bg-stone-100 text-stone-500 dark:bg-white/10 dark:text-stone-300"
                          }`}
                        >
                          {isDone ? "✓" : step.n}
                        </span>
                        <span>
                          <span className="block text-sm font-extrabold text-stone-800 dark:text-white">
                            {step.label}
                          </span>
                          <span className="mt-1 block text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                            {step.body}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Active visual — simulated Instagram flow */}
            <div>
              <div
                key={current.id}
                className="animate-fadeUp"
                role="group"
                aria-label={`Step ${current.n}: ${current.title}`}
              >
                <div className="card card-spot relative p-5 sm:p-6">
                  <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-brand-400/50" />
                  <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan-400/40" />
                  <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] text-white">
                      {current.n}
                    </span>
                    {current.title}
                  </p>
                  <div className="mt-4 max-w-md">{current.visual}</div>
                </div>
              </div>

              {/* Honest callout — fades up at the end of the scene */}
              <div
                ref={calloutRef}
                className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-400/30 dark:bg-amber-400/[0.08]"
              >
                <AlertIcon
                  size={18}
                  className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400"
                />
                <div>
                  <p className="text-sm font-extrabold text-amber-800 dark:text-amber-300">
                    The honest version of how this works
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[13px] leading-relaxed text-amber-800/90 dark:text-amber-200/90">
                    <li>
                      <strong>One private reply per comment</strong> — that's an
                      Instagram platform rule, and GTMSip automates exactly that
                      single message.
                    </li>
                    <li>
                      <strong>24-hour window</strong> — free-form replies are only
                      possible within 24 hours of the person messaging you;
                      after that, only approved templates.
                    </li>
                    <li>
                      <strong>Automatic opt-out</strong> — if someone opts out,
                      GTMSip records it and stops all further automated messages
                      to that contact.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
