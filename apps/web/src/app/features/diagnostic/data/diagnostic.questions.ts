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
          es: 'Llamar detectChanges() después de cada actualización.',
          en: 'Call detectChanges() after every update.',
        },
        score: 1,
      },
      {
        id: 'angular-1b',
        text: {
          es: 'Usar OnPush, referencias inmutables y Signals o AsyncPipe.',
          en: 'Use OnPush, immutable references, and Signals or AsyncPipe.',
        },
        score: 3,
      },
      {
        id: 'angular-1c',
        text: {
          es: 'Agregar setTimeout() alrededor de las actualizaciones.',
          en: 'Wrap updates inside setTimeout().',
        },
        score: 0,
      },
      {
        id: 'angular-1d',
        text: {
          es: 'Desactivar la detección de cambios en toda la aplicación.',
          en: 'Disable change detection for the entire application.',
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
          es: 'Declararlo con providedIn: "root" y usar un flag booleano para filtrarlo.',
          en: 'Declare it with providedIn: "root" and use a boolean flag to filter it.',
        },
        score: 0,
      },
      {
        id: 'angular-2b',
        text: {
          es: 'Proveerlo en el array providers del componente padre del subárbol.',
          en: 'Provide it in the providers array of the subtree root component.',
        },
        score: 3,
      },
      {
        id: 'angular-2c',
        text: {
          es: 'Crear una instancia manual con new y pasarla por @Input().',
          en: 'Manually create an instance with new and pass it via @Input().',
        },
        score: 1,
      },
      {
        id: 'angular-2d',
        text: {
          es: 'Almacenarlo en una variable global fuera de Angular.',
          en: 'Store it in a global variable outside Angular.',
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
          es: 'Los effects se ejecutan sincrónicamente y bloquean el hilo principal.',
          en: 'Effects run synchronously and block the main thread.',
        },
        score: 1,
      },
      {
        id: 'angular-3b',
        text: {
          es: 'El effect podría crear escrituras circulares a signals, causando bucles infinitos.',
          en: 'The effect might create circular signal writes, causing infinite loops.',
        },
        score: 3,
      },
      {
        id: 'angular-3c',
        text: {
          es: 'Los signals no son compatibles con computed().',
          en: 'Signals are not compatible with computed().',
        },
        score: 0,
      },
      {
        id: 'angular-3d',
        text: {
          es: 'El computed no se reevalúa si más de un signal cambia a la vez.',
          en: 'The computed does not re-evaluate if more than one signal changes at once.',
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
          es: 'Declarar la respuesta como any.',
          en: 'Declare the response as any.',
        },
        score: 0,
      },
      {
        id: 'typescript-1b',
        text: {
          es: 'Forzar el tipo con una aserción as sin validarlo.',
          en: 'Force the type with an as assertion without validation.',
        },
        score: 1,
      },
      {
        id: 'typescript-1c',
        text: {
          es: 'Recibir unknown y validarlo con un type guard o esquema.',
          en: 'Receive unknown and validate it with a type guard or schema.',
        },
        score: 3,
      },
      {
        id: 'typescript-1d',
        text: {
          es: 'Convertir la respuesta a Object.',
          en: 'Convert the response to Object.',
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
          es: 'function fn<T>(item: T) y verificar typeof item.id en runtime.',
          en: 'function fn<T>(item: T) and check typeof item.id at runtime.',
        },
        score: 1,
      },
      {
        id: 'typescript-2b',
        text: {
          es: 'function fn<T extends { id: string }>(item: T) para restringir en compilación.',
          en: 'function fn<T extends { id: string }>(item: T) to constrain at compile time.',
        },
        score: 3,
      },
      {
        id: 'typescript-2c',
        text: {
          es: 'function fn(item: any) y castear con as dentro del cuerpo.',
          en: 'function fn(item: any) and cast with as inside the body.',
        },
        score: 0,
      },
      {
        id: 'typescript-2d',
        text: {
          es: 'function fn(item: object) ya que todo objeto tiene id.',
          en: 'function fn(item: object) since every object has an id.',
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
          es: 'Usar (result as any).data directamente.',
          en: 'Use (result as any).data directly.',
        },
        score: 0,
      },
      {
        id: 'typescript-3b',
        text: {
          es: 'Verificar result.status === "ok" para estrechar el tipo automáticamente.',
          en: 'Check result.status === "ok" to narrow the type automatically.',
        },
        score: 3,
      },
      {
        id: 'typescript-3c',
        text: {
          es: 'Usar el operador ! para forzar que data no sea undefined.',
          en: 'Use the ! operator to assert data is not undefined.',
        },
        score: 1,
      },
      {
        id: 'typescript-3d',
        text: {
          es: 'Añadir data?: User a ambas variantes de la unión.',
          en: 'Add data?: User to both variants of the union.',
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
          es: 'Copiar los componentes en cada aplicación.',
          en: 'Copy the components into every application.',
        },
        score: 0,
      },
      {
        id: 'architecture-1b',
        text: {
          es: 'Crear una librería versionada con tokens, documentación y contratos públicos.',
          en: 'Build a versioned library with tokens, documentation, and public contracts.',
        },
        score: 3,
      },
      {
        id: 'architecture-1c',
        text: {
          es: 'Guardar todos los estilos en un único archivo global.',
          en: 'Store every style in one global file.',
        },
        score: 1,
      },
      {
        id: 'architecture-1d',
        text: {
          es: 'Permitir que cada equipo implemente su propia versión.',
          en: 'Let every team implement its own version.',
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
          es: 'Viola los límites de dependencia y crea acoplamiento implícito difícil de rastrear.',
          en: 'It violates dependency boundaries and creates implicit coupling that is hard to track.',
        },
        score: 3,
      },
      {
        id: 'architecture-2b',
        text: {
          es: 'No hay problema si ambos features están en el mismo repositorio.',
          en: 'No problem as long as both features are in the same repository.',
        },
        score: 0,
      },
      {
        id: 'architecture-2c',
        text: {
          es: 'Solo es un problema si se usa lazy loading.',
          en: 'It is only a problem if lazy loading is used.',
        },
        score: 1,
      },
      {
        id: 'architecture-2d',
        text: {
          es: 'Causa errores de compilación en producción.',
          en: 'It causes compilation errors in production.',
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
          es: 'Pasar todo por @Input/@Output hasta el componente raíz.',
          en: 'Pass everything through @Input/@Output up to the root component.',
        },
        score: 1,
      },
      {
        id: 'architecture-3b',
        text: {
          es: 'Usar servicios singleton con signals o stores con acciones y selectores claros.',
          en: 'Use singleton services with signals or stores with clear actions and selectors.',
        },
        score: 3,
      },
      {
        id: 'architecture-3c',
        text: {
          es: 'Almacenar todo en localStorage y leerlo desde cada componente.',
          en: 'Store everything in localStorage and read from each component.',
        },
        score: 0,
      },
      {
        id: 'architecture-3d',
        text: {
          es: 'Usar variables globales en window para acceso rápido.',
          en: 'Use global variables on window for quick access.',
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
          es: 'Probar directamente todos sus métodos privados.',
          en: 'Test all of its private methods directly.',
        },
        score: 1,
      },
      {
        id: 'testing-1b',
        text: {
          es: 'Simular el servicio y verificar el comportamiento visible en el DOM.',
          en: 'Mock the service and verify visible behavior in the DOM.',
        },
        score: 3,
      },
      {
        id: 'testing-1c',
        text: {
          es: 'Crear solamente un snapshot.',
          en: 'Create only a snapshot.',
        },
        score: 1,
      },
      {
        id: 'testing-1d',
        text: {
          es: 'No probarlo porque el servicio ya tiene pruebas.',
          en: 'Skip it because the service already has tests.',
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
          es: 'Seguir agregando E2E tests ya que son los más realistas.',
          en: 'Keep adding E2E tests since they are the most realistic.',
        },
        score: 0,
      },
      {
        id: 'testing-2b',
        text: {
          es: 'Ejecutar E2E solo de noche y desactivar los que fallan.',
          en: 'Run E2E only at night and disable those that fail.',
        },
        score: 0,
      },
      {
        id: 'testing-2c',
        text: {
          es: 'Redistribuir esfuerzo: más unit/integration tests rápidos y E2E solo para flujos críticos.',
          en: 'Redistribute effort: more fast unit/integration tests and E2E only for critical flows.',
        },
        score: 3,
      },
      {
        id: 'testing-2d',
        text: {
          es: 'Reemplazar todos los E2E por unit tests exclusivamente.',
          en: 'Replace all E2E with unit tests exclusively.',
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
          es: 'Usar el HttpClient real apuntando a un servidor de pruebas.',
          en: 'Use the real HttpClient pointing to a test server.',
        },
        score: 1,
      },
      {
        id: 'testing-3b',
        text: {
          es: 'Mockear HttpClient con HttpTestingController y proveer un stub de AuthService con valores predecibles.',
          en: 'Mock HttpClient with HttpTestingController and provide an AuthService stub with predictable values.',
        },
        score: 3,
      },
      {
        id: 'testing-3c',
        text: {
          es: 'No probar el servicio — solo probar el componente que lo consume.',
          en: 'Do not test the service — only test the component that consumes it.',
        },
        score: 0,
      },
      {
        id: 'testing-3d',
        text: {
          es: 'Usar spyOn en todos los métodos de ambas dependencias sin valores de retorno.',
          en: 'Use spyOn on all methods of both dependencies without return values.',
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
          es: 'Virtual scrolling, seguimiento estable y renderizado incremental.',
          en: 'Virtual scrolling, stable tracking, and incremental rendering.',
        },
        score: 3,
      },
      {
        id: 'performance-1b',
        text: {
          es: 'Ocultar los elementos con CSS sin retirarlos del DOM.',
          en: 'Hide elements with CSS without removing them from the DOM.',
        },
        score: 0,
      },
      {
        id: 'performance-1c',
        text: {
          es: 'Ejecutar detectChanges() dentro de cada iteración.',
          en: 'Run detectChanges() inside every iteration.',
        },
        score: 0,
      },
      {
        id: 'performance-1d',
        text: {
          es: 'Duplicar la lista para conservar una copia de respaldo.',
          en: 'Duplicate the list to keep a backup copy.',
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
          es: 'Minificar el código CSS manualmente.',
          en: 'Manually minify CSS code.',
        },
        score: 1,
      },
      {
        id: 'performance-2b',
        text: {
          es: 'Implementar lazy loading por rutas, defer blocks y precargar los módulos críticos.',
          en: 'Implement route-based lazy loading, defer blocks, and preload critical modules.',
        },
        score: 3,
      },
      {
        id: 'performance-2c',
        text: {
          es: 'Agregar más cacheo en el service worker.',
          en: 'Add more caching in the service worker.',
        },
        score: 1,
      },
      {
        id: 'performance-2d',
        text: {
          es: 'Mover todo el JavaScript a un CDN sin otros cambios.',
          en: 'Move all JavaScript to a CDN without other changes.',
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
          es: 'Agregar debounce de 1 segundo a todos los event handlers.',
          en: 'Add a 1 second debounce to all event handlers.',
        },
        score: 1,
      },
      {
        id: 'performance-3b',
        text: {
          es: 'Usar event delegation, dividir tareas largas con scheduler.yield() y evitar layout thrashing.',
          en: 'Use event delegation, break long tasks with scheduler.yield(), and avoid layout thrashing.',
        },
        score: 3,
      },
      {
        id: 'performance-3c',
        text: {
          es: 'Desactivar todos los event listeners cuando la página no está visible.',
          en: 'Disable all event listeners when the page is not visible.',
        },
        score: 0,
      },
      {
        id: 'performance-3d',
        text: {
          es: 'Reducir el tamaño del CSS para que el navegador pinte más rápido.',
          en: 'Reduce CSS size so the browser paints faster.',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];
