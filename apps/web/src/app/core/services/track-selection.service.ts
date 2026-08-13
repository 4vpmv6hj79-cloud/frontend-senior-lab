import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import {
  FRAMEWORK_TRACKS,
  type FrameworkId,
  type FrameworkTrack,
} from '../models/framework.model';
import { UserStorageService } from './user-storage.service';

const STORAGE_KEY = 'selected-track';

/**
 * Service that manages the user's selected framework track.
 * Persists the selection per user in localStorage.
 */
@Injectable({
  providedIn: 'root',
})
export class TrackSelectionService {
  private readonly storage = inject(UserStorageService);
  private readonly selectedTrackId = signal<FrameworkId | null>(null);

  /** The currently selected framework ID (null if none selected) */
  readonly trackId = this.selectedTrackId.asReadonly();

  /** The full track object for the selected framework */
  readonly track = computed<FrameworkTrack | null>(() => {
    const id = this.selectedTrackId();
    return id ? FRAMEWORK_TRACKS.find((t) => t.id === id) ?? null : null;
  });

  /** Whether a track has been selected */
  readonly hasSelection = computed(() => this.selectedTrackId() !== null);

  /** All available tracks */
  readonly availableTracks = FRAMEWORK_TRACKS;

  constructor() {
    // Load saved selection when user changes
    effect(() => {
      this.storage.userChanged();
      this.loadSelection();
    });
  }

  /**
   * Select a framework track. Persists the choice.
   */
  selectTrack(id: FrameworkId): void {
    this.selectedTrackId.set(id);
    this.storage.setItem(STORAGE_KEY, id);
  }

  /**
   * Clear the track selection (go back to selection screen).
   */
  clearSelection(): void {
    this.selectedTrackId.set(null);
    this.storage.removeItem(STORAGE_KEY);
  }

  private loadSelection(): void {
    const stored = this.storage.getItem(STORAGE_KEY);

    if (stored === 'angular' || stored === 'react' || stored === 'vue') {
      this.selectedTrackId.set(stored);
    } else {
      this.selectedTrackId.set(null);
    }
  }
}
