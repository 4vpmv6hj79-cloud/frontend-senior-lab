import type {
  DiagnosticCategory,
  LocalizedText,
} from '../../diagnostic/models/diagnostic.model';

export type InterviewDifficulty =
  | 'intermediate'
  | 'advanced'
  | 'senior';

export type InterviewCategoryFilter =
  | 'all'
  | DiagnosticCategory;

export interface InterviewQuestion {
  readonly id: string;
  readonly category: DiagnosticCategory;
  readonly difficulty: InterviewDifficulty;
  readonly question: LocalizedText;
  readonly scenario: LocalizedText;
  readonly answer: LocalizedText;
  readonly keyPoints: readonly LocalizedText[];
  readonly followUps: readonly LocalizedText[];
  readonly tip: LocalizedText;
}

export interface InterviewPracticeProgress {
  reviewedQuestionIds: readonly string[];
  lastQuestionId: string | null;
}