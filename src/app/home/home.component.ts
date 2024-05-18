import { Component, OnInit } from '@angular/core';
import { createDeck, Deck, DeckService } from '../services/deck/deck.service';
import { NgFor } from '@angular/common';
import { CardInDeckService } from '../services/cardsInDeck/card-in-deck.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NgFor,
  ]
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Ignite UI for Angular!';
  decks: Deck[] = [];
  constructor(
    private deckService: DeckService,
    private cardInDeckService: CardInDeckService
  ) { }

  ngOnInit(): void {
    this.getAllDeck()
  }

  async getAllDeck(){
    this.decks = await this.deckService.getAllDeck();
  }

  // async getDeckById(){
  //   const deck = await this.deckService.getDeckById(this.decks[0].id);
  //   console.log(deck);
  // }

  async createNewDeck(){
    console.log('ok')
    const deck: createDeck = {
      name: 'novo deck criado'
    }
    const response = await this.deckService.createDeck(deck)
    this.getAllDeck()

    console.log(response);
  }

  async updateDeck(){
    const response = await this.deckService.updateDeck({name: 'deckEditado' + new Date()}, this.decks[0].id)
    this.getAllDeck()

    console.log(response);
  }

  async deleteDeck(){
    const response = await this.deckService.deleteDeck(this.decks[0].id)
    this.getAllDeck()

    console.log(response);
  }

  async getAllCardInDeck(){
    const response = await this.cardInDeckService.getAllCardInDeck(this.decks[0].id);
    console.log(response);
  }

  
}
