#!/bin/bash
# Auto-format JS/TS files with Prettier after edits
# Install: chmod +x ~/.claude/hooks/auto-prettier.sh

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -n "$FILE" ] && [ -f "$FILE" ]; then
    # Check if prettier is available
    if command -v npx &> /dev/null; then
        npx prettier --write "$FILE" 2>/dev/null
    fi
fi

echo "$INPUT"
