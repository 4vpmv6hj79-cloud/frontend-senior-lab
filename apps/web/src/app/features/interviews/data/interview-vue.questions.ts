import type { InterviewQuestion } from '../models/interview.model';

export const VUE_INTERVIEW_QUESTIONS: readonly InterviewQuestion[] = [
  {
    id: 'vue-int-composition-api',
    category: 'vue',
    difficulty: 'senior',
    question: {
      es: 'Tu equipo tiene una app Vue 2 grande con Options API y mixins por todas partes. ¿Cómo migras a Composition API sin detener el desarrollo?',
      en: 'Your team has a large Vue 2 app with Options API and mixins everywhere. How do you migrate to Composition API without stopping development?',
    },
    scenario: {
      es: 'App de logística con 100+ componentes. Usa Vue 2.7 con @vue/composition-api shim. Los mixins causan conflictos de nombres y bugs difíciles de rastrear.',
      en: 'Logistics app with 100+ components. Uses Vue 2.7 with @vue/composition-api shim. Mixins cause naming conflicts and hard-to-trace bugs.',
    },
    answer: {
      es: '1) Primero migrar a Vue 2.7 (ya tiene Composition API nativa). 2) Crear composables equivalentes para cada mixin existente. 3) Regla: componentes nuevos SOLO con <script setup>. 4) Migrar componentes existentes gradualmente: empezar por los más usados/buggy. 5) Cada PR migra 1-2 componentes, no mega-refactors. 6) Los mixins se deprecan pero no se borran hasta que nadie los use. 7) Después de migrar 80% de componentes, planear el salto a Vue 3.',
      en: '1) First migrate to Vue 2.7 (already has native Composition API). 2) Create equivalent composables for each existing mixin. 3) Rule: new components ONLY with <script setup>. 4) Migrate existing components gradually: start with most used/buggy ones. 5) Each PR migrates 1-2 components, no mega-refactors. 6) Mixins are deprecated but not deleted until nobody uses them. 7) After migrating 80% of components, plan the Vue 3 jump.',
    },
    keyPoints: [
      { es: 'Composables reemplazan mixins sin conflictos de nombres.', en: 'Composables replace mixins without naming conflicts.' },
      { es: 'Migración gradual: nuevos en Composition, viejos se migran en PRs.', en: 'Gradual migration: new ones in Composition, old ones migrate in PRs.' },
      { es: 'Vue 2.7 como puente hacia Vue 3.', en: 'Vue 2.7 as a bridge to Vue 3.' },
    ],
    followUps: [
      { es: '¿Cómo manejas composables que necesitan acceso al router o store?', en: 'How do you handle composables that need router or store access?' },
      { es: '¿Cuándo un composable es demasiado grande?', en: 'When is a composable too large?' },
    ],
    tip: {
      es: 'Los mixins son la razón #1 por la que se creó la Composition API. Si demuestras que entiendes POR QUÉ, no solo CÓMO migrar, te diferencias.',
      en: 'Mixins are the #1 reason the Composition API was created. If you show you understand WHY, not just HOW to migrate, you stand out.',
    },
  },
  {
    id: 'vue-int-pinia-architecture',
    category: 'vue',
    difficulty: 'advanced',
    question: {
      es: 'Diseñas una app Vue con 8 stores de Pinia. ¿Cómo evitas que se vuelvan un espagueti de dependencias cruzadas?',
      en: 'You design a Vue app with 8 Pinia stores. How do you prevent them from becoming a spaghetti of cross-dependencies?',
    },
    scenario: {
      es: 'Marketplace con stores para: auth, products, cart, orders, notifications, search, ui, favorites. Varios stores necesitan datos de otros.',
      en: 'Marketplace with stores for: auth, products, cart, orders, notifications, search, ui, favorites. Several stores need data from others.',
    },
    answer: {
      es: '1) Regla: un store NUNCA importa otro store directamente. 2) Si un store necesita datos de otro, el componente pasa los datos como parámetro a la action. 3) Para reacciones cruzadas (ej: "al hacer logout, limpiar el cart"), usar un composable mediador o eventos. 4) Stores divididos por dominio, no por tipo de dato. 5) Cada store tiene una API pública clara: solo getters y actions, state es privado. 6) Para datos derivados de múltiples stores, usar computed en el componente.',
      en: '1) Rule: a store NEVER directly imports another store. 2) If a store needs data from another, the component passes data as a parameter to the action. 3) For cross-reactions (e.g., "on logout, clear cart"), use a mediator composable or events. 4) Stores split by domain, not by data type. 5) Each store has a clear public API: only getters and actions, state is private. 6) For derived data from multiple stores, use computed in the component.',
    },
    keyPoints: [
      { es: 'Stores no se importan entre sí — el componente es el mediador.', en: 'Stores don\'t import each other — the component is the mediator.' },
      { es: 'Dividir por dominio de negocio, no por tipo de dato.', en: 'Split by business domain, not by data type.' },
      { es: 'API pública clara: getters + actions.', en: 'Clear public API: getters + actions.' },
    ],
    followUps: [
      { es: '¿Cuándo sí es aceptable que un store use otro?', en: 'When IS it acceptable for a store to use another?' },
      { es: '¿Cómo pruebas un store aisladamente?', en: 'How do you test a store in isolation?' },
    ],
    tip: {
      es: 'Los entrevistadores buscan que entiendas acoplamiento. Si todos tus stores se conocen entre sí, no has ganado nada sobre un state global monolítico.',
      en: 'Interviewers look for coupling understanding. If all your stores know each other, you haven\'t gained anything over a monolithic global state.',
    },
  },
  {
    id: 'vue-int-nuxt-ssr',
    category: 'vue',
    difficulty: 'advanced',
    question: {
      es: 'Tu landing page en Nuxt tiene un LCP de 5 segundos. El servidor responde rápido pero el HTML llega vacío y se hidrata tarde. ¿Qué está mal?',
      en: 'Your Nuxt landing page has a 5 second LCP. The server responds fast but the HTML arrives empty and hydrates late. What is wrong?',
    },
    scenario: {
      es: 'SaaS B2B. La landing necesita buen SEO. Usa Nuxt 3 con SSR pero el HTML que llega al cliente está casi vacío (solo el shell).',
      en: 'B2B SaaS. The landing needs good SEO. Uses Nuxt 3 with SSR but the HTML arriving at the client is almost empty (just the shell).',
    },
    answer: {
      es: '1) El data fetching probablemente está en onMounted (client-side) en vez de useAsyncData/useFetch (server-side). 2) Mover todo el data fetching a useAsyncData() o useFetch() — estos se ejecutan en el servidor y el HTML llega con contenido. 3) Verificar que no hay lazy: true en componentes above-the-fold. 4) Revisar si hay un plugin que bloquea la hidratación. 5) Usar <NuxtImg> para imágenes con optimización automática. 6) Prerender las páginas estáticas con routeRules.',
      en: '1) Data fetching is probably in onMounted (client-side) instead of useAsyncData/useFetch (server-side). 2) Move all data fetching to useAsyncData() or useFetch() — these execute on the server and HTML arrives with content. 3) Verify there is no lazy: true on above-the-fold components. 4) Check if a plugin is blocking hydration. 5) Use <NuxtImg> for images with automatic optimization. 6) Prerender static pages with routeRules.',
    },
    keyPoints: [
      { es: 'useAsyncData/useFetch se ejecutan en servidor → HTML con contenido.', en: 'useAsyncData/useFetch execute on server → HTML with content.' },
      { es: 'onMounted = client-only = HTML vacío en primer paint.', en: 'onMounted = client-only = empty HTML on first paint.' },
      { es: 'routeRules para prerender páginas que no cambian.', en: 'routeRules to prerender pages that don\'t change.' },
    ],
    followUps: [
      { es: '¿Cuál es la diferencia entre SSR, SSG y ISR en Nuxt?', en: 'What is the difference between SSR, SSG, and ISR in Nuxt?' },
      { es: '¿Cómo debugeas errores de hidratación?', en: 'How do you debug hydration errors?' },
    ],
    tip: {
      es: 'El 90% de los problemas de SSR con Nuxt son data fetching en el lugar incorrecto. Si el contenido no está en el HTML inicial, no es SSR — es SPA con extra steps.',
      en: '90% of SSR problems with Nuxt are data fetching in the wrong place. If content is not in the initial HTML, it is not SSR — it\'s SPA with extra steps.',
    },
  },
  {
    id: 'vue-int-composable-testing',
    category: 'vue',
    difficulty: 'intermediate',
    question: {
      es: 'Tienes un composable useCart() con ref, computed y watch. ¿Cómo lo pruebas aisladamente sin montar un componente?',
      en: 'You have a useCart() composable with ref, computed, and watch. How do you test it in isolation without mounting a component?',
    },
    scenario: {
      es: 'E-commerce. El composable maneja items, total, descuentos y sincroniza con localStorage. El equipo quiere 100% de cobertura en la lógica de negocio.',
      en: 'E-commerce. The composable manages items, total, discounts, and syncs with localStorage. The team wants 100% coverage on business logic.',
    },
    answer: {
      es: '1) Crear un wrapper mínimo: const wrapper = mount(defineComponent({ setup() { return useCart(); } })). 2) O usar @vue/test-utils: const result = withSetup(() => useCart()). 3) Para watchers: usar await nextTick() después de cambiar valores. 4) Mockear localStorage con vi.stubGlobal. 5) Probar: addItem → total cambia, removeItem → items se reduce, descuento se aplica cuando total > X. 6) Verificar que localStorage se sincroniza (spy en setItem).',
      en: '1) Create a minimal wrapper: const wrapper = mount(defineComponent({ setup() { return useCart(); } })). 2) Or use @vue/test-utils: const result = withSetup(() => useCart()). 3) For watchers: use await nextTick() after changing values. 4) Mock localStorage with vi.stubGlobal. 5) Test: addItem → total changes, removeItem → items reduces, discount applies when total > X. 6) Verify localStorage syncs (spy on setItem).',
    },
    keyPoints: [
      { es: 'Composables necesitan un contexto de setup para funcionar.', en: 'Composables need a setup context to work.' },
      { es: 'nextTick() para esperar a que watchers se ejecuten.', en: 'nextTick() to wait for watchers to execute.' },
      { es: 'Mockear efectos secundarios (localStorage, API) con vi.stub.', en: 'Mock side effects (localStorage, API) with vi.stub.' },
    ],
    followUps: [
      { es: '¿Cuándo un composable es demasiado complejo para testear aislado?', en: 'When is a composable too complex to test in isolation?' },
      { es: '¿Integration test o unit test para composables?', en: 'Integration test or unit test for composables?' },
    ],
    tip: {
      es: 'Si no puedes testear un composable sin montar media app, probablemente tiene demasiadas responsabilidades y debería dividirse.',
      en: 'If you can\'t test a composable without mounting half the app, it probably has too many responsibilities and should be split.',
    },
  },
  {
    id: 'vue-int-performance',
    category: 'vue',
    difficulty: 'senior',
    question: {
      es: 'Una lista reactiva con 2000 items causa lag al escribir en un input de búsqueda. ¿Cómo optimizas sin perder reactividad?',
      en: 'A reactive list with 2000 items causes lag when typing in a search input. How do you optimize without losing reactivity?',
    },
    scenario: {
      es: 'Dashboard administrativo. La lista se filtra en tiempo real mientras el usuario escribe. Cada item tiene 8 propiedades y badges calculados.',
      en: 'Admin dashboard. The list filters in real-time as the user types. Each item has 8 properties and calculated badges.',
    },
    answer: {
      es: '1) shallowRef para la lista si no necesitas reactividad profunda en cada item. 2) v-memo para cachear renderizado de items que no cambian. 3) Debounce en el input de búsqueda (200-300ms). 4) computed para la lista filtrada (es lazy, solo recalcula cuando la dependencia cambia). 5) Virtual scrolling con vue-virtual-scroller si la lista renderizada sigue siendo grande. 6) Si el filtrado es pesado, moverlo a un Web Worker. 7) Evitar v-if complejos dentro del v-for.',
      en: '1) shallowRef for the list if you don\'t need deep reactivity on each item. 2) v-memo to cache rendering of items that don\'t change. 3) Debounce on the search input (200-300ms). 4) computed for the filtered list (it\'s lazy, only recalculates when dependency changes). 5) Virtual scrolling with vue-virtual-scroller if the rendered list is still large. 6) If filtering is heavy, move it to a Web Worker. 7) Avoid complex v-if inside v-for.',
    },
    keyPoints: [
      { es: 'shallowRef + v-memo = menos tracking reactivo = más rápido.', en: 'shallowRef + v-memo = less reactive tracking = faster.' },
      { es: 'Debounce para evitar filtrar en cada keystroke.', en: 'Debounce to avoid filtering on every keystroke.' },
      { es: 'Virtual scrolling si la lista filtrada sigue siendo grande.', en: 'Virtual scrolling if the filtered list is still large.' },
    ],
    followUps: [
      { es: '¿Cuándo usar shallowRef vs ref vs reactive?', en: 'When to use shallowRef vs ref vs reactive?' },
      { es: '¿v-memo funciona bien con keys dinámicos?', en: 'Does v-memo work well with dynamic keys?' },
    ],
    tip: {
      es: 'Vue es reactivo por defecto (deep). A nivel senior se espera que sepas cuándo desactivar la reactividad profunda para ganar rendimiento.',
      en: 'Vue is reactive by default (deep). At senior level you\'re expected to know when to disable deep reactivity for performance.',
    },
  },
];
