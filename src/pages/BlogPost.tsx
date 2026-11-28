import type { ReactNode } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getBlogPost, BLOG_POSTS } from "../data/blog";
import { usePageMeta, buildBreadcrumbsSchema } from "../lib/seo";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { CtaBand } from "../components/ui";
import { openWaitlistModal } from "../lib/waitlist";
import { ArrowRightIcon, CheckIcon, AlertIcon } from "../components/icons";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function renderContentWithLinks(text: string): ReactNode {
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const linkText = match[1];
    const href = match[2];
    const isInternal = href.startsWith("/");

    if (isInternal) {
      parts.push(
        <Link
          key={match.index}
          to={href}
          className="font-medium text-brand-600 underline decoration-brand-500/40 underline-offset-2 hover:text-brand-700 hover:decoration-brand-500 dark:text-brand-400 dark:decoration-brand-400/40 dark:hover:text-brand-300"
        >
          {linkText}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-600 underline decoration-brand-500/40 underline-offset-2 hover:text-brand-700 hover:decoration-brand-500 dark:text-brand-400 dark:decoration-brand-400/40 dark:hover:text-brand-300"
        >
          {linkText}
        </a>,
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const post = getBlogPost(slug);

  const breadcrumbs = [
    { name: "Blog", path: "/blog" },
    { name: post?.title ?? "Article", path: `/blog/${slug}` },
  ];

  usePageMeta({
    title: post ? post.metaTitle : "Article Not Found — GTMSip",
    description: post ? post.metaDescription : "The requested article could not be found.",
    canonicalUrl: `/blog/${slug}`,
    ogType: "article",
    jsonLd: post
      ? [
          buildBreadcrumbsSchema(breadcrumbs),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.metaDescription,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://gtmsip.com/blog/${post.slug}`,
            },
            author: {
              "@type": "Person",
              name: post.author.name,
              jobTitle: post.author.role,
            },
            publisher: {
              "@type": "Organization",
              name: "GTMSip",
              logo: {
                "@type": "ImageObject",
                url: "https://gtmsip.com/images/logo-256.png",
              },
            },
            datePublished: post.datePublished,
            dateModified: post.dateModified,
            image: "https://gtmsip.com/images/og-image.png",
          },
        ]
      : undefined,
  });

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const related = BLOG_POSTS.filter((p) => post.relatedPosts.includes(p.slug)).slice(0, 3);

  const formattedDate = new Date(post.datePublished).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      {/* Article Header */}
      <header className="container-x max-w-4xl pt-8 pb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span className="rounded-full bg-brand-50 px-3 py-1 font-bold text-brand-700 dark:bg-brand-400/10 dark:text-brand-300">
            {post.category}
          </span>
          <span>•</span>
          <time dateTime={post.datePublished}>{formattedDate}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
          {post.excerpt}
        </p>

        {/* Author card */}
        <div className="mt-6 flex items-center gap-3.5 border-t border-b border-stone-200 py-4 dark:border-white/10">
          <img
            src={post.author.avatar}
            alt={`${post.author.name}, ${post.author.role} at GTMSip`}
            className="h-11 w-11 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-extrabold text-stone-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {post.author.role}
            </p>
          </div>
        </div>
      </header>

      {/* Article Content Layout */}
      <article className="container-x max-w-4xl pb-16">
        {/* Key Takeaways Box */}
        <aside className="mb-10 rounded-2xl border border-brand-200 bg-brand-50/70 p-6 dark:border-brand-400/20 dark:bg-brand-400/5">
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-brand-800 dark:text-brand-300">
            Executive Summary & Key Takeaways
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-stone-700 dark:text-stone-300">
            {post.takeaways.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-200 text-[10px] font-bold text-brand-800 dark:bg-brand-400/20 dark:text-brand-300">
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Table of Contents */}
        <nav
          aria-label="Table of Contents"
          className="mb-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 dark:border-white/10 dark:bg-white/[0.03]"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-white">
            Table of Contents
          </p>
          <ol className="mt-4 space-y-2.5 text-sm">
            {post.sections.map((section, idx) => {
              const anchor = slugify(section.heading);
              return (
                <li key={idx}>
                  <a
                    href={`#${anchor}`}
                    className="group flex items-baseline gap-2.5 text-stone-600 transition-colors hover:text-brand-600 dark:text-stone-400 dark:hover:text-brand-400"
                  >
                    <span className="font-mono text-xs font-semibold text-stone-400 group-hover:text-brand-500 dark:text-stone-500">
                      {String(idx + 1).padStart(2, "0")}.
                    </span>
                    <span className="underline-offset-4 group-hover:underline">
                      {section.heading}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Sections */}
        <div className="prose-legal space-y-10 text-[16px] leading-relaxed text-stone-700 dark:text-stone-300">
          {post.sections.map((section, idx) => {
            const sectionId = slugify(section.heading);
            return (
              <section key={idx} id={sectionId} className="scroll-mt-24 space-y-4">
                <h2 className="text-2xl font-extrabold text-stone-900 dark:text-white sm:text-3xl">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{renderContentWithLinks(p)}</p>
                ))}

                {section.callout && (
                  <div
                    className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${
                      section.callout.type === "warning"
                        ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-200"
                        : "border-brand-200 bg-brand-50 text-brand-900 dark:border-brand-400/20 dark:bg-brand-400/10 dark:text-brand-200"
                    }`}
                  >
                    <p className="font-bold flex items-center gap-1.5 mb-1">
                      {section.callout.type === "warning" ? "⚠️ Caution:" : "💡 Pro Tip:"}
                    </p>
                    <p>{renderContentWithLinks(section.callout.text)}</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Product Integration Callout Card */}
        <div className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-7 dark:border-white/10 dark:bg-white/5">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            See It In Action
          </span>
          <h3 className="mt-2 text-xl font-extrabold text-stone-900 dark:text-white">
            Implement this workflow with GTMSip
          </h3>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">
            GTMSip brings together Firecrawl web scraping, Claude MCP sales workflows, and shared WhatsApp & Instagram inboxes into one unified, compliant workspace.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openWaitlistModal}
              className="btn-primary !py-2.5 !px-5 text-sm"
            >
              Join Early Access Waitlist
            </button>
            <Link
              to={`/solutions/${post.relatedSolutionSlug}`}
              className="btn-secondary !py-2.5 !px-5 text-sm"
            >
              Explore Related Solution →
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="section border-t border-stone-200 bg-stone-50/50 dark:border-white/10 dark:bg-white/[0.02]" aria-labelledby="related-articles-heading">
          <div className="container-x">
            <h2 id="related-articles-heading" className="text-xl font-extrabold sm:text-2xl">
              Related Playbooks &amp; Articles
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug}>
                  <Link
                    to={`/blog/${item.slug}`}
                    className="card card-hover group flex h-full flex-col justify-between p-6"
                  >
                    <div>
                      <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                        {item.category}
                      </span>
                      <h3 className="mt-2 text-base font-extrabold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    <span className="mt-4 text-xs font-bold text-brand-600 dark:text-brand-400">
                      Read playbook →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
