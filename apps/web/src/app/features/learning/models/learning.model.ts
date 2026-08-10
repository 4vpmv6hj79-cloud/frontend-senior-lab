import type {
  DiagnosticCategory,
  LocalizedText,
} from '../../diagnostic/models/diagnostic.model';

export type LearningDifficulty =
  | 'foundation'
  | 'intermediate'
  | 'advanced';

export interface LearningModule {
  id: string;
  category: DiagnosticCategory;
  title: LocalizedText;
  description: LocalizedText;
  topics: readonly LocalizedText[];
  estimatedHours: number;
  difficulty: LearningDifficulty;
}

export interface LearningRecommendation {
  module: LearningModule;
  diagnosticPercentage: number;
  priority: number;
}