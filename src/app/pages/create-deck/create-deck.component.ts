import { Component, signal } from '@angular/core';
import { createDeck, DeckService } from '../../services/deck/deck.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DeckDetailsComponent } from "../deck-details/deck-details.component";
import { CardInDeck, CardInDeckService } from '../../services/cardsInDeck/card-in-deck.service';
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
    selector: 'app-create-deck',
    standalone: true,
    templateUrl: './create-deck.component.html',
    styleUrl: './create-deck.component.scss',
    imports: [ReactiveFormsModule, DeckDetailsComponent, ToastComponent]
})
export class CreateDeckComponent {
  deckForm = new FormControl('');
  cards = signal<CardInDeck[]>([]);
  error:any = false;
  toastMessage: string = "";
  toast = signal<boolean>(false);
  cardsError:any = null

  constructor(private deckService: DeckService, private router: Router, private cardInDeckService: CardInDeckService) {
    
  }

  async createNewDeck(){
    if(!this.deckForm.value) return this.showToast('Insira um nome para o seu baralho', true);
    if(this.cardsError.error) return this.showToast(this.cardsError.error, true);
    const deck: createDeck = {
      name: this.deckForm.value
    }
    const response: number = await this.deckService.createDeck(deck)
    
    for (const card of this.cards()) {
      await this.cardInDeckService.insertCardsInDeck(String(response), card)
    }
    this.router.navigate(['/deck-view'])

  }

  async cardsToSaveReturned(response:any){
    console.log(response);
    this.cardsError = response.error
    this.cards.set([...response.cards]);
  }

  showToast(toastMessage: string, error?:boolean){
    this.error = error
    this.toastMessage = toastMessage
    this.toast.set(true);
    setTimeout(()=>{
      this.toast.set(false);
    },2000)
  }
}
