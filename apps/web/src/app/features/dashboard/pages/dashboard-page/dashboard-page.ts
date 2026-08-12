import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { ProgressExportService } from '../../../../core/services/progress-export.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { AchievementStore } from '../../../achievements/services/achievement.store';
import { AuthStore } from '../../../auth/services/auth.store';
import type { LocalizedText } from '../../../../shared/models/i18n.model';
import { DiagnosticHistoryStore } from '../../../diagnostic/services/diagnostic-history.store';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { LEARNING_MODULES } from '../../../learning/data/learning.modules';
import type { LearningModule } from '../../../learning/models/learning.model';
import { LearningProgressStore } from '../../../learning/services/learning-progress.store';
import { DASHBOARD_PAGE_COPY } from './dashboard-page.copy';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, ConfirmDialogComponent],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  protected readonly languageService = inject(LanguageService);

  private readonly authStore = inject(AuthStore);

  private readonly router = inject(Router);

  protected readonly user = this.authStore.user;

  private readonly resultStore = inject(DiagnosticResultStore);

  protected readonly historyStore = inject(DiagnosticHistoryStore);

  private readonly progressStore = inject(LearningProgressStore);

  protected readonly result = this.resultStore.result;

  protected readonly completedTopicCount =
    this.progressStore.completedTopicCount;

  protected readonly learningPercentage = this.progressStore.overallPercentage;

  protected readonly totalTopicCount = LEARNING_MODULES.reduce(
    (total, module) => total + module.topics.length,
    0,
  );

  protected readonly copy = computed(
    () => DASHBOARD_PAGE_COPY[this.languageService.language()],
  );

  protected readonly orderedCategories = computed(() => {
    const result = this.result();

    if (!result) {
      return [];
    }

    return [...result.categories].sort(
      (first, second) => first.percentage - second.percentage,
    );
  });

  protected readonly priorityArea = computed(
    () => this.orderedCategories()[0] ?? null,
  );

  protected readonly strongestArea = computed(() => {
    const categories = this.orderedCategories();

    return categories[categories.length - 1] ?? null;
  });

  protected readonly orderedModules = computed<readonly LearningModule[]>(
    () => {
      const modules: LearningModule[] = [];

      for (const category of this.orderedCategories()) {
        const module = LEARNING_MODULES.find(
          (item) => item.category === category.category,
        );

        if (module) {
          modules.push(module);
        }
      }

      return modules;
    },
  );

  protected readonly recommendedModule = computed<LearningModule | null>(() => {
    const activeModule = this.progressStore.activeModule();

    if (activeModule && !this.progressStore.isModuleCompleted(activeModule)) {
      return activeModule;
    }

    return (
      this.orderedModules().find(
        (module) => !this.progressStore.isModuleCompleted(module),
      ) ?? null
    );
  });

  protected readonly recommendedCategoryScore = computed(() => {
    const module = this.recommendedModule();
    const result = this.result();

    if (!module || !result) {
      return null;
    }

    return (
      result.categories.find(
        (category) => category.category === module.category,
      ) ?? null
    );
  });

  protected readonly activeModule = computed(() =>
    this.progressStore.activeModule(),
  );

  protected readonly showLogoutDialog = signal(false);
  protected readonly importMessage = signal<string | null>(null);

  private readonly exportService = inject(ProgressExportService);
  protected readonly achievementStore = inject(AchievementStore);

  protected modulePercentage(module: LearningModule): number {
    return this.progressStore.modulePercentage(module);
  }

  protected completedTopicsFor(module: LearningModule): number {
    return this.progressStore.completedTopicsFor(module);
  }

  protected isModuleCompleted(module: LearningModule): boolean {
    return this.progressStore.isModuleCompleted(module);
  }

  protected async logout(): Promise<void> {
    this.showLogoutDialog.set(true);
  }

  protected cancelLogout(): void {
    this.showLogoutDialog.set(false);
  }

  protected async confirmLogout(): Promise<void> {
    this.showLogoutDialog.set(false);
    this.authStore.logout();

    await this.router.navigate(['/']);
  }

  protected exportProgress(): void {
    this.exportService.exportProgress();
  }

  protected async importProgress(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const result = await this.exportService.importProgress(file);

    if (result.success) {
      this.importMessage.set(this.copy().importSuccess);
    } else {
      this.importMessage.set(this.copy().importError);
    }

    // Reset input so the same file can be selected again
    input.value = '';

    // Clear message after 4 seconds
    setTimeout(() => this.importMessage.set(null), 4000);
  }

  protected text(value: LocalizedText): string {
    return value[this.languageService.language()];
  }

  protected formatHistoryDate(isoDate: string): string {
    try {
      return new Date(isoDate).toLocaleDateString(
        this.languageService.language() === 'es' ? 'es-MX' : 'en-US',
        { month: 'short', day: 'numeric' },
      );
    } catch {
      return '';
    }
  }
}
