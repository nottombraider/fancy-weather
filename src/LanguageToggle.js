import langData from './langData';

class LanguageToggle {
  constructor() {
    this.ref = null;
    this.interfaceLanguage = null;

    this.init();
  }

  init() {
    this.interfaceLanguage = localStorage.getItem('language') || langData.LANGUAGES[0];
    const languageToggle = document.createElement('select');

    languageToggle.name = 'interface language';
    languageToggle.className = 'bg-black uppercase bg-opacity-25 border-2 border-white border-opacity-50 rounded px-0.5';

    langData.LANGUAGES.forEach((lang) => {
      const langOption = document.createElement('option');

      langOption.value = lang;
      langOption.innerHTML = lang;

      if (lang === this.interfaceLanguage) langOption.selected = true;

      languageToggle.appendChild(langOption);
    });

    this.ref = languageToggle;
  }

  onChange(callBack) {
    this.ref.addEventListener('change', callBack);
  }

  getRef() {
    return this.ref;
  }
}

export default new LanguageToggle();
