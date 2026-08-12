import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { AuthStore } from '../../features/auth/services/auth.store';

const APP_PREFIX = 'frontend-senior-lab';

/**
 * Service that provides user-scoped localStorage access.
 *
 * All keys are automatically namespaced with the current user's ID,
 * ensuring that multiple users on the same browser have isolated data.
 *
 * When no user is authenticated, operations are no-ops (reads return null, writes are ignored).
 * When the user changes (login/logout), a `userChanged` signal emits so stores can reload.
 */
@Injectable({
  providedIn: 'root',
})
export class UserStorageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authStore = inject(AuthStore);

  /** Incremented every time the active user changes — stores can watch this to reload */
  private readonly userChangeCounter = signal(0);
  readonly userChanged = this.userChangeCounter.asReadonly();

  private previousUserId: string | null = null;

  constructor() {
    effect(() => {
      const user = this.authStore.user();
      const currentId = user?.id ?? null;

      if (currentId !== this.previousUserId) {
        this.previousUserId = currentId;
        this.userChangeCounter.update((c) => c + 1);
      }
    });
  }

  /** Current user ID or null */
  readonly userId = computed(() => this.authStore.user()?.id ?? null);

  /**
   * Build a storage key scoped to the current user.
   * Format: `frontend-senior-lab.<userId>.<key>`
   */
  private buildKey(key: string): string | null {
    const id = this.authStore.user()?.id;

    if (!id) {
      return null;
    }

    return `${APP_PREFIX}.${id}.${key}`;
  }

  /**
   * Get an item from user-scoped storage.
   * Returns null if no user is authenticated or item doesn't exist.
   */
  getItem(key: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const scopedKey = this.buildKey(key);

    if (!scopedKey) {
      return null;
    }

    return localStorage.getItem(scopedKey);
  }

  /**
   * Set an item in user-scoped storage.
   * No-op if no user is authenticated.
   */
  setItem(key: string, value: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scopedKey = this.buildKey(key);

    if (!scopedKey) {
      return;
    }

    localStorage.setItem(scopedKey, value);
  }

  /**
   * Remove an item from user-scoped storage.
   * No-op if no user is authenticated.
   */
  removeItem(key: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scopedKey = this.buildKey(key);

    if (!scopedKey) {
      return;
    }

    localStorage.removeItem(scopedKey);
  }

  /**
   * Migrate data from a global (non-scoped) key to the current user's scope.
   * Used during the transition from shared data to per-user data.
   * Only migrates if the user-scoped key doesn't already exist.
   */
  migrateFromGlobal(globalKey: string, userKey: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scopedKey = this.buildKey(userKey);

    if (!scopedKey) {
      return;
    }

    // Only migrate if user doesn't already have data
    if (localStorage.getItem(scopedKey) !== null) {
      return;
    }

    const globalData = localStorage.getItem(globalKey);

    if (globalData !== null) {
      localStorage.setItem(scopedKey, globalData);
    }
  }
}
