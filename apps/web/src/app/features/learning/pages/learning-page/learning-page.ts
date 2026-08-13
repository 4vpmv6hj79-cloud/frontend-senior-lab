import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout';
import { UpgradeBannerComponent } from '../../../../shared/components/upgrade-banner/upgrade-banner';
import type { LocalizedText } from '../../../../shared/models/i18n.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { TopicQuizComponent } from '../../components/topic-quiz/topic-quiz';
import { LEARNING_MODULES } from '../../data/learning.modules';
import { getQuizForTopic } from '../../data/quizzes';
import type {
  LearningModule,
  LearningRecommendation,
} from '../../models/learning.model';
import type { TopicQuiz, TopicQuizResult } from '../../models/topic-quiz.model';
import { LearningProgressStore } from '../../services/learning-progress.store';
import { LEARNING_PAGE_COPY } from './learning-page.copy';
import { SubscriptionService } from '../../../../core/services/subscription.service';

@Component({
  selector: 'app-learning-page',
  imports: [RouterLink, PageLayoutComponent, TopicQuizComponent, UpgradeBannerComponent],
  templateUrl: './learning-page.html',
  styleUrl: './learning-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPage {
  protected readonly languageService = inject(LanguageService);

  protected readonly resultStore = inject(DiagnosticResultStore);

  protected readonly progressStore = inject(LearningProgressStore);

  protected readonly subscriptionService = inject(SubscriptionService);

  protected readonly copy = computed(
    () => LEARNING_PAGE_COPY[this.languageService.language()],
  );

  protected readonly result = this.resultStore.result;

  protected readonly recommendations = computed<
    readonly LearningRecommendation[]
  >(() => {
    const result = this.result();

    if (!result) {
      return [];
    }

    const sortedCategories = [...result.categories].sort(
      (first, second) => first.percentage - second.percentage,
    );

    const recommendations: LearningRecommendation[] = [];

    sortedCategories.forEach((category, index) => {
      const module = LEARNING_MODULES.find(
        (item) => item.category === category.category,
      );

      if (!module) {
        return;
      }

      recommendations.push({
        module,
        diagnosticPercentage: category.percentage,
        priority: index + 1,
      });
    });

    return recommendations;
  });

  protected readonly totalHours = computed(() =>
    this.recommendations().reduce(
      (total, recommendation) => total + recommendation.module.estimatedHours,
      0,
    ),
  );

  protected readonly focusArea = computed(
    () => this.recommendations()[0]?.module.category ?? null,
  );

  protected readonly strongestArea = computed(() => {
    const recommendations = this.recommendations();

    return recommendations[recommendations.length - 1]?.module.category ?? null;
  });

  protected readonly nextRecommendedModule = computed<LearningModule | null>(
    () =>
      this.recommendations().find(
        (recommendation) =>
          !this.progressStore.isModuleCompleted(recommendation.module),
      )?.module ?? null,
  );

  protected startModule(module: LearningModule): void {
    this.progressStore.setActiveModule(module.id);
  }

  protected toggleTopic(module: LearningModule, topicId: string): void {
    // If already completed, allow unchecking without quiz
    if (this.isTopicCompleted(topicId)) {
      this.progressStore.toggleTopic(module.id, topicId);
      return;
    }

    // Open quiz to validate knowledge before completing
    const quiz = getQuizForTopic(topicId);
    if (quiz) {
      this.activeQuiz.set(quiz);
      this.activeQuizModuleId.set(module.id);
    } else {
      // No quiz available for this topic — complete directly
      this.progressStore.toggleTopic(module.id, topicId);
    }
  }

  // Quiz state
  protected readonly activeQuiz = signal<TopicQuiz | null>(null);
  protected readonly activeQuizModuleId = signal<string | null>(null);

  protected onQuizPassed(result: TopicQuizResult): void {
    const moduleId = this.activeQuizModuleId();
    if (moduleId) {
      this.progressStore.toggleTopic(moduleId, result.topicId);
    }
    this.activeQuiz.set(null);
    this.activeQuizModuleId.set(null);
  }

  protected onQuizCancelled(): void {
    this.activeQuiz.set(null);
    this.activeQuizModuleId.set(null);
  }

  protected isTopicCompleted(topicId: string): boolean {
    return this.progressStore.isTopicCompleted(topicId);
  }

  protected completedTopicsFor(module: LearningModule): number {
    return this.progressStore.completedTopicsFor(module);
  }

  protected modulePercentage(module: LearningModule): number {
    return this.progressStore.modulePercentage(module);
  }

  protected isModuleCompleted(module: LearningModule): boolean {
    return this.progressStore.isModuleCompleted(module);
  }

  protected isActiveModule(module: LearningModule): boolean {
    return this.progressStore.progress().activeModuleId === module.id;
  }

  protected isModuleLocked(index: number): boolean {
    return this.subscriptionService.isLimitReached('modules', index);
  }

  protected resetLearningProgress(): void {
    this.progressStore.clear();
  }

  protected readonly expandedTopicId = signal<string | null>(null);

  protected toggleTopicExpand(topicId: string): void {
    this.expandedTopicId.update((current) =>
      current === topicId ? null : topicId,
    );
  }

  protected isTopicExpanded(topicId: string): boolean {
    return this.expandedTopicId() === topicId;
  }

  protected text(value: LocalizedText): string {
    return value[this.languageService.language()];
  }
}
