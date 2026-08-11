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
import { LearningProgressStore } from '../../../learning/services/learning-progress.store';
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

  private readonly progressStore =
    inject(LearningProgressStore);

  protected readonly result =
    this.resultStore.result;

  protected readonly completedTopicCount =
    this.progressStore.completedTopicCount;

  protected readonly learningPercentage =
    this.progressStore.overallPercentage;

  protected readonly totalTopicCount =
    LEARNING_MODULES.reduce(
      (total, module) =>
        total + module.topics.length,
      0,
    );

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

  protected readonly orderedModules = computed<
    readonly LearningModule[]
  >(() => {
    const modules: LearningModule[] = [];

    for (const category of this.orderedCategories()) {
      const module = LEARNING_MODULES.find(
        (item) =>
          item.category === category.category,
      );

      if (module) {
        modules.push(module);
      }
    }

    return modules;
  });

  protected readonly recommendedModule =
    computed<LearningModule | null>(() => {
      const activeModule =
        this.progressStore.activeModule();

      if (
        activeModule &&
        !this.progressStore.isModuleCompleted(
          activeModule,
        )
      ) {
        return activeModule;
      }

      return (
        this.orderedModules().find(
          (module) =>
            !this.progressStore.isModuleCompleted(
              module,
            ),
        ) ?? null
      );
    });

  protected readonly recommendedCategoryScore =
    computed(() => {
      const module = this.recommendedModule();
      const result = this.result();

      if (!module || !result) {
        return null;
      }

      return (
        result.categories.find(
          (category) =>
            category.category === module.category,
        ) ?? null
      );
    });

  protected readonly activeModule = computed(
    () => this.progressStore.activeModule(),
  );

  protected modulePercentage(
    module: LearningModule,
  ): number {
    return this.progressStore.modulePercentage(
      module,
    );
  }

  protected completedTopicsFor(
    module: LearningModule,
  ): number {
    return this.progressStore.completedTopicsFor(
      module,
    );
  }

  protected isModuleCompleted(
    module: LearningModule,
  ): boolean {
    return this.progressStore.isModuleCompleted(
      module,
    );
  }

  protected text(value: LocalizedText): string {
    return value[
      this.languageService.language()
    ];
  }
}
