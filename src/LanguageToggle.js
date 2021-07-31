import langData from './langData';
import titles from './titles';

class LanguageToggle {
  constructor() {
    this.ref = null;
    this.interfaceLanguage = null;

    this.init();
  }

  init() {
    const { languageToggleTitle, languageToggleName, languageTitle } = titles.languageToggleTitles;
    this.interfaceLanguage = localStorage.getItem('language') || langData.LANGUAGES[0];
    const languageToggle = document.createElement('select');

    languageToggle.title = languageToggleTitle;
    languageToggle.name = languageToggleName;
    languageToggle.className = 'bg-black uppercase bg-opacity-25 border-2 border-white border-opacity-50 rounded px-0.5';

    langData.LANGUAGES.forEach((lang) => {
      const langOption = document.createElement('option');

      langOption.title = languageTitle[lang];
      langOption.value = lang;
      langOption.innerHTML = lang;

      if (lang === this.interfaceLanguage) {
        langOption.selected = true;
        langOption.title += languageTitle.chosen;
      }

      languageToggle.appendChild(langOption);
    });

    this.ref = languageToggle;
  }

  onChange(callBack) {
    this.ref.onchange = callBack;
  }

  getRef() {
    return this.ref;
  }
}

export default new LanguageToggle();
