# CORE PRINCIPLES - Highest Priority

**These rules ALWAYS apply. In case of conflict with other instructions, this wins.**

---

## 1. INSTRUCTION HIERARCHY

In case of conflict between files, this order applies:

```
1. CORE_PRINCIPLES.md (this file)     <- TOP
2. WORKFLOWS.md (how to work)
3. CHECKPOINTS.md (when to ask)
4. Project-specific documentation
5. README files                        <- BOTTOM
```

---

## 2. NEVER AUTO (Always ask BEFORE action)

**Destructive actions (NEVER without confirmation):**
- Modify production code
- Create/delete files
- Create git branches
- Commit changes
- Push to remote
- Merge branches
- Delete branches
- Change dependencies (requirements.txt, pyproject.toml)
- Run database migrations

**How to ask:**
```
"I'm about to modify app/api/products.py. Proceed?"
[Wait for confirmation]
```

---

## 3. ALWAYS DO (Without asking)

**Read-only actions (automatic):**
- Read files
- Analyze code
- Run tests (pytest)
- Run type checker (mypy)
- Search in codebase
- Provide reasoning/explanation
- Create test files (if part of TDD workflow)

---

## 4. VERIFICATION RULES

### 4.1 Hierarchy of proof:

**Level 1: MANDATORY**
```bash
pytest                # MUST pass
mypy app/            # 0 errors
```

**Level 2: RECOMMENDED**
```bash
uvicorn app.main:app  # Server starts
curl /docs           # OpenAPI available
```

### 4.2 False Positive Prevention

**NEVER say "done" without:**
- Test suite output (all tests passed)
- Type check output (0 errors)

**NEVER claim "should work"**
- Only: "Tests passed" or "Tests failed"

---

## 5. MINIMAL CHANGE PRINCIPLE

**Change ONLY files directly related to the task.**

**Rule:**
- 1 file = ideal
- 2-3 files = OK
- 5+ files = ask: "This will affect N files. Proceed?"

---

## 6. TDD IS MANDATORY

**When to write tests FIRST (TDD):**
- New endpoint
- Bug fix
- Business logic change
- Database model change

**When tests are NOT needed:**
- Documentation (.md files)
- Configuration files (.toml, .yaml)

**TDD Cycle:**
```
1. RED:    Write test -> Test fails
2. GREEN:  Implement -> Test passes
3. REFACTOR: Improve code -> Tests still pass
```

---

## 7. GIT WORKFLOW

**NEVER automatically:**
- Create branches
- Commit
- Merge

**ALWAYS ask:**
```
"Task completed. Do you want to:
1. Create branch feature/x?
2. Commit changes?
3. Merge into main?"

[Wait for answer for EACH step]
```

---

## 8. PROJECT-SPECIFIC CRITICAL RULES

**FASTAPI CRITICAL RULES**

### 8.1 Every Endpoint MUST Use Proper Patterns

**Rule:** Use response_model in decorator
```python
# WRONG - No response model
@router.get("/products")
async def get_products(db: DbSession):
    return await db.execute(select(Product)).scalars().all()

# CORRECT - Response model defined
@router.get("/products", response_model=list[ProductResponse])
async def get_products(db: DbSession) -> list[ProductResponse]:
    products = await db.execute(select(Product))
    return products.scalars().all()
```

**Rule:** Use Annotated for dependencies
```python
# WRONG - Old style
@router.get("/")
async def get_products(db: AsyncSession = Depends(get_db)):
    ...

# CORRECT - Annotated style
from typing import Annotated

DbSession = Annotated[AsyncSession, Depends(get_db)]

@router.get("/")
async def get_products(db: DbSession) -> list[ProductResponse]:
    ...
```

---

### 8.2 Pydantic Models MUST Use v2 Syntax

**Rule:** Use ConfigDict, not class Config
```python
# WRONG - Pydantic v1
class ProductResponse(BaseModel):
    class Config:
        orm_mode = True

# CORRECT - Pydantic v2
from pydantic import ConfigDict

class ProductResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
```

**Rule:** Use field_validator, not validator
```python
# WRONG - Pydantic v1
from pydantic import validator

class Product(BaseModel):
    @validator('name')
    def validate_name(cls, v):
        return v.strip()

# CORRECT - Pydantic v2
from pydantic import field_validator

class Product(BaseModel):
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        return v.strip()
```

**Rule:** Use modern union syntax
```python
# WRONG - Old style
from typing import Optional
name: Optional[str] = None

# CORRECT - Python 3.10+ style
name: str | None = None
```

---

### 8.3 Database MUST Use SQLAlchemy 2.0 Async

**Rule:** Use Mapped and mapped_column
```python
# WRONG - SQLAlchemy 1.x
class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True)
    name = Column(String(100))

# CORRECT - SQLAlchemy 2.0
from sqlalchemy.orm import Mapped, mapped_column

class Product(Base):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
```

**Rule:** Use select() not session.query()
```python
# WRONG - Old style
products = session.query(Product).filter(Product.id == 1).first()

# CORRECT - SQLAlchemy 2.0
from sqlalchemy import select

stmt = select(Product).where(Product.id == 1)
result = await session.execute(stmt)
product = result.scalar_one_or_none()
```

**Rule:** Use async session with proper cleanup
```python
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
```

---

### 8.4 Docs-First is MANDATORY

**Before implementing ANY FastAPI feature:**
1. Use `fetch_fastapi_docs(topic)` - Get current patterns
2. Use `fetch_pydantic_docs(topic)` - Get Pydantic v2 syntax
3. Use `fetch_sqlalchemy_docs(topic)` - Get SQLAlchemy 2.0 patterns

**Why:** FastAPI/Pydantic/SQLAlchemy evolve. Always fetch current docs.

**Example:**
```
User: "Create /products endpoint"

AI MUST:
1. fetch_fastapi_docs(topic: "routing")     <- MANDATORY
2. fetch_pydantic_docs(topic: "models")     <- MANDATORY
3. THEN write code using fetched patterns
```

---

## 9. SECURITY RULES

**NEVER in code:**
- API keys
- Passwords
- Tokens
- Credentials
- Database URLs with credentials

**ALWAYS:**
- Environment variables (.env)
- pydantic-settings for config
- No PII in logs
- Input validation with Pydantic

---

## 10. BEHAVIOR ON ERROR

**When something doesn't work:**

1. **STOP** - don't continue implementation
2. **ANALYZE** - what is exact error?
3. **REPORT** - show error message to user
4. **ASK** - "Found problem X. How to proceed?"

---

## 11. GIT BRANCH - ALWAYS FIRST

**MANDATORY RULE:**

Branch is created BEFORE any implementation (before tests, before code).

### CORRECT order:

```
1. User: "Create /products endpoint"

2. Claude:
   "I recommend creating branch:
    - feature/products-endpoint

    Current branch: main

    Create? (yes/no)"

   [WAITS FOR ANSWER]

3. User: "yes"

4. Claude:
   git checkout -b feature/products-endpoint
   Branch created

5. Claude: ONLY THEN start writing tests and implementation
```

---

## QUICK CHECKLIST (before "done")

Before each "Task completed" verify:

- [ ] **Branch created FIRST?**
- [ ] **Docs fetched?** (MANDATORY for FastAPI features)
- [ ] Tests written and passing? (`pytest`)
- [ ] Type check passed? (`mypy app/` -> 0 errors)
- [ ] Changed ONLY relevant files? (Minimal Change)
- [ ] FastAPI patterns correct? (response_model, Annotated)
- [ ] Pydantic v2 syntax? (ConfigDict, field_validator)
- [ ] SQLAlchemy 2.0 syntax? (Mapped, select())
- [ ] No secrets in code?
- [ ] Asked before destructive actions?

**If YES to everything -> "Done"**

**If NO to anything -> Not done, fix it**

---

**Read this? -> Continue to WORKFLOWS.md for detailed guides**
