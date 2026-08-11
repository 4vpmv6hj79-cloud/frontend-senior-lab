import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { DiagnosticResult } from '../../../diagnostic/models/diagnostic.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
import { LEARNING_MODULES } from '../../../learning/data/learning.modules';
import { LearningProgressStore } from '../../../learning/services/learning-progress.store';
import { DashboardPage } from './dashboard-page';

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

describe('DashboardPage', () => {
  let fixture: ComponentFixture<DashboardPage>;
  let component: DashboardPage;
  let resultStore: DiagnosticResultStore;
  let progressStore: LearningProgressStore;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [provideRouter([])],
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
      DashboardPage,
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function normalizedText(
    element: Element | null,
  ): string {
    return String(element?.textContent ?? '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  it('should invite the user to complete the diagnostic when no result exists', () => {
    createComponent();

    const content = normalizedText(
      fixture.nativeElement,
    );

    const diagnosticLink =
      fixture.nativeElement.querySelector(
        'a[href="/diagnostic"]',
      );

    expect(content).toContain(
      'Construye tu panel personalizado',
    );

    expect(diagnosticLink).toBeTruthy();
  });

  it('should display the diagnostic summary', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const content = normalizedText(
      fixture.nativeElement,
    );

    expect(content).toContain('Intermedio');
    expect(content).toContain('60%');
    expect(content).toContain('Testing');
    expect(content).toContain('Arquitectura');
  });

  it('should display an empty learning progress', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const progressSection =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="learning-progress"]',
      );

    const content = normalizedText(
      progressSection,
    );

    expect(progressSection).toBeTruthy();
    expect(content).toContain(
      '0 / 15 temas completados',
    );
    expect(content).toContain('0%');
    expect(content).toContain(
      'Aún no has iniciado un módulo',
    );
  });

  it('should recommend the module for the weakest category', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const recommendation =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="next-step"]',
      );

    const content = normalizedText(
      recommendation,
    );

    expect(recommendation).toBeTruthy();
    expect(content).toContain('Testing');
    expect(content).toContain('7 horas');
  });

  it('should display the active module as the recommended module', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    progressStore.setActiveModule(
      'typescript-safety',
    );

    createComponent();

    const progressSection =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="learning-progress"]',
      );

    const recommendation =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="next-step"]',
      );

    expect(
      normalizedText(progressSection),
    ).toContain(
      'TypeScript avanzado y contratos seguros',
    );

    expect(
      normalizedText(recommendation),
    ).toContain(
      'TypeScript avanzado y contratos seguros',
    );
  });

  it('should display learning and module progress', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    progressStore.setActiveModule(
      'testing-strategy',
    );

    progressStore.toggleTopic(
      'testing-strategy',
      'testing-behavior',
    );

    createComponent();

    const progressSection =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="learning-progress"]',
      );

    const recommendation =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="next-step"]',
      );

    const progressContent = normalizedText(
      progressSection,
    );

    const recommendationContent =
      normalizedText(recommendation);

    expect(progressContent).toContain(
      '1 / 15 temas completados',
    );

    expect(progressContent).toContain('7%');

    expect(recommendationContent).toContain(
      '1 / 3 temas completados',
    );

    expect(recommendationContent).toContain(
      '33%',
    );
  });

  it('should recommend the next incomplete module', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    progressStore.setActiveModule(
      'testing-strategy',
    );

    progressStore.toggleTopic(
      'testing-strategy',
      'testing-behavior',
    );

    progressStore.toggleTopic(
      'testing-strategy',
      'testing-mocks-contracts',
    );

    progressStore.toggleTopic(
      'testing-strategy',
      'testing-pyramid',
    );

    createComponent();

    const recommendation =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="next-step"]',
      );

    const content = normalizedText(
      recommendation,
    );

    expect(content).toContain(
      'TypeScript avanzado y contratos seguros',
    );

    expect(content).not.toContain(
      'Estrategia de testing frontend',
    );
  });

  it('should display the completed roadmap state', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    for (const module of LEARNING_MODULES) {
      for (const topic of module.topics) {
        progressStore.toggleTopic(
          module.id,
          topic.id,
        );
      }
    }

    createComponent();

    const completedSection =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="completed-roadmap"]',
      );

    const recommendation =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="next-step"]',
      );

    expect(completedSection).toBeTruthy();

    expect(
      normalizedText(completedSection),
    ).toContain(
      'Ruta de aprendizaje completada',
    );

    expect(recommendation).toBeNull();
  });

  it('should provide links to the main learning actions', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const links = Array.from(
      fixture.nativeElement.querySelectorAll('a'),
    ) as HTMLAnchorElement[];

    const hrefs = links.map((link) =>
      link.getAttribute('href'),
    );

    expect(hrefs).toContain('/learning');
    expect(hrefs).toContain('/diagnostic');
    expect(hrefs).toContain('/interviews');
  });

  it('should update the dashboard language', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    languageService.setLanguage('en');
    fixture.detectChanges();

    const content = normalizedText(
      fixture.nativeElement,
    );

    expect(content).toContain(
      'Your frontend progress in one place',
    );

    expect(content).toContain('Quick actions');
    expect(content).toContain('Overall level');
    expect(content).toContain(
      'Learning progress',
    );
  });
});
