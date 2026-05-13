---
name: email-orchestrator
description: Use when working on email copy and the format is unclear or could be either single email or multi-day sequence. Routes between copywriting:newsletter (one-off campaigns, holiday emails, weekly newsletter, single broadcast) and copywriting:email-sequences (indoctrination sequences, welcome series, drip campaigns, tripwire flows, SOS). Trigger phrases - "email copy", "psaní emailů", "email campaign", "emailový obsah", "email content help", "potřebuju email", "I need email copy", "email marketing", "email automatizace". Do NOT trigger when format is already clear (use specific skill directly).
metadata:
  author: Petr
---

# Email Copywriting Orchestrator

## Overview

Routes email-related requests to the right specialist within the email family. This skill does NOT write email copy itself — it detects format intent (one-off vs sequence) and delegates.

**Philosophy:**

```
copywriting-orchestrator (top router for all copy)
        ↓ detects "email, newsletter, sequence, drip"
        
email-orchestrator (this skill — email family router)
        ↓ detects format intent
        ├── newsletter        (ONE-OFF — single broadcast, campaign blast, weekly newsletter)
        └── email-sequences   (MULTI-DAY — indoctrination, welcome series, drip, tripwire, SOS)
```

**Announce:** "Using email-orchestrator to route this email request."

---

## When to Use

**USE this skill:**

- User says "email" or "email copy" without specifying format
- Unclear whether one-off broadcast or multi-day automation
- Request could go either way (e.g. "launch email" — single? or 5-day sequence?)
- Multi-step email workflows (single launch email + follow-up drip)

**DON'T use this skill:**

- Format is clear → call specialist directly
  - "napiš weekly newsletter" → `newsletter` directly
  - "5-day welcome sekvence" → `email-sequences` directly
- Non-email copy → use `copywriting-orchestrator` instead

---

## Detection Rules — Which Sub-Skill?

### Step 1: Format Detection

| User says... | Format | Route to |
|---|---|---|
| `weekly newsletter`, `měsíční newsletter`, `pravidelný email` | One-off broadcast | **newsletter** |
| `holiday email`, `Black Friday email`, `Vánoční kampaň` | One-off broadcast | **newsletter** |
| `campaign blast`, `jednorázová kampaň`, `oznámení produktu` | One-off broadcast | **newsletter** |
| `product announcement`, `news`, `update email` | One-off broadcast | **newsletter** |
| `re-engagement email` (single) | One-off broadcast | **newsletter** |
| `5-day sequence`, `4-denní série`, `7-denní automatizace` | Multi-day sequence | **email-sequences** |
| `welcome series`, `uvítací série`, `onboarding emaily` | Multi-day sequence | **email-sequences** |
| `drip campaign`, `drip kampaň`, `automatizovaná série` | Multi-day sequence | **email-sequences** |
| `tripwire flow`, `tripwire automatizace` | Multi-day sequence | **email-sequences** |
| `indoctrination sequence`, `indoktrinační sekvence` | Multi-day sequence | **email-sequences** |
| `Soap Opera Sequence`, `SOS`, `Russell Brunson sekvence` | Multi-day sequence | **email-sequences** |
| `post-purchase emails`, `po nákupu série`, `upsell drip` | Multi-day sequence | **email-sequences** |
| `abandoned cart series`, `opuštěný košík (více emailů)` | Multi-day sequence | **email-sequences** |
| `launch sequence`, `launch série`, `pre-launch warmup` | Multi-day sequence | **email-sequences** |

### Step 2: Ask if Unclear

If user says just "email" / "potřebuju email" / "napiš email" without signal of one-off vs sequence, ask:

```
Jednorázový email nebo vícedenní sekvence?

A) Jednorázový broadcast (kampaň, newsletter, oznámení)  → newsletter
B) Vícedenní sekvence (welcome series, drip, launch flow)  → email-sequences
C) Kombinace (single launch email + follow-up drip)  → multi-skill sequence
```

---

## When to Route to copywriting:newsletter

Use `newsletter` for **single, one-off emails**:

- Weekly / monthly newsletter (regular cadence, but each issue is standalone)
- Campaign blast (one-time send to list)
- Holiday emails (Black Friday, Vánoce, Valentýn) — single send
- Product announcement / launch announcement (single broadcast)
- Re-engagement email (single ping to inactive subscribers)
- News updates, company announcements
- Single promotional email (sale, discount, event invite)
- Abandoned cart single reminder (if NOT part of multi-step flow)
- Survey / feedback request email
- Thank-you email post-event

**Key signal:** ONE email, sent ONCE, standalone unit.

---

## When to Route to copywriting:email-sequences

Use `email-sequences` for **multi-day, multi-email automations**:

- Welcome series (3-7 emails over 7-14 days)
- Indoctrination sequence (Russell Brunson SOS — Soap Opera Sequence)
- Drip campaign (educational nurture over weeks/months)
- Tripwire flow (post-tripwire-purchase upsell drip)
- Launch sequence (pre-launch warmup → launch → urgency → close-cart)
- Post-purchase drip (delivery confirmation → tips → upsell → review request)
- Abandoned cart series (3-email recovery flow with escalating urgency)
- Onboarding sequence (SaaS / course / app — feature education over time)
- Re-engagement campaign (multi-step win-back, NOT single email)
- Lead nurture sequence (cold lead → warm → sales-ready)
- Course delivery sequence (lesson 1 → lesson 2 → ... → upsell)

**Key signal:** MULTIPLE emails, ordered, with intentional spacing/timing, often automated.

---

## Common Patterns Cross-Skill

Both sub-skills share core copywriting principles. Apply these regardless of which specialist runs:

### Otto Bohuš Core Principles

- **Curse of Knowledge avoidance** — write for the reader who knows nothing about your product/category
- **Single Commander's Intent per email** — one goal, one CTA, one outcome
- **Concrete > abstract** — "ušetří 47 minut denně" beats "saves time"
- **One idea per email** — if you have two ideas, write two emails

### Subject Line Craft

- **Curiosity gap** — hint at value without revealing it ("3 věci, které jsem udělal špatně při launchu")
- **Specificity** — numbers, names, exact outcomes ("Jak jsem získal 1247 emailů za 6 dní")
- **Avoid spam triggers** — no ALL CAPS, no "FREE!!!", no excessive punctuation
- **Length** — 30-50 chars for mobile preview
- **Preview text** — use second hook, not "View in browser"

### CZ Tone Considerations

- Tykání vs vykání — match audience (B2C tykání default, B2B podle vztahu)
- Anglicismy okay v tech/SaaS, méně v retail/lifestyle
- Avoid translation feel — pište česky od začátku, ne překládejte z EN šablon
- "Najmout" / "objednat" / "zarezervovat" mají různé konotace — match step in funnel

### Quality Gate (both skills)

```
☐ One Commander's Intent per email?
☐ Subject line tested for curiosity + specificity?
☐ Preview text used as second hook?
☐ Single primary CTA (no competing actions)?
☐ Mobile-first formatting (short paragraphs, scannable)?
☐ CZ tone matches audience (tykání/vykání)?
```

---

## How to Use

### Example 1: Detected format → route directly

```
User: "Napiš mi email pro launch nového kurzu"

Orchestrator detects:
  - "launch" + "kurz" → typically multi-day flow (pre-launch → launch day → urgency → close)
  - Single email rarely sufficient for launch

Routes to: copywriting:email-sequences
Announces: "Using email-sequences for launch flow (typically 5-7 emails)."
```

### Example 2: Clear one-off

```
User: "Potřebuju Black Friday email"

Orchestrator detects:
  - "Black Friday email" (singular) → one-off broadcast

Routes to: copywriting:newsletter
Announces: "Using newsletter for Black Friday campaign blast."
```

### Example 3: Ambiguous → ask

```
User: "Napiš mi email"

Orchestrator asks:
  "Jednorázový email nebo vícedenní sekvence?
   A) Jednorázový (kampaň, newsletter, oznámení)
   B) Sekvence (welcome series, drip, launch flow)
   C) Kombinace"

User picks → route accordingly.
```

### Example 4: Multi-skill workflow

```
User: "Launch kurzu — single oznámení existujícímu listu + welcome série pro nové signupy"

Orchestrator detects multi-domain:
  1. newsletter → single launch announcement to existing list
  2. email-sequences → welcome series for new opt-ins from launch

Routes sequentially. Each specialist handles its piece.
```

---

## Common Mistakes

**❌ Bypassing brief:**
"Let me just route..." → STOP. Confirm audience + goal + offer before delegating.

**❌ Wrong specialist for launch:**
"Launch email" → usually `email-sequences` (not single). Check if user wants full flow or just one.

**❌ Calling email-orchestrator when format is clear:**
"Napiš welcome sekvenci" → `email-sequences` directly. No need to route.

**❌ Forgetting multi-domain:**
"Launch + follow-up drip" = sequence of skills (newsletter for announcement + email-sequences for drip). Don't just call one.

---

## Quick Reference

| Intent | Specialist |
|---|---|
| Single broadcast (newsletter, holiday, announcement) | `newsletter` |
| Multi-day sequence (welcome, drip, launch flow, SOS) | `email-sequences` |
| Single abandoned cart reminder | `newsletter` |
| 3-email abandoned cart recovery | `email-sequences` |
| Single re-engagement ping | `newsletter` |
| Multi-step win-back campaign | `email-sequences` |
| Combined (announcement + follow-up drip) | both, in sequence |

---

## References

- **`plugins/copywriting/skills/newsletter/SKILL.md`** — one-off email copy (campaigns, newsletters, holiday, announcements)
- **`plugins/copywriting/skills/email-sequences/SKILL.md`** — multi-day automated sequences (welcome, drip, launch, SOS, tripwire)
- **`copywriting-orchestrator`** — top-level router for non-email copy
- **`storytelling`** — narrative frameworks (used internally by both specialists, esp. for SOS)

---

**Philosophy:** Conductor doesn't play instruments. Orchestrator doesn't write emails.
