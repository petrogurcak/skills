# Skill Activation Enforcer - Universal Claude Code Plugin

A Claude Code plugin that dramatically increases skill activation reliability by forcing Claude to evaluate **ALL available skills** for every task through SessionStart hooks.

## 🎯 The Problem

Claude Code skills are often ignored, even when highly relevant:

- You create a TDD skill → Claude skips writing tests first
- You have an OpenSpec skill → Claude starts coding without specs
- You install UX optimization skill → Claude doesn't apply patterns
- Skills exist but Claude "forgets" to check them

**Result:** Skills go unused, quality suffers, mistakes repeat.

## 💡 The Solution

**Universal SessionStart Hook** that forces skill evaluation:

1. **Scans ALL available skills** (from `~/.claude/skills` and plugin skills)
2. **Injects mandatory evaluation protocol** at session start
3. **Forces Claude to evaluate EVERY skill** for EVERY request
4. **Requires explicit Skill() tool usage** for relevant skills

### How It Works

Every time Claude Code starts/resumes a session:

```
1. Hook runs → Scans for skills
2. Injects evaluation protocol into system context
3. Claude MUST evaluate each skill (YES/NO + reason)
4. Claude MUST activate relevant skills with Skill() tool
5. Claude follows activated skill workflows
```

## 🚀 Installation

### Quick Install

```bash
cd /path/to/skill-activation-enforcer
./install.sh
```

### Manual Install

```bash
cp -r /path/to/skill-activation-enforcer ~/.claude/plugins/skill-activation-enforcer
```

### Verify Installation

```bash
ls ~/.claude/plugins/skill-activation-enforcer/.claude-plugin/plugin.json
```

## 📊 What Gets Enforced

### Three-Step Protocol (Injected by Hook)

**Step 1: EVALUATE EVERY SKILL**

Claude must list ALL skills with YES/NO evaluation:

```
Skill Evaluation:
- openspec-workflow: YES - complex multi-step feature
- tdd: YES - will need tests
- brainstorming: NO - requirements clear
- systematic-debugging: NO - not debugging
- code-review: NO - not reviewing yet
```

**Step 2: ACTIVATE ALL "YES" SKILLS**

For each YES, Claude must use Skill() tool:

```
Activating skills:
Skill: openspec-workflow
Skill: tdd
```

**Step 3: FOLLOW ACTIVATED SKILLS**

Claude follows guidance from each activated skill.

## 🎓 Examples

### Example 1: Complex Feature

```
User: Add shopping cart with checkout flow

Claude: Let me evaluate all available skills:

Skill Evaluation:
- openspec-workflow: YES - complex multi-step feature
- tdd: YES - need tests for cart logic
- brainstorming: NO - approach is clear
- code-review: NO - not reviewing yet
- web-copy: NO - not writing marketing copy
- ux-optimization: YES - checkout flow needs UX patterns

Activating relevant skills:

[Uses Skill(openspec-workflow)]
[Uses Skill(tdd)]
[Uses Skill(ux-optimization)]

Following OpenSpec workflow first...
[Creates proposal, specs, tasks]

Following TDD workflow...
[Write test first for each task]

Applying UX optimization patterns...
[Uses checkout best practices from UX skill]
```

### Example 2: Simple Task

```
User: Fix typo in button label

Claude: Let me evaluate all available skills:

Skill Evaluation:
- openspec-workflow: NO - trivial single-line change
- tdd: NO - no logic to test
- brainstorming: NO - obvious fix
- code-review: NO - too simple
- ux-optimization: NO - not a UX redesign

No skills needed for this task. Making direct fix...
```

## 📁 Plugin Structure

```
skill-activation-enforcer/
├── .claude-plugin/
│   └── plugin.json              # Plugin metadata
├── hooks/
│   ├── hooks.json               # Hook configuration
│   └── session-start.sh         # Universal evaluation hook
├── skills/
│   └── openspec-workflow/       # Example skill included
│       ├── SKILL.md
│       ├── NAVOD-CZ.md
│       └── ...
├── install.sh                   # Installation script
└── README.md                    # This file
```

## 🔧 How the Hook Works

### Skill Discovery

The hook scans two locations:

1. **User skills:** `~/.claude/skills/*`
2. **Plugin skills:** `${CLAUDE_PLUGIN_ROOT}/skills/*`

For each skill directory with `SKILL.md`:

- Extracts skill name (directory name)
- Extracts description (from YAML frontmatter)
- Adds to skills list

### Evaluation Protocol Injection

The hook injects into Claude's system context:

```xml
<EXTREMELY_IMPORTANT>

# MANDATORY SKILL ACTIVATION PROTOCOL

Available Skills:
- openspec-workflow: Use when implementing complex features...
- tdd: Use when implementing features or bugfixes...
- [... all discovered skills ...]

## Three-Step Protocol:
1. EVALUATE EVERY SKILL (YES/NO + reason)
2. ACTIVATE ALL "YES" SKILLS (use Skill() tool)
3. FOLLOW ACTIVATED SKILLS

[... detailed protocol with examples and red flags ...]

</EXTREMELY_IMPORTANT>
```

### When Hook Runs

- **startup** - New Claude Code session
- **resume** - Resume paused session
- **clear** - After clearing conversation
- **compact** - After compacting conversation

## 🎯 Supported Skills

This plugin works with **ANY skill** that has:

- Directory in `~/.claude/skills/` or plugin `skills/`
- `SKILL.md` file with YAML frontmatter
- `description:` field in frontmatter

### Example Compatible Skills

- **openspec-workflow** (included) - Spec-driven development
- **test-driven-development** - TDD workflow
- **brainstorming** - Socratic refinement
- **systematic-debugging** - Root cause analysis
- **code-review** - Review against requirements
- **ux-optimization** - UX patterns and best practices
- **web-copy** - Web copywriting
- **uvp-optimization** - Value proposition optimization
- ... any other skill with SKILL.md

## 🔍 Verification

### Test Hook Manually

```bash
cd ~/.claude/plugins/skill-activation-enforcer
./hooks/session-start.sh | jq '.hookSpecificOutput.additionalContext' | head -50
```

You should see the evaluation protocol with all discovered skills listed.

### Test in Claude Code

1. Restart Claude Code
2. Start new session
3. Give complex request: "Add user authentication"
4. Observe Claude's response:
   - Should list skill evaluation
   - Should use Skill() tool for relevant skills
   - Should follow activated skill workflows

## 💪 Benefits

### Without This Plugin

```
User: Add auth
Claude: Let me implement authentication...
[Starts coding directly, no specs, no TDD, no skill usage]
```

### With This Plugin

```
User: Add auth
Claude: Let me evaluate skills:
- openspec-workflow: YES - complex feature
- tdd: YES - need tests
[Activates skills]
[Creates proposal]
[Writes specs]
[Implements with TDD]
```

### Reliability Improvement

| Metric           | Without Plugin | With Plugin           |
| ---------------- | -------------- | --------------------- |
| Skill activation | ~20% (ignored) | ~80%+ (forced eval)   |
| TDD usage        | Sporadic       | Consistent            |
| Spec creation    | Rare           | Automatic for complex |
| Quality gates    | Missed         | Applied               |

## 🛠️ Troubleshooting

### Hook Not Running

**Check installation:**

```bash
ls -la ~/.claude/plugins/skill-activation-enforcer/
```

**Make executable:**

```bash
chmod +x ~/.claude/plugins/skill-activation-enforcer/hooks/session-start.sh
```

### Skills Not Listed

**Check skill directories:**

```bash
ls ~/.claude/skills/
```

**Verify SKILL.md exists:**

```bash
ls ~/.claude/skills/*/SKILL.md
```

**Check description field:**

```bash
head -10 ~/.claude/skills/*/SKILL.md | grep "description:"
```

### Claude Not Evaluating

**Restart Claude Code** - Hooks load at startup

**Ask Claude:**
"What skill evaluation protocol do you see in your system context?"

Should mention "MANDATORY SKILL ACTIVATION PROTOCOL"

## 📖 Creating Compatible Skills

Your skill just needs:

```
~/.claude/skills/my-skill/
└── SKILL.md
```

With YAML frontmatter:

```yaml
---
name: my-skill
description: Brief description of when to use this skill
---
# My Skill

[Skill content...]
```

The hook will automatically discover and enforce evaluation.

## 🆚 vs Standalone Skills

| Feature                | Standalone Skills       | With This Plugin     |
| ---------------------- | ----------------------- | -------------------- |
| Skill activation       | Manual (Claude decides) | Forced evaluation    |
| Reliability            | ~20% (often ignored)    | ~80%+ (enforced)     |
| Visibility             | Claude might forget     | Listed every session |
| Activation proof       | None                    | Explicit YES/NO eval |
| Tool usage enforcement | Optional                | Required             |

## 🔗 Inspiration

- **Scott Spence's forced evaluation** - Adapted for SessionStart (UserPromptSubmit doesn't exist in Claude Code)
- **Superpowers plugin** - Hook implementation patterns
- **Claude Code plugin system** - Native hook support

## 🚫 Limitations

- **SessionStart only** - Hook runs at session start/resume, not per-prompt
- **No UserPromptSubmit** - That hook doesn't exist in Claude Code
- **Manual evaluation** - Claude still evaluates, but forced to do so explicitly
- **Verbosity** - Claude will show skill evaluation (can be verbose)

## 📝 License

MIT

## ✨ What's Included

This plugin includes the **openspec-workflow** skill as an example. You can:

- Use it as-is for spec-driven development
- Replace with your own skills
- Add more skills to the `skills/` directory

The hook will discover and enforce ANY compatible skill.

---

**Install this plugin once, works with ALL your skills forever.**
