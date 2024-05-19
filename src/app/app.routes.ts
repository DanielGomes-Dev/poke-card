import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './error-routing/not-found/not-found.component';
import { UncaughtErrorComponent } from './error-routing/error/uncaught-error.component';
import { ListComponent } from './components/list/list.component';
import { DeckViewComponent } from './pages/deck-view/deck-view.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { text: 'Home' } },
  { path: 'error', component: UncaughtErrorComponent },
  { path: 'deckview', component: DeckViewComponent, data: { text: 'Visualizar Cards' } },
  { path: 'list', component: ListComponent},

  { path: '**', component: PageNotFoundComponent } // must always be last
];
