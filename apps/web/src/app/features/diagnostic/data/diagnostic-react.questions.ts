import type { DiagnosticQuestion } from '../models/diagnostic.model';

export const REACT_DIAGNOSTIC_QUESTIONS: readonly DiagnosticQuestion[] = [
  // ─── REACT CORE (3 questions) ────────────────────────────────────────────────
  {
    id: 'react-hooks-stale-closure',
    category: 'framework',
    text: {
      es: 'Un useEffect accede a un valor de estado pero siempre muestra el valor inicial, nunca el actualizado. ¿Cuál es la causa más probable?',
      en: 'A useEffect accesses a state value but always shows the initial value, never the updated one. What is the most likely cause?',
    },
    options: [
      {
        id: 'react-1a',
        text: {
          es: 'El componente no se re-renderiza porque falta un trigger externo',
          en: 'The component is not re-rendering due to a missing external trigger',
        },
        score: 0,
      },
      {
        id: 'react-1b',
        text: {
          es: 'Se usó useRef en lugar de useState y la vista no se actualiza',
          en: 'useRef was used instead of useState so the view does not update',
        },
        score: 1,
      },
      {
        id: 'react-1c',
        text: {
          es: 'Closure obsoleta: falta la dependencia en el array de deps',
          en: 'Stale closure: the dependency is missing from the deps array',
        },
        score: 3,
      },
      {
        id: 'react-1d',
        text: {
          es: 'React agrupa los setState en batch y no actualiza al instante',
          en: 'React batches setState calls together and does not update instantly',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'react-server-components',
    category: 'framework',
    text: {
      es: '¿Cuál es la principal ventaja de los React Server Components sobre los Client Components?',
      en: 'What is the main advantage of React Server Components over Client Components?',
    },
    options: [
      {
        id: 'react-2a',
        text: {
          es: 'Permiten usar hooks como useState y useEffect del lado servidor',
          en: 'They allow using hooks like useState and useEffect on the server',
        },
        score: 0,
      },
      {
        id: 'react-2b',
        text: {
          es: 'Ejecutan en servidor, no envían JS al cliente y acceden a DBs',
          en: 'They run on the server, send zero JS to client, and access DBs',
        },
        score: 3,
      },
      {
        id: 'react-2c',
        text: {
          es: 'Son más rápidos porque omiten completamente el Virtual DOM',
          en: 'They are faster because they completely skip the Virtual DOM',
        },
        score: 1,
      },
      {
        id: 'react-2d',
        text: {
          es: 'Permiten renderizar componentes sin tener React instalado en app',
          en: 'They allow rendering components without having React in the app',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'react-memo-usecallback',
    category: 'framework',
    text: {
      es: 'Un componente hijo se re-renderiza innecesariamente aunque sus props no cambian. Ya usas React.memo. ¿Qué falta?',
      en: 'A child component re-renders unnecessarily even though its props have not changed. You already use React.memo. What is missing?',
    },
    options: [
      {
        id: 'react-3a',
        text: {
          es: 'Envolver callbacks con useCallback y objetos con useMemo',
          en: 'Wrap callbacks with useCallback and objects with useMemo',
        },
        score: 3,
      },
      {
        id: 'react-3b',
        text: {
          es: 'Implementar shouldComponentUpdate de forma manual en el hijo',
          en: 'Implement shouldComponentUpdate manually in the child component',
        },
        score: 0,
      },
      {
        id: 'react-3c',
        text: {
          es: 'Mover el componente hijo a un archivo separado del padre',
          en: 'Move the child component into a separate file from the parent',
        },
        score: 0,
      },
      {
        id: 'react-3d',
        text: {
          es: 'Convertir el componente funcional a class component con PureComponent',
          en: 'Convert the functional component to a class component with Pure',
        },
        score: 0,
      },
    ],
  },

  // ─── TYPESCRIPT (3 questions) ────────────────────────────────────────────────
  {
    id: 'react-ts-generic-component',
    category: 'typescript',
    text: {
      es: '¿Cómo tipas un componente genérico que recibe items de cualquier tipo y un renderItem callback?',
      en: 'How do you type a generic component that receives items of any type and a renderItem callback?',
    },
    options: [
      {
        id: 'react-ts-1a',
        text: {
          es: 'Usar any[] para items y (item: any) => ReactNode como callback',
          en: 'Use any[] for items and (item: any) => ReactNode as the callback',
        },
        score: 0,
      },
      {
        id: 'react-ts-1b',
        text: {
          es: 'Definir un generic <T> con items: T[] y renderItem: (item: T)',
          en: 'Define a generic <T> with items: T[] and renderItem: (item: T)',
        },
        score: 3,
      },
      {
        id: 'react-ts-1c',
        text: {
          es: 'Usar unknown[] para items y hacer type cast dentro del callback',
          en: 'Use unknown[] for items and do a type cast inside the callback',
        },
        score: 1,
      },
      {
        id: 'react-ts-1d',
        text: {
          es: 'Crear una interface específica para cada tipo de item posible',
          en: 'Create a specific interface for every possible item type needed',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'react-ts-discriminated-state',
    category: 'typescript',
    text: {
      es: 'Tienes un estado que puede ser loading, success o error. ¿Cuál es la forma más segura de tiparlo?',
      en: 'You have state that can be loading, success, or error. What is the safest way to type it?',
    },
    options: [
      {
        id: 'react-ts-2a',
        text: {
          es: 'Tres variables de estado separadas: isLoading, data y error',
          en: 'Three separate state variables: isLoading, data, and error',
        },
        score: 1,
      },
      {
        id: 'react-ts-2b',
        text: {
          es: 'Unión discriminada con status: loading | success | error',
          en: 'Discriminated union with status: loading | success | error',
        },
        score: 3,
      },
      {
        id: 'react-ts-2c',
        text: {
          es: 'Un objeto con propiedades opcionales: data?, error?, loading?',
          en: 'An object with all optional properties: data?, error?, loading?',
        },
        score: 1,
      },
      {
        id: 'react-ts-2d',
        text: {
          es: 'Usar un enum para el estado y un tipo genérico para los datos',
          en: 'Use an enum for the state and a generic type for the data values',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'react-ts-event-typing',
    category: 'typescript',
    text: {
      es: '¿Cómo tipas correctamente un handler de onChange para un input en React con TypeScript?',
      en: 'How do you correctly type an onChange handler for an input in React with TypeScript?',
    },
    options: [
      {
        id: 'react-ts-3a',
        text: {
          es: 'Usar (e: any) => void ya que acepta cualquier tipo de evento',
          en: 'Use (e: any) => void since it accepts any kind of event type',
        },
        score: 0,
      },
      {
        id: 'react-ts-3b',
        text: {
          es: 'Usar (e: Event) => void que es el tipo nativo del navegador',
          en: 'Use (e: Event) => void which is the native browser event type',
        },
        score: 1,
      },
      {
        id: 'react-ts-3c',
        text: {
          es: 'Usar React.ChangeEvent<HTMLInputElement> como tipo del evento',
          en: 'Use React.ChangeEvent<HTMLInputElement> as the event type',
        },
        score: 3,
      },
      {
        id: 'react-ts-3d',
        text: {
          es: 'Usar un tipo inline { target: { value: string } } para el evento',
          en: 'Use an inline type { target: { value: string } } for the event',
        },
        score: 1,
      },
    ],
  },

  // ─── ARCHITECTURE (3 questions) ─────────────────────────────────────────────
  {
    id: 'react-arch-state-management',
    category: 'architecture',
    text: {
      es: 'Tu app React tiene estado compartido entre 15+ componentes en 4 niveles de profundidad. ¿Cuál es la mejor estrategia?',
      en: 'Your React app has state shared across 15+ components at 4 levels deep. What is the best strategy?',
    },
    options: [
      {
        id: 'react-arch-1a',
        text: {
          es: 'Prop drilling desde el componente raíz pasando props nivel a nivel',
          en: 'Prop drilling from the root component passing props level by level',
        },
        score: 0,
      },
      {
        id: 'react-arch-1b',
        text: {
          es: 'Librería externa como Zustand o Redux Toolkit con selectores',
          en: 'External state library like Zustand or Redux Toolkit with selectors',
        },
        score: 3,
      },
      {
        id: 'react-arch-1c',
        text: {
          es: 'Context API con un solo Provider global que envuelve toda la app',
          en: 'Context API with a single global Provider wrapping the entire app',
        },
        score: 1,
      },
      {
        id: 'react-arch-1d',
        text: {
          es: 'Almacenar todo en localStorage y leer desde cada componente',
          en: 'Store everything in localStorage and read from every component',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'react-arch-folder-structure',
    category: 'architecture',
    text: {
      es: 'En una app React con 50+ páginas, ¿qué estructura de carpetas escala mejor?',
      en: 'In a React app with 50+ pages, which folder structure scales best?',
    },
    options: [
      {
        id: 'react-arch-2a',
        text: {
          es: 'Agrupar por tipo: /components, /hooks, /utils todos juntos',
          en: 'Group by type: /components, /hooks, /utils all in one place',
        },
        score: 1,
      },
      {
        id: 'react-arch-2b',
        text: {
          es: 'Agrupar por feature/dominio con sus propios hooks y utils',
          en: 'Group by feature/domain each with its own hooks and utils',
        },
        score: 3,
      },
      {
        id: 'react-arch-2c',
        text: {
          es: 'Un solo directorio plano con todos los archivos del proyecto',
          en: 'A single flat directory containing all files of the project',
        },
        score: 0,
      },
      {
        id: 'react-arch-2d',
        text: {
          es: 'Separar por páginas colocando toda la lógica dentro de cada una',
          en: 'Separate by pages and place all related logic inside each one',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'react-arch-data-fetching',
    category: 'architecture',
    text: {
      es: '¿Cuál es la mejor forma de manejar fetching de datos, cache y revalidación en una app React moderna?',
      en: 'What is the best way to handle data fetching, caching, and revalidation in a modern React app?',
    },
    options: [
      {
        id: 'react-arch-3a',
        text: {
          es: 'useEffect más useState haciendo fetch manual en cada petición',
          en: 'useEffect plus useState doing manual fetch on every request',
        },
        score: 1,
      },
      {
        id: 'react-arch-3b',
        text: {
          es: 'TanStack Query o SWR con cache, revalidación y deduplicación',
          en: 'TanStack Query or SWR with caching, revalidation, and dedupe',
        },
        score: 3,
      },
      {
        id: 'react-arch-3c',
        text: {
          es: 'Redux con thunks creando un action y reducer por cada API call',
          en: 'Redux with thunks creating an action and reducer per API call',
        },
        score: 1,
      },
      {
        id: 'react-arch-3d',
        text: {
          es: 'Fetch directo en el componente y almacenar resultado en Context',
          en: 'Fetch directly in the component and store the result in Context',
        },
        score: 0,
      },
    ],
  },

  // ─── TESTING (3 questions) ───────────────────────────────────────────────────
  {
    id: 'react-test-component',
    category: 'testing',
    text: {
      es: '¿Cuál es la prueba más valiosa para un componente React que muestra una lista de usuarios desde una API?',
      en: 'What is the most valuable test for a React component that displays a list of users from an API?',
    },
    options: [
      {
        id: 'react-test-1a',
        text: {
          es: 'Verificar que el hook interno se ejecuta con los params correctos',
          en: 'Verify the internal hook is called with the correct parameters',
        },
        score: 1,
      },
      {
        id: 'react-test-1b',
        text: {
          es: 'Mockear la API, renderizar y verificar los nombres en el DOM',
          en: 'Mock the API, render the component, and check names in the DOM',
        },
        score: 3,
      },
      {
        id: 'react-test-1c',
        text: {
          es: 'Snapshot test del componente completo para detectar regresiones',
          en: 'Snapshot test of the entire component to detect any regressions',
        },
        score: 1,
      },
      {
        id: 'react-test-1d',
        text: {
          es: 'Solo testear la función de fetch aislada fuera del componente',
          en: 'Only test the isolated fetch function outside of the component',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'react-test-hooks',
    category: 'testing',
    text: {
      es: '¿Cómo pruebas un custom hook que usa useState y useEffect internamente?',
      en: 'How do you test a custom hook that uses useState and useEffect internally?',
    },
    options: [
      {
        id: 'react-test-2a',
        text: {
          es: 'Llamar al hook directamente en el test sin componente ni wrapper',
          en: 'Call the hook directly in the test without a component or wrapper',
        },
        score: 0,
      },
      {
        id: 'react-test-2b',
        text: {
          es: 'Usar renderHook de testing-library en un entorno React real',
          en: 'Use renderHook from testing-library in a real React environment',
        },
        score: 3,
      },
      {
        id: 'react-test-2c',
        text: {
          es: 'Crear un componente wrapper para testing y usar screen queries',
          en: 'Create a wrapper component for testing and use screen queries',
        },
        score: 1,
      },
      {
        id: 'react-test-2d',
        text: {
          es: 'Mockear useState y useEffect para simular el comportamiento',
          en: 'Mock useState and useEffect to simulate the expected behavior',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'react-test-user-events',
    category: 'testing',
    text: {
      es: '¿Cuál es la diferencia principal entre fireEvent y userEvent en Testing Library?',
      en: 'What is the main difference between fireEvent and userEvent in Testing Library?',
    },
    options: [
      {
        id: 'react-test-3a',
        text: {
          es: 'No hay diferencia real, son sinónimos que hacen lo mismo',
          en: 'There is no real difference, they are synonyms that do the same',
        },
        score: 0,
      },
      {
        id: 'react-test-3b',
        text: {
          es: 'userEvent simula interacciones reales; fireEvent dispara aislado',
          en: 'userEvent simulates real interactions; fireEvent fires isolated',
        },
        score: 3,
      },
      {
        id: 'react-test-3c',
        text: {
          es: 'fireEvent es async y userEvent es sync según la documentación',
          en: 'fireEvent is async and userEvent is sync per the documentation',
        },
        score: 0,
      },
      {
        id: 'react-test-3d',
        text: {
          es: 'userEvent solo funciona con class components, no con funcionales',
          en: 'userEvent only works with class components, not with functional',
        },
        score: 0,
      },
    ],
  },

  // ─── PERFORMANCE (3 questions) ──────────────────────────────────────────────
  {
    id: 'react-perf-large-list',
    category: 'performance',
    text: {
      es: 'Una lista con 10,000 items se renderiza lentamente y el scroll es laggy. ¿Cuál es la mejor solución?',
      en: 'A list with 10,000 items renders slowly and scrolling is laggy. What is the best solution?',
    },
    options: [
      {
        id: 'react-perf-1a',
        text: {
          es: 'Virtualización con react-window: solo renderiza items visibles',
          en: 'Virtualization with react-window: only render visible items',
        },
        score: 3,
      },
      {
        id: 'react-perf-1b',
        text: {
          es: 'Usar CSS display:none para los items que están fuera de pantalla',
          en: 'Use CSS display:none for all items that are currently off-screen',
        },
        score: 0,
      },
      {
        id: 'react-perf-1c',
        text: {
          es: 'Agregar key={index} a cada item para mejorar la reconciliación',
          en: 'Add key={index} to each item to improve the reconciliation step',
        },
        score: 0,
      },
      {
        id: 'react-perf-1d',
        text: {
          es: 'Paginación en frontend dividiendo el array en bloques menores',
          en: 'Frontend pagination by splitting the data array into smaller pages',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'react-perf-bundle',
    category: 'performance',
    text: {
      es: 'Tu bundle de React es de 800KB y el LCP es lento. ¿Qué técnica tiene mayor impacto?',
      en: 'Your React bundle is 800KB and LCP is slow. Which technique has the greatest impact?',
    },
    options: [
      {
        id: 'react-perf-2a',
        text: {
          es: 'Code splitting con React.lazy y Suspense para cargar on demand',
          en: 'Code splitting with React.lazy and Suspense to load on demand',
        },
        score: 3,
      },
      {
        id: 'react-perf-2b',
        text: {
          es: 'Minificar el código con Terser para reducir el peso del bundle',
          en: 'Minify the code with Terser to reduce the overall bundle weight',
        },
        score: 1,
      },
      {
        id: 'react-perf-2c',
        text: {
          es: 'Mover todos los assets y scripts estáticos a un CDN externo',
          en: 'Move all static assets and scripts to an external CDN provider',
        },
        score: 0,
      },
      {
        id: 'react-perf-2d',
        text: {
          es: 'Usar PureComponent en todos los componentes de la aplicación',
          en: 'Use PureComponent on every single component in the application',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'react-perf-rerender',
    category: 'performance',
    text: {
      es: 'Un Context Provider cambia de valor y causa re-renders en 50+ componentes consumidores. ¿Cómo lo solucionas?',
      en: 'A Context Provider changes value and causes re-renders in 50+ consumer components. How do you fix it?',
    },
    options: [
      {
        id: 'react-perf-3a',
        text: {
          es: 'Separar en múltiples providers o migrar a Zustand con selectores',
          en: 'Split into multiple providers or migrate to Zustand with selectors',
        },
        score: 3,
      },
      {
        id: 'react-perf-3b',
        text: {
          es: 'Envolver todos los componentes consumidores en React.memo',
          en: 'Wrap every single consumer component inside of React.memo',
        },
        score: 1,
      },
      {
        id: 'react-perf-3c',
        text: {
          es: 'Usar useRef en vez de useState para almacenar el valor del Context',
          en: 'Use useRef instead of useState to store the value of the Context',
        },
        score: 1,
      },
      {
        id: 'react-perf-3d',
        text: {
          es: 'Mover el estado a window global para evitar triggers de re-render',
          en: 'Move the state to the global window to avoid triggering re-renders',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];
