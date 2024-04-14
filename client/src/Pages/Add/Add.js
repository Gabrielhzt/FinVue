import React, { useState } from "react";
import './Add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addIncome } from "../../Store/IncomeSlice";
import { addExpense } from "../../Store/ExpenseSlice";
import { addMember } from "../../Store/MemberSlice";

const Add = () => {
    const incomes = useSelector(state => state.incomes.incomes);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = event => {
        setSelectedOption(event.target.value);
    };

    const handleBackClick = () => {
        const currentPath = location.pathname;
        const newPath = currentPath.replace('/add', '');
        return newPath;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedOption === "option1") {
            dispatch(addIncome({ type, name, amount, date }));
            setType('')
            setName('');
            setAmount('');
            setDate('');
        }else if(selectedOption === "option2") {
            dispatch(addExpense({ type, name, amount, date }));
            setType('')
            setName('');
            setAmount('');
            setDate('');
        }else if (selectedOption === "option3") {
            dispatch(addMember({ name, amount }));
            setName('');
            setAmount('');
        }else {
            console.log("o")
        }
    };
    
    return (
        <div className="Add">
            <div className="add">
            <form onSubmit={handleSubmit}>
                <div className="title-add">
                    <div className="flex-5">
                        <label>Add </label>
                            <select
                                id="select-option"
                                value={selectedOption}
                                onChange={handleChange}
                                className="select"
                                required
                            >
                            <option value="" className="green-title">Select an option</option>
                            <option value="option1" className="green-title">Income</option>
                            <option value="option2" className="green-title">Expenses</option>
                            <option value="option3" className="green-title">Member</option>
                        </select>
                    </div>
                    <Link to={handleBackClick()}><FontAwesomeIcon icon={faXmark} className="back" /></Link>
                </div>
                <br />
                {selectedOption === 'option3' ? (
                    <div className="all-input">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="input-2"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div>
                            <span className="dollar-sign">$</span>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                required
                                className="input-3"
                                placeholder="Amount"
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>
                ):(
                <div className="all-input">
                    <input
                        type="text"
                        id="type"
                        name="type"
                        required
                        className="input-2"
                        placeholder="Type"
                        value={type} 
                        onChange={(e) => setType(e.target.value)}
                    />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="input-2"
                        placeholder="Name"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div>
                        <span className="dollar-sign">$</span>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            required
                            className="input-3"
                            placeholder="Amount"
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        className="input-2"
                        placeholder="Date/Period"
                        value={date} 
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                )}
                <div className="center-2">
                    <button type="submit" className="btn-6">Add</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Add;
