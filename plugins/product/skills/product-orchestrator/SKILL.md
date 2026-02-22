---
name: product-orchestrator
description: Routes product management questions to the right specialized skill (discovery, prioritization, strategy, PMF, metrics) based on problem type. Use for any general product decision or strategy question when you are unsure which specific product skill to invoke. Triggers include "help with product", "what should we build", "product advice", "how do I approach this product problem". Do NOT use when you already know the specific sub-skill needed — call it directly instead.
metadata:
  author: Petr
  version: 1.0.0
---

# Product Orchestrator

## Overview

This skill orchestrates product management work by detecting problem type and routing to the appropriate specialized skill. It does NOT implement solutions itself - it routes to specialists.

**Philosophy:**

```
Orchestrator = Product Lead
Specialized Skills = Domain Experts

The lead coordinates which expert handles which problem.
```

**Announce:** "I'm using product-orchestrator to determine the right product approach."

## When to Use

**USE this skill:**

- Any product decision or strategy question
- "What should we build next?"
- "How do we know if users want this?"
- "How do I prioritize my backlog?"
- "Do we have product-market fit?"
- "What metrics should we track?"
- Product strategy and roadmap questions

**DON'T use this skill:**

- Already know exact need -> use specialist directly
- UX/UI optimization -> `ux-orchestrator`
- Marketing/positioning -> `marketing-orchestrator`
- Growth experiments -> `growth-hacking`
- Copywriting -> `copywriting-orchestrator`

## Problem Type Detection

### Step 1: Keyword Detection

| Keywords in Request                                                                  | Detected Type      | Specialist Skill         |
| ------------------------------------------------------------------------------------ | ------------------ | ------------------------ |
| `prioritize`, `backlog`, `what first`, `RICE`, `rank features`                       | Prioritization     | `product-prioritization` |
| `customer needs`, `interview`, `discovery`, `JTBD`, `user research`, `what to build` | Discovery          | `product-discovery`      |
| `vision`, `strategy`, `roadmap`, `OKR`, `goals`, `direction`                         | Strategy           | `product-strategy`       |
| `product-market fit`, `PMF`, `retention`, `churn`, `are we building the right thing` | Product-Market Fit | `product-market-fit`     |
| `metrics`, `KPI`, `measure`, `north star`, `AARRR`, `track`                          | Metrics            | `product-metrics`        |

### Step 2: Context Detection

```
Is user asking about WHAT to build?
├─ Need to understand customers → product-discovery
├─ Need to choose between options → product-prioritization
│
Is user asking about WHY / WHERE to go?
├─ Long-term direction → product-strategy
├─ Are we on the right track? → product-market-fit
│
Is user asking about HOW to measure?
├─ What metrics matter → product-metrics
│
Still unclear?
└─ ASK user (see Step 3)
```

### Step 3: Ask if Unclear

```
I need to understand your product challenge:

A) Discovery - "We don't know what customers need" (interviews, JTBD, opportunity mapping)
B) Prioritization - "We have too many ideas, which ones first?" (RICE, ICE, Kano)
C) Strategy - "We need direction and a roadmap" (vision, OKRs, product strategy)
D) Product-Market Fit - "Are we building the right thing?" (PMF survey, PMF engine)
E) Metrics - "What should we measure?" (North Star, AARRR, HEART)
```

## Skill Integration

### Skills this orchestrator calls:

```
product-orchestrator
        │
        ├── product-discovery
        │   └── Customer interviews, JTBD, Opportunity Solution Tree
        │   └── The Mom Test, continuous discovery habits
        │
        ├── product-prioritization
        │   └── RICE, ICE, MoSCoW, Kano, Value vs Effort
        │   └── Stakeholder alignment
        │
        ├── product-strategy
        │   └── Product vision, OKRs, roadmapping
        │   └── Product Operating Model (Cagan/SVPG)
        │
        ├── product-market-fit
        │   └── PMF Survey (Sean Ellis), PMF Engine (Superhuman)
        │   └── Crossing the Chasm, adoption lifecycle
        │
        └── product-metrics
            └── North Star, AARRR, HEART framework
            └── Stage-based metric selection
```

## Standard Workflow

### Phase 1: Detection

Detect problem type using keywords and context (see above).

### Phase 2: Prerequisite Check

**Discovery is foundational.** If you don't understand customer needs, other product work won't help.

```
Do you understand your customers' core jobs/needs?
├─ NO → Start with product-discovery
├─ YES → Proceed to detected specialist
│
Is this a new product/feature?
├─ YES → Discovery first → Strategy → Prioritization
│
Is PMF unclear?
├─ YES → product-market-fit before scaling
```

### Phase 3: Call Specialist

Invoke appropriate skill:

> "Using product-discovery to map customer opportunities."

The specialist skill handles its own workflow.

### Phase 4: Cross-Skill Integration

Skills reference each other:

| Skill                    | Often Leads To                                               |
| ------------------------ | ------------------------------------------------------------ |
| `product-discovery`      | `product-prioritization` (rank discovered opportunities)     |
| `product-prioritization` | `product-strategy` (update roadmap with priorities)          |
| `product-strategy`       | `product-metrics` (define success measures)                  |
| `product-market-fit`     | `product-discovery` (if PMF low, learn more about customers) |
| `product-metrics`        | `product-market-fit` (metrics reveal PMF status)             |

## Complete Product Projects

### Sequence: New Product

```
1. product-discovery
   └── Understand customer jobs, pains, gains
   └── Map opportunities with OST

2. product-strategy
   └── Define vision and product strategy
   └── Set OKRs

3. product-prioritization
   └── Rank opportunities and solutions
   └── Build initial roadmap

4. product-metrics
   └── Define North Star and supporting metrics
   └── Set up measurement

5. product-market-fit (after launch)
   └── Measure PMF with Sean Ellis survey
   └── Iterate with PMF Engine
```

### Sequence: Existing Product Optimization

```
1. product-market-fit
   └── Measure current PMF score
   └── Identify High-Expectation Customer (HXC)

2. product-discovery
   └── Deep dive into HXC needs
   └── Continuous discovery habits

3. product-prioritization
   └── Prioritize based on discovery insights

4. product-metrics
   └── Track impact of changes
```

## Quick Reference

| Problem Type    | Specialist Skill         | Core Approach                                |
| --------------- | ------------------------ | -------------------------------------------- |
| What to build   | `product-discovery`      | Interview → JTBD → Opportunity Solution Tree |
| What first      | `product-prioritization` | Score → Rank → Align stakeholders            |
| Where to go     | `product-strategy`       | Vision → Strategy → OKRs → Roadmap           |
| Right thing?    | `product-market-fit`     | Survey → Segment → Optimize → Repeat         |
| What to measure | `product-metrics`        | Stage → North Star → Supporting metrics      |

## Iron Laws (from specialists)

**From product-discovery:**

```
NO SOLUTION WITHOUT UNDERSTANDING THE PROBLEM FIRST
Talk to customers weekly, not quarterly.
```

**From product-prioritization:**

```
DATA OVER OPINIONS
If you can't score it, you can't prioritize it.
```

**From product-strategy:**

```
OUTCOMES OVER OUTPUTS
Empowered teams solve problems, not ship features.
```

**From product-market-fit:**

```
IF < 40% "VERY DISAPPOINTED", DON'T SCALE
Fix retention before investing in growth.
```

**From product-metrics:**

```
ONE NORTH STAR, NOT TWENTY DASHBOARDS
If everything is a priority, nothing is.
```

## Common Mistakes

**Skipping discovery:**
"Let's just build it and see" → Understand the job-to-be-done first.

**Prioritizing by gut:**
"The CEO wants this feature" → Use RICE/ICE scoring, then have the stakeholder conversation.

**Strategy without metrics:**
"Our strategy is to be the best" → Define measurable OKRs and a North Star metric.

**Scaling before PMF:**
"Let's invest in marketing" → Measure PMF first. If < 40%, fix the product.

**Vanity metrics:**
"We have 10K signups!" → What's activation rate? Retention? Revenue per user?

## Integration with Other Skills

**Marketing integration:**

- After product-strategy → `marketing-orchestrator` for go-to-market
- After product-market-fit → `growth-hacking` for scaling
- Discovery insights → `uvp-optimization` for positioning

**Development integration:**

- After prioritization → `development-workflow` for implementation
- Product metrics → `analytics-setup` for tracking

**UX integration:**

- Discovery insights → `ux-orchestrator` for UX decisions
- Product metrics → `ux-optimization` for conversion work
