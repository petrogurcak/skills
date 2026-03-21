---
name: sitemap-management
description: "Creates, optimizes, and monitors XML sitemaps for efficient crawling and indexing. Covers sitemap index files, image/video/news sitemaps, IndexNow protocol, large site strategy (100K+ pages), JavaScript-rendered content, dynamic generation (Next.js/WordPress), and Google Search Console monitoring. Use when creating sitemaps, fixing indexing issues, implementing IndexNow, or managing crawl budget for large sites. Trigger phrases: 'sitemap', 'XML sitemap', 'IndexNow', 'crawl budget', 'indexing issues'. NOT for robots.txt configuration (use technical-seo) or page-level canonical tags (use technical-seo)."
---

# Sitemap Management

XML sitemaps are discovery signals, not ranking signals. Their job: tell crawlers what exists, what changed, and when. Done right, they maximize indexation efficiency. Done wrong (stale dates, faceted URLs, bloated files), they waste crawl budget.

## Quick Router

| User says... | Go to... |
|---|---|
| "create sitemap", "sitemap structure" | Phase 1: Sitemap Index Files |
| "image sitemap", "video sitemap", "news sitemap" | Phase 2: Specialized Sitemaps |
| "priority", "changefreq", "lastmod" | Phase 3: Priority & Changefreq |
| "IndexNow", "Bing indexing", "instant indexing" | Phase 4: IndexNow |
| "100K pages", "large site", "crawl budget" | Phase 5: Large Site Strategy |
| "JavaScript site", "SPA", "React sitemap" | Phase 6: JS-Rendered Sites |
| "Next.js sitemap", "WordPress sitemap", "dynamic sitemap" | Phase 7: Dynamic Generation |
| "GSC", "Search Console", "submitted vs indexed" | Phase 8: GSC Monitoring |

---

## Phase 1: Sitemap Index Files

### Hard Limits

Every sitemap file has hard limits imposed by Google:

- **50,000 URLs maximum** per file
- **50 MB maximum** uncompressed file size
- A sitemap index can reference up to 50,000 child sitemaps (theoretical ceiling: 2.5 billion URLs)

Exceeding either limit causes Google to silently truncate the file — some URLs never get processed.

### When to Split

Split into a sitemap index when:
- Any single sitemap would exceed 50K URLs or 50 MB
- You have 10K+ URLs across **distinct content types** (even if under the hard limit — enables per-type monitoring in GSC)
- You want to track indexation rates separately by content type

### How to Split — By Content Type, Not Arbitrarily

**Wrong:** `sitemap-1.xml`, `sitemap-2.xml`, `sitemap-3.xml`

**Right:** `products-sitemap.xml`, `blog-sitemap.xml`, `categories-sitemap.xml`

Descriptive filenames give GSC meaningful per-sitemap data. When blog indexation drops, you'll see it immediately. Numbered files blur all signals together.

**Submit only the index URL to Search Console.** Google follows the index to discover all child sitemaps automatically.

### Sitemap Index XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/products-sitemap.xml</loc>
    <lastmod>2026-03-20</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/blog-sitemap.xml</loc>
    <lastmod>2026-03-19</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/categories-sitemap.xml</loc>
    <lastmod>2026-03-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/landing-pages-sitemap.xml</loc>
    <lastmod>2026-03-10</lastmod>
  </sitemap>
</sitemapindex>
```

### Standard Child Sitemap XML

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/products/blue-widget/</loc>
    <lastmod>2026-03-18</lastmod>
  </url>
  <url>
    <loc>https://example.com/products/red-gadget/</loc>
    <lastmod>2026-03-12</lastmod>
  </url>
</urlset>
```

Note: `<priority>` and `<changefreq>` are omitted intentionally — see Phase 3.

---

## Phase 2: Specialized Sitemaps

### Image Sitemaps

**When they matter:** Google's standard crawler misses images that are:
- Loaded via JavaScript (lazy-loaded, dynamically injected)
- Behind CSS backgrounds
- Hosted on CDN subdomains without cross-domain referral
- In e-commerce product galleries, portfolios, stock photo sites

Image sitemaps can be embedded within standard sitemaps (preferred — one file to manage) or as a separate dedicated file.

**Image sitemap XML (embedded in standard sitemap):**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/products/blue-widget/</loc>
    <image:image>
      <image:loc>https://cdn.example.com/images/blue-widget-front.jpg</image:loc>
      <image:title>Blue Widget — Front View</image:title>
      <image:caption>Professional grade blue widget with stainless steel finish</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://cdn.example.com/images/blue-widget-side.jpg</image:loc>
      <image:title>Blue Widget — Side Profile</image:title>
    </image:image>
  </url>
</urlset>
```

**Practical note:** Yoast SEO and Rank Math both include images in sitemaps automatically by default. If you're on WordPress with either plugin, you likely already have image sitemaps.

### Video Sitemaps

Video sitemaps enable **video rich results** in Google Search — the thumbnail + duration + title card that appears in search results. Without them, Google may still index your video, but rich results are far less likely.

**Required tags:** `<video:thumbnail_loc>`, `<video:title>`, `<video:description>`, plus one of: `<video:content_loc>` or `<video:player_loc>`

**Most valuable for:** Sites hosting their own video content. YouTube embeds are indexed via YouTube's own sitemaps.

**Video sitemap XML:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com/tutorials/setup-guide/</loc>
    <video:video>
      <video:thumbnail_loc>https://example.com/thumbs/setup-guide.jpg</video:thumbnail_loc>
      <video:title>Complete Setup Guide — Blue Widget</video:title>
      <video:description>Step-by-step installation for the Blue Widget in under 5 minutes.</video:description>
      <video:content_loc>https://example.com/videos/setup-guide.mp4</video:content_loc>
      <video:duration>287</video:duration>
      <video:publication_date>2026-03-01T00:00:00+00:00</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
    </video:video>
  </url>
</urlset>
```

**Key fields:**

| Tag | Required | Notes |
|-----|----------|-------|
| `<video:thumbnail_loc>` | Yes | Min 160x90px, max 1920x1080px |
| `<video:title>` | Yes | Match page title |
| `<video:description>` | Yes | Max 2048 characters |
| `<video:content_loc>` or `<video:player_loc>` | Yes (one of) | Direct video file or embed player URL |
| `<video:duration>` | Recommended | In seconds |
| `<video:publication_date>` | Recommended | ISO 8601 format |

For video schema (VideoObject, Clip, SeekToAction, BroadcastEvent) → see `schema-markup` skill.

### News Sitemaps

**Who needs them:** Only Google News-approved publishers. If you're not in Google News, skip this.

**Hard constraint:** News sitemaps only include articles published in the **last 48 hours**. Older articles are ignored. This is for news carousel placement, not general indexation.

**News sitemap XML:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>https://example.com/news/breaking-story-2026-03-21/</loc>
    <news:news>
      <news:publication>
        <news:name>Example News</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>2026-03-21T09:00:00+00:00</news:publication_date>
      <news:title>Breaking Story Headline Here</news:title>
    </news:news>
  </url>
</urlset>
```

---

## Phase 3: Priority & Changefreq

### Google Ignores Both

`<priority>` and `<changefreq>` are dead weight for Google. This has been confirmed repeatedly by Google engineers. Google determines crawl frequency and page importance through its own signals: link graph analysis, user engagement, content freshness, historical crawl data.

Including them won't hurt, but optimizing them is pure busywork.

**John Mueller on faking sitemap dates:**
> "It's lazy and will cause us to ignore your data."

Setting `<lastmod>` to today's date on all pages — regardless of whether content changed — trains Google to distrust your lastmod values entirely. Once Google ignores your lastmod, you lose the only metadata signal that actually matters.

### lastmod — The Only Signal That Works

`<lastmod>` is the **one metadata tag Google actively uses** from sitemaps — but only when it's consistently accurate.

**What qualifies as a meaningful update:**
- New content added to the page
- Significant factual changes
- Product price, availability, or spec changes
- Structural changes that alter the page's topic

**What does NOT qualify:**
- Layout tweaks
- CSS/JS changes that don't affect content
- Minor copy edits
- Changing a CTA button color

**Format:** ISO 8601 — `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS+TZ`

---

## Phase 4: IndexNow

### What It Is

IndexNow is a real-time URL submission protocol that notifies search engines immediately when content changes. Instead of waiting for crawlers to rediscover your sitemap, you push a notification the moment something publishes or updates.

### Who Supports It

| Search Engine | Supports IndexNow |
|---|---|
| Bing | Yes |
| Yandex | Yes |
| Naver | Yes |
| Seznam | Yes |
| **Google** | **No** |

Google has been aware of IndexNow since 2021 and has never adopted it. For Google, sitemaps + accurate lastmod remains the primary discovery mechanism.

**Scale as of 2026:** 5+ billion URLs submitted daily, 80+ million websites using it. 22% of clicked Bing results come from IndexNow submissions.

### Is It Worth Implementing?

Yes. The reasons:
- Near-instant indexation on Bing (within 30 minutes vs. hours or days)
- Zero downside — it complements sitemaps, does not replace them
- Trivial to implement (hours, not weeks)
- Especially valuable for: news sites, e-commerce with frequent inventory changes, time-sensitive content

### Implementation

**Step 1: Generate an API key**

Create a random alphanumeric key (e.g., `a1b2c3d4e5f6g7h8`).

**Step 2: Host the key verification file**

Upload a text file at `https://yoursite.com/{key}.txt` containing only the key string:
```
a1b2c3d4e5f6g7h8
```

**Step 3: Submit URLs via POST**

```bash
curl -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "example.com",
    "key": "a1b2c3d4e5f6g7h8",
    "keyLocation": "https://example.com/a1b2c3d4e5f6g7h8.txt",
    "urlList": [
      "https://example.com/new-blog-post/",
      "https://example.com/updated-product/"
    ]
  }'
```

Submit to `api.indexnow.org` — it automatically distributes to all participating engines. Maximum 10,000 URLs per request.

**Step 4: Trigger on publish/update**

Integrate into your CMS publishing hook, deployment pipeline, or content webhook. Every time a page publishes or updates, fire the IndexNow POST.

### WordPress

**Rank Math:** Built-in IndexNow toggle at Rank Math → General Settings → Others → IndexNow. Enable and it activates automatically.

**Yoast SEO:** Requires the "Yoast SEO: IndexNow" plugin (free). Activates on all post publish/update events.

### Sitemap vs. IndexNow — Use Both

| | Sitemaps | IndexNow |
|---|---|---|
| **Purpose** | Comprehensive discovery (all pages) | Real-time notification (changed pages) |
| **When triggered** | Crawled periodically | On each publish/update |
| **Google support** | Yes | No |
| **Bing support** | Yes | Yes |
| **Replace the other?** | No | No |

---

## Phase 5: Large Site Strategy (100K+ Pages)

### Architecture

For sites with 100K+ URLs, the sitemap index becomes a crawl management tool, not just a file list.

```
/sitemap-index.xml
  /products-a-m-sitemap.xml        (25,000 URLs)
  /products-n-z-sitemap.xml        (25,000 URLs)
  /categories-sitemap.xml          (500 URLs)
  /blog-sitemap.xml                (5,000 URLs)
  /landing-pages-sitemap.xml       (200 URLs)
```

**Optimal file size:** 10,000–25,000 URLs per file. Don't max out at 50K — smaller files parse faster and provide cleaner per-segment monitoring data.

### Crawl Budget Efficiency Formula

```
Crawl Budget Efficiency = Total Indexable Pages / Avg Pages Crawled Per Day
```

- **Target: < 3** — Google crawls your content roughly every 3 days or faster
- **Result > 10** — crawl budget problem requiring intervention
- Find avg pages crawled/day in GSC → Settings → Crawl stats

### What to Exclude from Sitemaps

The sitemap should be **curated, not a dump** of your URL inventory. Exclude:

| Exclude | Reason |
|---|---|
| Faceted URLs (`?color=red&size=xl`) | Duplicate content, infinite crawl paths |
| Internal search results (`/search?q=...`) | Low value, near-infinite variations |
| Pagination pages (`/blog/page/2/`) | Low independent value; use rel=next/prev |
| Parameter variations of canonical URLs | Duplicate content |
| Staging/test/draft pages | Never index |
| Thin content pages | Better to noindex AND exclude |
| Tag archives with few posts | Typically thin |

### What to Include

Only pages that:
1. Have canonical tag pointing to themselves (not a different URL)
2. Return HTTP 200
3. Are not noindexed
4. Provide genuine, non-duplicated value

**Rule of thumb:** If you wouldn't want Google to index it, don't include it in the sitemap. Including a URL in a sitemap is an explicit recommendation to Google.

### Segmentation for Ultra-Large Sites

For 1M+ pages (e-commerce, news archives):
- Split by first letter of slug, date range, or product category
- Maintain a master sitemap index that references sub-indexes
- Automate generation — hand-maintaining a 1M URL sitemap is not feasible

---

## Phase 6: JS-Rendered Sites

### The Core Problem

Googlebot uses a two-pass rendering model:

1. **First pass:** Fetches raw HTML immediately
2. **Second pass:** Executes JavaScript and renders — delayed by hours to weeks for lower-priority pages

For high-priority pages (strong backlinks, high traffic), second-pass rendering is usually fast. For new or low-authority pages, rendering can be delayed significantly — meaning content inside JavaScript may not be indexed for a long time.

### What Sitemaps Do (and Don't Do) for SPAs

**They do:** Help Googlebot discover all routes. Without a sitemap, Googlebot may not find JavaScript-navigated routes at all, since it can't reliably follow `onClick` handlers and `history.pushState` navigation.

**They don't:** Fix rendering delays. A URL in the sitemap still goes through the two-pass rendering queue. Discovery is solved; rendering speed is not.

### URL Requirements for JS Sites

- Include only canonical URLs — no hash fragments (`/#/page` is not indexable)
- Clean URLs that resolve to real server routes or pre-rendered pages
- URLs must return valid HTML on first pass, even if empty `<body>` — the sitemap tells Google to come back for rendering

### Recommended Architecture (Ranked by SEO Effectiveness)

| Option | SEO Effectiveness | Notes |
|---|---|---|
| SSR/SSG (Next.js, Nuxt, Remix, Astro) | Excellent | Content in initial HTML; best option |
| Pre-rendering service (Prerender.io, Rendertron) | Good | Serves static HTML to bots |
| Hybrid rendering | Good | SSR for critical pages, CSR for authenticated/low-value |
| Client-side only + sitemap | Poor | Discovery solved; rendering delays remain |

**If you're building a new site and SEO matters: SSR or SSG is the correct choice.** Client-side-only rendering is a crawl and indexation liability.

---

## Phase 7: Dynamic Generation

### Next.js (App Router)

Next.js App Router has native sitemap support via the `app/sitemap.ts` convention — no package needed.

**Basic sitemap (`app/sitemap.ts`):**

```typescript
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetchPosts()
  const products = await fetchProducts()

  const blogUrls = posts.map((post) => ({
    url: `https://example.com/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const productUrls = products.map((product) => ({
    url: `https://example.com/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...blogUrls,
    ...productUrls,
  ]
}
```

**Large sites — automatic splitting with `generateSitemaps()`:**

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

const URLS_PER_SITEMAP = 25000

export async function generateSitemaps() {
  const totalProducts = await getProductCount()
  const count = Math.ceil(totalProducts / URLS_PER_SITEMAP)
  return Array.from({ length: count }, (_, i) => ({ id: i }))
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const products = await fetchProducts({
    offset: id * URLS_PER_SITEMAP,
    limit: URLS_PER_SITEMAP,
  })

  return products.map((product) => ({
    url: `https://example.com/products/${product.slug}`,
    lastModified: product.updatedAt,
  }))
}
```

Next.js generates URLs at:
- `/sitemap/0.xml`, `/sitemap/1.xml`, etc. (individual sitemaps)
- `/sitemap.xml` (sitemap index referencing all splits)

**Alternative package:** `next-sitemap` for projects needing custom index files or Pages Router compatibility. Config in `next-sitemap.config.js`.

### WordPress

| Plugin | Default Sitemap URL | Key Features |
|---|---|---|
| **Rank Math** | `/sitemap_index.xml` | Fine-grained per-type control, IndexNow toggle, exclude specific posts |
| **Yoast SEO** | `/sitemap_index.xml` | Auto-splits by post type, image inclusion, Google/Bing ping |

Both auto-notify search engines on publish. Both include images by default. Both handle large sites with automatic splitting.

**Rank Math configuration:** Rank Math → Sitemap → Per-sitemap settings let you exclude specific post types, taxonomies, or individual posts. Enable IndexNow at General Settings → Others → IndexNow.

### Custom / Node.js

Use the `sitemap` npm package for programmatic generation:

```bash
npm install sitemap
```

```typescript
import { SitemapStream, streamToPromise } from 'sitemap'
import { createGzip } from 'zlib'
import { Readable } from 'stream'

async function generateSitemap(urls: Array<{ url: string; lastmod: string }>) {
  const stream = new SitemapStream({ hostname: 'https://example.com' })
  const pipeline = stream.pipe(createGzip())

  Readable.from(urls).pipe(stream)

  return streamToPromise(pipeline)
}

// Cache strategy: serve from memory/Redis, regenerate on content webhook
// TTL: 1 hour for dynamic sites, rebuild on deploy for static sites
```

**Caching rules:**
- Dynamic sites: cache with 1-hour TTL, regenerate on content change via webhook
- Static sites: generate at build time, serve from CDN edge
- Never regenerate on every request — sitemaps are crawled by bots at scale

---

## Phase 8: GSC Monitoring

### Where to Look

Google Search Console → Indexing → Sitemaps

Submit sitemap URL once. After submission, GSC shows:

| Metric | What It Tells You |
|---|---|
| **Submitted** | URLs you've told Google about |
| **Indexed** | URLs Google has actually indexed |
| **Last read** | When Google last fetched the sitemap |
| **Status** | Success / Couldn't fetch / Has errors |

### Submitted vs. Indexed Gap

The gap between submitted and indexed is the most important signal.

| Gap Size | Interpretation | Action |
|---|---|---|
| < 10% | Normal — not every page is high enough value | Monitor; no action needed |
| 10–30% | Investigate | Check excluded pages for noindex, canonical conflicts, thin content |
| > 30% | Problem | Audit content quality, check for crawl errors, verify canonical tags, review robots.txt |

GSC shows indexed counts per sitemap — this is why splitting by content type matters. A 40% indexation gap across all URLs is harder to diagnose than a 90% gap on `categories-sitemap.xml` specifically.

### Last Read Timestamp

If the "Last read" timestamp is older than 2 weeks, investigate immediately:

- Is the sitemap URL accessible without authentication?
- Does the URL return HTTP 200?
- Is Googlebot blocked by robots.txt, CDN rules, or WAF?
- Is there a server error when fetching the sitemap file?

Use GSC's URL Inspection tool on the sitemap URL itself to trigger a fresh fetch and see what Googlebot receives.

### Fetch Failures

A "Couldn't fetch" status requires immediate investigation:

| Failure Cause | Fix |
|---|---|
| CDN/WAF blocking Googlebot | Whitelist Googlebot IPs; check CDN rate limiting |
| Server timeout | Optimize sitemap generation; add caching layer |
| Wrong URL submitted | Resubmit with correct URL |
| Authentication required | Sitemap must be publicly accessible |
| 5xx server error | Check server logs; ensure endpoint handles load |

### Automation for Large Sites

For sites with multiple sitemaps, manual monitoring doesn't scale. Use the Search Console API:

```python
from googleapiclient.discovery import build

# List all sitemaps and their stats
service = build('searchconsole', 'v1', credentials=credentials)
sitemaps = service.sitemaps().list(siteUrl='https://example.com/').execute()

for sitemap in sitemaps.get('sitemap', []):
    submitted = sitemap.get('contents', [{}])[0].get('submitted', 0)
    indexed = sitemap.get('contents', [{}])[0].get('indexed', 0)
    last_downloaded = sitemap.get('lastDownloaded')

    if sitemap.get('errors', 0) > 0:
        alert(f"Sitemap errors: {sitemap['path']}")
    if indexed / submitted < 0.7:
        alert(f"Low indexation rate: {sitemap['path']} ({indexed}/{submitted})")
```

**Alert thresholds:**
- Fetch failures → immediate alert
- Indexed/Submitted ratio drops > 20% week-over-week → alert
- Last read older than 14 days → alert
- lastmod dates not updating despite content changes → investigate pipeline

---

## Common Mistakes

| Mistake | Why It's a Problem | Fix |
|---|---|---|
| Fake lastmod dates (today's date always) | Google stops trusting your lastmod; loses the only useful metadata signal | Only update lastmod on meaningful content changes |
| Including noindexed pages | Confusing mixed signals to Google | Only include pages without noindex tags |
| Including non-canonical URLs | Dilutes crawl budget on redirect chains | Only include the canonical URL for each page |
| Listing 301 redirect URLs | Wastes crawl budget on hops | Replace with final destination URLs |
| Including faceted/filtered URLs | Crawl budget sink; near-infinite URL space | Exclude all parameter variations |
| Numbered sitemap files | Loses per-content-type monitoring | Use descriptive names: `products-sitemap.xml` |
| Not splitting by content type | Can't diagnose indexation problems per segment | Split even when under 50K URLs if content types differ |
| Submitting sitemap directly to Google Ping | Ping endpoint deprecated since 2023 | Use GSC Sitemaps report or API |

---

## Checklist

### New Site Setup
- [ ] Create sitemap index even if starting with 1 child sitemap (makes future splitting easier)
- [ ] Split by content type with descriptive filenames
- [ ] Include only canonical, non-noindexed, 200-returning URLs
- [ ] Add `Sitemap:` reference in robots.txt
- [ ] Submit to GSC
- [ ] Implement IndexNow for Bing (30-minute install)
- [ ] Verify image sitemap coverage if images load via JS

### Ongoing Maintenance
- [ ] Update lastmod only on meaningful content changes
- [ ] Monitor GSC submitted vs indexed ratio weekly
- [ ] Check "Last read" timestamp — alert if > 14 days
- [ ] Review for fetch failures monthly
- [ ] Audit for excluded URLs (faceted, noindexed, thin) quarterly

### Large Site (100K+)
- [ ] Keep files at 10–25K URLs (not maxed at 50K)
- [ ] Exclude faceted URLs, pagination, search results
- [ ] Calculate Crawl Budget Efficiency (target < 3)
- [ ] Automate sitemap generation and GSC API monitoring
- [ ] Set up alerts for indexation rate drops

---

## Cross-References

- **robots.txt configuration** → `technical-seo` skill
- **Canonical tag strategy** → `technical-seo` skill
- **Video schema (VideoObject, Clip, SeekToAction)** → `schema-markup` skill
- **Image optimization and alt text** → `image-seo` skill
- **Core Web Vitals and crawlability audit** → `technical-seo` skill
