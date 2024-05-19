import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';

export interface CardInDeck {
    cardId: string;
    name: string;
    images: string;
    supertype: string;
    types: any[] | undefined;
}
@Injectable({
  providedIn: 'root'
})
export class CardInDeckService {

  
  constructor(private firestore: FirestoreService) { }

  async getAllCardInDeck(deckId: string){
    const deckRef = await this.firestore.getDocRefById(deckId, 'decks');
    const cards = await this.firestore.getCollection<CardInDeck[]>('cards', deckRef);
    return cards
  }

  async insertCardsInDeck(deckId: string, values: CardInDeck){
    const deckRef = await this.firestore.getDocRefById(deckId, 'decks');
    const cards = await this.firestore.insertCollection(values, 'cards', deckRef);
    return cards
  }

  async removeCardsInDeck(deckId: string, cardId: any){
    const deckRef = await this.firestore.getDocRefById(deckId, 'decks');
    const cards = await this.firestore.deleteDocument(cardId, 'cards', deckRef);
    return cards
  }
} 
