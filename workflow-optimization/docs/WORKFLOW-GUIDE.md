# Jak vyvíjet s Claude Code: Kompletní workflow

> Praktický průvodce efektivním vývojem s Claude Code, založený na 10+ měsících iterací a kombinaci Anthropic best practices s Everything Claude Code patterns.

---

## Filozofie

### Proč potřebuješ workflow?

Claude Code je mocný nástroj, ale bez struktury:
- **Context rot** - Po 2-3 hodinách Claude zapomíná rozhodnutí z začátku session
- **Nekonstantní kvalita** - Někdy skvělý kód, někdy basic chyby
- **Ztracené znalosti** - Každá session začíná od nuly

### Náš přístup

```
Workflow = Orchestrace + Učení + Automatizace
```

| Princip | Implementace |
|---------|--------------|
| **Orchestrace** | development-workflow řídí celý proces |
| **Učení** | mistakes.md + /learn zachycují poučení |
| **Automatizace** | Hooks kontrolují kvalitu automaticky |

---

## Jak mluvit s Claude

### Pro nové věci → development-workflow

| Řekneš | Claude pochopí |
|--------|----------------|
| "přidej login" | Nová feature |
| "udělej X" | Nová feature |
| "potřebuju Y" | Nová feature |
| "chci Z" | Nová feature |
| "nastav authentication" | Nová feature |
| "pokračuj na čem jsem skončil" | Pokračování |

### Pro opravy → systematic-debugging

| Řekneš | Claude pochopí |
|--------|----------------|
| "oprav to" | Bug fix |
| "nefunguje X" | Bug fix |
| "spadá to" | Bug fix |
| "chyba v Y" | Bug fix |
| "proč to nejde" | Bug fix |
| "pokazilo se Z" | Bug fix |

### Pro build errory → build-error-resolver

| Řekneš | Claude pochopí |
|--------|----------------|
| "build selhává" | Build fix |
| "TypeScript errors" | Build fix |
| "tsc --noEmit ukazuje chyby" | Build fix |

**Klíčové:** Nemusíš říkat "implementuj" nebo "použij skill". Prostě řekni co potřebuješ.

---

## Komponenty systému

### 1. Skills (co Claude umí)

```
~/.claude/skills/
├── development-workflow/     # Orchestrátor vývoje
├── workflow-optimization/    # Optimalizace workflow
├── systematic-debugging/     # Debugging metodika
├── expo-workflow/           # Expo/React Native specifika
├── flutter-workflow/        # Flutter specifika
├── nette/                   # Nette framework
└── ...
```

### 2. Hooks (automatické kontroly)

```
SessionStart    → Načte mistakes.md lessons
PostToolUse     → Po Edit: Prettier, TS check, console.log warning
                → Po git commit: Reflection reminder
SessionEnd      → Pattern extraction reminder
```

### 3. Project files (paměť projektu)

```
.claude/
├── ACTIVE_CONTEXT.md    # Co se děje teď
├── DECISIONS.md         # Proč jsme se rozhodli takto
├── mistakes.md          # Co nefungovalo a proč
├── verification.md      # Checklist před commit
└── checkpoints.log      # Milestones
```

---

## Workflow: Krok za krokem

### Session Start

**Co se děje automaticky:**
1. Claude čte CLAUDE.md (pravidla projektu)
2. Hook načte lessons z mistakes.md
3. Hook načte ACTIVE_CONTEXT.md (kde jsi skončil)
4. Skill check - Claude ví, které skills má použít

**Co ty děláš:**
Prostě řekni co potřebuješ. Systém rozpozná typ úlohy.

**Tip:** Nemusíš používat speciální slova. Přirozená čeština funguje.

---

### Implementace feature

#### Fáze 1: Design (automaticky)

Když řekneš "implementuj X", Claude automaticky:

```
1. Zkontroluje existující plán (docs/plans/*.md)
   └─ Najde → Přeskočí na implementaci
   └─ Nenajde → Pokračuje brainstormingem

2. Brainstorming
   - Prozkoumá požadavky
   - Navrhne přístup
   - Zeptá se na nejasnosti

3. Writing-plans
   - Rozdělí na úkoly
   - Definuje verification criteria
   - Vytvoří docs/plans/YYYY-MM-DD-feature.md
```

#### Fáze 2: Strategie (ty rozhoduješ)

Claude se vždy zeptá:

```
"Jak chceš implementovat?"

A) Manual TDD (1-2 úkoly)
   - Ty kontroluješ každý krok
   - Nejlepší pro: učení, složité věci, tight control

B) Batch Execution (3 úkoly najednou)
   - Checkpoint mezi batchy
   - Nejlepší pro: střední features, code review

C) Subagent-Driven (paralelní agenti)
   - Automatické code review po každém úkolu
   - Nejlepší pro: rychlou iteraci, mnoho úkolů
```

**Moje doporučení:**
- **Nový projekt / neznámý stack** → A) Manual TDD
- **Známý stack, jasné požadavky** → B) Batch
- **Velký feature, časový tlak** → C) Subagent

#### Fáze 3: Implementace

**Pro Manual TDD (A):**

```
1. Claude vytvoří branch: feature/nazev
2. Detekuje framework:
   - package.json + expo → expo-workflow skill
   - pubspec.yaml → flutter-workflow skill
   - composer.json → nette skill
3. DOCS FIRST: Stáhne aktuální dokumentaci
4. TDD cyklus: RED → GREEN → REFACTOR
5. Verification: testy + static analysis
```

**Pro Batch/Subagent (B/C):**

```
1. Claude vytvoří branch
2. Spustí executing-plans nebo subagent-driven-development
3. Automaticky reportuje progress
4. Code review po dokončení
```

#### Fáze 4: Finalizace

```
1. Code review (superpowers:requesting-code-review)
2. Verification checklist (.claude/verification.md)
3. Git workflow:
   - Commit s Co-Authored-By
   - Push (pokud chceš)
   - PR (pokud chceš)
```

#### Fáze 5: Session context

```
1. Update ACTIVE_CONTEXT.md
   - [MAJOR] pro architektonická rozhodnutí
   - [MINOR] pro bug fixes

2. Log decisions (pokud relevantní)
   - Volba mezi 2+ přístupy?
   - Ovlivňuje více souborů?
   - Budoucí já se bude ptát "proč"?
   → Zapiš do DECISIONS.md
```

---

### Debugging

Když řekneš "oprav bug" nebo "nefunguje X":

```
1. Claude aktivuje systematic-debugging skill
2. Reprodukce problému
3. Hypotézy (max 3)
4. Testování hypotéz
5. Fix + verification
6. → Navrhne zápis do mistakes.md
```

**Klíčové:** Debugging má vlastní skill, nepoužívá development-workflow.

---

### Build errors

Když build selže:

```
1. Claude aktivuje build-error-resolver agent
2. Sbírá všechny errory: npx tsc --noEmit
3. Opravuje jeden po druhém
4. MINIMÁLNÍ změny - žádný refactoring
5. Reportuje: X errors fixed, Y lines changed
```

---

## Automatické kontroly (Hooks)

### Po každém Edit JS/TS souboru

```
1. Auto-Prettier → Formátuje kód
2. TS Check → Ukazuje type errors
3. console.log warning → Připomene smazat
```

### Po git commit

```
Quick reflection:
- Stalo se něco nečekaného?
- Musel jsem něco revertovat?
- Byly moje předpoklady správné?

Pokud ano → Navrhni mistakes.md entry
```

### Na konci session

```
Pattern extraction check:
- Vyřešil jsem netriviální problém?
- Objevil jsem užitečný workaround?
- Nějaká debugging technika stojí za zapamatování?

Pokud ano → /learn
```

---

## Commands (co můžeš zavolat)

| Command | Kdy použít |
|---------|------------|
| `/commit` | Vytvořit git commit |
| `/checkpoint create X` | Označit milestone |
| `/checkpoint verify X` | Porovnat s milestone |
| `/learn` | Extrahovat pattern do skills/learned/ |
| `/session-context` | Uložit/načíst stav session |

---

## Praktické scénáře

### Scénář 1: Nový feature od nuly

```
Ty: "Přidej biometric login do app"

Claude:
1. [brainstorming] "Jaký typ biometrie? Face ID, Touch ID, oba?"
2. [writing-plans] Vytvoří docs/plans/2026-01-24-biometric-login.md
3. "Jak chceš implementovat? A/B/C"

Ty: "B"

Claude:
4. git checkout -b feature/biometric-login
5. [executing-plans] 3 úkoly najednou
6. "Batch 1 done. Pokračovat?"

Ty: "ano"

Claude:
7. [další batch]
8. [code-review]
9. [finishing-branch] "Merge, PR, nebo cleanup?"
```

### Scénář 2: Bug fix

```
Ty: "Login nefunguje na iOS"

Claude:
1. [systematic-debugging]
2. "Můžeš reprodukovat? Co přesně se děje?"

Ty: "Po Face ID se appka zamrzne"

Claude:
3. Hypotézy:
   - H1: Async handling v biometric response
   - H2: State management při auth
   - H3: iOS-specific permission issue
4. "Zkontroluji H1 první..."
5. [fix]
6. "Opraveno. Navrhuji mistakes.md entry: [...]"
```

### Scénář 3: Pokračování v rozpracovaném

```
Ty: "Pokračuj kde jsem skončil"

Claude:
1. Čte ACTIVE_CONTEXT.md
2. "Vidím, že jsi včera dokončil core login logic.
    Zbývá: UI polish, error handling, testy.
    Chceš pokračovat s UI?"

Ty: "ano"

Claude:
3. [načte existující plán]
4. [pokračuje v implementaci]
```

---

## Best practices

### DO ✅

1. **Nech workflow běžet** - Nemusíš říkat "použij development-workflow", aktivuje se sám
2. **Odpovídej na otázky** - Claude se ptá z důvodu, dej mu info
3. **Vyber strategii vědomě** - A/B/C není náhodné, každá má své místo
4. **Aktualizuj mistakes.md** - Největší ROI pro kvalitu
5. **Používej checkpoints** - Před velkými změnami

### DON'T ❌

1. **Nepřeskakuj brainstorming** - I "jasné" věci mají edge cases
2. **Neměň strategii mid-flight** - Vyber A/B/C a drž se toho
3. **Neignoruj verification** - Testy musí projít PŘED commit
4. **Nezapomínej na context** - ACTIVE_CONTEXT.md je tvá paměť

---

## Troubleshooting

### "Claude zapomíná rozhodnutí"

→ Zkontroluj ACTIVE_CONTEXT.md, měl by tam být [MAJOR] entry
→ Pokud chybí, session-context skill nebyl použit

### "Kvalita kódu kolísá"

→ Zkontroluj mistakes.md - jsou tam poučení?
→ Aktivuj code quality hooks (workflow-optimization option E)

### "Trvá to moc dlouho"

→ Použij C) Subagent-driven pro paralelizaci
→ Nebo rozděl feature na menší části

### "Nevím kde jsem"

```
/checkpoint list
```
→ Uvidíš všechny milestones

---

## Shrnutí

```
┌─────────────────────────────────────────────────────────┐
│                    SESSION START                         │
│  • CLAUDE.md loaded                                     │
│  • mistakes.md lessons injected                         │
│  • Skills ready                                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    USER REQUEST                          │
│  "Implement X" → development-workflow                   │
│  "Fix bug Y"   → systematic-debugging                   │
│  "Build fails" → build-error-resolver                   │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    EXECUTION                             │
│  1. Design (brainstorm + plan)                          │
│  2. Strategy choice (A/B/C)                             │
│  3. Implementation (with framework skill)               │
│  4. Verification (tests + static analysis)              │
│  5. Finalization (review + git)                         │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│                    SESSION END                           │
│  • ACTIVE_CONTEXT.md updated                            │
│  • decisions logged                                      │
│  • mistakes.md proposed (if applicable)                 │
│  • /learn reminder                                       │
└─────────────────────────────────────────────────────────┘
```

---

## Další kroky

1. **Začni s projectsetup** - Vytvoří .claude/ strukturu
2. **Přidej workflow-optimization** - Aktivuje hooks a tracking
3. **Vyvíjej normálně** - Systém se aktivuje sám
4. **Iteruj** - Přidávej do mistakes.md, systém se učí

---

*Tento workflow je výsledkem kombinace Anthropic best practices, Everything Claude Code patterns, a 10+ měsíců praktického používání.*
