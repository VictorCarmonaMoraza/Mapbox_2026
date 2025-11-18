import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
// Importamos la librería principal de Mapbox GL JS
import mapboxgl from 'mapbox-gl';
// Importamos el archivo de entorno para acceder a la clave de Mapbox
import { environment } from '../../../environments/environment';

mapboxgl.accessToken = environment.mapboxkey;
@Component({
  selector: 'app-fullscreen-map-page',
  imports: [],
  templateUrl: './fullscreen-map-page.html',
  styleUrl: './fullscreen-map-page.css',
})
export class FullscreenMapPage implements AfterViewInit {
  // 🔹 viewChild (Angular 17+) permite obtener una referencia a un elemento del DOM
  // Aquí buscamos un elemento con el atributo #map en el HTML
  divElement = viewChild<ElementRef>('map');

  // 🔹 Este método del ciclo de vida de Angular se ejecuta justo después
  // de que la vista (HTML) se haya renderizado completamente
  async ngAfterViewInit() {
    // Si no existe el elemento con #map en la vista, salimos de la función
    if (!this.divElement()?.nativeElement) return;

    // Pequeña espera (80ms) para asegurar que el elemento esté listo en el DOM
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Obtenemos la referencia real al elemento HTML <div #map>
    const element = this.divElement()!.nativeElement;

    // Inicializamos el mapa de Mapbox dentro del elemento obtenido
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.5, 40],
      zoom: 9,
    });
    // 🔹 En este punto, el mapa ya está visible e interactivo en pantalla
  }
}
