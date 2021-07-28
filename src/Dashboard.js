import BackgroundToggle from './BackgroundToggle';
import LanguageToggle from './LanguageToggle';
import TemperatureUnitsToggle from './TemperatureUnitsToggle';
import Search from './Search';
import Clock from './Clock';
import handlers from './handlers';

class Dashboard {
  constructor(cityName, countryName, dateTime) {
    this.ref = null;
    this.cityName = cityName;
    this.countryName = countryName;
    this.dateTime = handlers.getDate(dateTime, this.language);

    this.init();
  }

  init() {
    const header = document.createElement('header');
    const dashboard = document.createElement('div');
    const togglersContainer = document.createElement('div');
    const titleContainer = document.createElement('div');

    togglersContainer.className = 'mb-4 text-xl flex justify-around md:w-72 md:mb-0';
    dashboard.className = 'mb-6 md:flex md:justify-between';
    titleContainer.className = 'pl-4';

    // location name - city, country
    const locationNameContainer = document.createElement('h1');
    locationNameContainer.innerHTML = `${this.cityName}, ${this.countryName}`;
    locationNameContainer.className = 'text-4xl md:text-5xl';
    titleContainer.appendChild(locationNameContainer);

    // local date and time
    const dateTimeContainer = document.createElement('h2');
    dateTimeContainer.className = 'text-xl md:text-3xl md:mb-7';
    const timeContainer = Clock();
    const dateContainer = document.createElement('span');
    dateContainer.className = 'mr-3';
    dateContainer.innerHTML = this.dateTime;
    dateTimeContainer.appendChild(dateContainer);
    dateTimeContainer.appendChild(timeContainer);
    titleContainer.appendChild(dateTimeContainer);

    [BackgroundToggle.getRef(), LanguageToggle.getRef(), TemperatureUnitsToggle.getRef()]
      .forEach((child) => togglersContainer.appendChild(child));

    dashboard.appendChild(togglersContainer);
    dashboard.appendChild(Search.getSearchBarRef());
    header.appendChild(dashboard);
    header.appendChild(titleContainer);

    this.ref = header;
  }

  getRef() {
    return this.ref;
  }
}

export default Dashboard;
