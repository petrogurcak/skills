# Installation Guide - Nette Framework Knowledge System

Quick setup for Nette Skill + MCP Server.

## Prerequisites

- **For Skill:** Claude Code installed
- **For MCP Server:** Node.js 18+ and npm

## Step-by-Step Installation

### 1. Install Nette Skill (Required)

The skill provides core patterns and best practices.

**Option A: Copy to skills directory**
```bash
cp nette-framework.skill ~/.claude/skills/nette-framework.skill
```

**Option B: Symlink (easier for updates)**
```bash
ln -s $(pwd)/nette-framework.skill ~/.claude/skills/nette-framework.skill
```

**Verify:**
```bash
ls -la ~/.claude/skills/nette-framework.skill
```

### 2. Install MCP Server (Optional)

The MCP server provides live documentation access.

**Build the server:**
```bash
cd nette-mcp
npm install
npm run build
```

**Configure Claude Code:**

Edit `~/.config/claude/mcp.json` (create if doesn't exist):

```json
{
  "mcpServers": {
    "nette": {
      "command": "node",
      "args": ["/absolute/path/to/nette-mcp/dist/index.js"]
    }
  }
}
```

**Important:** Replace `/absolute/path/to/` with actual absolute path!

**Get absolute path:**
```bash
cd nette-mcp
pwd
# Copy this path and use it in config
```

### 3. Restart Claude Code

```bash
# Kill Claude Code process
killall claude-code

# Or restart from your launcher
```

### 4. Verify Installation

**Test Skill:**
```
Ask Claude: "Create a Nette presenter with login action"

Should generate code with:
✓ declare(strict_types=1)
✓ extends Nette\Application\UI\Presenter
✓ Constructor injection
✓ Type hints
```

**Test MCP Server:**
```
Ask Claude: "Fetch Nette documentation about presenters"

Claude should use: fetch_nette_documentation tool
```

## Configuration Examples

### Minimal (Skill Only)

Just copy the skill file - you're done!

**Pros:**
- Zero configuration
- Works offline
- Fast responses

**Cons:**
- No live documentation
- Can't fetch latest API changes

### Full (Skill + MCP)

Follow all steps above.

**Pros:**
- Best practices from skill
- Live docs from MCP
- Always current

**Cons:**
- Requires Node.js
- Needs internet for MCP

### Custom MCP Config Location

If your Claude config is elsewhere:

**macOS/Linux:**
```bash
export CLAUDE_CONFIG_PATH=/your/custom/path
```

**Then edit:**
```bash
$CLAUDE_CONFIG_PATH/mcp.json
```

## Troubleshooting

### Skill Not Loading

**Symptom:** AI doesn't follow Nette patterns

**Solutions:**
1. Check file location:
   ```bash
   ls -la ~/.claude/skills/nette-framework.skill
   ```

2. Verify file extension is `.skill`

3. Restart Claude Code completely

4. Check Claude Code logs for skill loading errors

### MCP Server Not Working

**Symptom:** AI can't fetch documentation

**Solutions:**

1. **Check MCP config path is absolute:**
   ```bash
   cd nette-mcp
   pwd  # Use THIS path in config
   ```

2. **Verify build succeeded:**
   ```bash
   cd nette-mcp
   ls -la dist/index.js  # Should exist
   ```

3. **Test server manually:**
   ```bash
   node dist/index.js
   # Should print: "Nette MCP Server running on stdio"
   # Press Ctrl+C to exit
   ```

4. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   ```

5. **Check MCP logs:**
   Claude Code logs MCP server errors to stderr.
   Look in Claude Code's log files.

### MCP Server Builds but Doesn't Connect

**Check MCP config syntax:**
```bash
cat ~/.config/claude/mcp.json
# Should be valid JSON
```

**Validate JSON:**
```bash
cat ~/.config/claude/mcp.json | python -m json.tool
```

### Documentation Not Fetching

**Symptom:** MCP server works but returns errors

**Possible causes:**
1. No internet connection (MCP needs internet)
2. Nette.org is down (rare)
3. Cache issue

**Solutions:**
1. Check internet connection
2. Restart MCP server (clears cache)
3. Wait a few minutes and try again

## Uninstallation

### Remove Skill
```bash
rm ~/.claude/skills/nette-framework.skill
```

### Remove MCP Server
```bash
# Remove from config
# Edit ~/.config/claude/mcp.json and remove "nette" entry

# Delete files
rm -rf nette-mcp
```

### Restart Claude Code
```bash
killall claude-code
```

## Directory Structure

After installation:

```
~/.claude/
├── skills/
│   └── nette-framework.skill    ← Skill installed here
└── ...

~/.config/claude/
└── mcp.json                      ← MCP config

/your/path/to/nette/
├── nette-framework.skill         ← Original skill
├── nette-mcp/                    ← MCP server
│   ├── dist/
│   │   └── index.js              ← Built server
│   └── ...
└── README.md
```

## Quick Start After Installation

**1. Open a Nette project**

**2. Ask Claude:**
```
"Create a UserPresenter with list and detail actions"
```

**3. Claude will:**
- Use skill patterns (instant)
- Generate modern Nette code
- Follow best practices
- If needed, fetch docs via MCP

**4. Enjoy fast, accurate Nette development!**

## Next Steps

- Read [README.md](./README.md) for usage examples
- Check [nette-framework.skill](./nette-framework.skill) for patterns
- Review [design document](./docs/plans/2025-11-16-nette-framework-knowledge-system-design.md)

## Getting Help

**Skill issues:**
- Check skill file syntax
- Verify Claude Code version
- Check logs

**MCP issues:**
- Verify Node.js version
- Check absolute paths in config
- Test server manually

**Still stuck?**
Open an issue with:
- What you tried
- Error messages
- Environment (OS, Node version, Claude version)

---

**Happy Nette coding! 🎯**
