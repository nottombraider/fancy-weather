import handlers from './handlers';
import titles from './titles';

class Forecast {
  constructor() {
    this.forecastContainer = document.createElement('div');
    this.forecast = null;
    this.language = null;
    this.temperatureUnits = null;
  }

  setData({ forecastday }, language, temperatureUnits) {
    this.forecast = forecastday;
    this.language = language;
    this.temperatureUnits = temperatureUnits;

    return this;
  }

  render() {
    this.forecastContainer.innerHTML = '';
    const {
      forecastContainerTittle,
      dayRefTitle,
      weekDayNameTitle,
      dayWeatherWrapperTitle,
      weekDayTemperatureTitle,
      weekDayConditionTitle,
    } = titles.forecastTitles;

    this.forecastContainer.title = forecastContainerTittle;

    this.forecast.forEach((day, i) => {
      const dayRef = document.createElement('div');
      const dayName = handlers.getDate(day.date, this.language, 'day', i);

      dayRef.title = dayRefTitle(i + 1);

      // week day name
      const weekDayName = document.createElement('div');
      weekDayName.title = weekDayNameTitle;
      weekDayName.className = 'uppercase text-lg';
      weekDayName.innerHTML = dayName;

      // day weather details wrapper
      const dayWeatherWrapper = document.createElement('div');
      dayWeatherWrapper.title = dayWeatherWrapperTitle(dayName);
      dayWeatherWrapper.className = 'flex w-32';

      // week day temperature
      const weekDayTemperature = document.createElement('div');
      weekDayTemperature.title = weekDayTemperatureTitle(dayName);
      weekDayTemperature.className = 'text-4xl';
      weekDayTemperature.innerHTML = `${Math.round(this.temperatureUnits === 'c' ? day.day.avgtemp_c : day.day.avgtemp_f)}${handlers.DEGREE_HTML_SYMBOL}`;

      // week day weather condition
      const weekDayCondition = document.createElement('img');
      weekDayCondition.title = weekDayConditionTitle(dayName);
      weekDayCondition.src = day.day.condition.icon;
      weekDayCondition.alt = day.day.condition.text;
      weekDayCondition.className = 'w-12';

      this.forecastContainer.appendChild(dayRef);
      dayRef.appendChild(weekDayName);
      dayRef.appendChild(dayWeatherWrapper);
      dayWeatherWrapper.appendChild(weekDayTemperature);
      dayWeatherWrapper.appendChild(weekDayCondition);
    });

    return this;
  }

  init() {
    this.forecastContainer.className = 'flex overflow-x-scroll my-8 pl-2 md:justify-around md:overflow-auto md:my-0 md:mt-8';

    return this;
  }

  getRef() {
    return this.forecastContainer;
  }
}

export default new Forecast();
