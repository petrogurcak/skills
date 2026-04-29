#!/usr/bin/env bash
# get-key.sh — fetch API key with priority chain.
#
# Usage: source this file, then call:
#   key=$(get_key IDEOGRAM_API_KEY) || exit 1
#
# Priority:
#   1. 1Password CLI (op read op://Dev/shared-keys/<name>)
#   2. Environment variable ($<name>)
#   3. .env file in current working directory
#   4. Fail with setup instructions
#
# Exit codes (when called as a script for testing):
#   0 = key resolved, printed to stdout
#   1 = no source available, instructions printed to stderr

set -u

OP_VAULT="${CREATIVE_OP_VAULT:-Dev}"
OP_ITEM="${CREATIVE_OP_ITEM:-shared-keys}"

_print_setup_instructions() {
  local key_name="$1"
  cat >&2 <<EOF

=== ${key_name} not found ===

Tried (in order): 1Password CLI, env var \$${key_name}, .env file in cwd.

To fix, choose ONE of:

A) 1Password (recommended — works across machines)
   1. Get the key from the provider:
$(_provider_url "$key_name")
   2. Open 1Password → vault '${OP_VAULT}' → item '${OP_ITEM}'
      (create the item if it doesn't exist)
   3. Add a new field:
      Label: ${key_name}
      Value: <paste key>
      Save.
   4. Make sure 'op' CLI is signed in: \`op signin\`
   5. Re-run.

B) Environment variable (single machine)
   echo 'export ${key_name}="<paste key>"' >> ~/.zshenv
   source ~/.zshenv
   Re-run.

C) Per-project .env file
   Add to .env in your project root:
     ${key_name}=<paste key>
   Re-run.

EOF
}

_provider_url() {
  case "$1" in
    IDEOGRAM_API_KEY) echo "      https://ideogram.ai/manage-api" ;;
    GEMINI_API_KEY)   echo "      https://aistudio.google.com/apikey" ;;
    LUMAAI_API_KEY)   echo "      https://lumalabs.ai/api/keys" ;;
    *)                echo "      (provider URL unknown)" ;;
  esac
}

get_key() {
  local key_name="$1"

  # 1. 1Password
  if command -v op >/dev/null 2>&1; then
    local val
    if val=$(op read "op://${OP_VAULT}/${OP_ITEM}/${key_name}" 2>/dev/null) && [ -n "$val" ]; then
      printf '%s' "$val"
      return 0
    fi
  fi

  # 2. Environment
  local env_val="${!key_name:-}"
  if [ -n "$env_val" ]; then
    printf '%s' "$env_val"
    return 0
  fi

  # 3. .env file in cwd
  if [ -f .env ]; then
    local file_val
    file_val=$(grep -E "^${key_name}=" .env 2>/dev/null | head -1 | cut -d'=' -f2- | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'\$//")
    if [ -n "$file_val" ]; then
      printf '%s' "$file_val"
      return 0
    fi
  fi

  # 4. Fail
  _print_setup_instructions "$key_name"
  return 1
}

# Allow direct invocation for testing: bash get-key.sh IDEOGRAM_API_KEY
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
  if [ $# -ne 1 ]; then
    echo "Usage: $0 <KEY_NAME>" >&2
    exit 2
  fi
  get_key "$1"
fi
