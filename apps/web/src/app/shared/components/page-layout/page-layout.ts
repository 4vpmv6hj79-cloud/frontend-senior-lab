import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../core/i18n/language.service';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';

const BACK_LABELS = {
  es: {
    home: 'Inicio',
    dashboard: 'Panel',
  },
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
  },
} as const;

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent],
  template: `
    <main
      class="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <!-- Background decorations -->
      <div
        class="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-500/10 to-transparent"
        aria-hidden="true"
      ></div>

      @if (showBackgroundBlob()) {
        <div
          class="pointer-events-none absolute -right-40 top-36 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"
          aria-hidden="true"
        ></div>
      }

      <div
        class="relative mx-auto px-5 py-8 sm:px-8 lg:px-12"
        [class.max-w-7xl]="maxWidth() === '7xl'"
        [class.max-w-6xl]="maxWidth() === '6xl'"
      >
        <!-- Header -->
        <header class="flex items-center justify-between gap-4">
          <a
            [routerLink]="backRoute()"
            class="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-cyan-300"
          >
            <span aria-hidden="true">←</span>
            {{ backLabel() }}
          </a>

          <div class="flex items-center gap-3">
            <ng-content select="[headerActions]" />
            <app-language-switcher />
          </div>
        </header>

        <!-- Page content slot -->
        <ng-content />
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  private readonly languageService = inject(LanguageService);

  /** Route for the back link. Defaults to '/' */
  readonly backRoute = input<string>('/');

  /** Key to resolve the back link label: 'home' | 'dashboard' */
  readonly backLabelKey = input<'home' | 'dashboard'>('home');

  /** Maximum width of inner container. Defaults to '7xl' */
  readonly maxWidth = input<'7xl' | '6xl'>('7xl');

  /** Whether to show the decorative background blob */
  readonly showBackgroundBlob = input(true);

  protected readonly backLabel = computed(
    () => BACK_LABELS[this.languageService.language()][this.backLabelKey()],
  );
}
