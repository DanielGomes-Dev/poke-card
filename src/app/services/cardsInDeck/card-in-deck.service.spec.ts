import { TestBed } from '@angular/core/testing';

import { CardInDeckService } from './card-in-deck.service';

describe('CardInDeckService', () => {
  let service: CardInDeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardInDeckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
