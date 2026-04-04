#!/usr/bin/env bash
set -euo pipefail

# Skill Activation Enforcer - Installation Script
# Universal plugin that forces skill evaluation for ALL skills

echo "🚀 Skill Activation Enforcer - Universal Plugin Installer"
echo "==========================================================="
echo ""

# Determine the script directory and plugin root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLUGIN_NAME="skill-activation-enforcer"

# Determine Claude plugins directory
CLAUDE_PLUGINS_DIR="${HOME}/.claude/plugins"

# Check if plugins directory exists
if [ ! -d "$CLAUDE_PLUGINS_DIR" ]; then
    echo "❌ Error: Claude Code plugins directory not found at: $CLAUDE_PLUGINS_DIR"
    echo "   Make sure Claude Code is installed."
    exit 1
fi

# Target installation directory
INSTALL_DIR="${CLAUDE_PLUGINS_DIR}/${PLUGIN_NAME}"

echo "📁 Source: $SCRIPT_DIR"
echo "📁 Target: $INSTALL_DIR"
echo ""

# Check if plugin is already installed
if [ -d "$INSTALL_DIR" ]; then
    echo "⚠️  Plugin already installed at: $INSTALL_DIR"
    read -p "   Do you want to overwrite? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Installation cancelled."
        exit 0
    fi
    echo "🗑️  Removing existing installation..."
    rm -rf "$INSTALL_DIR"
fi

# Copy plugin to plugins directory
echo "📦 Copying plugin files..."
cp -r "$SCRIPT_DIR" "$INSTALL_DIR"

# Remove the install script from the installed copy
rm -f "${INSTALL_DIR}/install.sh"

# Verify installation
if [ -f "${INSTALL_DIR}/.claude-plugin/plugin.json" ]; then
    echo "✅ Plugin installed successfully!"
    echo ""
    echo "📋 Plugin structure:"
    tree -L 2 "$INSTALL_DIR" 2>/dev/null || ls -R "$INSTALL_DIR"
    echo ""

    # Show discovered skills
    echo "🔍 Discovering skills..."
    SKILLS_DIR="${HOME}/.claude/skills"
    if [ -d "$SKILLS_DIR" ]; then
        echo ""
        echo "📚 Skills that will be enforced:"
        for skill_dir in "$SKILLS_DIR"/*; do
            if [ -d "$skill_dir" ] && [ -f "$skill_dir/SKILL.md" ]; then
                skill_name=$(basename "$skill_dir")
                description=$(head -10 "$skill_dir/SKILL.md" | grep "^description:" | sed 's/^description: *//' || echo "No description")
                echo "   ✓ $skill_name: $description"
            fi
        done
    else
        echo "   ℹ️  No user skills found at ~/.claude/skills/"
    fi

    # Show plugin skills
    PLUGIN_SKILLS_DIR="${INSTALL_DIR}/skills"
    if [ -d "$PLUGIN_SKILLS_DIR" ]; then
        echo ""
        echo "📦 Plugin skills included:"
        for skill_dir in "$PLUGIN_SKILLS_DIR"/*; do
            if [ -d "$skill_dir" ] && [ -f "$skill_dir/SKILL.md" ]; then
                skill_name=$(basename "$skill_dir")
                description=$(head -10 "$skill_dir/SKILL.md" | grep "^description:" | sed 's/^description: *//' || echo "No description")
                echo "   ✓ $skill_name: $description"
            fi
        done
    fi

    echo ""
    echo "🎯 Next steps:"
    echo "   1. Restart Claude Code"
    echo "   2. The SessionStart hook will activate automatically"
    echo "   3. Try: 'Add user authentication with login and registration'"
    echo "   4. Claude will evaluate ALL skills and activate relevant ones"
    echo ""
    echo "📚 Documentation:"
    echo "   - Plugin README: ${INSTALL_DIR}/README.md"
    echo "   - Example skill: ${INSTALL_DIR}/skills/openspec-workflow/SKILL.md"
    echo ""
    echo "🔍 To verify hook is working:"
    echo "   - Start new session in Claude Code"
    echo "   - Ask: 'What skill evaluation protocol do you see?'"
    echo "   - Should mention 'MANDATORY SKILL ACTIVATION PROTOCOL'"
    echo ""
    echo "🎓 What this does:"
    echo "   - Scans ALL skills in ~/.claude/skills/"
    echo "   - Forces Claude to evaluate EVERY skill for EVERY task"
    echo "   - Requires explicit Skill() tool usage for relevant skills"
    echo "   - Dramatically increases skill activation reliability (~20% → ~80%)"
    echo ""
else
    echo "❌ Installation failed! Plugin files not found at expected location."
    exit 1
fi
