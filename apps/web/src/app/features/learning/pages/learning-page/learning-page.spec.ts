import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { DiagnosticResult } from '../../../diagnostic/models/diagnostic.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
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
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningPage],
      providers: [provideRouter([])],
    }).compileComponents();

    resultStore = TestBed.inject(DiagnosticResultStore);
    languageService = TestBed.inject(LanguageService);

    resultStore.clear();
    languageService.setLanguage('es');
  });

  afterEach(() => {
    fixture?.destroy();
    resultStore.clear();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(LearningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    createComponent();

    expect(component).toBeTruthy();
  });

  it('should invite the user to complete the diagnostic when no result exists', () => {
    createComponent();

    const content = fixture.nativeElement.textContent;
    const diagnosticLink =
      fixture.nativeElement.querySelector('a[href="/diagnostic"]');

    expect(content).toContain('Primero completa tu diagnóstico');
    expect(diagnosticLink).toBeTruthy();
  });

  it('should display the personalized learning summary', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const content = fixture.nativeElement.textContent;

    expect(content).toContain('60%');
    expect(content).toContain('Intermedio');
    expect(content).toContain('39 horas');
  });

  it('should order recommendations from weakest to strongest category', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const moduleCards =
      fixture.nativeElement.querySelectorAll(
        'section[aria-label="Learning modules"] article'
      );

    expect(moduleCards).toHaveLength(5);
    expect(moduleCards[0].textContent).toContain('Testing');
    expect(moduleCards[4].textContent).toContain('Arquitectura');
  });

  it('should update the content when the language changes', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();
    languageService.setLanguage('en');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Your frontend growth plan'
    );
    expect(fixture.nativeElement.textContent).toContain('Overall level');
  });
});
