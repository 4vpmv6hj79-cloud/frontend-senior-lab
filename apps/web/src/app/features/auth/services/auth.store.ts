import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from '@angular/fire/auth';

import type {
  AuthResult,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from '../models/auth.model';

/**
 * Authentication store backed by Firebase Auth.
 *
 * Provides reactive signals for the current user state and methods
 * for register, login, logout, Google sign-in, and profile updates.
 *
 * All registrations and logins are persisted in Firebase Authentication,
 * visible in Firebase Console → Authentication → Users.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly auth = inject(Auth);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly userState = signal<AuthUser | null>(null);
  private readonly authReady = signal(false);

  /** Current authenticated user (null if not logged in) */
  readonly user = this.userState.asReadonly();

  /** Whether the user is authenticated */
  readonly isAuthenticated = computed(() => this.userState() !== null);

  /** Display name shortcut */
  readonly displayName = computed(() => this.userState()?.name ?? '');

  /** Whether Firebase Auth has finished initializing (resolves initial state) */
  readonly ready = this.authReady.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Listen for Firebase Auth state changes (login, logout, page refresh)
      onAuthStateChanged(this.auth, (firebaseUser) => {
        this.userState.set(
          firebaseUser ? this.mapFirebaseUser(firebaseUser) : null,
        );
        this.authReady.set(true);
      });
    } else {
      this.authReady.set(true);
    }
  }

  /**
   * Register a new user with email and password.
   * Creates the account in Firebase Authentication.
   */
  async register(credentials: RegisterCredentials): Promise<AuthResult> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email.trim().toLowerCase(),
        credentials.password,
      );

      // Set display name
      await updateProfile(result.user, {
        displayName: credentials.name.trim(),
      });

      const user = this.mapFirebaseUser(result.user, credentials.name.trim());
      this.userState.set(user);

      return { success: true, user };
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;

      if (code === 'auth/email-already-in-use') {
        return { success: false, error: 'email-in-use' };
      }

      return { success: false, error: 'storage-error' };
    }
  }

  /**
   * Login with email and password via Firebase Auth.
   */
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        credentials.email.trim().toLowerCase(),
        credentials.password,
      );

      const user = this.mapFirebaseUser(result.user);
      this.userState.set(user);

      return { success: true, user };
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;

      if (
        code === 'auth/user-not-found' ||
        code === 'auth/wrong-password' ||
        code === 'auth/invalid-credential'
      ) {
        return { success: false, error: 'invalid-credentials' };
      }

      return { success: false, error: 'storage-error' };
    }
  }

  /**
   * Login with Google popup.
   */
  async loginWithGoogle(): Promise<AuthResult> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      const user = this.mapFirebaseUser(result.user);
      this.userState.set(user);
      return { success: true, user };
    } catch (error: unknown) {
      const code = (error as { code?: string })?.code;

      if (code === 'auth/popup-closed-by-user') {
        return { success: false, error: 'storage-error' };
      }

      return { success: false, error: 'storage-error' };
    }
  }

  /**
   * Sign out the current user.
   */
  logout(): void {
    signOut(this.auth);
    this.userState.set(null);
  }

  /**
   * Send a password reset email.
   */
  async sendPasswordReset(email: string): Promise<boolean> {
    try {
      await sendPasswordResetEmail(this.auth, email.trim().toLowerCase());
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Update the user's display name.
   */
  updateName(newName: string): boolean {
    const currentUser = this.auth.currentUser;

    if (!currentUser || newName.trim().length < 2) {
      return false;
    }

    const trimmed = newName.trim();

    // Update in Firebase (async but we don't await for UX speed)
    updateProfile(currentUser, { displayName: trimmed });

    // Update local state immediately
    const updated = this.mapFirebaseUser(currentUser, trimmed);
    this.userState.set(updated);

    return true;
  }

  /**
   * Map a Firebase User object to our AuthUser interface.
   */
  private mapFirebaseUser(
    firebaseUser: FirebaseUser,
    nameOverride?: string,
  ): AuthUser {
    return {
      id: firebaseUser.uid,
      name: nameOverride ?? firebaseUser.displayName ?? 'User',
      email: firebaseUser.email ?? '',
      role: 'student',
      createdAt:
        firebaseUser.metadata.creationTime ?? new Date().toISOString(),
    };
  }
}
