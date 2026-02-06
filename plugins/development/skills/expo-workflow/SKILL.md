---
name: expo-workflow
description: Use when working with React Native + Expo - enforces DOCS-FIRST workflow where AI MUST fetch current documentation BEFORE proposing any implementation (Expo SDK 54+, React Native 0.79+, iOS Premium UI with Tamagui + Liquid Glass)
hooks:
  PostToolUse:
    - matcher: "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx)$\""
      hooks:
        - type: command
          command: "bash ~/.claude/hooks/ts-check.sh"
          timeout: 30
    - matcher: "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\""
      hooks:
        - type: command
          command: "bash ~/.claude/hooks/auto-prettier.sh"
          timeout: 10
    - matcher: "tool == \"Edit\" && tool_input.file_path matches \"\\\\.(ts|tsx|js|jsx)$\""
      hooks:
        - type: command
          command: "bash ~/.claude/hooks/console-log-check.sh"
          timeout: 5
---

# Expo Workflow-Driven Development Skill

## CRITICAL PRINCIPLE

**DOCS FIRST, CODE SECOND**

You MUST NEVER generate React Native/Expo code without first fetching relevant documentation via MCP tools.

This is NON-NEGOTIABLE. Every workflow below has MANDATORY MCP fetch steps that MUST be completed before implementation.

## When to Use This Skill

Use this skill for ALL React Native + Expo development tasks:
- Creating components (functional components with hooks)
- Implementing navigation (Expo Router / React Navigation v7)
- Using Expo SDK modules (expo-camera, expo-image, expo-video, etc.)
- State management (React Context, Zustand, Jotai, Redux Toolkit)
- Platform-specific code (iOS/Android)
- Styling (StyleSheet, NativeWind, Tamagui)
- **iOS Premium UI** (Tamagui design system, Liquid Glass effects, haptics)
- Any TypeScript/JSX code generation for mobile

## Current Stack (SDK 54+)

**Required Versions:**
- Expo SDK 54+ (New Architecture is default)
- React Native 0.79+
- React 19+
- TypeScript 5.3+
- iOS 15.1+ deployment target
- Android SDK 24+ (minSdk), 35+ (compileSdk)

**Key SDK 54 Features:**
- expo-video (stable) - replaces expo-av Video
- expo-audio (stable) - replaces expo-av Audio
- expo-image v2 - useImage hook for preloading
- expo/fetch - WinterCG-compliant, streaming support
- Edge-to-edge layouts default on Android
- React Navigation v7 (via Expo Router)

**DEPRECATED in SDK 54:**
- expo-av is no longer maintained - use expo-video + expo-audio

## Project Detection (MANDATORY FIRST STEP)

**Before starting ANY workflow, detect project setup:**

```
☐ 1. Check package.json for styling framework:
     - @tamagui/core → Project uses Tamagui
     - nativewind → Project uses NativeWind
     - Neither → Project uses StyleSheet

☐ 2. Check for tamagui.config.ts:
     - EXISTS → Tamagui is configured, use its tokens/themes
     - NOT EXISTS → May need Tamagui setup first

☐ 3. If Tamagui detected:
     ⚠️ MANDATORY: Call fetch_tamagui_docs() for ANY component work
     - Creating components → fetch_tamagui_docs("styled") + fetch_tamagui_docs("Stack")
     - Theming → fetch_tamagui_docs("themes") + fetch_tamagui_docs("tokens")
     - Animations → fetch_tamagui_docs("animations")
     - Specific component → fetch_tamagui_docs("Button"), fetch_tamagui_docs("Sheet"), etc.
```

**Tamagui Project Indicators:**
- `@tamagui/core` in dependencies
- `tamagui.config.ts` file exists
- `TamaguiProvider` in app layout
- Uses `styled()` function or `$token` syntax

**When Tamagui is detected, ALWAYS:**
1. Fetch Tamagui docs BEFORE implementation
2. Use Tamagui primitives (Stack, Text, Button) instead of RN View/Text
3. Use design tokens ($space, $color, $radius)
4. Follow Tamagui patterns from fetched docs

## Core Workflows

### Workflow 1: Creating Components

**Use for:** Creating any React Native component

**MANDATORY CHECKLIST:**

```
☐ 1. Determine component type
     - Functional component (always use this)
     - Custom hook (for reusable logic)
     - Context provider (for shared state)

☐ 2. ⚠️ MANDATORY: Detect styling framework (see Project Detection above)
     Check package.json for @tamagui/core or nativewind

☐ 3. ⚠️ MANDATORY: Fetch documentation based on detected framework

     IF TAMAGUI PROJECT:
       Call MCP tool: fetch_tamagui_docs("styled")
       Call MCP tool: fetch_tamagui_docs("Stack") or relevant component
       Call MCP tool: fetch_tamagui_docs("tokens") if using design tokens
       Wait for responses before continuing

     IF STYLESHEET/OTHER:
       Call MCP tool: fetch_rn_docs(topic)
       Example: fetch_rn_docs("View"), fetch_rn_docs("ScrollView")
       Wait for response before continuing

☐ 4. ⚠️ MANDATORY: Fetch Expo SDK module docs (if using)
     Call MCP tool: fetch_expo_sdk(module)
     Example: fetch_expo_sdk("expo-image")
     Wait for response before continuing

☐ 5. Plan component structure based on fetched docs:
     - Props interface (TypeScript)
     - State with useState/useReducer
     - Effects with useEffect/useLayoutEffect
     - Refs with useRef

☐ 6. Implement component following current API:

     IF TAMAGUI PROJECT:
       - Use styled() for custom components
       - Use Tamagui primitives (Stack, XStack, YStack, Text)
       - Use $tokens for spacing, colors, radii
       - Use variants for component states
       - Use GetProps<typeof Component> for prop types

     IF STYLESHEET:
       - Functional component with arrow function
       - StyleSheet.create outside component
       - Proper TypeScript types for props

☐ 7. Implement JSX structure:
     - Use appropriate components (Tamagui or RN core)
     - Use Expo SDK components where appropriate
     - Proper accessibility (accessibilityLabel, role)

☐ 8. VERIFY against quality checklist:
     ✓ Uses correct framework (Tamagui/StyleSheet)
     ✓ TypeScript strict mode
     ✓ Functional component with hooks
     ✓ Proper accessibility
     ✓ Follows fetched documentation
```

**Example Execution (StyleSheet project):**

```tsx
// WRONG: Generating code without fetching docs
const ProfileCard = () => <View>...</View>;

// CORRECT: Workflow followed (StyleSheet)
// 1. Determined: Functional component
// 2. Detected: No Tamagui in package.json → StyleSheet project
// 3. Called: fetch_rn_docs("View")
// 4. Called: fetch_expo_sdk("expo-image")
// 5. Now implementing with current API:

import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

interface ProfileCardProps {
  name: string;
  avatarUrl: string;
  onPress?: () => void;
}

export function ProfileCard({ name, avatarUrl, onPress }: ProfileCardProps) {
  return (
    <View style={styles.container} accessibilityRole="button" onTouchEnd={onPress}>
      <Image
        source={avatarUrl}
        style={styles.avatar}
        contentFit="cover"
        transition={200}
      />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  name: { marginLeft: 12, fontSize: 16, fontWeight: '600' },
});
```

**Example Execution (Tamagui project):**

```tsx
// WRONG: Using StyleSheet in Tamagui project
import { View, StyleSheet } from 'react-native';
const Card = () => <View style={styles.card}>...</View>;

// CORRECT: Workflow followed (Tamagui)
// 1. Determined: Functional component
// 2. Detected: @tamagui/core in package.json → Tamagui project
// 3. Called: fetch_tamagui_docs("styled")
// 4. Called: fetch_tamagui_docs("XStack")
// 5. Called: fetch_expo_sdk("expo-image")
// 6. Now implementing with Tamagui:

import { styled, XStack, Text, GetProps } from '@tamagui/core';
import { Image } from 'expo-image';

const CardContainer = styled(XStack, {
  alignItems: 'center',
  padding: '$md',
  backgroundColor: '$card',
  borderRadius: '$lg',

  variants: {
    pressable: {
      true: {
        pressStyle: { scale: 0.98, opacity: 0.9 },
      },
    },
  } as const,
});

type ProfileCardProps = GetProps<typeof CardContainer> & {
  name: string;
  avatarUrl: string;
  onPress?: () => void;
};

export function ProfileCard({ name, avatarUrl, onPress, ...props }: ProfileCardProps) {
  return (
    <CardContainer
      pressable={!!onPress}
      onPress={onPress}
      accessibilityRole="button"
      {...props}
    >
      <Image
        source={avatarUrl}
        style={{ width: 48, height: 48, borderRadius: 24 }}
        contentFit="cover"
        transition={200}
      />
      <Text marginLeft="$md" fontSize={16} fontWeight="600">
        {name}
      </Text>
    </CardContainer>
  );
}
```

### Workflow 2: Navigation (Expo Router)

**Use for:** Setting up navigation, routes, deep linking

**MANDATORY CHECKLIST:**

```
☐ 1. Determine navigation pattern:
     - Stack navigation (screens on top of each other)
     - Tab navigation (bottom tabs)
     - Drawer navigation (side menu)
     - Modal navigation (overlay screens)

☐ 2. ⚠️ MANDATORY: Fetch Expo Router documentation
     Call MCP tool: fetch_expo_router(topic)
     Example: fetch_expo_router("file-based-routing")
     Wait for response before continuing

☐ 3. ⚠️ MANDATORY: Fetch React Navigation v7 docs (for advanced)
     Call MCP tool: fetch_react_navigation(topic)
     Wait for response before continuing

☐ 4. Plan route structure:
     - app/ directory structure
     - Route groups with (group)
     - Dynamic routes with [param]
     - Layout routes with _layout.tsx

☐ 5. Implement file-based routing:
     - Create files in app/ directory
     - Use _layout.tsx for navigation layouts
     - Use +not-found.tsx for 404
     - Use +html.tsx for web (if needed)

☐ 6. Implement navigation:
     - Use Link component for declarative navigation
     - Use router.push/replace for imperative
     - Use useLocalSearchParams for route params
     - Use useSegments for active segment

☐ 7. Set up deep linking (if needed):
     ⚠️ MANDATORY: fetch_expo_router("deep-linking")
     - Configure scheme in app.json
     - Handle universal links (iOS)
     - Handle app links (Android)

☐ 8. VERIFY navigation:
     ✓ File-based routes work
     ✓ Type-safe navigation (typed routes)
     ✓ Deep links work
     ✓ Back button handled correctly
     ✓ Tab/drawer state preserved
```

**Example - Tab Navigation:**

```
app/
├── _layout.tsx          # Root layout
├── (tabs)/
│   ├── _layout.tsx      # Tab layout
│   ├── index.tsx        # Home tab (/)
│   ├── search.tsx       # Search tab (/search)
│   └── profile.tsx      # Profile tab (/profile)
├── product/
│   └── [id].tsx         # Dynamic route (/product/123)
└── +not-found.tsx       # 404 page
```

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### Workflow 3: Expo SDK Modules

**Use for:** Using any Expo SDK module (camera, image, video, etc.)

**MANDATORY CHECKLIST:**

```
☐ 1. Identify which Expo module is needed:
     - expo-image (images with caching)
     - expo-video (video playback, PiP)
     - expo-camera (camera access)
     - expo-av (legacy audio/video)
     - expo-audio (new audio API - beta)
     - expo-file-system (file operations)
     - expo-notifications (push notifications)
     - expo-location (GPS)
     - expo-sensors (accelerometer, etc.)

☐ 2. ⚠️ MANDATORY: Fetch Expo SDK module documentation
     Call MCP tool: fetch_expo_sdk(module_name)
     Example: fetch_expo_sdk("expo-camera")
     Wait for response before continuing

☐ 3. Check platform requirements:
     - iOS permissions (Info.plist)
     - Android permissions (AndroidManifest.xml)
     - Expo config plugins needed

☐ 4. Install and configure:
     - npx expo install [package]
     - Add config plugin to app.json if needed
     - Add permissions strings

☐ 5. Implement following fetched docs:
     - Use current API from docs
     - Handle permissions properly
     - Handle loading/error states
     - Dispose/cleanup resources

☐ 6. VERIFY module usage:
     ✓ Permissions requested correctly
     ✓ Works on iOS and Android
     ✓ Resources cleaned up
     ✓ Error handling implemented
     ✓ Follows SDK 52 patterns
```

**Example - expo-camera:**

```tsx
// CORRECT: Workflow followed
// 1. Identified: expo-camera for QR scanning
// 2. Called: fetch_expo_sdk("expo-camera")
// 3. Reviewed current CameraView API (not legacy Camera)

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export function QRScanner({ onScan }: { onScan: (data: string) => void }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Camera permission required</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <CameraView
      style={styles.camera}
      facing="back"
      barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
      onBarcodeScanned={scanned ? undefined : ({ data }) => {
        setScanned(true);
        onScan(data);
      }}
    />
  );
}
```

### Workflow 4: State Management

**Use for:** Any state management beyond local component state

**MANDATORY CHECKLIST:**

```
☐ 1. Identify state scope:
     - Local (single component) → useState/useReducer
     - Shared (few components) → React Context
     - Feature (module-wide) → Zustand/Jotai
     - App-wide (global) → Zustand/Redux Toolkit

☐ 2. Choose state management solution:
     - React Context (built-in, simple)
     - Zustand (minimal, hooks-based)
     - Jotai (atomic, bottom-up)
     - Redux Toolkit (predictable, large apps)
     - TanStack Query (server state)

☐ 3. ⚠️ MANDATORY: Fetch state management patterns
     Call MCP tool: fetch_state_pattern(solution)
     Example: fetch_state_pattern("zustand")
     Wait for response before continuing

☐ 4. ⚠️ MANDATORY: Fetch package docs (if using package)
     Call MCP tool: fetch_npm_docs(package_name)
     Wait for response before continuing

☐ 5. Set up state following fetched patterns:
     - TypeScript interfaces for state
     - Actions/selectors with proper types
     - Proper initialization

☐ 6. Connect state to components:
     - Use hooks (useStore, useContext, etc.)
     - Select only needed state (avoid rerenders)
     - Handle async properly

☐ 7. VERIFY state management:
     ✓ TypeScript types correct
     ✓ No unnecessary rerenders
     ✓ Async handled with loading/error
     ✓ State persisted if needed
     ✓ DevTools working (if applicable)
```

**Decision Tree: Which State Solution?**

```
State complexity?
├─ Simple (1-3 values) → useState or Context
├─ Medium (feature state) → Zustand or Jotai
└─ Complex (large app, async) → Zustand or Redux Toolkit

Server state (API data)?
├─ YES → TanStack Query (React Query)
└─ NO → Client state solutions above

Need persistence?
├─ YES → Zustand + persist middleware or MMKV
└─ NO → Any solution works
```

**Example - Zustand Store:**

```tsx
// stores/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existing = state.items.find((i) => i.id === item.id);
        if (existing) {
          return {
            items: state.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

### Workflow 5: Styling

**Use for:** Styling components (StyleSheet, NativeWind, Tamagui)

**MANDATORY CHECKLIST:**

```
☐ 1. Choose styling approach:
     - StyleSheet (built-in, type-safe)
     - NativeWind (Tailwind for RN)
     - Tamagui (cross-platform, optimized)
     - Styled Components (CSS-in-JS)

☐ 2. ⚠️ MANDATORY: Fetch styling documentation
     Call MCP tool: fetch_rn_docs("StyleSheet")
     Or: fetch_npm_docs("nativewind")
     Wait for response before continuing

☐ 3. Plan responsive styling:
     - useWindowDimensions for screen size
     - Platform.select for platform-specific
     - Breakpoints if using NativeWind

☐ 4. Implement styles:
     - StyleSheet.create for static styles
     - Dynamic styles via props/state
     - Themed styles via context

☐ 5. Handle platform differences:
     - Platform.OS checks
     - Platform.select for style objects
     - Shadows (iOS) vs elevation (Android)

☐ 6. VERIFY styling:
     ✓ Works on iOS and Android
     ✓ Responsive to screen sizes
     ✓ Dark mode support (if needed)
     ✓ No inline style objects (performance)
     ✓ Consistent spacing/colors
```

**Example - StyleSheet with Platform:**

```tsx
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    // Shadow for iOS
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

### Workflow 6: Adding Dependencies

**Use for:** Adding any npm package to Expo project

**MANDATORY CHECKLIST:**

```
☐ 1. Check if Expo has built-in solution:
     - Search Expo SDK first
     - Many native modules included

☐ 2. ⚠️ MANDATORY: Fetch package documentation
     Call MCP tool: fetch_npm_docs(package_name)
     Wait for response before continuing

☐ 3. Verify Expo compatibility:
     - Check Expo compatibility on docs
     - Some native modules need config plugins
     - Some need custom dev client

☐ 4. Install correctly:
     - Use `npx expo install` (not npm install)
     - This ensures compatible versions

☐ 5. Configure if needed:
     - Add config plugin to app.json
     - Run npx expo prebuild (if native)

☐ 6. VERIFY package integration:
     ✓ Works in Expo Go (if applicable)
     ✓ Works in development build
     ✓ No version conflicts
     ✓ TypeScript types available
```

### Workflow 7: iOS Premium UI (Tamagui + Liquid Glass)

**Use for:** Building beautiful, iOS-native UI with premium feel, glass effects, and micro-interactions

**iOS Design Philosophy:**
- **Clarity** - Every element is easy to understand
- **Deference** - UI helps users focus on content, not chrome
- **Depth** - Layers, blur, and visual hierarchy guide the user

**MANDATORY CHECKLIST:**

```
☐ 1. Determine UI component type:
     - Glass effect (blur, vibrancy, liquid glass)
     - Interactive element (button, input, toggle, slider)
     - Container (card, sheet, modal, bottom sheet)
     - Navigation element (tab bar, header, floating action)
     - Feedback (toast, haptics, micro-interaction)
     - List item (swipeable, animated)

☐ 2. ⚠️ MANDATORY: Fetch iOS Human Interface Guidelines
     Call MCP tool: fetch_ios_hig(pattern)
     Examples:
       fetch_ios_hig("materials")     - blur, vibrancy, glass
       fetch_ios_hig("buttons")       - button styles, states
       fetch_ios_hig("navigation")    - tab bars, headers
       fetch_ios_hig("motion")        - animation principles
       fetch_ios_hig("accessibility") - a11y requirements
     Wait for response before continuing

☐ 3. ⚠️ MANDATORY: Fetch Tamagui documentation
     Call MCP tool: fetch_tamagui_docs(topic)
     Examples:
       fetch_tamagui_docs("configuration") - setup, tokens
       fetch_tamagui_docs("themes")        - light/dark, nesting
       fetch_tamagui_docs("animations")    - spring, timing
       fetch_tamagui_docs("Sheet")         - bottom sheets
       fetch_tamagui_docs("Button")        - button component
     Wait for response before continuing

☐ 4. ⚠️ MANDATORY (if using glass effects): Fetch Liquid Glass docs
     Call MCP tool: fetch_liquid_glass_docs(component)
     Examples:
       fetch_liquid_glass_docs("LiquidGlassView")
       fetch_liquid_glass_docs("LiquidGlassContainer")
       fetch_liquid_glass_docs("BlurView")
     Note: Liquid Glass requires iOS 26+, falls back to blur on older iOS/Android

☐ 5. ⚠️ MANDATORY (if using animations): Fetch Reanimated docs
     Call MCP tool: fetch_reanimated_docs(topic)
     Examples:
       fetch_reanimated_docs("useAnimatedStyle")
       fetch_reanimated_docs("withSpring")
       fetch_reanimated_docs("Gesture")
     Wait for response before continuing

☐ 6. Plan design tokens (convert existing theme or create new):
     Colors:
       - Primary brand color (e.g., #22C55E)
       - Semantic colors (success, warning, error)
       - Light/dark theme variants
       - Glass tint colors (rgba with alpha)

     Spacing:
       - Consistent scale (4, 8, 12, 16, 24, 32, 48)
       - Touch target minimum: 44pt

     Typography:
       - SF Pro (system) or custom font
       - Type scale (h1, h2, body, caption, small)
       - Font weights (regular, medium, semibold, bold)

     Effects:
       - Border radii (small: 8, medium: 12, large: 16, full: 9999)
       - Shadow definitions (subtle, medium, strong)
       - Blur intensities (light: 10, medium: 20, heavy: 40)

☐ 7. Implement with iOS-native feel:

     Tamagui Setup (if not done):
       - Install: npx expo install @tamagui/core @tamagui/config
       - Create tamagui.config.ts with tokens
       - Wrap app in TamaguiProvider

     Component Implementation:
       - Use Tamagui primitives (Stack, Text, Button, etc.)
       - Apply tokens via $ prefix ($color.primary)
       - Use variants for component states
       - Add proper TypeScript types

     Glass Effects (iOS 26+):
       - Use LiquidGlassView for glass surfaces
       - Use BlurView for older iOS fallback
       - Set appropriate blur intensity
       - Handle reduce transparency setting

     Haptic Feedback:
       - Import from expo-haptics
       - Light: selection feedback
       - Medium: impact feedback
       - Heavy: notification feedback

     Animations:
       - Use Tamagui animations or Reanimated
       - Prefer spring animations (more natural)
       - Keep durations short (150-300ms)
       - Respect reduce motion setting

☐ 8. VERIFY against iOS HIG and quality:
     Visual:
       ✓ Follows clarity, deference, depth principles
       ✓ Glass effects enhance, don't obscure content
       ✓ Consistent use of design tokens
       ✓ Proper light/dark mode support

     Touch & Interaction:
       ✓ Minimum 44pt touch targets
       ✓ Haptic feedback feels native
       ✓ Animations are fluid (60fps)
       ✓ Gestures match iOS conventions

     Accessibility:
       ✓ Minimum contrast ratio 4.5:1
       ✓ Respects "Reduce Transparency" setting
       ✓ Respects "Reduce Motion" setting
       ✓ VoiceOver labels provided
       ✓ Dynamic Type supported (if text-heavy)

     Performance:
       ✓ Glass effects limited (GPU intensive)
       ✓ Animations use native driver
       ✓ No unnecessary re-renders
       ✓ Images optimized with expo-image
```

**Example - Tamagui Configuration:**

```tsx
// tamagui.config.ts
import { createTamagui, createTokens } from '@tamagui/core';
import { createAnimations } from '@tamagui/animations-react-native';

const tokens = createTokens({
  color: {
    // Brand
    primary: '#22C55E',
    primaryLight: '#4ADE80',
    primaryDark: '#16A34A',

    // Semantic
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',

    // Light theme
    background: '#FAFAFA',
    card: '#FFFFFF',
    text: '#0F172A',
    textSecondary: '#64748B',
    border: '#E2E8F0',

    // Dark theme
    backgroundDark: '#0F172A',
    cardDark: '#1E293B',
    textDark: '#FFFFFF',
    textSecondaryDark: '#94A3B8',
    borderDark: '#334155',

    // Glass
    glassTint: 'rgba(255, 255, 255, 0.1)',
    glassTintDark: 'rgba(0, 0, 0, 0.2)',
  },

  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
  },

  size: {
    touchTarget: 44,
    iconSm: 20,
    iconMd: 24,
    iconLg: 32,
  },

  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
});

const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 15,
    stiffness: 200,
  },
  slow: {
    type: 'spring',
    damping: 12,
    stiffness: 150,
  },
});

export const config = createTamagui({
  tokens,
  animations,
  themes: {
    light: {
      background: tokens.color.background,
      card: tokens.color.card,
      color: tokens.color.text,
      colorSecondary: tokens.color.textSecondary,
      borderColor: tokens.color.border,
      primary: tokens.color.primary,
    },
    dark: {
      background: tokens.color.backgroundDark,
      card: tokens.color.cardDark,
      color: tokens.color.textDark,
      colorSecondary: tokens.color.textSecondaryDark,
      borderColor: tokens.color.borderDark,
      primary: tokens.color.primary,
    },
  },
});

export type AppConfig = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}
```

**Example - Glass Card Component:**

```tsx
// components/ui/GlassCard.tsx
import { styled, Stack, Text, GetProps } from '@tamagui/core';
import { BlurView } from 'expo-blur';
import { Platform, useColorScheme } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

// For iOS 26+, use LiquidGlassView instead
// import { LiquidGlassView } from '@callstack/liquid-glass';

const GlassContainer = styled(Stack, {
  borderRadius: '$lg',
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',

  variants: {
    size: {
      sm: { padding: '$sm' },
      md: { padding: '$md' },
      lg: { padding: '$lg' },
    },
    pressable: {
      true: {
        pressStyle: {
          scale: 0.98,
          opacity: 0.9,
        },
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
});

type GlassCardProps = GetProps<typeof GlassContainer> & {
  intensity?: number;
  onPress?: () => void;
  children: React.ReactNode;
};

export function GlassCard({
  intensity = 20,
  onPress,
  children,
  ...props
}: GlassCardProps) {
  const colorScheme = useColorScheme();
  const tint = colorScheme === 'dark' ? 'dark' : 'light';

  const handlePress = useCallback(() => {
    if (onPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onPress();
    }
  }, [onPress]);

  return (
    <GlassContainer
      pressable={!!onPress}
      onPress={handlePress}
      {...props}
    >
      {Platform.OS === 'ios' && (
        <BlurView
          intensity={intensity}
          tint={tint}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
      {children}
    </GlassContainer>
  );
}
```

**Example - Premium Button with Haptics:**

```tsx
// components/ui/PremiumButton.tsx
import { styled, GetProps } from '@tamagui/core';
import { Button as TamaguiButton } from '@tamagui/button';
import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import { AccessibilityInfo } from 'react-native';

const StyledButton = styled(TamaguiButton, {
  fontFamily: '$body',
  fontWeight: '600',
  borderRadius: '$md',
  minHeight: '$touchTarget',

  animation: 'fast',
  pressStyle: {
    scale: 0.97,
    opacity: 0.9,
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '#FFFFFF',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
        color: '$primary',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
      },
    },
    size: {
      sm: {
        paddingHorizontal: '$md',
        paddingVertical: '$sm',
        fontSize: 14,
      },
      md: {
        paddingHorizontal: '$lg',
        paddingVertical: '$md',
        fontSize: 16,
      },
      lg: {
        paddingHorizontal: '$xl',
        paddingVertical: '$lg',
        fontSize: 18,
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

type PremiumButtonProps = GetProps<typeof StyledButton> & {
  haptic?: 'light' | 'medium' | 'heavy' | 'none';
};

export function PremiumButton({
  onPress,
  haptic = 'light',
  ...props
}: PremiumButtonProps) {
  const handlePress = useCallback(async () => {
    if (haptic !== 'none') {
      const style = {
        light: Haptics.ImpactFeedbackStyle.Light,
        medium: Haptics.ImpactFeedbackStyle.Medium,
        heavy: Haptics.ImpactFeedbackStyle.Heavy,
      }[haptic];

      await Haptics.impactAsync(style);
    }

    onPress?.();
  }, [onPress, haptic]);

  return (
    <StyledButton
      onPress={handlePress}
      accessibilityRole="button"
      {...props}
    />
  );
}
```

**Example - Animated Sheet with Glass:**

```tsx
// components/ui/GlassSheet.tsx
import { Sheet, SheetProps } from '@tamagui/sheet';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useColorScheme, useReducedMotion } from 'react-native';

type GlassSheetProps = SheetProps & {
  children: React.ReactNode;
};

export function GlassSheet({ children, onOpenChange, ...props }: GlassSheetProps) {
  const colorScheme = useColorScheme();
  const reducedMotion = useReducedMotion();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onOpenChange?.(open);
  };

  return (
    <Sheet
      modal
      dismissOnSnapToBottom
      animation={reducedMotion ? undefined : 'medium'}
      onOpenChange={handleOpenChange}
      {...props}
    >
      <Sheet.Overlay
        animation="fast"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor="rgba(0,0,0,0.5)"
      />

      <Sheet.Frame
        backgroundColor="transparent"
        borderTopLeftRadius="$xl"
        borderTopRightRadius="$xl"
        overflow="hidden"
      >
        <BlurView
          intensity={40}
          tint={colorScheme === 'dark' ? 'dark' : 'light'}
          style={{ flex: 1 }}
        >
          <Sheet.Handle backgroundColor="$colorSecondary" opacity={0.5} />
          {children}
        </BlurView>
      </Sheet.Frame>
    </Sheet>
  );
}
```

**Decision Tree: iOS Premium UI**

```
What are you building?

Surface/Container?
├─ Needs glass effect → GlassCard with BlurView
├─ Bottom sheet → GlassSheet with Tamagui Sheet
├─ Modal dialog → Sheet or Dialog with blur overlay
└─ Simple card → Tamagui Card with theme tokens

Interactive Element?
├─ Primary action → PremiumButton variant="primary"
├─ Secondary action → PremiumButton variant="secondary"
├─ Destructive → PremiumButton with red color + heavy haptic
├─ Toggle → Tamagui Switch + light haptic
└─ Slider → Tamagui Slider + selection haptic on change

Feedback?
├─ Success → Toast + success haptic + checkmark animation
├─ Error → Toast + error haptic + shake animation
├─ Loading → Skeleton or spinner (no haptic)
└─ Selection → Light haptic only

Glass Effect Type?
├─ iOS 26+ available → LiquidGlassView (real glass)
├─ iOS < 26 → BlurView with intensity
├─ Android → Fallback to solid color with opacity
└─ Reduce Transparency ON → Solid color, no blur
```

## Code Quality Requirements

### TypeScript Requirements (MANDATORY)

```tsx
// ✓ CORRECT: Strict TypeScript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

type UserCardProps = {
  user: User;
  onPress: (user: User) => void;
};

// ✓ CORRECT: Proper hook types
const [users, setUsers] = useState<User[]>([]);
const userRef = useRef<User | null>(null);

// ✗ WRONG: any types
const [data, setData] = useState<any>([]);
const handlePress = (item: any) => {};
```

### React Native Patterns (MANDATORY)

```tsx
// ✓ CORRECT: Functional component with memo
import { memo } from 'react';

export const ProductCard = memo(function ProductCard({ product }: Props) {
  return (
    <View style={styles.card}>
      <Text>{product.name}</Text>
    </View>
  );
});

// ✓ CORRECT: useCallback for handlers
const handlePress = useCallback(() => {
  navigation.navigate('Product', { id: product.id });
}, [navigation, product.id]);

// ✓ CORRECT: StyleSheet outside component
const styles = StyleSheet.create({
  card: { padding: 16 },
});

// ✗ WRONG: Inline styles (causes rerenders)
<View style={{ padding: 16 }}>
```

### Expo SDK 52 Patterns (MANDATORY)

```tsx
// ✓ CORRECT: expo-image v2 with useImage
import { Image, useImage } from 'expo-image';

function Avatar({ uri }: { uri: string }) {
  const image = useImage(uri);

  if (!image) return <View style={styles.placeholder} />;

  return (
    <Image
      source={image}
      style={styles.avatar}
      contentFit="cover"
      transition={200}
    />
  );
}

// ✓ CORRECT: expo/fetch for streaming
import { fetch } from 'expo/fetch';

async function streamAIResponse(prompt: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, stream: true }),
  });

  const reader = response.body?.getReader();
  // Handle streaming...
}
```

## Decision Trees

### Component Type Selection

```
Does component need internal state?
├─ NO → Simple functional component
└─ YES → Does it need lifecycle effects?
    ├─ NO → Functional with useState
    └─ YES → Functional with useState + useEffect
```

### Navigation Type Selection

```
What's your app structure?
├─ Linear screens → Stack navigation
├─ Main sections → Tab navigation
├─ Settings/menu access → Drawer navigation
├─ Overlays/dialogs → Modal navigation
└─ Complex → Combine (Tabs + Stack per tab)
```

### Expo Module Selection

```
Need to display images?
├─ Static/cached images → expo-image (recommended)
└─ Legacy support needed → React Native Image

Need video playback?
├─ Modern features (PiP, controls) → expo-video (SDK 52+)
└─ Legacy/basic → expo-av

Need camera?
├─ Photo/video capture → expo-camera
├─ QR/barcode scanning → expo-camera with barcode settings
└─ AR features → expo-camera + custom

Need audio?
├─ Modern API (SDK 52+) → expo-audio (beta)
└─ Stable/legacy → expo-av Audio
```

## Performance Checklist

**Before implementing any component, consider:**

```
☐ Can this component be memoized? (React.memo)
☐ Are callbacks wrapped with useCallback?
☐ Are computed values memoized with useMemo?
☐ Is StyleSheet.create used (not inline styles)?
☐ Are lists using FlatList/FlashList (not ScrollView)?
☐ Are images using expo-image with proper sizing?
☐ Is state granular (avoid large state objects)?
```

## Common Mistakes to Avoid

**DON'T:**
- Generate code without fetching docs first
- Use class components (use functional + hooks)
- Use deprecated APIs (Camera → CameraView, etc.)
- Put styles inline (use StyleSheet.create)
- Use ScrollView for long lists (use FlatList)
- Ignore TypeScript strict mode
- Skip accessibility labels
- Use npm install (use npx expo install)
- Ignore platform differences
- Store sensitive data in AsyncStorage (use SecureStore)

**DO:**
- ALWAYS fetch documentation before implementing
- Follow workflows step-by-step
- Use Expo SDK 52 modern APIs
- Use TypeScript strict mode
- Memoize components and callbacks
- Handle loading/error states
- Test on both iOS and Android
- Use proper accessibility props
- Clean up effects and subscriptions
- Use expo-secure-store for sensitive data

## Integration with MCP Server

This skill works with the Expo MCP server. MCP provides the WHAT (current APIs, patterns, docs), this skill provides the WHEN and HOW (workflows, process).

**Available MCP Tools:**

1. `fetch_rn_docs(topic)` - React Native core components and APIs
2. `fetch_expo_sdk(module)` - Expo SDK module documentation
3. `fetch_expo_router(topic)` - Expo Router file-based navigation
4. `fetch_react_navigation(topic)` - React Navigation v7 docs
5. `fetch_state_pattern(solution)` - State management patterns
6. `fetch_npm_docs(package)` - npm package documentation
7. `search_expo_api(query)` - Search Expo API reference
8. `get_expo_config(topic)` - app.json/app.config.js options

**iOS Premium UI Tools (Workflow 7):**

9. `fetch_ios_hig(pattern)` - Apple Human Interface Guidelines
   - Topics: materials, buttons, navigation, motion, accessibility, typography, color
10. `fetch_tamagui_docs(topic)` - Tamagui documentation
    - Topics: configuration, themes, tokens, animations, Sheet, Button, Input, Stack
11. `fetch_liquid_glass_docs(component)` - Liquid Glass library docs
    - Components: LiquidGlassView, LiquidGlassContainer, BlurView
12. `fetch_reanimated_docs(topic)` - React Native Reanimated
    - Topics: useAnimatedStyle, withSpring, withTiming, Gesture, Layout

**You MUST call these tools at the workflow steps marked with ⚠️ MANDATORY**

## Verification Before Completion

Before considering any Expo implementation complete:

```
FINAL VERIFICATION CHECKLIST:
☐ All MANDATORY MCP tool calls were made
☐ Implementation follows fetched documentation
☐ Uses Expo SDK 52+ APIs (no deprecated)
☐ Uses React Native 0.76+ patterns
☐ TypeScript strict mode
☐ Functional components with hooks
☐ Proper accessibility (accessibilityLabel, role)
☐ Works on iOS and Android
☐ Performance optimized (memo, useCallback)
☐ Error handling implemented
☐ Resources cleaned up (useEffect cleanup)
```

## Summary

This skill enforces a DOCS-FIRST development process for React Native + Expo:

1. **Identify task** → Choose workflow (1-7)
2. **Fetch docs** → Call MCP tools (MANDATORY)
3. **Review docs** → Understand current API
4. **Implement** → Follow fetched patterns exactly
5. **Verify** → Check against quality checklist

**Workflows:**
- **1-6**: Core Expo development (components, navigation, SDK, state, styling, deps)
- **7**: iOS Premium UI (Tamagui + Liquid Glass + haptics + iOS HIG)

**NEVER skip step 2.** The MCP server provides current, accurate documentation. Use it.

**Your workflows are your process.** Follow them rigorously for consistent, high-quality React Native code that uses current Expo SDK 54 APIs, Tamagui design system, and iOS-native best practices.
