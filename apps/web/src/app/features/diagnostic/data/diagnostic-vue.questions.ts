import type { DiagnosticQuestion } from '../models/diagnostic.model';

export const VUE_DIAGNOSTIC_QUESTIONS: readonly DiagnosticQuestion[] = [
  // ─── VUE CORE (3 questions) ──────────────────────────────────────────────────
  {
    id: 'vue-composition-vs-options',
    category: 'framework',
    text: {
      es: '¿Cuál es la principal ventaja de la Composition API sobre la Options API en aplicaciones grandes?',
      en: 'What is the main advantage of the Composition API over the Options API in large applications?',
    },
    options: [
      {
        id: 'vue-1a',
        text: {
          es: 'Es más rápida en runtime porque compila a código más optimizado',
          en: 'It is faster at runtime because it compiles to more optimized code',
        },
        score: 0,
      },
      {
        id: 'vue-1b',
        text: {
          es: 'Agrupa lógica por funcionalidad en composables, facilitando reutilización',
          en: 'Groups logic by functionality into composables, enabling reuse',
        },
        score: 3,
      },
      {
        id: 'vue-1c',
        text: {
          es: 'Elimina la necesidad de usar templates al renderizar con JSX puro',
          en: 'Removes the need to use templates by rendering with pure JSX instead',
        },
        score: 0,
      },
      {
        id: 'vue-1d',
        text: {
          es: 'Reemplaza completamente a Vuex y Pinia para gestión de estado',
          en: 'Completely replaces Vuex and Pinia for state management purposes',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'vue-reactivity-deep',
    category: 'framework',
    text: {
      es: 'Tienes un objeto reactivo con ref() y modificas una propiedad anidada directamente. ¿La vista se actualiza?',
      en: 'You have a reactive object with ref() and modify a nested property directly. Does the view update?',
    },
    options: [
      {
        id: 'vue-2a',
        text: {
          es: 'No, ref() solo observa el valor raíz y no propiedades internas',
          en: 'No, ref() only observes the root value and not internal properties',
        },
        score: 1,
      },
      {
        id: 'vue-2b',
        text: {
          es: 'Sí, Vue 3 usa Proxy para reactividad profunda; shallowRef lo evita',
          en: 'Yes, Vue 3 uses Proxy for deep reactivity; shallowRef avoids it',
        },
        score: 3,
      },
      {
        id: 'vue-2c',
        text: {
          es: 'Solo si usas reactive() ya que ref() no soporta objetos anidados',
          en: 'Only if you use reactive() since ref() does not support nested objects',
        },
        score: 1,
      },
      {
        id: 'vue-2d',
        text: {
          es: 'Solo si llamas a forceUpdate() después de modificar la propiedad',
          en: 'Only if you call forceUpdate() after modifying the property value',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'vue-composable-pattern',
    category: 'framework',
    text: {
      es: '¿Cuál es la forma correcta de crear un composable reutilizable que hace fetch de datos?',
      en: 'What is the correct way to create a reusable composable that fetches data?',
    },
    options: [
      {
        id: 'vue-3a',
        text: {
          es: 'Función que retorna refs reactivas (data, loading, error) con cleanup',
          en: 'Function returning reactive refs (data, loading, error) with cleanup',
        },
        score: 3,
      },
      {
        id: 'vue-3b',
        text: {
          es: 'Un mixin global que agrega data y methods al componente que lo use',
          en: 'A global mixin that adds data and methods to the component using it',
        },
        score: 0,
      },
      {
        id: 'vue-3c',
        text: {
          es: 'Una clase con decorators de TypeScript que extiende de Vue base',
          en: 'A class with TypeScript decorators that extends from base Vue class',
        },
        score: 0,
      },
      {
        id: 'vue-3d',
        text: {
          es: 'Usar provide/inject para compartir el estado del fetch con hijos',
          en: 'Use provide/inject to share the fetch state with child components',
        },
        score: 1,
      },
    ],
  },

  // ─── TYPESCRIPT (3 questions) ────────────────────────────────────────────────
  {
    id: 'vue-ts-props-typing',
    category: 'typescript',
    text: {
      es: '¿Cómo defines props tipadas con valores por defecto en un componente Vue 3 con <script setup>?',
      en: 'How do you define typed props with defaults in a Vue 3 component with <script setup>?',
    },
    options: [
      {
        id: 'vue-ts-1a',
        text: {
          es: 'defineProps<{ count: number }>() sin posibilidad de agregar defaults',
          en: 'defineProps<{ count: number }>() without the ability to add defaults',
        },
        score: 1,
      },
      {
        id: 'vue-ts-1b',
        text: {
          es: 'withDefaults(defineProps<Props>(), { count: 0 }) para tipos y defaults',
          en: 'withDefaults(defineProps<Props>(), { count: 0 }) for types and defaults',
        },
        score: 3,
      },
      {
        id: 'vue-ts-1c',
        text: {
          es: 'props: { count: { type: Number, default: 0 } } como en Options API',
          en: 'props: { count: { type: Number, default: 0 } } as in the Options API',
        },
        score: 1,
      },
      {
        id: 'vue-ts-1d',
        text: {
          es: 'Usar any para los tipos y validar manualmente dentro de onMounted',
          en: 'Use any for the types and validate manually inside the onMounted hook',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'vue-ts-emits',
    category: 'typescript',
    text: {
      es: '¿Cómo tipas correctamente los emits de un componente para que el padre tenga autocompletado?',
      en: 'How do you correctly type a component\'s emits so the parent gets autocomplete?',
    },
    options: [
      {
        id: 'vue-ts-2a',
        text: {
          es: 'defineEmits con overloads tipados para cada evento y su payload',
          en: 'defineEmits with typed overloads for each event and its payload',
        },
        score: 3,
      },
      {
        id: 'vue-ts-2b',
        text: {
          es: 'emits: ["update", "delete"] como un array de strings sin tipar',
          en: 'emits: ["update", "delete"] as an untyped array of string names',
        },
        score: 1,
      },
      {
        id: 'vue-ts-2c',
        text: {
          es: 'this.$emit("update") sin declarar los emits en el componente',
          en: 'this.$emit("update") without declaring emits in the component',
        },
        score: 0,
      },
      {
        id: 'vue-ts-2d',
        text: {
          es: 'Usar callbacks tipados como props en lugar de emits del sistema',
          en: 'Use typed callbacks as props instead of using the emit system',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'vue-ts-ref-typing',
    category: 'typescript',
    text: {
      es: '¿Cuándo necesitas tipar explícitamente un ref() y cuándo TypeScript lo infiere correctamente?',
      en: 'When do you need to explicitly type a ref() and when does TypeScript infer it correctly?',
    },
    options: [
      {
        id: 'vue-ts-3a',
        text: {
          es: 'Siempre hay que tipar explícitamente cada ref para evitar errores',
          en: 'You always need to explicitly type every ref to avoid type errors',
        },
        score: 0,
      },
      {
        id: 'vue-ts-3b',
        text: {
          es: 'Infiere con valores concretos; tipar cuando es null o tipo amplio',
          en: 'It infers with concrete values; type when null or broader type',
        },
        score: 3,
      },
      {
        id: 'vue-ts-3c',
        text: {
          es: 'Nunca hay que tipar porque TypeScript infiere todo correctamente',
          en: 'You never need to type because TypeScript infers all correctly',
        },
        score: 0,
      },
      {
        id: 'vue-ts-3d',
        text: {
          es: 'Solo cuando usas reactive() ya que ref() infiere automáticamente',
          en: 'Only when using reactive() since ref() always infers automatically',
        },
        score: 1,
      },
    ],
  },

  // ─── ARCHITECTURE (3 questions) ─────────────────────────────────────────────
  {
    id: 'vue-arch-pinia',
    category: 'architecture',
    text: {
      es: '¿Cuál es la ventaja de Pinia sobre Vuex para manejar estado global en Vue 3?',
      en: 'What is the advantage of Pinia over Vuex for global state management in Vue 3?',
    },
    options: [
      {
        id: 'vue-arch-1a',
        text: {
          es: 'Es más rápido en runtime gracias a su sistema de caché interno',
          en: 'It is faster at runtime thanks to its internal caching system',
        },
        score: 0,
      },
      {
        id: 'vue-arch-1b',
        text: {
          es: 'API simple sin mutations, TypeScript nativo y stores modulares',
          en: 'Simple API without mutations, native TypeScript and modular stores',
        },
        score: 3,
      },
      {
        id: 'vue-arch-1c',
        text: {
          es: 'Pinia reemplaza el sistema de reactividad de Vue por completo',
          en: 'Pinia completely replaces the Vue reactivity system entirely',
        },
        score: 0,
      },
      {
        id: 'vue-arch-1d',
        text: {
          es: 'Solo funciona con Vue 3 lo que obliga a migrar toda la app',
          en: 'Only works with Vue 3 which forces migrating the entire app',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'vue-arch-nuxt',
    category: 'architecture',
    text: {
      es: '¿Cuándo elegirías Nuxt sobre una app Vue SPA pura?',
      en: 'When would you choose Nuxt over a pure Vue SPA?',
    },
    options: [
      {
        id: 'vue-arch-2a',
        text: {
          es: 'Siempre conviene porque Nuxt es superior a Vue puro en todo',
          en: 'Always recommended because Nuxt is superior to pure Vue in all',
        },
        score: 0,
      },
      {
        id: 'vue-arch-2b',
        text: {
          es: 'Cuando necesitas SEO con SSR/SSG, file-based routing o full-stack',
          en: 'When you need SEO with SSR/SSG, file-based routing, or full-stack',
        },
        score: 3,
      },
      {
        id: 'vue-arch-2c',
        text: {
          es: 'Solo cuando la aplicación supera las 100 páginas de contenido',
          en: 'Only when the application exceeds 100 pages of content in total',
        },
        score: 1,
      },
      {
        id: 'vue-arch-2d',
        text: {
          es: 'Nunca porque agrega complejidad innecesaria a cualquier proyecto',
          en: 'Never because it adds unnecessary complexity to any project setup',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'vue-arch-component-design',
    category: 'architecture',
    text: {
      es: '¿Cómo diseñas un componente Vue reutilizable que funcione tanto con v-model como con slots?',
      en: 'How do you design a reusable Vue component that works with both v-model and slots?',
    },
    options: [
      {
        id: 'vue-arch-3a',
        text: {
          es: 'defineModel() para binding bidireccional y named slots para contenido',
          en: 'defineModel() for bidirectional binding and named slots for content',
        },
        score: 3,
      },
      {
        id: 'vue-arch-3b',
        text: {
          es: 'Usar props y emits manuales para controlar todo el flujo de datos',
          en: 'Use props and manual emits to control all data flow in components',
        },
        score: 1,
      },
      {
        id: 'vue-arch-3c',
        text: {
          es: 'Exponer todo con defineExpose y dejar que el padre lo controle',
          en: 'Expose everything with defineExpose and let the parent control it',
        },
        score: 0,
      },
      {
        id: 'vue-arch-3d',
        text: {
          es: 'Crear un mixin que agregue la funcionalidad de modelo y slots',
          en: 'Create a mixin that adds model and slots functionality to it',
        },
        score: 0,
      },
    ],
  },

  // ─── TESTING (3 questions) ───────────────────────────────────────────────────
  {
    id: 'vue-test-component',
    category: 'testing',
    text: {
      es: '¿Cuál es la herramienta recomendada para probar componentes Vue 3 y qué enfoque usarías?',
      en: 'What is the recommended tool for testing Vue 3 components and what approach would you use?',
    },
    options: [
      {
        id: 'vue-test-1a',
        text: {
          es: 'Vitest + vue/test-utils o Testing Library, probando comportamiento',
          en: 'Vitest + vue/test-utils or Testing Library, testing behavior only',
        },
        score: 3,
      },
      {
        id: 'vue-test-1b',
        text: {
          es: 'Jest junto con Enzyme para montar y verificar los componentes',
          en: 'Jest together with Enzyme to mount and verify the components',
        },
        score: 0,
      },
      {
        id: 'vue-test-1c',
        text: {
          es: 'Solo Cypress para hacer pruebas end-to-end de toda la aplicación',
          en: 'Only Cypress for running end-to-end tests of the full application',
        },
        score: 1,
      },
      {
        id: 'vue-test-1d',
        text: {
          es: 'Probar manualmente en el navegador revisando cada interacción',
          en: 'Test manually in the browser by checking each user interaction',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'vue-test-composable',
    category: 'testing',
    text: {
      es: '¿Cómo pruebas un composable que usa ref(), computed() y watch()?',
      en: 'How do you test a composable that uses ref(), computed(), and watch()?',
    },
    options: [
      {
        id: 'vue-test-2a',
        text: {
          es: 'Llamarlo dentro de un wrapper de prueba que cree el contexto setup',
          en: 'Call it inside a test wrapper that creates the setup context for it',
        },
        score: 3,
      },
      {
        id: 'vue-test-2b',
        text: {
          es: 'Llamar la función directamente sin contexto de Vue ni componente',
          en: 'Call the function directly without Vue context or any component',
        },
        score: 1,
      },
      {
        id: 'vue-test-2c',
        text: {
          es: 'Mockear ref() y computed() para simular el comportamiento reactivo',
          en: 'Mock ref() and computed() to simulate the reactive behavior fully',
        },
        score: 0,
      },
      {
        id: 'vue-test-2d',
        text: {
          es: 'No se pueden probar composables aislados del componente padre',
          en: 'Composables cannot be tested in isolation from parent components',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'vue-test-pinia',
    category: 'testing',
    text: {
      es: '¿Cómo aíslas un Pinia store en los tests de un componente?',
      en: 'How do you isolate a Pinia store in component tests?',
    },
    options: [
      {
        id: 'vue-test-3a',
        text: {
          es: 'createTestingPinia() con estado inicial controlado y mocks automáticos',
          en: 'createTestingPinia() with controlled initial state and auto mocks',
        },
        score: 3,
      },
      {
        id: 'vue-test-3b',
        text: {
          es: 'Importar el store real y mutar su estado directamente en el test',
          en: 'Import the real store and mutate its state directly in the test',
        },
        score: 1,
      },
      {
        id: 'vue-test-3c',
        text: {
          es: 'Mockear el módulo completo de Pinia usando vi.mock en el archivo',
          en: 'Mock the entire Pinia module using vi.mock within the test file',
        },
        score: 0,
      },
      {
        id: 'vue-test-3d',
        text: {
          es: 'No es necesario aislar los stores porque son totalmente independientes',
          en: 'No need to isolate stores because they are completely independent',
        },
        score: 0,
      },
    ],
  },

  // ─── PERFORMANCE (3 questions) ──────────────────────────────────────────────
  {
    id: 'vue-perf-reactivity',
    category: 'performance',
    text: {
      es: 'Un componente Vue con una lista de 500 items se re-renderiza completamente al cambiar un solo item. ¿Cómo optimizas?',
      en: 'A Vue component with a 500-item list re-renders entirely when a single item changes. How do you optimize?',
    },
    options: [
      {
        id: 'vue-perf-1a',
        text: {
          es: 'v-for con :key estable, shallowRef para la lista y v-memo para caché',
          en: 'v-for with stable :key, shallowRef for the list, and v-memo for cache',
        },
        score: 3,
      },
      {
        id: 'vue-perf-1b',
        text: {
          es: 'Usar :key="index" en el v-for para que Vue rastree los elementos',
          en: 'Use :key="index" in v-for so that Vue can track each list element',
        },
        score: 0,
      },
      {
        id: 'vue-perf-1c',
        text: {
          es: 'Mover toda la lista a Vuex o Pinia para centralizar las mutaciones',
          en: 'Move the entire list to Vuex or Pinia to centralize all mutations',
        },
        score: 0,
      },
      {
        id: 'vue-perf-1d',
        text: {
          es: 'Usar computed() para filtrar la lista y reducir items renderizados',
          en: 'Use computed() to filter the list and reduce rendered item count',
        },
        score: 1,
      },
    ],
  },
  {
    id: 'vue-perf-lazy',
    category: 'performance',
    text: {
      es: '¿Cómo implementas lazy loading de rutas y componentes pesados en Vue 3?',
      en: 'How do you implement lazy loading of routes and heavy components in Vue 3?',
    },
    options: [
      {
        id: 'vue-perf-2a',
        text: {
          es: 'defineAsyncComponent y dynamic import en rutas con Suspense para UX',
          en: 'defineAsyncComponent and dynamic import in routes with Suspense for UX',
        },
        score: 3,
      },
      {
        id: 'vue-perf-2b',
        text: {
          es: 'Importar todos los componentes en main.ts para tenerlos disponibles',
          en: 'Import all components in main.ts to have them available everywhere',
        },
        score: 0,
      },
      {
        id: 'vue-perf-2c',
        text: {
          es: 'Usar v-if para mostrar y ocultar componentes según sea necesario',
          en: 'Use v-if to show and hide components as needed by the user flow',
        },
        score: 1,
      },
      {
        id: 'vue-perf-2d',
        text: {
          es: 'Separar la app en múltiples archivos HTML para cargar por partes',
          en: 'Split the app into multiple HTML files to load them in separate parts',
        },
        score: 0,
      },
    ],
  },
  {
    id: 'vue-perf-watchers',
    category: 'performance',
    text: {
      es: 'Tienes 20 watchers en un componente y el rendimiento es malo. ¿Cuál es el problema y cómo lo solucionas?',
      en: 'You have 20 watchers in a component and performance is bad. What is the problem and how do you fix it?',
    },
    options: [
      {
        id: 'vue-perf-3a',
        text: {
          es: 'Reemplazar con computed (lazy), consolidar watchers relacionados',
          en: 'Replace with computed (lazy), consolidate related watchers together',
        },
        score: 3,
      },
      {
        id: 'vue-perf-3b',
        text: {
          es: 'Los watchers no afectan el rendimiento porque son asíncronos',
          en: 'Watchers do not affect performance because they are asynchronous',
        },
        score: 0,
      },
      {
        id: 'vue-perf-3c',
        text: {
          es: 'Usar setTimeout para aplicar debounce a cada watcher del componente',
          en: 'Use setTimeout to apply debounce to each watcher in the component',
        },
        score: 1,
      },
      {
        id: 'vue-perf-3d',
        text: {
          es: 'Mover todo a la Options API que es más eficiente con watchers',
          en: 'Move everything to the Options API which is more efficient overall',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];
