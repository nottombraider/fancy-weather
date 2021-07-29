class Notification {
  constructor() {
    this.notificationContainer = document.createElement('div');
  }

  showNotification(message) {
    this.notificationContainer.innerHTML = message;
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
    this.notificationContainer.style.display = 'none';
    this.notificationContainer.className = 'absolute pt-2 text-center text-2xl text-white w-full h-14 bg-red-500 bg-opacity-75 left-1/2 transform -translate-x-2/4 top-0';
    document.body.appendChild(this.notificationContainer);

    return this;
  }
}

export default new Notification();
