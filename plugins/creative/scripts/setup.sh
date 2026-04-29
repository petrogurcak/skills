#!/usr/bin/env bash
# setup.sh — first-run check for image-generation skill.
#
# Verifies API keys are accessible (op / env / .env) and prints status.
# Exits 0 if at least one provider is ready; otherwise prints instructions.
#
# Usage:
#   bash plugins/creative/scripts/setup.sh
#   bash plugins/creative/scripts/setup.sh ideogram   # check only ideogram
#   bash plugins/creative/scripts/setup.sh nanobanana # check only nanobanana

set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/get-key.sh
source "${SCRIPT_DIR}/lib/get-key.sh"

check_one() {
  local label="$1" key="$2"
  if val=$(get_key "$key" 2>/dev/null) && [ -n "$val" ]; then
    local masked="${val:0:8}…${val: -4}"
    printf '  ✓ %-12s ready (%s)\n' "$label" "$masked"
    return 0
  else
    printf '  ✗ %-12s missing key %s\n' "$label" "$key"
    return 1
  fi
}

target="${1:-all}"

echo ""
echo "Image generation — key check"
echo "  vault: op://${CREATIVE_OP_VAULT:-Dev}/${CREATIVE_OP_ITEM:-shared-keys}"
echo ""

ok_count=0
fail_count=0
missing_keys=()

if [ "$target" = "all" ] || [ "$target" = "ideogram" ]; then
  if check_one "Ideogram" IDEOGRAM_API_KEY; then ((ok_count++)); else ((fail_count++)); missing_keys+=("IDEOGRAM_API_KEY"); fi
fi

if [ "$target" = "all" ] || [ "$target" = "nanobanana" ]; then
  if check_one "Nanobanana" GEMINI_API_KEY; then ((ok_count++)); else ((fail_count++)); missing_keys+=("GEMINI_API_KEY"); fi
fi

echo ""
echo "Tools available: $ok_count, missing: $fail_count"

# 1Password CLI status
if command -v op >/dev/null 2>&1; then
  if op vault list >/dev/null 2>&1; then
    echo "1Password: signed in ✓"
  else
    echo "1Password: installed but NOT signed in. Run: eval \$(op signin)"
  fi
else
  echo "1Password: not installed. Install: brew install --cask 1password-cli"
fi

if [ "$fail_count" -gt 0 ]; then
  echo ""
  echo "→ See instructions above for missing keys."
  exit 1
fi

echo ""
echo "All set — you can call ideogram-generate.sh or nanobanana-generate.sh."
exit 0
