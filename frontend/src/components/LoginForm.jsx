import React, { useState } from 'react';
import { loginUser } from '../api/auth';
import '../Auth.css';

const LoginForm = ({ onLoginSuccess, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const data = await loginUser({ email, password });
        if (data.token) {
            setMessage('Login successful!');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.firstName);
            onLoginSuccess(data.firstName);
            onClose(); // ปิด modal หลังจาก login สำเร็จ
        } else {
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
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default LoginForm;
