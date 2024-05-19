import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './components/list/list.component';
import { DeckViewComponent } from './pages/deck-view/deck-view.component';
import { CreateDeckComponent } from './pages/create-deck/create-deck.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'deck-view', component: DeckViewComponent, data: { text: 'Visualizar cards' } },
  { path: 'create-deck', component: CreateDeckComponent, data: { text: 'Criar novo baralho' } },

  { path: 'list', component: ListComponent},

  { path: '**', component: HomeComponent } // must always be last
];
