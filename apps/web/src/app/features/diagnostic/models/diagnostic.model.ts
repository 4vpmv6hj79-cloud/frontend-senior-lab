import type { SupportedLanguage } from '../../../core/i18n/language.service';

export type DiagnosticCategory =
  | 'angular'
  | 'typescript'
  | 'architecture'
  | 'testing'
  | 'performance';

export type DiagnosticLevel =
  | 'foundation'
  | 'intermediate'
  | 'advanced'
  | 'senior';

export type LocalizedText = Record<SupportedLanguage, string>;

export interface DiagnosticOption {
  id: string;
  text: LocalizedText;
  score: number;
}

export interface DiagnosticQuestion {
  id: string;
  category: DiagnosticCategory;
  text: LocalizedText;
  options: readonly DiagnosticOption[];
}

export interface DiagnosticAnswer {
  questionId: string;
  category: DiagnosticCategory;
  optionId: string;
  score: number;
}

export interface CategoryScore {
  category: DiagnosticCategory;
  score: number;
  maximumScore: number;
  percentage: number;
}

export interface DiagnosticResult {
  score: number;
  maximumScore: number;
  percentage: number;
  level: DiagnosticLevel;
  categories: readonly CategoryScore[];
}