import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { environment } from '../../../environments/environment';

/**
 * Provides Firebase services (App, Auth, Firestore) when Firebase is enabled.
 * Returns an empty array when Firebase is disabled (demo mode).
 */
export function provideFirebaseIfEnabled(): EnvironmentProviders[] {
  if (!environment.useFirebase || !environment.firebase.apiKey) {
    return [];
  }

  return [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ];
}
