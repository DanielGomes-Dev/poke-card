import { Component, computed, signal } from '@angular/core';
import { createDeck, DeckService } from '../../services/deck/deck.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DeckDetailsComponent } from "../deck-details/deck-details.component";

@Component({
    selector: 'app-create-deck',
    standalone: true,
    templateUrl: './create-deck.component.html',
    styleUrl: './create-deck.component.scss',
    imports: [ReactiveFormsModule, DeckDetailsComponent]
})
export class CreateDeckComponent {
  deckForm = new FormControl('');
  // cards = signal<any[]>([]);
  // verifiedCards = computed(()=>{
  //   return [...this.cards(), 10];
  // })

  constructor(private deckService: DeckService, private router: Router) {
    
  }

  async createNewDeck(){

    if(!this.deckForm.value) return;
    const deck: createDeck = {
      name: this.deckForm.value
    }
    const response = await this.deckService.createDeck(deck)
    this.router.navigate(['/deck-view'])

  }

  async buttonClicked(cards:any){
    // console.log('123');
    // this.cards.set([...cards]);
    // console.log(this.cards())
    // console.log(this.verifiedCards())

  }
}
