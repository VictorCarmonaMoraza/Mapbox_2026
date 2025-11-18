import { Component, ElementRef, viewChild, signal, AfterViewInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { LOCATIONS } from '../../../../locations.config';


mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css',
})
export class MarkersPage implements AfterViewInit {
  // 🔹 viewChild (Angular 17+) permite obtener una referencia a un elemento del DOM
  // Aquí buscamos un elemento con el atributo #map en el HTML
  divElement = viewChild<ElementRef>('map');
  // Señal para almacenar la instancia del mapa de Mapbox
  map = signal<mapboxgl.Map | null>(null);
  locationDefault = LOCATIONS['sevilla'];

  async ngAfterViewInit() {
    // TODO: Implementar la inicialización del mapa aquí
    // Si no existe el elemento con #map en la vista, salimos de la función
    if (!this.divElement()?.nativeElement) return;

    // Pequeña espera (80ms) para asegurar que el elemento esté listo en el DOM
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Obtenemos la referencia real al elemento HTML <div #map>
    const element = this.divElement()!.nativeElement;

    // Inicializamos el mapa de Mapbox dentro del elemento obtenido
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: [this.locationDefault.lng, this.locationDefault.lat],
      zoom: 14
    });

    // Crear popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<h3 class="font-bold text-black">Mi ubicación</h3><p class="font-bold text-black">Este es el punto por defecto.</p>`);

    //Añadir marcador al mapa
    const marker = new mapboxgl.Marker({
      color: 'red',
      draggable: false,

    })
      .setLngLat([this.locationDefault.lng, this.locationDefault.lat])
      .setPopup(popup) // Asignar el popup al marcador
      .addTo(map);

    // 🔹 En este punto, el mapa ya está visible e interactivo en pantalla
    this.mapListeners(map);
  }

  private mapListeners(map: mapboxgl.Map) {
    // TODO: Implementar listeners del mapa aquí
    // Ejemplo: map.on('click', (e) => { console.log(e.lngLat); });
  }
}
