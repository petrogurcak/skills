---
name: competitor-pages
description: "Creates high-converting X vs Y competitor comparison pages and alternative pages for SEO. Covers URL/title patterns, content structure, schema markup (Product + ItemList + FAQPage), fairness guidelines, table design for featured snippets, hub-and-spoke internal linking, programmatic generation at scale, and conversion optimization. Use when creating comparison landing pages, building 'alternatives to X' pages, or scaling competitor content programmatically. Trigger phrases: 'X vs Y', 'competitor comparison', 'comparison page', 'alternatives page', 'versus page'. NOT for general content optimization (use on-page-seo) or full programmatic SEO infrastructure (use programmatic-seo)."
---

# Competitor Pages

Comparison pages ("X vs Y") are among the highest-ROI content investments in SaaS SEO. They capture users at the moment of decision — bottom-of-funnel visitors actively evaluating tools. Real data (Backstage SEO, ~50 pages): 1,000-2,000 organic visits/month, 5-10% conversion, ~172% ROI at $7,000 LTV.

This skill covers the full playbook: URL patterns, content structure, schema markup, fairness, table design, internal linking, programmatic generation, and conversion optimization.

**Related skills:**
- `schema-markup` — for JSON-LD implementation and validation details
- `programmatic-seo` — for full pSEO infrastructure beyond comparison clusters
- `on-page-seo` — for general content optimization

---

## Phase 1: URL & Title Patterns

### URL Structure

Use a dedicated `/compare/` subfolder. This creates a clean cluster that signals topical authority and makes internal linking systematic.

| Pattern | Example | Use when |
|---|---|---|
| `/compare/x-vs-y/` | `/compare/hubspot-vs-salesforce/` | Standard 1v1 comparison (recommended) |
| `/compare/x-vs-y-vs-z/` | `/compare/notion-vs-coda-vs-confluence/` | Three-way comparison |
| `/alternatives/y-alternatives/` | `/alternatives/salesforce-alternatives/` | "Alternatives to Y" intent |
| `/x-vs-y/` | `/hubspot-vs-salesforce/` | Flat structure (acceptable, less organized) |

The `/compare/` subfolder is the consensus recommendation (Rock The Rankings). It houses all spokes under one hub, enables breadcrumb schema, and makes the linking architecture obvious.

### Title Tag Formula

```
Primary keyword first + differentiating angle + year

"X vs Y: [Key Differentiator] Compared [Year]"
"X vs Y: Which Is Better for [Use Case]? [Year]"
"X vs Y Comparison [Year]: [Key Angle]"
```

**Examples:**
- "HubSpot vs Salesforce: Features & Pricing Compared 2026"
- "Notion vs Coda: Which Fits Your Team in 2026?"
- "Zapier vs Make: Automation Platform Comparison 2026"

**Rules:**
- Primary keyword ("X vs Y") goes first — strongest ranking signal
- Keep under ~60 characters
- Add the year — Google favors fresh content, year signals current information
- H1 must match or closely mirror the title tag
- Meta description: include both product names, key differentiator, and a benefit ("See pricing, features, and which is right for your team")

---

## Phase 2: Content Structure

### Full Page Anatomy

Top-ranking comparison pages follow a consistent structure. Deviate from this deliberately, not accidentally.

```
1. HERO / INTRO
   H1: "X vs Y: [angle]"
   2-3 sentence summary with verdict teaser
   "Quick answer" box (targets featured snippet for head query)

2. COMPARISON TABLE (above the fold or near top)
   Side-by-side feature matrix
   Pricing row
   G2/Capterra ratings row
   Visual checkmarks vs X marks

3. DETAILED BREAKDOWN (H2 per category)
   "Pricing Comparison"
   "Features & Functionality"
   "Ease of Use"
   "Integrations"
   "Customer Support"
   "Who Should Choose X" / "Who Should Choose Y"
   Each section: 150-300 words with specific data points

4. SOCIAL PROOF
   G2/Capterra ratings with source links
   Customer testimonials (switchers preferred)
   Trust badges, review counts

5. VERDICT / RECOMMENDATION
   Clear winner statement per use case
   "Choose X if..." / "Choose Y if..." format
   This is where bias toward your product is editorially acceptable

6. FAQ SECTION
   Accordion-style, 5-8 questions
   Target long-tail queries: "Is X cheaper than Y?", "Can I migrate from X to Y?"
   Use FAQPage schema (see Phase 3)

7. CTA
   Primary: "Start Free Trial" / "Book a Demo"
   Secondary: "See All Comparisons" (internal link to hub)
```

### Three Page Types

| Type | Pattern | Search volume | Depth |
|---|---|---|---|
| **One vs One** | "X vs Y" | Highest per page | Most detailed — 2,000-4,000 words |
| **One vs Many** | "X vs [A, B, C, D]" | Medium | Feature matrix across 3-5 competitors |
| **One vs All** | "Best X Alternatives" | Very high | Your product + 5-8 alternatives with short reviews |

Build One vs One pages first. They have the clearest search intent and highest conversion. Add One vs All pages for category-level traffic.

---

## Phase 3: Schema Markup

Layer multiple schema types on comparison pages. Use `<script type="application/ld+json">` in the page `<head>`.

### Primary Schema: WebPage + ItemList + Product

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "X vs Y: Complete Comparison 2026",
  "description": "Detailed comparison of X and Y covering pricing, features, ease of use, and which is right for your team.",
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": 2,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Product",
          "name": "Product X",
          "image": "https://example.com/product-x-logo.png",
          "description": "Short description of Product X and its primary use case.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.5",
            "bestRating": "5",
            "ratingCount": "1250"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "29",
            "highPrice": "299"
          }
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Product",
          "name": "Product Y",
          "image": "https://example.com/product-y-logo.png",
          "description": "Short description of Product Y and its primary use case.",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.2",
            "bestRating": "5",
            "ratingCount": "890"
          },
          "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "49",
            "highPrice": "499"
          }
        }
      }
    ]
  }
}
```

### Secondary Schema: FAQPage (separate script block)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is X cheaper than Y?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, X starts at $29/mo compared to Y's $49/mo for equivalent features. X's Pro plan at $79/mo includes API access that Y charges $149/mo for on their Business plan."
      }
    },
    {
      "@type": "Question",
      "name": "Can I migrate from Y to X?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. X offers a free migration service for Y customers. You can export your Y data as CSV and import it directly into X, or contact X's support team for assisted migration."
      }
    }
  ]
}
```

**Critical:** `aggregateRating` values must reflect actual user reviews. Pull `ratingValue` and `ratingCount` from G2 or Capterra and cite the source visibly on the page. Google's review snippet guidelines explicitly require ratings to be based on real user-generated content. Fabricated ratings risk manual action.

**Note on FAQPage:** Google restricted FAQPage rich results to government/health sites in August 2023. However, AI engines (Perplexity, ChatGPT) still read and cite FAQPage markup. Implement it for AI citation visibility even though it no longer generates Google FAQ rich snippets.

For full JSON-LD implementation details, validation workflow, and schema types reference → see `schema-markup` skill.

---

## Phase 4: Fairness Guidelines

Google's Search Quality Rater Guidelines penalize pages that exist purely to monetize without providing genuine value. Comparison pages that read as attack ads are evaluated lower for E-E-A-T.

### Rules

1. **Acknowledge competitor strengths honestly.** State where they win. "Y has better mobile UX" builds trust and makes your advantages more credible by contrast.

2. **Use verifiable data only.** Link to G2 scores, Capterra reviews, public pricing pages. Never make claims you cannot source with a URL.

3. **No FUD (Fear, Uncertainty, Doubt).** Do not claim "Y has security issues" without linking to public incidents. Unsubstantiated negatives hurt trust and invite legal risk.

4. **Include "Choose Y if..." section.** Explicitly state scenarios where the competitor is the better choice. This is the single strongest signal of editorial integrity to both users and Google.

5. **Show the last updated date.** Stale comparison data (wrong pricing, discontinued features) signals low quality. Display "Last updated: [Month Year]" prominently.

6. **Use advertorial tone, not attack-ad tone.** The best comparison pages blend persuasiveness with editorial integrity. Bias toward your product is acceptable in the verdict section — not throughout the page.

7. **Legal: nominative fair use.** Using competitor trademarks to compare products is legal (nominative fair use). Do not use competitor trademarks in a way that implies endorsement or partnership. Even with 50+ comparison pages, legal pushback is rare when content is factual (Backstage SEO real data).

### What the Best Brands Do

| Brand | Approach | Risk level |
|---|---|---|
| **G2 / Capterra** | Pure data, real reviews, neutral | Lowest — third-party credibility |
| **Zoho** | "Affordable alternative" narrative, honest feature gaps | Low |
| **Ahrefs** | Uses own tool data as unique proof | Low |
| **HubSpot** | Frames competitor features as costly add-ons | Higher — works at DR 93+, risky at lower authority |

---

## Phase 5: Table Design for Featured Snippets

Google pulls `<table>` elements for comparison featured snippets. This is one of the highest-value SERP features for "X vs Y" queries.

### Requirements

- Use actual `<table>` HTML — not CSS grids, divs, images, or embedded React components without server-side rendering
- Lead into the table with an `<h2>` subheader — Google uses the preceding heading as the snippet title
- 8-15 rows maximum (Google truncates larger tables in snippets; aim for 10-12)
- Concise cell values: "Yes/No", "$29/mo", "All plans" — not sentence-length descriptions
- Put your product in the first data column (left-to-right reading bias favors column 1)
- Icons (checkmark/X) must have underlying text Google can read — use `aria-label` or screen-reader text

### HTML Example

```html
<h2>X vs Y: Feature Comparison</h2>
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Product X</th>
      <th>Product Y</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Starting Price</td>
      <td>$29/mo</td>
      <td>$49/mo</td>
    </tr>
    <tr>
      <td>Free Plan</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>API Access</td>
      <td>All plans</td>
      <td>Enterprise only</td>
    </tr>
    <tr>
      <td>G2 Rating</td>
      <td>4.5/5 (1,250 reviews)</td>
      <td>4.2/5 (890 reviews)</td>
    </tr>
    <tr>
      <td>SSO / SAML</td>
      <td>Pro+</td>
      <td>Enterprise only</td>
    </tr>
    <tr>
      <td>Integrations</td>
      <td>500+</td>
      <td>200+</td>
    </tr>
    <tr>
      <td>Customer Support</td>
      <td>24/7 live chat (all plans)</td>
      <td>Email only (under $99/mo)</td>
    </tr>
    <tr>
      <td>Mobile App</td>
      <td>iOS + Android</td>
      <td>iOS only</td>
    </tr>
    <tr>
      <td>Data Export</td>
      <td>CSV, JSON, API</td>
      <td>CSV only</td>
    </tr>
    <tr>
      <td>Compliance</td>
      <td>SOC 2, GDPR, HIPAA</td>
      <td>SOC 2, GDPR</td>
    </tr>
  </tbody>
</table>
```

### Featured Snippet Eligibility

Your page must rank on page 1 to be eligible for featured snippets. Table featured snippets are not guaranteed — Google selects them algorithmically. The `<table>` element is necessary but not sufficient. Page authority, content relevance, and query match all factor in.

---

## Phase 6: Internal Linking — Hub-and-Spoke

### Architecture

```
/compare/                           ← HUB (lists all comparisons)
├── /compare/x-vs-competitor-a/     ← SPOKE
├── /compare/x-vs-competitor-b/     ← SPOKE
├── /compare/x-vs-competitor-c/     ← SPOKE
└── /compare/x-vs-competitor-d/     ← SPOKE

/alternatives/                      ← RELATED HUB
├── /alternatives/competitor-a-alternatives/
└── /alternatives/competitor-b-alternatives/
```

### Linking Rules

1. **Hub links to all spokes.** The `/compare/` hub page lists every comparison with a brief one-paragraph summary and links. This flows PageRank from the hub to each spoke.

2. **Each spoke links back to hub.** Use breadcrumb navigation: Home > Compare > X vs Y. Implement BreadcrumbList schema.

3. **Cross-link between spokes.** Bottom of "X vs Competitor A": "Also compare: X vs Competitor B, X vs Competitor C." This creates a web that keeps users in the cluster and distributes authority laterally.

4. **Link from feature and pricing pages.** Your `/pricing/` page and `/features/` pages should link to relevant comparison pages ("See how we compare to [Competitor]").

5. **Blog posts link to comparison pages.** Any TOFU/MOFU content that mentions a competitor should link to the relevant spoke page.

### The Core Mechanism

You cannot build external links directly to comparison pages — no publisher will link to "Your Product vs Competitor." The workaround:

```
Linkable asset (blog post, tool, research)
  → earns backlinks → builds domain authority
    → internal link → comparison page
      → converts BOFU visitors
```

Build authority through linkable content first. Then funnel that authority to comparison pages via internal links. This is why comparison page SEO requires domain authority investment — they do not earn links on their own.

---

## Phase 7: Programmatic Generation

For 10+ competitors, programmatic generation is practical. The threshold: manual creation becomes slower than building a template system.

### Data Layer

Each competitor needs structured data. Minimum schema:

```json
{
  "competitor_id": "competitor-a",
  "name": "Competitor A",
  "tagline": "The all-in-one platform for...",
  "website": "https://competitor-a.com",
  "founded": 2017,
  "hq": "San Francisco, CA",
  "pricing": {
    "starter": 29,
    "pro": 99,
    "enterprise": "custom",
    "free_plan": false,
    "free_trial_days": 14
  },
  "features": {
    "api": true,
    "sso": false,
    "mobile_app": "ios_only",
    "integrations_count": 200,
    "compliance": ["SOC2", "GDPR"]
  },
  "reviews": {
    "g2_rating": 4.3,
    "g2_count": 450,
    "capterra_rating": 4.1,
    "capterra_count": 280,
    "g2_url": "https://www.g2.com/products/competitor-a/reviews"
  },
  "unique_editorial": "Competitor A excels at...",
  "switcher_story": "Teams switching from Competitor A to X typically cite...",
  "choose_them_if": "Competitor A is the better choice if..."
}
```

### Template + Editorial Rule

Shared template generates the comparison table, schema, and page structure dynamically. But every page needs 200-400 words of unique editorial content per competitor:

- "What users say about switching from [Competitor] to [You]" — pull unique G2/Capterra quotes
- Specific use-case scenarios where each product excels
- Narrative strengths/weaknesses (not just data)

Google explicitly penalizes low-effort programmatic content where only the competitor name changes. Every page must provide distinctive value. Quality gate: would a human editor approve this page as genuinely useful?

### Quality Gate Checklist

Before publishing any programmatically generated page:

- [ ] 200+ words of unique editorial content (not from template)
- [ ] At least 2 competitor-specific review quotes with sources
- [ ] Competitor pricing verified against their live pricing page (dated)
- [ ] Feature claims verified (not extrapolated from older data)
- [ ] "Choose them if..." section is specific to this competitor's strengths
- [ ] Page passes manual editorial review (not just automated checks)

For full programmatic SEO infrastructure (keyword research, template architecture, monitoring, scaling beyond comparison pages) → see `programmatic-seo` skill.

---

## Phase 8: Conversion Optimization

Comparison pages are BOFU (bottom-of-funnel). Visitors are evaluating, not browsing. Conversion rates of 5-10% are achievable — significantly higher than blog posts (0.5-2%).

### CTA Strategy

Place CTAs at four points:

1. **After the comparison table** — user has just seen your advantages, momentum is highest
2. **After the verdict section** — user has the recommendation, give them the next action
3. **Sticky CTA bar** — stays visible on scroll for users who scan rather than read
4. **End-of-page CTA** — for users who read everything, these are highest-intent visitors

**CTA copy hierarchy:**
- "Start Free Trial" (no credit card) > "Book a Demo" > "Get Started"
- Free trial beats demo on comparison pages because the user is already educated — they don't need sales, they need access

### Conversion Elements

| Element | Placement | Impact |
|---|---|---|
| Switcher testimonials | Near CTAs | Addresses "will this work for someone like me?" |
| G2/Capterra badges | Above fold + near CTAs | Third-party trust signal |
| Review count ("1,250+ reviews") | Near ratings | Social proof via volume |
| Security badges | Near signup/form | Reduces anxiety |
| Migration guide link | After verdict | Addresses switching cost objection |
| "Used by X companies" | Hero section | Authority signal |

### Switcher Testimonials

The highest-converting testimonial format for comparison pages:

> "We switched from [Competitor] to [Your Product] in March. The migration took two hours. We're saving $400/mo and our team actually uses the integrations now."
> — [Name], [Title] at [Company]

Source these from customer success teams, G2 reviews filtered by "switched from [competitor]", or dedicated switching surveys.

### ROI Math Example

Communicate the switching value in concrete numbers. Example block to include after verdict:

```
At 500 users:
  Competitor Y: $99/user/mo = $49,500/mo = $594,000/yr
  Product X:    $49/user/mo = $24,500/mo = $294,000/yr
  Annual savings: $300,000
```

The more specific the math, the higher the conversion. Generic "save money" claims do nothing. Exact numbers at a named scale convert.

### Tracking Setup

Instrument every comparison page with:

- **Scroll depth** — are users reaching the CTAs? (50%, 75%, 90% events)
- **CTA click-through rate** — by placement (table CTA vs verdict CTA vs sticky)
- **Conversion rate by competitor page** — which competitors drive best leads and highest LTV
- **Time on page** — engagement signal, also correlates with search quality signals
- **Exit intent** — where do non-converting users leave?

Review by-competitor data monthly. Some competitor pages will convert 3x better than others — that intelligence informs your positioning and sales enablement.

---

## Quick Reference

| Decision | Answer |
|---|---|
| URL pattern | `/compare/x-vs-y/` with `/compare/` hub |
| Page length | 2,000-4,000 words for 1v1 |
| Table rows | 8-15 (aim for 10-12) |
| Table HTML | `<table>` element (not CSS grid) |
| Schema types | WebPage + ItemList + Product + AggregateRating + FAQPage |
| Rating source | G2 or Capterra only (must be real) |
| Unique editorial | 200-400 words per programmatic page |
| CTA type | Free trial > demo on BOFU pages |
| Expected conversion | 5-10% |

---

## Sources

- Rock The Rankings: Competitor Comparison Landing Pages
- Backstage SEO: B2B SaaS Comparison Pages Complete Guide (~50 pages real data)
- Foundation Inc: The Power of Comparison Pages in SaaS
- Google Search Quality Rater Guidelines
- Google: Review Snippet Structured Data guidelines
- Backlinko: Featured Snippets Guide
