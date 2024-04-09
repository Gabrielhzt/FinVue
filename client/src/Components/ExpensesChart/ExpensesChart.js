import React from "react";
import '../Chart.css';
import BarChart from "../../Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const ExpensesChart = ({data}) => {
    return (
        <div className="grey">
            <div className="flex-2">
                <div>
                    <h5 className="chart-title-2">Expenses</h5>
                    <h2>$4,162</h2>
                </div>
                <div className="grow-2">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                    <p>34%</p>
                </div>
            </div>
            <BarChart data={data} color={'#41B92D'} />
        </div>
    )
}

export default ExpensesChart;