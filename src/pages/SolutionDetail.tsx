import { Link, Navigate, useParams } from "react-router-dom";
import { getSolution, SOLUTIONS } from "../data/solutions";
import { usePageMeta, buildBreadcrumbsSchema, buildFaqSchema } from "../lib/seo";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHeader, CtaBand } from "../components/ui";
import { Mockup } from "../components/mockups";
import { Accordion } from "../components/Accordion";
import { openWaitlistModal } from "../lib/waitlist";
import {
  ArrowRightIcon,
  CheckIcon,
  ZapIcon,
  ShieldIcon,
  UsersIcon,
  ChartIcon,
} from "../components/icons";

export default function SolutionDetail() {
  const { slug = "" } = useParams();
  const solution = getSolution(slug);

  const breadcrumbs = [
    { name: "Solutions", path: "/features" },
    { name: solution?.eyebrow ?? "Solution", path: `/solutions/${slug}` },
  ];

  usePageMeta({
    title: solution ? solution.metaTitle : "Solution Not Found — GTMSip",
    description: solution ? solution.metaDescription : "GTMSip solution page could not be found.",
    canonicalUrl: `/solutions/${slug}`,
    jsonLd: solution
      ? [
          buildBreadcrumbsSchema(breadcrumbs),
          buildFaqSchema(solution.faqs),
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: `GTMSip — ${solution.title}`,
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            description: solution.metaDescription,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "Early access waitlist",
            },
          },
        ]
      : undefined,
  });

  if (!solution) {
    return <Navigate to="/features" replace />;
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow={solution.eyebrow}
        title={
          <>
            <span className="block text-stone-900 dark:text-white">{solution.title}</span>
            <span className="mt-2 block text-2xl font-medium text-stone-500 sm:text-3xl dark:text-stone-400">
              {solution.heroHeadline}
            </span>
          </>
        }
        description={solution.heroTagline}
      >
        <button type="button" onClick={openWaitlistModal} className="btn-primary">
          Get Started
          <ArrowRightIcon size={16} />
        </button>
        <Link to={`/features/${solution.relatedFeatureSlug}`} className="btn-secondary">
          Explore Technical Specs
        </Link>
      </PageHeader>

      {/* Overview & Mockup */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-label="Solution Overview">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
              Target Solution
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              {solution.title}
            </h2>
            <div className="prose-legal mt-4 text-[15px] space-y-4">
              {solution.overview.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 py-1">
                Optimized for:
              </span>
              {solution.secondaryKeywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-white/10 dark:text-stone-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <Mockup name={solution.preview} />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="solution-capabilities">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
              Core Capabilities
            </span>
            <h2 id="solution-capabilities" className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Engineered for measurable business growth
            </h2>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
              Each module eliminates manual friction, keeps your accounts compliant with official platform policies, and accelerates customer conversion.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solution.capabilities.map((cap) => (
              <div key={cap.title} className="card flex flex-col justify-between p-6">
                <div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-400">
                    <CheckIcon size={18} />
                  </span>
                  <h3 className="mt-4 text-base font-extrabold">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {cap.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 dark:border-white/5">
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                    Key advantage: {cap.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="solution-usecases">
        <div className="container-x">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
              Real-World Workflows
            </span>
            <h2 id="solution-usecases" className="mt-2 text-2xl font-extrabold sm:text-3xl">
              How teams deploy this solution
            </h2>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {solution.useCases.map((uc) => (
              <article key={uc.title} className="card p-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  {uc.target}
                </span>
                <h3 className="mt-2 text-lg font-extrabold">{uc.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                  {uc.workflow}
                </p>
                <div className="mt-4 rounded-xl bg-brand-50 p-3 dark:bg-brand-400/10">
                  <p className="text-xs font-bold text-brand-800 dark:text-brand-300">
                    Impact: {uc.result}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="solution-faqs">
        <div className="container-x max-w-3xl">
          <div className="text-center">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-brand-600 dark:text-brand-400">
              Questions & Answers
            </span>
            <h2 id="solution-faqs" className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8">
            <Accordion items={solution.faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
