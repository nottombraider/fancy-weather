import handlers from './handlers';
import titles from './titles';

const Clock = () => {
  const clock = document.createElement('span');

  clock.title = titles.clockTitles.clockTitle;

  const setTime = () => {
    const current = new Date();
    let h = current.getHours();
    let m = current.getMinutes();
    let s = current.getSeconds();

    h = handlers.transformTime(h);
    m = handlers.transformTime(m);
    s = handlers.transformTime(s);

    clock.innerText = `${h}:${m}:${s}`;

    setTimeout(setTime, 1000);
  };

  setTime();

  return clock;
};

export default Clock;
