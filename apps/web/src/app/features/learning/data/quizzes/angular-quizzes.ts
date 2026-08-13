import type { TopicQuiz } from '../../models/topic-quiz.model';

export const ANGULAR_TOPIC_QUIZZES: readonly TopicQuiz[] = [
  {
    topicId: 'angular-signals',
    passingScore: 2,
    questions: [
      {
        id: 'aq-signals-1',
        question: {
          es: '¿Qué función usas para crear un valor derivado que se recalcula automáticamente cuando sus dependencias cambian?',
          en: 'Which function do you use to create a derived value that recalculates automatically when its dependencies change?',
        },
        options: [
          { id: 'a', text: { es: 'effect()', en: 'effect()' } },
          { id: 'b', text: { es: 'computed()', en: 'computed()' } },
          { id: 'c', text: { es: 'signal()', en: 'signal()' } },
          { id: 'd', text: { es: 'watch()', en: 'watch()' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'aq-signals-2',
        question: {
          es: '¿Cuál es la forma correcta de actualizar un signal basándose en su valor anterior?',
          en: 'What is the correct way to update a signal based on its previous value?',
        },
        options: [
          {
            id: 'a',
            text: {
              es: 'count.set(count() + 1)',
              en: 'count.set(count() + 1)',
            },
          },
          {
            id: 'b',
            text: {
              es: 'count.update(c => c + 1)',
              en: 'count.update(c => c + 1)',
            },
          },
          { id: 'c', text: { es: 'count++ ', en: 'count++' } },
          {
            id: 'd',
            text: {
              es: 'count.next(count() + 1)',
              en: 'count.next(count() + 1)',
            },
          },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'aq-signals-3',
        question: {
          es: '¿Por qué NO deberías escribir en un signal dentro de un effect()?',
          en: 'Why should you NOT write to a signal inside an effect()?',
        },
        options: [
          {
            id: 'a',
            text: {
              es: 'Causa errores de compilación',
              en: 'It causes compilation errors',
            },
          },
          {
            id: 'b',
            text: {
              es: 'Puede crear bucles infinitos de actualización',
              en: 'It can create infinite update loops',
            },
          },
          {
            id: 'c',
            text: {
              es: 'Los effects son de solo lectura',
              en: 'Effects are read-only',
            },
          },
          {
            id: 'd',
            text: {
              es: 'Angular no lo permite',
              en: 'Angular does not allow it',
            },
          },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'angular-onpush',
    passingScore: 2,
    questions: [
      {
        id: 'aq-onpush-1',
        question: {
          es: '¿Qué debe cambiar para que un componente OnPush detecte actualizaciones de un @Input?',
          en: 'What must change for an OnPush component to detect @Input updates?',
        },
        options: [
          {
            id: 'a',
            text: {
              es: 'El valor interno del objeto',
              en: 'The internal value of the object',
            },
          },
          {
            id: 'b',
            text: {
              es: 'La referencia del objeto (nueva instancia)',
              en: 'The object reference (new instance)',
            },
          },
          { id: 'c', text: { es: 'El tipo del dato', en: 'The data type' } },
          {
            id: 'd',
            text: { es: 'El nombre de la propiedad', en: 'The property name' },
          },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'aq-onpush-2',
        question: {
          es: '¿Cuál es el beneficio principal de usar OnPush en todos los componentes?',
          en: 'What is the main benefit of using OnPush in all components?',
        },
        options: [
          {
            id: 'a',
            text: {
              es: 'Permite usar más decoradores',
              en: 'It allows using more decorators',
            },
          },
          {
            id: 'b',
            text: {
              es: 'Reduce drásticamente los ciclos de change detection innecesarios',
              en: 'It drastically reduces unnecessary change detection cycles',
            },
          },
          {
            id: 'c',
            text: {
              es: 'Hace que los templates se compilen más rápido',
              en: 'It makes templates compile faster',
            },
          },
          {
            id: 'd',
            text: {
              es: 'Elimina la necesidad de Zone.js',
              en: 'It eliminates the need for Zone.js',
            },
          },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'aq-onpush-3',
        question: {
          es: 'Con OnPush, ¿qué pasa si haces `this.user.name = "nuevo"` (mutación directa)?',
          en: 'With OnPush, what happens if you do `this.user.name = "new"` (direct mutation)?',
        },
        options: [
          {
            id: 'a',
            text: {
              es: 'La vista se actualiza normalmente',
              en: 'The view updates normally',
            },
          },
          {
            id: 'b',
            text: {
              es: 'La vista NO se actualiza porque la referencia no cambió',
              en: 'The view does NOT update because the reference did not change',
            },
          },
          {
            id: 'c',
            text: {
              es: 'Angular lanza un error',
              en: 'Angular throws an error',
            },
          },
          {
            id: 'd',
            text: {
              es: 'Se actualiza después de 1 segundo',
              en: 'It updates after 1 second',
            },
          },
        ],
        correctOptionId: 'b',
      },
    ],
  },
  {
    topicId: 'angular-rxjs-cancellation',
    passingScore: 2,
    questions: [
      {
        id: 'aq-rxjs-1',
        question: {
          es: '¿Qué operador RxJS cancela automáticamente la petición anterior cuando llega una nueva?',
          en: 'Which RxJS operator automatically cancels the previous request when a new one arrives?',
        },
        options: [
          { id: 'a', text: { es: 'mergeMap', en: 'mergeMap' } },
          { id: 'b', text: { es: 'switchMap', en: 'switchMap' } },
          { id: 'c', text: { es: 'concatMap', en: 'concatMap' } },
          { id: 'd', text: { es: 'exhaustMap', en: 'exhaustMap' } },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'aq-rxjs-2',
        question: {
          es: '¿Cuál es la forma recomendada de consumir un observable en un componente Angular moderno?',
          en: 'What is the recommended way to consume an observable in a modern Angular component?',
        },
        options: [
          {
            id: 'a',
            text: {
              es: '.subscribe() manual en ngOnInit',
              en: 'Manual .subscribe() in ngOnInit',
            },
          },
          {
            id: 'b',
            text: {
              es: 'toSignal() para convertirlo en un signal',
              en: 'toSignal() to convert it to a signal',
            },
          },
          {
            id: 'c',
            text: {
              es: 'Guardar el observable en una variable global',
              en: 'Store the observable in a global variable',
            },
          },
          {
            id: 'd',
            text: {
              es: 'Usar setTimeout para esperar el valor',
              en: 'Use setTimeout to wait for the value',
            },
          },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'aq-rxjs-3',
        question: {
          es: '¿Qué problema causa una suscripción manual (.subscribe()) sin desuscribirse?',
          en: 'What problem does a manual subscription (.subscribe()) without unsubscribing cause?',
        },
        options: [
          {
            id: 'a',
            text: { es: 'Errores de TypeScript', en: 'TypeScript errors' },
          },
          {
            id: 'b',
            text: {
              es: 'Memory leaks y ejecución de lógica después de destruir el componente',
              en: 'Memory leaks and execution of logic after the component is destroyed',
            },
          },
          {
            id: 'c',
            text: {
              es: 'El template no se renderiza',
              en: 'The template does not render',
            },
          },
          {
            id: 'd',
            text: {
              es: 'No causa ningún problema',
              en: 'It causes no problems',
            },
          },
        ],
        correctOptionId: 'b',
      },
    ],
  },
];
