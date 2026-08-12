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
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from '@angular/fire/auth';

import type {
  AuthResult,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from '../../features/auth/models/auth.model';

/**
 * Firebase-backed authentication adapter.
 * Provides the same signal-based API as the local AuthStore,
 * but delegates to Firebase Auth for real authentication.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthAdapter {
  private readonly auth = inject(Auth);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly userState = signal<AuthUser | null>(null);

  readonly user = this.userState.asReadonly();
  readonly isAuthenticated = computed(() => this.userState() !== null);
  readonly displayName = computed(() => this.userState()?.name ?? '');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      onAuthStateChanged(this.auth, (firebaseUser) => {
        this.userState.set(
          firebaseUser ? this.mapFirebaseUser(firebaseUser) : null,
        );
      });
    }
  }

  async register(credentials: RegisterCredentials): Promise<AuthResult> {
    try {
      const result = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password,
      );

      await updateProfile(result.user, {
        displayName: credentials.name.trim(),
      });

      const user = this.mapFirebaseUser(result.user, credentials.name.trim());
      this.userState.set(user);

      return { success: true, user };
    } catch (error: any) {
      if (error?.code === 'auth/email-already-in-use') {
        return { success: false, error: 'email-in-use' };
      }

      return { success: false, error: 'storage-error' };
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password,
      );

      const user = this.mapFirebaseUser(result.user);
      this.userState.set(user);

      return { success: true, user };
    } catch (error: any) {
      if (
        error?.code === 'auth/user-not-found' ||
        error?.code === 'auth/wrong-password' ||
        error?.code === 'auth/invalid-credential'
      ) {
        return { success: false, error: 'invalid-credentials' };
      }

      return { success: false, error: 'storage-error' };
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    this.userState.set(null);
  }

  updateName(newName: string): boolean {
    const currentUser = this.auth.currentUser;

    if (!currentUser || newName.trim().length < 2) {
      return false;
    }

    updateProfile(currentUser, { displayName: newName.trim() });

    const updated = this.mapFirebaseUser(currentUser, newName.trim());
    this.userState.set(updated);

    return true;
  }

  private mapFirebaseUser(
    firebaseUser: FirebaseUser,
    nameOverride?: string,
  ): AuthUser {
    return {
      id: firebaseUser.uid,
      name: nameOverride ?? firebaseUser.displayName ?? 'User',
      email: firebaseUser.email ?? '',
      role: 'student',
      createdAt: firebaseUser.metadata.creationTime ?? new Date().toISOString(),
    };
  }
}
