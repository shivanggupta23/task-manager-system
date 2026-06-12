import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthData, getUser } from '../utils/api';

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    clearAuthData();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>📋 Task Manager</h2>
      {user && (
        <div className="navbar-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/tasks">My Tasks</Link>
          <span>Hi, {user.name}</span>
          <span className={`role-badge ${user.role === 'admin' ? 'admin' : ''}`}>
            {user.role}
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
