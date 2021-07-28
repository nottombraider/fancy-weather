import langData from './langData';
import handlers from './handlers';

class CurrentWeather {
  constructor(
    temperature,
    conditionIcon, conditionText,
    wind, feelsLike, humidity,
    language,
  ) {
    this.ref = null;
    this.temperature = temperature;
    this.conditionIcon = conditionIcon;
    this.conditionText = conditionText;
    this.wind = wind;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.language = language;
    this.intervalID = null;

    this.init();
  }

  init() {
    const currentWeatherContainer = document.createElement('div');
    currentWeatherContainer.className = 'md:flex md:flex-col pl-4';

    // temperature
    const temperatureContainer = document.createElement('div');
    const currTemperature = document.createElement('span');
    const degree = document.createElement('span');
    currTemperature.innerHTML = Math.round(this.temperature);
    degree.innerHTML = `${handlers.DEGREE_HTML_SYMBOL}`;
    currTemperature.className = 'text-9xl font-medium';
    degree.className = 'text-7xl align-top';
    temperatureContainer.appendChild(currTemperature);
    temperatureContainer.appendChild(degree);

    // condition icon
    const conditionIcon = document.createElement('img');
    conditionIcon.className = 'w-40 md:w-24 md:self-start';
    conditionIcon.src = this.conditionIcon;
    conditionIcon.alt = this.conditionText;
    conditionIcon.title = this.conditionText;

    // weather state container
    const weatherStateContainer = document.createElement('div');
    weatherStateContainer.appendChild(temperatureContainer);
    weatherStateContainer.appendChild(conditionIcon);
    currentWeatherContainer.appendChild(weatherStateContainer);
    weatherStateContainer.className = 'flex flex-col items-center mt-2 sm:flex-row md:justify-around';

    // detailed weather state container
    const weatherDetailedStateContainer = document.createElement('div');
    weatherDetailedStateContainer.className = 'text-2xl md:text-base md:self-end';

    const { detailedWeather } = langData.appLanguage[this.language];
    [
      { key: null, value: this.conditionText },
      { key: detailedWeather.wind, value: this.wind },
      { key: detailedWeather.feelsLike, value: `${this.feelsLike}${handlers.DEGREE_HTML_SYMBOL}` },
      { key: detailedWeather.humidity, value: `${this.humidity}%` },
    ].forEach(({ key, value }) => {
      const weatherDetailContainer = document.createElement('div');

      if (key) {
        weatherDetailContainer.innerHTML = `${key.toUpperCase()}: ${value}`;
      } else {
        weatherDetailContainer.innerHTML = value.toUpperCase();
      }

      weatherDetailedStateContainer.appendChild(weatherDetailContainer);
    });
    weatherStateContainer.appendChild(weatherDetailedStateContainer);

    this.ref = currentWeatherContainer;
  }

  getRef() {
    return this.ref;
  }
}

export default CurrentWeather;
