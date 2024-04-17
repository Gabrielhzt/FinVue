import React, { useEffect, useState } from "react";
import './Income.css';
import IncomeChart from "../../Components/IncomeChart/IncomeChart";
import PieChart from "../../Chart/PieChart/PieChart";
import Table from "../../Components/Table/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../Filter/Filter";
import { fetchFilteredIncomes, fetchIncomes, fetchTotalIncomes } from "../../Store/IncomeSlice";

const Income = () => {
    const dispatch = useDispatch();
    const incomes = useSelector(state => state.incomes.incomes);
    const allfilter = useSelector(state => state.incomes.allfilter);
    const selectTotalIncomes = useSelector(state => state.incomes.totalIncomes);
    const totalIncomesStatus = useSelector(state => state.incomes.status);
    const [filterValue, setFilterValue] = useState("");
    const [filteredIncomes, setFilteredIncomes] = useState(incomes);
    const [availableTypes, setAvailableTypes] = useState([]);

    useEffect(() => {
        dispatch(fetchIncomes());
        dispatch(fetchFilteredIncomes());
        dispatch(fetchTotalIncomes());
    }, [dispatch]);

    useEffect(() => {
        setAvailableTypes([...new Set(incomes.map(income => income.type))]);
    }, [incomes]);

    useEffect(() => {
        const filtered = incomes.filter(income => {
            if (!filterValue) {
                return true;
            }
            return income.type === filterValue;
        });
        setFilteredIncomes(filtered);
    }, [filterValue, incomes]);

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    return (
        <div>
            <div className="info-top">
                {totalIncomesStatus === 'loading' ? (
                    <p>Loading...</p>
                ) : (
                    <IncomeChart data={selectTotalIncomes} />
                )}
                <div className="pie">
                    <div>
                        <h2 className="income-title">Income Distribution</h2>
                        <p className="description">Visualize how your income is distributed among different categories or sources. Explore the pie chart below to understand the breakdown of your income.</p>
                        
                    </div>
                    <PieChart data={allfilter.length > 0 ? allfilter : filteredIncomes} />
                </div>
            </div>
            <div>
                <div className="income-title-2">
                    <h2>Incomes</h2>
                    <div className="flex-3">
                        <Filter
                            availableTypes={availableTypes}
                            filterValue={filterValue}
                            setFilterValue={setFilterValue}
                        />
                        <Link to={'./add'}><button className="btn-3">Add Incomes</button></Link>
                        <Link to={'./add'}><FontAwesomeIcon icon={faPlus} className="btn-4" /></Link>
                    </div>
                </div>
                <Table data_table={filteredIncomes} type={'income'} />
            </div>
            <div className="Add">
                <Outlet />
            </div>
        </div>
    )
}

export default Income;