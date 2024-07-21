import { Routes } from "@angular/router";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
