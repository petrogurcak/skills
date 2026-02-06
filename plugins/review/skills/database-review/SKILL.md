---
name: database-review
description: SQL/ORM patterns review - N+1 queries, indexy, transactions, connection management
context: fork
agent: Explore
---

# Database Review

## Kdy pouzit
- Jako soucast deep-review
- Performance problemy
- Nove database queries
- Before scaling

## Checklist

### N+1 Queries

**Problem:**
```python
# N+1 - jeden query + N queries pro relationships
users = db.query(User).all()
for user in users:
    print(user.posts)  # Query pro kazdeho usera!
```

**Fix:**
```python
# Eager loading - 2 queries total
users = db.query(User).options(selectinload(User.posts)).all()
```

**Checklist:**
- [ ] Eager loading pro relationships
- [ ] selectinload/joinedload (SQLAlchemy)
- [ ] prefetch_related (Django)
- [ ] ->with() (Laravel/Eloquent)

### Indexy

**Checklist:**
- [ ] WHERE columns maji index
- [ ] JOIN columns maji index
- [ ] ORDER BY columns (pokud caste)
- [ ] Composite index pro multi-column WHERE
- [ ] EXPLAIN na pomale queries

**Neindexovat:**
- Low cardinality columns (boolean, status s 3 hodnotami)
- Columns ktere se casto updatuji
- Male tabulky (< 1000 rows)

### Transactions

**Checklist:**
- [ ] Atomic operace v transakci
- [ ] Rollback on error
- [ ] Transakce nejsou prilis dlouhe
- [ ] Deadlock handling

```python
# Spravne
async with session.begin():
    session.add(order)
    session.add(payment)
    # Obe nebo nic
```

### Connection Management

**Checklist:**
- [ ] Connection pooling (ne new connection per request)
- [ ] Pool size odpovida load
- [ ] Timeouts nastavene
- [ ] Connections vracene do poolu

### Query Patterns

**Checklist:**
- [ ] LIMIT na velke datasety
- [ ] No SELECT * (explicit columns)
- [ ] Cursor pagination pro velke sety
- [ ] Batch inserts (ne jednotlive)

## Quick Reference

| Issue | Severity | Detection |
|-------|----------|-----------|
| N+1 queries | HIGH | Slow page, many queries in logs |
| Missing index | HIGH | EXPLAIN shows seq scan |
| No transaction | MEDIUM | Partial data on error |
| SELECT * | LOW | Unnecessary data transfer |
