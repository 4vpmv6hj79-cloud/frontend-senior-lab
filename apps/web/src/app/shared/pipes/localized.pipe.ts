import {
  inject,
  Pipe,
  PipeTransform,
} from '@angular/core';

import { LanguageService } from '../../core/i18n/language.service';
import type { LocalizedText } from '../models/i18n.model';

/**
 * Pipe that resolves a LocalizedText object to the current language string.
 *
 * Usage: {{ someLocalizedText | localized }}
 *
 * Note: This pipe is impure because it depends on the reactive language signal.
 * Angular's signal-based change detection ensures it updates when the language changes.
 */
@Pipe({
  name: 'localized',
  standalone: true,
  pure: false,
})
export class LocalizedPipe implements PipeTransform {
  private readonly languageService = inject(LanguageService);

  transform(value: LocalizedText | null | undefined): string {
    if (!value) {
      return '';
    }

    return value[this.languageService.language()];
  }
}
