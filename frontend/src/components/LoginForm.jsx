import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from "react-router-dom";

import '../Auth.css';

const LoginForm = ({ onLoginSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false); // สำหรับข้อความสำเร็จ
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const data = await loginUser({ email, password });
        if (data.token) {
            setSuccess(true);
            setMessage('Login successful! Welcome, ' + data.firstName + '!');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.firstName);
            onLoginSuccess(data.firstName);

            // delay 3 วิ ก่อนปิด modal และไป dashboard
            setTimeout(() => {
                onClose();
                navigate("/dashboard");
            }, 3000);
        } else {
            setSuccess(false);
            setMessage(data.message || 'Login failed.');
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="loginEmail">Email:</label>
                        <input
                            type="email"
                            id="loginEmail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="loginPassword">Password:</label>
                        <input
                            type="password"
                            id="loginPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>

                {message && (
                    <p className={`message ${success ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LoginForm;
