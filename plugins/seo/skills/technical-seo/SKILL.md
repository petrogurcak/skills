---
name: technical-seo
description: Use when auditing or setting up technical SEO - Core Web Vitals, structured data, crawlability, security headers, mobile-first, with automated audits via claude-in-chrome
---

# Technical SEO

**When to use this skill:**
- Auditing existing website for technical SEO issues
- Setting up correct technical foundation for new website
- Fixing Core Web Vitals problems
- Adding structured data (JSON-LD schema)
- Debugging crawlability issues

**When NOT to use:**
- On-page content optimization → use `seo-optimization`
- Keyword research → use `keyword-research`
- Analytics setup → use `analytics-setup`

---

## Quick Router

| User says... | Go to... |
|--------------|----------|
| "audit webu", "technické SEO check" | Full Audit (all phases) |
| "core web vitals", "rychlost webu", "PageSpeed" | Phase 1: Performance |
| "robots.txt", "sitemap", "crawl" | Phase 2: Crawlability |
| "schema", "structured data", "rich snippets" | Phase 3: Structured Data |
| "HTTPS", "security headers" | Phase 4: Security |
| "mobile", "hreflang", "viewport" | Phase 5: Mobile & i18n |

---

## Modes

**Audit Mode:** Systematická kontrola existujícího webu, identifikace problémů
**Setup Mode:** Správná konfigurace od začátku

---

## Free Tools Stack

| Nástroj | Účel | URL |
|---------|------|-----|
| **PageSpeed Insights** | Core Web Vitals, performance | [pagespeed.web.dev](https://pagespeed.web.dev) |
| **Google Search Console** | Crawl errors, indexing, sitemaps | [search.google.com/search-console](https://search.google.com/search-console) |
| **Schema Markup Validator** | Validace structured data | [validator.schema.org](https://validator.schema.org) |
| **Rich Results Test** | Test rich snippets v Google | [search.google.com/test/rich-results](https://search.google.com/test/rich-results) |
| **Mobile-Friendly Test** | Mobile usability | [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly) |
| **Security Headers** | HTTP security headers check | [securityheaders.com](https://securityheaders.com) |
| **SSL Labs** | HTTPS/SSL konfigurace | [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest) |
| **Screaming Frog** | Crawl webu (500 URL free) | [screamingfrog.co.uk](https://www.screamingfrog.co.uk) |
| **Lighthouse** | Audit v Chrome DevTools | Built-in Chrome |

---

## Phase 1: Performance (Core Web Vitals)

### Metriky

| Metrika | Co měří | Dobrá | Potřebuje zlepšení | Špatná |
|---------|---------|-------|-------------------|--------|
| **LCP** (Largest Contentful Paint) | Loading speed | <2.5s | 2.5-4s | >4s |
| **INP** (Interaction to Next Paint) | Interactivity | <200ms | 200-500ms | >500ms |
| **CLS** (Cumulative Layout Shift) | Visual stability | <0.1 | 0.1-0.25 | >0.25 |

### Audit Checklist

- [ ] LCP < 2.5s (desktop i mobile)
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Performance score > 90 (desktop), > 70 (mobile)
- [ ] Obrázky optimalizované (WebP/AVIF, lazy loading)
- [ ] Critical CSS inline
- [ ] Fonts preloaded / font-display: swap
- [ ] Žádný render-blocking JS

### Opravy podle problému

| Problém | Řešení |
|---------|--------|
| Vysoké LCP | Optimalizuj hero image, preload, CDN |
| Vysoké INP | Rozděl long tasks, defer non-critical JS |
| Vysoké CLS | Definuj size pro img/video, avoid dynamic content injection |

### Automated Audit (claude-in-chrome)

```
Řekni: "Audit Core Web Vitals pro example.com"

Claude provede:
1. navigate → pagespeed.web.dev
2. input → URL webu
3. wait → analýza (mobile + desktop)
4. screenshot → oba reporty
5. extract → Core Web Vitals hodnoty
6. return → strukturovaný přehled s doporučeními
```

---

## Phase 2: Crawlability

### Klíčové prvky

| Prvek | Účel | Soubor/Tag |
|-------|------|------------|
| **robots.txt** | Řízení crawlerů | `/robots.txt` |
| **XML Sitemap** | Mapa stránek pro indexaci | `/sitemap.xml` |
| **Canonical** | Určení primární URL | `<link rel="canonical">` |
| **Meta robots** | Indexace per-page | `<meta name="robots">` |
| **Internal linking** | Distribuce link equity | `<a href>` |

### robots.txt šablona

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /*?*utm_
Disallow: /*?*fbclid

Sitemap: https://example.com/sitemap.xml
```

### Audit Checklist

- [ ] robots.txt existuje a je validní
- [ ] Sitemap existuje a je v robots.txt
- [ ] Sitemap obsahuje pouze indexovatelné URL (200 OK)
- [ ] Canonical tag na každé stránce
- [ ] Žádné conflicting signals (canonical vs noindex)
- [ ] Žádné orphan pages (stránky bez interních odkazů)
- [ ] Redirect chains < 3 hops
- [ ] Žádné broken internal links (404)

### Běžné chyby

| Chyba | Dopad | Fix |
|-------|-------|-----|
| Blokovaný CSS/JS v robots | Broken rendering | Allow /assets/ |
| Sitemap s 404/redirects | Crawl budget waste | Pouze 200 OK URL |
| Self-referencing canonical chybí | Duplicate content risk | Přidej na každou stránku |
| noindex + canonical | Conflicting signals | Vyber jedno |

---

## Phase 3: Structured Data

### Běžné schema typy

| Typ | Použití | Rich Result |
|-----|---------|-------------|
| **Organization** | Homepage | Logo v Knowledge Panel |
| **LocalBusiness** | Lokální firmy | Mapa, hodiny, reviews |
| **Product** | E-commerce | Cena, dostupnost, rating |
| **Article/BlogPosting** | Blog | Datum, autor, thumbnail |
| **FAQPage** | FAQ sekce | Rozbalitelné otázky v SERP |
| **HowTo** | Návody | Steps v SERP |
| **BreadcrumbList** | Navigace | Breadcrumbs v SERP |

### JSON-LD šablony

**Organization (homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Název firmy",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://facebook.com/example",
    "https://linkedin.com/company/example"
  ]
}
```

**LocalBusiness:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Název firmy",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ulice 123",
    "addressLocality": "Praha",
    "postalCode": "110 00",
    "addressCountry": "CZ"
  },
  "telephone": "+420123456789",
  "openingHours": "Mo-Fr 09:00-17:00"
}
```

**Product:**
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Název produktu",
  "image": "https://example.com/product.jpg",
  "description": "Popis produktu",
  "offers": {
    "@type": "Offer",
    "price": "1299",
    "priceCurrency": "CZK",
    "availability": "https://schema.org/InStock"
  }
}
```

**BreadcrumbList:**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com"},
    {"@type": "ListItem", "position": 2, "name": "Kategorie", "item": "https://example.com/kategorie"},
    {"@type": "ListItem", "position": 3, "name": "Produkt"}
  ]
}
```

**FAQPage:**
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Otázka 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Odpověď na otázku 1."
      }
    }
  ]
}
```

### Audit Checklist

- [ ] Organization/LocalBusiness na homepage
- [ ] BreadcrumbList na všech stránkách
- [ ] Product schema na produktových stránkách
- [ ] Article schema na blogu
- [ ] Validace bez errors (warnings ok)
- [ ] Žádné spammy schema (fake reviews, hidden content)

### Automated (claude-in-chrome)

```
Řekni: "Vygeneruj schema pro e-shop example.com"

Claude provede:
1. Analyzuje typ webu
2. Vygeneruje příslušné JSON-LD
3. Validuje přes Rich Results Test
4. Screenshot výsledků
5. Vrátí ready-to-use kód
```

---

## Phase 4: Security

### HTTPS Checklist

- [ ] Platný SSL certifikát
- [ ] HTTP → HTTPS redirect (301)
- [ ] Žádný mixed content (HTTP resources na HTTPS stránce)
- [ ] HSTS header aktivní
- [ ] Certifikát pokrývá všechny subdomény (pokud potřeba)

### Security Headers

| Header | Účel | Doporučená hodnota |
|--------|------|-------------------|
| **Strict-Transport-Security** | Force HTTPS | `max-age=31536000; includeSubDomains` |
| **X-Content-Type-Options** | MIME sniffing prevention | `nosniff` |
| **X-Frame-Options** | Clickjacking prevention | `SAMEORIGIN` |
| **Content-Security-Policy** | XSS prevention | Dle aplikace |
| **Referrer-Policy** | Referrer control | `strict-origin-when-cross-origin` |
| **Permissions-Policy** | Feature restrictions | Dle potřeby |

### Hodnocení (securityheaders.com)

| Grade | Status |
|-------|--------|
| A+ / A | Výborné |
| B | Dobré, minor issues |
| C-D | Potřebuje zlepšení |
| F | Kritické, nutná akce |

### Automated (claude-in-chrome)

```
Řekni: "Zkontroluj security headers pro example.com"

Claude provede:
1. navigate → securityheaders.com
2. input → URL
3. screenshot → výsledky
4. return → chybějící headers + nginx/apache config fix
```

---

## Phase 5: Mobile & Internationalization

### Mobile-First Checklist

- [ ] Viewport meta tag správně nastaven
- [ ] Touch targets ≥ 48x48px
- [ ] Čitelný text bez zoomování (16px+ base)
- [ ] Žádný horizontal scroll
- [ ] Mobile PageSpeed > 70
- [ ] Responzivní obrázky (srcset)
- [ ] Tap-to-call na telefony

### Viewport meta tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Hreflang (multi-language/region)

```html
<!-- Na každé jazykové verzi -->
<link rel="alternate" hreflang="cs" href="https://example.com/cs/" />
<link rel="alternate" hreflang="sk" href="https://example.com/sk/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

### Hreflang pravidla

| Pravidlo | Popis |
|----------|-------|
| Self-reference | Každá stránka odkazuje sama na sebe |
| Reciproční | cs→sk a sk→cs musí existovat |
| x-default | Fallback pro neznámé jazyky |
| Konzistence | Buď v HTML, nebo v sitemap (ne oboje) |

### Audit Checklist

- [ ] Mobile-Friendly Test pass
- [ ] Viewport správně nastaven
- [ ] Touch targets dostatečně velké
- [ ] Hreflang reciproční (pokud multi-lang)
- [ ] Hreflang x-default definován
- [ ] Žádné hreflang conflicts

---

## Full Audit Checklist

```
PERFORMANCE
□ LCP < 2.5s | □ INP < 200ms | □ CLS < 0.1
□ PageSpeed > 90 desktop, > 70 mobile

CRAWLABILITY
□ robots.txt validní | □ sitemap.xml v robots
□ Canonical na všech stránkách | □ Žádné broken links

STRUCTURED DATA
□ Organization/LocalBusiness | □ BreadcrumbList
□ Validace bez errors

SECURITY
□ HTTPS + redirect | □ Security headers grade B+
□ Žádný mixed content

MOBILE & I18N
□ Mobile-Friendly pass | □ Viewport správný
□ Hreflang reciproční (pokud multi-lang)
```

---

## Integration

```
keyword-research → seo-optimization → technical-seo
       ↓                 ↓                  ↓
  (co cílit)      (on-page SEO)    (technický základ)
                         ↓
                  analytics-setup
                         ↓
              google-analytics MCP (měření)
```

| Potřeba | Skill |
|---------|-------|
| Jaká klíčová slova cílit? | `keyword-research` |
| Jak optimalizovat obsah stránky? | `seo-optimization` |
| Web je pomalý / má technické problémy | `technical-seo` |
| Potřebuji nastavit tracking | `analytics-setup` |

---

## Official Documentation

| Téma | URL |
|------|-----|
| Core Web Vitals | [web.dev/vitals](https://web.dev/vitals/) |
| PageSpeed Insights | [developers.google.com/speed/docs/insights](https://developers.google.com/speed/docs/insights/v5/about) |
| Robots.txt | [developers.google.com/search/docs/crawling-indexing/robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro) |
| Sitemaps | [developers.google.com/search/docs/crawling-indexing/sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) |
| Structured Data | [developers.google.com/search/docs/appearance/structured-data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) |
| Schema.org | [schema.org](https://schema.org) |
| HSTS | [developer.mozilla.org/docs/Web/HTTP/Headers/Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) |
| Hreflang | [developers.google.com/search/docs/specialty/international](https://developers.google.com/search/docs/specialty/international/localized-versions) |
