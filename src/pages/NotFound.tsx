import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { ArrowRightIcon } from "../components/icons";

export default function NotFound() {
  usePageMeta({
    title: "Page not found — GTMSip",
    description: "The page you're looking for doesn't exist on the GTMSip site.",
  });

  return (
    <section className="section">
      <div className="container-x flex max-w-xl flex-col items-start">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          404
        </p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
          This thread went cold.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-stone-600 dark:text-stone-400">
          The page you're looking for doesn't exist — maybe it moved while we
          were reorganising the workspace.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Back to home
            <ArrowRightIcon size={16} />
          </Link>
          <Link to="/features" className="btn-secondary">
            Browse features
          </Link>
        </div>
      </div>
    </section>
  );
}
