# Rozhodnutí

Historie architektonických a designových rozhodnutí pro tento projekt.

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
