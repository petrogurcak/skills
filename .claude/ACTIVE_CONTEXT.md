# Aktualni stav prace

## Posledni session

- **Datum:** 2026-04-04
- **Branch:** main
- **Dokonceno:**
  - **Velky commit** — 171 souboru: vsechny untracked skills, MCP servery, plany, pluginy commitnuty a pushnuty
  - **Utilities plugin** — pridan do marketplace.json + plugin.json, nainstalovan
  - **mac-cleanup SKILL.md** — odstranen `metadata` blok z frontmatteru
  - **.gitignore** — pridany: `.env`, `.mcp.json`, `pricing/*.pdf/*.epub`, embedded git repos (`code-mode/`, `flutter/`, `postmark/`)
  - **children-books plugin** — nainstalovan do Claude Code

## Otevrene problemy

- **utilities:mac-cleanup** — skill je nacteny (funguje pres Skill tool), ale NEOBJEVUJE se v `/` autocomplete menu. Restart Claude Code nepomohl. Frontmatter je ciste (jen name + description). Mozny bug v Claude Code plugin systemu — dalsi pluginy ze `skills` marketplace funguji.

## Poznamky pro dalsi session

- Otestovat research, second-opinion, team-briefing engine choice
- Cowork symlinky pro research + second-opinion
- Stale neotestovano: brand-strategy, children-stories, finance-ops
- Debug proc `/utilities:mac-cleanup` neni v autocomplete (ostatni skills z toho marketplace funguji)

## Dalsi kroky

### Priorita 1

1. Debug utilities:mac-cleanup autocomplete issue
2. Otestovat nove skills pri prilezitosti

### Priorita 2

3. Otestovat brand-strategy, children-stories, finance-ops
4. Spustit copywriting-reviewer na realnem projektu
