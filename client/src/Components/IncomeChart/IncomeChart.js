import React from "react";
import '../Chart.css';
import BarChart from "../../Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const IncomeChart = ({data}) => {
    // Assurez-vous que data est trié par mois pour obtenir les deux dernières valeurs correctement
    const sortedData = [...data].sort((a, b) => parseInt(a.month) - parseInt(b.month));
    
    // Vérifiez si sortedData contient au moins deux éléments
    if (sortedData.length < 2) {
        // Si sortedData contient moins de deux éléments, affichez un message d'erreur ou retournez simplement
        return <div>Insufficient data to calculate percentage difference</div>;
    }

    // Obtenez les deux dernières valeurs
    const latestValue = parseInt(sortedData[sortedData.length - 1].total_income);
    const previousValue = parseInt(sortedData[sortedData.length - 2].total_income);
    
    // Calculez la différence en pourcentage
    const differencePercentage = ((latestValue - previousValue) / previousValue) * 100;

    const totalIncome = data.reduce((acc, curr) => acc + parseInt(curr.total_income), 0);

    return (
        <div className="green">
            <div className="flex-2">
                <div>
                    <h5 className="chart-title">Income</h5>
                    <h2 className="chart-info">${totalIncome}</h2>
                </div>
                <div className="grow">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                    <p>{differencePercentage.toFixed(2)}%</p> {/* Afficher la différence en pourcentage */}
                </div>
            </div>
            <BarChart data={data} color={'#fff'} width={100} height={1000} barSpacing={10} type={'incomes'} />
        </div>
    )
}

export default IncomeChart;