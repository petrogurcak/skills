---
name: security-review
description: Performs OWASP Top 10 security audit on code — checks for SQL injection, XSS, CSRF, broken authentication, sensitive data exposure, and access control issues. Use when reviewing code before deploy, after adding auth or payment features, during security audits, or as part of deep-review. Trigger phrases include "security check", "review for vulnerabilities", "security audit", "check for injection". Not for infrastructure/DevOps security, network configuration, or cloud IAM reviews — focused on application-level code security.
metadata:
  author: Petr
  version: 1.0.0
context: fork
agent: Explore
---

# Security Review

## Kdy pouzit

- Jako soucast deep-review
- Pred deployem do produkce
- Po pridani auth/payment/sensitive features
- Security audit

## OWASP Top 10 Checklist

### 1. Injection (SQL, NoSQL, OS Command)

**Python/SQLAlchemy:**

```python
# VULNERABLE
query = f"SELECT * FROM users WHERE id = {user_id}"

# SAFE
query = select(User).where(User.id == user_id)
```

**PHP/Nette Database:**

```php
// VULNERABLE
$db->query("SELECT * FROM users WHERE id = $id");

// SAFE
$db->table('users')->where('id', $id);
```

**Checklist:**

- [ ] Zadny string concat v SQL
- [ ] Parameterized queries vsude
- [ ] ORM pouziva spravne
- [ ] No shell=True s user inputem

### 2. Broken Authentication

**Checklist:**

- [ ] Passwords: bcrypt/argon2 (ne MD5/SHA1)
- [ ] Session tokens: httpOnly, secure, sameSite
- [ ] JWT: kratka expirace, refresh tokens
- [ ] Rate limiting na login (max 5 attempts)
- [ ] Logout invaliduje session

### 3. Sensitive Data Exposure

**Checklist:**

- [ ] No secrets in code (use env vars)
- [ ] No secrets in logs
- [ ] HTTPS everywhere
- [ ] PII encrypted at rest
- [ ] Passwords never in plaintext

### 4. XSS (Cross-Site Scripting)

**Checklist:**

- [ ] Output escaping (framework default)
- [ ] CSP headers nastavene
- [ ] No innerHTML s user input
- [ ] No eval() s user input

**Latte (auto-escaped):**

```latte
{$userInput}           {* auto-escaped *}
{$userInput|noescape}  {* DANGEROUS *}
```

### 5. Broken Access Control

**Checklist:**

- [ ] Kazdy endpoint overuje permissions
- [ ] No IDOR (user muze pristoupit jen ke svym datum)
- [ ] Admin endpointy chranene
- [ ] Principle of least privilege

### 6. Security Misconfiguration

**Checklist:**

- [ ] Debug mode OFF v produkci
- [ ] Default credentials zmenene
- [ ] Error messages neleakuji stack traces
- [ ] CORS spravne nastaveny

### 7. CSRF

**Checklist:**

- [ ] CSRF tokens na POST/PUT/DELETE
- [ ] SameSite cookies
- [ ] Double-submit cookie pattern

## Quick Reference

| Vulnerability       | Severity | Quick Fix             |
| ------------------- | -------- | --------------------- |
| SQL Injection       | CRITICAL | Parameterized queries |
| Hardcoded secrets   | CRITICAL | Environment variables |
| No auth on endpoint | CRITICAL | Add auth middleware   |
| XSS                 | HIGH     | Enable auto-escaping  |
| No CSRF             | HIGH     | Add CSRF tokens       |
| Weak password hash  | HIGH     | Use bcrypt            |
