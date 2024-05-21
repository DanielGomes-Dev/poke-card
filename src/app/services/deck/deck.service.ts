import { Injectable } from '@angular/core';
import { Service } from '../firebase/service.adapter';

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

  constructor(private service: Service) {}

  getAllDeck(){
    return this.service.getAll<Deck[]>('decks');
  }

  getDeckById(docId:string){
    return this.service.getById<Deck>(docId, 'decks');
  }

  createDeck(values: createDeck){
    return this.service.insert<number>(values, 'decks');
  }

  updateDeck(values: any, docId: string){
    return this.service.update(docId, values, 'decks');
  }

  deleteDeck(docId: string){
    return this.service.delete(docId, 'decks');
  }
}
