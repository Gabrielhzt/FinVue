import React from "react";
import './Income.css';
import IncomeChart from "../../Components/IncomeChart/IncomeChart";
import PieChart from "../../Chart/PieChart/PieChart";
import Table from "../../Components/Table/Table";
import { Link, Outlet } from "react-router-dom";

const Income = () => {

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    return (
        <div>
            <div className="info-top">
                <IncomeChart data={data} />
                <div className="pie">
                    <div>
                        <h2 className="income-title">Income Distribution</h2>
                        <p className="description">Visualize how your income is distributed among different categories or sources. Explore the pie chart below to understand the breakdown of your income.</p>
                        <ul className="list">
                            <li>
                                <div></div>
                                <p>Salary</p>
                            </li>
                            <li>
                                <div></div>
                                <p>Salary</p>
                            </li>
                        </ul>
                    </div>
                    <PieChart data={data} />
                </div>
            </div>
            <div>
                <div className="income-title-2">
                    <h2>Incomes</h2>
                    <div className="flex-3">
                        <button className="filter-btn">Filter</button>
                        <Link to={'./add'}><button className="btn-2">Add Incomes</button></Link>
                    </div>
                </div>
                <Table />
            </div>
            <div className="Add">
                <Outlet />
            </div>
        </div>
    )
}

export default Income;