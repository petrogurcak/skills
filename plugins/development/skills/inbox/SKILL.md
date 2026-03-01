---
name: inbox
description: Fetches and processes items queued from mobile via email (articles, GitHub repos, links, newsletters). Use when user says "inbox", "zkontroluj inbox", "check inbox", "co je noveho", or at session start to review new items. NOT for general email management or reading unrelated emails.
metadata:
  author: Petr
  version: 1.1.0
---

# Inbox — Mobile-to-Claude Queue

Process items sent from mobile via email. Articles, GitHub repos, links, newsletters — anything worth reviewing.

## Process

### 1. Fetch new emails

```bash
python3 ~/.claude/scripts/inbox-fetch.py
```

### 2. Load queue

Read `~/.claude/inbox/queue.json` and show summary:

```
Inbox: X novych polozek (Y articles, Z newsletters)

1. [subject] — 2 URLs
2. [subject] — newsletter (15 URLs)
3. [subject] — 1 URL + poznamka
```

### 3. Classify each item

Before processing, classify each item:

**Newsletter detection** — item is a newsletter if ANY of:

- Body > 500 chars AND 3+ URLs
- Subject contains: newsletter, weekly, digest, roundup, briefing, issue #, issue No
- Known newsletter sender (learn from past items)
- Multiple distinct article links with short descriptions

**Regular items** — everything else (single article, repo, pasted text, note)

### 4. Process newsletters (AUTO-FILTER MODE)

Newsletters do NOT use the interactive per-item flow. Instead:

1. Read `~/.claude/NOW.md` for current projects, interests, and queue
2. Read the newsletter body in full
3. For links that look relevant, fetch them (WebFetch) to verify
4. **Filter ruthlessly** using these criteria:
   - Directly relevant to our active projects (menu-editor, shiftstreak, hr, erp, agents, skills)
   - Relevant to our tech stack (Nette, PHP, Python, Expo, React Native, Flutter, Claude API)
   - Relevant to our interests (SaaS, AI agents, gastro tech, automation, productivity)
   - Genuinely novel insight or pattern (not rehashed advice)
5. **Kill:** SEO spam, AI hype without substance, "10 things" listicles, product announcements for tools we don't use, generic tutorials
6. Output a brief:

```
Newsletter: [name/subject]

Relevantni:
- [Title](url) — 1-2 sentence why it matters for us
- [Title](url) — 1-2 sentence why it matters for us

Zbytek (X items): skip — [one-line reason, e.g. "generic AI news, nothing actionable"]
```

7. Ask user: "Chces neco z toho rozebrat vic, nebo je brief dostatecny?"
8. Mark as processed

### 5. Process regular items (INTERACTIVE MODE)

For each non-newsletter item, based on content type:

**URL to article/blog:**

- Fetch and read the content (WebFetch)
- Summarize key takeaways (2-3 bullets)
- Ask: "Je tu neco pro nas? Chces to ulozit do know-how?"

**GitHub repo:**

- Fetch README (WebFetch)
- Summarize what it does, tech stack, why it might be useful
- Ask: "Chces to prozkoumat vic?"

**Pasted text (paywalled article):**

- Summarize key points
- Extract actionable insights
- Ask: "Co z toho pouzijeme?"

**URL + user note (subject line):**

- The subject line is the user's context/question
- Process the URL with that question in mind

### 6. After processing each regular item

Ask user what to do:

- **Ulozit** — save insight to memory or project knowledge
- **Preskocit** — mark as processed, move on
- **Prozkoumat vic** — deep dive into the content

Update item status in queue.json to "processed" when done.

### 7. Cleanup

After all items processed:

```bash
python3 ~/.claude/scripts/inbox-fetch.py --clear
```

## Queue Item Format

```json
{
  "id": "abc12345",
  "date": "2026-02-20T21:30:00",
  "subject": "User's note or email subject",
  "from": "sender@example.com",
  "urls": ["https://..."],
  "body": "Full text content (max 5000 chars)",
  "status": "new|processed|skipped"
}
```

## Setup

1. Create email address on your domain (Google Workspace)
2. Generate App Password: Google Admin → Security → App Passwords
3. Fill in `~/.claude/inbox/config.json`:
   ```json
   {
     "email": "your@domain.com",
     "app_password": "xxxx xxxx xxxx xxxx",
     "imap_server": "imap.gmail.com",
     "imap_port": 993
   }
   ```
4. Test: `python3 ~/.claude/scripts/inbox-fetch.py`
5. Subscribe to newsletters using `claudecode@etapa20.cz`

## Commands

- `inbox` / `zkontroluj inbox` — fetch + process queue
- `inbox --list` — just show what's in queue without fetching
