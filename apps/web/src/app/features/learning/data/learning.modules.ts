import type { LearningModule } from '../models/learning.model';

export const LEARNING_MODULES = [
  {
    id: 'angular-reactivity',
    category: 'angular',
    title: {
      es: 'Reactividad y rendimiento en Angular',
      en: 'Angular reactivity and performance',
    },
    description: {
      es: 'Domina Signals, OnPush y patrones reactivos para construir interfaces predecibles y eficientes.',
      en: 'Master Signals, OnPush, and reactive patterns to build predictable and efficient interfaces.',
    },
    topics: [
      {
        es: 'Signals, computed y effect',
        en: 'Signals, computed, and effect',
      },
      {
        es: 'OnPush e inmutabilidad',
        en: 'OnPush and immutability',
      },
      {
        es: 'RxJS y cancelación de flujos',
        en: 'RxJS and stream cancellation',
      },
    ],
    estimatedHours: 8,
    difficulty: 'advanced',
  },
  {
    id: 'typescript-safety',
    category: 'typescript',
    title: {
      es: 'TypeScript avanzado y contratos seguros',
      en: 'Advanced TypeScript and safe contracts',
    },
    description: {
      es: 'Diseña APIs tipadas y elimina dependencias innecesarias de any mediante validación y genéricos.',
      en: 'Design typed APIs and remove unnecessary any usage through validation and generics.',
    },
    topics: [
      {
        es: 'unknown y type guards',
        en: 'unknown and type guards',
      },
      {
        es: 'Genéricos y utility types',
        en: 'Generics and utility types',
      },
      {
        es: 'Tipos discriminados',
        en: 'Discriminated unions',
      },
    ],
    estimatedHours: 6,
    difficulty: 'advanced',
  },
  {
    id: 'frontend-architecture',
    category: 'architecture',
    title: {
      es: 'Arquitectura frontend escalable',
      en: 'Scalable frontend architecture',
    },
    description: {
      es: 'Organiza dominios, dependencias y contratos públicos para aplicaciones empresariales mantenibles.',
      en: 'Organize domains, dependencies, and public contracts for maintainable enterprise applications.',
    },
    topics: [
      {
        es: 'Arquitectura por dominios',
        en: 'Domain-driven architecture',
      },
      {
        es: 'Librerías y límites de dependencias',
        en: 'Libraries and dependency boundaries',
      },
      {
        es: 'Design systems y versionado',
        en: 'Design systems and versioning',
      },
    ],
    estimatedHours: 10,
    difficulty: 'advanced',
  },
  {
    id: 'testing-strategy',
    category: 'testing',
    title: {
      es: 'Estrategia de testing frontend',
      en: 'Frontend testing strategy',
    },
    description: {
      es: 'Construye una estrategia equilibrada con pruebas unitarias, integración y escenarios críticos.',
      en: 'Build a balanced strategy with unit, integration, and critical-scenario testing.',
    },
    topics: [
      {
        es: 'Pruebas orientadas al comportamiento',
        en: 'Behavior-focused testing',
      },
      {
        es: 'Mocks, spies y contratos',
        en: 'Mocks, spies, and contracts',
      },
      {
        es: 'Pirámide de pruebas',
        en: 'Testing pyramid',
      },
    ],
    estimatedHours: 7,
    difficulty: 'intermediate',
  },
  {
    id: 'web-performance',
    category: 'performance',
    title: {
      es: 'Rendimiento y Core Web Vitals',
      en: 'Performance and Core Web Vitals',
    },
    description: {
      es: 'Mide y optimiza renderizado, carga inicial y experiencia del usuario con evidencia.',
      en: 'Measure and optimize rendering, initial loading, and user experience with evidence.',
    },
    topics: [
      {
        es: 'Lazy loading y división de bundles',
        en: 'Lazy loading and bundle splitting',
      },
      {
        es: 'Virtual scrolling y listas grandes',
        en: 'Virtual scrolling and large lists',
      },
      {
        es: 'LCP, INP y CLS',
        en: 'LCP, INP, and CLS',
      },
    ],
    estimatedHours: 8,
    difficulty: 'advanced',
  },
] as const satisfies readonly LearningModule[];