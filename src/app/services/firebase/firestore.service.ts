import { Injectable } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { IService } from "./service.adapter";

@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService implements IService {
     
    private firestore
    constructor(private firebase: FirebaseService) {
      this.firestore = getFirestore(this.firebase.app)
        
    }

    async getAll<T>(collectionName: string, docRef?: any):Promise<T>{
        const col = collection(docRef || this.firestore, collectionName);
        const snapshot = await getDocs(col);
        const response: any = [];;
        for (const item of snapshot.docs) {
            response.push({id: item.id, ...item.data()})
        }
        
        return response;
    }

    async getById<T>(docId: string, collectionName: string):Promise<T>{
      const docRef = doc(this.firestore, collectionName, docId);
      return docRef as T;
  }

    async insert(values: any, collectionName: string, docRef?: any):Promise<string | unknown>{
      const col = collection(docRef || this.firestore, collectionName);
      try {
        const docRef = await addDoc(col, values);
        return docRef.id;

      } catch (error) {
        return error
      }
      
    }
    
    async update(docId: string, updateData: any, collectionName: string):Promise<boolean>{
      const docRef = doc(this.firestore, collectionName, docId);
      try {
        await setDoc(docRef, updateData, { merge: true });
        return true;
      } catch (e) {
        return false;
      }
    }

    async delete(docId: string, collectionName: string, deckRef?: any):Promise<boolean>{
      const docRef = doc(deckRef || this.firestore, collectionName, docId);
      try {
        await deleteDoc(docRef);
        return true;
      } catch (e) {
        return false;
      }
    }


  }