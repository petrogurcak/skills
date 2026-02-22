---
name: ux-optimization
description: Diagnoses UX issues and provides concrete, code-ready solutions based on 213 real case studies, covering forms, e-commerce, design, mobile, A/B testing, performance, accessibility, admin dashboards, data tables, CRUD operations, navigation, persuasion patterns, and micro-interactions. Use when form conversion is below 50%, cart abandonment exceeds 70%, users miss CTAs, mobile UX is frustrating, or you need to set up A/B tests. Trigger phrases include "improve conversion", "optimize forms", "fix checkout", "A/B test", "UX audit". NOT for value proposition clarity issues (use uvp-optimization), expert design critique sessions (use ux-expert-dialogue), or writing copy (use web-copy).
metadata:
  author: Petr
  version: 1.0.0
---

# UX Optimization

## Overview

Evidence-based UX optimization from 213 real case studies (ILINČEV blog analysis).

**Core principle:** Data > opinions. Test everything. Implement proven patterns.

**Violating data-driven approach is violating the spirit of UX optimization.**

**Announce at start:** "I'm using the UX optimization skill to improve your [forms/e-shop/design/mobile]."

## The Iron Law

```
NO OPTIMIZATION WITHOUT DATA FIRST
NO DEPLOYMENT WITHOUT A/B TEST
```

If you haven't identified the problem with data, you cannot optimize.
If you haven't A/B tested, you cannot deploy to 100%.

## When to Use

Use this skill when optimizing:

- **Forms** - Low conversion (< 50%), high abandonment, validation errors
- **E-commerce** - Low add-to-cart, cart abandonment (> 70%), low AOV
- **Design** - Users miss CTAs, page feels cluttered, no visual hierarchy
- **Mobile** - Touch targets too small, forms frustrating, poor thumb ergonomics
- **A/B Testing** - Don't know what to test, when to stop test, how to prioritize
- **Performance** - Slow page load, images too large
- **Accessibility** - WCAG compliance, keyboard navigation

**Use ESPECIALLY when:**

- Manager says "just make it better" (vague = need diagnosis)
- Designer disagrees with data (data wins)
- "Our users are different" (cognitive biases are universal)
- Under time pressure (systematic faster than thrashing)

**Don't skip when:**

- Changes seem obvious (test anyway - 50% fail)
- Small change (small = big impact)
- Already implemented (rollback costs more than testing)

## The Four Phases

Copy this checklist to track progress:

```
UX Optimization Progress:
- [ ] Phase 1: Diagnose Problem (data-driven identification)
- [ ] Phase 2: Load Practice (route to relevant solution)
- [ ] Phase 3: Implement Solution (concrete code application)
- [ ] Phase 4: Measure Impact (A/B test and validate)
```

You MUST complete each phase before proceeding to the next.

### Phase 1: Diagnose Problem

**BEFORE proposing ANY solution:**

1. **Gather Data**
   - Google Analytics - where do users drop off?
   - Heatmaps (Hotjar, Clarity) - where do they click?
   - Session recordings - what do they do?
   - Form analytics (Zuko) - which fields cause abandonment?

2. **Identify Symptoms**

   ```
   Forms:
   - Conversion < 50% → investigate field count
   - Drop-off at validation → check error messages
   - Mobile abandonment → check keyboard types

   E-commerce:
   - Add-to-cart < 3% → check product photos
   - Cart abandonment > 70% → check checkout flow
   - AOV declining → investigate cross-sell

   Design:
   - Low CTA clicks → check contrast, size, position
   - High bounce → check visual hierarchy
   - Long time-on-page but no action → check whitespace

   Mobile:
   - Mis-taps → check touch target sizes
   - Form abandonment → check keyboard types
   ```

3. **Ask Diagnostic Questions**
   - What metric is underperforming?
   - Where exactly do users drop off?
   - What are common user complaints?
   - When did this start? (recent deploy?)
   - Is it device-specific? (mobile vs desktop)

4. **Route to Category**

   Based on symptoms, route to:

   ```
   Forms issues → practices/forms.md
   E-commerce issues → practices/ecommerce.md
   Design issues → practices/design.md
   Mobile issues → practices/mobile.md
   Testing questions → practices/ab-testing.md
   Performance → practices/performance.md
   Accessibility → practices/accessibility.md
   Admin dashboards → practices/admin-dashboard.md
   Data tables → practices/data-tables.md
   CRUD operations → practices/crud-operations.md
   Navigation → practices/sidebar-navigation.md
   Enterprise forms → practices/enterprise-forms.md
   Persuasion/behavioral → practices/persuasion-patterns.md
   Copy-UX issues → practices/copy-ux-patterns.md
   Empty states/onboarding → practices/empty-and-first-use.md
   Micro-interactions → practices/micro-interactions.md
   ```

### Phase 2: Load Practice

**REQUIRED SUB-SKILL:** Load relevant practice from practices/

Announce: "Loading practices/[category].md for specific solutions."

For each practice, you get:

- **Problem description** - What's broken
- **Solution** - How to fix it
- **Implementation** - Concrete code
- **Examples** - GOOD vs BAD
- **Expected impact** - % improvement from case studies
- **Checklist** - Verification steps

### Phase 3: Implement Solution

From loaded practice file:

1. **Get Concrete Code**
   - Copy-paste ready HTML/CSS/JS
   - Mobile-ready by default
   - Accessibility included (WCAG AA)

2. **See Working Examples**
   - **RECOMMENDED SUB-SKILL:** Use examples/ folder for complete code

3. **Use Checklist**
   - Verify each requirement
   - Test on real devices
   - Check edge cases

4. **Apply Pattern**
   - Don't just copy - understand WHY
   - Adapt to your context
   - Maintain consistency

### Phase 4: Measure Impact

**REQUIRED SUB-SKILL:** Use practices/ab-testing.md for test setup

Setup A/B test:

1. **Baseline Metric**
   - Current conversion rate
   - Current AOV
   - Current time-on-task

2. **ICE Prioritization**
   - **I**mpact (1-10): How much will it improve?
   - **C**onfidence (1-10): How sure are you?
   - **E**ase (1-10): How easy to implement?
   - Score = (I × C × E) / 1000
   - Test highest score first

3. **Sample Size**
   - Minimum: 100 conversions per variant
   - Statistical significance: 95%+
   - P-value: < 0.05
   - Duration: 1-2 full business cycles

4. **Deploy**
   - 50/50 traffic split
   - Run until significance
   - Winner → new baseline
   - Iterate

**NO full deploy without A/B test validation.**

## Quick Router

### Forms Problems

| Symptom                | Practice                  | Expected Impact     |
| ---------------------- | ------------------------- | ------------------- |
| Low conversion (< 50%) | practices/forms.md #1     | +10-30%             |
| Validation errors      | practices/forms.md #2     | +15-25%             |
| Password issues        | practices/forms.md #3, #4 | +10-20%             |
| Social login missing   | practices/forms.md #5     | +20-40% (18-25 age) |
| Mobile frustration     | practices/forms.md #6, #7 | +15-30%             |
| Generic errors         | practices/forms.md #8     | +10-15%             |

### E-commerce Problems

| Symptom                   | Practice                   | Expected Impact |
| ------------------------- | -------------------------- | --------------- |
| Low add-to-cart           | practices/ecommerce.md #9  | +20-40%         |
| "Is this the right size?" | practices/ecommerce.md #10 | +15-25%         |
| Cart uncertainty          | practices/ecommerce.md #11 | +10-20%         |
| Low AOV                   | practices/ecommerce.md #12 | +15-35%         |

### Design Problems

| Symptom        | Practice                | Expected Impact |
| -------------- | ----------------------- | --------------- |
| Missed CTAs    | practices/design.md #13 | +25-50%         |
| No focus       | practices/design.md #14 | +15-30%         |
| Cluttered feel | practices/design.md #15 | +10-20%         |

### Value Proposition / Messaging Problems

| Symptom                      | Solution                                    | Expected Impact             |
| ---------------------------- | ------------------------------------------- | --------------------------- |
| Users don't understand offer | → Use `uvp-optimization` skill              | +40-240% (see case studies) |
| Low homepage conversion      | → Define/test UVP with `uvp-optimization`   | +100%+ possible             |
| "What do you do?" confusion  | → Five-second test (see `uvp-optimization`) | Clarity baseline            |
| Generic messaging            | → Choose positioning framework              | Differentiation             |

**Note:** UVP clarity is FOUNDATIONAL. If users don't understand your offer in 5 seconds, design optimization won't fix it. Define UVP first, then optimize presentation.

### A/B Testing Questions

| Question            | Practice                    |
| ------------------- | --------------------------- |
| What to test first? | practices/ab-testing.md #16 |
| When to stop test?  | practices/ab-testing.md #17 |

### Mobile Problems

| Symptom          | Practice                | Expected Impact |
| ---------------- | ----------------------- | --------------- |
| Mis-taps         | practices/mobile.md #18 | +20-35%         |
| Form abandonment | practices/mobile.md #19 | +25-40%         |

### Performance Issues

| Symptom   | Practice                          | Expected Impact   |
| --------- | --------------------------------- | ----------------- |
| Slow load | practices/performance.md #20, #21 | -30-50% load time |

### Accessibility Issues

| Issue           | Practice                            |
| --------------- | ----------------------------------- |
| WCAG compliance | practices/accessibility.md #22, #23 |

### Admin Dashboard Problems

| Symptom             | Practice                         | Expected Impact       |
| ------------------- | -------------------------------- | --------------------- |
| Cluttered dashboard | practices/admin-dashboard.md #30 | +20-40% clarity       |
| Wrong chart types   | practices/admin-dashboard.md #31 | +30-55% understanding |
| Generic widgets     | practices/admin-dashboard.md #32 | +25% usability        |
| No personalization  | practices/admin-dashboard.md #33 | +15-25% satisfaction  |

### Data Table Problems

| Symptom             | Practice                     | Expected Impact     |
| ------------------- | ---------------------------- | ------------------- |
| Hard to scan tables | practices/data-tables.md #34 | +15-25% scan speed  |
| Can't find data     | practices/data-tables.md #35 | +20-35% findability |
| Pagination issues   | practices/data-tables.md #36 | +15-30% navigation  |
| Slow loading        | practices/data-tables.md #37 | -30-50% load time   |
| Poor bulk actions   | practices/data-tables.md #38 | +60-80% efficiency  |

### CRUD Problems

| Symptom              | Practice                         | Expected Impact           |
| -------------------- | -------------------------------- | ------------------------- |
| Low create rate      | practices/crud-operations.md #39 | +10-25% completion        |
| Data loss on edit    | practices/crud-operations.md #40 | -30-50% incidents         |
| Accidental deletes   | practices/crud-operations.md #41 | -50-80% errors            |
| Slow bulk operations | practices/crud-operations.md #42 | +60-80% efficiency        |
| Perceived slowness   | practices/crud-operations.md #43 | +200-500% perceived speed |

### Navigation Problems

| Symptom             | Practice                            | Expected Impact           |
| ------------------- | ----------------------------------- | ------------------------- |
| Users get lost      | practices/sidebar-navigation.md #44 | +20-35% orientation       |
| Deep nesting issues | practices/sidebar-navigation.md #45 | +15-30% findability       |
| Icons unclear       | practices/sidebar-navigation.md #46 | +25% recognition          |
| Poor mobile nav     | practices/sidebar-navigation.md #47 | +30-50% mobile efficiency |

### Enterprise Form Problems

| Symptom               | Practice                          | Expected Impact    |
| --------------------- | --------------------------------- | ------------------ |
| Long form abandonment | practices/enterprise-forms.md #48 | +25-40% completion |
| Validation confusion  | practices/enterprise-forms.md #49 | +15-25% completion |
| Slow data entry       | practices/enterprise-forms.md #50 | +40-60% speed      |
| Unclear form status   | practices/enterprise-forms.md #51 | +20% confidence    |

### Persuasion & Behavioral Patterns

| Symptom                         | Practice                             | Expected Impact |
| ------------------------------- | ------------------------------------ | --------------- |
| Low trust, no reciprocity       | practices/persuasion-patterns.md #52 | +20-30%         |
| Positive framing not converting | practices/persuasion-patterns.md #53 | +30% CTR        |
| No urgency/scarcity             | practices/persuasion-patterns.md #54 | +10-25%         |
| Users hesitant to commit        | practices/persuasion-patterns.md #55 | +17%            |
| Low opt-in rates                | practices/persuasion-patterns.md #56 | 2-3x            |
| Low retention/engagement        | practices/persuasion-patterns.md #57 | +40-60%         |
| Weak social proof               | practices/persuasion-patterns.md #58 | +15-25%         |

### Copy-UX Patterns

| Symptom                   | Practice                          | Expected Impact |
| ------------------------- | --------------------------------- | --------------- |
| Generic button text       | practices/copy-ux-patterns.md #59 | +25-40%         |
| Weak/uncertain language   | practices/copy-ux-patterns.md #60 | +15-20%         |
| Formal form labels        | practices/copy-ux-patterns.md #61 | +5-15%          |
| Unclear target audience   | practices/copy-ux-patterns.md #62 | +20-35%         |
| Impersonal/corporate feel | practices/copy-ux-patterns.md #63 | +15-25%         |
| Company-centric messaging | practices/copy-ux-patterns.md #64 | +10-15%         |
| Dry product descriptions  | practices/copy-ux-patterns.md #65 | +15-20%         |

### Empty States & First Use

| Symptom                       | Practice                             | Expected Impact |
| ----------------------------- | ------------------------------------ | --------------- |
| Users confused on first visit | practices/empty-and-first-use.md #66 | +30-50%         |
| Signup wall kills activation  | practices/empty-and-first-use.md #67 | +25-40%         |
| Low completion of multi-step  | practices/empty-and-first-use.md #68 | +15-25%         |
| Power users feel limited      | practices/empty-and-first-use.md #69 | +20-30%         |
| Users abandon complex flows   | practices/empty-and-first-use.md #70 | +15-20%         |

### Micro-Interactions

| Symptom                       | Practice                            | Expected Impact |
| ----------------------------- | ----------------------------------- | --------------- |
| Jarring UI changes            | practices/micro-interactions.md #71 | +10-15%         |
| Users unsure if action worked | practices/micro-interactions.md #72 | +15-25%         |
| Too many confirmation dialogs | practices/micro-interactions.md #73 | +20-30%         |
| Hard to scan item status      | practices/micro-interactions.md #74 | +25-35%         |
| Users miss content below fold | practices/micro-interactions.md #75 | +15-20%         |

## Key Principles

| Principle             | Application                         | Evidence                          |
| --------------------- | ----------------------------------- | --------------------------------- |
| **Data > opinions**   | Always A/B test before 100% deploy  | 50% of changes hurt metrics       |
| **Psychology first**  | Use Cialdini 6 principles           | +15-40% avg improvement           |
| **Minimize friction** | Each form field = -5-10% conversion | Baymard Institute research        |
| **Mobile-first**      | 60%+ traffic is mobile              | Design for thumb zone             |
| **Test everything**   | "Best practices" context-dependent  | Test in YOUR context              |
| **Small changes**     | Big impact from tiny tweaks         | Case study: one page = 8× revenue |
| **Continuous**        | Never done, always iterating        | Compound improvements             |

## Practice Files Pattern

Each practices/\*.md follows this structure:

```markdown
# [Category] Optimization Practices

Based on 213 case studies from ILINČEV blog.

## Practice #X: [Name]

**PROBLÉM:** [Specific issue]

**ŘEŠENÍ:** [Concrete fix]

**IMPLEMENTACE:**

1. [Step-by-step]
2. [With checklists]

**KÓD:**
[Copy-paste ready code with comments]

**PŘÍKLADY:**
❌ ŠPATNĚ: [What not to do]
✅ SPRÁVNĚ: [What to do]

**OČEKÁVANÝ DOPAD:** +X-Y% [metric] (based on case study Z)

**A/B TEST SETUP:**

- Baseline: [current metric]
- Variant: [proposed change]
- Sample: [min 100 conversions]
- Duration: [1-2 weeks]

**CHECKLIST:**

- [ ] [Verification step]
- [ ] [Verification step]
```

## Case Studies (Real Results)

From 20+ documented case studies (ILINČEV, Czech, World-class):

| Client            | Change                             | Result                              | Source   |
| ----------------- | ---------------------------------- | ----------------------------------- | -------- |
| Spa.cz            | Complete redesign + AB tests       | **+21.5% orders**                   | ILINČEV  |
| Trenýrkarna.cz    | 6-year optimization                | **400% revenue growth**             | ILINČEV  |
| Anonymous         | Single page optimization           | **680% revenue increase**           | ILINČEV  |
| eBay              | Enterprise conversion optimization | **+18% uplift**                     | Invesp   |
| 3M                | B2B e-commerce transformation      | **+50% conversion**                 | Invesp   |
| Soft Surroundings | Multi-device optimization          | **+42% desktop, +35% mobile**       | Invesp   |
| Z Gallerie        | Rapid ROI achievement              | **4× ROI in week 1**                | Invesp   |
| GoodUI Modal      | Signup optimization                | **+191% signups**                   | GoodUI   |
| GoodUI Homepage   | Simplification                     | **+232% signups**                   | GoodUI   |
| GoodUI Pricing    | Page optimization                  | **+48% purchases**                  | GoodUI   |
| Baymard           | Checkout field reduction           | **22% abandon from complexity**     | Research |
| Baymard           | Phone field explanation            | **14% abandon without explanation** | Research |
| Čeština 2.0       | Navigation naming                  | **+40% page views**                 | Czech    |
| Key4You.cz        | Cart cross-sell                    | **+5% AOV**                         | Czech    |
| ČT edu            | Carousel elimination               | **3× CTR increase**                 | Czech    |
| Dima Melnik       | Pricing psychology (18 tips)       | **11% → 52% premium acceptance**    | Expert   |

**See CASE-STUDIES.md for 21 detailed breakdowns**

## Common Rationalizations

| Excuse                      | Reality                      | Evidence                      |
| --------------------------- | ---------------------------- | ----------------------------- |
| "Too simple to optimize"    | Small changes = big ROI      | +10-30% avg                   |
| "Our users are different"   | Cognitive biases universal   | Cialdini research             |
| "No time for A/B tests"     | One bad deploy costs more    | 50% changes hurt              |
| "We need more features"     | Fewer fields > more features | Each field -5-10%             |
| "Designer knows best"       | Data knows best              | Design without data = opinion |
| "I already tested it"       | Manual ≠ systematic          | A/B = proof                   |
| "That can't matter"         | Everything matters           | Micro-optimizations compound  |
| "Just this once, skip test" | One shortcut = many bugs     | Systematic = faster           |

**All of these mean: Go back to Phase 1. Gather data.**

## Red Flags - STOP and Diagnose First

- Proposing solution before seeing data
- "I think users want..." without evidence
- Skipping A/B test "this time"
- "It's obvious" (nothing is obvious)
- "Our case is special" (it isn't)
- Deploying 100% immediately
- Not tracking metrics
- Can't articulate expected impact
- "We'll measure later" (you won't)

**All of these = violation of Iron Law. Return to Phase 1.**

## Verification Checklist

Before marking optimization complete:

**Phase 1 - Diagnosis:**

- [ ] Data gathered (Analytics, heatmaps, recordings)
- [ ] Problem identified with specific metric
- [ ] Symptom matched to category
- [ ] Relevant practice file identified

**Phase 2 - Practice Loading:**

- [ ] Correct practice file loaded
- [ ] Problem description matches
- [ ] Expected impact noted

**Phase 3 - Implementation:**

- [ ] Code implemented from examples
- [ ] Mobile-tested (real device, not just Chrome DevTools)
- [ ] Accessibility checked (keyboard nav, screen reader, contrast)
- [ ] Edge cases handled
- [ ] All checklist items verified

**Phase 4 - Measurement:**

- [ ] Baseline metric captured
- [ ] A/B test setup (50/50 split)
- [ ] Sample size calculated
- [ ] Monitoring dashboard created
- [ ] Success criteria defined

**Post-Deploy:**

- [ ] Test reached significance (95%+, p < 0.05)
- [ ] Minimum 100 conversions per variant
- [ ] Winner documented
- [ ] Learnings shared with team
- [ ] Next optimization identified

Can't check all boxes? Return to appropriate phase.

## When Stuck

| Problem                  | Solution                          |
| ------------------------ | --------------------------------- |
| Don't know what's broken | Use Analytics + heatmaps first    |
| Multiple issues          | Prioritize with ICE framework     |
| Test inconclusive        | Run longer (min 100 conversions)  |
| Change hurt metrics      | Rollback, analyze why, iterate    |
| Team disagrees           | Let data decide (A/B test both)   |
| No traffic for A/B       | Optimize high-traffic pages first |

## Integration with Other Skills

This skill works with:

- **superpowers:test-driven-development** - Write tests for form validation
- **superpowers:verification-before-completion** - Verify all metrics before claiming done
- **superpowers:systematic-debugging** - Debug failed A/B tests
- **superpowers:brainstorming** - Brainstorm alternative approaches before implementing

## Example Workflow

**User:** "Our registration has 12% completion rate"

**Assistant:** "I'm using the UX optimization skill to improve your registration.

**Phase 1: Diagnose**
Looking at symptoms: 12% completion (< 50% baseline)
→ Routing to practices/forms.md

**Phase 2: Load Practice**
Loading forms.md #1 (Minimize fields)

**Analysis:**

- Current: Probably 8-12 fields
- Problem: Each field -5-10% conversion
- Solution: Reduce to 2 fields (email + password)

**Phase 3: Implement**
[Provides concrete code from examples/]

**Phase 4: Measure**
Setting up A/B test:

- Baseline: 12% conversion
- Expected: 18-36% (+50-200% relative)
- Sample: Run until 100 registrations per variant
- Duration: 1-2 weeks

**Deploy 50/50 split, monitor, report results.**"

## Final Rule

```
Optimization → data exists and test completed
Otherwise → not UX optimization, just changes
```

No exceptions without your human partner's permission.

**Remember:** "I think" < "I tested" < "I proved with data"

---

_Based on 213 case studies from ILINČEV.com blog_
_All practices backed by real results_
_Use with confidence_
