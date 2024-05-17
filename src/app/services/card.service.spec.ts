import { TestBed } from '@angular/core/testing';
import { CardService } from './card.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { lastValueFrom } from 'rxjs';

describe('CardService', () => {
  let service: CardService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        CardService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(CardService);
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => { 
    it('deve obter os cartões', async () => {
      const expectedCards: any = {data: []};
      httpClientSpy.get.and.returnValue(of(expectedCards));
      
      const response = await service.getAll();
      expect(response).toEqual(expectedCards.data);
    });
  });
});