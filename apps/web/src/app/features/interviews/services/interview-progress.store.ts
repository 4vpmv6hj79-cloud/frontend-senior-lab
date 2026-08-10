import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

import type { InterviewPracticeProgress } from '../models/interview.model';

const STORAGE_KEY =
  'frontend-senior-lab.interview-progress';

const INITIAL_PROGRESS: InterviewPracticeProgress = {
  reviewedQuestionIds: [],
  lastQuestionId: null,
};

@Injectable({
  providedIn: 'root',
})
export class InterviewProgressStore {
  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly progressState =
    signal<InterviewPracticeProgress>(
      this.loadProgress(),
    );

  readonly progress =
    this.progressState.asReadonly();

  readonly reviewedCount = computed(
    () =>
      this.progressState().reviewedQuestionIds.length,
  );

  isReviewed(questionId: string): boolean {
    return this.progressState()
      .reviewedQuestionIds
      .includes(questionId);
  }

  markReviewed(questionId: string): void {
    const current = this.progressState();

    if (
      current.reviewedQuestionIds.includes(
        questionId,
      )
    ) {
      this.setLastQuestion(questionId);
      return;
    }

    this.saveProgress({
      reviewedQuestionIds: [
        ...current.reviewedQuestionIds,
        questionId,
      ],
      lastQuestionId: questionId,
    });
  }

  setLastQuestion(questionId: string): void {
    this.saveProgress({
      ...this.progressState(),
      lastQuestionId: questionId,
    });
  }

  clear(): void {
    this.progressState.set(INITIAL_PROGRESS);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  private saveProgress(
    progress: InterviewPracticeProgress,
  ): void {
    this.progressState.set(progress);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress),
      );
    }
  }

  private loadProgress(): InterviewPracticeProgress {
    if (!isPlatformBrowser(this.platformId)) {
      return INITIAL_PROGRESS;
    }

    const storedProgress =
      localStorage.getItem(STORAGE_KEY);

    if (!storedProgress) {
      return INITIAL_PROGRESS;
    }

    try {
      const parsedProgress: unknown =
        JSON.parse(storedProgress);

      return this.isPracticeProgress(
        parsedProgress,
      )
        ? parsedProgress
        : INITIAL_PROGRESS;
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return INITIAL_PROGRESS;
    }
  }

  private isPracticeProgress(
    value: unknown,
  ): value is InterviewPracticeProgress {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const progress =
      value as Partial<InterviewPracticeProgress>;

    return (
      Array.isArray(
        progress.reviewedQuestionIds,
      ) &&
      progress.reviewedQuestionIds.every(
        (id) => typeof id === 'string',
      ) &&
      (
        progress.lastQuestionId === null ||
        typeof progress.lastQuestionId ===
          'string'
      )
    );
  }
}