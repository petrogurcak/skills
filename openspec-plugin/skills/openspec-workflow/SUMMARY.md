# OpenSpec Workflow Skill - Summary

## What We Created

A comprehensive skill that integrates OpenSpec (spec-driven development framework) into Claude Code's workflow.

## Files Created

1. **SKILL.md** (Main skill file)
   - Metadata with name and description
   - Complete five-stage workflow documentation
   - Installation and setup instructions
   - Spec delta format requirements
   - OpenSpec commands reference
   - Integration with superpowers skills (TDD, brainstorming, code review, debugging)
   - When to use / when to skip guidance
   - Common rationalizations and red flags
   - Full workflow example
   - Verification checklists

2. **README.md** (Overview and usage)
   - What the skill is and does
   - Installation instructions (OpenSpec + skill)
   - How it works (automatic triggers, manual invocation)
   - Workflow overview
   - Example usage flow
   - Key features
   - When to use vs skip
   - Requirements

3. **INSTALL.md** (Detailed installation guide)
   - Step-by-step installation (OpenSpec CLI + skill)
   - Prerequisites and verification
   - Troubleshooting for common issues
   - Multiple installation methods
   - Verification checklist
   - Uninstallation instructions

4. **EXAMPLES.md** (Concrete usage examples)
   - Example 1: User Authentication (full workflow)
   - Example 2: Bug Fix (skip OpenSpec)
   - Example 3: Shopping Cart (automatic trigger)
   - Example 4: Refactoring (use OpenSpec)
   - Example 5: Emergency Hotfix (skip, document after)
   - Example 6: Integration with Brainstorming
   - Example 7: Validation Before Archiving
   - Command usage examples

## Key Features of the Skill

### 1. Automatic Recognition
Claude Code will automatically recognize when OpenSpec should be used:
- Complex features (multi-step, multi-component)
- Unclear or evolving requirements
- Team collaboration needs
- Scope boundary requirements

### 2. Five-Stage Workflow
1. **Draft Proposal** - Problem, solution, scope, success criteria
2. **Review & Align** - Stakeholder feedback, refinement, approval
3. **Implement Tasks** - TDD-driven implementation referencing specs
4. **Archive Change** - Move completed work to archive
5. **Update Source Specs** - Merge delta into source of truth

### 3. Structured Spec Deltas
Enforces proper delta format:
- ADDED Requirements
- MODIFIED Requirements
- REMOVED Requirements
- Each with scenarios (Given/When/Then)

### 4. Integration with Superpowers
- **Brainstorming**: For exploring approaches in Stage 1-2
- **TDD**: Mandatory for all implementation in Stage 3
- **Code Review**: After logical chunks
- **Systematic Debugging**: When encountering bugs

### 5. Command Reference
Documents all OpenSpec CLI commands:
- `openspec list` - View active changes
- `openspec view` - Interactive dashboard
- `openspec show <change>` - Display details
- `openspec validate <change>` - Check formatting
- `openspec archive <change>` - Archive completed work

## How to Use

### Installation

```bash
# 1. Install OpenSpec CLI globally
npm install -g @fission-ai/openspec@latest

# 2. Initialize in project
cd /path/to/project
openspec init

# 3. Install skill for Claude Code
cp -r openspec-skill ~/.claude/skills/openspec-workflow/
```

### Invoke Automatically

Claude Code will automatically use the skill for complex features:

```
User: Add shopping cart with item management and checkout

Claude Code: I'm using the OpenSpec workflow to establish clear
specifications before implementation...
[Creates proposal, specs, tasks]
```

### Invoke Manually

Explicitly ask Claude Code to use OpenSpec:

```
User: Use OpenSpec to plan user authentication

Claude Code: I'm using the OpenSpec workflow...
```

## Benefits

1. **Alignment Before Coding** - Catch misalignment early
2. **Clear Scope** - Explicit included/excluded items
3. **Shared Understanding** - Team reviews specs before code
4. **Living Documentation** - Specs evolve with codebase
5. **Audit Trail** - Track what changed and why
6. **Better Implementation** - Clear specs → better code
7. **Less Rework** - Alignment prevents wasted effort

## Integration Points

### With OpenSpec (External Tool)
- Skill guides Claude Code to use OpenSpec CLI
- Creates proper directory structure
- Follows OpenSpec conventions
- Uses OpenSpec commands for validation and archiving

### With Superpowers Skills (Claude Code)
- Coordinates with brainstorming for design decisions
- Enforces TDD during implementation
- Integrates code review after chunks
- Uses systematic debugging for issues

## When This Skill Activates

### ✅ Use OpenSpec (Skill Activates)
- "Add user authentication with login and registration"
- "Implement shopping cart functionality"
- "Refactor payment processing to support multiple providers"
- "Add search functionality with filters and sorting"

### ❌ Skip OpenSpec (Skill Does Not Activate)
- "Fix typo in error message"
- "Update button color to blue"
- "Add console.log for debugging"
- "Remove unused import"

## Quality Assurance

The skill includes:
- Verification checklists for each stage
- Common rationalizations to avoid
- Red flags that indicate OpenSpec is needed
- Troubleshooting for installation and usage
- Concrete examples for different scenarios

## Next Steps for Users

1. **Install OpenSpec** - Follow INSTALL.md
2. **Read Examples** - Review EXAMPLES.md
3. **Try Simple Feature** - Ask Claude Code to implement something with specs
4. **Review Generated Files** - Check openspec/changes/
5. **Practice Full Workflow** - Go through all five stages
6. **Integrate with Team** - Share specs for review

## Maintenance

To update this skill:
1. Edit SKILL.md with changes
2. Update examples in EXAMPLES.md if workflow changes
3. Test with Claude Code to ensure it still works
4. Document any new OpenSpec CLI features

## Links

- **OpenSpec GitHub**: https://github.com/Fission-AI/OpenSpec
- **Skill Location**: `~/.claude/skills/openspec-workflow/`
- **Superpowers**: Check `~/.claude/plugins/cache/superpowers/`

---

**Created:** 2025-11-20
**Version:** 1.0.0
**Status:** Complete and ready for use
