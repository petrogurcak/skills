# Development Workflows

## TDD Workflow (Features)

### Phase 0: Branch Creation (MANDATORY FIRST)

```bash
git checkout -b feature/[name]
```

### Phase 1: RED - Write Failing Test

```python
# tests/test_products.py
import pytest
from httpx import AsyncClient, ASGITransport

@pytest.mark.asyncio
async def test_get_products(client: AsyncClient):
    response = await client.get("/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_create_product(client: AsyncClient, auth_headers: dict):
    payload = {"name": "Test Product", "price": 29.99}
    response = await client.post(
        "/products/",
        json=payload,
        headers=auth_headers,
    )
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test Product"
```

Run test:
```bash
pytest tests/test_products.py
# Expected: FAIL (endpoint doesn't exist yet)
```

### Phase 2: GREEN - Implement to Pass

```python
# app/api/products.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Annotated

from app.db import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductResponse

router = APIRouter(prefix="/products", tags=["products"])

DbSession = Annotated[AsyncSession, Depends(get_db)]

@router.get("/", response_model=list[ProductResponse])
async def get_products(
    db: DbSession,
    skip: int = 0,
    limit: int = 100,
) -> list[ProductResponse]:
    """Get all products with pagination."""
    result = await db.execute(
        select(Product).offset(skip).limit(limit)
    )
    return result.scalars().all()

@router.post("/", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    db: DbSession,
    product: ProductCreate,
) -> ProductResponse:
    """Create a new product."""
    db_product = Product(**product.model_dump())
    db.add(db_product)
    await db.flush()
    return db_product
```

Run test:
```bash
pytest tests/test_products.py
# Expected: PASS
```

### Phase 3: REFACTOR - Improve

- Add error handling
- Add logging
- Optimize queries

### Phase 4: Verify

```bash
pytest                    # All tests pass
mypy app/                 # 0 errors
uvicorn app.main:app      # Server starts
```

### Phase 5: Commit (ASK FIRST)

```
"Tests pass, type check clean. Commit with message:
'feat(products): add GET and POST endpoints'?"
```

---

## Bug Fix Workflow

### Step 0: Branch Creation (MANDATORY FIRST)

```bash
git checkout -b fix/[bug-name]
```

### Step 1: Reproduce with Test

```python
@pytest.mark.asyncio
async def test_product_not_found_returns_404(client: AsyncClient):
    # This test reproduces the bug
    response = await client.get("/products/99999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Product not found"
```

Run test:
```bash
pytest tests/test_products.py::test_product_not_found_returns_404
# Expected: FAIL (bug confirmed)
```

### Step 2: Fix Bug

```python
@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    db: DbSession,
    product_id: int,
) -> ProductResponse:
    product = await db.get(Product, product_id)
    if product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    return product
```

### Step 3: Verify

```bash
pytest                    # All tests pass
mypy app/                 # 0 errors
```

### Step 4: Commit (ASK FIRST)

```
"Bug fixed, tests pass. Commit with message:
'fix(products): return 404 for missing product'?"
```

---

## Database Migration Workflow

### Step 1: Create Migration (ASK FIRST)

```bash
alembic revision --autogenerate -m "add products table"
```

### Step 2: Review Migration

```python
# alembic/versions/xxx_add_products_table.py
def upgrade() -> None:
    op.create_table(
        'products',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

def downgrade() -> None:
    op.drop_table('products')
```

### Step 3: Apply Migration (ASK FIRST)

```bash
alembic upgrade head
```

---

## Pydantic Model Workflow

### Step 1: Fetch Documentation (MANDATORY)

```
fetch_pydantic_docs(topic: "models")
fetch_pydantic_docs(topic: "validators")
```

### Step 2: Define Models

```python
# app/schemas/product.py
from pydantic import BaseModel, ConfigDict, Field, field_validator

class ProductBase(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    price: float = Field(gt=0)
    description: str | None = None

class ProductCreate(ProductBase):
    @field_validator('name')
    @classmethod
    def validate_name(cls, v: str) -> str:
        return v.strip().title()

class ProductUpdate(BaseModel):
    name: str | None = None
    price: float | None = Field(default=None, gt=0)
    description: str | None = None

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
```

---

## Commands Reference

```bash
# Development
uvicorn app.main:app --reload    # Start dev server
uvicorn app.main:app --port 8001 # Different port

# Testing
pytest                           # Run all tests
pytest tests/test_products.py    # Run specific file
pytest -v                        # Verbose output
pytest --cov=app                 # With coverage

# Type checking
mypy app/                        # Check all app code
mypy app/api/products.py         # Check specific file

# Database
alembic upgrade head             # Apply migrations
alembic downgrade -1             # Rollback one
alembic revision --autogenerate -m "message"  # Create migration

# Dependencies
pip install -r requirements.txt  # Install deps
pip freeze > requirements.txt    # Update deps

# Formatting (if configured)
black app/ tests/                # Format code
ruff check app/                  # Lint code
```

---

## Verification Checklist

Before marking task as done:

```bash
# 1. Tests pass
pytest

# 2. Type check clean
mypy app/

# 3. Server runs
uvicorn app.main:app --reload
# Check http://localhost:8000/docs
```

Only after ALL pass -> "Done"
