import { inject, Injectable } from '@angular/core';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';

import { environment } from '../../../environments/environment';

/**
 * Service that syncs user data to/from Firestore.
 * Only active when `environment.useFirebase` is true.
 *
 * Data structure in Firestore:
 * users/{userId}/progress/data -> { diagnostic, learning, interviews, achievements }
 */
@Injectable({
  providedIn: 'root',
})
export class FirestoreSyncService {
  private firestore: Firestore | null = null;

  constructor() {
    if (environment.useFirebase) {
      try {
        this.firestore = inject(Firestore);
      } catch {
        // Firestore not available (demo mode)
        this.firestore = null;
      }
    }
  }

  get isEnabled(): boolean {
    return this.firestore !== null;
  }

  /**
   * Save user progress to Firestore.
   */
  async saveProgress(
    userId: string,
    data: Record<string, unknown>,
  ): Promise<void> {
    if (!this.firestore) return;

    try {
      const docRef = doc(this.firestore, `users/${userId}/progress/data`);
      await setDoc(
        docRef,
        { ...data, updatedAt: new Date().toISOString() },
        { merge: true },
      );
    } catch (error) {
      console.warn('[FirestoreSync] Failed to save:', error);
    }
  }

  /**
   * Load user progress from Firestore.
   * Returns null if no data exists or Firestore is unavailable.
   */
  async loadProgress(userId: string): Promise<Record<string, unknown> | null> {
    if (!this.firestore) return null;

    try {
      const docRef = doc(this.firestore, `users/${userId}/progress/data`);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        return snapshot.data() as Record<string, unknown>;
      }

      return null;
    } catch (error) {
      console.warn('[FirestoreSync] Failed to load:', error);
      return null;
    }
  }

  /**
   * Save a specific field of user progress.
   */
  async saveField(
    userId: string,
    field: string,
    value: unknown,
  ): Promise<void> {
    if (!this.firestore) return;

    try {
      const docRef = doc(this.firestore, `users/${userId}/progress/data`);
      await setDoc(
        docRef,
        { [field]: value, updatedAt: new Date().toISOString() },
        { merge: true },
      );
    } catch (error) {
      console.warn(`[FirestoreSync] Failed to save ${field}:`, error);
    }
  }
}
