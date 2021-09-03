import '../styles/animations.css';
import titles from './titles';

class BackgroundToggle {
  constructor() {
    this.ref = null;

    this.init();
  }

  init() {
    const { backgroundToggleTitle, iconRefreshTitle } = titles.backgroundToggleTitles;
    const backgroundToggle = document.createElement('button');
    const iconRefresh = document.createElement('i');

    iconRefresh.className = 'bg-toggle fa fa-refresh self-center py-3 px-4';
    backgroundToggle.className = 'bg-black bg-opacity-25 border-2 border-white border-opacity-50 rounded';
    backgroundToggle.title = backgroundToggleTitle;
    iconRefresh.title = iconRefreshTitle;

    backgroundToggle.appendChild(iconRefresh);

    this.ref = backgroundToggle;

    return this;
  }

  getRef() {
    return this.ref;
  }

  onClick(callBack) {
    this.ref.onclick = callBack;
  }
}

export default new BackgroundToggle();
