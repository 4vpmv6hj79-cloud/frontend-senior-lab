import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../core/i18n/language.service';

const COPY = {
  es: {
    title: '🔒 Contenido Pro',
    description: 'Desbloquea todos los módulos, preguntas de entrevista y herramientas avanzadas.',
    cta: 'Ver planes',
  },
  en: {
    title: '🔒 Pro Content',
    description: 'Unlock all modules, interview questions, and advanced tools.',
    cta: 'View plans',
  },
} as const;

/**
 * Banner that shows when a free user tries to access Pro-only content.
 * Links to the pricing page.
 */
@Component({
  selector: 'app-upgrade-banner',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-5 sm:p-6">
      <div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-sm font-black text-amber-300">
            {{ copy().title }}
          </h3>
          <p class="mt-1 text-sm text-slate-400">
            {{ copy().description }}
          </p>
        </div>
        <a
          routerLink="/pricing"
          class="inline-flex shrink-0 items-center rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:bg-amber-300"
        >
          {{ copy().cta }} →
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpgradeBannerComponent {
  private readonly languageService = inject(LanguageService);
  protected readonly copy = computed(() => COPY[this.languageService.language()]);
}
