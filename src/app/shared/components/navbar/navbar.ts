import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  //Obtener el url de las rutas y asignar un título predeterminado si no existe
  router = inject(Router);

  // Filtrar las rutas para excluir la ruta comodín '**'
  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? 'Maps en Angular 2026'}`
  })).filter(route => route.path !== '**');

  // Crear una señal reactiva para el título de la página basado en la URL actual
  pageTitle = toSignal(this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    // tap((event) => console.log(event)),
    map(event => event.url),
    map(url => routes.find((route) => `/${route.path}` === url)?.title ?? 'Mapas')
  ));
}
