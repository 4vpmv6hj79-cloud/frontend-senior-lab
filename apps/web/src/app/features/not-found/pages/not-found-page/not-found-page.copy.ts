import type { SupportedLanguage } from '../../../../core/i18n/language.service';

interface NotFoundPageCopy {
  readonly title: string;
  readonly code: string;
  readonly description: string;
  readonly suggestion: string;
  readonly backHome: string;
  readonly goToDashboard: string;
}

export const NOT_FOUND_PAGE_COPY = {
  es: {
    title: 'Página no encontrada',
    code: '404',
    description:
      'La página que estás buscando no existe o ha sido movida a otra ubicación.',
    suggestion:
      'Verifica la URL o regresa al inicio para continuar con tu aprendizaje.',
    backHome: 'Volver al inicio',
    goToDashboard: 'Ir al panel',
  },
  en: {
    title: 'Page not found',
    code: '404',
    description:
      'The page you are looking for does not exist or has been moved to a different location.',
    suggestion:
      'Check the URL or go back to the home page to continue your learning journey.',
    backHome: 'Back to home',
    goToDashboard: 'Go to dashboard',
  },
} as const satisfies Record<SupportedLanguage, NotFoundPageCopy>;
