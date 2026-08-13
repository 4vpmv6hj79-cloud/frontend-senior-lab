import { isPlatformBrowser } from '@angular/common';
import {
  PLATFORM_ID,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import type {
  AuthResult,
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterCredentials,
} from '../models/auth.model';

const ACCOUNTS_STORAGE_KEY = 'frontend-senior-lab.auth.accounts';

const SESSION_STORAGE_KEY = 'frontend-senior-lab.auth.session';

const PASSWORD_ITERATIONS = 100_000;
const PASSWORD_HASH_LENGTH = 256;

interface StoredAuthAccount {
  readonly user: AuthUser;
  readonly passwordHash: string;
  readonly salt: readonly number[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly userState = signal<AuthUser | null>(
    this.loadSession()?.user ?? null,
  );

  readonly user = this.userState.asReadonly();

  readonly isAuthenticated = computed(() => this.userState() !== null);

  readonly displayName = computed(() => this.userState()?.name ?? '');

  async register(credentials: RegisterCredentials): Promise<AuthResult> {
    if (!isPlatformBrowser(this.platformId)) {
      return {
        success: false,
        error: 'storage-error',
      };
    }

    try {
      const accounts = this.loadAccounts();
      const email = this.normalizeEmail(credentials.email);

      const emailExists = accounts.some(
        (account) => account.user.email === email,
      );

      if (emailExists) {
        return {
          success: false,
          error: 'email-in-use',
        };
      }

      const salt = this.createSalt();

      const passwordHash = await this.hashPassword(credentials.password, salt);

      const user: AuthUser = {
        id: crypto.randomUUID(),
        name: credentials.name.trim(),
        email,
        role: 'student',
        createdAt: new Date().toISOString(),
      };

      const account: StoredAuthAccount = {
        user,
        passwordHash,
        salt: Array.from(salt),
      };

      localStorage.setItem(
        ACCOUNTS_STORAGE_KEY,
        JSON.stringify([...accounts, account]),
      );

      this.saveSession(user);

      return {
        success: true,
        user,
      };
    } catch {
      return {
        success: false,
        error: 'storage-error',
      };
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    if (!isPlatformBrowser(this.platformId)) {
      return {
        success: false,
        error: 'storage-error',
      };
    }

    try {
      const email = this.normalizeEmail(credentials.email);

      const account = this.loadAccounts().find(
        (item) => item.user.email === email,
      );

      if (!account) {
        return {
          success: false,
          error: 'invalid-credentials',
        };
      }

      const passwordHash = await this.hashPassword(
        credentials.password,
        new Uint8Array(account.salt),
      );

      if (passwordHash !== account.passwordHash) {
        return {
          success: false,
          error: 'invalid-credentials',
        };
      }

      this.saveSession(account.user);

      return {
        success: true,
        user: account.user,
      };
    } catch {
      return {
        success: false,
        error: 'storage-error',
      };
    }
  }

  logout(): void {
    this.userState.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }

  /**
   * Send a password reset email.
   * In demo mode (no Firebase), always returns true (simulated success).
   */
  async sendPasswordReset(_email: string): Promise<boolean> {
    // In local auth mode, we can't actually send emails.
    // Return true to simulate success for UX purposes.
    return true;
  }

  updateName(newName: string): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const currentUser = this.userState();

    if (!currentUser) {
      return false;
    }

    const trimmedName = newName.trim();

    if (trimmedName.length < 2) {
      return false;
    }

    const updatedUser: AuthUser = {
      ...currentUser,
      name: trimmedName,
    };

    // Update the account in accounts list
    const accounts = this.loadAccounts();
    const updatedAccounts = accounts.map((account) =>
      account.user.id === updatedUser.id
        ? { ...account, user: updatedUser }
        : account,
    );

    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(updatedAccounts));

    // Update the session
    this.saveSession(updatedUser);

    return true;
  }

  private saveSession(user: AuthUser): void {
    const session: AuthSession = {
      user,
      authenticatedAt: new Date().toISOString(),
    };

    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

    this.userState.set(user);
  }

  private loadSession(): AuthSession | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const storedSession = localStorage.getItem(SESSION_STORAGE_KEY);

    if (!storedSession) {
      return null;
    }

    try {
      const session: unknown = JSON.parse(storedSession);

      if (this.isAuthSession(session)) {
        return session;
      }

      localStorage.removeItem(SESSION_STORAGE_KEY);

      return null;
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);

      return null;
    }
  }

  private loadAccounts(): StoredAuthAccount[] {
    const storedAccounts = localStorage.getItem(ACCOUNTS_STORAGE_KEY);

    if (!storedAccounts) {
      return [];
    }

    try {
      const accounts: unknown = JSON.parse(storedAccounts);

      if (!Array.isArray(accounts)) {
        localStorage.removeItem(ACCOUNTS_STORAGE_KEY);

        return [];
      }

      return accounts.filter((account): account is StoredAuthAccount =>
        this.isStoredAccount(account),
      );
    } catch {
      localStorage.removeItem(ACCOUNTS_STORAGE_KEY);

      return [];
    }
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private createSalt(): Uint8Array {
    const salt = new Uint8Array(16);

    crypto.getRandomValues(salt);

    return salt;
  }

  private async hashPassword(
    password: string,
    salt: Uint8Array,
  ): Promise<string> {
    const encodedPassword = new TextEncoder().encode(password);

    const saltBuffer = new ArrayBuffer(salt.byteLength);
    new Uint8Array(saltBuffer).set(salt);

    const passwordKey = await crypto.subtle.importKey(
      'raw',
      encodedPassword,
      'PBKDF2',
      false,
      ['deriveBits'],
    );

    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: 'SHA-256',
        salt: saltBuffer,
        iterations: PASSWORD_ITERATIONS,
      },
      passwordKey,
      PASSWORD_HASH_LENGTH,
    );

    return Array.from(new Uint8Array(derivedBits))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  private isAuthSession(value: unknown): value is AuthSession {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const session = value as Partial<AuthSession>;

    return (
      this.isAuthUser(session.user) &&
      typeof session.authenticatedAt === 'string'
    );
  }

  private isStoredAccount(value: unknown): value is StoredAuthAccount {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const account = value as Partial<StoredAuthAccount>;

    return (
      this.isAuthUser(account.user) &&
      typeof account.passwordHash === 'string' &&
      Array.isArray(account.salt) &&
      account.salt.length > 0 &&
      account.salt.every((item) => typeof item === 'number')
    );
  }

  private isAuthUser(value: unknown): value is AuthUser {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const user = value as Partial<AuthUser>;

    return (
      typeof user.id === 'string' &&
      typeof user.name === 'string' &&
      typeof user.email === 'string' &&
      (user.role === 'student' || user.role === 'mentor') &&
      typeof user.createdAt === 'string'
    );
  }
}
