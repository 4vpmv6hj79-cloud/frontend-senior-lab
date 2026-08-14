import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { FrameworkId } from '../../../../core/models/framework.model';
import { TrackSelectionService } from '../../../../core/services/track-selection.service';
import { PageLayoutComponent } from '../../../../shared/components/page-layout/page-layout';
import { TRACK_SELECTION_PAGE_COPY } from './track-selection-page.copy';

@Component({
  selector: 'app-track-selection-page',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './track-selection-page.html',
  styleUrl: './track-selection-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackSelectionPage {
  protected readonly languageService = inject(LanguageService);
  protected readonly trackService = inject(TrackSelectionService);
  private readonly router = inject(Router);

  protected readonly copy = computed(
    () => TRACK_SELECTION_PAGE_COPY[this.languageService.language()],
  );

  protected readonly tracks = this.trackService.availableTracks;

  protected text(value: { es: string; en: string }): string {
    return value[this.languageService.language()];
  }

  protected async selectTrack(id: FrameworkId): Promise<void> {
    this.trackService.selectTrack(id);
    await this.router.navigate(['/dashboard']);
  }
}
