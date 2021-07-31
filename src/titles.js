const titles = {
  appContainerTitles: {
    appContainerTitle: 'App container',
    mainTitle: 'Main container',
    weatherContainerTitle: 'Weather container',
  },
  dashboardTitles: {
    headerRefTitle: 'Header',
    dashboardTitle: 'Dashboard',
    togglersContainerTitle: 'Togglers container',
    titleContainerTitle: 'Title container',
    locationContainerTitle: 'Weather location',
    dateTimeContainerTitle: 'Date and time container',
    dateContainerTitle: 'Users current date',
  },
  backgroundToggleTitles: {
    backgroundToggleTitle: 'Change background image',
    iconRefreshTitle: 'Icon change background image',
  },
  languageToggleTitles: {
    languageToggleTitle: 'Interface language toggle',
    languageToggleName: 'Interface language',
    languageTitle: {
      en: 'English',
      pl: 'Polish',
      chosen: ' is chosen',
    },
  },
  temperatureUnitsTitles: {
    temperatureUnitsContainerTitle: 'Temperature units container',
    celsiusUnitsTitle: 'Celsius units',
    fahrenheitUnitsTitle: 'Fahrenheit units',
    chosen: ' are chose',
  },
  searchTitles: {
    searBarTitle: 'Search bar',
    searchInputTitle: 'Search input field',
    searchButtonTitle: 'Search button',
    searchButtonIconTitle: 'Search button icon',
  },
  clockTitles: {
    clockTitle: 'Users current time',
  },
  currentWeatherTitles: {
    currentWeatherContainerTitle: 'Current weather container',
    temperatureContainerTitle: 'Current temperature container',
    currTemperatureTitle: 'Current temperature',
    degreeTitle: 'Degree symbol',
    conditionIconRefTitle: 'Condition icon',
    weatherDetailedStateContainerTitle: 'Detailed weather state',
  },
  forecastTitles: {
    forecastContainerTittle: 'Forecast container',
    dayRefTitle: (dayNumber) => `Forecast ${dayNumber} day`,
    weekDayNameTitle: 'Week day name',
    dayWeatherWrapperTitle: (dayName) => `Weather state for ${dayName}`,
    weekDayTemperatureTitle: (dayName) => `Temperature for ${dayName}`,
    weekDayConditionTitle: (dayName) => `Weather condition for ${dayName}`,
  },
  mapTitles: {
    mapTitle: 'Map',
  },
  notificationTitles: {
    notificationTitle: 'Notification',
    notificationMessageTitle: 'Notification message',
  },
};

export default titles;
