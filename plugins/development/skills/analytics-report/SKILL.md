---
name: analytics-report
description: Generates analytics reports for projects using GA4, Search Console, and backend data. Use when user says "analytics report", "jak je na tom [project]", "weekly report", "tydni report", or "analyzuj [project]". NOT for setting up tracking (use analytics-setup), NOT for SEO audit (use seo-optimization).
---

# Analytics Report

Generates structured analytics reports with data from GA4, Search Console, and backend databases. Uses ICE scoring for recommendations.

## Quick Router

| User says...                                   | Action                                    |
| ---------------------------------------------- | ----------------------------------------- |
| `/analytics:report`                            | Weekly report for all configured projects |
| `/analytics:report editor-menu`                | Weekly report for specific project        |
| `/analytics:report editor-menu --ad-hoc "..."` | Ad-hoc analysis with specific question    |
| "jak je na tom editor-menu?"                   | Same as weekly report for editor-menu     |
| "proc klesly konverze?"                        | Ad-hoc analysis on current project        |

## Setup

Reports are managed from `~/Projects/agents/analytics-monitor/`.

Required structure:

```
~/Projects/agents/analytics-monitor/
├── config.yaml              # Global settings
├── projects/
│   ├── {project}.yaml       # Per-project config (sources, metrics)
│   └── {project}.mcp.json   # Per-project MCP servers (GA4 property)
├── reports/{project}/        # Generated reports
├── templates/
│   └── weekly-report.md      # Report template with analysis frameworks
└── logs/
```

## Workflow

### Step 1: Load Config

```
Read ~/Projects/agents/analytics-monitor/config.yaml
Read ~/Projects/agents/analytics-monitor/projects/{project}.yaml
```

If project not specified, list available projects from config.yaml and ask which one.

### Step 2: Load Template

```
Read ~/Projects/agents/analytics-monitor/templates/weekly-report.md
```

Follow the template instructions exactly. It contains analysis frameworks (ICE scoring, SEO diagnostics, AARRR funnel).

### Step 3: Collect Data

Use MCP tools and Bash to collect data per the project config:

**GA4 (via MCP):**

- `runReport`: sessions, users, key events (this week + last week for WoW)
- Batch into minimal API calls (multiple metrics per call)

**Search Console (via MCP, if configured):**

- Top queries, clicks, impressions, avg position

**Backend (via Bash psql):**

- Run SQL queries from project config
- If DB unreachable, skip and note in report

### Step 4: Analyze & Write Report

Follow the template format strictly:

- YAML frontmatter with all metrics
- Headline (1 sentence, Czech)
- Co slo dobre (max 3 items)
- Co sledovat (max 3 items)
- Doporuceni with ICE scores (max 3)
- Surova data in collapsible sections

### Step 5: Save Report

```
Write to ~/Projects/agents/analytics-monitor/reports/{project}/YYYY-MM-DD-{type}.md
```

Type is `weekly` for scheduled/standard, `ad-hoc` for specific questions.

### Step 6: Summary

Print to user:

- Rating X/10
- Headline
- Top recommendation
- Path to full report

## Ad-hoc Mode

When user asks a specific question (e.g. "proc klesly konverze?"):

1. Load config and template (same as above)
2. Collect ONLY relevant data (don't pull everything)
3. Answer the question directly using the analysis frameworks
4. Save as `YYYY-MM-DD-ad-hoc.md` with the question in frontmatter
5. If the answer suggests deeper investigation, recommend specific next steps

## Headless Mode (Cron)

For scheduled reports, this skill is invoked via:

```bash
claude -p "Read ~/Projects/agents/analytics-monitor/templates/weekly-report.md for instructions. \
  Read ~/Projects/agents/analytics-monitor/projects/editor-menu.yaml for config. \
  Generate weekly analytics report and save to reports/editor-menu/$(date +%Y-%m-%d)-weekly.md" \
  --mcp-config ~/Projects/agents/analytics-monitor/projects/editor-menu.mcp.json \
  --strict-mcp-config \
  --allowedTools "mcp__google-analytics__*,Bash,Read,Write,Glob,Grep" \
  --dangerously-skip-permissions \
  --max-turns 25 \
  --model sonnet \
  2>> ~/Projects/agents/analytics-monitor/logs/cron.log
```

## Plan from Report (Interactive)

After a report is generated, user can ask to create implementation plans from the report's proposals.

| User says...                   | Action                                                          |
| ------------------------------ | --------------------------------------------------------------- |
| "udelej plany z reportu"       | Read latest report, list plan proposals, ask which to implement |
| "plan z reportu #1"            | Create plan for specific proposal from latest report            |
| "plan from report editor-menu" | Read latest editor-menu report, list proposals                  |

### Workflow

1. **Find latest report:**

   ```
   ls ~/Projects/agents/analytics-monitor/reports/{project}/ | sort -r | head -1
   ```

2. **Read the "Navrhy implementacnich planu" section** from the report

3. **Present proposals to user:**

   ```
   Report z {date} navrhl {N} planu:

   1. [{type}] {plan_name} — {goal} (effort: {effort})
   2. [{type}] {plan_name} — {goal} (effort: {effort})
   3. [{type}] {plan_name} — {goal} (effort: {effort})

   Ktere chces rozpracovat? (cisla, nebo "vsechny")
   ```

4. **For each selected plan, based on type:**
   - **ops-fix:** Create plan directly (no brainstorming needed):
     - Save to `docs/plans/YYYY-MM-DD-{plan-name}.md` in the TARGET project repo
     - Use the report's "Navrzene kroky" as task list
     - Ready for immediate execution with /development:planning Phase 4

   - **investigation:** Create investigation plan:
     - What to find out (hypothesis)
     - Where to look (files, tools, data)
     - Expected outcome (knowledge, decision)
     - Save as plan, but skip TDD phases

   - **feature:** Hand off to /development:planning:
     - Pass the report's context and proposed steps as input
     - /development:planning does full brainstorm → plan → review cycle

   - **experiment:** Create experiment plan:
     - Hypothesis from report data
     - What to change (scope)
     - Success metric + measurement method
     - Duration (usually "merit v pristim reportu")

5. **After plan creation, offer execution:**
   ```
   Plan ulozeny. Chces spustit implementaci?
   → 1) Subagent-driven (tato session)
   → 2) Nova session
   → 3) Team agents (parallelne)
   ```

### Example Flow

```
User: /analytics:report editor-menu
Agent: [generates weekly report with plan proposals]

User: udelej plany z reportu
Agent: Report z 2026-02-23 navrhl 3 plany:

1. [ops-fix] Overit import tracking — activation_rate meritelny (vecer-staci)
2. [investigation] Dashboard 100% bounce — zjistit co se deje po registraci (vecer-staci)
3. [ops-fix] Fix broken template URL — eliminovat 2 sessions/tyden (quick-fix)

Ktere chces rozpracovat?

User: 1 a 3
Agent: [creates 2 plan files, offers execution]
```

## Rules

- NEVER hallucinate data. Use only real numbers from tools.
- If a data source is unavailable, note "data nedostupna" — don't skip silently.
- Write reports in Czech.
- Keep reports concise — follow the template limits.
- ICE score every recommendation.
- Plan proposals must reference specific data from the report — no generic advice.
- Plans go into the TARGET project's `docs/plans/`, not into analytics-monitor/.
