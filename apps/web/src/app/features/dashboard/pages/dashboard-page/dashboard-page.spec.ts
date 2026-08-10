import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import type { DiagnosticResult } from '../../../diagnostic/models/diagnostic.model';
import { DiagnosticResultStore } from '../../../diagnostic/services/diagnostic-result.store';
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
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [provideRouter([])],
    }).compileComponents();

    resultStore = TestBed.inject(
      DiagnosticResultStore,
    );

    languageService = TestBed.inject(
      LanguageService,
    );

    resultStore.clear();
    languageService.setLanguage('es');
  });

  afterEach(() => {
    fixture?.destroy();
    resultStore.clear();
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(
      DashboardPage,
    );

    component = fixture.componentInstance;
    fixture.detectChanges();
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
      'Construye tu panel personalizado',
    );

    expect(diagnosticLink).toBeTruthy();
  });

  it('should display the diagnostic summary', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const content =
      fixture.nativeElement.textContent;

    expect(content).toContain('Intermedio');
    expect(content).toContain('60%');
    expect(content).toContain('Testing');
    expect(content).toContain('Arquitectura');
  });

  it('should recommend the module for the weakest category', () => {
    resultStore.save(DIAGNOSTIC_RESULT);

    createComponent();

    const recommendation =
      fixture.nativeElement.querySelector(
        'section[aria-labelledby="next-step"]',
      );

    expect(recommendation).toBeTruthy();
    expect(recommendation.textContent).toContain(
      'Testing',
    );
    expect(recommendation.textContent).toContain(
      '7 horas',
    );
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

    const content =
      fixture.nativeElement.textContent;

    expect(content).toContain(
      'Your frontend progress in one place',
    );

    expect(content).toContain('Quick actions');
    expect(content).toContain('Overall level');
  });
});
