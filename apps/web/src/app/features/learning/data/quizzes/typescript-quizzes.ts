import type { TopicQuiz } from '../../models/topic-quiz.model';

export const TYPESCRIPT_TOPIC_QUIZZES: readonly TopicQuiz[] = [
  {
    topicId: 'typescript-unknown-guards',
    passingScore: 2,
    questions: [
      {
        id: 'tq-unknown-1',
        question: {
          es: '¿Qué tipo deberías usar al recibir datos de una fuente externa no confiable?',
          en: 'What type should you use when receiving data from an untrusted external source?',
        },
        options: [
          { id: 'a', text: { es: 'any', en: 'any' } },
          { id: 'b', text: { es: 'unknown', en: 'unknown' } },
          { id: 'c', text: { es: 'object', en: 'object' } },
          { id: 'd', text: { es: 'Record<string, any>', en: 'Record<string, any>' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'tq-unknown-2',
        question: {
          es: '¿Qué sintaxis tiene un type guard personalizado?',
          en: 'What syntax does a custom type guard have?',
        },
        options: [
          { id: 'a', text: { es: 'function isX(val): val is X { ... }', en: 'function isX(val): val is X { ... }' } },
          { id: 'b', text: { es: 'function isX(val): boolean { ... }', en: 'function isX(val): boolean { ... }' } },
          { id: 'c', text: { es: 'function isX(val): X { ... }', en: 'function isX(val): X { ... }' } },
          { id: 'd', text: { es: 'function isX(val): typeof X { ... }', en: 'function isX(val): typeof X { ... }' } },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'tq-unknown-3',
        question: {
          es: '¿Qué pasa si intentas acceder a .name en una variable de tipo unknown?',
          en: 'What happens if you try to access .name on a variable of type unknown?',
        },
        options: [
          { id: 'a', text: { es: 'Funciona normalmente', en: 'It works normally' } },
          { id: 'b', text: { es: 'Error en runtime', en: 'Runtime error' } },
          { id: 'c', text: { es: 'Error de compilación: hay que estrecharlo primero', en: 'Compilation error: you must narrow it first' } },
          { id: 'd', text: { es: 'Retorna undefined', en: 'Returns undefined' } },
        ],
        correctOptionId: 'c',
      },
    ],
  },
  {
    topicId: 'typescript-generics-utilities',
    passingScore: 2,
    questions: [
      {
        id: 'tq-generics-1',
        question: {
          es: '¿Qué hace Omit<User, "password" | "salt"> en TypeScript?',
          en: 'What does Omit<User, "password" | "salt"> do in TypeScript?',
        },
        options: [
          { id: 'a', text: { es: 'Agrega las propiedades password y salt', en: 'Adds password and salt properties' } },
          { id: 'b', text: { es: 'Crea un tipo con todas las propiedades de User excepto password y salt', en: 'Creates a type with all User properties except password and salt' } },
          { id: 'c', text: { es: 'Hace que password y salt sean opcionales', en: 'Makes password and salt optional' } },
          { id: 'd', text: { es: 'Valida que User tenga password y salt', en: 'Validates User has password and salt' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'tq-generics-2',
        question: {
          es: '¿Qué significa <T extends { id: string }> en un genérico?',
          en: 'What does <T extends { id: string }> mean in a generic?',
        },
        options: [
          { id: 'a', text: { es: 'T debe ser exactamente { id: string }', en: 'T must be exactly { id: string }' } },
          { id: 'b', text: { es: 'T puede ser cualquier tipo que tenga al menos una propiedad id de tipo string', en: 'T can be any type that has at least an id property of type string' } },
          { id: 'c', text: { es: 'T hereda de una clase con id', en: 'T inherits from a class with id' } },
          { id: 'd', text: { es: 'T es un string', en: 'T is a string' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'tq-generics-3',
        question: {
          es: '¿Cuándo usarías un genérico en vez de un tipo concreto?',
          en: 'When would you use a generic instead of a concrete type?',
        },
        options: [
          { id: 'a', text: { es: 'Siempre, para mayor flexibilidad', en: 'Always, for more flexibility' } },
          { id: 'b', text: { es: 'Cuando la misma lógica se aplica a múltiples tipos y quieres mantener type safety', en: 'When the same logic applies to multiple types and you want to maintain type safety' } },
          { id: 'c', text: { es: 'Solo en funciones, nunca en interfaces', en: 'Only in functions, never in interfaces' } },
          { id: 'd', text: { es: 'Cuando no sabes qué tipo será y usarías any', en: 'When you don\'t know what type it will be and would use any' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'typescript-discriminated-unions',
    passingScore: 2,
    questions: [
      {
        id: 'tq-unions-1',
        question: {
          es: '¿Qué propiedad actúa como discriminante en: { status: "ok"; data: T } | { status: "error"; error: string }?',
          en: 'Which property acts as discriminant in: { status: "ok"; data: T } | { status: "error"; error: string }?',
        },
        options: [
          { id: 'a', text: { es: 'data', en: 'data' } },
          { id: 'b', text: { es: 'status', en: 'status' } },
          { id: 'c', text: { es: 'error', en: 'error' } },
          { id: 'd', text: { es: 'T', en: 'T' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'tq-unions-2',
        question: {
          es: '¿Qué pasa si olvidas un caso en un switch sobre una unión discriminada con exhaustiveness checking?',
          en: 'What happens if you forget a case in a switch over a discriminated union with exhaustiveness checking?',
        },
        options: [
          { id: 'a', text: { es: 'Nada, funciona normalmente', en: 'Nothing, it works normally' } },
          { id: 'b', text: { es: 'Error de compilación que te dice qué caso falta', en: 'Compilation error telling you which case is missing' } },
          { id: 'c', text: { es: 'Error en runtime', en: 'Runtime error' } },
          { id: 'd', text: { es: 'Warning pero compila', en: 'Warning but it compiles' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'tq-unions-3',
        question: {
          es: 'Después de verificar if (result.status === "ok"), ¿TypeScript sabe que result.data existe?',
          en: 'After checking if (result.status === "ok"), does TypeScript know that result.data exists?',
        },
        options: [
          { id: 'a', text: { es: 'No, siempre hay que usar as', en: 'No, you always need to use as' } },
          { id: 'b', text: { es: 'Sí, TypeScript estrecha el tipo automáticamente (type narrowing)', en: 'Yes, TypeScript narrows the type automatically (type narrowing)' } },
          { id: 'c', text: { es: 'Solo si usas un type guard', en: 'Only if you use a type guard' } },
          { id: 'd', text: { es: 'Solo dentro de funciones, no en if', en: 'Only inside functions, not in if' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
];
