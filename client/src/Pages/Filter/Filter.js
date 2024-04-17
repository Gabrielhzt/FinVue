import React, { useState } from "react";

const Filter = ({ availableTypes, filterValue, setFilterValue }) => {
    const [active, setActive] = useState(false)

    const handleActive = () => {
        setActive(!active)
    }

    const handleChange = (event) => {
        setFilterValue(event.target.value);
    };

    return (
        <div>
            {active ? (
                <div className="">
                    <select id="incomeType" value={filterValue} onChange={handleChange}>
                        <option value="">All</option>
                        {availableTypes.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            ):(
                <button className="filter-btn" onClick={handleActive}>Filter</button>
            )} 
        </div>
    );
};

export default Filter;