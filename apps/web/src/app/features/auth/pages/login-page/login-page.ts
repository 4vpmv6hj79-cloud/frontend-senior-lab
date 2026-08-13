import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { AuthErrorCode } from '../../models/auth.model';
import { AuthStore } from '../../services/auth.store';
import { AUTH_PAGE_COPY } from '../auth-page.copy';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  protected readonly languageService = inject(LanguageService);

  private readonly formBuilder = inject(NonNullableFormBuilder);

  private readonly authStore = inject(AuthStore);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected readonly submitting = signal(false);

  protected readonly authError = signal<AuthErrorCode | null>(null);

  protected readonly resetEmailStatus = signal<'idle' | 'sent' | 'error'>(
    'idle',
  );

  protected readonly copy = computed(
    () => AUTH_PAGE_COPY[this.languageService.language()],
  );

  protected readonly authErrorMessage = computed(() => {
    const error = this.authError();

    if (error === 'invalid-credentials') {
      return this.copy().common.invalidCredentials;
    }

    if (error) {
      return this.copy().common.storageError;
    }

    return '';
  });

  protected readonly form = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
    }),
    password: this.formBuilder.control('', {
      validators: [Validators.required],
    }),
  });

  protected async submit(): Promise<void> {
    this.authError.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.submitting.set(true);

    const credentials = this.form.getRawValue();

    const result = await this.authStore.login(credentials);

    this.submitting.set(false);

    if (!result.success) {
      this.authError.set(result.error);

      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    const isSafeReturnUrl =
      returnUrl?.startsWith('/') && !returnUrl.startsWith('//');

    if (returnUrl && isSafeReturnUrl) {
      await this.router.navigateByUrl(returnUrl);

      return;
    }

    await this.router.navigate(['/dashboard']);
  }

  protected async sendResetEmail(): Promise<void> {
    const email = this.form.controls.email.value.trim();

    if (!email) {
      this.form.controls.email.markAsTouched();
      return;
    }

    try {
      const sent = await this.authStore.sendPasswordReset(email);
      this.resetEmailStatus.set(sent ? 'sent' : 'error');
    } catch {
      this.resetEmailStatus.set('error');
    }
  }
}
