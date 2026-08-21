import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DIAGNOSTIC_PAGE_COPY } from './diagnostic-page.copy';
import { DiagnosticHistoryStore } from '../../services/diagnostic-history.store';
import { DiagnosticResultStore } from '../../services/diagnostic-result.store';

import { LanguageService } from '../../../../core/i18n/language.service';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout';
import { DiagnosticQuestionsService } from '../../services/diagnostic-questions.service';
import {
  CategoryScore,
  DiagnosticAnswer,
  DiagnosticCategory,
  DiagnosticLevel,
  DiagnosticOption,
  DiagnosticQuestion,
  DiagnosticResult,
  LocalizedText,
} from '../../models/diagnostic.model';

export type SlideDirection = 'left' | 'right' | 'none';

@Component({
  selector: 'app-diagnostic-page',
  imports: [RouterLink, PageLayoutComponent],
  templateUrl: './diagnostic-page.html',
  styleUrl: './diagnostic-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiagnosticPage {
  protected readonly languageService = inject(LanguageService);
  private readonly resultStore = inject(DiagnosticResultStore);
  private readonly historyStore = inject(DiagnosticHistoryStore);
  private readonly questionsService = inject(DiagnosticQuestionsService);

  protected readonly questions = this.questionsService.questions;
  protected readonly currentIndex = signal(0);
  protected readonly answers = signal<DiagnosticAnswer[]>([]);
  protected readonly selectedOptionId = signal<string | null>(null);
  protected readonly completed = signal(false);
  protected readonly slideDirection = signal<SlideDirection>('none');

  protected readonly currentQuestion = computed(
    () => this.questions()[this.currentIndex()] as DiagnosticQuestion,
  );

  /**
   * Shuffled options — random per session, cached per question.
   * Each time the user retakes the diagnostic, options appear in a different order.
   */
  private readonly shuffleCache = new Map<
    number,
    readonly DiagnosticOption[]
  >();

  protected readonly shuffledOptions = computed(() => {
    const question = this.currentQuestion();
    const idx = this.currentIndex();
    if (!question) return [];

    const cached = this.shuffleCache.get(idx);
    if (cached) return cached;

    const options = [...question.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    this.shuffleCache.set(idx, options);
    return options;
  });

  protected readonly questionNumber = computed(() => this.currentIndex() + 1);

  protected readonly progress = computed(() => {
    if (this.completed()) {
      return 100;
    }

    return Math.round((this.currentIndex() / this.questions().length) * 100);
  });

  protected readonly canContinue = computed(
    () => this.selectedOptionId() !== null,
  );

  protected readonly isFirstQuestion = computed(
    () => this.currentIndex() === 0,
  );

  protected readonly isLastQuestion = computed(
    () => this.currentIndex() === this.questions().length - 1,
  );

  protected readonly copy = computed(
    () => DIAGNOSTIC_PAGE_COPY[this.languageService.language()],
  );

  protected readonly result = computed<DiagnosticResult | null>(() => {
    if (!this.completed()) {
      return null;
    }

    return this.calculateResult();
  });

  protected text(value: LocalizedText): string {
    return value[this.languageService.language()];
  }

  protected getQuestionById(
    questionId: string,
  ): DiagnosticQuestion | undefined {
    return this.questions().find((q) => q.id === questionId);
  }

  protected getCorrectOptionText(
    questionId: string,
  ): LocalizedText | undefined {
    const question = this.getQuestionById(questionId);
    if (!question) return undefined;
    const correct = question.options.find((o) => o.score === 3);
    return correct?.text;
  }

  /**
   * Returns true if the user has started the quiz but hasn't completed it.
   * Used by the canDeactivate guard to warn before navigation.
   */
  hasUnsavedProgress(): boolean {
    return this.answers().length > 0 && !this.completed();
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
      this.historyStore.addEntry(result);
      this.completed.set(true);

      return;
    }

    this.slideDirection.set('left');
    this.currentIndex.update((index) => index + 1);
    this.restoreSelectedOption();
  }

  protected previousQuestion(): void {
    if (this.isFirstQuestion()) {
      return;
    }

    this.slideDirection.set('right');
    this.currentIndex.update((index) => index - 1);
    this.restoreSelectedOption();
  }

  protected onAnimationEnd(): void {
    this.slideDirection.set('none');
  }

  protected restart(): void {
    this.currentIndex.set(0);
    this.answers.set([]);
    this.selectedOptionId.set(null);
    this.completed.set(false);
    this.shuffleCache.clear();
    this.resultStore.clear();
  }

  private saveCurrentAnswer(optionId: string): void {
    const question = this.currentQuestion();
    const option = question.options.find((item) => item.id === optionId);

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
      ...answers.filter((item) => item.questionId !== question.id),
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

    const score = answers.reduce((total, answer) => total + answer.score, 0);

    const maximumScore = this.questions().reduce(
      (total, question) =>
        total + Math.max(...question.options.map((option) => option.score)),
      0,
    );

    const percentage =
      maximumScore === 0 ? 0 : Math.round((score / maximumScore) * 100);

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
    // Derive unique categories from the current questions
    const categories = [...new Set(this.questions().map((q) => q.category))];

    return categories.map((category) => {
      const questions = this.questions().filter(
        (question) => question.category === category,
      );

      const score = answers
        .filter((answer) => answer.category === category)
        .reduce((total, answer) => total + answer.score, 0);

      const maximumScore = questions.reduce(
        (total, question) =>
          total + Math.max(...question.options.map((option) => option.score)),
        0,
      );

      return {
        category,
        score,
        maximumScore,
        percentage:
          maximumScore === 0 ? 0 : Math.round((score / maximumScore) * 100),
      };
    });
  }

  private calculateLevel(percentage: number): DiagnosticLevel {
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
