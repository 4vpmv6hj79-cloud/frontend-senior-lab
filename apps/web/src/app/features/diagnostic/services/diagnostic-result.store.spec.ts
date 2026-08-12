import { TestBed } from '@angular/core/testing';

import {
  mockAuthStoreProvider,
  testUserStorageKey,
} from '../../../core/testing/auth-test.helpers';
import { DiagnosticResult } from '../models/diagnostic.model';
import { DiagnosticResultStore } from './diagnostic-result.store';

const STORAGE_KEY = testUserStorageKey('diagnostic-result');

const RESULT: DiagnosticResult = {
  score: 12,
  maximumScore: 15,
  percentage: 80,
  level: 'advanced',
  categories: [
    {
      category: 'angular',
      score: 3,
      maximumScore: 3,
      percentage: 100,
    },
  ],
};

describe('DiagnosticResultStore', () => {
  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);

    TestBed.configureTestingModule({
      providers: [mockAuthStoreProvider()],
    });
  });

  afterEach(() => {
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should save the diagnostic result', () => {
    const store = TestBed.inject(DiagnosticResultStore);

    store.save(RESULT);

    expect(store.result()).toEqual(RESULT);
    expect(store.hasResult()).toBe(true);
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy();
  });

  it('should restore a persisted result', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(RESULT),
    );

    const store = TestBed.inject(DiagnosticResultStore);
    store.reload();

    expect(store.result()).toEqual(RESULT);
  });

  it('should clear the diagnostic result', () => {
    const store = TestBed.inject(DiagnosticResultStore);

    store.save(RESULT);
    store.clear();

    expect(store.result()).toBeNull();
    expect(store.hasResult()).toBe(false);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
