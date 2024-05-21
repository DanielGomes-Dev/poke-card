import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CardService } from '../../services/card/card.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        RouterLink,
        LoadingComponent
    ]
})
export class HomeComponent {
  title = 'Welcome to Ignite UI for Angular!';

  listRoute = "/list"
  deckview = "/deck-view"
  createdeck = "/create-deck"
  loading = true;
  constructor(private cardService: CardService
  ) { 
    this.loadInformation();
  }
  
  async loadInformation(){
    await this.cardService.getAll();
    this.loading = false;

  }
  
  
}
