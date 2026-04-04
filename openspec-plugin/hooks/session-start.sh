#!/usr/bin/env bash
set -euo pipefail

# Universal Skill Activation Hook
# Forces Claude to evaluate ALL available skills at session start

# Determine paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
PLUGIN_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Find all available skills
SKILLS_DIR="${HOME}/.claude/skills"
PLUGIN_SKILLS_DIR="${PLUGIN_ROOT}/skills"

SKILLS_LIST=""

# Scan user skills directory
if [ -d "$SKILLS_DIR" ]; then
  for skill_dir in "$SKILLS_DIR"/*; do
    if [ -d "$skill_dir" ]; then
      skill_name=$(basename "$skill_dir")
      if [ -f "$skill_dir/SKILL.md" ]; then
        # Extract description from frontmatter
        description=$(head -10 "$skill_dir/SKILL.md" | grep "^description:" | sed 's/^description: *//' || echo "No description")
        SKILLS_LIST+="- **$skill_name**: $description\n"
      fi
    fi
  done
fi

# Scan plugin skills directory
if [ -d "$PLUGIN_SKILLS_DIR" ]; then
  for skill_dir in "$PLUGIN_SKILLS_DIR"/*; do
    if [ -d "$skill_dir" ]; then
      skill_name=$(basename "$skill_dir")
      if [ -f "$skill_dir/SKILL.md" ]; then
        # Extract description from frontmatter
        description=$(head -10 "$skill_dir/SKILL.md" | grep "^description:" | sed 's/^description: *//' || echo "No description")
        SKILLS_LIST+="- **$skill_name**: $description\n"
      fi
    fi
  done
fi

# Build the reminder content
REMINDER_CONTENT="<EXTREMELY_IMPORTANT>

# MANDATORY SKILL ACTIVATION PROTOCOL

You have access to specialized skills that must be evaluated for EVERY user request.

## Available Skills:

$SKILLS_LIST

## Three-Step Protocol (NON-NEGOTIABLE):

### Step 1: EVALUATE EVERY SKILL

For EACH skill above, state YES/NO with brief reason:

Example:
\`\`\`
Skill Evaluation:
- openspec-workflow: YES - user requests complex multi-step feature
- svelte5-runes: NO - not using Svelte
- tdd: YES - will need to write tests
- brainstorming: NO - requirements are clear
\`\`\`

**You MUST evaluate ALL skills, not just the obvious ones.**

### Step 2: ACTIVATE ALL \"YES\" SKILLS

For each skill you marked YES, you MUST use the Skill tool:

\`\`\`
Skill: openspec-workflow
Skill: tdd
\`\`\`

**CRITICAL:** Writing \"YES\" without calling Skill() tool = FAILURE

### Step 3: FOLLOW THE ACTIVATED SKILLS

After activation, follow the guidance from each skill.

## Why This Matters

Skills contain:
- Proven workflows that prevent common mistakes
- Mandatory protocols (like TDD, OpenSpec proposals)
- Integration points with other skills
- Quality gates and verification steps

**Skipping skill evaluation = Missing critical workflows = Poor outcomes**

## Common Rationalizations That Mean You're Failing

If you think ANY of these, you're rationalizing and skipping skills:

❌ \"This is just a simple task\" → WRONG. Simple tasks have relevant skills.
❌ \"I can do this without skills\" → WRONG. Skills exist because you forget steps.
❌ \"I'll evaluate skills after I understand better\" → WRONG. Evaluate FIRST.
❌ \"Only one skill is obviously relevant\" → WRONG. Evaluate ALL skills.
❌ \"The user didn't explicitly ask for [skill name]\" → WRONG. You decide when skills apply.

## Red Flags You're Skipping Skills

- Starting to code without skill evaluation → STOP
- Saying \"let me start by...\" without evaluating skills → STOP
- Responding immediately without listing skill evaluations → STOP
- Evaluating only 1-2 skills when 5+ are available → STOP

## Correct Flow Example

\`\`\`
User: Add user authentication with login and registration

Me: Let me first evaluate all available skills:

Skill Evaluation:
- openspec-workflow: YES - complex multi-step feature needing specs
- tdd: YES - will need tests for auth logic
- brainstorming: NO - approach is clear (JWT auth)
- systematic-debugging: NO - not debugging
- code-review: NO - not reviewing yet (will use after implementation)

Activating relevant skills:

[Uses Skill(openspec-workflow)]
[Uses Skill(tdd)]

Now following the workflows from activated skills...

OpenSpec workflow says create proposal first...
[creates proposal]

Should I proceed with this approach?
\`\`\`

## Verification Checklist

Before responding to ANY user request:

- [ ] Listed ALL available skills
- [ ] Evaluated EACH skill (YES/NO with reason)
- [ ] Used Skill() tool for each YES
- [ ] Announced which skills are active
- [ ] Following activated skill workflows

**Missing ANY of these steps = Protocol violation**

---

**REMEMBER:** Skills are not optional suggestions. They are mandatory workflows that ensure quality. Evaluate ALL skills for EVERY request. No exceptions.

</EXTREMELY_IMPORTANT>"

# Escape content for JSON
ESCAPED_CONTENT=$(echo "$REMINDER_CONTENT" | sed 's/\\/\\\\/g' | sed 's/"/\\"/g' | awk '{printf "%s\\n", $0}')

# Output JSON
cat <<EOF
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": "${ESCAPED_CONTENT}"
  }
}
EOF

exit 0
