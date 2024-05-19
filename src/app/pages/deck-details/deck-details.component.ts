import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardInDeck, CardInDeckService } from '../../services/cardsInDeck/card-in-deck.service';
import { ListComponent } from '../../components/list/list.component';
import { CardService } from '../../services/card/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { CardViewComponent } from "../../components/card-view/card-view.component";
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
    selector: 'app-deck-details',
    standalone: true,
    templateUrl: './deck-details.component.html',
    styleUrl: './deck-details.component.scss',
    imports: [ListComponent, CardViewComponent, ToastComponent]
})
export class DeckDetailsComponent implements OnInit {
  toast = false;
  cardsInDeck: any = []
  cardsOutDeck: Card[] = []

  addCard = false;
  deckId: string = ""
  constructor(private route: ActivatedRoute, private cardInDeckService: CardInDeckService, private cardService: CardService,
  ) {
    
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['deckId']);
      this.deckId = params['deckId'];
      this.getAllCardInDeck(this.deckId)
    });
  }

  async getAllCardInDeck(deckId:string){
    this.cardsInDeck = await this.cardInDeckService.getAllCardInDeck(deckId)
    console.log(this.cardsInDeck, 'cardsInDeck');
    
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

 

  addCardsInDeck(card: Card){
    const cardToInsert: CardInDeck = {
      cardId: card.id,
      name: card.name,
      image: card.images.small,
      supertype: card.supertype,
      types: card.types,
      isNew: true
    } as any
    this.cardsInDeck.unshift(cardToInsert)
    this.removeCardsOutDeck(card.id)
    console.log(this.cardsInDeck,'cardsInDeck');
    
  }

  removeCardsInDeck(cardId: string){
    const indexToRemove = this.cardsInDeck.findIndex((cod: any) => cod.cardId == cardId)
    this.cardsInDeck.splice(indexToRemove, 1)
    console.log(this.cardsInDeck,'cardsInDeck');
  }
 

  addCardsOutDeck(card: CardInDeck){
    console.log(card);
    if(!this.addCard) return
    const cardToInsert = {...card, cardToRemove: true, id: card.cardId}
    this.cardsOutDeck.unshift(cardToInsert as any)
    this.removeCardsInDeck(card.cardId);
  }

  removeCardsOutDeck(cardId: string){
    const indexToRemove = this.cardsOutDeck.findIndex(cod => cod.id == cardId)
    this.cardsOutDeck.splice(indexToRemove, 1)
    console.log(this.cardsOutDeck,'cardsOutDeck');
  }

  showToast(){
    this.toast = true;
    setTimeout(()=>{
      this.toast = false;
    },2000)
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
    console.log(cardsToSave,'cardsToSave')
    this.showToast();
    this.getAllCardInDeck(this.deckId)

  }

}
