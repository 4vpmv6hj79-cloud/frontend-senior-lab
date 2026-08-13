import type { TopicQuiz } from '../../models/topic-quiz.model';

export const ARCHITECTURE_TOPIC_QUIZZES: readonly TopicQuiz[] = [
  {
    topicId: 'architecture-domains',
    passingScore: 2,
    questions: [
      {
        id: 'arq-dom-1',
        question: {
          es: '¿Qué es una API pública de un dominio/feature?',
          en: 'What is a public API of a domain/feature?',
        },
        options: [
          { id: 'a', text: { es: 'Todos los archivos del dominio', en: 'All files in the domain' } },
          { id: 'b', text: { es: 'Solo los exports que otros dominios pueden importar (barrel exports)', en: 'Only the exports that other domains can import (barrel exports)' } },
          { id: 'c', text: { es: 'Los endpoints REST del backend', en: 'The backend REST endpoints' } },
          { id: 'd', text: { es: 'Los componentes que se muestran en el browser', en: 'The components displayed in the browser' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'arq-dom-2',
        question: {
          es: '¿Cuál es el principal problema de que el feature "orders" importe directamente un servicio interno de "auth"?',
          en: 'What is the main problem with "orders" feature directly importing an internal service from "auth"?',
        },
        options: [
          { id: 'a', text: { es: 'Es más lento', en: 'It is slower' } },
          { id: 'b', text: { es: 'Viola los límites de dependencia y crea acoplamiento implícito', en: 'It violates dependency boundaries and creates implicit coupling' } },
          { id: 'c', text: { es: 'No compila', en: 'It does not compile' } },
          { id: 'd', text: { es: 'Usa más memoria', en: 'It uses more memory' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'arq-dom-3',
        question: {
          es: '¿Qué herramienta de Nx previene imports no permitidos entre features?',
          en: 'Which Nx tool prevents unauthorized imports between features?',
        },
        options: [
          { id: 'a', text: { es: 'nx build', en: 'nx build' } },
          { id: 'b', text: { es: '@nx/enforce-module-boundaries', en: '@nx/enforce-module-boundaries' } },
          { id: 'c', text: { es: 'tsconfig paths', en: 'tsconfig paths' } },
          { id: 'd', text: { es: 'webpack aliases', en: 'webpack aliases' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'architecture-boundaries',
    passingScore: 2,
    questions: [
      {
        id: 'arq-bound-1',
        question: {
          es: 'En la regla "feature → data-access → shared", ¿qué significa?',
          en: 'In the rule "feature → data-access → shared", what does it mean?',
        },
        options: [
          { id: 'a', text: { es: 'Feature puede importar de data-access y shared, pero data-access no puede importar de feature', en: 'Feature can import from data-access and shared, but data-access cannot import from feature' } },
          { id: 'b', text: { es: 'Todos pueden importar de todos', en: 'Everyone can import from everyone' } },
          { id: 'c', text: { es: 'Solo shared puede importar de feature', en: 'Only shared can import from feature' } },
          { id: 'd', text: { es: 'Es una sugerencia, no una regla', en: 'It is a suggestion, not a rule' } },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'arq-bound-2',
        question: {
          es: '¿Cómo se configuran tags de Nx para enforcer module boundaries?',
          en: 'How are Nx tags configured to enforce module boundaries?',
        },
        options: [
          { id: 'a', text: { es: 'En package.json de cada librería', en: 'In each library package.json' } },
          { id: 'b', text: { es: 'En project.json con "tags" y en eslint con depConstraints', en: 'In project.json with "tags" and in eslint with depConstraints' } },
          { id: 'c', text: { es: 'En tsconfig.json', en: 'In tsconfig.json' } },
          { id: 'd', text: { es: 'No se pueden configurar, son automáticos', en: 'They cannot be configured, they are automatic' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'arq-bound-3',
        question: {
          es: '¿Qué pasa cuando un import circular se introduce entre dos features?',
          en: 'What happens when a circular import is introduced between two features?',
        },
        options: [
          { id: 'a', text: { es: 'Nada, JavaScript lo maneja', en: 'Nothing, JavaScript handles it' } },
          { id: 'b', text: { es: 'Errores de inicialización, valores undefined, y builds que fallan o son impredecibles', en: 'Initialization errors, undefined values, and builds that fail or are unpredictable' } },
          { id: 'c', text: { es: 'Solo afecta testing', en: 'It only affects testing' } },
          { id: 'd', text: { es: 'TypeScript lo previene automáticamente', en: 'TypeScript prevents it automatically' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'architecture-design-systems',
    passingScore: 2,
    questions: [
      {
        id: 'arq-ds-1',
        question: {
          es: '¿Qué son los design tokens?',
          en: 'What are design tokens?',
        },
        options: [
          { id: 'a', text: { es: 'Tokens de autenticación para el design team', en: 'Authentication tokens for the design team' } },
          { id: 'b', text: { es: 'Variables que definen los valores de diseño (colores, spacing, tipografía) como contrato entre diseño y código', en: 'Variables that define design values (colors, spacing, typography) as a contract between design and code' } },
          { id: 'c', text: { es: 'Componentes específicos de un framework', en: 'Framework-specific components' } },
          { id: 'd', text: { es: 'Clases de CSS únicas por componente', en: 'Unique CSS classes per component' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'arq-ds-2',
        question: {
          es: '¿Qué tipo de versionado se usa para una librería de design system?',
          en: 'What type of versioning is used for a design system library?',
        },
        options: [
          { id: 'a', text: { es: 'Versionado por fecha (2024.01.15)', en: 'Date versioning (2024.01.15)' } },
          { id: 'b', text: { es: 'Versionado semántico (MAJOR.MINOR.PATCH)', en: 'Semantic versioning (MAJOR.MINOR.PATCH)' } },
          { id: 'c', text: { es: 'No se versiona, siempre es latest', en: 'No versioning, always latest' } },
          { id: 'd', text: { es: 'Versionado por commit hash', en: 'Commit hash versioning' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'arq-ds-3',
        question: {
          es: '¿Cuál es la mejor práctica para empezar un design system desde cero?',
          en: 'What is the best practice for starting a design system from scratch?',
        },
        options: [
          { id: 'a', text: { es: 'Crear 100+ componentes antes de que nadie los use', en: 'Create 100+ components before anyone uses them' } },
          { id: 'b', text: { es: 'Empezar con 5-8 componentes básicos, documentarlos, y crecer según demanda real', en: 'Start with 5-8 basic components, document them, and grow based on real demand' } },
          { id: 'c', text: { es: 'Copiar un design system existente completo', en: 'Copy a complete existing design system' } },
          { id: 'd', text: { es: 'Solo crear tokens sin componentes', en: 'Only create tokens without components' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
];
