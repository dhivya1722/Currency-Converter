import React, { useEffect, useState } from 'react';
import CurrencyOptions from '../Components/CurrencyOptions';
import { fetchCurrencies, fetchExchangeRate,fetchHistoricalData,calculateConvertedAmount } from '../Services/Api';
import '../Styles/CurrencyConverterPage.css';

function CurrencyConverter() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [currencyNames, setCurrencyNames] = useState({});
  const [selectedDate, setSelectedDate] = useState(''); // Store the selected date

  const updateFromCurrency = (value) => {
    setFromCurrency(value);
  };

  const updateToCurrency = (value) => {
    setToCurrency(value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    fetchCurrencies()
      .then((res) => res.json())
      .then((data) => {
        const currencyKeys = Object.keys(data.symbols);
        setCurrencyOptions(currencyKeys);
        setFromCurrency(currencyKeys[0]);
        setToCurrency(currencyKeys[0]); // Make sure we start with different currencies
        setCurrencyNames(data.symbols);
      })
      .catch((error) => console.error('Error fetching currencies:', error));
  }, []);

 
  useEffect(() => {
    if (parseFloat(fromAmount) === 0) {
      setToAmount(0);
    } else if (fromAmount === '') {
      setToAmount('');
    } else if (fromCurrency === toCurrency || !toCurrency) {
      setToAmount(fromAmount);
    } else {
      fetchExchangeRate(fromCurrency, toCurrency)
        .then((exchangeRates) => {
          if (exchangeRates && !isNaN(parseFloat(fromAmount))) {
            const { fromCurrencyRate, toCurrencyRate } = exchangeRates;
            const convertedAmount = (parseFloat(fromAmount) / fromCurrencyRate) * toCurrencyRate;
            setToAmount(convertedAmount.toFixed(3));
          } else {
            setToAmount('');
          }
        })
        .catch((error) => {
          console.error('Error converting amount:', error);
          setToAmount('');
        });
    }
  }, [fromCurrency, toCurrency, fromAmount]);

  const getHistoricalExchangeRate = async () => {
    if (selectedDate && fromCurrency && toCurrency) {
      try {
        const rates = await fetchHistoricalData(selectedDate);
        const fromCurrencyRate = rates[fromCurrency];
        const toCurrencyRate = rates[toCurrency];
        const convertedAmount = calculateConvertedAmount(fromAmount, fromCurrencyRate, toCurrencyRate);
        setToAmount(convertedAmount.toFixed(3));
      } catch (error) {
        setToAmount('Unavailable');
      }
    }
  };
  

  useEffect(() => {
    getHistoricalExchangeRate();
  }, [fromCurrency, toCurrency, selectedDate]);

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Currency Converter</h1>
      </nav>
      <div className="container">
        <div className="item1">
          <div className="opt-1">
            <h2>From Currency</h2>
            <CurrencyOptions
              prop="From currency"
              fromCurrency={fromCurrency}
              currencyOptions={currencyOptions}
              updateCurrency={updateFromCurrency}
            />
          </div>
          <div className="swap-button">
            <button onClick={handleSwapCurrencies}>&#8679;&#8675;&#8681;</button>
          </div>
          <div className="opt-2">
            <h2>To Currency</h2>
            <CurrencyOptions
              prop="To currency"
              toCurrency={toCurrency}
              currencyOptions={currencyOptions}
              updateCurrency={updateToCurrency}
            />
          </div>
        </div>
        <div className="item2">
          <h2>Enter Amount in {fromCurrency}</h2>
          <input type="number" autoComplete="off" value={fromAmount || ''} className="input" onChange={e => setFromAmount(e.target.value)} />
        </div>
        <div className="item3">
          <h3>=</h3>
          <h2>Amount in {toCurrency}</h2>
          <input className="output" disabled value={toAmount || ''} type="text" />
        </div>
        <div className="date">
          <label htmlFor="dateInput">Select Date for Historical Exchange Rates: </label>
          <input type="date" id="dateInput" value={selectedDate} onChange={handleDateChange} />
        </div>
        <div className="item4">
          <h2>
            {fromAmount} {currencyNames[`${fromCurrency}`]} = {toAmount} {currencyNames[`${toCurrency}`]}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default CurrencyConverter;
