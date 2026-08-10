import type { SupportedLanguage } from '../../../../core/i18n/language.service';
import type {
  DiagnosticCategory,
  DiagnosticLevel,
} from '../../../diagnostic/models/diagnostic.model';
import type { LearningDifficulty } from '../../../learning/models/learning.model';

interface DashboardPageCopy {
  backHome: string;
  eyebrow: string;
  title: string;
  description: string;
  noResultTitle: string;
  noResultDescription: string;
  startDiagnostic: string;
  assessmentSummary: string;
  overallLevel: string;
  overallScore: string;
  priorityArea: string;
  strongestArea: string;
  nextStep: string;
  recommendedModule: string;
  diagnosticScore: string;
  estimatedTime: string;
  hours: string;
  includedTopics: string;
  continueLearning: string;
  quickActions: string;
  viewRoadmap: string;
  retakeDiagnostic: string;
  practiceInterviews: string;
  categoryLabels: Record<DiagnosticCategory, string>;
  levelLabels: Record<DiagnosticLevel, string>;
  difficultyLabels: Record<LearningDifficulty, string>;
}

export const DASHBOARD_PAGE_COPY = {
  es: {
    backHome: 'Volver al inicio',
    eyebrow: 'Panel de crecimiento',
    title: 'Tu progreso frontend en un solo lugar',
    description:
      'Consulta tu nivel actual, prioriza tus áreas de mejora y continúa con el siguiente paso de tu ruta.',
    noResultTitle: 'Construye tu panel personalizado',
    noResultDescription:
      'Completa el diagnóstico técnico para generar recomendaciones basadas en tus fortalezas y áreas de oportunidad.',
    startDiagnostic: 'Iniciar diagnóstico',
    assessmentSummary: 'Resumen del diagnóstico',
    overallLevel: 'Nivel general',
    overallScore: 'Resultado general',
    priorityArea: 'Área prioritaria',
    strongestArea: 'Mayor fortaleza',
    nextStep: 'Siguiente paso recomendado',
    recommendedModule: 'Módulo recomendado',
    diagnosticScore: 'Resultado por área',
    estimatedTime: 'Tiempo estimado',
    hours: 'horas',
    includedTopics: 'Temas incluidos',
    continueLearning: 'Continuar aprendizaje',
    quickActions: 'Acciones rápidas',
    viewRoadmap: 'Ver ruta completa',
    retakeDiagnostic: 'Repetir diagnóstico',
    practiceInterviews: 'Practicar entrevistas',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Arquitectura',
      testing: 'Testing',
      performance: 'Rendimiento',
    },
    levelLabels: {
      foundation: 'Fundamentos',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      senior: 'Senior',
    },
    difficultyLabels: {
      foundation: 'Fundamentos',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    },
  },
  en: {
    backHome: 'Back to home',
    eyebrow: 'Growth dashboard',
    title: 'Your frontend progress in one place',
    description:
      'Review your current level, prioritize improvement areas, and continue with the next step in your roadmap.',
    noResultTitle: 'Build your personalized dashboard',
    noResultDescription:
      'Complete the technical diagnostic to generate recommendations based on your strengths and improvement areas.',
    startDiagnostic: 'Start diagnostic',
    assessmentSummary: 'Diagnostic summary',
    overallLevel: 'Overall level',
    overallScore: 'Overall score',
    priorityArea: 'Priority area',
    strongestArea: 'Strongest area',
    nextStep: 'Recommended next step',
    recommendedModule: 'Recommended module',
    diagnosticScore: 'Category result',
    estimatedTime: 'Estimated time',
    hours: 'hours',
    includedTopics: 'Included topics',
    continueLearning: 'Continue learning',
    quickActions: 'Quick actions',
    viewRoadmap: 'View full roadmap',
    retakeDiagnostic: 'Retake diagnostic',
    practiceInterviews: 'Practice interviews',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Architecture',
      testing: 'Testing',
      performance: 'Performance',
    },
    levelLabels: {
      foundation: 'Foundation',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      senior: 'Senior',
    },
    difficultyLabels: {
      foundation: 'Foundation',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
  },
} as const satisfies Record<
  SupportedLanguage,
  DashboardPageCopy
>;