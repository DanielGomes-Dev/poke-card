import { Injectable } from '@angular/core';
import { FirestoreService } from '../firebase/firestore.service';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private firestore: FirestoreService) {}

  getAllDeck(){
    return this.firestore.getCollection('decks');
  }
}
