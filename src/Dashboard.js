import BackgroundToggle from './BackgroundToggle';
import LanguageToggle from './LanguageToggle';
import TemperatureUnitsToggle from './TemperatureUnitsToggle';
import Search from './Search';
import Clock from './Clock';
import handlers from './handlers';

class Dashboard {
  constructor() {
    this.headerRef = document.createElement('header');
    this.locationNameContainer = document.createElement('h1');
    this.dateContainer = document.createElement('span');
    this.cityName = null;
    this.countryName = null;
    this.language = null;
    this.dateTime = null;
  }

  setData(cityName, countryName, language, dateTime) {
    this.cityName = cityName;
    this.countryName = countryName;
    this.language = language;
    this.dateTime = handlers.getDate(dateTime, this.language);

    return this;
  }

  render() {
    this.locationNameContainer.innerHTML = `${this.cityName}, ${this.countryName}`;
    this.dateContainer.innerHTML = this.dateTime;

    return this;
  }

  init() {
    const dashboard = document.createElement('div');
    const togglersContainer = document.createElement('div');
    const titleContainer = document.createElement('div');

    togglersContainer.className = 'mb-4 text-xl flex justify-around md:w-72 md:mb-0';
    dashboard.className = 'mb-6 md:flex md:justify-between';
    titleContainer.className = 'pl-4';

    // location name - city, country
    this.locationNameContainer.className = 'text-4xl md:text-5xl';
    titleContainer.appendChild(this.locationNameContainer);

    // local date and time
    const dateTimeContainer = document.createElement('h2');
    dateTimeContainer.className = 'text-xl md:text-3xl md:mb-7';
    const timeContainer = Clock();
    this.dateContainer.className = 'mr-3';

    dateTimeContainer.appendChild(this.dateContainer);
    dateTimeContainer.appendChild(timeContainer);
    titleContainer.appendChild(dateTimeContainer);

    [BackgroundToggle.getRef(), LanguageToggle.getRef(), TemperatureUnitsToggle.getRef()]
      .forEach((child) => togglersContainer.appendChild(child));

    dashboard.appendChild(togglersContainer);
    dashboard.appendChild(Search.getSearchBarRef());
    this.headerRef.appendChild(dashboard);
    this.headerRef.appendChild(titleContainer);

    return this;
  }

  getRef() {
    return this.headerRef;
  }
}

export default new Dashboard();
