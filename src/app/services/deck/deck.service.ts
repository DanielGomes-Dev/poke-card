import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';

export interface Deck {
  id: string,
  name: string,
}

export interface createDeck{
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private firestore: FirestoreService) {}

  getAllDeck(){
    return this.firestore.getCollection<Deck[]>('decks');
  }

  createDeck(values: createDeck){
    return this.firestore.insertCollection(values, 'decks');
  }

  updateDeck(values: any, docId: string){
    return this.firestore.updateDocument(docId, values, 'decks');
  }

  deleteDeck(docId: string){
    return this.firestore.deleteDocument(docId, 'decks');
  }
}
