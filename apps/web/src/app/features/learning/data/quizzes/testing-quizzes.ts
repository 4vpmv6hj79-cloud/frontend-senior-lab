import type { TopicQuiz } from '../../models/topic-quiz.model';

export const TESTING_TOPIC_QUIZZES: readonly TopicQuiz[] = [
  {
    topicId: 'testing-behavior',
    passingScore: 2,
    questions: [
      {
        id: 'testq-beh-1',
        question: {
          es: '¿Cuál es un test orientado al comportamiento (no a implementación)?',
          en: 'Which is a behavior-oriented test (not implementation)?',
        },
        options: [
          { id: 'a', text: { es: 'Verificar que se llama a un método privado', en: 'Verify a private method is called' } },
          { id: 'b', text: { es: 'Verificar que el texto "3 resultados" aparece en el DOM tras buscar', en: 'Verify "3 results" text appears in DOM after searching' } },
          { id: 'c', text: { es: 'Verificar que el state interno tiene 3 items', en: 'Verify internal state has 3 items' } },
          { id: 'd', text: { es: 'Contar cuántas veces se renderiza el componente', en: 'Count how many times the component renders' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'testq-beh-2',
        question: {
          es: 'Si refactorizas la implementación sin cambiar la UI, ¿qué debería pasar con los tests?',
          en: 'If you refactor implementation without changing the UI, what should happen to tests?',
        },
        options: [
          { id: 'a', text: { es: 'Los tests deberían seguir pasando (son de comportamiento)', en: 'Tests should still pass (they test behavior)' } },
          { id: 'b', text: { es: 'Los tests siempre se rompen al refactorizar', en: 'Tests always break when refactoring' } },
          { id: 'c', text: { es: 'Hay que reescribir todos los tests', en: 'You need to rewrite all tests' } },
          { id: 'd', text: { es: 'No se puede refactorizar si hay tests', en: 'You cannot refactor if there are tests' } },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'testq-beh-3',
        question: {
          es: '¿Qué selector es preferible en Testing Library: getByTestId o getByRole?',
          en: 'Which selector is preferred in Testing Library: getByTestId or getByRole?',
        },
        options: [
          { id: 'a', text: { es: 'getByTestId siempre', en: 'getByTestId always' } },
          { id: 'b', text: { es: 'getByRole porque refleja cómo los usuarios y tecnologías asistivas encuentran elementos', en: 'getByRole because it reflects how users and assistive technologies find elements' } },
          { id: 'c', text: { es: 'querySelector con clases CSS', en: 'querySelector with CSS classes' } },
          { id: 'd', text: { es: 'No importa, todos son equivalentes', en: 'It does not matter, all are equivalent' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'testing-mocks-contracts',
    passingScore: 2,
    questions: [
      {
        id: 'testq-mock-1',
        question: {
          es: '¿Cuándo es apropiado usar un mock?',
          en: 'When is it appropriate to use a mock?',
        },
        options: [
          { id: 'a', text: { es: 'Para todo, así los tests son más rápidos', en: 'For everything, so tests are faster' } },
          { id: 'b', text: { es: 'En los bordes/límites del sistema: HTTP, localStorage, timers, servicios externos', en: 'At system boundaries: HTTP, localStorage, timers, external services' } },
          { id: 'c', text: { es: 'Nunca, siempre usar datos reales', en: 'Never, always use real data' } },
          { id: 'd', text: { es: 'Solo en tests E2E', en: 'Only in E2E tests' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'testq-mock-2',
        question: {
          es: '¿Cuál es el riesgo de mockear demasiado?',
          en: 'What is the risk of mocking too much?',
        },
        options: [
          { id: 'a', text: { es: 'Los tests son más lentos', en: 'Tests are slower' } },
          { id: 'b', text: { es: 'Los tests pasan pero no prueban nada real — falsa confianza', en: 'Tests pass but prove nothing real — false confidence' } },
          { id: 'c', text: { es: 'TypeScript no permite muchos mocks', en: 'TypeScript does not allow many mocks' } },
          { id: 'd', text: { es: 'No hay riesgo', en: 'There is no risk' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'testq-mock-3',
        question: {
          es: '¿Qué diferencia hay entre un mock y un stub?',
          en: 'What is the difference between a mock and a stub?',
        },
        options: [
          { id: 'a', text: { es: 'Son lo mismo', en: 'They are the same' } },
          { id: 'b', text: { es: 'Un stub retorna valores predefinidos; un mock además verifica que fue llamado de cierta forma', en: 'A stub returns predefined values; a mock also verifies it was called in a certain way' } },
          { id: 'c', text: { es: 'Un mock es más rápido', en: 'A mock is faster' } },
          { id: 'd', text: { es: 'Un stub solo funciona con clases', en: 'A stub only works with classes' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'testing-pyramid',
    passingScore: 2,
    questions: [
      {
        id: 'testq-pyr-1',
        question: {
          es: '¿Cuál es el ratio típico de la pirámide de pruebas?',
          en: 'What is the typical ratio of the testing pyramid?',
        },
        options: [
          { id: 'a', text: { es: '70% E2E, 20% integration, 10% unit', en: '70% E2E, 20% integration, 10% unit' } },
          { id: 'b', text: { es: '70% unit, 20% integration, 10% E2E', en: '70% unit, 20% integration, 10% E2E' } },
          { id: 'c', text: { es: '33% de cada tipo', en: '33% of each type' } },
          { id: 'd', text: { es: '100% E2E es suficiente', en: '100% E2E is sufficient' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'testq-pyr-2',
        question: {
          es: '¿Para qué sirven los tests E2E?',
          en: 'What are E2E tests for?',
        },
        options: [
          { id: 'a', text: { es: 'Probar cada función aislada', en: 'Test each isolated function' } },
          { id: 'b', text: { es: 'Verificar que flujos críticos completos funcionan (registro → pago → confirmación)', en: 'Verify complete critical flows work (register → payment → confirmation)' } },
          { id: 'c', text: { es: 'Reemplazar todos los unit tests', en: 'Replace all unit tests' } },
          { id: 'd', text: { es: 'Solo para detectar errores CSS', en: 'Only to detect CSS errors' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'testq-pyr-3',
        question: {
          es: '¿Cuándo es correcto NO escribir un test para una funcionalidad?',
          en: 'When is it correct NOT to write a test for a feature?',
        },
        options: [
          { id: 'a', text: { es: 'Nunca, todo necesita tests', en: 'Never, everything needs tests' } },
          { id: 'b', text: { es: 'Cuando el costo de mantenimiento del test supera el riesgo del bug que previene', en: 'When the maintenance cost of the test exceeds the risk of the bug it prevents' } },
          { id: 'c', text: { es: 'Cuando hay prisa por entregar', en: 'When there is a rush to deliver' } },
          { id: 'd', text: { es: 'Si el código es simple', en: 'If the code is simple' } },
        ],
        correctOptionId: 'b',
      },
    ],
  },
];
