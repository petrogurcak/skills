import { BaseFetcher } from '../fetchers/base-fetcher.js';

export interface ReanimatedDocsParams {
  topic: string;
  include_examples?: boolean;
}

export class ReanimatedDocsTool {
  private fetcher: BaseFetcher;
  private readonly baseUrl = 'https://docs.swmansion.com/react-native-reanimated';

  // Map of topics to their docs paths
  private readonly topicPaths: Record<string, string> = {
    // Fundamentals
    'getting-started': '/docs/fundamentals/getting-started',
    'your-first-animation': '/docs/fundamentals/your-first-animation',
    'animating-styles-and-props': '/docs/fundamentals/animating-styles-and-props',
    'applying-modifiers': '/docs/fundamentals/applying-modifiers',
    'customizing-animation': '/docs/fundamentals/customizing-animation',
    'handling-gestures': '/docs/fundamentals/handling-gestures',
    'glossary': '/docs/fundamentals/glossary',

    // Core
    'useanimatedstyle': '/docs/core/useAnimatedStyle',
    'usesharedvalue': '/docs/core/useSharedValue',
    'usederivedvalue': '/docs/core/useDerivedValue',
    'useanimatedprops': '/docs/core/useAnimatedProps',
    'useanimatedref': '/docs/core/useAnimatedRef',
    'useanimatedscrollhandler': '/docs/scroll/useAnimatedScrollHandler',

    // Animations
    'withspring': '/docs/animations/withSpring',
    'withtiming': '/docs/animations/withTiming',
    'withdecay': '/docs/animations/withDecay',
    'withsequence': '/docs/animations/withSequence',
    'withdelay': '/docs/animations/withDelay',
    'withrepeat': '/docs/animations/withRepeat',
    'cancelanimation': '/docs/animations/cancelAnimation',

    // Layout Animations
    'layout-animations': '/docs/layout-animations/layout-animations',
    'entering': '/docs/layout-animations/entering-exiting-animations',
    'exiting': '/docs/layout-animations/entering-exiting-animations',
    'layout-transitions': '/docs/layout-animations/layout-transitions',
    'keyframe-animations': '/docs/layout-animations/keyframe-animations',

    // Scroll
    'scroll': '/docs/scroll/useAnimatedScrollHandler',
    'scrollto': '/docs/scroll/scrollTo',
    'usescrollviewoffset': '/docs/scroll/useScrollViewOffset',

    // Advanced
    'worklets': '/docs/fundamentals/glossary#worklet',
    'shared-values': '/docs/fundamentals/glossary#shared-value',
    'runOnJS': '/docs/threading/runOnJS',
    'runOnUI': '/docs/threading/runOnUI',

    // Gesture Handler integration
    'gesture': '/docs/fundamentals/handling-gestures',
    'pan-gesture': '/docs/fundamentals/handling-gestures',
    'tap-gesture': '/docs/fundamentals/handling-gestures',

    // Components
    'animated-view': '/docs/core/createAnimatedComponent',
    'animated-text': '/docs/core/createAnimatedComponent',
    'animated-scrollview': '/docs/core/createAnimatedComponent',
  };

  constructor() {
    this.fetcher = new BaseFetcher();
  }

  async fetchReanimatedDocs(params: ReanimatedDocsParams): Promise<string> {
    const topic = params.topic.toLowerCase().replace(/\s+/g, '-');
    const includeExamples = params.include_examples ?? true;

    // Get docs path
    let docsPath = this.topicPaths[topic];

    if (!docsPath) {
      // Try to find partial match
      const matchingKey = Object.keys(this.topicPaths).find(key =>
        key.includes(topic) || topic.includes(key)
      );
      if (matchingKey) {
        docsPath = this.topicPaths[matchingKey];
      } else {
        docsPath = `/docs/${topic}`;
      }
    }

    const url = `${this.baseUrl}${docsPath}`;

    try {
      const content = await this.fetcher.fetchDoc(url, {
        selector: 'main, article, .docMainContainer, [role="main"]',
      });

      return this.formatResponse(topic, content, url, includeExamples);
    } catch (error) {
      return this.handleError(topic, error);
    }
  }

  private formatResponse(
    topic: string,
    content: string,
    url: string,
    includeExamples: boolean
  ): string {
    let response = `# React Native Reanimated: ${topic}\n\n`;
    response += `**Documentation:** ${url}\n\n`;
    response += `**Version:** Reanimated 3.x (React Native 0.79+)\n\n`;
    response += '---\n\n';

    if (includeExamples) {
      response += content;
    } else {
      const usage = this.fetcher.extractSection(content, 'Usage');
      const api = this.fetcher.extractSection(content, 'Arguments');
      response += usage + '\n\n' + api;
    }

    response += '\n\n---\n\n';
    response += this.getTopicTips(topic);

    return response;
  }

  private getTopicTips(topic: string): string {
    const tips: Record<string, string> = {
      'withspring': `**Spring Animation Tips:**

\`\`\`tsx
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function SpringExample() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, {
      damping: 15,        // Lower = more bouncy
      stiffness: 200,     // Higher = faster
      mass: 1,            // Higher = slower
    });
  };

  return (
    <Animated.View style={animatedStyle} onTouchEnd={handlePress} />
  );
}
\`\`\`

**Spring Config Presets:**
- Bouncy: { damping: 8, stiffness: 100 }
- Snappy: { damping: 20, stiffness: 300 }
- Gentle: { damping: 15, stiffness: 100 }`,

      'withtiming': `**Timing Animation Tips:**

\`\`\`tsx
import { withTiming, Easing } from 'react-native-reanimated';

// Basic timing
opacity.value = withTiming(1, { duration: 300 });

// With easing
scale.value = withTiming(1.2, {
  duration: 250,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
});

// iOS-like ease
scale.value = withTiming(1, {
  duration: 200,
  easing: Easing.out(Easing.ease),
});
\`\`\`

**Common Easings:**
- Easing.linear
- Easing.ease (default)
- Easing.bezier(x1, y1, x2, y2)
- Easing.in/out/inOut(Easing.ease)`,

      'useanimatedstyle': `**useAnimatedStyle Tips:**

\`\`\`tsx
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

function Example() {
  const offset = useSharedValue(0);
  const opacity = useSharedValue(1);

  // Combine multiple animated values
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: opacity.value,
  }));

  return <Animated.View style={[styles.box, animatedStyle]} />;
}
\`\`\`

**Rules:**
- Only access .value inside useAnimatedStyle
- Don't call hooks inside useAnimatedStyle
- Use worklets for complex calculations`,

      'gesture': `**Gesture Handler Integration:**

\`\`\`tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function DraggableBox() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
}
\`\`\``,

      'layout-animations': `**Layout Animation Tips:**

\`\`\`tsx
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

function AnimatedList({ items }) {
  return (
    <View>
      {items.map((item) => (
        <Animated.View
          key={item.id}
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          layout={Layout.springify()}
        >
          <Text>{item.name}</Text>
        </Animated.View>
      ))}
    </View>
  );
}
\`\`\`

**Common Entering/Exiting:**
- FadeIn / FadeOut
- SlideInRight / SlideOutRight
- ZoomIn / ZoomOut
- BounceIn / BounceOut`,

      'usesharedvalue': `**useSharedValue Tips:**

\`\`\`tsx
import { useSharedValue } from 'react-native-reanimated';

// Create shared value
const progress = useSharedValue(0);

// Update (triggers animation when used with withSpring/withTiming)
progress.value = 1;

// Update with animation
progress.value = withSpring(1);

// Read current value (on JS thread)
console.log(progress.value);
\`\`\`

**Best Practices:**
- Don't create shared values in loops
- Use one shared value per animated property
- Reset values in useEffect cleanup`,
    };

    return tips[topic] || `**Reference:** ${this.baseUrl}/docs`;
  }

  private handleError(topic: string, error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);

    return `# Reanimated Topic Not Found: ${topic}

**Error:** ${message}

**Available Topics:**

**Fundamentals:** getting-started, your-first-animation, handling-gestures

**Core Hooks:** useAnimatedStyle, useSharedValue, useDerivedValue, useAnimatedProps

**Animations:** withSpring, withTiming, withDecay, withSequence, withDelay, withRepeat

**Layout Animations:** entering, exiting, layout-transitions, keyframe-animations

**Scroll:** useAnimatedScrollHandler, scrollTo, useScrollViewOffset

**Reference:** https://docs.swmansion.com/react-native-reanimated`;
  }
}
