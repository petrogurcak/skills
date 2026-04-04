---
name: create-persona
description: Scaffolds a new autonomous AI persona with directory structure, manifest, sources config, knowledge registry section, and OpenClaw cron job. Use when creating a new agent persona like "product-advisor", "seo-monitor", etc.
---

# Create Persona

Scaffolds a complete autonomous AI persona following the multi-agent architecture standard.

**Announce:** "Pouzivam create-persona skill — vytvorim novou personu."

**Reference:** `~/Projects/skills/docs/plans/2026-02-26-multi-agent-architecture.md`

## When to Use

- "Vytvor personu X" / "nova persona" / "create persona"
- "Chci noveho agenta na Y"
- Kdykoli zakladame noveho autonomniho agenta

## When NOT to Use

- Tvorba skills (to je `/superpowers:writing-skills`)
- Uprava existujici persony (edituj primo)
- One-off uloha ktera nepotrebuje autonomniho agenta

---

## Phase 1: Discovery (1-2 otazky)

Zjisti zakladni info. Ptej se strucne, jedna otazka per message.

1. **Domena a role:** "Jaky obor a co persona dela? (napr. 'product advisor — mesicni product review')"
2. **Projekty:** "Pro ktere projekty? (napr. editor-menu, shiftstreak)"

Z odpovedi odvoď:
- `name` (kebab-case, napr. `product-advisor`)
- `display_name`
- `role` (1-2 vety)
- `schedule` type (weekly/monthly/on-demand)
- Relevantni existujici skills (prohledej `~/Projects/skills/plugins/`)

Potvrd s uzivatelem: "Persona `{name}` — {role}. Skills: {list}. Schedule: {type}. OK?"

---

## Phase 2: Scaffold

### Step 1: Directory Structure

```
~/Projects/agents/{name}/
├── persona.yaml
├── templates/
│   └── {task-type}.md          # Placeholder — user fills later
├── projects/
│   └── {project}.yaml          # Per-project config
├── reports/
│   └── {project}/
└── logs/
```

Create all directories. Create `persona.yaml` with this format:

```yaml
# {Display Name} — Persona Manifest
# Standard format: docs/plans/2026-02-26-multi-agent-architecture.md

name: {name}
display_name: "{Display Name}"
version: "1.0.0"

# Identita
role: >
  {role description}

# Jake skills pouziva (embeduje frameworky do template)
skills:
  - path: "plugins/{plugin}/skills/{skill}/SKILL.md"
    what_uses: "{co z tohoto skillu persona pouziva}"

# Schedule (dokumentacni — source of truth je OpenClaw cron)
# Viz: `openclaw cron list` pro aktualni stav
schedule:
  type: {weekly | monthly | bi-weekly | on-demand}
  runner: {openclaw | claude-p}

# Projekty kde je persona aktivni
projects:
  - {project-name}

# Learning advisor napojeni
learning:
  sources_config: "/Users/petrogurcak/Projects/agents/learning-advisor/sources/{name}.yaml"
```

### Step 2: Per-Project Config

Create `projects/{project}.yaml`:

```yaml
project: {project-id}
name: "{Project Display Name}"
url: "{url if applicable}"
repo: "{repo path}"
memory: "{repo}/.claude/agents/{persona-name}.md"
```

### Step 3: Learning Advisor Sources

Create `~/Projects/agents/learning-advisor/sources/{name}.yaml`:

```yaml
agent: {name}
agent_path: "/Users/petrogurcak/Projects/agents/{name}"

skills:
  - plugin: {plugin}
    skill: {skill}
    path: "/Users/petrogurcak/Projects/skills/plugins/{plugin}/skills/{skill}/SKILL.md"

memory_files:
  - path: "{repo}/.claude/agents/{persona-name}.md"
    project: {project-id}
    what_to_look_for: "## Learning proposals"

template: "/Users/petrogurcak/Projects/agents/{name}/templates/{task-type}.md"
knowledge_registry: "/Users/petrogurcak/Projects/agents/learning-advisor/knowledge-registry.yaml"

notebooks: []
  # Pridat po NotebookLM auth:
  # - name: "{Name} Knowledge"
  #   notebook_id: "TBD"
  #   topics: [...]

sources: []
  # Pridat RSS feedy relevantni pro tuto personu:
  # - name: "{Source}"
  #   rss: "{rss_url}"
  #   homepage: "{homepage_url}"
  #   what_to_look_for: >
  #     {topics}
  #   relevance: >
  #     {why relevant}
```

### Step 4: Knowledge Registry

Append new persona section to `~/Projects/agents/learning-advisor/knowledge-registry.yaml`:

```yaml
{name}:
  rss_sources: []
  notebooks: []
  processed_articles: []
  processed_books: []
```

### Step 5: Agent Memory (per-project)

Create initial memory file in each project:

`{repo}/.claude/agents/{persona-name}.md`:

```markdown
# {Display Name} — {Project Name}

## Trendy

{Initialized — no data yet}

## Otevrene issues

{None yet}

## Learning proposals

{None yet}
```

### Step 6: Template Placeholder

Create `templates/{task-type}.md` with minimal structure:

```markdown
# {Task Type} — Instructions

You are {display_name}. {role}

## requires_human Rules

Each recommendation gets a `requires_human` flag:
- `false` (auto): touches only agent files (memory, queries), Confidence >= 8, type is ops-fix/investigation
- `true` (human): GTM/code/production changes, business decisions, anything user-facing
- When in doubt: `true`

## Data Collection

{TODO: Define what data this persona collects and how}

## Analysis

{TODO: Define frameworks and analysis approach}

## Report Format

{TODO: Define output format}

## Auto-executed

{List auto-executed actions here. Omit if none.}

## Rules

- Write in Czech (technical terms in English OK)
- NEVER hallucinate data
- Update agent memory after each run
```

---

## Phase 3: OpenClaw Wiring

### Step 7: Cron Job

Ask: "Chces rovnou vytvorit OpenClaw cron job? (Muzes i pozdeji rucne.)"

If yes:

```bash
openclaw cron create \
  --name "{name}-{task}" \
  --description "{description}" \
  --cron "{expr}" \
  --tz "Europe/Prague" \
  --session isolated \
  --announce \
  --channel discord \
  --to "channel:1475849334737338563" \
  --message "{instruction to run the persona's task}"
```

**Model note:** Use `claude-proxy/claude-sonnet-4` for cost efficiency. NOT `openai/claude-sonnet-4` (fails with FailoverError).

### Step 8: Update Learning Advisor Cron

Update the existing `learning-advisor-scan` cron job message to include the new persona:

```bash
openclaw cron edit --message "Run monthly learning-advisor scan for personas: analytics-monitor, {new-persona}. ..." {scan-job-id}
```

---

## Phase 4: Summary

Output checklist:

```
Persona `{name}` vytvorena:

Soubory:
- [x] ~/Projects/agents/{name}/persona.yaml
- [x] ~/Projects/agents/{name}/templates/{task}.md (placeholder)
- [x] ~/Projects/agents/{name}/projects/{project}.yaml
- [x] ~/Projects/agents/learning-advisor/sources/{name}.yaml
- [x] knowledge-registry.yaml — {name} section added
- [x] {repo}/.claude/agents/{persona-name}.md — initial memory

OpenClaw:
- [{x or " "}] Cron job: {name}-{task}

Dalsi kroky:
1. Dopsat template (templates/{task}.md) — definovat data collection, analyzu, format
2. Pridat RSS feedy do sources/{name}.yaml
3. (Optional) Vytvorit NotebookLM notebook a vyplnit notebook_id
4. Otestovat prvni beh rucne: `openclaw cron run {job-id}`
```

---

## Integration

| Skill | Role |
|-------|------|
| `development:planning` | Navrhne template a workflow pro personu |
| `superpowers:writing-skills` | Pokud persona potrebuje novy skill |
| `team:team-briefing` | Automaticky najde persony pres persona.yaml |
