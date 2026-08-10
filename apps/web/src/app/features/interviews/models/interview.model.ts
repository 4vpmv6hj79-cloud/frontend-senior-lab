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
  id: string;
  category: DiagnosticCategory;
  difficulty: InterviewDifficulty;
  question: LocalizedText;
  answer: LocalizedText;
  keyPoints: readonly LocalizedText[];
  followUps: readonly LocalizedText[];
}

export interface InterviewPracticeProgress {
  reviewedQuestionIds: readonly string[];
  lastQuestionId: string | null;
}