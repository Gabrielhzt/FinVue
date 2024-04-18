import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './BigChart.css';

const formatValue = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'm';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  } else {
    return value.toString();
  }
};

const BigChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const totalList = data.map(item => parseInt(item.net_total));
  const monthList = data.map(item => parseInt(item.month));

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');

      const max = Math.max(...totalList);

      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: monthList,
          datasets: [{
            label: 'Example Dataset',
            data: totalList,
            backgroundColor: '#41B92D',
            hoverBackgroundColor: '#41B92D',
          }]
        },
        options: {
          scales: {
            x: {
                grid: {
                  display: false // Désactiver l'affichage de la grille sur l'axe x
                }
              },
              y: {
                grid: {
                  display: false // Désactiver l'affichage de la grille sur l'axe y
                },
                beginAtZero: true,
                min: 0,
                max: max,
                ticks: {
                  callback: function(value) {
                    return formatValue(value);
                  }
                }
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
          elements: {
            bar: {
              borderRadius: 5,
              borderWidth: 0,
            }
          },
          barPercentage: 0.6,
          categoryPercentage: 0.6,
        }
      });
    }

    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef} className='graph-2' />
    </div>
  );
};

export default BigChart;
