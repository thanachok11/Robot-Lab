import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import "./index.css";
import "./App.css";

function App() {
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token && localStorage.getItem("userName")) {
      setUserName(localStorage.getItem("userName"));
    }
  }, []);

  const handleLoginOrRegisterSuccess = (name) => {
    setUserName(name);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setUserName("");
    navigate("/login");
  };

  return (
    <div className="App">    

      {/* ✅ Content */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm onRegisterSuccess={handleLoginOrRegisterSuccess} />} />
          <Route path="/login" element={<LoginForm onLoginSuccess={handleLoginOrRegisterSuccess} />} />
          <Route
            path="/dashboard"
            element={
              userName
                ? <Dashboard userName={userName} onLogout={handleLogout} />
                : <p className="login-warning">Please log in to view dashboard.</p>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
