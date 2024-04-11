import React from "react";
import './Register.css';
import { Link } from "react-router-dom";

const Register = () => {
    return (
        <div>
            <h1 className="Title-2">Finvue</h1>
            <div className="center">
                <div className="register">
                    <h2 className="title-register">Register</h2>
                    <form>
                        <label htmlFor="username" className="label">Username:</label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="input"
                        />
                        <br />
                        <br />
                        <label htmlFor="email" className="label">Email:</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="input"
                        />
                        <br />
                        <br />
                        <label htmlFor="password" className="label">Password:</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="input"
                        />
                        <br />
                        <br />
                        <div className="center-2">
                            <button type="submit" className="btn-2">Register</button>
                            <p>Already have an account ? <Link to={'/login'}>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;