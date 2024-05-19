import { booleanAttribute, Component, input, Input, OnInit } from '@angular/core';
import { CardService } from '../../services/card/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { CardViewComponent } from '../card-view/card-view.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CardInDeckService } from '../../services/cardsInDeck/card-in-deck.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CardViewComponent]
})
export class ListComponent implements OnInit  {

  cards = [];

  constructor(private route: ActivatedRoute, private cardInDeckService: CardInDeckService) {
    
  }
  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['deckId']);
      const deckId = params['deckId'];
      this.getAllCardInDeck(deckId)
    });
  }

  async getAllCardInDeck(deckId:string){
    this.cards = await this.cardInDeckService.getAllCardInDeck(deckId)
    console.log(this.cards);
    
  }

  

}
