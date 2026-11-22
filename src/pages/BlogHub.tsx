import { useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS, type BlogPost } from "../data/blog";
import { usePageMeta, buildBreadcrumbsSchema } from "../lib/seo";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { PageHeader, CtaBand } from "../components/ui";
import { ArrowRightIcon } from "../components/icons";

const CATEGORIES = [
  "All",
  "WhatsApp Marketing",
  "AI & Sales Automation",
  "Lead Generation",
  "Social Selling",
] as const;

export default function BlogHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const breadcrumbs = [{ name: "Blog", path: "/blog" }];

  usePageMeta({
    title: "Blog — AI Sales, WhatsApp Marketing & Lead Automation | GTMSip",
    description:
      "Actionable playbooks, strategic guides, and technical walkthroughs for WhatsApp marketing automation, Firecrawl lead scraping, Claude MCP sales workflows, and social commerce.",
    canonicalUrl: "/blog",
    jsonLd: [
      buildBreadcrumbsSchema(breadcrumbs),
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "GTMSip Growth & Technology Blog",
        description:
          "Insights on AI sales automation, WhatsApp CRM, Firecrawl lead scraping, and social selling.",
        url: "https://gtmsip.com/blog",
        blogPost: BLOG_POSTS.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `https://gtmsip.com/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: {
            "@type": "Person",
            name: post.author.name,
          },
        })),
      },
    ],
  });

  const featured = BLOG_POSTS[0];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <PageHeader
        eyebrow="GTMSip Knowledge Hub"
        title={
          <>
            Tactics, playbooks &amp;{" "}
            <span className="font-serif italic font-normal text-brand-600 dark:text-brand-400">
              engineering insights.
            </span>
          </>
        }
        description="Learn how modern revenue teams replace manual copy-paste busywork with Firecrawl lead scraping, Claude MCP workflows, and compliant WhatsApp & Instagram sales."
      />

      <section className="section pt-4" aria-label="Blog Articles">
        <div className="container-x">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-6 dark:border-white/10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                  selectedCategory === cat
                    ? "bg-brand-600 text-white shadow-sm dark:bg-brand-500"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-white/5 dark:text-stone-300 dark:hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Post (shown if All is selected) */}
          {selectedCategory === "All" && featured && (
            <div className="mt-8">
              <Link
                to={`/blog/${featured.slug}`}
                className="card card-hover group grid gap-8 p-6 sm:p-10 lg:grid-cols-12"
              >
                <div className="flex flex-col justify-between lg:col-span-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800 dark:bg-brand-400/20 dark:text-brand-300">
                        Featured Playbook
                      </span>
                      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
                        {featured.readTime}
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400 sm:text-base">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={featured.author.avatar}
                        alt={featured.author.name}
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                      />
                      <div>
                        <p className="text-xs font-bold text-stone-900 dark:text-white">
                          {featured.author.name}
                        </p>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                          {featured.author.role}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-600 transition group-hover:gap-2.5 dark:text-brand-400">
                      Read guide <ArrowRightIcon size={16} />
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-50 to-stone-100 p-6 dark:from-brand-950/40 dark:to-stone-900/40 lg:col-span-4">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400">
                    Key Takeaways
                  </p>
                  <ul className="mt-4 space-y-2.5 text-xs text-stone-700 dark:text-stone-300">
                    {featured.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-brand-500 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </div>
          )}

          {/* Grid of Articles */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="card card-hover group flex h-full flex-col justify-between p-6"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                      <span className="font-semibold text-brand-600 dark:text-brand-400">
                        {post.category}
                      </span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="mt-3 text-lg font-extrabold leading-snug">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-stone-100 pt-4 dark:border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="h-8 w-8 rounded-full object-cover"
                          loading="lazy"
                        />
                        <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                          {post.author.name}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400 transition group-hover:translate-x-1">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
