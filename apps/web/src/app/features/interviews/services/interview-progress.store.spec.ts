import { TestBed } from '@angular/core/testing';

import {
  mockAuthStoreProvider,
  testUserStorageKey,
} from '../../../core/testing/auth-test.helpers';
import { InterviewProgressStore } from './interview-progress.store';

const STORAGE_KEY = testUserStorageKey('interview-progress');

describe('InterviewProgressStore', () => {
  let store: InterviewProgressStore;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);

    TestBed.configureTestingModule({
      providers: [mockAuthStoreProvider()],
    });

    store = TestBed.inject(
      InterviewProgressStore,
    );
  });

  afterEach(() => {
    store.clear();
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should mark a question as reviewed', () => {
    store.markReviewed(
      'angular-performance-dashboard',
    );

    expect(store.reviewedCount()).toBe(1);

    expect(store.isReviewed(
      'angular-performance-dashboard',
    )).toBe(true);

    expect(
      store.progress().lastQuestionId,
    ).toBe('angular-performance-dashboard');
  });

  it('should not duplicate reviewed questions', () => {
    store.markReviewed(
      'typescript-api-contract',
    );

    store.markReviewed(
      'typescript-api-contract',
    );

    expect(store.reviewedCount()).toBe(1);

    expect(
      store.progress().reviewedQuestionIds,
    ).toEqual([
      'typescript-api-contract',
    ]);
  });

  it('should persist and restore progress', () => {
    store.markReviewed(
      'architecture-design-system-real',
    );

    // Simulate app reload
    store.reload();

    expect(store.reviewedCount()).toBe(1);

    expect(
      store.isReviewed(
        'architecture-design-system-real',
      ),
    ).toBe(true);

    expect(
      store.progress().lastQuestionId,
    ).toBe(
      'architecture-design-system-real',
    );
  });

  it('should clear progress', () => {
    store.markReviewed(
      'performance-core-web-vitals-real',
    );

    store.clear();

    expect(store.reviewedCount()).toBe(0);

    expect(store.progress()).toEqual({
      reviewedQuestionIds: [],
      lastQuestionId: null,
    });

    expect(
      localStorage.getItem(STORAGE_KEY),
    ).toBeNull();
  });
});
