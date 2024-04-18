import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
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

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:24635/auth/login', { 
                email: email,
                password: password 
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            console.log('Login successful:', response.data.message);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h1 className="Title-3">Finvue</h1>
            <div className="center">
                <div className="register">
                    <h2 className="title-login">Login</h2>
                    <form className="form1" onSubmit={handleLogin}>
                        <div>
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
                        </div>
                        <br />
                        <br />
                        <div>
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
                        </div>
                        <br />
                        <br />
                        <div className="center-2">
                            <button type="submit" className="btn-2">Login</button>
                            <p>New here ? <Link to={'/register'}>Create an account</Link></p>
                        </div>
                    </form>
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    )
}

export default Login;
