import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { TopicQuiz, TopicQuizResult } from '../../models/topic-quiz.model';

interface QuizAnswer {
  questionId: string;
  selectedOptionId: string;
}

const COPY = {
  es: {
    title: 'Prueba de conocimiento',
    subtitle:
      'Responde correctamente al menos 2 de 3 preguntas para completar este tema.',
    question: 'Pregunta',
    of: 'de',
    next: 'Siguiente',
    previous: 'Anterior',
    submit: 'Enviar respuestas',
    passed: '¡Aprobado!',
    passedMessage:
      'Demostraste tu conocimiento. El tema ha sido marcado como completado.',
    failed: 'Inténtalo de nuevo',
    failedMessage:
      'Necesitas al menos 2/3 correctas. Revisa el contenido y vuelve a intentarlo.',
    correct: 'correctas',
    retry: 'Reintentar',
    close: 'Cerrar',
    cancel: 'Cancelar',
  },
  en: {
    title: 'Knowledge check',
    subtitle:
      'Answer at least 2 of 3 questions correctly to complete this topic.',
    question: 'Question',
    of: 'of',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit answers',
    passed: 'Passed!',
    passedMessage:
      'You demonstrated your knowledge. The topic has been marked as completed.',
    failed: 'Try again',
    failedMessage:
      'You need at least 2/3 correct. Review the content and try again.',
    correct: 'correct',
    retry: 'Retry',
    close: 'Close',
    cancel: 'Cancel',
  },
} as const;

@Component({
  selector: 'app-topic-quiz',
  standalone: true,
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
        (click)="cancelled.emit()"
      ></div>

      <!-- Quiz card -->
      <article
        class="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl sm:p-8"
      >
        @if (!result()) {
          <!-- Quiz in progress -->
          <div class="mb-6">
            <h2 class="text-lg font-black text-white">{{ copy().title }}</h2>
            <p class="mt-1 text-sm text-slate-400">{{ copy().subtitle }}</p>
          </div>

          <!-- Progress -->
          <div
            class="mb-4 flex items-center justify-between text-xs text-slate-500"
          >
            <span
              >{{ copy().question }} {{ currentIndex() + 1 }} {{ copy().of }}
              {{ quiz().questions.length }}</span
            >
            <div class="flex gap-1">
              @for (q of quiz().questions; track q.id; let i = $index) {
                <span
                  class="size-2 rounded-full"
                  [class.bg-cyan-400]="i === currentIndex()"
                  [class.bg-emerald-400]="i < currentIndex() && getAnswer(q.id)"
                  [class.bg-slate-700]="i > currentIndex()"
                ></span>
              }
            </div>
          </div>

          <!-- Question -->
          <div class="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
            <p class="text-sm font-bold leading-7 text-white">
              {{ text(currentQuestion().question) }}
            </p>

            <div class="mt-5 space-y-3" role="radiogroup">
              @for (option of currentQuestion().options; track option.id) {
                <button
                  type="button"
                  role="radio"
                  class="flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm transition"
                  [class.border-cyan-400]="selectedOptionId() === option.id"
                  [class.bg-cyan-400/10]="selectedOptionId() === option.id"
                  [class.border-slate-700]="selectedOptionId() !== option.id"
                  [class.hover:border-slate-500]="
                    selectedOptionId() !== option.id
                  "
                  [attr.aria-checked]="selectedOptionId() === option.id"
                  (click)="selectOption(option.id)"
                >
                  <span
                    class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border text-xs"
                    [class.border-cyan-400]="selectedOptionId() === option.id"
                    [class.bg-cyan-400]="selectedOptionId() === option.id"
                    [class.text-slate-950]="selectedOptionId() === option.id"
                    [class.border-slate-600]="selectedOptionId() !== option.id"
                  >
                    @if (selectedOptionId() === option.id) {
                      ●
                    }
                  </span>
                  <span class="text-slate-200">{{ text(option.text) }}</span>
                </button>
              }
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-6 flex items-center justify-between">
            <button
              type="button"
              class="text-sm font-medium text-slate-400 transition hover:text-slate-200"
              (click)="cancelled.emit()"
            >
              {{ copy().cancel }}
            </button>

            <div class="flex gap-3">
              @if (currentIndex() > 0) {
                <button
                  type="button"
                  class="rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:border-white/30"
                  (click)="previousQuestion()"
                >
                  ← {{ copy().previous }}
                </button>
              }

              @if (isLastQuestion()) {
                <button
                  type="button"
                  class="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40"
                  [disabled]="!allAnswered()"
                  (click)="submitQuiz()"
                >
                  {{ copy().submit }}
                </button>
              } @else {
                <button
                  type="button"
                  class="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-cyan-300 disabled:opacity-40"
                  [disabled]="!selectedOptionId()"
                  (click)="nextQuestion()"
                >
                  {{ copy().next }} →
                </button>
              }
            </div>
          </div>
        } @else {
          <!-- Results -->
          @if (result()!.passed) {
            <div class="text-center">
              <div
                class="mx-auto mb-4 grid size-16 place-items-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-3xl"
              >
                ✓
              </div>
              <h2 class="text-2xl font-black text-emerald-300">
                {{ copy().passed }}
              </h2>
              <p class="mt-2 text-sm text-slate-400">
                {{ copy().passedMessage }}
              </p>
              <p class="mt-4 text-lg font-bold text-white">
                {{ result()!.correctAnswers }}/{{ result()!.totalQuestions }}
                {{ copy().correct }}
              </p>
              <button
                type="button"
                class="mt-6 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-emerald-300"
                (click)="passed.emit(result()!)"
              >
                {{ copy().close }}
              </button>
            </div>
          } @else {
            <div class="text-center">
              <div
                class="mx-auto mb-4 grid size-16 place-items-center rounded-2xl border border-rose-400/30 bg-rose-400/10 text-3xl"
              >
                ✕
              </div>
              <h2 class="text-2xl font-black text-rose-300">
                {{ copy().failed }}
              </h2>
              <p class="mt-2 text-sm text-slate-400">
                {{ copy().failedMessage }}
              </p>
              <p class="mt-4 text-lg font-bold text-white">
                {{ result()!.correctAnswers }}/{{ result()!.totalQuestions }}
                {{ copy().correct }}
              </p>
              <div class="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  class="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-white/30"
                  (click)="cancelled.emit()"
                >
                  {{ copy().close }}
                </button>
                <button
                  type="button"
                  class="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                  (click)="retryQuiz()"
                >
                  {{ copy().retry }}
                </button>
              </div>
            </div>
          }
        }
      </article>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicQuizComponent {
  private readonly languageService = inject(LanguageService);

  /** The quiz data to display */
  readonly quiz = input.required<TopicQuiz>();

  /** Emitted when the user passes the quiz */
  readonly passed = output<TopicQuizResult>();

  /** Emitted when the user cancels or closes */
  readonly cancelled = output<void>();

  protected readonly currentIndex = signal(0);
  protected readonly answers = signal<QuizAnswer[]>([]);
  protected readonly selectedOptionId = signal<string | null>(null);
  protected readonly result = signal<TopicQuizResult | null>(null);

  protected readonly copy = computed(
    () => COPY[this.languageService.language()],
  );

  protected readonly currentQuestion = computed(
    () => this.quiz().questions[this.currentIndex()],
  );

  protected readonly isLastQuestion = computed(
    () => this.currentIndex() === this.quiz().questions.length - 1,
  );

  protected readonly allAnswered = computed(
    () => this.answers().length === this.quiz().questions.length,
  );

  protected text(value: { es: string; en: string }): string {
    return value[this.languageService.language()];
  }

  protected selectOption(optionId: string): void {
    this.selectedOptionId.set(optionId);

    // Save answer
    const questionId = this.currentQuestion().id;
    this.answers.update((answers) => [
      ...answers.filter((a) => a.questionId !== questionId),
      { questionId, selectedOptionId: optionId },
    ]);
  }

  protected nextQuestion(): void {
    if (!this.isLastQuestion()) {
      this.currentIndex.update((i) => i + 1);
      this.restoreSelection();
    }
  }

  protected previousQuestion(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update((i) => i - 1);
      this.restoreSelection();
    }
  }

  protected getAnswer(questionId: string): QuizAnswer | undefined {
    return this.answers().find((a) => a.questionId === questionId);
  }

  protected submitQuiz(): void {
    const questions = this.quiz().questions;
    const answers = this.answers();

    const correctAnswers = questions.filter((q) => {
      const answer = answers.find((a) => a.questionId === q.id);
      return answer?.selectedOptionId === q.correctOptionId;
    }).length;

    const quizResult: TopicQuizResult = {
      topicId: this.quiz().topicId,
      totalQuestions: questions.length,
      correctAnswers,
      passed: correctAnswers >= this.quiz().passingScore,
      completedAt: new Date().toISOString(),
    };

    this.result.set(quizResult);
  }

  protected retryQuiz(): void {
    this.currentIndex.set(0);
    this.answers.set([]);
    this.selectedOptionId.set(null);
    this.result.set(null);
  }

  private restoreSelection(): void {
    const questionId = this.currentQuestion().id;
    const existing = this.answers().find((a) => a.questionId === questionId);
    this.selectedOptionId.set(existing?.selectedOptionId ?? null);
  }
}
