# Children Stories Skill — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a `children-stories` skill in the copywriting plugin with three modes (blueprint, write, test) for writing children's literature ages 3-8.

**Architecture:** Single SKILL.md file following the established knowledge-book pattern. The skill encodes all research (age calibration, rhythm, verse, illustration briefs, publishing standards) directly into the skill text. NotebookLM notebook created separately for reference sources.

**Tech Stack:** Markdown (SKILL.md), NotebookLM MCP, existing copywriting plugin infrastructure.

---

### Task 1: Create SKILL.md — Frontmatter + Overview + Mode Router

**Files:**

- Create: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Create skill directory**

```bash
mkdir -p plugins/copywriting/skills/children-stories
```

- [ ] **Step 2: Write SKILL.md — frontmatter, overview, mode router**

Write the YAML frontmatter with name, description, metadata. Then the overview section explaining the skill and the mode router table (blueprint/write/test). Include the "Announce" pattern and auto-detection logic (if `story-blueprint.md` exists → default to write mode, otherwise blueprint).

The frontmatter description must follow the pattern from knowledge-book:

```yaml
---
name: children-stories
description: Use when writing children's literature — picture books, verse books, early readers, bedtime stories for ages 3-8. Three modes — blueprint (creates story blueprint with age calibration, characters, voice, narrative pattern), write (writes one story per invocation), test (read-aloud checklist + iterative rewrite from children's feedback). Trigger phrases — "children's story", "dětský příběh", "picture book", "obrazková kniha", "pohádka", "bedtime story", "příběh na dobrou noc", "write for kids", "psát pro děti". Do NOT use for non-fiction (use knowledge-book), marketing copy (use copywriting-orchestrator), or adult fiction.
metadata:
  author: Petr
  version: 1.0.0
---
```

- [ ] **Step 3: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): add children-stories skill — frontmatter + overview"
```

---

### Task 2: Blueprint Mode — Steps 1-3 (Age Calibration, Format, Standalone vs Series)

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write Blueprint Mode header and Step 1 (Age Calibration)**

Include the full age calibration table from the spec:

- Two profiles: 3-5 and 6-8
- All parameters: receptive vocabulary, words/sentence, total word count, characters, scenes, structure, false-belief plots, themes, format options
- Source citations in compact inline format

- [ ] **Step 2: Write Step 2 (Format)**

Four formats table: picture book, verse book, early reader, bedtime story. Pages, word count, description for each.

- [ ] **Step 3: Write Step 3 (Standalone vs Series)**

Standalone: simpler setup, no character bible.

Series: Full character bible template (visual, personality, relationships, rules, arc boundaries, per-book tracking). World-bible template (rules, locations, recurring elements). Animal vs human character guidance.

- [ ] **Step 4: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories blueprint steps 1-3 — age, format, series"
```

---

### Task 3: Blueprint Mode — Steps 4-6 (Narrative Pattern, Voice, Illustration Brief)

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write Step 4 (Narrative Pattern)**

Archetypes table: Journey, Challenge, Discovery, Friendship — with core description and classic examples.

Structural patterns table: Cumulative, Circular, Pattern with variation, Three attempts, Parallel, Problem-escalation-resolution — with how it works and best-for age.

- [ ] **Step 2: Write Step 5 (Voice Calibration)**

Writing sample → analyze → language → verse/prose/lyrical prose. If verse: meter selection (trochaic CZ default, anapestic EN comic, iambic EN default), rhyme scheme (AABB for 3-5, ABAB for 5-8). Verse-chorus structure (Donaldson model). Sound profile per scene type. Anti-patterns list (always banned).

- [ ] **Step 3: Write Step 6 (Illustration Brief Template)**

Inline bracketed format. 3-question test. Legitimate uses list. Never-specify list.

End blueprint section with: "Save blueprint as `story-blueprint.md` in project root."

- [ ] **Step 4: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories blueprint steps 4-6 — pattern, voice, illustration"
```

---

### Task 4: Write Mode — Pre-Writing + Storyboard

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write Pre-Writing section**

4 steps: load blueprint, select story, knowledge gathering (NotebookLM query + author interview), load adjacent context (series).

- [ ] **Step 2: Write Page-by-Page Storyboard section**

14-spread arc table: spreads 1-2 (setup), 3-8 (rising action), 9-11 (climax), 12-13 (resolution), 14 (final image). Note that author approves storyboard before writing begins.

- [ ] **Step 3: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories write mode — pre-writing + storyboard"
```

---

### Task 5: Write Mode — Writing Rules + Verse Mode

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write the Writing section**

Cover all writing rules from the spec:

- Structural pattern drives writing
- Age calibration auto-applied
- Rhythm and sound checklist (per spread): sentence variation, onomatopoeia, alliteration, sound symbolism, page-turn hooks, build-and-punch, mouth feel
- Text-image relationship: complementary-to-counterpointing, remove redundant text, text carries dialogue/time/abstract/names/sound
- Show don't tell for children: action replaces narration, dialogue reveals emotion, sensory details, body tells story, never explain moral
- Storytelling integration note

- [ ] **Step 2: Write Verse Mode subsection**

Strict consistent meter, rhyme scheme consistency, verse-chorus structure, refrain escalation, Naked Story Test, 6 Rhyme Crimes check (list all 6 with one-line descriptions).

- [ ] **Step 3: Write Illustration Briefs subsection**

Inline bracketed notes, 3-question test, identify visual subplot opportunities.

- [ ] **Step 4: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories write mode — writing rules + verse"
```

---

### Task 6: Write Mode — Self-Edit Pass + Output Format

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write Self-Edit Pass section**

10-point checklist from spec: age test, read-aloud test, show-don't-tell scan, text-image redundancy, concrete test, anti-moralizing, forced asymmetry (series), verse check, page-turn check, participation opportunity check.

- [ ] **Step 2: Write Output section**

YAML frontmatter template for stories (story number, title, series, episode, age, format, verse, words, language, status). Spread-by-spread output format with illustration notes.

- [ ] **Step 3: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories write mode — self-edit + output format"
```

---

### Task 7: Test Mode — Checklist + Iterative Loop

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write Regime A (Read-Aloud Checklist)**

Per-spread checkpoint examples. Overall metrics list (want it again, attention drop, interrupts, laughs, engagement, "what happens next"). Output as printable checklist file.

- [ ] **Step 2: Write Regime B (Iterative Rewrite Loop)**

Free-form input from author. Skill analyzes: diagnosis (why it doesn't work), specific rewrite (1-2 variants), preserve what works. Iteration cycle description. Status progression (draft → tested-v2 → tested-v3).

- [ ] **Step 3: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories test mode — checklist + iteration"
```

---

### Task 8: Editorial Standards + File Structure + Sources

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

- [ ] **Step 1: Write Editorial Standards section**

Czech market table (formats, publishers, submission, awards). English market table (format, manuscript, submission, SCBWI). Export command description (CZ format, EN format).

- [ ] **Step 2: Write Integration section**

Integration table (storytelling, writing-clearly-and-concisely, brand-voice, NotebookLM). File structure diagram.

- [ ] **Step 3: Write Sources Encoded section**

Compact source list organized by category: Craft, Editorial philosophy, Verse, Rhythm & Sound, Visual, Czech tradition, Czech illustration, Publishing, Development, Series. Include NotebookLM notebook ID placeholder.

- [ ] **Step 4: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories editorial standards + sources"
```

---

### Task 9: Reference NotebookLM Notebook in SKILL.md

**Files:**

- Modify: `plugins/copywriting/skills/children-stories/SKILL.md`

NotebookLM notebook already exists: `3a99bf34-ed1d-4abf-a932-32789965ac7b` ("Writing children books") with 12 sources:

- 5 books: Molly Bang (Picture This), Mem Fox (Reading Magic), Jane Yolen (Take Joy), Ann Whitford Paul (Writing Picture Books), Uri Shulevitz (Writing with Pictures)
- 4 articles: Philip Nel (Faux Seuss), Julia Donaldson (verse craft), Renée LaTulippe (rhyme crimes), Pixar (22 Rules)
- 3 research summaries: Age calibration, Czech tradition, Sound symbolism

- [ ] **Step 1: Add notebook ID to SKILL.md Sources section**

Add the notebook ID `3a99bf34-ed1d-4abf-a932-32789965ac7b` in the Sources Encoded footer.

- [ ] **Step 2: Commit**

```bash
git add plugins/copywriting/skills/children-stories/SKILL.md
git commit -m "feat(copywriting): children-stories NotebookLM notebook reference"
```

---

### Task 10: Install Skill + Cowork Symlink + Verify

**Files:**

- No new files — deployment steps

- [ ] **Step 1: Update Claude Code cache**

```bash
cd ~/.claude/plugins/marketplaces/skills && git pull
cp -r plugins/copywriting/. ~/.claude/plugins/cache/skills/copywriting/1.0.0/
```

- [ ] **Step 2: Create Cowork symlink**

```bash
COWORK="$HOME/Library/Application Support/Claude/local-agent-mode-sessions/skills-plugin/803e4d51-6951-4e8b-86ba-07e2a6118f12/a8e7d198-e221-402c-b591-385eb8ba7245/skills"
ln -sf ~/Projects/skills/plugins/copywriting/skills/children-stories "$COWORK/"
```

- [ ] **Step 3: Push to GitHub**

```bash
cd ~/Projects/skills && git push
```

- [ ] **Step 4: Verify skill loads**

Restart Claude Code session. Check that `children-stories` appears in available skills list. Invoke `/copywriting:children-stories` and verify it loads.

- [ ] **Step 5: First test — run blueprint mode**

Start a test project, invoke the skill without `story-blueprint.md` present. Verify it enters blueprint mode and asks the first question (age calibration).
