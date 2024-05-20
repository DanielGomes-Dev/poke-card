import { Injectable } from '@angular/core';
import { Service } from '../firebase/service.adapter';

export interface CardInDeck {
    cardId: string;
    name: string;
    image: string;
    supertype: string;
    types: any[] | undefined;
    inDeck: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class CardInDeckService {

  
  constructor(private service: Service) { }

  async getAllCardInDeck(deckId: string){
    const deckRef = await this.service.getById<string>(deckId, 'decks');
    const cards = await this.service.getAll<CardInDeck[]>('cards', deckRef);
    return cards
  }

  async insertCardsInDeck(deckId: string, values: CardInDeck){
    const deckRef = await this.service.getById(deckId, 'decks');
    const cards = await this.service.insert(values, 'cards', deckRef);
    return cards
  }

  async removeCardsInDeck(deckId: string, cardId: any){
    const deckRef = await this.service.getById(deckId, 'decks');
    const cards = await this.service.delete(cardId, 'cards', deckRef);
    return cards
  }
} 
