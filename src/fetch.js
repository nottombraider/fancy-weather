const WEATHER_INFO_API_KEY = '20114faf8f8c42f19c6145042210807';
const IMAGE_INFO_API_KEY = 'd867fe04ffce0baa11888013820af0f7';
const IP_INFO_TOKEN = '59551ea34be904';
const MAP_TOKEN = 'pk.eyJ1Ijoibm90dG9tYnJhaWRlciIsImEiOiJja3JtYjdmdDA0NTNzMnBwOGI1c3N5eGRtIn0.hsH0tAPJPkBuXr5KD-P4fQ';

const ipInfoURL = `https://ipinfo.io/?token=${IP_INFO_TOKEN}`;
const weatherInfoURL = (
  lang = 'en', location, days = 3,
) => {
  if (!location) throw Error('weatherInfoURL: Require property is missing');

  return `https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_INFO_API_KEY}&q=${
    location.split(' ').join('_')}&days=${days}&lang=${lang}`;
};

const imgInfoURL = (
  tags = ['summer', 'morning'],
) => `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${IMAGE_INFO_API_KEY}&tags=nature,landscapes,${
  tags.join(',')}&tag_mode=all&extras=url_h&format=json&nojsoncallback=1`;

export const mapURL = (
  lat, lon,
) => `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lon},${lat},11,0/220x220?access_token=${MAP_TOKEN}&SameSite=None`;

export const getUserLocation = async () => {
  try {
    const response = await fetch(ipInfoURL);
    const result = await response.json();

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    return null;
  }
};

export const getImgInfo = async (isDay, location) => {
  const tags = isDay ? ['morning', location] : ['night', location];
  const response = await fetch(imgInfoURL(tags));
  const result = await response.json();

  return result.photos.photo
    .reduce((acc, imgData) => (imgData.url_h ? [...acc, imgData.url_h] : acc), []);
};

export const getWeatherInfo = async (lang, location) => {
  try {
    const response = await fetch(weatherInfoURL(lang, location));
    const result = await response.json();

    if (result.error) throw new Error(result.error.message);

    return result;
  } catch (e) {
    return null;
  }
};

export default {
  mapURL,
  getUserLocation,
  getWeatherInfo,
  getImgInfo,
};
