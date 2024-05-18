import { Injectable } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {
     
    private firestore
    constructor(private firebase: FirebaseService) {
      this.firestore = getFirestore(this.firebase.app)
        
    }

    async getCollection(collectionName: string){
        const col = collection(this.firestore, collectionName);
        const snapshot = await getDocs(col);
        const response = [];;
        for (const item of snapshot.docs) {
            response.push(item.data())
        }
        return response;
    }

    async insertCollection(values: any, collectionName: string){
      const col = collection(this.firestore, collectionName);
      try {
        const docRef = await addDoc(col, values);
        console.log("Documento adicionado com ID: ", docRef.id);
        return docRef.id;

      } catch (error) {
        return error
      }
      
    }
  }