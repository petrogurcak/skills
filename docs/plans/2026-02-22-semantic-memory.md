---
status: in_progress
created: 2026-02-22
tasks_total: 6
tasks_done: 0
---

# Semantic Memory System — Implementation Plan (v2.2)

**Goal:** Index vsechny `~/.claude/projects/*/memory/*.md` soubory do existujici episodic-memory SQLite-vec databaze, aby semantic search fungoval pres knowledge files i konverzace.

**Architecture:** Node.js script (`index.mjs`) pouziva STEJNY embedding model jako episodic-memory (Xenova/all-MiniLM-L6-v2, 384-dim) a zapisuje do STEJNE SQLite-vec DB (`~/.config/superpowers/conversation-index/db.sqlite`). Markdown chunky se ukladaji do `exchanges` tabulky — episodic-memory `search` tool je automaticky najde pres vector similarity.

**Tech Stack:** Node.js, @xenova/transformers (reuse z episodic-memory), better-sqlite3, sqlite-vec

**Created:** 2026-02-22

**Review findings addressed (v1 → v2 → v2.1 → v2.2):**

- C1 (v1 JSON escaping): Pouziva `jq -Rs .` jako existujici hooky
- C2 (v1 cold-start): Hook nepouziva embedding model, jen reindex
- C3 (v1 SessionStart query nesmysl): Zadny SessionStart hook, jen SessionEnd
- C4 (v1 overlap s episodic-memory): VYRESENO — pouzivame episodic-memory primo
- C5 (v1 zadne testy): Pridany unit testy pro chunking logiku
- C1-v2 (read tool crash): Graceful error (try/catch v mcp-server.ts:278). Read tool se nepouziva — search results obsahuji snippet + file path, agent pouzije regularni Read tool na .md soubor
- C2-v2 (formatResults breaks): `.replace('.jsonl',...)` je no-op na .md paths. formatResults cte .md soubor jako "summary" (existuje), ale 300-char filter to odfiltruje pro vetsi soubory. Benign.
- C3-v2 (verify marks corrupted): Verify only scans .jsonl files. Markdown entries se oznaci jako "orphaned" (ne corrupted). Repair smaze orphany — viz Known Limitations
- C4-v2 (concurrent SQLite): WAL mode uz enabled v episodic-memory (db.ts:54)
- Q4-v2 (md5 dep): Pouziva Node.js built-in `crypto.createHash('md5')`
- Q4-v2 (fragile line IDs): ID = `md-${md5(filePath + ':' + contentHash)}` — stabilni i pri zmene radku
- Q3-v2 (30s timeout): SessionEnd timeout 60s (prvni run stahuje model ~20s)
- C1-v2.1 (vec_exchanges bulk DELETE): sqlite-vec vec0 nepodporuje `DELETE WHERE id IN (subquery)`. OPRAVENO — loop po jednom `DELETE WHERE id = ?` jako episodic-memory (db.ts:170)
- C2-v2.1 (hook error JSON): Nested jq quotes produkovaly invalidni JSON. OPRAVENO — error path pouziva stejny pattern jako success path
- W2-v2.1 (timestamp format): Explicitne `new Date(mtimeMs).toISOString()` pro kompatibilitu s date filtering
- W3-v2.1 (multi-concept grouping): searchMultipleConcepts groups by archive_path — dokumentovano

**Known Limitations:**

1. **episodic-memory `repair` smaze markdown entries** — verify oznaci jako orphaned, repair je smaze. Mitigation: manualni `verify/repair` je vzacny, SessionEnd hook re-indexuje pri kazdem session end. Pokud se to stane, `node index.mjs --force` obnovi vse za ~10s.
2. **episodic-memory `read` tool nefunguje na .md** — vraci error (graceful). Pro cteni markdown souboru agent pouzije regularni Read tool. Search results obsahuji snippet + presny soubor:radek, coz je dostatecny kontext.
3. **Model first-download** — Xenova/all-MiniLM-L6-v2 se stahne pri prvnim behu (~30MB, jednorazove). Dalsi behy pouzivaji cache.
4. **formatResults cte .md jako "summary"** — `archive_path.replace('.jsonl', '-summary.txt')` je no-op pro .md, takze `summaryPath === archivePath`. Pro soubory > 300 chars se summary ignoruje. Pro male soubory se zobrazi cely obsah jako summary. Benign, ne crash.
5. **Multi-concept search groups by archive_path** — vice chunku ze stejneho .md souboru se pocitaji jako jeden vysledek v `searchMultipleConcepts`. Spravne pro file-level discovery, ne chunk-level precision.

> **Post-execution:** After all tasks are complete, run:
>
> `/development:finish` - orchestrates verify -> demo -> merge -> wrapup

---

## Task 1: Setup Node.js Project for Memory Indexer

**Files:**

- Create: `~/.claude/scripts/memory-indexer/package.json`
- Create: `~/.claude/scripts/memory-indexer/.gitignore`

**Step 1: Create package.json**

```json
{
  "name": "memory-indexer",
  "version": "1.0.0",
  "type": "module",
  "description": "Index markdown memory files into episodic-memory SQLite-vec DB",
  "scripts": {
    "index": "node index.mjs",
    "test": "node --test test-chunker.mjs"
  },
  "dependencies": {
    "@xenova/transformers": "^2.17.2",
    "better-sqlite3": "^12.4.1",
    "sqlite-vec": "^0.1.7-alpha.2"
  }
}
```

Note: Versions pinned to match episodic-memory 1.0.15 exactly. No md5 package — uses Node.js built-in `crypto`.

**Step 2: Create .gitignore**

```
node_modules/
```

**Step 3: Install**

```bash
cd ~/.claude/scripts/memory-indexer && npm install
```

**Step 4: Verify deps match episodic-memory**

```bash
cd ~/.claude/scripts/memory-indexer && node -e "import('@xenova/transformers').then(t => console.log('transformers OK'))"
```

Expected: `transformers OK`

---

## Task 2: Build Markdown Chunker with Tests

**Files:**

- Create: `~/.claude/scripts/memory-indexer/chunker.mjs`
- Create: `~/.claude/scripts/memory-indexer/test-chunker.mjs`

**Chunking algorithm (pseudocode):**

```
import { createHash } from 'node:crypto';

function chunkMarkdown(content, filePath, projectName):
  // Strip YAML frontmatter
  content = content.replace(/^---\n[\s\S]*?\n---\n/, '')

  lines = content.split('\n')
  chunks = []
  currentChunk = { header: '', lines: [], lineStart: 0 }

  for each line, lineNum in lines:
    if line starts with '## ' (h2 header):
      // Save previous chunk if non-empty
      if currentChunk.lines.join('').trim().length > 20:
        chunks.push(finalize(currentChunk))
      // Start new chunk
      currentChunk = { header: line, lines: [], lineStart: lineNum }
    else if line starts with '### ' (h3 header):
      text = currentChunk.lines.join('\n')
      if wordCount(text) > 300:
        // H2 chunk is large, split at h3
        if currentChunk.lines.join('').trim().length > 20:
          chunks.push(finalize(currentChunk))
        currentChunk = {
          header: currentChunk.header + ' > ' + line,  // "## Parent > ### Child"
          lines: [],
          lineStart: lineNum
        }
      else:
        currentChunk.lines.push(line)
    else:
      currentChunk.lines.push(line)

  // Don't forget last chunk
  if currentChunk.lines.join('').trim().length > 20:
    chunks.push(finalize(currentChunk))

  return chunks

function finalize(chunk):
  text = chunk.header + '\n' + chunk.lines.join('\n')
  truncated = text.substring(0, 2000)  // Match episodic-memory 2000-char truncation
  // Content-based hash — stable even when lines shift
  contentHash = createHash('md5').update(truncated).digest('hex').substring(0, 12)
  return {
    id: `md-${createHash('md5').update(filePath + ':' + contentHash).digest('hex')}`,
    text: truncated,
    header: chunk.header.replace(/^#+\s*/, ''),
    lineStart: chunk.lineStart,
    lineEnd: chunk.lineStart + chunk.lines.length,
    filePath: filePath,
    project: projectName
  }

function wordCount(text):
  return text.split(/\s+/).filter(w => w.length > 0).length

function extractProjectName(memoryDirPath):
  // Path: ~/.claude/projects/-Users-petrogurcak-Projects-etapa-menu-editor/memory/
  // Step 1: Get dir name: -Users-petrogurcak-Projects-etapa-menu-editor
  // Step 2: Split on last '-Projects-'
  // Step 3: Take the part after it: 'etapa-menu-editor'
  // Step 4: If starts with 'etapa-': strip prefix -> 'menu-editor'
  const parts = memoryDirPath.split('-Projects-')
  if (parts.length < 2) return ''
  let project = parts[parts.length - 1].replace(/\/memory\/?$/, '')
  if (project.startsWith('etapa-')) project = project.substring(6)
  // Handle nested paths: -Users-petrogurcak-Projects-sellastica-morningstudioprg
  // After '-Projects-': 'sellastica-morningstudioprg'
  // Take last segment after last '-' only if it's a known subproject pattern
  // Actually keep full name — 'sellastica-morningstudioprg' is descriptive enough
  return project
```

**Test cases (test-chunker.mjs using node:test):**

```javascript
import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
// Tests use chunkMarkdown and extractProjectName from chunker.mjs

// T1: Basic h2 splitting
// Input: "## A\ncontent a is longer than twenty chars\n## B\ncontent b is also longer than twenty"
// Expected: 2 chunks, headers "A" and "B"

// T2: H3 splitting when h2 > 300 words
// Input: "## Big\n" + 400 words + "\n### Sub\nmore content that is long enough"
// Expected: 2 chunks, second header contains "Big > Sub"

// T3: H3 NOT splitting when h2 < 300 words
// Input: "## Small\nshort content here\n### Sub\nmore stuff that is long enough to be a chunk"
// Expected: 1 chunk (h3 stays inside h2)

// T4: Skip short chunks (< 20 chars)
// Input: "## Empty\n\n## Real\nactual content here that is clearly long enough"
// Expected: 1 chunk ("Real")

// T5: 2000-char truncation
// Input: "## Long\n" + 3000 chars of content
// Expected: chunk.text.length <= 2000

// T6: YAML frontmatter stripping
// Input: "---\nname: test\n---\n## Content\ntext that is longer than twenty characters here"
// Expected: 1 chunk, no frontmatter in text

// T7: Project name extraction
// Input path: "~/.claude/projects/-Users-petrogurcak-Projects-etapa-menu-editor/memory/"
// Expected: project = "menu-editor"
// Input path: "~/.claude/projects/-Users-petrogurcak-Projects-skills/memory/"
// Expected: project = "skills"

// T8: Preserves line numbers
// Input: "# Title\nignored\n## Real\ncontent that is long enough to pass the min length check"
// (## at line index 2)
// Expected: chunk.lineStart = 2

// T9: Content-based ID stability
// Input: same content twice with different line numbers
// Expected: different IDs (filePath + contentHash differs if content differs)

// T10: ID determinism
// Input: same content, same file path
// Expected: same ID
```

**Run tests:**

```bash
cd ~/.claude/scripts/memory-indexer && node --test test-chunker.mjs
```

Expected: 10/10 tests pass

---

## Task 3: Build Indexer (Embed + Store in SQLite-vec)

**Files:**

- Create: `~/.claude/scripts/memory-indexer/embeddings.mjs`
- Create: `~/.claude/scripts/memory-indexer/index.mjs`

**embeddings.mjs — wrapper around Xenova/transformers:**

```javascript
// Matches episodic-memory's embedding approach exactly (src/embeddings.ts):
// - Model: Xenova/all-MiniLM-L6-v2
// - Pooling: mean
// - Normalization: yes
// - Dimension: 384
// - Max input: 2000 chars (truncate before embedding)

import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function initEmbeddings() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
}

export async function generateEmbedding(text) {
  const truncated = text.substring(0, 2000);
  const output = await embedder(truncated, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data);
}
```

**index.mjs — main script:**

```
CLI: node index.mjs [--force] [--stats] [--dry-run] [--search "query"]

Default (incremental):
1. Open DB at ~/.config/superpowers/conversation-index/db.sqlite
2. Set busy_timeout for concurrent access safety:
   db.pragma('busy_timeout = 5000')
3. Scan ~/.claude/projects/*/memory/*.md
4. For each file:
   a. Get file mtime
   b. Check DB: SELECT MAX(last_indexed) FROM exchanges WHERE archive_path = ? AND id LIKE 'md-%'
   c. Skip if mtime <= last_indexed (unless --force)
   d. Chunk markdown (chunker.mjs)
   e. Generate embeddings for all chunks (embeddings.mjs, batch)
   f. In a transaction:
      - Select old chunk IDs: SELECT id FROM exchanges WHERE archive_path = ? AND id LIKE 'md-%'
      - Delete old vectors one by one: for each id, DELETE FROM vec_exchanges WHERE id = ?
        (sqlite-vec vec0 virtual tables only support single-row DELETE by primary key)
      - Delete old chunks: DELETE FROM exchanges WHERE archive_path = ? AND id LIKE 'md-%'
      - Insert new chunks into `exchanges` table:
        - id: md-{hash} (from chunker)
        - project: extracted project name
        - timestamp: file mtime as ISO string
        - user_message: chunk text (this is what gets searched)
        - assistant_message: '' (empty string, NOT NULL constraint)
        - archive_path: absolute file path
        - line_start, line_end: chunk boundaries
      - Insert embeddings into vec_exchanges
5. Print summary: "Indexed N files, M chunks (K new, J updated, L unchanged)"

--stats: Print index statistics (total files, chunks, projects) without indexing
--force: Re-index all files regardless of mtime
--dry-run: Show what would be indexed without writing to DB
--search "query": Semantic search across memory chunks only (id LIKE 'md-%')
  - Returns top 5 matches with similarity score, project, file, header
  - Useful for testing/debugging
```

**Important implementation details:**

- `timestamp` = `new Date(fs.statSync(file).mtimeMs).toISOString()` — ISO format required for episodic-memory date filtering compatibility
- `assistant_message` set to `''` (empty string) — NOT NULL constraint in schema
- `archive_path` = absolute path to .md file (e.g., `/Users/petrogurcak/.claude/projects/.../memory/MEMORY.md`)
- ID prefix `md-` used for all operations — DELETE WHERE id LIKE 'md-%' ensures we never touch conversation entries
- Transaction wrapping delete+insert prevents partial state on error
- `busy_timeout = 5000` prevents SQLITE_BUSY errors if episodic-memory indexes concurrently
- Embedding model loads on first call (~2-3s with cache, ~20s first ever download)

---

## Task 4: SessionEnd Hook (Auto-reindex)

**Files:**

- Create: `~/.claude/hooks/memory-reindex.sh`
- Modify: `~/.claude/settings.json` (add to SessionEnd hooks)

**Hook script (`memory-reindex.sh`):**

```bash
#!/bin/bash
# Auto-reindex memory files at session end (incremental, fast)
INDEXER="$HOME/.claude/scripts/memory-indexer/index.mjs"
[ -f "$INDEXER" ] || { echo '{}'; exit 0; }

# Check if node_modules exist
[ -d "$HOME/.claude/scripts/memory-indexer/node_modules" ] || { echo '{}'; exit 0; }

# Run incremental index (skips unchanged files)
RESULT=$(cd "$HOME/.claude/scripts/memory-indexer" && node index.mjs 2>&1)
EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  # Extract stats for system message
  ESCAPED=$(echo "$RESULT" | jq -Rs .)
  echo "{\"systemMessage\": $ESCAPED}"
else
  # Log error but don't block session end (same JSON pattern as success path)
  ESCAPED=$(echo "memory-indexer error: $(echo "$RESULT" | head -1)" | jq -Rs .)
  echo "{\"systemMessage\": $ESCAPED}"
fi
```

**Settings.json — add to existing SessionEnd hooks array:**
Insert into the `SessionEnd[0].hooks` array at index 3 (BEFORE the cleanup hook which is currently at index 3, pushing it to index 4):

```json
{
  "type": "command",
  "command": "bash ~/.claude/hooks/memory-reindex.sh",
  "timeout": 60
}
```

Note: timeout 60s (not 30s) — first run downloads model (~20s). Subsequent runs <1s for unchanged files, ~10s for full re-index.

**Why SessionEnd not SessionStart:**

- SessionEnd = index is always fresh for NEXT session
- No cold-start delay at session start
- Memory files are often modified during session (research, context saves)
- 60s timeout is generous (incremental indexing of unchanged files = <1s)

---

## Task 5: MEMORY.md — Add Search Instructions

**Files:**

- Modify: `~/.claude/projects/-Users-petrogurcak-Projects-skills/memory/MEMORY.md`

**Changes (minimal, decoupled from Task 1-4):**

1. Add at top of MEMORY.md:

```markdown
> Semantic search pres vsechny memory files:
> Pouzij `episodic-memory:search-conversations` s query pro hlubsi kontext.
> Memory files se auto-indexuji pri SessionEnd.
> Pro rychly standalone test: `cd ~/.claude/scripts/memory-indexer && node index.mjs --search "query"`
```

2. Keep rest of MEMORY.md as-is (uz je 96 radku, v limitu)
3. Do NOT restructure yet — to az po overeni ze search funguje dobre

**Why minimal change:**
Reviewer W5: "MEMORY.md restructure conflates two concerns. If search doesn't work well, you'd need to revert the restructure too."

---

## Task 6: Integration Tests

**Files:**

- Create: `~/.claude/scripts/memory-indexer/test-integration.mjs`

**Test 1: Full index run**

```bash
cd ~/.claude/scripts/memory-indexer && node index.mjs --force
```

Expected: "Indexed N files, M chunks" (N ~= 14 files)

**Test 2: Verify chunks in DB**

```bash
sqlite3 ~/.config/superpowers/conversation-index/db.sqlite \
  "SELECT COUNT(*) FROM exchanges WHERE id LIKE 'md-%'"
```

Expected: 40-60 rows

**Test 3: Search via standalone search**

```bash
cd ~/.claude/scripts/memory-indexer && node index.mjs --search "product management frameworks"
```

Expected: Results include chunks from product-management-research.md with similarity scores.

**Test 4: Search via episodic-memory MCP tool**
Use `episodic-memory:search-conversations` skill with query "product management frameworks".
Expected: Results include markdown chunks alongside conversation results.

**Test 5: Incremental reindex (no changes)**

```bash
cd ~/.claude/scripts/memory-indexer && node index.mjs
```

Expected: "0 new, 0 updated, N unchanged" (fast, <1s)

**Test 6: Incremental reindex (after file edit)**

```bash
echo -e "\n## Test Chunk\nSemantic memory test content xyz unique marker" >> ~/.claude/projects/-Users-petrogurcak-Projects-skills/memory/MEMORY.md
cd ~/.claude/scripts/memory-indexer && node index.mjs
node index.mjs --search "unique marker"
# Verify test chunk appears in results
# Then clean up test content
```

Expected: New chunk found, then cleaned up

**Test 7: Hook integration**

```bash
bash ~/.claude/hooks/memory-reindex.sh
```

Expected: Valid JSON output with systemMessage field

**Test 8: Project name extraction (dry-run)**

```bash
cd ~/.claude/scripts/memory-indexer && node index.mjs --dry-run
```

Expected: Each file listed with correct project name (skills, menu-editor, sellastica, etc.)

**Test 9: ID stability test**

```bash
# Run force index twice
cd ~/.claude/scripts/memory-indexer && node index.mjs --force
sqlite3 ~/.config/superpowers/conversation-index/db.sqlite "SELECT id FROM exchanges WHERE id LIKE 'md-%' ORDER BY id" > /tmp/ids1.txt
node index.mjs --force
sqlite3 ~/.config/superpowers/conversation-index/db.sqlite "SELECT id FROM exchanges WHERE id LIKE 'md-%' ORDER BY id" > /tmp/ids2.txt
diff /tmp/ids1.txt /tmp/ids2.txt
```

Expected: No differences (IDs are deterministic for same content)

**Test 10: Concurrent access safety**

```bash
# Run indexer while episodic-memory DB is open (simulated)
cd ~/.claude/scripts/memory-indexer && node index.mjs --force &
node index.mjs --stats
wait
```

Expected: Both complete without SQLITE_BUSY errors
