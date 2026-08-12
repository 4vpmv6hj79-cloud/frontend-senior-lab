import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher';
import { NOT_FOUND_PAGE_COPY } from './not-found-page.copy';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent],
  templateUrl: './not-found-page.html',
  styleUrl: './not-found-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {
  protected readonly languageService = inject(LanguageService);

  protected readonly copy = computed(
    () => NOT_FOUND_PAGE_COPY[this.languageService.language()],
  );
}
