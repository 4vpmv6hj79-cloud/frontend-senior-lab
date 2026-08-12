import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { AuthStore } from '../../services/auth.store';
import { RegisterPage } from './register-page';

const ACCOUNTS_KEY = 'frontend-senior-lab.auth.accounts';
const SESSION_KEY = 'frontend-senior-lab.auth.session';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authStore: AuthStore;
  let router: Router;

  beforeEach(async () => {
    localStorage.removeItem(ACCOUNTS_KEY);
    localStorage.removeItem(SESSION_KEY);

    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        provideRouter([{ path: 'dashboard', component: RegisterPage }]),
      ],
    }).compileComponents();

    authStore = TestBed.inject(AuthStore);
    router = TestBed.inject(Router);

    const languageService = TestBed.inject(LanguageService);
    languageService.setLanguage('es');

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    authStore.logout();
    localStorage.removeItem(ACCOUNTS_KEY);
    localStorage.removeItem(SESSION_KEY);
  });

  function pageContent(): string {
    return fixture.nativeElement.textContent;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the register form', () => {
    expect(pageContent()).toContain('Crear cuenta');
  });

  it('should not submit when form is empty', async () => {
    await component['submit']();
    fixture.detectChanges();

    expect(authStore.isAuthenticated()).toBe(false);
  });

  it('should not submit with invalid password (missing uppercase)', async () => {
    component['form'].setValue({
      name: 'Test',
      email: 'test@test.com',
      password: 'password1',
      confirmPassword: 'password1',
    });

    await component['submit']();
    fixture.detectChanges();

    expect(authStore.isAuthenticated()).toBe(false);
  });

  it('should not submit when passwords do not match', async () => {
    component['form'].setValue({
      name: 'Test',
      email: 'test@test.com',
      password: 'Password1',
      confirmPassword: 'Password2',
    });

    await component['submit']();
    fixture.detectChanges();

    expect(authStore.isAuthenticated()).toBe(false);
  });

  it('should register successfully with valid data', async () => {
    const testUser = {
      id: 'u1',
      name: 'New User',
      email: 'new@test.com',
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(authStore, 'register').mockResolvedValue({
      success: true,
      user: testUser,
    });

    vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component['form'].setValue({
      name: 'New User',
      email: 'new@test.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    });

    await component['submit']();
    fixture.detectChanges();

    expect(authStore.register).toHaveBeenCalledWith({
      name: 'New User',
      email: 'new@test.com',
      password: 'Password1',
    });
  });

  it('should navigate to dashboard after successful registration', async () => {
    const testUser = {
      id: 'u1',
      name: 'Nav',
      email: 'nav@test.com',
      role: 'student' as const,
      createdAt: new Date().toISOString(),
    };

    vi.spyOn(authStore, 'register').mockResolvedValue({
      success: true,
      user: testUser,
    });

    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component['form'].setValue({
      name: 'Nav',
      email: 'nav@test.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    });

    await component['submit']();

    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show error when email is already in use', async () => {
    vi.spyOn(authStore, 'register').mockResolvedValue({
      success: false,
      error: 'email-in-use',
    });

    component['form'].setValue({
      name: 'Second',
      email: 'duplicate@test.com',
      password: 'Password1',
      confirmPassword: 'Password1',
    });

    await component['submit']();
    fixture.detectChanges();

    expect(pageContent()).toContain('Ya existe una cuenta con este correo');
  });
});
