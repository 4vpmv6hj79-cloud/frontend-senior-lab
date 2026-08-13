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
          es: 'Es más rápida en runtime.',
          en: 'It is faster at runtime.',
        },
        score: 0,
      },
      {
        id: 'vue-1b',
        text: {
          es: 'Permite agrupar lógica por funcionalidad (composables) en vez de por tipo (data, methods, computed), facilitando reutilización y testing.',
          en: 'It allows grouping logic by functionality (composables) instead of by type (data, methods, computed), enabling reuse and testing.',
        },
        score: 3,
      },
      {
        id: 'vue-1c',
        text: {
          es: 'Elimina la necesidad de usar templates.',
          en: 'It removes the need to use templates.',
        },
        score: 0,
      },
      {
        id: 'vue-1d',
        text: {
          es: 'Reemplaza completamente Vuex/Pinia.',
          en: 'It completely replaces Vuex/Pinia.',
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
          es: 'No, ref() solo es reactivo para el valor raíz.',
          en: 'No, ref() is only reactive for the root value.',
        },
        score: 1,
      },
      {
        id: 'vue-2b',
        text: {
          es: 'Sí, porque Vue 3 usa Proxy para reactividad profunda por defecto (deep reactivity). Para evitarlo usarías shallowRef().',
          en: 'Yes, because Vue 3 uses Proxy for deep reactivity by default. To avoid it you would use shallowRef().',
        },
        score: 3,
      },
      {
        id: 'vue-2c',
        text: {
          es: 'Solo si usas reactive() en vez de ref().',
          en: 'Only if you use reactive() instead of ref().',
        },
        score: 1,
      },
      {
        id: 'vue-2d',
        text: {
          es: 'Solo si llamas a forceUpdate() después.',
          en: 'Only if you call forceUpdate() afterwards.',
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
          es: 'Una función que retorna refs reactivas (data, loading, error) y se ejecuta al ser llamada. Usar onUnmounted para cleanup.',
          en: 'A function that returns reactive refs (data, loading, error) and executes when called. Use onUnmounted for cleanup.',
        },
        score: 3,
      },
      {
        id: 'vue-3b',
        text: {
          es: 'Un mixin global que agrega data y methods.',
          en: 'A global mixin that adds data and methods.',
        },
        score: 0,
      },
      {
        id: 'vue-3c',
        text: {
          es: 'Una clase con decorators que extiende de Vue.',
          en: 'A class with decorators that extends Vue.',
        },
        score: 0,
      },
      {
        id: 'vue-3d',
        text: {
          es: 'Usar provide/inject para compartir el estado del fetch.',
          en: 'Use provide/inject to share the fetch state.',
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
          es: 'defineProps<{ count: number }>() sin defaults posibles.',
          en: 'defineProps<{ count: number }>() with no possible defaults.',
        },
        score: 1,
      },
      {
        id: 'vue-ts-1b',
        text: {
          es: 'withDefaults(defineProps<{ count?: number }>(), { count: 0 }) para combinar tipos genéricos con valores por defecto.',
          en: 'withDefaults(defineProps<{ count?: number }>(), { count: 0 }) to combine generic types with default values.',
        },
        score: 3,
      },
      {
        id: 'vue-ts-1c',
        text: {
          es: 'props: { count: { type: Number, default: 0 } } como en Options API.',
          en: 'props: { count: { type: Number, default: 0 } } like in Options API.',
        },
        score: 1,
      },
      {
        id: 'vue-ts-1d',
        text: {
          es: 'Usar any y validar manualmente en onMounted.',
          en: 'Use any and validate manually in onMounted.',
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
          es: 'defineEmits<{ (e: "update", value: string): void; (e: "delete", id: number): void }>() con overloads tipados.',
          en: 'defineEmits<{ (e: "update", value: string): void; (e: "delete", id: number): void }>() with typed overloads.',
        },
        score: 3,
      },
      {
        id: 'vue-ts-2b',
        text: {
          es: 'emits: ["update", "delete"] como array de strings.',
          en: 'emits: ["update", "delete"] as an array of strings.',
        },
        score: 1,
      },
      {
        id: 'vue-ts-2c',
        text: {
          es: 'this.$emit("update") sin declarar los emits.',
          en: 'this.$emit("update") without declaring emits.',
        },
        score: 0,
      },
      {
        id: 'vue-ts-2d',
        text: {
          es: 'Usar callbacks como props en vez de emits.',
          en: 'Use callbacks as props instead of emits.',
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
          es: 'Siempre hay que tipar explícitamente.',
          en: 'You always need to type explicitly.',
        },
        score: 0,
      },
      {
        id: 'vue-ts-3b',
        text: {
          es: 'TypeScript infiere bien con valores iniciales concretos. Necesitas tipar cuando el valor inicial es null/undefined o cuando el tipo es más amplio que el inicial (ej: ref<string | null>(null)).',
          en: 'TypeScript infers well with concrete initial values. You need to type when the initial value is null/undefined or when the type is broader than the initial (e.g., ref<string | null>(null)).',
        },
        score: 3,
      },
      {
        id: 'vue-ts-3c',
        text: {
          es: 'Nunca hay que tipar, TypeScript infiere todo.',
          en: 'You never need to type, TypeScript infers everything.',
        },
        score: 0,
      },
      {
        id: 'vue-ts-3d',
        text: {
          es: 'Solo cuando usas reactive() en vez de ref().',
          en: 'Only when using reactive() instead of ref().',
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
          es: 'Es más rápido en runtime.',
          en: 'It is faster at runtime.',
        },
        score: 0,
      },
      {
        id: 'vue-arch-1b',
        text: {
          es: 'API más simple sin mutations, soporte TypeScript nativo, stores modulares sin modules/namespaces, y compatible con Composition API.',
          en: 'Simpler API without mutations, native TypeScript support, modular stores without modules/namespaces, and Composition API compatible.',
        },
        score: 3,
      },
      {
        id: 'vue-arch-1c',
        text: {
          es: 'Pinia reemplaza completamente el sistema de reactividad de Vue.',
          en: 'Pinia completely replaces Vue\'s reactivity system.',
        },
        score: 0,
      },
      {
        id: 'vue-arch-1d',
        text: {
          es: 'Solo funciona con Vue 3, lo que obliga a migrar.',
          en: 'It only works with Vue 3, forcing migration.',
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
          es: 'Siempre — Nuxt es mejor en todos los casos.',
          en: 'Always — Nuxt is better in all cases.',
        },
        score: 0,
      },
      {
        id: 'vue-arch-2b',
        text: {
          es: 'Cuando necesitas SEO (SSR/SSG), file-based routing, auto-imports, o full-stack con server routes.',
          en: 'When you need SEO (SSR/SSG), file-based routing, auto-imports, or full-stack with server routes.',
        },
        score: 3,
      },
      {
        id: 'vue-arch-2c',
        text: {
          es: 'Solo cuando la app tiene más de 100 páginas.',
          en: 'Only when the app has more than 100 pages.',
        },
        score: 1,
      },
      {
        id: 'vue-arch-2d',
        text: {
          es: 'Nunca — agrega complejidad innecesaria.',
          en: 'Never — it adds unnecessary complexity.',
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
          es: 'Usar defineModel() para v-model bidireccional y slots con nombre para proyectar contenido personalizable. Separar lógica de UI.',
          en: 'Use defineModel() for bidirectional v-model and named slots for projecting customizable content. Separate logic from UI.',
        },
        score: 3,
      },
      {
        id: 'vue-arch-3b',
        text: {
          es: 'Usar props y emits manuales para todo.',
          en: 'Use props and manual emits for everything.',
        },
        score: 1,
      },
      {
        id: 'vue-arch-3c',
        text: {
          es: 'Exponer todo con defineExpose y dejar que el padre controle.',
          en: 'Expose everything with defineExpose and let the parent control.',
        },
        score: 0,
      },
      {
        id: 'vue-arch-3d',
        text: {
          es: 'Crear un mixin que agregue la funcionalidad.',
          en: 'Create a mixin that adds the functionality.',
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
          es: 'Vitest + @vue/test-utils o Testing Library para Vue. Probar comportamiento visible, no implementación interna.',
          en: 'Vitest + @vue/test-utils or Testing Library for Vue. Test visible behavior, not internal implementation.',
        },
        score: 3,
      },
      {
        id: 'vue-test-1b',
        text: {
          es: 'Jest + Enzyme para montar componentes.',
          en: 'Jest + Enzyme to mount components.',
        },
        score: 0,
      },
      {
        id: 'vue-test-1c',
        text: {
          es: 'Solo Cypress para probar todo end-to-end.',
          en: 'Only Cypress to test everything end-to-end.',
        },
        score: 1,
      },
      {
        id: 'vue-test-1d',
        text: {
          es: 'Probar manualmente en el navegador.',
          en: 'Test manually in the browser.',
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
          es: 'Llamar al composable dentro de un componente de prueba (wrapper) o usar una helper function que cree el contexto de setup.',
          en: 'Call the composable inside a test component (wrapper) or use a helper function that creates the setup context.',
        },
        score: 3,
      },
      {
        id: 'vue-test-2b',
        text: {
          es: 'Llamar la función directamente sin Vue.',
          en: 'Call the function directly without Vue.',
        },
        score: 1,
      },
      {
        id: 'vue-test-2c',
        text: {
          es: 'Mockear ref() y computed().',
          en: 'Mock ref() and computed().',
        },
        score: 0,
      },
      {
        id: 'vue-test-2d',
        text: {
          es: 'No se pueden probar composables aislados.',
          en: 'Composables cannot be tested in isolation.',
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
          es: 'Usar createTestingPinia() que provee stores con estado inicial controlado y acciones mockeadas automáticamente.',
          en: 'Use createTestingPinia() which provides stores with controlled initial state and auto-mocked actions.',
        },
        score: 3,
      },
      {
        id: 'vue-test-3b',
        text: {
          es: 'Importar el store real y mutar su estado directamente.',
          en: 'Import the real store and mutate its state directly.',
        },
        score: 1,
      },
      {
        id: 'vue-test-3c',
        text: {
          es: 'Mockear el módulo completo de Pinia.',
          en: 'Mock the entire Pinia module.',
        },
        score: 0,
      },
      {
        id: 'vue-test-3d',
        text: {
          es: 'No es necesario aislar — los stores son independientes.',
          en: 'No need to isolate — stores are independent.',
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
          es: 'Usar v-for con :key único estable, shallowRef para la lista si no necesitas reactividad profunda, y v-memo para cachear sub-árboles.',
          en: 'Use v-for with a unique stable :key, shallowRef for the list if deep reactivity is not needed, and v-memo to cache sub-trees.',
        },
        score: 3,
      },
      {
        id: 'vue-perf-1b',
        text: {
          es: 'Usar :key="index" en el v-for.',
          en: 'Use :key="index" in the v-for.',
        },
        score: 0,
      },
      {
        id: 'vue-perf-1c',
        text: {
          es: 'Mover toda la lista a Vuex/Pinia.',
          en: 'Move the entire list to Vuex/Pinia.',
        },
        score: 0,
      },
      {
        id: 'vue-perf-1d',
        text: {
          es: 'Usar computed() para filtrar la lista.',
          en: 'Use computed() to filter the list.',
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
          es: 'defineAsyncComponent() para componentes y () => import() en las rutas de Vue Router. Usar Suspense para loading states.',
          en: 'defineAsyncComponent() for components and () => import() in Vue Router routes. Use Suspense for loading states.',
        },
        score: 3,
      },
      {
        id: 'vue-perf-2b',
        text: {
          es: 'Import todos los componentes en main.ts.',
          en: 'Import all components in main.ts.',
        },
        score: 0,
      },
      {
        id: 'vue-perf-2c',
        text: {
          es: 'Usar v-if para mostrar/ocultar componentes.',
          en: 'Use v-if to show/hide components.',
        },
        score: 1,
      },
      {
        id: 'vue-perf-2d',
        text: {
          es: 'Separar en múltiples HTML files.',
          en: 'Split into multiple HTML files.',
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
          es: 'Demasiados watchers crean overhead. Reemplazar con computed() donde sea posible (son lazy), consolidar watchers relacionados, y usar watchEffect solo cuando necesitas side-effects.',
          en: 'Too many watchers create overhead. Replace with computed() where possible (they are lazy), consolidate related watchers, and use watchEffect only when you need side-effects.',
        },
        score: 3,
      },
      {
        id: 'vue-perf-3b',
        text: {
          es: 'Los watchers no afectan rendimiento.',
          en: 'Watchers do not affect performance.',
        },
        score: 0,
      },
      {
        id: 'vue-perf-3c',
        text: {
          es: 'Usar setTimeout para debounce cada watcher.',
          en: 'Use setTimeout to debounce each watcher.',
        },
        score: 1,
      },
      {
        id: 'vue-perf-3d',
        text: {
          es: 'Mover todo a la Options API que es más eficiente.',
          en: 'Move everything to the Options API which is more efficient.',
        },
        score: 0,
      },
    ],
  },
] as const satisfies readonly DiagnosticQuestion[];
