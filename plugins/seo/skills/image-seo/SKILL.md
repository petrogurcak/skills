---
name: image-seo
description: "Optimizes images for search engines, Core Web Vitals, and visual search. Covers format selection (AVIF/WebP/JPEG), LCP optimization with fetchpriority, lazy loading rules, alt text best practices, responsive images (srcset/sizes), compression thresholds, Google Lens optimization, and Open Graph images. Use when optimizing image performance, fixing LCP issues caused by images, writing alt text, setting up responsive images, or optimizing for visual search. Trigger phrases: 'image optimization', 'lazy loading', 'WebP', 'AVIF', 'alt text', 'image compression', 'OG image', 'Google Lens'. NOT for general page speed (use technical-seo) or on-page keyword optimization (use on-page-seo)."
---

# Image SEO

## Quick Reference

| Area | Action |
|------|--------|
| Format | AVIF > WebP > JPEG via `<picture>` |
| LCP image | `fetchpriority="high"` + `<link rel="preload">` + NEVER lazy-load |
| Below-fold | `loading="lazy"` on all images outside viewport |
| Alt text | Under 125 chars, specific, contextual |
| Dimensions | Always set `width` and `height` (prevents CLS) |
| Responsive | 4-6 srcset breakpoints, use `w` descriptors |
| Compression | JPEG 75-85, WebP 70-80, AVIF 45-60 quality |
| Heroes | Target <200KB; product <150KB; OG 1200×630 <300KB |
| Image sitemap | Required for JS-heavy or large e-commerce sites |
| Visual search | Original photos, clear subjects, Product schema |

---

## Phase 1: Image Formats

### Format Comparison (early 2026)

| Format | Global Support | Compression vs JPEG | Recommended Quality | Status |
|--------|---------------|---------------------|---------------------|--------|
| **WebP** | ~97% | ~30% smaller | 70–80 | Universal. Safe default. |
| **AVIF** | ~95% | ~50% smaller | 45–60 | Production-ready. Best compression. |
| **JPEG** | ~100% | baseline | 75–85 | Safety net fallback. |
| **JPEG XL** | ~10% | ~60% smaller | — | Not viable. Skip until Chrome H2 2026. |

Key numbers:
- AVIF vs WebP: 20–25% smaller for photos at equivalent visual quality
- AVIF quality 45–60 matches WebP quality 70–80 visually
- JPEG XL: Chrome removed support in 2022, reversed in late 2025 — Rust-based decoder expected H2 2026. Firefox still requires a flag. Ignore for web delivery.

**Trade-off:** AVIF compresses better but decodes slower (higher CPU). For LCP hero images on low-powered devices, WebP may be faster end-to-end. Test both.

### `<picture>` Element Pattern

Serve AVIF first, WebP as fallback, JPEG as safety net:

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Freshly baked vegan chocolate cake topped with raspberries" width="800" height="600">
</picture>
```

Always include `width` and `height` on `<img>` — the browser uses these to reserve layout space and prevent Cumulative Layout Shift (CLS).

---

## Phase 2: LCP & Loading Strategy

### Critical Rule: NEVER Lazy-Load Your LCP Image

Data from real-world testing:

| Loading strategy | LCP p75 | Poor scores |
|-----------------|---------|-------------|
| Preloaded (fetchpriority="high") | 364ms | 0% |
| Lazy-loaded | 720ms | 4.3% |

### fetchpriority="high" Impact

- **Google Flights**: LCP improved from 2.6s → 1.9s (27% improvement)
- **Etsy**: 4% LCP improvement in production
- General range: 0.5–2 second improvements in real-world tests
- Use sparingly — only on 1–2 critical resources per page

### Implementation Pattern

```html
<!-- In <head>: preload hint for LCP image -->
<link rel="preload" href="hero.avif" as="image" fetchpriority="high">

<!-- Hero / LCP image: eager + priority -->
<img
  src="hero.avif"
  alt="..."
  loading="eager"
  fetchpriority="high"
  width="1200"
  height="600"
>

<!-- All below-fold images: lazy -->
<img
  src="product.webp"
  alt="..."
  loading="lazy"
  width="400"
  height="300"
>
```

### Eager vs Lazy Decision Table

| Eager (`loading="eager"`) | Lazy (`loading="lazy"`) |
|--------------------------|------------------------|
| Hero / banner (LCP) | Product galleries below fold |
| Logo | Blog post body images |
| First visible product image | Comments section images |
| Background images in viewport | Footer images |
| Anything above the fold | Anything below the fold |

### Native vs JS Lazy Loading

Native `loading="lazy"` is sufficient for most cases. JS libraries (IntersectionObserver-based) are only needed when you require: custom thresholds, blur-up/placeholder effects, or lazy loading of CSS background images.

---

## Phase 3: Alt Text

### What Google Actually Uses

Google combines three signals to understand images:
1. **Alt text** — the primary direct connection between image and page context
2. **Computer vision / AI recognition** — Google's own image analysis
3. **Surrounding page content** — text near the image, headings, captions

Alt text directly determines **image search visibility** and contributes to overall page relevance.

### Writing Rules

- Keep under **125 characters** (screen reader compatibility cutoff)
- Be specific and descriptive about what the image shows
- Include natural context relevant to the page topic
- Skip "image of" or "photo of" prefixes — screen readers announce the element type
- Use `alt=""` (empty, not missing) for purely decorative images

### Good vs Bad Examples

| Bad | Good |
|-----|------|
| `"cake"` | `"Freshly baked vegan chocolate cake topped with raspberries on a white ceramic plate"` |
| `"photo of suitcase"` | `"Black hard-shell carry-on suitcase with adjustable telescoping handle, 22 inches"` |
| `"SEO keywords best buy click here"` | `"Team reviewing marketing analytics dashboard on laptop in open office"` |

### AI Alt Text Generation Tools

Major tools (2025–2026): AltText.ai, ImgSEO (WordPress plugin), Contentful AI, Writer.com.

Reported accuracy ~99% for straightforward product/object images. Falls short on: contextual meaning (why the image matters on this page), brand-specific terminology, nuanced scenes requiring domain knowledge.

**Recommendation:** Use AI-generated alt text as a starting point, then manually review for context accuracy.

### Legal: European Accessibility Act (EAA)

EAA became mandatory **June 28, 2025**. Proper alt text is now a **legal requirement in the EU**, not optional. Any EU-facing website or app must comply.

---

## Phase 4: Responsive Images

### srcset with Width Descriptors

```html
<img
  srcset="image-400.webp 400w,
          image-768.webp 768w,
          image-1024.webp 1024w,
          image-1920.webp 1920w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1024px) 50vw,
         33vw"
  src="image-768.webp"
  alt="Description"
  width="1920"
  height="1280"
  loading="lazy"
>
```

Use **width descriptors (`w`)** over pixel density descriptors (`x`) — they give browsers more flexibility to select the right image based on actual display size and DPR.

### Recommended Breakpoints

| Device | Width |
|--------|-------|
| Mobile | 400px |
| Mobile large | 768px |
| Tablet | 1024px |
| Desktop | 1920px |
| Retina ceiling | 2560px |

**Sweet spot: 4–6 breakpoints.** Too many srcset variants reduce CDN cache hit ratio, hurting performance more than serving a slightly larger image.

### Image CDN Comparison

| CDN | Best For | Pricing |
|-----|----------|---------|
| **Cloudflare Images** | Simple sites, budget | Free under 1,500 images; $0.50/1K transforms |
| **Cloudinary** | Complex transforms, video | Free tier: 25 credits/mo (~25GB bandwidth) |
| **Imgix** | High-traffic media sites | Min $100/mo, best raw performance |
| **ImageKit** | Mid-tier alternative | Competitive pricing, good feature set |

All major CDNs support: automatic format negotiation (serve AVIF/WebP based on `Accept` header), AI-aware smart cropping, and on-the-fly responsive resizing via URL parameters.

---

## Phase 5: Compression

### Quality Settings by Format

| Format | Optimal Quality Range | Notes |
|--------|-----------------------|-------|
| **JPEG** | 75–85 | Below 75: visible artifacts. Above 85: diminishing returns. |
| **WebP** | 70–80 | Matches JPEG 90–95 visual quality. |
| **AVIF** | 45–60 | Outperforms WebP at smaller file size. |
| **PNG** | Lossless | Use only for graphics/text/transparency; always optimize. |

### File Size Targets

| Image Type | Target |
|------------|--------|
| Hero / LCP image | <200KB (ideally <100KB) |
| Product images | <150KB |
| Thumbnails | <30KB |
| OG / social images | <300KB |

### Quality Metric

Use **SSIM (Structural Similarity Index)** or VMAF for automated quality thresholds — aim for **SSIM > 0.95** as your floor. More reliable than eyeballing.

### Tools

| Category | Tools |
|----------|-------|
| Build-time | webpack image-loader, gulp-imagemin, Next.js Image Optimization, sharp (Node.js) |
| CDN/SaaS | Cloudinary, Imgix, Cloudflare (auto-optimize on delivery) |
| Standalone | TinyPNG, Squoosh (Google), ImageOptim (Mac), sharp CLI |

---

## Phase 6: Visual Search (Google Lens)

### Scale

Google Lens processes over **12 billion visual searches per month**. 62% of Gen Z and Millennial consumers prefer visual search over text search.

### Optimization Strategies

1. **Clear subject composition** — One dominant subject per image. Google Lens identifies "entities" — cluttered backgrounds reduce recognition accuracy.
2. **Specific, entity-rich alt text** — Not "suitcase" but "black hard-shell carry-on suitcase with adjustable handle." Lens uses alt text to match images to entity types.
3. **Product schema** — Implement `Product` and `ImageObject` schema.org markup. Structured data helps Lens match images to entity types.
4. **Original images over stock** — Google Lens matches against its index. Original photos improve brand-specific recognition and matching accuracy.
5. **High resolution** — Minimum 1200px on the long edge. Lens performs better with detail-rich images.
6. **Mobile optimization** — Most Lens usage is mobile. Ensure images render correctly on mobile viewports.
7. **Consistent visual branding** — Products photographed consistently (same angles, lighting, backgrounds) build stronger visual entity recognition over time.

For `Product` and `ImageObject` JSON-LD implementation → see `schema-markup` skill.

---

## Phase 7: Open Graph Images

### Universal OG Spec

- **Dimensions**: 1200×630px (1.91:1 ratio)
- **Format**: JPG at 80–85% quality or compressed PNG
- **File size**: Under 300KB (ideally under 200KB)
- **Facebook max**: 5MB, but never approach this limit

### Required Meta Tags

```html
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Description of the image">
<meta property="og:image:type" content="image/jpeg">
```

Including `og:image:width` and `og:image:height` prevents platforms from guessing dimensions — improves load speed and prevents layout shifts in link previews.

**`og:image:alt` matters for AEO** — LLMs and AI-powered search engines use this to interpret shared content context. Do not omit it.

### Platform-Specific Quirks

| Platform | Dimensions | Notes |
|----------|-----------|-------|
| Facebook | 1200×630 | Standard OG |
| Twitter/X | 1200×628 | `twitter:card="summary_large_image"` required |
| LinkedIn | 1200×627 | Strict minimums; won't render below 200×200 |
| Slack/Discord | 1200×630 | Standard OG |

### Design Tips

- Center critical content — platforms crop differently on mobile
- Use a **safe zone of ~1000×500px centered** for text/logo
- Test with Facebook Sharing Debugger and Twitter Card Validator before launch

---

## Phase 8: Image Sitemaps

### When You Need One

Image sitemaps help Google discover images that standard crawling misses:

| Scenario | Image sitemap needed? |
|----------|----------------------|
| JavaScript-rendered galleries (React/Vue/Angular) | Yes |
| Lazy-loaded images Googlebot may not scroll to | Yes |
| Images behind tabs, accordions, interactive elements | Yes |
| CDN-hosted images on a different domain | Yes |
| E-commerce with large product catalogs | Yes |
| Static HTML site where Googlebot can crawl freely | No |

Most websites do NOT have image sitemaps, meaning visual content may never get indexed. For image-heavy sites, this is low-effort, high-impact.

### XML Format

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://example.com/product/blue-sneakers</loc>
    <image:image>
      <image:loc>https://cdn.example.com/images/blue-sneakers-main.jpg</image:loc>
      <image:caption>Blue canvas sneakers with white rubber sole, size 42</image:caption>
    </image:image>
    <image:image>
      <image:loc>https://cdn.example.com/images/blue-sneakers-side.jpg</image:loc>
      <image:caption>Side view of blue canvas sneakers showing ankle support</image:caption>
    </image:image>
  </url>
</urlset>
```

Submit image sitemaps in Google Search Console under the same property as the pages that reference the images. Monitor the "Images" section under Coverage for indexing rates.

---

## Cross-References

- General page speed / Core Web Vitals → `technical-seo`
- Keyword optimization for page content → `on-page-seo`
- JSON-LD for Product / ImageObject schema → `schema-markup`
- Image sitemap as part of full sitemap strategy → `sitemap-management`
