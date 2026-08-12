import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { DiagnosticResultStore } from '../../features/diagnostic/services/diagnostic-result.store';
import { InterviewProgressStore } from '../../features/interviews/services/interview-progress.store';
import { LearningProgressStore } from '../../features/learning/services/learning-progress.store';

const EXPORT_VERSION = 1;

export interface ProgressExportData {
  readonly version: number;
  readonly exportedAt: string;
  readonly diagnostic: unknown;
  readonly learning: unknown;
  readonly interviews: unknown;
}

export type ImportResult =
  | { success: true; importedAt: string }
  | { success: false; error: 'invalid-format' | 'invalid-version' | 'parse-error' };

@Injectable({
  providedIn: 'root',
})
export class ProgressExportService {
  private readonly platformId = inject(PLATFORM_ID);
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
      diagnostic: this.getDiagnosticData(),
      learning: this.getLearningData(),
      interviews: this.getInterviewData(),
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

      if (data.version !== EXPORT_VERSION) {
        return { success: false, error: 'invalid-version' };
      }

      this.restoreDiagnosticData(data.diagnostic);
      this.restoreLearningData(data.learning);
      this.restoreInterviewData(data.interviews);

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

  private getDiagnosticData(): unknown {
    return localStorage.getItem('frontend-senior-lab.diagnostic-result');
  }

  private getLearningData(): unknown {
    return localStorage.getItem('frontend-senior-lab.learning-progress');
  }

  private getInterviewData(): unknown {
    return localStorage.getItem('frontend-senior-lab.interview-progress');
  }

  private restoreDiagnosticData(data: unknown): void {
    if (typeof data === 'string') {
      localStorage.setItem('frontend-senior-lab.diagnostic-result', data);
      this.diagnosticStore.reload();
    }
  }

  private restoreLearningData(data: unknown): void {
    if (typeof data === 'string') {
      localStorage.setItem('frontend-senior-lab.learning-progress', data);
      this.learningStore.reload();
    }
  }

  private restoreInterviewData(data: unknown): void {
    if (typeof data === 'string') {
      localStorage.setItem('frontend-senior-lab.interview-progress', data);
      this.interviewStore.reload();
    }
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
      typeof data.version === 'number' &&
      typeof data.exportedAt === 'string'
    );
  }
}
