import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import "../LandingPage.css";

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginSuccess = (name) => {
        console.log("Login Success:", name);

    };

    const handleRegisterSuccess = (name) => {
        console.log("Register Success:", name);
    };

    return (
        <div className="landing-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">Lobot Framework Lab</div>
                <ul className="nav-links">
                    <li><button onClick={() => setShowLogin(true)} className="nav-btn-login">Login</button></li>
                    <li><button onClick={() => setShowRegister(true)} className="nav-btn-register">Register</button></li>
                </ul>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to Lobot Framework Lab</h1>
                    <p>Learn Robot Framework: automate tests, improve productivity, and simplify QA processes.</p>
                    <button onClick={() => setShowRegister(true)} className="cta-btn">
                        Get Started
                    </button>
                </div>
            </section>


            {/* Modal Components */}
            {showLogin && (
                <LoginForm
                    onLoginSuccess={handleLoginSuccess}
                    onClose={() => setShowLogin(false)}
                />
            )}

            {showRegister && (
                <RegisterForm
                    onRegisterSuccess={handleRegisterSuccess}
                    onClose={() => setShowRegister(false)}
                />
            )}
        </div>
    );
};

export default LandingPage;
