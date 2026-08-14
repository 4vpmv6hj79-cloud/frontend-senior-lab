import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  Router,
  RouterLink,
} from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { AuthErrorCode } from '../../models/auth.model';
import { AuthStore } from '../../services/auth.store';
import { AUTH_PAGE_COPY } from '../auth-page.copy';

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * Strict email pattern that requires:
 * - Valid characters before @ (letters, numbers, dots, hyphens, underscores)
 * - An @ symbol
 * - A domain name with at least one dot
 * - Only valid/common TLDs (com, net, org, io, dev, co, mx, es, etc.)
 */
const EMAIL_PATTERN =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|io|dev|co|mx|es|ar|cl|pe|info|app|me|us|uk|ca|au|de|fr|it|br|jp|xyz|tech|online|site|store|pro|biz)$/;

/**
 * Name pattern: only letters (including accented), spaces, and hyphens.
 * Minimum 2 characters.
 * Examples valid: "Erik", "María José", "Jean-Pierre", "José López"
 * Examples invalid: "test123", "@user", "name!"
 */
const NAME_PATTERN =
  /^[a-zA-ZáéíóúñüÁÉÍÓÚÑÜàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜç\s\-]{2,50}$/;

function passwordsMatchValidator(
  control: AbstractControl,
): ValidationErrors | null {
  const password =
    control.get('password')?.value;

  const confirmPassword =
    control.get('confirmPassword')?.value;

  if (
    !password ||
    !confirmPassword ||
    password === confirmPassword
  ) {
    return null;
  }

  return {
    passwordsDoNotMatch: true,
  };
}

@Component({
  selector: 'app-register-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  protected readonly languageService =
    inject(LanguageService);

  private readonly formBuilder =
    inject(NonNullableFormBuilder);

  private readonly authStore =
    inject(AuthStore);

  private readonly router =
    inject(Router);

  protected readonly submitting =
    signal(false);

  protected readonly authError =
    signal<AuthErrorCode | null>(null);

  protected readonly copy = computed(
    () =>
      AUTH_PAGE_COPY[
        this.languageService.language()
      ],
  );

  protected readonly authErrorMessage =
    computed(() => {
      const error = this.authError();

      if (error === 'email-in-use') {
        return this.copy().register.emailInUse;
      }

      if (error) {
        return this.copy().common.storageError;
      }

      return '';
    });

  protected readonly form =
    this.formBuilder.group(
      {
        name: this.formBuilder.control(
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern(NAME_PATTERN),
            ],
          },
        ),
        email: this.formBuilder.control(
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern(EMAIL_PATTERN),
            ],
          },
        ),
        password: this.formBuilder.control(
          '',
          {
            validators: [
              Validators.required,
              Validators.pattern(
                PASSWORD_PATTERN,
              ),
            ],
          },
        ),
        confirmPassword:
          this.formBuilder.control(
            '',
            {
              validators: [
                Validators.required,
              ],
            },
          ),
      },
      {
        validators:
          passwordsMatchValidator,
      },
    );

  protected async submit(): Promise<void> {
    this.authError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.submitting.set(true);

    const {
      name,
      email,
      password,
    } = this.form.getRawValue();

    const result =
      await this.authStore.register({
        name,
        email,
        password,
      });

    this.submitting.set(false);

    if (!result.success) {
      this.authError.set(result.error);

      return;
    }

    await this.router.navigate([
      '/dashboard',
    ]);
  }
}
