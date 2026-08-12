import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';

import { UserStorageService } from '../../../core/services/user-storage.service';
import { DiagnosticResultStore } from '../../diagnostic/services/diagnostic-result.store';
import { InterviewProgressStore } from '../../interviews/services/interview-progress.store';
import { LEARNING_MODULES } from '../../learning/data/learning.modules';
import { LearningProgressStore } from '../../learning/services/learning-progress.store';
import {
  ACHIEVEMENTS,
  type AchievementId,
  type UnlockedAchievement,
} from '../models/achievement.model';

const STORAGE_KEY = 'achievements';

@Injectable({
  providedIn: 'root',
})
export class AchievementStore {
  private readonly storage = inject(UserStorageService);
  private readonly diagnosticStore = inject(DiagnosticResultStore);
  private readonly learningStore = inject(LearningProgressStore);
  private readonly interviewStore = inject(InterviewProgressStore);

  private readonly unlockedState = signal<readonly UnlockedAchievement[]>([]);

  readonly unlocked = this.unlockedState.asReadonly();

  readonly unlockedCount = computed(() => this.unlockedState().length);

  readonly totalCount = ACHIEVEMENTS.length;

  readonly achievements = ACHIEVEMENTS;

  readonly newlyUnlocked = signal<AchievementId | null>(null);

  constructor() {
    // Load persisted achievements when user changes
    effect(() => {
      this.storage.userChanged();
      this.loadFromStorage();
    });

    // Check for new achievements reactively
    effect(() => {
      this.evaluateAchievements();
    });
  }

  isUnlocked(id: AchievementId): boolean {
    return this.unlockedState().some((a) => a.id === id);
  }

  dismissNotification(): void {
    this.newlyUnlocked.set(null);
  }

  private evaluateAchievements(): void {
    const diagnosticResult = this.diagnosticStore.result();
    const learningProgress = this.learningStore.completedTopicCount();
    const interviewCount = this.interviewStore.reviewedCount();

    // First diagnostic
    if (diagnosticResult && !this.isUnlocked('first-diagnostic')) {
      this.unlock('first-diagnostic');
    }

    // Senior level
    if (diagnosticResult?.level === 'senior' && !this.isUnlocked('senior-level')) {
      this.unlock('senior-level');
    }

    // First module completed
    if (!this.isUnlocked('first-module')) {
      const anyModuleComplete = LEARNING_MODULES.some(
        (module) => this.learningStore.isModuleCompleted(module),
      );

      if (anyModuleComplete) {
        this.unlock('first-module');
      }
    }

    // All modules completed
    if (learningProgress === 15 && !this.isUnlocked('all-modules')) {
      this.unlock('all-modules');
    }

    // 5 interviews practiced
    if (interviewCount >= 5 && !this.isUnlocked('interview-5')) {
      this.unlock('interview-5');
    }

    // All interviews practiced
    if (interviewCount >= 10 && !this.isUnlocked('interview-all')) {
      this.unlock('interview-all');
    }

    // 3 topics streak (check if 3+ topics completed)
    if (learningProgress >= 3 && !this.isUnlocked('streak-3-topics')) {
      this.unlock('streak-3-topics');
    }
  }

  private unlock(id: AchievementId): void {
    if (this.isUnlocked(id)) {
      return;
    }

    const achievement: UnlockedAchievement = {
      id,
      unlockedAt: new Date().toISOString(),
    };

    const updated = [...this.unlockedState(), achievement];
    this.unlockedState.set(updated);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Show notification
    this.newlyUnlocked.set(id);
  }

  /** Called externally when profile name is updated */
  checkProfileAchievement(): void {
    if (!this.isUnlocked('profile-complete')) {
      this.unlock('profile-complete');
    }
  }

  private loadFromStorage(): void {
    const stored = this.storage.getItem(STORAGE_KEY);

    if (!stored) {
      this.unlockedState.set([]);
      return;
    }

    try {
      const parsed: unknown = JSON.parse(stored);

      if (Array.isArray(parsed)) {
        this.unlockedState.set(
          parsed.filter(
            (item): item is UnlockedAchievement =>
              typeof item === 'object' &&
              item !== null &&
              typeof item.id === 'string' &&
              typeof item.unlockedAt === 'string',
          ),
        );
      }
    } catch {
      this.unlockedState.set([]);
    }
  }
}
