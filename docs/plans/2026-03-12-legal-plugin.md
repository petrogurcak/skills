---
status: pending
created: 2026-03-12
tasks_total: 7
tasks_done: 0
reviewed: plan-challenger
---

# Legal Plugin — Implementation Plan

**Goal:** Legal compliance skill with MCP server for Czech law RAG — validates feature designs against exact law citations.
**Architecture:** Plugin (orchestrator + specialist skills) + lokalni MCP server (Node/TS) + markdown pravni korpus.
**Tech Stack:** Node.js, @modelcontextprotocol/sdk, zod, TypeScript
**Created:** 2026-03-12

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify → demo → merge → wrapup

---

## Task 1: Legal MCP Server — scaffold + corpus loader

**Files:**

- Create: `legal/legal-mcp/package.json`
- Create: `legal/legal-mcp/src/index.ts`
- Create: `legal/legal-mcp/src/corpus.ts`
- Create: `legal/legal-mcp/tsconfig.json`
- Create: `legal/legal-mcp/src/__tests__/corpus.test.ts`
- Create: `legal/legal-mcp/corpus/test-fixture/meta.yaml`
- Create: `legal/legal-mcp/corpus/test-fixture/part-01.md`

**What:** MCP server skeleton that loads markdown corpus files at startup. Parses each `.md` file into blocks (heading = section ID, body = text). No search yet — just loading + listing.

**Details:**

- `corpus.ts` exports `loadCorpus(dir: string): Block[]` where `Block = { law, section, heading, text, file, line, annotation? }`
- Parsing rules: `## § XX` or `## Článek XX` heading starts new block, everything until next `##` is body
- `meta.yaml` in each law dir provides law name, number, effective date
- At startup, load all `.md` files from `corpus/` recursively
- Register one MCP tool: `list_laws()` — returns available laws with metadata
- Test fixture: small fake law (5 sections) for unit tests — covers `§` and `Článek` formats
- Tests (`corpus.test.ts`): parsing edge cases — empty sections, sections without number, nested headings, both `§` and `Článek` heading formats

**Commands:**

```bash
cd legal/legal-mcp && npm install && npm run build && npm test
```

---

## Task 2: Legal MCP Server — search_law tool

**Files:**

- Create: `legal/legal-mcp/src/search.ts`
- Create: `legal/legal-mcp/src/__tests__/search.test.ts`
- Modify: `legal/legal-mcp/src/index.ts` (register search_law tool)

**What:** Keyword search over loaded corpus blocks. Returns top N matching blocks with citations.

**Details:**

- `search.ts` exports `searchLaw(blocks: Block[], query: string, scope?: string, limit?: number): SearchResult[]`
- Search algorithm (MVP):
  1. Tokenize query into keywords (split on whitespace, lowercase, remove diacritics for matching)
  2. For each block, score = count of keyword hits in heading + text (heading hits weighted 2x)
  3. Filter by `scope` if provided (matches law directory name)
  4. Sort by score descending, return top `limit` (default 5)
- Diacritics-insensitive matching: use `str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')` — handles all Czech diacritics universally
- MCP tool schema:
  ```
  search_law({
    query: string,       // required
    scope?: string,      // "labor-code" | "gdpr" | "zoou"
    limit?: number       // default 5
  })
  ```
- Response includes: law name, section heading, full text (truncated at sentence boundary if >500 chars), annotation if exists, file path
- Tests (`search.test.ts`): diacritics normalization (`zákoník` matches `zakonik`), empty query, scope filtering, limit, ranking correctness, sentence-boundary truncation

---

## Task 3: Annotations layer

**Files:**

- Modify: `legal/legal-mcp/src/corpus.ts` (load annotations)
- Create: `legal/legal-mcp/src/__tests__/annotations.test.ts`
- Create: `legal/legal-mcp/corpus/labor-code/annotations.md`

**What:** Load `annotations.md` from each law directory. Match annotations to corpus blocks by section reference. Merge into search results.

**Details:**

- `annotations.md` format:

  ```markdown
  ## § 34

  **POZOR (flexinovela 6/2025):** Zkušební doba nově až 4 měsíce (8 pro vedoucí).

  ## § 77

  **POZOR (2026):** DPP pojistný práh CZK 12,000/měsíc.
  ```

- Parse same way as corpus (heading = section ref, body = annotation text)
- Annotation matcher: format-aware regex — matches both `§ (\d+)` and `Článek (\d+)` patterns, extracts section number as key
- When search returns a block, attach matching annotation if exists
- Create initial `annotations.md` with 5-10 key flexinovela/2026 changes
- Tests (`annotations.test.ts`): `§` matching, `Článek` matching, missing annotation returns undefined, multiple annotations per law

---

## Task 4: Seed corpus — Zákoník práce (MANUAL)

**Type: MANUAL** — agent creates directory structure, `meta.yaml`, and format template only. Petr copies actual law text from e-sbirka.cz.

**Files:**

- Create: `legal/legal-mcp/corpus/labor-code/meta.yaml`
- Create: `legal/legal-mcp/corpus/labor-code/part-01.md` (template with 2-3 example sections showing correct format)

**What:** Prepare structure for Zákoník práce. Agent creates meta + format template, Petr does manual copy-paste of all 14 parts.

**Details:**

- Source: https://www.e-sbirka.cz/sb/2006/262 (konsolidované znění)
- Each part = one file (`part-01.md` through `part-14.md`), sections as `## § XX - Název` headings
- `meta.yaml`:
  ```yaml
  name: Zákoník práce
  number: 262/2006 Sb.
  effective_from: 2006-01-01
  last_amendment: 2025-06-01
  amendment_name: Flexinovela
  source_url: https://www.e-sbirka.cz/sb/2006/262
  corpus_updated: 2026-03-12
  ```
- Template `part-01.md` shows correct format:
  ```markdown
  # Část první — Všeobecná ustanovení

  ## § 1 - Předmět úpravy

  (1) Tento zákon upravuje...

  ## § 2 - Závislá práce

  (1) Závislou prací je práce, která je vykonávána...
  ```
- **Remaining parts (part-02 through part-14):** Petr copies manually from e-sbirka.cz following the template format

---

## Task 5: Seed corpus — GDPR (MANUAL)

**Type: MANUAL** — same as Task 4.

**Files:**

- Create: `legal/legal-mcp/corpus/gdpr/meta.yaml`
- Create: `legal/legal-mcp/corpus/gdpr/chapter-01.md` (template with 2-3 example articles)

**What:** Prepare structure for GDPR. Agent creates meta + format template, Petr does manual copy-paste.

**Details:**

- Source: https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32016R0679
- Format: `## Článek XX - Název` headings (NOT `§`, GDPR uses `Článek`)
- `meta.yaml`:
  ```yaml
  name: Obecné nařízení o ochraně osobních údajů (GDPR)
  number: Nařízení (EU) 2016/679
  effective_from: 2018-05-25
  source_url: https://eur-lex.europa.eu/legal-content/CS/TXT/?uri=CELEX:32016R0679
  corpus_updated: 2026-03-12
  ```
- Only HR-relevant chapters: 1-5, 9 (not all 11)
- Template `chapter-01.md` shows correct format:
  ```markdown
  # Kapitola I — Obecná ustanovení

  ## Článek 1 - Předmět a cíle

  (1) Tímto nařízením se stanoví pravidla...

  ## Článek 2 - Věcná působnost

  (1) Toto nařízení se vztahuje na zpracování...
  ```

---

## Task 6: Legal plugin + skills

**Files:**

- Create: `plugins/legal/.claude-plugin/plugin.json`
- Create: `plugins/legal/skills/legal-orchestrator/SKILL.md`
- Create: `plugins/legal/skills/labor-law/SKILL.md`
- Create: `plugins/legal/skills/gdpr/SKILL.md`
- Modify: `.claude-plugin/marketplace.json` (add legal plugin)

**Details:**

**plugin.json:**

```json
{
  "name": "legal",
  "version": "1.0.0",
  "description": "Czech legal compliance — labor law, GDPR, contract validation",
  "author": { "name": "Petr" },
  "skills": "./skills/"
}
```

**legal-orchestrator/SKILL.md:** Detects legal area from query keywords, routes to specialist. No `context: fork` (lightweight router).

Routing table:
| Signal | Route to |
|--------|----------|
| smlouva, HPP, DPP, DPC, výpověď, dovolená, mzda, přesčasy, zaměstnanec | `labor-law` |
| osobní údaje, souhlas, DPIA, zpracování, monitoring, cookies, GDPR | `gdpr` |
| obě oblasti najednou | spustí obě paralelně, pak **merge step**: kombinuje verdikty, nejpřísnější rating vítězí (NEKOMPATIBILNÍ > RIZIKO > KOMPATIBILNÍ), syntetizuje doporučení |

**labor-law/SKILL.md:**

- `context: fork`, `agent: general-purpose`
- `allowed-tools: mcp__legal-mcp__search_law, mcp__legal-mcp__list_laws, Read`
- In skill body also instruct: "Use `search_law` MCP tool with scope `labor-code` to find relevant paragraphs"
- Response format: Verdikt (KOMPATIBILNI/RIZIKO/NEKOMPATIBILNI) + citace + doporučení + disclaimer

**gdpr/SKILL.md:**

- Same pattern, scope `gdpr`
- Focus on: právní základ zpracování, práva subjektů, DPIA, záznamy o zpracování

**marketplace.json:** Add `{ "name": "legal", "source": "./plugins/legal", "category": "legal" }`

---

## Task 7: MCP registry + activation + build docs

**Files:**

- Modify: `~/.claude/mcp-registry.yaml` (add legal-mcp)

**What:** Register legal-mcp server, document build step, pre-activate for CrewBoard.

**Details:**

- Registry entry:
  ```yaml
  legal-mcp:
    category: legal
    description: "Czech legal corpus search (labor code, GDPR)"
    for: ["legal", "compliance", "hr"]
    transport: stdio
    command: "node"
    args: ["/Users/petrogurcak/Projects/skills/legal/legal-mcp/dist/index.js"]
  ```
- Activate in project: `~/.claude/scripts/mcp-activate.sh add legal-mcp`
- Pre-activate for CrewBoard project
- Add `legal` to cache copy script (CLAUDE.md workflow): update `for p in ... legal; do` loop
- Document: after `git pull`, run `cd legal/legal-mcp && npm install && npm run build` before using
- `list_laws()` output includes `corpus_updated` date — warns if >6 months old

---

## Execution Order

```
Task 1 (MCP scaffold + tests)  — základ serveru + test fixture
Task 2 (search tool + tests)   — hlavní funkcionalita
Task 3 (annotations + tests)   — anotační vrstva
Task 4 (zákoník práce)         — MANUAL: structure + template, Petr fills
Task 5 (GDPR)                  — MANUAL: structure + template, Petr fills
Task 6 (plugin + skills)       — Claude Code integrace
Task 7 (MCP registry + docs)   — aktivace per-project
```

Tasks 1-3 jsou sekvenční (závisí na sobě). Agent implementuje.
Tasks 4-5 jsou MANUAL — agent vytvoří šablonu, Petr naplní daty.
Task 6 závisí na Task 2 (MCP tool names). Agent implementuje.
Task 7 závisí na Task 1 (server path). Agent implementuje.

---

## Future TODO (backlog, not this plan)

- [ ] **Contract generator** — DPP/DPC/HPP šablony (trigger: až bude CrewBoard generovat smlouvy)
- [ ] **Compliance audit** — systematický scan codebase (trigger: až bude CrewBoard hotový)
- [ ] **EU AI Act specialist** — nový korpus + skill (trigger: srpen 2026 enforcement)
- [ ] **Tax specialist** — daně, odvody (trigger: až CrewBoard řeší mzdy)
- [ ] **E-commerce specialist** — spotřebitelské právo (trigger: Flat White e-shop)
- [ ] **Semantic search upgrade** — embeddings + vector store (trigger: keyword search nestačí)
- [ ] **ZOOU korpus** — zákon 110/2019 Sb. (trigger: specifické české GDPR otázky)
- [ ] **Auto-update korpusu** — e-sbirka parser (trigger: >5 zákonů v korpusu)
