# Development Workflows

## TDD Workflow (Features)

### Phase 0: Branch Creation (MANDATORY FIRST)

```
git checkout -b feature/[name]
```

### Phase 1: RED - Write Failing Test

```tsx
// __tests__/ProductCard.test.tsx
import { render, screen } from '@testing-library/react-native';
import { ProductCard } from '../src/components/ProductCard';

describe('ProductCard', () => {
  it('displays product title', () => {
    render(<ProductCard title="Test Product" price={29.99} />);
    expect(screen.getByText('Test Product')).toBeTruthy();
  });
});
```

Run test:
```bash
npm test
# Expected: FAIL (component doesn't exist yet)
```

### Phase 2: GREEN - Implement to Pass

```tsx
// src/components/ProductCard.tsx
import { View, Text, StyleSheet } from 'react-native';

interface ProductCardProps {
  title: string;
  price: number;
}

export function ProductCard({ title, price }: ProductCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', borderRadius: 8 },
  title: { fontSize: 16, fontWeight: '600' },
  price: { fontSize: 14, color: '#666' },
});
```

Run test:
```bash
npm test
# Expected: PASS
```

### Phase 3: REFACTOR - Improve

- Add accessibility
- Optimize with memo
- Add more styles

```tsx
import { memo } from 'react';

export const ProductCard = memo(function ProductCard({ title, price }: ProductCardProps) {
  return (
    <View
      style={styles.container}
      accessibilityRole="button"
      accessibilityLabel={`${title}, $${price.toFixed(2)}`}
    >
      {/* ... */}
    </View>
  );
});
```

### Phase 4: Verify

```bash
npm test              # All tests pass
npx expo lint         # 0 errors
npx expo start        # App runs
```

### Phase 5: Commit (ASK FIRST)

```
"Tests pass, lint clean. Commit with message:
'feat(components): add ProductCard component'?"
```

---

## Bug Fix Workflow

### Step 0: Branch Creation (MANDATORY FIRST)

```
git checkout -b fix/[bug-name]
```

### Step 1: Reproduce with Test

```tsx
it('handles empty product title gracefully', () => {
  // This test reproduces the bug
  render(<ProductCard title="" price={0} />);
  expect(screen.getByText('No title')).toBeTruthy();
});
```

Run test:
```bash
npm test
# Expected: FAIL (bug confirmed)
```

### Step 2: Fix Bug

```tsx
export function ProductCard({ title, price }: ProductCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'No title'}</Text>
      {/* ... */}
    </View>
  );
}
```

### Step 3: Verify

```bash
npm test              # All tests pass (including new test)
npx expo lint         # 0 errors
```

### Step 4: Commit (ASK FIRST)

```
"Bug fixed, tests pass. Commit with message:
'fix(ProductCard): handle empty title'?"
```

---

## Expo SDK Module Workflow

When adding new Expo module (camera, image, etc.):

### Step 1: Fetch Documentation (MANDATORY)

```
fetch_expo_sdk(module: "expo-camera")
```

### Step 2: Install Module

```bash
npx expo install expo-camera
```

### Step 3: Configure if Needed

```json
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Allow $(PRODUCT_NAME) to access camera"
        }
      ]
    ]
  }
}
```

### Step 4: Write Test First

```tsx
it('requests camera permission', async () => {
  const { getByText } = render(<CameraScreen />);
  expect(getByText('Grant Permission')).toBeTruthy();
});
```

### Step 5: Implement Following Docs

Use patterns from fetched documentation.

---

## Navigation Workflow

When adding new route:

### Step 1: Fetch Documentation (MANDATORY)

```
fetch_expo_router(topic: "file-based-routing")
```

### Step 2: Create Route File

```
app/
├── product/
│   └── [id].tsx    # New dynamic route
```

### Step 3: Implement Screen

```tsx
// app/product/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function ProductScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Product {id}</Text>
    </View>
  );
}
```

### Step 4: Add Navigation

```tsx
import { Link } from 'expo-router';

<Link href={`/product/${product.id}`}>View Product</Link>
```

---

## Commands Reference

```bash
# Development
npx expo start              # Start dev server
npx expo start --clear      # Clear cache and start

# Testing
npm test                    # Run all tests
npm test -- --watch         # Watch mode
npm test -- ProductCard     # Run specific test

# Linting
npx expo lint              # Run ESLint
npx expo lint --fix        # Auto-fix issues

# Build
npx expo prebuild          # Generate native projects
eas build --platform ios   # Build for iOS
eas build --platform android # Build for Android

# Updates
npx expo install           # Update Expo packages
```

---

## Verification Checklist

Before marking task as done:

```bash
# 1. Tests pass
npm test

# 2. Lint clean
npx expo lint

# 3. App runs
npx expo start
# Press 'i' for iOS or 'a' for Android
```

Only after ALL pass -> "Done"
