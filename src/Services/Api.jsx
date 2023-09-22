// services/currencyService.js
// const BASE_URL = 'https://api.frankfurter.app';

// const fetchCurrencies = () => {
//   return fetch(`${BASE_URL}/currencies`);
// };

// const fetchExchangeRate = (fromCurrency, toCurrency, amount) => {
//   return fetch(`${BASE_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
//     .then((res) => res.json())
//     .then((data) => Object.values(data.rates)[0]);
// };


// Replace the old API endpoints with Fixer API endpoints and include your API key
// const API_KEY = 'YOUR_FIXER_API_KEY';
const CURRENCY_LIST_ENDPOINT = `http://data.fixer.io/api/symbols?access_key=80b1600a98127f7a295e319ee678e4a4`;
const EXCHANGE_RATE_ENDPOINT = `http://data.fixer.io/api/latest?access_key=80b1600a98127f7a295e319ee678e4a4`;

function fetchCurrencies() {
  return fetch(CURRENCY_LIST_ENDPOINT);
}

// function fetchExchangeRate(fromCurrency, toCurrency) {
//   const endpoint = `${EXCHANGE_RATE_ENDPOINT}&base=${fromCurrency}&symbols=${toCurrency}`;
//   return fetch(endpoint);
// }

const fetchExchangeRate = (fromCurrency, toCurrency) => {
  const endpoint = `${EXCHANGE_RATE_ENDPOINT}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      console.log('Received data:', data);
      
      if (data.rates && data.rates[toCurrency]) {
        return data.rates[toCurrency]; // Use the correct exchange rate
      } else {
        console.error('Error fetching exchange rates. Rates data is null or undefined for the requested currency.');
        return null;
      }
    })
    .catch((error) => {
      console.error('Error fetching exchange rates:', error);
      return null;
    });
};


// Rest of your code remains mostly the same, just update the API usage accordingly

export { fetchCurrencies, fetchExchangeRate };

