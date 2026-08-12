import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { DiagnosticResultStore } from '../../features/diagnostic/services/diagnostic-result.store';
import { InterviewProgressStore } from '../../features/interviews/services/interview-progress.store';
import { LearningProgressStore } from '../../features/learning/services/learning-progress.store';
import { UserStorageService } from './user-storage.service';

const EXPORT_VERSION = 2;

export interface ProgressExportData {
  readonly version: number;
  readonly exportedAt: string;
  readonly diagnostic: unknown;
  readonly learning: unknown;
  readonly interviews: unknown;
}

export type ImportResult =
  | { success: true; importedAt: string }
  | {
      success: false;
      error: 'invalid-format' | 'invalid-version' | 'parse-error';
    };

@Injectable({
  providedIn: 'root',
})
export class ProgressExportService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storage = inject(UserStorageService);
  private readonly diagnosticStore = inject(DiagnosticResultStore);
  private readonly learningStore = inject(LearningProgressStore);
  private readonly interviewStore = inject(InterviewProgressStore);

  /**
   * Exports all user progress data as a JSON file download.
   */
  exportProgress(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const data: ProgressExportData = {
      version: EXPORT_VERSION,
      exportedAt: new Date().toISOString(),
      diagnostic: this.storage.getItem('diagnostic-result'),
      learning: this.storage.getItem('learning-progress'),
      interviews: this.storage.getItem('interview-progress'),
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `frontend-senior-lab-progress-${this.formatDate()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  }

  /**
   * Imports progress data from a JSON file.
   * Returns a result indicating success or a typed error.
   */
  async importProgress(file: File): Promise<ImportResult> {
    try {
      const text = await file.text();
      const data: unknown = JSON.parse(text);

      if (!this.isValidExport(data)) {
        return { success: false, error: 'invalid-format' };
      }

      if (data.version !== EXPORT_VERSION && data.version !== 1) {
        return { success: false, error: 'invalid-version' };
      }

      if (typeof data.diagnostic === 'string') {
        this.storage.setItem('diagnostic-result', data.diagnostic);
        this.diagnosticStore.reload();
      }

      if (typeof data.learning === 'string') {
        this.storage.setItem('learning-progress', data.learning);
        this.learningStore.reload();
      }

      if (typeof data.interviews === 'string') {
        this.storage.setItem('interview-progress', data.interviews);
        this.interviewStore.reload();
      }

      return { success: true, importedAt: new Date().toISOString() };
    } catch {
      return { success: false, error: 'parse-error' };
    }
  }

  /**
   * Checks if the user has any progress data to export.
   */
  hasProgress(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return (
      this.diagnosticStore.result() !== null ||
      this.learningStore.completedTopicCount() > 0 ||
      this.interviewStore.reviewedCount() > 0
    );
  }

  private formatDate(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private isValidExport(value: unknown): value is ProgressExportData {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const data = value as Partial<ProgressExportData>;

    return (
      typeof data.version === 'number' && typeof data.exportedAt === 'string'
    );
  }
}
