import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticPage } from './diagnostic-page';

describe('DiagnosticPage', () => {
  let component: DiagnosticPage;
  let fixture: ComponentFixture<DiagnosticPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosticPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
