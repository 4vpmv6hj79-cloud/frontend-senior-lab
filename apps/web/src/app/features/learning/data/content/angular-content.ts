import type { ContentBlock } from '../../models/learning.model';

export const ANGULAR_SIGNALS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Los Signals son el nuevo sistema de reactividad de Angular que permiten declarar estado reactivo sin necesidad de Zone.js. Un signal es un wrapper alrededor de un valor que notifica a los consumidores cuando cambia.',
      en: 'Signals are Angular new reactivity system that allows declaring reactive state without needing Zone.js. A signal is a wrapper around a value that notifies consumers when it changes.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Crear un signal con valor inicial
const count = signal(0);

// Leer el valor actual (llamando al signal como función)
console.log(count()); // 0

// Actualizar el valor
count.set(5);
count.update(current => current + 1);

// Crear un valor derivado con computed
const doubled = computed(() => count() * 2);

// Reaccionar a cambios con effect
effect(() => {
  console.log('Count changed:', count());
});`,
      en: `// Create a signal with initial value
const count = signal(0);

// Read the current value (calling the signal as a function)
console.log(count()); // 0

// Update the value
count.set(5);
count.update(current => current + 1);

// Create a derived value with computed
const doubled = computed(() => count() * 2);

// React to changes with effect
effect(() => {
  console.log('Count changed:', count());
});`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Usa computed() para derivar valores — nunca hagas cálculos directamente en el template. Esto mejora el rendimiento porque Angular solo recalcula cuando las dependencias cambian.',
      en: 'Use computed() to derive values — never do calculations directly in the template. This improves performance because Angular only recalculates when dependencies change.',
    },
  },
  {
    type: 'text',
    content: {
      es: 'La diferencia clave entre signals y observables (RxJS) es que los signals son síncronos y siempre tienen un valor actual. Los observables son para flujos asíncronos. En la práctica, usa signals para estado de UI y observables para eventos del servidor o del usuario.',
      en: 'The key difference between signals and observables (RxJS) is that signals are synchronous and always have a current value. Observables are for asynchronous flows. In practice, use signals for UI state and observables for server or user events.',
    },
  },
  {
    type: 'text',
    content: {
      es: 'Errores comunes con Signals: 1) No llames a un signal dentro de un setTimeout o callback — Angular no lo rastreará. 2) Nunca mutes el valor de un signal directamente (ej: miArray.push()) — siempre crea una nueva referencia. 3) Los effects no deberían escribir en otros signals (causa bucles). 4) computed() es lazy — solo se recalcula cuando alguien lo lee.',
      en: "Common mistakes with Signals: 1) Don't call a signal inside setTimeout or callbacks — Angular won't track it. 2) Never mutate a signal value directly (e.g., myArray.push()) — always create a new reference. 3) Effects should not write to other signals (causes loops). 4) computed() is lazy — only recalculates when someone reads it.",
    },
  },
  {
    type: 'code',
    content: {
      es: `// Ejemplo real: carrito de compras con signals
export class CartStore {
  private readonly items = signal<CartItem[]>([]);

  // Derivaciones automáticas
  readonly itemCount = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  // Métodos que producen NUEVAS referencias (no mutan)
  addItem(product: Product): void {
    this.items.update(current => [
      ...current,
      { ...product, qty: 1 }
    ]);
  }

  removeItem(id: string): void {
    this.items.update(current =>
      current.filter(item => item.id !== id)
    );
  }
}`,
      en: `// Real-world example: shopping cart with signals
export class CartStore {
  private readonly items = signal<CartItem[]>([]);

  // Automatic derivations
  readonly itemCount = computed(() => this.items().length);
  readonly total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.qty, 0)
  );

  // Methods that produce NEW references (no mutation)
  addItem(product: Product): void {
    this.items.update(current => [
      ...current,
      { ...product, qty: 1 }
    ]);
  }

  removeItem(id: string): void {
    this.items.update(current =>
      current.filter(item => item.id !== id)
    );
  }
}`,
    },
    language: 'typescript',
  },
];

export const ANGULAR_ONPUSH_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'La estrategia OnPush le dice a Angular: "solo revisa este componente si sus @Input cambian de referencia o si un evento interno ocurre". Esto reduce drásticamente los ciclos de change detection en apps grandes.',
      en: 'The OnPush strategy tells Angular: "only check this component if its @Input references change or if an internal event occurs". This drastically reduces change detection cycles in large apps.',
    },
  },
  {
    type: 'code',
    content: {
      es: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- Correcto: signal que Angular puede rastrear -->
    <p>{{ userName() }}</p>

    <!-- Incorrecto con OnPush: mutar un objeto no dispara CD -->
    <!-- user.name = 'new'; // NO funciona -->

    <!-- Correcto: crear una nueva referencia -->
    <!-- user = { ...user, name: 'new' }; // SÍ funciona -->
  \`
})
export class ProfileCard {
  // Con signals: Angular detecta cambios automáticamente
  readonly userName = signal('Erik');

  // Con inputs: la referencia debe cambiar
  readonly user = input.required<User>();
}`,
      en: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <!-- Correct: signal that Angular can track -->
    <p>{{ userName() }}</p>

    <!-- Incorrect with OnPush: mutating an object won't trigger CD -->
    <!-- user.name = 'new'; // DOES NOT work -->

    <!-- Correct: create a new reference -->
    <!-- user = { ...user, name: 'new' }; // WORKS -->
  \`
})
export class ProfileCard {
  // With signals: Angular detects changes automatically
  readonly userName = signal('Erik');

  // With inputs: the reference must change
  readonly user = input.required<User>();
}`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Regla de oro: TODOS tus componentes deberían usar OnPush. Si alguno no funciona con OnPush, probablemente tiene un bug de mutación que se manifestará después de todas formas.',
      en: "Golden rule: ALL your components should use OnPush. If one doesn't work with OnPush, it probably has a mutation bug that will manifest later anyway.",
    },
  },
];

export const ANGULAR_RXJS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'RxJS sigue siendo esencial para manejar: peticiones HTTP concurrentes, WebSockets, eventos del usuario que necesitan debounce/throttle, y cancelación de operaciones. La clave es saber cuándo usar RxJS y cuándo signals.',
      en: 'RxJS remains essential for handling: concurrent HTTP requests, WebSockets, user events that need debounce/throttle, and operation cancellation. The key is knowing when to use RxJS and when signals.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Patrón: búsqueda con debounce y cancelación automática
readonly searchResults = toSignal(
  toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(term => term.length >= 3),
    switchMap(term =>
      this.searchService.search(term)
    ),
  ),
  { initialValue: [] }
);

// switchMap cancela la petición anterior si llega una nueva
// debounceTime evita llamadas mientras el usuario escribe
// toSignal convierte el observable en un signal para la vista`,
      en: `// Pattern: search with debounce and automatic cancellation
readonly searchResults = toSignal(
  toObservable(this.searchTerm).pipe(
    debounceTime(300),
    distinctUntilChanged(),
    filter(term => term.length >= 3),
    switchMap(term =>
      this.searchService.search(term)
    ),
  ),
  { initialValue: [] }
);

// switchMap cancels the previous request if a new one arrives
// debounceTime prevents calls while the user types
// toSignal converts the observable into a signal for the view`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Nunca suscribas manualmente con .subscribe() en componentes. Usa toSignal() para convertir observables en signals, o AsyncPipe en el template. Las suscripciones manuales causan memory leaks.',
      en: 'Never manually subscribe with .subscribe() in components. Use toSignal() to convert observables to signals, or AsyncPipe in templates. Manual subscriptions cause memory leaks.',
    },
  },
];
