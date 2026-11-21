import { Avatar, MockFrame, Pill } from "./common";

/* ------------------------------------------------------------------ */
/* Teams, roles & multi-brand workspaces                               */
/* ------------------------------------------------------------------ */
export function TeamMockup({ className = "" }: { className?: string }) {
  const members = [
    { name: "Priya Kapoor", email: "priya@bloomstudio.example", role: "Owner", tone: "brand" as const, initials: "PK", status: "Active" },
    { name: "Arjun Mehta", email: "arjun@bloomstudio.example", role: "Admin", tone: "sky" as const, initials: "AM", status: "Active" },
    { name: "Sara Khan", email: "sara@bloomstudio.example", role: "Agent", tone: "violet" as const, initials: "SK", status: "Active" },
    { name: "Tom Dsouza", email: "tom@bloomstudio.example", role: "Agent", tone: "amber" as const, initials: "TD", status: "Invited" },
  ];

  return (
    <MockFrame title="app.gtsip.com / team" className={className}>
      <div className="grid gap-3 lg:grid-cols-[1fr_210px]">
        <div className="rounded-xl border border-stone-200 dark:border-white/10">
          <p className="flex items-center justify-between border-b border-stone-200 px-3 py-2.5 dark:border-white/10">
            <span className="text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
              Members · Bloom Studio workspace
            </span>
            <Pill tone="green">+ Invite</Pill>
          </p>
          <ul className="divide-y divide-stone-100 dark:divide-white/5">
            {members.map((m) => (
              <li
                key={m.email}
                className="flex items-center gap-2.5 px-3 py-2.5"
              >
                <Avatar initials={m.initials} tone={m.tone} size="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11.5px] font-extrabold text-stone-800 dark:text-white">
                    {m.name}
                  </span>
                  <span className="block truncate text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
                    {m.email}
                  </span>
                </span>
                <Pill tone={m.role === "Owner" ? "green" : m.role === "Admin" ? "blue" : "neutral"}>
                  {m.role}
                </Pill>
                <span
                  className={`w-14 text-right text-[9.5px] font-bold ${
                    m.status === "Active"
                      ? "text-brand-600 dark:text-brand-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {m.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2.5">
          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-white/10">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Workspaces
            </p>
            <ul className="mt-1.5 space-y-1">
              {[
                { name: "Bloom Studio", active: true },
                { name: "Northwind Agency", active: false },
                { name: "EduWebinar", active: false },
              ].map((w) => (
                <li
                  key={w.name}
                  className={`flex items-center justify-between rounded-lg px-2 py-1.5 text-[10.5px] font-bold ${
                    w.active
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-400/10 dark:text-brand-300"
                      : "text-stone-500 dark:text-stone-400"
                  }`}
                >
                  {w.name}
                  {w.active && <span className="text-[9px]">current</span>}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-stone-200 p-2.5 dark:border-white/10">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Assignment
            </p>
            <p className="mt-1.5 flex items-center gap-2 text-[10.5px] font-bold text-stone-700 dark:text-stone-200">
              <Avatar initials="RV" tone="sky" size="sm" />
              Rahul Verma → Sara K.
            </p>
            <p className="mt-1.5 text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
              Rule: tag “support” · round-robin among Agents
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-stone-300 p-2.5 dark:border-white/20">
            <p className="flex items-center gap-1.5 text-[10.5px] font-extrabold text-stone-500 dark:text-stone-300">
              Brand approvals
              <span className="badge-soon">Planned</span>
            </p>
            <p className="mt-1 text-[9.5px] font-semibold text-stone-500 dark:text-stone-400">
              Client approver signs off on replies & posts before they go out.
            </p>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}

/* ------------------------------------------------------------------ */
/* Webhooks, API & MCP                                                 */
/* ------------------------------------------------------------------ */
export function IntegrationsMockup({ className = "" }: { className?: string }) {
  const events = [
    { name: "message.received", code: "200", tone: "green" as const, time: "12:04:11" },
    { name: "lead.created", code: "200", tone: "green" as const, time: "12:04:09" },
    { name: "payment.paid", code: "200", tone: "green" as const, time: "11:58:47" },
    { name: "deal.stage_changed", code: "retry", tone: "amber" as const, time: "11:57:02" },
    { name: "message.delivered", code: "200", tone: "green" as const, time: "11:55:30" },
  ];

  return (
    <MockFrame title="app.gtsip.com / developers" className={className}>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-stone-200 p-2.5 dark:border-white/10">
          <p className="flex items-center justify-between text-[10.5px] font-extrabold uppercase tracking-wide text-stone-500 dark:text-stone-400">
            Webhook deliveries
            <Pill tone="green">Endpoint healthy</Pill>
          </p>
          <ul className="mt-2 space-y-1.5">
            {events.map((event) => (
              <li
                key={event.name + event.time}
                className="flex items-center justify-between gap-2 rounded-lg bg-stone-50 px-2.5 py-1.5 dark:bg-white/[0.04]"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      event.tone === "green" ? "bg-brand-500" : "bg-amber-400"
                    }`}
                  />
                  <span className="text-[10.5px] font-bold text-stone-700 dark:text-stone-200">
                    {event.name}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-[9.5px] font-bold text-stone-500 dark:text-stone-400">
                  {event.time}
                  <span
                    className={
                      event.code === "200"
                        ? "text-brand-600 dark:text-brand-400"
                        : "text-amber-600 dark:text-amber-400"
                    }
                  >
                    {event.code}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2.5">
          <pre className="overflow-x-auto rounded-xl bg-[#12102a] p-3 text-[10px] leading-relaxed text-cyan-200/90 dark:bg-black/50">
            <code>{`POST /your-endpoint
X-GTMSip-Signature: sha256=8f2a…

{
  "event": "payment.paid",
  "workspace": "bloom-studio",
  "data": {
    "deal_id": "deal_4821",
    "contact": "Aarav Sharma",
    "amount": 2400,
    "currency": "INR"
  }
}`}</code>
          </pre>
          <div className="flex flex-wrap items-center gap-2">
            <Pill>API key · gtsip_live_••••8f2a</Pill>
            <Pill tone="blue">MCP connected · assistant</Pill>
            <Pill tone="green">HMAC verified</Pill>
          </div>
        </div>
      </div>
    </MockFrame>
  );
}
