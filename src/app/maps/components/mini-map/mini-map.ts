import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';

// Importamos la librería principal de Mapbox GL JS
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { LOCATIONS, Map_Style_streets } from '../../../../../locations.config';
// Importamos el archivo de entorno para acceder a la clave de Mapbox

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: `
  div{
    width: 100%;
    height: 260px;
  }
  `,
})
export class MiniMap implements AfterViewInit {
  // 🔹 viewChild (Angular 17+) permite obtener una referencia a un elemento del DOM
  // Aquí buscamos un elemento con el atributo #map en el HTML
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{ lng: number, lat: number }>();
  zoom = input<number>(14);

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
      style: Map_Style_streets,
      center: this.lngLat(),
      zoom: this.zoom(),
      //Para no poder mover el mapa
      interactive: false,
      //Inclinacion 3d
      pitch: 45,
    });

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marcador = new mapboxgl.Marker(
      { color: color }
    )
      .setLngLat(this.lngLat())
      .addTo(map);
  }
}
