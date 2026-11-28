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
    h1: 'Features Hub: All 10 Modules for AI Sales & Messaging',
    description:
      'Explore every GTMSip module: Firecrawl lead scraping, Google plugins, AI workflows and Claude MCP, shared WhatsApp & Instagram inbox, broadcasts, comment-to-DM, pipelines with Razorpay, and workspaces.',
    ogType: 'website',
  },
  {
    path: '/features/ai-workflows-mcp',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'AI Sales Workflow Automation & Claude MCP Platform | GTMSip',
    h1: 'AI Sales Workflows & Claude MCP Automation',
    description:
      'Automate sales workflows with AI: connect Claude via Model Context Protocol (MCP), chain scrape-to-enrich steps, and orchestrate human-in-the-loop handoffs.',
    ogType: 'website',
  },
  {
    path: '/features/lead-scraping-firecrawl',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'B2B Lead Scraping Software with Firecrawl & AI | GTMSip',
    h1: 'B2B Lead Scraping with Firecrawl & Google Workspace',
    description:
      'Scrape B2B lead lists with Firecrawl web extraction, enrich data with AI, and sync verified accounts directly into Google Sheets, Drive, and your CRM pipeline.',
    ogType: 'website',
  },
  {
    path: '/features/whatsapp-crm-inbox',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'WhatsApp CRM & Multi-Agent Shared Team Inbox | GTMSip',
    h1: 'WhatsApp CRM & Multi-Agent Shared Team Inbox',
    description:
      'Route WhatsApp customer chats to teammates, prevent collision, track deal stages, and view full CRM context in one shared inbox built on the Meta Cloud API.',
    ogType: 'website',
  },
  {
    path: '/features/broadcasts-drip-flows',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'WhatsApp Broadcast Software & Drip Automation | GTMSip',
    h1: 'WhatsApp Broadcast Software & Automated Drip Sequences',
    description:
      'Send approved WhatsApp template broadcasts to targeted audiences, run automated multi-step drip sequences, and trigger agent handoffs on customer replies.',
    ogType: 'website',
  },
  {
    path: '/features/instagram-comment-to-dm',
    priority: '0.8',
    changefreq: 'weekly',
    title: 'Instagram Comment to DM Automation & Social CRM | GTMSip',
    h1: 'Instagram Comment-to-DM & Social Sales Automation',
    description:
      'Automatically reply to Instagram post and Reel comments, send instant private DMs, capture leads into your CRM, and manage conversations in one unified inbox.',
    ogType: 'website',
  },
  {
    path: '/features/leads-pipelines-payments',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Visual CRM Deal Pipelines & In-Chat Payments | GTMSip',
    h1: 'Visual Deal Pipelines & In-Chat Razorpay Payments',
    description:
      'Track sales leads across visual drag-and-drop pipeline stages, generate Razorpay payment links directly in chat, and automatically reconcile paid transactions.',
    ogType: 'website',
  },
  {
    path: '/features/analytics-meta-ads',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'WhatsApp & Meta Ads Attribution Analytics | GTMSip',
    h1: 'Team Inbox Analytics & Meta Ads Attribution',
    description:
      'Monitor team response times, resolution rates, and conversation-to-revenue ROI with official Meta Marketing API attribution beside live customer conversations.',
    ogType: 'website',
  },
  {
    path: '/features/teams-roles-workspaces',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'Multi-Tenant Agency Workspaces & Role-Based CRM | GTMSip',
    h1: 'Multi-Brand Workspaces & Role-Based Access Control',
    description:
      'Manage multiple client brands with strict workspace isolation, custom roles (Owner, Admin, Agent), and per-brand reporting tailored for agencies and teams.',
    ogType: 'website',
  },
  {
    path: '/features/integrations-api',
    priority: '0.7',
    changefreq: 'weekly',
    title: 'B2B Sales Webhooks, Scoped REST API & Claude MCP | GTMSip',
    h1: 'Developer Webhooks, Scoped REST APIs & Claude MCP',
    description:
      'Connect external CRMs and databases with HMAC-signed webhooks, scoped REST APIs, and an official Model Context Protocol (MCP) server for Claude AI assistants.',
    ogType: 'website',
  },
  {
    path: '/features/plan-publish',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'Social Content Calendar & Multi-Channel Publishing | GTMSip',
    h1: 'Social Content Planning & Multi-Channel Publishing',
    description:
      'Plan, review, and schedule social content across WhatsApp and Instagram from a collaborative calendar workspace with client approvals. Coming soon to GTMSip.',
    ogType: 'website',
  },

  // 5. Product Pages
  {
    path: '/how-it-works',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'How GTMSip Works: AI Sales Automation & Meta CRM Architecture',
    h1: 'How GTMSip Works: AI Sales Automation & Meta CRM Architecture',
    description:
      'Discover how GTMSip connects official Meta Business APIs, Firecrawl web scraping, Claude MCP workflows, and shared team inboxes into a 3-step sales engine.',
    ogType: 'website',
  },
  {
    path: '/use-cases',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Use Cases: Lead Gen, Agencies, D2C & High-Ticket Sales | GTMSip',
    h1: 'Use Cases: Lead Gen, Agencies, D2C & High-Ticket Sales',
    description:
      'See how B2B sales teams, marketing agencies, D2C e-commerce, and education brands scale revenue with GTMSip AI lead scraping and WhatsApp automation.',
    ogType: 'website',
  },
  {
    path: '/pricing',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'GTMSip Pricing: Transparent Plans for Teams & Agencies',
    h1: 'GTMSip Pricing: Transparent Plans for Teams & Agencies',
    description:
      'Explore GTMSip pricing plans: Starter, Growth, and Agency tiers. Transparent pricing for WhatsApp CRM, AI workflows, broadcasts, and deal pipeline management.',
    ogType: 'website',
  },
  {
    path: '/security',
    priority: '0.7',
    changefreq: 'monthly',
    title: 'Security & Compliance Architecture — SOC-2 Ready | GTMSip',
    h1: 'Security & Compliance Architecture',
    description:
      'Inspect GTMSip security: tenant-isolated database rows, AES-256 encrypted tokens, HMAC-signed webhooks, and official Meta Cloud API compliance guarantees.',
    ogType: 'website',
  },
  {
    path: '/about',
    priority: '0.6',
    changefreq: 'monthly',
    title: 'About GTMSip — Building the Modern AI Sales Workspace',
    h1: 'About GTMSip — Building the Modern AI Sales Workspace',
    description:
      'Meet the team behind GTMSip. We are building the unified AI sales platform connecting lead scraping, Claude MCP workflows, and Meta business messaging.',
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
    <div class="sr-only">
      <h1>Find leads with AI. Close deals in one sales &amp; marketing workspace.</h1>
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
        const pageH1 = route.h1 || route.title.replace(/ (\||—|–) GTMSip.*$/, '');
        const pageFallback = `<div id="root">
    <div class="sr-only">
      <h1>${pageH1}</h1>
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
