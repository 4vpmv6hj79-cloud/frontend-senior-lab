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
import { LANDING_PAGE_COPY } from './landing-page.copy';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage {
  protected readonly languageService = inject(LanguageService);

  protected readonly copy = computed(
    () => LANDING_PAGE_COPY[this.languageService.language()],
  );

  protected setLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
  }
}
