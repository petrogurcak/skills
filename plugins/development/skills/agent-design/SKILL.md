---
name: agent-design
description: Knowledge base for designing AI agents — persona crafting, system prompt patterns, multi-agent orchestration, memory design, evaluation. Use when creating or improving an autonomous AI agent persona, writing agent templates, or debugging agent behavior. NOT a workflow — this is reference material to inform decisions.
metadata:
  author: Petr
  version: 1.0.0
---

# Agent Design — Knowledge Base

Reference material for designing production AI agents. Use alongside `development:create-persona` (scaffolding) and agent template writing.

**Announce:** "Nacitam agent-design knowledge base pro informovane rozhodnuti."

## When to Use

- Designing a new agent persona or template
- Debugging unexpected agent behavior (persona drift, trait leakage)
- Choosing multi-agent architecture (orchestrator-workers vs peer-to-peer)
- Designing agent memory strategy
- Reviewing/improving existing agent templates

## When NOT to Use

- Scaffolding new persona directory structure → `development:create-persona`
- Writing code/features → `development:development-workflow`
- Generic prompt engineering for one-off tasks (this is for *persistent agents*)

---

## 1. Persona Crafting

### Persona Selection Model

System prompt = **casting**, ne programování. Model nehraje instrukce — hraje **postavu**, kterou si odvodil z kontextu.

**Klíčové principy:**

- **Trait inference:** Model si z chování odvodí celou osobnost. Jeden implicitní trait kaskáduje do nečekaných projevů. Příklad: trénink na "podvádění" → model inferoval zákeřnost → sabotáž, world domination tendence.
- **Explicit > implicit:** Vždy definovat charakter explicitně. Pokud chceš aby agent dělal X (i kontroverzní), vyžádej to přímo v promptu — nech model inferovat z kontextu.
- **Archetypální framing > behaviorální instrukce:** "Jsi zkušený senior reviewer" produkuje koherentnější chování než seznam pravidel "kontroluj X, Y, Z."
- **Post-training dolaďuje, nezakládá:** Persona existuje latentně z pretrainingu. System prompt ji elicituje — nevytváří od nuly.

**Anti-patterns:**
- Negativní traits bez explicitního kontextu ("buď kritický" → model inferuje "buď nepříjemný")
- Vágní persona definice ("jsi helpful assistant" = žádná persona)
- Konfliktní traits ve stejném promptu (model si vybere jeden a ostatní potlačí)

*Zdroj: https://www.anthropic.com/research/persona-selection-model*

### Assistant Axis

275 archetypů v geometrickém persona prostoru. Hlavní osa = jak moc je persona "assistant-like."

- **Blízko assistant osy** (evaluator, consultant, editor): steerable, spolehlivé, předvídatelné
- **Daleko od osy** (bohemian, ghost, hermit): kreativnější ale méně řiditelné, safety degradace
- **Praktický závěr:** Pro production agenty volit archetypy blízko assistant osy. Kreativní persony jen pro specifické use-cases s guardrails.

*Zdroj: https://www.anthropic.com/research/assistant-axis*

### Persona Vectors

Mechanistická interpretabilita — konkrétní aktivační směry v modelu odpovídají traits (sycophancy, hallucination tendency, agreeableness).

- Persona může **driftovat mid-session** pod vlivem konverzačního kontextu
- Emotionally loaded konverzace nebo adversarial users mohou posunout efektivní personu
- **Implikace pro design:** Robustní agent potřebuje persona anchoring (opakované připomenutí identity v dlouhých konverzacích)

*Zdroj: https://www.anthropic.com/research/persona-vectors*

### Claude's Constitution

Reálný operační spec pro agentic behavior (CC0 licence).

- Sekce o multi-principal situacích: jak řešit konflikty operator vs. user
- Handling ambiguity, irreversible actions, tool use boundaries
- **Použití:** Referenční dokument pro psaní `requires_human` rules a safety sekcí v agent templates

*Zdroj: https://www.anthropic.com/constitution*

---

## 2. System Prompt Engineering

### 6 Composable Patterns (Anthropic)

Production-tested vzory pro agent architektury:

1. **Prompt chaining** — výstup jednoho kroku = vstup dalšího (s gate checkpointy)
2. **Routing** — klasifikace inputu → specializovaný handler
3. **Parallelization** — nezávislé subtasky běží současně, pak agregace
4. **Orchestrator-workers** — centrální agent deleguje dynamicky
5. **Evaluator-optimizer** — generátor + hodnotitel v loop
6. **Autonomous agent** — plný loop s tool use a self-direction

**Anti-patterns:**
- Framework abstraction trap — příliš mnoho vrstev mezi tebou a modelem
- Over-engineering — začni s jednoduchým prompt chainem, ne orchestratorem
- Špatná tool dokumentace — investuj do ACI (Agent-Computer Interface) stejně jako do HCI

*Zdroj: https://www.anthropic.com/research/building-effective-agents*

### Constitutional Spec Sizing

Velké constitutional dokumenty způsobují truncation a **snižují** compliance.

- **3-5 task-relevant principů per request** > celý dokument
- Praktický závěr: Agent template by měl mít core sekci (vždy) + conditional sekce (jen když relevantní)
- Naše agent templates toto už částečně dělají (conditional recommendations, IF page type = X)

*Zdroj: https://arxiv.org/pdf/2602.02584*

### ReAct Loop

Thought → Action → Observation — základ většiny production agentů.

- Agenti co **reasoning before acting** překonávají pure action agenty
- Hallucination detection: "consecutive identical actions producing identical observations" = stuck loop
- Naše agenty implicitně používají ReAct (data collection → analysis → report)

*Zdroj: https://arxiv.org/abs/2210.03629*

---

## 3. Multi-Agent Orchestration

### Routines vs Handoffs (OpenAI)

Dva fundamentální primitiva:

- **Routine** = instrukce + tools, agent vykonává bounded úlohu a vrací kontrolu
- **Handoff** = plný context transfer, nový agent přebírá konverzaci

**Kdy co:**
- Routine: specialist subtask (analýza, report generování)
- Handoff: routing celé konverzace jinému agentovi

*Zdroj: https://cookbook.openai.com/examples/orchestrating_agents*

### Topologie

| Topologie | Kdy použít | Naše použití |
|-----------|-----------|--------------|
| **Centralized** (orchestrator → workers) | Jasná hierarchie, definované subtasky | orchestrator → persony |
| **Peer-to-peer** | Agenti potřebují komunikovat přímo | agent-team-development teammates |
| **Sequential pipeline** | Output A = input B | learning-advisor → proposal → apply |

### CrewAI Insight

"**80% effort into task design, 20% into agent design.**"

Tři povinné fieldy pro funkčního agenta: **role**, **goal**, **backstory**. Backstory není fluff — ovlivňuje jak agent interpretuje edge cases.

*Zdroj: https://docs.crewai.com/en/concepts/agents*

---

## 4. Agent Memory Design

### Memory Taxonomy (Lilian Weng)

| Typ | LLM implementace | Naše použití |
|-----|-------------------|-------------|
| **Sensory** | Raw input (current request) | Template input variables |
| **Short-term** | Context window | Konverzace v rámci jednoho běhu |
| **Long-term** | External storage + retrieval | `memory/` soubory, agent memory v projektech |

### Episodic vs Semantic Memory

- **Semantic:** Fakta, pravidla, znalosti ("bounce rate nad 60% je problém")
- **Episodic:** Instance-specific context ("minulý týden jsme viděli spike v churn rate")

Většina agent systémů (včetně našich) má jen sémantickou paměť. Episodická chybí — agent neví *co se stalo minule v tomto konkrétním projektu*.

**Praktický závěr:** Agent memory files by měly mít sekci pro trendy/historii (episodická) vedle faktů/pravidel (sémantická).

*Zdroj: https://arxiv.org/abs/2502.06975*

### A-MEM: Zettelkasten pro agenty

Paměť jako **knowledge graph**, ne flat store. Každá memory unit je:
- Tagovaná
- Cross-linkovaná k sémanticky souvisejícím memories
- Dynamicky reorganizovaná při nových informacích

**Implikace:** Naše `memory/` soubory by mohly benefitovat z cross-referencí mezi agenty (analytics memory odkazuje na copywriting findings).

*Zdroj: https://arxiv.org/abs/2502.12110*

---

## 5. Evaluation & Debugging

### Production Failure Patterns (ZenML, 1200 deploymentů)

- **Context rot** začíná při 50k-150k tokenech (bez ohledu na theoretical limit)
- **Unconstrained tool access** → analysis paralysis
- **Undetected loops** → $47k cost overrun za 11 dní
- **Infrastructure guardrails > prompt guardrails** (vždy)
- **80% quality = snadné, 95% = disproporčně náročné**

*Zdroj: https://www.zenml.io/blog/what-1200-production-deployments-reveal-about-llmops-in-2025*

### Agent Sweet Spot (Devin retrospektiva)

- Ideální scope: **4-8 hodin junior engineer práce**
- Jasné requirements + verifiable outcomes = vysoký completion rate
- Ambiguita zabíjí completion rate
- **Environment completeness** = #1 faktor degradace výkonu
- Debugging approach: ptát se agenta aby **flagoval suspicious outputs** (ne aby fixoval bugy end-to-end)

*Zdroj: https://cognition.ai/blog/devin-annual-performance-review-2025*

### Reflexion — Self-Debugging

Agent generuje verbální feedback na vlastní failed trajektorie a ukládá ho jako episodickou paměť pro další pokus.

- Stuck loop detection: "consecutive identical actions producing identical observations"
- Praktické pro naše agenty: pokud agent opakovaně generuje stejný typ doporučení → pravděpodobně stuck

*Zdroj: https://arxiv.org/abs/2303.11366*

### Security — Lethal Trifecta

Tři vlastnosti, jejichž kombinace = katastrofální zranitelnost:

1. **Private data access** (čte citlivá data)
2. **Untrusted content exposure** (zpracovává external input)
3. **Exfiltration capability** (může poslat data ven)

Každý náš agent co crawluje web (copywriting-reviewer, seo-monitor) má 1+2. Proto máme Hostile Content Defense sekce v templates.

*Zdroj: https://simonw.substack.com/p/the-lethal-trifecta-for-ai-agents*

---

## Checklist: Nový Agent Template

Při psaní nového agent template zkontroluj:

- [ ] **Persona:** Explicitní archetypální framing (ne jen seznam pravidel)
- [ ] **Scope:** Jasně definovaný task scope (4-8h junior engineer ekvivalent per run)
- [ ] **Safety:** Hostile Content Defense sekce (pokud agent čte external input)
- [ ] **Memory:** Sekce pro sémantickou (fakta) i episodickou (trendy, historie) paměť
- [ ] **requires_human:** Rules pro auto vs human-required changes
- [ ] **Conditional sections:** Template nemá být monolitický — conditional sekce per task type
- [ ] **Stuck loop prevention:** Jak agent pozná že je stuck?
- [ ] **Cross-agent notes:** Sekce pro předávání informací ostatním agentům

---

## Zdroje (plný seznam)

### Persona & Character
1. Persona Selection Model — https://www.anthropic.com/research/persona-selection-model
2. Assistant Axis — https://www.anthropic.com/research/assistant-axis
3. Persona Vectors — https://www.anthropic.com/research/persona-vectors
4. Claude's Constitution — https://www.anthropic.com/constitution

### System Prompts
5. Building Effective Agents — https://www.anthropic.com/research/building-effective-agents
6. OpenAI Practical Guide — https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
7. ReAct Paper — https://arxiv.org/abs/2210.03629
8. Constitutional Spec-Driven Dev — https://arxiv.org/pdf/2602.02584
9. Craft to Constitution — https://arxiv.org/html/2510.13857v1

### Multi-Agent
10. OpenAI Routines & Handoffs — https://cookbook.openai.com/examples/orchestrating_agents
11. OpenAI Agents SDK — https://openai.github.io/openai-agents-python/multi_agent/
12. Multi-Agent Collaboration Survey — https://arxiv.org/html/2501.06322v1
13. AutoGen — https://arxiv.org/abs/2308.08155
14. CrewAI Docs — https://docs.crewai.com/en/concepts/agents

### Memory
15. Lilian Weng: LLM Agents — https://lilianweng.github.io/posts/2023-06-23-agent/
16. MemGPT — https://arxiv.org/abs/2310.08560
17. Episodic Memory Position Paper — https://arxiv.org/abs/2502.06975
18. A-MEM — https://arxiv.org/abs/2502.12110

### Evaluation & Debugging
19. Reflexion — https://arxiv.org/abs/2303.11366
20. Bloom Auto Evals — https://alignment.anthropic.com/2025/bloom-auto-evals/
21. ZenML 1200 Deployments — https://www.zenml.io/blog/what-1200-production-deployments-reveal-about-llmops-in-2025
22. Devin Performance Review — https://cognition.ai/blog/devin-annual-performance-review-2025
23. Lethal Trifecta — https://simonw.substack.com/p/the-lethal-trifecta-for-ai-agents
