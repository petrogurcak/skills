#!/bin/bash
# TypeScript check after editing .ts/.tsx files
# Install: chmod +x ~/.claude/hooks/ts-check.sh

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -n "$FILE" ] && [ -f "$FILE" ]; then
    # Find tsconfig.json by walking up
    DIR=$(dirname "$FILE")
    while [ "$DIR" != "/" ] && [ ! -f "$DIR/tsconfig.json" ]; do
        DIR=$(dirname "$DIR")
    done

    if [ -f "$DIR/tsconfig.json" ]; then
        ERRORS=$(cd "$DIR" && npx tsc --noEmit --pretty false 2>&1 | grep "$FILE" | head -10)
        if [ -n "$ERRORS" ]; then
            echo "[TS Check] Errors in $FILE:" >&2
            echo "$ERRORS" >&2
        fi
    fi
fi

echo "$INPUT"
