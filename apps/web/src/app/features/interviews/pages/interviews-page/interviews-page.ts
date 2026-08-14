import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';

import { LanguageService } from '../../../../core/i18n/language.service';
import { SubscriptionService } from '../../../../core/services/subscription.service';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout';
import { UpgradeBannerComponent } from '../../../../shared/components/upgrade-banner/upgrade-banner';
import type { LocalizedText } from '../../../../shared/models/i18n.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { INTERVIEW_QUESTIONS } from '../../data/interview.questions';
import type {
  InterviewCategoryFilter,
  InterviewDifficulty,
  InterviewQuestion,
} from '../../models/interview.model';
import { InterviewProgressStore } from '../../services/interview-progress.store';
import { INTERVIEWS_PAGE_COPY } from './interviews-page.copy';

type DifficultyFilter =
  | 'all'
  | InterviewDifficulty;

@Component({
  selector: 'app-interviews-page',
  imports: [PageLayoutComponent, UpgradeBannerComponent],
  templateUrl: './interviews-page.html',
  styleUrl: './interviews-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InterviewsPage implements OnInit {
  protected readonly languageService =
    inject(LanguageService);

  protected readonly progressStore =
    inject(InterviewProgressStore);

  protected readonly subscriptionService =
    inject(SubscriptionService);

  private readonly diagnosticStore =
    inject(DiagnosticResultStore);

  /** Difficulties accessible based on diagnostic level */
  protected readonly accessibleDifficulties = computed<readonly InterviewDifficulty[]>(() => {
    const result = this.diagnosticStore.result();
    if (!result) return ['intermediate']; // No diagnostic → only basic

    switch (result.level) {
      case 'foundation':
        return ['intermediate'];
      case 'intermediate':
        return ['intermediate', 'advanced'];
      case 'advanced':
        return ['intermediate', 'advanced', 'senior'];
      case 'senior':
        return ['intermediate', 'advanced', 'senior'];
      default:
        return ['intermediate'];
    }
  });

  protected readonly questions =
    INTERVIEW_QUESTIONS;

  protected readonly categoryFilter =
    signal<InterviewCategoryFilter>('all');

  protected readonly difficultyFilter =
    signal<DifficultyFilter>('all');

  protected readonly currentIndex = signal(0);
  protected readonly answerVisible =
    signal(false);

  protected readonly copy = computed(
    () =>
      INTERVIEWS_PAGE_COPY[
        this.languageService.language()
      ],
  );

  protected readonly filteredQuestions =
    computed<readonly InterviewQuestion[]>(
      () => {
        const accessible = this.accessibleDifficulties();

        const all = this.questions.filter((question) => {
          const category =
            this.categoryFilter();

          const difficulty =
            this.difficultyFilter();

          const matchesCategory =
            category === 'all' ||
            question.category === category;

          const matchesDifficulty =
            difficulty === 'all' ||
            question.difficulty === difficulty;

          // Only show questions at or below user's level
          const matchesLevel =
            accessible.includes(question.difficulty);

          return (
            matchesCategory &&
            matchesDifficulty &&
            matchesLevel
          );
        });

        // Limit questions for free users
        const limit = this.subscriptionService.limits().maxInterviewQuestions;
        return limit === Infinity ? all : all.slice(0, limit);
      },
    );

  protected readonly currentQuestion =
    computed<InterviewQuestion | null>(
      () =>
        this.filteredQuestions()[
          this.currentIndex()
        ] ?? null,
    );

  protected readonly currentNumber = computed(
    () =>
      this.currentQuestion()
        ? this.currentIndex() + 1
        : 0,
  );

  protected readonly isFirstQuestion =
    computed(() => this.currentIndex() === 0);

  protected readonly isLastQuestion =
    computed(
      () =>
        this.filteredQuestions().length === 0 ||
        this.currentIndex() ===
          this.filteredQuestions().length - 1,
    );

  protected readonly progressPercentage =
    computed(() =>
      Math.round(
        (
          this.progressStore.reviewedCount() /
          this.questions.length
        ) * 100,
      ),
    );

  ngOnInit(): void {
    const lastQuestionId =
      this.progressStore.progress().lastQuestionId;

    if (!lastQuestionId) {
      return;
    }

    const questionIndex =
      this.filteredQuestions().findIndex(
        (question) =>
          question.id === lastQuestionId,
      );

    if (questionIndex >= 0) {
      this.currentIndex.set(questionIndex);
    }
  }

  protected setCategoryFilter(
    value: InterviewCategoryFilter,
  ): void {
    this.categoryFilter.set(value);
    this.resetNavigation();
  }

  protected setDifficultyFilter(
    value: DifficultyFilter,
  ): void {
    this.difficultyFilter.set(value);
    this.resetNavigation();
  }

  protected previousQuestion(): void {
    if (this.isFirstQuestion()) {
      return;
    }

    this.currentIndex.update(
      (index) => index - 1,
    );

    this.onQuestionChanged();
  }

  protected nextQuestion(): void {
    if (this.isLastQuestion()) {
      return;
    }

    this.currentIndex.update(
      (index) => index + 1,
    );

    this.onQuestionChanged();
  }

  protected toggleAnswer(): void {
    this.answerVisible.update(
      (visible) => !visible,
    );
  }

  protected markCurrentAsReviewed(): void {
    const question = this.currentQuestion();

    if (!question) {
      return;
    }

    this.progressStore.markReviewed(
      question.id,
    );
  }

  protected isReviewed(
    question: InterviewQuestion,
  ): boolean {
    return this.progressStore.isReviewed(
      question.id,
    );
  }

  protected resetProgress(): void {
    this.progressStore.clear();
    this.currentIndex.set(0);
    this.answerVisible.set(false);
  }

  protected text(
    value: LocalizedText,
  ): string {
    return value[
      this.languageService.language()
    ];
  }

  private resetNavigation(): void {
    this.currentIndex.set(0);
    this.answerVisible.set(false);

    const question = this.currentQuestion();

    if (question) {
      this.progressStore.setLastQuestion(
        question.id,
      );
    }
  }

  private onQuestionChanged(): void {
    this.answerVisible.set(false);

    const question = this.currentQuestion();

    if (question) {
      this.progressStore.setLastQuestion(
        question.id,
      );
    }
  }
}
