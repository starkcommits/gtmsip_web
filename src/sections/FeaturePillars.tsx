import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Mockup } from "../components/mockups";
import type { PreviewKey } from "../data/features";
import { ArrowRightIcon, CheckIcon } from "../components/icons";
import { ScrambleLabel } from "../components/cinematic/ScrambleLabel";
import { scrollToY } from "../lib/lenis";
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from "../lib/motion";

interface Pillar {
  id: string;
  label: string;
  preview: PreviewKey;
  title: string;
  description: string;
  bullets: string[];
  href: string;
}

const PILLARS: Pillar[] = [
  {
    id: "ai",
    label: "Sales Automation",
    preview: "integrations",
    title: "AI Sales Automation Software & Claude MCP",
    description:
      "Firecrawl scrapes B2B lead lists, Google plugins store contacts in Sheets, and Claude MCP powers AI sales automation software across your pipeline.",
    bullets: [
      "AI sales automation software powered by Claude MCP",
      "B2B lead generation software with Firecrawl extraction",
      "Google Sheets & Drive plugins for real-time lead sync",
      "AI workflow chains for scoring, enrichment & routing",
    ],
    href: "/solutions/ai-sales-automation",
  },
  {
    id: "inbox",
    label: "WhatsApp CRM",
    preview: "inbox",
    title: "One queue for WhatsApp and Instagram",
    description:
      "Every message, comment reply and DM lands in one shared queue with assignment, collision detection and the full contact record beside it.",
    bullets: [
      "Shared team inbox with Open / Snoozed / Resolved states",
      "CRM tags, owner and notes on every thread",
      "24-hour window countdown per conversation",
      "Canned replies, internal notes and @mentions",
    ],
    href: "/solutions/whatsapp-marketing",
  },
  {
    id: "automations",
    label: "Marketing Automation",
    preview: "commentDm",
    title: "Marketing Automation Software for Social & Chat",
    description:
      "Keyword-triggered replies on Reels and posts continue in the DM, while drip marketing automation flows follow up until a human takes over.",
    bullets: [
      "Marketing automation software for WhatsApp & Instagram",
      "Public reply → private DM → automated CRM lead",
      "Multi-step drip flows with wait & branch steps",
      "100% compliant with official Meta Business APIs",
    ],
    href: "/solutions/instagram-automation",
  },
  {
    id: "crm",
    label: "CRM & Pipelines",
    preview: "pipeline",
    title: "Deals that remember the chat",
    description:
      "Move deals across your own stages and keep the conversation that produced each one one click away.",
    bullets: [
      "Custom pipeline stages with drag & drop",
      "Leads captured from comments, DMs and forms",
      "Conversation history attached to every deal",
      "Filters by owner, stage and value",
    ],
    href: "/features/leads-pipelines-payments",
  },
  {
    id: "payments",
    label: "Payments & Meta Ads",
    preview: "analytics",
    title: "From message to money to measurement",
    description:
      "Attach Razorpay Payment Links to deals and read ad performance through official Meta reporting APIs — next to the conversations they produced.",
    bullets: [
      "Razorpay Payment Links with live status on the deal",
      "Card details stay on Razorpay's checkout",
      "First-response & resolution metrics for the team",
      "Campaign reporting for accounts you authorize",
    ],
    href: "/features/analytics-meta-ads",
  },
  {
    id: "teams",
    label: "Teams & Agencies",
    preview: "team",
    title: "Multi-brand workspaces, clear roles",
    description:
      "A workspace per brand, three simple roles, and assignment rules that keep conversations from falling through the cracks.",
    bullets: [
      "Row-level separation between workspaces",
      "Owner, Admin and Agent roles",
      "Manual & rule-based conversation assignment",
      "Brand approval workflows (Planned)",
    ],
    href: "/features/teams-roles-workspaces",
  },
];

/* ------------------------------------------------------------------ */
/* Live telemetry overlay (typed webhook rows + JSON + status)         */
/* ------------------------------------------------------------------ */

const TELEMETRY: Record<string, { rows: string[]; json: string[]; amber?: number }> = {
  ai: {
    rows: ["POST /v1/scrape  →  200", "GET  /sheets/values  →  200", "MCP  /claude/invoke  →  200"],
    json: ['{ "keyword": "bloom studio",', '  "rows": 240, "dest": "sheets" }'],
  },
  inbox: {
    rows: ["WA  message.received  →  200", "IG  message.created   →  200", "WS  thread.assigned    →  200"],
    json: ['{ "thread": "th_4821",', '  "window": "24h open" }'],
  },
  automations: {
    rows: ["IG  comment.keyword   →  200", "IG  dm.private_reply  →  200", "FL  drip.step_2       →  200"],
    json: ['{ "trigger": "INFO",', '  "post": "summer-lookbook" }'],
  },
  crm: {
    rows: ["CRM  deal.created     →  200", "CRM  stage.changed    →  200", "WS  collision.guard   →  200"],
    json: ['{ "deal": "dl_1193",', '  "stage": "New lead" }'],
  },
  payments: {
    rows: ["PAY  link.created     →  200", "PAY  payment.captured →  200", "ADS  insights.sync    →  200"],
    json: ['{ "order": "#4821",', '  "status": "paid" }'],
    amber: 2,
  },
  teams: {
    rows: ["WS   member.invited   →  200", "RBAC role.applied     →  200", "ASG  roundRobin.tick  →  200"],
    json: ['{ "workspace": "Bloom Studio",', '  "role": "Agent" }'],
  },
};

function Telemetry({ pillarId }: { pillarId: string }) {
  const data = TELEMETRY[pillarId] ?? TELEMETRY.ai;
  const [visible, setVisible] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    setVisible(0);
    setTyped("");
    const full = data.json.join("\n");
    let i = 0;
    const typer = window.setInterval(() => {
      i += 2;
      setTyped(full.slice(0, i));
      if (i >= full.length) window.clearInterval(typer);
    }, 24);
    const rowTimer = window.setInterval(() => {
      setVisible((v) => {
        if (v >= data.rows.length) {
          window.clearInterval(rowTimer);
          return v;
        }
        return v + 1;
      });
    }, 340);
    return () => {
      window.clearInterval(typer);
      window.clearInterval(rowTimer);
    };
  }, [pillarId, data]);

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 rounded-b-2xl border-t border-white/10 bg-[#0B0A1A]/92 p-3 font-mono text-[10.5px] leading-relaxed backdrop-blur-sm">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-[0.14em] text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-emerald-400" />
          Endpoint healthy
        </span>
        <span className="text-stone-500">webhook · demo</span>
      </div>
      <ul className="space-y-0.5">
        {data.rows.slice(0, visible).map((row, i) => (
          <li
            key={row}
            className={`telemetry-row ${
              data.amber === i ? "text-amber-400" : "text-cyan-300/90"
            }`}
          >
            {data.amber === i ? `↻ ${row}  · retry` : row}
          </li>
        ))}
      </ul>
      <pre className="mt-1.5 overflow-hidden whitespace-pre-wrap border-l-2 border-brand-500/60 pl-2 text-brand-300/90">
        {typed}
        <span className="telemetry-caret">▌</span>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pillar content (left copy + morphing mockup)                        */
/* ------------------------------------------------------------------ */

function PillarContent({ pillar }: { pillar: Pillar }): ReactNode {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.3fr]">
      <div className="copy-swap">
        <h3 className="text-2xl font-extrabold sm:text-3xl">{pillar.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {pillar.description}
        </p>
        <ul className="mt-5 space-y-2.5">
          {pillar.bullets.map((bullet, i) => (
            <li
              key={bullet}
              className="copy-bullet flex items-start gap-2.5 text-sm font-semibold text-stone-700 dark:text-stone-200"
              style={{ animationDelay: `${0.08 + i * 0.07}s` }}
            >
              <CheckIcon size={16} className="mt-0.5 shrink-0 text-brand-500" />
              {bullet}
            </li>
          ))}
        </ul>
        <Link
          to={pillar.href}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-600 transition hover:gap-2.5 dark:text-brand-400"
        >
          Explore this feature
          <ArrowRightIcon size={15} />
        </Link>
      </div>

      {/* morphing browser mockup with live inner UI */}
      <div className="mock-stage" aria-hidden="false">
        <div className="mock-tilt">
          <div className="mock-frame relative overflow-hidden rounded-2xl border border-white/15 bg-[#151228] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            {/* browser chrome */}
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3.5 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2 truncate font-mono text-[10px] text-stone-500">
                app.gtmsip.com/{pillar.id}
              </span>
              <span className="ml-auto font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-400">
                ● live
              </span>
            </div>
            <div className="relative">
              <div key={pillar.id} className="mock-body animate-mockIn">
                <Mockup name={pillar.preview} />
              </div>
              <Telemetry pillarId={pillar.id} />
              {/* scanline shimmer */}
              <span className="mock-scan" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FeaturePillars — pinned 600vh product tour                          */
/* ------------------------------------------------------------------ */

export function FeaturePillars() {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLElement>(null);
  const railFillRef = useRef<HTMLDivElement>(null);
  const mockRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const activePillar = PILLARS[active];

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const ctx = gsap.context(() => {
        const st = ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 6}`,
          pin: ".pillars-stage",
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const idx = Math.min(PILLARS.length - 1, Math.floor(p * PILLARS.length));
            setActive((prev) => (prev === idx ? prev : idx));
            if (railFillRef.current) {
              railFillRef.current.style.transform = `scaleY(${p})`;
            }
            if (mockRef.current) {
              // gentle 3D morph across the tour
              const local = p * PILLARS.length - idx;
              const rx = Math.sin(p * Math.PI * 3) * 3.5;
              const ry = Math.cos(p * Math.PI * 2) * 6;
              const y = Math.sin(local * Math.PI) * -8;
              mockRef.current.style.setProperty("--mock-rx", `${rx}deg`);
              mockRef.current.style.setProperty("--mock-ry", `${ry}deg`);
              mockRef.current.style.setProperty("--mock-y", `${y}px`);
            }
          },
        });
        stRef.current = st;
      }, rootRef);
      return () => {
        ctx.revert();
        stRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  const goToPillar = (idx: number) => {
    const st = stRef.current;
    if (!st) {
      setActive(idx);
      return;
    }
    const target = st.start + (st.end - st.start) * ((idx + 0.5) / PILLARS.length);
    scrollToY(target);
  };

  return (
    <section id="pillars" ref={rootRef} aria-labelledby="pillars-title" className="relative">
      <div className="pillars-stage relative flex min-h-[100svh] flex-col justify-center overflow-hidden py-16 sm:py-20">
        <div className="container-x">
          <div className="max-w-2xl">
            <ScrambleLabel text="Product tour" />
            <h2 id="pillars-title" className="mt-5 text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Six pillars.{" "}
              <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
                One workspace.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400">
              From scraped lead to closed deal — scrub through the pillars below;
              each preview runs on synthetic demo data such as Aarav Sharma,
              Bloom Studio and Order&nbsp;#4821.
            </p>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[auto_1fr]">
            {/* progress rail */}
            <div className="hidden w-11 flex-col items-center gap-3 self-stretch lg:flex" aria-hidden="true">
              <span className="font-mono text-[9px] font-bold tracking-widest text-stone-500 [writing-mode:vertical-rl]">
                PILLARS
              </span>
              <div className="relative w-px flex-1 bg-stone-200 dark:bg-white/10">
                <div
                  ref={railFillRef}
                  className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-gradient-to-b from-brand-500 to-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.9)]"
                  style={{ transform: "scaleY(0)" }}
                />
              </div>
              <span className="font-mono text-[10px] font-bold tabular-nums text-brand-400">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[9px] text-stone-500">06</span>
            </div>

            <div>
              {/* tabs — clickable, synced with scroll progress */}
              <div
                role="tablist"
                aria-label="Feature pillars"
                className="-mx-1 flex gap-1 overflow-x-auto pb-1"
              >
                {PILLARS.map((pillar, idx) => {
                  const selected = idx === active;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      id={`tab-${pillar.id}`}
                      aria-selected={selected}
                      aria-controls={`panel-${pillar.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => goToPillar(idx)}
                      className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition duration-200 ${
                        selected
                          ? "bg-brand-600 text-white shadow-[0_10px_24px_-12px_rgba(124,58,237,0.9)]"
                          : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white"
                      }`}
                    >
                      {pillar.label}
                    </button>
                  );
                })}
              </div>

              {/* active panel — cross-fades as you scrub */}
              <div className="mt-6" ref={mockRef}>
                <div
                  key={activePillar.id}
                  role="tabpanel"
                  id={`panel-${activePillar.id}`}
                  aria-labelledby={`tab-${activePillar.id}`}
                  tabIndex={0}
                >
                  <PillarContent pillar={activePillar} />
                </div>
              </div>
              <p className="sr-only" aria-live="polite">
                Showing {activePillar.label}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
