import { Component, computed, input, OnInit } from '@angular/core';
import { CategoryChartType, IgxCategoryChartModule } from 'igniteui-angular-charts';
import { CardInDeck } from '../../services/cardsInDeck/card-in-deck.service';

@Component({
  selector: 'app-details-types',
  templateUrl: './details-types.component.html',
  styleUrls: ['./details-types.component.scss'],
  standalone: true,
  imports: [ IgxCategoryChartModule]
})
export class DetailsTypesComponent implements OnInit {
  public chartType = 'Column';

  cards = input.required<CardInDeck[]>();
  cardData = computed(()=> {
    const data:any = []
    this.cards().forEach((card:any)=>{
      if(card.types && card.types.length){
        card.types.forEach((type: any) => {
          const index = data.findIndex((d:any) => d.type == type)
          if(index == -1){
            data.push({
              type,
              quantidade: 1
            })
          }else{
            data[index].quantidade += 1
          }
        })
      }
    })
    return data
  })


  ngOnInit(){
    console.log('iniciou');
    console.log(this.cardData(), 'this.cardData');
    setTimeout(()=>{
      console.log(this.cardData(), 'this.cardData');
    },2000)
  }

}
