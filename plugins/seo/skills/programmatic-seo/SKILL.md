---
name: programmatic-seo
description: Builds and scales programmatic SEO — auto-generated landing pages from templates + structured data targeting thousands of long-tail keywords. Use when planning database-driven page generation (integration pages, comparison pages, city/location pages, template galleries, directory/aggregator pages), scaling organic traffic with repeatable patterns, or building product-led SEO experiences. Trigger phrases include "programmatic SEO", "pSEO", "auto-generate pages", "template pages at scale", "database-driven pages", "long-tail at scale". NOT for hand-written editorial content (use seo-optimization), keyword research phase (use keyword-research), fixing crawl/speed/indexing issues (use technical-seo), or optimizing for AI search engines (use ai-ready).
metadata:
  author: Petr
  version: 1.0.0
---

# Programmatic SEO

**When to use this skill:**

- Building database-driven pages targeting long-tail keywords at scale
- Creating template landing pages (integrations, comparisons, locations, directories)
- Scaling from 100 to 100,000+ pages using structured data + templates
- Evaluating whether pSEO is the right strategy for your product
- Need to generate unique, valuable pages without writing each one by hand
- Building product-led SEO where the page IS the product experience

**When NOT to use:**

- Writing individual editorial content or blog posts --> use `seo-optimization`
- Keyword research and opportunity analysis --> use `keyword-research`
- Fixing crawl errors, site speed, Core Web Vitals --> use `technical-seo`
- Optimizing content for AI search (ChatGPT, Perplexity) --> use `ai-ready`
- General on-page optimization for existing pages --> use `seo-optimization`

---

## Quick Router

| User says... | Go to... |
|---|---|
| "should I do programmatic SEO?", "is pSEO right for us?" | Qualification Check |
| "what type of pages?", "template ideas" | Playbook Types |
| "how to implement", "build pSEO pages" | Implementation Workflow |
| "data sources", "where to get data" | Data Enrichment Pipeline |
| "avoid penalties", "Google safe?", "thin content" | Quality Gate |
| "tech stack", "what tools" | Tech Stack Options |
| "examples", "case studies", "who does this well" | Case Studies |

---

## Qualification Check: Is pSEO Right For You?

Before building anything, answer these five questions. All must be YES.

| # | Question | Requirement |
|---|----------|-------------|
| 1 | Do people search for your topic with variable modifiers? | e.g., "[tool A] + [tool B] integration", "[city] + [category]" |
| 2 | Can you generate unique, valuable data per page? | Not just swapping city names in the same text |
| 3 | Is total search volume worth the effort? | 1,000+ keyword variations with combined 10K+ monthly searches |
| 4 | Can each page serve genuine user intent? | User finds what they need, not a doorway to your real product |
| 5 | Do you have (or can you build) a structured dataset? | Database, API, scraped data, UGC, or proprietary data |

**If any answer is NO:** Stop. Use editorial SEO via `seo-optimization` instead.

**The core test (Eli Schwartz):** "The ideal Product-Led SEO strategy is programmatic and scalable, creates something new, and addresses untapped search demand." Your pSEO pages should be product experiences, not thin content wrappers.

---

## Core Concept: Head Term + Modifier

Every pSEO project starts with this pattern:

```
[Head Term] + [Modifier A] + [Modifier B (optional)]
```

**Real examples:**

| Company | Head Term | Modifier A | Modifier B | Pages |
|---------|-----------|------------|------------|-------|
| Wise | "convert" | currency A | currency B | 10K+ |
| Zapier | "connect" | app A | app B | 50K+ |
| TripAdvisor | "best" + category | city | -- | 7M+ |
| NomadList | "live in" | city | -- | 2K+ |
| G2 | "vs" | software A | software B | 100K+ |
| Canva | template type | use case | -- | 100K+ |

**Finding your pattern:** List every variable dimension your product touches. Cross-multiply. If the matrix produces 500+ unique combinations with search demand, you have a pSEO opportunity.

---

## Playbook Types

### 1. Integration / Connector Pages

**Pattern:** "[Tool A] + [Tool B] integration"
**Example:** Zapier -- 50K+ pages, 2.6M monthly organic traffic
**Data needed:** App names, logos, integration steps, use cases, pricing
**Why it works:** Each page IS the product. User can set up the integration right there.
**Best for:** SaaS with APIs, iPaaS, automation platforms

### 2. Comparison / Alternative Pages

**Pattern:** "[Product A] vs [Product B]" or "[Product] alternatives"
**Example:** G2 -- 6M+ monthly organic, covers every B2B software category
**Data needed:** Feature matrices, pricing, user ratings, screenshots
**Why it works:** High commercial intent. Users are actively deciding between options.
**Best for:** SaaS, review sites, marketplaces

### 3. Location / City Pages

**Pattern:** "best [category] in [city]" or "[service] in [location]"
**Example:** TripAdvisor -- 226M monthly organic, 7M indexed pages
**Data needed:** Local listings, reviews, ratings, photos, maps
**Why it works:** Hyperlocal targeting with UGC for uniqueness.
**Best for:** Travel, local services, real estate, directories

### 4. Template / Gallery Pages

**Pattern:** "[type] template" or "[use case] design"
**Example:** Canva -- 100M+ monthly organic traffic
**Data needed:** Template thumbnails, categories, descriptions, use-case tags
**Why it works:** Transactional intent -- users want to USE the template immediately.
**Best for:** Design tools, document platforms, website builders

### 5. Data / Calculator Pages

**Pattern:** "[metric A] to [metric B]" or "[calculation] calculator"
**Example:** Wise -- 60.5M monthly organic via currency conversion pages
**Data needed:** Real-time data feeds, historical data, calculation logic
**Why it works:** Functional tool embedded in the page. Real-time data = always fresh.
**Best for:** Finance, analytics, conversion tools

### 6. Aggregator / Directory Pages

**Pattern:** "[category] companies" or "[type] directory"
**Example:** Yelp, Zillow, NerdWallet
**Data needed:** Listings, structured attributes, reviews, ratings
**Why it works:** Complete coverage + UGC = hard to replicate.
**Best for:** Marketplaces, review platforms, industry directories

### 7. Glossary / Knowledge Base Pages

**Pattern:** "what is [term]" or "[term] definition"
**Data needed:** Term definitions, related concepts, examples, visuals
**Why it works:** Informational intent at scale. Builds topical authority.
**Best for:** Technical products, education, B2B SaaS

---

## Implementation Workflow

### Step 1: Keyword Research & Opportunity Sizing

Use `keyword-research` skill to:

1. Identify your head term + modifier pattern
2. Cross-multiply all variable combinations
3. Validate search volume (use Ahrefs Keywords Explorer or Semrush Keyword Magic Tool)
4. Filter: keep combinations with combined volume > 10K/month
5. Map keyword difficulty -- pSEO works best at KD < 30

**Output:** Spreadsheet with columns: keyword, search volume, KD, intent, priority

### Step 2: Data Acquisition & Enrichment

Build your dataset. Every page needs enough unique data to avoid thin content.

**Data sources by type:**

| Source | Examples | Cost |
|--------|----------|------|
| APIs | Currency rates, weather, stock prices | Free-$$ |
| Scraping | Product specs, pricing, reviews | Free (respect robots.txt) |
| Public databases | Census, government data, open datasets | Free |
| User-generated | Reviews, ratings, photos, Q&A | Requires user base |
| Proprietary | Your product data, analytics, calculations | Your competitive moat |
| AI-generated | Descriptions, analysis, summaries | API costs |

**Enrichment pipeline (layer these for uniqueness):**

```
Base data (required)
  + API data (real-time pricing, stats, availability)
  + AI-generated analysis (unique descriptions, comparisons)
  + Calculated metrics (scores, rankings, indices)
  + UGC (reviews, ratings, photos)
  = Differentiated page
```

**Critical threshold:** Aim for 500+ unique words and 30-40% content differentiation per page. 93% of penalized pSEO sites lacked meaningful page-to-page differentiation (Deepak Gupta).

### Step 3: Template Design

Design a single page template with variable slots. The template must:

1. **Serve the search intent** -- what does the user expect to find?
2. **Include functional elements** -- calculators, filters, interactive tools
3. **Have above-the-fold value** -- answer the query before scrolling
4. **Support structured data** -- JSON-LD schema for your content type
5. **Include internal linking** -- to related pages (hub-spoke model)

**Template anatomy:**

```
[H1: {Head Term} {Modifier A} {Modifier B}]
[Above-fold: Key data / tool / answer -- immediate value]
[Section 1: Detailed data / comparison / features]
[Section 2: AI-enriched analysis or context]
[Section 3: Related items / internal links]
[Section 4: UGC (reviews, Q&A) if available]
[Section 5: FAQ (from People Also Ask)]
[CTA: Product action -- convert, try, compare]
[Structured data: JSON-LD]
```

### Step 4: Technical Implementation

**URL structure:**

```
domain.com/{category}/{modifier-a}-{modifier-b}
domain.com/integrations/slack-google-drive
domain.com/convert/usd-to-eur
domain.com/best/restaurants-in-prague
```

Rules: lowercase, hyphens, no parameters, descriptive slugs.

**Technical SEO requirements** (see `technical-seo` for full detail):

- [ ] XML sitemaps segmented by content type (max 50K URLs each)
- [ ] Canonical tags on every programmatic page
- [ ] Robots.txt allows crawling of all pSEO pages
- [ ] Server-side rendering or static generation (no client-side rendering for pSEO)
- [ ] Page load < 2.5s (LCP) -- critical at scale
- [ ] Mobile-first design
- [ ] Hreflang tags if multi-language
- [ ] IndexNow protocol for new page notification

**Internal linking strategy (hub-spoke):**

```
Hub page: "All integrations" / "All cities" / "All templates"
  |-- Spoke: Individual pSEO pages
  |-- Cross-links between related spokes
  |-- Breadcrumbs: Home > Category > Page
```

### Step 5: Batched Launch & Indexing

Never publish everything at once. Follow this sequence:

1. **Batch 0 (test):** Generate 50-100 pages. Set to `noindex`.
2. **Quality check:** Manual review of 20+ pages. Fix template issues.
3. **Batch 1:** Remove `noindex` from 10-20 best pages. Submit sitemap.
4. **Monitor:** Wait 2-4 weeks. Check Google Search Console for indexing, impressions, clicks.
5. **Iterate:** Fix issues found. Adjust template. Improve data.
6. **Scale:** Open batches of 50-100 pages per week.
7. **Prune:** After 3 months, noindex or remove pages with zero impressions.

**Indexing acceleration:**

- Submit segmented XML sitemaps to Google Search Console
- Use IndexNow API (Bing, Yandex instant notification)
- Use Google Indexing API for time-sensitive content
- Internal link from existing high-authority pages to new pSEO pages

### Step 6: Monitoring & Optimization

**Key metrics:**

| Metric | Tool | Target |
|--------|------|--------|
| Pages indexed | Google Search Console | > 90% of published pages |
| Impressions per page | GSC | > 0 within 30 days |
| Avg CTR | GSC | > 2% for long-tail |
| Organic traffic (pSEO segment) | GA4 | Month-over-month growth |
| Crawl budget utilization | GSC Crawl Stats | No wasted crawls on low-value pages |
| Thin content flags | GSC Coverage | Zero "Discovered - not indexed" for quality pages |
| Conversion rate | GA4 | pSEO pages converting at > 50% of editorial pages |

**Monthly optimization cycle:**

1. Identify bottom 10% pages by impressions --> improve or prune
2. Identify top 10% pages --> replicate pattern in new templates
3. Check for cannibalization (multiple pSEO pages ranking for same query)
4. Update data freshness (stale data = stale rankings)
5. Add new keyword patterns as you discover them in GSC queries

---

## Quality Gate: Avoiding Penalties

Google's Helpful Content system penalizes sites with high percentages of search-engine-first content. Recovery takes 6-12 months. Follow these rules.

### The Quality Checklist

**Must pass ALL before publishing:**

- [ ] Every page answers a specific, real search query
- [ ] Each page has 500+ unique words (not just template text)
- [ ] 30-40% content differentiation between similar pages
- [ ] Functional value on the page (tool, calculator, real data -- not just text)
- [ ] No doorway pages (pages that just redirect to your main product)
- [ ] Structured data matches visible content (no hidden schema tricks)
- [ ] Internal links are genuinely helpful navigation, not link schemes
- [ ] Page provides value even if the user never clicks to another page

### Red Flags That Trigger Penalties

| Red Flag | Why It's Dangerous | Fix |
|----------|-------------------|-----|
| Swapping only city/product name in identical text | Duplicate content at scale | Unique data + AI enrichment per page |
| Thousands of pages with < 200 words | Thin content signal | Minimum 500 unique words, add data layers |
| No functional purpose beyond ranking | Doorway page pattern | Embed product functionality in the page |
| Massive page count with low avg quality | Helpful Content system flags entire site | Quality > quantity. Prune ruthlessly. |
| Publishing 10K+ pages overnight | Unnatural growth pattern | Batch publishing over weeks/months |
| Auto-generated text without human review | Spam signal | QA sample of every template variation |
| Orphan pages with no internal linking | Crawl waste, low authority | Hub-spoke architecture |

### The 10-Page Test

Before scaling, ask: "If I randomly pick 10 pages from my pSEO set, would a human user find each one genuinely useful?" If the answer is not a confident yes, improve the template before publishing more.

---

## Tech Stack Options

### No-Code Stack (~$100-450/month)

| Component | Tool | Purpose |
|-----------|------|---------|
| CMS | Webflow | Template design + hosting |
| Database | Airtable | Content data management |
| Sync | Whalesync | Bi-directional Airtable <> Webflow sync |

**Best for:** Non-technical founders, < 10K pages, rapid prototyping.
**Limitation:** Webflow CMS limit is 10K items. Beyond that, need custom solution.

### WordPress Stack (~$100-400/year)

| Component | Tool | Purpose |
|-----------|------|---------|
| CMS | WordPress | Page generation + hosting |
| Generator | MPG (Multi Page Generator) or Page Generator Pro | Template-based page generation |
| Import | WP All Import | Bulk CSV/API data import |

**Best for:** Existing WordPress sites, SEO-heavy operations, 1K-100K pages.
**Limitation:** Performance degrades at very large scale without caching.

### Developer Stack (hosting costs only)

| Component | Tool | Purpose |
|-----------|------|---------|
| Framework | Next.js (SSG/ISR) | Static generation with incremental builds |
| CMS/API | Strapi, PayloadCMS, or Sanity | Content API + admin |
| Database | PostgreSQL / Supabase | Structured data storage |
| Deploy | Vercel or Netlify | Edge CDN, fast builds |

**Best for:** Technical founders, 10K+ pages, custom data pipelines, maximum control.
**Key advantage:** ISR (Incremental Static Regeneration) lets you rebuild individual pages without regenerating the entire site.

### AI Content Tools (supplement, not replace)

| Tool | Use For | Cost |
|------|---------|------|
| Byword.ai | Bulk AI content generation, 9 languages | $5+/mo |
| SEOmatic | Full pSEO platform with CMS integrations | $49+/mo |
| SurferSEO | Content optimization scoring | $89+/mo |
| Clearscope | Content quality scoring | Premium |

**Warning:** AI tools generate content, not pages. You still need the template, data pipeline, and technical infrastructure. AI enriches -- it does not replace your unique data.

---

## Case Studies

### Zapier -- Integration Pages

- **Pattern:** "[App A] + [App B] integration"
- **Scale:** 50K+ pages, 2.6M monthly organic traffic
- **Key insight:** Each page IS the product. Users can configure the integration directly on the landing page. Unique data per page: specific integration steps, popular workflows, app-specific benefits.

### Canva -- Template Gallery

- **Pattern:** "[type] template"
- **Scale:** 100M+ monthly organic traffic
- **Key insight:** Pure product-led SEO. The search intent is transactional ("I want a resume template") and Canva serves the actual templates. No fluff content -- immediate value.

### Wise -- Currency Conversion

- **Pattern:** "[Currency A] to [Currency B]"
- **Scale:** 60.5M monthly organic traffic
- **Key insight:** Real-time exchange rate data makes every page fresh and functional. The page is a working currency converter, not just an article about exchange rates.

### TripAdvisor -- Location Pages

- **Pattern:** "best [category] in [city]"
- **Scale:** 226M+ monthly organic, 7M indexed pages
- **Key insight:** UGC (user reviews, photos, ratings) provides unique content per page. Fresh content from continuous user contributions.

### NomadList -- City Data Pages

- **Pattern:** "[city] for digital nomads"
- **Scale:** 24K indexed pages, built by a solo founder (Pieter Levels)
- **Key insight:** Proves pSEO works for indie projects. Proprietary data collection (cost of living, internet speed, weather, safety scores). Filter-based URL structure.

### G2 -- Software Reviews & Comparisons

- **Pattern:** "[Software A] vs [Software B]"
- **Scale:** 6M+ monthly organic
- **Key insight:** Verified user reviews (UGC) as the primary differentiator. Covers every B2B software category. Comparison pages have high commercial intent.

---

## Common Mistakes

1. **Template-only thinking.** Changing the city name in identical text is not pSEO -- it is spam. Every page needs unique data, not just unique keywords.

2. **Launching too big too fast.** Publishing 10K pages on day one triggers quality filters. Batch in groups of 50-100 over weeks.

3. **No functional value.** If the page is just text about a topic (not a tool, calculator, or interactive experience), editorial content via `seo-optimization` will outperform pSEO.

4. **Ignoring crawl budget.** 100K low-quality pages consume crawl budget that prevents your important pages from indexing. Prune aggressively.

5. **Skipping the data layer.** Going straight from template to AI-generated filler text. AI enriches structured data; it does not replace it.

6. **No internal linking architecture.** Orphan pSEO pages without hub-spoke structure get neither crawled nor ranked.

7. **One-and-done mentality.** pSEO pages need data freshness updates, pruning of underperformers, and template iteration. It is an ongoing system, not a launch.

8. **Chasing page count over page quality.** 1,000 excellent pages outperform 100,000 thin pages. Google penalizes the entire site, not just the bad pages.

9. **No conversion path.** Getting organic traffic to a page that has no CTA or product action. Every pSEO page needs a clear next step.

10. **Ignoring AI search evolution.** pSEO pages that rank well in Google may not surface in AI search (ChatGPT, Perplexity). Structure content for AI extraction too -- see `ai-ready`.

---

## Frameworks Reference

### Product-Led SEO (Eli Schwartz)

Build SEO into the product itself. The pSEO page should not just describe your product -- it should BE a product experience. Wise's currency converter, Canva's template browser, Zapier's integration configurator. If you can make the search result page functional, you win.

### Hub-and-Spoke / Topical Authority

Central hub page covers the broad topic ("All integrations"). Spokes are individual pSEO pages ("Slack + Google Drive integration"). All spokes link to hub. Related spokes cross-link. This builds topical authority signals that help every page in the cluster rank better.

### Batched Indexing Strategy

Publish in waves. Start with noindex. QA manually. Open 10-20 pages. Monitor for 2-4 weeks. Fix issues. Scale. Prune underperformers at 3 months. This protects against quality penalties and lets you iterate the template before committing at scale.

### Data Enrichment Pipeline

Layer multiple data sources to create genuinely unique pages:

```
Layer 1: Base structured data (names, categories, attributes)
Layer 2: API data (real-time metrics, pricing, availability)
Layer 3: Calculated/derived metrics (scores, rankings, comparisons)
Layer 4: AI-generated analysis (unique descriptions, insights)
Layer 5: UGC (reviews, ratings, Q&A, photos)
```

Each layer adds differentiation. Aim for 3+ layers minimum.

### The Topical Map (Matt Diggity)

Before generating pages, map every topic and subtopic in your domain. This prevents cannibalization (multiple pages competing for the same query), ensures complete coverage, and signals topical expertise to Google. Combined with link building and algorithm monitoring, this forms Diggity's "winning trifecta."

---

## Related Skills

- **Keyword research phase:** `keyword-research` -- find your head term + modifier patterns
- **On-page and general SEO:** `seo-optimization` -- for editorial content and on-page optimization
- **Technical foundation:** `technical-seo` -- crawling, indexing, Core Web Vitals, site architecture
- **AI search optimization:** `ai-ready` -- structure pSEO content for ChatGPT, Perplexity, AI Overviews

---

## Key Sources

- Kevin Indig -- Growth Memo, "The changing dynamic of programmatic SEO"
- Eli Schwartz -- "Product-Led SEO" (book and newsletter)
- Ethan Smith (Graphite) -- Lenny's Podcast, programmatic vs editorial SEO
- Ian Nuttall -- Practical Programmatic, case study breakdowns
- Deepak Gupta -- "The Complete Guide to Programmatic SEO"
- Matt Diggity -- Winning trifecta case study (502 articles, 800 referring domains)
- Ahrefs, Semrush, Backlinko -- Comprehensive pSEO guides
- Patrick Stox -- Technical SEO foundations critical for pSEO at scale
