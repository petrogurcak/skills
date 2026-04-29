#!/usr/bin/env bash
# nanobanana-generate.sh — generate images via Google Imagen 3 REST API.
#
# Usage:
#   nanobanana-generate.sh --prompt "..." [options]
#
# Options:
#   --prompt TEXT       Prompt (required)
#   --aspect RATIO      1:1|3:4|4:3|9:16|16:9 (default 1:1)
#   --num N             Number of images, 1-4 (default 1)
#   --model MODEL       Imagen model: imagen-4.0-fast-generate-001 (default, fast)
#                       imagen-4.0-generate-001 (standard) or imagen-4.0-ultra-generate-001 (premium)
#   --out DIR           Output directory (default ./generated/nanobanana)
#   --prefix NAME       Filename prefix (default banana)
#
# Output: prints saved file path(s) on stdout, one per line.
# Exit codes: 0 = success, 1 = key missing, 2 = bad args, 3 = API error.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/get-key.sh
source "${SCRIPT_DIR}/lib/get-key.sh"

PROMPT=""
ASPECT="1:1"
NUM=1
MODEL="imagen-4.0-fast-generate-001"
OUT_DIR="./generated/nanobanana"
PREFIX="banana"

while [ $# -gt 0 ]; do
  case "$1" in
    --prompt) PROMPT="$2"; shift 2 ;;
    --aspect) ASPECT="$2"; shift 2 ;;
    --num)    NUM="$2"; shift 2 ;;
    --model)  MODEL="$2"; shift 2 ;;
    --out)    OUT_DIR="$2"; shift 2 ;;
    --prefix) PREFIX="$2"; shift 2 ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "Unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [ -z "$PROMPT" ]; then
  echo "Error: --prompt is required" >&2
  exit 2
fi

API_KEY=$(get_key GEMINI_API_KEY) || exit 1

mkdir -p "$OUT_DIR"

PAYLOAD=$(BANANA_PROMPT="$PROMPT" BANANA_ASPECT="$ASPECT" BANANA_NUM="$NUM" python3 <<'PY'
import json, os
print(json.dumps({
    "instances": [{"prompt": os.environ["BANANA_PROMPT"]}],
    "parameters": {
        "sampleCount": int(os.environ["BANANA_NUM"]),
        "aspectRatio": os.environ["BANANA_ASPECT"],
    },
}))
PY
)

ENDPOINT="https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}"

RESPONSE=$(curl -sS -w '\n%{http_code}' \
  -H "Content-Type: application/json" \
  -X POST "$ENDPOINT" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" != "200" ]; then
  echo "Imagen API error ($HTTP_CODE):" >&2
  echo "$BODY" >&2
  exit 3
fi

TS=$(date +%Y%m%d-%H%M%S)
BODY_FILE=$(mktemp)
trap 'rm -f "$BODY_FILE"' EXIT
printf '%s' "$BODY" > "$BODY_FILE"

BODY_FILE="$BODY_FILE" OUT_DIR="$OUT_DIR" PREFIX="$PREFIX" TS="$TS" python3 <<'PY'
import json, os, base64, pathlib
with open(os.environ["BODY_FILE"]) as f:
    data = json.load(f)
out_dir = pathlib.Path(os.environ["OUT_DIR"])
prefix = os.environ["PREFIX"]
ts = os.environ["TS"]
preds = data.get("predictions", [])
if not preds:
    err = data.get("error", {}).get("message") or "no predictions returned"
    print(f"Imagen returned no images: {err}", file=sys.stderr)
    sys.exit(3)
for i, p in enumerate(preds):
    b64 = p.get("bytesBase64Encoded")
    if not b64:
        continue
    mime = p.get("mimeType", "image/png")
    ext = ".png" if "png" in mime else ".jpg"
    fpath = out_dir / f"{prefix}-{ts}-{i+1}{ext}"
    fpath.write_bytes(base64.b64decode(b64))
    print(str(fpath))
PY
