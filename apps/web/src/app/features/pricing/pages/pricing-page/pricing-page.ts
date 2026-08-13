import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { LanguageSwitcherComponent } from '../../../../shared/components/language-switcher/language-switcher';
import { ThemeToggleComponent } from '../../../../shared/components/theme-toggle/theme-toggle';
import { PRICING_PAGE_COPY } from './pricing-page.copy';

type BillingPeriod = 'monthly' | 'quarterly' | 'annual';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [RouterLink, LanguageSwitcherComponent, ThemeToggleComponent],
  templateUrl: './pricing-page.html',
  styleUrl: './pricing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPage {
  protected readonly languageService = inject(LanguageService);

  protected readonly billingPeriod = signal<BillingPeriod>('monthly');

  protected readonly copy = computed(
    () => PRICING_PAGE_COPY[this.languageService.language()],
  );

  protected readonly activePlan = computed(() => {
    const period = this.billingPeriod();
    const plans = this.copy().plans;

    switch (period) {
      case 'monthly':
        return plans.proMonthly;
      case 'quarterly':
        return plans.proQuarterly;
      case 'annual':
        return plans.proAnnual;
    }
  });

  protected setBillingPeriod(period: BillingPeriod): void {
    this.billingPeriod.set(period);
  }
}
