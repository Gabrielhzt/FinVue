import React from "react";
import PieChart from "../../Chart/PieChart/PieChart";
import Table from "../../Components/Table/Table";
import BarChart from "../../Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router-dom";

const Members = () => {

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    return (
        <div>
            <div className="info-top">
                <div className="green">
                    <div className="flex-2">
                        <div>
                            <h5 className="chart-title">Total Funds</h5>
                            <h2 className="chart-info">$324,162</h2>
                        </div>
                        <div className="grow">
                            <FontAwesomeIcon icon={faArrowTrendUp} />
                            <p>21%</p>
                        </div>
                    </div>
                    <BarChart data={data} color={'#fff'} width={100} height={1000} barSpacing={10} />
                </div>
                <div className="pie">
                    <div>
                        <h2 className="income-title">Member Contributions</h2>
                        <p className="description">Explore how funds are allocated among account members through an intuitive and interactive pie chart visualization.</p>
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
                    <h2>Members</h2>
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

export default Members;