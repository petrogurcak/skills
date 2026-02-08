# Plan: Workflow Improvements

**Datum:** 2026-02-08
**Zdroje:** Simon Willison "Software Factory", StrongDM factory.strongdm.ai, Dan Shapiro "Five Levels", PM článek (Mohit Aggarwal)
**Stav:** Schválený - ready k implementaci

---

## Kde jsme dnes

Náš workflow pokrývá:
- **Principy** (12 core principles, TDD, Git safety, verification)
- **Orchestrace** (development-workflow s 4 execution strategiemi)
- **Framework skills** (6 execution skills pro různé stacky)
- **Učení** (mistakes.md, /learn, session context)
- **Review** (deep-review orchestrátor + 3 specialisté)

Na Shapirově škále jsme **Level 3-4** (human-in-the-loop review / spec-driven development).

## Co chybí

Po analýze článků identifikuji 4 mezery, seřazené podle dopadu:

---

## Improvement 1: Pyramid Summaries pro velké projekty

**Problém:** Když agent pracuje s větším projektem (Menu Editor, ERP), ztrácí čas čtením celého kódu. Nemá rychlý přehled "co kde je".

**Inspirace:** StrongDM "Pyramid Summaries" + náš existující "3-Layer Search" pattern z MEMORY.md.

**Řešení:** Nový princip #13 do CORE_PRINCIPLES.md + generátor do workflow-optimization.

**Co to je:**
```
Level 1: ARCHITECTURE.md (1 stránka)
  - Přehled modulů, hlavní závislosti, datový tok
  - Agent čte VŽDY jako první

Level 2: module/README.md (per modul)
  - Veřejné API, hlavní třídy, závislosti
  - Agent čte když potřebuje pracovat s modulem

Level 3: Zdrojový kód
  - Agent čte jen konkrétní soubory které potřebuje
```

**Implementace:**
1. Přidat princip #13 "Progressive Context" do CORE_PRINCIPLES.md template
2. Přidat do workflow-optimization jako option I) "Project Summaries"
   - Auto-generuje ARCHITECTURE.md z existujícího kódu
   - Doporučí kde přidat module README
3. Do development-workflow Phase 0 přidat: "Read ARCHITECTURE.md first"

**Effort:** Malý (úprava 3 existujících skills)
**Dopad:** Vysoký (šetří tokeny, zrychluje orientaci v projektu)
**Priorita:** 1

---

## Improvement 2: Scenario-First Testing (User Flows)

**Problém:** TDD je perfektní pro backend/logiku. Ale u UI (aplikace i LP) je unit test často umělý. Přitom Menu Editor UŽ má solidní Playwright e2e setup s user flows - jen to není formalizované jako princip v našich skills.

**Inspirace:** StrongDM "Scenario Testing" + Menu Editor e2e praxe (smoke/core/error-states).

**Co už máme v Menu Editoru (vzor):**
```
e2e/
├── smoke/           # Rychlé sanity (běží na každém PR)
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   ├── editor.spec.ts
│   └── items.spec.ts
├── core/            # Plné user journeys
│   ├── item-crud.spec.ts      # CREATE → VERIFY → REMOVE
│   ├── group-management.spec.ts
│   ├── translations.spec.ts
│   └── ...
├── error-states/    # Simulované API chyby
│   └── api-errors.spec.ts
└── fixtures/
    ├── test-fixtures.ts   # Custom Playwright fixtures
    └── test-data.ts       # API TestDataFactory (create/delete via API)
```

**Řešení:** Formalizovat tento pattern jako doporučený workflow pro VŠECHNY projekty s UI.

**Co to je:**
```
Typ projektu → Testovací přístup:

Backend/Logic    → Classic TDD (RED → GREEN → REFACTOR)
Web aplikace     → Scenario-First (doporučený):
  1. Definuj user flows PŘED implementací:
     "User přihlásí se → vidí dashboard → klikne 'Nové menu' → vyplní → uloží"
  2. Implementuj feature
  3. Napiš Playwright e2e test pro flow
  4. Dvouúrovňový systém:
     - Smoke (< 5 min, na každém PR): auth, navigace, CRUD happy path
     - Core (< 15 min, pre-deploy): plné user journeys, error states
Landing page     → Scenario-Light (doporučený):
  1. Definuj scenarios pro interaktivní sekce (CTA, forms, pricing toggle)
  2. Implementuj
  3. Ověř manuálně nebo Playwright
  4. Povinný Lighthouse check
```

**Dvouvrstvý testing (CI + AI):**
```
CI Layer (automatické, na každém PR):
  └─ Playwright - smoke + core + error-states
     Deterministické, rychlé, zdarma
     Chytí regrese: rozbil jsem CRUD? nefunguje login?

AI Layer (manuální, před deploy/release):
  └─ Claude-in-Chrome - exploratory + visual + UX
     "Projdi celou appku, najdi problémy"
     Výstup: GIF nahrávka + report s nálezy
     Chytí to co Playwright nevidí: UX problémy, vizuální bugy, "tohle nedává smysl"
```

**Proč Playwright (ne Cypress):**
- Paralelní execution (4 workers) - 4x rychlejší suite
- Multi-browser (Chromium + Firefox + WebKit)
- Auto-wait (žádné `cy.wait()` hacky)
- API + UI testing v jednom (TestDataFactory pattern)
- Auth state reuse (přihlásíš se jednou, sdílíš session)
- Zdarma (Cypress paralelizace je placená)
- Výjimka: mobilní projekty (Shiftstreak) → Detox nebo Maestro

**Proč Claude-in-Chrome jako druhá vrstva:**
- Zero-maintenance (žádné selektory, žádná údržba testů)
- Adaptivní (AI najde element i po redesignu)
- Exploratory testing ("projdi appku a najdi co je rozbité")
- Visual regression (AI vidí screenshot a zhodnotí)
- UX review ("je signup flow intuitivní?")
- GIF nahrávky pro dokumentaci

**Playwright conventions (z Menu Editor vzoru):**
- `data-testid` atributy pro selektory (ne CSS class, ne XPath)
- TestDataFactory pro API setup/teardown
- Auth jako setup project (běží jednou, sdílí session)
- `{ timeout: 15000 }` pro navigace, `{ timeout: 10000 }` pro akce
- Cleanup v `afterEach` (maže testovací data)

**Implementace:**
1. Přidat "Scenario-First" jako DOPORUČENOU variantu do CORE_PRINCIPLES.md princip #1
   - Backend: TDD povinný
   - Frontend app: Scenario-first doporučený (Playwright e2e)
   - Landing page: Scenario-light doporučený (interaktivní sekce)
2. Přidat do WORKFLOWS.md jako "User Flow Testing Workflow" (dvouvrstvý: CI + AI)
3. Přidat do frontend-app: "Define user flows → Implement → Write Playwright spec"
4. Přidat do frontend-lp: "Define scenarios for interactive sections"
5. Vytvořit Playwright scaffold template:
   - `e2e/` adresářová struktura (smoke/core/error-states/fixtures)
   - `playwright.config.ts` template (projects, auth setup, CI vs local)
   - `test-fixtures.ts` + `test-data.ts` vzor
6. Přidat do projectsetup otázku: "Chceš Playwright e2e scaffold?"
7. Vytvořit "AI Exploratory Testing" instrukce pro Claude-in-Chrome:
   - Pre-deploy checklist: "Projdi hlavní user flows, nahraj GIF, zapiš nálezy"
   - Integrace do deep-review jako volitelný krok

**Effort:** Střední (úprava 4 skills + Playwright template + AI testing instrukce)
**Dopad:** Vysoký (formalizuje to co už funguje v Menu Editoru + přidává AI vrstvu)
**Priorita:** 2

---

## Improvement 3: Multi-Persona Review

**Problém:** deep-review posílá kód do technických specialistů (security, database, API). Ale chybí business/UX perspektiva - nikdo se neptá "dává tohle smysl z pohledu uživatele?"

**Inspirace:** PM článek - 3 persona agenti (Engineer, UX, Business) reviewují stejný spec paralelně.

**Řešení:** Přidat business + UX perspektivu do deep-review orchestrátoru.

**Co to je:**
```
Současný deep-review:
  security-review → OWASP checklist
  database-review → N+1, indexy, transakce
  api-design-review → REST conventions

Rozšířený deep-review (nové):
  + ux-perspective → "Je tohle intuitivní? Kde se uživatel ztratí?"
  + business-perspective → "Řeší tohle skutečný problém? Je scope správný?"
```

**Implementace:**
1. Přidat do deep-review orchestrátoru 2 nové routing kategorie:
   - Pokud změna obsahuje UI/frontend → spusť ux-perspective check
   - Pokud změna je nová feature → spusť business-perspective check
2. Nemusí to být samostatné skills - stačí inline prompty v deep-review
3. Paralelní execution s existujícími review skills

**Effort:** Malý (úprava 1 skillu)
**Dopad:** Střední (zachytí "technicky správné ale uživatelsky špatné" řešení)
**Priorita:** 3

---

## Improvement 4: Maturity Level Indicator

**Problém:** Nemáme jasný přehled kde jsme s automatizací na každém projektu. Jeden projekt může mít plný setup, druhý jen CLAUDE.md.

**Inspirace:** Dan Shapiro "Five Levels" framework.

**Řešení:** Přidat maturity indikátor do ACTIVE_CONTEXT.md.

**Co to je:**
```
## Workflow Maturity

| Component | Status |
|-----------|--------|
| CLAUDE.md + .claude/ | ✅ |
| workflow-optimization | ✅ |
| Pyramid summaries | ❌ |
| Scenario testing | ❌ |
| CI/CD integration | ❌ |

Level: 3/5 (Human-in-the-loop)
```

**Implementace:**
1. Přidat maturity tabulku do projectsetup ACTIVE_CONTEXT.md template
2. workflow-optimization aktualizuje tabulku při přidání komponent
3. Volitelně: `/maturity` command pro rychlý přehled

**Effort:** Minimální (template update)
**Dopad:** Nízký (orientační, ne funkční)
**Priorita:** 4

---

## Co NEDĚLÁME (a proč)

| Nápad | Proč ne |
|-------|---------|
| **Digital Twin Universe** | Enterprise pattern, drahé na build. Pro naše projekty (Menu Editor, Shiftstreak) nemá smysl klonovat externí API. |
| **CXDB (AI Context Store)** | Řešíme jednodušeji přes ACTIVE_CONTEXT.md + DECISIONS.md. Databáze pro konverzace je over-engineering. |
| **$1000/den token budget** | Neudržitelné pro solo dev. Náš sweet spot je $50-100/měsíc s chytrým context management. |
| **NLSpecs jako distribuce** | Náš openspec-workflow to už dělá pro interní použití. Distribuce specs jako "product" není náš use case. |
| **Level 5 Dark Factory** | Bez lidské review ztrácíme kontrolu. Level 3-4 je náš sweet spot - agent dělá, my schvalujeme. |

---

## Plán implementace

| # | Co | Kde | Effort | Session |
|---|----|-----|--------|---------|
| 1 | Pyramid Summaries princip + generátor | CORE_PRINCIPLES, workflow-optimization, development-workflow | 1 session | Další |
| 2 | Scenario-First Testing | CORE_PRINCIPLES, WORKFLOWS, frontend-app, frontend-lp | 1 session | Další |
| 3 | Multi-Persona Review | deep-review skill | 0.5 session | Třetí |
| 4 | Maturity Indicator | projectsetup template, ACTIVE_CONTEXT template | 0.5 session | Třetí |

**Celkem: ~3 sessions (3 večery)**

---

## Rozhodnuté otázky

1. **Pyramid Summaries:** Hybrid - auto-draft na existujícím projektu, template na novém. ✅
2. **Scenario-First:** Doporučený (ne povinný). Vzor z Menu Editor e2e (smoke/core/error-states). Pro app = Playwright, pro LP = scenario-light pro interaktivní sekce. ✅
3. **Multi-Persona Review:** Auto-detect podle scope (UI změny → UX perspektiva, nová feature → business perspektiva). ✅

---

**Stav:** Všechny 4 improvements implementovány. ✅
