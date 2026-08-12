import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../../../core/i18n/language.service';
import { mockAuthStoreProvider } from '../../../../core/testing/auth-test.helpers';
import { DIAGNOSTIC_QUESTIONS } from '../../data/diagnostic.questions';
import { DiagnosticPage } from './diagnostic-page';

describe('DiagnosticPage', () => {
  let component: DiagnosticPage;
  let fixture: ComponentFixture<DiagnosticPage>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticPage],
      providers: [provideRouter([]), mockAuthStoreProvider()],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticPage);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);

    languageService.setLanguage('es');
    fixture.detectChanges();
  });

  function getOptionButtons(): HTMLButtonElement[] {
    return Array.from(
      fixture.nativeElement.querySelectorAll('button[role="radio"]'),
    );
  }

  function getContinueButton(): HTMLButtonElement {
    const buttons = Array.from<HTMLButtonElement>(
      fixture.nativeElement.querySelectorAll('article footer button'),
    );

    return buttons[buttons.length - 1];
  }

  function answerCurrentQuestion(): void {
    const firstOption = getOptionButtons()[0];

    firstOption.click();
    fixture.detectChanges();

    getContinueButton().click();
    fixture.detectChanges();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable continue until an option is selected', () => {
    const continueButton = getContinueButton();

    expect(continueButton.disabled).toBe(true);

    getOptionButtons()[0].click();
    fixture.detectChanges();

    expect(continueButton.disabled).toBe(false);
  });

  it('should move to the next question', () => {
    answerCurrentQuestion();

    const expectedQuestion =
      DIAGNOSTIC_QUESTIONS[1].text[languageService.language()];

    expect(fixture.nativeElement.textContent).toContain(expectedQuestion);
  });

  it('should complete the diagnostic and display a result', () => {
    for (let index = 0; index < DIAGNOSTIC_QUESTIONS.length; index += 1) {
      answerCurrentQuestion();
    }

    const content = fixture.nativeElement.textContent;
    const learningLink = fixture.nativeElement.querySelector(
      'a[href="/learning"]',
    );

    expect(content).toContain('Tu resultado');
    expect(content).toContain('%');
    expect(learningLink).toBeTruthy();
  });

  it('should restart the diagnostic', () => {
    for (let index = 0; index < DIAGNOSTIC_QUESTIONS.length; index += 1) {
      answerCurrentQuestion();
    }

    const restartButton = fixture.nativeElement.querySelector(
      'section button',
    ) as HTMLButtonElement;

    restartButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      DIAGNOSTIC_QUESTIONS[0].text.es,
    );
  });
});
