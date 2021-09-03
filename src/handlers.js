import langData from './langData';

const DEGREE_HTML_SYMBOL = '&#176;';

const getDate = (dateString, lang = 'en', dateType = 'full', index = 1) => {
  const date = new Date(dateString);
  const appLang = langData.appLanguage[lang];

  if (dateType === 'full') {
    const day = appLang.weekDaysShort[date.getDay()];
    const dayDate = date.getDate();
    const month = appLang.months[date.getMonth()];

    return `${day}, ${month} ${dayDate}`;
  }

  if (dateType === 'day') {
    const day = index === 0 ? appLang.forecastFirstParam : appLang.weekDaysFull[date.getDay()];

    return day;
  }

  return date.toLocaleString();
};

const getRandomImageURL = (images) => {
  const randomIndex = Math.floor(Math.random() * (images.length - 0));

  return images[randomIndex];
};

const transformTime = (timeUnit) => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);

const transformLatLon = (loc) => {
  const [deg, min] = loc.split('.');

  if (!min) return `${deg}${DEGREE_HTML_SYMBOL}00'`;

  return `${deg}${DEGREE_HTML_SYMBOL}${min.length > 2 ? min.substring(0, 2) : min}'`;
};

const handlers = {
  DEGREE_HTML_SYMBOL,
  getDate,
  getRandomImageURL,
  transformTime,
  transformLatLon,
};

export default handlers;
