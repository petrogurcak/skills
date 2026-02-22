# Aktuální stav práce

## Poslední session
- **Datum:** 2026-02-22
- **Branch:** main
- **Dokončeno:**
  - **Anthropic Skills Guide audit — všech 59 skills aktualizováno:**
    - Descriptions: nový formát `[What] + [When/triggers] + [NOT when]` (Anthropic guide pattern)
    - Metadata: `author: Petr` + `version: 1.0.0` přidáno ke všem 59 skills
    - web-copy split: 6088 → 1755 slov, detaily do `references/` (3 soubory)
  - **Inbox zpracován:** 7 položek (picobot, OpenClaw, approval fatigue, console.log, Anthropic guide, MCP code execution)
  - **Memory uložena:** `anthropic-skills-guide.md` — principy pro budoucí skills
  - **Claude Code cache aktualizován** pro všech 10 pluginů
- **Rozděláno:** Změny NEJSOU commitnuté ani pushnuté
- **Další krok:** `git add` + commit + push do GitHub, update Claude Code cache na dalších strojích

## Otevřené otázky
- Plán `2026-02-22-semantic-memory.md` (status: pending, 0/6) — nesouvisí s touto session

## Poznámky pro další session
- Anthropic guide principy: `~/.claude/projects/-Users-petrogurcak-Projects-skills/memory/anthropic-skills-guide.md`
- web-copy references: `plugins/copywriting/skills/web-copy/references/` (3 soubory)
- 6 background agentů editovalo frontmatter paralelně — výsledek ověřen (59/59 OK)
