import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';  // Correct import statement

const LineChart = ({ historicalExchangeRates }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !historicalExchangeRates) return;

    const labels = Object.keys(historicalExchangeRates);
    const data = Object.values(historicalExchangeRates);

    const ctx = chartRef.current.getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Exchange Rate',
            data,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [historicalExchangeRates]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
