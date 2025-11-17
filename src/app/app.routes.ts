import { Routes } from '@angular/router';
import { FullscreenMapPage } from './pages/fullscreen-map-page/fullscreen-map-page';
import { MarkersPage } from './pages/markers-page/markers-page';

export const routes: Routes = [
  { path: 'fullscreen', component: FullscreenMapPage, title: 'Mapa Pantalla completa' },
  { path: 'markers', component: MarkersPage, title: 'Marcadores' },
  { path: 'houses', component: FullscreenMapPage, title: 'Propiedades disponibles' },
  { path: '**', redirectTo: 'fullscreen' },

];
