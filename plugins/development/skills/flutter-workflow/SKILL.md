---
name: flutter-workflow
description: Use when working with Flutter/Dart - enforces DOCS-FIRST workflow where AI MUST fetch current documentation BEFORE proposing any implementation (workflows for widgets, state management, navigation, platform integration)
---

# Flutter Workflow-Driven Development Skill

## CRITICAL PRINCIPLE

**DOCS FIRST, CODE SECOND**

You MUST NEVER generate Flutter code without first fetching relevant documentation via MCP tools.

This is NON-NEGOTIABLE. Every workflow below has MANDATORY MCP fetch steps that MUST be completed before implementation.

## When to Use This Skill

Use this skill for ALL Flutter development tasks:
- Creating widgets (Stateless/Stateful/Inherited)
- Implementing state management
- Setting up navigation/routing
- Platform-specific code (iOS/Android/Web)
- UI layout and composition
- Any Dart/Flutter code generation

## Core Workflows

### Workflow 1: Creating Widgets

**Use for:** Creating any new Flutter widget

**MANDATORY CHECKLIST:**

```
☐ 1. Determine widget type
     - Stateless (no internal state)
     - Stateful (internal state with setState)
     - Inherited (providing data down tree)

☐ 2. ⚠️ MANDATORY: Fetch widget documentation
     Call MCP tool: fetch_widget_docs(widget_type)
     Wait for response before continuing

☐ 3. ⚠️ MANDATORY: Fetch Material/Cupertino guidelines (if UI component)
     Call MCP tool: get_material_design_guidelines(component_type)
     Wait for response before continuing

☐ 4. Plan widget structure based on fetched docs
     - Constructor parameters (required vs optional)
     - Build method structure
     - Internal state if Stateful

☐ 5. Implement widget following current API:
     - const constructor where possible
     - Proper null safety (no ! abuse)
     - Immutable properties
     - Key parameter if needed

☐ 6. Implement build() method:
     - Follow fetched Material/Cupertino patterns
     - Use const widgets where possible
     - Proper composition over inheritance

☐ 7. VERIFY against quality checklist:
     ✓ Uses Flutter 3.x+ APIs (no deprecated)
     ✓ Dart 3.x+ null safety
     ✓ const constructors used
     ✓ Proper accessibility (Semantics)
     ✓ Follows fetched guidelines
```

**Example Execution:**

```dart
// WRONG: Generating code without fetching docs
class ProfileWidget extends StatefulWidget { ... }

// CORRECT: Workflow followed
// 1. Determined: Stateful widget needed
// 2. Called: fetch_widget_docs("StatefulWidget")
// 3. Reviewed current StatefulWidget API from docs
// 4. Called: get_material_design_guidelines("card")
// 5. Now implementing with current API:

class ProfileWidget extends StatefulWidget {
  const ProfileWidget({
    super.key,
    required this.userId,
  });

  final String userId;

  @override
  State<ProfileWidget> createState() => _ProfileWidgetState();
}

class _ProfileWidgetState extends State<ProfileWidget> {
  // Implementation following fetched docs...
}
```

### Workflow 2: State Management

**Use for:** Any state management implementation

**MANDATORY CHECKLIST:**

```
☐ 1. Identify state scope:
     - Local (single widget) → setState
     - Subtree (section of app) → InheritedWidget/Provider
     - Feature (module-wide) → Riverpod/BLoC
     - App-wide (global) → Riverpod/BLoC with repositories

☐ 2. Choose state management solution:
     - Provider (simple, lightweight)
     - Riverpod (modern, compile-safe)
     - BLoC (predictable, testable)
     - GetX (batteries-included)

☐ 3. ⚠️ MANDATORY: Fetch state management patterns
     Call MCP tool: fetch_state_management_pattern(solution, use_case)
     Wait for response before continuing

☐ 4. ⚠️ MANDATORY: Fetch package docs (if using package)
     Call MCP tool: get_package_docs(package_name)
     Example: get_package_docs("flutter_riverpod")
     Wait for response before continuing

☐ 5. Set up state classes following fetched patterns:
     - Use sealed classes for state variants (Dart 3)
     - Immutable state with records or freezed
     - Clear state naming (loading, success, error)

☐ 6. Implement state update logic:
     - Pure functions (no side effects in reducers)
     - Immutability (copyWith patterns)
     - Async handling with proper error catching

☐ 7. Connect state to UI:
     - Use Consumer/Watch patterns from docs
     - Proper widget rebuild optimization
     - Loading/error UI states

☐ 8. VERIFY disposal and cleanup:
     ✓ Controllers/notifiers properly disposed
     ✓ Stream subscriptions cancelled
     ✓ No memory leaks
     ✓ Proper provider scope
```

**Decision Tree: Which State Solution?**

```
State complexity?
├─ Simple (1-2 properties) → setState or Provider
├─ Medium (3-10 properties) → Riverpod or Provider
└─ Complex (>10, async, business logic) → Riverpod or BLoC

Testability requirement?
├─ High → BLoC (well-defined streams)
└─ Medium → Riverpod (easy to mock)

Team familiarity?
├─ New to Flutter → Provider (simple)
├─ Modern Flutter → Riverpod (recommended)
└─ Large apps → BLoC (architecture)
```

### Workflow 3: Navigation & Routing

**Use for:** Setting up navigation, routes, deep linking

**MANDATORY CHECKLIST:**

```
☐ 1. Choose routing solution:
     - Named routes (simple, legacy)
     - Navigator 2.0 (declarative, complex)
     - GoRouter (recommended, type-safe)

☐ 2. ⚠️ MANDATORY: Fetch navigation documentation
     Call MCP tool: fetch_navigation_docs(solution)
     If GoRouter: also call get_package_docs("go_router")
     Wait for responses before continuing

☐ 3. Define route structure:
     - List all app routes
     - Identify route parameters
     - Plan nested navigation if needed

☐ 4. Implement routing configuration:
     - Follow fetched patterns exactly
     - Type-safe route definitions
     - Route parameters with proper types

☐ 5. Set up deep linking (if needed):
     ⚠️ MANDATORY: fetch_navigation_docs(solution, "deep-linking")
     - URL patterns
     - Route parsing
     - Platform setup (iOS/Android)

☐ 6. Implement route guards/middleware (if needed):
     - Authentication checks
     - Authorization logic
     - Redirect logic

☐ 7. VERIFY navigation:
     ✓ Type-safe navigation (no string errors)
     ✓ Proper back button handling
     ✓ Deep links work
     ✓ Route transitions smooth
     ✓ Parameters passed correctly
```

### Workflow 4: Platform Integration

**Use for:** Platform channels, native code, platform-specific features

**MANDATORY CHECKLIST:**

```
☐ 1. Identify platform feature:
     - Camera/Photos
     - Biometrics
     - Native APIs
     - File system
     - Sensors

☐ 2. ⚠️ MANDATORY: Fetch platform integration docs
     Call MCP tool: fetch_platform_integration(feature, platform)
     Call for each platform (iOS, Android, Web if needed)
     Wait for responses before continuing

☐ 3. Decide implementation approach:
     - Use existing package (check pub.dev)
     - Create platform channel
     - Use FFI (for C/C++)

☐ 4. If using package:
     ⚠️ MANDATORY: get_package_docs(package_name)
     Follow package integration guide

☐ 5. If creating platform channel:
     - Define method channel interface
     - Implement Flutter side (Dart)
     - Implement native side (Kotlin/Swift)
     - Handle errors and edge cases

☐ 6. Handle platform-specific code:
     - Use Platform.isIOS/isAndroid checks
     - Provide fallbacks for unsupported platforms
     - Test on all target platforms

☐ 7. VERIFY platform integration:
     ✓ Works on all target platforms
     ✓ Proper error handling
     ✓ Fallbacks for unsupported features
     ✓ No platform-specific crashes
```

### Workflow 5: UI Layout & Composition

**Use for:** Creating complex layouts, custom UI

**MANDATORY CHECKLIST:**

```
☐ 1. Plan layout structure:
     - Identify layout widgets needed (Column, Row, Stack, etc.)
     - Determine responsive requirements
     - Plan animation needs

☐ 2. ⚠️ MANDATORY: Fetch layout widget docs
     For each main layout widget:
     Call MCP tool: fetch_widget_docs(widget_name)
     Example: fetch_widget_docs("CustomScrollView")
     Wait for responses

☐ 3. ⚠️ MANDATORY: Fetch Material guidelines (if applicable)
     Call MCP tool: get_material_design_guidelines(component)
     Wait for response

☐ 4. Implement layout:
     - Use const widgets aggressively
     - Proper constraints (don't over-constrain)
     - Keys where needed (for lists)

☐ 5. Add responsive behavior:
     - MediaQuery for screen dimensions
     - LayoutBuilder for adaptive layouts
     - Breakpoints for tablet/desktop

☐ 6. Optimize performance:
     ⚠️ If complex: fetch_performance_guidelines("rendering")
     - Const constructors
     - RepaintBoundary where needed
     - Avoid expensive builds

☐ 7. VERIFY layout:
     ✓ Responsive on different screen sizes
     ✓ No overflow errors
     ✓ Smooth scrolling
     ✓ Proper accessibility
```

### Workflow 6: Adding Dependencies

**Use for:** Adding any pub.dev package

**MANDATORY CHECKLIST:**

```
☐ 1. Identify package need:
     - Search pub.dev for solution
     - Check package popularity and maintenance
     - Verify Flutter 3.x+ compatibility

☐ 2. ⚠️ MANDATORY: Fetch package documentation
     Call MCP tool: get_package_docs(package_name)
     Wait for response before continuing

☐ 3. Review package docs:
     - Installation instructions
     - Platform-specific setup
     - Breaking changes in recent versions

☐ 4. Add to pubspec.yaml:
     - Use latest stable version
     - Check version constraints

☐ 5. Platform-specific setup (if required):
     - iOS: Podfile, Info.plist changes
     - Android: build.gradle, AndroidManifest changes
     - Follow package instructions exactly

☐ 6. Import and use package:
     - Follow examples from fetched docs
     - Use current API (check for deprecations)

☐ 7. VERIFY package integration:
     ✓ Builds successfully on all platforms
     ✓ No conflicts with other packages
     ✓ Features work as expected
```

## Code Quality Requirements

### Dart 3.x+ Requirements (MANDATORY)

**Language Features:**
```dart
// ✓ CORRECT: Records for simple data
final user = (name: 'John', age: 30);

// ✓ CORRECT: Sealed classes for state
sealed class LoadingState {}
class Loading extends LoadingState {}
class Success extends LoadingState {
  final Data data;
  Success(this.data);
}
class Error extends LoadingState {
  final String message;
  Error(this.message);
}

// ✓ CORRECT: Pattern matching
switch (state) {
  case Loading(): return CircularProgressIndicator();
  case Success(:final data): return DataView(data);
  case Error(:final message): return ErrorView(message);
}

// ✗ WRONG: Using old patterns
// Don't use unions via inheritance without sealed
// Don't ignore pattern matching for state
```

**Null Safety:**
```dart
// ✓ CORRECT: Proper null safety
String? getName() => user?.name;
final name = getName() ?? 'Unknown';

// ✓ CORRECT: Late with initialization guarantee
late final String userId = fetchUserId();

// ✗ WRONG: Null check operator abuse
final name = user!.name!; // Don't do this

// ✗ WRONG: Ignoring nullability
String name = possiblyNullValue; // Error
```

**Lints & Analysis:**
```yaml
# Must have in analysis_options.yaml
analyzer:
  language:
    strict-casts: true
    strict-inference: true
    strict-raw-types: true

linter:
  rules:
    - prefer_const_constructors
    - prefer_const_declarations
    - use_key_in_widget_constructors
    - prefer_final_fields
    - avoid_print
```

### Flutter 3.x+ Requirements (MANDATORY)

**Material Design 3:**
```dart
// ✓ CORRECT: Material 3 theme
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
  ),
);

// ✗ WRONG: Material 2
// Don't use old ThemeData without useMaterial3
```

**Widget Construction:**
```dart
// ✓ CORRECT: Const constructors
const Text('Hello');
const SizedBox(height: 16);
const Padding(padding: EdgeInsets.all(8), child: ...);

// ✓ CORRECT: Keys for lists
ListView.builder(
  itemBuilder: (context, index) => ListTile(
    key: Key('item_$index'), // Important for animations
    ...
  ),
);

// ✗ WRONG: No const where possible
Text('Hello'); // Should be const
```

**Accessibility:**
```dart
// ✓ CORRECT: Semantic labels
Semantics(
  label: 'Profile photo of ${user.name}',
  child: Image.network(user.photoUrl),
)

// ✓ CORRECT: Exclude decorative
Semantics(
  excludeSemantics: true,
  child: DecorativeImage(),
)

// ✗ WRONG: No semantics for interactive elements
IconButton(icon: Icon(Icons.delete), onPressed: ...); // Missing label
```

## Decision Trees

### Widget Type Selection

```
Do you need internal state that changes over time?
├─ NO → Can parent pass all data?
│   ├─ YES → StatelessWidget
│   └─ NO → Inherited or State Management
│
└─ YES → Is state simple (1-3 properties)?
    ├─ YES → StatefulWidget with setState
    └─ NO → State Management (Provider/Riverpod/BLoC)
```

### Layout Widget Selection

```
What's your layout pattern?
├─ Vertical stack → Column (or ListView if scrollable)
├─ Horizontal row → Row (or ListView horizontal)
├─ Layered/overlapping → Stack
├─ Scrollable → ListView/GridView/CustomScrollView
├─ Flexible sizes → Expanded/Flexible in Row/Column
└─ Custom layout → CustomMultiChildLayout or LayoutBuilder
```

### State Management Solution

```
What's your app complexity?
├─ Simple (few screens, little state) → Provider or setState
├─ Medium (multiple features) → Riverpod or Provider
└─ Complex (many features, large team) → Riverpod or BLoC

What's your team experience?
├─ New to Flutter → Provider (easy)
├─ Experienced → Riverpod (modern, recommended)
└─ From Redux/MobX → BLoC (familiar patterns)
```

## Performance Checklist

**Before implementing any widget, consider:**

```
☐ Can this widget be const?
☐ Do I need to rebuild the whole widget or just part?
   (Use const for unchanged parts)
☐ Is this list/grid long?
   (Use .builder constructors)
☐ Am I rebuilding expensive widgets unnecessarily?
   (Use RepaintBoundary or split into smaller widgets)
☐ Do I have keys on list items?
   (Needed for correct animations and state)
```

## Common Mistakes to Avoid

**DON'T:**
- Generate code without fetching docs first
- Use deprecated Flutter 2.x APIs
- Skip null safety
- Ignore const constructors
- Put business logic in widgets
- Use setState for complex state
- Forget keys in lists
- Ignore accessibility
- Use strings for navigation (use type-safe routing)
- Abuse the ! operator
- Skip error handling in async code
- Forget to dispose controllers/streams

**DO:**
- ALWAYS fetch documentation before implementing
- Follow workflows step-by-step
- Use Dart 3 features (records, patterns, sealed classes)
- Make widgets as const as possible
- Separate UI from logic
- Choose appropriate state management
- Add semantic labels
- Use type-safe navigation
- Handle all null cases properly
- Catch errors in async operations
- Dispose resources properly

## Integration with MCP Server

This skill works in tandem with the Flutter MCP server. The MCP provides the WHAT (current APIs, patterns, docs), this skill provides the WHEN and HOW (workflows, process).

**Available MCP Tools (call as needed per workflows):**

1. `fetch_widget_docs(widget_name)` - Widget API and lifecycle
2. `fetch_state_management_pattern(solution, use_case)` - State patterns
3. `fetch_navigation_docs(solution)` - Navigation setup
4. `search_flutter_api(query)` - API reference
5. `get_material_design_guidelines(component)` - Material 3 patterns
6. `fetch_platform_integration(feature, platform)` - Platform-specific code
7. `search_dart_docs(topic)` - Dart language features
8. `get_package_docs(package_name)` - pub.dev packages
9. `fetch_performance_guidelines(topic)` - Performance optimization
10. `get_testing_patterns(test_type)` - Testing approaches

**You MUST call these tools at the workflow steps marked with ⚠️ MANDATORY**

## Verification Before Completion

Before considering any Flutter implementation complete:

```
FINAL VERIFICATION CHECKLIST:
☐ All MANDATORY MCP tool calls were made
☐ Implementation follows fetched documentation
☐ Uses Flutter 3.x+ APIs (no deprecations)
☐ Uses Dart 3.x+ features appropriately
☐ Null safety is correct
☐ Const constructors used where possible
☐ Accessibility considered (Semantics)
☐ Error handling implemented
☐ Resources properly disposed
☐ No performance anti-patterns
☐ Code follows current best practices from docs
```

## Summary

This skill enforces a DOCS-FIRST development process:

1. **Identify task** → Choose workflow
2. **Fetch docs** → Call MCP tools (MANDATORY)
3. **Review docs** → Understand current API
4. **Implement** → Follow fetched patterns exactly
5. **Verify** → Check against quality checklist

**NEVER skip step 2.** The MCP server provides current, accurate documentation. Use it.

**Your workflows are your process.** Follow them rigorously for consistent, high-quality Flutter code that uses current APIs and best practices.
