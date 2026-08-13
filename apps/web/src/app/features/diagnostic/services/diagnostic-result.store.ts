import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { UserStorageService } from '../../../core/services/user-storage.service';
import { DiagnosticResult } from '../models/diagnostic.model';

const STORAGE_KEY = 'diagnostic-result';
const GLOBAL_LEGACY_KEY = 'frontend-senior-lab.diagnostic-result';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticResultStore {
  private readonly storage = inject(UserStorageService);
  private readonly resultState = signal<DiagnosticResult | null>(null);

  readonly result = this.resultState.asReadonly();
  readonly hasResult = computed(
    () => this.resultState() !== null,
  );

  constructor() {
    // Reload data whenever the user changes (login/logout)
    effect(() => {
      this.storage.userChanged();
      this.reloadFromStorage();
    });
  }

  save(result: DiagnosticResult): void {
    this.resultState.set(result);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(result));
  }

  clear(): void {
    this.resultState.set(null);
    this.storage.removeItem(STORAGE_KEY);
  }

  reload(): void {
    this.reloadFromStorage();
  }

  private reloadFromStorage(): void {
    const storedResult = this.storage.getItem(STORAGE_KEY);

    if (!storedResult) {
      this.resultState.set(null);
      return;
    }

    try {
      const parsedResult: unknown = JSON.parse(storedResult);

      this.resultState.set(
        this.isDiagnosticResult(parsedResult) ? parsedResult : null,
      );
    } catch {
      this.storage.removeItem(STORAGE_KEY);
      this.resultState.set(null);
    }
  }

  private isDiagnosticResult(
    value: unknown,
  ): value is DiagnosticResult {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const result = value as Partial<DiagnosticResult>;

    return (
      typeof result.score === 'number' &&
      typeof result.maximumScore === 'number' &&
      typeof result.percentage === 'number' &&
      typeof result.level === 'string' &&
      Array.isArray(result.categories)
    );
  }
}
