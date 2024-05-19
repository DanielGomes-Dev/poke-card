import { Injectable } from "@angular/core";
import { FirestoreService } from "./firestore.service";


export interface IService {
     getAll<T>(collectionName: string, docRef?: any):Promise<T>;

     getById<T>(docId: string, collectionName: string):Promise<T>;

     insert(values: any, collectionName: string, docRef?: any):Promise<string | unknown>;
    
     update(docId: string, updateData: any, collectionName: string):Promise<boolean>;

     delete(docId: string, collectionName: string, deckRef?: any):Promise<boolean>;
  
}

@Injectable({
    providedIn: 'root'
  })
export class Service extends FirestoreService implements IService {

}