import { Component, OnInit } from '@angular/core';
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

  showToast(){
    this.toast = true;
    setTimeout(()=>{
      this.toast = false;
    },2000)
  }

  async save(){
    await this.saveAllCardsAddInDeck()
    await this.removeCardsFromDeck()
    this.showToast();

  }


  async saveAllCardsAddInDeck(){
    const cardsToSave = []
    for (const card of this.cardsInDeck) {
      if(card.isNew){
        delete card.isNew
        cardsToSave.push(card);
      }
    }
    //refatorar
    for (const card of cardsToSave) {
      await this.cardInDeckService.insertCardsInDeck(this.deckId, card)
    }
    if(cardsToSave.length){
      this.getAllCardInDeck(this.deckId)
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

}
