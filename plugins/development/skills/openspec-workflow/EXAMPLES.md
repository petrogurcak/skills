# OpenSpec Workflow Skill - Examples

Concrete examples of how Claude Code uses the OpenSpec workflow skill for different scenarios.

## Example 1: User Authentication (Full Workflow)

### User Request
```
Add user authentication with email/password to the application
```

### Claude Code Response (Using Skill)

**Recognition & Announcement:**
```
I'm using the OpenSpec workflow to establish clear specifications for user authentication before implementation.

This is a complex feature requiring multiple steps (registration, login, session management), so we'll use OpenSpec to align on specs first.
```

**Stage 1: Draft Proposal**

Claude Code creates `openspec/changes/user-authentication/proposal.md`:

```markdown
# User Authentication

## Problem
The application currently has no user authentication, preventing personalized
features and creating security risks. We need a way to identify and authenticate
users.

## Proposed Solution
Implement JWT-based authentication with email/password login. Users will register
with email and password, receive a JWT token on login, and use that token to
access protected endpoints.

## Scope

### Included
- User registration with email/password validation
- Login endpoint returning JWT token
- Password hashing with bcrypt
- Protected route middleware
- Logout functionality (token invalidation)

### Explicitly Excluded
- Social login (OAuth) - future enhancement
- Password reset/recovery - separate change
- Multi-factor authentication - future enhancement
- Email verification - separate change

## Success Criteria
1. Users can register with valid email and password
2. Users can login and receive JWT token valid for 24 hours
3. Protected routes reject requests without valid token
4. Passwords are hashed and never stored in plain text
5. Users can logout and invalidate their token
```

**Stage 2: Create Spec Delta**

Claude Code creates `openspec/changes/user-authentication/specs/auth/spec.md`:

```markdown
## ADDED Requirements

### Requirement: User Registration

The system SHALL allow new users to register with email and password.
Passwords MUST be hashed using bcrypt with salt rounds >= 10.
Email addresses MUST be unique and validated for format.

#### Scenario: Successful Registration

**Given:** User provides email "user@example.com" and password "SecurePass123!"
**When:** User submits registration request
**Then:** System creates user account with hashed password and returns 201 status

#### Scenario: Duplicate Email

**Given:** Email "user@example.com" already exists in database
**When:** User attempts registration with that email
**Then:** System returns 409 status with error "Email already registered"

#### Scenario: Invalid Email Format

**Given:** User provides email "not-an-email"
**When:** User submits registration request
**Then:** System returns 400 status with error "Invalid email format"

#### Scenario: Weak Password

**Given:** User provides password "123"
**When:** User submits registration request
**Then:** System returns 400 status with error "Password must be at least 8 characters"

### Requirement: User Login

The system SHALL authenticate users with email and password,
returning a JWT token on success.

#### Scenario: Valid Credentials

**Given:** User with email "user@example.com" and password "SecurePass123!" exists
**When:** User submits login request with correct credentials
**Then:** System returns 200 status with JWT token valid for 24 hours

#### Scenario: Invalid Password

**Given:** User with email "user@example.com" exists
**When:** User submits login request with incorrect password
**Then:** System returns 401 status with error "Invalid credentials"

#### Scenario: Non-existent User

**Given:** No user with email "ghost@example.com" exists
**When:** User submits login request
**Then:** System returns 401 status with error "Invalid credentials"

### Requirement: Protected Routes

The system SHALL require valid JWT token for protected endpoints.

#### Scenario: Valid Token

**Given:** User has valid JWT token in Authorization header
**When:** User requests protected endpoint
**Then:** System allows access and processes request

#### Scenario: Missing Token

**Given:** User makes request without Authorization header
**When:** User requests protected endpoint
**Then:** System returns 401 status with error "Authentication required"

#### Scenario: Expired Token

**Given:** User has JWT token issued 25 hours ago
**When:** User requests protected endpoint
**Then:** System returns 401 status with error "Token expired"
```

**Stage 3: Create Task Breakdown**

Claude Code creates `openspec/changes/user-authentication/tasks.md`:

```markdown
# User Authentication - Implementation Tasks

## Task 1: User Model and Database Schema
**Status:** pending
**References:** specs/auth/spec.md - Requirement: User Registration

### Subtasks
- [ ] Create User model with fields: id, email, passwordHash, createdAt, updatedAt
- [ ] Write database migration for users table
- [ ] Add unique index on email column
- [ ] Add email validation at model level

## Task 2: Password Hashing Utility
**Status:** pending
**References:** specs/auth/spec.md - Requirement: User Registration

### Subtasks
- [ ] Create hashPassword(password: string) function using bcrypt (10 rounds)
- [ ] Create verifyPassword(password: string, hash: string) function
- [ ] Write tests for password hashing and verification

## Task 3: Registration Endpoint
**Status:** pending
**References:** specs/auth/spec.md - Requirement: User Registration

### Subtasks
- [ ] Create POST /api/auth/register endpoint
- [ ] Validate email format (regex or library)
- [ ] Validate password strength (min 8 chars)
- [ ] Check for duplicate email
- [ ] Hash password before storing
- [ ] Return 201 on success, appropriate errors on failure
- [ ] Write integration tests covering all scenarios

## Task 4: JWT Utility Functions
**Status:** pending
**References:** specs/auth/spec.md - Requirement: User Login

### Subtasks
- [ ] Create generateToken(userId: string) function (24h expiry)
- [ ] Create verifyToken(token: string) function
- [ ] Configure JWT secret from environment variable
- [ ] Write tests for token generation and verification

## Task 5: Login Endpoint
**Status:** pending
**References:** specs/auth/spec.md - Requirement: User Login

### Subtasks
- [ ] Create POST /api/auth/login endpoint
- [ ] Look up user by email
- [ ] Verify password using verifyPassword utility
- [ ] Generate JWT token on success
- [ ] Return 200 with token or 401 on failure
- [ ] Write integration tests covering all scenarios

## Task 6: Authentication Middleware
**Status:** pending
**References:** specs/auth/spec.md - Requirement: Protected Routes

### Subtasks
- [ ] Create requireAuth middleware
- [ ] Extract token from Authorization header
- [ ] Verify token using verifyToken utility
- [ ] Attach user info to request object
- [ ] Return 401 on missing/invalid/expired token
- [ ] Write tests for middleware

## Task 7: Logout Endpoint (Token Invalidation)
**Status:** pending
**References:** specs/auth/spec.md - Requirement: User Login (logout)

### Subtasks
- [ ] Decide on token invalidation approach (blacklist or short expiry)
- [ ] Create POST /api/auth/logout endpoint
- [ ] Implement token invalidation
- [ ] Write tests for logout functionality
```

**Stage 3: Implementation with TDD**

For each task, Claude Code follows TDD:

```typescript
// Task 3: Registration Endpoint
// RED: Write failing test

import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../app';

describe('POST /api/auth/register', () => {
  test('registers new user with valid email and password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'SecurePass123!'
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('rejects registration with duplicate email', async () => {
    // Setup: Create existing user
    await request(app)
      .post('/api/auth/register')
      .send({
        email: 'existing@example.com',
        password: 'SecurePass123!'
      });

    // Test: Attempt duplicate registration
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'existing@example.com',
        password: 'AnotherPass456!'
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe('Email already registered');
  });

  test('rejects registration with invalid email format', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'not-an-email',
        password: 'SecurePass123!'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid email format');
  });

  test('rejects registration with weak password', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'user@example.com',
        password: '123'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Password must be at least 8 characters');
  });
});

// Verify RED: Run tests, watch them fail
// GREEN: Implement minimal code to pass
// Verify GREEN: Run tests, watch them pass
// REFACTOR: Clean up code
// Mark Task 3 complete
```

**Stage 4: Archive**

After all tasks complete and tests pass:

```bash
openspec archive user-authentication
```

**Stage 5: Update Source Specs**

Merge `openspec/changes/archive/user-authentication/specs/auth/spec.md` into `openspec/specs/auth/spec.md`.

---

## Example 2: Bug Fix (Skip OpenSpec)

### User Request
```
Fix the typo in the error message - it says "Emai required" instead of "Email required"
```

### Claude Code Response (Not Using Skill)

```
This is a trivial fix (single character change), so I won't use OpenSpec.
I'll make the change directly:
```

**Rationale:** Single-line typo fix doesn't need specs.

---

## Example 3: Shopping Cart Feature (Automatic Trigger)

### User Request
```
Add shopping cart functionality - users should be able to add items,
update quantities, remove items, and see the total price
```

### Claude Code Recognition

```
This is a complex feature with multiple components (add, update, remove, calculate total),
so I'm automatically using the OpenSpec workflow to establish specifications first.
```

**Why automatic?**
- Multiple operations (add, update, remove, calculate)
- Requires state management
- Multiple edge cases (empty cart, max quantity, etc.)
- Affects multiple components (UI, state, backend)

### Proposal Created

`openspec/changes/shopping-cart/proposal.md`:

```markdown
# Shopping Cart Feature

## Problem
Users cannot save items for purchase. They must buy immediately or lose
their selection. We need persistent cart functionality for better UX.

## Proposed Solution
Implement in-memory shopping cart (persisted in database) allowing users
to add products, update quantities, remove items, and view total price.

## Scope

### Included
- Add item to cart with quantity
- Update item quantity in cart
- Remove item from cart
- View cart contents with line items and total
- Clear entire cart
- Persist cart to database

### Explicitly Excluded
- Guest cart (requires authentication)
- Cart sharing or wishlists
- Cart expiration
- Inventory reservation
- Checkout process (separate change)

## Success Criteria
1. Users can add products to cart with specified quantity
2. Users can increase/decrease item quantities
3. Users can remove items from cart
4. Cart displays line items with prices and total
5. Cart persists across sessions (database-backed)
6. Cart is user-specific (requires authentication)
```

### Spec Delta with Scenarios

`openspec/changes/shopping-cart/specs/cart/spec.md`:

```markdown
## ADDED Requirements

### Requirement: Add Item to Cart

The system SHALL allow authenticated users to add products to their cart
with a specified quantity.

#### Scenario: Add New Item

**Given:** User is authenticated and cart is empty
**When:** User adds product ID 123 with quantity 2
**Then:** Cart contains product 123 with quantity 2

#### Scenario: Add Existing Item (Increase Quantity)

**Given:** User has product 123 with quantity 2 in cart
**When:** User adds product 123 with quantity 3
**Then:** Cart contains product 123 with quantity 5

#### Scenario: Add with Invalid Quantity

**Given:** User is authenticated
**When:** User adds product 123 with quantity 0
**Then:** System returns error "Quantity must be at least 1"

### Requirement: Update Item Quantity

The system SHALL allow users to update quantity of items in cart.

#### Scenario: Increase Quantity

**Given:** User has product 123 with quantity 2 in cart
**When:** User updates product 123 to quantity 5
**Then:** Cart contains product 123 with quantity 5

#### Scenario: Set Quantity to Zero (Remove)

**Given:** User has product 123 with quantity 2 in cart
**When:** User updates product 123 to quantity 0
**Then:** Cart no longer contains product 123

### Requirement: Calculate Total Price

The system SHALL calculate and display total price of all cart items.

#### Scenario: Multiple Items

**Given:** Cart contains:
  - Product 123 (price $10.00) quantity 2
  - Product 456 (price $25.00) quantity 1
**When:** User views cart
**Then:** Total price displays $45.00
```

---

## Example 4: Refactoring (Use OpenSpec)

### User Request
```
Refactor the payment processing to support multiple payment providers
instead of just Stripe
```

### Claude Code Recognition

```
This refactoring changes external behavior (adds new capability),
so I'm using OpenSpec to specify the new architecture before implementing.
```

**Why use OpenSpec for refactoring?**
- Changes external behavior (supports new providers)
- Affects multiple components
- Needs architectural decisions (interface design)
- Team should review approach before implementation

### Proposal

`openspec/changes/multi-payment-providers/proposal.md`:

```markdown
# Multi-Payment Provider Support

## Problem
Payment processing is tightly coupled to Stripe. Adding new payment providers
(PayPal, Square, etc.) requires forking the codebase. We need abstraction.

## Proposed Solution
Introduce PaymentProvider interface that Stripe, PayPal, and future providers
implement. Refactor existing Stripe code to use interface, then add PayPal.

## Scope

### Included
- Define PaymentProvider interface (charge, refund, getStatus methods)
- Refactor existing Stripe integration to implement interface
- Add PayPal provider implementation
- Add provider selection in checkout flow
- All existing Stripe tests must still pass

### Explicitly Excluded
- Migration of existing Stripe customers to PayPal
- Webhook handling for PayPal (separate change)
- Admin UI for managing providers

## Success Criteria
1. PaymentProvider interface defined with charge, refund, getStatus
2. Stripe provider implements interface (existing tests pass)
3. PayPal provider implements interface with tests
4. Checkout allows selecting payment provider
5. Zero regression in existing Stripe functionality
```

---

## Example 5: Emergency Hotfix (Skip, Document After)

### User Request (Production Down)
```
URGENT: Users getting 500 error on checkout - null pointer in price calculation
```

### Claude Code Response

```
This is an emergency fix. I'll skip OpenSpec for now and fix immediately,
but we'll document the change in OpenSpec after the fix is deployed.

Implementing fix...
[applies fix]

Now let me create OpenSpec documentation for what was changed:
```

**Rationale:** Production emergencies skip process, but document after.

---

## Example 6: Integration with Brainstorming

### User Request
```
We need better search functionality. Not sure if we should use Elasticsearch,
database full-text search, or something else. Can you help design this?
```

### Claude Code Response

```
I'm using the brainstorming skill to explore search approaches,
then we'll use OpenSpec to document the chosen solution.

[Brainstorming happens through Socratic questions]

Based on our discussion, you've chosen: Database full-text search with
PostgreSQL for simplicity and lower operational overhead.

Now I'm using OpenSpec to create the specification before implementing...
```

**Pattern:** Brainstorm → Choose approach → OpenSpec → Implement with TDD

---

## Example 7: Validation Before Archiving

### Claude Code (After Completing Implementation)

```
Implementation complete! Before archiving, let me validate:

Checking verification checklist:

Stage 1 Complete:
✓ Proposal created with problem, solution, scope, success criteria
✓ Change folder structure exists

Stage 2 Complete:
✓ Stakeholders reviewed proposal (your approval)
✓ Feedback incorporated
✓ Explicit approval received
✓ Spec delta created with all requirements
✓ Each requirement has scenario(s)

Stage 3 Complete:
✓ All tasks documented in tasks.md
✓ Each task references spec requirement
✓ All tasks implemented using TDD
✓ All tests passing (verified)
✓ Code reviewed

Now archiving:
```

```bash
openspec archive user-authentication
```

```
Archived! Next step: updating source specs.

Merging openspec/changes/archive/user-authentication/specs/auth/spec.md
into openspec/specs/auth/spec.md...

Source specs updated. User authentication feature complete!
```

---

## Command Usage Examples

### List Active Changes
```bash
$ openspec list
Active changes:
  - user-authentication
  - shopping-cart
  - multi-payment-providers
```

### View Dashboard
```bash
$ openspec view
# Opens interactive dashboard
```

### Show Change Details
```bash
$ openspec show user-authentication

Change: user-authentication
Status: in-progress
Created: 2025-11-20

Proposal: openspec/changes/user-authentication/proposal.md
Tasks: openspec/changes/user-authentication/tasks.md
Specs: openspec/changes/user-authentication/specs/auth/spec.md

Tasks completed: 4/7
```

### Validate Spec Format
```bash
$ openspec validate user-authentication

Validating openspec/changes/user-authentication/specs/auth/spec.md...

✓ All requirements have names
✓ All requirements have at least one scenario
✓ All scenarios have Given/When/Then
✓ Delta sections present (ADDED, MODIFIED, REMOVED)

Validation passed!
```

### Archive Completed Change
```bash
$ openspec archive user-authentication

Moving openspec/changes/user-authentication to openspec/changes/archive/user-authentication

✓ Change archived successfully!

Next step: Merge spec delta into source specs at openspec/specs/
```

---

## Summary

**Use OpenSpec for:**
- Complex features (user auth, shopping cart, search)
- Refactoring changing behavior (multi-provider support)
- Anything requiring team alignment

**Skip OpenSpec for:**
- Typo fixes
- Single-line bug fixes
- Emergencies (document after)

**Always integrate with:**
- TDD for implementation
- Code review after chunks
- Brainstorming for design decisions
