import { Component, input, output } from '@angular/core';
import { CardViewComponent } from '../card-view/card-view.component';
import { CardInDeck } from '../../services/cardsInDeck/card-in-deck.service';
import { IgxAvatarModule, IgxListModule } from 'igniteui-angular';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CardViewComponent, 
      IgxAvatarModule,
      IgxListModule,
    ]
})
export class ListComponent   {
  cards = input.required<CardInDeck[]>();
  clickedCard = output<CardInDeck>();
  cardClicked(card: CardInDeck){
    this.clickedCard.emit(card);
  }
}
