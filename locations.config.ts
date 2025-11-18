export interface LocationConfig {
  name: string;
  lng: number; // Longitud
  lat: number; // Latitud
  zoom?: number;
}

export const LOCATIONS: Record<string, LocationConfig> = {
  sevilla: {
    name: 'Sevilla - Los Bermejales',
    lng: -5.9649486582180575,
    lat: 37.39664859710659,
    zoom: 14
  },

  madrid: {
    name: 'Madrid - Centro',
    lng: -3.7037902,
    lat: 40.4167754,
    zoom: 12
  },

  barcelona: {
    name: 'Barcelona - Sagrada Familia',
    lng: 2.1734035,
    lat: 41.3850639,
    zoom: 13
  }
};

export const Map_Style_streets = 'mapbox://styles/mapbox/streets-v12'
export const Map_Style_outdoors = 'mapbox://styles/mapbox/outdoors-v12'
export const Map_Style_satellite_streets = 'mapbox://styles/mapbox/satellite-streets-v12'
export const Map_Style_satellite = 'mapbox://styles/mapbox/satellite-streets-v12'
export const Map_Style_night = 'mapbox://styles/mapbox/navigation-night-v1'

