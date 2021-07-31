import titles from './titles';

class TemperatureUnitsToggle {
  constructor() {
    this.temperatureUnitsContainer = document.createElement('button');
    this.celsiusRef = null;
    this.fahrenheitRef = null;
    this.active = null;

    this.init();
  }

  init() {
    this.temperatureUnitsContainer.className = 'flex justify-between items-center bg-black bg-opacity-25 border-2 border-white border-opacity-50 rounded';

    this.render();
  }

  render() {
    const {
      temperatureUnitsContainerTitle, celsiusUnitsTitle, fahrenheitUnitsTitle, chosen,
    } = titles.temperatureUnitsTitles;
    this.active = localStorage.getItem('temperatureUnits');
    const celsius = document.createElement('span');
    const fahrenheit = document.createElement('span');

    this.temperatureUnitsContainer.title = temperatureUnitsContainerTitle;
    celsius.title = celsiusUnitsTitle;
    fahrenheit.title = fahrenheitUnitsTitle;

    celsius.innerHTML = '&#176;C';
    fahrenheit.innerHTML = '&#176;F';

    celsius.className = 'py-2 px-3';
    fahrenheit.className = 'py-2 px-3 text-right';

    if (this.active === 'c') {
      celsius.className += ' bg-black bg-opacity-70';
      celsius.title += chosen;
    } else {
      fahrenheit.className += ' bg-black bg-opacity-70';
      fahrenheit.title += chosen;
    }

    this.temperatureUnitsContainer.appendChild(celsius);
    this.temperatureUnitsContainer.appendChild(fahrenheit);

    this.celsiusRef = celsius;
    this.fahrenheitRef = fahrenheit;
  }

  reRender() {
    this.temperatureUnitsContainer.innerHTML = '';

    this.render();
  }

  onClick(callBack) {
    this.temperatureUnitsContainer.onclick = callBack;

    this.reRender();
  }

  getRef() {
    return this.temperatureUnitsContainer;
  }
}

export default new TemperatureUnitsToggle();
