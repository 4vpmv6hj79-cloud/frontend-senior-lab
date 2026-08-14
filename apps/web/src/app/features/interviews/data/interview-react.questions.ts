import type { InterviewQuestion } from '../models/interview.model';

export const REACT_INTERVIEW_QUESTIONS: readonly InterviewQuestion[] = [
  {
    id: 'react-int-hooks-architecture',
    category: 'react',
    difficulty: 'senior',
    question: {
      es: 'Tu app React tiene 15 custom hooks compartidos entre 40+ componentes. Varios hooks dependen entre sí y el rendimiento empeora. ¿Cómo reorganizas?',
      en: 'Your React app has 15 custom hooks shared across 40+ components. Several hooks depend on each other and performance degrades. How do you reorganize?',
    },
    scenario: {
      es: 'Startup de fintech. La app creció orgánicamente y nadie definió una arquitectura de hooks. Hay hooks que llaman a otros hooks que llaman a otros hooks (3+ niveles de anidación).',
      en: 'Fintech startup. The app grew organically and nobody defined a hooks architecture. There are hooks calling other hooks calling other hooks (3+ nesting levels).',
    },
    answer: {
      es: 'Clasificaría los hooks en capas: 1) Hooks de infraestructura (useDebounce, useLocalStorage) — sin dependencias entre sí. 2) Hooks de dominio (useAuth, useCart) — pueden depender de infra pero no entre ellos. 3) Hooks de UI (useFormValidation, useTableSort) — específicos de un componente. Separaría estado servidor (React Query) del estado cliente (Zustand). Cada hook debe tener un solo propósito y máximo 1 nivel de composición.',
      en: 'I would classify hooks in layers: 1) Infrastructure hooks (useDebounce, useLocalStorage) — no dependencies between them. 2) Domain hooks (useAuth, useCart) — can depend on infra but not on each other. 3) UI hooks (useFormValidation, useTableSort) — specific to a component. I would separate server state (React Query) from client state (Zustand). Each hook should have a single purpose and max 1 level of composition.',
    },
    keyPoints: [
      { es: 'Separar hooks por capas (infra → dominio → UI).', en: 'Separate hooks by layers (infra → domain → UI).' },
      { es: 'Estado servidor (React Query) vs. estado cliente (Zustand).', en: 'Server state (React Query) vs. client state (Zustand).' },
      { es: 'Máximo 1 nivel de composición entre hooks.', en: 'Max 1 level of composition between hooks.' },
    ],
    followUps: [
      { es: '¿Cómo evitas re-renders innecesarios cuando un hook cambia?', en: 'How do you avoid unnecessary re-renders when a hook changes?' },
      { es: '¿Cuándo un custom hook debería ser una función normal?', en: 'When should a custom hook be a regular function?' },
    ],
    tip: {
      es: 'Los entrevistadores quieren ver que piensas en separación de responsabilidades. Un hook que hace fetch + transforma + cachea + valida está haciendo demasiado.',
      en: 'Interviewers want to see you think about separation of concerns. A hook that fetches + transforms + caches + validates is doing too much.',
    },
  },
  {
    id: 'react-int-server-components',
    category: 'react',
    difficulty: 'advanced',
    question: {
      es: 'Tu equipo quiere migrar a React Server Components pero la app actual usa mucho Context y hooks de estado. ¿Cómo planeas la migración?',
      en: 'Your team wants to migrate to React Server Components but the current app heavily uses Context and state hooks. How do you plan the migration?',
    },
    scenario: {
      es: 'E-commerce con Next.js. Actualmente todo es Client Components. El CTO vio que RSC mejora el performance pero el equipo no sabe por dónde empezar.',
      en: 'E-commerce with Next.js. Currently everything is Client Components. The CTO saw RSC improves performance but the team doesn\'t know where to start.',
    },
    answer: {
      es: 'Migración progresiva: 1) Identificar componentes que NO usan hooks ni eventos (headers, footers, listas estáticas) → esos son RSC inmediatos. 2) Crear un "boundary" con "use client" solo donde se necesite interactividad. 3) Mover data fetching a RSC (acceso directo a DB/APIs). 4) Reemplazar Context global por props drilling en RSC + Context solo dentro de client boundaries. 5) Empezar por las páginas con más tráfico (mayor impacto en performance).',
      en: 'Progressive migration: 1) Identify components that DON\'T use hooks or events (headers, footers, static lists) → those are immediate RSC. 2) Create a "boundary" with "use client" only where interactivity is needed. 3) Move data fetching to RSC (direct DB/API access). 4) Replace global Context with props drilling in RSC + Context only within client boundaries. 5) Start with highest-traffic pages (greatest performance impact).',
    },
    keyPoints: [
      { es: 'RSC por defecto, "use client" solo donde hay interactividad.', en: 'RSC by default, "use client" only where there is interactivity.' },
      { es: 'Data fetching directo en el servidor (sin useEffect).', en: 'Direct data fetching on the server (no useEffect).' },
      { es: 'Migración progresiva empezando por componentes estáticos.', en: 'Progressive migration starting with static components.' },
    ],
    followUps: [
      { es: '¿Cómo manejas autenticación con RSC?', en: 'How do you handle authentication with RSC?' },
      { es: '¿Qué pasa con las librerías de terceros que no soportan RSC?', en: 'What happens with third-party libraries that don\'t support RSC?' },
    ],
    tip: {
      es: 'Demuestra que entiendes la diferencia entre server y client. El error #1 es poner "use client" en todo — eso anula los beneficios de RSC.',
      en: 'Show you understand the difference between server and client. Mistake #1 is putting "use client" on everything — that negates RSC benefits.',
    },
  },
  {
    id: 'react-int-state-management',
    category: 'react',
    difficulty: 'senior',
    question: {
      es: 'Tu app React tiene Redux con 200+ actions, 50 reducers y el bundle es enorme. El equipo quiere simplificar. ¿Qué propones?',
      en: 'Your React app has Redux with 200+ actions, 50 reducers, and the bundle is huge. The team wants to simplify. What do you propose?',
    },
    scenario: {
      es: 'App empresarial de 4 años. Redux Toolkit ya se usa pero todavía hay mucho boilerplate. Los nuevos developers tardan 2 semanas en entender el flujo de datos.',
      en: 'Enterprise app, 4 years old. Redux Toolkit is used but there is still a lot of boilerplate. New developers take 2 weeks to understand the data flow.',
    },
    answer: {
      es: 'Plan de simplificación: 1) Separar estado servidor del estado cliente. Todo lo que viene de APIs → React Query/TanStack Query (elimina 60% de los reducers). 2) Estado global simple (theme, auth, UI) → Zustand (3 líneas vs. 30 de Redux). 3) Estado local de formularios → React Hook Form (no necesita store global). 4) Mantener Redux SOLO para flujos de negocio complejos (ej: carrito con reglas). 5) Migrar incrementalmente: un módulo por sprint.',
      en: 'Simplification plan: 1) Separate server state from client state. Everything from APIs → React Query/TanStack Query (eliminates 60% of reducers). 2) Simple global state (theme, auth, UI) → Zustand (3 lines vs. 30 in Redux). 3) Local form state → React Hook Form (doesn\'t need global store). 4) Keep Redux ONLY for complex business flows (e.g., cart with rules). 5) Migrate incrementally: one module per sprint.',
    },
    keyPoints: [
      { es: 'Separar estado servidor (React Query) del estado cliente (Zustand).', en: 'Separate server state (React Query) from client state (Zustand).' },
      { es: 'No todo necesita ser global — formularios y UI son locales.', en: 'Not everything needs to be global — forms and UI are local.' },
      { es: 'Migración incremental, no big-bang.', en: 'Incremental migration, not big-bang.' },
    ],
    followUps: [
      { es: '¿Cómo convences al equipo de abandonar Redux?', en: 'How do you convince the team to leave Redux?' },
      { es: '¿Zustand o Jotai? ¿Cuándo uno vs otro?', en: 'Zustand or Jotai? When one vs the other?' },
    ],
    tip: {
      es: 'Esta pregunta evalúa si sabes que Redux ya no es la respuesta por defecto. Los seniors saben cuándo Redux es overkill y cuándo sí tiene sentido.',
      en: 'This question evaluates if you know Redux is no longer the default answer. Seniors know when Redux is overkill and when it makes sense.',
    },
  },
  {
    id: 'react-int-performance',
    category: 'react',
    difficulty: 'advanced',
    question: {
      es: 'Un componente React con una tabla de 500 filas tarda 3 segundos en renderizar al filtrar. Ya usas React.memo. ¿Qué más haces?',
      en: 'A React component with a 500-row table takes 3 seconds to render when filtering. You already use React.memo. What else do you do?',
    },
    scenario: {
      es: 'CRM interno. La tabla muestra datos de clientes con 12 columnas. Cada fila tiene botones de acción, badges de estado y una foto. El filtro re-renderiza toda la tabla.',
      en: 'Internal CRM. The table shows customer data with 12 columns. Each row has action buttons, status badges, and a photo. The filter re-renders the entire table.',
    },
    answer: {
      es: '1) Profiling con React DevTools para encontrar qué re-renderiza. 2) Virtualización con tanstack-virtual (solo renderizar filas visibles). 3) Estabilizar callbacks con useCallback y objetos con useMemo en el componente padre. 4) Memoizar las filas individuales (React.memo con comparador custom si necesario). 5) Debounce en el input de filtro (300ms). 6) Si los datos no cambian frecuentemente, usar useDeferredValue para la lista filtrada. 7) Mover el filtrado a un Web Worker si es computacionalmente pesado.',
      en: '1) Profile with React DevTools to find what re-renders. 2) Virtualization with tanstack-virtual (only render visible rows). 3) Stabilize callbacks with useCallback and objects with useMemo in the parent. 4) Memoize individual rows (React.memo with custom comparator if needed). 5) Debounce the filter input (300ms). 6) If data doesn\'t change frequently, use useDeferredValue for the filtered list. 7) Move filtering to a Web Worker if computationally heavy.',
    },
    keyPoints: [
      { es: 'Virtualización es el mayor impacto para tablas grandes.', en: 'Virtualization has the biggest impact for large tables.' },
      { es: 'useCallback + useMemo para estabilizar referencias.', en: 'useCallback + useMemo to stabilize references.' },
      { es: 'Profiling primero, optimizar después.', en: 'Profile first, optimize after.' },
    ],
    followUps: [
      { es: '¿Cuándo useDeferredValue vs debounce?', en: 'When useDeferredValue vs debounce?' },
      { es: '¿Cómo sabes si React.memo realmente está ayudando?', en: 'How do you know if React.memo is actually helping?' },
    ],
    tip: {
      es: 'Siempre menciona profiling primero. Optimizar sin medir es el error más común que ven los entrevistadores.',
      en: 'Always mention profiling first. Optimizing without measuring is the most common mistake interviewers see.',
    },
  },
  {
    id: 'react-int-testing',
    category: 'react',
    difficulty: 'intermediate',
    question: {
      es: 'Un componente tiene un formulario con validación async (verifica email en servidor) y un submit que redirige. ¿Cómo lo pruebas?',
      en: 'A component has a form with async validation (verifies email on server) and a submit that redirects. How do you test it?',
    },
    scenario: {
      es: 'App de SaaS. El formulario de registro verifica en tiempo real si el email ya existe. Al hacer submit exitoso, redirige a /onboarding.',
      en: 'SaaS app. The registration form checks in real-time if the email already exists. On successful submit, it redirects to /onboarding.',
    },
    answer: {
      es: '1) Mock del servicio de validación: MSW (Mock Service Worker) para interceptar peticiones. 2) Renderizar con Testing Library: render(<RegisterForm />). 3) Test happy path: llenar inputs con userEvent.type(), esperar validación con waitFor, click submit, verificar que navigate fue llamado con /onboarding. 4) Test error: mockear respuesta 409 (email existe), verificar que aparece mensaje de error. 5) Test loading: verificar que el botón se deshabilita mientras valida.',
      en: '1) Mock validation service: MSW (Mock Service Worker) to intercept requests. 2) Render with Testing Library: render(<RegisterForm />). 3) Happy path test: fill inputs with userEvent.type(), wait for validation with waitFor, click submit, verify navigate was called with /onboarding. 4) Error test: mock 409 response (email exists), verify error message appears. 5) Loading test: verify button disables while validating.',
    },
    keyPoints: [
      { es: 'MSW para mockear APIs (no mocks manuales de fetch).', en: 'MSW to mock APIs (not manual fetch mocks).' },
      { es: 'userEvent.type() simula tipeo real (focus, keydown, input).', en: 'userEvent.type() simulates real typing (focus, keydown, input).' },
      { es: 'waitFor para esperar operaciones async.', en: 'waitFor to wait for async operations.' },
    ],
    followUps: [
      { es: '¿Por qué MSW en vez de jest.mock()?', en: 'Why MSW instead of jest.mock()?' },
      { es: '¿Cómo pruebas el redirect sin un router real?', en: 'How do you test the redirect without a real router?' },
    ],
    tip: {
      es: 'Testing Library + MSW es el estándar actual. Si mencionas Enzyme o mocks manuales de fetch, el entrevistador sabrá que tu conocimiento está desactualizado.',
      en: 'Testing Library + MSW is the current standard. If you mention Enzyme or manual fetch mocks, the interviewer will know your knowledge is outdated.',
    },
  },
];
