---
name: product-metrics
description: Use when deciding what to measure, defining KPIs, choosing a North Star metric, or evaluating product health - North Star, AARRR, HEART frameworks
---

# Product Metrics

## Overview

Metrics tell you whether you're winning. Without the right metrics, you're flying blind — or worse, optimizing the wrong thing.

**Core principle:** One North Star, not twenty dashboards. If everything is a priority, nothing is.

**Announce:** "I'm using product-metrics to define what we should measure and how."

## When to Use

**USE this skill:**
- "What metrics should we track?"
- "What's our North Star metric?"
- "Are we measuring the right things?"
- "How do I set up KPIs?"
- "Our dashboard has 50 metrics and nobody looks at it"
- Defining success criteria for features
- Building analytics strategy

**DON'T use this skill:**
- Need to understand customers → `product-discovery`
- Need to prioritize features → `product-prioritization`
- Need long-term direction → `product-strategy`
- Checking product-market fit → `product-market-fit`

## Iron Law

```
ONE NORTH STAR, NOT TWENTY DASHBOARDS
IF EVERYTHING IS A PRIORITY, NOTHING IS

Measure what matters. Ignore vanity metrics.
A metric without an action plan is just a number.
```

## Core Frameworks

### Framework 1: North Star Metric (Amplitude)

**Best for:** Aligning the entire company around one metric that represents customer value. Default starting point.

**Definition:** The single metric that best captures the core value your product delivers to customers.

**Properties of a Good North Star:**
1. **Reflects customer value** (not revenue — revenue is a lagging indicator)
2. **Leading indicator of revenue** (if North Star grows, revenue follows)
3. **Measurable** (can track weekly/daily)
4. **Actionable** (teams can influence it)
5. **Understandable** (anyone can explain it)

**Examples:**

| Company Type | North Star Metric | Why |
|-------------|-------------------|-----|
| Marketplace | # of transactions/week | Both sides getting value |
| SaaS (collab) | # of active teams/week | Teams = retention + expansion |
| Media/content | Total reading time/day | Engagement = ad revenue |
| E-commerce | # of purchases/month | Direct value exchange |
| Fintech | $ managed on platform | Trust + engagement |

**North Star + Supporting Inputs:**

```
              [North Star Metric]
                     │
        ┌────────────┼────────────┐
        │            │            │
   [Input 1]    [Input 2]    [Input 3]
   (Breadth)    (Depth)      (Frequency)
```

**Example (SaaS):**

```
     Weekly Active Teams
            │
    ┌───────┼───────┐
    │       │       │
 New team  Features  Sessions
 signups   adopted   per team
           per team  per week
```

**How to Choose:**
1. What is the core value your product delivers?
2. What action by the user indicates they received that value?
3. Can you measure that action? How often does it happen?
4. If this metric doubles, does revenue follow? Does customer satisfaction follow?

### Framework 2: AARRR Pirate Metrics (Dave McClure)

**Best for:** Full-funnel view of the customer journey. Great for identifying where you're losing users.

**The Funnel:**

```
A - Acquisition:  How do users find you?
A - Activation:   Do they have a great first experience?
R - Retention:    Do they come back?
R - Revenue:      Do they pay?
R - Referral:     Do they tell others?
```

**Metrics per Stage:**

| Stage | Key Metric | Example | Benchmark |
|-------|-----------|---------|-----------|
| **Acquisition** | Visitors, signups | Monthly new signups | Growing month-over-month |
| **Activation** | % completing key action | % who complete onboarding | 25-60% (varies) |
| **Retention** | Day 1/7/30 retention | % active after 30 days | 40%+ = good |
| **Revenue** | ARPU, conversion rate | % free → paid | 2-5% freemium, 15-30% trial |
| **Referral** | Viral coefficient | Invites sent per user | K > 1 = viral growth |

**How to Use AARRR:**
1. Map your funnel with actual numbers
2. Find the biggest drop-off (that's your bottleneck)
3. Focus on ONE stage at a time
4. Fix retention before acquisition (leaky bucket principle)

**Stage Priority Order:**
```
1. Retention (users coming back?)
   └── No → Fix product value (→ product-market-fit)
2. Activation (users getting to value?)
   └── No → Fix onboarding
3. Revenue (users paying?)
   └── No → Fix pricing/packaging (→ pricing)
4. Acquisition (users finding you?)
   └── No → Fix marketing (→ marketing-orchestrator)
5. Referral (users telling others?)
   └── No → Add referral mechanics (→ growth-hacking)
```

### Framework 3: HEART (Google)

**Best for:** Measuring user experience quality. Best for teams working on UX improvements.

**Five Dimensions:**

| Dimension | Measures | Example Metric |
|-----------|---------|---------------|
| **Happiness** | Satisfaction, NPS | CSAT score, NPS |
| **Engagement** | Depth of usage | Sessions/week, features used |
| **Adoption** | New users/features | Signups, feature adoption rate |
| **Retention** | Users coming back | D7/D30 retention |
| **Task success** | Can users complete goals? | Task completion rate, error rate |

**Goals-Signals-Metrics Process:**

For each HEART dimension:
1. **Goal:** What do you want to achieve? (qualitative)
2. **Signal:** What user behavior indicates success? (observable)
3. **Metric:** How do you measure the signal? (quantifiable)

**Example (onboarding flow):**

```
Dimension: Adoption
Goal: New users complete setup quickly
Signal: Users finish all onboarding steps
Metric: % completing onboarding within first session
```

**When to Use HEART vs AARRR:**
- HEART: Evaluating UX quality, feature-level metrics
- AARRR: Business-level funnel, growth metrics
- Both can coexist (AARRR for business, HEART for product quality)

### Framework 4: Stage-Based Metrics (Lean Analytics)

**Best for:** Choosing metrics based on product/company stage. What matters at pre-PMF is different from growth stage.

| Stage | Focus Metric | Why |
|-------|-------------|-----|
| **Empathy** (pre-product) | # of customer interviews | Do you understand the problem? |
| **Stickiness** (MVP) | Retention, engagement | Are users coming back? |
| **Virality** (PMF achieved) | Viral coefficient, NPS | Are users spreading the word? |
| **Revenue** (monetization) | ARPU, LTV, CAC | Is the business model working? |
| **Scale** (growth) | CAC payback, margins | Can you grow profitably? |

**Key insight:** Don't optimize for revenue metrics before you have retention. Don't optimize for virality before you have PMF.

## Process: Setting Up Metrics

### Step 1: Determine Stage

```
Do you have a product?
├── NO → Empathy stage → Track interviews, hypotheses tested
├── YES →
│   Do users come back? (Retention > 30% at D30)
│   ├── NO → Stickiness stage → Fix retention
│   ├── YES →
│   │   PMF > 40%?
│   │   ├── NO → Still stickiness → Improve core value
│   │   ├── YES →
│   │   │   Revenue model working?
│   │   │   ├── NO → Revenue stage → Fix monetization
│   │   │   ├── YES → Scale stage → Optimize growth
```

### Step 2: Choose North Star

1. What core value do you deliver?
2. What action proves the user got that value?
3. Set that as your North Star Metric
4. Define 3-4 supporting input metrics

### Step 3: Map AARRR Funnel

1. Define metrics for each AARRR stage
2. Measure current numbers
3. Find biggest drop-off
4. Focus there first

### Step 4: Set Targets

For each metric:
- **Current baseline** (measured, not guessed)
- **Target** (specific number, specific timeframe)
- **Action plan** (what will we do to move it?)

### Step 5: Create Dashboard

```
Dashboard structure:
├── North Star Metric (big, prominent)
├── Supporting Input Metrics (3-4)
├── AARRR Funnel (conversion rates between stages)
└── Key alerts (metric drops > X%)

Maximum 10-15 metrics total. More = noise.
```

## Vanity vs Actionable Metrics

| Vanity Metric | Why Bad | Actionable Alternative |
|---|---|---|
| Total users | Always goes up | Active users (DAU/MAU) |
| Page views | Doesn't mean engagement | Session duration, pages per session |
| Total signups | Says nothing about value | Activation rate |
| App downloads | Installs ≠ usage | D7 retention |
| Total revenue | Hides churn | Net revenue retention |
| Social followers | Vanity | Engagement rate |

**Rule of thumb:** If the metric always goes up regardless of what you do, it's vanity.

## Key Metric Definitions

| Metric | Formula | Good Benchmark |
|--------|---------|---------------|
| **DAU/MAU ratio** | Daily active / Monthly active | 20%+ (engagement) |
| **D1/D7/D30 retention** | Users returning after N days | D30 > 40% |
| **Activation rate** | % completing key first action | 25-60% |
| **Churn rate** | % users lost per month | < 5% monthly (SaaS) |
| **NPS** | Promoters - Detractors | > 50 = excellent |
| **LTV/CAC** | Lifetime value / Acquisition cost | > 3:1 |
| **ARPU** | Revenue / Active users | Depends on business |
| **Viral coefficient (K)** | Invites × conversion rate | K > 1 = viral |

## Quick Reference

| Framework | Core Question | Best For |
|---|---|---|
| North Star | "What single metric captures value?" | Company alignment |
| AARRR | "Where are we losing users?" | Funnel analysis |
| HEART | "How good is the user experience?" | UX measurement |
| Stage-Based | "What should we focus on now?" | Metric selection |

## Common Mistakes

**Too many metrics:**
"We track 50 KPIs" → Pick ONE North Star + 3-4 inputs. Max 10-15 total.

**Revenue as North Star:**
"Our North Star is MRR" → Revenue is a lagging indicator. What user action drives revenue?

**Vanity metrics:**
"We have 100K users!" → How many are active? What's retention?

**Same metrics at every stage:**
Tracking CAC when you don't have retention → Fix retention first, then worry about acquisition cost.

**No baseline:**
"Let's improve activation" → What's current activation? You need a number to improve from.

**Measuring without acting:**
Dashboard exists but nobody changes behavior → Every metric needs an owner and action plan.

## Integration

- Understanding what to measure → `product-strategy` provides objectives
- PMF measurement → `product-market-fit` for PMF-specific metrics
- Growth metrics → `growth-hacking`, `product-led-growth`
- UX metrics → `ux-optimization` for improving experience
- Analytics setup → `analytics-setup` for implementation
