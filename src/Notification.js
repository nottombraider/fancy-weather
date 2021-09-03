import '../styles/animations.css';
import titles from './titles';

class Notification {
  constructor() {
    this.notificationContainer = document.createElement('div');
    this.notificationMessageContainer = document.createElement('div');
  }

  showNotification(message) {
    this.notificationMessageContainer.innerHTML = message;
    this.notificationContainer.style.display = 'block';

    setTimeout(() => {
      this.clearNotification();
    }, 5000);

    return this;
  }

  clearNotification() {
    this.notificationContainer.style.display = 'none';

    return this;
  }

  init() {
    const { notificationTitle, notificationMessageTitle } = titles.notificationTitles;
    this.notificationContainer.title = notificationTitle;
    this.notificationMessageContainer.title = notificationMessageTitle;

    this.notificationContainer.style.display = 'none';

    this.notificationContainer.className = 'absolute w-full h-14  top-0';
    this.notificationMessageContainer.className = 'notification-message relative py-2 text-center text-2xl bg-red-500 bg-opacity-75';

    this.notificationContainer.appendChild(this.notificationMessageContainer);
    document.body.appendChild(this.notificationContainer);

    return this;
  }
}

export default new Notification();
