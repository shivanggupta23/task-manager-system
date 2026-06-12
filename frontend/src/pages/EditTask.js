import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../utils/api';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Load task data when page opens
  useEffect(() => {
    const fetchTask = async () => {
      const { ok, data } = await apiRequest(`/tasks/${id}`);
      if (ok) {
        const task = data.task;
        setFormData({
          title: task.title,
          description: task.description || '',
          status: task.status,
        });
      } else {
        setError('Task not found');
      }
      setFetching(false);
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { ok, data } = await apiRequest(`/tasks/${id}`, 'PUT', formData);

    setLoading(false);

    if (ok) {
      navigate('/tasks');
    } else {
      setError(data.message || 'Failed to update task');
    }
  };

  if (fetching) return <p className="loading">Loading task...</p>;

  return (
    <div className="container">
      <div className="form-page">
        <h2>Edit Task</h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Task description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Updating...' : 'Update Task'}
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate('/tasks')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTask;
