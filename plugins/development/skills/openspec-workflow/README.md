# OpenSpec Workflow Skill for Claude Code

A comprehensive skill that teaches Claude Code when and how to use the OpenSpec framework for spec-driven development.

## What is This?

This skill integrates [OpenSpec](https://github.com/Fission-AI/OpenSpec) into Claude Code's workflow, enabling structured specification-driven development for complex features. It teaches Claude Code to:

1. **Recognize when specs are needed** - Complex features, multi-step implementations, team collaboration
2. **Install and configure OpenSpec** - Global npm installation and project initialization
3. **Follow the five-stage workflow** - Draft → Review → Implement → Archive → Update
4. **Write proper spec deltas** - Using required format with scenarios
5. **Integrate with other superpowers skills** - TDD, brainstorming, code review, debugging

## Installation

### Install OpenSpec Globally

First, install OpenSpec CLI globally on your system:

```bash
npm install -g @fission-ai/openspec@latest
openspec --version
```

### Initialize in Project

Then initialize OpenSpec in each project where you want to use it:

```bash
cd /path/to/your/project
openspec init
```

This creates the `openspec/` directory structure with `specs/` (source of truth) and `changes/` (active work).

### Install This Skill

To make this skill available to Claude Code, you can:

**Option 1: User Skill (Recommended)**
```bash
# Copy skill to Claude Code user skills directory
cp -r openspec-skill ~/.claude/skills/openspec-workflow/
```

**Option 2: Plugin Skill**
Create a Claude Code plugin that includes this skill in its `skills/` directory.

## How It Works

### Automatic Trigger Conditions

Claude Code will automatically use this skill when:

- User requests a complex feature requiring multiple steps
- Feature affects multiple components or modules
- Work requires stakeholder alignment
- Scope needs explicit boundaries
- User explicitly asks to "use OpenSpec"

### Manual Invocation

You can also explicitly invoke the skill:

```
Use the OpenSpec workflow to plan user authentication
```

### Integration with Superpowers

The skill integrates seamlessly with existing superpowers skills:

1. **Brainstorming** → Used in Stage 1-2 to explore approaches
2. **TDD** → Mandatory in Stage 3 for all implementation
3. **Code Review** → Used after logical chunks in Stage 3
4. **Systematic Debugging** → Used when encountering bugs during implementation

## Workflow Overview

### Five Stages

1. **Draft Change Proposal** - Create proposal with problem, solution, scope
2. **Review & Align** - Stakeholder feedback and spec refinement
3. **Implement Tasks** - Write code using TDD, referencing specs
4. **Archive Change** - Move completed work to archive
5. **Update Source Specs** - Merge delta into source of truth

### Directory Structure Created

```
openspec/
├── specs/                    # Source of truth
│   └── [feature-area]/
│       └── spec.md
└── changes/                  # Active work
    └── [change-name]/
        ├── proposal.md       # Why and what
        ├── tasks.md          # Implementation checklist
        ├── design.md         # Technical decisions (optional)
        └── specs/
            └── [feature-area]/
                └── spec.md   # Spec delta
```

## Example Usage

### User Request
```
Add user authentication to the app
```

### Claude Code Response (with this skill)

Claude Code will:

1. **Recognize complexity** - Authentication is multi-step, requires specs
2. **Announce skill usage** - "I'm using the OpenSpec workflow..."
3. **Check installation** - Verify `openspec` is installed
4. **Create change structure** - `openspec/changes/user-authentication/`
5. **Draft proposal** - Problem, solution, scope, success criteria
6. **Request alignment** - Ask user to review and approve
7. **Create spec delta** - Requirements with scenarios
8. **Create tasks.md** - Implementation checklist
9. **Implement with TDD** - For each task: test → fail → implement → pass
10. **Code review** - After logical chunks
11. **Archive** - When complete: `openspec archive user-authentication`
12. **Update source** - Merge delta into source specs

## Key Features

### Spec Delta Format Enforcement

The skill teaches proper delta format:

```markdown
## ADDED Requirements

### Requirement: Email Validation

System SHALL validate email format on registration.

#### Scenario: Valid Email
**Given:** User provides valid email
**When:** Registration form submitted
**Then:** Email accepted

## MODIFIED Requirements

### Requirement: Password Policy

System SHALL require passwords with minimum 12 characters, including
uppercase, lowercase, number, and special character.

## REMOVED Requirements

### Requirement: Username Login

Removed in favor of email-only authentication.
```

### TDD Integration

Every implementation task follows TDD:

```
Spec Requirement → Write Failing Test → Watch Fail → Implement → Watch Pass → Refactor
```

### Command Reference

Claude Code will use these OpenSpec commands:

- `openspec list` - View active changes
- `openspec view` - Interactive dashboard
- `openspec show <change>` - Display change details
- `openspec validate <change>` - Check formatting
- `openspec archive <change>` - Archive completed work

## Benefits

1. **Alignment Before Implementation** - Catch misalignment early
2. **Clear Scope** - Explicit included/excluded items
3. **Shared Understanding** - Team can review specs before code
4. **Living Documentation** - Specs evolve with codebase
5. **Audit Trail** - Track what changed and why
6. **Better Implementation** - Clear specs → better code

## When OpenSpec is Used vs Skipped

### ✅ Use OpenSpec

- Multi-step features
- Features affecting multiple components
- Team collaboration scenarios
- Unclear or evolving requirements
- Refactoring changing external behavior

### ❌ Skip OpenSpec

- Single-line bug fixes
- Typo corrections
- Trivial internal refactoring
- Configuration file updates
- Emergency hotfixes (document after)

## Skill Metadata

```yaml
name: openspec-workflow
description: Use when implementing complex features requiring clear
  specifications before coding - establishes spec-driven development
  workflow with proposal, task breakdown, and delta documentation;
  mandatory for multi-step features, team collaboration, or when
  scope needs explicit boundaries
```

## Requirements

- **OpenSpec CLI:** `@fission-ai/openspec@latest`
- **Node.js:** >= 20.19.0
- **Claude Code:** Latest version
- **Superpowers Plugin:** Recommended (for TDD, brainstorming, code review integration)

## Contributing

Found an issue or want to improve this skill?

1. Test changes with the `testing-skills-with-subagents` superpowers skill
2. Ensure skill works under pressure scenarios
3. Update examples to reflect best practices
4. Submit improvements

## License

This skill is provided as-is for use with Claude Code and OpenSpec.

## Links

- **OpenSpec GitHub:** https://github.com/Fission-AI/OpenSpec
- **OpenSpec Docs:** See repository README
- **Claude Code:** https://claude.com/claude-code
- **Superpowers:** Check your local Claude Code plugins directory

---

**Last Updated:** 2025-11-20
**Version:** 1.0.0
