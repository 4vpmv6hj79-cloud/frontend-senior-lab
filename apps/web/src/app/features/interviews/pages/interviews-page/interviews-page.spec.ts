import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterviewsPage } from './interviews-page';

describe('InterviewsPage', () => {
  let component: InterviewsPage;
  let fixture: ComponentFixture<InterviewsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(InterviewsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
