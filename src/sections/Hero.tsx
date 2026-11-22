import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon, ZapIcon } from "../components/icons";
import { ScrambleLabel } from "../components/cinematic/ScrambleLabel";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "../lib/motion";
import { openWaitlistModal, useWaitlistCount } from "../lib/waitlist";

/* ------------------------------------------------------------------ */
/* Headline: word-by-word blur-to-sharp reveal + mask wipe             */
/* ------------------------------------------------------------------ */

type TitleWord = { text: string; accent?: boolean };

const TITLE: TitleWord[] = [
  { text: "Find" },
  { text: "leads" },
  { text: "with" },
  { text: "AI.", accent: true },
  { text: "Close" },
  { text: "deals" },
  { text: "in" },
  { text: "one" },
  { text: "workspace." },
];

function AnimatedTitle() {
  return (
    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="sr-only">Automate Your Sales, Marketing & Customer Engagement with AI</span>
          <span aria-hidden="true">
            {TITLE.map((word, wordIdx) => (
              <span
                key={word.text + wordIdx}
                className="hero-word mr-3 inline-block overflow-hidden align-bottom last:mr-0 sm:mr-4"
              >
                <span
                  className={`hero-word-inner inline-block ${word.accent
                      ? "font-serif font-normal italic text-brand-500 [text-shadow:0_0_28px_rgba(139,92,246,0.65)] dark:text-brand-400"
                      : ""
                    }`}
                >
                  {word.text}
                </span>
              </span>
        ))}
        </span>
    </h1>
  );
}

/* ------------------------------------------------------------------ */
/* Hero — pinned scene 0 with warp exit                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  const { count, total, remaining } = useWaitlistCount();
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      // Intro: blur-to-sharp word reveal with mask wipe
      gsap.fromTo(
        ".hero-word-inner",
        { yPercent: 110, filter: "blur(14px)", opacity: 0 },
        {
          yPercent: 0,
          filter: "blur(0px)",
          opacity: 1,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.06,
          delay: 1.15, // after loader
        },
      );
      gsap.fromTo(
        ".hero-stagger",
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.09,
          delay: 1.55,
        },
      );

      // Scroll: headline scales/fades back → warp into scene 2
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=90%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });
      tl.to(
        contentRef.current,
        {
          scale: 1.18,
          opacity: 0,
          filter: "blur(10px)",
          y: -60,
          ease: "power2.in",
          duration: 1,
        },
        0,
      );
      tl.to(".hero-glow-left", { x: -160, opacity: 0, duration: 1 }, 0);
      tl.to(".hero-glow-right", { x: 160, opacity: 0, duration: 1 }, 0);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-white/10 bg-transparent"
    >
      {/* Atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-pattern opacity-50" />
      <div
        aria-hidden="true"
        className="hero-glow-left pointer-events-none absolute -left-40 -top-52 h-[480px] w-[480px] rounded-full bg-brand-500/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="hero-glow-right pointer-events-none absolute -right-32 top-20 h-[380px] w-[380px] rounded-full bg-cyan-400/15 blur-3xl"
      />
      {/* corner brackets */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-6 hidden lg:block">
        <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-brand-400/40" />
        <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-cyan-400/40" />
        <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-cyan-400/30" />
        <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-brand-400/30" />
      </div>

      {/* HUD micro labels */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden font-mono text-[10px] font-bold tracking-[0.18em] text-stone-500/70 dark:text-stone-400/60 lg:block">
        <span className="absolute left-10 top-24 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-emerald-400" />
          SYS.ONLINE
        </span>
        <span className="absolute right-10 top-24">LATENCY 12ms</span>
        <span className="absolute left-10 bottom-24">WEBHOOK 200</span>
        <span className="absolute right-10 bottom-24 text-brand-400/70">SCROLL TO SCRUB ▾</span>
      </div>

      {/* Content */}
      <div className="container-x relative z-10 py-24 text-center">
        <div ref={contentRef} className="mx-auto max-w-4xl" style={{ willChange: "transform, opacity, filter" }}>
          {/* Logo */}
          <div className="hero-stagger relative mx-auto mb-8 flex justify-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 mx-auto h-24 w-24 rounded-full bg-brand-500/30 blur-2xl"
            />
            <div className="relative flex h-[88px] w-[88px] items-center justify-center rounded-[22px] border border-stone-200/80 bg-white/95 p-3.5 shadow-[0_18px_45px_-18px_rgba(124,58,237,0.25)] ring-1 ring-stone-900/5 backdrop-blur-sm dark:border-white/15 dark:bg-[#121024]/90 dark:shadow-[0_18px_45px_-18px_rgba(46,16,101,0.65)] dark:ring-white/15">
              <img
                src="/images/symbol-light-2x.png"
                alt="GTMSip"
                width={72}
                height={72}
                className="h-full w-full object-contain dark:hidden"
              />
              <img
                src="/images/symbol-dark-2x.png"
                alt="GTMSip"
                width={72}
                height={72}
                className="hidden h-full w-full object-contain dark:block"
              />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="hero-stagger flex justify-center">
            <ScrambleLabel text="AI for sales & social · Firecrawl · Claude MCP">
              <ZapIcon size={13} />
            </ScrambleLabel>
          </div>

          {/* Title */}
          <div className="mt-7">
            <AnimatedTitle />
          </div>

          {/* Subcopy */}
          <p className="hero-stagger mx-auto mt-6 max-w-2xl text-base leading-relaxed text-stone-500 sm:text-lg dark:text-stone-400">
            GTMSip is the AI-driven sales and social platform. Firecrawl scrapes
            lead lists, Google plugins pull and store data in your sheets, and
            Claude MCP wires it all into AI workflows — with a shared WhatsApp
            &amp; Instagram inbox to close every conversation.
          </p>

          {/* Special Offer & Spots Tracker Badge */}
          <div className="hero-stagger mt-6 flex justify-center">
            <button
              type="button"
              onClick={openWaitlistModal}
              className="group inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-brand-500/30 bg-brand-50/90 px-4 py-1.5 text-xs font-bold text-brand-800 shadow-sm transition hover:border-brand-500 hover:bg-brand-100/90 dark:border-brand-400/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500/20"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Special Offer: First 100 users get 50% lifetime discount</span>
              <span className="rounded-full bg-brand-600 px-2 py-0.5 font-mono text-[11px] font-extrabold text-white">
                {count}/{total} spots
              </span>
            </button>
          </div>

          {/* CTAs */}
          <div className="hero-stagger mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={openWaitlistModal}
              data-magnetic
              className="group btn-primary relative overflow-hidden px-8 py-3.5 text-base"
            >
              <span className="btn-shimmer" aria-hidden="true" />
              Join the waitlist
              <ArrowRightIcon
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
            <Link to="/how-it-works" data-magnetic className="btn-secondary px-7 py-3.5">
              See how it works
            </Link>
          </div>

          {/* Trust line */}
          <p className="hero-stagger mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-semibold text-stone-500 dark:text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon size={13} className="text-brand-500" />
              Firecrawl-powered lead scraping
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon size={13} className="text-brand-500" />
              Claude MCP &amp; AI workflows
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon size={13} className="text-brand-500" />
              Google Sheets &amp; Drive plugins
            </span>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckIcon size={13} className="text-brand-500" />
              Official WhatsApp Business &amp; Instagram APIs
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Trust strip — velocity-linked marquee                                */
/* ------------------------------------------------------------------ */

const TRUST_ITEMS = [
  {
    title: "Firecrawl Lead Scraping",
    detail: "Scrape targeted lead lists from the web and push them straight into your pipeline.",
  },
  {
    title: "Claude MCP Endpoint",
    detail: "Approved AI assistants read and act on lead, conversation and payment events in real time.",
  },
  {
    title: "Google Plugins for Data",
    detail: "Scrape with Google plugins and store results in Sheets and Drive — no copy-paste.",
  },
  {
    title: "AI Workflows",
    detail: "Chain scraping, enrichment, follow-ups and handoffs into workflows your team triggers.",
  },
  {
    title: "Built on Official WhatsApp Business & Instagram APIs",
    detail: "Connected through Meta's official business APIs — no unofficial automation.",
  },
  {
    title: "Automated Opt-Out & 24-Hour Window Compliance",
    detail: "STOP is honoured automatically; window state is visible on every thread.",
  },
];

export function TrustStrip() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const track = rootRef.current?.querySelector<HTMLElement>(".marquee-track");
      if (!track) return;

      // continuous marquee whose speed is boosted by scroll velocity
      const items = Array.from(track.querySelectorAll<HTMLElement>(".marquee-item"));
      let x = 0;
      let velocity = 0;
      let half = track.scrollWidth / 2;
      let raf = 0;

      const measure = () => {
        half = track.scrollWidth / 2;
      };
      window.addEventListener("resize", measure);

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          velocity = self.getVelocity() / 900;
        },
      });

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const base = 0.6;
        const speed = base + Math.min(6, Math.abs(velocity)) * Math.sign(velocity || 1);
        x -= speed;
        velocity *= 0.94;
        if (half > 0 && x <= -half) x += half;
        track.style.transform = `translate3d(${x}px,0,0)`;

        // light up items crossing the viewport centre
        const center = window.innerWidth / 2;
        for (const item of items) {
          const rect = item.getBoundingClientRect();
          const mid = rect.left + rect.width / 2;
          const lit = Math.abs(mid - center) < rect.width * 0.6;
          item.classList.toggle("marquee-lit", lit);
        }
      };
      raf = requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", measure);
        st.kill();
      };
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const row = (key: string) => (
    <ul key={key} className="flex shrink-0 items-stretch gap-4 pr-4" aria-hidden={key === "b"}>
      {TRUST_ITEMS.map((item) => (
        <li
          key={item.title}
          className="marquee-item glass-panel relative w-[300px] shrink-0 rounded-2xl p-4 sm:w-[340px]"
        >
          <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-brand-400/50" />
          <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-cyan-400/40" />
          <span className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-400/15 text-brand-400">
              <CheckIcon size={15} />
            </span>
            <span>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500 dark:text-stone-400">
                {String(TRUST_ITEMS.indexOf(item) + 1).padStart(2, "0")} / SYS.CHECK
              </span>
              <span className="mt-1 block text-[13px] font-extrabold leading-snug text-stone-800 dark:text-stone-100">
                {item.title}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {item.detail}
              </span>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="trust"
      ref={rootRef}
      aria-label="Architecture highlights"
      className="relative overflow-hidden border-b border-white/10 bg-white/60 py-8 dark:bg-[#0B0A1A]/70"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0B0A1A]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0B0A1A]" />
      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max">
          {row("a")}
          {row("b")}
        </div>
      </div>
      <p className="sr-only">
        Firecrawl lead scraping, Claude MCP endpoint, Google plugins for data,
        AI workflows, official WhatsApp Business &amp; Instagram APIs, and
        automated opt-out &amp; 24-hour window compliance.
      </p>
    </section>
  );
}
