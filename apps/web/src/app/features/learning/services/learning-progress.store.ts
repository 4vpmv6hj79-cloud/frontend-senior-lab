import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';

import { LEARNING_MODULES } from '../data/learning.modules';
import type {
  LearningModule,
  LearningProgress,
} from '../models/learning.model';

const STORAGE_KEY =
  'frontend-senior-lab.learning-progress';

const INITIAL_PROGRESS: LearningProgress = {
  completedTopicIds: [],
  activeModuleId: null,
};

@Injectable({
  providedIn: 'root',
})
export class LearningProgressStore {
  private readonly platformId =
    inject(PLATFORM_ID);

  private readonly progressState =
    signal<LearningProgress>(
      this.loadProgress(),
    );

  readonly progress =
    this.progressState.asReadonly();

  readonly completedTopicCount = computed(
    () =>
      this.progressState()
        .completedTopicIds.length,
  );

  readonly totalTopicCount =
    LEARNING_MODULES.reduce(
      (total, module) =>
        total + module.topics.length,
      0,
    );

  readonly overallPercentage = computed(
    () =>
      this.totalTopicCount === 0
        ? 0
        : Math.round(
            (
              this.completedTopicCount() /
              this.totalTopicCount
            ) * 100,
          ),
  );

  readonly activeModule = computed(
    () => {
      const activeModuleId =
        this.progressState().activeModuleId;

      if (!activeModuleId) {
        return null;
      }

      return (
        LEARNING_MODULES.find(
          (module) =>
            module.id === activeModuleId,
        ) ?? null
      );
    },
  );

  setActiveModule(moduleId: string): void {
    if (
      !LEARNING_MODULES.some(
        (module) => module.id === moduleId,
      )
    ) {
      return;
    }

    this.saveProgress({
      ...this.progressState(),
      activeModuleId: moduleId,
    });
  }

  toggleTopic(
    moduleId: string,
    topicId: string,
  ): void {
    const module = LEARNING_MODULES.find(
      (item) => item.id === moduleId,
    );

    const topicExists = module?.topics.some(
      (topic) => topic.id === topicId,
    );

    if (!module || !topicExists) {
      return;
    }

    const current = this.progressState();

    const topicCompleted =
      current.completedTopicIds.includes(
        topicId,
      );

    const completedTopicIds = topicCompleted
      ? current.completedTopicIds.filter(
          (id) => id !== topicId,
        )
      : [
          ...current.completedTopicIds,
          topicId,
        ];

    this.saveProgress({
      completedTopicIds,
      activeModuleId: moduleId,
    });
  }

  isTopicCompleted(topicId: string): boolean {
    return this.progressState()
      .completedTopicIds
      .includes(topicId);
  }

  completedTopicsFor(
    module: LearningModule,
  ): number {
    return module.topics.filter((topic) =>
      this.isTopicCompleted(topic.id),
    ).length;
  }

  modulePercentage(
    module: LearningModule,
  ): number {
    if (module.topics.length === 0) {
      return 0;
    }

    return Math.round(
      (
        this.completedTopicsFor(module) /
        module.topics.length
      ) * 100,
    );
  }

  isModuleCompleted(
    module: LearningModule,
  ): boolean {
    return (
      module.topics.length > 0 &&
      this.completedTopicsFor(module) ===
        module.topics.length
    );
  }

  clear(): void {
    this.progressState.set(
      INITIAL_PROGRESS,
    );

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  reload(): void {
    this.progressState.set(this.loadProgress());
  }

  private saveProgress(
    progress: LearningProgress,
  ): void {
    this.progressState.set(progress);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(progress),
      );
    }
  }

  private loadProgress(): LearningProgress {
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

      if (
        !this.isLearningProgress(
          parsedProgress,
        )
      ) {
        return INITIAL_PROGRESS;
      }

      return this.sanitizeProgress(
        parsedProgress,
      );
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return INITIAL_PROGRESS;
    }
  }

  private sanitizeProgress(
    progress: LearningProgress,
  ): LearningProgress {
    const validTopicIds = new Set<string>(
        LEARNING_MODULES.flatMap((module) =>
            module.topics.map(
            (topic) => topic.id,
            ),
        ),
        );

    const completedTopicIds =
      progress.completedTopicIds.filter(
        (id) => validTopicIds.has(id),
      );

    const activeModuleId =
      progress.activeModuleId &&
      LEARNING_MODULES.some(
        (module) =>
          module.id ===
          progress.activeModuleId,
      )
        ? progress.activeModuleId
        : null;

    return {
      completedTopicIds,
      activeModuleId,
    };
  }

  private isLearningProgress(
    value: unknown,
  ): value is LearningProgress {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const progress =
      value as Partial<LearningProgress>;

    return (
      Array.isArray(
        progress.completedTopicIds,
      ) &&
      progress.completedTopicIds.every(
        (id) => typeof id === 'string',
      ) &&
      (
        progress.activeModuleId === null ||
        typeof progress.activeModuleId ===
          'string'
      )
    );
  }
}