import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-view',
  standalone: true,
  imports: [],
  templateUrl: './card-view.component.html',
  styleUrl: './card-view.component.scss'
})
export class CardViewComponent {


  @Input({required: true}) card: any;
  //  lastName = input.required<any>(this.mockCard);
  // card = input<any>(this.mockCard);


}
