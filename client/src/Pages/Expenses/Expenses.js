import React from "react";
import PieChart from "../../Chart/PieChart/PieChart";
import ExpensesChart from "../../Components/ExpensesChart/ExpensesChart";
import Table from "../../Components/Table/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router-dom";

const Expenses = () => {

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    return (
        <div>
            <div className="info-top">
                <ExpensesChart data={data} />
                <div className="pie">
                    <div>
                        <h2 className="income-title">Expense Breakdown</h2>
                        <p className="description">Visualize your expenses with a pie chart breakdown by category to gain insights into your spending habits and identify areas for potential savings.</p>
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
                    <h2>Expenses</h2>
                    <div className="flex-3">
                        <button className="filter-btn">Filter</button>
                        <Link to={'./add'}><button className="btn-3">Add Incomes</button></Link>
                        <Link to={'./add'}><FontAwesomeIcon icon={faPlus} className="btn-4" /></Link>
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

export default Expenses;