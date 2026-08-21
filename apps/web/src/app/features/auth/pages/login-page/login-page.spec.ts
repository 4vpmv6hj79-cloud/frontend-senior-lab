import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { Auth } from '@angular/fire/auth';
import { LanguageService } from '../../../../core/i18n/language.service';
import { AuthStore } from '../../services/auth.store';
import { LoginPage } from './login-page';

// Mock Firebase Auth to prevent real initialization
vi.mock('@angular/fire/auth', async () => {
  const actual = await vi.importActual('@angular/fire/auth');
  return {
    ...actual,
    onAuthStateChanged: vi.fn((_auth, callback) => {
      callback(null);
      return () => {};
    }),
    createUserWithEmailAndPassword: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
    signInWithPopup: vi.fn(),
    signOut: vi.fn().mockResolvedValue(undefined),
    updateProfile: vi.fn().mockResolvedValue(undefined),
    sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
    GoogleAuthProvider: vi.fn(),
  };
});

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authStore: AuthStore;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideRouter([{ path: 'dashboard', component: LoginPage }]),
        { provide: Auth, useValue: {} },
      ],
    }).compileComponents();

    authStore = TestBed.inject(AuthStore);
    router = TestBed.inject(Router);

    const languageService = TestBed.inject(LanguageService);
    languageService.setLanguage('es');

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  function pageContent(): string {
    return fixture.nativeElement.textContent;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the login form', () => {
    expect(pageContent()).toContain('Iniciar sesión');
  });

  it('should not submit when form is invalid (empty fields)', async () => {
    await component['submit']();
    fixture.detectChanges();

    expect(authStore.isAuthenticated()).toBe(false);
  });

  it('should show error when login fails', async () => {
    // Mock login to return failure
    vi.spyOn(authStore, 'login').mockResolvedValue({
      success: false,
      error: 'invalid-credentials',
    });

    component['form'].setValue({
      email: 'test@test.com',
      password: 'Password1',
    });

    await component['submit']();
    fixture.detectChanges();

    expect(pageContent()).toContain('no son correctos');
    expect(component['authError']()).toBe('invalid-credentials');
  });

  it('should navigate to dashboard on successful login', async () => {
    const testUser = {
      id: 'u1',
      name: 'Test',
      email: 'test@test.com',
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(authStore, 'login').mockResolvedValue({
      success: true,
      user: testUser,
    });

    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component['form'].setValue({
      email: 'test@test.com',
      password: 'Password1',
    });

    await component['submit']();

    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to returnUrl when provided', async () => {
    const testUser = {
      id: 'u1',
      name: 'Test',
      email: 'test@test.com',
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(authStore, 'login').mockResolvedValue({
      success: true,
      user: testUser,
    });

    const navigateByUrlSpy = vi
      .spyOn(router, 'navigateByUrl')
      .mockResolvedValue(true);

    // Mock returnUrl query param
    Object.defineProperty(component['route'].snapshot.queryParamMap, 'get', {
      value: (key: string) => (key === 'returnUrl' ? '/learning' : null),
    });

    component['form'].setValue({
      email: 'test@test.com',
      password: 'Password1',
    });

    await component['submit']();

    expect(navigateByUrlSpy).toHaveBeenCalledWith('/learning');
  });

  it('should not redirect to external URLs via returnUrl', async () => {
    const testUser = {
      id: 'u1',
      name: 'Test',
      email: 'test@test.com',
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(authStore, 'login').mockResolvedValue({
      success: true,
      user: testUser,
    });

    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const navigateByUrlSpy = vi
      .spyOn(router, 'navigateByUrl')
      .mockResolvedValue(true);

    // Mock malicious returnUrl
    Object.defineProperty(component['route'].snapshot.queryParamMap, 'get', {
      value: (key: string) => (key === 'returnUrl' ? '//evil.com' : null),
    });

    component['form'].setValue({
      email: 'test@test.com',
      password: 'Password1',
    });

    await component['submit']();

    // Should go to dashboard, NOT to the external URL
    expect(navigateByUrlSpy).not.toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });
});
