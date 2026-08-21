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
    ready: vi.fn().mockReturnValue(true),
  };

  let router: Router;

  beforeEach(() => {
    authStoreMock.isAuthenticated.mockReset();
    authStoreMock.ready.mockReturnValue(true);

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

  async function executeAuthGuard(
    url: string,
  ): Promise<boolean | UrlTree> {
    return TestBed.runInInjectionContext(
      () =>
        authGuard(
          {} as ActivatedRouteSnapshot,
          {
            url,
          } as RouterStateSnapshot,
        ) as Promise<boolean | UrlTree>,
    );
  }

  async function executeGuestGuard(): Promise<boolean | UrlTree> {
    return TestBed.runInInjectionContext(
      () =>
        guestGuard(
          {} as ActivatedRouteSnapshot,
          {} as RouterStateSnapshot,
        ) as Promise<boolean | UrlTree>,
    );
  }

  it('should allow authenticated users to access protected routes', async () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(true);

    expect(
      await executeAuthGuard('/dashboard'),
    ).toBe(true);
  });

  it('should redirect unauthenticated users to login', async () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(false);

    const result =
      await executeAuthGuard('/learning');

    expect(result).toBeInstanceOf(UrlTree);

    expect(
      router.serializeUrl(
        result as UrlTree,
      ),
    ).toBe(
      '/login?returnUrl=%2Flearning',
    );
  });

  it('should allow unauthenticated users to access guest routes', async () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(false);

    expect(await executeGuestGuard()).toBe(true);
  });

  it('should redirect authenticated users away from guest routes', async () => {
    authStoreMock.isAuthenticated
      .mockReturnValue(true);

    const result = await executeGuestGuard();

    expect(result).toBeInstanceOf(UrlTree);

    expect(
      router.serializeUrl(
        result as UrlTree,
      ),
    ).toBe('/dashboard');
  });
});
