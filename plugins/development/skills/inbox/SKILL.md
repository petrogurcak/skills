---
name: inbox
description: Fetches and processes items queued from mobile via email (articles, GitHub repos, links). Use when user says "inbox", "zkontroluj inbox", "check inbox", "co je noveho", or at session start to review new items. NOT for general email management or reading unrelated emails.
metadata:
  author: Petr
  version: 1.0.0
---

# Inbox — Mobile-to-Claude Queue

Process items sent from mobile via email. Articles, GitHub repos, links — anything worth reviewing.

## Process

### 1. Fetch new emails

```bash
python3 ~/.claude/scripts/inbox-fetch.py
```

### 2. Load queue

Read `~/.claude/inbox/queue.json` and show summary:

```
Inbox: X novych polozek

1. [subject] — 2 URLs
2. [subject] — text (1200 znaku)
3. [subject] — 1 URL + poznamka
```

### 3. Process each item

For each item, based on content type:

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

### 4. After processing each item

Ask user what to do:

- **Ulozit** — save insight to memory or project knowledge
- **Preskocit** — mark as processed, move on
- **Prozkoumat vic** — deep dive into the content

Update item status in queue.json to "processed" when done.

### 5. Cleanup

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

## Commands

- `inbox` / `zkontroluj inbox` — fetch + process queue
- `inbox --list` — just show what's in queue without fetching
