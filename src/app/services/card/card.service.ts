import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private url = 'https://api.pokemontcg.io/v2/cards'
  key = 'cards';
  constructor(private httpClient: HttpClient) {

   }

  async getAll(){
    const AllCardsInStorage = localStorage.getItem(this.key);
    if(AllCardsInStorage) return JSON.parse(AllCardsInStorage)
    const cards = await lastValueFrom(this.httpClient.get<{data:Card[]}>(this.url));
    const jsonData = JSON.stringify(cards.data);
    localStorage.setItem(this.key, jsonData)
    return cards.data;
  }

}
