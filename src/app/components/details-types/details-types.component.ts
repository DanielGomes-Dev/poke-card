import { Component, computed, input, OnInit } from '@angular/core';
import { CategoryChartType, IgxCategoryChartModule } from 'igniteui-angular-charts';
import { CardInDeck } from '../../services/cardsInDeck/card-in-deck.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-types',
  templateUrl: './details-types.component.html',
  styleUrls: ['./details-types.component.scss'],
  standalone: true,
  imports: [IgxCategoryChartModule]
})
export class DetailsTypesComponent implements OnInit {
  public chartType = 'Column';

  atribute = input.required<string>();

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
