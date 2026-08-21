import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthStore } from '../../../features/auth/services/auth.store';

/**
 * Watermark component that renders:
 * 1. A VISIBLE diagonal repeated text watermark (low opacity, non-interactive)
 * 2. An INVISIBLE fingerprint embedded in the DOM (proves ownership if content is stolen)
 *
 * The visible watermark uses CSS background with SVG text pattern.
 * The invisible watermark injects hidden metadata that travels with copied content.
 */
@Component({
  selector: 'app-watermark',
  standalone: true,
  template: `
    <!-- Visible watermark: diagonal repeated text overlay -->
    <div
      class="pointer-events-none fixed inset-0 z-[9999] select-none overflow-hidden"
      aria-hidden="true"
      [style.backgroundImage]="watermarkPattern()"
      [style.backgroundRepeat]="'repeat'"
      [style.opacity]="'0.025'"
    ></div>

    <!-- Invisible watermark: hidden ownership fingerprint -->
    <div
      style="position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none"
      aria-hidden="true"
    >
      <span>{{ fingerprint() }}</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WatermarkComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly authStore = inject(AuthStore);

  /** SVG-based background pattern for the visible watermark */
  protected readonly watermarkPattern = computed(() => {
    const text = 'Frontend Senior Lab';
    // Create an inline SVG pattern rotated -30deg
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='200'><text x='50%' y='50%' font-family='sans-serif' font-size='14' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle' transform='rotate(-30 200 100)'>${text}</text></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  });

  /** Hidden fingerprint with ownership info */
  protected readonly fingerprint = computed(() => {
    const user = this.authStore.user();
    const uid = user?.id ?? 'anonymous';
    const ts = new Date().toISOString().split('T')[0];
    // This text will be invisible but present in DOM and clipboard if copied
    return `\u200B\u200BFrontend Senior Lab \u00A9 2025 Erik Palomares. Contenido protegido. ID:${uid} Fecha:${ts}\u200B\u200B`;
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.injectHiddenMeta();
      this.protectContent();
    }
  }

  /**
   * Inject a hidden meta comment in the page source.
   * This survives "View Source" and basic scraping.
   */
  private injectHiddenMeta(): void {
    const comment = document.createComment(
      ' Frontend Senior Lab - Propiedad de Erik Palomares - Contenido protegido por derechos de autor '
    );
    document.body.appendChild(comment);

    // Hidden element that appears if someone copies text
    const el = document.createElement('span');
    el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;font-size:0;opacity:0;';
    el.textContent = '\u200B[Contenido de Frontend Senior Lab - frontend-senior-lab.vercel.app]\u200B';
    document.body.appendChild(el);
  }

  /**
   * Inject ownership text into clipboard when content is copied.
   */
  private protectContent(): void {
    document.addEventListener('copy', (event: ClipboardEvent) => {
      const selection = document.getSelection();
      if (!selection || selection.toString().length < 30) return; // Only for substantial copies

      const originalText = selection.toString();
      const attribution = '\n\n--- Fuente: Frontend Senior Lab (https://frontend-senior-lab.vercel.app/) - Contenido protegido ---';

      event.clipboardData?.setData('text/plain', originalText + attribution);
      event.preventDefault();
    });
  }
}
