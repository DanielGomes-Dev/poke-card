import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { DeckDetailsComponent } from "./pages/deck-details/deck-details.component";
import { CreateDeckComponent } from "./pages/create-deck/create-deck.component";
import { DeckViewComponent } from "./pages/deck-view/deck-view.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'deck-view', component: DeckViewComponent, data: { text: 'Visualizar baralhos' } },
  { path: 'create-deck', component: CreateDeckComponent, data: { text: 'Criar novo baralho' } },
  { path: 'deck-details', component: DeckDetailsComponent },

  { path: '**', component: HomeComponent } // must always be last
];
