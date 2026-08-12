import {
  Injectable,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';

import { UserStorageService } from '../../../core/services/user-storage.service';
import type { InterviewPracticeProgress } from '../models/interview.model';

const STORAGE_KEY = 'interview-progress';
const GLOBAL_LEGACY_KEY = 'frontend-senior-lab.interview-progress';

const INITIAL_PROGRESS: InterviewPracticeProgress = {
  reviewedQuestionIds: [],
  lastQuestionId: null,
};

@Injectable({
  providedIn: 'root',
})
export class InterviewProgressStore {
  private readonly storage = inject(UserStorageService);

  private readonly progressState =
    signal<InterviewPracticeProgress>(INITIAL_PROGRESS);

  readonly progress =
    this.progressState.asReadonly();

  readonly reviewedCount = computed(
    () =>
      this.progressState().reviewedQuestionIds.length,
  );

  constructor() {
    effect(() => {
      this.storage.userChanged();
      this.reloadFromStorage();
    });
  }

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
    this.storage.removeItem(STORAGE_KEY);
  }

  reload(): void {
    this.reloadFromStorage();
  }

  private saveProgress(
    progress: InterviewPracticeProgress,
  ): void {
    this.progressState.set(progress);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  private reloadFromStorage(): void {
    this.storage.migrateFromGlobal(GLOBAL_LEGACY_KEY, STORAGE_KEY);

    const storedProgress = this.storage.getItem(STORAGE_KEY);

    if (!storedProgress) {
      this.progressState.set(INITIAL_PROGRESS);
      return;
    }

    try {
      const parsedProgress: unknown =
        JSON.parse(storedProgress);

      this.progressState.set(
        this.isPracticeProgress(parsedProgress)
          ? parsedProgress
          : INITIAL_PROGRESS,
      );
    } catch {
      this.storage.removeItem(STORAGE_KEY);
      this.progressState.set(INITIAL_PROGRESS);
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
