import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/seo";
import { FEATURES } from "../data/features";
import { ComingSoon, CtaBand, PageHeader } from "../components/ui";
import { ArrowRightIcon } from "../components/icons";
import { openWaitlistModal } from "../lib/waitlist";

export default function FeaturesHub() {
  usePageMeta({
    title: "Features — GTMSip AI sales & social platform",
    description:
      "Explore every GTMSip module: Firecrawl lead scraping, Google plugins, AI workflows and Claude MCP, shared inbox, broadcasts, comment-to-DM, pipelines with Razorpay, analytics, workspaces and API.",
  });

  return (
    <>
      <PageHeader
        eyebrow="Features hub"
        title={
          <>
            Everything in GTMSip,{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              module by module.
            </span>
          </>
        }
        description="Each module works on its own and gets better together. Open any detail page for capabilities, honest platform limits and synthetic product previews."
      >
        <button type="button" onClick={openWaitlistModal} className="btn-primary">
          Join the waitlist
        </button>
        <Link to="/how-it-works" className="btn-secondary">
          See how it works
        </Link>
      </PageHeader>

      <section className="section" aria-label="Feature modules">
        <div className="container-x">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <li key={feature.slug}>
                <Link
                  to={`/features/${feature.slug}`}
                  className="card card-hover group flex h-full flex-col p-6"
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-100 text-brand-600 transition group-hover:scale-105 dark:bg-brand-400/15 dark:text-brand-400">
                      <feature.icon size={20} />
                    </span>
                    {feature.status === "soon" && <ComingSoon />}
                  </span>
                  <h2 className="mt-4 text-base font-extrabold leading-snug">
                    {feature.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {feature.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-600 transition group-hover:gap-2.5 dark:text-brand-400">
                    View module
                    <ArrowRightIcon size={15} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
      <div className="section" />
    </>
  );
}
