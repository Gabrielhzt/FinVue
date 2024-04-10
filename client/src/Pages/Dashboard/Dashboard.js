import React from "react";
import './Dashboard.css';
import BigChart from "../../Chart/BigChart/BigChart";
import IncomeChart from "../../Components/IncomeChart/IncomeChart";
import ExpensesChart from "../../Components/ExpensesChart/ExpensesChart";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    const data_2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug'],
        values: [19, 8, 14, 10, 16, 19, 14, 18]
    };

    return (
        <div>
            <div className="info-top">
                <IncomeChart data={data} />
                <ExpensesChart data={data} />
                <div className="grey-2">
                    <div>
                        <h5 className="chart-title-2">Financial Health Overview</h5>
                        <p className="description">The user maintains a healthy and stable financial balance.</p>
                    </div>
                    <h2 className="balance">Stable</h2>
                </div>
            </div>
            <div className="flex-3">
                <div>
                    <div className="info-chart">
                        <p className="chart-title-3">Total Funds</p>
                        <h2>$324,162</h2>
                    </div>
                    <BigChart data={data_2} />
                </div>
                <div className="members-info">
                    <div>
                        <p className="title-info-members">Members' Totals</p>
                        <h2 className="pers-total">You: $120,000</h2>
                    </div>
                    <div className="other-members">
                        <h4>Other Members:</h4>
                        <div className="other-profile">
                            <div className="profile-img-2"></div>
                            <p>Eric: $20,000</p>
                        </div>
                        <div className="other-profile">
                            <div className="profile-img-2"></div>
                            <p>Fred: $35,000</p>
                        </div>

                        <div className="other-profile">
                            <div className="profile-img-2"></div>
                            <p>Eric: $13,000</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Add">
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard;