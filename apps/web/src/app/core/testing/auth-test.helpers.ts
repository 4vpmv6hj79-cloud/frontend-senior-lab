import { signal } from '@angular/core';

import type { AuthUser } from '../../features/auth/models/auth.model';
import { AuthStore } from '../../features/auth/services/auth.store';

/**
 * A fake user for testing stores that depend on UserStorageService.
 */
export const TEST_USER: AuthUser = {
  id: 'test-user-001',
  name: 'Test User',
  email: 'test@example.com',
  role: 'student',
  createdAt: '2024-01-01T00:00:00.000Z',
};

/**
 * Creates a mock AuthStore that always returns the TEST_USER.
 * Use with TestBed.configureTestingModule({ providers: [mockAuthStoreProvider()] })
 */
export function mockAuthStoreProvider() {
  const userSignal = signal<AuthUser | null>(TEST_USER);

  return {
    provide: AuthStore,
    useValue: {
      user: userSignal.asReadonly(),
      isAuthenticated: signal(true).asReadonly(),
      displayName: signal(TEST_USER.name).asReadonly(),
      ready: signal(true).asReadonly(),
      register: () => Promise.resolve({ success: true, user: TEST_USER }),
      login: () => Promise.resolve({ success: true, user: TEST_USER }),
      loginWithGoogle: () => Promise.resolve({ success: true, user: TEST_USER }),
      logout: () => { userSignal.set(null); },
      updateName: () => true,
      sendPasswordReset: () => Promise.resolve(true),
    },
  };
}

/**
 * Returns the storage key prefix for the test user.
 */
export function testUserStorageKey(key: string): string {
  return `frontend-senior-lab.${TEST_USER.id}.${key}`;
}
