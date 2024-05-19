import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardInDeck, CardInDeckService } from '../../services/cardsInDeck/card-in-deck.service';
import { ListComponent } from '../../components/list/list.component';
import { CardService } from '../../services/card/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { CardViewComponent } from "../../components/card-view/card-view.component";

@Component({
    selector: 'app-deck-details',
    standalone: true,
    templateUrl: './deck-details.component.html',
    styleUrl: './deck-details.component.scss',
    imports: [ListComponent, CardViewComponent]
})
export class DeckDetailsComponent implements OnInit {

  cardsInDeck: any = []
  cardsOutDeck: Card[] = []

  addCard = false;

  constructor(private route: ActivatedRoute, private cardInDeckService: CardInDeckService, private cardService: CardService,
  ) {
    
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['deckId']);
      const deckId = params['deckId'];
      this.getAllCardInDeck(deckId)
    });
  }

  async getAllCardInDeck(deckId:string){
    this.cardsInDeck = await this.cardInDeckService.getAllCardInDeck(deckId)
    console.log(this.cardsInDeck, 'cardsInDeck');
    
  }

  async showCardsToAdd(){
    this.addCard = true;
    this.cardsOutDeck = await this.cardService.getAll()
    console.log(this.cardsOutDeck);
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


  saveAllCardsAddInDeck(){
    const cardsToSave = []
    for (const card of this.cardsInDeck) {
      if(card.new){
        cardsToSave.push(card);
      }
    }

    console.log(cardsToSave)

  }

}
