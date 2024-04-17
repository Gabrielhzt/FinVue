import React, { useEffect, useRef } from 'react';
import './PieChart.css';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    // Extraire les labels et les valeurs du tableau de données
    const labels = data.map(item => item.type);
    const values = data.map(item => parseFloat(item.total_amount));

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: values,
          backgroundColor: [
            'red',
            'blue',
            'yellow',
            'green',
            'purple',
            'orange'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'left',
            align: 'start', // Aligner les carrés à gauche
            labels: {
              boxWidth: 10,
              padding: 10
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} className='pie-graph' />;
};

export default PieChart;