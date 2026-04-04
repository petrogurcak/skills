# React Native + Expo Development Guide

This project uses React Native + Expo with TDD and docs-first principles.

## Quick Start

**Before any code:**
1. Read `.claude/CORE_PRINCIPLES.md` - 11 core principles + Expo rules
2. Understand `.claude/WORKFLOWS.md` - TDD workflow with Expo
3. Check `.claude/CHECKPOINTS.md` - When to ask

## Expo Workflow

**For new features (e.g., "Create ProductCard component"):**
```
1. Git Branch First
   Ask: "Create branch? (yes/no)"

2. Docs-First - MANDATORY
   fetch_rn_docs(topic: "View")
   fetch_expo_sdk(module: "expo-image")

3. TDD Cycle
   RED: Write failing test
   GREEN: Implement using docs
   REFACTOR: Improve

4. Verify
   npm test -> All passed
   npx expo lint -> 0 errors
   npx expo start -> App runs

5. Ask to commit
   "Commit? (yes/no)"
```

## Tech Stack

- **Expo SDK 54+**
- **React Native 0.79+** (New Architecture)
- **React 19+**
- **TypeScript 5.3+**
- **Test**: `npm test` (Jest)
- **Lint**: `npx expo lint`

**Note:** expo-av is deprecated - use expo-video + expo-audio

## MCP Tools (Docs-First)

Available via `expo-workflow.skill`:
- `fetch_expo_sdk(module)` - expo-camera, expo-image, expo-video
- `fetch_rn_docs(topic)` - View, FlatList, StyleSheet
- `fetch_expo_router(topic)` - file-based-routing, tabs, navigation
- `fetch_npm_docs(package)` - zustand, nativewind, etc.

## Critical Expo Rules

From `.claude/CORE_PRINCIPLES.md` Section 8:

1. **Every component MUST:**
   - Use functional components with hooks
   - Have proper TypeScript types
   - Use StyleSheet.create (not inline styles)
   - Handle accessibility (accessibilityLabel)

2. **State management MUST:**
   - Choose one pattern (Zustand/Context/Redux)
   - Use memo/useCallback for performance
   - Handle async with loading/error states

3. **Navigation MUST:**
   - Use Expo Router (file-based)
   - Type-safe routes
   - Handle deep linking

## Active Skills

- **project-setup** - Initial setup (done!)
- **expo-workflow** - Development workflows + MANDATORY docs-first

## Documentation

- `.claude/CORE_PRINCIPLES.md` - Complete principles + Expo rules
- `.claude/WORKFLOWS.md` - TDD with Expo commands
- `.claude/CHECKPOINTS.md` - When to ask

---

**Ready! Try: "Create ProductCard with expo-image"**
