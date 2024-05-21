import { Component, input } from '@angular/core';
import { CardInDeck } from '../../services/cardsInDeck/card-in-deck.service';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {

  card = input.required<CardInDeck>()

}
