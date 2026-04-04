# OpenSpec Workflow Skill - Návod k použití (v2 - Hybrid)

## ✅ Skill je nainstalován a funguje OKAMŽITĚ!

**Umístění:** `~/.claude/skills/openspec-workflow/`

## 🎯 Jak tento skill funguje

Skill funguje ve **DVOU režimech:**

### ✅ Režim 1: Standalone (Vždy funguje)
- Funguje **OKAMŽITĚ** po instalaci skillu
- **Žádné externí nástroje nepotřebuje**
- Claude vytváří soubory a adresáře sám
- Plný workflow funguje

### 🎁 Režim 2: S OpenSpec CLI (Volitelný bonus)
- Přidává validaci: `openspec validate <change>`
- Přidává dashboard: `openspec view`
- Přidává automatickou archivaci: `openspec archive <change>`
- Přidává AGENTS.md integraci

**Ty si vybereš:** Chceš bonusové funkce? Nainstaluj OpenSpec CLI. Nechceš? Nemusíš, skill funguje stejně.

## 🚀 Rychlý start (BEZ instalace CLI)

```
1. Skill je už nainstalován ✅
2. V Claude Code řekni: "Přidej autentizaci uživatelů"
3. Claude automaticky použije skill a vytvoří specifikace
4. Hotovo! Funguje okamžitě.
```

**Nepotřebuješ:**
- ❌ `npm install` nic
- ❌ `openspec init` v projektu
- ❌ Žádné externí nástroje

## 📋 Volitelně: Instalace OpenSpec CLI (pouze pro bonusové funkce)

**Chceš automatickou validaci a archivaci?** Nainstaluj CLI:

```bash
# Zkontroluj, jestli už nemáš
openspec --version

# Pokud ne a chceš bonusové funkce:
npm install -g @fission-ai/openspec@latest

# Ověř
openspec --version
```

**POZNÁMKA:** Nemusíš spouštět `openspec init` v projektech! Skill vytváří strukturu za tebe.

## 🎯 Kdy skill použít

### ✅ Použij pro:
- Komplexní funkce (více kroků, více komponent)
- Funkcionalitu vyžadující koordinaci s týmem
- Refaktoring měnící chování aplikace
- Nejasné nebo vyvíjející se požadavky

### ❌ Přeskoč pro:
- Opravu překlepů
- Jednořádkové bugfixy
- Triviální refaktoring
- Změny v konfiguraci

## 📁 Co skill vytvoří

Claude automaticky vytvoří:

```
openspec/
├── specs/                    # Zdrojová pravda (source of truth)
│   └── [feature-area]/
│       └── spec.md
└── changes/                  # Aktivní práce
    └── nazev-funkce/
        ├── proposal.md       # Problém, řešení, rozsah
        ├── tasks.md          # Implementační úkoly
        └── specs/
            └── [feature-area]/
                └── spec.md   # Delta specifikace
```

## 🔄 Pět fází workflow

### Fáze 1: Vytvoření návrhu (Proposal)

Claude:
1. Zkontroluje, jestli existuje `openspec/`, pokud ne → vytvoří
2. Vytvoří `openspec/changes/nazev-funkce/`
3. Napíše `proposal.md` s:
   - Popis problému
   - Navrhované řešení
   - Rozsah (co je/není zahrnuto)
   - Kritéria úspěchu

### Fáze 2: Review a schválení

1. Claude ti ukáže proposal
2. Ty dáš feedback
3. Claude upraví podle tvého feedbacku
4. Iterujete, dokud nesouhlasíš
5. **Dáš explicitní souhlas** → teprve pak pokračuje

### Fáze 3: Implementace

Claude:
1. Vytvoří `tasks.md` se seznamem úkolů
2. Pro každý úkol:
   - Napíše test (TDD)
   - Sleduje, jak test selže (RED)
   - Implementuje minimální kód (GREEN)
   - Refaktoruje
   - Označí úkol jako hotový

### Fáze 4: Archivace

**Standalone režim:**
```bash
# Claude přesune ručně:
mv openspec/changes/funkce openspec/changes/archive/funkce
```

**S OpenSpec CLI:**
```bash
# Claude spustí automatickou archivaci:
openspec archive funkce
```

### Fáze 5: Aktualizace zdrojových specs

Claude:
1. Přečte delta z archivu
2. Sloučí změny do `openspec/specs/`
3. Zajistí, že specs odrážejí aktuální stav systému

## 💡 Praktický příklad

**Ty:**
```
Přidej do e-shopu nákupní košík - přidání položek,
aktualizace množství, mazání a výpočet celkové ceny
```

**Claude Code:**

**BEZ OpenSpec CLI:**
```
1. ✅ Rozpozná komplexitu → aktivuje skill
2. ✅ Vytvoří openspec/changes/shopping-cart/
3. ✅ Napíše proposal.md
4. ❓ Požádá tě o schválení
5. ✅ Vytvoří specs/cart/spec.md se scénáři
6. ✅ Vytvoří tasks.md
7. ✅ Implementuje pomocí TDD
8. ✅ Přesune do archive/ ručně
9. ✅ Sloučí specs
```

**S OpenSpec CLI (bonusové funkce):**
```
1. ✅ Rozpozná komplexitu → aktivuje skill
2. ✅ Vytvoří strukturu
3. ✅ Napíše proposal
4. ❓ Požádá o schválení
5. ✅ Vytvoří specs
6. 🎁 Validuje: "openspec validate shopping-cart" ✓
7. ✅ Vytvoří tasks.md
8. ✅ Implementuje pomocí TDD
9. 🎁 Archivuje automaticky: "openspec archive shopping-cart"
10. ✅ Sloučí specs
```

**Rozdíl:** S CLI dostaneš automatickou validaci a archivaci. Bez CLI Claude dělá vše ručně, ale funguje stejně.

## 🛠️ OpenSpec CLI příkazy (pokud je máš nainstalované)

```bash
openspec list                    # Zobrazit aktivní změny
openspec view                    # Interaktivní dashboard
openspec show <change>           # Detail změny
openspec validate <change>       # Ověřit formátování
openspec archive <change>        # Archivovat (auto-merge)
```

Claude tyto příkazy použije **automaticky**, pokud má CLI k dispozici.

## 📖 Integrace s dalšími skills

Skill spolupracuje s:

- **Brainstorming** - Pro zkoumání přístupů (Fáze 1-2)
- **TDD** - Povinné pro implementaci (Fáze 3)
- **Code Review** - Po dokončení logických celků
- **Systematic Debugging** - Při řešení bugů

## ❓ Časté otázky

**Q: Musím instalovat OpenSpec CLI?**
A: **NE!** Skill funguje bez něj. CLI je jen bonus pro validaci a automatickou archivaci.

**Q: Musím spouštět `openspec init` v projektech?**
A: **NE!** Skill vytváří strukturu sám. Nepotřebuješ `openspec init`.

**Q: Jaký je rozdíl mezi režimy?**
A: Bez CLI: Vše funguje, Claude vytváří ručně. S CLI: Plus automatická validace a archivace.

**Q: Stojí CLI za to?**
A: Pokud chceš dashboard a automatickou archivaci → ano. Jinak → není potřeba.

**Q: Skill hlásí "OpenSpec CLI not found", je to problém?**
A: Ne! To jen znamená, že běží standalone režim. Vše funguje normálně.

## 🎓 Tipy pro použití

1. **Funguje okamžitě** - Nemusíš nic instalovat navíc
2. **Nech Claude vytvořit proposal** - Dej mu svobodu navrhnout řešení
3. **Schvaluj přístup** - Review proposal před implementací
4. **Důvěřuj procesu** - Claude použije TDD automaticky
5. **CLI je bonus** - Není povinný, ale přidává validaci a automatizaci

## 🚦 Rychlý start (3 kroky)

```bash
# 1. Skill je už nainstalován ✅

# 2. (Volitelně) Nainstaluj CLI pro bonusové funkce
npm install -g @fission-ai/openspec@latest

# 3. V Claude Code řekni:
"Přidej autentizaci uživatelů"

# Claude: "I'm using the OpenSpec workflow..."
# [vytvoří specs, proposal, implementuje s TDD]
```

## 🔍 Troubleshooting

**"Skill nefunguje"**
- Skill funguje vždy! Zkontroluj, že je v `~/.claude/skills/openspec-workflow/`
- Restartuj Claude Code

**"Vidím 'OpenSpec CLI not found'"**
- To je v pořádku! Znamená to standalone režim
- Chceš bonusové funkce? Nainstaluj CLI

**"Claude nevytváří proposal"**
- Možná task není dost komplexní
- Řekni explicitně: "Použij OpenSpec k naplánování..."

**"Chci CLI validaci"**
- Nainstaluj: `npm install -g @fission-ai/openspec@latest`
- Restartuj Claude Code
- Claude automaticky detekuje CLI a použije ho

## 📊 Porovnání režimů

| Funkce | BEZ CLI | S CLI |
|--------|---------|-------|
| Vytvoření proposal | ✅ | ✅ |
| Vytvoření specs | ✅ | ✅ |
| Vytvoření tasks.md | ✅ | ✅ |
| TDD implementace | ✅ | ✅ |
| Validace formátu | ❌ | 🎁 |
| Dashboard | ❌ | 🎁 |
| Auto-archivace | ❌ | 🎁 |
| AGENTS.md integrace | ❌ | 🎁 |

**Závěr:** Základní workflow funguje vždy. CLI přidává komfort.

---

## ✨ Shrnutí

1. **Skill funguje OKAMŽITĚ** bez jakékoli instalace
2. **OpenSpec CLI je VOLITELNÝ** bonus
3. **Nepotřebuješ `openspec init`** v projektech
4. **Claude vytváří vše sám** - soubory, adresáře, specs
5. **S CLI dostaneš** validaci a automatickou archivaci navíc

**Zkus to hned:**
```
Přidej funkci komentářů s možností odpovědí a mazání
```

Claude automaticky vytvoří specifikace před implementací! 🎯
