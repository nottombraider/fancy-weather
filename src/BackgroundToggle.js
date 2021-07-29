import '../styles/animations.css';

class BackgroundToggle {
  constructor() {
    this.ref = null;

    this.init();
  }

  init() {
    const backgroundToggle = document.createElement('div');
    const iconRefresh = document.createElement('i');

    iconRefresh.className = 'bg-toggle fa fa-refresh self-center py-3 px-4';
    backgroundToggle.className = 'bg-black bg-opacity-25 border-2 border-white border-opacity-50 rounded';
    backgroundToggle.title = 'Change background image';
    backgroundToggle.id = 'bg-toggle';

    backgroundToggle.appendChild(iconRefresh);

    this.ref = backgroundToggle;
  }

  getRef() {
    return this.ref;
  }

  onClick(callBack) {
    this.ref.onclick = callBack;
  }
}

export default new BackgroundToggle();
