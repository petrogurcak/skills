---
name: technical-seo
description: "Audits and sets up technical SEO foundations covering Core Web Vitals (LCP, INP, CLS), crawlability (robots.txt, sitemaps, canonicals), security headers, and mobile-first optimization, with automated audits via claude-in-chrome. Use when auditing for technical SEO issues, setting up technical foundation, fixing Core Web Vitals, or debugging crawlability issues. Trigger phrases: 'technical SEO audit', 'Core Web Vitals', 'robots.txt', 'page speed', 'crawlability', 'security headers'. NOT for structured data (use schema-markup), international/hreflang (use hreflang-i18n), on-page content (use on-page-seo), or keyword research (use keyword-research)."
metadata:
  author: Petr
  version: 2.0.0
---

# Technical SEO

**When to use this skill:**

- Auditing existing website for technical SEO issues
- Setting up correct technical foundation for new website
- Fixing Core Web Vitals problems
- Debugging crawlability issues

**When NOT to use:**

- Structured data / JSON-LD → use `schema-markup`
- International SEO / hreflang → use `hreflang-i18n`
- On-page content optimization → use `on-page-seo`
- Keyword research → use `keyword-research`
- Analytics setup → use `analytics-setup`

---

## Quick Router

| User says...                                    | Go to...                 |
| ----------------------------------------------- | ------------------------ |
| "audit webu", "technické SEO check"             | Full Audit (all phases)  |
| "core web vitals", "rychlost webu", "PageSpeed" | Phase 1: Performance     |
| "robots.txt", "sitemap", "crawl"                | Phase 2: Crawlability    |
| "HTTPS", "security headers"                     | Phase 3: Security        |
| "mobile", "viewport", "responsive"              | Phase 4: Mobile          |
| "schema", "structured data"                     | → Use `schema-markup` skill |
| "hreflang", "international"                     | → Use `hreflang-i18n` skill |

---

## Modes

**Audit Mode:** Systematická kontrola existujícího webu, identifikace problémů
**Setup Mode:** Správná konfigurace od začátku

---

## Free Tools Stack

| Nástroj                     | Účel                             | URL                                                                                      |
| --------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| **PageSpeed Insights**      | Core Web Vitals, performance     | [pagespeed.web.dev](https://pagespeed.web.dev)                                           |
| **Google Search Console**   | Crawl errors, indexing, sitemaps | [search.google.com/search-console](https://search.google.com/search-console)             |
| **Mobile-Friendly Test**    | Mobile usability                 | [search.google.com/test/mobile-friendly](https://search.google.com/test/mobile-friendly) |
| **Security Headers**        | HTTP security headers check      | [securityheaders.com](https://securityheaders.com)                                       |
| **SSL Labs**                | HTTPS/SSL konfigurace            | [ssllabs.com/ssltest](https://www.ssllabs.com/ssltest)                                   |
| **Screaming Frog**          | Crawl webu (500 URL free)        | [screamingfrog.co.uk](https://www.screamingfrog.co.uk)                                   |
| **Lighthouse**              | Audit v Chrome DevTools          | Built-in Chrome                                                                          |

---

## Phase 1: Performance (Core Web Vitals)

### Metriky

| Metrika                             | Co měří          | Dobrá  | Potřebuje zlepšení | Špatná |
| ----------------------------------- | ---------------- | ------ | ------------------ | ------ |
| **LCP** (Largest Contentful Paint)  | Loading speed    | <2.5s  | 2.5-4s             | >4s    |
| **INP** (Interaction to Next Paint) | Interactivity    | <200ms | 200-500ms          | >500ms |
| **CLS** (Cumulative Layout Shift)   | Visual stability | <0.1   | 0.1-0.25           | >0.25  |

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

| Problém    | Řešení                                                      |
| ---------- | ----------------------------------------------------------- |
| Vysoké LCP | Optimalizuj hero image, preload, CDN                        |
| Vysoké INP | Rozděl long tasks, defer non-critical JS                    |
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

| Prvek                | Účel                      | Soubor/Tag               |
| -------------------- | ------------------------- | ------------------------ |
| **robots.txt**       | Řízení crawlerů           | `/robots.txt`            |
| **XML Sitemap**      | Mapa stránek pro indexaci | `/sitemap.xml`           |
| **Canonical**        | Určení primární URL       | `<link rel="canonical">` |
| **Meta robots**      | Indexace per-page         | `<meta name="robots">`   |
| **Internal linking** | Distribuce link equity    | `<a href>`               |

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

| Chyba                            | Dopad                  | Fix                      |
| -------------------------------- | ---------------------- | ------------------------ |
| Blokovaný CSS/JS v robots        | Broken rendering       | Allow /assets/           |
| Sitemap s 404/redirects          | Crawl budget waste     | Pouze 200 OK URL         |
| Self-referencing canonical chybí | Duplicate content risk | Přidej na každou stránku |
| noindex + canonical              | Conflicting signals    | Vyber jedno              |

---

## Structured Data

→ Moved to dedicated `schema-markup` skill. See that skill for JSON-LD implementation, validation, video schema, deprecations, and AI visibility.

---

## Phase 3: Security

### HTTPS Checklist

- [ ] Platný SSL certifikát
- [ ] HTTP → HTTPS redirect (301)
- [ ] Žádný mixed content (HTTP resources na HTTPS stránce)
- [ ] HSTS header aktivní
- [ ] Certifikát pokrývá všechny subdomény (pokud potřeba)

### Security Headers

| Header                        | Účel                     | Doporučená hodnota                    |
| ----------------------------- | ------------------------ | ------------------------------------- |
| **Strict-Transport-Security** | Force HTTPS              | `max-age=31536000; includeSubDomains` |
| **X-Content-Type-Options**    | MIME sniffing prevention | `nosniff`                             |
| **X-Frame-Options**           | Clickjacking prevention  | `SAMEORIGIN`                          |
| **Content-Security-Policy**   | XSS prevention           | Dle aplikace                          |
| **Referrer-Policy**           | Referrer control         | `strict-origin-when-cross-origin`     |
| **Permissions-Policy**        | Feature restrictions     | Dle potřeby                           |

### Hodnocení (securityheaders.com)

| Grade  | Status               |
| ------ | -------------------- |
| A+ / A | Výborné              |
| B      | Dobré, minor issues  |
| C-D    | Potřebuje zlepšení   |
| F      | Kritické, nutná akce |

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

## Phase 4: Mobile

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
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### Internationalization (hreflang)

→ Moved to dedicated `hreflang-i18n` skill for implementation, validation, cross-domain, and country targeting.

---

## Full Audit Checklist

```
PERFORMANCE
□ LCP < 2.5s | □ INP < 200ms | □ CLS < 0.1
□ PageSpeed > 90 desktop, > 70 mobile

CRAWLABILITY
□ robots.txt validní | □ sitemap.xml v robots
□ Canonical na všech stránkách | □ Žádné broken links

SECURITY
□ HTTPS + redirect | □ Security headers grade B+
□ Žádný mixed content

MOBILE
□ Mobile-Friendly pass | □ Viewport správný
□ Touch targets ≥ 48x48px | □ Mobile PageSpeed > 70

See also:
□ Structured data → schema-markup skill
□ Hreflang / international SEO → hreflang-i18n skill
```

---

## Integration

```
keyword-research → on-page-seo → technical-seo
       ↓               ↓               ↓
  (co cílit)    (on-page SEO)   (technický základ)
                                       ↓
                              schema-markup (structured data)
                              hreflang-i18n (international)
                                       ↓
                               analytics-setup
                                       ↓
                           google-analytics MCP (měření)
```

| Potřeba                               | Skill              |
| ------------------------------------- | ------------------ |
| Jaká klíčová slova cílit?             | `keyword-research` |
| Jak optimalizovat obsah stránky?      | `on-page-seo`      |
| Web je pomalý / má technické problémy | `technical-seo`    |
| Structured data / JSON-LD             | `schema-markup`    |
| International SEO / hreflang          | `hreflang-i18n`    |
| Potřebuji nastavit tracking           | `analytics-setup`  |

---

## Official Documentation

| Téma               | URL                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Core Web Vitals    | [web.dev/vitals](https://web.dev/vitals/)                                                                                                                    |
| PageSpeed Insights | [developers.google.com/speed/docs/insights](https://developers.google.com/speed/docs/insights/v5/about)                                                      |
| Robots.txt         | [developers.google.com/search/docs/crawling-indexing/robots](https://developers.google.com/search/docs/crawling-indexing/robots/intro)                       |
| Sitemaps           | [developers.google.com/search/docs/crawling-indexing/sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)                |
| HSTS               | [developer.mozilla.org/docs/Web/HTTP/Headers/Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security) |

_See also: `schema-markup` skill for Structured Data docs. `hreflang-i18n` skill for Hreflang / International SEO docs._
