import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DIAGNOSTIC_PAGE_COPY } from './diagnostic-page.copy';
import { DiagnosticResultStore } from '../../services/diagnostic-result.store';

import { LanguageService } from '../../../../core/i18n/language.service';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnostic.questions';
import {
  CategoryScore,
  DiagnosticAnswer,
  DiagnosticCategory,
  DiagnosticLevel,
  DiagnosticQuestion,
  DiagnosticResult,
  LocalizedText,
} from '../../models/diagnostic.model';

const CATEGORIES: readonly DiagnosticCategory[] = [
  'angular',
  'typescript',
  'architecture',
  'testing',
  'performance',
];

@Component({
  selector: 'app-diagnostic-page',
  imports: [RouterLink],
  templateUrl: './diagnostic-page.html',
  styleUrl: './diagnostic-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagnosticPage {
  protected readonly languageService = inject(LanguageService);
  private readonly resultStore = inject(DiagnosticResultStore);

  protected readonly questions = DIAGNOSTIC_QUESTIONS;
  protected readonly currentIndex = signal(0);
  protected readonly answers = signal<DiagnosticAnswer[]>([]);
  protected readonly selectedOptionId = signal<string | null>(null);
  protected readonly completed = signal(false);

  protected readonly currentQuestion = computed(
    () =>
      this.questions[
        this.currentIndex()
      ] as DiagnosticQuestion,
  );

  protected readonly questionNumber = computed(
    () => this.currentIndex() + 1,
  );

  protected readonly progress = computed(() => {
    if (this.completed()) {
      return 100;
    }

    return Math.round(
      (this.currentIndex() / this.questions.length) * 100,
    );
  });

  protected readonly canContinue = computed(
    () => this.selectedOptionId() !== null,
  );

  protected readonly isFirstQuestion = computed(
    () => this.currentIndex() === 0,
  );

  protected readonly isLastQuestion = computed(
    () => this.currentIndex() === this.questions.length - 1,
  );

  protected readonly copy = computed(
  () =>
    DIAGNOSTIC_PAGE_COPY[
      this.languageService.language()
    ],
  );

  protected readonly result = computed<DiagnosticResult | null>(
    () => {
      if (!this.completed()) {
        return null;
      }

      return this.calculateResult();
    },
  );

  protected text(value: LocalizedText): string {
    return value[this.languageService.language()];
  }

  protected selectOption(optionId: string): void {
    this.selectedOptionId.set(optionId);
  }

  protected nextQuestion(): void {
    const selectedOptionId = this.selectedOptionId();

    if (!selectedOptionId) {
      return;
    }

    this.saveCurrentAnswer(selectedOptionId);

    if (this.isLastQuestion()) {
      const result = this.calculateResult();

      this.resultStore.save(result);
      this.completed.set(true);

      return;
    }

    this.currentIndex.update((index) => index + 1);
    this.restoreSelectedOption();
  }

  protected previousQuestion(): void {
    if (this.isFirstQuestion()) {
      return;
    }

    this.currentIndex.update((index) => index - 1);
    this.restoreSelectedOption();
  }

  protected restart(): void {
    this.currentIndex.set(0);
    this.answers.set([]);
    this.selectedOptionId.set(null);
    this.completed.set(false);
    this.resultStore.clear();
  }

  private saveCurrentAnswer(optionId: string): void {
    const question = this.currentQuestion();
    const option = question.options.find(
      (item) => item.id === optionId,
    );

    if (!option) {
      return;
    }

    const answer: DiagnosticAnswer = {
      questionId: question.id,
      category: question.category,
      optionId: option.id,
      score: option.score,
    };

    this.answers.update((answers) => [
      ...answers.filter(
        (item) => item.questionId !== question.id,
      ),
      answer,
    ]);
  }

  private restoreSelectedOption(): void {
    const questionId = this.currentQuestion().id;
    const answer = this.answers().find(
      (item) => item.questionId === questionId,
    );

    this.selectedOptionId.set(answer?.optionId ?? null);
  }

  private calculateResult(): DiagnosticResult {
    const answers = this.answers();

    const score = answers.reduce(
      (total, answer) => total + answer.score,
      0,
    );

    const maximumScore = this.questions.reduce(
      (total, question) =>
        total +
        Math.max(
          ...question.options.map((option) => option.score),
        ),
      0,
    );

    const percentage =
      maximumScore === 0
        ? 0
        : Math.round((score / maximumScore) * 100);

    return {
      score,
      maximumScore,
      percentage,
      level: this.calculateLevel(percentage),
      categories: this.calculateCategoryScores(answers),
    };
  }

  private calculateCategoryScores(
    answers: readonly DiagnosticAnswer[],
  ): readonly CategoryScore[] {
    return CATEGORIES.map((category) => {
      const questions = this.questions.filter(
        (question) => question.category === category,
      );

      const score = answers
        .filter((answer) => answer.category === category)
        .reduce(
          (total, answer) => total + answer.score,
          0,
        );

      const maximumScore = questions.reduce(
        (total, question) =>
          total +
          Math.max(
            ...question.options.map(
              (option) => option.score,
            ),
          ),
        0,
      );

      return {
        category,
        score,
        maximumScore,
        percentage:
          maximumScore === 0
            ? 0
            : Math.round((score / maximumScore) * 100),
      };
    });
  }

  private calculateLevel(
    percentage: number,
  ): DiagnosticLevel {
    if (percentage >= 85) {
      return 'senior';
    }

    if (percentage >= 65) {
      return 'advanced';
    }

    if (percentage >= 40) {
      return 'intermediate';
    }

    return 'foundation';
  }
}
