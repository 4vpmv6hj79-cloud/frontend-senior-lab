import { TestBed } from '@angular/core/testing';

import { InterviewProgressStore } from './interview-progress.store';

const STORAGE_KEY =
  'frontend-senior-lab.interview-progress';

describe('InterviewProgressStore', () => {
  let store: InterviewProgressStore;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);

    TestBed.configureTestingModule({});

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
      'angular-reactivity-strategy',
    );

    expect(store.reviewedCount()).toBe(1);

    expect(store.isReviewed(
      'angular-reactivity-strategy',
    )).toBe(true);

    expect(
      store.progress().lastQuestionId,
    ).toBe('angular-reactivity-strategy');
  });

  it('should not duplicate reviewed questions', () => {
    store.markReviewed(
      'typescript-boundary-safety',
    );

    store.markReviewed(
      'typescript-boundary-safety',
    );

    expect(store.reviewedCount()).toBe(1);

    expect(
      store.progress().reviewedQuestionIds,
    ).toEqual([
      'typescript-boundary-safety',
    ]);
  });

  it('should persist and restore progress', () => {
    store.markReviewed(
      'architecture-design-system-evolution',
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const restoredStore = TestBed.inject(
      InterviewProgressStore,
    );

    expect(restoredStore.reviewedCount()).toBe(1);

    expect(
      restoredStore.isReviewed(
        'architecture-design-system-evolution',
      ),
    ).toBe(true);

    expect(
      restoredStore.progress().lastQuestionId,
    ).toBe(
      'architecture-design-system-evolution',
    );

    restoredStore.clear();
  });

  it('should clear progress', () => {
    store.markReviewed(
      'performance-production-regression',
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