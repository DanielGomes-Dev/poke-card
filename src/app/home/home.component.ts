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
export class HomeComponent {
  title = 'Welcome to Ignite UI for Angular!';

  listRoute = "/list"
  deckview = "/deck-view"
  createdeck = "/create-deck"
  constructor(
  ) { }

  
}
