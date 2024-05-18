import { Injectable } from "@angular/core";
import { FirebaseService } from "./firebase.service";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
  })
  export class FirestoreService {
     
    private firestore
    constructor(private firebase: FirebaseService) {
      this.firestore = getFirestore(this.firebase.app)
        
    }

    async getCollection<T>(collectionName: string, docRef?: any):Promise<T>{
        const col = collection(docRef || this.firestore, collectionName);
        const snapshot = await getDocs(col);
        const response: any = [];;
        for (const item of snapshot.docs) {
            response.push({id: item.id, ...item.data()})
        }
        
        return response;
    }

    async getDocRefById<T>(docId: string, collectionName: string){
      const docRef = doc(this.firestore, collectionName, docId);
      return docRef;
  }

    async insertCollection(values: any, collectionName: string, docRef?: any){
      const col = collection(docRef || this.firestore, collectionName);
      try {
        const docRef = await addDoc(col, values);
        console.log("Documento adicionado com ID: ", docRef.id);
        return docRef.id as string;

      } catch (error) {
        return error
      }
      
    }
    
    async updateDocument(docId: string, updateData: any, collectionName: string){
      const docRef = doc(this.firestore, collectionName, docId);
      try {
        await setDoc(docRef, updateData, { merge: true });
        console.log("Documento atualizado com sucesso");
        return true;
      } catch (e) {
        console.error("Erro ao atualizar documento: ", e);
        return false;
      }
    }

    async deleteDocument(docId: string, collectionName: string, deckRef?: any){
      const docRef = doc(deckRef || this.firestore, collectionName, docId);
      console.log(docRef);
      try {
        await deleteDoc(docRef);
        console.log("Documento excluído com sucesso");
        return true;
      } catch (e) {
        console.error("Erro ao excluir documento: ", e);
        return false;
      }
    }


  }