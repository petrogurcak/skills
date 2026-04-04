import NodeCache from 'node-cache';

/**
 * Cache for documentation to reduce network requests
 * TTL: 30 minutes (1800 seconds)
 */
export class DocCache {
  private cache: NodeCache;

  constructor(ttlSeconds: number = 1800) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: 600, // Check for expired keys every 10 minutes
      useClones: false, // Don't clone objects (faster)
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
