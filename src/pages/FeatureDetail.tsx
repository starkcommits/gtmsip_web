import { Link, Navigate, useParams } from "react-router-dom";
import { usePageMeta, buildBreadcrumbsSchema, buildFaqSchema } from "../lib/seo";
import { FEATURES, getFeature } from "../data/features";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ComingSoon, CtaBand, PageHeader } from "../components/ui";
import { Mockup } from "../components/mockups";
import { Accordion } from "../components/Accordion";
import { WaitlistForm } from "../components/forms/WaitlistForm";
import { openWaitlistModal } from "../lib/waitlist";
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
} from "../components/icons";

export default function FeatureDetail() {
  const { slug = "" } = useParams();
  const feature = getFeature(slug);

  const breadcrumbs = [
    { name: "Features", path: "/features" },
    { name: feature?.navLabel ?? "Feature", path: `/features/${slug}` },
  ];

  usePageMeta({
    title: feature
      ? (feature.metaTitle ?? `${feature.title} — GTMSip`)
      : "Feature not found — GTMSip",
    description: feature
      ? (feature.metaDescription ?? feature.summary)
      : "This GTMSip feature page could not be found.",
    canonicalUrl: `/features/${slug}`,
    jsonLd: feature
      ? [
        buildBreadcrumbsSchema(breadcrumbs),
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: `GTMSip — ${feature.title}`,
          applicationCategory: "BusinessApplication",
          description: feature.metaDescription ?? feature.summary,
          operatingSystem: "Web",
        },
        ...(feature.faqs && feature.faqs.length > 0
          ? [buildFaqSchema(feature.faqs)]
          : []),
      ]
      : undefined,
  });

  if (!feature) return <Navigate to="/features" replace />;

  const index = FEATURES.findIndex((item) => item.slug === feature.slug);
  const next = FEATURES[(index + 1) % FEATURES.length];
  const isSoon = feature.status === "soon";

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="Feature"
        comingSoon={isSoon}
        title={feature.h1Heading ?? feature.title}
        description={feature.tagline}
      >
        <button type="button" onClick={openWaitlistModal} className="btn-primary">
          Join the waitlist
        </button>
        <Link to="/features" className="btn-secondary">
          All features
        </Link>
      </PageHeader>

      {/* Intro + mockup */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-label="Overview">
        <div className="container-x grid items-start gap-10 lg:grid-cols-[0.9fr_1.3fr]">
          <div>
            <div className="prose-legal text-[15px]">
              {feature.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {isSoon ? (
              <div id="waitlist" className="mt-6 scroll-mt-24 rounded-2xl border border-brand-300 bg-brand-50 p-5 dark:border-brand-400/30 dark:bg-brand-400/10">
                <p className="flex items-center gap-2 text-sm font-extrabold text-brand-800 dark:text-brand-200">
                  <ComingSoon /> This module is in development
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-brand-800/90 dark:text-brand-200/85">
                  Join the waitlist and we'll email you once, when early access
                  opens.
                </p>
                <div className="mt-4">
                  <WaitlistForm compact />
                </div>
              </div>
            ) : null}
          </div>
          <Mockup name={feature.preview} />
        </div>
      </section>

      {/* Capabilities */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="capabilities-title">
        <div className="container-x">
          <h2 id="capabilities-title" className="text-2xl font-extrabold sm:text-3xl">
            What you get
          </h2>
          <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {feature.capabilities.map((capability) => (
              <li key={capability.title} className="card p-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-600 dark:bg-brand-400/15 dark:text-brand-400">
                  <CheckIcon size={16} />
                </span>
                <h3 className="mt-3.5 text-sm font-extrabold">
                  {capability.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600 dark:text-stone-400">
                  {capability.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How it works (steps) */}
      <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="steps-title">
        <div className="container-x">
          <h2 id="steps-title" className="text-2xl font-extrabold sm:text-3xl">
            How it works
          </h2>
                  <ol className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {feature.steps.map((step, idx) => (
                      <li key={step.title} className="card p-5">
                        <span className="font-mono text-xs font-extrabold text-brand-600 dark:text-brand-400">
                          0{idx + 1}
                        </span>
                        <h3 className="mt-2 text-sm font-extrabold">{step.title}</h3>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-stone-600 dark:text-stone-400">
                          {step.description}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

      {/* Platform rules / honesty block */ }
      {
                feature.platformNotes && feature.platformNotes.length > 0 && (
                    <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="rules-title">
                      <div className="container-x">
                              <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-6 sm:p-7 dark:border-amber-400/30 dark:bg-amber-400/10">
                                <div className="flex items-start gap-3.5">
                                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300">
                                    <AlertIcon size={18} />
                                  </span>
                                  <div>
                                    <h2 id="rules-title" className="text-base font-extrabold text-amber-950 dark:text-amber-100">
                                      Platform boundaries we design around
                                    </h2>
                                    <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-200/80">
                                      We follow the official platform rules so your numbers and
                                      accounts stay safe.
                                    </p>
                                  </div>
                                </div>
                                <div className="mt-5 border-t border-amber-200/70 pt-5 dark:border-amber-400/20">
                                  <ul className="grid gap-4 sm:grid-cols-2">
                                    {feature.platformNotes.map((note) => (
                                      <li key={note.title}>
                                        <p className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
                                          {note.title}
                                        </p>
                                        <p className="mt-1 text-[13px] leading-relaxed text-amber-800/90 dark:text-amber-200/85">
                                          {note.body}
                                        </p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                          </div>
                        </section>
      )}

      {/* Frequently Asked Questions (FAQ) */}
      {feature.faqs && feature.faqs.length > 0 && (
        <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="faq-title">
          <div className="container-x max-w-4xl">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Frequently Asked Questions
            </span>
            <h2 id="faq-title" className="mt-2 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
              Everything you need to know about {feature.title.toLowerCase()}
            </h2>
            <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
              Detailed technical answers regarding Meta compliance, API boundaries, and workflow integration.
            </p>
            <div className="mt-8">
              <Accordion items={feature.faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Related Solutions & Strategic Guides (Topic Cluster) */}
      {feature.relatedLinks && feature.relatedLinks.length > 0 && (
        <section className="section border-b border-stone-200 dark:border-white/10" aria-labelledby="related-links-title">
          <div className="container-x">
            <div className="max-w-2xl">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Connected Solutions & Playbooks
              </span>
              <h2 id="related-links-title" className="mt-2 text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
                Explore related workflows
              </h2>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                See how {feature.title.toLowerCase()} integrates into broader business automation architectures.
              </p>
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {feature.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:border-brand-500/50 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-brand-400/40"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-stone-900 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 transition-colors">
                      {link.title}
                    </h3>
                    <ArrowRightIcon
                      size={16}
                      className="text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-500"
                    />
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

                        {/* Next feature */}
                        <section className="section" aria-label="Next feature">
                          <div className="container-x flex flex-wrap items-center justify-between gap-4">
                            <Link
                              to="/features"
                              className="text-sm font-extrabold text-stone-500 transition hover:text-brand-600 dark:text-stone-400"
                            >
                              ← Back to all features
                            </Link>
                            <Link
                              to={`/features/${next.slug}`}
                              className="group inline-flex items-center gap-2 text-sm font-extrabold text-brand-600 transition hover:gap-3 dark:text-brand-400"
                            >
                              Next: {next.navLabel}
                              <ArrowRightIcon size={16} />
                            </Link>
                          </div>
                        </section>

                        <CtaBand />
                        <div className="section" />
                      </>
                      );
}
