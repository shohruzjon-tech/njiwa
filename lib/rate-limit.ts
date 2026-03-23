/**
 * In-memory rate limiter using a sliding window approach.
 * For production at scale, replace with Redis-based solution.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

export function rateLimit({
  maxRequests,
  windowMs,
}: {
  /** Maximum number of requests allowed within the window. */
  maxRequests: number;
  /** Time window in milliseconds. */
  windowMs: number;
}) {
  return function check(key: string): {
    allowed: boolean;
    remaining: number;
    retryAfterMs: number;
  } {
    cleanup(windowMs);

    const now = Date.now();
    const entry = store.get(key) || { timestamps: [] };

    // Remove timestamps outside the window
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

    if (entry.timestamps.length >= maxRequests) {
      const oldestInWindow = entry.timestamps[0];
      const retryAfterMs = oldestInWindow + windowMs - now;

      return {
        allowed: false,
        remaining: 0,
        retryAfterMs,
      };
    }

    entry.timestamps.push(now);
    store.set(key, entry);

    return {
      allowed: true,
      remaining: maxRequests - entry.timestamps.length,
      retryAfterMs: 0,
    };
  };
}
