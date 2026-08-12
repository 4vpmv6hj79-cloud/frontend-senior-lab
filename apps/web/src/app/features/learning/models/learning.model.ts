import type { DiagnosticCategory } from '../../diagnostic/models/diagnostic.model';
import type { LocalizedText } from '../../../shared/models/i18n.model';

export type LearningDifficulty = 'foundation' | 'intermediate' | 'advanced';

export interface LearningResource {
  readonly title: string;
  readonly url: string;
  readonly type: 'docs' | 'video' | 'article' | 'tool';
}

export type ContentBlockType = 'text' | 'code' | 'tip';

export interface ContentBlock {
  readonly type: ContentBlockType;
  readonly content: LocalizedText;
  readonly language?: string; // for code blocks (e.g., 'typescript', 'html')
}

export interface LearningTopic {
  readonly id: string;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly content: readonly ContentBlock[];
}

export interface LearningModule {
  readonly id: string;
  readonly category: DiagnosticCategory;
  readonly title: LocalizedText;
  readonly description: LocalizedText;
  readonly whyItMatters: LocalizedText;
  readonly objectives: readonly LocalizedText[];
  readonly topics: readonly LearningTopic[];
  readonly resources: readonly LearningResource[];
  readonly estimatedHours: number;
  readonly difficulty: LearningDifficulty;
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
