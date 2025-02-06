import React, { useState } from 'react';

function AdminKickout() {
  const [identifier, setIdentifier] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKickout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/admin/kickout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Kickout failed');
      }

      setMessage(`Successfully kicked out user: ${identifier}`);
      setError('');
      setIdentifier('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Admin Kickout</h2>
      {error && <div className="error">{error}</div>}
      {message && <div className="success">{message}</div>}
      <form onSubmit={handleKickout}>
        <div>
          <label>User Email or Phone:</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Kickout User'}
        </button>
      </form>
    </div>
  );
}

export default AdminKickout; 