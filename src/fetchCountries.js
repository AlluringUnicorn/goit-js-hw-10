const ENDPOINT = 'https://restcountries.com/v3.1';

export function fetchCountries(name) {
  return fetch(
    `${ENDPOINT}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => response.json());
}
