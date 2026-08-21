import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { Auth } from '@angular/fire/auth';
import { AuthStore } from './auth.store';

// Mock Firebase Auth methods
vi.mock('@angular/fire/auth', async () => {
  const actual = await vi.importActual('@angular/fire/auth');
  return {
    ...actual,
    onAuthStateChanged: vi.fn((_auth, callback) => {
      // Fire immediately with null (no user)
      callback(null);
      return () => {};
    }),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signInWithPopup: vi.fn(),
    signOut: vi.fn().mockResolvedValue(undefined),
    updateProfile: vi.fn().mockResolvedValue(undefined),
    sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
    GoogleAuthProvider: vi.fn(),
  };
});

describe('AuthStore', () => {
  let store: AuthStore;

  const mockAuth = {} as Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: mockAuth },
      ],
    });

    store = TestBed.inject(AuthStore);
  });

  it('should start without an authenticated user', () => {
    expect(store.user()).toBeNull();
    expect(store.isAuthenticated()).toBe(false);
    expect(store.displayName()).toBe('');
  });

  it('should register and authenticate a user', async () => {
    const { createUserWithEmailAndPassword } = await import('@angular/fire/auth');
    const mockUser = {
      uid: 'firebase-uid-123',
      email: 'erik@example.com',
      displayName: 'Erik Palomares',
      metadata: { creationTime: '2024-01-01T00:00:00.000Z' },
    };

    (createUserWithEmailAndPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
      user: mockUser,
    });

    const result = await store.register({
      name: 'Erik Palomares',
      email: 'Erik@Example.com',
      password: 'Angular123!',
    });

    expect(result.success).toBe(true);
    expect(store.isAuthenticated()).toBe(true);
    expect(store.user()?.name).toBe('Erik Palomares');
    expect(store.user()?.email).toBe('erik@example.com');
    expect(store.user()?.id).toBe('firebase-uid-123');
  });

  it('should reject an email that is already registered', async () => {
    const { createUserWithEmailAndPassword } = await import('@angular/fire/auth');

    (createUserWithEmailAndPassword as ReturnType<typeof vi.fn>).mockRejectedValue({
      code: 'auth/email-already-in-use',
    });

    const result = await store.register({
      name: 'Test',
      email: 'existing@test.com',
      password: 'Pass123!',
    });

    expect(result).toEqual({
      success: false,
      error: 'email-in-use',
    });
  });

  it('should login with valid credentials', async () => {
    const { signInWithEmailAndPassword } = await import('@angular/fire/auth');
    const mockUser = {
      uid: 'firebase-uid-456',
      email: 'erik@example.com',
      displayName: 'Erik',
      metadata: { creationTime: '2024-01-01T00:00:00.000Z' },
    };

    (signInWithEmailAndPassword as ReturnType<typeof vi.fn>).mockResolvedValue({
      user: mockUser,
    });

    const result = await store.login({
      email: 'erik@example.com',
      password: 'Angular123!',
    });

    expect(result.success).toBe(true);
    expect(store.isAuthenticated()).toBe(true);
    expect(store.user()?.email).toBe('erik@example.com');
  });

  it('should reject invalid credentials', async () => {
    const { signInWithEmailAndPassword } = await import('@angular/fire/auth');

    (signInWithEmailAndPassword as ReturnType<typeof vi.fn>).mockRejectedValue({
      code: 'auth/invalid-credential',
    });

    const result = await store.login({
      email: 'erik@example.com',
      password: 'WrongPassword',
    });

    expect(result).toEqual({
      success: false,
      error: 'invalid-credentials',
    });

    expect(store.isAuthenticated()).toBe(false);
  });

  it('should logout', () => {
    store.logout();
    expect(store.isAuthenticated()).toBe(false);
    expect(store.user()).toBeNull();
  });
});
