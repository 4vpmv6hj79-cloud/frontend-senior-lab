import type { DiagnosticCategory } from '../../diagnostic/models/diagnostic.model';
import type { LocalizedText } from '../../../shared/models/i18n.model';

export type LearningDifficulty =
  | 'foundation'
  | 'intermediate'
  | 'advanced';

export interface LearningTopic {
  id: string;
  title: LocalizedText;
}

export interface LearningModule {
  id: string;
  category: DiagnosticCategory;
  title: LocalizedText;
  description: LocalizedText;
  topics: readonly LearningTopic[];
  estimatedHours: number;
  difficulty: LearningDifficulty;
}

export interface LearningRecommendation {
  module: LearningModule;
  diagnosticPercentage: number;
  priority: number;
}

export interface LearningProgress {
  completedTopicIds: readonly string[];
  activeModuleId: string | null;
}