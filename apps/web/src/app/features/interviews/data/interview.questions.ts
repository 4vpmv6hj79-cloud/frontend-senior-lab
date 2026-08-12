import type { InterviewQuestion } from '../models/interview.model';

export const INTERVIEW_QUESTIONS = [
  // ─── ANGULAR ─────────────────────────────────────────────────────────────────
  {
    id: 'angular-performance-dashboard',
    category: 'angular',
    difficulty: 'senior',
    question: {
      es: 'Tu equipo tiene un dashboard con 50+ widgets que se actualizan en tiempo real. Los usuarios reportan que la app se congela al recibir datos del WebSocket. ¿Cómo lo solucionas?',
      en: 'Your team has a dashboard with 50+ widgets updating in real-time. Users report the app freezes when receiving WebSocket data. How do you fix it?',
    },
    scenario: {
      es: 'Estás en una fintech. El dashboard muestra precios de acciones, gráficas y alertas. El WebSocket envía ~200 mensajes/segundo. El equipo de producto no quiere reducir la frecuencia de actualización.',
      en: 'You are at a fintech. The dashboard shows stock prices, charts, and alerts. The WebSocket sends ~200 messages/second. Product does not want to reduce update frequency.',
    },
    answer: {
      es: 'Primero mediría con Angular DevTools para identificar qué widgets causan más ciclos de change detection. Luego: 1) Todos los componentes en OnPush. 2) Agrupar mensajes del WebSocket con bufferTime(100ms) en RxJS para reducir actualizaciones a 10/segundo. 3) Usar signals para estado local de cada widget. 4) @defer para widgets fuera del viewport. 5) Considerar runOutsideAngular para el WebSocket y notificar a Angular solo cuando hay datos relevantes para la vista.',
      en: 'First, measure with Angular DevTools to identify which widgets cause the most change detection cycles. Then: 1) Set all components to OnPush. 2) Batch WebSocket messages with bufferTime(100ms) in RxJS to reduce updates to 10/second. 3) Use signals for local widget state. 4) @defer for widgets outside the viewport. 5) Consider runOutsideAngular for the WebSocket and only notify Angular when there is view-relevant data.',
    },
    keyPoints: [
      {
        es: 'Medir primero con DevTools, no optimizar a ciegas.',
        en: 'Measure first with DevTools, do not optimize blindly.',
      },
      {
        es: 'bufferTime + OnPush reduce drásticamente los ciclos.',
        en: 'bufferTime + OnPush drastically reduces cycles.',
      },
      {
        es: 'runOutsideAngular para operaciones que no afectan la vista.',
        en: 'runOutsideAngular for operations that do not affect the view.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo priorizarías qué widgets se actualizan si no puedes actualizar todos?',
        en: 'How would you prioritize which widgets update if you cannot update all of them?',
      },
      {
        es: '¿Qué métricas usarías para saber si tu solución funcionó?',
        en: 'What metrics would you use to know if your solution worked?',
      },
    ],
    tip: {
      es: 'En entrevistas reales, siempre menciona que medirías antes de optimizar. Los entrevistadores valoran el pensamiento basado en datos.',
      en: 'In real interviews, always mention you would measure before optimizing. Interviewers value data-driven thinking.',
    },
  },
  {
    id: 'angular-migration-standalone',
    category: 'angular',
    difficulty: 'advanced',
    question: {
      es: 'Tienes una app Angular con 200+ componentes usando NgModules. El CTO quiere migrar a standalone. ¿Cuál es tu plan sin detener el desarrollo del equipo de 8 personas?',
      en: 'You have an Angular app with 200+ components using NgModules. The CTO wants to migrate to standalone. What is your plan without stopping the 8-person team development?',
    },
    scenario: {
      es: 'Startup de e-commerce con sprints de 2 semanas. No puedes parar features. El equipo mezcla experiencia: 3 seniors, 3 mid, 2 juniors.',
      en: 'E-commerce startup with 2-week sprints. You cannot stop features. The team has mixed experience: 3 seniors, 3 mid, 2 juniors.',
    },
    answer: {
      es: 'Plan progresivo: 1) Escribir una regla de ESLint que prohíba crear nuevos NgModules. 2) Crear un ADR (Architecture Decision Record) explicando el por qué. 3) Empezar por componentes hoja sin dependencias. 4) Usar el schematic ng generate @angular/core:standalone para automatizar lo repetitivo. 5) Un PR por módulo migrado, no un mega-PR. 6) Sesión de 30 min con juniors explicando el patrón. 7) Meta: migrar 10-15 componentes por sprint como parte del trabajo normal.',
      en: 'Progressive plan: 1) Write an ESLint rule prohibiting new NgModules. 2) Create an ADR (Architecture Decision Record) explaining why. 3) Start with leaf components without dependencies. 4) Use the ng generate @angular/core:standalone schematic to automate repetitive work. 5) One PR per migrated module, not a mega-PR. 6) 30-min session with juniors explaining the pattern. 7) Goal: migrate 10-15 components per sprint as part of normal work.',
    },
    keyPoints: [
      {
        es: 'Migración incremental, nunca big-bang.',
        en: 'Incremental migration, never big-bang.',
      },
      {
        es: 'Automatizar con schematics lo que se pueda.',
        en: 'Automate with schematics whatever you can.',
      },
      {
        es: 'Documentar decisiones (ADR) para el equipo.',
        en: 'Document decisions (ADR) for the team.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo manejarías a un developer que se resiste al cambio?',
        en: 'How would you handle a developer who resists the change?',
      },
      {
        es: '¿Qué harías si después de migrar encuentras un bug en producción?',
        en: 'What would you do if after migrating you find a production bug?',
      },
    ],
    tip: {
      es: 'Las preguntas de migración evalúan liderazgo técnico. Muestra que piensas en el equipo, no solo en el código.',
      en: 'Migration questions evaluate technical leadership. Show that you think about the team, not just the code.',
    },
  },

  // ─── TYPESCRIPT ──────────────────────────────────────────────────────────────
  {
    id: 'typescript-api-contract',
    category: 'typescript',
    difficulty: 'advanced',
    question: {
      es: 'El backend cambia un campo de la API de "userName" a "user_name" sin avisar y rompe producción. ¿Cómo evitas que esto vuelva a pasar?',
      en: 'The backend changes an API field from "userName" to "user_name" without notice and breaks production. How do you prevent this from happening again?',
    },
    scenario: {
      es: 'Trabajas en una empresa mediana con equipos de frontend y backend separados. No hay contrato formal entre las APIs. El equipo de backend deploya independientemente.',
      en: 'You work at a mid-size company with separate frontend and backend teams. There is no formal API contract. The backend team deploys independently.',
    },
    answer: {
      es: 'Solución en capas: 1) Recibir la respuesta HTTP como unknown, no confiar en el tipo. 2) Crear una capa de validación con Zod o type guards que valide la estructura antes de usarla. 3) Un adapter que transforma la respuesta externa en tu modelo de dominio interno (nunca usar la forma del backend directamente en componentes). 4) A largo plazo: implementar contract testing (Pact) o un esquema OpenAPI compartido que ambos equipos deben cumplir. 5) Alertas de monitoreo cuando la validación falla en producción.',
      en: 'Layered solution: 1) Receive HTTP response as unknown, do not trust the type. 2) Create a validation layer with Zod or type guards that validates structure before use. 3) An adapter that transforms the external response into your internal domain model (never use backend shape directly in components). 4) Long-term: implement contract testing (Pact) or a shared OpenAPI schema both teams must comply with. 5) Monitoring alerts when validation fails in production.',
    },
    keyPoints: [
      {
        es: 'Nunca confiar directamente en datos externos (unknown + validación).',
        en: 'Never trust external data directly (unknown + validation).',
      },
      {
        es: 'Adapter pattern: separar modelo externo del interno.',
        en: 'Adapter pattern: separate external from internal model.',
      },
      {
        es: 'Contract testing previene roturas entre equipos.',
        en: 'Contract testing prevents breakage between teams.',
      },
    ],
    followUps: [
      {
        es: '¿Cuál es la diferencia entre Zod y un type guard manual?',
        en: 'What is the difference between Zod and a manual type guard?',
      },
      {
        es: '¿Cómo convencerías al equipo de backend de adoptar OpenAPI?',
        en: 'How would you convince the backend team to adopt OpenAPI?',
      },
    ],
    tip: {
      es: 'Esta pregunta evalúa si piensas en la resiliencia del sistema. Muestra que diseñas para el fallo, no solo para el caso feliz.',
      en: 'This question evaluates if you think about system resilience. Show you design for failure, not just the happy path.',
    },
  },
  {
    id: 'typescript-refactor-any',
    category: 'typescript',
    difficulty: 'senior',
    question: {
      es: 'Heredas un proyecto con 400+ usos de "any". El equipo dice que "TypeScript estricto es lento". ¿Cómo cambias la cultura sin imponer?',
      en: 'You inherit a project with 400+ uses of "any". The team says "strict TypeScript is slow". How do you change the culture without imposing?',
    },
    scenario: {
      es: 'Empresa de salud digital. El código funciona en producción pero tiene bugs difíciles de rastrear. Eres el nuevo tech lead. El equipo tiene 5 personas con 2-4 años de experiencia.',
      en: 'Digital health company. The code works in production but has hard-to-trace bugs. You are the new tech lead. The team has 5 people with 2-4 years of experience.',
    },
    answer: {
      es: 'Enfoque educativo, no autoritario: 1) Activar strict incrementalmente: empezar con noImplicitAny solo en archivos nuevos usando tsconfig paths. 2) Mostrar, no decir: tomar un bug reciente causado por any y demostrar cómo TypeScript estricto lo habría prevenido. 3) Crear un "any budget": medir los any actuales y acordar no agregar nuevos. 4) Pair programming semanal donde resuelves un any real juntos. 5) Celebrar cuando el equipo reduce any en PRs. 6) Nunca bloquear PRs por any existentes, solo por nuevos.',
      en: 'Educational approach, not authoritarian: 1) Enable strict incrementally: start with noImplicitAny only on new files using tsconfig paths. 2) Show, do not tell: take a recent bug caused by any and demonstrate how strict TypeScript would have prevented it. 3) Create an "any budget": measure current anys and agree not to add new ones. 4) Weekly pair programming where you solve a real any together. 5) Celebrate when the team reduces any in PRs. 6) Never block PRs for existing anys, only for new ones.',
    },
    keyPoints: [
      {
        es: 'Demostrar valor con ejemplos reales de bugs, no teoría.',
        en: 'Demonstrate value with real bug examples, not theory.',
      },
      {
        es: 'Migración incremental (nuevos archivos primero).',
        en: 'Incremental migration (new files first).',
      },
      {
        es: 'Liderazgo por influencia, no por autoridad.',
        en: 'Leadership by influence, not authority.',
      },
    ],
    followUps: [
      {
        es: '¿Qué harías si un senior del equipo se niega activamente?',
        en: 'What would you do if a senior on the team actively refuses?',
      },
      {
        es: '¿Cómo medirías el impacto en velocidad de desarrollo?',
        en: 'How would you measure the impact on development velocity?',
      },
    ],
    tip: {
      es: 'Esta es una pregunta de liderazgo disfrazada de técnica. El entrevistador quiere ver cómo influyes sin imponer.',
      en: 'This is a leadership question disguised as a technical one. The interviewer wants to see how you influence without imposing.',
    },
  },

  // ─── ARCHITECTURE ────────────────────────────────────────────────────────────
  {
    id: 'architecture-design-system-real',
    category: 'architecture',
    difficulty: 'senior',
    question: {
      es: 'Tres equipos de producto usan copias diferentes del mismo botón. Los diseñadores piden consistencia. ¿Cómo implementas un design system sin frenar a los equipos?',
      en: 'Three product teams use different copies of the same button. Designers ask for consistency. How do you implement a design system without slowing teams down?',
    },
    scenario: {
      es: 'Empresa SaaS con 3 productos Angular. Cada uno tiene su propio repositorio. Los diseñadores acaban de crear un Figma unificado. Tienes que proponer la solución técnica al VP de Engineering.',
      en: 'SaaS company with 3 Angular products. Each has its own repository. Designers just created a unified Figma. You need to propose the technical solution to the VP of Engineering.',
    },
    answer: {
      es: 'Propuesta pragmática: 1) Empezar con una librería de componentes básicos (botón, input, card) en un paquete publicable. 2) Design tokens (colores, spacing, tipografía) como CSS custom properties — no valores hardcoded. 3) Versionado semántico: los consumidores eligen cuándo actualizar. 4) Documentación viva con Storybook y ejemplos de uso. 5) Governance: un "component council" con 1 representante de cada equipo que aprueba cambios. 6) Política de deprecación de 2 sprints antes de breaking changes. 7) Fase 1 solo con 5-8 componentes, no intentar migrar todo de golpe.',
      en: 'Pragmatic proposal: 1) Start with a basic component library (button, input, card) as a publishable package. 2) Design tokens (colors, spacing, typography) as CSS custom properties — no hardcoded values. 3) Semantic versioning: consumers choose when to update. 4) Living documentation with Storybook and usage examples. 5) Governance: a "component council" with 1 representative from each team approving changes. 6) Deprecation policy of 2 sprints before breaking changes. 7) Phase 1 with only 5-8 components, do not try to migrate everything at once.',
    },
    keyPoints: [
      {
        es: 'Empezar pequeño: 5-8 componentes, no todo.',
        en: 'Start small: 5-8 components, not everything.',
      },
      {
        es: 'Design tokens como contrato entre diseño y código.',
        en: 'Design tokens as the contract between design and code.',
      },
      {
        es: 'Governance con representantes de cada equipo.',
        en: 'Governance with representatives from each team.',
      },
    ],
    followUps: [
      {
        es: '¿Monorepo o paquetes separados? ¿Por qué?',
        en: 'Monorepo or separate packages? Why?',
      },
      {
        es: '¿Cómo manejas cuando un equipo necesita una variante que no existe?',
        en: 'How do you handle when a team needs a variant that does not exist?',
      },
    ],
    tip: {
      es: 'Los entrevistadores buscan pragmatismo. Nunca propongas una solución de 6 meses sin entregas intermedias.',
      en: 'Interviewers look for pragmatism. Never propose a 6-month solution without intermediate deliveries.',
    },
  },
  {
    id: 'architecture-frontend-system-design',
    category: 'architecture',
    difficulty: 'senior',
    question: {
      es: 'Diseña la arquitectura frontend de una app de chat en tiempo real con mensajes, reacciones, typing indicators y búsqueda. ¿Cómo estructuras el estado y la comunicación?',
      en: 'Design the frontend architecture of a real-time chat app with messages, reactions, typing indicators, and search. How do you structure state and communication?',
    },
    scenario: {
      es: 'Entrevista de system design en una empresa como Slack o Discord. Tienes 45 minutos. El entrevistador espera que pienses en voz alta sobre trade-offs.',
      en: 'System design interview at a company like Slack or Discord. You have 45 minutes. The interviewer expects you to think out loud about trade-offs.',
    },
    answer: {
      es: 'Arquitectura por capas: 1) Capa de transporte: WebSocket para mensajes en tiempo real, HTTP REST para búsqueda e historial. 2) Estado: separar "messages store" (normalizados por channel), "presence store" (quién está escribiendo), "ui store" (panel abierto, scroll position). 3) Optimistic updates para enviar mensajes (mostrar antes de confirmar). 4) Virtual scrolling para historial (miles de mensajes). 5) Web Workers para búsqueda full-text sin bloquear UI. 6) Service Worker para notificaciones y cache de mensajes recientes. 7) Lazy load de emojis, archivos adjuntos y previews.',
      en: 'Layered architecture: 1) Transport layer: WebSocket for real-time messages, HTTP REST for search and history. 2) State: separate "messages store" (normalized by channel), "presence store" (who is typing), "ui store" (open panel, scroll position). 3) Optimistic updates for sending messages (show before confirm). 4) Virtual scrolling for history (thousands of messages). 5) Web Workers for full-text search without blocking UI. 6) Service Worker for notifications and recent message cache. 7) Lazy load emojis, attachments, and previews.',
    },
    keyPoints: [
      {
        es: 'Separar estado por dominio (messages, presence, ui).',
        en: 'Separate state by domain (messages, presence, ui).',
      },
      {
        es: 'Optimistic updates para sensación de velocidad.',
        en: 'Optimistic updates for perceived speed.',
      },
      {
        es: 'Virtual scrolling + lazy loading para escalabilidad.',
        en: 'Virtual scrolling + lazy loading for scalability.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo manejas la reconexión cuando se pierde el WebSocket?',
        en: 'How do you handle reconnection when the WebSocket is lost?',
      },
      {
        es: '¿Cómo sincronizas el estado entre múltiples pestañas?',
        en: 'How do you sync state between multiple tabs?',
      },
    ],
    tip: {
      es: 'En system design, dibuja primero (aunque sea verbalmente). Empieza por los requisitos, luego la arquitectura de alto nivel, y finalmente profundiza en un área.',
      en: 'In system design, draw first (even verbally). Start with requirements, then high-level architecture, and finally deep-dive into one area.',
    },
  },

  // ─── TESTING ─────────────────────────────────────────────────────────────────
  {
    id: 'testing-real-scenario',
    category: 'testing',
    difficulty: 'intermediate',
    question: {
      es: 'Un formulario de checkout tiene 12 campos, validación cruzada y 3 llamadas HTTP. Tu PM dice que "necesita tests". ¿Cuántos y de qué tipo escribes?',
      en: 'A checkout form has 12 fields, cross-field validation, and 3 HTTP calls. Your PM says it "needs tests". How many and what kind do you write?',
    },
    scenario: {
      es: 'E-commerce. El checkout es el flujo más crítico del negocio. Se despliega 3 veces por semana. Ha habido 2 bugs en producción el último mes por regresiones en el formulario.',
      en: 'E-commerce. Checkout is the most critical business flow. Deployed 3 times per week. There have been 2 production bugs last month due to form regressions.',
    },
    answer: {
      es: 'Estrategia basada en riesgo: 1) Unit tests para las reglas de validación puras (funciones que reciben valores y retornan errores) — rápidos y estables. 2) Integration tests del componente con el formulario: simular el servicio HTTP, verificar que el submit se deshabilita con datos inválidos y se habilita con datos válidos. 3) Un solo E2E test para el happy path completo (llenar → pagar → confirmación). 4) Test de error: ¿qué pasa cuando la API de pago falla? En total: ~8 unit, 3-4 integration, 1-2 E2E. Máximo 15 tests, no 50.',
      en: 'Risk-based strategy: 1) Unit tests for pure validation rules (functions receiving values and returning errors) — fast and stable. 2) Integration tests of the component with the form: mock HTTP service, verify submit disables with invalid data and enables with valid data. 3) One E2E test for the complete happy path (fill → pay → confirmation). 4) Error test: what happens when the payment API fails? Total: ~8 unit, 3-4 integration, 1-2 E2E. Maximum 15 tests, not 50.',
    },
    keyPoints: [
      {
        es: 'Priorizar por riesgo de negocio, no por cobertura arbitraria.',
        en: 'Prioritize by business risk, not arbitrary coverage.',
      },
      {
        es: 'Unit para lógica pura, integration para comportamiento del componente.',
        en: 'Unit for pure logic, integration for component behavior.',
      },
      {
        es: 'E2E solo para flujos críticos (1-2, no 20).',
        en: 'E2E only for critical flows (1-2, not 20).',
      },
    ],
    followUps: [
      {
        es: '¿Cómo decides cuándo un test vale la pena mantenerlo?',
        en: 'How do you decide when a test is worth maintaining?',
      },
      {
        es: '¿Qué harías si el PM pide 100% de cobertura?',
        en: 'What would you do if the PM asks for 100% coverage?',
      },
    ],
    tip: {
      es: 'Nunca digas "probar todo". Los entrevistadores quieren ver que priorizas basándote en impacto al negocio.',
      en: 'Never say "test everything". Interviewers want to see you prioritize based on business impact.',
    },
  },
  {
    id: 'testing-debugging-production',
    category: 'testing',
    difficulty: 'advanced',
    question: {
      es: 'Es viernes a las 5pm. Un usuario reporta que el botón de "Guardar" no funciona, pero solo en Safari y solo para usuarios con más de 100 items. ¿Cómo investigas?',
      en: 'It is Friday at 5pm. A user reports the "Save" button does not work, but only on Safari and only for users with 100+ items. How do you investigate?',
    },
    scenario: {
      es: 'App de gestión de proyectos. El bug afecta a clientes enterprise (los que más pagan). Tu manager pregunta si es necesario hacer hotfix hoy o puede esperar al lunes.',
      en: 'Project management app. The bug affects enterprise clients (highest paying). Your manager asks if a hotfix is needed today or can wait until Monday.',
    },
    answer: {
      es: 'Investigación sistemática: 1) Reproducir: abrir Safari, crear un usuario con 100+ items (o pedir acceso a staging con datos reales). 2) Revisar la consola de Safari — errores de JS, warnings, network failures. 3) Hipótesis: Safari tiene límites diferentes en localStorage/IndexedDB, o un polyfill no funciona. 4) Revisar si hay un try/catch silencioso que traga el error. 5) Si es un deadline de localStorage (Safari limita a 5MB en modo privado), la solución es manejar el error gracefully. 6) Para el manager: si solo afecta saves, es hotfix hoy porque los clientes pueden perder trabajo. Workaround temporal: reducir payload o mostrar error visible.',
      en: 'Systematic investigation: 1) Reproduce: open Safari, create a user with 100+ items (or request staging access with real data). 2) Check Safari console — JS errors, warnings, network failures. 3) Hypothesis: Safari has different limits for localStorage/IndexedDB, or a polyfill fails. 4) Check if there is a silent try/catch swallowing the error. 5) If it is a localStorage limit (Safari caps at 5MB in private mode), handle the error gracefully. 6) For the manager: if it only affects saves, hotfix today because clients may lose work. Temporary workaround: reduce payload or show visible error.',
    },
    keyPoints: [
      {
        es: 'Reproducir el bug exacto primero, no adivinar.',
        en: 'Reproduce the exact bug first, do not guess.',
      },
      {
        es: 'Safari tiene quirks únicos (localStorage, WebKit bugs).',
        en: 'Safari has unique quirks (localStorage, WebKit bugs).',
      },
      {
        es: 'Comunicar al manager con impacto de negocio, no solo técnico.',
        en: 'Communicate to manager with business impact, not just technical.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo prevendrías bugs específicos de navegador en el futuro?',
        en: 'How would you prevent browser-specific bugs in the future?',
      },
      {
        es: '¿Cuándo está bien decir "esto puede esperar al lunes"?',
        en: 'When is it okay to say "this can wait until Monday"?',
      },
    ],
    tip: {
      es: 'Los bugs de producción evalúan tu proceso mental bajo presión. Muestra que eres metódico, no que te lanzas a cambiar código.',
      en: 'Production bugs evaluate your mental process under pressure. Show you are methodical, not that you jump to change code.',
    },
  },

  // ─── PERFORMANCE ─────────────────────────────────────────────────────────────
  {
    id: 'performance-core-web-vitals-real',
    category: 'performance',
    difficulty: 'advanced',
    question: {
      es: 'Google Search Console marca tu LCP en 4.2s (rojo) y tu CLS en 0.3. El equipo de marketing dice que pierde conversiones. ¿Qué haces primero?',
      en: 'Google Search Console flags your LCP at 4.2s (red) and CLS at 0.3. The marketing team says conversions are dropping. What do you do first?',
    },
    scenario: {
      es: 'Landing page de un SaaS B2B. El hero tiene una imagen grande, un video, fuentes custom y un chatbot de terceros. El servidor responde en 200ms. El problema es client-side.',
      en: 'B2B SaaS landing page. The hero has a large image, a video, custom fonts, and a third-party chatbot. Server responds in 200ms. The problem is client-side.',
    },
    answer: {
      es: 'Ataque en orden de impacto: LCP primero (más impacto en conversiones): 1) Identificar el elemento LCP con Lighthouse. Probablemente es la imagen hero. 2) Convertir a formato WebP/AVIF con srcset para diferentes tamaños. 3) Preload de la imagen LCP en el <head>. 4) Font-display: swap para que el texto sea visible inmediatamente. 5) Defer del chatbot hasta después de la interacción (no bloquear el render). CLS después: 6) Poner width/height explícitos en imagen y video. 7) Reservar espacio para el chatbot con un placeholder del tamaño correcto. 8) Fuentes: usar font-display: optional si el layout shift es por tipografía.',
      en: 'Attack in impact order. LCP first (highest impact on conversions): 1) Identify the LCP element with Lighthouse. Probably the hero image. 2) Convert to WebP/AVIF with srcset for different sizes. 3) Preload the LCP image in <head>. 4) Font-display: swap so text is visible immediately. 5) Defer chatbot until after interaction (do not block render). CLS after: 6) Set explicit width/height on image and video. 7) Reserve space for chatbot with a correctly-sized placeholder. 8) Fonts: use font-display: optional if layout shift is from typography.',
    },
    keyPoints: [
      {
        es: 'Identificar el elemento LCP exacto antes de optimizar.',
        en: 'Identify the exact LCP element before optimizing.',
      },
      {
        es: 'Preload + formato moderno = mayor impacto en LCP.',
        en: 'Preload + modern format = highest LCP impact.',
      },
      {
        es: 'CLS: reservar espacio explícito para todo contenido dinámico.',
        en: 'CLS: reserve explicit space for all dynamic content.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo monitoreas Core Web Vitals continuamente?',
        en: 'How do you continuously monitor Core Web Vitals?',
      },
      {
        es: '¿Qué métricas de usuario real (RUM) implementarías?',
        en: 'What real user metrics (RUM) would you implement?',
      },
    ],
    tip: {
      es: 'Conecta siempre rendimiento con negocio. "LCP de 4.2s" no importa al PM, pero "perdemos 12% de conversiones" sí.',
      en: 'Always connect performance to business. "4.2s LCP" does not matter to the PM, but "we lose 12% conversions" does.',
    },
  },
  {
    id: 'performance-bundle-analysis',
    category: 'performance',
    difficulty: 'senior',
    question: {
      es: 'Tu app Angular tiene un bundle inicial de 1.2MB. El target es <400KB. ¿Cuál es tu plan de acción paso a paso?',
      en: 'Your Angular app has an initial bundle of 1.2MB. Target is <400KB. What is your step-by-step action plan?',
    },
    scenario: {
      es: 'App empresarial con 3 años de desarrollo. Usa Material, Moment.js, Lodash completo, y tiene imports circulares. El equipo nunca ha hecho bundle analysis.',
      en: 'Enterprise app with 3 years of development. Uses Material, Moment.js, full Lodash, and has circular imports. The team has never done bundle analysis.',
    },
    answer: {
      es: 'Plan de reducción: 1) Analizar: npx source-map-explorer para ver qué ocupa más espacio. 2) Quick wins: reemplazar Moment.js por date-fns o Temporal API (ahorro ~70KB). Reemplazar Lodash por lodash-es con imports específicos (ahorro ~50KB). 3) Tree-shaking: verificar que no hay barrel exports que impidan tree shaking. Eliminar imports circulares. 4) Lazy loading: cada ruta como lazy chunk. Mover Material modules pesados (table, datepicker) a rutas lazy. 5) @defer: cargar below-the-fold content después del initial render. 6) Auditar dependencias: ¿realmente necesitamos X librería o hay una alternativa más ligera? 7) Budget en angular.json para alertar si crece de nuevo.',
      en: 'Reduction plan: 1) Analyze: npx source-map-explorer to see what takes most space. 2) Quick wins: replace Moment.js with date-fns or Temporal API (saves ~70KB). Replace Lodash with lodash-es with specific imports (saves ~50KB). 3) Tree-shaking: verify no barrel exports prevent tree shaking. Remove circular imports. 4) Lazy loading: each route as lazy chunk. Move heavy Material modules (table, datepicker) to lazy routes. 5) @defer: load below-the-fold content after initial render. 6) Audit dependencies: do we really need library X or is there a lighter alternative? 7) Budget in angular.json to alert if it grows again.',
    },
    keyPoints: [
      {
        es: 'Medir con source-map-explorer antes de actuar.',
        en: 'Measure with source-map-explorer before acting.',
      },
      {
        es: 'Quick wins: reemplazar Moment.js y Lodash completo.',
        en: 'Quick wins: replace Moment.js and full Lodash.',
      },
      {
        es: 'Lazy loading + budgets para mantener la ganancia.',
        en: 'Lazy loading + budgets to maintain the gains.',
      },
    ],
    followUps: [
      {
        es: '¿Cómo priorizas si tienes una semana para reducir el bundle?',
        en: 'How do you prioritize if you have one week to reduce the bundle?',
      },
      {
        es: '¿Qué impacto tiene el bundle size en SEO y mobile?',
        en: 'What impact does bundle size have on SEO and mobile?',
      },
    ],
    tip: {
      es: 'Siempre menciona que medirías primero. "Analizar antes de optimizar" demuestra experiencia senior real.',
      en: 'Always mention you would measure first. "Analyze before optimizing" demonstrates real senior experience.',
    },
  },
] as const satisfies readonly InterviewQuestion[];
