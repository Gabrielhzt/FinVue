import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Chart.css';

const BarChart = ({ data, color, width, height, type }) => {
  const chartContainerRef = useRef(null);
  const chartInstance = useRef(null);

  let totalList;
  if (type === "incomes") {
    totalList = data.map(item => parseInt(item.total_income));
  } else if (type === "expenses") {
    totalList = data.map(item => parseInt(item.total_expense));
  } else {
    console.log('error')
  }
  const monthList = data.map(item => parseInt(item.month));

  useEffect(() => {
    if (chartContainerRef && chartContainerRef.current && data.length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartContainerRef.current.getContext('2d');

      const maxIncome = Math.max(...totalList);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthList,
          datasets: [{
            label: 'Example Dataset',
            data: totalList,
            backgroundColor: color,
            hoverBackgroundColor: color,
          }]
        },
        options: {
          width: width,
          height: height,
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
              min: 0,
              max: maxIncome,
            }
          },
          plugins: {
            legend: {
              display: false
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            title: {
              display: false
            },
            tooltip: {
              enabled: false
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          elements: {
            bar: {
              borderRadius: 5,
              borderWidth: 0,
            }
          },
          barPercentage: 0.9,
          categoryPercentage: 0.7,
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, color, width, height]);

  return (
    <div>
      <canvas ref={chartContainerRef} className='graph' />
    </div>
  );
};

export default BarChart;