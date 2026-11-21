import { useRef, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

/**
 * Accessible tabs following the WAI-ARIA tabs pattern:
 * roving tabindex, arrow-key navigation, Home/End support.
 */
export function Tabs({
  tabs,
  activeId,
  onChange,
  ariaLabel,
}: {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const count = tabs.length;
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % count;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + count) % count;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = count - 1;
    }
    if (nextIndex !== null) {
      event.preventDefault();
      const next = tabs[nextIndex];
      onChange(next.id);
      refs.current[next.id]?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="-mx-1 flex gap-1 overflow-x-auto pb-1"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                refs.current[tab.id] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold transition duration-200 ${
                selected
                  ? "bg-brand-600 text-white shadow-[0_10px_24px_-12px_rgba(124,58,237,0.9)]"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            tabIndex={0}
            hidden={tab.id !== activeId}
          >
            {tab.id === activeId && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
