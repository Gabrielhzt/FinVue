import React from "react";
import './Settings.css'

const Settings = () => {
    return (
        <div>
            <h1 className="income-title-2">App Settings</h1>
            <div className="settings-info">
                <div className="flex-4">
                    <div>
                        <h2>Name</h2>
                        <p>Modify your displayed name within the application.</p>
                        <button className="settings-btn">Update</button>
                    </div>
                    <div className="both">
                        <h3>Gabriel Hazout</h3>
                        <button className="settings-btn-2">Update</button>
                    </div>
                </div>
                <div className="flex-4">
                    <div>
                        <h2>Email</h2>
                        <p>Change the email address associated with your account.</p>
                        <button className="settings-btn">Update</button>
                    </div>
                    <div className="both">
                        <h3>hazout26@gmail.com</h3>
                        <button className="settings-btn-2">Update</button>
                    </div>
                </div>
                <div className="flex-4">
                    <div>
                        <h2>Password</h2>
                        <p>Change your account password for improved security.</p>
                        <button className="settings-btn">Update</button>
                    </div>
                    <div className="both">
                        <h3>******</h3>
                        <button className="settings-btn-2">Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;