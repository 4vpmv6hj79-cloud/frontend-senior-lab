import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button
      type="button"
      class="grid size-9 place-items-center rounded-lg border border-white/10 bg-slate-900 text-sm transition hover:border-cyan-400/40 hover:text-cyan-300 dark:border-white/10 dark:bg-slate-900"
      [class.bg-white]="themeService.theme() === 'light'"
      [class.border-slate-200]="themeService.theme() === 'light'"
      [class.text-slate-600]="themeService.theme() === 'light'"
      [class.text-slate-300]="themeService.theme() === 'dark'"
      [attr.aria-label]="ariaLabel()"
      [title]="ariaLabel()"
      (click)="themeService.toggleTheme()"
    >
      @if (themeService.theme() === 'dark') {
        <span aria-hidden="true">☀</span>
      } @else {
        <span aria-hidden="true">☾</span>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  protected readonly ariaLabel = computed(() =>
    this.themeService.theme() === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode',
  );
}
