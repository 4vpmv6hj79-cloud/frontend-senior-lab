import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout';
import type { LocalizedText } from '../../../../shared/models/i18n.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { LEARNING_MODULES } from '../../data/learning.modules';
import type {
  LearningModule,
  LearningRecommendation,
} from '../../models/learning.model';
import { LearningProgressStore } from '../../services/learning-progress.store';
import { LEARNING_PAGE_COPY } from './learning-page.copy';

@Component({
  selector: 'app-learning-page',
  imports: [RouterLink, PageLayoutComponent],
  templateUrl: './learning-page.html',
  styleUrl: './learning-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPage {
  protected readonly languageService =
    inject(LanguageService);

  protected readonly resultStore =
    inject(DiagnosticResultStore);

  protected readonly progressStore =
    inject(LearningProgressStore);

  protected readonly copy = computed(
    () =>
      LEARNING_PAGE_COPY[
        this.languageService.language()
      ],
  );

  protected readonly result =
    this.resultStore.result;

  protected readonly recommendations = computed<
    readonly LearningRecommendation[]
  >(() => {
    const result = this.result();

    if (!result) {
      return [];
    }

    const sortedCategories = [
      ...result.categories,
    ].sort(
      (first, second) =>
        first.percentage -
        second.percentage,
    );

    const recommendations:
      LearningRecommendation[] = [];

    sortedCategories.forEach(
      (category, index) => {
        const module =
          LEARNING_MODULES.find(
            (item) =>
              item.category ===
              category.category,
          );

        if (!module) {
          return;
        }

        recommendations.push({
          module,
          diagnosticPercentage:
            category.percentage,
          priority: index + 1,
        });
      },
    );

    return recommendations;
  });

  protected readonly totalHours = computed(
    () =>
      this.recommendations().reduce(
        (total, recommendation) =>
          total +
          recommendation.module
            .estimatedHours,
        0,
      ),
  );

  protected readonly focusArea = computed(
    () =>
      this.recommendations()[0]
        ?.module.category ?? null,
  );

  protected readonly strongestArea =
    computed(() => {
      const recommendations =
        this.recommendations();

      return (
        recommendations[
          recommendations.length - 1
        ]?.module.category ?? null
      );
    });

  protected readonly nextRecommendedModule =
    computed<LearningModule | null>(
      () =>
        this.recommendations().find(
          (recommendation) =>
            !this.progressStore
              .isModuleCompleted(
                recommendation.module,
              ),
        )?.module ?? null,
    );

  protected startModule(
    module: LearningModule,
  ): void {
    this.progressStore.setActiveModule(
      module.id,
    );
  }

  protected toggleTopic(
    module: LearningModule,
    topicId: string,
  ): void {
    this.progressStore.toggleTopic(
      module.id,
      topicId,
    );
  }

  protected isTopicCompleted(
    topicId: string,
  ): boolean {
    return this.progressStore
      .isTopicCompleted(topicId);
  }

  protected completedTopicsFor(
    module: LearningModule,
  ): number {
    return this.progressStore
      .completedTopicsFor(module);
  }

  protected modulePercentage(
    module: LearningModule,
  ): number {
    return this.progressStore
      .modulePercentage(module);
  }

  protected isModuleCompleted(
    module: LearningModule,
  ): boolean {
    return this.progressStore
      .isModuleCompleted(module);
  }

  protected isActiveModule(
    module: LearningModule,
  ): boolean {
    return (
      this.progressStore.progress()
        .activeModuleId === module.id
    );
  }

  protected resetLearningProgress(): void {
    this.progressStore.clear();
  }

  protected text(
    value: LocalizedText,
  ): string {
    return value[
      this.languageService.language()
    ];
  }
}
