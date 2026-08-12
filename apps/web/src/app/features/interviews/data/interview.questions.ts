import type { InterviewQuestion } from '../models/interview.model';

export const INTERVIEW_QUESTIONS = [
  // ─── ANGULAR ─────────────────────────────────────────────────────────────────
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
    id: 'angular-standalone-migration',
    category: 'angular',
    difficulty: 'advanced',
    question: {
      es: '¿Cómo migrarías una aplicación Angular basada en NgModules a standalone components de forma incremental sin detener el desarrollo?',
      en: 'How would you incrementally migrate an NgModule-based Angular application to standalone components without halting development?',
    },
    answer: {
      es: 'Empezaría por los componentes hoja (sin dependencias de otros módulos), marcándolos standalone y eliminando su declaración del módulo. Usaría importaciones explícitas en cada componente. Migraría de abajo hacia arriba. Configuraría reglas de lint para prevenir nuevos módulos. Finalmente, reemplazaría los módulos de enrutamiento por loadComponent() con lazy loading.',
      en: 'I would start with leaf components (no dependencies on other modules), marking them standalone and removing their module declaration. I would use explicit imports in each component. Migration goes bottom-up. I would configure lint rules to prevent new modules. Finally, I would replace routing modules with loadComponent() and lazy loading.',
    },
    keyPoints: [
      {
        es: 'Migración de abajo hacia arriba (leaf-first).',
        en: 'Bottom-up migration (leaf-first).',
      },
      {
        es: 'Cada componente declara sus imports explícitamente.',
        en: 'Each component declares its imports explicitly.',
      },
      {
        es: 'Reglas de lint para evitar regresiones.',
        en: 'Lint rules to prevent regressions.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo manejarías servicios que dependen de NgModule providers?',
        en: 'How would you handle services that depend on NgModule providers?',
      },
      {
        es: '¿Qué herramientas automatizadas usarías?',
        en: 'What automated tools would you use?',
      },
    ],
  },

  // ─── TYPESCRIPT ──────────────────────────────────────────────────────────────
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
    id: 'typescript-advanced-generics',
    category: 'typescript',
    difficulty: 'senior',
    question: {
      es: '¿Cómo diseñarías una función genérica de formulario que infiera los tipos de cada campo a partir de un esquema de configuración?',
      en: 'How would you design a generic form function that infers each field type from a configuration schema?',
    },
    answer: {
      es: 'Definiría un tipo genérico Schema con configuraciones indexadas por clave. La función recibiría el esquema como parámetro genérico y TypeScript inferiría el tipo de retorno automáticamente. Usaría mapped types y conditional types para derivar el modelo de datos del formulario. Esto da autocompletado y validación en compilación sin duplicar definiciones.',
      en: 'I would define a generic Schema type with configurations indexed by key. The function would receive the schema as a generic parameter and TypeScript would automatically infer the return type. I would use mapped types and conditional types to derive the form data model. This provides autocomplete and compile-time validation without duplicating definitions.',
    },
    keyPoints: [
      {
        es: 'Inferencia genérica desde parámetros.',
        en: 'Generic inference from parameters.',
      },
      {
        es: 'Mapped types para transformar esquemas.',
        en: 'Mapped types to transform schemas.',
      },
      {
        es: 'Conditional types para extraer tipos específicos.',
        en: 'Conditional types to extract specific types.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo manejarías campos opcionales vs. requeridos?',
        en: 'How would you handle optional vs. required fields?',
      },
      {
        es: '¿Qué limitaciones tiene TypeScript con inferencia profunda?',
        en: 'What are TypeScript limitations with deep inference?',
      },
    ],
  },

  // ─── ARCHITECTURE ────────────────────────────────────────────────────────────
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
    id: 'architecture-microfrontends-decision',
    category: 'architecture',
    difficulty: 'senior',
    question: {
      es: '¿En qué situaciones recomendarías micro-frontends sobre un monolito modular? ¿Cuáles son los trade-offs principales?',
      en: 'In which situations would you recommend micro-frontends over a modular monolith? What are the main trade-offs?',
    },
    answer: {
      es: 'Recomendaría micro-frontends cuando equipos autónomos necesitan desplegar independientemente con diferentes cadencias, o cuando dominios de negocio son verdaderamente independientes. Los trade-offs incluyen: complejidad de integración (shell, routing), duplicación de dependencias (mayor bundle), consistencia visual difícil de mantener, y debugging distribuido. Un monorepo con librerías bien separadas suele ser suficiente para la mayoría de casos.',
      en: 'I would recommend micro-frontends when autonomous teams need to deploy independently with different cadences, or when business domains are truly independent. Trade-offs include: integration complexity (shell, routing), dependency duplication (larger bundle), visual consistency challenges, and distributed debugging. A monorepo with well-separated libraries is usually sufficient for most cases.',
    },
    keyPoints: [
      {
        es: 'Autonomía de equipos como motivación principal.',
        en: 'Team autonomy as the primary motivator.',
      },
      {
        es: 'Trade-offs: complejidad, duplicación, consistencia.',
        en: 'Trade-offs: complexity, duplication, consistency.',
      },
      {
        es: 'Monorepo modular como alternativa más simple.',
        en: 'Modular monorepo as a simpler alternative.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo compartirías estado entre micro-frontends?',
        en: 'How would you share state between micro-frontends?',
      },
      {
        es: '¿Qué patrón de integración usarías (Module Federation, iframes, Web Components)?',
        en: 'Which integration pattern would you use (Module Federation, iframes, Web Components)?',
      },
    ],
  },

  // ─── TESTING ─────────────────────────────────────────────────────────────────
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
    id: 'testing-flaky-tests',
    category: 'testing',
    difficulty: 'advanced',
    question: {
      es: '¿Cómo diagnosticarías y resolverías una suite de tests con resultados inconsistentes (flaky tests)?',
      en: 'How would you diagnose and resolve a test suite with inconsistent results (flaky tests)?',
    },
    answer: {
      es: 'Primero identificaría los tests flaky con reportes de CI y quarantine automático. Luego categorizaría las causas: dependencias de timing (setTimeout, async), estado compartido entre tests, dependencias de red, o condiciones de carrera. Para cada uno: eliminaría dependencias temporales con fake timers, aislaría estado con setup/teardown completo, mockeraría red consistentemente, y usaría waitFor o fixture.whenStable() en vez de delays fijos.',
      en: 'First, I would identify flaky tests using CI reports and automatic quarantine. Then I would categorize causes: timing dependencies (setTimeout, async), shared state between tests, network dependencies, or race conditions. For each: remove timing dependencies with fake timers, isolate state with complete setup/teardown, mock network consistently, and use waitFor or fixture.whenStable() instead of fixed delays.',
    },
    keyPoints: [
      {
        es: 'Quarantine y monitoreo de tests inestables.',
        en: 'Quarantine and monitoring of unstable tests.',
      },
      {
        es: 'Causas comunes: timing, estado compartido, red.',
        en: 'Common causes: timing, shared state, network.',
      },
      {
        es: 'Fake timers y aislamiento de estado como solución.',
        en: 'Fake timers and state isolation as solutions.',
      },
    ],
    followUps: [
      {
        es: '¿Cuándo es aceptable eliminar un test en vez de arreglarlo?',
        en: 'When is it acceptable to delete a test instead of fixing it?',
      },
      {
        es: '¿Cómo implementarías retry automático sin ocultar problemas?',
        en: 'How would you implement auto-retry without hiding problems?',
      },
    ],
  },

  // ─── PERFORMANCE ─────────────────────────────────────────────────────────────
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
  {
    id: 'performance-runtime-optimization',
    category: 'performance',
    difficulty: 'senior',
    question: {
      es: '¿Cómo optimizarías una aplicación Angular donde el profiling muestra que el 60% del tiempo de CPU se gasta en change detection?',
      en: 'How would you optimize an Angular application where profiling shows 60% of CPU time is spent in change detection?',
    },
    answer: {
      es: 'Primero activaría OnPush en todos los componentes que no lo tengan. Luego reemplazaría getters y llamadas a funciones en templates por computed signals. Usaría @defer para secciones pesadas fuera del viewport. Para listas, aseguraría track by con identificador estable. Finalmente, evaluaría zoneless con provideExperimentalZonelessChangeDetection() para eliminar Zone.js y su overhead.',
      en: 'First, I would enable OnPush on all components that lack it. Then replace getters and function calls in templates with computed signals. Use @defer for heavy sections outside the viewport. For lists, ensure track by with stable identifiers. Finally, evaluate zoneless with provideExperimentalZonelessChangeDetection() to eliminate Zone.js overhead.',
    },
    keyPoints: [
      {
        es: 'OnPush como baseline para todos los componentes.',
        en: 'OnPush as baseline for all components.',
      },
      {
        es: 'Signals y computed en vez de getters en templates.',
        en: 'Signals and computed instead of template getters.',
      },
      {
        es: '@defer y track by para reducir trabajo del DOM.',
        en: '@defer and track by to reduce DOM work.',
      },
    ],
    followUps: [
      {
        es: '¿Qué riesgos tiene desactivar Zone.js?',
        en: 'What are the risks of disabling Zone.js?',
      },
      {
        es: '¿Cómo medirías el impacto real de estas optimizaciones?',
        en: 'How would you measure the actual impact of these optimizations?',
      },
    ],
  },
] as const satisfies readonly InterviewQuestion[];
