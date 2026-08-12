import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { LanguageService } from '../../../../core/i18n/language.service';
import { AuthStore } from '../../../auth/services/auth.store';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout';
import { PROFILE_PAGE_COPY } from './profile-page.copy';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  private readonly languageService = inject(LanguageService);
  private readonly authStore = inject(AuthStore);

  protected readonly user = this.authStore.user;

  protected readonly nameValue = signal('');
  protected readonly nameError = signal(false);
  protected readonly showSavedMessage = signal(false);

  protected readonly copy = computed(
    () => PROFILE_PAGE_COPY[this.languageService.language()],
  );

  protected readonly canSave = computed(() => {
    const currentName = this.user()?.name ?? '';
    const newName = this.nameValue().trim();

    return newName.length >= 2 && newName !== currentName;
  });

  constructor() {
    // Initialize name from current user
    const user = this.authStore.user();

    if (user) {
      this.nameValue.set(user.name);
    }
  }

  protected onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nameValue.set(input.value);
    this.nameError.set(input.value.trim().length > 0 && input.value.trim().length < 2);
    this.showSavedMessage.set(false);
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    const newName = this.nameValue().trim();

    if (newName.length < 2) {
      this.nameError.set(true);
      return;
    }

    const success = this.authStore.updateName(newName);

    if (success) {
      this.nameError.set(false);
      this.showSavedMessage.set(true);

      setTimeout(() => this.showSavedMessage.set(false), 3000);
    }
  }

  protected formatDate(isoDate: string): string {
    try {
      return new Date(isoDate).toLocaleDateString(
        this.languageService.language() === 'es' ? 'es-MX' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' },
      );
    } catch {
      return isoDate;
    }
  }
}
