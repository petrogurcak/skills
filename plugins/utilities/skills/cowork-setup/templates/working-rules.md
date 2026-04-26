# Working Rules

## Session start
1. Read ~/Claude-shared/projects-index.md, find current project, summarize:
   - Last date worked
   - What was done
   - Next step
2. If no entry exists for current project, ask user for status before proceeding.

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
