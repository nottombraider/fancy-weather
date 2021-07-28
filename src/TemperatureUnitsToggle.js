class TemperatureUnitsToggle {
  constructor() {
    this.ref = null;
    this.celsiusRef = null;
    this.fahrenheitRef = null;
    this.active = null;

    this.init();
  }

  init() {
    const temperatureUnitsContainer = document.createElement('div');

    temperatureUnitsContainer.className = 'flex justify-between items-center bg-black bg-opacity-25 border-2 border-white border-opacity-50 rounded';

    this.ref = temperatureUnitsContainer;

    this.render();
  }

  render() {
    this.active = localStorage.getItem('temperatureUnits');
    const celsius = document.createElement('span');
    const fahrenheit = document.createElement('span');

    celsius.innerHTML = '&#176;C';
    fahrenheit.innerHTML = '&#176;F';
    celsius.className = 'py-2 px-3';
    fahrenheit.className = 'py-2 px-3 text-right';

    if (this.active === 'c') {
      celsius.className += ' bg-black bg-opacity-70';
    } else {
      fahrenheit.className += ' bg-black bg-opacity-70';
    }

    this.ref.appendChild(celsius);
    this.ref.appendChild(fahrenheit);

    this.celsiusRef = celsius;
    this.fahrenheitRef = fahrenheit;
  }

  reRender() {
    this.ref.innerHTML = '';

    this.render();
  }

  onClick(callBack) {
    this.ref.addEventListener('click', callBack);

    this.reRender();
  }

  getRef() {
    return this.ref;
  }
}

export default new TemperatureUnitsToggle();
