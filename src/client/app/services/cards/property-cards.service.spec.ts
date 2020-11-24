import { TestBed } from '@angular/core/testing';

import { PropertyCardsService } from './property-cards.service';

describe('PropertyCardsService', () => {
  let service: PropertyCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
