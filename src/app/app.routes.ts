import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'counter',
    loadComponent: () => import('./counter/counter').then((m) => m.Counter),
  },
];
