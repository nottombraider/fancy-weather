const LANGUAGES = ['en', 'pl'];

const appLanguage = {
  en: {
    searchInputPlaceholder: 'Enter city name',
    weekDaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekDaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    detailedWeather: {
      wind: 'Wind',
      feelsLike: 'Feels Like',
      humidity: 'Humidity',
    },
    forecastFirstParam: 'Today',
  },
  pl: {
    searchInputPlaceholder: 'Wspisz nazwę miasta',
    weekDaysShort: ['Niedz', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb'],
    weekDaysFull: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
    months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
    detailedWeather: {
      wind: 'Wiatr',
      feelsLike: 'Odczuwalna',
      humidity: 'Wilgotność',
    },
    forecastFirstParam: 'Dzisiaj',
  },
};

const langData = {
  LANGUAGES,
  appLanguage,
};

export default langData;
