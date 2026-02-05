#!/bin/bash
# Session end hook - pattern extraction reminder
# Install: chmod +x ~/.claude/hooks/evaluate-session.sh

cat << 'EOF'
{"systemMessage": "Session ending.\n\n**Pattern extraction check:**\n- Did you solve a non-trivial problem?\n- Did you discover a useful workaround?\n- Any debugging technique worth remembering?\n\nIf yes -> Run /learn before closing or note for next session."}
EOF
