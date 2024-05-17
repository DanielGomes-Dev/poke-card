import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private url = 'https://api.pokemontcg.io/v2/cards/'

  constructor(private httpClient: HttpClient) { }

  async getAll(){
    const cards = await lastValueFrom(this.httpClient.get<{data:Card[]}>(this.url));
    console.log('ok', cards.data)
    return cards.data;
  }

}
