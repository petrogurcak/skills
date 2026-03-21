---
name: schema-markup
description: "Implements and validates structured data (JSON-LD) for rich results and AI visibility. Covers active schema types, deprecated types timeline, video schema (VideoObject, Clip, SeekToAction, BroadcastEvent), @id entity graphs, validation workflow, and common errors. Use when adding structured data, fixing schema errors, implementing video markup, or optimizing for AI search entity understanding. Trigger phrases: 'schema', 'structured data', 'JSON-LD', 'rich results', 'video schema', 'markup validation'. NOT for on-page content optimization (use on-page-seo) or general AI search strategy (use ai-ready)."
---

# Schema Markup

This skill owns all JSON-LD code patterns. Other SEO skills (ai-ready, on-page-seo, technical-seo) cross-reference here for structured data implementation.

## Phase 1: Active Schema Types

### What Google Actually Renders as Rich Results (2026)

| Schema Type | Rich Result | Required Properties |
|---|---|---|
| **Product** | Price, availability, reviews | `offers` OR `review` OR `aggregateRating` (at least one) |
| **Review / AggregateRating** | Star ratings | `ratingValue`, `reviewCount` |
| **Recipe** | Recipe cards | `name`, `image`, `author`, `datePublished`, `description` |
| **Article / NewsArticle** | Top Stories | `datePublished`, `author`, `image` |
| **LocalBusiness** | Knowledge panel, maps | `name`, `address`, `telephone` |
| **Organization** | Knowledge panel, logo | `name`, `url`, `logo` |
| **Person** | Knowledge panel, author | `name` |
| **Event** | Event listings | `name`, `startDate`, `location` |
| **JobPosting** | Google for Jobs | `title`, `datePosted`, `hiringOrganization`, `jobLocation` |
| **BreadcrumbList** | Breadcrumb trail | `item` list with `name` and `id` |
| **VideoObject** | Video carousel, key moments | `name`, `thumbnailUrl`, `uploadDate` |
| **SoftwareApplication** | App info | `name`, `offers`, `operatingSystem` |
| **FAQ** | Q&A expansion | `mainEntity` with `Question`/`Answer` — **gov/health only** |
| **Certification** | Energy/product certs | Replaced `EnergyConsumptionDetails` (April 2025) |

**Note:** FAQ still works for AI citation even though rich results are restricted. Keep it if you have it — just don't expect visual SERP enhancement unless you're a government or health authority.

### JSON-LD Examples

#### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://example.com/#organization",
  "name": "Acme Corp",
  "url": "https://example.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://example.com/logo.png",
    "width": 200,
    "height": 60
  },
  "sameAs": [
    "https://linkedin.com/company/acme-corp",
    "https://twitter.com/acmecorp",
    "https://www.wikidata.org/wiki/Q12345"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-555-0100",
    "contactType": "customer service"
  }
}
```

#### LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://example.com/#localbusiness",
  "name": "Acme Praha",
  "url": "https://example.com",
  "telephone": "+420-123-456-789",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Wenceslas Square 1",
    "addressLocality": "Prague",
    "postalCode": "110 00",
    "addressCountry": "CZ"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 50.0809,
    "longitude": 14.4274
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

#### Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Widget Pro",
  "description": "Professional-grade widget for enterprise use.",
  "image": "https://example.com/widget-pro.jpg",
  "brand": {
    "@type": "Brand",
    "name": "Acme"
  },
  "sku": "WIDGET-PRO-001",
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/widget-pro",
    "priceCurrency": "USD",
    "price": "49.99",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-12-31"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.6",
    "reviewCount": "89"
  }
}
```

#### Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://example.com/blog/post-1#article",
  "headline": "How to Configure Nginx",
  "datePublished": "2026-03-15",
  "dateModified": "2026-03-21",
  "author": {
    "@type": "Person",
    "@id": "https://example.com/#person-petr",
    "name": "Petr",
    "url": "https://example.com/about"
  },
  "publisher": {
    "@id": "https://example.com/#organization"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://example.com/blog/post-1.jpg",
    "width": 1200,
    "height": 630
  }
}
```

#### BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://example.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://example.com/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "How to Configure Nginx",
      "item": "https://example.com/blog/post-1"
    }
  ]
}
```

---

## Phase 2: Deprecated Types — Full Timeline

| Schema Type | When Deprecated | Status |
|---|---|---|
| **HowTo** | Aug 2023 (mobile), Sep 2023 (desktop) | Fully removed. No rich results on any device. |
| **FAQ** | Aug 2023 | Restricted to government/health only. All others: ignored for rich results. |
| **SpecialAnnouncement** | Jan 2026 | Removed. Was COVID-era markup. GSC support ended. |
| **Course Info** | Jan 2026 | Rich results removed. Markup dead. |
| **ClaimReview** | Jan 2026 | Fact-check labels removed from SERP. |
| **EstimatedSalary** | Jan 2026 | Salary range cards removed from search. |
| **LearningVideo** | Jan 2026 | Educational video enhancements removed. |
| **VehicleListing** | Jan 2026 | Vehicle cards removed. |
| **PracticeProblem** | Jan 2026 | Educational practice problem rich results removed. |
| **Dataset** | 2025 | No longer serves general Search — only Google Dataset Search. |
| **Book Actions** | Reversed | Google removed the deprecation banner. Still works. |

**Why Google removed them:** "Not commonly used in Search" and "no longer providing significant additional value for users." The removal is visual/functional only — no ranking penalty for keeping deprecated markup. But it is dead weight. Remove it.

**Exception — FAQPage for AI:** Keep `FAQPage` markup even if you're not gov/health. AI systems (ChatGPT, Perplexity, Google AI Overviews) still read it for citation and Q&A grounding. Just don't expect a visual SERP enhancement.

---

## Phase 3: Video Schema

### Decision Guide

| Use case | Schema to use |
|---|---|
| Any video on your site | `VideoObject` (always) |
| Structured tutorial with defined chapters | `VideoObject` + `Clip` |
| Long-form content, talks, replays | `VideoObject` + `SeekToAction` |
| Maximum key moments coverage | `VideoObject` + both `Clip` AND `SeekToAction` |
| Active livestream | `VideoObject` + `BroadcastEvent` + Indexing API |

### VideoObject — Base Type

Required (without these, no video rich results):

- `name` — video title
- `thumbnailUrl` — minimum 112x112px, high-res preferred
- `uploadDate` — ISO 8601 format

Recommended (significantly improve visibility):

- `description` — video summary
- `duration` — ISO 8601 duration (e.g., `PT1M33S`)
- `contentUrl` — direct URL to video file (.mp4, .webm, etc.)
- `embedUrl` — URL to embeddable player

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "How to Configure Nginx Reverse Proxy",
  "description": "Step-by-step tutorial for setting up Nginx as a reverse proxy to Node.js applications.",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "uploadDate": "2026-03-15",
  "duration": "PT12M30S",
  "contentUrl": "https://example.com/video.mp4",
  "embedUrl": "https://example.com/embed/video"
}
```

### Clip — Manual Key Moments

Clip lets you manually define timestamps/segments. Google displays these as "key moments" that users can jump to directly from search results. Best for structured tutorials, courses, presentations where you control the chapter points.

Required Clip properties: `name`, `startOffset`, `endOffset`, `url` (with timestamp parameter).

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Nginx Tutorial",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "uploadDate": "2026-03-15",
  "hasPart": [
    {
      "@type": "Clip",
      "name": "Installing Nginx",
      "startOffset": 30,
      "endOffset": 120,
      "url": "https://example.com/video?t=30"
    },
    {
      "@type": "Clip",
      "name": "Configuring Reverse Proxy",
      "startOffset": 120,
      "endOffset": 300,
      "url": "https://example.com/video?t=120"
    },
    {
      "@type": "Clip",
      "name": "Testing the Setup",
      "startOffset": 300,
      "endOffset": 540,
      "url": "https://example.com/video?t=300"
    }
  ]
}
```

### SeekToAction — Automatic Key Moments

SeekToAction tells Google how your URL structure handles timestamps, so Google can automatically generate key moments without you manually defining each one. Best for long-form content, livestream replays, talks where you want Google to handle detection.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Nginx Tutorial",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "uploadDate": "2026-03-15",
  "potentialAction": {
    "@type": "SeekToAction",
    "target": "https://example.com/video?t={seek_to_time_offset}",
    "startOffset-input": "required name=seek_to_time_offset"
  }
}
```

### BroadcastEvent — Livestream LIVE Badge

BroadcastEvent adds a red LIVE badge to your video in search results during a livestream. Requires the Indexing API to notify Google when the stream starts/ends — without the API ping, the LIVE badge will not appear in time.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Product Launch Livestream",
  "thumbnailUrl": "https://example.com/live-thumb.jpg",
  "uploadDate": "2026-03-21",
  "description": "Live launch of Widget Pro 2.0",
  "publication": {
    "@type": "BroadcastEvent",
    "isLiveBroadcast": true,
    "startDate": "2026-03-21T18:00:00+01:00",
    "endDate": "2026-03-21T20:00:00+01:00"
  }
}
```

### VideoObject + Clip + SeekToAction Combined (Maximum Coverage)

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Nginx Tutorial",
  "thumbnailUrl": "https://example.com/thumb.jpg",
  "uploadDate": "2026-03-15",
  "duration": "PT12M30S",
  "contentUrl": "https://example.com/video.mp4",
  "embedUrl": "https://example.com/embed/video",
  "hasPart": [
    {
      "@type": "Clip",
      "name": "Installing Nginx",
      "startOffset": 30,
      "endOffset": 120,
      "url": "https://example.com/video?t=30"
    }
  ],
  "potentialAction": {
    "@type": "SeekToAction",
    "target": "https://example.com/video?t={seek_to_time_offset}",
    "startOffset-input": "required name=seek_to_time_offset"
  }
}
```

---

## Phase 4: JSON-LD Best Practices

### Format Choice

Google explicitly recommends JSON-LD over Microdata and RDFa. As of May 2025, JSON-LD is also confirmed as the preferred format for AI engine consumption — Google, Bing, and ChatGPT all parse it.

### Single Block vs @graph

**Option A: Multiple `<script>` tags** — simpler, modular, works fine

```html
<script type="application/ld+json">{ "@context": "https://schema.org", "@type": "Article", ... }</script>
<script type="application/ld+json">{ "@context": "https://schema.org", "@type": "Organization", ... }</script>
```

**Option B: Single @graph block** — builds an entity graph, more sophisticated, better for AI systems

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://example.com/blog/post-1#article",
      "headline": "How to Configure Nginx",
      "datePublished": "2026-03-15",
      "author": { "@id": "https://example.com/#person-petr" },
      "publisher": { "@id": "https://example.com/#organization" }
    },
    {
      "@type": "Person",
      "@id": "https://example.com/#person-petr",
      "name": "Petr",
      "url": "https://example.com/about",
      "sameAs": [
        "https://linkedin.com/in/petrogurcak",
        "https://twitter.com/petrogurcak"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Acme Corp",
      "url": "https://example.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      },
      "sameAs": [
        "https://linkedin.com/company/acme-corp",
        "https://www.wikidata.org/wiki/Q12345"
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://example.com/blog" },
        { "@type": "ListItem", "position": 3, "name": "How to Configure Nginx", "item": "https://example.com/blog/post-1" }
      ]
    }
  ]
}
```

### The @id Entity Graph Pattern

This is the 2026 best practice. Define each entity once with a stable `@id`, then reference it everywhere.

- Use URL fragments as IDs: `https://example.com/#organization`, `https://example.com/post-1#article`
- `@id` references must resolve — if Article references `"author": {"@id": "..."}`, that Person entity must exist somewhere in your markup
- `sameAs` links to authoritative profiles (LinkedIn, Wikidata, Crunchbase) strengthen entity disambiguation for both Google and LLMs

### Key Rules

1. **One primary entity per page.** Article page = `Article` as primary. Don't declare it as `Product` unless it genuinely is one.
2. **Nest related entities correctly.** `PostalAddress` inside `LocalBusiness`. `Offer` inside `Product`. Don't flatten these to root level.
3. **Match markup to visible content.** Google penalizes/ignores markup that claims things not visible on the page.
4. **ISO 8601 for all dates.** Use `"2026-03-21"` or `"2026-03-21T18:00:00+01:00"`. Never `"March 21, 2026"`.
5. **Place in `<head>` or end of `<body>`.** Either works. `<head>` is conventional.
6. **Avoid client-side-only injection.** If JSON-LD is rendered by JavaScript only, verify Google can see it with the URL Inspection tool in GSC. Server-side is safer.
7. **Don't duplicate entities.** If Organization appears on every page, use the same `@id` everywhere — competing definitions confuse entity resolution.
8. **`description` under ~300 chars.** Longer descriptions trigger GSC warnings.

---

## Phase 5: Validation Workflow

### Pre-Publish

1. **Rich Results Test** — `developers.google.com/search/docs/appearance/structured-data` — validates eligibility for rich results, renders JavaScript, shows detected entities
2. **Schema.org Markup Validator** — `validator.schema.org` — syntax validation against schema.org spec, does not check Google-specific rich result requirements

Run both. Rich Results Test catches Google-specific issues. Schema.org validator catches type and property name errors.

### Post-Publish

3. **Google Search Console > Enhancements** — shows errors and warnings per schema type after Googlebot crawls. Takes 1–7 days to populate.
4. **GSC URL Inspection** — test a specific URL after publishing to see what Googlebot sees, including rendered JSON-LD.

### Bulk Audit

5. **Screaming Frog** (structured data tab) — site-wide validation, exportable
6. **Sitebulb** — similar, with visual graphs of schema coverage
7. **TestSprite** — monitors schema changes over time

### Common Errors Table

| Category | % of Errors | Most Common | Fix |
|---|---|---|---|
| Missing required properties | ~60% | `Product` missing `offers`; `VideoObject` missing `thumbnailUrl`; `Article` missing `image` or `author` | Add the required field per type |
| JSON-LD syntax errors | ~25% | Missing comma, unclosed bracket, unescaped quotes, trailing comma | Validate with JSON linter first |
| Content mismatch | ~15% | Schema data differs from visible page content; `@type` typo (`"Prodcut"`) | Match markup 1:1 to visible content |

### Errors vs Warnings

- **Error** = required property missing or broken syntax. Blocks rich results entirely. Fix immediately.
- **Warning** = recommended property missing. Rich results may still show but are degraded. Fix when possible.

### Common Syntax Fixes

| Error | Broken Example | Fixed |
|---|---|---|
| Missing comma | `"name": "X" "url": "Y"` | `"name": "X", "url": "Y"` |
| Missing colon | `"name" "X"` | `"name": "X"` |
| Unclosed bracket | `{"name": "X"` | `{"name": "X"}` |
| Unescaped quote | `"name": "The "Best" Widget"` | `"name": "The \"Best\" Widget"` |
| Trailing comma | `"name": "X",}` | `"name": "X"}` |
| @type typo | `"@type": "Prodcut"` | `"@type": "Product"` |

---

## Phase 6: Schema for AI Visibility

Schema markup is no longer just a rich results tactic. Since March 2025, both Google and Microsoft publicly confirmed they use structured data for generative AI features. ChatGPT confirmed the same for product results.

### Key Stats (2025-2026)

- AI Overviews appear in 13%+ of Google searches and growing
- GPT-4 accuracy jumps from **16% to 54%** when content has structured data
- LLMs grounded in knowledge graphs achieve **300% higher accuracy** vs. unstructured data alone
- Properly implemented schema can increase organic CTR by up to 30%

### What This Means for Implementation

1. **Entity graph with `@id` and `sameAs`** — LLMs use this to disambiguate your brand/person/product from others with similar names. This is the highest-leverage change you can make.
2. **FAQPage markup** — even if Google won't show it as rich results (unless gov/health), AI systems still read it for Q&A grounding and citation.
3. **Organization + Person schema on every page** — not just the homepage. AI crawlers build entity models from every URL they visit.
4. **Keep schema current** — outdated price, availability, or date information in markup confuses both users and AI systems.

### What NOT to Do

- Do not add schema for entities that don't appear on the page (content mismatch)
- Do not create competing `@id` definitions for the same entity across pages
- Do not use deprecated types thinking they help AI — they don't, and they add noise

For broader AI search strategy beyond structured data, see the `ai-ready` skill.

---

## Quick Reference: Priority Order

1. `Organization` / `LocalBusiness` — entity establishment, knowledge panel
2. `BreadcrumbList` — low effort, high SERP value
3. `Product` — critical for e-commerce
4. `Article` — critical for content sites, author E-E-A-T
5. `VideoObject` — required for any video content
6. `Event` — required for event listings
7. `Person` — author schema, E-E-A-T signal
8. `SoftwareApplication` — for SaaS and apps

Remove immediately: `HowTo`, `SpecialAnnouncement`, `Course Info`, `ClaimReview`, `EstimatedSalary`, `LearningVideo`, `VehicleListing`, `PracticeProblem`.
