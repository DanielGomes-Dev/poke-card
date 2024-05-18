import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';

export interface Deck {
  id?: number,
  name: string,
}
@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private firestore: FirestoreService) {}

  getAllDeck(){
    return this.firestore.getCollection('decks');
  }

  createDeck(values: any){
    return this.firestore.insertCollection(values, 'decks');
  }

  updateDeck(values: any, docId: string){
    return this.firestore.updateDocument(docId, values, 'decks');
  }
}
