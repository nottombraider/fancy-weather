import '../styles/index.css';
import { getWeatherInfo, getImgInfo, getUserLocation } from './fetch';
import handlers from './handlers';
import langData from './langData';
import Dashboard from './Dashboard';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import BackgroundToggle from './BackgroundToggle';
import TemperatureUnitsToggle from './TemperatureUnitsToggle';
import LanguageToggle from './LanguageToggle';
import Search from './Search';
import MapSection from './Map';
import Notification from './Notification';
import mockData from './mockData';

class App {
  constructor() {
    this.language = localStorage.getItem('language') || langData.LANGUAGES[0];
    this.temperatureUnits = localStorage.getItem('temperatureUnits') || 'c';
    this.appContainer = document.createElement('div');
    this.dashboard = Dashboard.init();
    this.currentWeather = CurrentWeather.init();
    this.map = MapSection.init();
    this.forecast = Forecast.init();
    this.notification = Notification.init();
    this.usersLocationInfo = null;
    this.weatherInfo = null;
    this.countryNames = null;
    this.imgInfo = null;
    this.bgImage = null;

    this.setBGImage = this.setBGImage.bind(this);
    this.setInterfaceLanguage = this.setInterfaceLanguage.bind(this);
    this.setTemperatureUnits = this.setTemperatureUnits.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  render() {
    this.appContainer.innerHTML = '';

    const { location, current, forecast } = this.weatherInfo;
    const { loc } = this.usersLocationInfo;
    const [lat, lon] = loc.split(',');
    const main = document.createElement('main');
    const weatherContainer = document.createElement('div');

    document.body.appendChild(this.appContainer);
    document.body.style.backgroundImage = `url(${this.bgImage})`;
    document.body.className = 'bg-black bg-opacity-70 text-white py-5 bg-cover bg-fixed md:pt-12';
    this.appContainer.className = 'max-w-screen-md m-auto md:px-4';
    main.className = 'flex flex-col md:flex-row md:justify-between';
    weatherContainer.className = 'md:self-end';

    const dashboard = this.dashboard.setData(
      location.name,
      location.country,
      this.language,
      location.localtime,
    ).render();

    const currentWeather = CurrentWeather.setData(
      this.temperatureUnits === 'c' ? current.temp_c : current.temp_f,
      current.condition.icon,
      current.condition.text,
      `${current.wind_mph}m/s, ${current.wind_dir}`,
      this.temperatureUnits === 'c' ? current.feelslike_c : current.feelslike_f,
      current.humidity,
      this.language,
    ).render();

    const map = this.map.setData(lat, lon).render();

    const forecastNextDays = this.forecast
      .setData(forecast, this.language, this.temperatureUnits).render();

    [currentWeather.getRef(), forecastNextDays.getRef()]
      .forEach((child) => weatherContainer.appendChild(child));

    [weatherContainer, map.getRef()].forEach((child) => main.appendChild(child));

    [dashboard.getRef(), main]
      .forEach((child) => this.appContainer.appendChild(child));

    BackgroundToggle.onClick(() => {
      this.setBGImage();
      this.render();
    });
    LanguageToggle.onChange(async (event) => {
      await this.setInterfaceLanguage(event);
      this.render();
    });
    TemperatureUnitsToggle.onClick(() => {
      this.setTemperatureUnits();
      this.render();
    });
    Search.onClick(async (newLocation) => {
      await this.searchHandler(newLocation);
      this.render();
    });

    return this;
  }

  async getWeatherData() {
    const weatherInfo = await getWeatherInfo(this.language, this.usersLocationInfo.loc);
    this.weatherInfo = weatherInfo;

    if (!weatherInfo) {
      this.weatherInfo = mockData.mockWeatherInfoResponse;
    }

    this.imgInfo = await getImgInfo(this.weatherInfo.current.is_day,
      this.weatherInfo.location.country);

    return this;
  }

  async init() {
    localStorage.setItem('language', this.language);
    localStorage.setItem('temperatureUnits', this.temperatureUnits);

    const usersLocationInfo = await getUserLocation();
    this.usersLocationInfo = usersLocationInfo || mockData.mockIPInfoResponse;

    await this.getWeatherData();

    this.setBGImage();

    return this;
  }

  setBGImage() {
    this.bgImage = handlers.getRandomImageURL(this.imgInfo);
  }

  async setInterfaceLanguage(event) {
    const { selectedIndex } = event.target.options;
    this.language = langData.LANGUAGES[selectedIndex];

    localStorage.setItem('language', this.language);

    const weatherInfo = await getWeatherInfo(this.language, this.usersLocationInfo.loc);
    this.weatherInfo = weatherInfo;
  }

  setTemperatureUnits() {
    this.temperatureUnits = this.temperatureUnits === 'c' ? 'f' : 'c';

    localStorage.setItem('temperatureUnits', this.temperatureUnits);
  }

  async searchHandler(location) {
    const weatherInfo = await getWeatherInfo(this.language, location);

    if (!weatherInfo) {
      this.notification.showNotification(`Provided location (${location}) is not available in weather API`);

      return this;
    }

    this.weatherInfo = weatherInfo;

    const imgInfo = await getImgInfo(
      this.weatherInfo.current.is_day, this.weatherInfo.location.country,
    );
    this.imgInfo = imgInfo;

    this.usersLocationInfo = {
      ...this.usersLocationInfo,
      city: this.weatherInfo.location.name,
      country: this.weatherInfo.location.country,
      loc: `${this.weatherInfo.location.lat},${this.weatherInfo.location.lon}`,
      timezone: this.weatherInfo.location.tz_id,
    };

    this.setBGImage();

    return this;
  }
}

export default new App();
