import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { UserStorageService } from '../../../core/services/user-storage.service';
import type { DiagnosticResult } from '../models/diagnostic.model';

const STORAGE_KEY = 'diagnostic-history';
const MAX_HISTORY = 10;

export interface DiagnosticHistoryEntry {
  readonly result: DiagnosticResult;
  readonly completedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiagnosticHistoryStore {
  private readonly storage = inject(UserStorageService);

  private readonly historyState = signal<readonly DiagnosticHistoryEntry[]>([]);

  readonly history = this.historyState.asReadonly();

  readonly entryCount = computed(() => this.historyState().length);

  /** The last 5 entries for the dashboard chart */
  readonly recentHistory = computed(() =>
    this.historyState().slice(-5),
  );

  /** Whether the user has improved since their first attempt */
  readonly trend = computed(() => {
    const entries = this.historyState();

    if (entries.length < 2) {
      return null;
    }

    const first = entries[0].result.percentage;
    const last = entries[entries.length - 1].result.percentage;

    if (last > first) return 'improving';
    if (last < first) return 'declining';
    return 'stable';
  });

  /** Percentage difference between last two attempts */
  readonly lastDelta = computed(() => {
    const entries = this.historyState();

    if (entries.length < 2) {
      return null;
    }

    const previous = entries[entries.length - 2].result.percentage;
    const current = entries[entries.length - 1].result.percentage;

    return current - previous;
  });

  constructor() {
    effect(() => {
      this.storage.userChanged();
      this.loadFromStorage();
    });
  }

  /**
   * Add a new diagnostic result to the history.
   * Keeps only the last MAX_HISTORY entries.
   */
  addEntry(result: DiagnosticResult): void {
    const entry: DiagnosticHistoryEntry = {
      result,
      completedAt: new Date().toISOString(),
    };

    const current = this.historyState();
    const updated = [...current, entry].slice(-MAX_HISTORY);

    this.historyState.set(updated);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  clear(): void {
    this.historyState.set([]);
    this.storage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): void {
    const stored = this.storage.getItem(STORAGE_KEY);

    if (!stored) {
      this.historyState.set([]);
      return;
    }

    try {
      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) {
        this.historyState.set([]);
        return;
      }

      const valid = parsed.filter(
        (entry): entry is DiagnosticHistoryEntry =>
          this.isValidEntry(entry),
      );

      this.historyState.set(valid);
    } catch {
      this.storage.removeItem(STORAGE_KEY);
      this.historyState.set([]);
    }
  }

  private isValidEntry(value: unknown): value is DiagnosticHistoryEntry {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const entry = value as Partial<DiagnosticHistoryEntry>;

    return (
      typeof entry.completedAt === 'string' &&
      entry.result !== undefined &&
      typeof entry.result === 'object' &&
      entry.result !== null &&
      typeof (entry.result as any).percentage === 'number' &&
      typeof (entry.result as any).level === 'string'
    );
  }
}
