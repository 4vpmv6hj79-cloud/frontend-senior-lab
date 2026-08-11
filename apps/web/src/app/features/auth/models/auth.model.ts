export type AuthRole = 'student' | 'mentor';

export interface AuthUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: AuthRole;
  readonly createdAt: string;
}

export interface LoginCredentials {
  readonly email: string;
  readonly password: string;
}

export interface RegisterCredentials {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export interface AuthSession {
  readonly user: AuthUser;
  readonly authenticatedAt: string;
}

export type AuthErrorCode =
  | 'email-in-use'
  | 'invalid-credentials'
  | 'invalid-session'
  | 'storage-error';

export type AuthResult =
  | {
      readonly success: true;
      readonly user: AuthUser;
    }
  | {
      readonly success: false;
      readonly error: AuthErrorCode;
    };