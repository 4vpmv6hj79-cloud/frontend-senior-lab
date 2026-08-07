import type { DiagnosticQuestion } from '../models/diagnostic.model';

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'angular-change-detection',
    category: 'angular',
    text: {
      es: 'Una pantalla Angular renderiza datos inmutables, pero ejecuta demasiados ciclos de detección. ¿Cuál es la mejor optimización?',
      en: 'An Angular screen renders immutable data but runs too many change-detection cycles. What is the best optimization?',
    },
    options: [
      {
        id: 'angular-a',
        text: {
          es: 'Llamar detectChanges() después de cada actualización.',
          en: 'Call detectChanges() after every update.',
        },
        score: 1,
      },
      {
        id: 'angular-b',
        text: {
          es: 'Usar OnPush, referencias inmutables y Signals o AsyncPipe.',
          en: 'Use OnPush, immutable references, and Signals or AsyncPipe.',
        },
        score: 3,
      },
      {
        id: 'angular-c',
        text: {
          es: 'Agregar setTimeout() alrededor de las actualizaciones.',
          en: 'Wrap updates inside setTimeout().',
        },
        score: 0,
      },
      {
        id: 'angular-d',
        text: {
          es: 'Desactivar la detección de cambios en toda la aplicación.',
          en: 'Disable change detection for the entire application.',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'typescript-api-boundary',
    category: 'typescript',
    text: {
      es: 'Recibes información no validada desde una API. ¿Cómo mantienes seguridad de tipos?',
      en: 'You receive unvalidated data from an API. How do you preserve type safety?',
    },
    options: [
      {
        id: 'typescript-a',
        text: {
          es: 'Declarar la respuesta como any.',
          en: 'Declare the response as any.',
        },
        score: 0,
      },
      {
        id: 'typescript-b',
        text: {
          es: 'Forzar el tipo con una aserción as sin validarlo.',
          en: 'Force the type with an as assertion without validation.',
        },
        score: 1,
      },
      {
        id: 'typescript-c',
        text: {
          es: 'Recibir unknown y validarlo con un type guard o esquema.',
          en: 'Receive unknown and validate it with a type guard or schema.',
        },
        score: 3,
      },
      {
        id: 'typescript-d',
        text: {
          es: 'Convertir la respuesta a Object.',
          en: 'Convert the response to Object.',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'architecture-design-system',
    category: 'architecture',
    text: {
      es: 'Varios productos necesitan compartir componentes visuales. ¿Qué solución escala mejor?',
      en: 'Several products need to share UI components. Which solution scales best?',
    },
    options: [
      {
        id: 'architecture-a',
        text: {
          es: 'Copiar los componentes en cada aplicación.',
          en: 'Copy the components into every application.',
        },
        score: 0,
      },
      {
        id: 'architecture-b',
        text: {
          es: 'Crear una librería versionada con tokens, documentación y contratos públicos.',
          en: 'Build a versioned library with tokens, documentation, and public contracts.',
        },
        score: 3,
      },
      {
        id: 'architecture-c',
        text: {
          es: 'Guardar todos los estilos en un único archivo global.',
          en: 'Store every style in one global file.',
        },
        score: 1,
      },
      {
        id: 'architecture-d',
        text: {
          es: 'Permitir que cada equipo implemente su propia versión.',
          en: 'Let every team implement its own version.',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'testing-component-behavior',
    category: 'testing',
    text: {
      es: '¿Cuál es la prueba más valiosa para un componente que carga datos de un servicio?',
      en: 'What is the most valuable test for a component that loads data from a service?',
    },
    options: [
      {
        id: 'testing-a',
        text: {
          es: 'Probar directamente todos sus métodos privados.',
          en: 'Test all of its private methods directly.',
        },
        score: 1,
      },
      {
        id: 'testing-b',
        text: {
          es: 'Simular el servicio y verificar el comportamiento visible en el DOM.',
          en: 'Mock the service and verify visible behavior in the DOM.',
        },
        score: 3,
      },
      {
        id: 'testing-c',
        text: {
          es: 'Crear solamente un snapshot.',
          en: 'Create only a snapshot.',
        },
        score: 1,
      },
      {
        id: 'testing-d',
        text: {
          es: 'No probarlo porque el servicio ya tiene pruebas.',
          en: 'Skip it because the service already has tests.',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'performance-large-list',
    category: 'performance',
    text: {
      es: 'Una lista con miles de registros bloquea la interfaz. ¿Qué combinación es más efectiva?',
      en: 'A list with thousands of records blocks the UI. Which combination is most effective?',
    },
    options: [
      {
        id: 'performance-a',
        text: {
          es: 'Virtual scrolling, seguimiento estable y renderizado incremental.',
          en: 'Virtual scrolling, stable tracking, and incremental rendering.',
        },
        score: 3,
      },
      {
        id: 'performance-b',
        text: {
          es: 'Ocultar los elementos con CSS sin retirarlos del DOM.',
          en: 'Hide elements with CSS without removing them from the DOM.',
        },
        score: 0,
      },
      {
        id: 'performance-c',
        text: {
          es: 'Ejecutar detectChanges() dentro de cada iteración.',
          en: 'Run detectChanges() inside every iteration.',
        },
        score: 0,
      },
      {
        id: 'performance-d',
        text: {
          es: 'Duplicar la lista para conservar una copia de respaldo.',
          en: 'Duplicate the list to keep a backup copy.',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];