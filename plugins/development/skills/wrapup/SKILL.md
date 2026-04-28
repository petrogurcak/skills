---
name: wrapup
description: Performs end-of-session reflection by saving context to ACTIVE_CONTEXT.md, checking for mistakes to log, extracting lessons learned, and identifying documentation updates needed. Use after merging to development, when user says "wrapup", "zabal to", or at the end of a development session. NOT for saving context mid-session (use session-context) or for standalone mistake logging.
metadata:
  author: Petr
  version: 1.0.0
---

# Wrap-up

Session reflection and context save after merge.

**Announce:** "Merge hotovy. Zavíram session."

## Process

Go through all 4 checks proactively:

### 1. Save Context

Update `.claude/ACTIVE_CONTEXT.md`:

- What was completed this session
- Current branch state
- Any follow-up work identified

### 2. Mistakes Check

Review the session for correction patterns:

- Did anything fail unexpectedly?
- Did we retry/revert something?
- Were any assumptions wrong?
- Did auto-capture-corrections hook fire during this session?

**If yes** → write entry to `.claude/mistakes.md`:

```markdown
## [YYYY-MM-DD]: [Brief description]

**Co se stalo:** [What went wrong]
**Proc:** [Root cause]
**Oprava:** [How it was fixed]
**Pouceni:** [What to do differently]
**Tags:** #relevant #tags
```

**If no** → report "Zadne chyby."

### 3. Lessons Learned

Check if session produced reusable knowledge:

- Non-trivial problem solved?
- Useful workaround discovered?
- Debugging technique worth remembering?
- New pattern established?

**If yes** → propose `/learn` entry or note in project memory.

**If no** → report "Zadne nove pouceni."

### 4. Documentation Check

Check if the change affects any documentation:

- Project CLAUDE.md (new conventions, patterns, commands)
- User-facing guides (editor guide, API docs, README)
- Setup or configuration docs
- Architecture decisions → `.claude/DECISIONS.md`

**If yes** → propose specific update with file path and content.

**If no** → report "Dokumentace OK."

### 5. Usage & Savings

Zobraz kolik session spotřebovala a kde ušetřit — kritické pro Max plan rate limit tracking.

1. **Aktuální 5h rolling block** (Max limit window):

   ```bash
   npx -y ccusage@latest blocks --active --json
   ```

   Parsuj: `costUSD`, `projection.totalCost`, `projection.remainingMinutes`, `models[]`, `tokenCounts.*`.

2. **Týdenní přehled**:

   ```bash
   npx -y ccusage@latest weekly --json
   ```

   Vezmi poslední týden: `totalCost`, identifikuj top den.

3. **Top 3 token-heavy aktivity z transcriptu** — projeď session a najdi co cerpalo nejvíc:
   - Velké `Read` (soubory >1000 řádků)
   - `WebSearch` / `WebFetch` chains
   - `Agent` spawns (Explore, general-purpose, research)
   - `Grep` sweepy s `output_mode: content` a velkým `head_limit`

4. **Savings posouzení** — pro každou heavy aktivitu rozhodni kam patří:
   - **`claude-glm`** (GLM Coding Plan, subscription covered) — bulk research, grep sweepy, mechanický refactor, long autonomous běhy
   - **`claude-kimi` pay-per-token** ($0,95 / $4 per 1M) — fallback nebo tasks s 262K context / image input
   - **Opus 4.7 (keep)** — CZ copy/UX, plan challenge, security review, production side-effects

**Output format:**

```
Usage:
- 5h block: $X.XX z projected $Y.YY (Z% využito, zbývá N min)
- Týden: $total.TT (top den: YYYY-MM-DD $day.DD)
- Modely: opus-4-7 $A.AA · glm-5.1 $B.BB · haiku $C.CC
- Heavy top 3: [1] <aktivita> ~Xk tokens [2] <aktivita> ~Yk [3] <aktivita> ~Zk

Savings tip: <1-2 konkrétní akční doporučení>
```

**Příklad savings tip:**

> "Explore agent + 3 WebSearch chains (~$3.20) šlo přes claude-glm za $0. Příště: bulk research delegovat GLM, Opus jen na synthesis."

**Fallback pokud `ccusage` selže** (offline / network error):

- Přeskoč 5h block + týdenní přehled (oznam "ccusage nedostupný")
- Proveď jen heavy activity analýzu z transcriptu + savings tip
- Pro odhad nákladů použij model pricing z memory (Opus 4.7 $5/$25, GLM $1.40/$4.40, Kimi $0.95/$4)

### 5b. Savings log + threshold promotion

Po vygenerování savings tipu:

1. **Extrahuj 2-4 tags** z tipu (lowercase, kebab-case, konkrétní). Příklady:
   - "log filtering server-side" → `log-filter`, `server-side`, `bulk-handling`
   - "PR scope minimum" → `gh-cli`, `pr-investigation`, `scope-minimum`
   - "scoped test file" → `test-scope`, `tdd`, `pytest`
   - "plan re-read přes GLM" → `plan-reread`, `delegation`, `glm`

2. **Append do `~/.claude/savings-log.jsonl`** jako jeden řádek JSON:

   ```json
   {
     "date": "YYYY-MM-DD",
     "session_hint": "<projekt + topic>",
     "tip": "<full savings tip text>",
     "tags": ["tag1", "tag2", "tag3"],
     "promoted": false,
     "memory_files": []
   }
   ```

3. **Threshold check** — spočítej frequency tagů napříč celým logem:

   ```bash
   cat ~/.claude/savings-log.jsonl | jq -r '.tags[]' | sort | uniq -c | sort -rn
   ```

4. **Auto-promotion rozhodnutí:**
   - **Tag ≥3× v logu** nebo **2× v posledních 14 dnech** → kandidát na memory promotion
   - **První výskyt** ale tip vypadá generalizable + non-obvious → také kandidát

5. **Pokud kandidát** → proveď:
   - Vytvoř `~/.claude/projects/-Users-petrogurcak-Projects/memory/feedback_<slug>.md` s:
     - Frontmatter: `name`, `description`, `type: feedback`, `created`, `last_relevant`
     - Rule + **Why:** + **How to apply:** lines (per CLAUDE.md auto memory rules)
   - Append řádek do `MEMORY.md` pod `### Execution efficiency (from wrapup savings tips)` sekci (vytvoř pokud neexistuje)
   - Aktualizuj log entry: `"promoted": true`, `"memory_files": ["feedback_<slug>.md"]`

6. **Pokud pattern ≥3× a už existuje memory file** → navrhni promotion do `~/.claude/CLAUDE.md` `Execution Efficiency` sekce (hard rule, aplikuj vždy). Neprováděj automaticky — vždy user potvrdí.

7. **Oznam v Present Summary** (viz níže): kolik tipů logged, kolik promoted, kolik kandidátů na CLAUDE.md rule.

**Anti-spam pravidla:**

- Neloguj identický tip 2× za stejnou session (dedupe by text similarity)
- Neloguj generic tipy ("buď efektivní", "používej cache") — musí být specific + actionable
- Neloguj one-off quirky specific k jedné konkrétní chybě (např. "nezapomeň na `--foo` flag u tohohle konkrétního commandu")

## Present Summary

```
Session wrap-up:
- Kontext: Ulozeno
- Mistakes: [zadne / zapsano: "brief description"]
- Lessons: [zadne / zapsano: "brief description"]
- Dokumentace: [beze zmen / aktualizovano: file.md]
- Usage: $X.XX session / $Y.YY 5h block (Z% limit)
  └─ Savings: <1-liner tip>
  └─ Log: +N tip(ů) → savings-log.jsonl · promoted: <count nebo "—">
  └─ Promotion kandidát: <tag s freq ≥3 nebo "—"> → CLAUDE.md rule?

Hotovo. Neco dalsiho?
```

## Rules

- **Always save context** - even if nothing else to log
- **Be specific** in mistakes/lessons - not generic "be more careful"
- **Propose, don't just ask** - draft the entry, let user confirm
- **Check DECISIONS.md** - if architectural choice was made, log it
