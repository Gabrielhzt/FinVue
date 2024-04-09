import React from "react";
import '../Chart.css';
import BarChart from "../../Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

const IncomeChart = ({data}) => {
    return (
        <div className="green">
            <div className="flex-2">
                <div>
                    <h5 className="chart-title">Income</h5>
                    <h2 className="chart-info">$32,162</h2>
                </div>
                <div className="grow">
                    <FontAwesomeIcon icon={faArrowTrendUp} />
                    <p>34%</p>
                </div>
            </div>
            <BarChart data={data} color={'#fff'} width={100} height={1000} barSpacing={10} />
        </div>
    )
}

export default IncomeChart;