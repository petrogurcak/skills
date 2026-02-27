---
name: referral-program
description: Designs and optimizes referral and affiliate programs for SaaS products using referral loop framework, incentive design, and viral mechanics. Use when building a referral program, improving referral conversion, designing affiliate programs, or adding viral loops. Triggers include "referral program", "affiliate program", "viral growth", "word of mouth", "referral loop". NOT for general growth experiments (use growth-hacking), product onboarding (use product-led-growth), paid acquisition (use marketing-orchestrator), or launch distribution (use launch-strategy).
metadata:
  author: Petr
  version: 1.0.0
---

# Referral Program

## Overview

This skill designs and optimizes referral and affiliate programs for SaaS products. Use when you want customers or partners bringing you more customers through structured incentives and viral loops.

**Announce:** "I'm using referral-program to design a referral/affiliate growth loop."

## When to Use

**USE this skill:**

- "How do I build a referral program?"
- "I want customers to bring more customers"
- "Should I do referral or affiliate?"
- "My referral program isn't converting"
- "How do I add viral loops to my product?"
- Designing incentive structures
- Optimizing share mechanics

**DON'T use this skill:**

- General growth experiments --> `growth-hacking`
- Product onboarding optimization --> `product-led-growth`
- Paid acquisition channels --> `marketing-orchestrator`
- Launch distribution strategy --> `launch-strategy`
- Pricing strategy --> `pricing`

## Quick Router

| Situation | Action |
| --- | --- |
| "Should I do referral or affiliate?" | Decision Tree below |
| "Building first referral program" | Referral Loop Design + Launch Checklist |
| "Low referral conversion" | Optimization Matrix |
| "Want partner/affiliate channel" | Affiliate Program section |
| "Referral fraud concerns" | Fraud Prevention section |
| "What metrics should I track?" | Metrics & Benchmarks |

---

## Decision Tree: Referral vs Affiliate vs Hybrid

```
Does your product have active, engaged users?
|
+-- YES --> Do users naturally recommend your product?
|           |
|           +-- YES --> CUSTOMER REFERRAL PROGRAM
|           |          (Double-sided incentive, in-product sharing)
|           |
|           +-- NO --> Is there a clear "aha moment" to trigger sharing?
|                      |
|                      +-- YES --> CUSTOMER REFERRAL PROGRAM
|                      |          (Trigger at aha moment)
|                      |
|                      +-- NO --> HYBRID
|                                 (Referral for users + Affiliate for reach)
|
+-- NO --> Do content creators / influencers cover your space?
           |
           +-- YES --> AFFILIATE PROGRAM
           |          (Ongoing commissions, partner onboarding)
           |
           +-- NO --> Focus on product-market fit first
                      (Use product-led-growth instead)
```

**Program Type Comparison:**

| Factor | Customer Referral | Affiliate |
| --- | --- | --- |
| Who refers | Existing customers | Non-customer partners |
| Reward type | One-time / limited | Ongoing commissions |
| Trust level | High (personal network) | Variable |
| Volume | Lower, higher quality | Higher, variable quality |
| Setup effort | Medium | High (partner management) |
| Best for | B2B SaaS, community products | Content-driven, marketplace |

---

## Referral Loop Design

The referral loop is a cycle, not a funnel. Each step feeds the next.

```
1. TRIGGER MOMENT
   (User achieves something, feels value)
        |
        v
2. SHARE MECHANISM
   (Easy way to tell someone)
        |
        v
3. REFERRED USER CONVERSION
   (Landing, signup, activation)
        |
        v
4. REWARD DISTRIBUTION
   (Both sides get value)
        |
        v
5. CYCLE CONTINUATION
   (New user becomes referrer)
```

### Step 1: Trigger Moments

Prompt sharing when users feel the most value. Bad timing kills referral programs.

**High-conversion triggers:**

| Trigger | Why it works | Example |
| --- | --- | --- |
| Post-achievement | Peak satisfaction | "You saved 12 hours this month" |
| After support excellence | Gratitude + surprise | Post-resolution with high CSAT |
| Subscription renewal | Confirmed value | "You renewed -- share with a colleague?" |
| Plan upgrade | Increasing commitment | "Welcome to Pro -- give a friend 30 days free" |
| Milestone reached | Pride + social proof | "100th report generated" |

### Step 2: Share Mechanisms

Ranked by conversion rate (highest first):

1. **In-product sharing** -- Team invites, workspace sharing, collaboration features
2. **Personalized referral links** -- Unique URLs with attribution
3. **Email invitations** -- Pre-written, editable email from within product
4. **Social sharing** -- One-click share to LinkedIn, Twitter, communities
5. **Referral codes** -- Manual codes for offline/verbal sharing

**Rule:** Always offer the top 2-3 mechanisms. One-click is mandatory -- every extra step halves conversion.

### Step 3: Referred User Experience

The referred user's first experience determines conversion. Optimize separately from your main signup flow.

- Personalized landing page ("X invited you")
- Pre-applied discount or extended trial
- Skip unnecessary onboarding steps
- Show social proof from the referrer's usage

### Step 4: Reward Distribution

Deliver rewards instantly. Delayed rewards kill repeat referrals.

### Step 5: Cycle Continuation

New users become referrers through the same trigger moments. Track second-generation referrals as your viral coefficient.

---

## Incentive Design Matrix

| Incentive Type | Best For | Example | Pros | Cons |
| --- | --- | --- | --- | --- |
| **Single-sided** (referrer only) | Low-ACV products | "$10 credit per referral" | Simple, cheap | Referred user has no urgency |
| **Double-sided** (both get value) | Most SaaS | "Both get 1 month free" | Higher conversion, fair | Higher cost per referral |
| **Tiered/gamified** | High-engagement products | "3 refs = Bronze, 10 = Gold" | Repeat behavior, loyalty | Complex to manage |
| **Cash/commission** | Affiliate programs | "20% recurring commission" | Clear value, scales | Attracts low-quality referrers |
| **Feature unlock** | Freemium products | "Invite 3 = unlock Pro feature" | Zero marginal cost | Only works if feature is compelling |

**Choosing the right incentive:**

- ACV < $50/mo --> Feature unlocks or credit (cash rewards too expensive relative to revenue)
- ACV $50-200/mo --> Double-sided credit or free months
- ACV > $200/mo --> Double-sided with meaningful value (free months, cash, or donation to charity)
- Affiliate --> 15-30% recurring commission (industry standard for SaaS)

---

## Optimization Matrix

| Problem | Diagnostic | Solution |
| --- | --- | --- |
| Low awareness | < 30% of users know program exists | Prominent in-app prompts at trigger moments, onboarding mention, email campaign |
| Low sharing rate | Users know but don't share | Simplify to one-click, increase incentive, improve copy, test share mechanisms |
| Low referred conversion | Clicks but no signups | Optimize referred user landing page, personalize experience, increase referred user incentive |
| Low reward redemption | Referrals happen but rewards unused | Simplify redemption, auto-apply credits, send reminders |
| Single referrals only | Users refer once then stop | Add tiers/gamification, send milestone reminders, refresh rewards |
| Fraud | Fake accounts, self-referrals | Verification rules (see Fraud Prevention) |

---

## Fraud Prevention

**Common fraud patterns:**

- Self-referrals (referring own secondary accounts)
- Fake account creation for rewards
- Coupon/referral code sharing on deal sites
- Organized referral rings

**Prevention checklist:**

- [ ] Require referred user to be active (not just signed up)
- [ ] Require payment or plan activation before reward triggers
- [ ] Limit referrals per user per time period
- [ ] Block same-IP or same-device referrals
- [ ] Monitor for unusual patterns (bulk referrals, instant signups)
- [ ] Set reward caps (e.g., max $500/year in credits)
- [ ] Require unique email domains (block +alias tricks)
- [ ] Manual review for high-value rewards

---

## Launch Checklist

### Pre-Launch (Week -2 to -1)

- [ ] Program type decided (referral / affiliate / hybrid)
- [ ] Incentive structure defined and costed
- [ ] Referral tracking infrastructure built or tool integrated
- [ ] Unique referral link generation working
- [ ] Referred user landing page created
- [ ] Reward distribution automated
- [ ] Fraud prevention rules configured
- [ ] Legal terms of service written
- [ ] Metrics dashboard set up

### Launch (Week 0)

- [ ] Launch email sent to all active users with unique referral link
- [ ] In-app referral prompt activated at trigger moments
- [ ] Referral page added to product navigation
- [ ] Support team briefed on program details
- [ ] Track: emails sent, links generated, shares made

### First 30 Days

- [ ] Day 7: Reminder email to non-sharers
- [ ] Day 14: Review metrics, identify drop-off points
- [ ] Day 21: A/B test incentive or share mechanism
- [ ] Day 30: Full analysis -- continue, adjust, or pivot

---

## Communication Sequence

| Timing | Email | Purpose |
| --- | --- | --- |
| Launch | "Share [Product] -- you both get [reward]" | Introduce program, include unique link |
| Day 7 | "Your referral link is waiting" | Remind non-sharers, highlight reward |
| Day 30 | "Your network could benefit from [Product]" | Re-engage with social proof |
| Day 60 | "[Customer] saved X hours thanks to you" | Success story, emotional trigger |
| Milestones | "You've referred X people -- here's your reward" | Celebrate progress, encourage more |
| Trigger-based | "[Achievement] -- share this with a colleague?" | In-product, at peak satisfaction |

**Email copy principles:**

- Lead with the benefit to the referred person, not the reward
- Include the unique referral link above the fold
- One CTA only -- "Share your link"
- Show current referral count if > 0

---

## Metrics & Benchmarks

### Core Metrics

| Metric | Formula | Good | Great |
| --- | --- | --- | --- |
| **Participation rate** | Users who share / Total active users | 5-10% | 15%+ |
| **Share rate** | Shares per participating user | 2-3 | 5+ |
| **Referred conversion** | Signups from referrals / Referral clicks | 10-15% | 25%+ |
| **Viral coefficient (K)** | Avg referrals per user x Conversion rate | 0.1-0.3 | 0.5+ |
| **Time to referral** | Avg days from signup to first referral | 30-60 days | < 14 days |

### Benchmark Data

- Referred customers have **16-25% higher LTV** than non-referred
- Referred customer retention is **18-37% better**
- Referred customers refer others at **2-3x the baseline rate**
- Double-sided programs convert **2-5x better** than single-sided

### Viral Coefficient

```
K = i x c

i = average invites per user
c = conversion rate per invite

K < 1.0 --> Program adds growth but not self-sustaining
K = 1.0 --> Each user brings one new user (viral)
K > 1.0 --> Exponential growth (rare, usually temporary)

Most SaaS referral programs: K = 0.1 - 0.4
Top programs (Dropbox-level): K = 0.6 - 0.9
```

---

## Tools

| Tool | Best For | Pricing |
| --- | --- | --- |
| **Rewardful** | Stripe-native affiliate/referral | From $49/mo |
| **Tolt** | SaaS-specific affiliate programs | From $29/mo |
| **Mention Me** | Enterprise referral programs | Custom pricing |
| **Dub.co** | Referral link tracking and analytics | Free tier available |
| **Built-in** | Simple invite-a-friend with unique codes | Dev time only |

**Build vs buy decision:**

- < 100 customers --> Build simple invite system (unique codes + tracking)
- 100-1000 customers --> Use Rewardful or Tolt
- 1000+ customers --> Evaluate enterprise tools or build custom

---

## Common Mistakes

**Launching without trigger moments:**
"Here's a referral link" in settings --> Nobody finds it. Prompt at peak satisfaction instead.

**Single-sided incentives only:**
"You get $10" --> Referred user has no reason to act. Double-sided converts 2-5x better.

**Complex reward mechanics:**
"Refer 5 people who each spend $50 within 90 days" --> Too complicated. Keep it one sentence.

**No referred user optimization:**
Generic signup page for referred users --> Conversion drops. Personalize the experience.

**Set and forget:**
Launch program and never optimize --> Participation decays. Review monthly, refresh quarterly.

---

## Integration

**Works with:**

- `growth-hacking` --> ICE scoring for referral experiments
- `product-led-growth` --> In-product viral loops and activation
- `saas-bootstrap` --> Referrals as one of the 3 High metrics
- `launch-strategy` --> Referral as post-launch growth channel

**Sequence for adding referral growth:**

1. `product-led-growth` --> Ensure activation and retention are solid
2. `referral-program` --> Design and launch referral loop
3. `growth-hacking` --> Run experiments to optimize each loop step
4. `saas-bootstrap` --> Monitor referrals as part of 3H/3L dashboard
