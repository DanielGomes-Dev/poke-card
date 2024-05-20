import { Component, input, Input, output } from '@angular/core';
import { CardViewComponent } from '../card-view/card-view.component';
import { CardInDeck } from '../../services/cardsInDeck/card-in-deck.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CardViewComponent]
})
export class ListComponent   {
  cards = input.required<Card[] | CardInDeck[]>();
  clickedCard = output<CardInDeck | Card>();

  cardClicked(card: CardInDeck | Card){
    this.clickedCard.emit(card);
  }
}
