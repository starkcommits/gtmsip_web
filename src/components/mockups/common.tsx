import type { ReactNode } from "react";

/** App-window frame used by all product mockups */
export function MockFrame({
  title = "app.gtsip.com",
  children,
  className = "",
  bare = false,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  bare?: boolean;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[#16132e] dark:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-stone-200 bg-stone-50 px-3.5 py-2.5 dark:border-white/10 dark:bg-white/[0.04]">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" aria-hidden="true" />
        <span className="ml-2 truncate rounded-md bg-white px-2.5 py-0.5 text-[10px] font-semibold text-stone-500 dark:bg-white/10 dark:text-stone-400">
          {title}
        </span>
        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
          Demo data
        </span>
      </div>
      <div className={bare ? "" : "p-3.5 sm:p-4"}>{children}</div>
    </div>
  );
}

export function Avatar({
  initials,
  tone = "brand",
  size = "md",
}: {
  initials: string;
  tone?: "brand" | "amber" | "sky" | "violet" | "rose";
  size?: "sm" | "md";
}) {
  const tones = {
    brand: "bg-brand-100 text-brand-700 dark:bg-brand-400/20 dark:text-brand-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300",
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-400/20 dark:text-sky-300",
    violet:
      "bg-violet-100 text-violet-700 dark:bg-violet-400/20 dark:text-violet-300",
    rose: "bg-rose-100 text-rose-700 dark:bg-rose-400/20 dark:text-rose-300",
  };
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-extrabold ${
        size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs"
      } ${tones[tone]}`}
    >
      {initials}
    </span>
  );
}

/** Channel badge — plain text, never an official platform logo */
export function ChannelBadge({ channel }: { channel: "WhatsApp" | "Instagram" }) {
  const style =
    channel === "WhatsApp"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-300 dark:border-emerald-400/25"
      : "bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-400/10 dark:text-pink-300 dark:border-pink-400/25";
  return (
    <span className={`inline-flex items-center rounded-full border px-1.5 py-px text-[9px] font-extrabold uppercase tracking-wide ${style}`}>
      {channel === "WhatsApp" ? "WA" : "IG"}
    </span>
  );
}

export function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "green" | "amber" | "blue" | "red";
}) {
  const tones = {
    neutral:
      "border-stone-200 bg-stone-50 text-stone-600 dark:border-white/10 dark:bg-white/5 dark:text-stone-300",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300",
    amber: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300",
    blue: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/25 dark:bg-sky-400/10 dark:text-sky-300",
    red: "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-300",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-bold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
