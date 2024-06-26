import { Component, OnInit } from '@angular/core';
import { DeckService } from '../../services/deck/deck.service';
import { ListComponent } from '../../components/list/list.component';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-deck-view',
    standalone: true,
    templateUrl: './deck-view.component.html',
    styleUrl: './deck-view.component.scss',
    imports: [ListComponent, RouterLink]
})
export class DeckViewComponent implements OnInit {

  decks: any = [];
  deckdetails="/deck-details"
  createdeck="/create-deck";
  constructor(private deckService: DeckService) {
    
  }

  async ngOnInit() {
    await this.getAllDeck()
  }
  async getAllDeck(){
    this.decks = await this.deckService.getAllDeck();
  }

  async deleteDeck(deckId:string){
    await this.deckService.deleteDeck(deckId)
    await this.getAllDeck()

  }
}
