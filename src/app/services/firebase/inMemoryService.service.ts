import { Injectable } from "@angular/core";
import { IService } from "./service.adapter";
import { CardInDeck } from "../cardsInDeck/card-in-deck.service";

@Injectable({
    providedIn: 'root'
  })

  
  export class InMemoryService implements IService {
     
    db: {id:string, name:string, cards: CardInDeck[]}[] = []
    key = 'db'
    constructor() {
        this.db = this.getFromLocalStorage() || []

    }

    localStorageUpdate(){
        const dbJson = JSON.stringify(this.db);
        localStorage.setItem(this.key, dbJson)
    }

    getFromLocalStorage(){
        const jsonData = localStorage.getItem(this.key);
        console.log(jsonData);
        return jsonData ? JSON.parse(jsonData) : null;
    }
    
    async getAll<T>(collectionName: string, docRef?: string):Promise<T>{
        if(collectionName == 'decks'){
            return this.getAllDeck() as any
        }else{
            return this.getAllCards(docRef) as any
        }
    }

    async getById<T>(docId: string, collectionName: string):Promise<T>{
        if(collectionName == 'decks'){
            return docId as any
        }else{
            return docId as any
        }
  }

    async insert<T>(values: any, collectionName: string, docRef?: any):Promise<T>{
        if(collectionName == 'decks'){
            this.insertDeck({...values});
        }else{
            this.insertCard({...values}, docRef)
        }
        this.localStorageUpdate();
        return true as any;
    }
    
    async update<T>(docId: string, updateData: any, collectionName: string):Promise<T>{
        if(collectionName == "decks"){
           this.updateDeck({...updateData}, docId)
        }
        this.localStorageUpdate();

        return true as any
    }

    async delete<T>(docId: string, collectionName: string, deckRef?: any):Promise<T>{
        if(collectionName == "decks"){
            this.deleteDeck(docId);
        }else{
           this.deleteCard(deckRef, docId);
        }
        this.localStorageUpdate();

        return 0 as T;
    }

    getAllDeck(){
        const allDecks = this.db; 
        return [...allDecks]
    }

    getAllCards(deckId: any){
        const response = this.db.findIndex(d => d.id == deckId)
        const res =  this.db[response].cards as any
        return [...res] as any
    }

    insertDeck(value: any){
        this.db.push({...value, id: new Date().getTime(), cards: []});
    }

    insertCard(value: any, deckId: any){
        const indexDeck = this.db.findIndex(d => d.id == deckId);
        this.db[indexDeck].cards.push(
            {...value, id: new Date().getTime()}
        );
    }

    updateDeck(value: any, deckId: any){
        const index = this.db.findIndex(d => d.id = deckId);
        delete value.cards;
        this.db[index] = {...this.db[index], ...value}
    }

    deleteDeck(deckId:any){
        const index = this.db.findIndex(d => d.id = deckId);
        this.db.splice(index, 1);
    }

    deleteCard(deckId: any, cardId: any){
        const dbIndex = this.db.findIndex(d => d.id = deckId)
        const cardIndex = this.db[dbIndex].cards.findIndex((data:any)=> data.id = cardId)
        this.db[dbIndex].cards.splice(cardIndex, 1);
    }


  }