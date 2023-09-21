// services/currencyService.js
const BASE_URL = 'https://api.frankfurter.app';

const fetchCurrencies = () => {
  return fetch(`${BASE_URL}/currencies`);
};

const fetchExchangeRate = (fromCurrency, toCurrency, amount) => {
  return fetch(`${BASE_URL}/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then((res) => res.json())
    .then((data) => Object.values(data.rates)[0]);
};
const fetchHistoricalExchangeRates = (fromCurrency, toCurrency, startDate, endDate) => {
  return fetch(`${BASE_URL}/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`)
    .then((res) => res.json())
    .then((data) => data.rates);
};

export { fetchCurrencies, fetchExchangeRate, fetchHistoricalExchangeRates };

