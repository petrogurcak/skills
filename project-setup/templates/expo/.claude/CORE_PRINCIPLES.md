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
- Change dependencies (package.json)

**How to ask:**
```
"I'm about to modify src/components/ProductCard.tsx. Proceed?"
[Wait for confirmation]
```

---

## 3. ALWAYS DO (Without asking)

**Read-only actions (automatic):**
- Read files
- Analyze code
- Run tests (read-only)
- Search in codebase
- Provide reasoning/explanation
- Create test files (if part of TDD workflow)

---

## 4. VERIFICATION RULES

### 4.1 Hierarchy of proof:

**Level 1: MANDATORY**
```bash
npm test           # MUST pass
npx expo lint      # 0 errors
```

**Level 2: RECOMMENDED**
```bash
npx expo start     # Verify app runs
```

**Level 3: OPTIONAL**
```bash
npm run build      # Production build
```

### 4.2 False Positive Prevention

**NEVER say "done" without:**
- Test suite output (all tests passed)
- Lint output (0 errors)

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
- New feature
- Bug fix
- Business logic change
- API change

**When tests are NOT needed:**
- Documentation (.md files)
- Configuration files (.json, .yaml)

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

**EXPO/REACT NATIVE CRITICAL RULES**

### 8.1 Every Component MUST Use Proper Patterns

**Rule:** Functional components with TypeScript
```tsx
// WRONG - Class component
class ProductCard extends React.Component { ... }

// CORRECT - Functional with types
interface ProductCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

export function ProductCard({ title, price, imageUrl }: ProductCardProps) {
  return (
    <View style={styles.container}>
      <Image source={imageUrl} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
```

**Rule:** StyleSheet.create for performance
```tsx
// WRONG - Inline styles
<View style={{ padding: 16, backgroundColor: '#fff' }}>

// CORRECT - StyleSheet
const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
});

<View style={styles.container}>
```

**Rule:** Memoization for performance
```tsx
// WRONG - Recreating callbacks on every render
<Button onPress={() => handlePress(item.id)} />

// CORRECT - useCallback for stability
const handleItemPress = useCallback((id: string) => {
  navigation.navigate('Details', { id });
}, [navigation]);
```

---

### 8.2 State Management MUST Follow Pattern

**Rule:** Use consistent pattern (Zustand recommended)
```tsx
// CORRECT - Zustand store
import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
}));
```

**Rule:** Handle loading and error states
```tsx
// WRONG - No loading state
const [data, setData] = useState(null);

// CORRECT - All states handled
const [data, setData] = useState<Product[] | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);
```

---

### 8.3 Navigation MUST Use Expo Router

**Rule:** File-based routing
```
app/
├── _layout.tsx      # Root layout
├── index.tsx        # Home (/)
├── (tabs)/
│   ├── _layout.tsx  # Tab layout
│   ├── index.tsx    # Tab home
│   └── profile.tsx  # /profile
└── product/
    └── [id].tsx     # /product/123
```

**Rule:** Type-safe navigation
```tsx
// CORRECT - Typed params
import { useLocalSearchParams } from 'expo-router';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  // ...
}
```

---

### 8.4 Docs-First is MANDATORY

**Before implementing ANY Expo/RN feature:**
1. Use `fetch_rn_docs(topic)` - Get React Native patterns
2. Use `fetch_expo_sdk(module)` - Get Expo module docs
3. Use `fetch_expo_router(topic)` - Get navigation patterns

**Why:** Expo SDK evolves rapidly. Always fetch current docs.

**Example:**
```
User: "Create ProductCard with expo-image"

AI MUST:
1. fetch_rn_docs(topic: "View")           <- MANDATORY
2. fetch_expo_sdk(module: "expo-image")   <- MANDATORY
3. THEN write code using fetched patterns
```

---

## 9. SECURITY RULES

**NEVER in code:**
- API keys
- Passwords
- Tokens
- Credentials

**ALWAYS:**
- Environment variables (.env)
- expo-secure-store for sensitive data
- No PII in logs

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
1. User: "Create ProductCard component"

2. Claude:
   "I recommend creating branch:
    - feature/product-card

    Current branch: main

    Create? (yes/no)"

   [WAITS FOR ANSWER]

3. User: "yes"

4. Claude:
   git checkout -b feature/product-card
   Branch created

5. Claude: ONLY THEN start writing tests and implementation
```

---

## QUICK CHECKLIST (before "done")

Before each "Task completed" verify:

- [ ] **Branch created FIRST?**
- [ ] **Docs fetched?** (MANDATORY for Expo features)
- [ ] Tests written and passing? (`npm test`)
- [ ] Lint passed? (`npx expo lint` -> 0 errors)
- [ ] Changed ONLY relevant files? (Minimal Change)
- [ ] TypeScript strict? (no `any`, proper types)
- [ ] StyleSheet used? (no inline styles)
- [ ] Performance optimized? (memo, useCallback)
- [ ] No secrets in code?
- [ ] Asked before destructive actions?

**If YES to everything -> "Done"**

**If NO to anything -> Not done, fix it**

---

**Read this? -> Continue to WORKFLOWS.md for detailed guides**
