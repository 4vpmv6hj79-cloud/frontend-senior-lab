import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';

import {
  LanguageService,
  SupportedLanguage,
} from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <div
      class="flex rounded-lg border border-white/10 bg-slate-900 p-1"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        class="rounded-md px-3 py-1.5 text-xs font-bold transition"
        [class.bg-cyan-400]="languageService.language() === 'es'"
        [class.text-slate-950]="languageService.language() === 'es'"
        [class.text-slate-400]="languageService.language() !== 'es'"
        [attr.aria-pressed]="languageService.language() === 'es'"
        (click)="setLanguage('es')"
      >
        ES
      </button>

      <button
        type="button"
        class="rounded-md px-3 py-1.5 text-xs font-bold transition"
        [class.bg-cyan-400]="languageService.language() === 'en'"
        [class.text-slate-950]="languageService.language() === 'en'"
        [class.text-slate-400]="languageService.language() !== 'en'"
        [attr.aria-pressed]="languageService.language() === 'en'"
        (click)="setLanguage('en')"
      >
        EN
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  protected readonly languageService = inject(LanguageService);

  protected setLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
  }
}
