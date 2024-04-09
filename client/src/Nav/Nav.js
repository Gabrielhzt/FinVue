import React from "react";
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faSackDollar, faReceipt, faUsers, faGear, faArrowRightFromBracket, faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Outlet } from "react-router-dom";

const Nav = () => {
    return (
        <div className="grid">
            <nav>
                <div>
                    <h1 className="Title">FinVue</h1>
                    <ul>
                        <NavLink to={'/'} className="nav-link">
                            <li className="flex">
                                <FontAwesomeIcon icon={faChartPie} />
                                <p>Dashboard</p>
                            </li>
                        </NavLink>
                        <NavLink to={'/income'} className="nav-link">
                            <li className="flex">
                                <FontAwesomeIcon icon={faSackDollar}  />
                                <p>Incomes</p>
                            </li>
                        </NavLink>
                        <NavLink to={'/expenses'} className="nav-link">
                            <li className="flex">
                                <FontAwesomeIcon icon={faReceipt} />
                                <p>Expenses</p>
                            </li>
                        </NavLink>
                        <NavLink to={'/members'} className="nav-link">
                            <li className="flex">
                                <FontAwesomeIcon icon={faUsers} />
                                <p>Members</p>
                            </li>
                        </NavLink>
                    </ul>
                </div>
                <div className="profile">
                    <div className="profile-img"></div>
                    <h2>Gabriel Hazout</h2>
                    <p>hazout26@gmail.com</p>
                    <div className="group-btn">
                        <button className="btn"><FontAwesomeIcon icon={faGear} size="lg" /></button>
                        <button className="btn"><FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /></button>
                    </div>
                </div>
            </nav>
            <div className="content">
                <div className="welcome">
                    <div>
                        <h1>Expense Tracker</h1>
                        <p>Welcome, Gabriel!</p>
                    </div>
                    <div className="head-btn">
                        <button className="btn"><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" /></button>
                        <button className="btn"><FontAwesomeIcon icon={faBell} size="xl" /></button>
                        <button className="btn-2">Members</button>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default Nav;