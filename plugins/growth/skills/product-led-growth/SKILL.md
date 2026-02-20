---
name: product-led-growth
description: Use when building self-serve products - Bowling Alley Framework, MOAT Framework for choosing Free Trial vs Freemium from Wes Bush's Product-Led Growth
---

# Product-Led Growth

## Overview

This skill helps build products that sell themselves using frameworks from Wes Bush's "Product-Led Growth". Use when optimizing onboarding, choosing pricing models, or reducing time-to-value.

**Announce:** "I'm using product-led-growth to optimize how users experience value."

## When to Use

**USE this skill:**

- "Should I use freemium or free trial?"
- "Users sign up but don't convert"
- "Onboarding is confusing"
- "How do I reduce time-to-value?"
- Building self-serve SaaS
- Product-led vs sales-led decision

**DON'T use this skill:**

- Creating compelling offers → `offer-creation`
- Positioning → `uvp-optimization`
- Growth experiments → `growth-hacking`
- SaaS metrics → `saas-bootstrap`

## Iron Law

```
TIME-TO-VALUE IS EVERYTHING

The faster users experience the "Aha!" moment,
the higher your conversion rate.

Every click between signup and value = lost users.
```

## Core Frameworks

### Framework 1: Bowling Alley Framework

**Purpose:** Design onboarding that guides users to value like bowling bumpers guide the ball.

**Metaphor:**

```
        SIGNUP                    "AHA!" MOMENT
           │                            │
           │    Product Bumpers         │
           │    ┌─────────────┐         │
           │    │  In-app     │         │
    ●──────┼────│  guidance   │─────────┼─────> VALUE
           │    └─────────────┘         │
           │    Conversational          │
           │    Bumpers                 │
           │    ┌─────────────┐         │
           │    │  Emails,    │         │
           │    │  notifs     │         │
           │    └─────────────┘         │
           │                            │
           ▼                            ▼
```

**Components:**

**1. The Straight Line**

- Shortest path from signup to "Aha!" moment
- Remove every unnecessary step
- Map current path, then ruthlessly cut

**2. Product Bumpers (In-App)**
| Bumper Type | Purpose | Example |
|-------------|---------|---------|
| Welcome message | Set expectations | "In 3 steps you'll..." |
| Product tour | Show key features | Guided walkthrough |
| Progress checklist | Show completion | "3 of 5 steps done" |
| Empty states | Guide action | "Create your first X" |
| Tooltips | Contextual help | Feature explanations |

**3. Conversational Bumpers (External)**
| Bumper Type | Purpose | Timing |
|-------------|---------|--------|
| Welcome email | Reinforce value | Immediately |
| Progress reminder | Re-engage | 24h if incomplete |
| Success tips | Prevent stuck | Day 2-3 |
| Win-back | Recover dropoffs | Day 7 if inactive |

**Implementation Steps:**

1. Define your "Aha!" moment (when users get value)
2. Map current signup-to-Aha path (all steps)
3. Create "straight line" (minimum steps)
4. Add product bumpers at friction points
5. Add conversational bumpers for recovery

---

### Framework 2: MOAT Framework

**Purpose:** Choose between Free Trial, Freemium, or Demo based on your situation.

**MOAT = Market, Ocean, Audience, Time-to-Value**

**Step 1: Market Strategy**

| Strategy           | Description                | Model Fit                      |
| ------------------ | -------------------------- | ------------------------------ |
| **Dominant**       | Better than existing (10x) | Freemium (show superiority)    |
| **Disruptive**     | Cheaper alternative        | Free Trial or Freemium         |
| **Differentiated** | Unique for niche           | Free Trial (needs explanation) |

**Step 2: Ocean Conditions**

| Ocean          | Description                         | Model Fit                                |
| -------------- | ----------------------------------- | ---------------------------------------- |
| **Red Ocean**  | Many competitors, known category    | Free Trial (differentiate by experience) |
| **Blue Ocean** | New category, no direct competition | Demo (needs education)                   |

**Step 3: Audience**

| Approach      | Description                      | Model Fit              |
| ------------- | -------------------------------- | ---------------------- |
| **Top-Down**  | Sell to executives, then rollout | Demo/Sales-led         |
| **Bottom-Up** | Users adopt, then spread         | Freemium or Free Trial |

**Step 4: Time-to-Value**

| Time-to-Value | Description         | Model Fit              |
| ------------- | ------------------- | ---------------------- |
| **Immediate** | Value in minutes    | Freemium               |
| **Short**     | Value in hours/days | Free Trial (7-14 days) |
| **Long**      | Value takes weeks   | Demo + onboarding      |

**Decision Matrix:**

```
              Fast TTV    │    Slow TTV
         ─────────────────┼─────────────────
Bottom-up │   FREEMIUM    │   FREE TRIAL
          │               │   (longer)
         ─────────────────┼─────────────────
Top-down  │   FREE TRIAL  │   DEMO +
          │               │   SALES
```

---

### Framework 3: The "Aha!" Moment

**Purpose:** Identify the moment users truly understand your value.

**Finding your Aha moment:**

1. Interview converted users: "When did you realize this was for you?"
2. Analyze data: What actions correlate with conversion?
3. Common patterns:
   - First successful [core action]
   - Inviting first team member
   - Completing first workflow
   - Seeing first result

**Examples:**

| Product | "Aha!" Moment                 |
| ------- | ----------------------------- |
| Slack   | Sending 2000 messages as team |
| Dropbox | Putting first file in folder  |
| Zoom    | Completing first video call   |
| Canva   | Downloading first design      |

**Optimizing for Aha:**

- Reduce steps to reach it
- Make it happen in first session
- Measure time-to-Aha
- A/B test paths to Aha

---

## Workflow

### Phase 1: Define Your Aha Moment

```
1. What action = user gets value?
2. How many steps from signup to that action?
3. What's the current time-to-Aha?
4. What's the conversion rate at each step?
```

### Phase 2: Apply MOAT Framework

Answer each question:

- [ ] Market Strategy: Dominant / Disruptive / Differentiated?
- [ ] Ocean: Red / Blue?
- [ ] Audience: Top-down / Bottom-up?
- [ ] Time-to-Value: Immediate / Short / Long?

→ Recommendation: [Free Trial / Freemium / Demo]

### Phase 3: Design Bowling Alley

```
1. Draw current path (all steps)
2. Create straight line (minimum steps)
3. Identify drop-off points
4. Add product bumpers at each point
5. Design conversational bumpers for recovery
```

### Phase 4: Measure and Iterate

Key metrics:

- Signup-to-Aha conversion rate
- Time-to-Aha
- Free-to-paid conversion
- Day 1, Day 7, Day 30 retention

---

## Quick Router

| Situation                           | Framework to Use              |
| ----------------------------------- | ----------------------------- |
| "Free trial or freemium?"           | MOAT Framework                |
| "Users sign up but don't convert"   | Bowling Alley (find drop-off) |
| "Onboarding is too long"            | Straight Line optimization    |
| "What's our key activation metric?" | Aha Moment analysis           |
| "Users don't come back"             | Conversational Bumpers        |

---

## Templates

### MOAT Analysis Template

```markdown
## Product: [Name]

### M - Market Strategy

Our approach: [ ] Dominant [ ] Disruptive [ ] Differentiated
Because: [Why]

### O - Ocean Conditions

We're in: [ ] Red Ocean [ ] Blue Ocean
Because: [Why]

### A - Audience

Our approach: [ ] Top-Down [ ] Bottom-Up
Because: [Why]

### T - Time-to-Value

Our TTV is: [ ] Immediate [ ] Short [ ] Long
Because: [Why]

### Recommendation

Based on MOAT: [ ] Freemium [ ] Free Trial [ ] Demo
Reasoning: [Summary]
```

### Bowling Alley Design

```markdown
## Product: [Name]

### Aha! Moment

[What action = value received?]

### Current Path (Signup → Aha)

1. [Step] - [Drop-off %]
2. [Step] - [Drop-off %]
3. [Step] - [Drop-off %]
   ...
   [Aha moment]

### Straight Line (Optimized)

1. [Essential step only]
2. [Essential step only]
3. [Aha moment]

### Product Bumpers

| Drop-off Point | Bumper Type   | Content   |
| -------------- | ------------- | --------- |
| After signup   | Welcome modal | [Content] |
| Step 2         | Tooltip       | [Content] |
| ...            | ...           | ...       |

### Conversational Bumpers

| Trigger      | Channel | Content             |
| ------------ | ------- | ------------------- |
| Signup       | Email   | [Welcome content]   |
| 24h inactive | Email   | [Re-engage content] |
| ...          | ...     | ...                 |
```

---

## PLG Metrics Dashboard

**Leading Indicators:**

- Signup rate
- Activation rate (reached Aha)
- Feature adoption
- Invite rate

**Lagging Indicators:**

- Free-to-paid conversion
- Revenue per user
- Churn rate
- LTV

**Benchmark targets:**
| Metric | Good | Great |
|--------|------|-------|
| Signup → Aha | 40%+ | 60%+ |
| Aha → Paid | 20%+ | 40%+ |
| Time-to-Aha | <5 min | <2 min |

---

## Common Mistakes

**Too many features in onboarding:**
"Let me show you everything!" → Focus only on path to Aha.

**Long free trials:**
30-day trial when value is immediate → User forgets why they signed up.

**No empty states:**
Blank dashboard after signup → User doesn't know what to do.

**Generic welcome emails:**
"Thanks for signing up!" → Should guide to Aha moment.

**Forcing account creation:**
"Create account to see demo" → Let them experience value first.

---

## Red Flags

**STOP and reassess if:**

- Can't define Aha moment → Product may lack clear value
- Time-to-Aha > 1 week → Consider demo/sales model
- High signup, zero activation → Onboarding broken
- Users complete onboarding but don't convert → Value proposition issue (`uvp-optimization`)

---

## Integration

**Before PLG optimization:**

- `uvp-optimization` → Clear positioning
- `offer-creation` → Compelling value proposition

**After PLG setup:**

- `growth-hacking` → Experiment on activation
- `ux-optimization` → Implement UX improvements
- `web-copy` → Onboarding copy optimization
