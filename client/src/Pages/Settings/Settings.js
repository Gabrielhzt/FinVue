import React, { useEffect, useState } from "react";
import './Settings.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateFullName, updateEmail, updatePassword } from "../../Store/ProfileSlice";

const Settings = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.profile);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openName, setOpenName] = useState(false);
    const [openEmail, setOpenEmail] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user.fullName) {
            setName(user.fullName);
        }
        if (user.email) {
            setEmail(user.email);
        }
    }, [user.fullName, user.email]);

    const handleUpdateName = () => {
        if(openName) {
            dispatch(updateFullName(name));
            setOpenName(false);
        } else {
            setOpenName(true);
        }
    }

    const handleUpdateEmail = () => {
        if(openEmail) {
            dispatch(updateEmail(email));
            setOpenEmail(false);
        } else {
            setOpenEmail(true);
        }
    }

    const handleUpdatePassword = () => {
        if(openPassword) {
            dispatch(updatePassword(password));
            setOpenPassword(false);
        } else {
            setOpenPassword(true);
        }
    }

    return (
        <div>
            <h1 className="income-title-2">App Settings</h1>
            <div className="settings-info">
                <div className="flex-4">
                    <div>
                        <h2>Name</h2>
                        <p>Modify your displayed name within the application.</p>
                        <button className="settings-btn" onClick={handleUpdateName}>Update</button>
                    </div>
                    <div className="both">
                        {openName ? (
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="input"
                            />
                        ):(
                            <h3>{name}</h3>
                        )}
                        <button className="settings-btn-2" onClick={handleUpdateName}>Update</button>
                    </div>
                </div>
                <div className="flex-4">
                    <div>
                        <h2>Email</h2>
                        <p>Change the email address associated with your account.</p>
                        <button className="settings-btn" onClick={handleUpdateEmail}>Update</button>
                    </div>
                    <div className="both">
                        {openEmail ? (
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input"
                            />
                        ):(
                            <h3>{email}</h3>
                        )}
                        <button className="settings-btn-2" onClick={handleUpdateEmail}>Update</button>
                    </div>
                </div>
                <div className="flex-4">
                    <div>
                        <h2>Password</h2>
                        <p>Change your account password for improved security.</p>
                        <button className="settings-btn" onClick={handleUpdatePassword}>Update</button>
                    </div>
                    <div className="both">
                        {openPassword ? (
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input"
                            />
                        ):(
                            <h3>******</h3>
                        )}
                        <button className="settings-btn-2" onClick={handleUpdatePassword}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;