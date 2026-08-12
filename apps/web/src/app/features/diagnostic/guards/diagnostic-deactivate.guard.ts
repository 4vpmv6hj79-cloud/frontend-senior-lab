import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';

import { LanguageService } from '../../../core/i18n/language.service';
import type { DiagnosticPage } from '../pages/diagnostic-page/diagnostic-page';

const MESSAGES = {
  es: '¿Seguro que quieres salir? Tu progreso en el diagnóstico se perderá.',
  en: 'Are you sure you want to leave? Your diagnostic progress will be lost.',
} as const;

/**
 * Prevents navigation away from the diagnostic quiz if the user
 * has started answering but hasn't completed it yet.
 */
export const diagnosticDeactivateGuard: CanDeactivateFn<DiagnosticPage> = (
  component,
) => {
  const languageService = inject(LanguageService);

  // Allow navigation if the quiz hasn't started or is already completed
  if (!component.hasUnsavedProgress()) {
    return true;
  }

  const message = MESSAGES[languageService.language()];

  return window.confirm(message);
};
