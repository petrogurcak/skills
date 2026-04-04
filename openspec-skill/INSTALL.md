# Installation Guide: OpenSpec Workflow Skill

This guide walks you through installing both OpenSpec and this skill for Claude Code.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** >= 20.19.0
- **npm** (comes with Node.js)
- **Claude Code** installed and configured
- Terminal/command line access

Check your Node.js version:
```bash
node --version
# Should show v20.19.0 or higher
```

## Step 1: Install OpenSpec CLI

Install OpenSpec globally so it's available across all projects:

```bash
npm install -g @fission-ai/openspec@latest
```

Verify installation:
```bash
openspec --version
```

You should see output like:
```
@fission-ai/openspec/1.x.x
```

### Troubleshooting Step 1

**"Command not found: openspec"**
- Check global npm bin path: `npm bin -g`
- Ensure that path is in your $PATH
- Try: `npm install -g @fission-ai/openspec@latest --force`

**"Permission denied"**
- On macOS/Linux, you may need: `sudo npm install -g @fission-ai/openspec@latest`
- Or configure npm to install globally without sudo: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally

**"Node version too old"**
- Update Node.js to >= 20.19.0
- Use nvm: `nvm install 20` or download from https://nodejs.org/

## Step 2: Initialize OpenSpec in Your Project

Navigate to your project directory and initialize:

```bash
cd /path/to/your/project
openspec init
```

The initialization wizard will:

1. **Ask which AI tools you use** - Select "Claude Code" or all that apply
2. **Configure slash commands** - Automatically set up integrations
3. **Create directory structure**

After initialization, you should see:
```
openspec/
├── specs/
└── changes/
```

Verify initialization:
```bash
openspec list
# Should show "No active changes" (empty list is success)
```

### Troubleshooting Step 2

**"openspec: command not found"**
- Complete Step 1 first
- Restart your terminal to reload PATH

**"Not a git repository"**
- OpenSpec works best in git repos
- Initialize git first: `git init`
- Or proceed anyway (some features may be limited)

**"Directory already exists"**
- OpenSpec already initialized
- Check `ls openspec/` to verify structure
- If corrupted, remove and re-run: `rm -rf openspec && openspec init`

## Step 3: Install This Skill for Claude Code

Choose one of the following methods:

### Method A: User Skills Directory (Recommended)

Copy this skill to Claude Code's user skills directory:

```bash
# Create user skills directory if it doesn't exist
mkdir -p ~/.claude/skills

# Copy this skill
cp -r /path/to/openspec-skill ~/.claude/skills/openspec-workflow/

# Verify installation
ls ~/.claude/skills/openspec-workflow/SKILL.md
```

### Method B: Project-Specific Skill

If you want this skill only in a specific project:

```bash
# In your project directory
mkdir -p .claude/skills
cp -r /path/to/openspec-skill .claude/skills/openspec-workflow/

# Verify installation
ls .claude/skills/openspec-workflow/SKILL.md
```

### Method C: As Part of a Plugin

If you're creating a Claude Code plugin:

```
your-plugin/
├── plugin.json
└── skills/
    └── openspec-workflow/
        ├── SKILL.md
        └── README.md
```

### Troubleshooting Step 3

**"Cannot find .claude directory"**
- Create it: `mkdir -p ~/.claude/skills`
- Claude Code creates this on first run
- Ensure Claude Code is properly installed

**"Skill not appearing in Claude Code"**
- Restart Claude Code
- Check skill file exists: `ls ~/.claude/skills/openspec-workflow/SKILL.md`
- Verify YAML frontmatter in SKILL.md is valid

## Step 4: Verify Complete Installation

Test that everything works:

### 4.1: Test OpenSpec CLI

```bash
# Should show help text
openspec --help

# Should show version
openspec --version

# In a project with OpenSpec initialized
openspec list
```

### 4.2: Test Skill in Claude Code

Start Claude Code and try:

```
Use OpenSpec to plan a user authentication feature
```

Claude Code should:
1. Recognize the skill
2. Announce: "I'm using the OpenSpec workflow..."
3. Check if OpenSpec is installed
4. Guide you through creating a proposal

### 4.3: Test Integration

In a project, ask Claude Code:

```
I need to add a shopping cart feature with item management,
quantity updates, and checkout process. Use specs.
```

Claude Code should:
1. Recognize this is complex (multi-step)
2. Invoke OpenSpec workflow automatically
3. Create change proposal structure
4. Request alignment before implementation

## Step 5: Configure IDE Integration (Optional)

OpenSpec can integrate with your IDE for better DX:

### VS Code

If using VS Code, OpenSpec's initialization may have created workspace settings.

Check `.vscode/settings.json` for OpenSpec-related configurations.

### Claude Code Status Line

Claude Code may show OpenSpec status in the status line when working in a project with OpenSpec initialized.

## Verification Checklist

Before proceeding, verify all steps:

- [ ] Node.js >= 20.19.0 installed
- [ ] `openspec --version` shows version number
- [ ] `openspec list` works in a project
- [ ] `openspec/` directory exists in your project
- [ ] Skill file exists at `~/.claude/skills/openspec-workflow/SKILL.md`
- [ ] Claude Code recognizes the skill when mentioned
- [ ] Claude Code can create OpenSpec proposals

## Common Issues and Solutions

### Issue: Skill not triggering automatically

**Problem:** Claude Code doesn't use OpenSpec for complex features

**Solution:**
1. Explicitly mention "use OpenSpec" or "use specs"
2. Check skill description matches your use case
3. Verify SKILL.md frontmatter is valid YAML
4. Restart Claude Code

### Issue: OpenSpec commands fail

**Problem:** `openspec list` or other commands error

**Solution:**
1. Ensure you're in a directory with `openspec/` folder
2. Re-run `openspec init` if structure is corrupted
3. Check Node.js version: `node --version`
4. Reinstall: `npm install -g @fission-ai/openspec@latest --force`

### Issue: Permission errors

**Problem:** Cannot write to openspec/ directory

**Solution:**
1. Check directory permissions: `ls -la openspec/`
2. Ensure you own the directory: `chown -R $(whoami) openspec/`
3. Run as non-root user (don't use sudo for project commands)

### Issue: Integration with superpowers skills

**Problem:** TDD or other skills not working with OpenSpec

**Solution:**
1. Install superpowers plugin if not already installed
2. Skills work independently - use them sequentially
3. OpenSpec defines WHAT, TDD ensures HOW is correct
4. Follow Stage 3 in OpenSpec skill: implement each task with TDD

## Next Steps

After successful installation:

1. **Read the skill** - `cat ~/.claude/skills/openspec-workflow/SKILL.md`
2. **Try a simple feature** - Ask Claude Code to implement something with specs
3. **Review generated proposals** - Check `openspec/changes/` after using skill
4. **Learn the workflow** - Practice all five stages
5. **Integrate with team** - Share specs for review before implementation

## Getting Help

**OpenSpec Issues:**
- GitHub: https://github.com/Fission-AI/OpenSpec/issues
- Check README: https://github.com/Fission-AI/OpenSpec

**Skill Issues:**
- Check this README.md for usage examples
- Verify skill triggers with explicit invocation first
- Review SKILL.md for when skill should activate

**Claude Code Issues:**
- Claude Code documentation
- GitHub issues: https://github.com/anthropics/claude-code/issues

## Uninstallation

To remove OpenSpec and this skill:

### Remove Skill
```bash
rm -rf ~/.claude/skills/openspec-workflow/
```

### Remove OpenSpec CLI
```bash
npm uninstall -g @fission-ai/openspec
```

### Remove from Project
```bash
cd /path/to/your/project
rm -rf openspec/
```

---

**Installation complete!** You're ready to use spec-driven development with Claude Code and OpenSpec.
