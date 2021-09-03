import { mapURL } from './fetch';
import handlers from './handlers';
import titles from './titles';

class Map {
  constructor() {
    this.mapContainer = document.createElement('div');
    this.mapRef = document.createElement('iframe');
    this.latRef = document.createElement('div');
    this.lonRef = document.createElement('div');
    this.lat = null;
    this.lon = null;
  }

  setData(lat, lon) {
    this.lat = lat;
    this.lon = lon;

    return this;
  }

  render() {
    this.mapRef.src = mapURL(this.lat, this.lon);
    this.latRef.innerHTML = `Latitude: ${handlers.transformLatLon(this.lat)}`;
    this.lonRef.innerHTML = `Longitude: ${handlers.transformLatLon(this.lon)}`;

    return this;
  }

  init() {
    this.mapContainer.className = 'px-3 py-3 self-center md:py-0 md:pb-2 md:self-end';
    this.mapRef.className = 'rounded-2xl mb-4';
    this.latRef.className = 'text-right';
    this.lonRef.className = 'text-right';

    this.mapRef.width = '220';
    this.mapRef.height = '220';
    this.mapRef.title = titles.mapTitles.mapTitle;

    [this.mapRef, this.latRef, this.lonRef]
      .forEach((child) => this.mapContainer.appendChild(child));

    return this;
  }

  getRef() {
    return this.mapContainer;
  }
}

export default new Map();
