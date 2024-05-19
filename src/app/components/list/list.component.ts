import { Component, Input } from '@angular/core';
import { CardViewComponent } from '../card-view/card-view.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CardViewComponent]
})
export class ListComponent   {

  @Input() cards: any

  constructor() {
    console.log(this.cards,'cards')
    
  }

}
