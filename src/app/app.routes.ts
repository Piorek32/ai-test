import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  {
    path: 'calculator',
    loadComponent: () => import('./calculator/calculator').then((m) => m.Calculator),
  },
  {
    path: 'counter',
    loadComponent: () => import('./counter/counter').then((m) => m.Counter),
  },
  {
    path: 'todos',
    loadComponent: () => import('./todos/todos').then((m) => m.Todos),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  {
    path: 'red',
    loadComponent: () => import('./red/red').then((m) => m.Red),
  },
];
