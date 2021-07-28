import fetcher from './fetch';
import handlers from './handlers';

class Map {
  constructor(lat, lon) {
    this.mapContainer = null;
    this.lat = lat;
    this.lon = lon;

    this.init();
  }

  init() {
    const mapContainer = document.createElement('div');
    const map = document.createElement('iframe');
    const lat = document.createElement('div');
    const lon = document.createElement('div');

    mapContainer.className = 'px-3 py-3 self-center md:py-0 md:pb-2 md:self-end';
    map.className = 'rounded-2xl mb-4';
    lat.className = 'text-right';
    lon.className = 'text-right';

    map.width = '220';
    map.height = '220';
    map.title = 'Map';
    map.src = fetcher.mapURL(this.lat, this.lon);
    lat.innerHTML = `Latitude: ${handlers.transformLatLon(this.lat)}`;
    lon.innerHTML = `Longitude: ${handlers.transformLatLon(this.lon)}`;

    [map, lat, lon].forEach((child) => mapContainer.appendChild(child));

    this.mapContainer = mapContainer;
  }

  getRef() {
    return this.mapContainer;
  }
}

export default Map;
