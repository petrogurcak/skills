# Python + FastAPI Development Guide

This project uses FastAPI with Pydantic v2, SQLAlchemy 2.0, and TDD + docs-first principles.

## Quick Start

**Before any code:**
1. Read `.claude/CORE_PRINCIPLES.md` - 11 core principles + FastAPI rules
2. Understand `.claude/WORKFLOWS.md` - TDD workflow with FastAPI
3. Check `.claude/CHECKPOINTS.md` - When to ask

## FastAPI Workflow

**For new features (e.g., "Create /products endpoint"):**
```
1. Git Branch First
   Ask: "Create branch? (yes/no)"

2. Docs-First - MANDATORY
   fetch_fastapi_docs(topic: "routing")
   fetch_pydantic_docs(topic: "models")

3. TDD Cycle
   RED: Write failing test
   GREEN: Implement using docs
   REFACTOR: Improve

4. Verify
   pytest -> All passed
   mypy -> 0 errors
   uvicorn app.main:app -> Server runs

5. Ask to commit
   "Commit? (yes/no)"
```

## Tech Stack

- **Python 3.11+** (3.12+ recommended)
- **FastAPI 0.124+**
- **Pydantic 2.12+** (v2 syntax, v1 is DEPRECATED)
- **SQLAlchemy 2.0.44+** (async)
- **Test**: `pytest` + `pytest-asyncio`
- **Type check**: `mypy`

## MCP Tools (Docs-First)

Available via `fastapi-workflow.skill`:
- `fetch_fastapi_docs(topic)` - routing, dependencies, security
- `fetch_pydantic_docs(topic)` - models, validators, config
- `fetch_sqlalchemy_docs(topic)` - async, relationships, queries
- `search_pypi(package)` - Python packages

## Critical FastAPI Rules

From `.claude/CORE_PRINCIPLES.md` Section 8:

1. **Every endpoint MUST:**
   - Have response_model in decorator
   - Use Annotated[Type, Depends()] for DI
   - Handle errors with proper status codes
   - Have type hints everywhere

2. **Pydantic models MUST:**
   - Use v2 syntax (ConfigDict, not class Config)
   - Use field_validator, not validator
   - Use str | None, not Optional[str]

3. **Database MUST:**
   - Use SQLAlchemy 2.0 async
   - Use Mapped and mapped_column
   - Handle transactions properly

## Active Skills

- **project-setup** - Initial setup (done!)
- **fastapi-workflow** - Development workflows + MANDATORY docs-first

## Documentation

- `.claude/CORE_PRINCIPLES.md` - Complete principles + FastAPI rules
- `.claude/WORKFLOWS.md` - TDD with FastAPI commands
- `.claude/CHECKPOINTS.md` - When to ask

---

**Ready! Try: "Create /products endpoint with CRUD"**
