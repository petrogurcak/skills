---
name: ui
description: Use when designing or improving any UI — combines UX analysis with copywriting for interface text. Covers screens, components, pages, forms, modals, onboarding flows.
---

# UI Skill

Combined UX + copywriting workflow for interface work. Runs both disciplines together instead of separately.

## When to Use

- Designing new screens, pages, or components
- Improving existing UI (layout + copy together)
- Landing pages, forms, modals, onboarding flows
- Any "make this UI better" request

## Workflow

### Phase 1: Understand

Read the current UI (screenshot, code, or description). Identify:

- **What it is:** Page type, component, flow
- **Who sees it:** User segment, context, state
- **What it should do:** Primary action, success metric

### Phase 2: UX Analysis

Invoke `ux-orchestrator` to determine the right UX approach:

- New design or redesign → `ux-expert-dialogue` (section-by-section critique)
- Has conversion data → `ux-optimization` (data-driven)
- Clarity problem → `uvp-optimization` (positioning first)

Apply UX findings: layout, hierarchy, flow, interactions.

### Phase 3: Copy

Invoke `copywriting-orchestrator` to handle all interface text:

- Web pages → `web-copy` (headlines, CTAs, sections)
- Product UI → `product-copy` (descriptions, features)
- Onboarding/emails → `newsletter` (sequences)

Apply copy to the UX structure from Phase 2.

### Phase 4: Integration Check

Verify UX and copy work together:

| Check | Question |
|-------|----------|
| Hierarchy | Does the most important copy sit in the most prominent UI position? |
| Scannability | Can user get the point in 5 seconds without reading everything? |
| CTA clarity | Is there one clear primary action? Does the button text say what happens? |
| Consistency | Same tone, same terminology across all elements? |
| Mobile | Does the copy still work when the layout stacks vertically? |

## Quick Routing

| UI Type | UX Skill | Copy Skill |
|---------|----------|------------|
| Landing page | `ux-expert-dialogue` | `web-copy` |
| Product page | `ux-optimization` | `product-copy` |
| Form/checkout | `ux-optimization` | `web-copy` (microcopy) |
| Onboarding flow | `ux-expert-dialogue` | `newsletter` + `web-copy` |
| Dashboard/app screen | `ux-expert-dialogue` | `product-copy` |
| Modal/dialog | `ux-optimization` | `web-copy` (microcopy) |

## Iron Laws

- **UX before copy.** Structure first, words second. Don't write headlines for a broken layout.
- **Copy validates UX.** If you can't write a clear CTA, the flow is wrong.
- **One screen, one job.** If the copy needs to explain too much, the UI is doing too much.
