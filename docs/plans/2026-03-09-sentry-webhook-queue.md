---
status: complete
created: 2026-03-09
completed: 2026-03-10
tasks_total: 5
review_status: plan-challenger done, deep-review done (security + API design), all findings incorporated
tasks_done: 5
notes: |
  - Worker URL: petr-ogurcak.workers.dev (ne petrogurcak)
  - Sentry posila event_alert (ne issue) z alert rules — Worker zpracovava oba typy
  - event_alert payload ma jinou strukturu: data.event.event_id, data.event.message
  - ID validace musi byt alphanumericka (hex IDs z event_alert)
  - shiftstreak-backend alert rule hotova, zbyle 3 projekty pending (manualne v Sentry UI)
---

# Sentry Webhook Queue — Event-Driven Fix Agent

**Goal:** Nahradit polling Sentry API za event-driven architekturu: Sentry webhook → Cloudflare Worker (fronta) → Mac poller zpracuje kdyz je online.
**Architecture:** Cloudflare Worker + KV jako always-online buffer. Mac poller cte z Workeru misto Sentry API. Existujici `sentry-fix-agent.sh` beze zmeny.
**Tech Stack:** Cloudflare Worker (JS), KV namespace, bash (Mac strana)
**Created:** 2026-03-09

**Motivace:**

- Stary poller bezi kazdych 120s, i kdyz neni co resit (~$0 ale zbytecny Sentry API traffic)
- Budget $1/run nestaci — 9 z 11 pokusu od 28.2. spadlo na budget limit
- Mac offline = ztracene issues (poller nemuze pollovat kdyz spi)

**Zmeny oproti soucasnemu stavu:**

- `max_budget`: 1.00 → 10.00 (Claude Max predplatne, neni realna cena)
- Polling interval: 120s → 300s (issues cekaji ve fronte, neni treba spech)
- Zdroj dat: Sentry API → Cloudflare Worker KV

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify → demo → merge → wrapup
>
> Or individually: `/development:verify` → `/development:demo` → `/development:merge` → `/development:wrapup`

---

### Task 1: Generate secrets + rotate Sentry token (prerequisite)

**Files:**

- Create: `~/.claude/secrets/sentry-poller-token`
- Create: `~/.claude/secrets/sentry-access-token`
- Modify: `~/.claude/scripts/sentry-mcp-config.json` (remove hardcoded token)

**Step 1: Generate and store poller token**

```bash
mkdir -p ~/.claude/secrets
chmod 700 ~/.claude/secrets
openssl rand -hex 32 > ~/.claude/secrets/sentry-poller-token
chmod 600 ~/.claude/secrets/sentry-poller-token
cat ~/.claude/secrets/sentry-poller-token
# → Pouzij tuto hodnotu pri `wrangler secret put POLLER_TOKEN` v Task 2
```

**Step 2: Rotate Sentry access token**

The old token `sntryu_b48bae...` is hardcoded in two files (`sentry-fix-poller.sh:15`, `sentry-mcp-config.json`). Rotate it:

1. Go to Sentry → Settings → Developer Settings → Internal Integrations
2. Regenerate the access token
3. Save new token:

```bash
echo "NEW_TOKEN_HERE" > ~/.claude/secrets/sentry-access-token
chmod 600 ~/.claude/secrets/sentry-access-token
```

**Step 3: Update MCP config to use env var**

Edit `~/.claude/scripts/sentry-mcp-config.json` — replace the hardcoded token value with env var reference. Then update `sentry-fix-agent.sh` to export the token before calling claude:

```bash
# In sentry-fix-agent.sh, add before the claude -p call:
export SENTRY_ACCESS_TOKEN="$(cat "$HOME/.claude/secrets/sentry-access-token")"
```

**Step 4: Secure old files**

```bash
chmod 600 ~/.claude/scripts/sentry-fix-poller.sh
chmod 600 ~/.claude/logs/sentry-fix-poller.log
chmod 700 ~/.claude/logs
```

---

### Task 2: Cloudflare Worker + KV setup

**Files:**

- Create: `~/.claude/scripts/sentry-webhook-worker/wrangler.toml`
- Create: `~/.claude/scripts/sentry-webhook-worker/src/index.js`
- Create: `~/.claude/scripts/sentry-webhook-worker/package.json`

**Step 1: Create project structure**

```bash
mkdir -p ~/.claude/scripts/sentry-webhook-worker/src
cd ~/.claude/scripts/sentry-webhook-worker
npm init -y
```

**Step 2: Create `wrangler.toml`**

```toml
name = "sentry-fix-queue"
main = "src/index.js"
compatibility_date = "2026-03-01"

[[kv_namespaces]]
binding = "SENTRY_QUEUE"
id = "<KV_NAMESPACE_ID>"

[vars]
# SENTRY_WEBHOOK_SECRET set via `wrangler secret put`
```

**Step 3: Create `src/index.js`**

```javascript
// Sentry Fix Queue — Cloudflare Worker
// POST /webhook/sentry — receive Sentry webhook, store in KV (metadata)
// GET /queue/pending — return all pending issues from KV metadata
// DELETE /queue/:id — remove processed issue
// GET /health — health check

const JSON_HEADERS = { "Content-Type": "application/json" };
const MAX_PAYLOAD_BYTES = 256 * 1024; // 256KB

// JSON response helper
function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

// Auth helper — case-insensitive Bearer, header only (no query params)
function getToken(request) {
  const auth = request.headers.get("Authorization") || "";
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

// Timing-safe string comparison via crypto.subtle
async function timingSafeEqual(a, b) {
  const encoder = new TextEncoder();
  const keyData = encoder.encode("compare-key");
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigA = await crypto.subtle.sign("HMAC", key, encoder.encode(a));
  const sigB = await crypto.subtle.sign("HMAC", key, encoder.encode(b));
  const bufA = new Uint8Array(sigA);
  const bufB = new Uint8Array(sigB);
  if (bufA.byteLength !== bufB.byteLength) return false;
  return crypto.subtle.timingSafeEqual(bufA, bufB);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // GET /health — no auth, for monitoring
    if (request.method === "GET" && url.pathname === "/health") {
      return json({ status: "ok" });
    }

    // POST /webhook/sentry — Sentry sends webhook here
    if (request.method === "POST" && url.pathname === "/webhook/sentry") {
      // Check resource type — only process issue webhooks
      const resource = request.headers.get("Sentry-Hook-Resource");
      if (resource && resource !== "issue") {
        return json({ ignored: "resource:" + resource });
      }

      // Payload size limit
      const contentLength = parseInt(
        request.headers.get("Content-Length") || "0",
        10,
      );
      if (contentLength > MAX_PAYLOAD_BYTES) {
        return json({ error: "Payload too large" }, 413);
      }

      const body = await request.text();
      if (body.length > MAX_PAYLOAD_BYTES) {
        return json({ error: "Payload too large" }, 413);
      }

      // Verify Sentry HMAC-SHA256 signature — FAIL CLOSED
      if (!env.SENTRY_WEBHOOK_SECRET) {
        return json(
          { error: "Server misconfigured: webhook secret not set" },
          500,
        );
      }

      const signature = request.headers.get("Sentry-Hook-Signature") || "";
      // Sentry sends "sha256=<hex>" format — strip prefix
      const sigHex = signature.startsWith("sha256=")
        ? signature.slice(7)
        : signature;

      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(env.SENTRY_WEBHOOK_SECRET),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
      const expected = Array.from(new Uint8Array(sig))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

      if (!(await timingSafeEqual(sigHex, expected))) {
        return json({ error: "Invalid signature" }, 401);
      }

      // Parse JSON safely
      let payload;
      try {
        payload = JSON.parse(body);
      } catch {
        return json({ error: "Invalid JSON" }, 400);
      }

      // Only process "created" (new issue) and "triggered" (alert rule)
      const action = payload.action;
      if (action !== "created" && action !== "triggered") {
        return json({ ignored: "action:" + action });
      }

      const issue = payload.data?.issue || payload.data;
      if (!issue?.id) {
        return json({ error: "No issue ID" }, 400);
      }

      const entry = {
        issue_id: String(issue.id),
        short_id: issue.shortId || "",
        project_slug: issue.project?.slug || payload.data?.project?.slug || "",
        title: issue.title || "",
        url: issue.permalink || "",
        first_seen: issue.firstSeen || "",
        received_at: new Date().toISOString(),
      };

      // Store in KV metadata (avoids N+1 reads on list) — TTL 7 days
      await env.SENTRY_QUEUE.put(`issue:${entry.issue_id}`, "", {
        expirationTtl: 604800,
        metadata: entry,
      });

      return json({ stored: entry.issue_id });
    }

    // GET /queue/pending — return all pending issues from KV metadata
    if (request.method === "GET" && url.pathname === "/queue/pending") {
      if (!(await timingSafeEqual(getToken(request), env.POLLER_TOKEN || ""))) {
        return json({ error: "Unauthorized" }, 401);
      }

      const issues = [];
      let cursor = null;

      // Paginate through all KV keys — read metadata (no extra get() calls)
      do {
        const listOpts = { prefix: "issue:" };
        if (cursor) listOpts.cursor = cursor;
        const list = await env.SENTRY_QUEUE.list(listOpts);

        for (const key of list.keys) {
          if (key.metadata) {
            issues.push(key.metadata);
          }
        }

        cursor = list.list_complete ? null : list.cursor;
      } while (cursor);

      return json(issues);
    }

    // DELETE /queue/:id — remove processed issue
    if (request.method === "DELETE" && url.pathname.startsWith("/queue/")) {
      if (!(await timingSafeEqual(getToken(request), env.POLLER_TOKEN || ""))) {
        return json({ error: "Unauthorized" }, 401);
      }

      const id = url.pathname.split("/")[2];
      // Validate ID is numeric
      if (!id || !/^\d+$/.test(id)) {
        return json({ error: "Invalid issue ID" }, 400);
      }

      await env.SENTRY_QUEUE.delete(`issue:${id}`);
      return json({ deleted: id });
    }

    return json({ error: "Not found" }, 404);
  },
};
```

**Step 4: Create KV namespace and deploy**

```bash
cd ~/.claude/scripts/sentry-webhook-worker
npx wrangler login                              # auth to Cloudflare
npx wrangler kv namespace create SENTRY_QUEUE   # vytvorí namespace, vrátí ID
# → Zkopíruj ID do wrangler.toml

npx wrangler secret put SENTRY_WEBHOOK_SECRET   # Sentry webhook secret
npx wrangler secret put POLLER_TOKEN            # Token z ~/.claude/secrets/sentry-poller-token

npx wrangler deploy                             # Deploy na edge
```

**Step 5: Verify**

Note: HMAC verification is now mandatory (fail closed). Set the webhook secret BEFORE deploying (Step 4). For testing, use a known test secret and compute the HMAC manually, or test the queue/health endpoints first:

```bash
# Test health endpoint (no auth)
curl https://sentry-fix-queue.petr-ogurcak.workers.dev/health
# Expected: {"status":"ok"}

# Test pending queue (auth via header)
curl -H "Authorization: Bearer $(cat ~/.claude/secrets/sentry-poller-token)" \
  https://sentry-fix-queue.petr-ogurcak.workers.dev/queue/pending
# Expected: []

# Test webhook with computed HMAC (replace SECRET with your actual secret):
SECRET="your-webhook-secret"
BODY='{"action":"created","data":{"issue":{"id":"12345","shortId":"TEST-1","project":{"slug":"test"},"title":"Test issue","firstSeen":"2026-03-09T00:00:00Z"}}}'
SIG=$(echo -n "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | awk '{print $2}')
curl -X POST https://sentry-fix-queue.petr-ogurcak.workers.dev/webhook/sentry \
  -H "Content-Type: application/json" \
  -H "Sentry-Hook-Resource: issue" \
  -H "Sentry-Hook-Signature: sha256=$SIG" \
  -d "$BODY"
# Expected: {"stored":"12345"}

# Verify it appeared in queue
curl -H "Authorization: Bearer $(cat ~/.claude/secrets/sentry-poller-token)" \
  https://sentry-fix-queue.petr-ogurcak.workers.dev/queue/pending
# Expected: [{"issue_id":"12345",...}]

# Test delete (now DELETE method, not POST)
curl -X DELETE -H "Authorization: Bearer $(cat ~/.claude/secrets/sentry-poller-token)" \
  https://sentry-fix-queue.petr-ogurcak.workers.dev/queue/12345
# Expected: {"deleted":"12345"}
```

---

### Task 3: Novy Mac poller (webhook-based)

**Files:**

- Create: `~/.claude/scripts/sentry-fix-webhook-poller.sh`
- Backup: `~/.claude/scripts/sentry-fix-poller.sh` → `sentry-fix-poller.sh.bak`

**Step 1: Create `sentry-fix-webhook-poller.sh`**

```bash
#!/bin/bash
# Sentry Fix — Webhook Queue Poller
# Reads pending issues from Cloudflare Worker KV queue
# Runs every 5 minutes via launchd
# Replaces direct Sentry API polling

set -euo pipefail

SCRIPTS_DIR="$HOME/.claude/scripts"
STATE_DIR="$HOME/.claude/state"
LOG="$HOME/.claude/logs/sentry-fix-poller.log"
LOCK="$STATE_DIR/sentry-fix.lock"
PROCESSED="$STATE_DIR/sentry-fix-processed.txt"
CONFIG="$SCRIPTS_DIR/sentry-projects.yaml"

WORKER_URL="https://sentry-fix-queue.petr-ogurcak.workers.dev"
POLLER_TOKEN="$(cat "$HOME/.claude/secrets/sentry-poller-token" 2>/dev/null || echo '')"

if [ -z "$POLLER_TOKEN" ]; then
  echo "$(date) | ERROR: Missing poller token in ~/.claude/secrets/sentry-poller-token" >> "$LOG"
  exit 1
fi

# Ensure dirs exist
mkdir -p "$STATE_DIR" "$(dirname "$LOG")"

# Skip if agent already running
if [ -f "$LOCK" ]; then
  echo "$(date) | SKIP: Agent already running (lock exists)" >> "$LOG"
  exit 0
fi

# Read ignored projects from config
IGNORED=$(yq -r '.ignored[]' "$CONFIG" 2>/dev/null | tr '\n' '|' | sed 's/|$//')

# Rotate processed file monthly (keep last 1000 entries)
if [ -f "$PROCESSED" ] && [ "$(wc -l < "$PROCESSED")" -gt 2000 ]; then
  tail -1000 "$PROCESSED" > "${PROCESSED}.tmp" && mv "${PROCESSED}.tmp" "$PROCESSED"
  echo "$(date) | CLEANUP: Rotated processed file to last 1000 entries" >> "$LOG"
fi

# Fetch pending issues from Worker queue (auth via header, not query param)
TMPFILE=$(mktemp)
trap "rm -f $TMPFILE" EXIT

HTTP_CODE=$(curl -s -w "%{http_code}" -o "$TMPFILE" \
  -H "Authorization: Bearer ${POLLER_TOKEN}" \
  "${WORKER_URL}/queue/pending")

if [ "$HTTP_CODE" != "200" ]; then
  echo "$(date) | ERROR: Worker returned HTTP $HTTP_CODE" >> "$LOG"
  exit 1
fi

# Parse pending issues — skip issues older than 24h (based on received_at)
PARSED=$(python3 -c "
import json, sys
from datetime import datetime, timezone, timedelta

with open('$TMPFILE') as f:
    issues = json.load(f)
if not isinstance(issues, list) or len(issues) == 0:
    sys.exit(0)

cutoff = datetime.now(timezone.utc) - timedelta(hours=24)

for i in issues:
    # Check age — skip issues received more than 24h ago
    received = i.get('received_at', '')
    if received:
        try:
            dt = datetime.fromisoformat(received.replace('Z', '+00:00'))
            if dt < cutoff:
                # Print with STALE prefix so bash can handle cleanup
                print('STALE\t' + i.get('issue_id', ''))
                continue
        except (ValueError, TypeError):
            pass

    print('\t'.join([
        'OK',
        i.get('issue_id', ''),
        i.get('short_id', ''),
        i.get('project_slug', ''),
        i.get('title', '').replace('\t', ' ').replace('\n', ' ')
    ]))
" 2>/dev/null) || exit 0

if [ -z "$PARSED" ]; then
  exit 0
fi

COUNT=$(echo "$PARSED" | grep -c '^OK' || true)
STALE=$(echo "$PARSED" | grep -c '^STALE' || true)

if [ "$STALE" -gt 0 ]; then
  echo "$(date) | QUEUE: $COUNT pending, $STALE stale (>24h, cleaning up)" >> "$LOG"
  # Clean up stale issues from Worker queue
  echo "$PARSED" | grep '^STALE' | while IFS=$'\t' read -r _ ISSUE_ID; do
    curl -s -X DELETE -H "Authorization: Bearer ${POLLER_TOKEN}" \
      "${WORKER_URL}/queue/${ISSUE_ID}" > /dev/null
  done
fi

if [ "$COUNT" -eq 0 ]; then
  exit 0
fi

echo "$(date) | QUEUE: Processing $COUNT pending issues" >> "$LOG"

# Process each valid issue
echo "$PARSED" | grep '^OK' | while IFS=$'\t' read -r _ ISSUE_ID SHORT_ID PROJECT_SLUG TITLE; do
  # Skip if already processed
  if grep -q "^$ISSUE_ID$" "$PROCESSED" 2>/dev/null; then
    # Mark as done in Worker too (cleanup)
    curl -s -X DELETE -H "Authorization: Bearer ${POLLER_TOKEN}" \
      "${WORKER_URL}/queue/${ISSUE_ID}" > /dev/null
    continue
  fi

  # Skip ignored projects
  if [ -n "$IGNORED" ] && echo "$PROJECT_SLUG" | grep -qE "^($IGNORED)$"; then
    echo "$(date) | IGNORE: $SHORT_ID ($PROJECT_SLUG) $TITLE" >> "$LOG"
    echo "$ISSUE_ID" >> "$PROCESSED"
    curl -s -X DELETE -H "Authorization: Bearer ${POLLER_TOKEN}" \
      "${WORKER_URL}/queue/${ISSUE_ID}" > /dev/null
    continue
  fi

  echo "$(date) | FIX: $SHORT_ID ($PROJECT_SLUG) $TITLE" >> "$LOG"

  # Mark as processing locally
  echo "$ISSUE_ID" >> "$PROCESSED"

  # Trigger fix agent (foreground, one at a time)
  "$SCRIPTS_DIR/sentry-fix-agent.sh" "$PROJECT_SLUG" "$ISSUE_ID" "$SHORT_ID" >> "$LOG" 2>&1 || true

  # Mark as done in Worker queue
  curl -s -X POST -H "Authorization: Bearer ${POLLER_TOKEN}" \
    "${WORKER_URL}/queue/${ISSUE_ID}/done" > /dev/null

  echo "$(date) | DONE: $SHORT_ID processed" >> "$LOG"
done
```

**Step 2: Make executable and backup old poller**

```bash
chmod +x ~/.claude/scripts/sentry-fix-webhook-poller.sh
cp ~/.claude/scripts/sentry-fix-poller.sh ~/.claude/scripts/sentry-fix-poller.sh.bak
chmod 600 ~/.claude/scripts/sentry-fix-poller.sh.bak  # contains hardcoded token
```

---

### Task 4: Update LaunchAgent + budget

**Files:**

- Modify: `~/Library/LaunchAgents/com.claude.sentry-fix.plist`
- Modify: `~/.claude/scripts/sentry-projects.yaml`

**Step 1: Update plist — new script + 5 min interval**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.claude.sentry-fix</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>/Users/petrogurcak/.claude/scripts/sentry-fix-webhook-poller.sh</string>
  </array>
  <key>StartInterval</key>
  <integer>300</integer>
  <key>EnvironmentVariables</key>
  <dict>
    <key>PATH</key>
    <string>/Users/petrogurcak/.local/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin</string>
    <key>HOME</key>
    <string>/Users/petrogurcak</string>
  </dict>
  <key>StandardOutPath</key>
  <string>/Users/petrogurcak/.claude/logs/sentry-fix-poller-stdout.log</string>
  <key>StandardErrorPath</key>
  <string>/Users/petrogurcak/.claude/logs/sentry-fix-poller-stderr.log</string>
  <key>RunAtLoad</key>
  <true/>
</dict>
</plist>
```

**Step 2: Reload LaunchAgent**

```bash
launchctl unload ~/Library/LaunchAgents/com.claude.sentry-fix.plist
launchctl load ~/Library/LaunchAgents/com.claude.sentry-fix.plist
```

**Step 3: Update budget in sentry-projects.yaml**

Change `max_budget: 1.00` → `max_budget: 10.00`

---

### Task 5: Sentry webhook setup (manual)

**Toto se dela rucne v Sentry UI — neni co kodovat.**

1. **Sentry → Settings → Developer → Internal Integration**
   - Name: `Fix Queue Webhook`
   - Webhook URL: `https://sentry-fix-queue.petr-ogurcak.workers.dev/webhook/sentry`
   - Permissions: Issue & Event → Read (minimum)
   - Webhooks: check "issue" (fires on new issue)
   - Save → copy "Client Secret" (= SENTRY_WEBHOOK_SECRET pro Worker)

2. **Sentry → Alerts → pro kazdy ze 4 projektu:**
   - New Alert Rule: "When a new issue is first seen"
   - Action: "Send a notification via [Fix Queue Webhook]"
   - Save

3. **Test:** Vytvor test error v jednom projektu, over ze se objevi v Worker queue:
   ```bash
   curl -H "Authorization: Bearer $(cat ~/.claude/secrets/sentry-poller-token)" \
     https://sentry-fix-queue.petr-ogurcak.workers.dev/queue/pending
   ```

---

## Rollback plan

Pokud neco nefunguje:

```bash
# Vrat stary poller
cp ~/.claude/scripts/sentry-fix-poller.sh.bak ~/.claude/scripts/sentry-fix-poller.sh
# Update plist zpet na stary skript + 120s interval
launchctl unload ~/Library/LaunchAgents/com.claude.sentry-fix.plist
# edit plist...
launchctl load ~/Library/LaunchAgents/com.claude.sentry-fix.plist
```
