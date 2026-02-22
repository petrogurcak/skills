---
name: competitive-analysis
description: Analyzes competitors systematically covering landscape mapping, messaging comparison, feature matrices, content gap analysis, positioning strategy, and battlecard creation. Use when entering a new market, comparing positioning against competitors, building feature comparison matrices, creating sales battlecards, identifying content gaps, or preparing competitive pitch slides. Trigger phrases include "who are my competitors", "competitive landscape", "feature comparison", "battlecard". NOT for defining your own value proposition (use uvp-optimization), creating offers (use offer-creation), setting pricing (use pricing), or writing copy (use web-copy).
metadata:
  author: Petr
  version: 1.0.0
---

# Competitive Analysis

## Overview

Systematic framework for analyzing competitors and turning insights into strategic advantage. Designed for solopreneurs and small teams who need actionable competitive intelligence without enterprise overhead.

**Announce:** "I'm using competitive-analysis to [map competitive landscape / compare messaging / build feature matrix / create battlecards]."

## When to Use

**USE this skill:**

- Entering new market or launching new product
- Comparing your positioning against competitors
- Building feature comparison matrix
- Creating sales battlecards
- Identifying content gaps and opportunities
- Analyzing competitor messaging and positioning
- Preparing pitch deck competitive slide
- "Who are my competitors and how do I differentiate?"

**DON'T use this skill:**

- Defining your own value proposition → `uvp-optimization`
- Creating your offer → `offer-creation`
- Setting pricing → `pricing`
- Writing competitive copy → `web-copy`
- Growth experiments → `growth-hacking`

---

## Quick Router

| Situation                                      | Phase to Start                |
| ---------------------------------------------- | ----------------------------- |
| "I don't know who my competitors are"          | Phase 1: Landscape Mapping    |
| "I know competitors but need to research them" | Phase 2: Research             |
| "I need to compare messaging/positioning"      | Phase 3: Messaging Comparison |
| "I need feature comparison"                    | Phase 4: Feature Matrix       |
| "Where are content opportunities?"             | Phase 5: Content Gap Analysis |
| "How do I position against them?"              | Phase 6: Positioning Strategy |
| "I need sales materials vs competitors"        | Phase 7: Battlecards          |
| "What trends should I watch?"                  | Phase 8: Market Trends        |

---

## Phase 1: Competitive Landscape Mapping

**Goal:** Identify and categorize all relevant competitors.

### Step 1.1: Identify Competitors

**Three categories:**

| Category     | Definition                       | Example (Menu Editor)              |
| ------------ | -------------------------------- | ---------------------------------- |
| **Direct**   | Same solution, same audience     | Other restaurant menu SaaS tools   |
| **Indirect** | Different solution, same problem | PDF menu builders, design agencies |
| **Adjacent** | Same audience, different problem | POS systems, reservation tools     |

**Where to find competitors (solopreneur-friendly):**

| Source                 | What to Look For                                 |
| ---------------------- | ------------------------------------------------ |
| Google Search          | Top 20 results for your main keywords            |
| Google Ads             | Who's paying for your keywords (use "Ads" label) |
| Product Hunt           | Search your category, sort by votes              |
| G2 / Capterra          | Category listings, reviews, alternatives         |
| AlternativeTo          | "Alternatives to [competitor]"                   |
| Reddit / forums        | "What do you use for [problem]?" threads         |
| App Store / Play Store | Category search, "similar apps"                  |
| LinkedIn               | Company pages, employee count, growth signals    |
| Crunchbase (free tier) | Funding, team size, basic financials             |

**Czech market sources:**

| Source          | URL             | What to Look For                      |
| --------------- | --------------- | ------------------------------------- |
| Firmy.cz        | firmy.cz        | Category listings, reviews            |
| HledejFirmu     | hledejfirmu.cz  | Company profiles, industry            |
| Startupjobs.cz  | startupjobs.cz  | Czech startups in your space          |
| CzechCrunch     | czechcrunch.cz  | Startup news, funding rounds          |
| Czech Invest    | czechinvest.org | Startup ecosystem, reports            |
| Oborove portaly | varies          | Industry-specific directories         |
| Zivefirmy.cz    | zivefirmy.cz    | Company financial data                |
| Justice.cz      | or.justice.cz   | Official company registry, financials |

### Step 1.2: Competitor Roster

**Create this table for every identified competitor:**

```markdown
| #   | Competitor | Category | URL | Founded | Team Size | Pricing | Target Audience | Key Differentiator |
| --- | ---------- | -------- | --- | ------- | --------- | ------- | --------------- | ------------------ |
| 1   |            | Direct   |     |         |           |         |                 |                    |
| 2   |            | Direct   |     |         |           |         |                 |                    |
| 3   |            | Indirect |     |         |           |         |                 |                    |
| 4   |            | Adjacent |     |         |           |         |                 |                    |
```

**Prioritize:** Focus deep research on top 3-5 direct competitors. Track the rest loosely.

### Step 1.3: Positioning Map (2x2 Matrix)

**Goal:** Visualize where you stand relative to competitors.

**Choose 2 axes that matter most to YOUR customers:**

Common axis pairs:

- Price vs. Feature depth
- Ease of use vs. Power
- Generalist vs. Specialist
- Self-serve vs. Full-service
- Local focus vs. Global

**Template:**

```
                    HIGH [Axis Y]
                         |
           Quadrant 2    |    Quadrant 1
           (Competitor B)|    (YOU?)
                         |
    LOW [Axis X] --------+---------- HIGH [Axis X]
                         |
           Quadrant 3    |    Quadrant 4
           (Competitor C)|    (Competitor A)
                         |
                    LOW [Axis Y]
```

**Action:** Place all competitors + yourself on the map. Look for:

- **Empty quadrants** = potential positioning opportunity
- **Crowded quadrants** = red ocean, differentiate or avoid
- **Your position** = is it where your customers want you?

---

## Phase 2: Research Methodology

**Goal:** Gather reliable intelligence without expensive tools.

### Step 2.1: Research Sources (Solopreneur Stack)

**Primary sources (direct observation):**

| Method                     | How                                              | Time Investment                |
| -------------------------- | ------------------------------------------------ | ------------------------------ |
| **Sign up for free trial** | Use competitor's product, screenshot everything  | 1-2 hours per competitor       |
| **Onboarding emails**      | Create account, save entire email sequence       | Passive (collect over 30 days) |
| **Sales call**             | Book demo as potential customer                  | 30-60 min per competitor       |
| **Pricing page archive**   | web.archive.org for historical pricing changes   | 15 min per competitor          |
| **Job postings**           | What roles are they hiring? (signals priorities) | 15 min per competitor          |
| **App store reviews**      | Read 1-star and 5-star reviews                   | 30 min per competitor          |

**Secondary sources (published data):**

| Source                       | What You Get                       | Cost         |
| ---------------------------- | ---------------------------------- | ------------ |
| SimilarWeb (free tier)       | Traffic estimates, traffic sources | Free         |
| BuiltWith                    | Tech stack                         | Free tier    |
| Wayback Machine              | Historical website changes         | Free         |
| Social Blade                 | Social media growth trends         | Free         |
| Google Trends                | Search interest over time          | Free         |
| SEMrush / Ahrefs (free tier) | Top keywords, backlinks            | Limited free |
| G2/Capterra reviews          | Customer sentiment, complaints     | Free         |

### Step 2.2: Research Process

**Per competitor (estimated 2-4 hours each):**

1. **Website audit** (30 min)
   - Homepage messaging, headline, subheading
   - Features page - what do they highlight?
   - Pricing - tiers, model, free trial?
   - About page - team size, story, values
   - Blog - topics, frequency, quality

2. **Product experience** (1-2 hours)
   - Sign up for free trial/freemium
   - Screenshot onboarding flow
   - Note friction points and "aha moments"
   - Test core features relevant to your comparison

3. **Customer voice** (30 min)
   - Read 20+ reviews on G2/Capterra/App Store
   - Note recurring praise (what they do well)
   - Note recurring complaints (your opportunities)
   - Check Reddit/forums for real user opinions

4. **Digital presence** (30 min)
   - SimilarWeb for traffic estimates
   - Social media presence and engagement
   - Content volume and quality
   - Email signup and nurture sequence

### Step 2.3: Research Cadence

| Activity                         | Frequency              | Time           |
| -------------------------------- | ---------------------- | -------------- |
| Deep competitor audit            | Quarterly (top 3-5)    | 2-4 hours each |
| Website/pricing check            | Monthly                | 15 min each    |
| Review monitoring                | Monthly                | 30 min total   |
| New competitor scan              | Monthly                | 30 min         |
| Google Alerts (competitor names) | Continuous (automated) | Setup once     |

**Setup Google Alerts for:**

- Competitor brand names
- Your main keywords + "alternative"
- Your main keywords + "vs"
- Industry terms + "new" / "launch"

---

## Phase 3: Messaging Comparison

**Goal:** Understand how competitors communicate value and find gaps.

### Step 3.1: Messaging Matrix

**Capture for each competitor:**

```markdown
| Element                     | You | Competitor A | Competitor B | Competitor C |
| --------------------------- | --- | ------------ | ------------ | ------------ |
| **Headline**                |     |              |              |              |
| **Subheading**              |     |              |              |              |
| **Primary CTA**             |     |              |              |              |
| **Key benefits (top 3)**    |     |              |              |              |
| **Social proof type**       |     |              |              |              |
| **Tone/voice**              |     |              |              |              |
| **Target persona**          |     |              |              |              |
| **Pain point addressed**    |     |              |              |              |
| **Guarantee/risk reversal** |     |              |              |              |
```

### Step 3.2: Value Proposition Comparison

| Dimension                          | You | Comp A | Comp B | Comp C |
| ---------------------------------- | --- | ------ | ------ | ------ |
| **Promise** (what they deliver)    |     |        |        |        |
| **Proof** (why to believe)         |     |        |        |        |
| **Price anchor** (perceived value) |     |        |        |        |
| **Persona** (who it's for)         |     |        |        |        |
| **Problem** (what they solve)      |     |        |        |        |

### Step 3.3: Narrative Analysis

**For each competitor, answer:**

1. **What story do they tell?**
   - Origin story? Problem-driven? Technology-driven?

2. **What emotional angle?**
   - Fear (avoid pain)? Aspiration (achieve goals)? Status (be seen)?

3. **What objections do they preempt?**
   - "Too expensive" → show ROI
   - "Too complex" → show simplicity
   - "Not proven" → show social proof

4. **What's their "enemy"?**
   - Spreadsheets? Old way of doing things? Specific competitor?

**Output:** Identify messaging gaps - angles NO competitor is using that resonate with your audience.

---

## Phase 4: Feature Comparison Matrix

**Goal:** Objective feature-by-feature comparison for internal strategy and external materials.

### Step 4.1: Rating Scale

| Rating | Symbol | Meaning                             |
| ------ | ------ | ----------------------------------- |
| 5      | +++++  | Best in class, major differentiator |
| 4      | ++++   | Strong, above average               |
| 3      | +++    | Adequate, meets expectations        |
| 2      | ++     | Basic, below average                |
| 1      | +      | Minimal, barely functional          |
| 0      | -      | Not available                       |

### Step 4.2: Feature Comparison Template

**Group features by category:**

```markdown
## Feature Comparison: [Your Product] vs Competition

| Category / Feature | You | Comp A | Comp B | Comp C | Weight |
| ------------------ | --- | ------ | ------ | ------ | ------ |
| **Core Features**  |     |        |        |        |        |
| Feature 1          | 4   | 5      | 3      | 2      | High   |
| Feature 2          | 5   | 3      | 4      | 3      | High   |
| Feature 3          | 3   | 4      | 5      | 2      | Medium |
| **Ease of Use**    |     |        |        |        |        |
| Onboarding speed   | 5   | 2      | 3      | 4      | High   |
| Learning curve     | 4   | 2      | 3      | 3      | Medium |
| **Integrations**   |     |        |        |        |        |
| Integration 1      | 5   | 5      | 0      | 3      | Medium |
| Integration 2      | 0   | 3      | 5      | 2      | Low    |
| **Support**        |     |        |        |        |        |
| Response time      | 4   | 3      | 2      | 5      | Medium |
| Documentation      | 3   | 5      | 3      | 2      | Low    |
| **Pricing**        |     |        |        |        |        |
| Free tier          | Yes | No     | Yes    | No     | High   |
| Starting price     | $X  | $Y     | $Z     | $W     | High   |
| Price/value ratio  | 5   | 3      | 4      | 2      | High   |
```

**Weight column:** How much does this feature matter to your target customer?

### Step 4.3: Weighted Score

**Calculate competitive score:**

```
Weighted Score = SUM(Feature Rating x Weight)

Weight values: High = 3, Medium = 2, Low = 1
```

**Use for:**

- Internal strategy (where to invest development time)
- NOT for public marketing (biased by definition)

---

## Phase 5: Content Gap Analysis

**Goal:** Find content opportunities competitors are missing.

### Step 5.1: Content Audit

**For each competitor, map their content:**

```markdown
| Content Type           | You | Comp A | Comp B | Comp C |
| ---------------------- | --- | ------ | ------ | ------ |
| Blog posts (monthly)   |     |        |        |        |
| Video content          |     |        |        |        |
| Podcast/audio          |     |        |        |        |
| Case studies           |     |        |        |        |
| Templates/tools        |     |        |        |        |
| Email newsletter       |     |        |        |        |
| Social media (primary) |     |        |        |        |
| Webinars/events        |     |        |        |        |
| Documentation/guides   |     |        |        |        |
| Community/forum        |     |        |        |        |
```

### Step 5.2: Topic Coverage Map

**Map topics each competitor covers:**

```markdown
| Topic / Keyword | Search Volume | You | Comp A | Comp B | Comp C | Opportunity |
| --------------- | ------------- | --- | ------ | ------ | ------ | ----------- |
| [Topic 1]       | High          | No  | Yes    | Yes    | No     | Cover it    |
| [Topic 2]       | Medium        | Yes | No     | No     | No     | Expand      |
| [Topic 3]       | High          | No  | No     | No     | No     | First mover |
| [Topic 4]       | Low           | No  | Yes    | Yes    | Yes    | Skip        |
```

**Opportunity scoring:**

- **First mover** = No competitor covers it + search volume exists
- **Cover it** = Competitors cover it, you don't, high volume
- **Expand** = You cover it alone, double down
- **Skip** = Low volume or saturated

### Step 5.3: Content Opportunity Matrix

**Prioritize by:**

| Priority              | Criteria                                                         |
| --------------------- | ---------------------------------------------------------------- |
| **P1 - Quick wins**   | High search volume + no competitor coverage + you have expertise |
| **P2 - Strategic**    | Medium volume + few competitors + builds authority               |
| **P3 - Nice to have** | Low volume or many competitors, but relevant                     |
| **Skip**              | Low volume + high competition + outside your expertise           |

**Format gaps to exploit:**

- Competitors only blog? Create video content.
- Competitors write theory? Create practical templates.
- Competitors in English only? Create Czech content.

---

## Phase 6: Positioning Strategy

**Goal:** Define your unique market position based on competitive analysis.

### Step 6.1: Positioning Statement Framework

**Template:**

```
Pro [target customer]
ktery [has this problem/need],
[Your product] je [category]
ktery [key benefit].
Na rozdil od [primary competitor/alternative],
my [key differentiator].
```

**Example (Menu Editor):**

```
Pro majitele restauraci
kteri potrebuji profesionalni menu bez grafika,
Menu Editor je online nastroj pro tvorbu menu
ktery automaticky generuje digitalni i tiskove menu.
Na rozdil od rucni tvorby v Canve nebo Wordu,
Menu Editor automaticky spravuje alergeny a umoznuje okamzite zmeny.
```

### Step 6.2: Category Strategy

**Three options:**

| Strategy                   | When to Use                    | Risk                              |
| -------------------------- | ------------------------------ | --------------------------------- |
| **Win existing category**  | You can be #1 or #2            | High competition, needs resources |
| **Create new subcategory** | You have unique angle          | Need to educate market            |
| **Reframe the category**   | Incumbents own current framing | Confusing if done poorly          |

**Example:**

- Win existing: "Best restaurant menu software"
- New subcategory: "AI-powered menu management for small restaurants"
- Reframe: "Menu Editor is not software, it's your digital menu manager"

### Step 6.3: Differentiation Angles

**Find your angle using this checklist:**

| Angle              | Question                | Example                                    |
| ------------------ | ----------------------- | ------------------------------------------ |
| **Speed**          | Can you deliver faster? | "Setup in 5 min vs. 2 hours"               |
| **Simplicity**     | Can you be easier?      | "No design skills needed"                  |
| **Price**          | Can you be cheaper?     | "Free tier vs. $49/mo minimum"             |
| **Specialization** | Can you go narrower?    | "Built specifically for Czech restaurants" |
| **Integration**    | Can you connect better? | "Works with your POS system"               |
| **Support**        | Can you care more?      | "Chat support in Czech, response <1 hour"  |
| **Technology**     | Can you be smarter?     | "AI allergen detection"                    |
| **Experience**     | Can you feel better?    | "Beautiful templates, not ugly PDFs"       |

**Rule:** Pick 1-2 angles maximum. Trying to differentiate on everything = differentiating on nothing.

### Step 6.4: Positioning Pitfalls

| Pitfall                        | Sign                          | Fix                                   |
| ------------------------------ | ----------------------------- | ------------------------------------- |
| **Underpositioning**           | "We do everything"            | Narrow focus, pick a niche            |
| **Overpositioning**            | "Only for X" (too narrow)     | Expand slightly, show versatility     |
| **Confused positioning**       | Different story on every page | Align all messaging to one framework  |
| **Doubtful positioning**       | Claims without proof          | Add social proof, case studies, demos |
| **Positioning by price alone** | "We're cheaper"               | Add value differentiation             |

---

## Phase 7: Battlecard Creation

**Goal:** One-page reference for competitive conversations (sales, partnerships, investor meetings).

### Step 7.1: Battlecard Template

```markdown
# BATTLECARD: [Your Product] vs [Competitor Name]

**Last Updated:** [Date]
**Confidence Level:** High / Medium / Low

## Quick Summary

[2-3 sentences: who they are, what they do, how they position]

## Their Strengths (be honest)

- [Strength 1]
- [Strength 2]
- [Strength 3]

## Their Weaknesses (verified, not assumed)

- [Weakness 1 - source: reviews/testing/customer feedback]
- [Weakness 2 - source]
- [Weakness 3 - source]

## Why Customers Choose THEM Over Us

- [Reason 1]
- [Reason 2]

## Why Customers Choose US Over Them

- [Reason 1]
- [Reason 2]
- [Reason 3]

## Key Differentiators

| Area               | Us              | Them             |
| ------------------ | --------------- | ---------------- |
| [Most important]   | [Our advantage] | [Their approach] |
| [Second important] | [Our advantage] | [Their approach] |
| [Third important]  | [Our advantage] | [Their approach] |

## Common Objections & Responses

| Objection                  | Response                                      |
| -------------------------- | --------------------------------------------- |
| "They have [feature X]"    | "We offer [alternative], plus [unique value]" |
| "They're cheaper"          | "[Value justification + ROI argument]"        |
| "They're more established" | "[Agility advantage + specific wins]"         |

## Landmines (Questions to ask that expose their weakness)

- "Ask them about [specific weak area]..."
- "Try their [specific workflow] and compare..."
- "Check their [reviews/support response time/uptime]..."

## Win/Loss Themes

**We win when:** [buyer profile, deal characteristics]
**We lose when:** [buyer profile, deal characteristics]
```

### Step 7.2: Battlecard Rules

1. **Be honest** about competitor strengths. Dismissing them loses credibility.
2. **Verify weaknesses** with actual sources (reviews, testing, customer feedback).
3. **Update quarterly** at minimum. Stale battlecards are worse than none.
4. **Focus on value**, not trash-talking. "We're better because X" > "They suck at Y."
5. **Keep it one page.** If you can't fit it on one page, you haven't distilled enough.

### Step 7.3: Objection Handling Framework

**For each common objection:**

```
SITUATION: When prospect says "[objection]"

ACKNOWLEDGE: "That's a fair point. [Competitor] does [genuine strength]."

PIVOT: "What we've found is that [reframe to your advantage]."

PROOF: "[Specific example, metric, or customer quote]."

QUESTION: "What matters more to you - [their strength] or [your strength]?"
```

---

## Phase 8: Market Trend Identification

**Goal:** Spot trends early to inform product and positioning decisions.

### Step 8.1: Trend Sources (Solopreneur Stack)

| Source                   | What You Get                     | How Often   |
| ------------------------ | -------------------------------- | ----------- |
| Google Trends            | Search interest over time        | Monthly     |
| Product Hunt             | New products in your category    | Weekly      |
| Hacker News              | Tech trends, developer sentiment | Weekly      |
| Reddit (your subreddits) | Customer pain points, wishlists  | Weekly      |
| Industry newsletters     | Curated trends                   | As received |
| Competitor changelogs    | Where market is heading          | Monthly     |
| G2 Grid reports (free)   | Category leaders and movers      | Quarterly   |
| App store "new" sections | New entrants to watch            | Monthly     |

**Czech-specific:**
| Source | What You Get |
|--------|-------------|
| CzechCrunch | Czech startup trends |
| Lupa.cz | Czech tech news |
| Tyinternety.cz | Czech digital marketing trends |
| E15.cz / HN.cz | Czech business trends |

### Step 8.2: Trend Analysis Framework

**For each identified trend, evaluate:**

| Question                 | Answer                                                |
| ------------------------ | ----------------------------------------------------- |
| **What?**                | Describe the trend in one sentence                    |
| **Evidence?**            | 3+ independent signals confirming it                  |
| **Timeline?**            | Emerging (1-2 years), Growing (now), Mature (peak)    |
| **Impact on us?**        | High / Medium / Low / None                            |
| **Action needed?**       | Build feature / Adjust positioning / Monitor / Ignore |
| **Competitor response?** | Who's already acting on this?                         |

### Step 8.3: Signal vs Noise

**It's a real trend if:**

- 3+ independent sources mention it
- Customer behavior is changing (not just talk)
- Competitors are investing in it
- Search volume is growing over 6+ months

**It's noise if:**

- One viral article/tweet only
- Hype without customer demand
- Only venture-funded companies pursuing it
- No search volume growth

**Solopreneur rule:** Don't chase trends. React to validated ones that align with your positioning.

---

## Workflow: Full Competitive Analysis

**Estimated time: 2-3 evenings (for solopreneur with 3-5 competitors)**

### Evening 1: Discovery & Research (2-4 hours)

- [ ] Phase 1: List all competitors (direct, indirect, adjacent)
- [ ] Phase 1: Create competitor roster table
- [ ] Phase 1: Draw positioning map
- [ ] Phase 2: Deep research on top 3 direct competitors
- [ ] Phase 2: Set up Google Alerts

### Evening 2: Analysis (2-4 hours)

- [ ] Phase 3: Build messaging matrix
- [ ] Phase 3: Complete narrative analysis
- [ ] Phase 4: Build feature comparison matrix
- [ ] Phase 4: Calculate weighted scores
- [ ] Phase 5: Content gap audit

### Evening 3: Strategy & Output (2-4 hours)

- [ ] Phase 6: Write positioning statement
- [ ] Phase 6: Choose differentiation angles (max 2)
- [ ] Phase 7: Create battlecard for top 3 competitors
- [ ] Phase 8: Identify 3-5 market trends
- [ ] Summarize key insights and action items

---

## Ongoing Maintenance

**Competitive analysis is never "done."**

| Activity                                  | Cadence                  | Time            |
| ----------------------------------------- | ------------------------ | --------------- |
| Google Alerts review                      | Weekly                   | 10 min          |
| Competitor website/pricing check          | Monthly                  | 30 min          |
| Review monitoring (G2/Capterra/App Store) | Monthly                  | 30 min          |
| Feature matrix update                     | Quarterly                | 1 hour          |
| Battlecard refresh                        | Quarterly                | 1 hour per card |
| Full landscape re-analysis                | Semi-annually            | Full workflow   |
| Positioning map update                    | When major changes occur | 30 min          |

---

## Templates

### Quick Competitive Snapshot (Lightweight)

For when you need a fast overview, not full analysis:

```markdown
## Competitive Snapshot: [Your Product]

**Date:** [Date]

### Top 3 Competitors

**1. [Competitor A]**

- What they do well: [1-2 points]
- Where they're weak: [1-2 points]
- Their price: [price]
- Our advantage: [1 sentence]

**2. [Competitor B]**

- What they do well: [1-2 points]
- Where they're weak: [1-2 points]
- Their price: [price]
- Our advantage: [1 sentence]

**3. [Competitor C]**

- What they do well: [1-2 points]
- Where they're weak: [1-2 points]
- Their price: [price]
- Our advantage: [1 sentence]

### Our Positioning

[Positioning statement]

### Top 3 Differentiators

1. [Differentiator]
2. [Differentiator]
3. [Differentiator]

### Biggest Threat

[Which competitor and why]

### Biggest Opportunity

[What gap exists that no one fills]
```

### Competitive Pitch Slide

For investor/partner decks:

```markdown
## [Your Category] Landscape

[2x2 positioning map visual]

**Why we win:**

1. [Differentiator 1 with proof point]
2. [Differentiator 2 with proof point]
3. [Differentiator 3 with proof point]

**Market gap we fill:** [One sentence describing unoccupied position]
```

---

## Common Mistakes

1. **Researching once, never updating** → Set recurring calendar reminders
2. **Only analyzing direct competitors** → Indirect competitors steal customers too
3. **Copying competitor features** → Leads to feature parity, not differentiation
4. **Ignoring competitor strengths** → Dishonest analysis leads to blind spots
5. **Too many differentiators** → Pick 1-2, not 7
6. **Analysis paralysis** → Time-box research. 80% insight in 20% of time.
7. **Enterprise tools for solopreneur needs** → Skip Gartner reports, use free tools
8. **Not talking to actual customers** → Reviews and forums > your assumptions
9. **Positioning based on features, not value** → "We have X feature" < "You get Y outcome"
10. **Forgetting Czech market specifics** → Czech customers have different discovery paths

---

## Red Flags

**STOP and reconsider if:**

- You have 0 competitors (you're either wrong or there's no market)
- You can't name 3 things competitors do BETTER than you (you're not being honest)
- Your differentiation is only "we're cheaper" (commodity trap)
- You've spent 20+ hours on research without a single actionable insight (analysis paralysis)
- Your positioning changes every month (no conviction)

---

## Integration with Other Skills

**Before competitive analysis:**

- `marketing-orchestrator` → Understand overall marketing strategy first

**During competitive analysis:**

- `uvp-optimization` → Use competitive insights to refine your UVP
- `pricing` → Compare pricing models, use competitor pricing as anchor

**After competitive analysis:**

- `offer-creation` → Build differentiated offer based on gaps found
- `web-copy` → Write competitive copy using messaging insights
- `growth-hacking` → Design experiments to test competitive positioning

---

## Success Metrics

| Phase             | Success Indicator                                       |
| ----------------- | ------------------------------------------------------- |
| Landscape Mapping | 10+ competitors identified, 2x2 map drawn               |
| Research          | Top 3 competitors deeply researched with verified data  |
| Messaging         | Clear gaps identified in competitor messaging           |
| Feature Matrix    | Weighted comparison shows your strengths AND weaknesses |
| Content Gaps      | 5+ content opportunities prioritized                    |
| Positioning       | One clear positioning statement, 1-2 differentiators    |
| Battlecards       | One-page cards for top 3 competitors                    |
| Trends            | 3-5 trends identified with action plan                  |

---

**Remember: The goal of competitive analysis is not to copy competitors. It's to find the space they're NOT occupying and own it.**
