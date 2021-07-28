import handlers from './handlers';

class Forecast {
  constructor({ forecastday }, language, temperatureUnits) {
    this.ref = null;
    this.forecast = forecastday;
    this.language = language;
    this.temperatureUnits = temperatureUnits;

    this.init();
  }

  init() {
    const forecastContainer = document.createElement('div');
    forecastContainer.className = 'flex overflow-x-scroll my-8 pl-2 md:justify-around md:overflow-auto md:my-0 md:mt-8';

    this.forecast.forEach((day, i) => {
      const dayRef = document.createElement('div');

      // week day name
      const weekDayName = document.createElement('div');
      weekDayName.className = 'uppercase text-lg';
      weekDayName.innerHTML = handlers.getDate(day.date, this.language, 'day', i);

      // day weather details wrapper
      const dayWeatherWrapper = document.createElement('div');
      dayWeatherWrapper.className = 'flex w-32';

      // week day temperature
      const weekDayTemperature = document.createElement('div');
      weekDayTemperature.className = 'text-4xl';
      weekDayTemperature.innerHTML = `${Math.round(this.temperatureUnits === 'c' ? day.day.avgtemp_c : day.day.avgtemp_f)}${handlers.DEGREE_HTML_SYMBOL}`;

      // week day weather condition
      const weekDayCondition = document.createElement('img');
      weekDayCondition.src = day.day.condition.icon;
      weekDayCondition.className = 'w-12';

      forecastContainer.appendChild(dayRef);
      dayRef.appendChild(weekDayName);
      dayRef.appendChild(dayWeatherWrapper);
      dayWeatherWrapper.appendChild(weekDayTemperature);
      dayWeatherWrapper.appendChild(weekDayCondition);
    });

    this.ref = forecastContainer;
  }

  getRef() {
    return this.ref;
  }
}

export default Forecast;
