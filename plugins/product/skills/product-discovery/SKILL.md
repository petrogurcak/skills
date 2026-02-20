---
name: product-discovery
description: Use when you need to understand customer needs, validate ideas, or decide what to build - customer interviews, JTBD, Opportunity Solution Tree, The Mom Test
---

# Product Discovery

## Overview

Product discovery reduces risk around what to build. It answers: "Are we solving a real problem that matters to real people?"

**Core principle:** Talk to customers, map opportunities, test assumptions BEFORE building.

**Announce:** "I'm using product-discovery to understand customer needs before deciding what to build."

## When to Use

**USE this skill:**
- "What should we build next?"
- "Do customers actually want this?"
- "How do I validate this idea?"
- "I need to do user research"
- "How do I interview customers?"
- Feature requests piling up without clarity
- Building features nobody uses

**DON'T use this skill:**
- Prioritizing known opportunities → `product-prioritization`
- Defining long-term direction → `product-strategy`
- Measuring product health → `product-metrics`

## Iron Law

```
NO SOLUTION WITHOUT UNDERSTANDING THE PROBLEM FIRST

Discovery and delivery are PARALLEL tracks.
Discovery never stops. Talk to customers weekly.
```

## Core Frameworks

### Framework 1: Jobs To Be Done (JTBD)

**Purpose:** Understand WHY customers use your product. People don't buy products — they hire them to do specific jobs.

**The JTBD Statement:**

```
When I [situation/context],
I want to [motivation/job],
so I can [expected outcome].
```

**Job Types:**
| Type | Example | How to Discover |
|------|---------|----------------|
| Functional | "Cut a piece of wood" | Observe behavior |
| Social | "Impress my colleagues" | Ask about context |
| Emotional | "Feel secure about my data" | Listen for feelings |

**Classic Example (Christensen's Milkshake):**
- Fast food chain wanted to sell more milkshakes
- Asked customers what they wanted → bigger, cheaper, more flavors → nothing worked
- Observed: 40% of milkshakes bought before 8AM, alone, to-go
- The JOB: "Make my boring commute interesting and keep me full until lunch"
- Competitors: bananas, bagels, donuts — NOT other milkshakes
- Solution: thicker milkshake, flavor chunks, longer straw → sales up

**How to Apply:**
1. Pick a customer segment
2. Observe their behavior (don't ask what they want)
3. Identify the job they're hiring your product for
4. Map the full job chain (before, during, after)
5. Find underserved jobs (high importance, low satisfaction)

### Framework 2: Opportunity Solution Tree (Teresa Torres)

**Purpose:** Visually connect desired outcomes to customer opportunities to solutions to experiments. Prevents "solution jumping."

**Structure:**

```
        [Desired Outcome]          ← Business/product metric
              │
    ┌─────────┼─────────┐
    │         │         │
[Opportunity] [Opp]  [Opp]        ← Customer needs/pains/desires
    │
  ┌─┴──┐
  │    │
[Sol] [Sol]                        ← Possible solutions
  │
[Experiment]                       ← Test before building
```

**How to Apply:**
1. **Set desired outcome** — one measurable metric (not "improve everything")
2. **Map opportunities** — customer needs, pains, desires from interviews
3. **Break big opportunities into smaller ones** — smaller = more testable
4. **Generate multiple solutions per opportunity** — avoid first-idea bias
5. **Design experiments** — test assumptions before building

**Key Rules:**
- Start from outcome, NOT from solution ideas
- Opportunities come from customer research, not brainstorming
- Compare solutions within same opportunity (apples to apples)
- Small experiments before big bets

### Framework 3: The Mom Test (Rob Fitzpatrick)

**Purpose:** How to talk to customers without getting lied to. People are polite — they'll say your idea is great even when it's not.

**The Three Rules:**
1. **Talk about their life, not your idea** — "Tell me about the last time you..." not "Would you use a product that..."
2. **Ask about specifics in the past, not generics about the future** — "What did you do?" not "What would you do?"
3. **Talk less, listen more** — they should be talking 80% of the time

**Good vs Bad Questions:**

| Bad Question | Why Bad | Good Alternative |
|---|---|---|
| "Would you use this?" | Hypothetical, invites politeness | "How do you solve this today?" |
| "Would you pay for this?" | Everyone says yes | "How much do you currently spend on this?" |
| "Do you think this is a good idea?" | Opinion, not data | "Tell me about the last time you had this problem" |
| "What features would you want?" | Leading, solution-focused | "Walk me through your workflow" |
| "Would this be useful?" | Hypothetical | "What happened after you tried X?" |

**Commitment Signals (real validation):**
- Time: "Can I follow up next week?" (they say yes and show up)
- Reputation: "Would you introduce me to [colleague]?"
- Money: "Can I pre-sell you this?" (or letter of intent)

**When to Stop Interviewing:**
- No new information emerging (usually 15-20 interviews)
- Patterns are clear and repeated
- You can predict what the next person will say

### Framework 4: Continuous Discovery (Teresa Torres)

**Purpose:** Make discovery an ongoing habit, not a one-time project.

**The Product Trio:**
- Product Manager + Designer + Tech Lead
- All three participate in discovery together
- Shared understanding, no handoffs

**Weekly Cadence:**
```
Week rhythm:
├── Mon-Tue: Interview 1-2 customers (30 min each)
├── Wed: Synthesize + update Opportunity Solution Tree
├── Thu: Design experiments for top opportunities
└── Fri: Review experiment results, plan next week
```

**Outcome Types:**
| Type | Example | Best For |
|------|---------|---------|
| Business outcome | Grow revenue, reduce churn | Company goals |
| Product outcome | Increase activation rate | Team goals |
| Traction metric | Feature adoption rate | Feature goals |

**Key Habits:**
1. Interview at least 1 customer per week
2. Maintain a living Opportunity Solution Tree
3. Test at least 1 assumption per week
4. Never go more than 2 weeks without customer contact

## Process: Running Discovery

### Step 1: Define the Outcome

```
What metric are we trying to move?

✅ "Increase 30-day retention from 40% to 55%"
❌ "Make the product better"
❌ "Build feature X" (that's a solution, not an outcome)
```

### Step 2: Interview Customers (Mom Test style)

**Interview structure (30 minutes):**
1. Context (5 min): "Tell me about your role and what you're working on"
2. Current behavior (15 min): "Walk me through how you currently handle [problem area]"
3. Specific stories (10 min): "Tell me about the last time [specific situation]"

**Never ask:** "Would you use...?" / "Do you like...?" / "What features would you want?"

### Step 3: Map Opportunities (OST)

After 5-10 interviews, patterns emerge:
1. List all needs/pains/desires mentioned
2. Group into themes (opportunities)
3. Place on Opportunity Solution Tree under your outcome
4. Break large opportunities into sub-opportunities

### Step 4: Generate Solutions

For each top opportunity:
- Brainstorm 3-5 possible solutions
- Include "do nothing" as a baseline
- Mix build vs buy vs process change
- Don't fall in love with the first idea

### Step 5: Test Assumptions

Before building, identify riskiest assumption and test it:

| Risk Type | Question | Test Method |
|-----------|----------|-------------|
| Value | Will customers want this? | Fake door test, landing page |
| Usability | Can they figure it out? | Prototype test (5 users) |
| Feasibility | Can we build it? | Spike/proof of concept |
| Viability | Does the business model work? | Unit economics calculation |

## Quick Reference

| Framework | Core Question | When to Use |
|---|---|---|
| JTBD | "What job are they hiring us for?" | Understanding motivation |
| OST | "What opportunities connect to our outcome?" | Structuring discovery |
| Mom Test | "How do I get honest feedback?" | Customer interviews |
| Continuous Discovery | "How do I make this ongoing?" | Building habits |

## Common Mistakes

**Building without talking to customers:**
"We know what they want" → No, you don't. Interview 10 people this month.

**Asking leading questions:**
"Wouldn't it be great if...?" → "Tell me about the last time..."

**Solution jumping:**
"Let's build a chatbot!" → What's the customer opportunity? What are 3 other solutions?

**One-time discovery:**
"We did research in Q1" → Discovery is weekly, not quarterly.

**Interviewing only fans:**
Talking only to power users → Include churned users and non-users too.

## Integration

- Discovery findings → `product-prioritization` for ranking
- Customer jobs → `uvp-optimization` for positioning
- Validated solutions → `development-workflow` for building
- Metrics definition → `product-metrics` for tracking
