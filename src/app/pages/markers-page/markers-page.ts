import { Component, ElementRef, viewChild, signal, AfterViewInit } from '@angular/core';
import mapboxgl, { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { LOCATIONS } from '../../../../locations.config';
import { v4 as Uuidv4 } from 'uuid';
import { JsonPipe } from '@angular/common';


mapboxgl.accessToken = environment.mapboxkey;

interface Markers {
  id: string;
  marker?: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
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
  //Marcadores
  markers = signal<Markers[]>([]);

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

    this.mapListeners(map);
  }

  private mapListeners(map: mapboxgl.Map) {
    //necesito obtener las coordenados cuando hago click en el mapa
    map.on('click', (event) => this.mapClick(event)
    );
    // Guardar la instancia del mapa en la señal
    this.map.set(map);
  }

  //Manejador del evento click del mapa
  mapClick(event: MapMouseEvent) {
    //Si el mapa no existe, salimos
    if (!this.map()) return;
    //Obtenemos la instancia del mapa
    const map = this.map()!;
    //Obtenemos coordenadas donde se hizo click
    const coordenadas = event.lngLat;
    //Generar color aleatorio
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    //Añadir marcador al mapa
    const mapboxMarker = new mapboxgl.Marker({
      color: color,
      draggable: false,
    })
      .setLngLat(coordenadas)
      .addTo(map);

    const newMarker: Markers = {
      id: Uuidv4(),
      marker: mapboxMarker
    }

    //Las dos opciones son válidas:
    //Opcion 1: actualizar la señal con el nuevo marcador
    this.markers.set([newMarker, ...this.markers()]);
    //Opcion 2: Usar el método update de la señal
    //this.markers.update((markers) => [newMarker, ...markers]);
    console.log(this.markers());
  }

  //Ir al marcador seleccionado
  gotoMarkerSelected(lngLat: LngLatLike) {
    //Si no existe el mapa o no hay marcadores, salimos
    if (!this.map() || this.markers().length === 0) return;

    //Usamos el método flyTo para mover la cámara del mapa
    //  a las coordenadas del marcador seleccionado
    this.map()?.flyTo({
      center: lngLat,
      zoom: 14
    });
  }
}
