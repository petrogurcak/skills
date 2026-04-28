# Rozhodnutí

Historie architektonických a designových rozhodnutí pro tento projekt.

---

## 2026-04-28: Layered IG architecture — ig-orchestrator + ig-content + ig-strategy

**Kontext:** Existující `instagram-content` skill (847 řádků) mixoval ~40% writing (Hook/Substance/Payoff, hooks library, captions, Otto principy) + ~60% strategy (4 idea criteria, 9 formats, technical settings, engagement, monetizace). Vedle toho byl v repo root mimo plugin strukturu `otto-copywriting-v3.3.skill` (production artifakt z claude.ai, 589 řádků s strict output discipline) — 5 verzí archivů, žádná integrovaná do plugin systému. User identifikoval že kvalita IG output v claude.ai pochází právě z Otto v3.3 (banned framework labels v output, 3-5 variants v code blocks, banned words enforced) — což `instagram-content` skill nedělal.

**Rozhodnuti:** Layered architecture pod copywriting-orchestrator:

```
copywriting-orchestrator (top router for all copy)
        ↓ detects "instagram, ig, reel, story, post, social"

ig-orchestrator (IG family router)
        ↓ detects sub-intent
        ├── ig-content    (WRITING — Otto v3.3 port, strict output discipline)
        ├── ig-strategy   (PLANNING — extracted from old instagram-content)
        └── (future) ig-reels, ig-stories, ig-carousel, ig-ads, ig-analytics
```

**Klíčové elementy:**

1. **Naming convention `ig-` prefix** (ne `instagram-` ani `otto-copywriting`):
   - Krátší, konzistentní pro celou IG family
   - "Otto" jako name skipnutý — Otto Bohuš je jen autor metodologie, jméno skillu má popisovat funkci ne osobu

2. **Plugin-shared references** na úrovni `plugins/copywriting/*.md` (ne uvnitř konkrétního skillu):
   - `core-copywriting-principles.md` — Otto principy 1-11 (universal)
   - `365-copy-triky.md` — Mužíková reference banka
   - `core-briefing-process.md` — 8 otázek brief
   - Důvod: tyto soubory jsou cross-skill reusable (newsletter, web-copy, ig-content všechny mohou referencovat)

3. **Separation of concerns**:
   - `ig-content`: WRITING discipline (jak napsat — Otto methodology, output rules)
   - `ig-strategy`: PLANNING (co/kdy točit, formáty, technical, engagement)
   - `ig-orchestrator`: ROUTING (detekuje sub-intent + koordinuje multi-skill workflows)

**Alternativy:**

- **Update existujícího `instagram-content`**: zkazil by čistotu (instagram-content je generic encyclopedia, Otto je strict execution), nemixovat
- **Flat architecture bez ig-orchestrator** (peer-to-peer cross-refs): jednodušší, ale nescaluje když přibyde 4+ IG skills (ig-reels, ig-stories, ig-ads, ig-analytics — Petr explicitně potvrdil že chce expansion)
- **Otto jako standalone skill mimo IG namespace**: matoucí — Otto je IG-specific, mimo IG kontext nepoužitelný

**Důvod:** User explicitně chce expansion na ig-reels/ig-stories/ig-analytics. Layered orchestrator pattern (precedent z `copywriting-orchestrator` + `seo-orchestrator` + `marketing-orchestrator`) je v plugin systému osvědčený. Plus rozdělení writing vs strategy je intuitivní pro routing — user řekne "napiš post" → ig-content; "co točit" → ig-strategy. Bez mid-layer by `copywriting-orchestrator` rozrostl do 5+ IG-specific routing rules.

---

## 2026-04-27: cowork-setup skill v utilities pluginu, ne development

**Kontext:** Bylo potřeba lightweight setup pro Claude Cowork non-dev projekty (marketing, copy, strategie, koncepty, research). Existující `development:projectsetup` má 44K templates a po 2 projektech vyhořel 5h Claude Max limit — overkill pro non-dev práci. Otázka: kde nový skill žije?

**Volby:**

1. `development` plugin (vedle projectsetup) — ALE kontextově není dev
2. `utilities` plugin (s `mac-cleanup`) — neutral home pro user-level infrastruktur tooling
3. Nový plugin `cowork` — overkill pro 1 skill, future expansion nejistý

**Rozhodnutí:** `utilities`. Důvod: `cowork-setup` není dev-specific (žádné TDD/Git/build rules), je to user-level setup helper. `mac-cleanup` v utilities má podobný character (system-level, cross-domain). Nový plugin `cowork` by byl premature — kdyby přibyly další cowork-\* skills, lze pak split.

## 2026-04-27: GitHub bridge jako Cowork ↔ claude.ai chat propojení (ne unofficial API)

**Kontext:** Target user (Gabi) potřebuje stejný kontext v Cowork desktop **i** claude.ai chat na mobilu (IG posts za pochodu). Research ukázal že není oficiální bidirectional sync mezi Cowork a claude.ai chat. GitHub issue #2511 open 10 měsíců bez Anthropic odpovědi.

**Volby:**

1. **Pattern A — Import-once + zapomeň** (oficiální, low fidelity, žádný runtime sync)
2. **Pattern B — claude-pyrojects unofficial API** (reverse-engineered, riskuje rate-limit/ban/breakage)
3. **Pattern C — GitHub jako bridge** (oficiální, robustní): `~/Claude-shared/` = git repo → push → claude.ai chat čte přes GitHub Connector

**Rozhodnutí:** Pattern C. Důvod: jediný oficiálně podporovaný bidirectional flow. Žádný unofficial API risk. Versioning brand voice + klient deliverables zdarma (git history). Mobile/iPhone friendly bez setupu. Dependency: GitHub CLI + Connector v claude.ai (free tier).

**Implementační dopad:** v1.1 Mode A Step 9 dělá `git init` + `gh repo create --private --push` + appendne git addendum do `working-rules.md`. Cowork pak při session end nabídne "Pushnout změny na GitHub?" — auto-sync trigger.

---

## 2026-04-16: Hook-equivalent discipline pro Gemini + Agent Tool guidance

**Kontext:** Claude Code ma 4 event-driven hooks (SessionStart, PostToolUse, Stop, SessionEnd) co automatizuji kriticke quality gates: auto-format, console-log detection, pre-completion verify, memory indexing, session evaluation. Gemini CLI hook system nema. Zaroven Claude Code ma `Agent tool` se subagent_type co poskytuje isolation (fresh context, tool restriction, parallelism, model override) — Gemini to nema 1:1.

**Rozhodnuti:**

1. **Cross-CLI session context loader** — `~/.claude/scripts/session-start.sh` vypise ACTIVE_CONTEXT + DECISIONS + mistakes + MEMORY.md v jednom bashi. Claude Code ho muze spustit jako fallback, Gemini ho **povinně** spousti na začátku session (nahrazuje Claude Code claudeMd auto-injection).

2. **Lifecycle Rules v GEMINI.md** — explicit text rules ktere simulují Claude Code hooks:
   - Post-Edit: manual format + console.log grep + secrets scan
   - Pre-completion: mandatory tests + lint + build s command output
   - User correction: auto-save jako feedback memory + MEMORY.md update
   - Session end: wrapup skill call

3. **Agent Tool guidance v obou configs:**
   - CLAUDE.md: "Pro review skills DEFAULT = Agent tool se subagent_type" (explicit guidance pro Claude aby pouzival isolation, ne inline Skill)
   - GEMINI.md: "Ztráta Agent Tool isolation" sekce + compensation rules (concise reading, sekvenční review, honor max limits)

**Alternativy:**

- **Gemini CLI wrapper v bash** co spousti hooks kolem každého Claude call — hack, fragile, neřeší PostToolUse atomicky
- **Ignorovat hooks pro Gemini** — drift mezi CLI by rostl, Gemini by skipl quality gates
- **Implementovat Gemini agent isolation pres Gemini ADK** — velký projekt (týdny práce), Python/JS implementace, out of scope
- **Nedělat Gemini parity vůbec** — user hlásil že Gemini skipuje Phase 3 v planning skillu, nepřijatelné

**Duvod:** Pragmaticky trade-off. Gemini = plan B, but as close as possible. Cena 90% parity je ~100 řádků instructions v GEMINI.md + 50-line bash script + porting 4 agents as skills. Zbylá 10% (true isolation, deterministic enforcement) vyžaduje fundamentální kroky které nejsou worth it. Claude Code zůstává primary — Gemini pokryt pro secondary use cases (when Claude Code unavailable, cross-checking, model diversity).

---

## 2026-04-15: Dual-CLI parity — `op run` wrapper + sync script + agent-driven config sync

**Kontext:** Chceme plne stridat Claude Code a Gemini CLI ve stejnem projektu se sdilenym workflow (ACTIVE_CONTEXT, DECISIONS, mistakes, CORE_PRINCIPLES). Drift mezi `~/.claude/CLAUDE.md` a `~/.gemini/GEMINI.md` (2 mesice) odhalil ze pattern "symlinky" z 2026-02-25 nefunguje kvuli Gemini Added Memories (Gemini auto-appenduje). API key leak pri sync `.mcp.json` → `.gemini/settings.json` odhalil ze plaintext env values v configu jsou tikajici bomba.

**Rozhodnuti:** Trojvrstvy pristup:

1. **Agent-driven config sync** pro global configs: pravidlo v obou CLAUDE.md i GEMINI.md ("pri editu jednoho VZDY updatni druhy, liší se jen v path refs + Gemini Added Memories"). Ne symlinky (Gemini's auto-append by prepsal Claude config).

2. **Script-driven MCP sync** pro project-level: `~/.claude/scripts/sync-mcp-to-gemini.sh` prevadi `.mcp.json` (Claude format) → `.gemini/settings.json` (Gemini format, bez `"type":"stdio"`), auto-addne do `.gitignore`, warninguje na env vars.

3. **1Password `op run` wrapper pro secrets:** `command: op run --no-masking -- python3 ...` + `env: {"X_API_KEY": "op://Dev/shared-keys/X_API_KEY"}`. Zero plaintext v configu — reference pouze. `op` resolvuje secrets za behu.

**Alternativy:**

- **Symlinky na global level** — rozbilo by Gemini Added Memories (Gemini auto-appenduje, prepsalo by Claude config)
- **`.mcp.json` s `${ENV_VAR}` + user source shell script pred launch Claude Code** — kricha (easy to forget source), nereseni pro GUI Cowork session
- **Vault file (encrypted .env)** — dalsi dependencia + extra krok, op je uz na stroji
- **Plaintext v gitignored souborech** — defence in depth fail: jedna vrstva (gitignore) proti leaku, bez redundance

**Duvod:** `op run` je native 1Password pattern, zvladne env refs bez sourcingu. Public repo push `97c17a2` ukazal ze gitignore sam nestaci — pokud se na novy file zapomene, leak. op:// reference v configu jsou bezpecne i pri accidental commitu. Sync script + agent-driven pravidlo = low-friction pattern ktery skaluje pres projekty. Agent-driven sync je trade-off: vyzaduje disciplinu (agent musí cist pravidlo), ale flexibilnejsi nez mechanicky diff.

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
