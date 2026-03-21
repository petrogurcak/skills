---
name: seo-orchestrator
description: "Routes SEO requests to the correct specialist skill based on intent. Use when user asks for general SEO help, a full audit, or when the specific SEO discipline is unclear. Trigger phrases: 'SEO', 'optimize for search', 'SEO audit', 'search engine optimization'. Routes to 12 specialist skills covering on-page, technical, schema, images, sitemaps, i18n, keywords, links, competitors, programmatic, AI search, and app store optimization."
---

# SEO Orchestrator

Entry point for all SEO work. Identifies the right specialist skill based on what the user is trying to do.

## When NOT to Use

If you already know which discipline you need, call the specialist skill directly:

- `/seo:on-page-seo` — title tags, H1, keyword density, E-E-A-T, entity SEO
- `/seo:technical-seo` — Core Web Vitals, crawlability, robots.txt, security headers
- `/seo:schema-markup` — JSON-LD, rich results, video schema, validation
- `/seo:image-seo` — AVIF/WebP, LCP images, alt text, Google Lens
- `/seo:sitemap-management` — XML sitemaps, IndexNow, crawl budget
- `/seo:hreflang-i18n` — international SEO, hreflang tags, country targeting
- `/seo:keyword-research` — search volume, keyword difficulty, intent mapping
- `/seo:link-building` — backlinks, outreach, linkable assets
- `/seo:competitor-pages` — X vs Y pages, alternatives pages
- `/seo:programmatic-seo` — database-driven pages, pSEO infrastructure
- `/seo:ai-ready` — llms.txt, AI crawlers, GEO, AI Overviews
- `/seo:aso-optimization` — App Store, Google Play, keyword optimization

---

## Quick Router

Match the user's words to the right skill:

| Trigger keywords | Skill |
|---|---|
| "on-page", "title tag", "meta description", "H1", "keyword density", "E-E-A-T", "content optimization", "entity SEO" | `on-page-seo` |
| "technical", "core web vitals", "performance", "crawl", "robots.txt", "page speed", "security headers", "canonical" | `technical-seo` |
| "schema", "structured data", "JSON-LD", "rich results", "video schema", "markup validation" | `schema-markup` |
| "image", "lazy loading", "WebP", "AVIF", "alt text", "compression", "Google Lens", "OG image" | `image-seo` |
| "sitemap", "IndexNow", "crawl budget", "indexing issues", "XML sitemap" | `sitemap-management` |
| "hreflang", "international", "i18n", "multilingual", "localization", "multi-language", "country targeting" | `hreflang-i18n` |
| "keyword", "search volume", "keyword difficulty", "intent", "keyword gap" | `keyword-research` |
| "link building", "backlinks", "outreach", "domain authority", "linkable assets" | `link-building` |
| "competitor", "vs", "comparison", "alternative", "X vs Y" | `competitor-pages` |
| "programmatic", "pSEO", "database pages", "at scale" | `programmatic-seo` |
| "AI search", "llms.txt", "AI crawlers", "GEO", "AI Overviews", "ChatGPT traffic" | `ai-ready` |
| "app store", "ASO", "Play Store", "App Store", "mobile app ranking" | `aso-optimization` |

If the request matches multiple skills, ask the user which aspect they want to tackle first, or use Full Audit Mode.

---

## Full Audit Mode

When the user says "full SEO audit", "complete SEO review", or "audit my site", run skills in this order:

1. `technical-seo` — Foundation first. Fix crawlability and Core Web Vitals before anything else.
2. `on-page-seo` — Content and entity optimization per page.
3. `schema-markup` — Structured data implementation and validation.
4. `image-seo` — Image formats, loading strategy, alt text.
5. `sitemap-management` — Sitemap health, IndexNow, crawl budget.
6. `link-building` — Authority gaps and outreach opportunities.

Present findings from each skill before moving to the next. Summarize critical issues (P0) separately at the end.

---

## Skill Inventory

| Skill | Discipline | One-line description |
|---|---|---|
| `on-page-seo` | On-page | Optimizes title tags, H1, keyword usage, E-E-A-T, and entity authority per page |
| `technical-seo` | Technical | Audits Core Web Vitals, crawlability, robots.txt, canonicals, and security headers |
| `schema-markup` | Structured data | Implements JSON-LD for rich results, video schema, and AI entity understanding |
| `image-seo` | Images | Selects formats (AVIF/WebP), optimizes LCP images, alt text, and visual search |
| `sitemap-management` | Indexing | Creates and monitors XML sitemaps, implements IndexNow, manages crawl budget |
| `hreflang-i18n` | International | Sets up hreflang tags, audits i18n errors, guides country targeting strategy |
| `keyword-research` | Keywords | Finds keywords by search volume, difficulty, and intent for content planning |
| `link-building` | Authority | Builds backlinks through linkable assets, broken link building, and outreach |
| `competitor-pages` | Competitor content | Creates X vs Y and alternatives pages with conversion optimization |
| `programmatic-seo` | Scale | Builds database-driven page templates for high-volume keyword coverage |
| `ai-ready` | AI search | Optimizes for AI Overviews, llms.txt, GEO, and AI crawler accessibility |
| `aso-optimization` | App stores | Optimizes App Store and Google Play listings for keyword ranking and conversion |
