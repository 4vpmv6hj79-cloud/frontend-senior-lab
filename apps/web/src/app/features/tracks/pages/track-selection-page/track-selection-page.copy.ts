import type { SupportedLanguage } from '../../../../core/i18n/language.service';

interface TrackSelectionPageCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly selectButton: string;
  readonly currentTrack: string;
  readonly changeTrack: string;
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
    categoryLabels: {
      framework: 'Framework core',
      typescript: 'TypeScript',
      architecture: 'Architecture',
      testing: 'Testing',
      performance: 'Performance',
    },
  },
} as const satisfies Record<SupportedLanguage, TrackSelectionPageCopy>;
