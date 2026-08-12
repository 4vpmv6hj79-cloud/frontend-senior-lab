import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'frontend-senior-lab.theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly themeState = signal<Theme>(this.getInitialTheme());

  readonly theme = this.themeState.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.themeState();

      if (isPlatformBrowser(this.platformId)) {
        const root = this.document.documentElement;

        if (theme === 'dark') {
          root.classList.add('dark');
          root.classList.remove('light');
        } else {
          root.classList.add('light');
          root.classList.remove('dark');
        }

        localStorage.setItem(STORAGE_KEY, theme);
      }
    });
  }

  setTheme(theme: Theme): void {
    this.themeState.set(theme);
  }

  toggleTheme(): void {
    this.themeState.update((current) =>
      current === 'dark' ? 'light' : 'dark',
    );
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'dark';
    }

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === 'light' || stored === 'dark') {
      return stored;
    }

    // Respect system preference
    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: light)');

    if (mediaQuery?.matches) {
      return 'light';
    }

    return 'dark';
  }
}
