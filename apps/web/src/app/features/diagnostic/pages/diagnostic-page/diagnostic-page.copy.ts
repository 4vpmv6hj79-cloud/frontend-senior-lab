import type { SupportedLanguage } from '../../../../core/i18n/language.service';
import type {
  DiagnosticCategory,
  DiagnosticLevel,
} from '../../models/diagnostic.model';

interface DiagnosticPageCopy {
  backHome: string;
  eyebrow: string;
  title: string;
  description: string;
  progress: string;
  question: string;
  of: string;
  chooseAnswer: string;
  previous: string;
  next: string;
  finish: string;
  resultsEyebrow: string;
  resultsTitle: string;
  resultsDescription: string;
  score: string;
  level: string;
  breakdown: string;
  restart: string;
  goToLearning: string;
  categoryLabels: Record<DiagnosticCategory, string>;
  levelLabels: Record<DiagnosticLevel, string>;
  levelDescriptions: Record<DiagnosticLevel, string>;
}

export const DIAGNOSTIC_PAGE_COPY = {
  es: {
    backHome: 'Volver al inicio',
    eyebrow: 'Diagnóstico técnico',
    title: 'Descubre tu nivel frontend actual',
    description:
      'Responde cinco escenarios técnicos. Al finalizar recibirás una puntuación global y un desglose por área.',
    progress: 'Progreso',
    question: 'Pregunta',
    of: 'de',
    chooseAnswer: 'Selecciona la opción que consideres más adecuada.',
    previous: 'Anterior',
    next: 'Siguiente',
    finish: 'Ver resultado',
    resultsEyebrow: 'Diagnóstico completado',
    resultsTitle: 'Tu resultado',
    resultsDescription:
      'Esta evaluación inicial identifica fortalezas y áreas que puedes reforzar en tu ruta de aprendizaje.',
    score: 'Puntuación',
    level: 'Nivel estimado',
    breakdown: 'Resultado por categoría',
    restart: 'Repetir diagnóstico',
    goToLearning: 'Ver ruta de aprendizaje',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Arquitectura',
      testing: 'Testing',
      performance: 'Rendimiento',
      react: 'React',
      vue: 'Vue.js',
      framework: 'Framework',
    },
    levelLabels: {
      foundation: 'Fundamentos',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
      senior: 'Senior',
    },
    levelDescriptions: {
      foundation:
        'Conviene reforzar los fundamentos antes de avanzar hacia escenarios complejos.',
      intermediate:
        'Tienes una base funcional y puedes avanzar trabajando las áreas con menor puntuación.',
      advanced:
        'Demuestras conocimientos sólidos; enfócate en decisiones arquitectónicas y liderazgo técnico.',
      senior: 'Demuestras criterio técnico consistente en las áreas evaluadas.',
    },
  },
  en: {
    backHome: 'Back to home',
    eyebrow: 'Technical diagnostic',
    title: 'Discover your current frontend level',
    description:
      'Answer five technical scenarios. You will receive an overall score and a breakdown by area.',
    progress: 'Progress',
    question: 'Question',
    of: 'of',
    chooseAnswer: 'Select the option you consider most appropriate.',
    previous: 'Previous',
    next: 'Next',
    finish: 'View result',
    resultsEyebrow: 'Diagnostic completed',
    resultsTitle: 'Your result',
    resultsDescription:
      'This initial assessment identifies strengths and areas to reinforce in your learning roadmap.',
    score: 'Score',
    level: 'Estimated level',
    breakdown: 'Result by category',
    restart: 'Retake diagnostic',
    goToLearning: 'View learning roadmap',
    categoryLabels: {
      angular: 'Angular',
      typescript: 'TypeScript',
      architecture: 'Architecture',
      testing: 'Testing',
      performance: 'Performance',
      react: 'React',
      vue: 'Vue.js',
      framework: 'Framework',
    },
    levelLabels: {
      foundation: 'Foundation',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      senior: 'Senior',
    },
    levelDescriptions: {
      foundation:
        'Reinforce the fundamentals before moving into more complex scenarios.',
      intermediate:
        'You have a functional foundation and can progress by strengthening lower-scoring areas.',
      advanced:
        'You demonstrate solid knowledge; focus on architectural decisions and technical leadership.',
      senior:
        'You demonstrate consistent technical judgment across the assessed areas.',
    },
  },
} as const satisfies Record<SupportedLanguage, DiagnosticPageCopy>;
