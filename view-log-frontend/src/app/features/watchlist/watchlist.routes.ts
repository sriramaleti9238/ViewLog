import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/watchlist-table/watchlist-table.component')
      .then(m => m.WatchlistTableComponent)
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add-item/add-item.component')
      .then(m => m.AddItemComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit-item/edit-item.component').then(m => m.EditItemComponent)
  }

] as Routes;
