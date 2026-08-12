import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { mockAuthStoreProvider } from '../../../../core/testing/auth-test.helpers';
import type { DiagnosticResult } from '../../../diagnostic/models/diagnostic.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { LearningProgressStore } from '../../services/learning-progress.store';
import { LearningPage } from './learning-page';

const DIAGNOSTIC_RESULT: DiagnosticResult = {
  score: 9,
  maximumScore: 15,
  percentage: 60,
  level: 'intermediate',
  categories: [
    {
      category: 'angular',
      score: 2,
      maximumScore: 3,
      percentage: 80,
    },
    {
      category: 'typescript',
      score: 1,
      maximumScore: 3,
      percentage: 40,
    },
    {
      category: 'architecture',
      score: 3,
      maximumScore: 3,
      percentage: 100,
    },
    {
      category: 'testing',
      score: 1,
      maximumScore: 3,
      percentage: 20,
    },
    {
      category: 'performance',
      score: 2,
      maximumScore: 3,
      percentage: 60,
    },
  ],
};

describe('LearningPage', () => {
  let fixture: ComponentFixture<LearningPage>;
  let component: LearningPage;
  let resultStore: DiagnosticResultStore;
  let progressStore: LearningProgressStore;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPage],
      providers: [provideRouter([]), mockAuthStoreProvider()],
    }).compileComponents();

    resultStore = TestBed.inject(
      DiagnosticResultStore,
    );

    progressStore = TestBed.inject(
      LearningProgressStore,
    );

    languageService = TestBed.inject(
      LanguageService,
    );

    resultStore.clear();
    progressStore.clear();
    languageService.setLanguage('es');
  });

  afterEach(() => {
    fixture?.destroy();
    resultStore.clear();
    progressStore.clear();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(
      LearningPage,
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function moduleCards(): HTMLElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll(
        'section[aria-label="Learning modules"] article',
      ),
    ) as HTMLElement[];
  }

  function findButton(
    container: HTMLElement,
    text: string,
  ): HTMLButtonElement {
    const buttons = Array.from(
      container.querySelectorAll('button'),
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

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  it('should invite the user to complete the diagnostic when no result exists', () => {
    createComponent();

    const content =
      fixture.nativeElement.textContent;

    const diagnosticLink =
      fixture.nativeElement.querySelector(
        'a[href="/diagnostic"]',
      );

    expect(content).toContain(
      'Primero completa tu diagnóstico',
    );

    expect(diagnosticLink).toBeTruthy();
  });

  it('should display the personalized learning summary', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const content =
      fixture.nativeElement.textContent;

    expect(content).toContain('60%');
    expect(content).toContain('Intermedio');
    expect(content).toContain('39 horas');
    expect(content).toContain(
      '0 / 15 temas completados',
    );
  });

  it('should order recommendations from weakest to strongest category', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const cards = moduleCards();

    expect(cards).toHaveLength(5);
    expect(cards[0].textContent).toContain(
      'Testing',
    );
    expect(cards[4].textContent).toContain(
      'Arquitectura',
    );
  });

  it('should start the highest-priority module', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const firstCard = moduleCards()[0];

    findButton(
      firstCard,
      'Comenzar módulo',
    ).click();

    fixture.detectChanges();

    expect(
      progressStore.progress().activeModuleId,
    ).toBe('testing-strategy');

    const normalizedContent = String(
  fixture.nativeElement.textContent,
)
  .replace(/\s+/g, ' ')
  .trim();

expect(normalizedContent).toContain(
  'Módulo activo: Estrategia de testing frontend',
);

    expect(firstCard.textContent).toContain(
      'Continuar módulo',
    );
  });

  it('should complete a topic and update progress', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const firstTopic =
      fixture.nativeElement.querySelector(
        'button[aria-label^="Marcar como completado"]',
      ) as HTMLButtonElement;

    firstTopic.click();
    fixture.detectChanges();

    expect(
      progressStore.isTopicCompleted(
        'testing-behavior',
      ),
    ).toBe(true);

    expect(
      progressStore.completedTopicCount(),
    ).toBe(1);

    expect(
      progressStore.overallPercentage(),
    ).toBe(7);

    expect(
      firstTopic.getAttribute(
        'aria-pressed',
      ),
    ).toBe('true');
  });

  it('should update the content when the language changes', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    languageService.setLanguage('en');
    fixture.detectChanges();

    expect(
      fixture.nativeElement.textContent,
    ).toContain(
      'Your frontend growth plan',
    );

    expect(
      fixture.nativeElement.textContent,
    ).toContain('Overall level');
  });
});
