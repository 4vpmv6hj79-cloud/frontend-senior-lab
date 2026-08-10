import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { LocalizedText } from '../../../diagnostic/models/diagnostic.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { LEARNING_MODULES } from '../../data/learning.modules';
import type { LearningRecommendation } from '../../models/learning.model';
import { LEARNING_PAGE_COPY } from './learning-page.copy';

@Component({
  selector: 'app-learning-page',
  imports: [RouterLink],
  templateUrl: './learning-page.html',
  styleUrl: './learning-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningPage {
  protected readonly languageService = inject(LanguageService);
  protected readonly resultStore = inject(DiagnosticResultStore);

  protected readonly copy = computed(
    () => LEARNING_PAGE_COPY[this.languageService.language()]
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
      (first, second) => first.percentage - second.percentage
    );

    const recommendations: LearningRecommendation[] = [];

    sortedCategories.forEach((category, index) => {
      const module = LEARNING_MODULES.find(
        (item) => item.category === category.category
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
      (total, recommendation) =>
        total + recommendation.module.estimatedHours,
      0
    )
  );

  protected readonly focusArea = computed(
    () => this.recommendations()[0]?.module.category ?? null
  );

  protected readonly strongestArea = computed(() => {
    const recommendations = this.recommendations();

    return (
      recommendations[recommendations.length - 1]?.module.category ??
      null
    );
  });

  protected text(value: LocalizedText): string {
    return value[this.languageService.language()];
  }
}
