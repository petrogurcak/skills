import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface LiquidGlassDocsParams {
  component: string;
  include_examples?: boolean;
}

export class LiquidGlassDocsTool {
  private fetcher: BaseFetcher;

  // Documentation sources
  private readonly sources = {
    callstack: 'https://raw.githubusercontent.com/callstack/liquid-glass/main/README.md',
    blurView: 'https://raw.githubusercontent.com/Kureev/react-native-blur/master/README.md',
    expoBlur: 'https://docs.expo.dev/versions/latest/sdk/blur-view',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchLiquidGlassDocs(params: LiquidGlassDocsParams): Promise<string> {
    const component = params.component.toLowerCase();
    const includeExamples = params.include_examples ?? true;

    try {
      let content = '';

      if (component.includes('liquid') || component.includes('glass')) {
        // Fetch Callstack liquid-glass docs
        content = await this.fetchCallstackLiquidGlass();
      } else if (component.includes('blur')) {
        // Fetch expo-blur docs
        content = await this.fetchExpoBlur();
      } else {
        // Fetch all
        content = await this.fetchAllDocs();
      }

      return this.formatResponse(component, content, includeExamples);
    } catch (error) {
      return this.handleError(component, error);
    }
  }

  private async fetchCallstackLiquidGlass(): Promise<string> {
    try {
      const content = await this.fetcher.fetchDoc(this.sources.callstack, {
        useCache: true,
      });
      return content;
    } catch {
      // Return embedded documentation if fetch fails
      return this.getEmbeddedLiquidGlassDocs();
    }
  }

  private async fetchExpoBlur(): Promise<string> {
    try {
      const content = await this.fetcher.fetchDoc(this.sources.expoBlur, {
        selector: 'main, article',
        useCache: true,
      });
      return content;
    } catch {
      return this.getEmbeddedBlurDocs();
    }
  }

  private async fetchAllDocs(): Promise<string> {
    const liquidGlass = await this.fetchCallstackLiquidGlass();
    const blur = await this.fetchExpoBlur();

    return `# Liquid Glass Libraries\n\n${liquidGlass}\n\n---\n\n# Expo Blur\n\n${blur}`;
  }

  private formatResponse(
    component: string,
    content: string,
    includeExamples: boolean
  ): string {
    let response = `# Liquid Glass / Blur Effects: ${component}\n\n`;
    response += `**Platform Support:**\n`;
    response += `- Liquid Glass: iOS 26+ only (falls back to blur on older iOS/Android)\n`;
    response += `- BlurView: iOS (native), Android (fallback)\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      const installation = this.fetcher.extractSection(content, 'Installation');
      const usage = this.fetcher.extractSection(content, 'Usage');
      response += installation + '\n\n' + usage;
    }

    response += '\n\n---\n\n';
    response += this.getImplementationGuide();

    return response;
  }

  private getEmbeddedLiquidGlassDocs(): string {
    return `# @callstack/liquid-glass

React Native library for Apple's Liquid Glass effect (iOS 26+).

## Installation

\`\`\`bash
npm install @callstack/liquid-glass
\`\`\`

## Components

### LiquidGlassView

Individual glass effect element.

\`\`\`tsx
import { LiquidGlassView } from '@callstack/liquid-glass';

<LiquidGlassView
  style={styles.glass}
  glassMode="regular" // 'clear' | 'regular' | 'none'
>
  <Text>Content</Text>
</LiquidGlassView>
\`\`\`

### LiquidGlassContainerView

Container for grouping glass elements (enables merging effect).

\`\`\`tsx
import { LiquidGlassContainerView, LiquidGlassView } from '@callstack/liquid-glass';

<LiquidGlassContainerView style={styles.container}>
  <LiquidGlassView style={styles.button1}>
    <Text>Button 1</Text>
  </LiquidGlassView>
  <LiquidGlassView style={styles.button2}>
    <Text>Button 2</Text>
  </LiquidGlassView>
</LiquidGlassContainerView>
\`\`\`

## Glass Modes

- **clear**: More transparent glass effect
- **regular**: Standard glass blur effect
- **none**: No glass effect

## Platform Behavior

- **iOS 26+**: Real Liquid Glass effect with refraction
- **iOS < 26**: Falls back to regular View
- **Android**: Falls back to regular View

## Accessibility

Automatically respects "Reduce Transparency" setting - shows solid fallback when enabled.

## Performance

- GPU-accelerated blur
- Avoid stacking many glass views
- Don't animate excessively`;
  }

  private getEmbeddedBlurDocs(): string {
    return `# expo-blur (BlurView)

Native blur effects for React Native.

## Installation

\`\`\`bash
npx expo install expo-blur
\`\`\`

## Usage

\`\`\`tsx
import { BlurView } from 'expo-blur';

<BlurView
  intensity={20}
  tint="light" // 'light' | 'dark' | 'default'
  style={styles.blur}
>
  <Text>Blurred content behind</Text>
</BlurView>
\`\`\`

## Props

- **intensity** (number): Blur intensity 0-100
- **tint** ('light' | 'dark' | 'default'): Color tint
- **experimentalBlurMethod** ('dimezisBlurView' | 'none'): Android blur method

## Platform Notes

### iOS
- Native UIVisualEffectView
- Excellent performance
- Full blur support

### Android
- Requires experimentalBlurMethod for real blur
- Falls back to semi-transparent overlay otherwise
- Performance varies by device

## Accessibility

Respects "Reduce Transparency" accessibility setting.`;
  }

  private getImplementationGuide(): string {
    return `## Implementation Guide

### For iOS 26+ (Liquid Glass)

\`\`\`tsx
import { LiquidGlassView } from '@callstack/liquid-glass';
import * as Haptics from 'expo-haptics';

function GlassButton({ onPress, children }) {
  return (
    <LiquidGlassView
      style={styles.button}
      glassMode="regular"
      onTouchEnd={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.();
      }}
    >
      {children}
    </LiquidGlassView>
  );
}
\`\`\`

### For iOS < 26 / Android (BlurView fallback)

\`\`\`tsx
import { BlurView } from 'expo-blur';
import { Platform, useColorScheme } from 'react-native';

function GlassCard({ children }) {
  const colorScheme = useColorScheme();
  const tint = colorScheme === 'dark' ? 'dark' : 'light';

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && (
        <BlurView
          intensity={20}
          tint={tint}
          style={StyleSheet.absoluteFill}
        />
      )}
      {children}
    </View>
  );
}
\`\`\`

### With Tamagui

\`\`\`tsx
import { styled, Stack } from '@tamagui/core';
import { BlurView } from 'expo-blur';

const GlassStack = styled(Stack, {
  overflow: 'hidden',
  borderRadius: '$lg',
  borderWidth: 1,
  borderColor: 'rgba(255,255,255,0.2)',
});

function TamaguiGlassCard({ children }) {
  return (
    <GlassStack>
      <BlurView intensity={20} style={StyleSheet.absoluteFill} />
      {children}
    </GlassStack>
  );
}
\`\`\`

### Accessibility Considerations

\`\`\`tsx
import { AccessibilityInfo, useReducedTransparency } from 'react-native';

function AccessibleGlass({ children }) {
  const reduceTransparency = useReducedTransparency();

  if (reduceTransparency) {
    // Show solid background instead
    return (
      <View style={[styles.card, { backgroundColor: '#fff' }]}>
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={20}>
      {children}
    </BlurView>
  );
}
\`\`\``;
  }

  private handleError(component: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Liquid Glass Docs Error: ${component}

**Error:** ${message}

**Available Components:**

- **LiquidGlassView** - Individual glass element (iOS 26+)
- **LiquidGlassContainerView** - Container for merging glass elements
- **BlurView** - expo-blur for older iOS/Android fallback

**Libraries:**

- @callstack/liquid-glass - Liquid Glass for React Native
- expo-blur - Native blur effects
- @react-native-community/blur - Alternative blur library

**Installation:**

\`\`\`bash
# Liquid Glass (iOS 26+)
npm install @callstack/liquid-glass

# Expo Blur (fallback)
npx expo install expo-blur
\`\`\``;
  }
}
