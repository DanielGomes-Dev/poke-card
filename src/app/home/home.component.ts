import { Component, OnInit } from '@angular/core';
import { Deck, DeckService } from '../services/deck/deck.service';
import { NgFor } from '@angular/common';

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
  decks: any[] = [];
  constructor(private deckService: DeckService) { }

  ngOnInit(): void {
    this.getAllDeck()
  }

  async getAllDeck(){
    this.decks = await this.deckService.getAllDeck();
  }

  async createNewDeck(){
    console.log('ok')
    const deck: Deck = {
      name: 'novo deck criado'
    }
    const response = await this.deckService.createDeck(deck)
    console.log(response);
  }

  async updateDeck(){
    console.log('ok')
    const deck: Deck = {
      name: 'novo deck criado'
    }
    console.log(this.decks);
    const response = await this.deckService.updateDeck({name: 'deckEditado' + new Date()}, this.decks[0].id)
    // console.log(response);
  }
}
