---
name: churn-prevention
description: Reduces voluntary churn (cancel flow design, exit surveys, dynamic save offers) and involuntary churn (dunning, smart retries, payment recovery) for SaaS products. Use when churn rate is too high, designing cancel flows, building retention systems, or recovering failed payments. Triggers include "reduce churn", "cancel flow", "dunning", "failed payments", "retention". NOT for user onboarding (use product-led-growth), growth experiments (use growth-hacking), pricing strategy (use pricing), or UX optimization (use ux-optimization).
metadata:
  author: Petr
  version: 1.0.0
---

# Churn Prevention

## Overview

This skill helps SaaS teams reduce both voluntary churn (customers actively cancelling) and involuntary churn (failed payments) through cancel flow design, proactive retention systems, and dunning strategies. Covers diagnostics, intervention design, and recovery with specific benchmarks.

**Announce:** "I'm using churn-prevention to design retention and recovery systems."

## When to Use

**USE this skill:**

- "My churn rate is too high"
- "I need to design a cancel flow"
- "How do I recover failed payments?"
- "I want to build an early warning system for churn"
- "What save offers should I present?"
- Dunning email sequences
- Exit survey design

**DON'T use this skill:**

- User onboarding optimization -> `product-led-growth`
- Growth experiments -> `growth-hacking`
- Pricing strategy -> `pricing`
- UX optimization -> `ux-optimization`
- SaaS health metrics -> `saas-bootstrap`

---

## Quick Router

| Situation | Go to |
| --- | --- |
| "I don't know why customers leave" | Churn Diagnostics |
| "I need a cancel flow" | Cancel Flow Design |
| "What offer for which reason?" | Dynamic Offer Matrix |
| "I want to catch churn before it happens" | Proactive Retention |
| "Failed payments are killing me" | Payment Recovery |
| "What should I build first?" | Implementation Priority |

---

## Churn Diagnostics

Before building anything, identify what type of churn you have and why.

### Step 1: Measure Your Split

```
Total Monthly Churn: ___%

Voluntary (active cancellations):   ___% of total churn
Involuntary (failed payments):      ___% of total churn
```

Industry baseline: failed payments account for 30-50% of total churn. If your involuntary churn is in that range, start with payment recovery -- it is the highest-ROI fix.

### Step 2: Identify Top Cancel Reasons

If you don't have exit survey data yet, deploy a simple survey first. Common reasons ranked by frequency:

| Reason | Typical Share | Recoverability |
| --- | --- | --- |
| Too expensive | 25-35% | High (discount/downgrade) |
| Low engagement / not using | 20-30% | Medium (pause/onboarding) |
| Missing features | 15-20% | Low-Medium (roadmap/workaround) |
| Switching to competitor | 10-15% | Medium (comparison + discount) |
| Business closed / no longer needed | 5-15% | Very low |

### Step 3: Cohort Analysis

Break down churn by:

- **Tenure:** First 90 days vs. 6+ months (early churn = onboarding problem)
- **Plan type:** Free-to-paid vs. direct paid, monthly vs. annual
- **Acquisition channel:** Organic vs. paid vs. referral
- **Cancel reason:** From exit surveys

If churn concentrates in the first 90 days, fix onboarding before building cancel flows. Use `product-led-growth` for that.

---

## Cancel Flow Design

A cancel flow is a multi-step funnel between the "Cancel" button and actual cancellation. Goal: understand the reason, present a matched intervention, and save 25-35% of cancellers.

### Flow Structure

```
[Cancel Button Clicked]
        |
        v
[Exit Survey: Why are you leaving?]
        |
        v
[Dynamic Offer based on reason]
        |
    Accept?
   /       \
  Yes       No
  |          |
  v          v
[Saved]   [Confirmation: Are you sure?]
                    |
                Accept?
               /       \
              Yes       No
              |          |
              v          v
          [Cancelled]  [Saved]
                |
                v
          [Post-Cancel Email]
```

### Exit Survey Design

Keep it to ONE question with 5-6 options. Every option maps to an intervention.

```
"We're sorry to see you go. What's the main reason you're cancelling?"

[ ] It's too expensive
[ ] I'm not using it enough
[ ] It's missing features I need
[ ] I'm switching to another solution
[ ] My business/project ended
[ ] Other: ___________
```

Rules:

- Single-select only (forces prioritization)
- Include "Other" with free text
- Store every response -- this data is gold for product decisions
- Do not make the survey skippable (but keep it to one question so friction is minimal)

---

## Dynamic Offer Matrix

Each cancel reason maps to a specific intervention. Never show a generic "Are you sure?" -- match the offer to the pain.

| Cancel Reason | Primary Offer | Secondary Offer | Expected Save Rate |
| --- | --- | --- | --- |
| Too expensive | 20-30% discount for 3 months | Downgrade to cheaper plan | 30-40% |
| Not using enough | Pause subscription (1-3 months) | Personal onboarding session | 20-30% |
| Missing features | Roadmap preview + timeline | Workaround guide | 10-20% |
| Switching competitor | Feature comparison + 25% discount | Concierge migration help | 15-25% |
| Business ended | Pause option (up to 6 months) | Nothing (let them go gracefully) | 5-10% |

### Offer Rules

- **One offer per screen.** Do not overwhelm with choices.
- **Discount caps:** Never exceed 30%. Train customers to expect discounts and you create a worse problem.
- **Time-limit discounts:** 3 months max. After that, they pay full price or re-evaluate.
- **Track offer acceptance by reason.** If an offer consistently fails (<10% save rate), replace it.
- **Pause > Discount** for low-engagement users. They come back when ready instead of churning from a discounted plan they still don't use.

---

## Proactive Retention

Don't wait for the cancel button. Build systems that identify at-risk customers early.

### Health Score Model

Score each customer 0-100 based on weighted engagement signals:

| Signal | Weight | Scoring |
| --- | --- | --- |
| Login frequency (vs. their baseline) | 25% | Dropping = risk |
| Core feature usage | 30% | Not using key features = risk |
| Support tickets (sentiment) | 15% | Angry tickets = risk |
| Payment history | 15% | Failed payments, downgrades = risk |
| NPS / survey responses | 15% | Detractors (0-6) = risk |

### Risk Tiers

| Score | Tier | Action |
| --- | --- | --- |
| 80-100 | Healthy | Upsell opportunities, request referrals |
| 50-79 | At Risk | Trigger re-engagement campaign |
| 20-49 | High Risk | Personal outreach from CS team |
| 0-19 | Critical | Executive escalation, save call |

### Early Warning Triggers

Automate alerts when any of these occur:

- Login frequency drops >50% vs. previous 30-day average
- Core feature unused for 14+ days
- Support ticket with negative sentiment keywords
- Failed payment (first occurrence)
- Downgrade request
- NPS score of 6 or below

### Re-engagement Playbook

For "At Risk" tier (score 50-79):

1. **Day 0:** Automated email -- "We noticed you haven't used [feature]. Here's how to get value from it."
2. **Day 3:** In-app message highlighting unused features or new updates
3. **Day 7:** Personal email from CS -- "Anything we can help with?"
4. **Day 14:** If no re-engagement, offer a complimentary strategy call

---

## Payment Recovery (Dunning)

Failed payments are the easiest churn to fix. 50-70% recoverable with proper systems.

### Smart Retry Logic

Not all declines are equal. Retry strategy should vary:

| Decline Type | Retry Strategy | Success Rate |
| --- | --- | --- |
| Soft decline (insufficient funds) | Retry in 24h, then 3 days, then 7 days | 60-70% |
| Hard decline (card expired/stolen) | Don't retry. Email immediately for card update. | 30-40% (with email) |
| Network/processing error | Retry in 1 hour, then 4 hours | 80-90% |

### Dunning Email Sequence

10-day sequence starting from first failed payment:

| Day | Email | Tone |
| --- | --- | --- |
| 0 | "Payment failed -- update your card" | Informational, helpful |
| 3 | "Your subscription is at risk" | Urgent, clear deadline |
| 7 | "Last chance before we pause your account" | Final warning |
| 10 | "Your account has been paused" | Confirmation + easy reactivation link |

Email rules:

- Subject lines: direct, no clickbait. "Action needed: update your payment method"
- Include a ONE-CLICK link to update payment info (not login -> settings -> billing)
- Show what they lose: "You'll lose access to [specific data/features]"
- Day 10 email includes a reactivation link that works for 30 days

### Card Updater Services

Stripe, Braintree, and others offer automatic card updater services that refresh expired card details before they fail. Enable this -- it silently prevents 10-20% of involuntary churn with zero customer friction.

---

## Metrics and Benchmarks

### Target Benchmarks

| Metric | Poor | Acceptable | Good | Excellent |
| --- | --- | --- | --- | --- |
| Monthly churn (B2B) | >5% | 3-5% | 1-3% | <1% |
| Monthly churn (B2C) | >10% | 5-10% | 3-5% | <3% |
| Cancel flow save rate | <10% | 10-20% | 25-35% | >35% |
| Payment recovery rate | <30% | 30-50% | 50-70% | >70% |
| Net revenue retention | <90% | 90-100% | 100-110% | >110% |

### What to Track

```
Monthly Churn Dashboard:

Voluntary churn rate:       ___%
Involuntary churn rate:     ___%
Cancel flow save rate:      ___%
Payment recovery rate:      ___%
Net revenue retention:      ___%

Top cancel reasons (this month):
1. _______________ (___%)
2. _______________ (___%)
3. _______________ (___%)

Save offer performance:
- Discount accepted:        ___/___  (___%)
- Pause accepted:           ___/___  (___%)
- Downgrade accepted:       ___/___  (___%)
```

---

## Implementation Priority

Build in this order. Each step delivers measurable ROI before moving to the next.

### Phase 1: Quick Wins (Week 1-2)

1. **Enable card updater service** in your payment processor
2. **Set up smart retry logic** (soft vs. hard decline handling)
3. **Deploy dunning email sequence** (4 emails over 10 days)
4. **Expected impact:** Recover 50-70% of failed payments

### Phase 2: Cancel Flow (Week 3-4)

1. **Add exit survey** (single question, 5-6 options)
2. **Build dynamic offer routing** (reason -> matched intervention)
3. **Add confirmation step** after declined offer
4. **Expected impact:** Save 25-35% of voluntary cancellers

### Phase 3: Proactive Systems (Month 2-3)

1. **Define health score signals** for your product
2. **Build scoring pipeline** (even a simple spreadsheet works to start)
3. **Set up automated alerts** for risk tier changes
4. **Create re-engagement email sequences**
5. **Expected impact:** Reduce voluntary churn by additional 10-20%

---

## Tools

| Tool | What it does | Best for |
| --- | --- | --- |
| **Churnkey** | Full cancel flow + dunning | All-in-one, quick setup |
| **ProsperStack** | Cancel flow + exit surveys | Deep survey analytics |
| **Chargebee Retention** | Cancel flow + offer management | Chargebee users |
| **Stripe Smart Retries** | ML-based retry optimization | Stripe users (enable in dashboard) |
| **Baremetrics** | Churn analytics + dunning | Metrics-focused teams |

You don't need dedicated tools to start. A custom cancel flow + Stripe's built-in retries covers Phase 1-2. Add specialized tools when you need deeper analytics or A/B testing on save offers.

---

## Common Mistakes

**Skipping the exit survey:**
"Just show a discount to everyone" -- You waste discounts on people who would be saved by a pause, and miss product insights.

**Discount addiction:**
Offering 50% off to every canceller trains customers to cancel-and-return for deals. Cap at 30%, time-limit to 3 months.

**Ignoring involuntary churn:**
"It's only 3% from failed payments" -- That 3% is the easiest to recover. Start here.

**Over-engineering health scores:**
Building an ML model before you have exit survey data. Start with login frequency + feature usage, iterate from there.

**Aggressive retention dark patterns:**
Hiding the cancel button, requiring phone calls, 5-step flows. This generates chargebacks, bad reviews, and regulatory risk. Make it easy to leave gracefully -- and easy to come back.

---

## Integration

**Works with:**

- `saas-bootstrap` -- 3H/3L metrics (churn is a core LOW metric)
- `product-led-growth` -- Onboarding fixes for early churn
- `growth-hacking` -- Retention experiments via ICE scoring
- `pricing` -- Plan structure affects churn (annual vs. monthly, tier design)

**Sequence for churn reduction project:**

1. `churn-prevention` -- Diagnostics (identify churn type and reasons)
2. `churn-prevention` -- Phase 1-2 implementation (dunning + cancel flow)
3. `product-led-growth` -- Fix onboarding if early churn is high
4. `pricing` -- Restructure plans if "too expensive" dominates
5. `churn-prevention` -- Phase 3 (proactive retention systems)
