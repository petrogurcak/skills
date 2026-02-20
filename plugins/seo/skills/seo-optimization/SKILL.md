---
name: seo-optimization
description: Use when optimizing websites for search engines (Google, Bing) and AI search (ChatGPT, Perplexity, Gemini) - comprehensive framework covering On-Page SEO, Technical SEO, Entity SEO, Link Building, and Generative Engine Optimization (GEO)
---

# SEO Optimization

**When to use this skill:**

- Launching new website and need SEO strategy
- Existing site has low organic traffic despite good content
- Need to improve rankings for specific keywords
- Want to appear in AI search results (ChatGPT, Perplexity)
- Building link profile and authority
- Optimizing for featured snippets and Knowledge Panel
- E-commerce SEO for product pages

**When NOT to use:**

- Writing marketing copy → use `web-copy`
- Defining value proposition → use `uvp-optimization`
- UX/conversion optimization → use `ux-optimization`
- Pricing page design → use `pricing`

---

## Quick Router

| User says...                                               | Go to...                       |
| ---------------------------------------------------------- | ------------------------------ |
| "optimize page", "on-page SEO", "keywords"                 | Phase 1: On-Page SEO           |
| "technical SEO", "crawling", "speed", "Core Web Vitals"    | Phase 2: Technical SEO         |
| "Knowledge Graph", "structured data", "schema", "entities" | Phase 3: Entity SEO            |
| "backlinks", "link building", "outreach", "authority"      | Phase 4: Link Building         |
| "AI search", "ChatGPT", "Perplexity", "GEO"                | Phase 5: GEO (AI Optimization) |
| "full SEO audit", "complete strategy"                      | All Phases sequentially        |

---

## Core Framework: Four Pillars of SEO

```
1. RELEVANCE → Does your content match search intent?
2. CRAWLABILITY → Can search engines find and index your content?
3. ENGAGEMENT → Do users interact positively with your content?
4. AUTHORITY → Do other sites vouch for your content?
```

**Success = All four pillars working together**

---

## Phase 1: On-Page SEO (8 Tablets)

**Source:** Will Coombe "3 Months to No.1"

### Tablet 1: URL Structure

- **Rule:** Max 5 words, include primary keyword
- **Structure:** `domain.com/category/keyword-phrase`
- **Checklist:**
  - [ ] URL contains primary keyword
  - [ ] Max one subdirectory from root
  - [ ] No special characters or numbers
  - [ ] Hyphens between words (not underscores)

**Example:** `healthyliving.com/best-vegetarian-diet` ✓

### Tablet 2: Title Tags

- **Rule:** Unique title per page, keyword at start
- **Format:** `Primary Keyword | Secondary | Brand`
- **Length:** 50-60 characters
- **Checklist:**
  - [ ] Primary keyword in first 3 words
  - [ ] Unique across entire site
  - [ ] Compelling for CTR (not just keywords)

**Example:** `Vegetarian Diet Plan | Complete Guide | HealthyLiving`

### Tablet 3: Header Structure (H1-H6)

- **Rule:** One H1 per page with primary keyword
- **Structure:**
  ```
  H1: Primary keyword (only one)
  H2: Main sections (include LSI keywords)
  H3: Subsections
  H4+: Details
  ```
- **Checklist:**
  - [ ] Exactly one H1 tag
  - [ ] H1 matches/relates to title tag
  - [ ] Logical hierarchy (no skipping levels)
  - [ ] H2s contain secondary keywords

### Tablet 4: Keyword Density

- **Rule:** 1-2% density for primary keyword
- **Placement priority:**
  1. First 100 words
  2. Last 100 words
  3. At least one H2
  4. Naturally throughout
- **Warning:** Over-optimization penalty at >3%

### Tablet 5: LSI Keywords (Latent Semantic Indexing)

- **Rule:** Include related terms to establish topical authority
- **How to find:**
  - Google "related searches" at bottom of SERP
  - Google autocomplete suggestions
  - People Also Ask boxes
  - Tools: LSIGraph, Clearscope, SurferSEO
- **Checklist:**
  - [ ] 5-10 LSI terms per 1000 words
  - [ ] Used naturally in context
  - [ ] Included in H2/H3 where relevant

### Tablet 6: Images & Alt Tags

- **Rule:** Filename = Alt tag = descriptive keyword
- **Checklist:**
  - [ ] First image alt = exact primary keyword
  - [ ] Other images = descriptive (not keyword-stuffed)
  - [ ] Filename matches alt tag
  - [ ] Images compressed (<100KB ideally)
  - [ ] WebP format preferred

**Example:** `vegetarian-diet-foods.webp` with alt="vegetarian diet foods"

### Tablet 7: Outbound Links

- **Rule:** Link to 1-2 authoritative external sources
- **Requirements:**
  - High authority sites (Wikipedia, .gov, .edu, industry leaders)
  - NOT direct competitors
  - Relevant to content topic
- **Checklist:**
  - [ ] 1-2 outbound links per article
  - [ ] Links to authoritative sources
  - [ ] Opens in new tab
  - [ ] Adds value for reader

### Tablet 8: Topic Relevance (Internal Linking)

- **Rule:** Create 3-4 supporting articles linking to main page
- **Strategy:**
  - Main page targets primary keyword
  - Supporting pages target related long-tail keywords
  - All supporting pages link to main page
- **Example:**
  - Main: "Vegetarian Diet"
  - Supporting: "10 Famous Vegetarians", "Weight Loss Tricks", "Vegetarian Recipes"
  - All link back to main page

---

## Phase 2: Technical SEO

### Core Web Vitals Checklist

- [ ] **LCP (Largest Contentful Paint):** <2.5s
- [ ] **FID (First Input Delay):** <100ms
- [ ] **CLS (Cumulative Layout Shift):** <0.1

### Crawlability Checklist

- [ ] robots.txt allows important pages
- [ ] XML sitemap submitted to Search Console
- [ ] No orphan pages (all pages linked internally)
- [ ] Canonical tags on duplicate content
- [ ] Hreflang for multi-language sites
- [ ] HTTPS enabled (no mixed content)

### Mobile Optimization

- [ ] Mobile-first indexing ready
- [ ] Responsive design (not separate mobile site)
- [ ] Touch targets min 48x48px
- [ ] No horizontal scrolling
- [ ] Font size min 16px

### Page Speed Checklist

- [ ] Images optimized (WebP, lazy loading)
- [ ] CSS/JS minified
- [ ] Browser caching enabled
- [ ] CDN for static assets
- [ ] Critical CSS inlined
- [ ] Defer non-critical JavaScript

---

## Phase 3: Entity SEO

**Source:** Dixon Jones "Entity SEO"

### Core Concept

**Shift from "strings" (keywords) to "things" (entities)**

Entity SEO helps Google understand WHO you are, WHAT you do, and HOW you relate to other entities in the Knowledge Graph.

### Knowledge Graph Fundamentals

**Semantic Triples:** Subject → Predicate → Object

- "Freddie Mercury" → "is member of" → "Queen"
- "Your Brand" → "provides" → "SEO Services"

**Deduction:** Google derives new facts from existing relationships

- If: "Freddie Mercury is in Queen" AND "Queen is a rock band"
- Then: "Freddie Mercury is a rock musician"

### Building Your Entity

**Step 1: Check if Google knows you**

```
Use Knowledge Graph Search API:
https://kgsearch.googleapis.com/v1/entities:search?query=YOUR_BRAND&key=API_KEY
```

If you have an ID (e.g., `kg:/m/012g06h`), use it in structured data.

**Step 2: Establish Entity Home**

- One authoritative page that defines your entity
- Usually your About page or homepage
- Contains comprehensive, consistent information

**Step 3: Trusted Seeds Strategy**
| Source | Impact | Difficulty |
|--------|--------|------------|
| Wikipedia | Very High | Very Hard |
| Wikidata | High | Medium |
| Industry directories | Medium | Easy |
| News mentions | Medium | Medium |
| Social profiles | Low | Easy |

**"Affiliation Strategy":** If you can't get your own Wikipedia page, get mentioned on pages of entities you're connected to (employers, partners, associations).

**Step 4: Digital Assets Creation**

- [ ] Publish book with ISBN
- [ ] Create YouTube channel (linked to brand)
- [ ] IMDB listing (if applicable)
- [ ] Podcast on major platforms
- [ ] LinkedIn company page
- [ ] Crunchbase profile (for startups)

### Structured Data Implementation (JSON-LD)

**Required for Entity SEO:**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Brand",
  "url": "https://yourbrand.com",
  "logo": "https://yourbrand.com/logo.png",
  "sameAs": [
    "https://twitter.com/yourbrand",
    "https://linkedin.com/company/yourbrand",
    "https://www.wikidata.org/wiki/Q123456"
  ],
  "founder": {
    "@type": "Person",
    "name": "Founder Name",
    "sameAs": "https://www.wikidata.org/wiki/Q789"
  }
}
```

**Schema types by page:**
| Page Type | Schema |
|-----------|--------|
| Homepage | Organization, WebSite |
| About | Organization, Person |
| Product | Product, Offer |
| Article | Article, NewsArticle |
| FAQ | FAQPage |
| How-to | HowTo |
| Event | Event |
| Local Business | LocalBusiness |

### Internal Link Graph (Siloing)

**Structure content into topical clusters:**

```
Pillar Page (main topic)
├── Cluster 1: Subtopic A
│   ├── Article 1.1
│   ├── Article 1.2
│   └── Article 1.3
├── Cluster 2: Subtopic B
│   ├── Article 2.1
│   └── Article 2.2
```

**Rules:**

- All cluster articles link to pillar page
- Cluster articles interlink within cluster
- Pillar pages link to each other sparingly
- Use descriptive anchor text (not "click here")

### SEU Metric (Search Engine Understanding)

**Goal:** Maximize Google's ability to extract entities from your content.

**Checklist:**

- [ ] Clear, unambiguous language
- [ ] Entities explicitly named (not just pronouns)
- [ ] Relationships stated clearly
- [ ] Structured data matches content
- [ ] Consistent naming across site

---

## Phase 4: Link Building

**Source:** Eric Ward & Garrett French "Ultimate Guide to Link Building"

### Core Philosophy: Value Exchange

**"There is no trick in SEO"** - Every quality link requires exchanging value.

**Five Currencies:**

1. **Time:** Manual outreach, finding broken links, relationship building
2. **Money:** Sponsorships, paid directories, scholarships
3. **Community:** Leveraging existing relationships and networks
4. **Expertise:** Guest posting, interviews, expert roundups
5. **Information:** Creating linkable assets (most scalable)

### Linkable Assets (Content Worth Linking To)

| Asset Type           | Example                          | Link Potential |
| -------------------- | -------------------------------- | -------------- |
| Original Research    | Survey data, studies             | Very High      |
| Tools/Calculators    | ROI calculator, quiz             | Very High      |
| Comprehensive Guides | "Ultimate Guide to X"            | High           |
| Data Visualization   | Infographics, interactive charts | High           |
| Templates/Downloads  | Spreadsheets, checklists         | Medium         |
| Expert Roundups      | "50 Experts on X"                | Medium         |
| Resource Lists       | Curated tool lists               | Medium         |

### Preciprocation Strategy

**Give value BEFORE asking for anything:**

1. Link to their content first
2. Share their content on social
3. Leave thoughtful comments
4. Offer genuinely helpful feedback
5. THEN reach out for collaboration

### Prospecting Techniques

**Step 1: Define Market Keywords (MDKW)**

- Generic industry terms (not buying keywords)
- Example: "kayaking" not "buy kayak"

**Step 2: Use Search Operators**

| Opportunity Type | Search Query                                   |
| ---------------- | ---------------------------------------------- |
| Directories      | `[MDKW] directory`, `[MDKW] "add URL"`         |
| Guest Posts      | `[MDKW] "guest post"`, `[MDKW] "write for us"` |
| Interviews       | `[MDKW] intitle:interview`                     |
| Resource Pages   | `[MDKW] "resources"`, `[MDKW] "useful links"`  |
| Roundups         | `[MDKW] "weekly roundup"`, `[MDKW] "best of"`  |

**Advanced operators:**

- `~` for synonyms: `~health` matches health, wellness, fitness
- `-` to exclude: `kayaking -buy -shop`
- `site:` for specific domains: `site:edu [MDKW]`

### Broken Link Building (Process)

1. **Find resource pages:**

   ```
   [MDKW] intitle:resources inurl:links
   ```

2. **Scrape all outbound links** (use Screaming Frog or similar)

3. **Check for 404s** (URL Status Checker)

4. **Create replacement content** (or identify existing content)

5. **Outreach:**

**Email Template:**

```
Subject: Broken link on your [Topic] resources page

Hi [Name],

I was reading your excellent resource page on [Topic] and noticed
that the link to [Broken Resource] is no longer working.

I recently published a comprehensive guide on [Similar Topic] that
could serve as a replacement: [Your URL]

Either way, thought you'd want to know about the broken link!

Best,
[Name]
```

### Link Opportunity Qualifiers

**Automated checks:**

- [ ] Domain Authority > 30
- [ ] Page has < 100 outbound links
- [ ] Site is regularly updated
- [ ] No spammy ads/content

**Manual checks:**

- [ ] Actual topical relevance
- [ ] Human-written content (not AI spam)
- [ ] Active social presence
- [ ] Editorial standards visible
- [ ] Contact information available

### Outreach Email Principles

1. **Personalization:** Reference specific content they created
2. **Value first:** Lead with what you can offer them
3. **Brevity:** 3-5 sentences max
4. **Clear ask:** One specific request
5. **Easy action:** Provide exact URL, suggested anchor text

**Interview Request Template:**

```
Subject: Can I interview you for [Publication/Roundup]?

Hi [Name],

I'm putting together [type of content] on [Topic] and would love
to include your perspective.

Questions (only need 2-3 sentences each):
1. What's your background in [field]?
2. What's the hardest skill to learn in [field]?
3. [Topic-specific question]?

Deadline: [Date]

I'll also be considering your recent article [URL] for our weekly
roundup.

Thanks!
[Name]
```

---

## Phase 5: Generative Engine Optimization (GEO)

**For AI Search: ChatGPT, Perplexity, Google AI Overviews, Claude**

### Why GEO Matters

- 40% of Gen Z uses TikTok/AI instead of Google for search
- AI assistants increasingly answer queries directly
- Being cited by AI = massive visibility boost
- Traditional SEO ≠ automatic AI visibility

### GEO Tactics (Princeton Study Results)

| Tactic                   | Improvement | Implementation                             |
| ------------------------ | ----------- | ------------------------------------------ |
| **Cite Sources**         | +30-40%     | Add references: "According to [Source]..." |
| **Add Statistics**       | +30-40%     | Include numbers: "73% of users prefer..."  |
| **Add Quotations**       | +30-40%     | Expert quotes: "As [Expert] notes, '...'"  |
| **Fluency Optimization** | +15-20%     | Clear, well-structured prose               |
| **Technical Terms**      | +10-15%     | Use industry-specific vocabulary           |
| **Authoritative Tone**   | +10-15%     | Confident, expert voice                    |

### GEO Content Checklist

- [ ] **Cite credible sources** (studies, official data, experts)
- [ ] **Include specific statistics** with sources
- [ ] **Add expert quotations** (named, credentialed)
- [ ] **Use clear structure** (headers, lists, tables)
- [ ] **Answer questions directly** (no fluff before answer)
- [ ] **Define terms** when first used
- [ ] **Provide examples** for abstract concepts
- [ ] **Update regularly** (AI prefers fresh content)

### Entity Optimization for AI

**Kalicube Process:**

1. **Entity Home:** Establish authoritative page about you/brand
2. **Corroboration:** Get consistent mentions across trusted sources
3. **Signposting:** Use structured data to make relationships explicit

**AI Knowledge Sources:**

- Wikipedia/Wikidata (primary)
- Major news outlets
- Academic papers
- Official company pages
- Industry databases

### Content Format for AI Citation

**Best formats:**

```
Direct Answer Pattern:
"[Topic] is [clear definition]. According to [Source],
[supporting statistic]. For example, [concrete example]."

List Pattern:
"The main factors include:
1. [Factor 1] - [brief explanation]
2. [Factor 2] - [brief explanation]
3. [Factor 3] - [brief explanation]"

Comparison Pattern:
"[Option A] differs from [Option B] in three ways:
| Aspect | Option A | Option B |
|--------|----------|----------|
| [Aspect 1] | [Detail] | [Detail] |"
```

### AEO (Answer Engine Optimization)

**For Featured Snippets & Voice Search:**

1. **Question-Answer Format:**
   - Use exact question as H2
   - Provide concise answer in first 40-60 words
   - Expand with details below

2. **Definition Boxes:**

   ```
   What is [Term]?
   [Term] is [clear 1-2 sentence definition].
   ```

3. **List Snippets:**
   - Numbered lists for processes
   - Bullet points for features/benefits
   - Keep items parallel in structure

4. **Table Snippets:**
   - Comparison tables
   - Specification tables
   - Pricing tables

---

## E-E-A-T Framework

**Source:** The Art of SEO (4th Edition)

### Components

| Letter | Meaning               | Description                      |
| ------ | --------------------- | -------------------------------- |
| E      | **Experience**        | First-hand experience with topic |
| E      | **Expertise**         | Formal knowledge/credentials     |
| A      | **Authoritativeness** | Industry recognition             |
| T      | **Trustworthiness**   | Site reliability and honesty     |

### YMYL (Your Money Your Life)

**Extra scrutiny for topics affecting:**

- Health and safety
- Financial information
- Legal advice
- News and current events
- Shopping/transactions
- Groups of people

### E-E-A-T Implementation Checklist

**Experience:**

- [ ] Author has demonstrated experience (case studies, examples)
- [ ] First-person accounts where relevant
- [ ] "Tested and reviewed" content

**Expertise:**

- [ ] Author bios with credentials
- [ ] Qualifications stated clearly
- [ ] Expert contributors credited

**Authoritativeness:**

- [ ] Backlinks from authoritative sources
- [ ] Mentions in industry publications
- [ ] Awards and recognition displayed
- [ ] Association memberships shown

**Trustworthiness:**

- [ ] Clear contact information
- [ ] Physical address (if applicable)
- [ ] Privacy policy
- [ ] Terms of service
- [ ] HTTPS enabled
- [ ] References to authoritative sources
- [ ] Transparent editorial process
- [ ] Corrections policy

### Content Audit for E-E-A-T

1. **Remove thin content** (pages with little value)
2. **Add author information** to all articles
3. **Update outdated content** (especially YMYL)
4. **Add credentials** where relevant
5. **Link to authoritative sources**
6. **Remove or nofollow low-quality links**

---

## Complete SEO Checklist

### Pre-Launch

- [ ] Keyword research completed
- [ ] Site architecture planned (siloing)
- [ ] Technical SEO baseline set
- [ ] Structured data implemented
- [ ] Core Web Vitals passing

### On-Page (Per Page)

- [ ] URL optimized (Tablet 1)
- [ ] Title tag optimized (Tablet 2)
- [ ] Headers structured (Tablet 3)
- [ ] Keyword density 1-2% (Tablet 4)
- [ ] LSI keywords included (Tablet 5)
- [ ] Images optimized (Tablet 6)
- [ ] Outbound links added (Tablet 7)
- [ ] Internal links added (Tablet 8)

### Entity SEO

- [ ] Organization schema implemented
- [ ] Entity home page created
- [ ] Wikidata entry (if eligible)
- [ ] Consistent NAP across web
- [ ] sameAs links to social profiles

### Link Building (Ongoing)

- [ ] Linkable assets created
- [ ] Outreach list built
- [ ] Broken link opportunities identified
- [ ] Competitor backlinks analyzed
- [ ] Monthly outreach cadence

### GEO

- [ ] Statistics added to key pages
- [ ] Expert quotes included
- [ ] Sources cited
- [ ] Direct answers to common questions
- [ ] Structured for AI extraction

### Monitoring

- [ ] Google Search Console connected
- [ ] Google Analytics 4 set up
- [ ] Rank tracking tool configured
- [ ] Monthly audit scheduled

---

## Metrics & KPIs

### Traditional SEO

| Metric             | Tool               | Target                     |
| ------------------ | ------------------ | -------------------------- |
| Organic Traffic    | GA4                | ↑ Month over month         |
| Keyword Rankings   | Ahrefs/SEMrush     | Top 10 for target keywords |
| Click-Through Rate | GSC                | > Industry average         |
| Core Web Vitals    | PageSpeed Insights | All green                  |
| Backlink Growth    | Ahrefs             | Steady increase            |

### GEO/AI Metrics

| Metric             | How to Track                            |
| ------------------ | --------------------------------------- |
| AI Citation        | Search your brand in ChatGPT/Perplexity |
| Knowledge Panel    | Search your brand in Google             |
| Featured Snippets  | Track in GSC or rank tracker            |
| Entity Recognition | Knowledge Graph API                     |

### Product-Led SEO Metrics (Eli Schwartz)

```
Impressions → Clicks → Conversions
(visibility)   (interest)  (business result)
```

Focus on conversions, not just rankings.

---

## Common Mistakes

1. **Keyword stuffing** → Use 1-2% density, include LSI
2. **Ignoring technical SEO** → Fix crawl errors first
3. **Buying links** → Build genuine relationships
4. **Thin content** → Comprehensive > frequent
5. **Ignoring E-E-A-T** → Critical for YMYL topics
6. **Not tracking results** → Set up GSC + GA4 first
7. **Optimizing for rankings only** → Focus on conversions
8. **Ignoring AI search** → Implement GEO tactics
9. **One-time optimization** → SEO is ongoing
10. **No internal linking** → Build topic clusters

---

## Related Skills

- **Before SEO:** Market research, keyword research
- **During SEO:** This skill
- **Content writing:** `web-copy`
- **UX optimization:** `ux-optimization`
- **Conversion:** `uvp-optimization`, `pricing`

---

## Resources

### Books Referenced

- "3 Months to No.1" - Will Coombe
- "Entity SEO" - Dixon Jones
- "Product-Led SEO" - Eli Schwartz
- "The Art of SEO" (4th Edition)
- "Ultimate Guide to Link Building" - Eric Ward & Garrett French

### Tools

- **Technical:** Screaming Frog, PageSpeed Insights
- **Research:** Ahrefs, SEMrush, Moz
- **Tracking:** Google Search Console, GA4
- **Schema:** Schema.org, Google Structured Data Testing
- **AI Check:** ChatGPT, Perplexity (for citation testing)

### Key Experts

- Jason Barnard (Entity SEO, Kalicube)
- Dixon Jones (Knowledge Graph)
- Eli Schwartz (Product-Led SEO)
- Britney Muller (Technical SEO)
- Rand Fishkin (General SEO strategy)

---

**Remember: SEO is a marathon, not a sprint. Focus on providing genuine value, and rankings will follow.**
