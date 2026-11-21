import { Avatar, MockFrame, Pill } from "./common";

/* ------------------------------------------------------------------ */
/* Broadcasts + automated drip flows                                   */
/* ------------------------------------------------------------------ */
export function BroadcastMockup({ className = "" }: { className?: string }) {
  const campaigns = [
    { name: "Monsoon drop · segment", status: "Sent", size: "1,240", tone: "green" as const },
    { name: "Webinar reminder · day 1", status: "Scheduled", size: "318", tone: "blue" as const },
    { name: "Win-back · 30d inactive", status: "Draft", size: "—", tone: "neutral" as const },
  ];

  const flow = [
    { title: "Trigger · keyword “INFO”", meta: "Instagram comment or WhatsApp message", tone: "blue" as const },
    { title: "Send template · welcome_v3", meta: "Approved template · segment: new-leads", tone: "green" as const },
    { title: "Wait · 1 day", meta: "Skip if replied or opted out", tone: "neutral" as const },
    { title: "If no reply → follow_up_v2", meta: "Second approved template", tone: "amber" as const },
    { title: "If reply → assign to Agent", meta: "Enters shared inbox with source tag", tone: "green" as const },
  ];

  return (
    <MockFrame title="app.gtsip.com / broadcasts" className={className}>
      <div className="grid gap-3 sm:grid-cols-[190px_1fr]">
        <div className="rounded-xl bg-stone-50 p-2.5 dark:bg-white/[0.04]">
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Broadcasts
          </p>
          <ul className="mt-2 space-y-2">
            {campaigns.map((c) => (
              <li
                key={c.name}
                className="rounded-lg border border-stone-200 bg-white p-2 dark:border-white/10 dark:bg-[#1e1a3a]"
              >
                <p className="truncate text-[10.5px] font-extrabold text-stone-800 dark:text-white">
                  {c.name}
                </p>
                <p className="mt-1 flex items-center justify-between gap-1">
                  <Pill tone={c.tone}>{c.status}</Pill>
                  <span className="text-[9.5px] font-bold text-stone-500 dark:text-stone-400">
                    {c.size} recipients
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-stone-200 p-3 dark:border-white/10">
          <p className="flex items-center justify-between text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Drip flow · new leads
            <Pill tone="green">Active</Pill>
          </p>
          <ol className="mt-2.5 space-y-0">
            {flow.map((node, index) => (
              <li key={node.title}>
                <div className="rounded-lg border border-stone-200 bg-white p-2.5 dark:border-white/10 dark:bg-[#1e1a3a]">
                  <p className="flex items-center gap-2 text-[11px] font-extrabold text-stone-800 dark:text-white">
                    <span
                      className={`flex h-4.5 w-4.5 h-5 w-5 items-center justify-center rounded-md text-[9.5px] font-extrabold ${
                        node.tone === "green"
                          ? "bg-brand-100 text-brand-700 dark:bg-brand-400/20 dark:text-brand-300"
                          : node.tone === "blue"
                            ? "bg-sky-100 text-sky-700 dark:bg-sky-400/20 dark:text-sky-300"
                            : node.tone === "amber"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300"
                              : "bg-stone-100 text-stone-500 dark:bg-white/10 dark:text-stone-300"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {node.title}
                  </p>
                  <p className="ml-7 mt-0.5 text-[10px] text-stone-500 dark:text-stone-400">
                    {node.meta}
                  </p>
                </div>
                {index < flow.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="mx-auto h-3 w-px bg-stone-300 dark:bg-white/20"
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </MockFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Instagram comment → public reply → DM → CRM lead                    */
/* ------------------------------------------------------------------ */
export function CommentDmMockup({ className = "" }: { className?: string }) {
  const steps = [
    {
      n: "1",
      title: "Comment arrives",
      body: "Bloom Studio comments “INFO” on your Reel.",
      visual: (
        <div className="rounded-lg bg-stone-100 p-2.5 dark:bg-white/[0.06]">
          <p className="text-[10.5px] font-bold text-stone-700 dark:text-stone-200">
            📹 Summer lookbook · Reel
          </p>
          <p className="mt-1.5 rounded-lg rounded-bl-sm bg-white px-2 py-1.5 text-[10.5px] font-bold text-stone-700 shadow-sm dark:bg-[#272247] dark:text-stone-200">
            bloomstudio: INFO
          </p>
        </div>
      ),
    },
    {
      n: "2",
      title: "Instant public reply",
      body: "Your account replies under the comment automatically.",
      visual: (
        <div className="rounded-lg bg-stone-100 p-2.5 dark:bg-white/[0.06]">
          <p className="text-[10.5px] font-bold text-stone-700 dark:text-stone-200">
            📹 Summer lookbook · Reel
          </p>
          <p className="mt-1.5 rounded-lg rounded-bl-sm bg-white px-2 py-1.5 text-[10.5px] font-bold text-stone-700 shadow-sm dark:bg-[#272247] dark:text-stone-200">
            bloomstudio: INFO
          </p>
          <p className="mt-1.5 rounded-lg rounded-br-sm bg-brand-600 px-2 py-1.5 text-[10.5px] font-semibold text-white">
            GTMSip: Check your DMs for the details! ✉️
          </p>
        </div>
      ),
    },
    {
      n: "3",
      title: "Automated private DM",
      body: "The single allowed private reply continues the chat with your link.",
      visual: (
        <div className="rounded-lg bg-[#16132e] p-2.5 dark:bg-black/40">
          <p className="text-[9.5px] font-extrabold uppercase tracking-wide text-stone-500">
            Direct message · 1 of 1 per comment
          </p>
          <p className="mt-1.5 rounded-lg rounded-bl-sm bg-white/10 px-2 py-1.5 text-[10.5px] text-stone-200">
            Hi! Here's the lookbook + pricing you asked for 👇
          </p>
          <p className="mt-1.5 inline-block rounded-lg rounded-br-sm bg-brand-600 px-2 py-1.5 text-[10.5px] font-semibold text-white">
            gtsip.com/bloom-lookbook
          </p>
          <p className="mt-1.5 text-[9px] font-bold text-emerald-400">
            ✓ Delivered · 24h window open
          </p>
        </div>
      ),
    },
    {
      n: "4",
      title: "Lead captured in CRM",
      body: "Contact, keyword and source post are saved as a lead.",
      visual: (
        <div className="rounded-lg border border-stone-200 bg-white p-2.5 dark:border-white/10 dark:bg-[#1e1a3a]">
          <p className="flex items-center gap-2">
            <Avatar initials="BS" tone="violet" size="sm" />
            <span>
              <span className="block text-[11px] font-extrabold text-stone-800 dark:text-white">
                Bloom Studio
              </span>
              <span className="block text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
                Lead · Instagram comment
              </span>
            </span>
          </p>
          <p className="mt-1.5 flex flex-wrap gap-1">
            <Pill tone="blue">keyword: INFO</Pill>
            <Pill tone="green">Owner: Arjun</Pill>
          </p>
        </div>
      ),
    },
  ];

  return (
    <MockFrame title="app.gtsip.com / automations" className={className}>
      <ol className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.n}
            className="rounded-xl border border-stone-200 bg-stone-50/60 p-2.5 transition hover:border-brand-300 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-brand-400/40"
          >
            <span className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-extrabold text-white">
                {step.n}
              </span>
              <span className="text-[11px] font-extrabold text-stone-800 dark:text-white">
                {step.title}
              </span>
            </span>
            <p className="mt-1.5 text-[10px] leading-snug text-stone-500 dark:text-stone-400">
              {step.body}
            </p>
            <div className="mt-2">{step.visual}</div>
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-start gap-2 text-[10.5px] font-semibold text-amber-700 dark:text-amber-300">
        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-extrabold dark:bg-amber-400/20">
          !
        </span>
        Instagram allows one private reply per comment. Free-form replies are
        only possible inside the 24-hour window after the person messages you.
      </p>
    </MockFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Plan & Publish calendar (coming soon)                               */
/* ------------------------------------------------------------------ */
export function CalendarMockup({ className = "" }: { className?: string }) {
  const days = ["Mon 12", "Tue 13", "Wed 14", "Thu 15", "Fri 16"];
  const slots: Record<string, Array<{ label: string; channel: string; tone: string }>> = {
    "Mon 12": [{ label: "Reel · Summer drop", channel: "IG", tone: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300" }],
    "Tue 13": [
      { label: "Story · Poll", channel: "IG", tone: "bg-pink-100 text-pink-700 dark:bg-pink-400/15 dark:text-pink-300" },
      { label: "Broadcast · restock", channel: "WA", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" },
    ],
    "Wed 14": [{ label: "Carousel · FAQ", channel: "IG", tone: "bg-violet-100 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300" }],
    "Thu 15": [{ label: "Broadcast · webinar", channel: "WA", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300" }],
    "Fri 16": [{ label: "Reel · BTS", channel: "IG", tone: "bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300" }],
  };

  const queue = [
    { label: "Reel · Summer drop", by: "Sara K." },
    { label: "Broadcast · restock", by: "Arjun M." },
    { label: "Carousel · FAQ", by: "Sara K." },
  ];

  return (
    <MockFrame title="app.gtsip.com / plan-publish" className={className}>
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center bg-white/55 pt-16 backdrop-blur-[2px] dark:bg-black/45"
        >
          <span className="badge-soon scale-125">Coming soon · in development</span>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1fr_200px]">
          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-white/10">
            <p className="flex items-center justify-between pb-2 text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Content calendar · November
              <Pill>Week</Pill>
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {days.map((day) => (
                <div
                  key={day}
                  className="min-h-[110px] rounded-lg bg-stone-50 p-1.5 dark:bg-white/[0.04]"
                >
                  <p className="text-[9.5px] font-extrabold text-stone-500 dark:text-stone-400">
                    {day}
                  </p>
                  <div className="mt-1.5 space-y-1.5">
                    {(slots[day] ?? []).map((slot) => (
                      <div
                        key={slot.label}
                        className={`rounded-md px-1.5 py-1 text-[9px] font-bold leading-tight ${slot.tone}`}
                      >
                        <span className="block opacity-70">{slot.channel}</span>
                        {slot.label}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-white/10">
            <p className="text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Approval queue
            </p>
            <ul className="mt-2 space-y-2">
              {queue.map((item) => (
                <li
                  key={item.label}
                  className="rounded-lg border border-stone-200 bg-white p-2 dark:border-white/10 dark:bg-[#1e1a3a]"
                >
                  <p className="truncate text-[10.5px] font-extrabold text-stone-800 dark:text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 flex items-center justify-between gap-1">
                    <span className="text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
                      by {item.by}
                    </span>
                    <span className="flex gap-1">
                      <span className="rounded-full bg-brand-600 px-1.5 py-px text-[9px] font-bold text-white">
                        Approve
                      </span>
                      <span className="rounded-full border border-stone-200 px-1.5 py-px text-[9px] font-bold text-stone-500 dark:border-white/15 dark:text-stone-300">
                        Reject
                      </span>
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}
