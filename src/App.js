import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import OneTimeLink from './components/OneTimeLink';
import TimeCheck from './components/TimeCheck';
import AdminKickout from './components/AdminKickout';
import VerifyLink from './components/VerifyLink';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="nav-bar">
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/admin">Admin</Link>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
              <Link to="/one-time-link">One-Time Link</Link>
            </>
          )}
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={token ? <Navigate to="/dashboard" /> : <Login onLogin={setToken} />} 
          />
          <Route 
            path="/register" 
            element={token ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route 
            path="/one-time-link" 
            element={token ? <Navigate to="/dashboard" /> : <OneTimeLink />} 
          />
          
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* New Route */}
          <Route 
            path="/verify-link/:token" 
            element={<VerifyLink onLogin={setToken} />} 
          />

          {/* Default Routes */}
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Dashboard Component
function Dashboard({ token }) {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <TimeCheck token={token} />
    </div>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <AdminKickout />
    </div>
  );
}

// Not Found Component
function NotFound() {
  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default App;
