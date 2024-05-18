import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class CardInDeckService {

  constructor(private firestore: FirestoreService) { }

  async getAllCardInDeck(deckId: string){
    const deckRef = await this.firestore.getDocRefById(deckId, 'decks');
    const cards = await this.firestore.getCollection('cards', deckRef);
    return cards

  }
} 
