import React, { useEffect } from "react";
import './Dashboard.css';
import BigChart from "../../Chart/BigChart/BigChart";
import IncomeChart from "../../Components/IncomeChart/IncomeChart";
import ExpensesChart from "../../Components/ExpensesChart/ExpensesChart";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUser, selectStatus } from '../../Store/ProfileSlice';
import { fetchFilteredIncomes, fetchIncomes, fetchTotalIncomes } from "../../Store/IncomeSlice";
import { fetchTotalExpenses } from "../../Store/ExpenseSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const selectTotalIncomes = useSelector(state => state.incomes.totalIncomes);
    const totalIncomesStatus = useSelector(state => state.incomes.status);
    const selectTotalExpenses = useSelector(state => state.expenses.totalExpenses);
    const totalExpensesStatus = useSelector(state => state.expenses.status);
    const userProfile = useSelector(selectUser);
    const status = useSelector(selectStatus);

    useEffect(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchTotalIncomes());
        dispatch(fetchTotalExpenses())
    }, [dispatch]);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    const data_2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug'],
        values: [19, 8, 14, 10, 16, 19, 14, 18]
    };

    const userFullName = userProfile ? userProfile.full_name : "User";

    return (
        <div>
            <div className="welc-3">
                <h1>Expense Tracker</h1>
                {status === 'succeeded' && <p>Welcome, {userFullName}!</p>}
                {status === 'loading' && <p>Loading user profile...</p>}
                {status === 'failed' && <p>Error: Unable to load user profile</p>}
            </div>
            <div className="info-top">
                {totalIncomesStatus === 'succeeded' ? (
                    selectTotalIncomes.length > 0 ? (
                        <IncomeChart data={selectTotalIncomes} />
                    ) : (
                        <p>No total incomes available.</p>
                    )
                ) : (
                    <p>Loading total incomes...</p>
                )}
                <ExpensesChart data={selectTotalExpenses} />
                <div className="grey-2">
                    <div>
                        <h5 className="chart-title-2">Financial Health Overview</h5>
                        <p className="description">The user maintains a healthy and stable financial balance.</p>
                    </div>
                    <h2 className="balance">Stable</h2>
                </div>
            </div>
            <div className="flex-6">
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
