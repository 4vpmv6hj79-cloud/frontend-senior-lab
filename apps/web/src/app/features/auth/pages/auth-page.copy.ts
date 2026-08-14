import type { SupportedLanguage } from '../../../core/i18n/language.service';

interface AuthCommonCopy {
  backHome: string;
  languageSelector: string;
  email: string;
  password: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordRequirements: string;
  invalidCredentials: string;
  nameInvalid: string;
  storageError: string;
}

interface LoginCopy {
  eyebrow: string;
  title: string;
  description: string;
  submit: string;
  submitting: string;
  noAccount: string;
  registerLink: string;
  forgotPassword: string;
  resetEmailSent: string;
  resetEmailError: string;
}

interface RegisterCopy {
  eyebrow: string;
  title: string;
  description: string;
  name: string;
  confirmPassword: string;
  nameRequired: string;
  confirmPasswordRequired: string;
  passwordsDoNotMatch: string;
  emailInUse: string;
  submit: string;
  submitting: string;
  hasAccount: string;
  loginLink: string;
}

interface AuthPageCopy {
  common: AuthCommonCopy;
  login: LoginCopy;
  register: RegisterCopy;
}

export const AUTH_PAGE_COPY = {
  es: {
    common: {
      backHome: 'Volver al inicio',
      languageSelector: 'Selector de idioma',
      email: 'Correo electrónico',
      password: 'Contraseña',
      emailRequired: 'El correo electrónico es obligatorio.',
      emailInvalid: 'Ingresa un correo electrónico válido.',
      passwordRequired: 'La contraseña es obligatoria.',
      passwordRequirements:
        'Usa al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      invalidCredentials: 'El correo o la contraseña no son correctos.',
      storageError:
        'No fue posible completar la operación. Inténtalo nuevamente.',
    },
    login: {
      eyebrow: 'Acceso al laboratorio',
      title: 'Continúa con tu crecimiento frontend',
      description:
        'Inicia sesión para recuperar tu ruta, progreso y prácticas.',
      submit: 'Iniciar sesión',
      submitting: 'Iniciando sesión…',
      noAccount: '¿Aún no tienes una cuenta?',
      registerLink: 'Crear cuenta',
      forgotPassword: '¿Olvidaste tu contraseña?',
      resetEmailSent:
        'Te enviamos un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.',
      resetEmailError:
        'No pudimos enviar el correo. Verifica que el correo sea correcto.',
    },
    register: {
      eyebrow: 'Crea tu perfil',
      title: 'Comienza tu ruta hacia frontend senior',
      description:
        'Regístrate para conservar tu diagnóstico, aprendizaje y progreso.',
      name: 'Nombre completo',
      confirmPassword: 'Confirmar contraseña',
      nameRequired: 'El nombre es obligatorio.',
      confirmPasswordRequired: 'Confirma tu contraseña.',
      passwordsDoNotMatch: 'Las contraseñas no coinciden.',
      emailInUse: 'Ya existe una cuenta con este correo.',
      submit: 'Crear cuenta',
      submitting: 'Creando cuenta…',
      hasAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Iniciar sesión',
    },
  },
  en: {
    common: {
      backHome: 'Back to home',
      languageSelector: 'Language selector',
      email: 'Email address',
      password: 'Password',
      emailRequired: 'Email is required.',
      emailInvalid: 'Enter a valid email address.',
      passwordRequired: 'Password is required.',
      passwordRequirements:
        'Use at least 8 characters, one uppercase letter, one lowercase letter, and one number.',
      invalidCredentials: 'The email or password is incorrect.',
      storageError: 'The operation could not be completed. Please try again.',
    },
    login: {
      eyebrow: 'Lab access',
      title: 'Continue your frontend growth',
      description:
        'Sign in to recover your roadmap, progress, and practice sessions.',
      submit: 'Sign in',
      submitting: 'Signing in…',
      noAccount: 'Do not have an account yet?',
      registerLink: 'Create account',
      forgotPassword: 'Forgot your password?',
      resetEmailSent:
        'We sent you an email to reset your password. Check your inbox.',
      resetEmailError:
        'Could not send the email. Verify the email address is correct.',
    },
    register: {
      eyebrow: 'Create your profile',
      title: 'Start your journey toward frontend senior',
      description:
        'Register to preserve your diagnostic, learning, and progress.',
      name: 'Full name',
      confirmPassword: 'Confirm password',
      nameRequired: 'Name is required.',
      confirmPasswordRequired: 'Confirm your password.',
      passwordsDoNotMatch: 'Passwords do not match.',
      emailInUse: 'An account already exists with this email.',
      submit: 'Create account',
      submitting: 'Creating account…',
      hasAccount: 'Already have an account?',
      loginLink: 'Sign in',
    },
  },
} as const satisfies Record<SupportedLanguage, AuthPageCopy>;
