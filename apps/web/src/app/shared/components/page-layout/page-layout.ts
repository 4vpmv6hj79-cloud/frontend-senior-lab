import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { LanguageService } from '../../../core/i18n/language.service';
import { AuthStore } from '../../../features/auth/services/auth.store';
import { AppFooterComponent } from '../app-footer/app-footer';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

const LABELS = {
  es: {
    home: 'Inicio',
    dashboard: 'Panel',
    logout: 'Salir',
    profile: 'Perfil',
  },
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    logout: 'Sign out',
    profile: 'Profile',
  },
} as const;

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent, AppFooterComponent, ThemeToggleComponent],
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

          <div class="flex flex-wrap items-center justify-end gap-3">
            <!-- User info (when authenticated and showUser is true) -->
            @if (showUser() && userName()) {
              <div class="hidden items-center gap-2 sm:flex">
                <a
                  routerLink="/profile"
                  class="max-w-36 truncate text-sm font-bold text-slate-200 transition hover:text-cyan-300"
                  [title]="userName()"
                >
                  {{ userName() }}
                </a>

                <button
                  type="button"
                  class="rounded-lg border border-white/10 bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-slate-400 transition hover:border-red-400/40 hover:text-red-300"
                  (click)="handleLogout()"
                >
                  {{ labels().logout }}
                </button>
              </div>
            }

            <ng-content select="[headerActions]" />
            <app-language-switcher />
            <app-theme-toggle />
          </div>
        </header>

        <!-- Page content slot -->
        <ng-content />
      </div>
    </main>

    @if (showFooter()) {
      <app-footer />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  private readonly languageService = inject(LanguageService);
  private readonly authStore = inject(AuthStore);
  private readonly router = inject(Router);

  /** Route for the back link. Defaults to '/' */
  readonly backRoute = input<string>('/');

  /** Key to resolve the back link label: 'home' | 'dashboard' */
  readonly backLabelKey = input<'home' | 'dashboard'>('home');

  /** Maximum width of inner container. Defaults to '7xl' */
  readonly maxWidth = input<'7xl' | '6xl'>('7xl');

  /** Whether to show the decorative background blob */
  readonly showBackgroundBlob = input(true);

  /** Whether to show the footer. Defaults to true */
  readonly showFooter = input(true);

  /** Whether to show user name + logout button. Defaults to true */
  readonly showUser = input(true);

  /** Emitted when user clicks logout (parent can override behavior) */
  readonly loggedOut = output<void>();

  protected readonly labels = computed(
    () => LABELS[this.languageService.language()],
  );

  protected readonly backLabel = computed(
    () => this.labels()[this.backLabelKey()],
  );

  protected readonly userName = computed(
    () => this.authStore.user()?.name ?? null,
  );

  protected async handleLogout(): Promise<void> {
    this.authStore.logout();
    this.loggedOut.emit();
    await this.router.navigate(['/']);
  }
}
