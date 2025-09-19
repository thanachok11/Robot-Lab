import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Dashboard.css';

const Dashboard = ({ userName }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        navigate('/'); // กลับไปหน้า Landing Page
    };

    return (
        <div className="dashboard-container">
            {/* Welcome Section */}
            <div className="welcome-section">
                <h2>Welcome, <span>{userName}</span>!</h2>
                <p>Glad to have you here. This page will guide you through Robot Framework basics.</p>
            </div>

            {/* Robot Framework Overview */}
            <div className="overview-section">
                <h3>What is Robot Framework?</h3>
                <p>
                    Robot Framework is an open-source automation framework for acceptance testing,
                    acceptance test-driven development (ATDD), and robotic process automation (RPA).
                    It uses a keyword-driven approach, making tests readable and easy to maintain.
                </p>

                <h3>Key Features:</h3>
                <ul>
                    <li>Keyword-driven testing</li>
                    <li>Data-driven test cases</li>
                    <li>Easy integration with Selenium, API testing, databases, and more</li>
                    <li>Extensible with custom libraries</li>
                    <li>Clear, readable test reports and logs</li>
                </ul>

                <h3>Getting Started:</h3>
                <ol>
                    <li>Install Python</li>
                    <li>Install Robot Framework: <code>pip install robotframework</code></li>
                    <li>Create a test suite using keywords</li>
                    <li>Run your tests using: <code>robot my_test_suite.robot</code></li>
                </ol>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Dashboard;
