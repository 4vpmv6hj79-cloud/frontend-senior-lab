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
    <!-- Visible watermark: small text in bottom-right corner -->
    <div
      class="pointer-events-none fixed bottom-3 right-4 z-[9999] select-none"
      aria-hidden="true"
    >
      <span class="text-[10px] font-medium tracking-wide text-white/20">
        Frontend Senior Lab
      </span>
    </div>

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
