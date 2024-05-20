import { Component, OnInit, output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardInDeck, CardInDeckService } from '../../services/cardsInDeck/card-in-deck.service';
import { ListComponent } from '../../components/list/list.component';
import { CardService } from '../../services/card/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { CardViewComponent } from "../../components/card-view/card-view.component";
import { ToastComponent } from "../../components/toast/toast.component";
import { DetailsTypesComponent } from '../../components/details-types/details-types.component';

@Component({
    selector: 'app-deck-details',
    standalone: true,
    templateUrl: './deck-details.component.html',
    styleUrl: './deck-details.component.scss',
    imports: [ListComponent, CardViewComponent, ToastComponent, DetailsTypesComponent]
})
export class DeckDetailsComponent implements OnInit {
  toast = false;
  cardsInDeck: any = []
  cardsOutDeck: Card[] = []
  deckDetails = false;
  addCard = false;
  deckId: string = ""
  cardsToSave = output<any[]>();
  toastMessage: string = "";
  errorToast: boolean = false;


  constructor(private route: ActivatedRoute, private cardInDeckService: CardInDeckService, private cardService: CardService,
  ) {
    
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deckId = params['deckId'];
      this.getAllCardInDeck(this.deckId)
    });
  }

  async getAllCardInDeck(deckId:string){
    const response = await this.cardInDeckService.getAllCardInDeck(deckId)    
    this.cardsInDeck = [...response];
  }

  async showCardsToAdd(){
    this.addCard = true;
    const allCards = await this.cardService.getAll();
    this.cardsInDeck.forEach((card:any) => {
      const response = allCards.findIndex((ac:any) => ac.id == card.cardId)
      if(response != -1){
        allCards.splice(response, 1);
      }
    })

    this.cardsOutDeck = this.cardsOutDeck.concat(allCards);
  }

 showDeckDetails(){
  this.deckDetails = true
 }

  addCardsInDeck(card: Card | any){
    const cardToInsert: CardInDeck | any = {
      cardId: card.id,
      name: card.name,
      image: card.images.small,
      supertype: card.supertype,
      types: card.types,
      isNew: card.cardToRemove ? false : true 
    } 
    this.cardsInDeck.unshift(cardToInsert)
    this.removeCardsOutDeck(card.id)
    
  }

  removeCardsInDeck(cardId: string){
    const indexToRemove = this.cardsInDeck.findIndex((cod: any) => cod.cardId == cardId)
    this.cardsInDeck.splice(indexToRemove, 1)
  }
 

  addCardsOutDeck(card: CardInDeck | any){
    if(!this.addCard) return
    const cardToInsert: Card | any = {
      ...card,
      images: {
                small : card.image
              },
       cardToRemove: card.isNew ? false : true
      }
    this.cardsOutDeck.unshift(cardToInsert as any)
    this.removeCardsInDeck(card.cardId);
  }

  removeCardsOutDeck(cardId: string){
    const indexToRemove = this.cardsOutDeck.findIndex(cod => cod.id == cardId)
    this.cardsOutDeck.splice(indexToRemove, 1)
  }

  showToast(toastMessage: string, errorToast:boolean){
    this.toastMessage = toastMessage
    this.errorToast = errorToast
    this.toast = true;
    setTimeout(()=>{
      this.toast = false;
    },2000)
  }

  async save(){
    const verified = this.cardsInDeckVerify();
    if(verified.error) return this.showToast(verified.error, true);
    await this.saveAllCardsAddInDeck()
    await this.removeCardsFromDeck()
    this.showToast('Salvo com sucesso', false);

  }


  async saveAllCardsAddInDeck(){
    const cardsToSave = []
    for (const card of this.cardsInDeck) {
      if(card.isNew){
        delete card.isNew
        cardsToSave.push(card);
      }
    }
   
    if(cardsToSave.length){
      if(this.deckId){
        for (const card of cardsToSave) {
          await this.cardInDeckService.insertCardsInDeck(this.deckId, card)
        }  
        this.getAllCardInDeck(this.deckId)
      }else{
        console.log('okok')
        this.cardsToSave.emit([...cardsToSave]);
      }
    }
  }

  async removeCardsFromDeck(){
    const cardsToRemove: any = []
    this.cardsOutDeck.forEach((card:any) => {
      if(card.cardToRemove){
        delete card.cardToRemove
        cardsToRemove.push(card)
      }
    })
    for (const card of cardsToRemove) {
      await this.cardInDeckService.removeCardsInDeck(this.deckId, card.id);
    }
  }


  cardsInDeckVerify(){
    if(!this.verifyNamesInDeck()) return {error: "Você só pode adicionar até 4 cartas com o mesmo nome;"}
    if(!this.verifyQuantityCardsInDeck()) return {error: "A Quantidade de Cartas deve ser no minimo 24 e no maximo 60;"}
    return {error: null};
  }

  verifyNamesInDeck(){
    const cards = this.cardsInDeck;

    for (const card of cards) {
      const name = card.name
      let quantityNames = 0
      for (const card2 of cards) {
        if(card.name == card2.name){
          quantityNames += 1;
          if(quantityNames > 4){
            return false;
          }
        }
      }      
    }

    return true
  }

  verifyQuantityCardsInDeck(){
    const quantity = this.cardsInDeck.length
    if(quantity < 24 || quantity > 60){
      return false
    }else{
      return true
    }
  }

}
