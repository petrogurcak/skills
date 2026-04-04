#!/bin/bash
# Warn about console.log statements after edits
# Install: chmod +x ~/.claude/hooks/console-log-check.sh

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -n "$FILE" ] && [ -f "$FILE" ]; then
    MATCHES=$(grep -n "console\.log" "$FILE" 2>/dev/null | head -5)
    if [ -n "$MATCHES" ]; then
        echo "[Hook] WARNING: console.log found in $FILE" >&2
        echo "$MATCHES" >&2
        echo "[Hook] Remove before committing" >&2
    fi
fi

echo "$INPUT"
