import { isPlatformBrowser } from '@angular/common';
import {
  PLATFORM_ID,
  computed,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { DiagnosticResult } from '../models/diagnostic.model';

const STORAGE_KEY = 'frontend-senior-lab.diagnostic-result';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticResultStore {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly resultState = signal<DiagnosticResult | null>(
    this.loadResult(),
  );

  readonly result = this.resultState.asReadonly();
  readonly hasResult = computed(
    () => this.resultState() !== null,
  );

  save(result: DiagnosticResult): void {
    this.resultState.set(result);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(result),
      );
    }
  }

  clear(): void {
    this.resultState.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  reload(): void {
    this.resultState.set(this.loadResult());
  }

  private loadResult(): DiagnosticResult | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const storedResult = localStorage.getItem(STORAGE_KEY);

    if (!storedResult) {
      return null;
    }

    try {
      const parsedResult: unknown = JSON.parse(storedResult);

      return this.isDiagnosticResult(parsedResult)
        ? parsedResult
        : null;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return null;
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