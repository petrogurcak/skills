#!/usr/bin/env bash
# ideogram-generate.sh — generate images via Ideogram 3.0 REST API.
#
# Usage:
#   ideogram-generate.sh --prompt "..." [options]
#
# Options:
#   --prompt TEXT          Prompt (required)
#   --aspect RATIO         1x1|2x1|1x2|2x3|3x2|3x4|4x3|4x5|5x4|9x16|16x9|... (default 1x1)
#   --style TYPE           AUTO|REALISTIC|DESIGN|GENERAL|FICTION (default AUTO)
#   --speed SPEED          QUALITY|BALANCED|TURBO|FLASH (default QUALITY)
#   --magic ON|OFF|AUTO    Magic prompt enhancement (default AUTO)
#   --num N                Number of images, 1-4 (default 1)
#   --seed N               Seed for reproducibility
#   --negative TEXT        Negative prompt
#   --preset NAME          Style preset (e.g. WATERCOLOR, PRODUCT_PHOTOGRAPHY)
#   --colors HEX,HEX,...   Comma-separated hex colors (e.g. #1C2B3A,#F7F4EF)
#   --char-ref URL         Character reference image URL
#   --style-ref URL        Style reference image URL
#   --out DIR              Output directory (default ./generated/ideogram)
#
# Output: prints saved file path(s) on stdout, one per line.
# Exit codes: 0 = success, 1 = key missing, 2 = bad args, 3 = API error.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck source=lib/get-key.sh
source "${SCRIPT_DIR}/lib/get-key.sh"

PROMPT=""
ASPECT="1x1"
STYLE="AUTO"
SPEED="QUALITY"
MAGIC="AUTO"
NUM=1
SEED=""
NEGATIVE=""
PRESET=""
COLORS=""
CHAR_REF=""
STYLE_REF=""
OUT_DIR="./generated/ideogram"

while [ $# -gt 0 ]; do
  case "$1" in
    --prompt)    PROMPT="$2"; shift 2 ;;
    --aspect)    ASPECT="$2"; shift 2 ;;
    --style)     STYLE="$2"; shift 2 ;;
    --speed)     SPEED="$2"; shift 2 ;;
    --magic)     MAGIC="$2"; shift 2 ;;
    --num)       NUM="$2"; shift 2 ;;
    --seed)      SEED="$2"; shift 2 ;;
    --negative)  NEGATIVE="$2"; shift 2 ;;
    --preset)    PRESET="$2"; shift 2 ;;
    --colors)    COLORS="$2"; shift 2 ;;
    --char-ref)  CHAR_REF="$2"; shift 2 ;;
    --style-ref) STYLE_REF="$2"; shift 2 ;;
    --out)       OUT_DIR="$2"; shift 2 ;;
    -h|--help)
      sed -n '2,30p' "$0"; exit 0 ;;
    *) echo "Unknown arg: $1" >&2; exit 2 ;;
  esac
done

if [ -z "$PROMPT" ]; then
  echo "Error: --prompt is required" >&2
  exit 2
fi

API_KEY=$(get_key IDEOGRAM_API_KEY) || exit 1

mkdir -p "$OUT_DIR"

# Build JSON payload via python (safe quoting).
PAYLOAD=$(IDEOGRAM_PROMPT="$PROMPT" \
          IDEOGRAM_ASPECT="$ASPECT" \
          IDEOGRAM_STYLE="$STYLE" \
          IDEOGRAM_SPEED="$SPEED" \
          IDEOGRAM_MAGIC="$MAGIC" \
          IDEOGRAM_NUM="$NUM" \
          IDEOGRAM_SEED="$SEED" \
          IDEOGRAM_NEGATIVE="$NEGATIVE" \
          IDEOGRAM_PRESET="$PRESET" \
          IDEOGRAM_COLORS="$COLORS" \
          IDEOGRAM_CHAR_REF="$CHAR_REF" \
          IDEOGRAM_STYLE_REF="$STYLE_REF" \
python3 <<'PY'
import json, os
p = {
    "prompt":          os.environ["IDEOGRAM_PROMPT"],
    "aspect_ratio":    os.environ["IDEOGRAM_ASPECT"],
    "style_type":      os.environ["IDEOGRAM_STYLE"],
    "rendering_speed": os.environ["IDEOGRAM_SPEED"],
    "magic_prompt":    os.environ["IDEOGRAM_MAGIC"],
    "num_images":      int(os.environ["IDEOGRAM_NUM"]),
}
if os.environ.get("IDEOGRAM_SEED"):
    p["seed"] = int(os.environ["IDEOGRAM_SEED"])
if os.environ.get("IDEOGRAM_NEGATIVE"):
    p["negative_prompt"] = os.environ["IDEOGRAM_NEGATIVE"]
if os.environ.get("IDEOGRAM_PRESET"):
    p["style_preset"] = os.environ["IDEOGRAM_PRESET"]
colors = os.environ.get("IDEOGRAM_COLORS", "").strip()
if colors:
    items = [c.strip() for c in colors.split(",") if c.strip()]
    weight = round(1.0 / len(items), 2) if items else 0
    p["color_palette"] = {
        "members": [
            {"color_hex": (c if c.startswith("#") else f"#{c}"), "color_weight": weight}
            for c in items
        ]
    }
if os.environ.get("IDEOGRAM_CHAR_REF"):
    p["character_reference"] = {"image_url": os.environ["IDEOGRAM_CHAR_REF"]}
if os.environ.get("IDEOGRAM_STYLE_REF"):
    p["style_reference"] = {"image_url": os.environ["IDEOGRAM_STYLE_REF"]}
print(json.dumps(p))
PY
)

RESPONSE=$(curl -sS -w '\n%{http_code}' \
  -H "Api-Key: $API_KEY" \
  -H "Content-Type: application/json" \
  -X POST "https://api.ideogram.ai/v1/ideogram-v3/generate" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" != "200" ]; then
  echo "Ideogram API error ($HTTP_CODE):" >&2
  echo "$BODY" >&2
  exit 3
fi

# Parse response, download each URL, print saved paths.
TS=$(date +%Y%m%d-%H%M%S)
BODY_FILE=$(mktemp)
trap 'rm -f "$BODY_FILE"' EXIT
printf '%s' "$BODY" > "$BODY_FILE"

BODY_FILE="$BODY_FILE" OUT_DIR="$OUT_DIR" TS="$TS" python3 <<'PY'
import json, os, urllib.request, pathlib
with open(os.environ["BODY_FILE"]) as f:
    data = json.load(f)
out_dir = pathlib.Path(os.environ["OUT_DIR"])
ts = os.environ["TS"]
imgs = data.get("data", [])
if not imgs:
    print("Ideogram returned no images.", file=sys.stderr)
    sys.exit(3)
for i, img in enumerate(imgs):
    url = img.get("url", "")
    seed = img.get("seed", "")
    if not url:
        continue
    suffix = pathlib.Path(url.split("?")[0]).suffix or ".png"
    fname = f"ideogram-{ts}-{i+1}-seed{seed}{suffix}"
    fpath = out_dir / fname
    urllib.request.urlretrieve(url, fpath)
    print(str(fpath))
PY
