import React, { useEffect, useState } from "react";
import axios from "axios";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const token = localStorage.getItem('token');
            if (token) {
                await axios.get('http://localhost:24635/auth/verify', {
                  headers: {
                    Authorization: token
                  }
                });
                navigate('/');
            }
          } catch (error) {
            console.error('Error during authentication check:', error);
          }
        };
    
        checkAuthentication();
    }, [navigate]);

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:24635/auth/register', {
                fullname,
                email,
                password,
            });
            setMessage(response.data.message);
            setError('')
            navigate('/login')
        } catch (error) {
            setMessage('')
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h1 className="Title-2">Finvue</h1>
            <div className="center">
                <div className="register">
                    <h2 className="title-register">Register</h2>
                    <form onSubmit={handleRegister}>
                        <label htmlFor="username" className="label">Username:</label>
                        <br />
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                    {error && <p>{error}</p>}
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    )
}

export default Register;