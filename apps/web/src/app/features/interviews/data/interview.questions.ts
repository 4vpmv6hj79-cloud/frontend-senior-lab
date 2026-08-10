import type { InterviewQuestion } from '../models/interview.model';

export const INTERVIEW_QUESTIONS = [
  {
    id: 'angular-reactivity-strategy',
    category: 'angular',
    difficulty: 'senior',
    question: {
      es: '¿Cómo decidirías entre Signals y RxJS para manejar el estado y los flujos reactivos de una aplicación Angular empresarial?',
      en: 'How would you decide between Signals and RxJS to manage state and reactive flows in an enterprise Angular application?',
    },
    answer: {
      es: 'Utilizaría Signals para estado síncrono, derivado y cercano a la interfaz; RxJS para eventos asíncronos, cancelación, composición temporal y comunicación con APIs. Evitaría convertir todo a un solo paradigma. Definiría límites claros: RxJS administra el flujo externo y Signals expone el estado consumido por la vista.',
      en: 'I would use Signals for synchronous, derived, UI-oriented state, and RxJS for asynchronous events, cancellation, temporal composition, and API communication. I would avoid forcing everything into one paradigm. RxJS would manage external flows while Signals expose state consumed by the view.',
    },
    keyPoints: [
      {
        es: 'Signals para estado síncrono y derivaciones.',
        en: 'Signals for synchronous state and derivations.',
      },
      {
        es: 'RxJS para concurrencia, cancelación y streams.',
        en: 'RxJS for concurrency, cancellation, and streams.',
      },
      {
        es: 'Interop explícito y límites arquitectónicos.',
        en: 'Explicit interoperability and architectural boundaries.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo evitarías suscripciones innecesarias?',
        en: 'How would you avoid unnecessary subscriptions?',
      },
      {
        es: '¿Cuándo utilizarías computed frente a effect?',
        en: 'When would you use computed instead of effect?',
      },
    ],
  },
  {
    id: 'typescript-boundary-safety',
    category: 'typescript',
    difficulty: 'advanced',
    question: {
      es: 'Una API externa devuelve datos con una estructura poco confiable. ¿Cómo los integrarías sin utilizar any?',
      en: 'An external API returns data with an unreliable structure. How would you integrate it without using any?',
    },
    answer: {
      es: 'Recibiría la respuesta como unknown y validaría su estructura mediante type guards o un esquema de validación. Después la transformaría con un adapter hacia un modelo de dominio estable. De esta forma, los componentes nunca dependen directamente del contrato externo.',
      en: 'I would receive the response as unknown and validate its structure using type guards or schema validation. I would then transform it through an adapter into a stable domain model, preventing components from depending directly on the external contract.',
    },
    keyPoints: [
      {
        es: 'unknown en los límites externos.',
        en: 'unknown at external boundaries.',
      },
      {
        es: 'Type guards o validación de esquemas.',
        en: 'Type guards or schema validation.',
      },
      {
        es: 'Adapter hacia modelos de dominio.',
        en: 'Adapter into domain models.',
      },
    ],
    followUps: [
      {
        es: '¿Qué diferencia práctica existe entre unknown y any?',
        en: 'What is the practical difference between unknown and any?',
      },
      {
        es: '¿Dónde colocarías la validación dentro de la arquitectura?',
        en: 'Where would you place validation in the architecture?',
      },
    ],
  },
  {
    id: 'architecture-design-system-evolution',
    category: 'architecture',
    difficulty: 'senior',
    question: {
      es: '¿Cómo evolucionarías una librería Angular compartida por múltiples aplicaciones sin romper a sus consumidores?',
      en: 'How would you evolve an Angular library shared by multiple applications without breaking its consumers?',
    },
    answer: {
      es: 'Definiría una API pública explícita, versionado semántico, pruebas de contrato y una política de deprecación. Los cambios incompatibles tendrían migraciones automatizadas y documentación. También validaría la librería contra aplicaciones consumidoras antes de publicar una nueva versión.',
      en: 'I would define an explicit public API, semantic versioning, contract tests, and a deprecation policy. Breaking changes would include automated migrations and documentation. I would also validate the library against consuming applications before publishing a new version.',
    },
    keyPoints: [
      {
        es: 'API pública y versionado semántico.',
        en: 'Public API and semantic versioning.',
      },
      {
        es: 'Deprecación gradual y migraciones.',
        en: 'Gradual deprecation and migrations.',
      },
      {
        es: 'Pruebas de contrato con consumidores.',
        en: 'Consumer contract testing.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo manejarías design tokens y temas?',
        en: 'How would you manage design tokens and themes?',
      },
      {
        es: '¿Qué automatizarías en el pipeline de publicación?',
        en: 'What would you automate in the publishing pipeline?',
      },
    ],
  },
  {
    id: 'testing-critical-flow',
    category: 'testing',
    difficulty: 'intermediate',
    question: {
      es: '¿Cómo diseñarías la estrategia de pruebas para un flujo crítico de registro con validación y llamadas HTTP?',
      en: 'How would you design the testing strategy for a critical registration flow with validation and HTTP calls?',
    },
    answer: {
      es: 'Probaría las reglas puras de validación de forma unitaria, el componente junto con el formulario mediante pruebas de integración y el flujo principal con una prueba end-to-end. Simularía HTTP únicamente en los límites adecuados y cubriría estados de éxito, error, carga y reintento.',
      en: 'I would unit test pure validation rules, test the component and form through integration tests, and cover the main journey with an end-to-end test. I would mock HTTP only at appropriate boundaries and cover success, error, loading, and retry states.',
    },
    keyPoints: [
      {
        es: 'Pirámide de pruebas basada en riesgo.',
        en: 'Risk-based testing pyramid.',
      },
      {
        es: 'Comportamiento observable, no implementación.',
        en: 'Observable behavior rather than implementation.',
      },
      {
        es: 'Estados de éxito, error y carga.',
        en: 'Success, error, and loading states.',
      },
    ],
    followUps: [
      {
        es: '¿Qué evitarías probar directamente?',
        en: 'What would you avoid testing directly?',
      },
      {
        es: '¿Cuándo utilizarías una prueba end-to-end?',
        en: 'When would you use an end-to-end test?',
      },
    ],
  },
  {
    id: 'performance-production-regression',
    category: 'performance',
    difficulty: 'advanced',
    question: {
      es: 'Después de un despliegue, el LCP empeora significativamente. ¿Cómo investigarías y resolverías la regresión?',
      en: 'After a deployment, LCP becomes significantly worse. How would you investigate and resolve the regression?',
    },
    answer: {
      es: 'Compararía mediciones de usuarios reales y pruebas de laboratorio antes y después del despliegue. Identificaría el elemento LCP y analizaría red, servidor, recursos bloqueantes, imágenes y JavaScript. Aplicaría la corrección sobre la causa medida y validaría nuevamente con presupuestos de rendimiento en CI.',
      en: 'I would compare real-user measurements and lab tests before and after the deployment. I would identify the LCP element and analyze network, server response, render-blocking resources, images, and JavaScript. I would fix the measured cause and validate it again using performance budgets in CI.',
    },
    keyPoints: [
      {
        es: 'Combinar RUM y pruebas de laboratorio.',
        en: 'Combine RUM and lab testing.',
      },
      {
        es: 'Identificar el elemento y la fase que domina el LCP.',
        en: 'Identify the element and phase dominating LCP.',
      },
      {
        es: 'Agregar presupuestos para evitar regresiones.',
        en: 'Add budgets to prevent regressions.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo optimizarías una imagen LCP?',
        en: 'How would you optimize an LCP image?',
      },
      {
        es: '¿Qué métricas revisarías además de LCP?',
        en: 'Which metrics would you review besides LCP?',
      },
    ],
  },
] as const satisfies readonly InterviewQuestion[];