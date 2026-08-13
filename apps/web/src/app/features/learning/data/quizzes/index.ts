import type { TopicQuiz } from '../../models/topic-quiz.model';
import { ANGULAR_TOPIC_QUIZZES } from './angular-quizzes';
import { ARCHITECTURE_TOPIC_QUIZZES } from './architecture-quizzes';
import { PERFORMANCE_TOPIC_QUIZZES } from './performance-quizzes';
import { TESTING_TOPIC_QUIZZES } from './testing-quizzes';
import { TYPESCRIPT_TOPIC_QUIZZES } from './typescript-quizzes';

/**
 * All topic quizzes combined.
 * 15 topics × 3 questions = 45 quiz questions total.
 */
export const ALL_TOPIC_QUIZZES: readonly TopicQuiz[] = [
  ...ANGULAR_TOPIC_QUIZZES,
  ...TYPESCRIPT_TOPIC_QUIZZES,
  ...ARCHITECTURE_TOPIC_QUIZZES,
  ...TESTING_TOPIC_QUIZZES,
  ...PERFORMANCE_TOPIC_QUIZZES,
];

/**
 * Get the quiz for a specific topic by its ID.
 */
export function getQuizForTopic(topicId: string): TopicQuiz | null {
  return ALL_TOPIC_QUIZZES.find((q) => q.topicId === topicId) ?? null;
}
