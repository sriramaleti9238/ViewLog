import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/watchlist/watchlist.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
