---
name: launch-strategy
description: Plans and executes product launches for SaaS, apps, and digital products. Covers launch type selection (soft/hard, MVP/full, PLG/sales-led), pre-launch audience building, multi-platform launch execution (Product Hunt, HN, Twitter/X, Reddit), and post-launch 30-60-90 day plan. Use when planning a product launch, preparing for Product Hunt or Hacker News, building a pre-launch waitlist, or deciding launch timing and channels. Triggers include "launch plan", "Product Hunt strategy", "how to launch", "pre-launch checklist", "go-to-market". NOT for ongoing growth experiments (use growth-hacking), product onboarding flows (use product-led-growth), pricing strategy (use pricing), or positioning work (use uvp-optimization).
metadata:
  author: Petr
  version: 1.0.0
---

# Launch Strategy

## Overview

A structured framework for planning and executing product launches. Combines proven methodologies from Rob Walling (The SaaS Playbook), April Dunford (Obviously Awesome), Sean Ellis (Hacking Growth), Jeff Walker (Product Launch Formula), and real-world case studies from Dropbox, Superhuman, Notion, and Figma.

**Announce:** "I'm using launch-strategy to plan your product launch."

## When to Use

**USE this skill:**

- Planning a new product or feature launch
- Preparing for Product Hunt, Hacker News, or multi-platform launch
- Building a pre-launch waitlist or audience
- Deciding between soft launch vs. hard launch
- Creating a go-to-market timeline
- Post-launch: first 90 days planning

**DON'T use this skill:**

- Ongoing growth experiments after launch → `growth-hacking`
- Product onboarding optimization → `product-led-growth`
- Pricing strategy and tiers → `pricing`
- Positioning and value proposition → `uvp-optimization`
- Creating the offer itself → `offer-creation`
- SaaS idea validation / bootstrap strategy → `saas-bootstrap`

## Quick Router

| User says...                                          | Go to...                          |
| ----------------------------------------------------- | --------------------------------- |
| "plan my launch", "go-to-market"                      | Full workflow (Phase 1-5)         |
| "soft or hard launch?"                                | Launch Type Decision Tree         |
| "Product Hunt launch", "PH strategy"                  | Product Hunt Playbook             |
| "Hacker News launch", "Show HN"                       | Hacker News Playbook              |
| "build audience before launch", "waitlist"             | Phase 2: Pre-Launch               |
| "where should I launch?", "which channels?"            | Launch Channels Guide             |
| "what to do after launch", "post-launch"               | Phase 4: Post-Launch (30-60-90)   |
| "launch timing", "when to launch"                      | Timing Guide                      |
| "why did my launch fail?", "launch mistakes"           | Common Mistakes                   |

---

## Launch Type Decision Tree

Before planning tactics, decide WHAT kind of launch you're running.

```
START: What stage is your product?
│
├── No product yet (idea/prototype)
│   └── MVP Launch
│       - Landing page + email capture
│       - Validate willingness to pay
│       - Pre-sell or waitlist
│       - Reference: Dropbox video MVP, Buffer pricing page MVP
│
├── Working product, untested with real users
│   └── Soft Launch
│       - Limited audience (beta users, community)
│       - Gather feedback, fix critical bugs
│       - Iterate on onboarding
│       - Duration: 2-6 weeks
│       - Then decide: iterate more or go hard
│
└── Product validated, onboarding works, early users retain
    └── Hard Launch
        │
        ├── Do users naturally share/invite others?
        │   └── YES → PLG Launch
        │       - Free tier / freemium / reverse trial
        │       - Viral loops built into product
        │       - Reference: Figma, Loom, Slack, Notion
        │
        ├── ACV > $5K/year? Long sales cycle?
        │   └── YES → Sales-Led Launch
        │       - Beachhead segment (Geoffrey Moore)
        │       - Case studies + ROI proof
        │       - Outbound + content marketing
        │
        └── Solo/bootstrapped, < $100/mo product?
            └── Community-Led Launch
                - Build in public (Pieter Levels)
                - Multi-platform: PH + HN + Twitter/X + IH
                - Email list as primary conversion channel
```

**Key gate before any hard launch:** Run Sean Ellis's PMF survey. If <40% of users would be "very disappointed" without your product, keep iterating. Do not scale what does not retain.

---

## Phase 1: Pre-Launch Foundation (8-4 weeks before)

The biggest secret: launches that generate immediate traction almost always spent weeks or months building anticipation. Launching to silence is the #1 mistake.

### 1.1 Positioning (prerequisite)

Before anything else, nail your positioning. Use `uvp-optimization` skill for the full framework.

Minimum viable positioning (April Dunford):

- **Competitive alternatives:** What would customers use if you didn't exist?
- **Unique attributes:** What do you have that alternatives don't?
- **Value:** What does that uniqueness enable for the customer?
- **Target customer:** Who cares most about that value?
- **Market category:** Where do you position so the value is obvious?

If you can't answer these five questions clearly, you are not ready to launch.

### 1.2 Launch Objectives

Define what success looks like (Rob Walling's 5-step process):

```
1. Primary metric: _____________ (signups, revenue, waitlist size)
2. Target number: _____________ (specific, measurable)
3. Timeframe: _________________ (launch day, first week, first month)
4. Secondary metrics: __________ (traffic, mentions, feedback quality)
5. Minimum viable outcome: _____ (below this = failed launch)
```

### 1.3 Pricing Decision

Charge from day one. Validate willingness to pay, not just interest.

Options:
- **Founding member pricing:** 30-50% discount, locked in, limited spots
- **Pre-sale:** Sell before building. If nobody buys, don't build.
- **Freemium:** Only if product has natural viral loop (PLG)
- **Free trial:** 7-14 days. Requires strong onboarding.

For full pricing strategy, use `pricing` skill.

---

## Phase 2: Pre-Launch Execution (4-2 weeks before)

### 2.1 Build the Audience

Pick 2-3 channels and start NOW. Not after launch — before.

**Fastest paths to launch audience:**

| Method              | Time needed | Best for                    | Expected result          |
| ------------------- | ----------- | --------------------------- | ------------------------ |
| Build in public     | 4-8 weeks   | Indie hackers, dev tools    | 500-2,000 followers      |
| Waitlist + referral | 2-4 weeks   | Any product with clear hook | 200-5,000 signups        |
| Community embedding | 4-12 weeks  | Niche B2B, specific verticals | 50-200 warm leads       |
| Email list          | 2-8 weeks   | Any product                 | 15-30% signup conversion |
| Partnerships        | 2-4 weeks   | Complementary products      | Access to existing audience |

### 2.2 Landing Page + Waitlist

Elements:
- One clear headline (positioning statement)
- Single CTA (join waitlist / get early access)
- Social proof if available (beta user quotes, advisor logos)
- Referral mechanic: "Move up the list by inviting friends"

Target: 15-30% visitor-to-signup conversion rate.

Tools: GetWaitlist, Prefinery, QueueForm, or simple email capture.

### 2.3 Pre-Launch Content Sequence

Jeff Walker's Product Launch Formula adapted for SaaS:

```
Week -4: Problem awareness
         "Here's what's broken about [current way]"
         Share on Twitter/X, relevant subreddits, communities

Week -3: Solution preview
         "Here's how we're solving it differently"
         Show screenshots, demo video, behind-the-scenes

Week -2: Social proof + anticipation
         Beta user results, waitlist count, expert endorsements
         "X people are already waiting"

Week -1: Final push + urgency
         Launch date announcement, founding member pricing reveal
         "Doors open [date] — founding members get 40% off forever"
```

### 2.4 Pre-Launch Checklist

```
Positioning:
[ ] Can explain product in one sentence
[ ] Know exactly who the target customer is
[ ] Know the competitive alternative and why you're different

Product:
[ ] Core value proposition works reliably
[ ] Onboarding gets user to "aha moment" in < 5 minutes
[ ] Payment processing works and tested
[ ] Analytics tracking live (AARRR funnel)

Launch assets:
[ ] Landing page live with email capture
[ ] Product Hunt page drafted (if using PH)
[ ] Launch announcement email drafted
[ ] Social media posts pre-written
[ ] First comment / story written (for PH/HN)
[ ] Demo video or GIF ready

Channels:
[ ] Email list of 200+ interested people
[ ] 2-3 communities engaged over past weeks
[ ] Launch supporters notified (friends, beta users, advisors)
[ ] Cross-promotion partners confirmed
```

---

## Phase 3: Launch Execution

### Multi-Platform Strategy

Never depend on a single channel. Coordinate across platforms for compounding effect.

**Recommended sequence (bootstrapped founder):**

```
Day -1:  Email teaser to waitlist ("Tomorrow is the day")
Day 0:   Product Hunt launch at 12:01 AM PT
         + Email blast to full list
         + Twitter/X thread
Day 0+4h: Submit to Hacker News (Show HN)
Day 0-1: Post on Indie Hackers, relevant subreddits
Day 1-3: Engage with every comment on every platform
Day 3-7: Follow-up email to non-converters
         Submit to directories (BetaList, Uneed, Peerlist)
```

### Launch Channels: Pros, Cons, Tactics

#### Product Hunt

- **Audience:** Tech-savvy early adopters, VCs, journalists
- **Pros:** Credibility badge, SEO backlink, discovery spike
- **Cons:** Saturated, one-shot, doesn't always convert to paying users
- **Conversion note:** Most PH launches fail AFTER Product Hunt because founders don't convert the traffic spike

**See: Product Hunt Playbook below.**

#### Hacker News (Show HN)

- **Audience:** Developers, technical founders, engineers
- **Pros:** Brutally honest feedback, high-quality traffic, strong credibility
- **Cons:** Anti-marketing culture, harsh, timing-dependent
- **Key rule:** Zero marketing language. Factual, direct, technical.

**See: Hacker News Playbook below.**

#### Twitter/X

- **Audience:** Startup/tech community, indie hackers
- **Pros:** Real-time engagement, viral potential, long-term audience
- **Cons:** Requires months of buildup, algorithm-dependent
- **Tactic:** Launch thread — problem, solution, demo, link. Pin it.

#### Reddit

- **Audience:** 500M+ monthly visitors in niche communities
- **Pros:** Highly engaged, authentic discussions
- **Cons:** Anti-self-promotion (will check your post history), 6-12 month strategy
- **Rule:** 90/10 — 90% value posts, 10% promotion. 2-3 weeks of genuine engagement before any mention of your product.

#### Indie Hackers

- **Audience:** Bootstrapped founders, indie makers
- **Pros:** 23.1% conversion per engaged post (highest of launch platforms)
- **Cons:** Requires 4-6 months of sustained engagement for best results
- **Tactic:** Journey posts with specific revenue numbers outperform everything else.

#### Email List

- **Audience:** People who already expressed interest
- **Pros:** Highest conversion channel. You own it. Segmentable.
- **Cons:** Requires pre-launch building effort
- **Tactic:** 3-email launch sequence: teaser (day -1), launch (day 0), follow-up (day +3)

#### AppSumo / Lifetime Deals

- **Audience:** 1.25M+ deal-seekers
- **Pros:** Thousands of users overnight, revenue injection, feedback + reviews
- **Cons:** LTD customers pay once but consume resources forever. Can restrict future pricing. Some buyers are low-quality.
- **Use only if:** Product scales without per-user support cost. Treat as beta validation, not core business model.

#### BetaList + Directories

- **Audience:** Early adopters hunting for new products
- **Pros:** Easy submission, multiple options (BetaList, Uneed, Peerlist, LaunchPedia)
- **Cons:** Smaller audiences. BetaList free queue takes weeks.
- **Tactic:** Submit to 5-10 directories as part of multi-platform strategy, not as sole channel.

---

## Product Hunt Playbook

Preparation starts 4-6 weeks before launch day.

### 4 Weeks Before

- [ ] Study top launches in your category (note titles, taglines, visuals)
- [ ] Get a Hunter or launch yourself (self-hunting is fine now)
- [ ] Build relationships with PH community members
- [ ] Create maker profile, fill out completely

### 1 Week Before

- [ ] Draft product page: name (60-70 chars, customer-focused), tagline, description
- [ ] Prepare 4-6 high-quality images or GIFs showing the product in action
- [ ] Write "first comment" — personal story: who you are, why you built it, what problem it solves
- [ ] Notify supporters: "I'm launching on [date], here's the link, your upvote and feedback would mean a lot"
- [ ] Pre-write social media posts for launch day

### Launch Day

- [ ] Launch goes live at 12:01 AM PT — be awake and ready
- [ ] Post first comment immediately
- [ ] Share link via email, Twitter/X, communities
- [ ] Respond to EVERY comment within 1 hour
- [ ] Distribute engagement throughout the day (avoid vote spikes — PH detects manipulation)
- [ ] Send reminder to supporters mid-day if momentum slows

### After

- [ ] Thank everyone who supported
- [ ] Follow up with every person who left a comment
- [ ] Convert PH visitors via email nurture sequence
- [ ] Add "Featured on Product Hunt" badge to your site

**Critical insight:** Ranking #1 is nice for ego. Converting the traffic spike into paying users is what matters. Have your onboarding and conversion funnel ready BEFORE launch day.

---

## Hacker News Playbook

HN is not a marketing channel. It is a technical community that happens to drive massive traffic when you earn it.

### Post Format

```
Show HN: [Product Name] – [What it does in plain language]
```

- No marketing language. No superlatives. No buzzwords.
- Factual, direct, technical.
- Good: "Show HN: Papertrail -- search and tail your remote log files from a web browser"
- Bad: "Show HN: Revolutionary AI-Powered Log Management Solution"

### First Comment

Write a personal, honest comment explaining:

1. What problem you solved and why
2. Technical decisions you made (HN loves this)
3. What's working and what's not yet
4. What feedback you're looking for

### Timing

- Post early in the week (Tuesday-Wednesday)
- US morning hours (8-10 AM ET) for maximum visibility
- Avoid competing with major tech news days

### Engagement Rules

- Respond to every comment, including critical ones
- Never ask for upvotes (detection algorithms are excellent — you will be penalized)
- Accept harsh feedback gracefully — HN respects humility
- Share technical details when asked
- If your site goes down from traffic, post an update — HN finds this endearing

### What Kills an HN Post

- Marketing/sales language in title or comments
- Asking for upvotes
- Landing pages instead of working products
- Not responding to comments
- Getting defensive about criticism

---

## Phase 4: Post-Launch (30-60-90 Days)

Launch is the starting line, not the finish line. Most products that succeed long-term have unremarkable launch days.

### Days 1-30: Listen and Fix

```
[ ] Respond to every piece of feedback (email, social, reviews)
[ ] Track AARRR metrics daily:
    - Acquisition: Where are users coming from?
    - Activation: Are they reaching the "aha moment"?
    - Retention: Are they coming back after day 1, day 7?
    - Referral: Are they sharing/inviting?
    - Revenue: Are they paying?
[ ] Fix the biggest activation blocker (>25% of users drop off after day 1)
[ ] Send personal emails to churned users asking why
[ ] Run PMF survey (Sean Ellis): target 40%+ "very disappointed"
[ ] Publish 2-3 content pieces about the launch journey
```

### Days 30-60: Optimize and Double Down

```
[ ] Identify winning acquisition channel (Bullseye Framework)
[ ] Double down on that channel, cut underperformers
[ ] Improve onboarding based on user feedback
[ ] Add social proof to landing page (testimonials, logos, numbers)
[ ] Start SEO content if organic is a viable channel (use seo-optimization)
[ ] Test pricing if initial conversion is low
[ ] Build referral mechanic if not already in product
```

### Days 60-90: Scale What Works

```
[ ] Systemize the winning acquisition channel
[ ] Launch v2 features based on user feedback
[ ] Consider second launch moment (PH re-launch, major feature, case study)
[ ] Measure LTV:CAC ratio — is this sustainable?
[ ] Evaluate: iterate, pivot, or scale?
```

**Key metric gates:**

| Metric                 | Healthy         | Warning         | Act now            |
| ---------------------- | --------------- | --------------- | ------------------ |
| PMF score              | >40%            | 25-40%          | <25%               |
| Day-7 retention        | >20%            | 10-20%          | <10%               |
| Free-to-paid           | >4%             | 2-4%            | <2%                |
| Monthly churn           | <5% (B2C)      | 5-10%           | >10%               |
| LTV:CAC                | >3:1            | 1-3:1           | <1:1               |

---

## Timing Guide

### Day of Week

| Day       | Product Hunt                  | Hacker News            | General                |
| --------- | ----------------------------- | ---------------------- | ---------------------- |
| Monday    | High efficiency (less competition) | Good                | People clearing backlog |
| Tuesday   | Most recommended              | Best                   | Peak engagement         |
| Wednesday | Most recommended              | Best                   | Peak engagement         |
| Thursday  | Good                          | Good                   | Still engaged           |
| Friday    | Avoid                         | Avoid                  | People check out        |
| Saturday  | Less competition, decent engagement | Lower traffic       | Can work for niche      |
| Sunday    | Avoid                         | Avoid                  | Lowest engagement       |

### Time of Day

- **Product Hunt:** Goes live 12:01 AM PT. Early upvotes weight heavily.
- **Hacker News:** Post 8-10 AM ET for maximum US audience visibility.
- **Twitter/X:** Align with your audience's timezone. For US tech: 9-11 AM ET.
- **Email:** Tuesday-Thursday, 10 AM recipient's local time.

### Seasonal

- **Avoid:** CES week (January), major holiday weeks, Black Friday week, industry conference weeks
- **Good:** Q1 (new year energy, new budgets), September (back-to-work), early Q4 (before holiday freeze)
- **Always check:** No competing major launches in your category that week

---

## Common Mistakes

**12 ways to kill your launch:**

1. **Launching to silence.** No audience built before launch day. The #1 killer. Fix: Start building audience 3-6 months before.

2. **No PMF validation.** Building something nobody wants. Fix: Run Sean Ellis survey. Pre-sell before building. Talk to 20+ potential customers.

3. **Poor positioning.** Customers can't understand what you are or why they should care. Fix: Use April Dunford's 5-component framework via `uvp-optimization`.

4. **Perfectionism.** Launching too late because "it's not ready yet." Fix: Launch when core value works reliably. MVP means minimum VIABLE, not minimum BROKEN (Pieter Levels).

5. **Single-channel dependency.** Betting everything on one Product Hunt launch. Fix: Multi-platform strategy across 3-5 channels. Email list as your owned backup.

6. **Wrong pricing.** Too low (unsustainable), too high (no adoption), or free (no validation). Fix: Charge from day one. Founding member pricing. Test willingness to pay.

7. **Weak onboarding.** Launch brings users, onboarding loses them. 25%+ drop off after day one. Fix: Get users to "aha moment" in under 5 minutes. Personalized onboarding if high-touch.

8. **No post-launch plan.** Treating launch as finish line. Fix: Plan 30-60-90 day strategy before launch day.

9. **Unrealistic projections.** Planning for 10x growth, getting 1x. Fix: Conservative estimates. Plan for 3x slower than expected. 12+ months runway.

10. **Bad timing.** Launching during holidays, competing with major events, wrong day of week. Fix: Tuesday-Thursday launch. Check for competing launches. Avoid seasonal dead zones.

11. **Cash flow blindness.** Spending too much pre-launch without revenue. Fix: Pre-sell, use LTDs for initial revenue, keep costs minimal.

12. **Feature over function.** Building innovative tech nobody asked for (the Quibi trap — $1.75B spent on a product nobody wanted). Fix: Build for validated problems, not cool features.

---

## Case Study References

**Study these for patterns, not for copying:**

| Company    | Key Launch Tactic                        | Result                           | Lesson                                      |
| ---------- | ---------------------------------------- | -------------------------------- | ------------------------------------------- |
| Dropbox    | Explainer video MVP on HN               | 5K to 75K waitlist overnight     | Validate with MVP before building fully     |
| Superhuman | 180K waitlist + personalized onboarding  | PMF score 22% to 58%, $260M val | Exclusivity + measured PMF iteration        |
| Notion     | 20K waitlist + Reddit community + templates | 95% organic, explosive adoption | Community-led growth compounds              |
| Figma      | 3 years in stealth building community   | Browser-based multiplayer won    | Remove all friction for sharing             |
| Slack      | Internal tool → friends → word-of-mouth  | Fastest B2B SaaS growth          | Solve your own pain, let product spread     |
| Loom       | Every shared video = marketing           | Viral adoption through usage     | Build viral loop into core product          |
| Photo AI   | Ship fast, charge day one, build in public | $0 to $132K MRR, solo founder  | Speed beats perfection                      |
| Quibi      | $1.75B raised, massive marketing spend   | Dead in 8 months                | Validate assumptions. Timing matters. Social features are table stakes. |

---

## Integration

**Works with:**

- `saas-bootstrap` -- Stair Step assessment before launch
- `product-led-growth` -- PLG launch model, free tier strategy
- `growth-hacking` -- Post-launch growth experiments (Bullseye Framework)
- `uvp-optimization` -- Positioning (prerequisite for launch)
- `offer-creation` -- Crafting the launch offer
- `pricing` -- Pricing strategy and founding member pricing

**Recommended sequence for new product:**

1. `saas-bootstrap` -- Am I ready? What step am I on?
2. `uvp-optimization` -- Nail positioning first
3. `pricing` -- Set pricing strategy
4. `offer-creation` -- Create compelling launch offer
5. **`launch-strategy`** -- Plan and execute the launch
6. `growth-hacking` -- Post-launch growth experiments
7. `product-led-growth` -- Optimize self-serve funnel
