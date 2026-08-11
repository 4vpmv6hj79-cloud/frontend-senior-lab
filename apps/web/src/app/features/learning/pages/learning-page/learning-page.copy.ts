import type { SupportedLanguage } from '../../../../core/i18n/language.service';
import type {
  DiagnosticCategory,
  DiagnosticLevel,
} from '../../../diagnostic/models/diagnostic.model';
import type { LearningDifficulty } from '../../models/learning.model';

interface LearningPageCopy {
  backHome: string;
  eyebrow: string;
  title: string;
  description: string;
  noResultTitle: string;
  noResultDescription: string;
  startDiagnostic: string;
  summary: string;
  overallLevel: string;
  focusArea: string;
  strongestArea: string;
  estimatedTime: string;
  hours: string;
  priority: string;
  diagnosticScore: string;
  topics: string;
  learningProgress: string;
  completedTopics: string;
  moduleProgress: string;
  activeModule: string;
  completed: string;
  startModule: string;
  resumeModule: string;
  resetProgress: string;
  completeTopic: string;
  undoTopic: string;
  categoryLabels: Record<
    DiagnosticCategory,
    string
  >;
  difficultyLabels: Record<
    LearningDifficulty,
    string
  >;
  levelLabels: Record<
    DiagnosticLevel,
    string
  >;
}

export const LEARNING_PAGE_COPY = {
  es: {
    backHome: 'Volver al inicio',
    eyebrow: 'Ruta personalizada',
    title: 'Tu plan de crecimiento frontend',
    description:
      'Los módulos están ordenados según las áreas que más necesitas reforzar.',
    noResultTitle: 'Primero completa tu diagnóstico',
    noResultDescription:
      'Necesitamos conocer tus fortalezas y áreas de oportunidad para construir una ruta personalizada.',
    startDiagnostic: 'Iniciar diagnóstico',
    summary: 'Resumen de tu evaluación',
    overallLevel: 'Nivel general',
    focusArea: 'Área prioritaria',
    strongestArea: 'Mayor fortaleza',
    estimatedTime: 'Tiempo estimado',
    hours: 'horas',
    priority: 'Prioridad',
    diagnosticScore: 'Resultado del diagnóstico',
    topics: 'Temas incluidos',
    learningProgress: 'Progreso de aprendizaje',
    completedTopics: 'temas completados',
    moduleProgress: 'Progreso del módulo',
    activeModule: 'Módulo activo',
    completed: 'Completado',
    startModule: 'Comenzar módulo',
    resumeModule: 'Continuar módulo',
    resetProgress: 'Reiniciar progreso',
    completeTopic: 'Marcar como completado',
    undoTopic: 'Marcar como pendiente',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Arquitectura',
      testing: 'Testing',
      performance: 'Rendimiento',
    },
    difficultyLabels: {
      foundation: 'Fundamentos',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    },
    levelLabels: {
      foundation: 'Fundamentos',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      senior: 'Senior',
    },
  },
  en: {
    backHome: 'Back to home',
    eyebrow: 'Personalized roadmap',
    title: 'Your frontend growth plan',
    description:
      'Modules are ordered according to the areas you need to reinforce the most.',
    noResultTitle: 'Complete your diagnostic first',
    noResultDescription:
      'We need to understand your strengths and improvement areas to build a personalized roadmap.',
    startDiagnostic: 'Start diagnostic',
    summary: 'Assessment summary',
    overallLevel: 'Overall level',
    focusArea: 'Priority area',
    strongestArea: 'Strongest area',
    estimatedTime: 'Estimated time',
    hours: 'hours',
    priority: 'Priority',
    diagnosticScore: 'Diagnostic result',
    topics: 'Included topics',
    learningProgress: 'Learning progress',
    completedTopics: 'completed topics',
    moduleProgress: 'Module progress',
    activeModule: 'Active module',
    completed: 'Completed',
    startModule: 'Start module',
    resumeModule: 'Continue module',
    resetProgress: 'Reset progress',
    completeTopic: 'Mark as completed',
    undoTopic: 'Mark as pending',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Architecture',
      testing: 'Testing',
      performance: 'Performance',
    },
    difficultyLabels: {
      foundation: 'Foundation',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    levelLabels: {
      foundation: 'Foundation',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      senior: 'Senior',
    },
  },
} as const satisfies Record<
  SupportedLanguage,
  LearningPageCopy
>;