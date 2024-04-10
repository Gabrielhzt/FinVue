import React from "react";
import '../Register/Register.css';
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div>
            <h1 className="Title-2">Finvue</h1>
            <div className="center">
                <div className="register">
                    <h2 className="title-register">Login</h2>
                    <form>
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
                            <p>New here ? <Link to={'/register'}>Create an account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;