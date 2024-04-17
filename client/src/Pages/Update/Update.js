import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deleteIncome, updateIncome } from "../../Store/IncomeSlice";
import { deleteExpense, updateExpense } from "../../Store/ExpenseSlice";
import { updateMember } from "../../Store/MemberSlice";

const Update = ({ page }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(page);

    let idProperty, findFunction;

    switch (page) {
        case "member":
            idProperty = "member_id";
            findFunction = item => String(item.member_id) === id;
            break;
        case "income":
            idProperty = "income_id";
            findFunction = item => String(item.income_id) === id;
            break;
        case "expense":
            idProperty = "expense_id";
            findFunction = item => String(item.expense_id) === id;
            break;
        default:
            console.error("Invalid page");
    }

    const items = useSelector(state => state[page + "s"][page + "s"]);

    useEffect(() => {
        if (id && items) {
            const selectedItem = items.find(findFunction);
            if (selectedItem) {
                if (selectedOption === 'member') {
                    setName(selectedItem.title);
                    setAmount(selectedItem.amount);
                } else {
                    setType(selectedItem.type);
                    setName(selectedItem.title);
                    setAmount(selectedItem.amount);
                    const firstTenDates = selectedItem.date.slice(0, 10);
                    setDate(firstTenDates);
                }
            }
            console.log(id)
        }
    }, [id, items, selectedOption]);

    const handleChange = event => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateAction = {
            type: type,
            title: name,
            amount: amount,
            date: date
        };

        switch (selectedOption) {
            case "income":
                console.log(id)
                dispatch(updateIncome({ incomeId: id, incomeData: updateAction }));
                break;
            case "expense":
                console.log(id)
                console.log({ expenseId: id, expenseData: updateAction })
                dispatch(updateExpense({ expenseId: id, expenseData: updateAction }));
                break;
            case "member":
                dispatch(updateMember(updateAction));
                break;
            default:
                console.error("Invalid option");
        }

        navigate(-1);
        setType("");
        setName("");
        setAmount("");
        setDate("");
    };

    const handleDelete = () => {
        dispatch(deleteIncome(id));
        dispatch(deleteExpense(id))
        navigate(-1);
    };

    return (
        <div className="Add">
            <div className="add">
                <form onSubmit={handleSubmit}>
                    <div className="title-add">
                        <div className="flex-5">
                            <label>Update </label>
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
                    ) : (
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
                        <button type="submit" className="btn-6">Update</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Update;