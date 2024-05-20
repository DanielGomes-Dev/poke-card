import { Component } from '@angular/core';
import { createDeck, DeckService } from '../../services/deck/deck.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-deck',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-deck.component.html',
  styleUrl: './create-deck.component.scss'
})
export class CreateDeckComponent {
  deckForm = new FormControl('');

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

}
