import { Injectable } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { collection, getDocs, getFirestore } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {
    
    constructor(private firebase: FirebaseService) {
        
    }

    async getCollection(collectionName: string){
        const firestore = getFirestore(this.firebase.app)
        const col = collection(firestore, collectionName);
        const snapshot = await getDocs(col);
        const response = [];;
        for (const item of snapshot.docs) {
            response.push(item.data())
        }
        return response;
    }
  }