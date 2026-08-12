import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  LanguageService,
  SupportedLanguage,
} from '../../../core/i18n/language.service';

interface FooterCopy {
  readonly tagline: string;
  readonly navigation: string;
  readonly home: string;
  readonly diagnostic: string;
  readonly learning: string;
  readonly interviews: string;
  readonly dashboard: string;
  readonly resources: string;
  readonly github: string;
  readonly angular: string;
  readonly typescript: string;
  readonly credits: string;
  readonly builtWith: string;
  readonly rights: string;
}

const FOOTER_COPY = {
  es: {
    tagline: 'Plataforma de desarrollo profesional para ingenieros frontend.',
    navigation: 'Navegación',
    home: 'Inicio',
    diagnostic: 'Diagnóstico',
    learning: 'Aprendizaje',
    interviews: 'Entrevistas',
    dashboard: 'Panel',
    resources: 'Recursos',
    github: 'GitHub',
    angular: 'Angular Docs',
    typescript: 'TypeScript Docs',
    credits: 'Créditos',
    builtWith: 'Construido con Angular, Tailwind CSS y Nx.',
    rights: 'Frontend Senior Lab. Proyecto educativo open-source.',
  },
  en: {
    tagline: 'Professional development platform for frontend engineers.',
    navigation: 'Navigation',
    home: 'Home',
    diagnostic: 'Diagnostic',
    learning: 'Learning',
    interviews: 'Interviews',
    dashboard: 'Dashboard',
    resources: 'Resources',
    github: 'GitHub',
    angular: 'Angular Docs',
    typescript: 'TypeScript Docs',
    credits: 'Credits',
    builtWith: 'Built with Angular, Tailwind CSS, and Nx.',
    rights: 'Frontend Senior Lab. Open-source educational project.',
  },
} as const satisfies Record<SupportedLanguage, FooterCopy>;

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer
      class="border-t border-white/10 bg-slate-950 text-slate-400"
    >
      <div class="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Brand -->
          <div class="lg:col-span-1">
            <a routerLink="/" class="flex items-center gap-2">
              <span
                class="grid size-9 place-items-center rounded-lg bg-cyan-400 font-mono text-xs font-black text-slate-950"
              >
                &lt;/&gt;
              </span>
              <span class="text-sm font-black text-white">
                Frontend <span class="text-cyan-400">Senior Lab</span>
              </span>
            </a>
            <p class="mt-4 text-sm leading-6">
              {{ copy().tagline }}
            </p>
          </div>

          <!-- Navigation -->
          <nav [attr.aria-label]="copy().navigation">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
              {{ copy().navigation }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li>
                <a routerLink="/" class="transition hover:text-cyan-400">
                  {{ copy().home }}
                </a>
              </li>
              <li>
                <a routerLink="/diagnostic" class="transition hover:text-cyan-400">
                  {{ copy().diagnostic }}
                </a>
              </li>
              <li>
                <a routerLink="/learning" class="transition hover:text-cyan-400">
                  {{ copy().learning }}
                </a>
              </li>
              <li>
                <a routerLink="/interviews" class="transition hover:text-cyan-400">
                  {{ copy().interviews }}
                </a>
              </li>
              <li>
                <a routerLink="/dashboard" class="transition hover:text-cyan-400">
                  {{ copy().dashboard }}
                </a>
              </li>
            </ul>
          </nav>

          <!-- Resources -->
          <div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
              {{ copy().resources }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition hover:text-cyan-400"
                >
                  {{ copy().github }} ↗
                </a>
              </li>
              <li>
                <a
                  href="https://angular.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition hover:text-cyan-400"
                >
                  {{ copy().angular }} ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="transition hover:text-cyan-400"
                >
                  {{ copy().typescript }} ↗
                </a>
              </li>
            </ul>
          </div>

          <!-- Credits -->
          <div>
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
              {{ copy().credits }}
            </h3>
            <p class="mt-4 text-sm leading-6">
              {{ copy().builtWith }}
            </p>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs">
          <p>© {{ currentYear }} {{ copy().rights }}</p>

          <div class="flex items-center gap-1">
            <span class="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
            <span class="text-emerald-300">v1.0</span>
          </div>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  private readonly languageService = inject(LanguageService);

  protected readonly copy = computed(
    () => FOOTER_COPY[this.languageService.language()],
  );

  protected readonly currentYear = new Date().getFullYear();
}
