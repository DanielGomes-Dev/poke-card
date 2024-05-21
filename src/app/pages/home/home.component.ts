import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CardService } from '../../services/card/card.service';

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
