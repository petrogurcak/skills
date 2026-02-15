# Rozhodnutí

Historie architektonických a designových rozhodnutí pro tento projekt.

---

## 2026-02-14: Globalni enforcement hooky inspirovane claude-pilot

**Kontext:** Analyza maxritter/claude-pilot ukazala 8 enforcement mechanismu, ktere jsme nemeli
**Rozhodnuti:** Implementovat jako globalni hooky v `~/.claude/hooks/` + agenty v `~/.claude/agents/`, ne per-project. Plan lifecycle pres YAML frontmatter v plan souborech.
**Alternativy:** 1) Per-project hooky (slozitejsi setup), 2) Pouze skill-level enforcement (mene spolehlivy), 3) Python hooky (tezsi dependency)
**Duvod:** Globalni bash hooky = zero-config pro vsechny projekty. YAML frontmatter v planech = jednoduche parsovani bez extra toolingu. Agenti jako `.md` soubory = nativni Claude Code pattern.

---

## 2026-02-10: Nový plugin "branding" pro logo-design a brand identity skills

**Kontext:** Deep research na tvorbu loga - potřeba místa pro logo-design skill a budoucí brand identity skills
**Rozhodnutí:** Vytvořit 8. plugin `branding` (category: design) s prvním skillem `logo-design`. UVP zůstává v marketing.
**Alternativy:**

- Přidat pod marketing (logo je marketing-adjacent)
- Přidat pod ux (logo je design-adjacent)
- Přesunout UVP z marketing do branding (UVP je positioning = core branding)
  **Důvod:** Branding je samostatná disciplína, zaslouží vlastní plugin. UVP zůstává v marketing kvůli praktickému použití (landing pages, ads). Branding plugin bude růst (brand-identity, visual-identity, brand-voice).

---

## 2026-02-08: MCP servery project-scoped místo globálních

**Kontext:** Context window se plnil tool definicemi z MCP serverů, které nebyly potřeba pro aktuální projekt. Auto-compact nestíhal, /compact padal na "Conversation too long".
**Rozhodnutí:** MCP servery přesunuty z globálního scope do project scope (`.mcp.json`). Globálně zůstal jen sentry. Phase-based servery (analytics, gtm, notebooklm, chrome) se aktivují on-demand přes shell script.
**Alternativy:** 1) Nechat globálně a manuálně vypínat, 2) Profiles/presets, 3) Project-scoped s registrem
**Důvod:** Project scope je nativně podporovaný Claude Code (`--scope project`), registr (`mcp-registry.yaml`) slouží jako single source of truth, phase-based aktivace šetří context i u serverů potřebných jen dočasně.

---

## 2026-02-05: Skills jako GitHub marketplace (public repo)

**Kontext:** Potřeba sdílet skills mezi Claude Code a Cowork z jednoho místa
**Rozhodnutí:** GitHub repo `petrogurcak/skills` jako public marketplace
**Alternativy:**

- Private repo + symlinky (nefunguje pro Cowork)
- Separate skills pro každý systém (duplikace)
- Upload ZIP ručně (pracné při změnách)
  **Důvod:** Cowork neumí private GitHub repos, public marketplace funguje pro oba systémy

---

## 2026-02-05: 7 tematických pluginů místo flat struktury

**Kontext:** 37 skills potřebuje organizaci
**Rozhodnutí:** Rozdělit do 7 pluginů: seo, growth, marketing, copywriting, development, review, ux
**Alternativy:**

- Jeden velký plugin se všemi skills
- Flat struktura bez pluginů
- Více granulárních pluginů (10+)
  **Důvod:** Tematické seskupení usnadňuje discovery a údržbu, 7 je rozumný počet

---
