import React, { useState, useEffect } from "react";
import './Nav.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faBars, faChartPie, faSackDollar, faReceipt, faUsers, faGear, faArrowRightFromBracket, faMagnifyingGlass, faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link, Outlet } from "react-router-dom";

const Nav = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 1390) {
            setOpen(false);
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className={open ? "grid-2" : "grid"}>
            <nav className="big">
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
                        <NavLink to={'/settings'}><button className="btn"><FontAwesomeIcon icon={faGear} size="lg" className="setting-icon" /></button></NavLink>
                        <button className="btn"><FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /></button>
                    </div>
                </div>
            </nav>
            {open ? (
            <nav className="big-2">
                <div className="column">
                    <div>
                        <h1 className="Title">FinVue</h1>
                        <ul>
                            <NavLink to={'/'} className="nav-link">
                                <li className="flex" onClick={handleOpen}>
                                    <FontAwesomeIcon icon={faChartPie} />
                                    <p>Dashboard</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/income'} className="nav-link">
                                <li className="flex" onClick={handleOpen}>
                                    <FontAwesomeIcon icon={faSackDollar}  />
                                    <p>Incomes</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/expenses'} className="nav-link">
                                <li className="flex" onClick={handleOpen}>
                                    <FontAwesomeIcon icon={faReceipt} />
                                    <p>Expenses</p>
                                </li>
                            </NavLink>
                            <NavLink to={'/members'} className="nav-link">
                                <li className="flex" onClick={handleOpen}>
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
                            <NavLink to={'/settings'}><button className="btn" onClick={handleOpen}><FontAwesomeIcon icon={faGear} size="lg" className="setting-icon" /></button></NavLink>
                            <button className="btn" onClick={handleOpen}><FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" /></button>
                        </div>
                    </div>
                </div>
                <button className="btn-5" onClick={handleOpen}><FontAwesomeIcon icon={faChevronLeft} size="2xl" /></button>
            </nav>
            ):(
                <nav className="little">
                    <button className="btn-5" onClick={handleOpen}><FontAwesomeIcon icon={faChevronRight} size="2xl" /></button>
                </nav>
            )}
            <div className="content">
                <div className="welcome">
                    <div className="welc-2">
                        <h1>Expense Tracker</h1>
                        <p>Welcome, Gabriel!</p>
                    </div>
                    <Link className="none" to={'/'}><h1 className="Title-2">FinVue</h1></Link>
                    <div className="head-btn">
                        <button className="btn"><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" /></button>
                        <button className="btn"><FontAwesomeIcon icon={faBell} size="xl" /></button>
                        <button className="btn-2">Members</button>
                    </div>
                    <FontAwesomeIcon icon={faBars} size="2xl" className="bars" onClick={handleOpen} />
                </div>
                <div className="all">
                    <Outlet />
                </div>
                <div className={open ? ("Add-2"):("")}></div>
            </div>
        </div>
    )
}

export default Nav;