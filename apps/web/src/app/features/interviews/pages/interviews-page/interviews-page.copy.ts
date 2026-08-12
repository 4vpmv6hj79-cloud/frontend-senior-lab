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
  scenarioLabel: string;
  tipLabel: string;
  previous: string;
  next: string;
  resetProgress: string;
  emptyTitle: string;
  emptyDescription: string;
  hintTitle: string;
  hintDescription: string;
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
    scenarioLabel: 'Contexto del escenario',
    tipLabel: 'Consejo para la entrevista',
    previous: 'Anterior',
    next: 'Siguiente',
    resetProgress: 'Reiniciar progreso',
    emptyTitle: 'No hay preguntas con estos filtros',
    emptyDescription:
      'Cambia la categoría o la dificultad para continuar practicando.',
    hintTitle: '¿Cómo practicar?',
    hintDescription: 'Lee la pregunta y el escenario. Intenta formular tu respuesta en voz alta (como en una entrevista real) antes de revelar la respuesta modelo. Compara tus puntos con los key points.',
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
    scenarioLabel: 'Scenario context',
    tipLabel: 'Interview tip',
    previous: 'Previous',
    next: 'Next',
    resetProgress: 'Reset progress',
    emptyTitle: 'No questions match these filters',
    emptyDescription:
      'Change the category or difficulty to continue practicing.',
    hintTitle: 'How to practice?',
    hintDescription: 'Read the question and scenario. Try formulating your answer out loud (as in a real interview) before revealing the model answer. Compare your points with the key points.',
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