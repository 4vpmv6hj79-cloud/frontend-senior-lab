import type { ContentBlock } from '../../models/learning.model';

export const TYPESCRIPT_UNKNOWN_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'El tipo unknown es la alternativa segura a any. Cuando recibes datos de una API, localStorage, o cualquier fuente externa, deberías tiparlo como unknown y validarlo antes de usarlo. TypeScript te obligará a verificar la estructura.',
      en: 'The unknown type is the safe alternative to any. When you receive data from an API, localStorage, or any external source, you should type it as unknown and validate it before using it. TypeScript will force you to verify the structure.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Malo: confiar ciegamente en datos externos
const data: UserResponse = await fetch('/api/user').then(r => r.json());
// Si la API cambia, tu app se rompe en runtime sin aviso

// Bueno: recibir como unknown y validar
const raw: unknown = await fetch('/api/user').then(r => r.json());

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    typeof (value as any).id === 'string'
  );
}

if (isUser(raw)) {
  // TypeScript sabe que raw es User aquí
  console.log(raw.name);
}`,
      en: `// Bad: blindly trust external data
const data: UserResponse = await fetch('/api/user').then(r => r.json());
// If the API changes, your app breaks at runtime with no warning

// Good: receive as unknown and validate
const raw: unknown = await fetch('/api/user').then(r => r.json());

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    typeof (value as any).id === 'string'
  );
}

if (isUser(raw)) {
  // TypeScript knows raw is User here
  console.log(raw.name);
}`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Para validaciones complejas, considera usar Zod: const UserSchema = z.object({ id: z.string(), name: z.string() }). Es más declarativo y genera el tipo automáticamente.',
      en: "For complex validations, consider using Zod: const UserSchema = z.object({ id: z.string(), name: z.string() }). It's more declarative and generates the type automatically.",
    },
  },
  {
    type: 'text',
    content: {
      es: 'Cuándo usar cada enfoque: 1) Type guards manuales → para validaciones simples (1-3 campos). 2) Zod/Valibot → para objetos complejos con muchos campos y validaciones anidadas. 3) class-validator → si vienes de NestJS y quieres consistencia frontend/backend. La regla es: si tu type guard tiene más de 10 líneas, usa Zod.',
      en: 'When to use each approach: 1) Manual type guards → for simple validations (1-3 fields). 2) Zod/Valibot → for complex objects with many fields and nested validations. 3) class-validator → if you come from NestJS and want frontend/backend consistency. The rule: if your type guard is more than 10 lines, use Zod.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Ejemplo con Zod (librería de validación)
import { z } from 'zod';

// Define el esquema (sirve como tipo Y validador)
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string().datetime(),
});

// El tipo se infiere automáticamente del esquema
type User = z.infer<typeof UserSchema>;

// Validar datos de la API
const response = await fetch('/api/user');
const raw = await response.json();
const result = UserSchema.safeParse(raw);

if (result.success) {
  // result.data es tipo User (seguro)
  console.log(result.data.name);
} else {
  // result.error tiene los errores detallados
  console.error(result.error.issues);
}`,
      en: `// Example with Zod (validation library)
import { z } from 'zod';

// Define the schema (serves as type AND validator)
const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.string().datetime(),
});

// Type is inferred automatically from the schema
type User = z.infer<typeof UserSchema>;

// Validate API data
const response = await fetch('/api/user');
const raw = await response.json();
const result = UserSchema.safeParse(raw);

if (result.success) {
  // result.data is type User (safe)
  console.log(result.data.name);
} else {
  // result.error has detailed errors
  console.error(result.error.issues);
}`,
    },
    language: 'typescript',
  },
];

export const TYPESCRIPT_GENERICS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Los genéricos te permiten crear funciones y tipos reutilizables que mantienen seguridad de tipos. Los constraints (extends) limitan qué tipos son aceptados, y los utility types (Partial, Pick, Omit) transforman tipos existentes.',
      en: 'Generics allow you to create reusable functions and types that maintain type safety. Constraints (extends) limit which types are accepted, and utility types (Partial, Pick, Omit) transform existing types.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Genérico con constraint: solo acepta objetos con id
function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find(item => item.id === id);
}

// TypeScript infiere el tipo de retorno automáticamente
const user = findById(users, '123'); // tipo: User | undefined

// Utility types para transformar tipos
type CreateUserDTO = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDTO = Partial<Pick<User, 'name' | 'email'>>;

// Mapped type: hacer todas las propiedades opcionales y readonly
type Snapshot<T> = {
  readonly [K in keyof T]?: T[K];
};`,
      en: `// Generic with constraint: only accepts objects with id
function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find(item => item.id === id);
}

// TypeScript infers the return type automatically
const user = findById(users, '123'); // type: User | undefined

// Utility types to transform types
type CreateUserDTO = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDTO = Partial<Pick<User, 'name' | 'email'>>;

// Mapped type: make all properties optional and readonly
type Snapshot<T> = {
  readonly [K in keyof T]?: T[K];
};`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'No hagas todo genérico "por si acaso". Usa genéricos cuando la misma lógica se aplica a múltiples tipos. Si solo se usa con un tipo, un tipo concreto es más legible.',
      en: 'Don\'t make everything generic "just in case". Use generics when the same logic applies to multiple types. If it\'s only used with one type, a concrete type is more readable.',
    },
  },
];

export const TYPESCRIPT_UNIONS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Los discriminated unions modelan estados que son mutuamente excluyentes. TypeScript usa un campo "discriminante" (como status o type) para estrechar automáticamente el tipo dentro de un if o switch.',
      en: 'Discriminated unions model states that are mutually exclusive. TypeScript uses a "discriminant" field (like status or type) to automatically narrow the type inside an if or switch.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Estado de una petición HTTP modelado con unión discriminada
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function renderState(state: RequestState<User[]>) {
  switch (state.status) {
    case 'idle':
      return 'Haz clic para buscar';
    case 'loading':
      return 'Cargando...';
    case 'success':
      // TypeScript sabe que state.data existe aquí
      return \`\${state.data.length} usuarios\`;
    case 'error':
      // TypeScript sabe que state.error existe aquí
      return \`Error: \${state.error}\`;
  }
  // Si olvidas un caso, TypeScript te avisa (exhaustiveness)
}`,
      en: `// HTTP request state modeled with discriminated union
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function renderState(state: RequestState<User[]>) {
  switch (state.status) {
    case 'idle':
      return 'Click to search';
    case 'loading':
      return 'Loading...';
    case 'success':
      // TypeScript knows state.data exists here
      return \`\${state.data.length} users\`;
    case 'error':
      // TypeScript knows state.error exists here
      return \`Error: \${state.error}\`;
  }
  // If you forget a case, TypeScript warns you (exhaustiveness)
}`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Usa discriminated unions para modelar cualquier cosa con estados: formularios (pristine/dirty/submitted), conexiones (connecting/connected/disconnected), permisos (granted/denied/pending).',
      en: 'Use discriminated unions to model anything with states: forms (pristine/dirty/submitted), connections (connecting/connected/disconnected), permissions (granted/denied/pending).',
    },
  },
];
