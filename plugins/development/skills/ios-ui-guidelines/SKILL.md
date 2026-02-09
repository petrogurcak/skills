---
name: ios-ui-guidelines
description: Use when designing, building, or reviewing iOS screens in React Native + Expo apps - Apple HIG compliance for typography, spacing, colors, dark mode, animations, Liquid Glass, gestures, and accessibility
---

# iOS UI Guidelines for React Native

Apple Human Interface Guidelines adapted for React Native + Expo + React Native Paper.

## 1. Core Principles

1. **Clarity** — legible text, precise icons, immediate comprehension
2. **Deference** — UI supports content, doesn't compete with it
3. **Depth** — visual layers and motion communicate hierarchy
4. **Consistency** — use familiar patterns and system conventions

## 2. Typography

System font: San Francisco (default in RN on iOS). Sizes match Dynamic Type:

| Style | Size | Weight | Leading | RN Paper variant |
|-------|------|--------|---------|-----------------|
| Large Title | 34pt | Bold | 41pt | `headlineLarge` (custom) |
| Title 1 | 28pt | Regular | 34pt | `headlineMedium` |
| Title 2 | 22pt | Regular | 28pt | `headlineSmall` |
| Title 3 | 20pt | Regular | 25pt | `titleLarge` |
| Headline | 17pt | Semibold | 22pt | `titleMedium` |
| Body | 17pt | Regular | 22pt | `bodyLarge` |
| Callout | 16pt | Regular | 21pt | `bodyMedium` |
| Subheadline | 15pt | Regular | 20pt | `bodyMedium` |
| Footnote | 13pt | Regular | 18pt | `bodySmall` |
| Caption 1 | 12pt | Regular | 16pt | `labelSmall` |
| Caption 2 | 11pt | Regular | 13pt | — (minimum readable) |

**Rules:**
- Default body = 17pt. Min readable = 11pt.
- Support Dynamic Type via `allowFontScaling` (default true in RN)
- SF Pro Text for <=19pt, SF Pro Display for >=20pt (automatic)
- Use 1-2 weights per screen. More = visual noise.

## 3. Spacing & Layout

**8-point grid.** All spacing in multiples of 8.

| Element | Value |
|---------|-------|
| Screen horizontal padding | 16pt (compact) or 20pt (regular) |
| Section spacing | 24-32pt |
| Field spacing (form) | 16pt |
| Inner padding (cards, inputs) | 12-16pt |
| Between label and input | 8pt |

**Safe Areas** — always use `SafeAreaView` or `useSafeAreaInsets`:

| Area | Height |
|------|--------|
| Status bar (notch) | ~59pt |
| Home indicator | 34pt |
| Nav bar (single row) | 44pt |
| Tab bar | ~49pt + safe area |

**Screen widths:** 375pt (SE) — 440pt (17 Pro Max). Design for 375pt min.

**Layout principles:**
- Extend backgrounds to screen edges. Content goes edge-to-edge.
- Place most important items top-leading (reading order)
- Group related items visually (spacing, separators, background shapes)
- Use progressive disclosure — don't show everything at once

## 4. Touch Targets

**Minimum 44x44 pt.** Non-negotiable.

```tsx
<Pressable hitSlop={8} style={{ minHeight: 44, justifyContent: 'center' }}>
```

| Rule | Value |
|------|-------|
| Min touch target | 44x44pt |
| Min spacing between targets | 8pt (12pt recommended with bezel, 24pt without) |
| Primary button height | 50pt recommended |
| Text button | Use `hitSlop` to ensure 44pt area |

## 5. Colors & Theming

**Use semantic colors, never hardcoded hex.**

| Semantic | Light | Dark | Purpose |
|----------|-------|------|---------|
| systemBackground | #FFFFFF | #000000 | Primary bg |
| secondarySystemBackground | #F2F2F7 | #1C1C1E | Grouped secondary bg |
| systemGroupedBackground | #F2F2F7 | #000000 | Grouped primary bg |
| label | #000000 | #FFFFFF | Primary text |
| secondaryLabel | rgba(60,60,67,0.6) | rgba(235,235,245,0.6) | Secondary text |
| separator | rgba(60,60,67,0.29) | rgba(84,84,88,0.6) | Dividers |
| tint/primary | App accent | App accent | Interactive elements |

**iOS system colors** (auto-adapt to appearance + Increase Contrast):

| Color | Light | Dark | Use |
|-------|-------|------|-----|
| Blue | #007AFF | #0A84FF | Primary action, links |
| Green | #34C759 | #30D158 | Success |
| Red | #FF3B30 | #FF453A | Destructive, errors |
| Orange | #FF9500 | #FF9F0A | Warnings |
| Yellow | #FFCC00 | #FFD60A | Caution |

**Contrast ratios:**
- Normal text (< 18pt): min 4.5:1
- Large text (>= 18pt bold or >= 24pt): min 3:1
- Never convey info through color alone

## 6. Dark Mode

Plan from the start. Not an afterthought.

**Implementation in RN Paper:**
```tsx
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { ThemeProvider, DarkTheme, DefaultTheme } from '@react-navigation/native';

const colorScheme = useColorScheme();
const paperTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
const navTheme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

<PaperProvider theme={paperTheme}>
  <ThemeProvider value={navTheme}>
```

**Rules:**
- Use `useTheme()` for all colors. Zero hardcoded hex in components.
- Test both appearances. Dark !== inverted light.
- Background hierarchy: base (darker) pushes back, elevated (lighter) brings forward
- White backgrounds in light mode -> slightly darker white in dark mode
- Icons/images: use template images or provide separate dark variants
- SF Symbols auto-adapt. Custom icons may need dark variants.
- System label colors (primary, secondary, tertiary, quaternary) adapt automatically

## 7. Shapes & Concentricity

iOS 26 design system uses three shape types:

| Type | Rule | Use |
|------|------|-----|
| **Fixed** | Constant `borderRadius` | Standalone elements |
| **Capsule** | `borderRadius: height / 2` | Buttons, pills, tags, sliders |
| **Concentric** | `borderRadius: parentRadius - padding` | Nested containers (card > image) |

```tsx
// Capsule button
<Pressable style={{ borderRadius: height / 2, height: 50 }}>

// Concentric: card with image
const CARD_RADIUS = 16;
const CARD_PADDING = 12;
<View style={{ borderRadius: CARD_RADIUS, padding: CARD_PADDING }}>
  <Image style={{ borderRadius: CARD_RADIUS - CARD_PADDING }} />
</View>
```

**Rules:**
- Shapes should nest concentrically (shared center, proportional radii)
- Avoid pinched or flared corners — they break visual rhythm
- Near screen edges: use capsule + extra margin (16pt from edge)
- Phone layouts favor capsules. Dense layouts (settings) use rounded rects.

## 8. Motion & Animation

Motion is meaningful, not decorative. Use to show relationships, provide feedback, communicate state.

**Principles:**
- Keep animations 0.2-0.5s. Longer feels sluggish.
- Prefer spring-based over linear. Springs feel natural.
- Interactive dismissal: sheets/modals should track finger during drag
- Coordinate multiple animations — stagger or synchronize, don't scatter

**Reanimated spring configs for iOS feel:**
```tsx
import { withSpring, withTiming, ReduceMotion } from 'react-native-reanimated';

// iOS-like button press feedback
const scale = withSpring(0.96, { damping: 15, stiffness: 300 });

// Smooth content transition
const translateY = withSpring(0, { damping: 20, stiffness: 200 });

// Bouncy entrance
const opacity = withSpring(1, { damping: 12, stiffness: 100 });

// Quick snap (toggle, switch)
const position = withSpring(targetX, { damping: 20, stiffness: 400 });
```

**Spring presets:**

| Preset | Damping | Stiffness | Use |
|--------|---------|-----------|-----|
| Bouncy | 8-12 | 100-150 | Playful elements, entrance |
| Snappy | 18-25 | 300-400 | Buttons, toggles, selection |
| Gentle | 15 | 100-200 | Content transitions |
| Stiff | 20+ | 400+ | Micro-interactions, quick snaps |

**Reduce Motion** — respect always:
```tsx
// Option A: Per-animation (built into Reanimated)
withSpring(value, { reduceMotion: ReduceMotion.System }); // default

// Option B: Check globally
import { useReducedMotion } from 'react-native-reanimated';
const reduceMotion = useReducedMotion();
// If true: replace transitions with fades, tighten springs, skip bounces
```

**When Reduce Motion is on:**
- Replace slide/zoom transitions with crossfade
- Tighten spring damping (eliminate bounce)
- Skip parallax and peripheral motion
- Avoid animating depth (z-axis)
- Never animate into/out of blurs

## 9. Liquid Glass (iOS 26+)

Liquid Glass is Apple's new translucent material for the navigation/control layer.

**React Native:** `@callstack/liquid-glass` (requires RN 0.80+, Xcode 26+, not in Expo Go)

```tsx
import { LiquidGlassView, isLiquidGlassSupported } from '@callstack/liquid-glass';
import { BlurView } from 'expo-blur';

// With fallback
function GlassBar({ children }) {
  if (isLiquidGlassSupported) {
    return <LiquidGlassView effect="regular" style={styles.bar}>{children}</LiquidGlassView>;
  }
  return <BlurView intensity={20} tint="light" style={styles.bar}>{children}</BlurView>;
}
```

**Two variants:**

| Variant | When | Props |
|---------|------|-------|
| **Regular** | Default. Adaptive, works everywhere. | `effect="regular"` |
| **Clear** | Over media-rich content only. Needs dimming layer. | `effect="clear"` |

**Rules:**
- Use for navigation layer only (toolbars, tab bars). NOT content layer.
- Never stack glass on glass.
- Never mix Regular and Clear variants.
- Use `PlatformColor` for auto-adapting text color on glass
- Height < 65pt for automatic text color adaptation
- `LiquidGlassContainerView` to merge nearby glass elements (spacing prop)
- Fallback on iOS < 26: `expo-blur` BlurView. On Android: solid background with opacity.

**Accessibility: Liquid Glass auto-handles these when system settings are on:**
- Reduced Transparency -> frostier, more opaque
- Increased Contrast -> black/white with border
- Reduced Motion -> no elastic effects

## 10. Forms & Inputs

**Input height:** 44-56pt (44pt min for touch target).

```tsx
<TextInput
  mode="outlined"
  label="Email"
  autoFocus={isFirstField}
  returnKeyType="next"
  blurOnSubmit={false}
  onSubmitEditing={() => nextRef.current?.focus()}
  autoComplete="email"
  textContentType="emailAddress"
  keyboardType="email-address"
  autoCapitalize="none"
  style={{ backgroundColor: colors.surface }}
/>
```

**Rules:**
- Labels above fields (not placeholder-only)
- `mode="outlined"` for iOS standard appearance
- `returnKeyType`: "next" for non-last, "done"/"go" for last
- Set `autoComplete` + `textContentType` for iOS autofill
- `blurOnSubmit={false}` + ref chain for multi-field forms
- Validate after first blur, not while typing
- Errors below field with `HelperText type="error"`

**Keyboard:**
```tsx
<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <ScrollView keyboardShouldPersistTaps="handled" keyboardDismissMode="interactive">
```

## 11. Navigation

| Pattern | When | Implementation |
|---------|------|----------------|
| Tab bar | Top-level (max 5) | Expo Router `(tabs)` |
| Stack | Drill-down | Expo Router `Stack` |
| Modal/Sheet | Focused task | `presentation="modal"` |
| Full-screen modal | Immersive | `presentation="fullScreenModal"` |

**iOS conventions:**
- Back = chevron + previous title. Never disable swipe-back.
- Large title collapses on scroll (`headerLargeTitle: true`)
- Tab bar always visible during navigation
- Primary action (Done) = tinted, separate from other bar items
- Group bar items by function. Don't mix symbols with text labels.
- Search tab at bottom (iOS standard since iOS 18)

## 12. Gestures

Standard gestures — don't override their expected behavior:

| Gesture | Expected action |
|---------|----------------|
| Tap | Activate/select |
| Swipe | Reveal actions, dismiss, scroll |
| Long press | Context menu, additional options |
| Drag | Move element |
| Pinch | Zoom |
| Edge swipe (left) | Navigate back |

**Rules:**
- Give multiple ways to interact. Don't require specific gestures.
- Swipe-to-delete: always provide tap alternative (edit button)
- Provide immediate feedback during gesture (track finger)
- Custom gestures: only for specialized tasks. Must be discoverable, simple, non-conflicting.
- Never conflict with system edge gestures (back swipe, Control Center)

```tsx
// Swipe actions on list row (react-native-gesture-handler)
import { Swipeable } from 'react-native-gesture-handler';

<Swipeable renderRightActions={renderDeleteAction}>
  <ListItem />
</Swipeable>
```

## 13. Accessibility

### Vision
- Dynamic Type: support `allowFontScaling`, test at AX5 (largest)
- Min text: 11pt iOS. Prefer 13pt+.
- Contrast: 4.5:1 normal text, 3:1 large text
- Never color-only info — add shapes, icons, labels
- VoiceOver: `accessibilityLabel` on all interactive elements, logical navigation order

### Hearing
- Pair audio cues with haptics (`expo-haptics`)
- Pair audio with visual indicators

### Mobility
- Min touch target 44x44pt (28x28pt absolute minimum with 12pt padding)
- Simple gestures for common actions. No multi-finger custom gestures.
- Provide button alternatives for gesture actions
- Support Voice Control (label elements appropriately)

### Cognitive
- Minimize time-boxed elements (auto-dismiss)
- Reduce Motion: replace animations with fades (see Section 8)
- `accessibilityRole` on all interactive elements
- `accessibilityState` for toggles, checkboxes, disabled states
- `accessibilityHint` for complex inputs

```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Delete item"
  accessibilityHint="Removes this item from your list"
  accessibilityState={{ disabled: isLoading }}
  style={{ minHeight: 44 }}
>
```

## 14. React Native Paper — iOS Patterns

**Buttons:**
```tsx
// Primary: contained, full width, 50pt, capsule
<Button mode="contained" style={{ borderRadius: 25, paddingVertical: 4 }}>

// Secondary: outlined
<Button mode="outlined">

// Tertiary: text
<Button mode="text">
```

**Components:**
- `TextInput` with `label` prop (floating labels = iOS standard)
- `HelperText` for field errors
- `Chip` for selection (not toggle buttons)
- `SegmentedButtons` for exclusive choices (2-5 options)
- `Divider` between sections
- `Menu` for overflow actions

## 15. Screen Review Checklist

Run before marking any screen done:

**Layout:**
- [ ] `SafeAreaView` or `useSafeAreaInsets` wrapping content
- [ ] Consistent horizontal padding (16 or 20pt — pick one for whole app)
- [ ] Spacing follows 8pt grid
- [ ] No layout shifts on keyboard open/close
- [ ] Shapes are concentric (nested elements have proportional radii)

**Colors & Theme:**
- [ ] All colors from `useTheme()` — zero hardcoded hex
- [ ] Tested in both light and dark mode
- [ ] Contrast >= 4.5:1 for all text

**Typography:**
- [ ] Paper variants used consistently
- [ ] Dynamic Type tested at largest size

**Interaction:**
- [ ] All tap targets >= 44pt
- [ ] Navigation: back button + swipe-back gesture works
- [ ] Loading states on async buttons
- [ ] Error states handled per-field

**Forms (if applicable):**
- [ ] `KeyboardAvoidingView` present
- [ ] `returnKeyType` set on all inputs
- [ ] `autoComplete` / `textContentType` set for autofill

**Animation (if applicable):**
- [ ] Animations use spring-based timing
- [ ] Reduce Motion respected (crossfade fallback)
- [ ] No animation > 0.5s

**Accessibility:**
- [ ] `accessibilityLabel` on all interactive elements
- [ ] `accessibilityRole` set correctly
- [ ] No info conveyed by color alone
- [ ] VoiceOver navigation order is logical
