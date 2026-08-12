import type { LocalizedText } from '../../../shared/models/i18n.model';

export type AchievementId =
  | 'first-diagnostic'
  | 'senior-level'
  | 'first-module'
  | 'all-modules'
  | 'interview-5'
  | 'interview-all'
  | 'streak-3-topics'
  | 'profile-complete';

export interface Achievement {
  readonly id: AchievementId;
  readonly icon: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
}

export interface UnlockedAchievement {
  readonly id: AchievementId;
  readonly unlockedAt: string;
}

export const ACHIEVEMENTS: readonly Achievement[] = [
  {
    id: 'first-diagnostic',
    icon: '🎯',
    title: {
      es: 'Primera evaluación',
      en: 'First assessment',
    },
    description: {
      es: 'Completaste tu primer diagnóstico técnico.',
      en: 'You completed your first technical diagnostic.',
    },
  },
  {
    id: 'senior-level',
    icon: '🏆',
    title: {
      es: 'Nivel Senior',
      en: 'Senior Level',
    },
    description: {
      es: 'Alcanzaste el nivel Senior en el diagnóstico.',
      en: 'You reached Senior level in the diagnostic.',
    },
  },
  {
    id: 'first-module',
    icon: '📚',
    title: {
      es: 'Primer módulo',
      en: 'First module',
    },
    description: {
      es: 'Completaste todos los temas de un módulo.',
      en: 'You completed all topics in a module.',
    },
  },
  {
    id: 'all-modules',
    icon: '🎓',
    title: {
      es: 'Graduación completa',
      en: 'Full graduation',
    },
    description: {
      es: 'Completaste los 15 temas de la ruta de aprendizaje.',
      en: 'You completed all 15 topics in the learning roadmap.',
    },
  },
  {
    id: 'interview-5',
    icon: '💬',
    title: {
      es: 'Practicante activo',
      en: 'Active practitioner',
    },
    description: {
      es: 'Practicaste 5 preguntas de entrevista.',
      en: 'You practiced 5 interview questions.',
    },
  },
  {
    id: 'interview-all',
    icon: '🌟',
    title: {
      es: 'Entrevistador experto',
      en: 'Expert interviewer',
    },
    description: {
      es: 'Practicaste todas las preguntas de entrevista.',
      en: 'You practiced all interview questions.',
    },
  },
  {
    id: 'streak-3-topics',
    icon: '🔥',
    title: {
      es: 'En racha',
      en: 'On a streak',
    },
    description: {
      es: 'Completaste 3 temas en una sola sesión.',
      en: 'You completed 3 topics in a single session.',
    },
  },
  {
    id: 'profile-complete',
    icon: '👤',
    title: {
      es: 'Perfil configurado',
      en: 'Profile set up',
    },
    description: {
      es: 'Personalizaste tu nombre en el perfil.',
      en: 'You personalized your name in the profile.',
    },
  },
];
