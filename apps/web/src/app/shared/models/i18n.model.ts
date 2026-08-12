import type { SupportedLanguage } from '../../core/i18n/language.service';

/**
 * A text value with localized variants for each supported language.
 * Used across features to define bilingual content.
 */
export type LocalizedText = Record<SupportedLanguage, string>;
