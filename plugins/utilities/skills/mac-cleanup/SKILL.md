---
name: mac-cleanup
description: Safely free up Mac storage by finding and cleaning storage hogs — Docker (images, containers, build cache, volumes), Xcode (simulators, DerivedData, DeviceSupport), app caches, Homebrew cache, unused app data, and logs. Interactive — always asks before deleting. Use when user says "cleanup", "free space", "disk full", "storage", "uvolni misto", "maz disk", "malo mista", "kolik mam mista", or when disk space is running low.
metadata:
  author: Petr
  version: 1.0.0
---

# Mac Cleanup

Safely free Mac storage through interactive investigation and cleanup. Never delete without explicit user confirmation.

## Philosophy

This skill treats disk cleanup as an investigation, not a script. Every Mac has different apps, projects, and workflows — blindly running cleanup commands is dangerous. Instead: find the hogs, present them, ask what's safe to remove, then clean.

## Process

### Phase 1: Investigate

Run these in parallel to build the full picture:

```bash
# Overall disk state
df -h /

# Top storage consumers in home directory
du -sh ~/Library/Caches ~/Library/Logs ~/Library/Developer \
  ~/Library/Application\ Support ~/.Trash ~/Downloads \
  ~/.docker ~/Library/Containers 2>/dev/null | sort -rh

# Projects folder
du -sh ~/Projects 2>/dev/null
```

Then drill into the biggest ones (run in parallel):

**Docker** (often 30-60GB):
```bash
# Container data
du -sh ~/Library/Containers/com.docker.docker/ 2>/dev/null

# Images by size
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}\t{{.CreatedSince}}" | sort -k3 -rh | head -30

# All containers with status
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Size}}" | head -30

# Disk usage summary
docker system df
```

**Xcode / iOS** (often 20-40GB):
```bash
du -sh ~/Library/Developer/CoreSimulator/Devices/ \
  ~/Library/Developer/CoreSimulator/Caches/ \
  ~/Library/Developer/Xcode/DerivedData/ \
  ~/Library/Developer/Xcode/Archives/ \
  ~/Library/Developer/Xcode/iOS\ DeviceSupport/ 2>/dev/null | sort -rh
```

**Application Support** (often 10-30GB):
```bash
du -sh ~/Library/Application\ Support/*/ 2>/dev/null | sort -rh | head -15
```

**Caches** (often 5-20GB):
```bash
du -sh ~/Library/Caches/*/ 2>/dev/null | sort -rh | head -15
```

### Phase 2: Present and Ask

Present findings as a summary table, grouped by category. For each item show:
- What it is (plain language, not just path)
- Size
- Whether it's safe to delete, and what the consequence is

Example format:

```
| Co | Velikost | Poznamka |
|---|---|---|
| Docker build cache | 22 GB | Safe — rebuilds on next docker build |
| iOS Simulators | 23 GB | Safe — Xcode recreates on demand |
| MacWhisper models | 6 GB | Depends — re-download needed |
```

**Classify each item:**
- **Safe** — caches, build artifacts, old versions (regenerated automatically)
- **Ask first** — app data, downloaded models, project-specific containers
- **Don't touch** — active project data, running containers, things user hasn't confirmed

**Ask the user about unclear items:**
- Which Docker projects are active vs abandoned?
- Which apps with large data are still in use?
- Is iOS/Xcode development active right now?
- Any large app caches they want to keep (browser cache speeds up daily use)?

### Phase 3: Clean

Only after user confirms each category. Run cleanup commands for confirmed items.

**Docker cleanup commands:**
```bash
# Remove specific stopped containers
docker rm <container_names>

# Remove specific old/duplicate images
docker rmi <image:tag>

# Prune build cache (if confirmed)
docker builder prune -f

# Prune unused volumes (if confirmed)
docker volume prune -f

# Nuclear option (only if user explicitly asks):
# docker system prune -a --volumes -f
```

**Xcode cleanup commands:**
```bash
# Delete all simulators (recreated on next Xcode build)
xcrun simctl delete unavailable
xcrun simctl delete all

# DerivedData (rebuild on next project open)
rm -rf ~/Library/Developer/Xcode/DerivedData/

# Old iOS DeviceSupport (old iOS version symbols)
rm -rf ~/Library/Developer/Xcode/iOS\ DeviceSupport/
```

**Other cleanup commands:**
```bash
# Homebrew cache
brew cleanup --prune=all

# Specific app data (only after user confirms they don't use it)
rm -rf ~/Library/Application\ Support/<app_name>/

# Specific caches (safe but may slow initial page loads)
rm -rf ~/Library/Caches/<app_name>/
```

### Phase 4: Verify

After cleanup, show before/after comparison:

```bash
df -h /
```

Report: "Pred: X GB volnych. Ted: Y GB volnych. Uvolneno ~Z GB."

List what was cleaned with sizes.

## Important Rules

1. **Never delete without asking.** Even "safe" items get presented first.
2. **Never use `docker system prune -a`** unless user explicitly requests it — it kills everything including potentially needed images.
3. **Never touch `~/Projects/`** or active project directories.
4. **Never delete `.env` files, credentials, or SSH keys.**
5. **Identify active vs dead containers** — running/recently used containers and their images are off limits.
6. **Explain consequences** — "this will rebuild on next X" vs "this needs re-download" vs "this is gone forever".
7. **Browser caches** — explain that clearing saves space but slows browsing. Let user decide.
8. **Group by safety level** — present safe items first, questionable items second, with clear labels.

## Common Big Wins (for reference)

These are typical storage hogs on a developer Mac, ordered by usual size:

| Category | Typical Size | Safety |
|---|---|---|
| Docker (images + build cache) | 20-60 GB | Safe to prune old/unused |
| iOS Simulators | 10-30 GB | Safe — recreated on demand |
| Xcode DerivedData | 3-10 GB | Safe — rebuilt on next build |
| Xcode iOS DeviceSupport | 3-8 GB | Safe — old iOS version symbols |
| Homebrew cache | 1-5 GB | Safe — packages already installed |
| npm/pip/CocoaPods cache | 1-5 GB | Safe — re-downloaded on install |
| Xcode Archives | 1-10 GB | Ask — old app builds, may want to keep |
| Application data (Whisper models, AI apps) | varies | Ask — depends on usage |
| ~/.Trash | varies | Safe — already "deleted" |
| ~/Downloads | varies | Ask — user files |
