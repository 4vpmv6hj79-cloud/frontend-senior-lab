import type { ContentBlock } from '../../models/learning.model';

export const ARCHITECTURE_DOMAINS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'La arquitectura por dominios organiza tu aplicación según las áreas de negocio (no por tipo de archivo). Cada dominio es independiente, tiene su propia API pública y no accede a los internos de otros dominios.',
      en: 'Domain-driven architecture organizes your application by business areas (not by file type). Each domain is independent, has its own public API, and does not access the internals of other domains.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Estructura recomendada por dominios en un monorepo
libs/
├── shared/           # Tipos y utilidades transversales
├── auth/             # Dominio de autenticación
│   ├── data-access/  # Servicios, stores, HTTP
│   ├── feature/      # Componentes smart (páginas)
│   └── ui/           # Componentes presentacionales
├── orders/           # Dominio de pedidos
│   ├── data-access/
│   ├── feature/
│   └── ui/
└── catalog/          # Dominio de catálogo

// Regla de dependencia (enforzada por Nx):
// feature → data-access → shared ✓
// orders → auth/data-access ✗ (violación)
// orders → shared ✓`,
      en: `// Recommended domain structure in a monorepo
libs/
├── shared/           # Cross-cutting types and utilities
├── auth/             # Authentication domain
│   ├── data-access/  # Services, stores, HTTP
│   ├── feature/      # Smart components (pages)
│   └── ui/           # Presentational components
├── orders/           # Orders domain
│   ├── data-access/
│   ├── feature/
│   └── ui/
└── catalog/          # Catalog domain

// Dependency rule (enforced by Nx):
// feature → data-access → shared ✓
// orders → auth/data-access ✗ (violation)
// orders → shared ✓`,
    },
    language: 'plaintext',
  },
  {
    type: 'tip',
    content: {
      es: 'Usa nx enforce-module-boundaries para que un linter te avise si alguien importa algo que no debería. Esto previene que la arquitectura se degrade con el tiempo.',
      en: 'Use nx enforce-module-boundaries so a linter warns you if someone imports something they shouldn\'t. This prevents architecture from degrading over time.',
    },
  },
];

export const ARCHITECTURE_BOUNDARIES_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Los límites de dependencia definen qué puede importar qué. Sin ellos, una app de 100+ componentes termina como un espagueti donde cambiar un servicio rompe 15 features. Herramientas como Nx tags hacen cumplir estas reglas automáticamente.',
      en: 'Dependency boundaries define what can import what. Without them, a 100+ component app ends up as spaghetti where changing one service breaks 15 features. Tools like Nx tags enforce these rules automatically.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// En project.json de cada librería, asigna tags:
{ "tags": ["scope:orders", "type:feature"] }

// En .eslintrc.json, define las reglas:
"@nx/enforce-module-boundaries": ["error", {
  "depConstraints": [
    {
      "sourceTag": "type:feature",
      "onlyDependOnLibsWithTags": ["type:data-access", "type:ui"]
    },
    {
      "sourceTag": "scope:orders",
      "onlyDependOnLibsWithTags": ["scope:orders", "scope:shared"]
    }
  ]
}]
// Si alguien intenta importar auth desde orders → error de lint`,
      en: `// In each library's project.json, assign tags:
{ "tags": ["scope:orders", "type:feature"] }

// In .eslintrc.json, define the rules:
"@nx/enforce-module-boundaries": ["error", {
  "depConstraints": [
    {
      "sourceTag": "type:feature",
      "onlyDependOnLibsWithTags": ["type:data-access", "type:ui"]
    },
    {
      "sourceTag": "scope:orders",
      "onlyDependOnLibsWithTags": ["scope:orders", "scope:shared"]
    }
  ]
}]
// If someone tries to import auth from orders → lint error`,
    },
    language: 'json',
  },
  {
    type: 'tip',
    content: {
      es: 'Cada feature debe exponer una API pública mínima (solo lo necesario). Si otro feature necesita algo, probablemente debe ir en shared o necesitas un evento/servicio mediador.',
      en: 'Each feature should expose a minimal public API (only what\'s necessary). If another feature needs something, it probably belongs in shared or you need a mediator event/service.',
    },
  },
];

export const ARCHITECTURE_DESIGN_SYSTEMS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Un design system no es solo una librería de componentes — es un contrato entre diseño y código. Incluye: tokens (colores, spacing), componentes (botón, input), patrones (formularios, tablas), y documentación viva. El éxito depende de la governance tanto como del código.',
      en: 'A design system is not just a component library — it\'s a contract between design and code. It includes: tokens (colors, spacing), components (button, input), patterns (forms, tables), and living documentation. Success depends on governance as much as code.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Design tokens como CSS custom properties
:root {
  --ds-color-primary: #06b6d4;
  --ds-color-primary-hover: #0891b2;
  --ds-spacing-sm: 0.5rem;
  --ds-spacing-md: 1rem;
  --ds-radius-lg: 0.75rem;
}

// Componente del design system
@Component({
  selector: 'ds-button',
  template: \`
    <button
      [class]="variantClasses()"
      [disabled]="disabled()"
    >
      <ng-content />
    </button>
  \`,
  // El componente usa tokens, no valores hardcoded
  styles: \`button { border-radius: var(--ds-radius-lg); }\`
})
export class DsButton {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly disabled = input(false);
}`,
      en: `// Design tokens as CSS custom properties
:root {
  --ds-color-primary: #06b6d4;
  --ds-color-primary-hover: #0891b2;
  --ds-spacing-sm: 0.5rem;
  --ds-spacing-md: 1rem;
  --ds-radius-lg: 0.75rem;
}

// Design system component
@Component({
  selector: 'ds-button',
  template: \`
    <button
      [class]="variantClasses()"
      [disabled]="disabled()"
    >
      <ng-content />
    </button>
  \`,
  // Component uses tokens, not hardcoded values
  styles: \`button { border-radius: var(--ds-radius-lg); }\`
})
export class DsButton {
  readonly variant = input<'primary' | 'secondary'>('primary');
  readonly disabled = input(false);
}`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Empieza con 5-8 componentes básicos (Button, Input, Card, Badge, Modal). No intentes crear un design system completo antes de tener usuarios reales que lo consuman.',
      en: 'Start with 5-8 basic components (Button, Input, Card, Badge, Modal). Don\'t try to create a complete design system before having real users consuming it.',
    },
  },
];
