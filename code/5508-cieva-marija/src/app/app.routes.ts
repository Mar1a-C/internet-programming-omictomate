import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', loadComponent: () => import('./components/movie-list/movie-list.component').then(m => m.MovieListComponent) },
  { path: 'movies/create', loadComponent: () => import('./components/movie-create/movie-create.component').then(m => m.MovieCreateComponent) },
  { path: 'movies/:id', loadComponent: () => import('./components/movie-details/movie-details.component').then(m => m.MovieDetailsComponent) },
  { path: 'movies/:id/edit', loadComponent: () => import('./components/movie-edit/movie-edit.component').then(m => m.MovieEditComponent) },
  { path: 'actors/:id', loadComponent: () => import('./components/actor-details/actor-details.component').then(m => m.ActorDetailsComponent) },
  { path: 'statistics', loadComponent: () => import('./components/statistics/statistics.component').then(m => m.StatisticsComponent) },
  { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent) },
  { path: '**', redirectTo: '/movies' } 
];
