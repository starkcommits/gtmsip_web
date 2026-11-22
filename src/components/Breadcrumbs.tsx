import { Link } from "react-router-dom";
import { ChevronRightIcon } from "./icons";

export interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`container-x pt-6 pb-2 text-xs text-stone-500 dark:text-stone-400 ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5" itemScope itemType="https://schema.org/BreadcrumbList">
        <li
          className="inline-flex items-center gap-1.5"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            to="/"
            itemProp="item"
            className="transition hover:text-brand-600 dark:hover:text-brand-400"
          >
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
          <ChevronRightIcon size={12} className="text-stone-400 dark:text-stone-600" />
        </li>

        {items.map((crumb, idx) => {
          const isLast = idx === items.length - 1;
          const position = idx + 2;

          return (
            <li
              key={crumb.path}
              className="inline-flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span
                  itemProp="name"
                  aria-current="page"
                  className="font-semibold text-stone-800 dark:text-stone-200"
                >
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    to={crumb.path}
                    itemProp="item"
                    className="transition hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    <span itemProp="name">{crumb.name}</span>
                  </Link>
                  <ChevronRightIcon size={12} className="text-stone-400 dark:text-stone-600" />
                </>
              )}
              <meta itemProp="position" content={String(position)} />
              {isLast && <meta itemProp="item" content={`https://gtmsip.com${crumb.path}`} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
