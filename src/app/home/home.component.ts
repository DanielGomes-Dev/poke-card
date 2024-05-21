import { Component, OnInit } from '@angular/core';
import { createDeck, Deck, DeckService } from '../services/deck/deck.service';
import { NgFor } from '@angular/common';
import { CardInDeckService } from '../services/cardsInDeck/card-in-deck.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListComponent } from '../components/list/list.component';
import { CardService } from '../services/card/card.service';
import { LoadingComponent } from "../components/loading/loading.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        NgFor,
        RouterLink,
        RouterOutlet,
        LoadingComponent
    ]
})
export class HomeComponent {
  title = 'Welcome to Ignite UI for Angular!';

  listRoute = "/list"
  deckview = "/deck-view"
  createdeck = "/create-deck"
  loading = false;
  constructor(private cardService: CardService
  ) { 
    this.loadInformation();
  }
  
  async loadInformation(){
    this.loading = true;
    await this.cardService.getAll();
    this.loading = false;


  }
  
  
}
