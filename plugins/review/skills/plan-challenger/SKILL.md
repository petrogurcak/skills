---
name: plan-challenger
description: Adversarial review of implementation plans — finds failure modes, hidden dependencies, scope risks, missing edge cases, and architecture concerns BEFORE coding begins. Use when a plan file has been written and needs validation before implementation starts. Mandatory in planning skill Phase 3 Step 2. Works in both Claude Code and Gemini CLI.
metadata:
  author: Petr
  version: 1.0.0
---

# Plan Challenger

Adversarial review skill. Your job is to find problems with implementation plans **before** coding begins. Be rigorous, specific, and honest.

**Announce:** "Pouštím plan-challenger — adversarial review plánu."

## When to Use

- Plan file byl právě napsán (`docs/plans/*.md`) a čeká na review
- Automatické v `planning` skill Phase 3 Step 2
- Manuální volání: "pust plan-challenger na [plan file]"

## When NOT to Use

- Plan ještě neexistuje jako soubor (nejdřív planning skill)
- Bug fix (použij `debugging` skill)
- Kód už je napsaný (použij `deep-review`)

---

## Inputs

Potřebuješ cestu k plan filu. Pokud ji nemáš:

1. Zkontroluj `docs/plans/` v aktuálním projektu
2. Pokud je více plánů, zeptej se který
3. Pokud žádný neexistuje, STOP — řekni userovi že plán musí existovat

## Process

### Step 1: Read Plan Thoroughly

Přečti celý plan file. Věnuj pozornost:

- YAML frontmatter (status, tasks_total)
- Každou task description
- Referencím na existující kód
- Test strategy (nebo jeho absence)
- Execution order

### Step 2: Read Relevant Code

**DŮLEŽITÉ:** Neposuzuj plan izolovaně. Prozkoumej:

- Files zmíněné v planu (existují? mají zmíněné funkce?)
- Podobné existující patterns v codebase
- Test suite (existuje infra? jaké frameworks?)
- `CORE_PRINCIPLES.md` / `CLAUDE.md` v projektu

Plan může vypadat rozumně, ale konfliktovat s existujícími konvencemi.

### Step 3: Challenge Across 5 Dimensions

#### 1. Hidden Dependencies

- Plan předpokládá libraries/APIs které nemusí existovat nebo mohly změnit API?
- Implicitní ordering dependencies mezi tasky (task 5 vyžaduje output tasku 2)?
- Jakýkoliv task vyžaduje setup který není zmíněn?
- Environment proměnné, config files, migrace DB — zmíněné?

#### 2. Failure Modes

- Co když external API spadne (Stripe, Sentry, auth provider)?
- Co když DB schema neodpovídá předpokladům?
- Race conditions v concurrent operacích?
- Partial failures uprostřed multi-step operace?
- Network timeouts, retry logic?

#### 3. Scope Risks

- Je některý task fakticky 2-3 tasky maskované jako jeden?
- "And also..." requirements schované v description?
- Plán pokrývá error handling, nebo jen happy path?
- Edge cases zmíněny nebo mlčky ignorovány?
- Rollback strategy pokud deploy selže?

#### 4. Architecture Concerns

- Plán konfliktuje s existujícími patterns v codebase?
- Existuje jednodušší alternativa (YAGNI check)?
- Škálovatelnost pokud requirements rostou?
- **Abstraction red flags:** vytváří helper bez Rule of Three? stringly-typed dispatcher? god-function? Invoke `review:abstraction-review` lens pokud ano.
- Duplicated logic se stávajícím kódem (Grep test)?

#### 5. Testing Gaps

- Má každý task test step?
- Unit testy stačí nebo potřebuješ integration testy?
- Scénáře obtížné na automated testy?
- Test data / fixtures — připravené?
- Jak ověřit úspěch deploye (acceptance criteria)?

---

## Output Format

Přesně tenhle formát, bez odchylek:

```markdown
## Plan Challenge Results

**Plán:** `[path]`
**Verdict:** [APPROVE / REVISE / REJECT]
**Shrnutí:** [Jedna věta]

### CRITICAL (must fix before implementing)

- **[C1]** [Specifický popis problému]
  - **Risk:** [Co konkrétně může selhat]
  - **Suggestion:** [Jak fixnout — konkrétně, ne "add error handling"]
  - **Where:** [Task ID nebo file:line]

### WARNING (should address)

- **[W1]** [Specifický popis]
  - **Risk:** [Co může selhat]
  - **Suggestion:** [Jak fixnout]

### INFO (consider)

- **[I1]** [Observace nebo otázka k zvážení]

### Next Step

[Jedna věta co má user udělat dál.]
```

## Rules

- **Be specific, not generic.** "Error handling chybí" = useless. "Task 3 volá Stripe API bez retry na 429 rate limit" = useful.
- **Check actual codebase.** Nepiš review v izolaci. Přečti zmíněné files.
- **Pokud je plán solidní, řekni to.** Don't invent issues. Verdict APPROVE je valid output.
- **Max 5 CRITICAL + 5 WARNING.** Be selective. Pokud máš 10 CRITICALs, plán je špatně napsaný a patří REJECT.
- **Verdict je rozhodující:**
  - `APPROVE`: Plán je ready, 0 CRITICALs, optional WARNINGs.
  - `REVISE`: Opravitelné problémy, user updatuje plán, pak implementuje.
  - `REJECT`: Fundamental issues, potřeba přepracovat approach (vrať se do Phase 1 planning).

## After Challenge

**Pokud CRITICAL findings:**

1. Oznam findings userovi
2. Čekej na rozhodnutí: "Opravím plan podle findings — chceš to vidět před update?"
3. Po souhlasu: update plan file, zaznamenat změny do git (pokud projekt má git)

**Pokud jen WARNING/INFO:**

- Prezentuj findings
- Doporuč: "Můžeme pokračovat, nebo napřed aplikuj tyhle warninsu?"
- Let user decide

**Po challengi:**

- Invoker skill (typically `development:planning`) pokračuje Phase 3 Step 3: ptá se na deep-review

## Cross-CLI Note

Tento skill nahradil dřívější `plan-challenger` agent (který byl Claude Code-specific). Funguje identicky v Claude Code i Gemini CLI přes standardní skill invocation.
