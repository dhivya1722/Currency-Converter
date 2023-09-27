
const CURRENCY_LIST_ENDPOINT = `http://data.fixer.io/api/symbols?access_key=80b1600a98127f7a295e319ee678e4a4`;
const EXCHANGE_RATE_ENDPOINT = `http://data.fixer.io/api/latest?access_key=80b1600a98127f7a295e319ee678e4a4`;
// const PAST_YEAR_ENDPOINT=`http://data.fixer.io/api//YYYY-MM-DD?access_key=80b1600a98127f7a295e319ee678e4a4`;
// const historicalEndpoint = `http://data.fixer.io/api/${selectedDate}?access_key=80b1600a98127f7a295e319ee678e4a4`;



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


// Separate API call into a function
const fetchHistoricalData = async (selectedDate) => {
  const historicalEndpoint = `http://data.fixer.io/api/${selectedDate}?access_key=80b1600a98127f7a295e319ee678e4a4`;

  try {
    const response = await fetch(historicalEndpoint);
    const data = await response.json();

    if (data.success) {
      return data.rates;
    } else {
      throw new Error('Error fetching historical exchange rates:', data.error);
    }
  } catch (error) {
    console.error('Error fetching historical exchange rates:', error);
    throw error;
  }
};


const calculateConvertedAmount = (fromAmount, fromCurrencyRate, toCurrencyRate) => {
  if (fromCurrencyRate && toCurrencyRate) {
    return (parseFloat(fromAmount) / fromCurrencyRate) * toCurrencyRate;
  } else {
    return 'Unavailable';
  }
};

export { fetchCurrencies, fetchExchangeRate,fetchHistoricalData,calculateConvertedAmount };

