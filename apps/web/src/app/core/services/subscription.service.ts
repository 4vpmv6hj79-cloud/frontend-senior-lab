import { isPlatformBrowser } from '@angular/common';
import {
  computed,
  effect,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import {
  type BillingPeriod,
  PLAN_LIMITS,
  STRIPE_CONFIG,
  type SubscriptionPlan,
  type SubscriptionState,
} from '../models/subscription.model';
import { UserStorageService } from './user-storage.service';

const STORAGE_KEY = 'subscription';

const DEFAULT_STATE: SubscriptionState = {
  plan: 'free',
  billingPeriod: null,
  subscribedAt: null,
  expiresAt: null,
};

/**
 * Service that manages the user's subscription plan.
 *
 * In test mode (current):
 * - Uses Stripe Payment Links for checkout
 * - Stores subscription state in localStorage (per user)
 * - No real payment processing until Stripe webhook is set up
 *
 * For production:
 * - Add Stripe webhook to verify payments server-side
 * - Store subscription in Firestore for persistence
 */
@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storage = inject(UserStorageService);

  private readonly state = signal<SubscriptionState>(DEFAULT_STATE);

  /** Current subscription plan */
  readonly plan = computed(() => this.state().plan);

  /** Whether the user has an active Pro subscription */
  readonly isPro = computed(() => this.state().plan === 'pro');

  /** Whether the user is on the free plan */
  readonly isFree = computed(() => this.state().plan === 'free');

  /** Plan limits for the current plan */
  readonly limits = computed(() => PLAN_LIMITS[this.state().plan]);

  constructor() {
    effect(() => {
      this.storage.userChanged();
      this.loadFromStorage();
    });
  }

  /**
   * Open Stripe Checkout for a specific billing period.
   * Uses Stripe Payment Links (redirects to Stripe-hosted page).
   */
  checkout(period: BillingPeriod): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // For now, use Stripe's product page URL
    // In production, you'd create a Checkout Session via API
    const productId = STRIPE_CONFIG.products[period];
    const returnUrl = encodeURIComponent(window.location.origin + '/dashboard?upgraded=true');

    // Stripe Payment Link format (user creates these in Stripe Dashboard)
    // For test mode, we'll redirect to a success simulation
    const checkoutUrl = `https://buy.stripe.com/test_${productId}?client_reference_id=user&success_url=${returnUrl}`;

    // Since we don't have actual payment links yet, simulate with a confirm dialog
    this.simulateCheckout(period);
  }

  /**
   * Simulate checkout for testing (will be replaced by real Stripe).
   * In test mode, this lets you "upgrade" without real payment.
   */
  private simulateCheckout(period: BillingPeriod): void {
    const confirmed = window.confirm(
      `[TEST MODE] Simulate upgrading to Pro (${period})?\n\nIn production, this will redirect to Stripe Checkout.\nNo real payment will be processed.`
    );

    if (confirmed) {
      this.activatePro(period);
    }
  }

  /**
   * Activate Pro subscription (called after successful payment).
   */
  activatePro(period: BillingPeriod): void {
    const now = new Date();
    let expiresAt: Date;

    switch (period) {
      case 'monthly':
        expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      case 'quarterly':
        expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
        break;
      case 'annual':
        expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
        break;
    }

    const newState: SubscriptionState = {
      plan: 'pro',
      billingPeriod: period,
      subscribedAt: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };

    this.state.set(newState);
    this.storage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }

  /**
   * Cancel subscription (revert to free).
   */
  cancelSubscription(): void {
    this.state.set(DEFAULT_STATE);
    this.storage.removeItem(STORAGE_KEY);
  }

  /** Whether the user can switch to a different framework track */
  readonly canChangeTrack = computed(() => {
    if (this.isPro()) return true;
    // Free users can only select their first track, not change it
    return !this.storage.getItem('selected-track');
  });

  /**
   * Check if a specific feature is accessible with current plan.
   */
  canAccess(feature: 'diagnostic' | 'learning' | 'interviews' | 'history' | 'export'): boolean {
    if (this.isPro()) return true;

    switch (feature) {
      case 'diagnostic':
      case 'learning':
      case 'interviews':
        return true; // Accessible but limited
      case 'history':
        return PLAN_LIMITS.free.hasHistory;
      case 'export':
        return PLAN_LIMITS.free.hasExportImport;
      default:
        return false;
    }
  }

  /**
   * Check if the user has reached the free plan limit for a feature.
   */
  isLimitReached(feature: 'modules' | 'topics' | 'questions', currentCount: number): boolean {
    if (this.isPro()) return false;

    const limits = PLAN_LIMITS.free;
    switch (feature) {
      case 'modules':
        return currentCount >= limits.maxLearningModules;
      case 'topics':
        return currentCount >= limits.maxLearningTopics;
      case 'questions':
        return currentCount >= limits.maxInterviewQuestions;
      default:
        return false;
    }
  }

  private loadFromStorage(): void {
    const stored = this.storage.getItem(STORAGE_KEY);

    if (!stored) {
      this.state.set(DEFAULT_STATE);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as SubscriptionState;

      // Check if subscription has expired
      if (parsed.expiresAt && new Date(parsed.expiresAt) < new Date()) {
        this.state.set(DEFAULT_STATE);
        this.storage.removeItem(STORAGE_KEY);
        return;
      }

      this.state.set(parsed);
    } catch {
      this.state.set(DEFAULT_STATE);
    }
  }
}
