import langData from './langData';
import handlers from './handlers';

class CurrentWeather {
  constructor() {
    this.currentWeatherContainer = document.createElement('div');
    this.currTemperature = document.createElement('span');
    this.degree = document.createElement('span');
    this.conditionIconRef = document.createElement('img');
    this.weatherDetailedStateContainer = document.createElement('div');
    this.temperature = null;
    this.conditionIcon = null;
    this.conditionText = null;
    this.wind = null;
    this.feelsLike = null;
    this.humidity = null;
    this.language = null;
  }

  setData(
    temperature,
    conditionIcon, conditionText,
    wind, feelsLike, humidity,
    language,
  ) {
    this.temperature = temperature;
    this.conditionIcon = conditionIcon;
    this.conditionText = conditionText;
    this.wind = wind;
    this.feelsLike = feelsLike;
    this.humidity = humidity;
    this.language = language;

    return this;
  }

  render() {
    this.weatherDetailedStateContainer.innerHTML = '';

    this.currTemperature.innerHTML = Math.round(this.temperature);
    this.degree.innerHTML = `${handlers.DEGREE_HTML_SYMBOL}`;
    this.conditionIconRef.src = this.conditionIcon;
    this.conditionIconRef.alt = this.conditionText;
    this.conditionIconRef.title = this.conditionText;

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

      this.weatherDetailedStateContainer.appendChild(weatherDetailContainer);
    });

    return this;
  }

  init() {
    this.currentWeatherContainer.className = 'md:flex md:flex-col pl-4';

    // temperature
    const temperatureContainer = document.createElement('div');
    this.currTemperature.className = 'text-9xl font-medium';
    this.degree.className = 'text-7xl align-top';
    temperatureContainer.appendChild(this.currTemperature);
    temperatureContainer.appendChild(this.degree);

    // condition icon
    this.conditionIconRef.className = 'w-40 md:w-24 md:self-start';

    // weather state container
    const weatherStateContainer = document.createElement('div');
    weatherStateContainer.className = 'flex flex-col items-center mt-2 sm:flex-row md:justify-around';
    weatherStateContainer.appendChild(temperatureContainer);
    weatherStateContainer.appendChild(this.conditionIconRef);
    this.currentWeatherContainer.appendChild(weatherStateContainer);

    // detailed weather state container
    this.weatherDetailedStateContainer.className = 'text-2xl md:text-base md:self-end';

    weatherStateContainer.appendChild(this.weatherDetailedStateContainer);

    return this;
  }

  getRef() {
    return this.currentWeatherContainer;
  }
}

export default new CurrentWeather();
