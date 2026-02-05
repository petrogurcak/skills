# Aktuální stav práce

## Poslední session
- **Datum:** 2026-02-05
- **Branch:** main
- **Dokončeno:**
  - Migrace 37 skills do 7 pluginů (seo, growth, marketing, copywriting, development, review, ux)
  - GitHub repo `petrogurcak/skills` jako marketplace (PUBLIC)
  - Claude Code marketplace integrace funguje
  - Cowork marketplace integrace funguje
  - CLAUDE.md (globální) aktualizován s dokumentací skills systému
  - Project setup (Generic) pro skills repo
- **Rozděláno:** Žádné
- **Další krok:** Testovat skills v obou systémech

## Otevřené otázky
Žádné

## Poznámky pro další session
- Skills source: `~/Projects/skills/plugins/*/skills/*/SKILL.md`
- Claude Code čte z: `~/.claude/plugins/cache/skills/`
- Cowork čte z: GitHub marketplace (repo je public)
- Při změně skillu: edituj source, commit, push, update Claude Code cache
