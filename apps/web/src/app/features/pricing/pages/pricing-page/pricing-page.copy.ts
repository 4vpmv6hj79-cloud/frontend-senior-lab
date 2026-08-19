import type { SupportedLanguage } from '../../../../core/i18n/language.service';

interface PricingPlan {
  readonly name: string;
  readonly price: string;
  readonly period: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly cta: string;
  readonly highlighted?: boolean;
  readonly badge?: string;
  readonly savings?: string;
}

interface PricingPageCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly billingToggle: {
    readonly monthly: string;
    readonly quarterly: string;
    readonly annual: string;
  };
  readonly plans: {
    readonly free: PricingPlan;
    readonly proMonthly: PricingPlan;
    readonly proQuarterly: PricingPlan;
    readonly proAnnual: PricingPlan;
  };
  readonly faq: {
    readonly title: string;
    readonly items: readonly { question: string; answer: string }[];
  };
  readonly comingSoon: string;
  readonly currencyNote: string;
}

export const PRICING_PAGE_COPY = {
  es: {
    eyebrow: 'Planes y precios',
    title: 'Invierte en tu carrera senior',
    description: 'Empieza gratis. Desbloquea todo cuando estés listo para acelerar tu crecimiento.',
    billingToggle: {
      monthly: 'Mensual',
      quarterly: 'Trimestral',
      annual: 'Anual',
    },
    plans: {
      free: {
        name: 'Free',
        price: '$0',
        period: 'por siempre',
        description: 'Perfecto para explorar y evaluar tu nivel actual.',
        features: [
          '1 diagnóstico completo',
          '2 módulos de aprendizaje',
          '3 preguntas de entrevista',
          'Progreso local (este navegador)',
          'Soporte bilingüe ES/EN',
        ],
        cta: 'Comenzar gratis',
      },
      proMonthly: {
        name: 'Pro',
        price: '$9.99',
        period: '/mes',
        description: 'Acceso completo para quien quiere resultados rápidos.',
        features: [
          'Diagnósticos ilimitados',
          'Los 5 módulos completos con código',
          'Las 10 preguntas de entrevista + nuevas cada mes',
          'Historial de evolución',
          'Todos los badges desbloqueables',
          'Exportar/importar progreso',
          'Sincronización en la nube',
          'Soporte prioritario',
        ],
        cta: 'Elegir Pro',
        highlighted: true,
        badge: 'Popular',
        savings: '',
      },
      proQuarterly: {
        name: 'Pro',
        price: '$24.99',
        period: '/trimestre',
        description: 'Ahorra 17% con el plan trimestral.',
        features: [
          'Todo lo del plan Pro mensual',
          '3 meses de acceso completo',
          'Ahorro de $4.98 vs. mensual',
        ],
        cta: 'Elegir trimestral',
        savings: 'Ahorra 17%',
        badge: '',
      },
      proAnnual: {
        name: 'Pro',
        price: '$79.99',
        period: '/año',
        description: 'El mejor valor. Paga 8 meses, recibe 12.',
        features: [
          'Todo lo del plan Pro mensual',
          '12 meses de acceso completo',
          'Ahorro de $39.89 vs. mensual',
          'Acceso anticipado a nuevas funciones',
        ],
        cta: 'Elegir anual',
        highlighted: true,
        badge: 'Mejor valor',
        savings: 'Ahorra 33%',
      },
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        {
          question: '¿Puedo cancelar en cualquier momento?',
          answer: 'Sí. Sin contratos ni penalizaciones. Tu acceso continúa hasta el final del periodo pagado.',
        },
        {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Tarjeta de crédito/débito (Visa, Mastercard, Amex) a través de Stripe. Próximamente PayPal.',
        },
        {
          question: '¿El plan Free tiene límite de tiempo?',
          answer: 'No. El plan Free es permanente. Puedes usar las funciones incluidas sin fecha de vencimiento.',
        },
        {
          question: '¿Qué pasa si ya empecé con Free y subo a Pro?',
          answer: 'Todo tu progreso se conserva. Simplemente desbloqueas el contenido adicional.',
        },
      ],
    },
    comingSoon: 'Pagos disponibles próximamente. Por ahora, todo el contenido es gratuito.',
    currencyNote: 'Precios en USD. Al momento del pago, se muestra el equivalente en tu moneda local.',
  },
  en: {
    eyebrow: 'Plans and pricing',
    title: 'Invest in your senior career',
    description: 'Start free. Unlock everything when you are ready to accelerate your growth.',
    billingToggle: {
      monthly: 'Monthly',
      quarterly: 'Quarterly',
      annual: 'Annual',
    },
    plans: {
      free: {
        name: 'Free',
        price: '$0',
        period: 'forever',
        description: 'Perfect to explore and evaluate your current level.',
        features: [
          '1 complete diagnostic',
          '2 learning modules',
          '3 interview questions',
          'Local progress (this browser)',
          'Bilingual support ES/EN',
        ],
        cta: 'Start free',
      },
      proMonthly: {
        name: 'Pro',
        price: '$9.99',
        period: '/month',
        description: 'Full access for those who want fast results.',
        features: [
          'Unlimited diagnostics',
          'All 5 modules with code examples',
          'All 10 interview questions + new ones monthly',
          'Evolution history',
          'All unlockable badges',
          'Export/import progress',
          'Cloud sync',
          'Priority support',
        ],
        cta: 'Choose Pro',
        highlighted: true,
        badge: 'Popular',
        savings: '',
      },
      proQuarterly: {
        name: 'Pro',
        price: '$24.99',
        period: '/quarter',
        description: 'Save 17% with the quarterly plan.',
        features: [
          'Everything in Pro monthly',
          '3 months of full access',
          'Save $4.98 vs. monthly',
        ],
        cta: 'Choose quarterly',
        savings: 'Save 17%',
        badge: '',
      },
      proAnnual: {
        name: 'Pro',
        price: '$79.99',
        period: '/year',
        description: 'Best value. Pay 8 months, get 12.',
        features: [
          'Everything in Pro monthly',
          '12 months of full access',
          'Save $39.89 vs. monthly',
          'Early access to new features',
        ],
        cta: 'Choose annual',
        highlighted: true,
        badge: 'Best value',
        savings: 'Save 33%',
      },
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        {
          question: 'Can I cancel anytime?',
          answer: 'Yes. No contracts or penalties. Your access continues until the end of the paid period.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'Credit/debit card (Visa, Mastercard, Amex) via Stripe. PayPal coming soon.',
        },
        {
          question: 'Does the Free plan have a time limit?',
          answer: 'No. The Free plan is permanent. You can use the included features with no expiration.',
        },
        {
          question: 'What if I started with Free and upgrade to Pro?',
          answer: 'All your progress is preserved. You simply unlock the additional content.',
        },
      ],
    },
    comingSoon: 'Payments coming soon. For now, all content is free.',
    currencyNote: 'Prices in USD. At checkout, the equivalent in your local currency will be displayed.',
  },
} as const satisfies Record<SupportedLanguage, PricingPageCopy>;
