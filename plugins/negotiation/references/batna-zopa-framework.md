# BATNA / ZOPA Framework

> Negotiation math + structural moves. Used by batna-strategy.

## Source

- Roger Fisher, William Ury & Bruce Patton, *Getting to Yes* (3rd ed. 2011) — ISBN 9780143118756
- Deepak Malhotra & Max Bazerman, *Negotiation Genius* (2007) — ISBN 9780553384116
- Roger Fisher & Daniel Shapiro, *Beyond Reason* (2005) — ISBN 9780143037781
- Research anchor: `docs/research/2026-05-07-negotiation-corpus-matrix.md` § "batna-strategy"

## Used by

`batna-strategy`

## Core vocabulary

- **BATNA** — Best Alternative To a Negotiated Agreement. Your fallback if this deal doesn't happen.
- **Reservation point** — Worst deal you'd accept (anything below = walk away to BATNA).
- **ZOPA** — Zone of Possible Agreement. Overlap between your reservation and theirs.
- **Anchor** — The first concrete number proposed. Heavily influences final outcome.

---

## BATNA assessment worksheet (yours)

1. List 3-5 alternatives if this deal fails.
2. Score each on 3-5 dimensions (price, speed, risk, fit, optionality).
3. Pick the best one as your BATNA.
4. Quantify your BATNA value (in deal-equivalent terms).
5. Your reservation point = BATNA value. Below this, walk away.

**Example (klient pricing, freelance web work):**

| Alternative | Price | Time | Risk | Fit | Optionality |
|-------------|-------|------|------|-----|-------------|
| Klient A current deal | 80k | 6w | low | high | low (1 client) |
| Klient B (if won) | 120k | 8w | medium | medium | medium |
| Build SaaS instead | unknown | 12w | high | high | high |
| Take FT job offer | 130k/mo | — | low | low | very low |

→ BATNA = Klient B if won (best score). Reservation for current klient deal = 110k (must beat Klient B by ~9% to justify continuation).

---

## BATNA assessment (theirs — estimated)

You can't see their BATNA, but you can estimate:

- What's their cost if this deal fails? (rebuilding, lost time, opportunity cost)
- What alternatives are they exploring? (other vendors, in-house, status quo)
- What's their internal pressure? (deadline, board commitment, competition)
- Public signals: hiring patterns, recent contracts, industry tells

**Estimation discipline:** Estimate range, not point. "Their BATNA is between X and Y."

---

## ZOPA mapping

```
Their ceiling                        Your floor (= reservation)
       │                                       │
       ├───────── ZOPA ─────────┤
       │                                       │
   Buyer max                               Seller min
```

If your reservation > their max → no ZOPA → no deal possible (find creative options or walk).
If your reservation < their max → ZOPA exists → final price determined by anchoring + leverage + negotiation skill.

---

## Anchor strategy

**Should you anchor first?**
- YES if: you have better information than them, your value is well-justified, you're confident
- NO if: you don't know market well, info asymmetry favors them, you're testing waters

**First-offer math:**
- Anchor 15-25% beyond your target (room to concede)
- Don't anchor at "fair price" — concession expectation will pull you below it
- Justify anchor with objective criteria (Fisher/Ury)

**Counter-anchor (when they go first):**
- Don't say "no" or counter immediately — that legitimizes their anchor
- Reframe: "Help me understand how you arrived at that number"
- Counter with your own anchor (not midpoint!) backed by your criteria

---

## Multi-issue trades

Negotiating ONE issue (price) is win-lose. Multiple issues create trade space.

**Worksheet:**
1. List all issues at stake (price, timeline, scope, payment terms, IP, exclusivity, support, etc.)
2. Rank YOUR priority on each (high / medium / low)
3. Estimate THEIR priority (high / medium / low)
4. Identify trades where their high = your low (or vice versa)

**Example:**
| Issue | Your priority | Their priority | Trade insight |
|-------|---------------|----------------|---------------|
| Price | Medium | High | They'll pay your number if… |
| Payment terms | High (cashflow) | Low | …you can give 50% upfront |
| Timeline | High | Medium | Tight deadline = trade for premium price |
| Support | Low | Medium | Bundle in for goodwill |

→ Trade space exists.

---

## 5 Core Concerns (Fisher/Shapiro, *Beyond Reason*)

Beneath positions are 5 universal emotional concerns. Address them = unlock movement.

| Concern | What it means | Negotiation move |
|---------|---------------|------------------|
| **Appreciation** | Their effort/perspective recognized | "I see you've worked hard on this proposal" |
| **Affiliation** | Treated as colleague, not adversary | "We're both trying to find a fair outcome" |
| **Autonomy** | Decision agency respected | "What matters most to you here?" |
| **Status** | Standing acknowledged | Title use, sequence of speaking, deference where genuine |
| **Role** | Meaningful purpose in process | "Your input on X is essential — what's your read?" |

CZ adaptation: Status concern is amplified in hierarchical CZ business culture. Skipping titles or speaking out of turn carries cost.

---

## Defense playbook against tricks

### Fake authority ("I have to check with my boss")

**Detect:** They claim to lack authority but make substantive moves on the spot.
**Counter:** "Let's draft what would work for us, then you can take it to them. When can we reconvene?"

### Take-it-or-leave-it

**Detect:** Final-sounding ultimatum without basis.
**Counter:** Don't react. Ask: "Help me understand the constraints driving this." If real → adapt. If bluff → walk threat shows.

### Good cop / bad cop

**Detect:** One side aggressive, other "reasonable."
**Counter:** Address it directly. "I notice we have different positions across your team — what would help align?"

### Decoy options

**Detect:** Three options where two are clearly inferior, framing the third as "obvious choice."
**Counter:** Ask why other options exist if they're worse. Often reveals it's manipulation.

### Manufactured scarcity

**Detect:** Sudden deadlines without verifiable basis.
**Counter:** "What's driving the deadline?" Real reason → respect; bluff → exposed.

---

## Negotiating from weakness (Malhotra/Bazerman Ch. 9)

When their BATNA is much stronger than yours:

1. **Improve your BATNA in parallel** (talk to other counterparts even mid-negotiation)
2. **Surface their BATNA's weaknesses** (subtle) — reframe what they think they have
3. **Add value beyond price** (long-term relationship, referral pipeline, brand association)
4. **Threaten with information, not action** (consequences of failed deal made vivid)
5. **Coalition** — bring in third parties whose interests align

---

## CZ adaptation

- BATNA discipline: Czechs respect direct talk about alternatives. "Mám i další jednání" lands cleanly.
- Anchoring: CZ business expects substantiation. "X korun, protože Y, Z, W" beats bare numbers.
- Multi-issue trades: CZ counterpart often expects single-issue (price) negotiation. Surfacing trade space can unlock surprising movement.
- Decision authority: confirm decision-maker is at table early. CZ hierarchy means table-level person may not have authority.
- Written follow-up POVINNÝ — verbal agreements re-negotiated freely in CZ.
