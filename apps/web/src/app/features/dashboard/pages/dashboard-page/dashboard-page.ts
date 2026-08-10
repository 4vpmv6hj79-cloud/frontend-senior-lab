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
import { LEARNING_MODULES } from '../../../learning/data/learning.modules';
import type { LearningModule } from '../../../learning/models/learning.model';
import { DASHBOARD_PAGE_COPY } from './dashboard-page.copy';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  protected readonly languageService =
    inject(LanguageService);

  private readonly resultStore =
    inject(DiagnosticResultStore);

  protected readonly result =
    this.resultStore.result;

  protected readonly copy = computed(
    () =>
      DASHBOARD_PAGE_COPY[
        this.languageService.language()
      ],
  );

  protected readonly orderedCategories = computed(
    () => {
      const result = this.result();

      if (!result) {
        return [];
      }

      return [...result.categories].sort(
        (first, second) =>
          first.percentage - second.percentage,
      );
    },
  );

  protected readonly priorityArea = computed(
    () =>
      this.orderedCategories()[0] ?? null,
  );

  protected readonly strongestArea = computed(
    () => {
      const categories = this.orderedCategories();

      return categories[categories.length - 1] ?? null;
    },
  );

  protected readonly recommendedModule =
    computed<LearningModule | null>(() => {
      const priorityArea = this.priorityArea();

      if (!priorityArea) {
        return null;
      }

      return (
        LEARNING_MODULES.find(
          (module) =>
            module.category ===
            priorityArea.category,
        ) ?? null
      );
    });

  protected text(value: LocalizedText): string {
    return value[this.languageService.language()];
  }
}
