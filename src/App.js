import '../styles/index.css';
import fetcher from './fetch';
import handlers from './handlers';
import langData from './langData';
import Dashboard from './Dashboard';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';
import BackgroundToggle from './BackgroundToggle';
import TemperatureUnitsToggle from './TemperatureUnitsToggle';
import LanguageToggle from './LanguageToggle';
import Search from './Search';
import Map from './Map';

class App {
  constructor() {
    this.language = localStorage.getItem('language') || langData.LANGUAGES[0];
    this.temperatureUnits = localStorage.getItem('temperatureUnits') || 'c';
    this.appContainer = document.createElement('div');
    this.usersLocationInfo = null;
    this.weatherInfo = null;
    this.countryNames = null;
    this.imgInfo = null;
    this.bgImage = null;

    this.setBGImage = this.setBGImage.bind(this);
    this.setInterfaceLanguage = this.setInterfaceLanguage.bind(this);
    this.setTemperatureUnits = this.setTemperatureUnits.bind(this);
    this.searchHandler = this.searchHandler.bind(this);

    this.init();
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

    const dashboard = new Dashboard(
      location.name,
      location.country,
      this.language,
      location.localtime,
    );
    const currentWeather = new CurrentWeather(
      this.temperatureUnits === 'c' ? current.temp_c : current.temp_f,
      current.condition.icon,
      current.condition.text,
      `${current.wind_mph}m/s, ${current.wind_dir}`,
      this.temperatureUnits === 'c' ? current.feelslike_c : current.feelslike_f,
      current.humidity,
      this.language,
    );
    const map = new Map(lat, lon);
    const forecastNextDays = new Forecast(forecast, this.language);

    [currentWeather.getRef(), forecastNextDays.getRef()]
      .forEach((child) => weatherContainer.appendChild(child));

    [weatherContainer, map.getRef()].forEach((child) => main.appendChild(child));

    [dashboard.getRef(), main]
      .forEach((child) => this.appContainer.appendChild(child));

    BackgroundToggle.onClick(this.setBGImage);
    LanguageToggle.onChange(this.setInterfaceLanguage);
    TemperatureUnitsToggle.onClick(this.setTemperatureUnits);
    Search.onClick(this.searchHandler);
  }

  async init() {
    localStorage.setItem('language', this.language);
    localStorage.setItem('temperatureUnits', this.temperatureUnits);

    const usersLocationInfo = await fetcher.getUserLocation();
    this.usersLocationInfo = usersLocationInfo;

    const weatherInfo = await fetcher.getWeatherInfo(this.language, usersLocationInfo.loc);
    this.weatherInfo = weatherInfo;

    const imgInfo = await fetcher
      .getImgInfo(weatherInfo.current.is_day, weatherInfo.location.country);
    this.imgInfo = imgInfo;

    this.setBGImage();
  }

  setBGImage() {
    this.bgImage = handlers.getRandomImageURL(this.imgInfo);

    this.render();
  }

  async setInterfaceLanguage(event) {
    const { selectedIndex } = event.target.options;
    this.language = langData.LANGUAGES[selectedIndex];

    localStorage.setItem('language', this.language);

    const weatherInfo = await fetcher.getWeatherInfo(this.language, this.usersLocationInfo.city);
    this.weatherInfo = weatherInfo;

    this.render();
  }

  setTemperatureUnits() {
    this.temperatureUnits = this.temperatureUnits === 'c' ? 'f' : 'c';

    localStorage.setItem('temperatureUnits', this.temperatureUnits);

    this.render();
  }

  async searchHandler(location) {
    const weatherInfo = await fetcher.getWeatherInfo(this.language, location);
    this.weatherInfo = weatherInfo;

    this.weatherInfo = weatherInfo;
    this.usersLocationInfo = {
      ...this.usersLocationInfo,
      city: this.weatherInfo.location.name,
      country: this.weatherInfo.location.country,
      loc: `${this.weatherInfo.location.lat},${weatherInfo.location.lon}`,
      timezone: this.weatherInfo.location.tz_id,
    };
    const imgInfo = await fetcher.getImgInfo(
      this.weatherInfo.current.is_day, this.weatherInfo.location.country,
    );
    this.imgInfo = imgInfo;
    this.bgImage = handlers.getRandomImageURL(imgInfo);

    this.render();
  }
}

export default new App();
