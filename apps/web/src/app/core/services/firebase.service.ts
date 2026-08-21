import { Injectable } from '@angular/core';
import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  type Auth,
  connectAuthEmulator,
} from 'firebase/auth';

import { environment } from '../../../environments/environment';

/**
 * Singleton service that initializes the Firebase app and provides
 * access to Firebase Auth instance.
 *
 * Uses the config from environment files.
 * Only initializes once regardless of how many times it's injected.
 */
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly app: FirebaseApp;
  private readonly _auth: Auth;

  constructor() {
    this.app = initializeApp(environment.firebase);
    this._auth = getAuth(this.app);

    // Connect to emulator in development if needed
    // if (!environment.production) {
    //   connectAuthEmulator(this._auth, 'http://localhost:9099');
    // }
  }

  /** Firebase Auth instance */
  get auth(): Auth {
    return this._auth;
  }
}
