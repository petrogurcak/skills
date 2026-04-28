# Working Rules

## Session start

1. Read ~/Claude-shared/projects-index.md, find current project, summarize:
   - Last date worked
   - What was done
   - Next step
2. If no entry exists for current project, ask user for status before proceeding.
3. Read `<project>/about-project.md`. If sections are empty/sparse and chybí context (purpose, voice rules, key principles), ask before producing output — don't guess from project name alone.

## Collaboration patterns

**Editorial autonomy:** Take brief directional feedback and make editorial judgment calls. Don't ask "what tone?" or "which angle?" — pick, ship a draft, let user redirect.

**Multiple variants:** When producing copy, content, or design directions, default to 3–5 variants. Name them clearly with approach + recommendation:

- "Variant 1 – Problem/Solution (recommended)"
- "Variant 2 – Story-led"
- "Variant 3 – Numbers-first"
- Add a 1-line comparative note: which works for what context.

**Iteration cadence:** User selects variant → modifications → format adaptations (Stories, Reels, email, etc.) → new variants if needed. Move fast through this loop.

**Research before hooks:** For copy that needs a hook, run web research on product history, founder story, technical origin — surface 1–2 compelling facts before drafting. Don't write generic hooks when 5 minutes of research yields a sharper one.

**Critical feedback default:** When user asks "what do you think?" → give honest rating + weaknesses, not validation. If user requests rating, weaknesses come first, strengths second.

**Verify before claiming:** Don't assert technical facts (warranty terms, feature names, platform behavior) without source. If unsure → say "let me verify" or "I'd want to check this" rather than fabricate.

**Conciseness wins:** Default to short. If user asks for shorter, go shorter than feels comfortable. Stories and ad copy almost always cut better than they read first draft.

**Save learnings inline:** When user corrects an approach, makes a non-obvious choice, or establishes a project rule mid-conversation → note it in `<project>/about-project.md` "Key learnings" section before continuing. Don't wait for session end.

## During work

- Never delete files without explicit confirmation
- Never write secrets/API keys to projects-index.md or about-project.md
- File naming: YYYY-MM-DD-slug.md
- Apply voice from ~/Claude-shared/voice-and-style.md
- When user asks to write, read templates from ~/Claude-shared/templates/ first

## Session end

- Append 1 line to ~/Claude-shared/projects-index.md (Active section):
  - 2026-MM-DD | <project> | done: <X> | next: <Y>
- Append 2-5 lines to <project>/about-project.md Log section
- Confirm with user before writing
