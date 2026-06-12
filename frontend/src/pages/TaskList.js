import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchTasks = async () => {
    const { ok, data } = await apiRequest('/tasks');
    if (ok) {
      setTasks(data.tasks);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    const { ok, data } = await apiRequest(`/tasks/${id}`, 'DELETE');

    if (ok) {
      setMessage('Task deleted successfully');
      // Remove deleted task from list
      setTasks(tasks.filter((t) => t._id !== id));
      setTimeout(() => setMessage(''), 3000);
    } else {
      setMessage(data.message || 'Failed to delete task');
    }
  };

  // Helper to get the right badge class
  const getBadgeClass = (status) => {
    if (status === 'Pending') return 'badge badge-pending';
    if (status === 'In Progress') return 'badge badge-inprogress';
    if (status === 'Completed') return 'badge badge-completed';
    return 'badge';
  };

  return (
    <div className="container">
      <div className="section-header">
        <h2>All Tasks</h2>
        <button className="btn btn-success" onClick={() => navigate('/tasks/create')}>
          + New Task
        </button>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <div className="no-data">
          <p>No tasks found. Create your first task!</p>
        </div>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.description || '-'}</td>
                <td>
                  <span className={getBadgeClass(task.status)}>{task.status}</span>
                </td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
                <td style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-primary btn-small"
                    onClick={() => navigate(`/tasks/edit/${task._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TaskList;
