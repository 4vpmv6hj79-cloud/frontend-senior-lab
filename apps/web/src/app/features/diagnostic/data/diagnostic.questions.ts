import type { DiagnosticQuestion } from '../models/diagnostic.model';

export const DIAGNOSTIC_QUESTIONS = [
  // ─── ANGULAR (3 questions) ───────────────────────────────────────────────────
  {
    id: 'angular-change-detection',
    category: 'angular',
    text: {
      es: 'Una pantalla Angular renderiza datos inmutables, pero ejecuta demasiados ciclos de detección. ¿Cuál es la mejor optimización?',
      en: 'An Angular screen renders immutable data but runs too many change-detection cycles. What is the best optimization?',
    },
    options: [
      {
        id: 'angular-1a',
        text: {
          es: 'Invocar detectChanges() manualmente luego de cada actualización',
          en: 'Invoke detectChanges() manually after every single data update',
        },
        score: 1,
      },
      {
        id: 'angular-1b',
        text: {
          es: 'Aplicar OnPush con referencias inmutables y Signals o AsyncPipe',
          en: 'Apply OnPush with immutable references and Signals or AsyncPipe',
        },
        score: 3,
      },
      {
        id: 'angular-1c',
        text: {
          es: 'Envolver las actualizaciones dentro de un setTimeout de 0 ms',
          en: 'Wrap all state updates inside a setTimeout with zero delay',
        },
        score: 0,
      },
      {
        id: 'angular-1d',
        text: {
          es: 'Desactivar completamente la detección de cambios en toda la app',
          en: 'Disable the change detection system entirely for the whole app',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'angular-dependency-injection',
    category: 'angular',
    text: {
      es: 'Necesitas que un servicio sea exclusivo para un subárbol de componentes sin afectar al resto de la app. ¿Cuál es la mejor estrategia?',
      en: 'You need a service to be exclusive to a component subtree without affecting the rest of the app. What is the best strategy?',
    },
    options: [
      {
        id: 'angular-2a',
        text: {
          es: 'Declararlo con providedIn root y filtrar el acceso con un flag',
          en: 'Declare it with providedIn root and filter access with a flag',
        },
        score: 0,
      },
      {
        id: 'angular-2b',
        text: {
          es: 'Proveerlo en el array providers del componente raíz del árbol',
          en: 'Provide it in the providers array of the subtree root component',
        },
        score: 3,
      },
      {
        id: 'angular-2c',
        text: {
          es: 'Crear una instancia manual con new y propagarla vía @Input()',
          en: 'Create a manual instance with new and propagate it via @Input()',
        },
        score: 1,
      },
      {
        id: 'angular-2d',
        text: {
          es: 'Almacenarlo como variable global fuera del contexto de Angular',
          en: 'Store it as a global variable outside the Angular context scope',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'angular-signals-reactivity',
    category: 'angular',
    text: {
      es: 'Tienes un computed() que depende de múltiples signals y un effect() que reacciona al resultado. ¿Cuál es el principal riesgo?',
      en: 'You have a computed() depending on multiple signals and an effect() that reacts to the result. What is the main risk?',
    },
    options: [
      {
        id: 'angular-3a',
        text: {
          es: 'Los effects se ejecutan de forma síncrona y bloquean el thread',
          en: 'Effects execute synchronously and will block the main thread',
        },
        score: 1,
      },
      {
        id: 'angular-3b',
        text: {
          es: 'El effect podría generar escrituras circulares en los signals',
          en: 'The effect could trigger circular signal writes causing loops',
        },
        score: 3,
      },
      {
        id: 'angular-3c',
        text: {
          es: 'Los signals y computed son incompatibles según la arquitectura',
          en: 'Signals and computed are architecturally incompatible by design',
        },
        score: 0,
      },
      {
        id: 'angular-3d',
        text: {
          es: 'El computed no se reevalúa cuando varios signals cambian juntos',
          en: 'The computed will not re-evaluate when multiple signals change',
        },
        score: 0,
      },
    ],
  },

  // ─── TYPESCRIPT (3 questions) ────────────────────────────────────────────────
  {
    id: 'typescript-api-boundary',
    category: 'typescript',
    text: {
      es: 'Recibes información no validada desde una API. ¿Cómo mantienes seguridad de tipos?',
      en: 'You receive unvalidated data from an API. How do you preserve type safety?',
    },
    options: [
      {
        id: 'typescript-1a',
        text: {
          es: 'Declarar la respuesta como any para tener total flexibilidad',
          en: 'Declare the response as any to have complete flexibility here',
        },
        score: 0,
      },
      {
        id: 'typescript-1b',
        text: {
          es: 'Forzar el tipo con una aserción as sin validar la estructura',
          en: 'Force the type with an as assertion without validating shape',
        },
        score: 1,
      },
      {
        id: 'typescript-1c',
        text: {
          es: 'Recibir unknown y validar con un type guard o un esquema Zod',
          en: 'Receive as unknown and validate with a type guard or schema',
        },
        score: 3,
      },
      {
        id: 'typescript-1d',
        text: {
          es: 'Convertir la respuesta a Object y acceder a sus propiedades',
          en: 'Convert the response to Object and access its properties now',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'typescript-generics-constraints',
    category: 'typescript',
    text: {
      es: 'Necesitas una función genérica que solo acepte objetos con una propiedad id de tipo string. ¿Cuál es la implementación correcta?',
      en: 'You need a generic function that only accepts objects with a string id property. What is the correct implementation?',
    },
    options: [
      {
        id: 'typescript-2a',
        text: {
          es: 'Usar function fn<T>(item: T) y verificar typeof id en runtime',
          en: 'Use function fn<T>(item: T) and check typeof id at runtime',
        },
        score: 1,
      },
      {
        id: 'typescript-2b',
        text: {
          es: 'Usar fn<T extends { id: string }> para restringir en compile',
          en: 'Use fn<T extends { id: string }> to constrain at compile time',
        },
        score: 3,
      },
      {
        id: 'typescript-2c',
        text: {
          es: 'Usar function fn(item: any) y castear con as en el cuerpo',
          en: 'Use function fn(item: any) and cast with as inside the body',
        },
        score: 0,
      },
      {
        id: 'typescript-2d',
        text: {
          es: 'Usar function fn(item: object) asumiendo que siempre hay id',
          en: 'Use function fn(item: object) assuming every object has an id',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'typescript-discriminated-unions',
    category: 'typescript',
    text: {
      es: 'Tienes un tipo Result = { status: "ok"; data: User } | { status: "error"; message: string }. ¿Cómo accedes a data de forma segura?',
      en: 'You have a type Result = { status: "ok"; data: User } | { status: "error"; message: string }. How do you safely access data?',
    },
    options: [
      {
        id: 'typescript-3a',
        text: {
          es: 'Acceder directamente usando (result as any).data sin hacer validación',
          en: 'Access directly using (result as any).data without doing validation',
        },
        score: 0,
      },
      {
        id: 'typescript-3b',
        text: {
          es: 'Verificar result.status === "ok" para estrechar el tipo union',
          en: 'Check result.status === "ok" to narrow the discriminated union',
        },
        score: 3,
      },
      {
        id: 'typescript-3c',
        text: {
          es: 'Usar el operador ! para forzar que data nunca sea undefined',
          en: 'Use the non-null assertion operator to force data as defined',
        },
        score: 1,
      },
      {
        id: 'typescript-3d',
        text: {
          es: 'Añadir data?: User como campo opcional en ambas variantes del union',
          en: 'Add data?: User as an optional field in both variants of the union',
        },
        score: 1,
      },
    ],
  },

  // ─── ARCHITECTURE (3 questions) ─────────────────────────────────────────────
  {
    id: 'architecture-design-system',
    category: 'architecture',
    text: {
      es: 'Varios productos necesitan compartir componentes visuales. ¿Qué solución escala mejor?',
      en: 'Several products need to share UI components. Which solution scales best?',
    },
    options: [
      {
        id: 'architecture-1a',
        text: {
          es: 'Copiar los componentes de forma manual en cada aplicación nueva',
          en: 'Manually copy the components into every new application target',
        },
        score: 0,
      },
      {
        id: 'architecture-1b',
        text: {
          es: 'Crear una librería versionada con tokens y contratos públicos',
          en: 'Build a versioned library with design tokens and public contracts',
        },
        score: 3,
      },
      {
        id: 'architecture-1c',
        text: {
          es: 'Guardar todos los estilos compartidos en un solo archivo global',
          en: 'Store all shared styles inside a single global stylesheet file',
        },
        score: 1,
      },
      {
        id: 'architecture-1d',
        text: {
          es: 'Permitir que cada equipo implemente su propia versión completa',
          en: 'Allow each team to implement their own fully independent version',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'architecture-feature-boundaries',
    category: 'architecture',
    text: {
      es: 'En un monorepo con múltiples features, un desarrollador importa directamente un servicio interno de otro feature. ¿Cuál es el problema principal?',
      en: 'In a monorepo with multiple features, a developer directly imports an internal service from another feature. What is the main problem?',
    },
    options: [
      {
        id: 'architecture-2a',
        text: {
          es: 'Viola los límites de dependencia y crea acoplamiento implícito',
          en: 'It violates dependency boundaries creating implicit coupling now',
        },
        score: 3,
      },
      {
        id: 'architecture-2b',
        text: {
          es: 'No hay problema real si ambos features están dentro del mismo repo',
          en: 'There is no real problem if both features share the same repository',
        },
        score: 0,
      },
      {
        id: 'architecture-2c',
        text: {
          es: 'Solo genera conflictos cuando se utiliza carga diferida lazy load',
          en: 'It only creates conflicts when lazy loading is being utilized here',
        },
        score: 1,
      },
      {
        id: 'architecture-2d',
        text: {
          es: 'Produce errores de compilación exclusivamente en producción final',
          en: 'It produces compilation errors exclusively in production build only',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'architecture-state-management',
    category: 'architecture',
    text: {
      es: 'Tu aplicación tiene estado complejo compartido entre rutas. ¿Cuál es el enfoque arquitectónico más mantenible?',
      en: 'Your app has complex state shared across routes. What is the most maintainable architectural approach?',
    },
    options: [
      {
        id: 'architecture-3a',
        text: {
          es: 'Pasar todo mediante @Input/@Output hasta el componente raíz superior',
          en: 'Pass everything via @Input/@Output chains up to the root component',
        },
        score: 1,
      },
      {
        id: 'architecture-3b',
        text: {
          es: 'Usar servicios singleton con signals y selectores bien claros',
          en: 'Use singleton services with signals and well-defined selectors',
        },
        score: 3,
      },
      {
        id: 'architecture-3c',
        text: {
          es: 'Almacenar todo en localStorage y leer desde cada componente',
          en: 'Store everything in localStorage and read from each component',
        },
        score: 0,
      },
      {
        id: 'architecture-3d',
        text: {
          es: 'Usar variables globales en window para un acceso más rápido',
          en: 'Use global variables on the window object for quicker access',
        },
        score: 0,
      },
    ],
  },

  // ─── TESTING (3 questions) ───────────────────────────────────────────────────
  {
    id: 'testing-component-behavior',
    category: 'testing',
    text: {
      es: '¿Cuál es la prueba más valiosa para un componente que carga datos de un servicio?',
      en: 'What is the most valuable test for a component that loads data from a service?',
    },
    options: [
      {
        id: 'testing-1a',
        text: {
          es: 'Probar directamente todos sus métodos privados de forma totalmente aislada',
          en: 'Directly test all of its private methods in complete and total isolation',
        },
        score: 1,
      },
      {
        id: 'testing-1b',
        text: {
          es: 'Simular el servicio y verificar el comportamiento visible en DOM',
          en: 'Mock the service and verify the visible behavior in the DOM',
        },
        score: 3,
      },
      {
        id: 'testing-1c',
        text: {
          es: 'Crear solamente un snapshot del componente y comparar cambios',
          en: 'Create only a component snapshot and compare output differences',
        },
        score: 1,
      },
      {
        id: 'testing-1d',
        text: {
          es: 'No probar el componente porque el servicio ya tiene sus tests',
          en: 'Skip component tests because the service already has its own',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'testing-test-pyramid',
    category: 'testing',
    text: {
      es: 'Un equipo solo escribe tests E2E. Cada suite tarda 20 minutos y los tests son frágiles. ¿Qué recomiendas?',
      en: 'A team only writes E2E tests. Each suite takes 20 minutes and tests are brittle. What do you recommend?',
    },
    options: [
      {
        id: 'testing-2a',
        text: {
          es: 'Seguir con E2E porque son los tests más realistas que se pueden tener',
          en: 'Keep adding E2E tests because they are the most realistic ones we have',
        },
        score: 0,
      },
      {
        id: 'testing-2b',
        text: {
          es: 'Ejecutar E2E solo de noche y desactivar los que fallen con frecuencia',
          en: 'Run E2E only at night and disable those that fail too often in the CI',
        },
        score: 0,
      },
      {
        id: 'testing-2c',
        text: {
          es: 'Redistribuir: más unit/integration rápidos, E2E solo en críticos',
          en: 'Redistribute: more fast unit/integration, E2E only for critical',
        },
        score: 3,
      },
      {
        id: 'testing-2d',
        text: {
          es: 'Reemplazar absolutamente todos los E2E por solo unit tests',
          en: 'Replace absolutely all of the E2E tests with unit tests only',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'testing-mocking-strategy',
    category: 'testing',
    text: {
      es: 'Necesitas probar un servicio que depende de HttpClient y un AuthService. ¿Cuál es la mejor estrategia de mocking?',
      en: 'You need to test a service that depends on HttpClient and an AuthService. What is the best mocking strategy?',
    },
    options: [
      {
        id: 'testing-3a',
        text: {
          es: 'Usar el HttpClient real apuntando hacia un servidor de pruebas',
          en: 'Use the real HttpClient connected to a dedicated test server',
        },
        score: 1,
      },
      {
        id: 'testing-3b',
        text: {
          es: 'Mock de HttpClient con TestingController y stub de AuthService',
          en: 'Mock HttpClient via TestingController and stub the AuthService',
        },
        score: 3,
      },
      {
        id: 'testing-3c',
        text: {
          es: 'No probar el servicio, solo probar el componente que lo consume',
          en: 'Do not test the service, only test the component that uses it',
        },
        score: 0,
      },
      {
        id: 'testing-3d',
        text: {
          es: 'Usar spyOn en todos los métodos sin definir valores de retorno',
          en: 'Use spyOn on all methods without defining any return values',
        },
        score: 1,
      },
    ],
  },

  // ─── PERFORMANCE (3 questions) ──────────────────────────────────────────────
  {
    id: 'performance-large-list',
    category: 'performance',
    text: {
      es: 'Una lista con miles de registros bloquea la interfaz. ¿Qué combinación es más efectiva?',
      en: 'A list with thousands of records blocks the UI. Which combination is most effective?',
    },
    options: [
      {
        id: 'performance-1a',
        text: {
          es: 'Virtual scrolling, tracking estable y renderizado incremental',
          en: 'Virtual scrolling, stable tracking, and incremental rendering',
        },
        score: 3,
      },
      {
        id: 'performance-1b',
        text: {
          es: 'Ocultar los elementos con display none sin retirarlos del DOM',
          en: 'Hide elements with display none without removing them from DOM',
        },
        score: 0,
      },
      {
        id: 'performance-1c',
        text: {
          es: 'Ejecutar detectChanges() dentro del bucle en cada iteración',
          en: 'Run detectChanges() inside the loop during every iteration',
        },
        score: 0,
      },
      {
        id: 'performance-1d',
        text: {
          es: 'Duplicar la lista para conservar una copia de respaldo segura',
          en: 'Duplicate the list in order to keep a backup copy at all times',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'performance-bundle-optimization',
    category: 'performance',
    text: {
      es: 'Tu bundle inicial supera 500KB y el LCP es lento. ¿Qué acción tiene mayor impacto?',
      en: 'Your initial bundle exceeds 500KB and LCP is slow. Which action has the greatest impact?',
    },
    options: [
      {
        id: 'performance-2a',
        text: {
          es: 'Minificar el código CSS de forma manual para reducir el tamaño',
          en: 'Manually minify CSS code to attempt reducing the bundle size',
        },
        score: 1,
      },
      {
        id: 'performance-2b',
        text: {
          es: 'Lazy loading por rutas, defer blocks y precarga de lo crítico',
          en: 'Route-based lazy loading, defer blocks, and preload critical',
        },
        score: 3,
      },
      {
        id: 'performance-2c',
        text: {
          es: 'Agregar más estrategias de cacheo dentro del service worker',
          en: 'Add more caching strategies inside the service worker config',
        },
        score: 1,
      },
      {
        id: 'performance-2d',
        text: {
          es: 'Mover todo el JavaScript a un CDN sin realizar otros cambios',
          en: 'Move all JavaScript to a CDN without making any other changes',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'performance-core-web-vitals',
    category: 'performance',
    text: {
      es: 'Tu INP (Interaction to Next Paint) es de 400ms en una página con muchos event handlers. ¿Cuál es la mejor estrategia?',
      en: 'Your INP (Interaction to Next Paint) is 400ms on a page with many event handlers. What is the best strategy?',
    },
    options: [
      {
        id: 'performance-3a',
        text: {
          es: 'Agregar debounce de un segundo a todos los handlers del evento',
          en: 'Add a one second debounce to every single event handler used',
        },
        score: 1,
      },
      {
        id: 'performance-3b',
        text: {
          es: 'Event delegation, dividir tareas con yield y evitar reflows',
          en: 'Event delegation, break tasks with yield, and avoid reflows',
        },
        score: 3,
      },
      {
        id: 'performance-3c',
        text: {
          es: 'Desactivar todos los event listeners cuando la página se oculta',
          en: 'Disable all event listeners whenever the page is not visible',
        },
        score: 0,
      },
      {
        id: 'performance-3d',
        text: {
          es: 'Reducir el tamaño del CSS para que el navegador pinte más ágil',
          en: 'Reduce CSS file size so the browser can paint things much faster',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];
