import { Component, computed, input, OnInit, output, signal } from '@angular/core';
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
  cardsInDeck = signal<CardInDeck[]>([]);
  cardsOutDeck = signal<CardInDeck[]>([])
  deckId: string = ""
  cardsToSave = output<any>();
  toastMessage: string = "";
  errorToast: boolean = false;


  constructor(private route: ActivatedRoute, private cardInDeckService: CardInDeckService, private cardService: CardService,
  ) {
  }



  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.deckId = params['deckId'];
      this.getAllCardInDeck(this.deckId);
    });
  }

  async getAllCardInDeck(deckId:string){
    if(deckId){
      const response: CardInDeck[] = await this.cardInDeckService.getAllCardInDeck(deckId)    
      this.cardsInDeck.set([...response]);
    }
    this.showCardsToAdd();
  }

  async getAllCardsFromApiAndMap(){
    const allCards: Card[] = await this.cardService.getAll();
    return allCards.map((card)=>{
      return {
       cardId: card.id,
       image: card.images.small,
       name: card.name,
       supertype: card.supertype,
       types: card.types,
       inDeck: false,
      }
     })
  }

  async showCardsToAdd(){
    const allCard = await this.getAllCardsFromApiAndMap();
    const filteredCards =  allCard.filter(card => {
      return !(this.cardsInDeck().find(cid => cid.cardId == card.cardId))
    })
    this.cardsOutDeck.set(filteredCards)
  }

  async save(){
    const verified = this.cardsInDeckVerify();
    if(verified.error) {
      return this.showToast(verified.error, true)
    }else{
      await this.saveAllCardsAddInDeck()
      await this.removeCardsFromDeck()
      this.showToast('Salvo com sucesso', false);
      this.getAllCardInDeck(this.deckId)

  
    }
    
  }

  async saveAllCardsAddInDeck(){
    const cards = [...this.cardsInDeck()]
    const cardsToSave = []
    for (const card of cards) {
      if(!card.inDeck){
        cardsToSave.push(card);
      }
    }
    if(cardsToSave.length){
      if(this.deckId){
        for (const card of cardsToSave) {
          await this.cardInDeckService.insertCardsInDeck(this.deckId, card)
        }  
      }else{
        this.cardsToSave.emit([...cardsToSave]);
      }
    }
  }

  async removeCardsFromDeck(){
    const cards = [...this.cardsOutDeck()]
    const cardsToRemove: any = []
    cards.forEach((card:any) => {
      if(card.inDeck){
        cardsToRemove.push(card)
      }
    })
    for (const card of cardsToRemove) {
      await this.cardInDeckService.removeCardsInDeck(this.deckId, card.id);
    }
  }

  emitValue(){
    this.cardsToSave.emit({cards: this.cardsInDeck(), error: this.cardsInDeckVerify()})
  }

  addCardsInDeck(card: CardInDeck){
    this.cardsInDeck.update(value => [card, ...value])
    this.removeCardsOutDeck(card.cardId)
    if(!this.deckId) this.emitValue()
  }

  removeCardsInDeck(cardId: string){
    const indexToRemove = this.cardsInDeck().findIndex((cod: any) => cod.cardId == cardId)
    this.cardsInDeck().splice(indexToRemove, 1)
    this.cardsInDeck.update(value => [...value]);
    if(!this.deckId) this.emitValue()
  }
 

  addCardsOutDeck(card: CardInDeck){
    this.cardsOutDeck.update(value => [card, ...value]);
    this.removeCardsInDeck(card.cardId);
  }

  removeCardsOutDeck(cardId: string){
    const cards: any = this.cardsOutDeck() as any
    const indexToRemove = cards.findIndex((cod: any) => cod.cardId == cardId)
    this.cardsOutDeck().splice(indexToRemove, 1)
  }

  showToast(toastMessage: string, errorToast:boolean){
    this.toastMessage = toastMessage
    this.errorToast = errorToast
    this.toast = true;
    setTimeout(()=>{
      this.toast = false;
    },2000)
  }


  cardsInDeckVerify(){
    if(!this.verifyNamesInDeck()) return {error: "Você só pode adicionar até 4 cartas com o mesmo nome;"}
    if(!this.verifyQuantityCardsInDeck()) return {error: "A Quantidade de Cartas deve ser no minimo 24 e no maximo 60;"}
    return {error: null};
  }

  verifyNamesInDeck(){
    const cards = this.cardsInDeck;

    for (const card of cards()) {
      const name = card.name
      let quantityNames = 0
      for (const card2 of cards()) {
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
    const quantity = this.cardsInDeck().length
    if(quantity < 24 || quantity > 60){
      return false
    }else{
      return true
    }
  }

}
