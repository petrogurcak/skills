# Rozhodnutí

Historie architektonických a designových rozhodnutí pro tento projekt.

---

## 2026-04-14: Designing Abstractions — vrstevna strategie (skill + princip + retrofit)

**Kontext:** Opakovany failure pattern v AI-assisted developmentu: LLM pise parallel implementace helperu (neni schopen videt sibling files), a pak kdyz se ho poprosi o consolidaci, udela spatnou abstrakci — god-function, stringly-typed dispatcher nebo parameter sprawl. Chteli jsme aby se "responsibilities-before-abstraction" principy aplikovaly vzdy, ne jen kdyz na ne nekdo konkretne myslí.

**Rozhodnuti:** Trojvrstvy pristup:

1. **On-demand skill `development:designing-abstractions`** — plny workflow s Abstraction Strategy artefaktem, fires na trigger frazich (refactor, DRY, dispatcher, helper, shared).
2. **Always-loaded Principle 14 v projectsetup templatu** — CORE_PRINCIPLES.md + CLAUDE.md TL;DR. Kazda session zacina s kompaktnim checklistem (Grep first, Rule of Three, no stringly-typed dispatchers, Value Objects).
3. **Retrofit pres `workflow-optimization` Option P** — existujici projekty si mohou princip doinstalovat bez plneho rerunu projectsetup.
4. **Symetricky review skill `review:abstraction-review`** — sdili 12-principle taxonomii s design-time skillem, volan z deep-review auto kdyz diff obsahuje helpers/dispatchers.

**Alternativy:**

- Jen skill (no always-loaded) — LLM by princip nepouzival pokud by si na nej neveypamtoval fires
- Jen princip v CLAUDE.md (no skill) — chybelo by hloubkove zpracovani + Abstraction Strategy artefakt
- Rigid enforcement hook — moc invazivni, blokoval by i legitimni pripady
- Samostatny plugin pro abstractions — overkill, patri do development + review

**Duvod:** Vrstveni = defense in depth. Princip v CLAUDE.md TL;DR zajisti ze LLM o nem vi kazdou session (always in context). Skill provadi hlubku kdyz je treba. Review skill validuje ex-post. Retrofit moznost umoznuje postupne prijeti v existujicich projektech. 12-principle taxonomia sdilena mezi design/review = konzistentni slovnik napric fazemi, snadne mapovat findings z review zpet na design principles.

---

## 2026-04-14: Research-first skill creation workflow

**Kontext:** Pri tvorbe `designing-abstractions` skillu jsem nejdriv napsal draft z hlavy, pak pustil Gemini deep research a zjistil ze chybi 3-4 klicove principy (Connascence, Deep Modules, Parse-Don't-Validate, Mikado Method).

**Rozhodnuti:** Pri tvorbe skillu s domenovym obsahem (principy, patterny, frameworky) spustit `development:research` skill PRED psanim draftu, ne az po nem. Gemini/Claude prohleda canonical zdroje a zabrani premature draft, ktery pak musim zahazovat.

**Alternativy:**

- Psat draft z hlavy (risk: prehledneme klicove principy)
- Research az pri review (moc pozde, draft uz je vic fixovany)
- Gemini second-opinion na hotovy skill (vic tokenu na to same)

**Duvod:** Research-first je levnejsi (jeden Gemini call misto iteraci na draftu) a produkuje grounded obsah. Update `skill-creator` a `writing-skills` workflow aby research-first byl defaultni pro domain skills.

---

## 2026-02-28: Sentry Auto-Fix Agent — bash poller + headless claude -p

**Kontext:** Chceme automaticky detekovat a opravovat Sentry issues bez lidske intervence.
**Rozhodnuti:** Bash poller (launchd, 2 min) → curl Sentry API → python3 JSON parser → `claude -p` headless per issue s Sentry MCP. State management pres flat files (last-check.txt, processed.txt, lockfile). Safety: $1 budget, 10 min timeout, 1 concurrent agent, only development branch.
**Alternativy:** 1) Sentry webhook → server (slozita infra), 2) Cron s custom fixovacim skriptem (mene flexibilni nez LLM), 3) GitHub Actions triggered by Sentry (externi dependency)
**Duvod:** Bash poller je nejjednodussi autonomni loop. `claude -p` s MCP je plne schopny investigovat stacktrace, cist kod, fixovat, testovat. Flat file state = zero dependencies. Lockfile = bezpecna serialization.

---

## 2026-02-25: AGENT.md pattern pro dual-CLI (Claude Code + Gemini CLI)

**Kontext:** Chteli jsme stridat Claude Code a Gemini CLI na stejnych projektech se sdilenou konfiguraci.
**Rozhodnuti:** AGENT.md jako single source of truth pro project instructions. CLAUDE.md a GEMINI.md jsou symlinky na AGENT.md. MCP servery sdilene pres sync-mcp.sh (YAML → .mcp.json + .gemini/settings.json).
**Alternativy:** 1) Dve separatni konfigurace (duplikace), 2) Jen CLAUDE.md a Gemini ho cte primo (nefunguje — Gemini hleda GEMINI.md), 3) Copy script misto symlinku (out of sync risk)
**Duvod:** Symlinky = zero-maintenance, zmena v AGENT.md se projevi vsude. Public repo `petrogurcak/dual-cli` jako template pro dalsi projekty.

---

## 2026-02-25: Learning Advisor — headless agent architektura

**Kontext:** Potreba automaticky skenovat externi zdroje a navrhovat co se AI agenty maji naucit.
**Rozhodnuti:** Headless `claude -p` agent s RSS-first scanning, 2 typy proposals (read/buy), approval workflow pres filesystem (pending → approved → archive). Sonnet model, domain-restricted WebFetch, max 50 turns.
**Alternativy:** 1) Cron s custom skriptem (mene flexibilni), 2) MCP server (overkill), 3) Full autonomie bez approval (risk nekvalitních zmen)
**Duvod:** `claude -p` je nejjednodussi forma headless agenta. Human-in-the-loop approval pres mv souboru = zero overhead. RSS-first = strukturovana data s daty, homepage fallback pro robustnost.

---

## 2026-02-20: Nový plugin "product" pro product management skills

**Kontext:** Potřeba PM skills pokrývajících celý product lifecycle - discovery, prioritizace, strategie, PMF, metriky
**Rozhodnutí:** Vytvořit 9. plugin `product` (category: product) s orchestrátor + 5 sub-skills architekturou. Založeno na deep research 15 osobností a 30+ frameworků.
**Alternativy:**

- Přidat pod growth (PM je growth-adjacent)
- Přidat pod marketing (PM se překrývá s go-to-market)
- Jeden monolitický skill (vše v jednom SKILL.md)
  **Důvod:** Product management je samostatná disciplína, zaslouží vlastní plugin. Orchestrátor pattern (jako ux-orchestrator) umožňuje routing na správný sub-skill. 6 skills pokrývá kompletní PM workflow: discovery → strategy → prioritization → metrics → PMF.

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
