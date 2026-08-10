import type { SupportedLanguage } from '../../../../core/i18n/language.service';
import type { DiagnosticCategory } from '../../../diagnostic/models/diagnostic.model';
import type { InterviewDifficulty } from '../../models/interview.model';

interface InterviewsPageCopy {
  backDashboard: string;
  eyebrow: string;
  title: string;
  description: string;
  progress: string;
  reviewed: string;
  of: string;
  category: string;
  difficulty: string;
  allCategories: string;
  allDifficulties: string;
  question: string;
  showAnswer: string;
  hideAnswer: string;
  markReviewed: string;
  reviewedLabel: string;
  referenceAnswer: string;
  keyPoints: string;
  followUps: string;
  previous: string;
  next: string;
  resetProgress: string;
  emptyTitle: string;
  emptyDescription: string;
  categoryLabels: Record<
    DiagnosticCategory,
    string
  >;
  difficultyLabels: Record<
    InterviewDifficulty,
    string
  >;
}

export const INTERVIEWS_PAGE_COPY = {
  es: {
    backDashboard: 'Volver al dashboard',
    eyebrow: 'Simulador de entrevistas',
    title: 'Practica respuestas de nivel senior',
    description:
      'Analiza escenarios reales, estructura tu respuesta y compárala con los puntos que esperaría un entrevistador técnico.',
    progress: 'Progreso de práctica',
    reviewed: 'practicadas',
    of: 'de',
    category: 'Categoría',
    difficulty: 'Dificultad',
    allCategories: 'Todas',
    allDifficulties: 'Todas',
    question: 'Pregunta',
    showAnswer: 'Mostrar respuesta',
    hideAnswer: 'Ocultar respuesta',
    markReviewed: 'Marcar como practicada',
    reviewedLabel: 'Practicada',
    referenceAnswer: 'Respuesta de referencia',
    keyPoints: 'Puntos clave',
    followUps: 'Preguntas de seguimiento',
    previous: 'Anterior',
    next: 'Siguiente',
    resetProgress: 'Reiniciar progreso',
    emptyTitle: 'No hay preguntas con estos filtros',
    emptyDescription:
      'Cambia la categoría o la dificultad para continuar practicando.',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Arquitectura',
      testing: 'Testing',
      performance: 'Rendimiento',
    },
    difficultyLabels: {
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      senior: 'Senior',
    },
  },
  en: {
    backDashboard: 'Back to dashboard',
    eyebrow: 'Interview simulator',
    title: 'Practice senior-level answers',
    description:
      'Analyze real scenarios, structure your response, and compare it with the points a technical interviewer would expect.',
    progress: 'Practice progress',
    reviewed: 'reviewed',
    of: 'of',
    category: 'Category',
    difficulty: 'Difficulty',
    allCategories: 'All',
    allDifficulties: 'All',
    question: 'Question',
    showAnswer: 'Show answer',
    hideAnswer: 'Hide answer',
    markReviewed: 'Mark as reviewed',
    reviewedLabel: 'Reviewed',
    referenceAnswer: 'Reference answer',
    keyPoints: 'Key points',
    followUps: 'Follow-up questions',
    previous: 'Previous',
    next: 'Next',
    resetProgress: 'Reset progress',
    emptyTitle: 'No questions match these filters',
    emptyDescription:
      'Change the category or difficulty to continue practicing.',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Architecture',
      testing: 'Testing',
      performance: 'Performance',
    },
    difficultyLabels: {
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      senior: 'Senior',
    },
  },
} as const satisfies Record<
  SupportedLanguage,
  InterviewsPageCopy
>;