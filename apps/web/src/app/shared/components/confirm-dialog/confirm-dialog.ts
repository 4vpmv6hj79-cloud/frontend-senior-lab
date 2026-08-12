import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      [attr.aria-labelledby]="'confirm-dialog-title'"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
        (click)="cancelled.emit()"
      ></div>

      <!-- Dialog -->
      <article
        class="relative w-full max-w-md animate-scale-in rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40 sm:p-8"
      >
        <div
          class="mx-auto mb-5 grid size-12 place-items-center rounded-xl border border-rose-400/20 bg-rose-400/10 text-xl text-rose-300"
          aria-hidden="true"
        >
          {{ icon() }}
        </div>

        <h2
          id="confirm-dialog-title"
          class="text-center text-xl font-black text-white"
        >
          {{ title() }}
        </h2>

        <p class="mt-3 text-center text-sm leading-6 text-slate-400">
          {{ message() }}
        </p>

        <div class="mt-7 flex gap-3">
          <button
            type="button"
            class="flex-1 rounded-xl border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:border-white/30"
            (click)="cancelled.emit()"
          >
            {{ cancelLabel() }}
          </button>

          <button
            type="button"
            class="flex-1 rounded-xl px-4 py-3 text-sm font-black transition"
            [class.bg-rose-500]="variant() === 'danger'"
            [class.hover:bg-rose-400]="variant() === 'danger'"
            [class.text-white]="variant() === 'danger'"
            [class.bg-cyan-400]="variant() === 'primary'"
            [class.hover:bg-cyan-300]="variant() === 'primary'"
            [class.text-slate-950]="variant() === 'primary'"
            (click)="confirmed.emit()"
          >
            {{ confirmLabel() }}
          </button>
        </div>
      </article>
    </div>
  `,
  styles: `
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scale-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .animate-fade-in {
      animation: fade-in 0.15s ease-out;
    }

    .animate-scale-in {
      animation: scale-in 0.2s ease-out;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly confirmLabel = input.required<string>();
  readonly cancelLabel = input.required<string>();
  readonly icon = input<string>('⚠');
  readonly variant = input<'danger' | 'primary'>('danger');

  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
