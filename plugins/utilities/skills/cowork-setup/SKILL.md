---
name: cowork-setup
description: Creates `~/Claude-shared/` (user-level shared context — about-me, voice, working-rules, projects-index) and per-project scaffolding in `~/Projects/<name>/` for Claude Cowork non-development projects (marketing, copywriting, strategy, concepts, research). Lightweight alternative to development:projectsetup. Use when user says "setup cowork project", "nový cowork projekt", "nastav coworku", "cowork init", or starting non-dev work in Cowork desktop app. NOT for development projects (use development:projectsetup) or for adding workflow optimizations to existing setup (use workflow-optimization).
metadata:
  author: Petr
  version: 1.0.0
---

# Cowork Setup Skill

**Announce at start:** "Používám cowork-setup skill pro [init shared layer | nastavení projektu <name>]."

## When to Use

- User says "setup cowork project" / "nastav cowork projekt" / "cowork init"
- User starting non-development work in Claude Cowork desktop app
- User has dev `projectsetup` skill but it's overkill for content/marketing work

**DON'T use this skill:**

- Development projects (TDD, Git, build commands needed) → use `development:projectsetup`
- Adding workflow optimizations to existing setup → use `workflow-optimization`

## Two Modes

| Mode               | Trigger                       | Frequency       |
| ------------------ | ----------------------------- | --------------- |
| **A: Init shared** | `cowork-setup --init-shared`  | ONCE per user   |
| **B: Per-project** | `cowork-setup <project-name>` | Per new project |

If user runs Mode B but `~/Claude-shared/` doesn't exist → stop with: "Run `cowork-setup --init-shared` first."

## Mode A: `cowork-setup --init-shared`

Run ONCE per user. Creates `~/Claude-shared/` shared context layer.

### Pre-check

If `~/Claude-shared/` exists, prompt:

- **A) Reinit** — wipe and recreate everything (require explicit "yes, reinit")
- **B) Update single file** — pick which (about-me, voice-and-style, projects-index)
- **C) Cancel** (default)

### Flow

1. **Track intent marker.** Before any `mkdir`, save list of paths skill will create. On user cancel mid-flow, delete ONLY those paths. Never touch pre-existing files.

2. **Create directory structure:**

   ```bash
   mkdir -p ~/Claude-shared/templates ~/Claude-shared/archive
   ```

3. **Write `working-rules.md`** — copy verbatim from `templates/working-rules.md`. No Q&A, no substitution.

4. **Q&A for `about-me.md`** (3 short questions):
   - Q1: "Jméno + role + kontext?" → `<NAME>`, `<ROLE>`
   - Q2: "Mission / co teď stavíš?" → `<MISSION>`
   - Q3: "Work blocks (kdy primárně pracuješ)?" → `<WORK_BLOCKS>`

   **Optimization:** Pokud existuje `~/.claude/CLAUDE.md` se sekcí `# ME`, extract values + ask "Použít tyhle hodnoty?" → user confirm/edit.

   `<TOOLS_CONTEXT>` = optional, extract from `~/.claude/CLAUDE.md` "Focus Areas" if present, else empty.

   Substitute placeholders in `templates/about-me.md.template` → write to `~/Claude-shared/about-me.md`.

5. **Voice extraction sub-procedure** (see "Voice Extraction" section below):
   - Ask: "Máš samples textů (newsletter, IG, web copy)? [yes / no / skip]"
   - **yes** → run extraction
   - **no** → offer `copywriting:brand-voice` skill (Q&A mode, ~30 min)
   - **skip** → copy `templates/voice-and-style.md.template` to `~/Claude-shared/voice-and-style.md` as-is

6. **Initialize `projects-index.md`** — copy verbatim from `templates/projects-index.md`.

7. **Generate Cowork Global Instructions text.** Print to terminal:

   ```
   I am <NAME>. When I open a Cowork project:
   1. Read ~/Claude-shared/projects-index.md, find current project, summarize: last date, what was done, next step.
   2. Follow rules in ~/Claude-shared/working-rules.md.
   3. Apply voice from ~/Claude-shared/voice-and-style.md.
   4. Never delete files without explicit confirmation.
   5. File naming: YYYY-MM-DD-slug.md.
   ```

   Followed by: "→ Open Cowork desktop app → Settings → Cowork → Global Instructions → paste this text."

8. **Print UI linkage instructions:**

   > "When creating a new project in Cowork: Add Context → `~/Claude-shared/` AND your project folder."

## Voice Extraction Sub-Procedure

Used in Mode A step 5 when user has writing samples. Grounds voice in real texts vs. Q&A.

### Input

User provides 3-7 samples (file paths / URLs / inline text). Recommended: 2-4 newsletters, 3-5 IG captions, 1-2 web pages, 1-2 sales/product examples.

### Extraction framework

Analyze all samples and extract 6 dimensions:

| Dimension                  | What to extract                                                                                                                                    |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tone**                   | Formality 1-5, energy 1-5, humor (none/light/heavy), expertise level                                                                               |
| **Vocabulary**             | 10-20 preferred words, 5-10 banned words                                                                                                           |
| **Sentence structure**     | Avg length, fragmentation yes/no, parataxis vs hypotaxis                                                                                           |
| **Brand codes**            | Recurring phrases (≥2 occurrences across samples) with example contexts                                                                            |
| **Anti-AI patterns**       | Words/structures to avoid (em-dash overuse, "delight", "robust", "leverage")                                                                       |
| **Per-channel adaptation** | Differences between channels — ONLY if samples cover ≥2 channels. If 1 channel only, OMIT this section from output (do not write TBD placeholder). |

### Output

Write to `~/Claude-shared/voice-and-style.md` (NOT the empty template) with sections in order: Tone (formality/energy/humor/expertise) → Vocabulary (preferred/banned lists) → Sentence patterns (with 1-2 examples each) → Brand codes (recurring phrases with contexts) → Anti-AI patterns (what to avoid + why) → Per-channel (omit entirely if 1 channel) → Source samples (files/URLs analyzed with date).

### Confirmation

Show draft to user → ask: "OK / change specific section / regenerate with different samples".

### Edge cases

- **No samples provided:** fallback to `copywriting:brand-voice` skill (Q&A) or skip (write empty template).
- **Inconsistent samples** (extraction yields contradictory voice): ask "Want per-channel voice or unified? Add more samples from primary channel."
- **WebFetch fail** (URL unreachable): continue with remaining samples, notify user.

## Mode B: `cowork-setup <project-name>`

Run for each new Cowork project. Creates `~/Projects/<project-name>/` and appends entry to `~/Claude-shared/projects-index.md`.

### Pre-check

- If `~/Claude-shared/` doesn't exist → stop: "Run `cowork-setup --init-shared` first."
- If `~/Projects/<project-name>/` exists → stop: "Already exists. Choose another name."

### Flow

1. **Q&A for `about-project.md`** (4 questions):
   - Q1: "Goal — co chceš dosáhnout?" → `<GOAL>`
   - Q2: "Deadline?" → `<DEADLINE>`
   - Q3: "Deliverables — co produkujete? (list)" → `<DELIVERABLES_LIST>` (parse user list as bulleted markdown)
   - Q4: "Related projekty?" — read `~/Claude-shared/projects-index.md`, suggest matches via string similarity in project name (split on `-`, match shared tokens). User confirms/edits/skips. → `<RELATED_POINTERS>`

2. **Create structure:**

   ```bash
   mkdir -p ~/Projects/<project-name>/OUTPUTS ~/Projects/<project-name>/REFERENCES
   ```

3. **Write `about-project.md`** — substitute placeholders in `templates/about-project.md.template`, write to `~/Projects/<project-name>/about-project.md`.

4. **Append entry to `~/Claude-shared/projects-index.md`** in `## Active` section:

   ```bash
   FIRST_DELIVERABLE=$(echo "$DELIVERABLES_LIST" | head -1 | sed 's/^- //')
   ENTRY="- $(date +%Y-%m-%d) | <project-name> | started | next: $FIRST_DELIVERABLE"
   awk -v entry="$ENTRY" '/^## Active$/{print; print entry; next}1' ~/Claude-shared/projects-index.md > /tmp/idx.tmp && mv /tmp/idx.tmp ~/Claude-shared/projects-index.md
   ```

   **No manual user step.** Skill writes directly.

5. **Print UI linkage instructions:**

   > "Open Cowork → New Project → Context → Add Folder:
   >
   > 1. ~/Claude-shared/
   > 2. ~/Projects/<project-name>/
   >    Set project name in UI: <project-name>"

## Error Handling & Edge Cases

| Situation                                            | Skill behavior                                                                                                                      |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `~/Claude-shared/` exists, user runs `--init-shared` | 3-way prompt: Reinit / Update single file / Cancel (default)                                                                        |
| `~/Projects/<name>/` exists                          | Stop, suggest different name                                                                                                        |
| Mode B but `~/Claude-shared/` missing                | Stop, instruct to run `--init-shared` first                                                                                         |
| Voice extraction: no samples provided                | Fallback to `copywriting:brand-voice` Q&A or skip                                                                                   |
| Voice extraction: WebFetch fail                      | Continue with remaining samples, notify user                                                                                        |
| `projects-index.md` append fail (file locked)        | Retry once, else warn user + print line for manual paste                                                                            |
| User cancels mid-flow Q&A                            | Use intent marker — delete ONLY paths skill created in this session. Never touch pre-existing files. If no `mkdir` ran yet → no-op. |

## Idempotence

- Mode A re-run after success → 3-way prompt (Reinit / Update / Cancel)
- Mode B with same `<project-name>` → stop, suggest different name
- All file writes are atomic (write to temp, then `mv`)

## Out of Scope

- ❌ TDD/Git/verification rules (use `development:projectsetup`)
- ❌ Module catalog (`brand-voice`, `audience` wrappers) — Cowork calls skills directly
- ❌ Auto-sync script for `projects-index.md` — Cowork updates it via working-rules.md
- ❌ Claude Design setup — only documentation note (link `REFERENCES/` from Design)
- ❌ claude.ai web chat integration — gap (no local folder linking from web)
