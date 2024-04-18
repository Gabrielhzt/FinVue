import React, { useEffect, useRef } from 'react';
import './PieChart.css';
import Chart from 'chart.js/auto';

const PieChart = ({ data, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    let labels, values;

    if(type === "member") {
      labels = data.map(item => item.full_name);
      values = data.map(item => parseFloat(item.amount));
    } else {
      labels = data.map(item => item.type);
      values = data.map(item => parseFloat(item.total_amount));
    }

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
            align: 'start',
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
  }, [data, type]);

  return <canvas ref={chartRef} className='pie-graph' />;
};

export default PieChart;