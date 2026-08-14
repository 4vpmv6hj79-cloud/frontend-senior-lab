import type { SupportedLanguage } from '../../../../core/i18n/language.service';
import type {
  DiagnosticCategory,
  DiagnosticLevel,
} from '../../../diagnostic/models/diagnostic.model';
import type { LearningDifficulty } from '../../../learning/models/learning.model';

interface DashboardPageCopy {
  backHome: string;
  signedInAs: string;
  logout: string;
  logoutConfirmTitle: string;
  logoutConfirmMessage: string;
  logoutConfirmAction: string;
  logoutCancelAction: string;
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
  learningProgress: string;
  completedTopics: string;
  activeModule: string;
  noActiveModule: string;
  moduleProgress: string;
  completed: string;
  allModulesCompleted: string;
  allModulesCompletedDescription: string;
  nextStep: string;
  recommendedModule: string;
  diagnosticScore: string;
  estimatedTime: string;
  hours: string;
  includedTopics: string;
  continueLearning: string;
  quickActions: string;
  achievementsTitle: string;
  historyTitle: string;
  historyAttempts: string;
  historyVsLast: string;
  viewRoadmap: string;
  retakeDiagnostic: string;
  changeTrack: string;
  practiceInterviews: string;
  exportProgress: string;
  importProgress: string;
  importSuccess: string;
  importError: string;
  categoryLabels: Record<DiagnosticCategory, string>;
  levelLabels: Record<DiagnosticLevel, string>;
  difficultyLabels: Record<LearningDifficulty, string>;
}

export const DASHBOARD_PAGE_COPY = {
  es: {
    backHome: 'Volver al inicio',
    signedInAs: 'Sesión iniciada como',
    logout: 'Cerrar sesión',
    logoutConfirmTitle: '¿Cerrar sesión?',
    logoutConfirmMessage:
      'Tu progreso de aprendizaje se conserva localmente. Podrás acceder de nuevo con tu cuenta.',
    logoutConfirmAction: 'Cerrar sesión',
    logoutCancelAction: 'Cancelar',
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
    learningProgress: 'Progreso de aprendizaje',
    completedTopics: 'temas completados',
    activeModule: 'Módulo activo',
    noActiveModule: 'Aún no has iniciado un módulo',
    moduleProgress: 'Progreso del módulo',
    completed: 'Completado',
    allModulesCompleted: 'Ruta de aprendizaje completada',
    allModulesCompletedDescription:
      'Completaste todos los temas de tu ruta personalizada. Puedes repasar los módulos o repetir el diagnóstico.',
    nextStep: 'Siguiente paso recomendado',
    recommendedModule: 'Módulo recomendado',
    diagnosticScore: 'Resultado por área',
    estimatedTime: 'Tiempo estimado',
    hours: 'horas',
    includedTopics: 'Temas incluidos',
    continueLearning: 'Continuar aprendizaje',
    quickActions: 'Acciones rápidas',
    achievementsTitle: 'Logros',
    historyTitle: 'Evolución del diagnóstico',
    historyAttempts: 'intentos',
    historyVsLast: 'vs. anterior',
    viewRoadmap: 'Ver ruta completa',
    retakeDiagnostic: 'Repetir diagnóstico',
    changeTrack: 'Cambiar framework',
    practiceInterviews: 'Practicar entrevistas',
    exportProgress: 'Exportar progreso',
    importProgress: 'Importar progreso',
    importSuccess: 'Progreso importado correctamente',
    importError: 'Error al importar: archivo inválido',
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
    difficultyLabels: {
      foundation: 'Fundamentos',
      intermediate: 'Intermedio',
      advanced: 'Avanzado',
    },
  },
  en: {
    backHome: 'Back to home',
    signedInAs: 'Signed in as',
    logout: 'Sign out',
    logoutConfirmTitle: 'Sign out?',
    logoutConfirmMessage:
      'Your learning progress is stored locally. You can sign back in with your account anytime.',
    logoutConfirmAction: 'Sign out',
    logoutCancelAction: 'Cancel',
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
    learningProgress: 'Learning progress',
    completedTopics: 'topics completed',
    activeModule: 'Active module',
    noActiveModule: 'You have not started a module yet',
    moduleProgress: 'Module progress',
    completed: 'Completed',
    allModulesCompleted: 'Learning roadmap completed',
    allModulesCompletedDescription:
      'You completed every topic in your personalized roadmap. You can review the modules or retake the diagnostic.',
    nextStep: 'Recommended next step',
    recommendedModule: 'Recommended module',
    diagnosticScore: 'Category result',
    estimatedTime: 'Estimated time',
    hours: 'hours',
    includedTopics: 'Included topics',
    continueLearning: 'Continue learning',
    quickActions: 'Quick actions',
    achievementsTitle: 'Achievements',
    historyTitle: 'Diagnostic evolution',
    historyAttempts: 'attempts',
    historyVsLast: 'vs. previous',
    viewRoadmap: 'View full roadmap',
    retakeDiagnostic: 'Retake diagnostic',
    changeTrack: 'Change framework',
    practiceInterviews: 'Practice interviews',
    exportProgress: 'Export progress',
    importProgress: 'Import progress',
    importSuccess: 'Progress imported successfully',
    importError: 'Import error: invalid file',
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
    difficultyLabels: {
      foundation: 'Foundation',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
  },
} as const satisfies Record<SupportedLanguage, DashboardPageCopy>;
