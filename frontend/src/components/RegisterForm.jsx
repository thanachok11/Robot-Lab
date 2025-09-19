import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import '../Auth.css';

const RegisterForm = ({ onRegisterSuccess, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        const data = await registerUser({ firstName, lastName, email, password });
        if (data.token) {
            setMessage('Registration successful!');
            localStorage.setItem('userToken', data.token);
            localStorage.setItem('userName', data.firstName);
            onRegisterSuccess(data.firstName);
            onClose(); // ปิด modal เมื่อสมัครเสร็จ
        } else {
            setMessage(data.message || 'Registration failed.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default RegisterForm;
