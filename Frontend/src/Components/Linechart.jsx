import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ACCESS_KEY = '80b1600a98127f7a295e319ee678e4a4'; // Your Fixer API access key
const BASE_API_URL = 'http://data.fixer.io/api';

const ExchangeRateChart = ({ selectedDate }) => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const historicalEndpoint = `${BASE_API_URL}/${selectedDate}?access_key=${ACCESS_KEY}`;
        const response = await axios.get(historicalEndpoint);
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [selectedDate]);

  useEffect(() => {
    if (exchangeRates) {
      const currencies = Object.keys(exchangeRates);
      const data = Object.values(exchangeRates);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById('exchangeRateChart').getContext('2d');

      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: currencies, // Use currencies as labels on the X-axis
          datasets: [
            {
              label: `Exchange Rate Change from ${selectedDate}`,
              data: data,
              borderColor: getBorderColor(currencies.length),
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Currency',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Exchange Rate',
              },
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const currency = currencies[context.dataIndex];
                  const rate = data[context.dataIndex];
                  return `${currency}: ${rate.toFixed(2)}`;
                },
              },
            },
          },
        },
      });
    }
  }, [exchangeRates, selectedDate]);

  const getBorderColor = (length) => {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(`rgba(${i * 30}, ${i * 50}, ${i * 10}, 1)`);
    }
    return colors;
  };

  return (
    <div>
      <h2>Exchange Rate Chart</h2>
      <canvas id="exchangeRateChart" width="400" height="200" />
    </div>
  );
};

export default ExchangeRateChart;
