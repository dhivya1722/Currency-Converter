
const CURRENCY_LIST_ENDPOINT = `http://data.fixer.io/api/symbols?access_key=80b1600a98127f7a295e319ee678e4a4`;
const EXCHANGE_RATE_ENDPOINT = `http://data.fixer.io/api/latest?access_key=80b1600a98127f7a295e319ee678e4a4`;

function fetchCurrencies() {
  return fetch(CURRENCY_LIST_ENDPOINT);
}


const fetchExchangeRate = (fromCurrency, toCurrency) => {
  const endpoint = `${EXCHANGE_RATE_ENDPOINT}`;
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      console.log('Received data:', data);

      const fromCurrencyRate = data.rates && data.rates[fromCurrency];
      const toCurrencyRate = data.rates && data.rates[toCurrency];

      if (fromCurrencyRate && toCurrencyRate) {
        return { fromCurrencyRate, toCurrencyRate }; // Return both exchange rates
      } else {
        console.error('Error fetching exchange rates. Rates data is null or undefined for the requested currencies.');
        return null;
      }
    })
    .catch((error) => {
      console.error('Error fetching exchange rates:', error);
      return null;
    });
};







export { fetchCurrencies, fetchExchangeRate };

