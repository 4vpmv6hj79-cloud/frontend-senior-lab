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
} from '../../../../core/i18n/language.service';
import { AuthStore } from '../../../auth/services/auth.store';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
import { LANDING_PAGE_COPY } from './landing-page.copy';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink, ThemeToggleComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  protected readonly languageService = inject(LanguageService);
  private readonly authStore = inject(AuthStore);

  protected readonly copy = computed(
    () => LANDING_PAGE_COPY[this.languageService.language()],
  );

  /** If authenticated, CTA goes to diagnostic; otherwise to register */
  protected readonly primaryRoute = computed(() =>
    this.authStore.isAuthenticated() ? '/diagnostic' : '/register',
  );

  protected setLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
  }
}
