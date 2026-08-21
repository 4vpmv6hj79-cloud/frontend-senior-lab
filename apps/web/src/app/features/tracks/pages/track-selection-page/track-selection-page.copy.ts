import type { SupportedLanguage } from '../../../../core/i18n/language.service';

interface TrackSelectionPageCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly selectButton: string;
  readonly currentTrack: string;
  readonly changeTrack: string;
  readonly lockedLabel: string;
  readonly upgradeCta: string;
  readonly freeLockedTitle: string;
  readonly freeLockedDescription: string;
  readonly categoryLabels: {
    readonly framework: string;
    readonly typescript: string;
    readonly architecture: string;
    readonly testing: string;
    readonly performance: string;
  };
}

export const TRACK_SELECTION_PAGE_COPY = {
  es: {
    eyebrow: 'Elige tu especialización',
    title: '¿Cuál es tu framework?',
    description:
      'Selecciona el framework en el que quieres especializarte. Tendrás un diagnóstico, ruta de aprendizaje y entrevistas personalizadas para tu elección.',
    selectButton: 'Elegir',
    currentTrack: 'Tu track actual',
    changeTrack: 'Cambiar de track',
    lockedLabel: 'Solo con plan Pro',
    upgradeCta: 'Desbloquear todos los frameworks',
    freeLockedTitle: 'Plan gratuito: 1 framework',
    freeLockedDescription:
      'Con el plan gratuito solo puedes usar un framework. Actualiza a Pro para acceder a Angular, React y Vue sin restricciones.',
    categoryLabels: {
      framework: 'Framework core',
      typescript: 'TypeScript',
      architecture: 'Arquitectura',
      testing: 'Testing',
      performance: 'Rendimiento',
    },
  },
  en: {
    eyebrow: 'Choose your specialization',
    title: 'What is your framework?',
    description:
      'Select the framework you want to specialize in. You will get a personalized diagnostic, learning path, and interviews for your choice.',
    selectButton: 'Select',
    currentTrack: 'Your current track',
    changeTrack: 'Change track',
    lockedLabel: 'Pro plan only',
    upgradeCta: 'Unlock all frameworks',
    freeLockedTitle: 'Free plan: 1 framework',
    freeLockedDescription:
      'The free plan only allows one framework. Upgrade to Pro to access Angular, React, and Vue without restrictions.',
    categoryLabels: {
      framework: 'Framework core',
      typescript: 'TypeScript',
      architecture: 'Architecture',
      testing: 'Testing',
      performance: 'Performance',
    },
  },
} as const satisfies Record<SupportedLanguage, TrackSelectionPageCopy>;
