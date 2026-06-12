import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest, getUser } from '../utils/api';

function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const { ok, data } = await apiRequest('/tasks');
      if (ok) {
        setTasks(data.tasks);
      }
      setLoading(false);
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    if (!user) { navigate('/login'); }
  }, [navigate, user]);


  // Count tasks by status
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const inProgressCount = tasks.filter((t) => t.status === 'In Progress').length;
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;

  return (
    <div className="container">
      <h1 style={{ marginBottom: '8px', color: '#2c3e50' }}>
        Welcome back, {user.name} 👋
      </h1>
      <p style={{ color: '#888', marginBottom: '28px' }}>
        Role: <strong>{user.role}</strong> &nbsp;|&nbsp; Email: {user.email}
      </p>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Tasks</h3>
              <div className="card-value">{tasks.length}</div>
              <div className="card-sub">All tasks</div>
            </div>
            <div className="card">
              <h3>Pending</h3>
              <div className="card-value" style={{ color: '#d68910' }}>{pendingCount}</div>
              <div className="card-sub">Not started yet</div>
            </div>
            <div className="card">
              <h3>In Progress</h3>
              <div className="card-value" style={{ color: '#2471a3' }}>{inProgressCount}</div>
              <div className="card-sub">Currently active</div>
            </div>
            <div className="card">
              <h3>Completed</h3>
              <div className="card-value" style={{ color: '#1e8449' }}>{completedCount}</div>
              <div className="card-sub">Done</div>
            </div>
          </div>

          {/* Quick action */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button className="btn btn-success" onClick={() => navigate('/tasks/create')}>
              + Create New Task
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/tasks')}>
              View All Tasks
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
