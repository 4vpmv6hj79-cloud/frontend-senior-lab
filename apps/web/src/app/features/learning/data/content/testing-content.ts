import type { ContentBlock } from '../../models/learning.model';

export const TESTING_BEHAVIOR_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Las pruebas orientadas al comportamiento verifican lo que el usuario ve y hace — no la implementación interna. Si tu test se rompe al refactorizar sin cambiar la funcionalidad, es una señal de que estás probando implementación.',
      en: 'Behavior-focused tests verify what the user sees and does — not internal implementation. If your test breaks when refactoring without changing functionality, it\'s a sign you\'re testing implementation.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Malo: probar implementación
it('should call fetchUsers on init', () => {
  const spy = spyOn(service, 'fetchUsers');
  component.ngOnInit();
  expect(spy).toHaveBeenCalled(); // ¿Y qué?
});

// Bueno: probar comportamiento visible
it('should display a list of users after loading', async () => {
  // Arrange: mockear el servicio
  mockUserService.getUsers.mockResolvedValue([
    { name: 'Ana' }, { name: 'Carlos' }
  ]);

  // Act: renderizar el componente
  fixture.detectChanges();
  await fixture.whenStable();

  // Assert: verificar lo que el usuario VE
  const items = fixture.nativeElement
    .querySelectorAll('[data-testid="user-item"]');
  expect(items.length).toBe(2);
  expect(items[0].textContent).toContain('Ana');
});`,
      en: `// Bad: testing implementation
it('should call fetchUsers on init', () => {
  const spy = spyOn(service, 'fetchUsers');
  component.ngOnInit();
  expect(spy).toHaveBeenCalled(); // So what?
});

// Good: testing visible behavior
it('should display a list of users after loading', async () => {
  // Arrange: mock the service
  mockUserService.getUsers.mockResolvedValue([
    { name: 'Ana' }, { name: 'Carlos' }
  ]);

  // Act: render the component
  fixture.detectChanges();
  await fixture.whenStable();

  // Assert: verify what the user SEES
  const items = fixture.nativeElement
    .querySelectorAll('[data-testid="user-item"]');
  expect(items.length).toBe(2);
  expect(items[0].textContent).toContain('Ana');
});`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Pregúntate: "Si refactorizo el componente sin cambiar lo que el usuario ve, ¿se rompe mi test?" Si la respuesta es sí, tu test es frágil. Prueba el QUÉ, no el CÓMO.',
      en: 'Ask yourself: "If I refactor the component without changing what the user sees, does my test break?" If yes, your test is brittle. Test the WHAT, not the HOW.',
    },
  },
];

export const TESTING_MOCKS_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'Los mocks reemplazan dependencias reales (HTTP, servicios) con versiones controladas. Esto hace que tus tests sean rápidos (no esperan al servidor), deterministas (siempre retornan lo mismo), y aislados (un test no afecta a otro).',
      en: 'Mocks replace real dependencies (HTTP, services) with controlled versions. This makes your tests fast (don\'t wait for the server), deterministic (always return the same thing), and isolated (one test doesn\'t affect another).',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Mock de un servicio con Vitest
const mockAuthService = {
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: vi.fn(() => signal(false)),
};

// Proveerlo en TestBed
TestBed.configureTestingModule({
  providers: [
    { provide: AuthService, useValue: mockAuthService }
  ]
});

// En el test: controlar las respuestas
it('should show error on failed login', async () => {
  mockAuthService.login.mockResolvedValue({
    success: false,
    error: 'invalid-credentials'
  });

  await component.submit();
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent)
    .toContain('Credenciales incorrectas');
});`,
      en: `// Mock a service with Vitest
const mockAuthService = {
  login: vi.fn(),
  logout: vi.fn(),
  isAuthenticated: vi.fn(() => signal(false)),
};

// Provide it in TestBed
TestBed.configureTestingModule({
  providers: [
    { provide: AuthService, useValue: mockAuthService }
  ]
});

// In the test: control the responses
it('should show error on failed login', async () => {
  mockAuthService.login.mockResolvedValue({
    success: false,
    error: 'invalid-credentials'
  });

  await component.submit();
  fixture.detectChanges();

  expect(fixture.nativeElement.textContent)
    .toContain('Invalid credentials');
});`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'Solo mockea lo que cruce un límite (HTTP, localStorage, timers). Si mockeas todo, tus tests no prueban nada real. El equilibrio ideal: mocks en los bordes, código real en el centro.',
      en: 'Only mock what crosses a boundary (HTTP, localStorage, timers). If you mock everything, your tests prove nothing real. Ideal balance: mocks at the edges, real code in the center.',
    },
  },
];

export const TESTING_PYRAMID_CONTENT: readonly ContentBlock[] = [
  {
    type: 'text',
    content: {
      es: 'La pirámide de pruebas sugiere: muchos unit tests (rápidos, baratos), algunos integration tests (prueban interacción entre partes), y pocos E2E tests (lentos, frágiles pero realistas). El ratio típico es 70/20/10.',
      en: 'The testing pyramid suggests: many unit tests (fast, cheap), some integration tests (test interaction between parts), and few E2E tests (slow, brittle but realistic). The typical ratio is 70/20/10.',
    },
  },
  {
    type: 'code',
    content: {
      es: `// Unit test: lógica pura, sin Angular
describe('calculateLevel', () => {
  it('should return senior for >= 85%', () => {
    expect(calculateLevel(90)).toBe('senior');
  });
});

// Integration test: componente + servicio mock
describe('DashboardPage', () => {
  it('should show learning progress', () => {
    // Mock del store, render del componente, verificar DOM
  });
});

// E2E test: flujo completo (Playwright)
test('user can register and complete diagnostic', async ({ page }) => {
  await page.goto('/register');
  await page.fill('[name=email]', 'test@test.com');
  // ... flujo completo hasta ver resultados
  await expect(page.locator('h2')).toContainText('Senior');
});`,
      en: `// Unit test: pure logic, no Angular
describe('calculateLevel', () => {
  it('should return senior for >= 85%', () => {
    expect(calculateLevel(90)).toBe('senior');
  });
});

// Integration test: component + mock service
describe('DashboardPage', () => {
  it('should show learning progress', () => {
    // Store mock, component render, verify DOM
  });
});

// E2E test: full flow (Playwright)
test('user can register and complete diagnostic', async ({ page }) => {
  await page.goto('/register');
  await page.fill('[name=email]', 'test@test.com');
  // ... full flow until seeing results
  await expect(page.locator('h2')).toContainText('Senior');
});`,
    },
    language: 'typescript',
  },
  {
    type: 'tip',
    content: {
      es: 'No persigas cobertura por cobertura. Una línea cubierta no significa que esté bien probada. Enfócate en cubrir los caminos de riesgo: pagos, autenticación, operaciones destructivas.',
      en: 'Don\'t chase coverage for coverage\'s sake. A covered line doesn\'t mean it\'s well tested. Focus on covering risk paths: payments, authentication, destructive operations.',
    },
  },
];
