import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const container = document.querySelector('#container');
const countryList = document.querySelector('#country-list');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const query = input.value.trim();

  if (query === '') {
    clearMarkup();
    return;
  }

  fetchCountries(query).then(countries => {
    if (countries.length > 10) {
      clearMarkup();
      Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length >= 2 && countries.length <= 10) {
      const list = countries.reduce(
        (list, country) => createList(country) + list,
        ''
      );
      updateList(list);
    } else if (countries.length === 1) {
      const markup = countries.reduce(
        (markup, country) => createMarkup(country) + markup,
        ''
      );
      updateMarkup(markup);
    } else if (countries.status === 404) {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
    }
  });
}

function clearMarkup() {
  container.innerHTML = '';
  countryList.innerHTML = '';
}

function createList(country) {
  return `<li><img class="list-img" src="${country.flags.svg}" alt=" width="30px" length="20px"><p>${country.name.official}</p></li>`;
}

function updateList(markup) {
  container.innerHTML = '';
  countryList.innerHTML = markup;
}

function createMarkup(country) {
  const languages = Object.values(country.languages);

  return `<div class="header"><img class="header-img" src="${country.flags.svg}" alt="" width="30" length="20" />
<h1>${country.name.official}</h1> </div>
<p><span>Capital: </span>${country.capital}</p>
<p><span>Population: </span>${country.population}</p>
<p><span>Languages: </span>${languages}</p>`;
}

function updateMarkup(markup) {
  countryList.innerHTML = '';
  container.innerHTML = markup;
}
