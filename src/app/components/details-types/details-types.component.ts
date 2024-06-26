import { Component, computed, input } from '@angular/core';
import { IgxCategoryChartModule } from 'igniteui-angular-charts';
import { CardInDeck } from '../../services/cardsInDeck/card-in-deck.service';

@Component({
  selector: 'app-details-types',
  templateUrl: './details-types.component.html',
  styleUrls: ['./details-types.component.scss'],
  standalone: true,
  imports: [IgxCategoryChartModule]
})
export class DetailsTypesComponent  {
  public chartType = 'Column';

  atribute = input.required<string>();
  message = input.required<string>()
  cards = input.required<CardInDeck[]>();
  cardData = computed(()=> {
    const data:any = []
    this.cards().forEach((card:any)=>{
      if(Array.isArray(card[this.atribute()]) && card[this.atribute()].length){
        card[this.atribute()].forEach((att: any) => {
          const index = data.findIndex((d:any) => d[this.atribute()] == att)
          if(index == -1){
            data.push({
              [this.atribute()]:att,
              quantidade: 1
            })
          }else{
            data[index].quantidade += 1
          }
        })
      } else {
        const index = data.findIndex((d:any) => d[this.atribute()] == card[this.atribute()])
          if(index == -1){
            data.push({
              [this.atribute()]: card[this.atribute()],
              quantidade: 1
            })
          }else{
            data[index].quantidade += 1
          }
      }
    })
    data.sort(function(a: any,b: any) {
      return a['atribute'] < b['atribute'] ? -1 : a['atribute'] > b['atribute'] ? 1 : 0;
  });
    return data
  })

}
