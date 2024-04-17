import React from "react";
import '../Chart.css';
import BarChart from "../../Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const ExpensesChart = ({data}) => {

    const sortedData = [...data].sort((a, b) => parseInt(a.month) - parseInt(b.month));
    
    // Vérifiez si sortedData contient au moins deux éléments
    if (sortedData.length < 2) {
        // Si sortedData contient moins de deux éléments, affichez un message d'erreur ou retournez simplement
        return <div>Insufficient data to calculate percentage difference</div>;
    }

    // Obtenez les deux dernières valeurs
    const latestValue = parseInt(sortedData[sortedData.length - 1].total_expense);
    const previousValue = parseInt(sortedData[sortedData.length - 2].total_expense);
    
    // Calculez la différence en pourcentage
    const differencePercentage = ((latestValue - previousValue) / previousValue) * 100;

    const totalExpense = data.reduce((acc, curr) => acc + parseInt(curr.total_expense), 0);

    return (
        <div className="grey">
            <div className="flex-2">
                <div>
                    <h5 className="chart-title-2">Expenses</h5>
                    <h2>${totalExpense}</h2>
                </div>
                <div className="grow-2">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                    <p>{differencePercentage.toFixed(2)}%</p>
                </div>
            </div>
            <BarChart data={data} color={'#41B92D'} type={'expenses'} />
        </div>
    )
}

export default ExpensesChart;