import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
} from '@angular/router';

import { AuthStore } from '../services/auth.store';

/**
 * Waits for Firebase Auth to finish initializing before checking auth state.
 * Without this, on page refresh the guard would see isAuthenticated=false
 * before onAuthStateChanged fires.
 */
function waitForAuth(authStore: AuthStore): Promise<void> {
  if (authStore.ready()) return Promise.resolve();

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (authStore.ready()) {
        clearInterval(interval);
        resolve();
      }
    }, 20);
  });
}

export const authGuard: CanActivateFn = async (
  _route,
  state,
) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  await waitForAuth(authStore);

  if (authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree(
    ['/login'],
    {
      queryParams: {
        returnUrl: state.url,
      },
    },
  );
};

export const guestGuard: CanActivateFn = async () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  await waitForAuth(authStore);

  if (!authStore.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([
    '/dashboard',
  ]);
};
