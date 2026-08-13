import type { LocalizedText } from '../../shared/models/i18n.model';

/**
 * Supported framework tracks in the platform.
 * Each track has its own diagnostic, learning modules, and interview questions.
 */
export type FrameworkId = 'angular' | 'react' | 'vue';

export interface FrameworkTrack {
  readonly id: FrameworkId;
  readonly name: string;
  readonly icon: string;
  readonly color: string;
  readonly description: LocalizedText;
  readonly tagline: LocalizedText;
  readonly categories: readonly FrameworkCategory[];
}

/**
 * Categories specific to each framework's diagnostic.
 * Each framework shares some categories (typescript, architecture, testing, performance)
 * but has its own framework-specific category.
 */
export type FrameworkCategory =
  | 'framework' // Framework-specific (Angular/React/Vue core)
  | 'typescript'
  | 'architecture'
  | 'testing'
  | 'performance';

export const FRAMEWORK_TRACKS: readonly FrameworkTrack[] = [
  {
    id: 'angular',
    name: 'Angular',
    icon: '🅰️',
    color: '#DD0031',
    description: {
      es: 'El framework empresarial de Google. Signals, DI, RxJS, standalone components y arquitectura escalable.',
      en: 'Google\'s enterprise framework. Signals, DI, RxJS, standalone components, and scalable architecture.',
    },
    tagline: {
      es: 'Para quienes construyen a gran escala',
      en: 'For those who build at scale',
    },
    categories: ['framework', 'typescript', 'architecture', 'testing', 'performance'],
  },
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    color: '#61DAFB',
    description: {
      es: 'La librería más popular del frontend. Hooks, Server Components, Suspense, estado global y ecosistema.',
      en: 'The most popular frontend library. Hooks, Server Components, Suspense, global state, and ecosystem.',
    },
    tagline: {
      es: 'El ecosistema más grande del frontend',
      en: 'The largest frontend ecosystem',
    },
    categories: ['framework', 'typescript', 'architecture', 'testing', 'performance'],
  },
  {
    id: 'vue',
    name: 'Vue.js',
    icon: '💚',
    color: '#4FC08D',
    description: {
      es: 'El framework progresivo. Composition API, Pinia, reactividad granular y experiencia de desarrollo excepcional.',
      en: 'The progressive framework. Composition API, Pinia, granular reactivity, and exceptional developer experience.',
    },
    tagline: {
      es: 'Progresivo, elegante y potente',
      en: 'Progressive, elegant, and powerful',
    },
    categories: ['framework', 'typescript', 'architecture', 'testing', 'performance'],
  },
];
