# Rozhodnutí

Historie architektonických a designových rozhodnutí pro tento projekt.

---

## 2026-05-13: 4 nové skills + 2 mid-orchestrators (email + launch) + canon-driven research strategy

**Kontext:** Marketing agent identifikoval 4 missing skills: email-sequences (multi-day vs newsletter one-off), info-product-launch (info-specific vs generic launch-strategy), testimonial-harvesting (pre-launch beta → social proof), video-scripting (YouTube/VSL/course videos). User chce orchestrator-based routing (nepamatuje si 100+ skill names přímo).

**Rozhodnutí:**

1. **Layered orchestrator pattern** (mirror IG family precedent):
   - `copywriting:email-orchestrator` (mid-layer) → newsletter (one-off) + email-sequences (multi-day)
   - `marketing:launch-orchestrator` (mid-layer) → launch-strategy (generic) + info-product-launch (specific)
   - `video-scripting` + `testimonial-harvesting` jako flat siblings (zatím 1 skill v doméně — mid-orchestrator je premature)

2. **Bohaté trigger phrases CZ+EN v description** (10-15 phrases per skill) místo minimalistic 5-7. Rationale: user invokuje přes orchestrator pomocí natural-language fráze, nepotřebuje si pamatovat skill name. Trade-off: dlouhé descriptions (blízko 1024 char limit), ale orchestrator routing přesněji.

3. **Pragmatic write (NE TDD RED phase)** — research je už comprehensive (219K material across 4 reports), TDD RED by přidalo 1-2h per skill bez výrazného value-add. Pro v1.1 lze přidat compliance tests pokud bugs vyplynou.

4. **NotebookLM-grounded canon research** přes 7 notebooks / 13 books — primary source pro skill foundations místo Claude WebSearch (cost saving + higher quality direct quotes from books vs paraphrase from web). Discovered need pro `notebook_get` enumeration first + per-source queries when multi-book notebook (viz mistakes 2026-05-13).

**Alternativy:**

- **Flat structure bez mid-orchestrators** — orchestrator descriptions by nabobtnaly trigger phrases pro email + launch family, future expansion (post-purchase-drip, saas-launch) by vyžadovalo refactor. Discarded.
- **Refactor launch-strategy → orchestrator + split content** — moc invazivní, existing launch-strategy je validated, lepší zachovat jako sub-skill pod novým orchestrator.
- **Full TDD RED phase per skill** — 3× delší implementation time bez clear value-add pro stable canonical content. Discarded.
- **Skip canon books, use only WebSearch** — chybělo by foundational depth (Schwartz 5 Awareness Levels, Snyder 15-Beat, D'Souza Brain Audit 6-Q jsou primary frameworks ne 3rd-party citations).
- **Author SKILL.md s glm-delegate** — failed 3/4 pro creative writing (viz mistakes 2026-05-13), retry s Sonnet 100% success.

**Důvod:** Layered orchestrator pattern proven v IG family (ig-orchestrator → ig-content + ig-strategy). Pro user profil (100+ skills total, dual-CLI, multi-project Cowork) nutno orchestrator-first routing — fráze "drip campaign" trefí email-orchestrator → email-sequences bez znalosti přesného skill name. NotebookLM canon je quality multiplier vs web research (direct primary sources, page-attributed quotes).

**Dopad:**

- 2 commits na main (`dca203d` + `d38d03f`)
- 16 pluginů → still 16; **108 skills → 115 skills** (+7: 6 z této session + 1 mobile-store-release z dřívější session)
- copywriting 11 → 14, marketing 8 → 11, development 31 → 32
- Symlinks synced (Gemini CLI + Cowork), Claude Code cache updated (copywriting/2.1.0, marketing/1.1.0, development/1.0.0)
- 219K research material persistent v `docs/research/` (audit trail pro future skill maintenance)
- 13 canon books mapped to 4 skill domains — foundation pro budoucí v1.1 uplifts (add specific case studies, CZ adaptation)

---

## 2026-05-09: Recon Phase 1 step v planning skillu + plan-challenger Recon verification

**Kontext:** Phase 3 review reálného plánu (Sellastica reorder slot variant axes) vrátil REJECT s 4 CRITICAL issues — všechny způsobené hallucinated APIs: duplicate method (`getOptions()` už existoval), naming collision (`handleReorderVariants` už použité), wrong stack assumptions (Doctrine vs Sellastica EntityManager, `wrapInTransaction` API vymyšlené, `ProductFacade` neexistuje), pre-existing typo (`$option13d` na entitě). Všechny by zachytil 5-10min recon (grep existing API, handler names, framework primitives, lazy-load patterns) PŘED design fází. Phase 1 původně měla jen vágní "Look at relevant code" — user nebo subagent skipne nebo udělá generic scan.

**Rozhodnuti:**

1. **Phase 1 nový Step 2 "Recon — touched-files deep scan"** v `development:planning` skillu — POVINNÝ krok před Step 4 (Explore approaches). 5-bodový checklist: existing API (grep `public function`/`def`/`fn`), existing handlers (grep `handle/action/@Route`), stack facts (composer.json + 1 sample per layer), lazy-load patterns (grep `null === $this->`/cached_property), pre-existing bugs/typos. Output paste do plan filu pod `## Recon`.

2. **2 execution paths:** (a) inline grep+read pro 1-3 soubory, (b) spawn `feature-dev:code-explorer` agent pro 4+ souborů / cross-layer. Doporučeno default (b) — fresh context, agent description fitne přesně ("traces execution paths, maps architecture layers").

3. **Anti-pattern guard:** "Recon: looked at code, OK" NENÍ Recon. Vyžaduje konkrétní `file:line` references nebo explicit "N/A — důvod proč nerelevantní".

4. **`review:plan-challenger` Step 2.5 "Verify Recon Section"** — POVINNÝ krok. Greppy KAŽDÝ cited method/handler/stack claim z Recon sekce. Hallucinated method existence → CRITICAL. Recon section chybí u 4+ souborů scope → WARNING. Generic Recon → WARNING.

5. **Dimension 1 v plan-challenger přejmenován** "Hidden Dependencies & Hallucinated APIs" s explicitními grep instrukcemi (každá cited method, každý handler, framework primitives ověřit).

**Alternativy:**

- **Phase 0 "Recon" before Phase 1** — discarded, protože při startu sessions nevíme touched files. Recon má fungovat jakmile máme rough scope (po Phase 1 Step 1 + brief).
- **Recon jako separátní persistent artefakt mimo plan file** — discarded, kandidát na rot. `## Recon` sekce inline v plan filu = single source, plan-challenger ji čte přímo.
- **Mandatory `feature-dev:code-explorer` agent vždy** — discarded, overkill pro malé scope (1-3 soubory). Inline grep+read pro 1-3 souborů = pragmatic.
- **Optional Recon ("offer to user")** — discarded, user (a Gemini CLI especially) tendence skipnout optional kroky. Mandatory s exit criteria je jediný způsob jak dohnat compliance.

**Důvod:** Phase-3 REJECT + replan = 30+ min ztráty + plan-challenger token burn. Recon ve Phase 1 = 5-10 min investice s explicit checkpoint co se kontroluje. ROI je 3-6× minimálně. Code-explorer agent je proven (description fitne use-case), náklad jen na fresh-context spawn. Mandatory Step 2.5 v plan-challengeru forcuje verification — bez toho hallucinated Recon proklouzne stejně jako hallucinated plan.

**Dopad:**

- 1 commit (`ebe558a`) + merge (`54956a8`) na main
- 2 SKILL.md upraveny: `development:planning` (+25 lines Phase 1 Step 2), `review:plan-challenger` (+18 lines Step 2.5 + Dimension 1 rewrite)
- Plugin cache + symlinks synced — změny live od příštího restartu
- Future planning sessions: 5-10 min delší Phase 1 (grep/explore + paste do plan), ale prevents Phase-3 REJECT cycles
- Validation pending: příští reálný planning úkol změří jestli Recon fakt zachytí hallucinations

---

## 2026-05-08: Negotiation plugin architecture — 6 skills + 8 references + Cialdini-as-shared

**Kontext:** Nový plugin pro vyjednávání (vzor Joe Navarro). Iterativní brainstorming odhalil že primárně live verbal Voss + Navarro nonverbal nestačí — user identifikoval reálnou potřebu pro **emotionally-charged negotiation** (cofounder split, firing) + **persuasive-email-de-escalation** (angry klient response). To posunulo scope ze 4 sub-skills na 6: orchestrator + reading-people + tactical-empathy + batna-strategy + emotional-conflict + written-negotiation.

**Rozhodnuti:**

1. **Lean orchestrator pattern** (z `copywriting-orchestrator`) — pure router, ne fat orchestrator s embedded modes. 214 lines. Sub-skills nesou všechnu doménovou znalost.

2. **Cialdini = shared reference** (`references/cialdini-7-principles.md`), ne vlastní sub-skill. Volá ho tactical-empathy + batna-strategy + written-negotiation. Důvod: Cialdini je bias overlay, ne standalone activity. Embedded by způsobil duplikaci napříč 3 skills; vlastní sub-skill by byl over-decomposed.

3. **NotebookLM-grounded subagent dispatch** pro Phase 3 sub-skills (5 task). Každý subagent dostal notebook ID `8b989435-d568-4248-a3a1-4ddd8ea57da2` (10 EN books + BCSM paper). Výsledek: direct quotes z primárních zdrojů s page attribution místo paraphrase-of-paraphrase. Subagent for Task 15 caught plan error (Malhotra/Bazerman Ch. 9 vs actual Ch. 11).

4. **Hybrid execution flow** vs strict subagent-driven-development: Phase 2 (8 references s full content templates v plánu) inline-write, Phase 3 (5 sub-skills s real content generation + NotebookLM) subagent dispatch. Důvod: subagent dispatch pro verbatim copy je čistý overhead. Pro content generation s NotebookLM extraction je subagent value-add real.

5. **Ethical frame "discomfort, not deception"** (Navarro post-2018 + Vrij research) napříč všemi sub-skills. Cialdini principles documented in ethical use only s manipulation flag + defense pattern. Crisis refusal (CZ helplines 112/158/116 006/116 111/116 123) v emotional-conflict skill.

6. **CZ adaptation as universal cross-skill reference** (`references/cz-business-culture-deltas.md`). Volá ho všech 5 specialist sub-skills. Pařík/Dolník/Prokůpek jako kanonické CZ autori. Pařík + Dolník PDFs ještě nejsou v notebooku — kompenzace přes free-primary-sources.md (30h+ Pařík free obsah na podcastech/YouTube/press interviews).

**Alternativy:**

- 4 sub-skills bez emotional/written variantů (původní plán) — discarded protože user explicit pain ("emotionally-charged-negotiation" + "persuasive-email-de-escalation" jako needed v jiné session).
- Fat orchestrator s embedded high-emotion + written modes — discarded, user preferoval lean router pattern z copywriting plugin.
- Cialdini jako vlastní sub-skill `cialdini-bias` — discarded, over-decomposed pro single bias library.
- Strict subagent-driven-development (23 tasks × 3 reviewers = 69 subagents) — pragmatic adaptation pro markdown content (inline write pro verbatim, subagent jen pro content generation).

**Důvod:** Negotiation jako disciplína má distinct sub-domains (channel: live/written, charge: business/emotional), které mají dramaticky jiný output structure. Sub-skill split podle channel + emotional intensity dává cleaner routing než single mega-skill. Lean orchestrator pattern z copywriting plugin už proven. NotebookLM-grounded subagents zvyšují kvalitu (direct quotes vs paraphrase) bez kompromisu na CZ adaptation kvalitě (general-purpose Sonnet, ne glm-delegate kvůli CZ output quality).

**Dopad:**

- 1 nový plugin s 6 skills + 8 references na main (`7036407` merge commit)
- 5413 lines content, 16 commits historie
- Marketplace cache synced, symlinky vytvořeny pro Gemini CLI + Cowork
- v1.1 uplift čeká na Pařík + Dolník PDFs (až user získá)
- NotebookLM corpus `8b989435-d568-4248-a3a1-4ddd8ea57da2` jako single source of truth pro plugin content extraction

---

## 2026-05-06: Settings deny list + statusline rate limits (Honza adopt round 2)

**Kontext:** Po dokončení RULES.md + CODING.md + `review:consistency` (audit round 1) zbývaly 2 položky z Honzova repa: statusline a settings. Můj `~/Projects/claude-config/settings.json` měl `Bash(*)` blanket allow + 0 deny rules — žádné guardrails proti accidental Read na `.env`/`.pem`/`.ssh`/credentials. Můj statusline (`statusline-robbyrussell.sh`) zobrazoval session/repo/branch/model/tokens, ale neukazoval rate limit usage — což je kritické vzhledem k tomu že přečerpávám weekly Max limit.

**Rozhodnuti:** Adopt Honzova vzoru pro oba soubory (P1, zero downside):

1. **Settings deny list** (1:1 copy z Honzy) — 57 paths v `permissions.deny` pokrývající Read+Write+Edit pro: `.env*`, `.pem`, `.key`, `.p12`, `.pfx`, `.keystore`, `.ssh/*`, `id_rsa*`/`id_dsa*`/`id_ecdsa*`/`id_ed25519*`, `.aws/credentials`+`config`, `.kube/config`, `.docker/config.json`, `.npmrc`, `.pypirc`, `.netrc`, `.git-credentials`, `auth.json`, `master.key`, `.jks`, `.htpasswd`, `credentials*`, `secrets*`. Doplňuje 1Password-first key management — defense in depth proti accidental tool misuse.

2. **Statusline rate limit segments** (Honzův pattern + můj styl) — 5h session bar + 7-day weekly bar s 5-char `█░` glyfy, color-coded (≥80% svítivá magenta/cyan, ≥60% žlutá, jinak tlumená), reset timery (`H:MM` <24h, `XdYh` ≥24h). Helper funkce `make_bar()` + `format_remaining_short()` reusable. Graceful degradation — segmenty se neukáží pokud `rate_limits` chybí v stdin JSON.

**Alternativy:**

- **Adopt Honzův statusline 1:1** — ztratil bych iTerm2 session name + git branch (Honza má jen change count, já preferuji branch name pro multi-worktree disambiguation). Hybrid je lepší.
- **`BAR_WIDTH=10` jako Honza** — můj statusline má víc segmentů (session + repo + branch + model + tokens + 5h + 7d), 10-char bary by vyhnaly řádek. `BAR_WIDTH=5` je kompromis.
- **Adopt Honzův granular `allow` whitelist** — paralyzovalo by `Bash(*)` workflow (musím psát explicit allow per command). Skip — můj `Bash(*)` je consistent s "high autonomy" v profilu.
- **`ask` list pro destructive ops** (`rm:*`, `git reset:*`, `pkill:*`, `chmod:*`, `docker:*`) — odložené P2 trade-off. Risk reduction vs friction; budu sledovat zda accidental damage scenario se objeví.
- **Adopt `defaultMode: acceptEdits` + `voice` + `autoCompactEnabled: false`** — skip. Mám `skipDangerousModePermissionPrompt: true` (functionally similar pro file edits), voice nepotřebuju, autoCompact OK as-is.

**Důvod:** Deny list je no-brainer (zero downside, čistý security gain — chrání i v scénářích kde Bash command implicitně reads `.env` přes pipe nebo glob). Rate limit segmenty řeší konkrétní pain point (přečerpávám weekly Max — vidět projection in real-time je actionable). Hybrid přístup u statusline (Honzovy bary + můj iTerm2/branch) zachovává moje proven workflow elements (multi-session disambiguation přes session name) a přidává Honzovy missing pieces (rate visibility).

**Dopad:**

- 1 commit pending v claude-config (settings.json deny list)
- statusline change live okamžitě (nevyžaduje restart)
- Honzův repo audit **uzavřený** — všechno relevant z `github.com/jantichy/claude` adoptované nebo explicitně skipped (autoprompt P1 audit, autocommit P1 audit, RULES.md round 1, CODING.md round 1, consistency round 1, statusline+settings round 2).
- Future inspiration sources: pokud Honza přidá nové soubory v repu, sledovat (RSS na GitHub releases / commit feed).

---

## 2026-05-06: Globální pravidla — RULES.md + CODING.md (Hybrid Honza pattern)

**Kontext:** Po auditu Honzova `~/.claude` repa ([github.com/jantichy/claude](https://github.com/jantichy/claude)) zjištěno že Honza má dekomponovaný `CLAUDE.md` (skoro prázdný) + `RULES.md` (META rules) + `CODING.md` (TS/SQL/Web standards). Náš `CLAUDE.md` měl ~400 řádků a chyběly mu: jazyk pravidla, "při nejistotě se zeptat", organizace souborů (single source of truth, generic-base+delta), code-level consistency principy aplikované při psaní (ne jen on-audit). User explicitně chtěl: "rovnou by s těmi principy kód měl psát" — proactive, ne reactive (audit only).

**Rozhodnuti:** Vytvořit 2 globální soubory + 1 audit skill (Hybrid Honza pattern):

1. **`~/.claude/RULES.md`** (META rules) — komunikace + organizace souborů + práce se změnami + skills repo specific
2. **`~/.claude/CODING.md`** (code standards) — 6 obecných principů psaní kódu (proactive consistency) + Platform-specific (TS/SQL/Web/Python/Bash) + Git + Security
3. **`review:consistency` skill** (interactive audit walkthrough) — Honzův pattern: 6 fází, A/B/C/D walk-through

CLAUDE.md zůstává jako identity + agent lifecycle. Reference na RULES + CODING přes `@`-import. Bod 4 v Always-Applied zkrácen na pointer (single source of truth — detail v CODING.md).

**Alternativy:**

- **A) Honzův reactive pattern** (žádné code-level principy v RULES.md, spoléhat na `/consistency` audit). Pros: čistá separace, méně cognitive load. Cons: drift se sbírá, vyžaduje pamatovat audit. Pro Petrův profil (102 skills + dual CLI + Cowork) = nedostatečné.
- **B) Proactive v RULES.md** (přidat "Práce s kódem" sekci). Pros: aplikuje se vždy. Cons: RULES mixuje META s code rules, riziko ignore (delší soubor).
- **C) Hybrid (zvolené)** — Honzova separace + tvůj proactive layer. Pros: single source of truth respektován, Honzova proven separace zachována, drift se nesbírá. Cons: 1 navíc soubor (3 místo 2 globálních pravidel).

**Důvod:** Petrův profil (102 skills, dual-CLI, multi-project Cowork) je drift-prone — reactive nestačí. Současně Honzova separation (META vs Standards) je clean a respektuje single source of truth. Hybrid = best of both. Code-level principy (anti-duplication grep, Rule of Three, cross-layer consistency, naming napříč boundaries) jsou aplikovány **při každém Edit/Write**, ne jen on `/consistency` invoke.

**Dopad:**

- `projectsetup` template přepsán: smazány duplicitní sekce (Rule of Three, no stringly-typed) které jsou nyní v CODING.md, přidaná reference + pre-vytvořené `## Výjimky` + `## Consistency` sekce
- `workflow-optimization` rozšířen o **Option Q "Global Rules Awareness"** — idempotent update existing project CLAUDE.md
- `~/.claude/CLAUDE.md` + `~/.gemini/GEMINI.md` synced (dual-CLI rule)
- 3 commits: claude-config `7e28645` (RULES) + `fda265d` (CODING), skills `423968c` (consistency) + `2df1902` (projectsetup/workflow-optimization)

---

## 2026-04-29: creative plugin — bash + REST místo MCP, klíče přes 1Password

**Kontext:** `creative:image-generation` skill předpokládal MCP servery (`ideogram-mcp`, `nanobanana-mcp` jako custom Python servery na host filesystem) a `IDEOGRAM_API_KEY` / `GEMINI_API_KEY` v env. To nefungovalo v Coworku — Cowork je gVisor-sandboxed agent app která nemá host MCP setup, plus user chce skills přenosné přes víc Maců (instalace na druhém počítači). User explicitně řekl: "při inicializaci řekni uživateli at si do 1pass uloží klíče" — first-run UX musí být self-explaining.

**Rozhodnuti:** Přepsat skill na **bash + REST API + 1Password key resolution chain**:

```
On invoke:
  setup.sh checks keys via priority chain:
    1. op read op://Dev/shared-keys/<KEY_NAME>   ← 1Password (preferred, portable)
    2. $<KEY_NAME> environment variable           ← single-machine fallback
    3. <KEY>=... from .env in cwd                 ← per-project fallback
    4. fail with exact instructions (provider URL, op item path)

Generation scripts (ideogram-generate.sh, nanobanana-generate.sh):
  - call get-key.sh helper
  - build JSON payload via python3 (safe quoting)
  - curl REST endpoint
  - parse response, save image, print path
```

**Klíčové elementy:**

1. **1Password jako default source of truth** — `op://Dev/shared-keys/<FIELD>` vault path je vault+item+field convention. Override přes `$CREATIVE_OP_VAULT` / `$CREATIVE_OP_ITEM` env. Zero plaintext anywhere — keys nikdy v repu, env, nebo `.env` (pokud user explicitně nezvolí fallback).

2. **First-run UX** — `setup.sh` je primary entry point pro nového uživatele. Při missing key prints exact 5-step instructions s provider URL, vault path, field name. Žádný "RTFM" — copy-paste do 1Password a hotovo.

3. **REST místo MCP** — bash skript volá `curl` přímo na `https://api.ideogram.ai/v1/ideogram-v3/generate` a `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict`. Žádné Python deps, žádná MCP setup, žádný stdio bridge. Funguje všude kde je `bash` + `curl` + `python3`.

4. **Imagen 3 → Imagen 4 forced upgrade** — discovered při smoke testu že `imagen-3.0-generate-002` vrací 404 z v1beta endpoint. Default model změněn na `imagen-4.0-fast-generate-001`. Override přes `--model`.

**Alternativy:**

- **Zachovat MCP-only přístup** + dokumentovat MCP setup v Coworku: gvisor sandbox brání direct MCP host bridge, byl by reverse proxy hack — fragile, uncovered edge cases.
- **DXT extension** (Anthropic packaging format pro Cowork extensions): Větší práce (build + sign + install flow), ale long-term cleaner. Odloženo na P2 — bash je dost na 90% use cases.
- **`.env` jako default + 1Password ručně:** Plaintext na disku je risk + vyžaduje user discipline udržovat sync přes víc Maců. 1Password = single source of truth bez plaintext.
- **AWS Secrets Manager / Vault:** Overkill pro solo dev. 1Password má desktop integration + `op` CLI + vault sharing built-in.

**Důvod:** User instruction "skills i na jiném počítači" + "při inicializaci řekni uživateli at si do 1pass uloží klíče" jednoznačně směřuje k 1Password jako canonical source. Bash + REST je nejjednodušší integrace která funguje v Cowork sandboxu i v Claude Code identicky bez větveného code path. Priority chain (op → env → .env) zajišťuje graceful degradation pro situace kde `op` nefunguje (CI, sandbox bez 1Password access, quick local hack). First-run setup.sh je self-explaining — user nemusí číst SKILL.md, copy-paste instrukcí stačí.

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
