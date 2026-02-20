# AI Team Briefing — Design

> Brainstorming 2026-02-20

## Koncept

Po brainstormingu se spusti "team standup". Orchestrator precte brainstorming output, rozhodne ktere persony jsou relevantni, a kazda zapise svuj postreh. Vysledek je soubor `docs/plans/YYYY-MM-DD-<topic>-team-briefing.md` ktery uzivatel cte pred psanim implementacniho planu.

## Rozhodnuti

| Otazka | Rozhodnuti | Alternativy |
|--------|-----------|-------------|
| Kdy se spusti? | Planning phase (po brainstormingu) | Wrapup, post-commit, manualne |
| Co persony delaji? | Pisou navrhy do souboru | Prerusuji, pracuji autonomne |
| Kdo rozhodne relevanci? | Orchestrator (haiku) | Keyword matching, vsechny vzdy |
| Jaky model? | Vse v Claude Code — haiku orchestrator + haiku persony | Externi API, jiny provider |
| Kde to zije? | `~/Projects/skills/plugins/team/` | V product pluginu |

## Persony

| Persona | Zdroj skillu | Pta se na... |
|---------|-------------|--------------|
| Marketing | marketing-orchestrator, analytics-setup | Jak to announcnout? Jaky tracking pridat? |
| Growth | growth-hacking, product-led-growth | Jak to meri? Jak to ziska uzivatele? |
| Copywriting | copywriting-orchestrator, brand-voice | Jak to komunikovat? Jaky tone? |
| SEO | seo-optimization, technical-seo | Jak to indexovat? Structured data? |
| UX | ux-orchestrator, ux-optimization | Je flow intuitivni? Co otestovat? |
| Security | security-review | Jaky rizika? OWASP checklist? |
| Product | product-orchestrator, product-strategy, product-metrics | Ma to PMF? Jak prioritizovat? Jaky metriky? |

## Architektura

```
brainstorming skill dokoncen
        │
        ▼
  ┌─────────────┐
  │ Orchestrator │  (haiku)
  │  precte:     │
  │  - brainstorm│
  │    output    │
  │  - projekt   │
  │    kontext   │
  └──────┬──────┘
         │
         │ rozhodne: "relevantni jsou:
         │  marketing, seo, product"
         │
    ┌────┴────┬──────────┐
    ▼         ▼          ▼
┌────────┐┌───────┐┌─────────┐
│Marketing││  SEO  ││ Product │  (haiku, paralelne)
│ agent  ││ agent ││  agent  │
└───┬────┘└──┬────┘└────┬────┘
    │        │          │
    ▼        ▼          ▼
  ┌──────────────────────────┐
  │  team-briefing.md        │
  │  - Marketing: ...        │
  │  - SEO: ...              │
  │  - Product: ...          │
  └──────────────────────────┘
```

### System prompt kazde persony

1. Relevantni SKILL.md soubory
2. Brainstorming output (co se planuje)
3. Projekt kontext (CLAUDE.md, ACTIVE_CONTEXT.md)
4. Instrukce: "Dej 2-5 konkretních, actionable navrhu. Zadne generic rady."

### Token odhad

| Komponenta | Input | Output | Pocet |
|-----------|-------|--------|-------|
| Orchestrator | ~3K | ~100 | 1x |
| Persona agent | ~12-15K | ~300-500 | 3-4x |
| **Celkem** | **~55K** | **~2K** | — |

## Output format

```markdown
# Team Briefing: [topic]
> Generovano po brainstormingu [datum]

## Marketing
**Relevance:** 8/10
- [ ] Pripravit announcement email pro existujici uzivatele
- [ ] Pridat event tracking na novou feature (GA4 custom event)

## SEO
**Relevance:** 3/10
- Zadne specificke akce pro tuto feature.

## Top 3 doporuceni
1. ...
2. ...
3. ...
```

**Pravidla:**
- Relevance skore 1-10. Pod 3 = "zadne akce"
- Max 5 navrhu na personu, konkretni a actionable
- Navrhy jako checkboxy — prenositelne do implementacniho planu
- Orchestrator prida "Top 3 doporuceni" na zaver

## Struktura souboru

```
~/Projects/skills/plugins/team/
  skills/
    team-briefing/
      SKILL.md              — hlavni skill instrukce
      personas/
        marketing.md        — system prompt
        growth.md
        copywriting.md
        seo.md
        ux.md
        security.md
        product.md
```

## MVP scope

- Skill `/team-briefing` v `~/Projects/skills/plugins/team/`
- 7 person s definovanymi system prompty
- Orchestrator na haiku, persony na haiku
- Output do `docs/plans/YYYY-MM-DD-<topic>-team-briefing.md`
- Manualni spusteni + prompt na konci brainstormingu

## YAGNI (nedelat)

- Automaticky hook po kazdem commitu
- Persony si pamatuji mezi sessions
- Chat mezi personami
- UI/dashboard
- Vlastni API server

## Phase 2 (budoucnost)

- [ ] Wrapup briefing (po `finish` skillu)
- [ ] Persony porovnavaji "co jsme navrhli vs co se udelalo"
- [ ] Automaticka integrace do `brainstorming` skillu
- [ ] Wrapup persony s jinym uhlem pohledu (retrospektiva)
