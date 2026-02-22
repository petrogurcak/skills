---
name: api-design-review
description: Reviews REST API design for conventions, error handling, versioning, pagination, and rate limiting. Use when reviewing API endpoints, designing new APIs, auditing existing REST services, or as part of deep-review. Trigger phrases include "review my API", "check API design", "API audit", "review endpoints". Not for GraphQL or gRPC reviews — focused on REST only.
metadata:
  author: Petr
  version: 1.0.0
context: fork
agent: Explore
---

# API Design Review

## Kdy pouzit

- Jako soucast deep-review
- Nove API endpoints
- API refactoring
- Before public API release

## Checklist

### REST Conventions

**URLs:**

- [ ] Nouns for resources (`/users`, ne `/getUsers`)
- [ ] Plural (`/users/123`, ne `/user/123`)
- [ ] Lowercase, hyphen-separated (`/user-profiles`)
- [ ] Max 2 levels nesting (`/users/123/posts`)

**HTTP Methods:**
| Method | Use | Response |
|--------|-----|----------|
| GET | Read | 200 + data |
| POST | Create | 201 + created |
| PUT | Full update | 200 + updated |
| PATCH | Partial update | 200 + updated |
| DELETE | Remove | 204 no content |

### Response Format

**Consistent envelope:**

```json
{
  "data": {},
  "meta": { "page": 1, "total": 100 },
  "error": null
}
```

**Error response:**

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Email is required",
    "details": [{ "field": "email", "message": "Required" }]
  }
}
```

**Checklist:**

- [ ] Consistent response structure
- [ ] HTTP status codes spravne
- [ ] Error messages user-friendly
- [ ] No stack traces v produkci

### Pagination

**Checklist:**

- [ ] Default limit (napr. 20)
- [ ] Max limit (napr. 100)
- [ ] Total count v response
- [ ] Cursor-based pro velke sety

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "per_page": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

### Versioning

**Checklist:**

- [ ] Version v URL (`/v1/users`) nebo header
- [ ] Deprecation warnings
- [ ] Migration guide pro breaking changes

### Rate Limiting

**Checklist:**

- [ ] Limits nastavene (napr. 100/min)
- [ ] Headers v response:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`
- [ ] 429 response s `Retry-After`

### Authentication

**Checklist:**

- [ ] Auth na vsech non-public endpoints
- [ ] Bearer token v Authorization header
- [ ] 401 pro missing/invalid token
- [ ] 403 pro insufficient permissions

## Quick Reference

| Issue               | Severity | Example                     |
| ------------------- | -------- | --------------------------- |
| No auth             | CRITICAL | Sensitive endpoint public   |
| Inconsistent errors | MEDIUM   | Different error formats     |
| No pagination       | MEDIUM   | Returns 10k items           |
| No rate limit       | MEDIUM   | DoS vulnerable              |
| Verbs in URLs       | LOW      | /getUsers instead of /users |
