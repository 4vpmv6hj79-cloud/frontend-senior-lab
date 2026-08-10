import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { InterviewProgressStore } from '../../services/interview-progress.store';
import { InterviewsPage } from './interviews-page';

const STORAGE_KEY =
  'frontend-senior-lab.interview-progress';

describe('InterviewsPage', () => {
  let fixture: ComponentFixture<InterviewsPage>;
  let component: InterviewsPage;
  let progressStore: InterviewProgressStore;
  let languageService: LanguageService;

  beforeEach(async () => {
    localStorage.removeItem(STORAGE_KEY);

    await TestBed.configureTestingModule({
      imports: [InterviewsPage],
      providers: [provideRouter([])],
    }).compileComponents();

    progressStore = TestBed.inject(
      InterviewProgressStore,
    );

    languageService = TestBed.inject(
      LanguageService,
    );

    progressStore.clear();
    languageService.setLanguage('es');

    fixture = TestBed.createComponent(
      InterviewsPage,
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    progressStore.clear();
    localStorage.removeItem(STORAGE_KEY);
  });

  function findButton(
    text: string,
  ): HTMLButtonElement {
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll(
        'button',
      ),
    ) as HTMLButtonElement[];

    const button = buttons.find((item) =>
      item.textContent?.includes(text),
    );

    if (!button) {
      throw new Error(
        `Button not found: ${text}`,
      );
    }

    return button;
  }

  function pageContent(): string {
    return fixture.nativeElement.textContent;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first interview question', () => {
    expect(pageContent()).toContain(
      '¿Cómo decidirías entre Signals y RxJS',
    );

    expect(pageContent()).toContain(
      'Pregunta 1 de 5',
    );
  });

  it('should reveal and hide the reference answer', () => {
    findButton('Mostrar respuesta').click();
    fixture.detectChanges();

    expect(pageContent()).toContain(
      'Respuesta de referencia',
    );

    expect(pageContent()).toContain(
      'Utilizaría Signals para estado síncrono',
    );

    findButton('Ocultar respuesta').click();
    fixture.detectChanges();

    expect(pageContent()).not.toContain(
      'Utilizaría Signals para estado síncrono',
    );
  });

  it('should mark the current question as reviewed', () => {
    findButton(
      'Marcar como practicada',
    ).click();

    fixture.detectChanges();

    expect(progressStore.reviewedCount()).toBe(1);
    expect(pageContent()).toContain('20%');
    expect(pageContent()).toContain('Practicada');
  });

  it('should navigate to the next question', () => {
    findButton('Siguiente').click();
    fixture.detectChanges();

    expect(pageContent()).toContain(
      'Una API externa devuelve datos',
    );

    expect(pageContent()).toContain(
      'Pregunta 2 de 5',
    );
  });

  it('should filter questions by category', () => {
    const selects =
      fixture.nativeElement.querySelectorAll(
        'select',
      ) as NodeListOf<HTMLSelectElement>;

    const categorySelect = selects[0];

    categorySelect.value = 'performance';
    categorySelect.dispatchEvent(
      new Event('change'),
    );

    fixture.detectChanges();

    expect(pageContent()).toContain(
      'Después de un despliegue, el LCP',
    );

    expect(pageContent()).toContain(
      'Pregunta 1 de 1',
    );
  });

  it('should display the empty state when filters do not match', () => {
    const selects =
      fixture.nativeElement.querySelectorAll(
        'select',
      ) as NodeListOf<HTMLSelectElement>;

    const categorySelect = selects[0];
    const difficultySelect = selects[1];

    categorySelect.value = 'angular';
    categorySelect.dispatchEvent(
      new Event('change'),
    );

    difficultySelect.value = 'intermediate';
    difficultySelect.dispatchEvent(
      new Event('change'),
    );

    fixture.detectChanges();

    expect(pageContent()).toContain(
      'No hay preguntas con estos filtros',
    );
  });

  it('should update the interface language', () => {
    languageService.setLanguage('en');
    fixture.detectChanges();

    expect(pageContent()).toContain(
      'Practice senior-level answers',
    );

    expect(pageContent()).toContain(
      'How would you decide between Signals and RxJS',
    );
  });
});
