/**
 * User subscription plans.
 * 'free' is the default for all users.
 * 'pro' unlocks all features.
 */
export type SubscriptionPlan = 'free' | 'pro';

export type BillingPeriod = 'monthly' | 'quarterly' | 'annual';

export interface SubscriptionState {
  readonly plan: SubscriptionPlan;
  readonly billingPeriod: BillingPeriod | null;
  readonly subscribedAt: string | null;
  readonly expiresAt: string | null;
}

/**
 * Stripe configuration for payments.
 * Uses Stripe Payment Links (no backend required).
 */
export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_51U43YD2HiVjoQgHd934jyaCeAgkQWluEoZH7prnMY8T40UCTWGkA8Q1T1Tn0E6uIspFRmpt9FKFcRlBfDno90s8P009tdfudzo',
  products: {
    monthly: 'prod_V4C5266AgQWglC',
    quarterly: 'prod_V4C78Z9VVGdkDv',
    annual: 'prod_V4C8eIp2ajtXfN',
  },
} as const;

/**
 * Feature access rules for each plan.
 */
export const PLAN_LIMITS = {
  free: {
    maxDiagnosticAttempts: 1,
    maxLearningModules: 1,
    maxLearningTopics: 3,
    maxInterviewQuestions: 3,
    hasHistory: false,
    hasExportImport: false,
    maxBadges: 3,
    canChangeTrack: false,
  },
  pro: {
    maxDiagnosticAttempts: Infinity,
    maxLearningModules: Infinity,
    maxLearningTopics: Infinity,
    maxInterviewQuestions: Infinity,
    hasHistory: true,
    hasExportImport: true,
    maxBadges: Infinity,
    canChangeTrack: true,
  },
} as const;
