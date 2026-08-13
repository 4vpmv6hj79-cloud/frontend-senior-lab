import type { LocalizedText } from '../../../shared/models/i18n.model';

/**
 * A single question in a topic validation quiz.
 * Each topic has 3 questions — user must get 2/3 correct to pass.
 */
export interface TopicQuizQuestion {
  readonly id: string;
  readonly question: LocalizedText;
  readonly options: readonly TopicQuizOption[];
  readonly correctOptionId: string;
}

export interface TopicQuizOption {
  readonly id: string;
  readonly text: LocalizedText;
}

/**
 * Quiz data for a specific topic.
 */
export interface TopicQuiz {
  readonly topicId: string;
  readonly questions: readonly TopicQuizQuestion[];
  readonly passingScore: number; // minimum correct answers to pass (default: 2)
}

/**
 * Result of a quiz attempt.
 */
export interface TopicQuizResult {
  readonly topicId: string;
  readonly totalQuestions: number;
  readonly correctAnswers: number;
  readonly passed: boolean;
  readonly completedAt: string;
}
