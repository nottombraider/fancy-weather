import langData from './langData';
import titles from './titles';

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
    const {
      searBarTitle,
      searchInputTitle,
      searchButtonTitle,
      searchButtonIconTitle,
    } = titles.searchTitles;
    const searchBar = document.createElement('div');
    const searchInput = document.createElement('input');
    const searchButton = document.createElement('button');
    const searchButtonIcon = document.createElement('i');

    searchBar.title = searBarTitle;
    searchInput.title = searchInputTitle;
    searchButton.title = searchButtonTitle;
    searchButtonIcon.title = searchButtonIconTitle;
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
    this.searchButtonRef.onclick = () => callBack(this.searchInputData);
    this.searchInputData = '';
  }

  getSearchBarRef() {
    return this.searchBarRef;
  }

  getButtonRef() {
    return this.searchButtonRef;
  }
}

export default new Search();
