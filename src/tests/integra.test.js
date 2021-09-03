import {
  getByText, getByTitle, fireEvent,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import mockData from '../mockData';
import handlers from '../handlers';
import titles from '../titles';

jest.mock('../fetch.js', () => {
  const real = jest.requireActual('../fetch.js');

  return {
    ...real,
    getUserLocation: () => mockData.mockIPInfoResponse,
    getWeatherInfo: () => mockData.mockWeatherInfoResponse,
    getImgInfo: () => mockData.mockImgInfoResponse,
  };
});

const getRandomImgSpy = jest.spyOn(handlers, 'getRandomImageURL');

const {
  dashboardTitles: { dashboardTitle },
  backgroundToggleTitles: { backgroundToggleTitle },
  languageToggleTitles: { languageToggleTitle, languageTitle },
  temperatureUnitsTitles: { temperatureUnitsContainerTitle, fahrenheitUnitsTitle, chosen },
  searchTitles: { searBarTitle },
  currentWeatherTitles: { currentWeatherContainerTitle },
  forecastTitles: { forecastContainerTittle },
  mapTitles: { mapTitle },
} = titles;

test('App renders and contains dashboard', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');

  expect(getByTitle(appContainer, new RegExp(dashboardTitle))).toBeInTheDocument();

  appContainer.innerHTML = '';
});

test('App contains background change button and calls function to change the background image', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');
  const button = getByTitle(appContainer, backgroundToggleTitle);

  userEvent.click(button);

  expect(getRandomImgSpy).toBeCalledTimes(2);

  appContainer.innerHTML = '';
});

test('App contains language toggle and calls function to change interface language', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');
  const button = getByTitle(appContainer, languageToggleTitle);

  fireEvent.change(button, { target: { value: 'pl' } });

  expect(getByTitle(appContainer, languageTitle.pl).selected).toBeTruthy();

  appContainer.innerHTML = '';
});

test('App contains temperature units toggle and calls function to change selected units', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');
  const button = getByTitle(appContainer, temperatureUnitsContainerTitle);

  userEvent.click(button);

  expect(getByTitle(appContainer, new RegExp(chosen)).title).toBe(`${fahrenheitUnitsTitle}${chosen}`);

  appContainer.innerHTML = '';
});

test('App renders and contains search bar', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');

  expect(getByTitle(appContainer, new RegExp(searBarTitle))).toBeInTheDocument();

  appContainer.innerHTML = '';
});

test('App renders and contains location name', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');

  expect(getByText(appContainer, new RegExp(mockData.mockWeatherInfoResponse.location.name)))
    .toBeTruthy();

  appContainer.innerHTML = '';
});

test('App renders and contains current weather container', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');

  expect(getByTitle(appContainer, new RegExp(currentWeatherContainerTitle))).toBeInTheDocument();

  appContainer.innerHTML = '';
});

test('App renders and contains forecast', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');

  expect(getByTitle(appContainer, new RegExp(forecastContainerTittle))).toBeInTheDocument();

  appContainer.innerHTML = '';
});

test('App renders and contains map', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');

  expect(getByTitle(appContainer, new RegExp(mapTitle))).toBeInTheDocument();

  appContainer.innerHTML = '';
});

test('App renders and map shows current user location', async () => {
  const app = await App.init();
  app.render();
  const appContainer = document.getElementById('appContainer');
  const mapContainer = getByTitle(appContainer, new RegExp(mapTitle));

  expect(mapContainer.src).toMatch(mockData.mockIPInfoResponse.loc.split(',').reverse().join(','));

  appContainer.innerHTML = '';
});
