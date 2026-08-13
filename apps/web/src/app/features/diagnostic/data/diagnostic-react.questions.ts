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
          es: 'El componente no está re-renderizándose.',
          en: 'The component is not re-rendering.',
        },
        score: 0,
      },
      {
        id: 'react-1b',
        text: {
          es: 'El estado se declaró con useRef en vez de useState.',
          en: 'State was declared with useRef instead of useState.',
        },
        score: 1,
      },
      {
        id: 'react-1c',
        text: {
          es: 'Closure obsoleta: la dependencia no está en el array de deps del useEffect.',
          en: 'Stale closure: the dependency is missing from the useEffect deps array.',
        },
        score: 3,
      },
      {
        id: 'react-1d',
        text: {
          es: 'React batch los setState y no actualiza inmediatamente.',
          en: 'React batches setState and does not update immediately.',
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
          es: 'Permiten usar hooks como useState y useEffect.',
          en: 'They allow using hooks like useState and useEffect.',
        },
        score: 0,
      },
      {
        id: 'react-2b',
        text: {
          es: 'Ejecutan en el servidor, no envían JS al cliente, y pueden acceder directamente a bases de datos o APIs internas.',
          en: 'They execute on the server, send no JS to the client, and can directly access databases or internal APIs.',
        },
        score: 3,
      },
      {
        id: 'react-2c',
        text: {
          es: 'Son más rápidos porque evitan el Virtual DOM.',
          en: 'They are faster because they avoid the Virtual DOM.',
        },
        score: 1,
      },
      {
        id: 'react-2d',
        text: {
          es: 'Permiten renderizar componentes sin React instalado.',
          en: 'They allow rendering components without React installed.',
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
          es: 'Envolver las funciones callback con useCallback y los objetos con useMemo para estabilizar las referencias.',
          en: 'Wrap callback functions with useCallback and objects with useMemo to stabilize references.',
        },
        score: 3,
      },
      {
        id: 'react-3b',
        text: {
          es: 'Usar shouldComponentUpdate manualmente.',
          en: 'Use shouldComponentUpdate manually.',
        },
        score: 0,
      },
      {
        id: 'react-3c',
        text: {
          es: 'Mover el componente hijo fuera del archivo del padre.',
          en: 'Move the child component outside the parent file.',
        },
        score: 0,
      },
      {
        id: 'react-3d',
        text: {
          es: 'Convertir el componente a class component.',
          en: 'Convert the component to a class component.',
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
          es: 'Usar any[] para items y (item: any) => ReactNode para renderItem.',
          en: 'Use any[] for items and (item: any) => ReactNode for renderItem.',
        },
        score: 0,
      },
      {
        id: 'react-ts-1b',
        text: {
          es: 'Definir un generic: <T>(props: { items: T[]; renderItem: (item: T) => ReactNode }) => JSX.Element.',
          en: 'Define a generic: <T>(props: { items: T[]; renderItem: (item: T) => ReactNode }) => JSX.Element.',
        },
        score: 3,
      },
      {
        id: 'react-ts-1c',
        text: {
          es: 'Usar unknown[] y hacer cast dentro del callback.',
          en: 'Use unknown[] and cast inside the callback.',
        },
        score: 1,
      },
      {
        id: 'react-ts-1d',
        text: {
          es: 'Crear una interface diferente para cada tipo de item.',
          en: 'Create a different interface for each item type.',
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
          es: 'Tres variables de estado separadas: isLoading, data, error.',
          en: 'Three separate state variables: isLoading, data, error.',
        },
        score: 1,
      },
      {
        id: 'react-ts-2b',
        text: {
          es: 'Una unión discriminada: { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: string }.',
          en: 'A discriminated union: { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: string }.',
        },
        score: 3,
      },
      {
        id: 'react-ts-2c',
        text: {
          es: 'Un objeto con todas las propiedades opcionales: { data?: T; error?: string; loading?: boolean }.',
          en: 'An object with all optional properties: { data?: T; error?: string; loading?: boolean }.',
        },
        score: 1,
      },
      {
        id: 'react-ts-2d',
        text: {
          es: 'Usar un enum para el estado y un genérico para el data.',
          en: 'Use an enum for state and a generic for data.',
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
          es: '(e: any) => void',
          en: '(e: any) => void',
        },
        score: 0,
      },
      {
        id: 'react-ts-3b',
        text: {
          es: '(e: Event) => void',
          en: '(e: Event) => void',
        },
        score: 1,
      },
      {
        id: 'react-ts-3c',
        text: {
          es: '(e: React.ChangeEvent<HTMLInputElement>) => void',
          en: '(e: React.ChangeEvent<HTMLInputElement>) => void',
        },
        score: 3,
      },
      {
        id: 'react-ts-3d',
        text: {
          es: '(e: { target: { value: string } }) => void',
          en: '(e: { target: { value: string } }) => void',
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
          es: 'Prop drilling desde el componente raíz.',
          en: 'Prop drilling from the root component.',
        },
        score: 0,
      },
      {
        id: 'react-arch-1b',
        text: {
          es: 'Usar una librería de estado externo (Zustand, Jotai o Redux Toolkit) con selectores para evitar re-renders innecesarios.',
          en: 'Use an external state library (Zustand, Jotai, or Redux Toolkit) with selectors to avoid unnecessary re-renders.',
        },
        score: 3,
      },
      {
        id: 'react-arch-1c',
        text: {
          es: 'Context API con un solo Provider que envuelve toda la app.',
          en: 'Context API with a single Provider wrapping the entire app.',
        },
        score: 1,
      },
      {
        id: 'react-arch-1d',
        text: {
          es: 'Almacenar todo en localStorage y leer desde cada componente.',
          en: 'Store everything in localStorage and read from each component.',
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
          es: 'Agrupar por tipo: /components, /hooks, /utils, /services (todos juntos).',
          en: 'Group by type: /components, /hooks, /utils, /services (all together).',
        },
        score: 1,
      },
      {
        id: 'react-arch-2b',
        text: {
          es: 'Agrupar por feature/dominio: /features/auth, /features/dashboard, cada uno con sus componentes, hooks y utils.',
          en: 'Group by feature/domain: /features/auth, /features/dashboard, each with its own components, hooks, and utils.',
        },
        score: 3,
      },
      {
        id: 'react-arch-2c',
        text: {
          es: 'Un solo directorio plano con todos los archivos.',
          en: 'A single flat directory with all files.',
        },
        score: 0,
      },
      {
        id: 'react-arch-2d',
        text: {
          es: 'Separar por páginas y poner toda la lógica en cada página.',
          en: 'Separate by pages and put all logic in each page.',
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
          es: 'useEffect + useState para cada petición.',
          en: 'useEffect + useState for each request.',
        },
        score: 1,
      },
      {
        id: 'react-arch-3b',
        text: {
          es: 'TanStack Query (React Query) o SWR: cache automática, revalidación, deduplicación y estados de loading/error integrados.',
          en: 'TanStack Query (React Query) or SWR: automatic caching, revalidation, deduplication, and built-in loading/error states.',
        },
        score: 3,
      },
      {
        id: 'react-arch-3c',
        text: {
          es: 'Redux con thunks para cada llamada API.',
          en: 'Redux with thunks for each API call.',
        },
        score: 1,
      },
      {
        id: 'react-arch-3d',
        text: {
          es: 'Fetch en el componente y guardar en Context.',
          en: 'Fetch in the component and save in Context.',
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
          es: 'Verificar que el hook interno se llame correctamente.',
          en: 'Verify the internal hook is called correctly.',
        },
        score: 1,
      },
      {
        id: 'react-test-1b',
        text: {
          es: 'Mockear la API, renderizar el componente y verificar que los nombres de usuario aparecen en el DOM.',
          en: 'Mock the API, render the component, and verify usernames appear in the DOM.',
        },
        score: 3,
      },
      {
        id: 'react-test-1c',
        text: {
          es: 'Snapshot test de todo el componente.',
          en: 'Snapshot test of the entire component.',
        },
        score: 1,
      },
      {
        id: 'react-test-1d',
        text: {
          es: 'Solo probar la función de fetch aislada.',
          en: 'Only test the isolated fetch function.',
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
          es: 'Llamar al hook directamente en el test sin un componente.',
          en: 'Call the hook directly in the test without a component.',
        },
        score: 0,
      },
      {
        id: 'react-test-2b',
        text: {
          es: 'Usar renderHook de @testing-library/react para ejecutar el hook en un entorno React real.',
          en: 'Use renderHook from @testing-library/react to execute the hook in a real React environment.',
        },
        score: 3,
      },
      {
        id: 'react-test-2c',
        text: {
          es: 'Crear un componente wrapper solo para testing y usar screen.getByText.',
          en: 'Create a wrapper component only for testing and use screen.getByText.',
        },
        score: 1,
      },
      {
        id: 'react-test-2d',
        text: {
          es: 'Mockear useState y useEffect.',
          en: 'Mock useState and useEffect.',
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
          es: 'No hay diferencia, son sinónimos.',
          en: 'No difference, they are synonyms.',
        },
        score: 0,
      },
      {
        id: 'react-test-3b',
        text: {
          es: 'userEvent simula interacciones reales del usuario (focus, keydown, keyup, input) mientras fireEvent solo dispara un evento aislado.',
          en: 'userEvent simulates real user interactions (focus, keydown, keyup, input) while fireEvent only fires an isolated event.',
        },
        score: 3,
      },
      {
        id: 'react-test-3c',
        text: {
          es: 'fireEvent es async y userEvent es sync.',
          en: 'fireEvent is async and userEvent is sync.',
        },
        score: 0,
      },
      {
        id: 'react-test-3d',
        text: {
          es: 'userEvent solo funciona con componentes de clase.',
          en: 'userEvent only works with class components.',
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
          es: 'Virtualización con react-window o tanstack-virtual: solo renderizar los items visibles en el viewport.',
          en: 'Virtualization with react-window or tanstack-virtual: only render items visible in the viewport.',
        },
        score: 3,
      },
      {
        id: 'react-perf-1b',
        text: {
          es: 'Usar CSS display:none para los items fuera de pantalla.',
          en: 'Use CSS display:none for off-screen items.',
        },
        score: 0,
      },
      {
        id: 'react-perf-1c',
        text: {
          es: 'Agregar key={index} a cada item.',
          en: 'Add key={index} to each item.',
        },
        score: 0,
      },
      {
        id: 'react-perf-1d',
        text: {
          es: 'Paginación en el frontend dividiendo el array en páginas.',
          en: 'Frontend pagination by splitting the array into pages.',
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
          es: 'Code splitting con React.lazy() + Suspense para cargar rutas bajo demanda.',
          en: 'Code splitting with React.lazy() + Suspense to load routes on demand.',
        },
        score: 3,
      },
      {
        id: 'react-perf-2b',
        text: {
          es: 'Minificar el código con Terser.',
          en: 'Minify code with Terser.',
        },
        score: 1,
      },
      {
        id: 'react-perf-2c',
        text: {
          es: 'Mover todo a un CDN.',
          en: 'Move everything to a CDN.',
        },
        score: 0,
      },
      {
        id: 'react-perf-2d',
        text: {
          es: 'Usar PureComponent en todos los componentes.',
          en: 'Use PureComponent on all components.',
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
          es: 'Separar el Context en múltiples providers más pequeños (uno por slice de estado) o migrar a Zustand con selectores.',
          en: 'Split Context into multiple smaller providers (one per state slice) or migrate to Zustand with selectors.',
        },
        score: 3,
      },
      {
        id: 'react-perf-3b',
        text: {
          es: 'Envolver todo en React.memo.',
          en: 'Wrap everything in React.memo.',
        },
        score: 1,
      },
      {
        id: 'react-perf-3c',
        text: {
          es: 'Usar useRef en vez de useState para el valor del Context.',
          en: 'Use useRef instead of useState for the Context value.',
        },
        score: 1,
      },
      {
        id: 'react-perf-3d',
        text: {
          es: 'Mover el state a window para evitar re-renders.',
          en: 'Move state to window to avoid re-renders.',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];
