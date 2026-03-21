# SEO Skills Restructuring — Design Spec

**Date:** 2026-03-21
**Status:** Approved
**Scope:** Split 6 monolithic SEO skills into 12 specialist skills + 1 orchestrator = 13 total

## Problem

Two skills (`seo-optimization`, `technical-seo`) are monoliths covering 5+ topics each. Key SEO disciplines are missing entirely: schema markup validation, image optimization, sitemap management, hreflang/i18n, competitor comparison pages, and dedicated link building. The competitor `claude-seo` plugin covers these with 13 sub-skills.

## Solution

Split into 12 specialized skills + 1 orchestrator. Each skill owns one SEO discipline. The orchestrator routes based on keyword matching.

## Architecture

```
plugins/seo/skills/
├── seo-orchestrator/SKILL.md     ← NEW: routes to correct specialist
├── on-page-seo/SKILL.md         ← RENAMED from seo-optimization, narrowed scope
├── technical-seo/SKILL.md       ← MODIFIED: removed structured data + i18n sections
├── schema-markup/SKILL.md       ← NEW: JSON-LD, video schema, deprecations, @id
├── image-seo/SKILL.md           ← NEW: formats, lazy loading, compression, visual search
├── sitemap-management/SKILL.md  ← NEW: XML sitemaps, IndexNow, large site strategy
├── hreflang-i18n/SKILL.md       ← NEW: validation, cross-domain, audit workflow
├── keyword-research/SKILL.md    ← UNCHANGED
├── link-building/SKILL.md       ← NEW: extracted from seo-optimization Phase 4
├── competitor-pages/SKILL.md    ← NEW: X vs Y playbook
├── programmatic-seo/SKILL.md    ← MODIFIED: +competitor pages as 8th playbook type
├── ai-ready/SKILL.md            ← MODIFIED: +schema AI visibility section
└── aso-optimization/SKILL.md    ← UNCHANGED
```

## Orchestrator Routing

```yaml
triggers:
  technical-seo:
    - audit, technical, core web vitals, performance, crawl, robots.txt, security, HTTPS
  on-page-seo:
    - on-page, title tag, meta description, H1, keyword density, content optimization, E-E-A-T
  schema-markup:
    - schema, structured data, JSON-LD, rich results, video schema, markup
  image-seo:
    - image, lazy loading, WebP, AVIF, alt text, compression, OG image, srcset
  sitemap-management:
    - sitemap, IndexNow, crawl budget, XML sitemap
  hreflang-i18n:
    - hreflang, international, i18n, multilingual, localization, translation
  keyword-research:
    - keyword, search volume, keyword difficulty, long-tail, topic cluster
  link-building:
    - link building, backlinks, outreach, domain authority, linkable assets
  competitor-pages:
    - competitor, vs, comparison, alternative, X vs Y
  programmatic-seo:
    - programmatic, pSEO, database pages, scaled content
  ai-ready:
    - AI search, llms.txt, AI crawlers, GEO, generative engine, ChatGPT search
  aso-optimization:
    - app store, ASO, Play Store, App Store, mobile app SEO
```

Multi-skill routing: If query spans multiple disciplines (e.g., "full site audit"), orchestrator runs relevant skills sequentially.

## New Skills — Content Sources

### 1. schema-markup

Source: Schema research agent output.

Phases:

1. **Active Schema Types** — Product, Article, LocalBusiness, Organization, Person, Event, VideoObject, BreadcrumbList, SoftwareApplication, Review/AggregateRating, JobPosting. Per-type required + recommended properties.
2. **Deprecated Types** — Timeline: HowTo (Aug 2023), FAQ restricted (Aug 2023), SpecialAnnouncement (Jan 2026), Course Info (Jan 2026), ClaimReview (Jan 2026), EstimatedSalary (Jan 2026), LearningVideo (Jan 2026), VehicleListing (Jan 2026), PracticeProblem (Jan 2026). No ranking penalty for keeping them, but dead weight.
3. **Video Schema** — VideoObject (required: name, thumbnailUrl, uploadDate), Clip (manual key moments), SeekToAction (automatic key moments), BroadcastEvent (LIVE badge, requires Indexing API). When to use which.
4. **JSON-LD Best Practices** — @id entity graph pattern, sameAs links, single vs @graph blocks, nesting rules, ISO 8601 dates, placement in head/body, match markup to visible content.
5. **Validation Workflow** — Pre-publish (Rich Results Test), syntax (schema.org validator), post-publish (GSC Enhancements), bulk (Screaming Frog/Sitebulb). Common errors by category (60% missing required, 25% syntax, 15% content mismatch).
6. **Schema for AI Visibility** — LLMs use JSON-LD for entity understanding. GPT-4 accuracy 16% → 54% with structured data. AI Overviews in 13%+ of searches. Schema is now AI visibility requirement, not just rich results tactic.

### 2. image-seo

Source: Image SEO research agent output.

Phases:

1. **Image Formats** — AVIF (~50% smaller than JPEG, 95% browser support), WebP (~30% smaller, 97% support), JPEG XL (ignore until Chrome H2 2026). `<picture>` element with AVIF > WebP > JPEG fallback. AVIF quality 45-60 ≈ WebP 70-80.
2. **LCP & Loading Strategy** — NEVER lazy-load LCP image. `fetchpriority="high"` + `<link rel="preload">` for hero. `loading="lazy"` for below-fold. fetchpriority impact: 27% LCP improvement (Google Flights). Native lazy loading sufficient for most cases.
3. **Alt Text** — Under 125 chars, specific, contextual. Google uses alt text + computer vision + surrounding content. Skip "image of" prefix. Empty alt for decorative. AI alt text as starting point, human review for context. EAA legally requires proper alt text since June 2025.
4. **Responsive Images** — srcset with w descriptors, 4-6 breakpoints (400/768/1024/1920px). sizes attribute for viewport mapping. Too many variants reduce CDN cache hit ratio.
5. **Compression** — JPEG 75-85, WebP 70-80, AVIF 45-60. Hero <200KB, product <150KB, thumbnails <30KB, OG <300KB. SSIM >0.95 as quality floor. Tools: sharp, Squoosh, TinyPNG, CDN auto-optimize.
6. **Visual Search (Google Lens)** — 12B+ searches/month. Clear subject, entity-rich alt text, Product schema, original photos, min 1200px, consistent visual branding.
7. **OG Images** — 1200x630px, <300KB, include og:image:alt (AEO signal). Safe zone 1000x500px centered. Always set og:image:width/height.
8. **Image Sitemaps** — Relevant for JS-loaded, lazy-loaded, or CDN-hosted images. E-commerce and portfolio sites benefit most.

### 3. sitemap-management

Source: Sitemap research agent output.

Phases:

1. **Sitemap Index Files** — 50K URLs or 50MB limit per file. Split by content type (products-sitemap.xml, blog-sitemap.xml), not numbered. Submit only index to GSC.
2. **Specialized Sitemaps** — Image sitemaps (JS-loaded images), video sitemaps (required for video rich results), news sitemaps (48h window, Google News publishers only).
3. **Priority & Changefreq** — Google ignores both entirely. Only `lastmod` matters, and only if consistently accurate. Never fake lastmod dates.
4. **IndexNow** — Supports Bing, Yandex, Naver, Seznam (NOT Google). Near-instant Bing indexing. Complementary to sitemaps. Trivial to implement. 5B+ URLs/day submitted.
5. **Large Site Strategy (100K+)** — 10-25K URLs per file optimal. Curate strictly: exclude faceted URLs, pagination, internal search. Crawl Budget Efficiency = Total Pages / Avg Crawled Per Day (target <3).
6. **JS-Rendered Sites** — Sitemap essential for SPAs. SSR/SSG preferred. Include all routes as clean canonical URLs. Validate with GSC URL Inspection.
7. **Dynamic Generation** — Next.js (app/sitemap.ts + generateSitemaps), WordPress (Rank Math/Yoast), custom (sitemap npm package). Cache with 1h TTL.
8. **GSC Monitoring** — Submitted vs indexed gap, "Last read" timestamp, fetch failures, per-sitemap indexation rates. API automation for large sites.

### 4. hreflang-i18n

Source: Hreflang research agent output.

Phases:

1. **Implementation Methods** — HTML link tags (small sites, <5 variants), HTTP headers (non-HTML content), XML sitemap (large sites, 5+ variants, cross-domain). Pick ONE method, don't mix.
2. **Common Errors** — Missing return tags (#1 error, 65% of international sites), invalid codes (en-UK wrong → en-GB), protocol mismatches (HTTP vs HTTPS), canonical conflicts (canonical wins over hreflang — silent killer), x-default misuse (exactly one per cluster).
3. **Cross-Domain Setup** — Works identically to single-domain. XML sitemaps preferred. Verify all domains in GSC. One x-default across all domains.
4. **Google's Actual Handling** — Hreflang is a hint, not directive. Canonical wins. Google building automatic language detection. 31% of international sites have conflicting directives. Hreflang ≠ geo-targeting.
5. **Content Localization** — Direct translation insufficient. Per-market keyword research required. Localize schema/structured data. Cultural adaptation (dates, currency, imagery). Minimum viable: localized KW research + meta + H1s + schema.
6. **Country Targeting** — Decision tree: ccTLD (max local trust, high cost) vs subdirectory (80% case, inherits DA) vs subdomain (technical separation). Subdirectory is consensus best practice.
7. **Audit Workflow** — Phase 1: crawl + extract (Screaming Frog). Phase 2: validate (10-point checklist). Phase 3: fix by priority (canonical conflicts first). Phase 4: monitor (monthly Semrush/Ahrefs, quarterly full crawl, CI/CD validation).

### 5. competitor-pages

Source: Competitor pages research agent output.

Phases:

1. **URL & Title Patterns** — `/compare/x-vs-y/` subfolder. Title: "X vs Y: [Differentiator] Compared [Year]". H1 matches title. Primary keyword first.
2. **Content Structure** — Hero with quick answer → comparison table → detailed breakdown (pricing, features, ease of use, integrations, support) → social proof → verdict ("Choose X if.../Choose Y if...") → FAQ → CTA. Three page types: One vs One, One vs Many, One vs All.
3. **Schema Markup** — ItemList with Product items, AggregateRating (from real G2/Capterra data), AggregateOffer. Separate FAQPage schema for FAQ section.
4. **Fairness Guidelines** — Acknowledge competitor strengths. Use verifiable data with sources. No FUD. Include "Choose Y if..." section. Date and update regularly. Advertorial tone, not attack-ad. Legal: nominative fair use for trademarks.
5. **Table Design for Featured Snippets** — Use actual `<table>` HTML. 8-15 rows. Concise cell values. Your product in first data column. H2 header before table.
6. **Internal Linking (Hub-and-Spoke)** — /compare/ hub links to all spokes. Cross-link between spokes. Link from pricing/feature pages. Build DA through linkable content → internal link → comparison page.
7. **Programmatic Generation** — Data layer (competitor DB) + template layer + unique editorial per page (200-400 words). Quality gate: every page must provide distinctive value.
8. **Conversion Optimization** — BOFU pages (5-10% conversion achievable). Sticky CTA, CTA after table and verdict. Switcher testimonials. Free trial > "Book demo". Track scroll depth, conversion by competitor page.

### 6. link-building

Source: Extracted from seo-optimization Phase 4. **Inherits ALL content from current seo-optimization Phase 4 (lines 329-472) as baseline** — 5 currencies framework, linkable assets table, reciprocation strategy, prospecting with search operators, broken link building process with email templates, link opportunity qualifiers, outreach email principles with interview request templates. Then enhanced with structure below.

Phases:

1. **5 Currencies of Link Building** — Time, money, community, expertise, information. Each currency maps to specific tactics. Full currency-to-tactic mapping table from current skill.
2. **Linkable Assets** — Data studies, tools/calculators, original research, infographics, templates, definitive guides. Asset must be worth linking to before outreach begins.
3. **Prospecting** — Resource page link building, broken link building, competitor backlink analysis (Ahrefs/Semrush), HARO/Connectively, digital PR. All search operators and qualifiers from current skill.
4. **Outreach** — Email templates (all from current skill), personalization rules, follow-up cadence, response rate benchmarks, interview request templates.
5. **Measurement** — Referring domains growth, DR/DA trends, anchor text distribution, link velocity.

## Modified Skills

### technical-seo (narrowed)

Remove:

- Phase 3: Structured Data → moved to schema-markup
- Phase 5: Internationalization → moved to hreflang-i18n

Keep:

- Phase 1: Performance (Core Web Vitals)
- Phase 2: Crawlability (robots.txt, canonicals, redirects, internal linking)
- Phase 3: Security (HTTPS, headers) — renumbered from Phase 4
- Mobile-first checklist (stays, it's technical not i18n)

Update YAML frontmatter description: remove "structured data (JSON-LD schema)" and "internationalization" references. Update Quick Router table to remove Phase 3 and Phase 5 rows.

### seo-optimization → on-page-seo (renamed + narrowed)

Remove:

- Phase 2: Technical SEO → already in technical-seo
- Phase 4: Link Building → moved to link-building
- Phase 5: GEO → already in ai-ready

Keep + enhance:

- Phase 1: On-Page SEO (8 tablets) — titles, headers, keywords, content. Tablet 6 (Images) narrowed to checklist item "include alt text with primary keyword" — full alt text depth moved to image-seo.
- Phase 2: Entity SEO — Knowledge Graph, entity homes, topical authority, siloing. **Conceptual strategy only** — all JSON-LD code examples and schema templates removed, replaced with cross-reference: "For implementation → see schema-markup skill."
- Phase 3: E-E-A-T Framework — dedicated section (not scattered). Experience, Expertise, Authoritativeness, Trustworthiness checklist. YMYL guidelines.
- 5-line Technical SEO quick-check with cross-reference to technical-seo skill.

Update YAML frontmatter description: remove "Link Building" and "GEO" references.

### ai-ready (enhanced)

Add new section:

- **Schema for AI Visibility** — AI-specific framing only: why schema helps AI, which types AI engines prioritize. **No JSON-LD code examples** — cross-reference schema-markup skill for implementation. Remove existing Phase 4 JSON-LD templates (moved to schema-markup).

Resolve FAQPage contradiction: current ai-ready says FAQPage generates "3.4x more Perplexity citations" but schema-markup lists FAQ as restricted (Aug 2023). Resolution: FAQPage still works for AI citation purposes (Perplexity reads the markup even though Google no longer shows FAQ rich results). Add clarifying note in both skills.

### programmatic-seo (enhanced)

Modify:

- **Playbook 2 (Comparison Pages)** — rewrite to defer content strategy to competitor-pages skill. Keep only programmatic generation/scaling aspects (data layer, template infrastructure, batched indexing, quality gates for 100+ pages). Remove content overlap.
- Remove Playbook 8 (redundant with modified Playbook 2).

## Unchanged Skills

- **keyword-research** — already focused and complete
- **aso-optimization** — already focused and complete

## MCP Server Registry

Add to `~/.claude/mcp-registry.yaml` (not auto-installed, available for per-project activation):

```yaml
seo-ahrefs:
  description: "Ahrefs backlink & keyword data"
  repo: ahrefs/ahrefs-mcp-server
  docs: https://docs.ahrefs.com/mcp/docs/introduction
  requires: Ahrefs subscription ($129+/mo)

seo-semrush:
  description: "Semrush competitive intelligence"
  docs: https://developer.semrush.com/api/introduction/semrush-mcp/
  requires: Semrush subscription ($139+/mo)
  note: "Verify exact MCP endpoint URL from docs before adding"

seo-gsc:
  description: "Google Search Console data"
  repo: AminForou/mcp-gsc
  requires: Google Cloud OAuth credentials (free)

seo-pagespeed:
  description: "PageSpeed Insights / Core Web Vitals"
  repo: enemyrr/mcp-server-pagespeed
  requires: Nothing (free API)

seo-dataforseo:
  description: "SERP tracking, keyword data, backlinks, on-page"
  command: npx -y dataforseo-mcp-server
  requires: DataForSEO account (pay-as-you-go, ~$0.002/request)
```

## Content Ownership Rules

To prevent duplication across skills:

1. **All JSON-LD code examples** live in `schema-markup` only. Other skills cross-reference.
2. **Alt text depth** (length rules, accessibility, EAA, decorative images) lives in `image-seo` only. `on-page-seo` has a one-line checklist item.
3. **FAQPage schema**: deprecated for Google rich results (Aug 2023), but still works for AI citation (Perplexity). Both `schema-markup` and `ai-ready` note this distinction.
4. **Comparison pages content strategy** lives in `competitor-pages`. `programmatic-seo` Playbook 2 covers only scaling/generation infrastructure.

## Implementation Order

1. Create 7 new specialist skills (schema-markup, image-seo, sitemap-management, hreflang-i18n, competitor-pages, link-building, seo-orchestrator)
2. Modify 2 existing skills (technical-seo narrowed, seo-optimization → on-page-seo renamed + narrowed)
3. Enhance 2 existing skills (ai-ready + schema AI section, programmatic-seo + Playbook 2 rewrite)
4. Update plugin.json skill count
5. Update CLAUDE.md skill count
6. Update CC cache + Cowork symlinks

Note: Orchestrator created WITH specialist skills (not before) so it can reference existing skills. Cache updated last as a batch.

## Success Criteria

- All 13 skills have valid YAML frontmatter
- Orchestrator correctly routes all trigger keywords
- No content duplication between skills
- Research data from 6 agents fully integrated
- Total skill count: from 6 SEO → 13 SEO (from 53 total → 60 total)
