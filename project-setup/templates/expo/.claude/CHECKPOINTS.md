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
- [ ] Add new package
- [ ] Remove package
- [ ] Update package version

### Configuration
- [ ] Modify app.json
- [ ] Modify tsconfig.json
- [ ] Modify package.json

---

## AUTO (No Need to Ask)

### Read Operations
- [x] Read any file
- [x] Search codebase
- [x] Analyze code structure

### Test Operations
- [x] Run tests (npm test)
- [x] Run linter (npx expo lint)
- [x] Create test files (part of TDD)

### Analysis
- [x] Explain code
- [x] Suggest improvements
- [x] Review code

---

## Decision Examples

### Example 1: New Feature
```
User: "Add ProductCard component"

1. "Create branch feature/product-card?" -> WAIT
2. Read existing components -> AUTO
3. Fetch docs -> AUTO
4. "Create ProductCard.tsx?" -> WAIT
5. "Create ProductCard.test.tsx?" -> WAIT
6. Run tests -> AUTO
7. "Commit changes?" -> WAIT
```

### Example 2: Bug Fix
```
User: "Fix crash in ProductCard"

1. "Create branch fix/product-card-crash?" -> WAIT
2. Read ProductCard.tsx -> AUTO
3. Analyze error -> AUTO
4. "Modify ProductCard.tsx with fix?" -> WAIT
5. Run tests -> AUTO
6. "Commit fix?" -> WAIT
```

### Example 3: Code Review
```
User: "Review ProductCard component"

1. Read file -> AUTO
2. Analyze patterns -> AUTO
3. Provide feedback -> AUTO
4. No changes = No questions needed
```

---

## Scope Questions

### When to ask about scope:
- Changing 5+ files
- Major refactoring
- Breaking changes
- Adding new dependencies

### Format:
```
"This change will affect:
- src/components/ProductCard.tsx
- src/components/ProductList.tsx
- src/stores/productStore.ts
- src/types/product.ts
- __tests__/ProductCard.test.tsx

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
| Run tests | No |
| Run lint | No |
| Git branch | YES |
| Git commit | YES |
| Git push | YES |
| Add package | YES |
| Analyze code | No |
