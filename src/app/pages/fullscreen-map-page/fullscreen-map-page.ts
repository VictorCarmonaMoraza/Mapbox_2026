import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
// Importamos la librería principal de Mapbox GL JS
import mapboxgl from 'mapbox-gl';
// Importamos el archivo de entorno para acceder a la clave de Mapbox
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapboxkey;
@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  styleUrl: './fullscreen-map-page.css',
})
export class FullscreenMapPage implements AfterViewInit {
  // 🔹 viewChild (Angular 17+) permite obtener una referencia a un elemento del DOM
  // Aquí buscamos un elemento con el atributo #map en el HTML
  divElement = viewChild<ElementRef>('map');
  // Señal para almacenar la instancia del mapa de Mapbox
  map = signal<mapboxgl.Map | null>(null);
  // Señal para almacenar el nivel de zoom del mapa
  zoom = signal(14);
  coordinates = signal({
    lng: -74.5,
    lat: 40
  })

  mapStyle = signal<string>('mapbox://styles/mapbox/streets-v12');

  zoomEffect = effect(() => {
    if (!this.map()) return;
    this.map()?.zoomTo(this.zoom());
    this.map()?.setStyle(this.mapStyle());
  });

  // 🔹 Este método del ciclo de vida de Angular se ejecuta justo después
  // de que la vista (HTML) se haya renderizado completamente
  async ngAfterViewInit() {
    // Si no existe el elemento con #map en la vista, salimos de la función
    if (!this.divElement()?.nativeElement) return;

    // Pequeña espera (80ms) para asegurar que el elemento esté listo en el DOM
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Obtenemos la referencia real al elemento HTML <div #map>
    const element = this.divElement()!.nativeElement;
    const { lng, lat } = this.coordinates();

    // Inicializamos el mapa de Mapbox dentro del elemento obtenido
    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [lng, lat],
      zoom: this.zoom(),
    });
    // 🔹 En este punto, el mapa ya está visible e interactivo en pantalla
    this.mapListeners(map);
  }

  // Método para configurar los listeners del mapa
  mapListeners(map: mapboxgl.Map) {

    map.on('zoomend', (event) => {
      const newZoom = event.target.getZoom();
      this.zoom.set(newZoom);
    })
    //Evento para cuando el mapa deje de moverse actualizamos las coordenadas
    map.on('moveend', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    })

    //Controles de mapbox

    //Agregar controles de navegación al mapa (zoom in, zoom out, rotación)
    map.addControl(new mapboxgl.NavigationControl());

    // Agregar controles de pantalla completa al mapa
    map.addControl(new mapboxgl.FullscreenControl());

    // Guardamos la instancia del mapa en la señal
    this.map.set(map);
  }

  onMapStyleChange(event: Event) {
    //Obtener el valor seleccionado del select
    const value = (event.target as HTMLSelectElement).value;

    //Definir los estilos disponibles
    const styles: Record<string, string> = {
      streets: 'mapbox://styles/mapbox/streets-v12',
      outdoors: 'mapbox://styles/mapbox/outdoors-v12',
      satellite_streets: 'mapbox://styles/mapbox/satellite-streets-v12',
      satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
      night: 'mapbox://styles/mapbox/navigation-night-v1'
    };

    this.mapStyle.set(styles[value]);
  }
}
