import { Avatar, ChannelBadge, MockFrame, Pill } from "./common";

/* ------------------------------------------------------------------ */
/* Unified WhatsApp + Instagram inbox with CRM context                 */
/* ------------------------------------------------------------------ */
export function InboxMockup({ className = "" }: { className?: string }) {
  const conversations = [
    {
      name: "Aarav Sharma",
      channel: "WhatsApp" as const,
      preview: "Can I get the invoice for Order #4821?",
      time: "2m",
      active: true,
      unread: true,
      tone: "brand" as const,
      initials: "AS",
    },
    {
      name: "Bloom Studio",
      channel: "Instagram" as const,
      preview: "Commented “INFO” on Reel · auto-DM sent",
      time: "14m",
      unread: true,
      tone: "violet" as const,
      initials: "BS",
    },
    {
      name: "Neha Iyer",
      channel: "WhatsApp" as const,
      preview: "Thanks, the payment went through!",
      time: "1h",
      tone: "amber" as const,
      initials: "NI",
    },
    {
      name: "Rahul Verma",
      channel: "Instagram" as const,
      preview: "Is the workshop recording available?",
      time: "3h",
      tone: "sky" as const,
      initials: "RV",
    },
    {
      name: "Kabir Malhotra",
      channel: "WhatsApp" as const,
      preview: "Template: order_update_v2 · delivered",
      time: "5h",
      tone: "rose" as const,
      initials: "KM",
    },
  ];

  return (
    <MockFrame title="app.gtsip.com / inbox" className={className} bare>
      <div className="grid grid-cols-1 sm:grid-cols-[210px_1fr] lg:grid-cols-[210px_1fr_200px]">
        {/* Conversation list */}
        <aside
          aria-label="Demo conversation list"
          className="border-b border-stone-200 sm:border-b-0 sm:border-r dark:border-white/10"
        >
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Inbox · 38 open
            </span>
            <Pill tone="green">All</Pill>
          </div>
          <ul className="space-y-0.5 pb-2">
            {conversations.map((c) => (
              <li
                key={c.name}
                className={`flex cursor-default items-start gap-2 px-3 py-2 transition ${
                  c.active
                    ? "bg-brand-50 dark:bg-brand-400/10"
                    : "hover:bg-stone-50 dark:hover:bg-white/[0.04]"
                }`}
              >
                <Avatar initials={c.initials} tone={c.tone} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-1.5">
                    <span className="flex items-center gap-1.5 truncate text-[11.5px] font-bold text-stone-800 dark:text-stone-100">
                      {c.name}
                      <ChannelBadge channel={c.channel} />
                    </span>
                    <span className="shrink-0 text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
                      {c.time}
                    </span>
                  </span>
                  <span className="mt-0.5 block truncate text-[10.5px] text-stone-500 dark:text-stone-400">
                    {c.preview}
                  </span>
                </span>
                {c.unread && (
                  <span
                    aria-label="Unread"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                  />
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Thread */}
        <section
          aria-label="Demo conversation thread"
          className="border-b border-stone-200 sm:border-b-0 sm:border-r dark:border-white/10"
        >
          <header className="flex items-center justify-between gap-2 border-b border-stone-200 px-4 py-2.5 dark:border-white/10">
            <span className="flex items-center gap-2">
              <Avatar initials="AS" size="sm" />
              <span>
                <span className="block text-[12px] font-extrabold text-stone-800 dark:text-white">
                  Aarav Sharma
                </span>
                <span className="block text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  24h window · 19h left
                </span>
              </span>
            </span>
            <span className="flex gap-1.5">
              <Pill>Assign</Pill>
              <Pill tone="green">Resolve</Pill>
            </span>
          </header>

          <div className="space-y-2.5 px-4 py-3.5 text-[11.5px]">
            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-stone-100 px-3 py-2 text-stone-700 dark:bg-white/10 dark:text-stone-200">
              Hi! Can I get the invoice for Order #4821?
            </p>
            <div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-brand-600 px-3 py-2 text-white">
              Absolutely — sending it right now, Aarav.
              <span className="mt-1 block text-[9.5px] font-semibold text-emerald-100/90">
                Priya K. · delivered
              </span>
            </div>

            {/* Payment card inside the thread */}
            <div className="ml-auto max-w-[90%] rounded-xl border border-stone-200 bg-white p-2.5 shadow-sm dark:border-white/10 dark:bg-white/[0.05]">
              <span className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] font-extrabold text-stone-800 dark:text-white">
                  Razorpay Payment Link
                  <Pill tone="green">Paid</Pill>
                </span>
                <span className="text-[9.5px] font-bold text-stone-500 dark:text-stone-400">
                  #4821
                </span>
              </span>
              <span className="mt-1 block text-[10.5px] text-stone-500 dark:text-stone-400">
                ₹2,400 · Invoice INV-0912 · synced to deal “Aarav — Renewal”
              </span>
            </div>

            <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-stone-100 px-3 py-2 text-stone-700 dark:bg-white/10 dark:text-stone-200">
              Perfect, received it 🙏
            </p>
          </div>

          <div className="flex items-center gap-2 border-t border-stone-200 px-4 py-2.5 dark:border-white/10">
            <span className="flex-1 rounded-full bg-stone-100 px-3 py-1.5 text-[11px] text-stone-500 dark:text-stone-400 dark:bg-white/5 dark:text-stone-500">
              Reply within the 24-hour window…
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white">
              ↑
            </span>
          </div>
        </section>

        {/* CRM panel */}
        <aside
          aria-label="Demo contact panel"
          className="hidden px-3.5 py-3 lg:block"
        >
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Contact CRM
          </p>
          <p className="mt-2 text-[12.5px] font-extrabold text-stone-800 dark:text-white">
            Aarav Sharma
          </p>
          <p className="text-[10.5px] text-stone-500 dark:text-stone-400">
            +91 98••• ••210
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <Pill tone="green">VIP</Pill>
            <Pill tone="blue">D2C</Pill>
            <Pill>Renewal</Pill>
          </div>
          <dl className="mt-3 space-y-2 text-[10.5px]">
            <div className="flex justify-between gap-2">
              <dt className="text-stone-500 dark:text-stone-400">Owner</dt>
              <dd className="font-bold text-stone-700 dark:text-stone-200">
                Priya K.
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-stone-500 dark:text-stone-400">Deal</dt>
              <dd className="font-bold text-stone-700 dark:text-stone-200">
                Renewal · Proposal
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-stone-500 dark:text-stone-400">Orders</dt>
              <dd className="font-bold text-stone-700 dark:text-stone-200">
                3 · last paid
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-stone-500 dark:text-stone-400">Source</dt>
              <dd className="font-bold text-stone-700 dark:text-stone-200">
                Instagram comment
              </dd>
            </div>
          </dl>
          <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-2 text-[10px] font-semibold text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300">
            Internal note: asked for GST invoice — attach before 6pm.
          </div>
        </aside>
      </div>
    </MockFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Deal pipeline with payment status                                   */
/* ------------------------------------------------------------------ */
export function PipelineMockup({ className = "" }: { className?: string }) {
  const columns = [
    {
      stage: "New lead",
      count: 6,
      cards: [
        {
          name: "Bloom Studio",
          value: "₹18,500",
          source: "IG comment · INFO",
          tone: "violet" as const,
          initials: "BS",
        },
        {
          name: "Rahul Verma",
          value: "₹7,200",
          source: "WhatsApp inbound",
          tone: "sky" as const,
          initials: "RV",
        },
      ],
    },
    {
      stage: "Qualified",
      count: 4,
      cards: [
        {
          name: "Neha Iyer",
          value: "₹24,000",
          source: "Drip flow · day 3",
          tone: "amber" as const,
          initials: "NI",
        },
      ],
    },
    {
      stage: "Proposal sent",
      count: 3,
      cards: [
        {
          name: "Aarav Sharma",
          value: "₹42,000",
          source: "Renewal",
          tone: "brand" as const,
          initials: "AS",
          paid: false,
        },
      ],
    },
    {
      stage: "Won",
      count: 2,
      cards: [
        {
          name: "Kabir Malhotra",
          value: "₹15,000",
          source: "Payment link paid",
          tone: "rose" as const,
          initials: "KM",
          paid: true,
        },
      ],
    },
  ];

  return (
    <MockFrame title="app.gtsip.com / pipeline" className={className}>
      <div className="grid grid-cols-2 gap-2.5 overflow-x-auto lg:grid-cols-4">
        {columns.map((col) => (
          <div
            key={col.stage}
            className="rounded-xl bg-stone-50 p-2 dark:bg-white/[0.04]"
          >
            <p className="flex items-center justify-between px-1 pb-2 text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {col.stage}
              <span className="rounded-full bg-white px-1.5 py-px text-[9.5px] text-stone-500 dark:text-stone-400 dark:bg-white/10 dark:text-stone-400">
                {col.count}
              </span>
            </p>
            <ul className="space-y-2">
              {col.cards.map((card) => (
                <li
                  key={card.name}
                  className="rounded-lg border border-stone-200 bg-white p-2 shadow-sm transition hover:border-brand-300 dark:border-white/10 dark:bg-[#1e1a3a] dark:hover:border-brand-400/40"
                >
                  <span className="flex items-center gap-1.5">
                    <Avatar initials={card.initials} tone={card.tone} size="sm" />
                    <span className="truncate text-[11px] font-extrabold text-stone-800 dark:text-white">
                      {card.name}
                    </span>
                  </span>
                  <span className="mt-1.5 flex items-center justify-between gap-1">
                    <span className="text-[11px] font-extrabold text-brand-600 dark:text-brand-400">
                      {card.value}
                    </span>
                    {card.paid && <Pill tone="green">Paid</Pill>}
                  </span>
                  <span className="mt-1 block truncate text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
                    {card.source}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[10.5px] font-semibold text-stone-500 dark:text-stone-400">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        Deal “Aarav — Renewal” · Razorpay link sent · status: viewed
      </p>
    </MockFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics + Meta ads attribution                                   */
/* ------------------------------------------------------------------ */
export function AnalyticsMockup({ className = "" }: { className?: string }) {
  const bars = [42, 58, 35, 72, 64, 88, 76];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const rows = [
    {
      campaign: "Monsoon Sale · Reel",
      comments: "214",
      dms: "38",
      leads: "17",
      status: "Active",
    },
    {
      campaign: "Webinar Promo · Feed",
      comments: "96",
      dms: "21",
      leads: "11",
      status: "Active",
    },
    {
      campaign: "Always-on · Boost",
      comments: "58",
      dms: "9",
      leads: "4",
      status: "Ended",
    },
  ];

  return (
    <MockFrame title="app.gtsip.com / analytics" className={className}>
      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Avg. first response", value: "1m 12s" },
          { label: "Resolved today", value: "27" },
          { label: "Open backlog", value: "38" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-stone-200 bg-stone-50 p-2.5 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <p className="text-[9.5px] font-bold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              {kpi.label}
            </p>
            <p className="mt-1 text-lg font-extrabold text-stone-900 dark:text-white">
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-stone-200 p-3 dark:border-white/10">
        <p className="text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
          Conversations handled · demo week
        </p>
        <div className="mt-3 flex h-24 items-end gap-2" role="img" aria-label="Bar chart of demo conversation volume Monday through Sunday">
          {bars.map((value, index) => (
            <div key={days[index]} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-600 to-brand-400 transition-all duration-500"
                style={{ height: `${value}%` }}
              />
              <span className="text-[9px] font-bold text-stone-500 dark:text-stone-400">
                {days[index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-stone-200 dark:border-white/10">
        <table className="w-full text-left text-[10.5px]">
          <caption className="sr-only">Demo Meta ads attribution table</caption>
          <thead className="bg-stone-50 text-stone-500 dark:text-stone-400 dark:bg-white/[0.04] dark:text-stone-500">
            <tr>
              <th scope="col" className="px-3 py-2 font-extrabold uppercase tracking-wide">
                Campaign
              </th>
              <th scope="col" className="px-3 py-2 font-extrabold uppercase tracking-wide">
                Comments
              </th>
              <th scope="col" className="px-3 py-2 font-extrabold uppercase tracking-wide">
                DM leads
              </th>
              <th scope="col" className="px-3 py-2 font-extrabold uppercase tracking-wide">
                CRM leads
              </th>
              <th scope="col" className="px-3 py-2 font-extrabold uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-stone-600 dark:divide-white/5 dark:text-stone-300">
            {rows.map((row) => (
              <tr key={row.campaign}>
                <td className="px-3 py-2 font-bold text-stone-800 dark:text-white">
                  {row.campaign}
                </td>
                <td className="px-3 py-2">{row.comments}</td>
                <td className="px-3 py-2">{row.dms}</td>
                <td className="px-3 py-2">{row.leads}</td>
                <td className="px-3 py-2">
                  <Pill tone={row.status === "Active" ? "green" : "neutral"}>
                    {row.status}
                  </Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
        Ad metrics shown only for accounts you connect and authorize.
      </p>
    </MockFrame>
  );
}
