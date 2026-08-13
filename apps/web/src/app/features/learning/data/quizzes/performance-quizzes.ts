import type { TopicQuiz } from '../../models/topic-quiz.model';

export const PERFORMANCE_TOPIC_QUIZZES: readonly TopicQuiz[] = [
  {
    topicId: 'performance-lazy-loading',
    passingScore: 2,
    questions: [
      {
        id: 'perfq-lazy-1',
        question: {
          es: '¿Qué logras con lazy loading de rutas en Angular?',
          en: 'What do you achieve with route lazy loading in Angular?',
        },
        options: [
          { id: 'a', text: { es: 'Que la app cargue más rápido al inicio porque solo descarga el código de la ruta activa', en: 'The app loads faster initially because it only downloads code for the active route' } },
          { id: 'b', text: { es: 'Que los componentes se rendericen más rápido', en: 'Components render faster' } },
          { id: 'c', text: { es: 'Que no necesites un bundler', en: 'You do not need a bundler' } },
          { id: 'd', text: { es: 'Que TypeScript compile más rápido', en: 'TypeScript compiles faster' } },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'perfq-lazy-2',
        question: {
          es: '¿Qué hace @defer (on viewport) en Angular?',
          en: 'What does @defer (on viewport) do in Angular?',
        },
        options: [
          { id: 'a', text: { es: 'Oculta el contenido con CSS', en: 'Hides content with CSS' } },
          { id: 'b', text: { es: 'Carga y renderiza el contenido solo cuando el usuario lo scrollea hasta ser visible', en: 'Loads and renders content only when the user scrolls it into view' } },
          { id: 'c', text: { es: 'Ejecuta el código en un Web Worker', en: 'Executes code in a Web Worker' } },
          { id: 'd', text: { es: 'Aplica un debounce al renderizado', en: 'Applies debounce to rendering' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'perfq-lazy-3',
        question: {
          es: '¿Qué herramienta usas para ver qué ocupa más espacio en tu bundle?',
          en: 'What tool do you use to see what takes the most space in your bundle?',
        },
        options: [
          { id: 'a', text: { es: 'Chrome DevTools Network tab', en: 'Chrome DevTools Network tab' } },
          { id: 'b', text: { es: 'source-map-explorer o webpack-bundle-analyzer', en: 'source-map-explorer or webpack-bundle-analyzer' } },
          { id: 'c', text: { es: 'TypeScript compiler', en: 'TypeScript compiler' } },
          { id: 'd', text: { es: 'npm ls', en: 'npm ls' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'performance-virtual-scrolling',
    passingScore: 2,
    questions: [
      {
        id: 'perfq-vs-1',
        question: {
          es: '¿Qué problema resuelve el virtual scrolling?',
          en: 'What problem does virtual scrolling solve?',
        },
        options: [
          { id: 'a', text: { es: 'Listas lentas porque el DOM tiene miles de nodos que no están en pantalla', en: 'Slow lists because the DOM has thousands of nodes not on screen' } },
          { id: 'b', text: { es: 'Problemas de red al cargar datos', en: 'Network issues when loading data' } },
          { id: 'c', text: { es: 'CSS que no se aplica correctamente', en: 'CSS not applying correctly' } },
          { id: 'd', text: { es: 'Memory leaks en subscriptions', en: 'Memory leaks in subscriptions' } },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'perfq-vs-2',
        question: {
          es: '¿Cuántos elementos renderiza el DOM con virtual scrolling en una lista de 10,000 items?',
          en: 'How many elements does the DOM render with virtual scrolling in a 10,000 item list?',
        },
        options: [
          { id: 'a', text: { es: '10,000', en: '10,000' } },
          { id: 'b', text: { es: 'Solo los visibles en el viewport (típicamente 10-30)', en: 'Only those visible in the viewport (typically 10-30)' } },
          { id: 'c', text: { es: '100 fijos', en: '100 fixed' } },
          { id: 'd', text: { es: 'Depende del CSS', en: 'Depends on CSS' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'perfq-vs-3',
        question: {
          es: '¿Virtual scrolling es siempre la mejor solución para listas grandes?',
          en: 'Is virtual scrolling always the best solution for large lists?',
        },
        options: [
          { id: 'a', text: { es: 'Sí, siempre', en: 'Yes, always' } },
          { id: 'b', text: { es: 'No: paginación o filtrado en servidor pueden ser más simples y suficientes según el caso', en: 'No: pagination or server-side filtering can be simpler and sufficient depending on the case' } },
          { id: 'c', text: { es: 'Solo funciona con React', en: 'It only works with React' } },
          { id: 'd', text: { es: 'No, nunca es buena idea', en: 'No, it is never a good idea' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'performance-core-web-vitals',
    passingScore: 2,
    questions: [
      {
        id: 'perfq-cwv-1',
        question: {
          es: '¿Cuáles son las 3 métricas de Core Web Vitals?',
          en: 'What are the 3 Core Web Vitals metrics?',
        },
        options: [
          { id: 'a', text: { es: 'FCP, TTI, TBT', en: 'FCP, TTI, TBT' } },
          { id: 'b', text: { es: 'LCP, INP, CLS', en: 'LCP, INP, CLS' } },
          { id: 'c', text: { es: 'TTFB, FID, SI', en: 'TTFB, FID, SI' } },
          { id: 'd', text: { es: 'DOMContentLoaded, Load, Paint', en: 'DOMContentLoaded, Load, Paint' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'perfq-cwv-2',
        question: {
          es: '¿Cuál es el umbral "bueno" para LCP (Largest Contentful Paint)?',
          en: 'What is the "good" threshold for LCP (Largest Contentful Paint)?',
        },
        options: [
          { id: 'a', text: { es: '< 1 segundo', en: '< 1 second' } },
          { id: 'b', text: { es: '≤ 2.5 segundos', en: '≤ 2.5 seconds' } },
          { id: 'c', text: { es: '< 5 segundos', en: '< 5 seconds' } },
          { id: 'd', text: { es: '< 100ms', en: '< 100ms' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'perfq-cwv-3',
        question: {
          es: '¿Qué causa CLS (Cumulative Layout Shift)?',
          en: 'What causes CLS (Cumulative Layout Shift)?',
        },
        options: [
          { id: 'a', text: { es: 'JavaScript lento', en: 'Slow JavaScript' } },
          { id: 'b', text: { es: 'Elementos que cambian de posición después de que el usuario ya los ve (imágenes sin dimensiones, contenido dinámico sin espacio reservado)', en: 'Elements shifting position after the user sees them (images without dimensions, dynamic content without reserved space)' } },
          { id: 'c', text: { es: 'Demasiadas peticiones HTTP', en: 'Too many HTTP requests' } },
          { id: 'd', text: { es: 'No tener un service worker', en: 'Not having a service worker' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
];
