import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

/**
 * Client-side rate limiter to prevent brute force attacks on login.
 *
 * Tracks failed attempts per action and blocks after MAX_ATTEMPTS.
 * Lockout resets after LOCKOUT_DURATION_MS.
 *
 * Note: This is a UI-level protection. Firebase Auth also has its own
 * server-side rate limiting that kicks in after multiple failures.
 */
@Injectable({
  providedIn: 'root',
})
export class RateLimiterService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly MAX_ATTEMPTS = 5;
  private readonly LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

  private attempts = new Map<string, { count: number; lastAttempt: number; lockedUntil: number | null }>();

  /**
   * Check if an action is currently blocked.
   */
  isBlocked(action: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const record = this.attempts.get(action);
    if (!record || !record.lockedUntil) return false;

    if (Date.now() > record.lockedUntil) {
      // Lockout expired, reset
      this.attempts.delete(action);
      return false;
    }

    return true;
  }

  /**
   * Get remaining lockout time in seconds.
   */
  getRemainingLockoutSeconds(action: string): number {
    const record = this.attempts.get(action);
    if (!record?.lockedUntil) return 0;

    const remaining = record.lockedUntil - Date.now();
    return Math.max(0, Math.ceil(remaining / 1000));
  }

  /**
   * Record a failed attempt. Returns true if now blocked.
   */
  recordFailure(action: string): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const existing = this.attempts.get(action) ?? { count: 0, lastAttempt: 0, lockedUntil: null };

    existing.count += 1;
    existing.lastAttempt = Date.now();

    if (existing.count >= this.MAX_ATTEMPTS) {
      existing.lockedUntil = Date.now() + this.LOCKOUT_DURATION_MS;
    }

    this.attempts.set(action, existing);

    return existing.count >= this.MAX_ATTEMPTS;
  }

  /**
   * Reset attempts after a successful action.
   */
  reset(action: string): void {
    this.attempts.delete(action);
  }
}
