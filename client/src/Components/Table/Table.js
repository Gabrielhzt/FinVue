import React from "react";
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Table = ({data_table = [], type}) => {
    return (
        <div className="all-table">
            <table>
                <thead>
                    {type === 'member' ? (
                    <tr className="table-title">
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Update</th>
                    </tr>
                    ):(
                    <tr className="table-title">
                        <th>Type</th>
                        <th>Title</th>
                        <th>Amount</th>
                        <th>Date/Periode</th>
                        <th>Update</th>
                    </tr>
                    )}
                </thead>
                {type === 'member' ? (
                    <tbody>
                    {data_table.map((item) => (
                    <tr key={item.member_id} className="table-element">
                        <td>{item.full_name}</td>
                        <td>${item.amount}</td>
                        <td><Link to={`./update/${item.member_id}`}><button className="update-btn"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button></Link></td>
                    </tr>
                    ))}
                </tbody>
                ): type === 'income' ? (
                <tbody>
                    {data_table.map((item) => (
                    <tr key={item.income_id} className="table-element">
                        <td>{item.type}</td>
                        <td>{item.title}</td>
                        <td>${item.amount}</td>
                        <td>{item.date}</td>
                        <td><Link to={`./update/${item.income_id}`}><button className="update-btn"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button></Link></td>
                    </tr>
                    ))}
                </tbody>
                ):(
                <tbody>
                    {data_table.map((item) => (
                    <tr key={item.expense_id} className="table-element">
                        <td>{item.type}</td>
                        <td>{item.title}</td>
                        <td>${item.amount}</td>
                        <td>{item.date}</td>
                        <td><Link to={`./update/${item.expense_id}`}><button className="update-btn"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button></Link></td>
                    </tr>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    )
}

export default Table;