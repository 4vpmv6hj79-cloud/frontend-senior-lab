import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should update the selected language', () => {
    service.setLanguage('en');

    expect(service.language()).toBe('en');
  });

  it('should toggle between Spanish and English', () => {
    service.setLanguage('es');
    service.toggleLanguage();

    expect(service.language()).toBe('en');
  });
});