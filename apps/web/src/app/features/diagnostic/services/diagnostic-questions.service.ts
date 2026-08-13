import { computed, inject, Injectable } from '@angular/core';

import type { FrameworkId } from '../../../core/models/framework.model';
import { TrackSelectionService } from '../../../core/services/track-selection.service';
import { DIAGNOSTIC_QUESTIONS } from '../data/diagnostic.questions';
import { REACT_DIAGNOSTIC_QUESTIONS } from '../data/diagnostic-react.questions';
import { VUE_DIAGNOSTIC_QUESTIONS } from '../data/diagnostic-vue.questions';
import type { DiagnosticQuestion } from '../models/diagnostic.model';

/**
 * Service that provides diagnostic questions based on the selected framework track.
 *
 * - Angular track → uses existing DIAGNOSTIC_QUESTIONS (category: 'angular')
 * - React track → uses REACT_DIAGNOSTIC_QUESTIONS (category: 'framework')
 * - Vue track → uses VUE_DIAGNOSTIC_QUESTIONS (category: 'framework')
 *
 * If no track is selected, defaults to Angular questions.
 */
@Injectable({
  providedIn: 'root',
})
export class DiagnosticQuestionsService {
  private readonly trackService = inject(TrackSelectionService);

  /** The questions for the currently selected framework */
  readonly questions = computed<readonly DiagnosticQuestion[]>(() => {
    const trackId = this.trackService.trackId();
    return this.getQuestionsForTrack(trackId);
  });

  /** Get questions for a specific framework */
  getQuestionsForTrack(trackId: FrameworkId | null): readonly DiagnosticQuestion[] {
    switch (trackId) {
      case 'react':
        return REACT_DIAGNOSTIC_QUESTIONS;
      case 'vue':
        return VUE_DIAGNOSTIC_QUESTIONS;
      case 'angular':
      default:
        return DIAGNOSTIC_QUESTIONS;
    }
  }

  /** The framework name for display purposes */
  readonly frameworkName = computed(() => {
    const track = this.trackService.track();
    return track?.name ?? 'Angular';
  });
}
