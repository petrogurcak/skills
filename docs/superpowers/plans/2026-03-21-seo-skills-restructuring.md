# SEO Skills Restructuring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure 6 monolithic SEO skills into 12 specialist skills + 1 orchestrator for better routing and coverage.

**Architecture:** Each skill owns one SEO discipline. Orchestrator routes by keyword matching. All JSON-LD code lives only in schema-markup. Cross-references between skills replace duplication.

**Spec:** `docs/superpowers/specs/2026-03-21-seo-skills-restructuring-design.md`

**Research data:** Agent research outputs saved at `/private/tmp/claude-501/-Users-petrogurcak-Projects-skills/c41a6e6a-dce7-4ebe-bba9-48cd9bdc442c/tasks/` (6 files: schema, image, hreflang, competitor, sitemap, MCP).

**Content ownership rules:**
- All JSON-LD code examples → `schema-markup` only
- Alt text depth → `image-seo` only
- Comparison page strategy → `competitor-pages` only
- FAQPage: deprecated for Google rich results (Aug 2023), works for AI citation (Perplexity)

---

### Task 1: Create seo-orchestrator

**Files:**
- Create: `plugins/seo/skills/seo-orchestrator/SKILL.md`

- [ ] **Step 1: Create directory**

```bash
mkdir -p plugins/seo/skills/seo-orchestrator
```

- [ ] **Step 2: Write SKILL.md**

Create with YAML frontmatter:
```yaml
name: seo-orchestrator
description: "Routes SEO requests to the correct specialist skill based on intent. Use when user asks for general SEO help, a full audit, or when the specific SEO discipline is unclear. Trigger phrases: 'SEO', 'optimize for search', 'SEO audit', 'search engine optimization'. Routes to 12 specialist skills covering on-page, technical, schema, images, sitemaps, i18n, keywords, links, competitors, programmatic, AI search, and app store optimization."
```

Body structure:
1. Quick Router table mapping trigger keywords → skill names (use routing table from spec)
2. Multi-skill audit mode: when user says "full SEO audit", run skills in order: technical-seo → on-page-seo → schema-markup → image-seo → sitemap-management → link-building
3. Decision tree: "What are you trying to do?" → route to correct skill
4. Skill inventory table: all 12 skills with one-line descriptions
5. "When NOT to use" section pointing to specific skills for direct access

- [ ] **Step 3: Commit**

```bash
git add plugins/seo/skills/seo-orchestrator/SKILL.md
git commit -m "feat(seo): add seo-orchestrator skill for routing"
```

---

### Task 2: Create schema-markup skill

**Files:**
- Create: `plugins/seo/skills/schema-markup/SKILL.md`

- [ ] **Step 1: Create directory**

```bash
mkdir -p plugins/seo/skills/schema-markup
```

- [ ] **Step 2: Write SKILL.md**

Frontmatter:
```yaml
name: schema-markup
description: "Implements and validates structured data (JSON-LD) for rich results and AI visibility. Covers active schema types, deprecated types timeline, video schema (VideoObject, Clip, SeekToAction, BroadcastEvent), @id entity graphs, validation workflow, and common errors. Use when adding structured data, fixing schema errors, implementing video markup, or optimizing for AI search entity understanding. Trigger phrases: 'schema', 'structured data', 'JSON-LD', 'rich results', 'video schema', 'markup validation'. NOT for on-page content optimization (use on-page-seo) or general AI search strategy (use ai-ready)."
```

Content — 6 phases from spec + research data:

**Phase 1: Active Schema Types** — Table of all types Google currently uses for rich results: Product, Article, LocalBusiness, Organization, Person, Event, VideoObject, BreadcrumbList, SoftwareApplication, Review/AggregateRating, JobPosting. Per-type required + recommended properties with JSON-LD examples.

**Phase 2: Deprecated Types** — Full timeline table: HowTo (Aug 2023 mobile, Sep 2023 desktop), FAQ restricted to gov/health (Aug 2023), SpecialAnnouncement (Jan 2026), Course Info (Jan 2026), ClaimReview (Jan 2026), EstimatedSalary (Jan 2026), LearningVideo (Jan 2026), VehicleListing (Jan 2026), PracticeProblem (Jan 2026). Note: no ranking penalty for keeping deprecated markup, but dead weight. Note: FAQPage still works for AI citation (Perplexity reads it) even though Google no longer shows FAQ rich results.

**Phase 3: Video Schema** — VideoObject (required: name, thumbnailUrl, uploadDate; recommended: description, duration, contentUrl, embedUrl). Clip (manual key moments: name, startOffset, endOffset, url). SeekToAction (automatic key moments: target URL template). BroadcastEvent (LIVE badge: isLiveBroadcast, startDate, endDate; requires Indexing API). Decision guide: when to use Clip vs SeekToAction vs both.

**Phase 4: JSON-LD Best Practices** — @id entity graph pattern with URL fragments. sameAs links to authoritative profiles. Single script tags vs @graph block. Nesting rules. ISO 8601 dates. Placement in head/body. Match markup to visible content. One primary entity per page. Don't duplicate entities across pages — use same @id.

**Phase 5: Validation Workflow** — Pre-publish: Rich Results Test. Syntax: schema.org validator. Post-publish: GSC Enhancements. Bulk: Screaming Frog/Sitebulb. Common errors table by category (60% missing required properties with per-type examples, 25% JSON-LD syntax errors, 15% content mismatch). Errors vs warnings distinction.

**Phase 6: Schema for AI Visibility** — LLMs use JSON-LD for entity understanding. GPT-4 accuracy 16% → 54% with structured data. AI Overviews in 13%+ of searches. Schema is now AI visibility requirement. Key stats from SchemaApp/Data World studies. Cross-reference: for AI-specific strategy see ai-ready skill.

Include JSON-LD code examples for: Organization, LocalBusiness, Product, Article, BreadcrumbList, FAQPage, VideoObject+Clip, VideoObject+SeekToAction, BroadcastEvent, @graph with @id references.

- [ ] **Step 3: Commit**

```bash
git add plugins/seo/skills/schema-markup/SKILL.md
git commit -m "feat(seo): add schema-markup skill with video schema and AI visibility"
```

---

### Task 3: Create image-seo skill

**Files:**
- Create: `plugins/seo/skills/image-seo/SKILL.md`

- [ ] **Step 1: Create directory and write SKILL.md**

Frontmatter:
```yaml
name: image-seo
description: "Optimizes images for search engines, Core Web Vitals, and visual search. Covers format selection (AVIF/WebP/JPEG), LCP optimization with fetchpriority, lazy loading rules, alt text best practices, responsive images (srcset/sizes), compression thresholds, Google Lens optimization, and Open Graph images. Use when optimizing image performance, fixing LCP issues caused by images, writing alt text, setting up responsive images, or optimizing for visual search. Trigger phrases: 'image optimization', 'lazy loading', 'WebP', 'AVIF', 'alt text', 'image compression', 'OG image', 'Google Lens'. NOT for general page speed (use technical-seo) or on-page keyword optimization (use on-page-seo)."
```

Content — 8 phases from research:

**Phase 1: Image Formats** — AVIF vs WebP vs JPEG comparison table (compression, browser support, quality settings). `<picture>` element pattern. JPEG XL status (ignore until Chrome H2 2026). Trade-off: AVIF better compression but slower decode on low-powered devices.

**Phase 2: LCP & Loading Strategy** — NEVER lazy-load LCP image. fetchpriority="high" + `<link rel="preload">` for hero. loading="lazy" for below-fold. Data: fetchpriority gives 27% LCP improvement (Google Flights), 4% (Etsy). Table: what to eager-load vs lazy-load.

**Phase 3: Alt Text** — Under 125 chars. Google uses alt + CV + surrounding content. Skip "image of" prefix. Empty alt for decorative. AI alt text tools (AltText.ai, ImgSEO). EAA legal requirement since June 2025. Good vs bad examples.

**Phase 4: Responsive Images** — srcset with w descriptors. 4-6 breakpoints (400/768/1024/1920px). sizes attribute. CDN cache considerations. CDN comparison table (Cloudflare/Cloudinary/Imgix/ImageKit).

**Phase 5: Compression** — Quality settings by format table (JPEG 75-85, WebP 70-80, AVIF 45-60). File size targets (hero <200KB, product <150KB, thumb <30KB, OG <300KB). SSIM >0.95 floor. Tools.

**Phase 6: Visual Search (Google Lens)** — 12B+ monthly searches. Optimization: clear subject, entity-rich alt, Product schema, original photos, min 1200px, consistent branding.

**Phase 7: OG Images** — 1200x630px, <300KB. Platform quirks table. Required meta tags. og:image:alt for AEO. Safe zone.

**Phase 8: Image Sitemaps** — When needed (JS-loaded, lazy-loaded, CDN-hosted). XML format example.

- [ ] **Step 2: Commit**

```bash
git add plugins/seo/skills/image-seo/SKILL.md
git commit -m "feat(seo): add image-seo skill with AVIF/WebP, fetchpriority, Google Lens"
```

---

### Task 4: Create sitemap-management skill

**Files:**
- Create: `plugins/seo/skills/sitemap-management/SKILL.md`

- [ ] **Step 1: Create directory and write SKILL.md**

Frontmatter:
```yaml
name: sitemap-management
description: "Creates, optimizes, and monitors XML sitemaps for efficient crawling and indexing. Covers sitemap index files, image/video/news sitemaps, IndexNow protocol, large site strategy (100K+ pages), JavaScript-rendered content, dynamic generation (Next.js/WordPress), and Google Search Console monitoring. Use when creating sitemaps, fixing indexing issues, implementing IndexNow, or managing crawl budget for large sites. Trigger phrases: 'sitemap', 'XML sitemap', 'IndexNow', 'crawl budget', 'indexing issues'. NOT for robots.txt configuration (use technical-seo) or page-level canonical tags (use technical-seo)."
```

Content — 8 phases from research:

**Phase 1: Sitemap Index Files** — 50K/50MB limits. Split by content type. Submit index only. XML example.

**Phase 2: Specialized Sitemaps** — Image sitemaps (XML example, when needed). Video sitemaps (required tags). News sitemaps (48h window).

**Phase 3: Priority & Changefreq** — Google ignores both. Only lastmod matters. Never fake dates (John Mueller quote).

**Phase 4: IndexNow** — Supports Bing/Yandex/Naver/Seznam (NOT Google). Implementation: API key + POST. WordPress: Rank Math toggle. Complementary to sitemaps.

**Phase 5: Large Site Strategy (100K+)** — 10-25K URLs per file. Exclude faceted URLs/pagination/search. Crawl Budget Efficiency formula (target <3). Curated not dumped.

**Phase 6: JS-Rendered Sites** — Two-pass rendering. SSR/SSG preferred. Sitemap for route discovery. Clean canonical URLs.

**Phase 7: Dynamic Generation** — Next.js (app/sitemap.ts + generateSitemaps code). WordPress (Rank Math/Yoast). Custom (sitemap npm package). 1h TTL cache.

**Phase 8: GSC Monitoring** — Submitted vs indexed gap. Last read timestamp. Fetch failures. Per-sitemap rates. API automation.

- [ ] **Step 2: Commit**

```bash
git add plugins/seo/skills/sitemap-management/SKILL.md
git commit -m "feat(seo): add sitemap-management skill with IndexNow and large site strategy"
```

---

### Task 5: Create hreflang-i18n skill

**Files:**
- Create: `plugins/seo/skills/hreflang-i18n/SKILL.md`

- [ ] **Step 1: Create directory and write SKILL.md**

Frontmatter:
```yaml
name: hreflang-i18n
description: "Implements and audits hreflang tags and international SEO strategy. Covers implementation methods (HTML/HTTP/sitemap), common errors with detection and fixes, cross-domain setups, content localization vs translation, country targeting decision tree (ccTLD/subdirectory/subdomain), and systematic audit workflow. Use when setting up multi-language sites, fixing hreflang errors, choosing international URL structure, or auditing existing i18n implementation. Trigger phrases: 'hreflang', 'international SEO', 'multilingual', 'localization', 'multi-language', 'i18n', 'translation SEO'. NOT for general technical audits (use technical-seo) or on-page content in one language (use on-page-seo)."
```

Content — 7 phases from research:

**Phase 1: Implementation Methods** — Comparison table (HTML link tags / HTTP headers / XML sitemap). When to use which. Pick ONE, don't mix.

**Phase 2: Common Errors** — Missing return tags (#1, 65% of sites). Invalid codes (en-UK wrong → en-GB). Protocol mismatches. Canonical conflicts (silent killer). x-default (exactly one). Self-referencing requirement.

**Phase 3: Cross-Domain** — Same rules as single-domain. XML sitemaps preferred. Verify all domains in GSC. One x-default across all domains.

**Phase 4: Google's Handling** — Hreflang is hint, not directive. Canonical wins. Automatic language detection coming. 31% conflicting directives. Hreflang ≠ geo-targeting.

**Phase 5: Content Localization** — Translation insufficient. Per-market keyword research. Localize schema. Cultural adaptation. Minimum viable localization checklist.

**Phase 6: Country Targeting** — Decision tree: ccTLD (strongest signal, highest cost) vs subdirectory (80% case, inherits DA) vs subdomain (technical separation). Subdirectory consensus best practice.

**Phase 7: Audit Workflow** — Phase 1: crawl + extract (Screaming Frog). Phase 2: validate (10-point checklist). Phase 3: fix by priority (canonical conflicts → non-200 → missing returns → missing self-ref → invalid codes). Phase 4: monitor (monthly automated, quarterly full, CI/CD validation). Tools table.

- [ ] **Step 2: Commit**

```bash
git add plugins/seo/skills/hreflang-i18n/SKILL.md
git commit -m "feat(seo): add hreflang-i18n skill with audit workflow and country targeting"
```

---

### Task 6: Create competitor-pages skill

**Files:**
- Create: `plugins/seo/skills/competitor-pages/SKILL.md`

- [ ] **Step 1: Create directory and write SKILL.md**

Frontmatter:
```yaml
name: competitor-pages
description: "Creates high-converting X vs Y competitor comparison pages and alternative pages for SEO. Covers URL/title patterns, content structure, schema markup (Product + ItemList + FAQPage), fairness guidelines, table design for featured snippets, hub-and-spoke internal linking, programmatic generation at scale, and conversion optimization. Use when creating comparison landing pages, building 'alternatives to X' pages, or scaling competitor content programmatically. Trigger phrases: 'X vs Y', 'competitor comparison', 'comparison page', 'alternatives page', 'versus page'. NOT for general content optimization (use on-page-seo) or full programmatic SEO infrastructure (use programmatic-seo)."
```

Content — 8 phases from research:

**Phase 1: URL & Title Patterns** — /compare/x-vs-y/ subfolder. Title formula. H1 matches. Year for freshness.

**Phase 2: Content Structure** — Full page anatomy: hero → quick answer → comparison table → detailed breakdown → social proof → verdict → FAQ → CTA. Three page types: One vs One, One vs Many, One vs All.

**Phase 3: Schema Markup** — ItemList + Product + AggregateRating JSON-LD example. FAQPage for FAQ section. Note: ratings must reflect real user reviews (G2/Capterra).

**Phase 4: Fairness Guidelines** — Acknowledge strengths. Verifiable data. No FUD. "Choose Y if..." section. Date/update. Advertorial tone. Legal: nominative fair use.

**Phase 5: Table Design** — Use `<table>` HTML (not CSS grids). 8-15 rows. Concise cells. Your product first column. H2 before table. HTML code example.

**Phase 6: Internal Linking** — Hub (/compare/) links all spokes. Cross-link between spokes. Link from pricing/feature pages. Key insight: build DA via linkable content → internal link → comparison page.

**Phase 7: Programmatic Generation** — Data layer (competitor DB schema). Template + unique editorial (200-400 words). Quality gate. Cross-reference: for full pSEO infrastructure see programmatic-seo.

**Phase 8: Conversion Optimization** — BOFU pages (5-10% conversion). Sticky CTA. CTA after table/verdict. Switcher testimonials. Free trial > demo. Tracking: scroll depth, conversion by competitor. ROI math example.

- [ ] **Step 2: Commit**

```bash
git add plugins/seo/skills/competitor-pages/SKILL.md
git commit -m "feat(seo): add competitor-pages skill with X vs Y playbook"
```

---

### Task 7: Create link-building skill

**Files:**
- Create: `plugins/seo/skills/link-building/SKILL.md`
- Source: `plugins/seo/skills/seo-optimization/SKILL.md` lines 329-472

- [ ] **Step 1: Create directory**

```bash
mkdir -p plugins/seo/skills/link-building
```

- [ ] **Step 2: Write SKILL.md**

Frontmatter:
```yaml
name: link-building
description: "Builds website authority through strategic link acquisition. Covers the 5 currencies framework, linkable asset creation, prospecting with search operators, broken link building with email templates, link opportunity qualifiers, outreach email principles, and measurement. Use when building backlink profile, creating linkable assets, doing outreach campaigns, or analyzing competitor backlinks. Trigger phrases: 'link building', 'backlinks', 'outreach', 'domain authority', 'linkable assets', 'broken link building'. NOT for internal linking strategy (use on-page-seo) or on-page optimization (use on-page-seo)."
```

Content: **Copy ALL content from seo-optimization Phase 4 (lines 329-472) as the complete body.** This includes:
- Core Philosophy: Value Exchange
- Five Currencies table
- Linkable Assets table
- Preciprocation Strategy
- Prospecting Techniques with search operators
- Broken Link Building process with email template
- Link Opportunity Qualifiers (automated + manual checklists)
- Outreach Email Principles
- Interview Request Template
- Add Phase 5: Measurement section (referring domains growth, DR/DA trends, anchor text distribution, link velocity)

- [ ] **Step 3: Commit**

```bash
git add plugins/seo/skills/link-building/SKILL.md
git commit -m "feat(seo): add link-building skill extracted from seo-optimization"
```

---

### Task 8: Rename seo-optimization → on-page-seo (narrow scope)

**Files:**
- Delete: `plugins/seo/skills/seo-optimization/SKILL.md`
- Create: `plugins/seo/skills/on-page-seo/SKILL.md`

- [ ] **Step 1: Create new directory**

```bash
mkdir -p plugins/seo/skills/on-page-seo
```

- [ ] **Step 2: Write on-page-seo SKILL.md**

Frontmatter (updated — remove link building, GEO, technical references):
```yaml
name: on-page-seo
description: "Optimizes individual web pages for search rankings through content and entity strategy. Covers the 8 On-Page Tablets (URL, titles, headers, keywords, LSI, images, outbound links, internal linking), Entity SEO (Knowledge Graph, entity homes, topical authority, siloing), and E-E-A-T framework. Use when optimizing page content for specific keywords, building entity authority, or auditing on-page SEO elements. Trigger phrases: 'on-page SEO', 'title tag', 'meta description', 'H1', 'keyword density', 'content optimization', 'E-E-A-T', 'entity SEO'. NOT for technical issues (use technical-seo), link building (use link-building), AI search (use ai-ready), or structured data implementation (use schema-markup)."
```

Content structure — keep from seo-optimization:
- **Four Pillars framework** (lines 43-53)
- **Phase 1: On-Page SEO (8 Tablets)** (lines 56-159) — keep all 8 tablets. Narrow Tablet 6 (Images) to: "Include alt text with primary keyword. For full image optimization → see `image-seo` skill."
- **Phase 2: Entity SEO** (lines 198-326 renumbered) — keep Knowledge Graph, Entity Home, Trusted Seeds, Digital Assets, Internal Link Graph (siloing), SEU Metric. **Remove all JSON-LD code examples** (lines 257-279), replace with: "For JSON-LD implementation → see `schema-markup` skill." Keep the schema-types-by-page table as a reference (what schema goes where) but note it's implemented via schema-markup.
- **Phase 3: E-E-A-T Framework** (lines 575-638) — dedicated section, not scattered. Keep all content.
- **Technical SEO Quick-Check** — 5-line checklist: LCP <2.5s, robots.txt valid, sitemap submitted, canonical tags, HTTPS. "For full technical audit → see `technical-seo` skill."
- **Checklists** — keep Pre-Launch, On-Page, Entity SEO checklists. Remove Link Building and GEO checklists (they belong to their respective skills). Remove Monitoring checklist (generic).
- **Metrics** — keep Traditional SEO metrics table. Remove GEO/AI metrics (belong to ai-ready).
- **Common Mistakes** — keep items 1,2,4,5,7,9,10. Remove 3 (link buying → link-building), 8 (AI search → ai-ready).

Remove entirely: Phase 2 Technical SEO, Phase 4 Link Building, Phase 5 GEO, Link Building checklist, GEO checklist, GEO metrics.

- [ ] **Step 3: Delete old seo-optimization directory**

```bash
rm -rf plugins/seo/skills/seo-optimization
```

- [ ] **Step 4: Commit**

```bash
git add plugins/seo/skills/on-page-seo/SKILL.md
git add -u plugins/seo/skills/seo-optimization/
git commit -m "refactor(seo): rename seo-optimization to on-page-seo, narrow scope"
```

---

### Task 9: Narrow technical-seo (remove structured data + i18n)

**Files:**
- Modify: `plugins/seo/skills/technical-seo/SKILL.md`

- [ ] **Step 1: Update frontmatter description**

Remove "structured data (JSON-LD schema)" and "internationalization" from description. New description:
```yaml
description: "Audits and sets up technical SEO foundations covering Core Web Vitals (LCP, INP, CLS), crawlability (robots.txt, sitemaps, canonicals), and security headers, with automated audits via claude-in-chrome. Use when auditing for technical SEO issues, setting up technical foundation, fixing Core Web Vitals, or debugging crawlability issues. Trigger phrases: 'technical SEO audit', 'Core Web Vitals', 'robots.txt', 'page speed', 'crawlability', 'security headers'. NOT for structured data (use schema-markup), international/hreflang (use hreflang-i18n), on-page content (use on-page-seo), or keyword research (use keyword-research)."
```

- [ ] **Step 2: Update Quick Router**

Remove rows for Phase 3 (schema/structured data → point to schema-markup) and Phase 5 (mobile/hreflang → split: mobile stays, hreflang → hreflang-i18n). Updated table:

| User says... | Go to... |
|---|---|
| "audit webu", "technické SEO check" | Full Audit (all phases) |
| "core web vitals", "rychlost webu", "PageSpeed" | Phase 1: Performance |
| "robots.txt", "sitemap", "crawl" | Phase 2: Crawlability |
| "HTTPS", "security headers" | Phase 3: Security |
| "mobile", "viewport", "responsive" | Phase 3: Security (mobile checklist) |
| "schema", "structured data" | → Use `schema-markup` skill |
| "hreflang", "international" | → Use `hreflang-i18n` skill |

- [ ] **Step 3: Remove Phase 3 (Structured Data)**

Delete lines 155-287 (Phase 3: Structured Data — all schema types, JSON-LD templates, audit checklist, automated section). Replace with:

```markdown
## Structured Data

→ Moved to dedicated `schema-markup` skill. See that skill for JSON-LD implementation, validation, video schema, and AI visibility.
```

- [ ] **Step 4: Remove i18n from Phase 5**

Keep mobile-first checklist and viewport from Phase 5 (lines 337-351). Remove hreflang section (lines 353-379). Rename Phase 5 to "Phase 4: Mobile" (renumber since Phase 3 was removed → now Phase 1: Performance, Phase 2: Crawlability, Phase 3: Security, Phase 4: Mobile). Add cross-reference:

```markdown
### Internationalization (hreflang)

→ Moved to dedicated `hreflang-i18n` skill. See that skill for hreflang implementation, validation, and country targeting.
```

- [ ] **Step 5: Update Full Audit Checklist**

Remove "STRUCTURED DATA" and "MOBILE & I18N" sections. Keep Performance, Crawlability, Security. Add Mobile checklist items. Add cross-references to schema-markup and hreflang-i18n.

- [ ] **Step 6: Update Integration section**

Update the integration diagram and table to reference new skill names (on-page-seo instead of seo-optimization, schema-markup, hreflang-i18n).

- [ ] **Step 7: Commit**

```bash
git add plugins/seo/skills/technical-seo/SKILL.md
git commit -m "refactor(seo): narrow technical-seo, move structured data and i18n to dedicated skills"
```

---

### Task 10: Enhance ai-ready (add schema AI section, fix FAQPage)

**Files:**
- Modify: `plugins/seo/skills/ai-ready/SKILL.md`

- [ ] **Step 1: Update Phase 4 (Structured Data for AI)**

Remove all JSON-LD code examples from Phase 4 (lines 285-368). Replace with AI-specific framing:
- Why schema helps AI engines (GPT-4 accuracy 16% → 54%)
- Which types AI engines prioritize (SoftwareApplication, FAQPage, Organization, HowTo)
- Cross-reference: "For JSON-LD implementation → see `schema-markup` skill"
- Keep the priority ordering and rationale text

- [ ] **Step 2: Fix FAQPage contradiction**

Update the context line (line 30) and Phase 4 FAQPage section. Add clarifying note:

```markdown
**Note:** Google restricted FAQPage rich results to government/health sites in August 2023. However, AI engines (Perplexity, ChatGPT) still read and cite FAQPage markup — the 3.4x citation boost is for AI search, not Google rich results. Implement FAQPage for AI visibility even though it no longer generates Google rich snippets. See `schema-markup` for implementation details.
```

- [ ] **Step 3: Update "When NOT to use" section**

Change references from `seo-optimization` to `on-page-seo`.

- [ ] **Step 4: Commit**

```bash
git add plugins/seo/skills/ai-ready/SKILL.md
git commit -m "refactor(seo): update ai-ready with schema cross-references, fix FAQPage note"
```

---

### Task 11: Enhance programmatic-seo (rewrite Playbook 2)

**Files:**
- Modify: `plugins/seo/skills/programmatic-seo/SKILL.md`

- [ ] **Step 1: Rewrite Playbook 2 (Comparison Pages)**

Replace current Playbook 2 content (lines 96-101) with:

```markdown
### 2. Comparison / Alternative Pages

**Pattern:** "[Product A] vs [Product B]" or "[Product] alternatives"
**Example:** G2 -- 6M+ monthly organic, covers every B2B software category

**For content strategy, schema markup, fairness guidelines, and conversion optimization → see `competitor-pages` skill.**

This playbook covers the **programmatic scaling aspects** only:
- **Data layer:** Competitor database with features, pricing, ratings, screenshots
- **Template infrastructure:** Shared template with dynamic feature matrix, conditional blocks
- **Unique editorial:** 200-400 words of unique per-page content (switching stories, use-case scenarios)
- **Quality gate:** Every page must provide distinctive value. Pull unique G2/Capterra quotes per competitor.
- **Scaling limits:** Warning at 50+ pages, manual QA sample at each batch
```

- [ ] **Step 2: Update "When NOT to use" and Related Skills**

Change `seo-optimization` references to `on-page-seo`. Add `competitor-pages` to Related Skills section.

- [ ] **Step 3: Commit**

```bash
git add plugins/seo/skills/programmatic-seo/SKILL.md
git commit -m "refactor(seo): update programmatic-seo Playbook 2 to reference competitor-pages"
```

---

### Task 12: Update plugin.json and CLAUDE.md

**Files:**
- Modify: `plugins/seo/.claude-plugin/plugin.json`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update plugin.json description**

```json
{
  "name": "seo",
  "version": "2.0.0",
  "description": "SEO skills - 13 specialist skills covering on-page, technical, schema, images, sitemaps, i18n, keywords, links, competitors, programmatic, AI search, app store optimization, with orchestrator routing",
  "author": {"name": "Petr"},
  "keywords": ["seo", "keywords", "technical-seo", "aso", "schema", "hreflang", "image-seo", "link-building"],
  "skills": "./skills/"
}
```

- [ ] **Step 2: Update CLAUDE.md plugin table**

Update the SEO plugin row in the plugins table:

| Plugin | Skills | Popis |
|--------|--------|-------|
| **seo** | 13 | Orchestrator, on-page, technical, schema, images, sitemaps, i18n, keywords, links, competitors, programmatic, AI-ready, ASO |

Update total skills count: from 53 → 60.

- [ ] **Step 3: Commit**

```bash
git add plugins/seo/.claude-plugin/plugin.json CLAUDE.md
git commit -m "docs(seo): update plugin.json and CLAUDE.md for 13 SEO skills"
```

---

### Task 13: Update CC cache and verify

**Files:**
- No source files modified

- [ ] **Step 1: Update Claude Code cache**

```bash
cd ~/.claude/plugins/marketplaces/skills && git pull
cp -r plugins/seo/. ~/.claude/plugins/cache/skills/seo/1.0.0/
```

- [ ] **Step 2: Verify all 13 skills have valid YAML frontmatter**

```bash
for skill in seo-orchestrator on-page-seo technical-seo schema-markup image-seo sitemap-management hreflang-i18n keyword-research link-building competitor-pages programmatic-seo ai-ready aso-optimization; do
  echo "=== $skill ==="
  head -5 plugins/seo/skills/$skill/SKILL.md
done
```

- [ ] **Step 3: Verify no content duplication**

Check that JSON-LD code examples only appear in schema-markup:
```bash
grep -r "@context.*schema.org" plugins/seo/skills/*/SKILL.md | grep -v schema-markup
```
Should return empty (only cross-references, no code examples in other skills).

- [ ] **Step 4: Commit any fixes**

```bash
git add -A && git commit -m "chore(seo): verify and fix SEO skills restructuring"
```
