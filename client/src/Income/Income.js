import React from "react";
import IncomeChart from "../Components/IncomeChart/IncomeChart";

const Income = () => {

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    return (
        <div>
            <IncomeChart data={data} />
        </div>
    )
}

export default Income;