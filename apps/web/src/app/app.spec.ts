import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Auth } from '@angular/fire/auth';

import { App } from './app';

// Mock Firebase Auth
vi.mock('@angular/fire/auth', async () => {
  const actual = await vi.importActual('@angular/fire/auth');
  return {
    ...actual,
    onAuthStateChanged: vi.fn((_auth, callback) => {
      callback(null);
      return () => {};
    }),
    signOut: vi.fn().mockResolvedValue(undefined),
  };
});

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the application', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });
});
