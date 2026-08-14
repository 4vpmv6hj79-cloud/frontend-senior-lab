import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
  signal,
} from '@angular/core';

import { LanguageService } from '../../../core/i18n/language.service';

interface TourStep {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}

const TOUR_STEPS = {
  es: [
    {
      icon: '🎯',
      title: 'Diagnóstico técnico',
      description:
        'Comienza evaluando tu nivel actual en 5 áreas: Angular, TypeScript, Arquitectura, Testing y Rendimiento. Solo toma 10 minutos.',
    },
    {
      icon: '📚',
      title: 'Ruta de aprendizaje',
      description:
        'Basado en tus resultados, recibes una ruta personalizada con módulos ordenados por prioridad. Cada tema tiene explicaciones, código y recursos externos.',
    },
    {
      icon: '💬',
      title: 'Simulador de entrevistas',
      description:
        'Practica con escenarios reales de empresas tech. Cada pregunta incluye contexto, respuesta modelo y tips de lo que el entrevistador espera.',
    },
    {
      icon: '📊',
      title: 'Tu dashboard',
      description:
        'Aquí ves todo tu progreso: nivel, logros desbloqueados, evolución del diagnóstico y acciones rápidas. ¡Es tu centro de control!',
    },
    {
      icon: '🌐',
      title: 'Bilingüe ES/EN',
      description:
        'Toda la plataforma funciona en español e inglés. Cambia el idioma con el botón ES/EN en cualquier momento. También puedes cambiar entre modo oscuro y claro.',
    },
    {
      icon: '🔄',
      title: 'Cambia de framework cuando quieras',
      description:
        'Cuando termines un framework, puedes cambiar a otro (React, Vue o Angular) desde tu dashboard. Tu progreso de cada framework se guarda por separado.',
    },
  ],
  en: [
    {
      icon: '🎯',
      title: 'Technical diagnostic',
      description:
        'Start by evaluating your current level in 5 areas: Angular, TypeScript, Architecture, Testing, and Performance. It only takes 10 minutes.',
    },
    {
      icon: '📚',
      title: 'Learning roadmap',
      description:
        'Based on your results, you get a personalized roadmap with modules ordered by priority. Each topic has explanations, code, and external resources.',
    },
    {
      icon: '💬',
      title: 'Interview simulator',
      description:
        'Practice with real scenarios from tech companies. Each question includes context, a model answer, and tips on what the interviewer expects.',
    },
    {
      icon: '📊',
      title: 'Your dashboard',
      description:
        "Here you see all your progress: level, unlocked achievements, diagnostic evolution, and quick actions. It's your control center!",
    },
    {
      icon: '🌐',
      title: 'Bilingual ES/EN',
      description:
        'The entire platform works in Spanish and English. Switch languages with the ES/EN button anytime. You can also toggle between dark and light mode.',
    },
    {
      icon: '🔄',
      title: 'Switch frameworks anytime',
      description:
        'When you finish one framework, you can switch to another (React, Vue, or Angular) from your dashboard. Your progress for each framework is saved separately.',
    },
  ],
} as const;

const TOUR_COPY = {
  es: {
    welcome: '¡Bienvenido a Frontend Senior Lab!',
    subtitle: 'Te mostramos cómo sacar el máximo provecho de la plataforma.',
    stepOf: 'de',
    next: 'Siguiente',
    previous: 'Anterior',
    finish: '¡Comenzar!',
    skip: 'Saltar tour',
  },
  en: {
    welcome: 'Welcome to Frontend Senior Lab!',
    subtitle: 'Let us show you how to get the most out of the platform.',
    stepOf: 'of',
    next: 'Next',
    previous: 'Previous',
    finish: 'Get started!',
    skip: 'Skip tour',
  },
} as const;

@Component({
  selector: 'app-onboarding-tour',
  standalone: true,
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
        aria-hidden="true"
      ></div>

      <!-- Tour card -->
      <article
        class="relative w-full max-w-lg animate-scale-in rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/50 sm:p-8"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="copy().welcome"
      >
        <!-- Skip button -->
        <button
          type="button"
          class="absolute right-4 top-4 text-xs font-medium text-slate-500 transition hover:text-slate-300"
          (click)="completed.emit()"
        >
          {{ copy().skip }}
        </button>

        <!-- Header (only on first step) -->
        @if (currentStep() === 0) {
          <div class="mb-6 text-center">
            <div
              class="mx-auto mb-4 grid size-14 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-2xl"
            >
              <span aria-hidden="true">&lt;/&gt;</span>
            </div>
            <h2 class="text-xl font-black text-white">
              {{ copy().welcome }}
            </h2>
            <p class="mt-2 text-sm text-slate-400">
              {{ copy().subtitle }}
            </p>
          </div>
        }

        <!-- Step content -->
        <div class="text-center">
          <span class="text-4xl" aria-hidden="true">
            {{ activeStep().icon }}
          </span>

          <h3 class="mt-4 text-lg font-black text-white">
            {{ activeStep().title }}
          </h3>

          <p class="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-300">
            {{ activeStep().description }}
          </p>
        </div>

        <!-- Progress dots -->
        <div class="mt-6 flex justify-center gap-2">
          @for (step of steps(); track $index) {
            <span
              class="size-2 rounded-full transition-all"
              [class.bg-cyan-400]="$index === currentStep()"
              [class.w-6]="$index === currentStep()"
              [class.bg-slate-700]="$index !== currentStep()"
            ></span>
          }
        </div>

        <!-- Step counter -->
        <p class="mt-3 text-center text-xs text-slate-500">
          {{ currentStep() + 1 }} {{ copy().stepOf }} {{ steps().length }}
        </p>

        <!-- Navigation -->
        <div class="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            class="rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:border-white/30 disabled:opacity-0"
            [disabled]="currentStep() === 0"
            (click)="previousStep()"
          >
            ← {{ copy().previous }}
          </button>

          @if (isLastStep()) {
            <button
              type="button"
              class="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
              (click)="completed.emit()"
            >
              {{ copy().finish }} 🚀
            </button>
          } @else {
            <button
              type="button"
              class="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
              (click)="nextStep()"
            >
              {{ copy().next }} →
            </button>
          }
        </div>
      </article>
    </div>
  `,
  styles: `
    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.95) translateY(10px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }
    .animate-scale-in {
      animation: scale-in 0.3s ease-out;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingTourComponent {
  private readonly languageService = inject(LanguageService);

  readonly completed = output<void>();
  readonly currentStep = signal(0);

  protected readonly steps = computed(
    () => TOUR_STEPS[this.languageService.language()],
  );

  protected readonly copy = computed(
    () => TOUR_COPY[this.languageService.language()],
  );

  protected readonly activeStep = computed<TourStep>(
    () => this.steps()[this.currentStep()],
  );

  protected readonly isLastStep = computed(
    () => this.currentStep() === this.steps().length - 1,
  );

  protected nextStep(): void {
    if (!this.isLastStep()) {
      this.currentStep.update((s) => s + 1);
    }
  }

  protected previousStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update((s) => s - 1);
    }
  }
}
