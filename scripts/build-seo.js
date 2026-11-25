import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = 'https://gtmsip.com';

// Define all public pages with their SEO metadata
const ROUTES = [
  // 1. Homepage
  {
    path: '/',
    priority: '1.0',
    changefreq: 'weekly',
    title: 'AI Sales & Marketing Automation Platform | GTMSip',
    description:
      'Automate sales, marketing, lead generation and customer engagement with GTMSip. AI workflows, Firecrawl lead scraping, Claude MCP, and shared WhatsApp & Instagram inbox.',
    ogType: 'website',
  },

  // 2. High-Intent Solutions
  {
    path: '/solutions/whatsapp-marketing',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'WhatsApp Marketing Software & Business Automation | GTMSip',
    description:
      'Scale WhatsApp marketing with official Meta Business APIs. Send template broadcasts, run automated drip sequences, route conversations to a shared inbox, and close sales.',
    ogType: 'website',
  },
  {
    path: '/solutions/ai-sales-automation',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'AI Sales Automation Platform & Claude MCP Workflows | GTMSip',
    description:
      'Automate sales workflows with AI. Scrape leads, enrich contacts, score intent, connect Claude via MCP, and route deals to a human-in-the-loop pipeline.',
    ogType: 'website',
  },
  {
    path: '/solutions/lead-generation-software',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'AI Lead Generation Software & Web Scraping Pipeline | GTMSip',
    description:
      'Find and extract B2B leads from the web with Firecrawl, enrich data with AI, and sync directly to Google Sheets and your CRM pipeline.',
    ogType: 'website',
  },
  {
    path: '/solutions/instagram-automation',
    priority: '0.9',
    changefreq: 'weekly',
    title: 'Instagram Comment-to-DM & Social Sales Automation | GTMSip',
    description:
      'Turn Instagram comments into paying customers. Automate keyword replies on Reels, send instant private DMs, capture leads, and close deals in one shared inbox.',
    ogType: 'website',
  },

  // 3. Blog Hub & Articles
  {
    path: '/blog',
    priority: '0.8',
    changefreq: 'daily',
    title: 'Blog — AI Sales, WhatsApp Marketing & Lead Automation | GTMSip',
    description:
      'Actionable playbooks, strategic guides, and technical walkthroughs for WhatsApp marketing automation, Firecrawl lead scraping, Claude MCP sales workflows, and social commerce.',
    ogType: 'website',
  },
  {
    path: '/blog/how-to-automate-whatsapp-marketing',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'How to Automate WhatsApp Marketing Safely in 2025 | GTMSip',
    description:
      'A complete guide to automating WhatsApp marketing using official Meta Business APIs. Learn template approvals, the 24-hour window, opt-out compliance, and team routing.',
    ogType: 'article',
  },
  {
    path: '/blog/ai-sales-automation-guide',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'The Complete Guide to AI Sales Automation in 2025 | GTMSip',
    description:
      'Learn how to build end-to-end AI sales workflows: automate lead scraping, AI data enrichment, Claude MCP integration, and human-in-the-loop closing.',
    ogType: 'article',
  },
  {
    path: '/blog/b2b-lead-generation-firecrawl-google-sheets',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Automated B2B Lead Gen with Firecrawl & Google Sheets | GTMSip',
    description:
      'Discover how to extract high-quality business leads with Firecrawl web scraping, enrich data with AI, and sync to Google Sheets and your CRM automatically.',
    ogType: 'article',
  },
  {
    path: '/blog/instagram-comment-to-dm-strategy',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Instagram Comment-to-DM Strategy: Convert Views into Sales | GTMSip',
    description:
      'Learn how to turn viral Instagram Reels and posts into paying customers using keyword comment-to-DM automation, instant public replies, and CRM lead capture.',
    ogType: 'article',
  },
  {
    path: '/blog/whatsapp-marketing-vs-email-marketing',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'WhatsApp Marketing vs Email Marketing: Conversion & ROI Compared | GTMSip',
    description:
      'A comprehensive comparison of WhatsApp marketing vs email marketing: open rates, click-through rates, compliance, customer preferences, and ROI analysis.',
    ogType: 'article',
  },
  {
    path: '/blog/automated-follow-up-sales-workflows',
    priority: '0.8',
    changefreq: 'monthly',
    title: 'Automated Sales Follow-Up Workflows: Best Practices & Cadence | GTMSip',
    description:
      'Learn how to design multi-touch sales follow-up workflows across WhatsApp and email that convert warm leads without annoying prospects or sounding like a robot.',
    ogType: 'article',
  },

  // 4. Feature Hub & Feature Details
  {
    path: '/features',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Features Hub — All 10 Modules | GTMSip AI Sales & Social Platform',
    description:
      'Explore every GTMSip module: Firecrawl lead scraping, Google plugins, AI workflows and Claude MCP, shared WhatsApp & Instagram inbox, broadcasts, comment-to-DM, pipelines with Razorpay, and workspaces.',
    ogType: 'website',
  },
  {
    path: '/features/ai-workflows-mcp',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'AI Workflows & Claude MCP — GTMSip',
    description:
      'Expose leads, conversations and payments to approved AI assistants over MCP, and chain scrape → enrich → follow-up steps into AI workflows.',
    ogType: 'website',
  },
  {
    path: '/features/lead-scraping-firecrawl',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Lead Scraping with Firecrawl & Google Plugins — GTMSip',
    description:
      'Scrape targeted lead lists with Firecrawl, enrich them with AI, and store the results in Google Sheets, Drive and your deal pipeline — no copy-paste.',
    ogType: 'website',
  },
  {
    path: '/features/whatsapp-crm-inbox',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'WhatsApp CRM & Shared Team Inbox — GTMSip',
    description:
      'Route WhatsApp chats to the right teammate, with CRM tags, notes and payment context on every thread.',
    ogType: 'website',
  },
  {
    path: '/features/broadcasts-drip-flows',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Broadcasts & Automated Drip Flows — GTMSip',
    description:
      'Send approved WhatsApp broadcasts to opted-in audiences and trigger multi-step drip flows that branch on replies or opt-outs.',
    ogType: 'website',
  },
  {
    path: '/features/instagram-comment-to-dm',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Instagram Comment-to-DM & Inbox — GTMSip',
    description:
      'Reply publicly to comments on Reels and posts, send instant private DMs, and capture leads into your CRM — all inside Meta rules.',
    ogType: 'website',
  },
  {
    path: '/features/leads-pipelines-payments',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Leads, Deal Pipelines & Razorpay Payments — GTMSip',
    description:
      'Drag-and-drop deal stages with conversation history attached and Razorpay payment links that update deal status in real time.',
    ogType: 'website',
  },
  {
    path: '/features/analytics-meta-ads',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Analytics & Meta Ads Attribution — GTMSip',
    description:
      'Track first-response times, resolution rates and ad attribution via Meta marketing APIs — beside the conversations they generated.',
    ogType: 'website',
  },
  {
    path: '/features/teams-roles-workspaces',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Teams, Roles & Multi-Brand Workspaces — GTMSip',
    description:
      'Manage multiple client brands from one login with strict workspace isolation, custom roles and per-brand reporting.',
    ogType: 'website',
  },
  {
    path: '/features/integrations-api',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Integrations, Webhooks & API / MCP — GTMSip',
    description:
      'Connect external tools with HMAC-signed webhooks, scoped REST APIs and a Claude Model Context Protocol (MCP) endpoint.',
    ogType: 'website',
  },
  {
    path: '/features/plan-publish',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Plan & Publish (In Development) — GTMSip',
    description:
      'Social content calendar and publishing workspace coming soon to GTMSip. Join the early access waitlist.',
    ogType: 'website',
  },

  // 5. Product Pages
  {
    path: '/how-it-works',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'How It Works — AI Sales & Social Platform in 3 Steps | GTMSip',
    description:
      'Learn how GTMSip works: connect your official Meta channels, automate workflows with Firecrawl and Google plugins, and manage sales in a unified team inbox.',
    ogType: 'website',
  },
  {
    path: '/use-cases',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Use Cases — Lead Gen, Agencies, D2C, Education & Services | GTMSip',
    description:
      'Explore how sales teams, agencies, D2C e-commerce, and education brands scale with GTMSip AI lead scraping, WhatsApp CRM, and Instagram comment automation.',
    ogType: 'website',
  },
  {
    path: '/pricing',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Pricing Plans — Starter, Growth & Agency Tiers | GTMSip',
    description:
      'Compare GTMSip tiers — Starter, Growth, and Agency. Transparent feature breakdown including WhatsApp CRM, AI workflows, broadcasts, and deal pipelines.',
    ogType: 'website',
  },
  {
    path: '/security',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Security & Trust — Platform Architecture & Compliance | GTMSip',
    description:
      'Inspect GTMSip security architecture: row-level tenant isolation, encrypted tokens, HMAC webhook verification, and official Meta messaging-window compliance.',
    ogType: 'website',
  },
  {
    path: '/about',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'About GTMSip & Contact Us — The Unified AI Sales Workspace',
    description:
      'Why GTMSip exists, our mission, how to reach our team, and how we build compliant sales automation across official Meta business APIs.',
    ogType: 'website',
  },

  // 6. Legal Pages
  {
    path: '/legal/privacy',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Privacy Policy — GTMSip Compliance & Legal',
    description: 'GTMSip Privacy Policy: what data we process, why, retention, your rights and how to contact us.',
    ogType: 'website',
  },
  {
    path: '/legal/terms',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Terms of Service — GTMSip Compliance & Legal',
    description: 'GTMSip Terms of Service governing the use of the GTMSip platform and services.',
    ogType: 'website',
  },
  {
    path: '/legal/cookies',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Cookie Notice — GTMSip Compliance & Legal',
    description: 'GTMSip Cookie Notice explaining our use of essential and preference cookies.',
    ogType: 'website',
  },
  {
    path: '/legal/data-deletion',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Data Deletion Instructions — GTMSip Compliance & Legal',
    description: 'Instructions on how users and Meta platform accounts can request deletion of their data.',
    ogType: 'website',
  },
  {
    path: '/legal/meta-data-use',
    priority: '0.4',
    changefreq: 'yearly',
    title: 'Meta Data Use Statement — GTMSip Compliance & Legal',
    description: 'Detailed statement on how GTMSip accesses, handles, and protects data from Meta business APIs.',
    ogType: 'website',
  },
];

function generateSitemapXml() {
  const today = new Date().toISOString().split('T')[0];

  const urlEntries = ROUTES.map((r) => {
    const loc = r.path === '/' ? SITE_URL : `${SITE_URL}${r.path}`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

function run() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');

  // 1. Generate sitemap.xml in public/
  const sitemapContent = generateSitemapXml();
  const publicSitemap = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(publicSitemap, sitemapContent, 'utf-8');
  console.log(`✓ Wrote ${ROUTES.length} URLs to public/sitemap.xml`);

  // 2. If dist exists, copy sitemap.xml and robots.txt, and generate static HTML for each route
  if (fs.existsSync(distDir)) {
    const distSitemap = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(distSitemap, sitemapContent, 'utf-8');

    const publicRobots = path.join(publicDir, 'robots.txt');
    if (fs.existsSync(publicRobots)) {
      fs.copyFileSync(publicRobots, path.join(distDir, 'robots.txt'));
      console.log('✓ Copied robots.txt to dist/');
    }

    // Read dist/index.html as template
    const templatePath = path.join(distDir, 'index.html');
    if (fs.existsSync(templatePath)) {
      let template = fs.readFileSync(templatePath, 'utf-8');

      const semanticFallback = `<div id="root">
    <div style="opacity:0;position:absolute;pointer-events:none;z-index:-1" aria-hidden="false">
      <h1>Automate Your Sales, Marketing &amp; Customer Engagement with AI</h1>
      <p>GTMSip is the AI-driven sales and marketing automation platform: Firecrawl lead scraping, Google plugins for data storage, Claude MCP workflows, and shared WhatsApp &amp; Instagram inbox to close deals.</p>
      <nav aria-label="Solutions and Key Sections">
        <ul>
          <li><a href="/solutions/whatsapp-marketing">WhatsApp Marketing Software &amp; Automation</a></li>
          <li><a href="/solutions/ai-sales-automation">AI Sales Automation Software &amp; Claude MCP</a></li>
          <li><a href="/solutions/lead-generation-software">B2B Lead Generation Software &amp; Scraping</a></li>
          <li><a href="/solutions/instagram-automation">Instagram Comment to DM Automation</a></li>
          <li><a href="/features">Features Hub (All 10 Modules)</a></li>
          <li><a href="/how-it-works">How It Works</a></li>
          <li><a href="/use-cases">Use Cases</a></li>
          <li><a href="/pricing">Pricing Plans</a></li>
          <li><a href="/security">Security &amp; Compliance</a></li>
          <li><a href="/about">About &amp; Contact</a></li>
          <li><a href="/blog">Blog &amp; Playbooks</a></li>
        </ul>
      </nav>
    </div>
  </div>`;

      // Update dist/index.html with semantic H1 and crawlable links
      let rootHtml = template.replace(/<div id="root"><\/div>/i, semanticFallback);
      fs.writeFileSync(templatePath, rootHtml, 'utf-8');
      console.log('✓ Injected semantic H1 and crawlable navigation into dist/index.html');

      for (const route of ROUTES) {
        if (route.path === '/') continue;

        const canonical = `${SITE_URL}${route.path}`;
        const targetDir = path.join(distDir, route.path.replace(/^\//, ''));
        fs.mkdirSync(targetDir, { recursive: true });

        let html = template;
        // Replace title
        html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);
        // Replace meta description
        html = html.replace(
          /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
          `<meta name="description" content="${route.description}" />`,
        );
        // Replace canonical link
        html = html.replace(
          /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
          `<link rel="canonical" href="${canonical}" />`,
        );
        // Replace og:title
        html = html.replace(
          /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
          `<meta property="og:title" content="${route.title}" />`,
        );
        // Replace og:description
        html = html.replace(
          /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
          `<meta property="og:description" content="${route.description}" />`,
        );
        // Replace og:url
        html = html.replace(
          /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
          `<meta property="og:url" content="${canonical}" />`,
        );
        // Replace og:type
        html = html.replace(
          /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
          `<meta property="og:type" content="${route.ogType}" />`,
        );
        // Replace twitter:title
        html = html.replace(
          /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
          `<meta name="twitter:title" content="${route.title}" />`,
        );
        // Replace twitter:description
        html = html.replace(
          /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
          `<meta name="twitter:description" content="${route.description}" />`,
        );

        // Inject page-specific semantic H1 and links
        const pageFallback = `<div id="root">
    <div style="opacity:0;position:absolute;pointer-events:none;z-index:-1" aria-hidden="false">
      <h1>${route.title}</h1>
      <p>${route.description}</p>
      <nav aria-label="Main Navigation">
        <a href="/">Home</a>
        <a href="/solutions/whatsapp-marketing">WhatsApp Marketing</a>
        <a href="/solutions/ai-sales-automation">Sales Automation</a>
        <a href="/solutions/lead-generation-software">Lead Generation</a>
        <a href="/blog">Blog</a>
      </nav>
    </div>
  </div>`;
        html = html.replace(/<div id="root"><\/div>/i, pageFallback);

        fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8');
      }
      console.log(`✓ Prerendered static HTML with custom metadata and H1 for ${ROUTES.length - 1} subroutes in dist/`);
    }
  }
}

run();
