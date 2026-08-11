import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { vi } from 'vitest';

import { AuthStore } from '../services/auth.store';
import {
  authGuard,
  guestGuard,
} from './auth.guards';

describe('Authentication guards', () => {
  const authStoreMock = {
    isAuthenticated: vi.fn(),
  };

  let router: Router;

  beforeEach(() => {
    authStoreMock.isAuthenticated.mockReset();

    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthStore,
          useValue: authStoreMock,
        },
      ],
    });

    router = TestBed.inject(Router);
  });

  function executeAuthGuard(
    url: string,
  ): boolean | UrlTree {
    return TestBed.runInInjectionContext(
      () =>
        authGuard(
          {} as ActivatedRouteSnapshot,
          {
            url,
          } as RouterStateSnapshot,
        ) as boolean | UrlTree,
    );
  }

  function executeGuestGuard():
    | boolean
    | UrlTree {
    return TestBed.runInInjectionContext(
      () =>
        guestGuard(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot,
        ) as boolean | UrlTree,
    );
  }

  it('should allow authenticated users to access protected routes', () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(true);

    expect(
      executeAuthGuard('/dashboard'),
    ).toBe(true);
  });

  it('should redirect unauthenticated users to login', () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(false);

    const result =
      executeAuthGuard('/learning');

    expect(result).toBeInstanceOf(UrlTree);

    expect(
      router.serializeUrl(
        result as UrlTree,
      ),
    ).toBe(
      '/login?returnUrl=%2Flearning',
    );
  });

  it('should allow unauthenticated users to access guest routes', () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(false);

    expect(executeGuestGuard()).toBe(true);
  });

  it('should redirect authenticated users away from guest routes', () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(true);

    const result = executeGuestGuard();

    expect(result).toBeInstanceOf(UrlTree);

    expect(
      router.serializeUrl(
        result as UrlTree,
      ),
    ).toBe('/dashboard');
  });
});