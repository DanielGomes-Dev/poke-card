import { Component, OnInit } from '@angular/core';
import { createDeck, Deck, DeckService } from '../services/deck/deck.service';
import { NgFor } from '@angular/common';
import { CardInDeckService } from '../services/cardsInDeck/card-in-deck.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from '../components/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NgFor,
    RouterLink,
    RouterOutlet
  ]
})
export class HomeComponent implements OnInit {
  title = 'Welcome to Ignite UI for Angular!';
  decks: Deck[] = [];
  cards: any[] = []
  listRoute = "/list"
  deckview = "/deck-view"
  createdeck = "/create-deck"
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

 

  async updateDeck(){
    const response = await this.deckService.updateDeck({name: 'deckEditado' + new Date()}, this.decks[0].id)
    await this.getAllDeck()

    console.log(response);
  }

  async deleteDeck(){
    const response = await this.deckService.deleteDeck(this.decks[0].id)
    await this.getAllDeck()

    console.log(response);
  }

  async getAllCardInDeck(){
    const response = await this.cardInDeckService.getAllCardInDeck(this.decks[0].id);
    console.log(response);
    this.cards = response;
  }

  async insertCardsInDeck(){
    const card = {
      cardId: 'cardId',
      image: 'cardImage'
    }
    const response = await this.cardInDeckService.insertCardsInDeck(this.decks[0].id, card);
    console.log(response);
    await this.getAllCardInDeck();

  }

  async removeCardsInDeck(){
    await this.cardInDeckService.removeCardsInDeck(this.decks[0].id, this.cards[0].id)
    await this.getAllCardInDeck();
  
  }
  
}
