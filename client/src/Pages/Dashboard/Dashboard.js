import React, { useEffect, useState } from "react";
import './Dashboard.css';
import BigChart from "../../Chart/BigChart/BigChart";
import IncomeChart from "../../Components/IncomeChart/IncomeChart";
import ExpensesChart from "../../Components/ExpensesChart/ExpensesChart";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectUser, selectStatus } from '../../Store/ProfileSlice';
import { fetchFilteredIncomes, fetchIncomes, fetchTotalIncomes } from "../../Store/IncomeSlice";
import { fetchTotalExpenses } from "../../Store/ExpenseSlice";
import { fetchMembers, fetchTotalMembers, selectMembers } from "../../Store/MemberSlice";

const Dashboard = () => {
    const dispatch = useDispatch();
    const selectTotalIncomes = useSelector(state => state.incomes.totalIncomes);
    const totalIncomesStatus = useSelector(state => state.incomes.status);
    const selectTotalExpenses = useSelector(state => state.expenses.totalExpenses);
    const totalExpensesStatus = useSelector(state => state.expenses.status);
    const userProfile = useSelector(selectUser);
    const status = useSelector(selectStatus);
    const [totalSum, setTotalSum] = useState(0);
    const members = useSelector(selectMembers);
    const totalMembers = useSelector(state => state.members.totalMembers);
    const members_status = useSelector(state => state.members.members_status);
    const totalMembers_status = useSelector(state => state.members.totalMembers_status);

    useEffect(() => {
        dispatch(fetchUserProfile());
        dispatch(fetchTotalIncomes());
        dispatch(fetchTotalExpenses());
        dispatch(fetchTotalMembers());
        dispatch(fetchMembers());
    }, [dispatch]);

    useEffect(() => {
        if (totalMembers_status === 'succeeded') {
            const totalList = totalMembers.map(item => parseInt(item.net_total));
            const sum = totalList.reduce((total, value) => total + value, 0);
            setTotalSum(sum);
        }
    }, [totalMembers, totalMembers_status]);

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
                    {totalSum > 0 ? (
                        <h2 className="balance">Stable</h2>
                    ):(
                        <h2 className="balance">Difficult</h2>
                    )}
                </div>
            </div>
            <div className="flex-6">
                <div>
                    <div className="info-chart">
                        <p className="chart-title-3">Total Funds</p>
                        <h2>${totalSum}</h2>
                    </div>
                    <BigChart data={totalMembers} />
                </div>
                <div className="members-info">
                    <div>
                        <h2 className="pers-total">Members' Totals</h2>
                    </div>
                    <div className="other-members">
                        {members.map((member) => (
                            <div key={member.id} className="other-profile">
                                <div className="profile-img-2"></div>
                                <p>{member.full_name}: ${member.amount}</p>
                            </div>
                        ))}
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
