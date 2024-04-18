import React, { useState } from "react";
import './Add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addIncome } from "../../Store/IncomeSlice";
import { addExpense } from "../../Store/ExpenseSlice";
import { addMember } from "../../Store/MemberSlice";

const Add = ({page}) => {
    const navigate = useNavigate();
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(page);

    const handleChange = event => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedOption === "income") {
            dispatch(addIncome({ type, title, amount, date }));
            navigate(-1)
        }else if(selectedOption === "expense") {
            dispatch(addExpense({ type, title, amount, date }));
            navigate(-1)
        }else if (selectedOption === "member") {
            dispatch(addMember({ full_name: title, amount }));
            navigate(-1)
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
                            <option value="income" className="green-title">Income</option>
                            <option value="expense" className="green-title">Expense</option>
                            <option value="member" className="green-title">Member</option>
                        </select>
                    </div>
                    <button className="back" onClick={() => navigate(-1)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <br />
                {selectedOption === 'member' ? (
                    <div className="all-input">
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="input-2"
                            placeholder="Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
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
