import React, { useEffect, useState } from "react";
import PieChart from "../../Chart/PieChart/PieChart";
import ExpensesChart from "../../Components/ExpensesChart/ExpensesChart";
import Table from "../../Components/Table/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../Filter/Filter";
import { fetchFilteredExpenses, fetchExpenses, fetchTotalExpenses } from "../../Store/ExpenseSlice";

const Expense = () => {
    const dispatch = useDispatch();
    const expenses = useSelector(state => state.expenses.expenses);
    const allfilter = useSelector(state => state.expenses.allfilter);
    const selectTotalExpenses = useSelector(state => state.expenses.totalExpenses);
    const totalExpensesStatus = useSelector(state => state.expenses.status);
    const [filterValue, setFilterValue] = useState("");
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [availableTypes, setAvailableTypes] = useState([]);

    useEffect(() => {
        dispatch(fetchExpenses());
        dispatch(fetchFilteredExpenses());
        dispatch(fetchTotalExpenses());
    }, [dispatch]);

    useEffect(() => {
        setAvailableTypes([...new Set(expenses.map(expense => expense.type))]);
    }, [expenses]);

    useEffect(() => {
        const filtered = expenses.filter(expense => {
            if (!filterValue) {
                return true;
            }
            return expense.type === filterValue;
        });
        setFilteredExpenses(filtered);
    }, [filterValue, expenses]);

    return (
        <div>
            <div className="info-top">
                {totalExpensesStatus === 'loading' ? (
                    <p>Loading...</p>
                ) : (
                    <ExpensesChart data={selectTotalExpenses} />
                )}
                <div className="pie">
                    <div>
                        <h2 className="income-title">Expenses Distribution</h2>
                        <p className="description">Visualize how your income is distributed among different categories or sources. Explore the pie chart below to understand the breakdown of your income.</p>
                        
                    </div>
                    <PieChart data={allfilter.length > 0 ? allfilter : filteredExpenses} />
                </div>
            </div>
            <div>
                <div className="income-title-2">
                    <h2>Expenses</h2>
                    <div className="flex-3">
                        <Filter
                            availableTypes={availableTypes}
                            filterValue={filterValue}
                            setFilterValue={setFilterValue}
                        />
                        <Link to={'./add'}><button className="btn-3">Add Expenses</button></Link>
                        <Link to={'./add'}><FontAwesomeIcon icon={faPlus} className="btn-4" /></Link>
                    </div>
                </div>
                <Table data_table={filteredExpenses} type={'expense'} />
            </div>
            <div className="Add">
                <Outlet />
            </div>
        </div>
    )
}

export default Expense;