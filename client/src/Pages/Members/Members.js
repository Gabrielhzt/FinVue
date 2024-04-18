import React, { useEffect, useState } from "react";
import PieChart from "../../Chart/PieChart/PieChart";
import Table from "../../Components/Table/Table";
import BarChart from "../../Chart/Chart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../Filter/Filter";
import { fetchMembers, fetchTotalMembers, selectMembers } from "../../Store/MemberSlice";

const Members = () => {
    const dispatch = useDispatch();
    const [totalSum, setTotalSum] = useState(0);
    const members = useSelector(selectMembers);
    const totalMembers = useSelector(state => state.members.totalMembers);
    const members_status = useSelector(state => state.members.members_status);
    const totalMembers_status = useSelector(state => state.members.totalMembers_status);

    useEffect(() => {
        dispatch(fetchTotalMembers())
        dispatch(fetchMembers());
    }, [dispatch]);

    useEffect(() => {
        if (totalMembers_status === 'succeeded') {
            const totalList = totalMembers.map(item => parseInt(item.net_total));
            const sum = totalList.reduce((total, value) => total + value, 0);
            setTotalSum(sum);
        }
    }, [totalMembers, totalMembers_status]);

    const data = {
        type: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        values: [19, 8, 14, 10, 16, 19]
    };

    if(members_status !== 'succeeded' && totalMembers_status !== 'succeeded'){
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div>
            <div className="info-top">
                <div className="green">
                    <div className="flex-2">
                        <div>
                            <h5 className="chart-title">Total Funds</h5>
                            <h2 className="chart-info">{totalSum}</h2>
                        </div>
                        <div className="grow">
                            <FontAwesomeIcon icon={faArrowTrendUp} />
                            <p>21%</p>
                        </div>
                    </div>
                    <BarChart data={totalMembers} color={'#fff'} width={100} height={1000} barSpacing={10} type={'members'} />
                </div>
                <div className="pie">
                    <div>
                        <h2 className="income-title">Member Contributions</h2>
                        <p className="description">Explore how funds are allocated among account members through an intuitive and interactive pie chart visualization.</p>
                    </div>
                    <PieChart data={members} type={"member"} />
                </div>
            </div>
            <div>
                <div className="income-title-2">
                    <h2>Members</h2>
                    <div className="flex-3">
                        <button className="filter-btn">Filter</button>
                        <Link to={'./add'}><button className="btn-3">Add Members</button></Link>
                        <Link to={'./add'}><FontAwesomeIcon icon={faPlus} className="btn-4" /></Link>
                    </div>
                </div>
                <Table data_table={members} type={'member'} />
            </div>
            <div className="Add">
                <Outlet />
            </div>
        </div>
    );
};

export default Members;