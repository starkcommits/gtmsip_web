import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FEATURES } from "../data/features";
import { useTheme } from "../lib/theme";
import { ComingSoon, Logo } from "./ui";
import { openWaitlistModal, useWaitlistCount } from "../lib/waitlist";
import {
  CalendarIcon,
  ChartIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  InboxIcon,
  MenuIcon,
  MoonIcon,
  PlugIcon,
  SunIcon,
  TagIcon,
  UsersIcon,
  WorkflowIcon,
  ZapIcon,
  CameraIcon,
} from "./icons";

const PRIMARY_LINKS = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/use-cases", label: "Use cases" },
  { to: "/pricing", label: "Pricing" },
  { to: "/security", label: "Security" },
  { to: "/about", label: "About" },
];

const FEATURE_ICONS = [
  WorkflowIcon,
  ChartIcon,
  InboxIcon,
  ZapIcon,
  CameraIcon,
  TagIcon,
  ChartIcon,
  UsersIcon,
  PlugIcon,
  CalendarIcon,
];

function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const next = resolved === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-white/5 dark:text-stone-300 dark:hover:border-brand-400/50 dark:hover:text-brand-300"
    >
      {resolved === "dark" ? <SunIcon size={17} /> : <MoonIcon size={17} />}
    </button>
  );
}

function FeatureMenu({ onNavigate }: { onNavigate?: () => void }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold transition ${
          open
            ? "bg-stone-100 text-stone-900 dark:bg-white/10 dark:text-white"
            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
        }`}
      >
        Features
        <ChevronDownIcon
          size={15}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mega-spring absolute left-1/2 top-full z-50 mt-3 w-[min(92vw,640px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-[#151228] dark:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
          <Link
            to="/features"
            onClick={onNavigate}
            className="flex items-center justify-between gap-3 rounded-xl bg-brand-50 px-4 py-3 transition hover:bg-brand-100 dark:bg-brand-400/10 dark:hover:bg-brand-400/20"
          >
            <span className="text-sm font-extrabold text-brand-800 dark:text-brand-300">
              All features
            </span>
            <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
              Hub overview →
            </span>
          </Link>
          <div className="mt-1 grid grid-cols-1 gap-0.5 sm:grid-cols-2">
            {FEATURES.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? InboxIcon;
              return (
                <Link
                  key={feature.slug}
                  to={`/features/${feature.slug}`}
                  onClick={onNavigate}
                  style={{ animationDelay: `${0.05 + index * 0.03}s` }}
                  className="mega-item flex items-start gap-3 rounded-xl px-3.5 py-3 transition hover:bg-stone-50 dark:hover:bg-white/[0.06]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-400/10 dark:text-brand-400">
                    <Icon size={16} />
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2 text-sm font-bold text-stone-800 dark:text-stone-100">
                      {feature.navLabel}
                      {feature.status === "soon" && <ComingSoon />}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { count, total } = useWaitlistCount();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setMobileOpen(false), [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-transparent bg-transparent py-2"
          : "border-b border-stone-200 bg-white/80 py-0 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0a14]/80"
      }`}
    >
      <nav
        aria-label="Main"
        className={`container-x flex h-16 items-center justify-between gap-4 transition-all duration-300 ${
          scrolled
            ? "rounded-2xl border border-stone-200/70 bg-white/70 px-4 shadow-[0_10px_40px_-24px_rgba(15,23,42,0.4)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0B0A1A]/70"
            : "rounded-2xl border border-transparent px-0"
        }`}
      >
        <Logo />

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          <FeatureMenu />
          {PRIMARY_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-stone-100 text-stone-900 dark:bg-white/10 dark:text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            type="button"
            onClick={openWaitlistModal}
            className="hidden items-center gap-2 rounded-full bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_26px_-12px_rgba(124,58,237,0.9)] transition hover:bg-brand-500 active:translate-y-px sm:inline-flex"
          >
            <span>Join the waitlist</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-[11px] font-extrabold text-white">
              {count}/{total}
            </span>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-brand-400 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-stone-200"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="border-t border-stone-200 bg-white lg:hidden dark:border-white/10 dark:bg-[#0b0a14]"
        >
          <div className="container-x max-h-[70vh] overflow-y-auto py-4">
            <p className="px-1 pb-2 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Features
            </p>
            <div className="grid grid-cols-1 gap-1">
              {FEATURES.map((feature) => (
                <Link
                  key={feature.slug}
                  to={`/features/${feature.slug}`}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-white/10"
                >
                  {feature.navLabel}
                  {feature.status === "soon" && <ComingSoon />}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-stone-200 pt-3 dark:border-white/10">
              <div className="grid grid-cols-1 gap-1">
                {PRIMARY_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-white/10"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/features"
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-white/10"
                >
                  All features
                </Link>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openWaitlistModal();
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-[0_10px_26px_-12px_rgba(124,58,237,0.9)]"
              >
                <span>Join the waitlist</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 font-mono text-xs font-extrabold text-white">
                  {count}/{total}
                </span>
                <CheckIcon size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
