import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

export type SupportedLanguage = 'es' | 'en';

const DEFAULT_LANGUAGE: SupportedLanguage = 'es';
const STORAGE_KEY = 'frontend-senior-lab.language';

function isSupportedLanguage(
  value: string | null,
): value is SupportedLanguage {
  return value === 'es' || value === 'en';
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly languageState = signal(this.getInitialLanguage());

  readonly language = this.languageState.asReadonly();

  constructor() {
    effect(() => {
      const language = this.languageState();

      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.lang = language;
        localStorage.setItem(STORAGE_KEY, language);
      }
    });
  }

  setLanguage(language: SupportedLanguage): void {
    this.languageState.set(language);
  }

  toggleLanguage(): void {
    this.languageState.update((language) =>
      language === 'es' ? 'en' : 'es',
    );
  }

  private getInitialLanguage(): SupportedLanguage {
    if (!isPlatformBrowser(this.platformId)) {
      return DEFAULT_LANGUAGE;
    }

    const storedLanguage = localStorage.getItem(STORAGE_KEY);

    if (isSupportedLanguage(storedLanguage)) {
      return storedLanguage;
    }

    return navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en';
  }
}