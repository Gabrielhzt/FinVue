import React, { useState } from "react";
import './Add.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from "react-router-dom";

const Add = () => {
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
    
    return (
        <div className="Add">
            <div className="add">
            <form>
                <div className="title-add">
                    <div className="flex-5">
                        <label>Add </label>
                            <select
                                id="select-option"
                                value={selectedOption}
                                onChange={handleChange}
                                className="select"
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
                <div className="all-input">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="input-2"
                        placeholder="Name"
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
                        />
                        </div>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required
                        className="input-2"
                        placeholder="Date/Period"
                    />
                </div>
                <div className="center-2">
                    <button type="submit" className="btn-4">Add</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Add;