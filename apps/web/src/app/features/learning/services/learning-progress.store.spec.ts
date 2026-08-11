import { TestBed } from '@angular/core/testing';

import { LEARNING_MODULES } from '../data/learning.modules';
import { LearningProgressStore } from './learning-progress.store';

const STORAGE_KEY =
  'frontend-senior-lab.learning-progress';

describe('LearningProgressStore', () => {
  let store: LearningProgressStore;

  beforeEach(() => {
    localStorage.removeItem(STORAGE_KEY);

    TestBed.configureTestingModule({});

    store = TestBed.inject(
      LearningProgressStore,
    );
  });

  afterEach(() => {
    store.clear();
    localStorage.removeItem(STORAGE_KEY);
  });

  it('should start with empty progress', () => {
    expect(store.completedTopicCount()).toBe(0);
    expect(store.overallPercentage()).toBe(0);
    expect(store.totalTopicCount).toBe(15);

    expect(store.progress()).toEqual({
      completedTopicIds: [],
      activeModuleId: null,
    });
  });

  it('should set a valid active module', () => {
    store.setActiveModule(
      'angular-reactivity',
    );

    expect(
      store.progress().activeModuleId,
    ).toBe('angular-reactivity');

    expect(store.activeModule()?.id).toBe(
      'angular-reactivity',
    );

    store.setActiveModule(
      'invalid-module',
    );

    expect(
      store.progress().activeModuleId,
    ).toBe('angular-reactivity');
  });

  it('should toggle topics and calculate module progress', () => {
    const module = LEARNING_MODULES[0];

    module.topics.forEach((topic) => {
      store.toggleTopic(
        module.id,
        topic.id,
      );
    });

    expect(store.completedTopicCount()).toBe(3);
    expect(store.overallPercentage()).toBe(20);

    expect(
      store.modulePercentage(module),
    ).toBe(100);

    expect(
      store.isModuleCompleted(module),
    ).toBe(true);

    store.toggleTopic(
      module.id,
      module.topics[0].id,
    );

    expect(
      store.modulePercentage(module),
    ).toBe(67);

    expect(
      store.isModuleCompleted(module),
    ).toBe(false);
  });

  it('should persist and restore progress', () => {
    store.toggleTopic(
      'testing-strategy',
      'testing-behavior',
    );

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});

    const restoredStore = TestBed.inject(
      LearningProgressStore,
    );

    expect(
      restoredStore.isTopicCompleted(
        'testing-behavior',
      ),
    ).toBe(true);

    expect(
      restoredStore.progress().activeModuleId,
    ).toBe('testing-strategy');

    restoredStore.clear();
  });

  it('should clear learning progress', () => {
    store.toggleTopic(
      'web-performance',
      'performance-core-web-vitals',
    );

    store.clear();

    expect(store.completedTopicCount()).toBe(0);
    expect(store.overallPercentage()).toBe(0);

    expect(
      localStorage.getItem(STORAGE_KEY),
    ).toBeNull();
  });
});