---
name: consistency
description: Use when auditing project for internal consistency — duplicates, dead code, cross-layer drift (DB↔ORM↔TS↔Zod), naming drift across layers, time drift (TODO >6mo), i18n key drift, and structural inconsistency in homogeneous file groups (e.g. SKILL.md format across plugins). Interactive walkthrough — categorizes problems CRITICAL/MEDIUM/COSMETIC and walks through one by one with Fix/Defer/Skip choice. Trigger phrases — "consistency audit", "audit projektu", "zkontroluj konzistenci", "najdi nesrovnalosti", "/consistency". NOT for code review of recent changes (use deep-review), single-domain checks (security/api/database — use specialists), or when you want automated fixes without confirmation.
allowed-tools: [Read, Grep, Glob, Bash, Edit, Write, Agent]
---

# Consistency Audit

Adapter from Jan Tichý's `/consistency` skill ([github.com/jantichy/claude](https://github.com/jantichy/claude)) — adapted for skills repo and multi-plugin context.

## Účel

Kompletní audit vnitřní konzistence aktuálního projektu. Cíl: najít vše co si v projektu vzájemně odporuje, je redundantní, špatně zatříděné nebo nekonzistentní — a opravit to spolu s userem.

**Speciálně cenné pro:**
- Skills repo (homogenní `SKILL.md` napříč pluginy)
- Multi-vrstevné projekty (DB ↔ ORM ↔ TS ↔ Zod ↔ form drift)
- Long-running projects (TODO/FIXME drift, mrtvý kód po refaktorech)
- Multi-plugin/module repos kde se snadno duplikuje znalost

---

## Fáze 1: Pre-flight — kontext a baseline

Před spuštěním Explore agenta nasbírej baseline. Nezávislé čtecí operace **paralelně** (single message, multiple tool calls).

### 1.1 Načti dokumentaci konvencí

Pokud existují, přečti (paralelně):
- Projektový `CLAUDE.md` (zejména kapitolu `## Consistency` — viz Fáze 5)
- `README.md`, `CONTRIBUTING.md`, `STYLEGUIDE.md`
- `eslint.config.*`, `.eslintrc*`, `prettier.config.*`, `biome.json`
- `tsconfig.json` (zejména `strict`, `target`, `paths`)
- `.editorconfig`
- `package.json` (engines, scripts, workspaces)

Z nich sestav **baseline konvencí**. Co projekt aktivně dodržuje, nehlas jako kosmetickou odchylku; rozpor s baseline hlas důsledněji.

### 1.2 Načti seznam ignorovaných položek

Pokud projektový `CLAUDE.md` obsahuje kapitolu `## Consistency`, přečti ji. Položky tam (s důvodem) **vůbec neuváděj** v nálezech — user je dříve označil jako "won't fix".

### 1.3 Spusť existující nástroje

Paralelně, pokud jsou v projektu:
- `tsc --noEmit` (TypeScript projekty)
- linter v `--quiet` módu (eslint, biome)
- `knip` nebo `depcheck` (pokud nainstalované)
- `pytest --collect-only` (Python — neběhej testy, jen check že importy fungují)

Výstupy si zapamatuj a předej Explore agentovi. Pokud nástroj selže nebo není dostupný, pokračuj a poznamenej to. Nálezy z toolchainu se v dalších fázích označí tagem `[toolchain]`.

---

## Fáze 2: Průzkum projektu (Explore agent)

Spusť **Explore subagent** s tímto zadáním (předej absolutní cestu k projektu, baseline z 1.1, ignored z 1.2, výstupy z 1.3):

```
Prohledej celý projekt a najdi všechny případy vnitřní nekonzistence.
Procházej systematicky.

PŘED HLÁŠENÍM PROBLÉMU vždy zkontroluj:
- Není uveden v sekci "Ignorované položky" (předané v zadání) — pokud ano, neuváděj
- Není přímo nad řádkem komentář `consistency-ignore: <důvod>` — respektuj
- Soubor není v `vendor/`, `legacy/`, `generated/`, `node_modules/`, `dist/`, `build/`, `*.gen.*` — neuváděj
- Pokud baseline projektu explicitně dovoluje to co bys hlásil, neuváděj

═══════════════════════════════════════════════════
KRITICKÉ (mohou rozbít funkčnost)
═══════════════════════════════════════════════════

- Typové nesrovnalosti — stejný koncept/entita definovaná různými typy v různých souborech
- Duplicitní konfigurace s různými hodnotami (tsconfig, package.json, env)
- Env proměnné použité v kódu ale chybějící v .env.example / dokumentaci
- Interface/schéma deklarované jinak než je skutečně používáno
- Import cesty nesedící se skutečnou strukturou souborů
- Cross-layer kontrakty:
  - DB schema ↔ ORM model ↔ TS types ↔ Zod/Yup validation ↔ form schema ↔ submit payload
  - API endpoint ↔ klientský volání (request/response, query params)
  - GraphQL/OpenAPI spec ↔ implementace
- Bezpečnostní konzistence:
  - Tabulky/endpointy někde chráněné (RLS, auth middleware), jinde podobné ne
  - Chybějící input sanitizace / parametrizace na endpointech které ji jinde mají
  - Nekonzistentní CORS / rate-limiting pravidla
- Verzování runtime:
  - Různé verze stejné lib v monorepo packages
  - Rozjetá Node verze napříč `engines` / `.nvmrc` / `.tool-versions` / CI / hosting
  - TS `target` vs browserslist drift
  - Lockfile vs manifest drift

═══════════════════════════════════════════════════
STŘEDNÍ (technický dluh)
═══════════════════════════════════════════════════

- Duplicitní logika (stejná funkce implementovaná vícekrát)
- Různé patterny ke stejnému problému (async/await vs .then())
- Behaviorální konzistence:
  - Stejný typ chyby řešený různě (throw vs Result vs silent vs null)
  - Různé loggery/úrovně/formáty pro stejný typ události
  - Podobné endpointy validují vstup jen někdy
  - Auth/authz mechanismy se liší napříč podobnými endpointy bez důvodu
  - Data fetching řeší stejný use-case různě (fetch vs React Query vs SWR)
- Špatně zatříděné soubory (utilita v komponentách, komponenta v utils/)
- README/dokumentace popisující funkce které neexistují nebo fungují jinak
- Nepoužívané exporty, funkce, proměnné (dead code)
- Zapomenuté zbytky po odstranění:
  - Importy smazaného modulu, konfigurace pro zrušenou funkci
  - Typy/interfacy pro odstraněnou entitu
  - Registrace odebrané route nebo pluginu
  - Zmínky v dokumentaci nebo komentářích
  - Testy odstraněné funkcionality
  - Env proměnné pro mrtvou feature
- Závislosti v package.json které nejsou použity (nebo naopak)
- i18n a UI texty:
  - Chybějící překladové klíče (použité v kódu, nejsou ve slovníku)
  - Nepoužité klíče (ve slovníku, nikde nereferencované)
  - Stejný UI koncept různě pojmenovaný ("Smazat" vs "Odstranit" vs "Vymazat")
  - Nesystematický mix jazyků v UI textech
- Časový drift:
  - TODO/FIXME starší než ~6 měsíců (zjistitelné `git blame`)
  - Komentáře s deadlinem v minulosti ("remove after 2025-01")
  - Feature flagy s trvale stejnou hodnotou (ready to inline/remove)
  - Pozastavené migrace (částečná DB migrace bez follow-upu)

═══════════════════════════════════════════════════
KOSMETICKÉ (konzistence stylu)
═══════════════════════════════════════════════════

- Mixing naming conventions (camelCase vs snake_case, kebab-case vs PascalCase u souborů)
- Inconsistent export styly (named vs default bez zjevného důvodu)
- Komentáře nepopisující kód pod nimi (zastaralé, mylné)
- Inconsistentní formátování / struktura podobných souborů
- Naming napříč boundaries:
  - Stejná entita s různými názvy v různých vrstvách (`User` v DB / `UserAccount` v API / `userObj` v UI)
  - Inkonzistentní pluralizace v adresářích a routes (`users/user`, `items/item`)
  - Stejný koncept různými slovy v komentářích / UI / kódu (mix čeština/angličtina bez systému)

═══════════════════════════════════════════════════
SKUPINY SOUBORŮ SE SDÍLENOU STRUKTUROU
═══════════════════════════════════════════════════

Aktivně hledej adresáře kde víc souborů stejného typu (MD, JSON, YAML, TS) reprezentuje
instance stejného konceptu — každý soubor = jeden systém / jedna entita / jeden modul.

Typické signály: podobné názvy, jeden adresář, podobné sekce/klíče.

**Speciálně pro skills repo:** `plugins/<plugin>/skills/<skill>/SKILL.md` jsou homogenní
set s povinným YAML frontmatter (`name`, `description`). Zkontroluj:
- Všechny SKILL.md mají frontmatter? `name` a `description` přítomné?
- `description` obsahuje "Use when..." pattern?
- `name` v frontmatter odpovídá adresáři?
- Trigger phrases v `description` jsou v česky i anglicky?

Pro každou skupinu:
1. Urči společnou strukturu (průnik sekcí/klíčů ve většině souborů)
2. Zkontroluj jestli ji mají VŠECHNY soubory skupiny
3. Záměrné odchylky (specifická vlastnost) jsou v pořádku — nehlásit
4. Hlásit pouze: chybějící sekce z průniku, sekce v podmnožině bez důvodu, strukturální rozdíly

Závažnost: STŘEDNÍ — výjimkou je když chybějící sekce způsobuje neúplnost dat (KRITICKÉ).

═══════════════════════════════════════════════════
GROUPING (povinné)
═══════════════════════════════════════════════════

- Pokud má víc nálezů stejný root cause (jedno přejmenování → desítky souborů, jeden
  chybný typ → mnoho dotčených míst), seskup do jedné položky s podproblémy a v poli
  `related_root` u následků uveď title root položky.
- Pokud má jeden problém >20 výskytů, neuváděj jednotlivé řádky — uveď pattern, počet
  výskytů, příklad 3 lokací a navrhni hromadnou změnu (codemod / find-replace).
  Označ tagem `batch`.
- Nálezy z toolchain výstupů uveď, ale označ tagem `toolchain`.

═══════════════════════════════════════════════════
VÝSTUP (povinný formát)
═══════════════════════════════════════════════════

JSON pole objektů:

[
  {
    "severity": "KRITICKÉ" | "STŘEDNÍ" | "KOSMETICKÉ",
    "title": "krátký název problému",
    "description": "popis (1-2 věty)",
    "locations": ["soubor:řádek", ...],
    "suggested_fix": "konkrétní akce (ne vágní 'refaktoruj to')",
    "tags": ["toolchain"?, "batch"?],
    "related_root": "title jiného problému jehož je tento následkem (volitelné)"
  }
]
```

---

## Fáze 3: Zpracování výsledků

Z JSON výstupu Explore agenta sestav interní seznam problémů. Seřaď:
1. KRITICKÉ první, pak STŘEDNÍ, pak KOSMETICKÉ
2. V rámci každé kategorie umísti **root položky před jejich následky** (přes `related_root`), aby oprava rootu mohla automaticky vyřešit víc následných.

---

## Fáze 4: Přehled

Zobraz userovi přehled před tím než začneš procházet problémy:

```
## Výsledky konzistenčního auditu

Nalezeno X problémů celkem:
- KRITICKÉ: N
- STŘEDNÍ: N
- KOSMETICKÉ: N

Z toho:
- [toolchain] hlášeno již existujícím nástrojem: N
- [batch] hromadné (>20 výskytů): N

Problémy budu procházet od nejzávažnějších. U každého navrhnu řešení a zeptám se co s ním udělat.
```

Pokud žádné problémy → řekni to a skonči.

---

## Fáze 5: Interaktivní průchod

Pro **KAŽDÝ problém** (jeden po druhém, nikdy víc najednou):

### 1. Zobraz problém

```
---
[N/celkem] [SEVERITY] [tagy] NÁZEV PROBLÉMU

Problém: [popis]
Kde: [soubory:řádky, nebo "X výskytů, např. ..." u batch]

Navrhované řešení:
[konkrétní akce — ne vágní "refaktoruj to", ale "přesuň funkci X ze
souboru A do B a aktualizuj import v C"]
```

### 2. Zeptej se userem

`Opravit (A) / Odložit (B) / Přeskočit (C)?` — u batch problémů přidej `/ Rozbalit (D)`

Přijímej celá slova i samotná písmena (case-insensitive):
- **A / Opravit** — proveď změnu hned (krok 3)
- **B / Odložit** — zapiš do interního seznamu odložených, neřeš teď
- **C / Přeskočit** — zeptej se na krátký důvod ("Proč to neopravovat?") a zapiš do projektového `CLAUDE.md` do kapitoly `## Consistency` (krok 6). Pokud user nechce uvést důvod, zapiš `(bez uvedeného důvodu)`.
- **D / Rozbalit** (jen u batch) — vypiš všechny lokace a začni je řešit jednotlivě jako samostatné podproblémy

### 3. Pokud user zvolí A/Opravit

a. **Proveď změnu.** U batch (>20 výskytů) řeš hromadně — find-replace, codemod, scripted edit přes Bash; **ne** desítky Edit volání po jednom.

b. **Verifikace po opravě — vždy, ne občas.** Spusť relevantní kontroly:
- TS projekt: `tsc --noEmit`
- Pokud projekt má build script + oprava se týká buildovaného kódu + build je rychlý (<30s): `<package manager> run build`
- Pokud existují relevantní testy pro upravený soubor a jdou rychle pustit: pusť je

c. **Pokud kontrola selže** → zastav se, ukaž userovi chybu a diff a zeptej se jak pokračovat. Nepokračuj automaticky na další problém.

d. **Po úspěšné opravě KRITICKÉHO** přepočítej zbývající seznam — projdi položky s `related_root === <title opraveného>` a krátce ověř (Read/Grep), zda už nejsou neaktuální. Vyřešené vyhoď z fronty a započítej do "vyřešeno automaticky" v shrnutí.

e. **Commit dle autocommit nastavení projektu** — pokud projektový `CLAUDE.md` obsahuje sekci `### Autocommit`, commituj a pushni hned po každé opravě s výstižnou commit message. Jinak commit jen když user explicitně požádá.

### 4. Pokud user napíše cokoli jiného než volbu

Interpretuj jako doplňující instrukci k aktuálnímu problému (uprav navrhované řešení nebo odpověz na dotaz). **NE jako "přeskočeno".**

### 5. Pokračuj na další problém.

### 6. Zápis do `## Consistency` v projektovém CLAUDE.md (krok 2 — Přeskočit)

- Pokud projektový `CLAUDE.md` neexistuje, vytvoř s minimálním obsahem (hlavička + kapitola `## Consistency`)
- Pokud kapitola `## Consistency` neexistuje, doplň ji na konec souboru
- Formát záznamu (přidávat na konec kapitoly):

```
## Consistency

Položky vyhodnocené při /consistency auditu jako "neopravovat". Při dalším auditu se neuvádějí.

- **YYYY-MM-DD** — *<title>*: <důvod>
  - Lokace: <soubor:řádek, ...>
```

Datum vezmi z `Today's date is ...` v system-reminderu.

---

## Fáze 6: Závěrečné shrnutí

Po projití všech problémů:

```
## Hotovo

- Opraveno: N problémů
- Vyřešeno automaticky (následek root opravy): N problémů
- Odloženo: N problémů
- Přeskočeno (zapsáno do CLAUDE.md → Consistency): N problémů

[Pokud jsou odložené: seznam s popisy]
```

---

## Použití pro skills repo (specific)

Při auditu `~/Projects/skills` zaměř se zejména na:

1. **SKILL.md format drift** — všechny skills mají frontmatter s `name` + `description`?
2. **Trigger phrases** — všechny skill descriptions mají CZ + EN trigger fráze?
3. **Plugin.json version** — odpovídá obsahu pluginu? (bumped když se přidávají skills?)
4. **Symlinky** — `~/.claude/plugins/cache/skills/` cache odpovídá source v `plugins/`? (spusť `sync-skills-symlinks.sh` pokud drift)
5. **CLAUDE.md trigger map** — všechny pluginy v root `CLAUDE.md` Trigger → Skill Map mají odpovídající skills v `plugins/`?
6. **Orchestrator coverage** — orchestrators (copywriting, marketing, ux, product, seo, ig) routují na všechny skills v jejich pluginu, žádný orphan?
7. **Cross-plugin duplikace** — dva skills v různých pluginech řeší stejný problém? (potencial extract do shared)
