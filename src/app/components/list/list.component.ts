import { Component, OnInit } from '@angular/core';
import { IgxFilterOptions, IgxListItemComponent, IgxInputGroupComponent, IgxPrefixDirective, IgxIconComponent, IgxInputDirective, IgxSuffixDirective, IgxListComponent, IgxAvatarComponent, IgxFilterPipe, } from 'igniteui-angular';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardService } from '../../services/card/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

interface Contact {
  isFavorite: boolean;
  name: string;
  phone: string;
  photo: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [
    IgxFilterPipe,
    IgxListItemComponent,
    IgxInputGroupComponent,
    IgxPrefixDirective,
    IgxIconComponent,
    IgxInputDirective,
    IgxSuffixDirective,
    IgxListComponent,
    IgxAvatarComponent,
    NgIf,
    NgFor,
    NgClass,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ListComponent implements OnInit {
   cards: Card[] = [];

  constructor(private cardService: CardService) {
  }

  async ngOnInit(){
    this.cards = await this.cardService.getAll()
    console.log(this.cards);
  }
  public title = 'list';
  public searchCard = '';

  public get filterCards(): IgxFilterOptions {
    const fo = new IgxFilterOptions();
    fo.key = 'name';
    fo.inputValue = this.searchCard;
    return fo;
  }

  public toggleFavorite(item: IgxListItemComponent): void {
    // const contact = this.contacts[item.index - 1];
    // contact.isFavorite = !contact.isFavorite;
  }
}
