---
name: launch-orchestrator
description: Use when planning a product launch and the product type is unclear or could be either generic (SaaS/app/physical) or info-product. Routes between marketing:launch-strategy (generic launches) and marketing:info-product-launch (courses, memberships, ebooks, cohorts, communities). Trigger phrases - "launch", "spuštění", "go-to-market", "product launch", "release strategy", "uvedení na trh", "launch plan", "spuštění produktu", "launch sequence", "launch strategy". Do NOT trigger when product type is already clear (use specific skill directly).
metadata:
  author: Petr
---

# Launch Orchestrator

Routes launch-planning requests to the right specialist based on product type. This skill does NOT plan launches itself — it detects whether the product is generic (SaaS, app, physical, service) or info-product (course, membership, ebook, cohort, community) and delegates to the right sub-skill. Two launch playbooks share DNA (pre-launch list, beta, testimonials, offer mechanics) but diverge sharply in cadence, pricing, and sales mechanic — picking the wrong one wastes the launch window.

**Philosophy:**

```
marketing-orchestrator (top router for all marketing)
        ↓ detects "launch, spuštění, go-to-market, release"
        
launch-orchestrator (this skill — launch family router)
        ↓ detects product type
        ├── launch-strategy        (GENERIC — SaaS, apps, physical, services, hardware)
        └── info-product-launch    (INFO — courses, memberships, ebooks, cohorts, communities)
```

**Announce:** "Using launch-orchestrator to route this launch request."

---

## Detection Rules — Which Sub-Skill?

| User says... | Product type | Route to |
|---|---|---|
| `SaaS launch`, `app release`, `uvedení SaaS`, `web product launch` | Software product | **launch-strategy** |
| `iOS app launch`, `Android app release`, `mobilní app spuštění` | Mobile app | **launch-strategy** |
| `hardware launch`, `physical product`, `e-commerce launch`, `produktová řada` | Physical goods | **launch-strategy** |
| `service launch`, `agency launch`, `consulting launch`, `spuštění služby` | Service / agency | **launch-strategy** |
| `course launch`, `kurz launch`, `spuštění kurzu`, `online kurz` | Online course | **info-product-launch** |
| `cohort launch`, `bootcamp launch`, `mastermind launch`, `skupinový program` | Cohort program | **info-product-launch** |
| `membership launch`, `community launch`, `launch členské sekce`, `placená komunita` | Membership / community | **info-product-launch** |
| `ebook launch`, `paid newsletter`, `digitální produkt launch`, `info-produkt` | Digital content product | **info-product-launch** |
| `PLF`, `Product Launch Formula`, `open cart / close cart`, `launch sequence Jeff Walker` | PLF-style launch | **info-product-launch** |
| Generic `launch` / `spuštění` without product type | Unknown | **ASK** |

### Ask if unclear

```
Co přesně spouštíš?

A) SaaS / web app / mobilní app                → launch-strategy
B) Fyzický produkt / hardware / e-shop         → launch-strategy
C) Service / agentura / consulting             → launch-strategy
D) Online kurz / cohort program / bootcamp     → info-product-launch
E) Membership / placená komunita / mastermind  → info-product-launch
F) Ebook / paid newsletter / digitální obsah   → info-product-launch
```

---

## When to Route to marketing:launch-strategy

Use **launch-strategy** when the product is:

- **SaaS / software / web app** — recurring subscription, free trial mechanic, in-app onboarding
- **Mobile app** (iOS / Android) — App Store / Play Store release, ASO, app review windows
- **Physical product / hardware** — inventory cycles, shipping logistics, retail or DTC
- **E-commerce product line** — Shopify launches, drop mechanics, restock cadence
- **Service / consulting / agency offering** — service productization, retainer mechanics, sales calls
- **Anything NOT primarily educational content** delivered via cohort or course platform

Signal: launch follows a continuous availability model (buy anytime after launch day), not a window mechanic.

---

## When to Route to marketing:info-product-launch

Use **info-product-launch** when the product is:

- **Online courses** ($500–$10k+) — self-paced or instructor-led educational content
- **Cohort programs / bootcamps / masterminds** — fixed-start cohorts with peer learning
- **Memberships / communities / subscription content** — recurring access to content + community
- **Ebooks / paid newsletters / digital products** — digital downloads or paid subscriptions
- **Anything sold via "open cart / close cart" mechanic** with PLF-style pre-launch sequence (PLC1 → PLC2 → PLC3 → Open Cart → Close Cart)

Signal: launch follows a windowed sales mechanic (limited enrollment period) with email sequence and webinar/video pre-launch content.

---

## Common Patterns Cross-Skill

Both launch playbooks share these foundations — both sub-skills assume these are in place:

- **Pre-launch list building** — email list / waitlist before launch day
- **Beta / early access cohort mechanics** — small validation group before public launch
- **Testimonial harvesting** — collect proof during beta → use in launch copy (link to `marketing:testimonial-harvesting`)
- **Offer mechanics** — bonuses, scarcity, guarantees, pricing tiers (link to `marketing:offer-creation`)
- **Positioning** — Dunford-style category + alternative + ideal customer (link to `marketing:uvp-optimization`)
- **Hormozi Grand Slam Offer principles** — dream outcome × perceived likelihood ÷ time delay × effort

The DIVERGENCE is in cadence and sales mechanic:

| Dimension | launch-strategy (generic) | info-product-launch (info) |
|---|---|---|
| Sales window | Continuous after launch | Open cart / close cart (3–7 days) |
| Pre-launch | PR, beta signups, waitlist | PLC video sequence (3 videos) |
| Price discovery | Tiered, ongoing optimization | Anchored at launch, rarely discounted later |
| Sales mechanic | Trial → conversion / direct buy | Webinar → cart open → email sequence |
| Urgency lever | Limited beta seats, launch price | Cart close date, bonuses expire |

---

## How to Use

### Example 1 — Online course launch

User: "Chci spustit nový online kurz pro freelancery"

→ Orchestrator detects: online kurz + freelancers = info-product
→ Routes to: **marketing:info-product-launch**

### Example 2 — SaaS launch

User: "Plánuju go-to-market pro nový SaaS"

→ Orchestrator detects: SaaS = generic software product
→ Routes to: **marketing:launch-strategy**

### Example 3 — Unclear

User: "Chci pomoct s launchem"

→ Orchestrator: product type unknown → ASK using the menu (A–F) above
→ Then routes based on answer

### Example 4 — Membership

User: "Spouštím placenou komunitu pro CFO"

→ Orchestrator detects: placená komunita = membership
→ Routes to: **marketing:info-product-launch**

---

## Common Mistakes

**Wrong specialist:**
"Spouštím kurz" → info-product-launch (NOT launch-strategy — courses need PLF sequence, not generic GTM)

**Calling orchestrator when product type is clear:**
"Plánuju launch SaaS" → launch-strategy directly. No need to route.

**Missing the info-product signal:**
"Spouštím produkt pro online vzdělávání" — if it's a course/cohort it's info-product-launch, but if it's a SaaS PLATFORM for educators it's launch-strategy. When in doubt, ASK.

**Treating membership as service:**
Membership / paid community = info-product-launch (windowed enrollment), NOT launch-strategy (continuous service sales).

---

## References

- **`plugins/marketing/skills/launch-strategy/SKILL.md`** — generic launch playbook (SaaS, apps, physical, services)
- **`plugins/marketing/skills/info-product-launch/SKILL.md`** — info-product launch playbook (courses, memberships, PLF)
- **`plugins/marketing/skills/testimonial-harvesting/SKILL.md`** — shared by both
- **`plugins/marketing/skills/offer-creation/SKILL.md`** — shared by both
- **`plugins/marketing/skills/uvp-optimization/SKILL.md`** — positioning foundation for both
- **`plugins/marketing/skills/marketing-orchestrator/SKILL.md`** — top-level marketing router

---

**Philosophy:** Conductor doesn't play instruments. Orchestrator doesn't plan launches — it picks the right playbook.
