import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "../components/icons";

export interface AccordionItem {
  id?: string;
  question: string;
  answer: ReactNode;
}

/**
 * Accessible single-open accordion (FAQ).
 * Smooth grid-rows height animation + glowing active border.
 * Uses button[aria-expanded] + region labelling per WAI-ARIA APG.
 */
export function Accordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
}) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? items[0]?.id ?? `${baseId}-0`,
  );

  return (
    <div className="divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-[#151228]">
      {items.map((item, index) => {
        const itemId = item.id ?? `${baseId}-${index}`;
        const open = openId === itemId;
        const buttonId = `${baseId}-${itemId}-btn`;
        const panelId = `${baseId}-${itemId}-panel`;
        return (
          <div
            key={itemId}
            className={`acc-item ${open ? "acc-item-open bg-brand-50/40 dark:bg-brand-400/[0.06]" : ""}`}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : itemId)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-stone-50 sm:px-6 sm:py-5 dark:hover:bg-white/[0.04]"
              >
                <span className="text-sm font-bold text-stone-900 sm:text-base dark:text-white">
                  {item.question}
                </span>
                <ChevronDownIcon
                  size={18}
                  className={`shrink-0 text-brand-600 transition-transform duration-300 dark:text-brand-400 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`acc-body ${open ? "acc-body-open" : ""}`}
            >
              <div>
                <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-stone-600 sm:px-6 dark:text-stone-400">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
