import langData from './langData';

class Search {
  constructor() {
    this.language = localStorage.getItem('language') || langData.LANGUAGES[0];
    this.searchBarRef = null;
    this.searchInputRef = null;
    this.searchButtonRef = null;
    this.searchInputData = '';

    this.init();
  }

  init() {
    const searchBar = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');
    const searchButtonIcon = document.createElement('i');

    searchInput.placeholder = langData.appLanguage[this.language].searchInputPlaceholder;

    searchBar.className = 'flex justify-center items-center';
    searchInput.className = 'w-3/4 h-8 bg-black bg-opacity-20 border-2 border-white border-opacity-70 rounded pl-2 md:w-64';
    searchButtonIcon.className = 'fa fa-search text-2xl p-2';

    searchButton.appendChild(searchButtonIcon);
    searchBar.appendChild(searchInput);
    searchBar.appendChild(searchButton);

    searchInput.addEventListener('change', ({ target: { value } }) => {
      this.searchInputData = value;
    });

    this.searchBarRef = searchBar;
    this.searchInputRef = searchInput;
    this.searchButtonRef = searchButton;
  }

  onClick(callBack) {
    this.searchInputRef.innerHTML = '';
    this.searchInputData = '';
    this.searchButtonRef.addEventListener('click', () => callBack(this.searchInputData));
  }

  getSearchBarRef() {
    return this.searchBarRef;
  }

  getButtonRef() {
    return this.searchButtonRef;
  }
}

export default new Search();
