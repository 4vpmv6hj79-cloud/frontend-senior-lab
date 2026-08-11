
import { webcrypto } from 'node:crypto';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import type {
  RegisterCredentials,
} from '../models/auth.model';
import { AuthStore } from './auth.store';

const ACCOUNTS_STORAGE_KEY =
  'frontend-senior-lab.auth.accounts';

const SESSION_STORAGE_KEY =
  'frontend-senior-lab.auth.session';

const REGISTER_CREDENTIALS: RegisterCredentials = {
  name: 'Erik Palomares',
  email: 'Erik@Example.com',
  password: 'Angular123!',
};

const testCrypto =
  webcrypto as unknown as Crypto;

beforeAll(() => {
  vi.stubGlobal('crypto', testCrypto);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

describe('AuthStore', () => {
  let store: AuthStore;

  beforeEach(() => {
    localStorage.removeItem(
      ACCOUNTS_STORAGE_KEY,
    );

    localStorage.removeItem(
      SESSION_STORAGE_KEY,
    );

    TestBed.configureTestingModule({});

    store = TestBed.inject(AuthStore);
  });

  afterEach(() => {
    store.logout();

    localStorage.removeItem(
      ACCOUNTS_STORAGE_KEY,
    );

    localStorage.removeItem(
      SESSION_STORAGE_KEY,
    );
  });

  it('should start without an authenticated user', () => {
    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
    expect(store.displayName()).toBe('');
  });

  it('should register and authenticate a user', async () => {
    const result = await store.register(
      REGISTER_CREDENTIALS,
    );

    expect(result.success).toBe(true);
    expect(store.isAuthenticated()).toBe(true);

    expect(store.user()?.name).toBe(
      'Erik Palomares',
    );

    expect(store.user()?.email).toBe(
      'erik@example.com',
    );

    expect(
      localStorage.getItem(
        SESSION_STORAGE_KEY,
      ),
    ).toBeTruthy();

    const storedAccounts =
      localStorage.getItem(
        ACCOUNTS_STORAGE_KEY,
      );

    expect(storedAccounts).toBeTruthy();

    expect(storedAccounts).not.toContain(
      REGISTER_CREDENTIALS.password,
    );
  });

  it('should reject an email that is already registered', async () => {
    await store.register(
      REGISTER_CREDENTIALS,
    );

    const result = await store.register({
      ...REGISTER_CREDENTIALS,
      email: ' ERIK@example.com ',
    });

    expect(result).toEqual({
      success: false,
      error: 'email-in-use',
    });
  });

  it('should logout and login with valid credentials', async () => {
    await store.register(
      REGISTER_CREDENTIALS,
    );

    store.logout();

    expect(store.isAuthenticated()).toBe(false);
    expect(store.user()).toBeNull();

    const result = await store.login({
      email: ' ERIK@EXAMPLE.COM ',
      password:
        REGISTER_CREDENTIALS.password,
    });

    expect(result.success).toBe(true);
    expect(store.isAuthenticated()).toBe(true);

    expect(store.user()?.email).toBe(
      'erik@example.com',
    );
  });

  it('should reject invalid credentials', async () => {
    await store.register(
      REGISTER_CREDENTIALS,
    );

    store.logout();

    const result = await store.login({
      email: REGISTER_CREDENTIALS.email,
      password: 'IncorrectPassword1!',
    });

    expect(result).toEqual({
      success: false,
      error: 'invalid-credentials',
    });

    expect(store.isAuthenticated()).toBe(false);
  });
});