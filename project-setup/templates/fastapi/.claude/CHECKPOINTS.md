# Checkpoints - When to Ask vs Auto

## ALWAYS ASK (Never Auto)

### Git Operations
- [ ] Create branch
- [ ] Commit changes
- [ ] Push to remote
- [ ] Merge branches
- [ ] Delete branches

### File Operations
- [ ] Create new files
- [ ] Delete files
- [ ] Modify existing production code

### Dependencies
- [ ] Add new package to requirements.txt
- [ ] Remove package
- [ ] Update package version

### Database
- [ ] Create migration
- [ ] Apply migration
- [ ] Rollback migration
- [ ] Modify database schema

### Configuration
- [ ] Modify pyproject.toml
- [ ] Modify alembic.ini
- [ ] Modify .env files

---

## AUTO (No Need to Ask)

### Read Operations
- [x] Read any file
- [x] Search codebase
- [x] Analyze code structure

### Test Operations
- [x] Run tests (pytest)
- [x] Run type checker (mypy)
- [x] Create test files (part of TDD)

### Analysis
- [x] Explain code
- [x] Suggest improvements
- [x] Review code

---

## Decision Examples

### Example 1: New Endpoint
```
User: "Add /products endpoint"

1. "Create branch feature/products-endpoint?" -> WAIT
2. Read existing code -> AUTO
3. Fetch docs -> AUTO
4. "Create app/api/products.py?" -> WAIT
5. "Create tests/test_products.py?" -> WAIT
6. Run pytest -> AUTO
7. "Commit changes?" -> WAIT
```

### Example 2: Bug Fix
```
User: "Fix 500 error on /products/123"

1. "Create branch fix/products-error?" -> WAIT
2. Read products.py -> AUTO
3. Analyze error -> AUTO
4. "Modify app/api/products.py with fix?" -> WAIT
5. Run pytest -> AUTO
6. "Commit fix?" -> WAIT
```

### Example 3: Code Review
```
User: "Review products endpoint"

1. Read file -> AUTO
2. Analyze patterns -> AUTO
3. Run mypy -> AUTO
4. Provide feedback -> AUTO
5. No changes = No questions needed
```

---

## Scope Questions

### When to ask about scope:
- Changing 5+ files
- Major refactoring
- Breaking changes
- Adding new dependencies
- Database schema changes

### Format:
```
"This change will affect:
- app/api/products.py
- app/models/product.py
- app/schemas/product.py
- tests/test_products.py
- alembic/versions/xxx.py

5 files total. Proceed?"
```

---

## Quick Reference

| Action | Ask? |
|--------|------|
| Read file | No |
| Create file | YES |
| Delete file | YES |
| Modify file | YES |
| Run pytest | No |
| Run mypy | No |
| Git branch | YES |
| Git commit | YES |
| Git push | YES |
| Add package | YES |
| Create migration | YES |
| Apply migration | YES |
| Analyze code | No |
