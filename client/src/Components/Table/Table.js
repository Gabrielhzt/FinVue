import React from "react";
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Table = ({data_table = [], type}) => {

    const data_2 = [
        { type: 'salary', title: 'My salary at my new job', amount: '35k', date: '25/02' },
        { type: 'crypto', title: 'bitcoin', amount: '70k', date: '15/07' },
        { type: 'real estate', title: 'All my real estate', amount: '200k', date: '07/12' }
    ];

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
                    {data_table.map((item, index) => (
                    <tr key={index} className="table-element">
                        <td>{item.name}</td>
                        <td>${item.amount}</td>
                        <td><button className="update-btn"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button></td>
                    </tr>
                    ))}
                </tbody>
                ):(
                    <tbody>
                    {data_table.map((item, index) => (
                    <tr key={index} className="table-element">
                        <td>{item.type}</td>
                        <td>{item.name}</td>
                        <td>${item.amount}</td>
                        <td>{item.date}</td>
                        <td><button className="update-btn"><FontAwesomeIcon icon={faPenToSquare} size="lg" /></button></td>
                    </tr>
                    ))}
                </tbody>
                )}
            </table>
        </div>
    )
}

export default Table;