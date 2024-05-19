import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck/deck.service';
import { ListComponent } from '../../components/list/list.component';
import { CardViewComponent } from "../../components/card-view/card-view.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-deck-view',
    standalone: true,
    templateUrl: './deck-view.component.html',
    styleUrl: './deck-view.component.scss',
    imports: [ListComponent, CardViewComponent, RouterLink]
})
export class DeckViewComponent implements OnInit {

  decks: any = [];
  deckdetails="/deck-details"
  constructor(private deckService: DeckService) {
    
  }

  async ngOnInit() {
    await this.getAllDeck()
  }
  async getAllDeck(){
    this.decks = await this.deckService.getAllDeck();
    console.log(this.decks);
  }
}
