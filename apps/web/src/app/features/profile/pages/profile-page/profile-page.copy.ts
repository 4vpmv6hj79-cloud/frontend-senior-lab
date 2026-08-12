import type { SupportedLanguage } from '../../../../core/i18n/language.service';

interface ProfilePageCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly nameLabel: string;
  readonly namePlaceholder: string;
  readonly nameHint: string;
  readonly emailLabel: string;
  readonly roleLabel: string;
  readonly memberSince: string;
  readonly saveChanges: string;
  readonly saved: string;
  readonly errorMinLength: string;
  readonly roles: {
    readonly student: string;
    readonly mentor: string;
  };
}

export const PROFILE_PAGE_COPY = {
  es: {
    eyebrow: 'Tu cuenta',
    title: 'Perfil',
    description: 'Administra la información de tu cuenta.',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    nameHint: 'Mínimo 2 caracteres',
    emailLabel: 'Correo electrónico',
    roleLabel: 'Rol',
    memberSince: 'Miembro desde',
    saveChanges: 'Guardar cambios',
    saved: '¡Cambios guardados!',
    errorMinLength: 'El nombre debe tener al menos 2 caracteres',
    roles: {
      student: 'Estudiante',
      mentor: 'Mentor',
    },
  },
  en: {
    eyebrow: 'Your account',
    title: 'Profile',
    description: 'Manage your account information.',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    nameHint: 'Minimum 2 characters',
    emailLabel: 'Email address',
    roleLabel: 'Role',
    memberSince: 'Member since',
    saveChanges: 'Save changes',
    saved: 'Changes saved!',
    errorMinLength: 'Name must be at least 2 characters',
    roles: {
      student: 'Student',
      mentor: 'Mentor',
    },
  },
} as const satisfies Record<SupportedLanguage, ProfilePageCopy>;
