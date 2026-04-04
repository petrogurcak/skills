import NodeCache from 'node-cache';

/**
 * Cache for frontend documentation
 * TTL: 20 minutes (1200 seconds) - Frontend docs update infrequently
 */
export class DocCache {
  private cache: NodeCache;

  constructor(ttlSeconds: number = 1200) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: 600, // Check for expired keys every 10 minutes
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
