import type { LearningModule } from '../models/learning.model';
import {
  ANGULAR_ONPUSH_CONTENT,
  ANGULAR_RXJS_CONTENT,
  ANGULAR_SIGNALS_CONTENT,
} from './content/angular-content';
import {
  ARCHITECTURE_BOUNDARIES_CONTENT,
  ARCHITECTURE_DESIGN_SYSTEMS_CONTENT,
  ARCHITECTURE_DOMAINS_CONTENT,
} from './content/architecture-content';
import {
  PERFORMANCE_CWV_CONTENT,
  PERFORMANCE_LAZY_CONTENT,
  PERFORMANCE_VIRTUAL_CONTENT,
} from './content/performance-content';
import {
  TESTING_BEHAVIOR_CONTENT,
  TESTING_MOCKS_CONTENT,
  TESTING_PYRAMID_CONTENT,
} from './content/testing-content';
import {
  TYPESCRIPT_GENERICS_CONTENT,
  TYPESCRIPT_UNIONS_CONTENT,
  TYPESCRIPT_UNKNOWN_CONTENT,
} from './content/typescript-content';

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
    whyItMatters: {
      es: 'En aplicaciones empresariales, la detección de cambios mal manejada es la causa #1 de problemas de rendimiento. Dominar este tema te diferencia como senior.',
      en: 'In enterprise applications, poorly managed change detection is the #1 cause of performance issues. Mastering this topic sets you apart as a senior.',
    },
    objectives: [
      {
        es: 'Explicar cómo funciona la detección de cambios con y sin Zone.js',
        en: 'Explain how change detection works with and without Zone.js',
      },
      {
        es: 'Usar Signals para estado local y computed para derivaciones',
        en: 'Use Signals for local state and computed for derivations',
      },
      {
        es: 'Implementar OnPush correctamente con referencias inmutables',
        en: 'Implement OnPush correctly with immutable references',
      },
    ],
    topics: [
      {
        id: 'angular-signals',
        title: {
          es: 'Signals, computed y effect',
          en: 'Signals, computed, and effect',
        },
        description: {
          es: 'El nuevo sistema de reactividad de Angular que reemplaza la necesidad de Zone.js para muchos casos.',
          en: 'Angular new reactivity system that replaces the need for Zone.js in many cases.',
        },
        content: ANGULAR_SIGNALS_CONTENT,
      },
      {
        id: 'angular-onpush',
        title: {
          es: 'OnPush e inmutabilidad',
          en: 'OnPush and immutability',
        },
        description: {
          es: 'Cómo reducir ciclos de detección de cambios produciendo nuevas referencias en vez de mutar.',
          en: 'How to reduce change detection cycles by producing new references instead of mutating.',
        },
        content: ANGULAR_ONPUSH_CONTENT,
      },
      {
        id: 'angular-rxjs-cancellation',
        title: {
          es: 'RxJS y cancelación de flujos',
          en: 'RxJS and stream cancellation',
        },
        description: {
          es: 'Manejar suscripciones, evitar memory leaks y combinar streams de forma declarativa.',
          en: 'Manage subscriptions, avoid memory leaks, and combine streams declaratively.',
        },
        content: ANGULAR_RXJS_CONTENT,
      },
    ],
    resources: [
      {
        title: 'Angular Signals Guide',
        url: 'https://angular.dev/guide/signals',
        type: 'docs',
      },
      {
        title: 'Angular Change Detection Explained',
        url: 'https://angular.dev/best-practices/runtime-performance',
        type: 'docs',
      },
      {
        title: 'RxJS Official Docs',
        url: 'https://rxjs.dev/guide/overview',
        type: 'docs',
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
    whyItMatters: {
      es: 'El 70% de los bugs en producción podrían prevenirse con tipado estricto. TypeScript avanzado te permite escribir código que se auto-documenta y falla en compilación, no en producción.',
      en: '70% of production bugs could be prevented with strict typing. Advanced TypeScript lets you write self-documenting code that fails at compile time, not production.',
    },
    objectives: [
      {
        es: 'Usar unknown y type guards para validar datos externos de forma segura',
        en: 'Use unknown and type guards to validate external data safely',
      },
      {
        es: 'Crear tipos genéricos con constraints que se adaptan a diferentes contextos',
        en: 'Create generic types with constraints that adapt to different contexts',
      },
      {
        es: 'Aplicar discriminated unions para modelar estados de forma exhaustiva',
        en: 'Apply discriminated unions to model states exhaustively',
      },
    ],
    topics: [
      {
        id: 'typescript-unknown-guards',
        title: {
          es: 'unknown y type guards',
          en: 'unknown and type guards',
        },
        description: {
          es: 'La forma segura de manejar datos cuya forma no conoces en tiempo de compilación.',
          en: 'The safe way to handle data whose shape you do not know at compile time.',
        },
        content: TYPESCRIPT_UNKNOWN_CONTENT,
      },
      {
        id: 'typescript-generics-utilities',
        title: {
          es: 'Genéricos y utility types',
          en: 'Generics and utility types',
        },
        description: {
          es: 'Construir abstracciones reutilizables que mantienen seguridad de tipos.',
          en: 'Build reusable abstractions that maintain type safety.',
        },
        content: TYPESCRIPT_GENERICS_CONTENT,
      },
      {
        id: 'typescript-discriminated-unions',
        title: {
          es: 'Tipos discriminados',
          en: 'Discriminated unions',
        },
        description: {
          es: 'Modelar estados mutuamente excluyentes para que TypeScript te avise si olvidas un caso.',
          en: 'Model mutually exclusive states so TypeScript warns you if you forget a case.',
        },
        content: TYPESCRIPT_UNIONS_CONTENT,
      },
    ],
    resources: [
      {
        title: 'TypeScript Handbook - Narrowing',
        url: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
        type: 'docs',
      },
      {
        title: 'TypeScript Handbook - Generics',
        url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
        type: 'docs',
      },
      {
        title: 'Total TypeScript (Matt Pocock)',
        url: 'https://www.totaltypescript.com/',
        type: 'tool',
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
    whyItMatters: {
      es: 'Una mala arquitectura es invisible al principio pero paraliza equipos cuando la app crece. Como senior, tu decisión arquitectónica impacta a todo el equipo por meses o años.',
      en: 'Bad architecture is invisible at first but paralyzes teams as the app grows. As a senior, your architectural decision impacts the entire team for months or years.',
    },
    objectives: [
      {
        es: 'Diseñar límites de módulo claros que previenen dependencias circulares',
        en: 'Design clear module boundaries that prevent circular dependencies',
      },
      {
        es: 'Implementar un design system con tokens y contratos versionados',
        en: 'Implement a design system with tokens and versioned contracts',
      },
      {
        es: 'Decidir cuándo usar monorepo vs. multi-repo basándote en el contexto del equipo',
        en: 'Decide when to use monorepo vs. multi-repo based on team context',
      },
    ],
    topics: [
      {
        id: 'architecture-domains',
        title: {
          es: 'Arquitectura por dominios',
          en: 'Domain-driven architecture',
        },
        description: {
          es: 'Separar tu app en dominios de negocio independientes con contratos públicos claros.',
          en: 'Separate your app into independent business domains with clear public contracts.',
        },
        content: ARCHITECTURE_DOMAINS_CONTENT,
      },
      {
        id: 'architecture-boundaries',
        title: {
          es: 'Librerías y límites de dependencias',
          en: 'Libraries and dependency boundaries',
        },
        description: {
          es: 'Usar herramientas como Nx para hacer cumplir reglas de importación entre features.',
          en: 'Use tools like Nx to enforce import rules between features.',
        },
        content: ARCHITECTURE_BOUNDARIES_CONTENT,
      },
      {
        id: 'architecture-design-systems',
        title: {
          es: 'Design systems y versionado',
          en: 'Design systems and versioning',
        },
        description: {
          es: 'Crear componentes compartidos que escalen a múltiples equipos sin romper nada.',
          en: 'Create shared components that scale to multiple teams without breaking anything.',
        },
        content: ARCHITECTURE_DESIGN_SYSTEMS_CONTENT,
      },
    ],
    resources: [
      {
        title: 'Nx Documentation',
        url: 'https://nx.dev/getting-started/intro',
        type: 'docs',
      },
      {
        title: 'Angular Architecture Patterns',
        url: 'https://angular.dev/best-practices/style-guide',
        type: 'docs',
      },
      {
        title: 'Storybook for Angular',
        url: 'https://storybook.js.org/docs/angular/get-started',
        type: 'tool',
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
    whyItMatters: {
      es: 'Los equipos sin estrategia de testing terminan con tests frágiles que nadie confía o sin tests que los protejan. Una buena estrategia da confianza para desplegar 3 veces al día.',
      en: 'Teams without testing strategy end up with brittle tests nobody trusts or no tests protecting them. A good strategy gives confidence to deploy 3 times a day.',
    },
    objectives: [
      {
        es: 'Distinguir qué probar con unit tests vs. integration vs. E2E',
        en: 'Distinguish what to test with unit tests vs. integration vs. E2E',
      },
      {
        es: 'Escribir tests que validen comportamiento, no implementación',
        en: 'Write tests that validate behavior, not implementation',
      },
      {
        es: 'Configurar una pirámide de tests adecuada al riesgo del proyecto',
        en: 'Set up a testing pyramid appropriate to the project risk',
      },
    ],
    topics: [
      {
        id: 'testing-behavior',
        title: {
          es: 'Pruebas orientadas al comportamiento',
          en: 'Behavior-focused testing',
        },
        description: {
          es: 'Probar lo que el usuario ve y hace, no los detalles internos del componente.',
          en: 'Test what the user sees and does, not internal component details.',
        },
        content: TESTING_BEHAVIOR_CONTENT,
      },
      {
        id: 'testing-mocks-contracts',
        title: {
          es: 'Mocks, spies y contratos',
          en: 'Mocks, spies, and contracts',
        },
        description: {
          es: 'Simular dependencias de forma que tus tests sean rápidos y predecibles.',
          en: 'Simulate dependencies so your tests are fast and predictable.',
        },
        content: TESTING_MOCKS_CONTENT,
      },
      {
        id: 'testing-pyramid',
        title: {
          es: 'Pirámide de pruebas',
          en: 'Testing pyramid',
        },
        description: {
          es: 'Cuántos tests de cada tipo necesitas según el riesgo de tu proyecto.',
          en: 'How many tests of each type you need based on your project risk.',
        },
        content: TESTING_PYRAMID_CONTENT,
      },
    ],
    resources: [
      {
        title: 'Angular Testing Guide',
        url: 'https://angular.dev/guide/testing',
        type: 'docs',
      },
      {
        title: 'Vitest Documentation',
        url: 'https://vitest.dev/guide/',
        type: 'docs',
      },
      {
        title: 'Testing Library Principles',
        url: 'https://testing-library.com/docs/guiding-principles',
        type: 'article',
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
    whyItMatters: {
      es: 'Google usa Core Web Vitals como factor de ranking SEO. Amazon descubrió que 100ms extra de carga = 1% menos ventas. El rendimiento es dinero.',
      en: 'Google uses Core Web Vitals as an SEO ranking factor. Amazon found that 100ms extra load time = 1% fewer sales. Performance is money.',
    },
    objectives: [
      {
        es: 'Usar Lighthouse y Chrome DevTools para diagnosticar problemas de rendimiento',
        en: 'Use Lighthouse and Chrome DevTools to diagnose performance problems',
      },
      {
        es: 'Optimizar LCP, INP y CLS con técnicas específicas para cada métrica',
        en: 'Optimize LCP, INP, and CLS with specific techniques for each metric',
      },
      {
        es: 'Implementar lazy loading y code splitting para reducir el bundle inicial',
        en: 'Implement lazy loading and code splitting to reduce the initial bundle',
      },
    ],
    topics: [
      {
        id: 'performance-lazy-loading',
        title: {
          es: 'Lazy loading y división de bundles',
          en: 'Lazy loading and bundle splitting',
        },
        description: {
          es: 'Cargar solo el código necesario para la vista actual, aplazando el resto.',
          en: 'Load only the code needed for the current view, deferring the rest.',
        },
        content: PERFORMANCE_LAZY_CONTENT,
      },
      {
        id: 'performance-virtual-scrolling',
        title: {
          es: 'Virtual scrolling y listas grandes',
          en: 'Virtual scrolling and large lists',
        },
        description: {
          es: 'Renderizar solo los elementos visibles en pantalla, sin importar el tamaño de los datos.',
          en: 'Render only the elements visible on screen, regardless of data size.',
        },
        content: PERFORMANCE_VIRTUAL_CONTENT,
      },
      {
        id: 'performance-core-web-vitals',
        title: {
          es: 'LCP, INP y CLS',
          en: 'LCP, INP, and CLS',
        },
        description: {
          es: 'Las 3 métricas que Google usa para evaluar la experiencia del usuario en tu sitio.',
          en: 'The 3 metrics Google uses to evaluate user experience on your site.',
        },
        content: PERFORMANCE_CWV_CONTENT,
      },
    ],
    resources: [
      {
        title: 'Web Vitals (web.dev)',
        url: 'https://web.dev/articles/vitals',
        type: 'docs',
      },
      {
        title: 'Chrome DevTools Performance',
        url: 'https://developer.chrome.com/docs/devtools/performance',
        type: 'docs',
      },
      {
        title: 'Angular Performance Best Practices',
        url: 'https://angular.dev/best-practices/runtime-performance',
        type: 'docs',
      },
    ],
    estimatedHours: 8,
    difficulty: 'advanced',
  },
] as const satisfies readonly LearningModule[];
