import NodeCache from 'node-cache';

/**
 * Cache for Expo/React Native documentation
 * TTL: 15 minutes (900 seconds) - Expo docs update frequently
 */
export class DocCache {
  private cache: NodeCache;

  constructor(ttlSeconds: number = 900) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: 300, // Check for expired keys every 5 minutes
      useClones: false,
    });
  }

  get(key: string): string | undefined {
    return this.cache.get<string>(key);
  }

  set(key: string, value: string): void {
    this.cache.set(key, value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  flush(): void {
    this.cache.flushAll();
  }

  getStats() {
    return this.cache.getStats();
  }
}

export const docCache = new DocCache();
