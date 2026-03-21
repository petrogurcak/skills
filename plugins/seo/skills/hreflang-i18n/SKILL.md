---
name: hreflang-i18n
description: "Implements and audits hreflang tags and international SEO strategy. Covers implementation methods (HTML/HTTP/sitemap), common errors with detection and fixes, cross-domain setups, content localization vs translation, country targeting decision tree (ccTLD/subdirectory/subdomain), and systematic audit workflow. Use when setting up multi-language sites, fixing hreflang errors, choosing international URL structure, or auditing existing i18n implementation. Trigger phrases: 'hreflang', 'international SEO', 'multilingual', 'localization', 'multi-language', 'i18n', 'translation SEO'. NOT for general technical audits (use technical-seo) or on-page content in one language (use on-page-seo)."
---

# Hreflang & International SEO

## Quick Router

| User says... | Go to... |
|---|---|
| "implement hreflang", "setup hreflang tags" | Phase 1: Implementation Methods |
| "hreflang errors", "no return tags", "invalid hreflang" | Phase 2: Common Errors |
| "multiple domains", "cross-domain hreflang" | Phase 3: Cross-Domain Setup |
| "does hreflang work", "Google ignoring hreflang" | Phase 4: Google's Handling |
| "translate vs localize", "content for each market" | Phase 5: Content Localization |
| "ccTLD vs subdirectory", "international URL structure" | Phase 6: Country Targeting |
| "audit hreflang", "validate international SEO" | Phase 7: Audit Workflow |

---

## Phase 1: Implementation Methods

### Three Options — Pick ONE

Google confirmed (Search Off The Record, July 2024): it doesn't matter where hreflang is provided. Pick one method and use it consistently across your entire site. Mixing methods creates conflicting signals.

| Method | Best For | Pros | Cons |
|---|---|---|---|
| **HTML `<link>` tags** | Small sites (<5 languages), static HTML, WordPress/CMS | Simple to implement, easy to validate, no server access needed | Clutters `<head>`, doesn't scale past 10+ languages, must be in rendered HTML |
| **HTTP headers** | Non-HTML files (PDFs, JSON), API responses | Works for any content type | Requires server/dev access, hardest to validate, slow to debug |
| **XML sitemap** | Large sites (5+ languages, 1000+ pages), multi-domain | Scalable, centralized management, decouples from HTML | Must re-submit to GSC on changes, takes longer to process |

**Decision rule:** Default to XML sitemap for anything beyond a simple 2-3 language site. HTML tags for small sites where dev access is limited.

### HTML Implementation

Every alternate page must be listed, including a self-referencing tag for the current page:

```html
<head>
  <!-- Self-referencing tag (REQUIRED) -->
  <link rel="alternate" hreflang="en" href="https://example.com/page/" />
  <!-- Alternate versions -->
  <link rel="alternate" hreflang="en-GB" href="https://example.co.uk/page/" />
  <link rel="alternate" hreflang="de" href="https://example.com/de/page/" />
  <link rel="alternate" hreflang="de-AT" href="https://example.com/de-at/page/" />
  <!-- Fallback for all other languages -->
  <link rel="alternate" hreflang="x-default" href="https://example.com/page/" />
</head>
```

### XML Sitemap Implementation

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/page/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/page/"/>
    <xhtml:link rel="alternate" hreflang="en-GB" href="https://example.co.uk/page/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/page/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/page/"/>
  </url>
  <!-- Every URL in the cluster must appear as its own <url> entry -->
  <url>
    <loc>https://example.co.uk/page/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/page/"/>
    <xhtml:link rel="alternate" hreflang="en-GB" href="https://example.co.uk/page/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://example.com/de/page/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/page/"/>
  </url>
</urlset>
```

### HTTP Header Implementation (PDFs/non-HTML)

```
HTTP/1.1 200 OK
Link: <https://example.com/doc.pdf>; rel="alternate"; hreflang="en",
      <https://example.com/de/doc.pdf>; rel="alternate"; hreflang="de"
```

---

## Phase 2: Common Errors

### Error Priority Table

| Error | Frequency | Impact | Fix |
|---|---|---|---|
| Missing return tags | ~65% of sites | Tags ignored by Google | Add reciprocal tags on all alternate pages |
| Missing self-referencing tag | ~45% of sites | Reduced signal strength | Add self-ref on every page in the cluster |
| Invalid language/region codes | ~30% of sites | Tags ignored | Use ISO 639-1 + ISO 3166-1 Alpha-2 |
| Canonical conflicts | ~25% of sites | Silent failure, hardest to detect | Align canonical + hreflang |
| Protocol mismatches | ~20% of sites | Tag mismatch | Use canonical protocol (HTTPS) consistently |
| x-default missing or multiple | ~15% of sites | Fallback ambiguity | Exactly one x-default per cluster |
| Region without language | ~10% of sites | Invalid tag | Always pair: language + optional region |

### Error 1: Missing Return Tags (Most Common)

**Rule:** If page A points to page B with hreflang, page B MUST point back to page A. No exceptions.

**Detection:**
```
Screaming Frog: Hreflang > Missing Reciprocal
Ahrefs Site Audit: "Missing reciprocal hreflang (no return-tag)"
```

**Wrong:**
```html
<!-- Page A (en) points to de -->
<link rel="alternate" hreflang="de" href="https://example.com/de/page/" />

<!-- Page B (de) — does NOT point back to en — BROKEN -->
<link rel="alternate" hreflang="de" href="https://example.com/de/page/" />
```

**Correct:** Every page in the cluster must list ALL other pages in the cluster, including itself.

### Error 2: Invalid Language/Region Codes

**Rule:** Language = ISO 639-1 (2-letter lowercase). Region = ISO 3166-1 Alpha-2 (2-letter uppercase).

| Wrong | Correct | Problem |
|---|---|---|
| `en-UK` | `en-GB` | UK is not a valid ISO 3166-1 code |
| `en_GB` | `en-GB` | Underscore instead of hyphen |
| `EU` | (use country code) | EU is not a valid region |
| `zh` | `zh-Hans` or `zh-Hant` | Chinese needs script subtag |
| `pt` | `pt` or `pt-BR` or `pt-PT` | Language alone is valid; be specific |

**Common valid codes:** `en`, `en-US`, `en-GB`, `en-AU`, `de`, `de-AT`, `de-CH`, `fr`, `fr-FR`, `fr-CA`, `es`, `es-MX`, `es-AR`, `zh-Hans`, `zh-Hant`, `pt-BR`, `pt-PT`

### Error 3: Protocol Mismatches

Hreflang URLs must match your canonical URLs exactly — same protocol, same www/non-www, same trailing slash.

```html
<!-- Wrong: mixing HTTP and HTTPS -->
<link rel="alternate" hreflang="en" href="http://example.com/page/" />
<!-- But canonical is: https://example.com/page/ -->

<!-- Wrong: mixing www and non-www -->
<link rel="alternate" hreflang="de" href="https://www.example.com/de/page/" />
<!-- But canonical is: https://example.com/de/page/ (no www) -->
```

**Fix:** Always use your canonical URL format in hreflang tags.

### Error 4: Canonical Conflicts (Silent Killer)

If hreflang points to URL A but URL A has a canonical pointing to URL B, Google resolves to URL B and the hreflang signal breaks silently — no error in GSC.

**Detection:** Cross-reference hreflang targets against canonical tags.

```
Screaming Frog:
  1. Crawl all alternates
  2. Export Canonicals
  3. Cross-reference: hreflang target ≠ canonical → conflict
```

**Canonical must match hreflang target exactly:**
```html
<!-- On the German page -->
<link rel="canonical" href="https://example.com/de/page/" />
<link rel="alternate" hreflang="de" href="https://example.com/de/page/" />
<!-- ✓ canonical and hreflang point to same URL -->
```

**Paginated content trap:** Never point hreflang at page-1, page-2 etc. if canonical consolidates to a main URL.

### Error 5: x-default Rules

- Exactly ONE x-default per hreflang cluster (across all pages in the cluster)
- Typically points to your primary/English/language-selector page
- Serves users whose language doesn't match any explicit hreflang value
- NOT required — but strongly recommended

```html
<!-- Homepage or language selector as x-default -->
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

---

## Phase 3: Cross-Domain Setup

### Rules (Same as Single Domain)

The hreflang specification is domain-agnostic. Cross-domain hreflang works identically to single-domain — same reciprocal requirement, same validation rules.

**Recommended method for cross-domain: XML sitemaps.** Reason: you can centralize all cross-domain relationships in one or two sitemap files rather than coordinating HTML changes across multiple domains.

### Cross-Domain Implementation

Option A: Each domain hosts its own sitemap with full cluster references.

Option B: One central sitemap (hosted on primary domain) lists all domains. Submit to GSC on all domains.

```xml
<!-- example.com/sitemap-i18n.xml — covers .com, .co.uk, .de -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/page/</loc>
    <xhtml:link rel="alternate" hreflang="en" href="https://example.com/page/"/>
    <xhtml:link rel="alternate" hreflang="en-GB" href="https://example.co.uk/page/"/>
    <xhtml:link rel="alternate" hreflang="de" href="https://example.de/page/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://example.com/page/"/>
  </url>
  <!-- Repeat for every URL, every domain -->
</urlset>
```

### GSC Verification Checklist for Cross-Domain

- [ ] All domains verified in Google Search Console (property ownership)
- [ ] Sitemap submitted to GSC in each verified domain property
- [ ] Exactly one x-default across the entire cluster
- [ ] Reciprocal links present: every domain A → domain B AND domain B → domain A
- [ ] Canonicals on each domain point to themselves (not cross-domain canonicals unless intentional)

**Do not cross-canonicalize to one domain** unless consolidating. Hreflang and cross-domain canonicals pointing to the same domain cancel each other out.

---

## Phase 4: Google's Handling

### Hreflang is a Hint, Not a Directive

Google treats hreflang as a strong signal, not an instruction. Google may override it when:

- The user's explicit language preference (Chrome/account setting) conflicts
- The canonical tag points elsewhere
- The page content doesn't match the declared language
- Automatic language detection disagrees

**Canonical wins over hreflang.** When in conflict, Google follows canonical.

### What Actually Works vs. What's Specified

| Specified behavior | Actual behavior |
|---|---|
| One method only | Mixing methods usually works, but inconsistency causes validation issues |
| All alternates must list all others | Google ignores the cluster if reciprocals are missing |
| Exact URL match required | Minor URL variation (trailing slash) sometimes tolerated, but not reliable |
| Hreflang determines SERP language | Hreflang influences, but user location + language preference + content detection all factor in |

### 31% Conflicting Directives

Industry studies show ~31% of sites with hreflang have conflicting signals (hreflang vs canonical vs content language mismatch). Google resolves these inconsistencies its own way — often by ignoring hreflang entirely.

### Hreflang ≠ Geo-Targeting

Hreflang is for **language**, not location. For geo-targeting (showing different content to UK vs US English speakers based on location):
- Use GSC International Targeting (for subdirectory/subdomain structure)
- Use ccTLD (strongest geo-signal — no GSC setting needed)
- Geo-targeting via hreflang alone is unreliable

### Automatic Language Detection (Coming)

Google has signaled intent to increase automatic content language detection weight. Current best practice: ensure your declared hreflang language matches page content language. Pages with `hreflang="de"` and English content will increasingly be ignored.

---

## Phase 5: Content Localization

### Translation vs Localization

**Translation** = converting words to another language.
**Localization** = adapting content for a specific market's culture, search behavior, and expectations.

Translation alone is insufficient for international SEO rankings. Google evaluates content quality per-market, and machine-translated thin content receives ranking suppression.

### Per-Market Keyword Research

Keywords don't translate. Each market needs independent keyword research:

1. Run keyword research in the target language using local tools (e.g., Google Ads in target country)
2. Analyze local SERPs — competitors and content formats differ by market
3. Check search volume: some high-volume EN terms have near-zero volume in target language
4. Identify market-specific terminology (e.g., "car boot" vs "trunk", "mobile" vs "cell phone")

**Example:** "software" in German SERPs may rank content using "Anwendung" or "Programm" — the English loanword competes differently.

### Localize Schema Markup

Hreflang alternates should have localized schema where applicable:

- `Organization.address` — local office address
- `Product.offers.priceCurrency` — local currency
- `Event.location` — local venue
- `ContactPoint.areaServed` — target country/region

For JSON-LD implementation details → see `schema-markup` skill.

### Minimum Viable Localization Checklist

| Element | Localize? | Notes |
|---|---|---|
| Page title + H1 | Yes | Local keyword research, not direct translation |
| Meta description | Yes | Local call-to-action language |
| URLs | Yes | Translated slugs, not English slugs |
| Body content | Yes | Adapt examples, references, cultural context |
| Images + alt text | Sometimes | Swap images with local relevance |
| Pricing | Yes | Local currency, VAT display |
| Date/number format | Yes | DD/MM/YYYY vs MM/DD/YYYY etc. |
| Phone numbers | Yes | Local format + international prefix |
| Trust signals | Yes | Local certifications, reviews, awards |
| Schema markup | Yes | Address, currency, region |
| Legal/compliance | Yes | GDPR, local privacy law language |

### Content Quality Floor

Google Panda/quality systems apply per-language. Thin translations (under ~300 words of unique content, or obviously machine-translated) receive quality penalties. Each locale needs genuinely useful content, not just translated copy.

---

## Phase 6: Country Targeting

### Decision Tree

```
Do you have budget for separate domains AND need strong geo-targeting?
├── YES → ccTLD (.de, .fr, .co.uk)
│         Trade-off: strongest geo-signal, but separate DA, hosting, content
└── NO ↓

Is geo-targeting important (country-specific pricing, regulations)?
├── YES → Subdirectory (example.com/de/)
│         80% of cases. Inherits main domain DA. GSC geo-targeting.
└── NO → Language only (no country)
         Use language-only hreflang (hreflang="de") without subdirectory
         OR use subdirectory still for cleaner organization

Do you need technical/team separation between locales?
├── YES → Subdomain (de.example.com)
│         Separate crawl budget, separate team deployments
└── NO → Subdirectory wins
```

### Option Comparison

| Structure | Geo-signal | DA inheritance | Setup cost | Maintenance | When to use |
|---|---|---|---|---|---|
| **ccTLD** (.de, .fr) | Strongest | None — rebuild from zero | High | High | Enterprise, country is brand differentiator |
| **Subdirectory** (/de/, /fr/) | Strong (GSC) | Full | Low | Low | 80% of cases — recommended default |
| **Subdomain** (de.example.com) | Moderate | Partial | Medium | Medium | Tech separation needed, team autonomy |

### Subdirectory Best Practice (80% Case)

1. Structure: `example.com/{lang}/` or `example.com/{lang-region}/`
   - `/en/`, `/de/`, `/fr/` — language only
   - `/en-us/`, `/en-gb/`, `/de-at/` — language + region (use if you differentiate by country)
2. Set International Targeting in GSC: Search Console > Legacy tools > International Targeting > Country
3. Add hreflang to all pages
4. Ensure internal links use relative paths or locale-aware absolute URLs (don't link from /de/ to English pages without hreflang)

### ccTLD Considerations

- Each ccTLD is a separate domain in Google's eyes — requires building DA independently
- Link equity does NOT pass between .com and .de automatically
- Requires separate GSC properties, separate sitemap submissions
- Stronger geo-targeting signal without needing GSC settings
- Most impactful for country-specific search results (e.g., google.de vs google.com)

---

## Phase 7: Audit Workflow

### Phase A: Crawl & Extract

**Tools:** Screaming Frog (primary), Sitebulb (alternative)

```
Screaming Frog setup:
1. Configuration > Spider > Crawl all subdomains (for multi-domain)
2. Configuration > Hreflang > Store Hreflang
3. Run crawl
4. Export: Hreflang > All (CSV)
5. Export: Canonicals (for conflict check)
```

For XML sitemap method: parse sitemap directly and extract all `<xhtml:link>` elements.

### Phase B: Validate (10-Point Checklist)

| # | Check | Pass condition |
|---|---|---|
| 1 | Self-referencing tag present | Every page links to itself with correct hreflang |
| 2 | Return tags (reciprocal) | Every alternate URL links back to every other |
| 3 | Language codes valid | ISO 639-1 format, no `en-UK`, no underscores |
| 4 | Region codes valid | ISO 3166-1 Alpha-2, uppercase, hyphen separator |
| 5 | Protocol consistency | All URLs use same protocol as canonical (HTTPS) |
| 6 | www consistency | All URLs match canonical www/non-www |
| 7 | Canonical alignment | Hreflang target = canonical target (no conflicts) |
| 8 | x-default present | Exactly one per cluster |
| 9 | All alternates return 200 | No hreflang pointing to 301/404/5xx |
| 10 | Content language match | Page language matches declared hreflang |

### Phase C: Fix by Priority

Fix in this order (highest impact first):

1. **Canonical conflicts** — silent killer, often blocks all hreflang on affected pages
2. **Non-200 status targets** — hreflang to 301/404 is ignored entirely
3. **Missing return tags** — most common, entire cluster ignored when missing
4. **Missing self-reference** — reduces signal strength
5. **Invalid language/region codes** — tag-level ignored
6. **Protocol/www mismatches** — URL-level mismatch
7. **Missing x-default** — lower impact but best practice

### Phase D: Monitor

| Cadence | Task | Tool |
|---|---|---|
| Monthly | Check GSC International Targeting report | Google Search Console |
| Monthly | Automated hreflang validation on staging | CI/CD script or Screaming Frog CLI |
| Quarterly | Full crawl + 10-point checklist | Screaming Frog |
| On deploy | Validate hreflang on changed pages | Screaming Frog custom extraction |

**GSC signals to watch:**
- Pages indexed in wrong country/language SERPs
- Impressions dropping in target locales
- International Targeting errors in GSC (Legacy tools)

### Tools Reference

| Tool | Use | Cost |
|---|---|---|
| Screaming Frog | Crawl, extract, validate reciprocals | Free up to 500 URLs, £149/yr |
| Sitebulb | Crawl with hreflang visualization | Paid |
| Ahrefs Site Audit | "Missing reciprocal hreflang" report | Paid |
| SEMrush Site Audit | Hreflang error detection | Paid |
| hreflangbuilder.com | Generate hreflang tags | Free |
| Merkle hreflang validator | Validate extracted tags | Free |
| Google Search Console | International Targeting, indexing | Free |

---

## Cross-References

- Technical foundations (robots.txt, canonicals, Core Web Vitals) → `technical-seo` skill
- On-page content optimization per locale → `on-page-seo` skill
- JSON-LD schema with locale-specific markup → `schema-markup` skill
- Keyword research per market → `keyword-research` skill
